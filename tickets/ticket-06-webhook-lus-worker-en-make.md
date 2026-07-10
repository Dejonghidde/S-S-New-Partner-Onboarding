# Ticket 06: Vragenlijst-lus sluiten (Worker-webhook + quarantaine)

## Doel van dit ticket
Een vragenlijst-inzending is binnen minuten zichtbaar voor S&S, en een inzending met kapotte link verdwijnt nooit meer stil in de root.

## Hoort bij
Spec 3.6, beslislog #7 en #13; fasering plak 4. DoD-punten 5, 6 en 15.

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: (1) Make custom webhook aanmaken (verbindingsloos); (2) in de Worker (New-Vragenlijst/specs/worker/src/index.js) na een geslaagde submit een POST naar die URL met folder-id, bedrijfsnaam, kind (B2B/B2C; B2C krijgt ook een kind-label mee) en doc-link, via ctx.waitUntil zodat de partner er niet op wacht; (3) FALLBACK_FOLDER_ID omzetten naar een aparte quarantainemap en die fallback ook een webhook-melding laten geven; (4) de ruwe Google-fouttekst uit de client-responses halen; (5) Make-scenario op de webhook dat registry en Slack bijwerkt (Monday volgt in ticket 07). Deploy via wrangler op tools@ (Hidde of iemand met toegang), local-first getest.

## Klaar wanneer
- [ ] Test-inzending: status "binnen" plus doc-link in de registry en een Slack-melding bij het team, binnen 5 minuten.
- [ ] Test met kapotte ?c-link: doc in de quarantainemap plus melding; de root blijft leeg.
- [ ] Test met Google-fout: de client krijgt een nette foutmelding zonder interne details.
- [ ] Webhook-URL staat als secret/env-var in de Worker, niet hardcoded in git.

## Afhankelijk van
Ticket 03 (registry). Wrangler-deploy-toegang op tools@ (open vraag uit de spec).
