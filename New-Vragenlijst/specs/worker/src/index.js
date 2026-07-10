// ss-onboarding-api — Cloudflare Worker
// Same-origin API for the onboarding questionnaire (routed at onboarding.sprintsandsneakers.dev/api/*).
//  - POST /api/upload/init   { token, filename, mimeType, size } -> { sessionUrl, folderId }
//  - PUT  /api/upload/chunk  (headers: X-Session-Url, Content-Range; body: chunk) -> { done, range|file }
//  - POST /api/submit        { token, name, company, html, files } -> { ok, doc }
//  - GET  /api/health
//
// Files stream to Google Drive (resumable, relayed chunk-by-chunk through this Worker so the browser
// only talks to us — no CORS, no per-request size limit; reassembled as ONE intact file). On submit,
// the answers are written as a readable Google Doc into the SAME partner project folder.
// The folder = the ?c token itself, accepted only if it lives under ROOT_FOLDER_ID ("2. Current projects").

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,X-Session-Url,Content-Range',
};
const J = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', ...CORS } });

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    const path = new URL(request.url).pathname;
    try {
      if (path === '/api/health') return J({ ok: true, saConfigured: !!env.GOOGLE_SA_KEY });
      if (path === '/api/upload/init' && request.method === 'POST') return await initUpload(request, env);
      if (path === '/api/upload/chunk' && request.method === 'PUT') return await uploadChunk(request, env);
      if (path === '/api/submit' && request.method === 'POST') return await submit(request, env);
      if (path === '/api/internal/drive-folder' && request.method === 'POST') return await internalCreateFolder(request, env);
      return J({ error: 'not found', path }, 404);
    } catch (e) {
      return J({ error: String((e && e.message) || e) }, 500);
    }
  },
};

// ── Handlers ──────────────────────────────────────────────
async function initUpload(request, env) {
  const { token, filename, mimeType, size } = await request.json();
  if (!filename) return J({ error: 'filename required' }, 400);
  const folderId = await resolveFolder(env, token || '');
  const at = await getAccessToken(env);
  const resp = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + at,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Type': mimeType || 'application/octet-stream',
        'X-Upload-Content-Length': String(size || 0),
      },
      body: JSON.stringify({ name: filename, parents: [folderId] }),
    }
  );
  if (!resp.ok) return J({ error: 'init failed', status: resp.status, detail: await resp.text() }, 502);
  return J({ sessionUrl: resp.headers.get('Location'), folderId });
}

async function uploadChunk(request, env) {
  const sessionUrl = request.headers.get('X-Session-Url');
  const contentRange = request.headers.get('Content-Range');
  if (!sessionUrl) return J({ error: 'missing X-Session-Url' }, 400);
  const buf = await request.arrayBuffer();
  const headers = {};
  if (contentRange) headers['Content-Range'] = contentRange;
  const resp = await fetch(sessionUrl, { method: 'PUT', headers, body: buf });
  if (resp.status === 308) return J({ done: false, range: resp.headers.get('Range') || '' });
  if (resp.ok) return J({ done: true, file: await resp.json().catch(() => null) });
  return J({ error: 'chunk failed', status: resp.status, detail: await resp.text() }, 502);
}

async function submit(request, env) {
  const { token = '', name = '', company = '', html = '', kind = '' } = await request.json();
  const folderId = await resolveFolder(env, token || '');
  const tag = kind ? ' (' + kind + ')' : '';
  const title = ('Onboarding questionnaire' + tag + ' — ' + (company || name || 'partner')).slice(0, 180);
  const doc = await createAnswersDoc(env, folderId, title, html || '<p>(no answers submitted)</p>');
  return J({ ok: true, folderId, doc: { id: doc.id, name: doc.name, link: doc.webViewLink } });
}

