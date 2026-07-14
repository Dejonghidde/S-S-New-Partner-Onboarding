# Ticket 12: Welkomstmail-copy: eigenaarschap en volgende stap

## Doel van dit ticket
De welkomstmail benoemt de accountlead expliciet als vaste eigenaar van de hele onboarding en eindigt met een vaste alinea: wat gebeurt er nu, wie is eigenaar, wanneer hoort de partner weer iets.

## Hoort bij
Masterplan fase 1, stap 1.2 (pijler P4). Spec deel 2, sectie 12.1 (volgende-stap-protocol, accountlead als vaste eigenaar). Benchmark-onderdelen 14 en 27.

## Context voor de sessie
- Lees eerst: masterplan fase 1, spec deel 2 sectie 12.1, en de huidige drafts `Onboarding workflow/Welkomstmail-NL.md` en `Welkomstmail-EN.md` (dit zijn de bronbestanden voor mail-modules 33/34 in scenario 6525431).
- De mail is al ondertekend met leadName/leadEmail per team (module 961) en heeft een sign-off-regel "Heb je vragen? Neem contact op met ...".
- De Rho-mail (module 56, Gino) is een aparte, eenvoudigere mail; pas het principe daar ook toe.
- Copy-regels: Nederlands respectievelijk Engels, geen em-dashes, geen pijl-tekens, geen AI-slop. Kort en concreet.

## Opdracht
1. Sign-off aanscherpen: van "bij vragen" naar expliciet eigenaarschap. Richting NL: "{{leadName}} is jullie vaste aanspreekpunt en bewaakt de hele onboarding. Loopt iets vast of duurt iets te lang, mail {{leadEmail}}." Engels gelijkwaardig.
2. Vaste slotalinea toevoegen (na de vier acties, voor de sign-off): wat er nu gebeurt (team richt alles in), wat de partner doet (de vier acties), en wanneer de partner weer iets hoort (concreet: "binnen X werkdagen nemen we contact op voor de kickstart"; gebruik de termijn uit spec deel 2 sectie 13, kickstart binnen 3 tot 5 werkdagen).
3. Voorbereiding fase 5: reserveer in de HTML een gemarkeerde plek (commentaarblok) waar het welkomstvideo-blok komt zodra Barts video er is (zie tickets/README.md, sectie welkomstvideo). Nog geen zichtbaar element.
4. Verwerk de wijzigingen in de twee draft-bestanden én in de mail-modules van sandbox-scenario 6525431. Stuur een testmail NL en EN naar Hidde.
5. De kickstart-scheduling-link hoort NIET in dit ticket (tool-keuze valt in ticket 13); laat daarvoor ruimte in de slotalinea.

## Poortjes (alleen met go van Hidde)
- De aangepaste mail in het actieve scenario zetten (partner-facing). Bart/Gijs-akkoord op de copy loopt al via de gestelde briefing-vragen; niet live zonder dat akkoord.

## Klaar wanneer
- [ ] NL- en EN-draft bijgewerkt, byte-gelijk verwerkt in de sandbox-mailmodules.
- [ ] Testmail ontvangen: eigenaarschapszin en slotalinea aanwezig, links werken, geen em-dashes of pijl-tekens.
- [ ] Rho-mail heeft dezelfde twee elementen in eigen toon.
- [ ] Video-placeholder als commentaarblok aanwezig.
- [ ] Gelogd en gecommit.

## Afhankelijk van
Geen harde afhankelijkheid. Copy-akkoord van Bart/Gijs voor livegang.
