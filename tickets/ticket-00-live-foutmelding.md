# Ticket 00: Echte foutmelding in het live scenario

## Doel van dit ticket
Als het live scenario 3059444 faalt of stilvalt, ziet het team dat binnen 15 minuten in een vast Slack-alertkanaal, met partnernaam en echte oorzaak. Nu is het omgekeerd: 4 "Error"-DM's vuren bij succes en falen blijft stil.

## Hoort bij
Spec 3.7 (foutafhandeling) en 3.9 (live-wijzigingen), fasering plak 0. DoD-punt 4 en 17.

## Aanpak (agent vult in, Hidde keurt goed)
**Bouwen en verifiëren gebeurt in de kopie `6226897`, niet in `3059444`.** Live draait 100% en verwerkt doorlopend echte onboardingen; hij mag tijdens de bouw niet worden aangeraakt, ook niet read-only. Overzetten naar live is een aparte, latere stap: per wijziging met expliciete go, op een moment dat Hidde daarvoor kiest.

Voorstel (eerst in 6226897): (1) alertkanaal kiezen of aanmaken; (2) de 4 sequentiële "Error"-modules (349 Sigma, 348 Phi, 350 Rho, 352 Alpha, of hun equivalent in 6226897) verwijderen; (3) onerror-handlers op de kritieke modules per route naar het alertkanaal via bot-token 6773974, met dynamische fouttekst in plaats van de hardcoded "Invalid refresh token"; (4) Make's e-mailnotificatie bij scenariofouten en deactivering aanzetten als vangnet. Let op: een AccountValidationError vuurt vóór de eerste module, die vangt alleen het mailvangnet.

## Klaar wanneer
- [ ] Een geforceerde testfout in **6226897** geeft binnen 15 minuten een melding in het alertkanaal met partnernaam en oorzaak.
- [ ] Een normale succesvolle run in **6226897** geeft géén foutmelding (valse succes-DM's zijn weg).
- [ ] Scenariodeactivering (bijv. door connectiefout) geeft een e-mailnotificatie.
- [ ] (Aparte, latere stap) De geverifieerde fix is overgezet naar live 3059444, per wijziging met go van Hidde, op een moment dat hij kiest, en gelogd in Onboarding-Aanpassingen-Overzicht.md.

## Afhankelijk van
Niets voor de bouw in 6226897 (kan direct). Het overzetten naar live 3059444 vereist expliciete go per wijziging én een apart, door Hidde gekozen moment (live mag niet verstoord worden terwijl er onboardingen doorheen lopen).
