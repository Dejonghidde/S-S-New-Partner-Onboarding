# Ticket 02: Spike: service-account in Make + Slack-bot-scopes

## Doel van dit ticket
De enige technische onzekerheid onder de spec wegnemen: bewijzen hoe Google-acties in Make zonder persoonsgebonden OAuth kunnen, en vaststellen of de bot-token de benodigde Slack-rechten heeft.

## Hoort bij
Spec 3.9 en beslislog #5, fasering plak 1 (eerste bouwticket). Valideert de aannames onderaan spec sectie 5.

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: in sandbox 6226897 één Drive-map aanmaken via (a) een native Google Drive-module met service-account-connectie; lukt dat niet, dan (b) een HTTP-module met JWT-flow zoals de Cloudflare Worker al doet (service-account id-onboarding-uploader@ of een nieuwe SA met eigen key). Parallel: de scopes van bot-token 6773974 inventariseren tegen wat de flow nodig heeft (kanaal aanmaken publiek en privé, users uitnodigen, bericht sturen, pinnen) en het gat benoemen.

## Klaar wanneer
- [ ] Een sandbox-run maakt een Drive-map aan zonder enige persoonsgebonden connectie.
- [ ] Beslisnotitie toegevoegd aan de spec-beslislog: native SA, HTTP+SA of via de Worker, met reden.
- [ ] Scopes-lijst van de bot-token gedocumenteerd, inclusief ontbrekende scopes en hoe die toe te voegen (app-configuratie + herinstallatie).
- [ ] Eventuele gevolgen voor de tijdlijn of aanpak gemeld aan Hidde.

## Afhankelijk van
Niets. Dit gaat vóór tickets 03 en verder.
