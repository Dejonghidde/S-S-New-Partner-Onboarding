# Ticket 11: Granulaire Monday-subitems met reminders en escalatie

## Doel van dit ticket
Elke handmatige onboardingstap is een los, bewaakt Monday-subitem onder het partner-item, met eigenaar, dag-3 reminder en dag-5 escalatie. De bundelkolom "Access & kickstart" toont voortaan een samenvatting in plaats van het enige signaal te zijn.

## Hoort bij
Masterplan fase 1, stap 1.1 (pijler P3). Spec deel 2, sectie 12.1 (Blok A), beslislog E1 en E5.

## Context voor de sessie
- Lees eerst: `spec/spec.md` deel 2, `Onboarding workflow/Masterplan-New-Partner-Onboarding.md` sectie 3 fase 1, en dit ticket.
- Het Client overview-board (3337611330) heeft een ongebruikte native Subitems-kolom. De bestaande statuskolommen: Vragenlijst (`color_mm55t9hn`), Onboarding pakket (`color_mm55bhm1`), Access & kickstart (`color_mm551f8`), Vragenlijst antwoorden (`link_mm55b40b`).
- Het reminder-scenario `6525442` (inactief) scant nu dagelijks 09:00 de registry-kolommen X t/m AB (OPEN-waarden) en meldt in het interne teamkanaal.
- Het partner-scenario `6525431` (inactief) maakt het Client overview-item aan (module 19 growth, module 41 Rho).
- Bouw in de inactieve V1-scenario's; het live scenario 3059444 blijft onaangeraakt.

## Opdracht
1. Partner-run breidt uit: na het aanmaken van het Client overview-item maakt de flow zes subitems aan: (1) Partner in extern Slack-kanaal, (2) Partner op Monday-board, (3) Kickstart-meeting ingepland, (4) LastPass-map aangemaakt, (5) Brandbook + tone-of-voice binnen, (6) Ontbrekende intake-info (alleen als de zachte poort iets mist, met het gemis in de subitem-naam). Elk subitem krijgt de teamlead/lead als eigenaar en een due date (aanmaakdatum + 3 werkdagen).
2. Reminder-scenario ombouwen: scant de subitems van partners in de onboardingfase in plaats van (of naast) de registry-kolommen. Open subitem ouder dan 3 werkdagen: reminder in het interne teamkanaal met partnernaam en itemnaam. Ouder dan 5 werkdagen: DM naar Hidde (D0ATPSA2GAX).
3. Bundelkolom "Access & kickstart" wordt samenvatting: To do (alles open), Partially Done (deels), Done (alles af), bijgewerkt door het reminder-scenario bij elke run.
4. Rho-tak: zelfde subitems minus wat daar niet geldt; check de Rho-route en beslis per item.

## Ontwerpkeuzes die de sessie zelf maakt (met aanbeveling)
- Bron van waarheid voor de handmatige items: aanbeveling subitems (het team werkt in Monday); het reminder-scenario synct de registry-kolommen X t/m AB dagelijks vanuit de subitems zodat de registry compleet blijft als machinebron.
- Subitems aanmaken via de bestaande Monday-connectie (8950423) met GraphQL (`create_subitem`); native Make-modules ondersteunen subitems beperkt.

## Poortjes (alleen met go van Hidde)
- Activeren van scenario's die op echte partners draaien.
- Wijzigingen aan het live scenario 3059444: nooit.

## Klaar wanneer
- [ ] Testpartner-run maakt de subitems aan met eigenaar en due date; het gemis-subitem verschijnt alleen bij een onvolledige intake.
- [ ] Bewust open gelaten subitem geeft na de (verkort geteste) termijn een reminder, en na de tweede termijn een escalatie-DM.
- [ ] Bundelkolom volgt de subitems aantoonbaar in de drie standen.
- [ ] Registry blijft kloppend (sync of expliciet gelogd besluit dat de kolommen vervallen).
- [ ] Wijzigingen gelogd in Onboarding-Aanpassingen-Overzicht.md, werk gecommit.

## Afhankelijk van
Ticket 10 (cutover) hoeft niet af te zijn: bouwen kan in de inactieve scenario's. Activeren gaat mee met of na de cutover.
