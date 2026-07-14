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
- [x] Testpartner-run maakt de subitems aan met eigenaar en due date; het gemis-subitem verschijnt alleen bij een onvolledige intake. Getest in de test-omgeving (zie sessielog 2026-07-14, deel 2): beide takken (met en zonder gemis) geverifieerd.
- [ ] Bewust open gelaten subitem geeft na de (verkort geteste) termijn een reminder, en na de tweede termijn een escalatie-DM. Logica gebouwd en functioneel getest (geen foutmelding, correcte no-op op verse subitems); de 3-dagen/5-dagen-drempel zelf kon niet end-to-end getest worden omdat Monday's `created_at` van een subitem niet terug te zetten is via de API. Echte tijdsverloop-test hoort bij Hidde's eigen e2e-test.
- [x] Bundelkolom volgt de subitems aantoonbaar in de drie standen. Getest: To do (alles open) → Partially Done (1 van 6 Done) → Done (6 van 6 Done), alle drie states bevestigd op het testboard.
- [ ] Registry blijft kloppend (sync of expliciet gelogd besluit dat de kolommen vervallen). Bewust uitgesteld deze sessie (zie sessielog deel 2): geen sync gebouwd, geen kolommen laten vervallen — open gelaten als vervolgstap, hier expliciet gelogd zodat het niet stil blijft liggen.
- [x] Wijzigingen gelogd in Onboarding-Aanpassingen-Overzicht.md, werk gecommit.

## Afhankelijk van
Ticket 10 (cutover) hoeft niet af te zijn: bouwen kan in de inactieve scenario's. Activeren gaat mee met of na de cutover.

## Sessielog (2026-07-14)

Ontworpen en gevalideerd, nog niet aangemaakt in Make. Volledige onderbouwing, ontwerpkeuzes en blokkade staan in `Onboarding-Aanpassingen-Overzicht.md` sectie 16. Kort:

- **Nieuw, los scenario "Onboarding V1 - subitems aanmaken"** in plaats van een uitbreiding van 6525431: dat scenario bleek 923.555 tekens (32.096 regels), te groot om in één API-call terug te sturen. Het nieuwe scenario luistert op nieuwe Registry-rijen, zoekt het Client overview-item op naam op en maakt de zes subitems aan (eigenaar + due date, zowel leesbaar in de naam als gestructureerd in kolommen "person"/"datum"). Blueprint volledig opgebouwd en getest tegen Make's schema-/RPC-validators (`validate_blueprint_schema`: geldig).
- **Reminder-scenario 6525442**: ombouw naar subitem-scan, dag-5-escalatie naar Hidde, bundelkolom-sync en registry-sync (kolommen X/Y/AA/AB) uitgewerkt op specniveau (zie Aanpassingen-Overzicht), nog niet als blueprint gebouwd omdat de eerste blokkade dat zinloos maakte.
- **Blokkade:** het aanmaken van het nieuwe scenario is geweigerd door de permissieklassifier (schrijft naar live Registry-sheet + live Client overview-board, ook al blijft het scenario inactief). Gevalideerde blueprint staat klaar in de sessie-scratchpad. Wacht op akkoord van Hidde om aan te maken (blijft daarna nog steeds inactief tot een aparte go voor activeren, conform sessieprotocol).
- Klaar-wanneer-items zijn dus nog niet af te vinken: geen testpartner-run mogelijk zonder eerst het scenario te mogen aanmaken.

## Sessielog deel 2 (2026-07-14): test-omgeving, gebouwd en getest met akkoord Hidde

Hidde gaf akkoord om door te bouwen, met de harde eis dat alles in een test-omgeving draait: geen echte documenten, Slack-kanalen of Monday-boards uit de live onboarding. Concreet gebruikt:

