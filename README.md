# S&S — New Partner Onboarding Questionnaire

Interactieve onboarding-vragenlijsten voor nieuwe Sprints & Sneakers-partners.
Antwoorden worden als **Google Doc** opgeslagen en geüploade bestanden (tot 200 MB+)
belanden in de **Drive-projectmap** van die partner.

## Live
- **B2C:** https://onboarding.sprintsandsneakers.dev
- **B2B:** https://onboarding.sprintsandsneakers.dev/b2b
- Per-partner link: voeg `?c=<Drive-folder-id>` toe (de projectmap van de partner onder "2. Current projects").

## Structuur
- `public/index.html` — **B2C**-vragenlijst (één self-contained bestand: HTML/CSS/JS).
- `public/b2b.html` — **B2B**-vragenlijst (gegenereerd, zie hieronder).
- `public/favicon.svg`
- `worker/src/index.js` + `worker/wrangler.toml` — **Cloudflare Worker** (API op `/api/*`): uploadt bestanden hervatbaar naar Drive en schrijft het antwoorden-Doc, via een Google service-account.
- `preview/build_b2b.py` — bouwt `public/b2b.html` opnieuw vanuit de B2C-schil + de B2B-vragen. Draai dit na het wijzigen van de schil of de B2B-inhoud.
- `preview/deslop.py` — het tekst-opschoonscript (referentie).
- `preview/index.html` + `preview/new.html` — de "oud vs nieuw" copy-reviewpagina.
- `docs/superpowers/specs/…` — ontwerp-spec (architectuur + ID's).
- `S&S_Growth_Partnership_Onboarding_B2B.docx` — Gijs' bron-vragen voor B2B.

## Vragenlijsten aanpassen
- **B2C:** bewerk `public/index.html` direct.
- **B2B:** bewerk de vragen in `preview/build_b2b.py` (of de gedeelde schil in `index.html`) en draai `python3 preview/build_b2b.py` om `public/b2b.html` opnieuw te genereren.

## Deployen (vereist Cloudflare-toegang tot het account *Tools@sprintsandsneakers.com*)
```bash
npm i -g wrangler
wrangler login            # log in op het tools@-account
export CLOUDFLARE_ACCOUNT_ID=1abe294524503c88d22016d52c424675

# de form (zowel B2C als B2B staan hier):
wrangler pages deploy public --project-name ss-onboarding --branch main

# de backend (alleen als de worker is gewijzigd):
cd worker && wrangler deploy
```

## Backend (al geconfigureerd)
- Worker `ss-onboarding-api`, gerouteerd op `onboarding.sprintsandsneakers.dev/api/*`.
- Google service-account `id-onboarding-uploader@ss-onboarding-499712.iam.gserviceaccount.com` is lid van de map **"2. Current projects"** in de S&S Shared Drive en schrijft daarin. De sleutel staat als **Worker-secret** (`GOOGLE_SA_KEY`), gezet via `wrangler secret put GOOGLE_SA_KEY` — **niet** in deze repo.
- Routing: de `?c`-token moet een Drive-map onder "2. Current projects" zijn; anders vallen bestanden/antwoorden terug op die hoofdmap (niets gaat verloren).

## Bewust NIET in git
- Secrets (de service-account-sleutel) — alleen als Cloudflare Worker-secret.
- `.wrangler/`, `node_modules/`, `.DS_Store`.

## Nog open
- Make-koppeling zodat B2B-partners automatisch de `/b2b`-link krijgen (de flow moet B2B vs B2C markeren).