// ── Internal: create a Drive folder via the service account (called from Make, no OAuth) ──
async function internalCreateFolder(request, env) {
  if (!env.MAKE_INTERNAL_KEY || request.headers.get('X-Internal-Key') !== env.MAKE_INTERNAL_KEY) {
    return J({ error: 'unauthorized' }, 401);
  }
  const { name, parentId } = await request.json();
  if (!name || !parentId) return J({ error: 'name and parentId required' }, 400);
  const at = await getAccessToken(env);
  const resp = await fetch(
    'https://www.googleapis.com/drive/v3/files?supportsAllDrives=true&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + at, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, parents: [parentId], mimeType: 'application/vnd.google-apps.folder' }),
    }
  );
  if (!resp.ok) return J({ error: 'folder create failed', status: resp.status, detail: await resp.text() }, 502);
  return J(await resp.json());
}

// ── Folder routing (the ?c token IS the partner project folder id) ──
async function resolveFolder(env, token) {
  if (token && (await isUnderRoot(env, token, env.ROOT_FOLDER_ID))) return token;
  return env.FALLBACK_FOLDER_ID;
}

// Walk the folder's parent chain; true if rootId is an ancestor (or the folder itself).
async function isUnderRoot(env, folderId, rootId, maxDepth = 8) {
  if (!folderId || !rootId) return false;
  const at = await getAccessToken(env);
  let current = folderId;
  for (let i = 0; i < maxDepth && current; i++) {
    if (current === rootId) return true;
    const r = await fetch(
      `https://www.googleapis.com/drive/v3/files/${current}?fields=id,parents&supportsAllDrives=true`,
      { headers: { Authorization: 'Bearer ' + at } }
    );
    if (!r.ok) return false;
    const parents = (await r.json()).parents || [];
    if (!parents.length) return false;
    current = parents[0];
  }
  return false;
}

// ── Write the answers as a Google Doc (converted from HTML) into the partner folder ──
async function createAnswersDoc(env, folderId, name, html) {
  const at = await getAccessToken(env);
  const boundary = 'ssbnd' + Date.now() + Math.floor(Math.random() * 1e9);
  const metadata = { name, parents: [folderId], mimeType: 'application/vnd.google-apps.document' };
  const body =
    '--' + boundary + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify(metadata) +
    '\r\n--' + boundary + '\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n' + html +
    '\r\n--' + boundary + '--';
  const r = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + at, 'Content-Type': 'multipart/related; boundary=' + boundary },
      body,
    }
  );
  if (!r.ok) throw new Error('doc create failed: ' + r.status + ' ' + (await r.text()));
  return await r.json();
}

// ── Service-account auth (JWT -> access token, cached) ─────
let _tok = null; // { access_token, exp }
async function getAccessToken(env) {
  const now = Math.floor(Date.now() / 1000);
  if (_tok && _tok.exp > now + 60) return _tok.access_token;
  if (!env.GOOGLE_SA_KEY) throw new Error('GOOGLE_SA_KEY secret not set');
  const sa = JSON.parse(env.GOOGLE_SA_KEY);
  const tokenUri = sa.token_uri || 'https://oauth2.googleapis.com/token';
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/drive',
    aud: tokenUri,
    iat: now,
    exp: now + 3600,
  };
  const unsigned = b64urlStr(JSON.stringify(header)) + '.' + b64urlStr(JSON.stringify(claim));
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToDer(sa.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned));
  const jwt = unsigned + '.' + b64urlBytes(new Uint8Array(sig));
  const resp = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + jwt,
  });
  const j = await resp.json();
  if (!j.access_token) throw new Error('token exchange failed: ' + JSON.stringify(j));
  _tok = { access_token: j.access_token, exp: now + (j.expires_in || 3600) };
  return _tok.access_token;
}

// ── encoding helpers ──────────────────────────────────────
function b64urlBytes(u8) {
  let bin = '';
  for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlStr(s) {
  return b64urlBytes(new TextEncoder().encode(s));
}
function pemToDer(pem) {
  const b64 = pem.replace(/-----BEGIN [^-]+-----/, '').replace(/-----END [^-]+-----/, '').replace(/\s+/g, '');
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8.buffer;
}
