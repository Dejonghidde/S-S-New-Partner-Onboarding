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
| 00 | [Echte foutmelding in live](ticket-00-live-foutmelding.md) | go per wijziging | Open |
| 01 | [Playbook-kopieerstap schrappen](ticket-01-live-playbook-schrappen.md) | go per wijziging | Open |
| 02 | [Spike: service-account + bot-scopes](ticket-02-spike-service-account-en-scopes.md) | geen | Open |
| 03 | [Teamconfig- en registry-tabs](ticket-03-teamconfig-en-registry-tabs.md) | 02 (zacht) | Open |
| 04 | [Generieke route e2e, één team](ticket-04-generieke-route-een-team.md) | 02, 03 | Open |
| 05 | [Uitrol alle teams + Rho](ticket-05-uitrol-alle-teams-en-rho.md) | 04 | Open |
| 06 | [Webhook-lus Worker + Make](ticket-06-webhook-lus-worker-en-make.md) | 03, wrangler-toegang | Open |
| 07 | [Monday-status + reminders](ticket-07-monday-status-en-reminders.md) | 04/05, 06 | Open |
| 08 | [Brevo-mail](ticket-08-brevo-mail.md) | 05, Brevo-domeinauth | Open |
| 09 | [Form-verrijking](ticket-09-form-verrijking.md) | 03, 04 | Open |
| 10 | [Cutover + DoD-verificatie](ticket-10-cutover-en-dod-verificatie.md) | alles, go | Open |

Tickets 00 en 01 (live-stabilisatie) kunnen parallel aan de bouwlijn 02 t/m 10. Ticket 06 kan parallel aan 04/05 zodra 03 klaar is.