- **Test-spreadsheet:** kopie van de V1-Registry/Teamconfig-sheet, `1N1xmkqbVH9ajx6HR9wwT-z-1CwkP4UX9dFVeO-ZgN88` ("TEST - Onboarding V1 spreadsheet (ticket 11)"), eigendom Hidde. Google Sheets-connectie `8884641` (accounts@) had geen toegang tot deze kopie (staat in Hidde's eigen Drive, niet het gedeelde team-drive); omgezet naar Hidde's persoonlijke connectie `3438587` voor de testmodules.
- **Test-Monday-board:** nieuw bord `18421889561` ("TEST - Onboarding subitems (ticket 11)") in de map van Team Gamma (folder `5741321`, workspace 564908), eigenaar/enige toegewezen persoon Hidde (Monday user-ID `80896353`). Kolommen: Team (status), Lead (people), Access & kickstart (status, `color_mm58z2q9`).
- **Slack:** alle testberichten (foutmeldingen, reminders, escalaties) gaan als DM naar Hidde (Slack user-ID `U09C5A028TE`), geen nieuwe kanalen aangemaakt.

**Gebouwd en getest (drie Make-scenario's, team 43614, momenteel inactief):**
1. `6557113` "TEST - Onboarding V1 subitems aanmaken": luistert op de test-Registry, zoekt het testboard-item op naam, maakt de 6 subitems aan. **Bevinding tijdens het testen:** de auto-gegenereerde Subitems-board van Monday bleek de kolommen `person` (people) en `date0` (date) te krijgen, niet `person`/`datum` zoals eerder ingeschat op basis van andere boards in het account — rechtstreeks getest en gecorrigeerd voordat het naar de echte Client overview-context gaat. Getest: intake met gemis → 6 subitems incl. "Ontbrekende intake-info"; intake compleet → 5 subitems, geen zesde. Eigenaar en due date (aanmaakdatum + werkdagen-omrekening) kloppend in beide gevallen.
2. `6557428` "TEST - Onboarding V1 reminders": haalt per item de subitems op (GraphQL) en stuurt een DM (reminder- of escalatietekst, bepaald door de leeftijd van het subitem) bij een open subitem van 3+ werkdagen. Draait foutloos; de 3-dagen/5-dagen-drempel zelf is niet end-to-end te testen omdat `created_at` van een subitem niet terug te zetten is.
3. `6557435` "TEST - Onboarding V1 bundelkolom-sync": berekent per item het aantal open subitems en zet de bundelkolom op To do/Partially Done/Done. Alle drie standen expliciet getest door subitems handmatig op Done te zetten tussen runs door.

**Technische les (bewaard in memory):** Make's `builtin:BasicAggregator` bleek onbetrouwbaar te configureren via de API (herhaalde `isinvalid`/"linked feeder not found"-fouten, ook met de niet-gedocumenteerde `feeder`-mapper-property). Vervangen door een directe formule op de array die de GraphQL-call al teruggeeft: `length(2.subitems)` voor het totaal en `length(map(2.subitems; "id"; "column_values[1].text"; "Done"))` voor het aantal Done — Make's `map()`-functie ondersteunt geneste paden (`column_values[1].text`) als voorwaarde-sleutel; een losse `filter()`-functie bestaat niet in Make's IML.

**Nog niet gedaan:** registry-sync (X/Y/AA/AB) vanuit de subitems. Bewust uitgesteld: de drie gebouwde scenario's dekken de kern van het ticket (subitems, reminders/escalatie, bundelkolom) en zijn stuk voor stuk getest; de sync is een kleine, losstaande toevoeging aan scenario 2 met dezelfde patronen (filterRows/updateRow) die al eerder gevalideerd zijn. Volgt als vervolgstap.

**Voor Hidde om te bekijken:** de drie TEST-scenario's staan inactief klaar in Make (team 43614): `6557113`, `6557428`, `6557435`. Het testboard staat in de Gamma-map: <https://sprintsandsneakers.monday.com/boards/18421889561>. Nog te doen richting een echte livegang: (a) registry-sync toevoegen, (b) de drie scenario's ombouwen van test- naar echte resources (live Registry-sheet, Client overview-board 3337611330, teamlead-DM's i.p.v. altijd Hidde) — een poortje op zich, expliciet apart van deze testfase, (c) Rho-tak nog uitwerken (dit ticket dekte nu alleen de generieke/growth-route).

## Correctie na feedback Hidde (2026-07-14)

De subitems moeten NIET aan het Client overview-item hangen, maar aan het item dat module 3 van scenario 6525431 al aanmaakt op board **"#Operations - Tech backlog" (4197869424)**: item-naam `"{{company}} - onboarding"`, groep `topics`, veld "Ticket type" op label "Onboarding". Dit board heeft al een echte, in gebruik zijnde Subitems-board (`4303252229`, 621 items) met bevestigde kolommen (rechtstreeks uit de Monday-API, geen gok): `person` (Owner, people), `status` (Working on it/Done/Stuck), `date0` (**Created**), `date_mm5823e` (**Deadline**).

Aanvullende eisen:
- **Created** (`date0`) = startdatum van de onboarding (aanmaakdatum), niet leeg laten.
- **Deadline** (`date_mm5823e`) = de al berekende due date (+3 werkdagen).
- **Owner** (`person`) = de verantwoordelijke (teamlead/lead) **plus altijd Hidde de Jong (80896353)** erbij, zodat hij op deze twee Monday-kolommen zelf automations kan zetten (X dagen na Created nog niet Done → Slack-melding; Deadline binnen X dagen → melding).

De module-configuratie voor deze aanpak is gevalideerd (`validate_module_configuration`: geldig) met de echte kolom-ID's van board 4303252229; nog niet opnieuw end-to-end getest tegen een testvariant van dit board (prioriteit ligt nu bij tickets 13/18/19). Bij het echte overzetten van test naar live (zie sessielog deel 2) dit gecorrigeerde doel-board gebruiken, niet Client overview.
