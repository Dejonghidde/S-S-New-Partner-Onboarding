# Project: New Partner Onboarding (S&S)

## Wat dit is
Het herontwerp van de nieuwe-partner-onboarding van Sprints & Sneakers: van getekend contract tot "partner klaar om te growth-hacken". Twee sporen: de Make-automation (ruggengraat) en de Cloudflare-vragenlijst (al live).

## Doel
Een onboarding die betrouwbaar draait (geen persoonsgebonden connecties, geen stille fouten), het team startklaar maakt, en de partner vanaf dag 1 regie en vertrouwen geeft. "Af" wordt hard gedefinieerd in `spec/spec.md`.

## Werkwijze
We volgen de methode in `docs/Werkwijze-AI-Digitale-Systemen-Bouwen.md` (8 fasen: doel, spec, tickets, bouwen, verifieren, live, leren). De spec is de gedeelde waarheid. Teach-back en poortjes horen erbij.

## Mappen
- `spec/` de gedeelde waarheid (spec.md + Definition of Done). Leidend bij twijfel.
- `tickets/` de brokken werk, een ticket per sessie.
- `Onboarding workflow/` analyse, briefings en het contextdossier (bron/kennis).
- `New-Vragenlijst/` de vragenlijst-webapp (spoor B, al live) + eigen specs.
- `Documenten Onboarding/` bronbestanden (playbook, tooling guide). Niet blind aanpassen.
- `S&S Brand Assets/` logo's en fonts voor on-brand deliverables.
- `docs/` de werkwijze en achtergrond.

## Werkafspraken
- Lees eerst `spec/` en `Onboarding workflow/Contextdossier-Onboarding-Herontwerp.md` voordat je bouwt.
- Feiten zoek je zelf op (repo, MCP-connectors, web). Keuzes leg je aan mij voor.
- Voor tickets 11 en hoger geldt het autonome sessieprotocol in `tickets/README.md` (besluit 2026-07-14): bouw en ontwerp zelfstandig, log je keuzes; poortjes (mijn go vooraf) alleen bij live/actieve scenario's, partner-facing livegang, externe verzending en HubSpot-wijzigingen. De twee-zinnen-regel hieronder geldt alleen nog voor werk buiten die tickets.
- Voor je bouwt (buiten tickets 11+): vertel in twee zinnen je aanpak en wacht op groen licht. Teach-back voor grote stappen.
- Bouw een ticket per keer, in een schone sessie. Leg werkend werk vast in git (kleine commits).
- Local-first. Zet niets naar buiten zonder mijn akkoord. Poortje voor live.
- Make: bouw en test in sandbox `6226897`. Raak het live scenario `3059444` nooit aan zonder mijn expliciete go per wijziging.
- Bewerk de blueprint-JSON-exports in de repo NIET om een fix te simuleren; dat zijn snapshots die het live scenario niet aansturen. Live wijzigingen horen in het echte Make-scenario; besluiten log je in `Onboarding workflow/Onboarding-Aanpassingen-Overzicht.md`.
- Credentials: gebruik geautoriseerde MCP-sessies. Vraag mij niet om tokens te plakken.
- Copy: Nederlands, geen gedachtestreepjes (em-dashes). Gebruik komma's, dubbele punten of haakjes.
- Partner-facing deliverables: gebruik de `ss-brand-style` skill (plus een front-end design skill voor UI) en maak screenshots ter controle.

## Wat vaak misgaat (aanvullen na elk project)
- Persoonsgebonden connecties in Make breken de keten. Gebruik service-account, bot-token en API-tokens, niet iemands OAuth.
- Blueprint-exports hand-editen geeft een vals gevoel van "afgehandeld". Doe de echte wijziging in het live systeem.
- Em-dashes in copy sluipen er zo in. Vermijd ze.
- Steeds nieuwe overlappende documenten maken in plaats van naar een spec te convergeren.
