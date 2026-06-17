// ss-onboarding-api — Cloudflare Worker
// Same-origin API for the onboarding questionnaire (routed at onboarding.sprintsandsneakers.dev/api/*).
//  - POST /api/upload/init   { token, filename, mimeType, size } -> { sessionUrl, folderId }
//  - PUT  /api/upload/chunk  (headers: X-Session-Url, Content-Range; body: chunk) -> { done, range|file }
//  - POST /api/submit        { token, answers, files } -> { ok }
//  - GET  /api/health
//
// Files are streamed to Google Drive via a resumable upload session (created server-side with a
// service account), relayed chunk-by-chunk through this Worker so the browser only ever talks to us
// (no CORS, no per-request body-size problem). The file is reassembled by Drive into ONE intact file
// inside the partner's project folder (resolved from the Questionnaire registry by token).
// Answers are appended to a Google Sheet.

const ANSWERS_HEADERS = ['submitted_at', 'token', 'name', 'company', 'uploaded_files', 'answers_json'];

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
  const { token = '', answers = {}, files = [] } = await request.json();
  const at = await getAccessToken(env);
  await ensureTab(env, at, env.ANSWERS_TAB, ANSWERS_HEADERS);
  const a = answers || {};
  const row = [
    a._submitted_at || new Date().toISOString(),
    token || a._customer || '',
    a.meta_name || '',
    a.meta_company || '',
    (files || []).map((f) => f.webViewLink || f.name || '').filter(Boolean).join('\n'),
    JSON.stringify(a),
  ];
  await sheetsAppend(env, at, env.ANSWERS_TAB, [row]);
  return J({ ok: true });
}

// ── Folder routing (token -> partner project folder) ──────
async function resolveFolder(env, token) {
  if (token) {
    const fid = await registryLookup(env, token);
    if (fid) return fid;
  }
  return env.FALLBACK_FOLDER_ID;
}

async function registryLookup(env, token) {
  const at = await getAccessToken(env);
  const range = encodeURIComponent(`'${env.REGISTRY_TAB}'!A2:E`);
  const resp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${env.SPREADSHEET_ID}/values/${range}`,
    { headers: { Authorization: 'Bearer ' + at } }
  );
  if (!resp.ok) return null; // tab may not exist yet
  const j = await resp.json();
  for (const r of j.values || []) {
    if ((r[0] || '').trim() === token.trim()) return (r[4] || '').trim() || null;
  }
  return null;
}

// ── Google Sheets helpers ─────────────────────────────────
async function ensureTab(env, at, title, headers) {
  const meta = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${env.SPREADSHEET_ID}?fields=sheets.properties.title`,
    { headers: { Authorization: 'Bearer ' + at } }
  );
  if (!meta.ok) throw new Error('spreadsheet read failed: ' + meta.status + ' ' + (await meta.text()));
  const mj = await meta.json();
  if ((mj.sheets || []).some((s) => s.properties && s.properties.title === title)) return;
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${env.SPREADSHEET_ID}:batchUpdate`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + at, 'Content-Type': 'application/json' },
    body: JSON.stringify({ requests: [{ addSheet: { properties: { title } } }] }),
  });
  if (headers && headers.length) await sheetsAppend(env, at, title, [headers]);
}

async function sheetsAppend(env, at, tab, values) {
  const range = encodeURIComponent(`'${tab}'!A1`);
  const resp = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${env.SPREADSHEET_ID}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + at, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values }),
    }
  );
  if (!resp.ok) throw new Error('sheets append failed: ' + resp.status + ' ' + (await resp.text()));
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
    scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets',
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
