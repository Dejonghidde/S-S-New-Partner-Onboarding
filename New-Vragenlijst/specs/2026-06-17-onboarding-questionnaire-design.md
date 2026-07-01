# Design — Onboarding-vragenlijst nieuwe partners (B2C)

Datum: 2026-06-17
Status: goedgekeurd (start met branding)
Repo: `/Users/dejonghidde/Github/S-S-New-Partner-Onboarding/`

## Doel

S&S stuurt nieuwe partners een interactieve web-vragenlijst die alle informatie ophaalt
die **alleen de partner** ons kan vertellen, zodat we direct creative research, audit en
strategie kunnen draaien. Filosofie (Bart): "Alles wat we zelf uit contract, database of
markt kunnen halen vragen we niet, de rest wel."

## Huidige staat (vastgesteld in deze sessie)

- Eén self-contained HTML-bestand (`SS_Growth_Partnership_Onboarding_B2C_Quiz.html`,
  ~1512 regels, Engels, inline CSS+JS, enige externe dependency = Google Fonts/Inter).
- Het is een **export van een Vercel-pagina** en staat nergens mee in verbinding. De
  `SHEETS_URL` in de JS is een **niet-werkend export-artefact** en wordt opnieuw opgezet.
- Structuur: welkom (step-0) → 9 secties (step-1..9) met motiverende "bridge"-tussenschermen
  (5s countdown) → thank-you (step-10). Topbar met sectie-pills, progress-bar, dark/light
  toggle. Antwoorden worden lokaal in `localStorage` bewaard (autosave/restore).
- Visueel al grotendeels on-brand: zwart `#0A0A0A` + lime `#B2FA63`, Inter, afgeronde hoeken.
  Logo is nu enkel tekst.
- Een byte-identiek duplicaat `... (1).html` bestaat (op te ruimen). Repo heeft nog geen commits.

## Bestaande infrastructuur waarop we aansluiten — Make-scenario "New partner onboarding"

(Geanalyseerd uit `New partner onboarding.blueprint.json`.)

- **Trigger:** nieuwe rij in Google Sheet `1a98wRYG9dMu2KG866xrd1VO3iSmv0Qw0wm9ZxqavtX8`,
  tab `Form Responses`. Kolommen: 0=Company name, 1=Partner first name, 2=Partner email,
  3=Partner phone, 4=Assigned team, 5=Assignment letter, 6=Handover, 8=Started by.
- Per **Assigned team** (router-branches) maakt het in **Shared Drive** `0AMl3InXspt_qUk9PVA`
  (parent `1CX7LsKcUFH2GMwXngo4WShjVXlIesWRk`):
  - **project folder** `"{Assigned team} - {Company name}"` — **dit is de partner-map waar de
    questionnaire-uploads in moeten.**
  - daaronder **`[SHARED] | {Company name} | Sprints and Sneakers`** — gedeeld met de partner;
    **uploads horen hier NIET.**
- Kopieert o.a. een pre-audit questionnaire (Google-doc) en mailt de partner `link questionnaire`
  (= dat doc), `link shared drive` (= SHARED-map), `Link DPA`.
- **Knelpunt:** de project-folder-ID wordt nergens persistent bewaard (geen data store; enige
  Sheets-write gaat naar tab `Monday users`). Er is dus nog geen koppeling token→folder-ID.

## Architectuur (besloten)

```
Make "New partner onboarding" (uitgebreid)
  ├─ maakt project folder + SHARED folder (bestaat al)
  ├─ NIEUW: genereert token, schrijft rij naar tab `Questionnaire registry`
  │         (token · company · email · assigned team · projectFolderId · sharedFolderId)
  └─ NIEUW: mailt web-form-link  https://<subdomein>/?c=<token>   (vervangt het Google-doc)

Cloudflare Pages  ──  index.html (de form), per partner via ?c=<token>
  ├─ localStorage namespaced op token  → geen kruisbesmetting tussen partners
  ├─ submit  → antwoorden naar tab `Questionnaire answers` (op token)
  └─ uploads → R2 bucket, hervatbaar/multipart, sleutel `c/<token>/<bestand>`  (200 MB+ OK)

Cloudflare Worker (mover)
  └─ streamt R2 → Google Drive (resumable) in de project folder van die token
     (folderId opgezocht in `Questionnaire registry`); nooit in de SHARED-map.
```

### Besloten keuzes

1. **Documenten → Drive:** browser → **R2** (robuuste voordeur voor 200 MB+), daarna
   **Cloudflare Worker** doet de resumable upload R2 → Drive **project folder**.
