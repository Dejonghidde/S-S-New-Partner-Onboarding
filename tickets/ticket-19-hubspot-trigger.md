# Ticket 19: HubSpot-trigger bouwen naast het Slack-form

## Doel van dit ticket
Een gewonnen deal in HubSpot start automatisch dezelfde generieke onboarding-route als het Slack-form. Dag 0 wordt de dag van de handtekening; het form blijft bestaan als handmatige start en fallback.

## Hoort bij
Masterplan fase 3, stap 3.2 (pijlers P1 en P4). Bouwt exact op het beslisdocument uit ticket 18.

## Context voor de sessie
- Lees eerst: `Onboarding workflow/HubSpot-Trigger-Beslisdocument.md` (ticket 18; zonder dat document en de go van Bart/Gijs start dit ticket niet), masterplan fase 3, en module 2 van scenario 6525431 (de veldverwerking waar de trigger op moet aansluiten).
- Architectuurprincipe: één route, twee ingangen. De HubSpot-trigger levert dezelfde velden af als het form (zelfde structuur), zodat de generieke route, zachte poort, registry en alle vervolgstappen ongewijzigd blijven. De minst invasieve variant heeft de voorkeur (bijvoorbeeld: HubSpot schrijft via Make een rij in dezelfde Form Responses-tab, met startedBy "HubSpot"; dan verandert er stroomafwaarts niets).
- Dedupe volgens de strategie uit ticket 18: een deal start maar één onboarding; een dubbele start (form plus HubSpot) geeft een melding, geen stille tweede run.
- Zachte poort blijft: ontbrekende velden stoppen de run niet, het gemis wordt zichtbaar (subitem "Ontbrekende intake-info" plus melding aan de starter/dealowner).

## Opdracht
1. Bouw de trigger volgens het beslisdocument (webhook vanuit een HubSpot-workflow of native Make-trigger) in een apart, inactief scenario of als extra ingang van 6525431; motiveer de keuze kort in het aanpassingenoverzicht.
2. Implementeer de veldmapping uit het beslisdocument, inclusief de afgesproken defaults voor velden die HubSpot niet levert (partner_type, taal) en de dedupe-check.
3. Test end-to-end met een testdeal: deal naar de afgesproken stage, controleer dat het volledige pakket ontstaat (folders, DPA, Monday-item plus subitems, registry-rij, welkomstmail naar een testadres) en dat een tweede trigger op dezelfde deal alleen een melding geeft.
4. Test de fallback: het Slack-form werkt ongewijzigd naast de nieuwe ingang.
5. Documenteer voor sales in vijf regels wat er gebeurt als ze een deal winnen en wat ze moeten vullen.

## Poortjes (alleen met go van Hidde)
- Alles wat in HubSpot wordt aangemaakt of gewijzigd (workflow, property): per wijziging go.
- Activeren van de trigger op echte deals.

## Klaar wanneer
- [ ] Testdeal levert end-to-end hetzelfde pakket als het Slack-form, inclusief registry-rij en subitems.
- [ ] Dedupe aantoonbaar: tweede trigger geeft melding, geen tweede pakket.
- [ ] Slack-form werkt ongewijzigd; sales-instructie van vijf regels ligt er.
- [ ] Gelogd en gecommit; activering alleen met go.

## Afhankelijk van
Ticket 18 (beslisdocument plus go van Bart/Gijs). Ticket 10 (cutover) voor activering op echte deals.
