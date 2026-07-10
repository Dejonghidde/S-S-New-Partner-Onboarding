# Ticket 02: Spike: service-account in Make + Slack-bot-scopes

## Doel van dit ticket
De enige technische onzekerheid onder de spec wegnemen: bewijzen hoe Google-acties in Make zonder persoonsgebonden OAuth kunnen, en vaststellen of de bot-token de benodigde Slack-rechten heeft.

## Hoort bij
Spec 3.9 en beslislog #5, fasering plak 1 (eerste bouwticket). Valideert de aannames onderaan spec sectie 5.

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: in sandbox 6226897 één Drive-map aanmaken via (a) een native Google Drive-module met service-account-connectie; lukt dat niet, dan (b) een HTTP-module met JWT-flow zoals de Cloudflare Worker al doet (service-account id-onboarding-uploader@ of een nieuwe SA met eigen key). Parallel: de scopes van bot-token 6773974 inventariseren tegen wat de flow nodig heeft (kanaal aanmaken publiek en privé, users uitnodigen, bericht sturen, pinnen) en het gat benoemen.

## Klaar wanneer
- [x] Beslisnotitie: native SA bestaat niet in Make's Google Drive-app (bevestigd via app-documentatie + `connection-metadata_get`). Gekozen: via de Worker (bestaande service-account hergebruiken), niet losse HTTP+JWT in Make zelf.
- [x] Nieuwe Worker-route `POST /api/internal/drive-folder` gebouwd + gecommit (`New-Vragenlijst/specs/worker/src/index.js`), gedeeld secret via `X-Internal-Key`-header.
- [x] Make-testmodule (Tool `6517176`, "Spike: Drive folder via service-account") aangemaakt in team 43614, klaar om te testen.
- [x] Bewezen: `POST /api/internal/drive-folder` maakt een echte Drive-map aan via de service-account, geen persoonsgebonden connectie. Test: map-id `1rizHNIfUqbI87whaLvlc_MqItvfHsdaA` (2026-07-10, direct getest met curl, niet via een Make-scenario).
- [x] Scopes-lijst van de kandidaat-bot-connecties gedocumenteerd: `2654756` (SNS Monday Bot) en `2022740` (Quollie) hebben beide 8 scopes (chat:write, chat:write.public, chat:write.customize, channels:read, groups:read, im:read, mpim:read, users:read). Ontbrekend voor de flow: `channels:manage`, `groups:write`, `pins:write` (kanaal aanmaken, privékanaal, pinnen). Niet 6773974 gebruiken (dat is Hidde's persoonlijke OAuth, zie ticket 00-bevinding).
- [x] Gevolg gemeld: Slack-app moet herscoped + herïnstalleerd worden vóór ticket 03/05 (kanaal aanmaken/uitnodigen nodig).

## Nog te doen door Hidde
1. `wrangler secret put MAKE_INTERNAL_KEY` op de Worker (zelf een waarde kiezen).
2. Diezelfde waarde plakken in Make-tool `6517176` → module → header `X-Internal-Key`.
3. Worker deployen (`wrangler deploy` vanuit `New-Vragenlijst/specs/worker/`).
4. Los, niet blokkerend voor nu: Slack-app scopes uitbreiden (`channels:manage`, `groups:write`, `pins:write`) + herinstalleren, nodig vóór ticket 03/05.

## Afhankelijk van
Niets. Dit gaat vóór tickets 03 en verder.
