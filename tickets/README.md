# tickets/ : de brokken werk

De spec (`spec/spec.md`, goedgekeurd 2026-07-10) is opgeknipt in de tickets hieronder (werkwijze fase 3, template T5). Elk ticket is een brok die je in één schone sessie bouwt en verifieert.

## Regels
- Een ticket per sessie, sessie schoon starten.
- Voor je bouwt: aanpak in twee zinnen voorleggen en wachten op groen licht (staat per ticket onder "Aanpak").
- Bouw in sandbox `6226897`. Raak het live scenario `3059444` nooit aan zonder expliciete go per wijziging (geldt voor tickets 00 en 01).
- Elk ticket heeft een "klaar wanneer" met toetsbare checks. Werkend werk vastleggen in git.
- Besluiten en live-wijzigingen loggen in `Onboarding workflow/Onboarding-Aanpassingen-Overzicht.md`.

## Volgorde en status

| # | Ticket | Afhankelijk van | Status |
|---|---|---|---|
| 00 | [Echte foutmelding in live](ticket-00-live-foutmelding.md) | go per wijziging | Gebouwd in 6226897 (2026-07-10); e2e-test + live-overzetting bij cutover |
| 01 | [Playbook-kopieerstap schrappen](ticket-01-live-playbook-schrappen.md) | go per wijziging | Gedaan in 6226897 (2026-07-10); live-overzetting bij cutover |
| 02 | [Spike: service-account + bot-scopes](ticket-02-spike-service-account-en-scopes.md) | geen | Gedaan (2026-07-10): Drive via Worker-endpoints bewezen |
| 03 | [Teamconfig- en registry-tabs](ticket-03-teamconfig-en-registry-tabs.md) | 02 (zacht) | Gedaan (2026-07-11) in apart V1-spreadsheet; Slack-ids nog checken door Hidde |
| 04 | [Generieke route e2e, één team](ticket-04-generieke-route-een-team.md) | 02, 03 | Gebouwd (2026-07-11): scenario 6525431, inactief; e2e-test met go |
| 05 | [Uitrol alle teams + Rho](ticket-05-uitrol-alle-teams-en-rho.md) | 04 | Gebouwd (2026-07-11): zit in 6525431 (teamconfig + aparte Rho-route) |
| 06 | [Webhook-lus Worker + Make](ticket-06-webhook-lus-worker-en-make.md) | 03, wrangler-toegang | Gebouwd (2026-07-11): Worker live, webhook 3377014, scenario 6525439 inactief |
| 07 | [Monday-status + reminders](ticket-07-monday-status-en-reminders.md) | 04/05, 06 | Gebouwd (2026-07-11): 4 kolommen op Client overview + scenario 6525442 inactief |
| 08 | [Brevo-mail](ticket-08-brevo-mail.md) | 05, Brevo-domeinauth | Open: wacht op Brevo-key + domeinauth (mail draait interim op bestaande accounts) |
| 09 | [Form-verrijking](ticket-09-form-verrijking.md) | 03, 04 | Deels: V1 leest de nieuwe velden al (met defaults); form + kolommen K/L/M is handwerk Hidde |
| 10 | [Cutover + DoD-verificatie](ticket-10-cutover-en-dod-verificatie.md) | alles, go | Open: e2e-verificatie + activatie, expliciete go |

Tickets 00 en 01 (live-stabilisatie) kunnen parallel aan de bouwlijn 02 t/m 10. Ticket 06 kan parallel aan 04/05 zodra 03 klaar is.

**Bouwstand 2026-07-11:** de V1-herbouw staat als drie nieuwe, inactieve Make-scenario's: `6525431` (hoofdflow, generiek + Rho + fallback), `6525439` (vragenlijst-lus op webhook `3377014`), `6525442` (reminders). Configuratie en registry staan in het V1-spreadsheet `1FQjIGn8-tMU4ZE9-hiu0RT_xWeKEAdq6EI4OXvg9Gcw` (tabs Teamconfig + Registry). Niets is geactiveerd: activatie is de cutover (ticket 10) en vereist Hiddes go. Details en restpunten in `Onboarding workflow/Onboarding-Aanpassingen-Overzicht.md` punt 12.
