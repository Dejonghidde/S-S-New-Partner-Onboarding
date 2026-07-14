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

## Sessielog (2026-07-14): scaffold, vooruitlopend op ticket 18

Dit ticket start formeel pas na het beslisdocument van ticket 18 én het akkoord van Bart/Gijs (die er in deze sessie niet zijn) — dus geen echte HubSpot-trigger aangesloten of geactiveerd. Wel alvast, in de test-omgeving, het niet-HubSpot-specifieke deel gebouwd en getest: de architectuur uit de opdracht ("HubSpot schrijft via Make een rij in dezelfde Form Responses-tab, met startedBy 'HubSpot'") is precies uitgetest.

- Echte kolomstructuur van de live "Form Responses"-tab uitgelezen (alleen gelezen, niet gewijzigd): Company name, Partner - first name, Partner - email, Partner - phone number, Assigned team, Link to assignment letter, Link to handover, Project kickstart meeting planned?, Submitted By, Timestamp, Partner type, Taal partnercommunicatie.
- TEST-kopie van die structuur aangemaakt (lege sheet, geen echte klantdata gekopieerd, bewust).
- Scaffold-scenario gebouwd en getest: gesimuleerde HubSpot-velden (leeg waar HubSpot volgens de eerste steekproef geen bron heeft: team/letter/handover) worden weggeschreven als nieuwe rij met `Submitted By = HubSpot`, defaults voor partner_type/taal. Test-run geslaagd, rij correct weggeschreven en gecontroleerd.
- **Dedupe-check nog niet automatisch getest**: het mechanisme (zoek Registry op bedrijfsnaam vóór het schrijven, meld in plaats van een tweede rij) is hetzelfde patroon als ticket 11's item-lookup en is dus technisch bewezen, maar de conditionele vertakking zelf (schrijf alleen als niet gevonden) is in deze sessie niet als aparte geteste module gebouwd — kost een router met telling, vergelijkbaar met de bundelkolom-sync uit ticket 11. Volgt zodra ticket 18 een echte trigger oplevert om op te bouwen.
- Zodra het beslisdocument van ticket 18 er is (inclusief welke HubSpot-stage/pipeline en welke velden echt ontbreken) en Bart/Gijs akkoord geven: dit scaffold uitbreiden met de echte HubSpot-trigger-module en de dedupe-vertakking, en pas dan de "klaar wanneer"-punten hierboven afvinken.

## Afhankelijk van
Ticket 18 (beslisdocument plus go van Bart/Gijs). Ticket 10 (cutover) voor activering op echte deals.
