# Ticket 13: Kickstart-standaardformat, handover als startvoorwaarde, dag-0 scheduling

## Doel van dit ticket
Geen kickstart meer zonder vastgelegde afspraken: een vast format dat de accountlead tijdens elke kickstart invult, een proces-gate (geen kickstart-bevestiging zolang assignment letter of handover ontbreekt), en een manier om de kickstart al vanaf dag 0 in te plannen via de welkomstmail.

## Hoort bij
Masterplan fase 4, stap 4.1 (pijlers P1 en P3). Spec deel 2, sectie 12.2 (Blok B), beslislog E2 en E3. Lost Sharifs kernklacht op (trajecten starten ongecontroleerd, niet volgens opdrachtbrief).

## Context voor de sessie
- Lees eerst: masterplan fase 4, spec deel 2 secties 12.2 en 13, en de open vragen in spec sectie 18 (waar leeft het format, welke scheduling-tool).
- Er bestaat al een "Project kickstart and first acquaintance meeting template" (Google Slides, link zit in het interne Slack-statusbericht van de flow). Beoordeel of dit de basis wordt of dat een strakker invulformat nodig is.
- De Teamconfig-tab (V1-spreadsheet `1FQjIGn8-tMU4ZE9-hiu0RT_xWeKEAdq6EI4OXvg9Gcw`) is de plek voor per-team-configuratie; een kolom `kickstart_scheduling_link` past daar.
- Subitem "Kickstart-meeting ingepland" bestaat na ticket 11.

## Opdracht
1. Ontwerp het kickstart-format met exact deze vaste onderdelen: succescriteria voor deze onboarding (wanneer is deze partner klaar om te growth-hacken), rollen en contactpersonen aan beide kanten, communicatieritme (frequentie en kanaal), eerste-waardemijlpaal met datum, en bevestiging van de research-pack-aannames (koppeling met ticket 16; werkt ook zonder pack).
2. Kies waar het format leeft en doe een onderbouwd voorstel aan Hidde (asynchroon, geen blokkade om alvast te bouwen): Google Doc-template dat de flow per partner kopieert naar de partnermap (aanbeveling: hergebruikt het bestaande kopieerpatroon en is direct deelbaar), of een Monday-doc/update op het partner-item.
3. Proces-gate beschrijven en inbouwen in het format zelf: bovenaan een verplicht blok "startvoorwaarden" (assignment letter aanwezig, handover aanwezig, research pack gereviewd) dat de accountlead afvinkt; staat er iets op ontbreekt, dan bevestigt de accountlead de kickstart-afspraak niet, tenzij bewust overruled (met naam en reden).
4. Dag-0 scheduling: voeg de kolom `kickstart_scheduling_link` toe aan Teamconfig, vul per team een Google Calendar-afsprakenpagina van de accountlead (of laat leeg waar die nog niet bestaat, met fallback-zin in de mail), en neem de link op in de slotalinea van de welkomstmail (de plek is gereserveerd in ticket 12).
5. Als de flow het format als kopie in de partnermap zet: bouw die kopieerstap in scenario 6525431 (zelfde patroon als de DPA-kopie) en link het doc in het interne Slack-statusbericht.

## Poortjes (alleen met go van Hidde)
- Mail-wijziging (scheduling-link) in het actieve scenario.
- Definitieve keuze van de format-locatie bevestigt Hidde; bouwen op de aanbeveling mag alvast.

## Klaar wanneer
- [ ] Format-template bestaat, on-brand, met startvoorwaarden-blok en de vijf vaste onderdelen.
- [ ] Teamconfig heeft de scheduling-kolom; de mail toont de link (of nette fallback) per team.
- [ ] Testpartner-doorloop: format gekopieerd naar de partnermap, ingevuld, gelinkt op het Monday-item; subitem "Kickstart ingepland" afgevinkt.
- [ ] Proces beschreven in een korte instructie voor accountleads (waar het format staat, wat de gate betekent).
- [ ] Gelogd en gecommit.

## Afhankelijk van
Ticket 11 (subitem bestaat), ticket 12 (mail-slotalinea). Ticket 16 is wenselijk maar niet blokkerend.
