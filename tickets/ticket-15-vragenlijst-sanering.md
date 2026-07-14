# Ticket 15: Vragenlijst-sanering: minstens 50% korter

## Doel van dit ticket
De B2C- en B2B-vragenlijst bevatten alleen nog vragen die alleen de partner kan beantwoorden en waarvan het antwoord verandert wat het team doet. Alles wat S&S zelf kan achterhalen is eruit en verhuist naar het Partner Research Pack (ticket 16). Doel: minstens 50% minder vragen, invultijd onder 30 minuten.

## Hoort bij
Masterplan fase 2, stappen 2.1 en 2.3 (pijler P2, indirect P1). Bindende bron: de richtlijnentabel van Bart in het masterplan, stap 2.1. Aanpassingenoverzicht punt 15.

## Context voor de sessie
- Lees eerst: masterplan stap 2.1 (de Bart-tabel is bindend) en 2.3, `New-Vragenlijst/specs/README.md` (structuur en deploy), en daarna de volledige vragenlijsten: `New-Vragenlijst/specs/public/index.html` (B2C) en `preview/build_b2b.py` (B2B-bron; `public/b2b.html` is gegenereerd, nooit direct bewerken).
- Beide lijsten hebben 9 secties. Barts feedback verwijst naar sectienummers; map die eerst tegen de echte inhoud voordat je iets schrapt.
- Copy-regels: geen em-dashes, geen pijl-tekens, de-slop (zie memory/werkwijze: AI-slop strippen voor review). De bestaande toon en schil behouden.
- De assets-sectie (sectie 8) blijft en wordt juist explicieter op brandbook plus tone-of-voice: voeg een bevestigingsoptie toe ("wij hebben (nog) geen brandbook / tone-of-voice-document") zodat afwezigheid een zichtbaar feit is in plaats van stilte (besluit Experience-laag, aanpassingenoverzicht punt 3).

## Opdracht
1. Maak eerst de mappingtabel als tussenproduct en leg die vast in `New-Vragenlijst/specs/2026-07-sanering-mapping.md`: per vraag (beide lijsten) de kolommen: sectie, vraag(kort), Bart-besluit, actie (behouden / schrappen naar research pack / herformuleren / conditioneel), motivatie in een regel. Gebruik de twee criteria: (a) kan alleen de partner dit weten, (b) verandert het antwoord wat het team doet.
2. Pas de Bart-tabel toe: metadata en sectie 0 volledig weg; sectie 1 weg (research pack); account profile: 2.3, 2.4, 2.5, 2.6 behouden, 2.1 herformuleren in klare taal zonder signalen-overlap met 2.6, 2.7 herschrijven of schrappen, rest weg; sectie 3 behouden; sectie 4 weg behalve capabilities als eigen kort hoofdstuk en 4.6 alleen indien account-based relevant; tech en tracking terug naar een kort verificatieblok ("klopt dit beeld?", voorlopig zonder pre-fill-data, plus de open gap-vraag); funnelvragen weg behalve de vraag waar de funnel lekt.
3. Voer de wijzigingen door: B2C in `index.html`, B2B in `build_b2b.py`, daarna `python3 preview/build_b2b.py` draaien. Sectienummering, voortgangsindicator en navigatie kloppend maken.
4. Tel en rapporteer: aantal vragen en geschatte invultijd voor en na, per lijst. De lat is -50%; haal je die niet, motiveer per behouden vraag waarom.
5. Test lokaal de volledige flow van beide lijsten (alle stappen doorklikken, submit-payload ongewijzigd qua structuur of bewust aangepast met bijbehorende Worker-check).
6. Leg de geschrapte onderwerpen expliciet vast als input voor het research-pack-template (ticket 16): wat moet het pack voortaan dekken.

## Poortjes (alleen met go van Hidde)
- Deploy naar Cloudflare (partner-facing): pas na akkoord van Bart/Gijs op de mappingtabel plus preview, en go van Hidde. Tot die tijd alles lokaal en in git.

## Klaar wanneer
- [ ] Mappingtabel compleet en vastgelegd, elk Bart-besluit traceerbaar toegepast.
- [ ] Beide lijsten geschoond, B2B geregenereerd, lokale flow-test groen.
- [ ] Reductie gerapporteerd: -50% gehaald of per uitzondering gemotiveerd; invultijd onder 30 minuten.
- [ ] Brandbook/tone-of-voice-bevestigingsoptie aanwezig in sectie assets.
- [ ] Lijst "gaat naar research pack" opgeleverd voor ticket 16.
- [ ] Gelogd en gecommit; deploy alleen met go.

## Afhankelijk van
Geen bouw-afhankelijkheden. Review-afhankelijkheid: Bart/Gijs-akkoord voor deploy. Ticket 16 gebruikt de output.