2. **Per-partner isolatie:** eigen **map** per partner = de bestaande **project folder** in de
   Shared Drive. Geen aparte Shared Drive per partner; nooit de SHARED-map gebruiken.
3. **Web-form-link** vervangt het gekopieerde Google-doc in de bestaande partner-mail.
4. **Toegangsmodel:** gebruiker levert tokens/toegang (Cloudflare API-token + Google
   service-account met toegang tot Shared Drive `0AMl3InXspt_qUk9PVA`).
5. **Hosting:** Cloudflare Pages via `tools@`, niet Vercel.

### Per-partner provisioning (de backbone)

Alles hangt aan één **token**. Make creëert per partner in één run: token + project folder
(bestaat al) + registry-rij + web-form-link. Antwoorden én uploads routeren puur op token,
zodat niets handmatig verplaatst hoeft te worden en niets door elkaar loopt.

### Beveiliging / aandachtspunten

- **Alleen de form publiceren**, niet de repo-root. `New partner onboarding.blueprint.json`
  (bevat interne sheet-/folder-/connectie-ID's) en de brand-assets mogen NIET publiek op
  Cloudflare Pages staan. Deploy een aparte `public/`-map met enkel `index.html` (+ favicon).
- Service-account heeft **alleen** toegang tot de onboarding-Shared-Drive, niets breder.
- Token is opaak (geen folder-ID in de URL).

## Vormgeving (brand)

- Logo: inline `LOGO_SS_Web.svg` (wordmark) in de topbar; `fill` → `currentColor` zodat
  dark/light meekleurt. Favicon: `LOGO_SS_Solo_Web.svg` (solo-S).
- Kleuren kloppen al: Lime `#B2FA63` primair op zwart; Sun `#FF7833` optioneel als secundair
  accent. Inter blijft (gesanctioneerde web-fallback voor Neue Haas Grotesk).
- Toevoegen: favicon, `<meta>`/OG-tags (og:image pas mogelijk na hosting → absolute URL).

## Inhoud / vragen

- **Naam + bedrijf** aan het begin (handmatig, want koppeling met opdrachtbrief is nog niet
  automatisch). Later evt. prefill van bedrijf uit de registry op basis van token.
- **Document-upload sectie** met concrete voorbeelden (brandbook, beeldmateriaal/productfoto's,
  regulations & legal, tone-of-voice) — UI + R2-wiring samen in de opslag-fase.
- Vragen klaarmaken voor review door **Gijs**; jargon versimpelen; feedback verwerken.

## Fasering (ship small)

1. **Spec + opschonen** — deze spec; duplicaat weg; `.gitignore`; hernoem naar `index.html`;
   eerste commit. *(geen toegang nodig)*
2. **Branding / small-fixes** — echt logo, favicon, meta/OG, kleur/typografie-check,
   naam+bedrijf-velden. *(geen toegang nodig)*
3. **Cloudflare hosting** — `public/index.html` op Pages, subdomein + DNS, `?c=`-linkstructuur.
   *(Cloudflare API-token + subdomein + waar DNS gezaghebbend is)*
4. **Opslag** — gestaffeld: (a) antwoorden → `Questionnaire answers`-tab;
   (b) R2-upload vanuit de form; (c) Worker-mover R2 → project folder;
   (d) Make uitbreiden: registry-rij + token + web-form-link in de mail.
   *(Cloudflare token met R2/Workers, Google service-account, Shared-Drive-toegang)*
5. **Document-upload sectie** (UI + wiring) + **review door Gijs** + feedback verwerken.

## Wat nodig is van de gebruiker (per fase)

- Fase 1–2: niets (logo-assets staan al in de repo).
- Fase 3: Cloudflare `tools@` API-token (Pages + DNS) + account-ID; gewenst subdomein
  (bijv. `onboarding.sprintsandsneakers.com`); waar DNS gezaghebbend is (Cloudflare/Hostnet).
- Fase 4: Cloudflare token met **Workers + R2**; een Google **service-account** (JSON-key)
  toegevoegd als lid van Shared Drive `0AMl3InXspt_qUk9PVA`; akkoord op de twee nieuwe
  Sheet-tabs; toegang om het Make-scenario uit te breiden.

## Open punten (later)

- Aparte B2B-variant (apart traject).
- Extra vragen vanuit productleads (kan de lijst uitbreiden).
- Of `Questionnaire registry`/`answers` in de bestaande onboarding-spreadsheet komen of een aparte.
