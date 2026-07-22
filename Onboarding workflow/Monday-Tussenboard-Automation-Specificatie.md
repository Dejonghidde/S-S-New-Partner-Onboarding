---
type: technische-specificatie
project: New Partner Onboarding
status: Boards staan, Hidde zet de rest zelf verder op (automations + Make-aanpassingen)
bijgewerkt: 2026-07-22
---

# Monday-tussenboards: root cause en oplossing

## Root cause

De Monday-modules in Make-scenario 6525431 ("New partner onboarding V2", sandbox) die schrijven
naar `#Operations - Tech backlog` (4197869424), `Client overview - Leadership` (3337611330) en het
gekoppelde subitems-board `Subitems van #Operations - Tech backlog` (4303252229) faalden omdat alle
drie boards op `permissions: "owners"` staan. Dat is geen Make-UI-bug: het board-owners-only-model
beperkt schrijftoegang tot geregistreerde board owners op board-niveau, en de OAuth-identiteit van
de Make-connectie werd daar kennelijk niet (meer) als zodanig herkend, ook al stond de opgeslagen
`boardId` nog correct in de scenario-JSON en was Hidde zelf wel board owner in de Monday-UI.

Bevestigd via de blueprint van scenario 6525431:
- De meeste Monday-modules op Tech backlog/Leadership gebruiken connectie `8950423`
  ("Monday API - V2 onboarding", account Hidde de Jong).
- Eén module (`monday:ChangeMultipleColumnValues`, schrijft de Growth funnel sheet-link naar
  Leadership) gebruikt een andere connectie: `2541989` ("Sharif monday connection"). Dit is een
  inconsistentie los van het owners-probleem: dezelfde flow naar hetzelfde board via twee personen.
- `monday:createSubitem` schrijft naar het subitems-board 4303252229, dat dezelfde
  `owners`-instelling en owners-lijst heeft als het Tech backlog-hoofdboard.

## Gekozen oplossing en huidige status

In plaats van handmatig kolom-voor-kolom nieuwe tussenboards opbouwen (het eerste voorstel), heeft
Hidde de twee doelboards zelf **gedupliceerd** in Monday. Dat heeft twee voordelen: alle kolommen
(inclusief board-relations, mirror-kolommen en de subitems-koppeling) komen exact overeen met het
origineel, én de kolom-ID's blijven identiek aan het origineel — er is dus geen aparte
kolom-ID-mapping nodig tussen tussenboard en doelboard.

| Tussenboard | Board-ID | Doelboard | Doelboard-ID |
|---|---|---|---|
| Tussenbord #Operations - Tech backlog | `18423217366` | #Operations - Tech backlog | `4197869424` |
| Tussenbord van Client overview - Leadership | `18423217400` | Client overview - Leadership | `3337611330` |

Beide staan in workspace "Sprints & Sneakers teams" (1272912). De subitems-koppeling van het
Tech backlog-tussenboard verwijst automatisch naar een eigen, mee-gedupliceerd subitems-board
(`18423217371`) in plaats van naar het originele `4303252229` — er hoefde dus geen apart derde
tussenboard voor subitems te worden aangemaakt.

**Board owners op beide tussenboards: alleen Hidde de Jong.** Dat is bewust zo gekozen (Sharif is
niet toegevoegd). Belangrijk gevolg: de ene module die op de Sharif-connectie (`2541989`) draait,
moet bij het ombouwen naar het tussenboard ook omgezet worden naar Hidde's connectie (`8950423`),
anders loopt die module tegen hetzelfde owners-probleem aan op het nieuwe board.

**Bevestigd door Hidde (2026-07-22):** de tussenboards zijn inmiddels gekoppeld in de Monday-module
in Make en zijn zichtbaar/selecteerbaar. Daarmee is de root-cause-analyse (owners-only permissie +
OAuth-identiteit) bevestigd: met alleen Hidde's account als owner accepteert de module het board wel.

## Wat nu nog moet gebeuren (Hidde doet dit zelf, niet Claude)

1. **Monday-automations opzetten** op beide tussenboards: "When an item is created" → "Move item to
   board" naar het echte doelboard. Omdat de kolom-ID's identiek zijn aan het origineel, matcht
   Monday de kolommen bij het instellen van de automation-actie automatisch; controleer dat wel
   éénmalig in de preview van de regel voordat je 'm activeert.
   - Tussenbord Tech backlog → verplaats naar `#Operations - Tech backlog` (4197869424), groep "New".
   - Tussenbord Leadership → verplaats naar `Client overview - Leadership` (3337611330), groep
     "New partners".
   - Testtip: eerst handmatig een test-item aanmaken op het tussenboard en controleren dat het
     automatisch op het echte doelboard verschijnt, vóórdat de Make-kant hierop leunt. Als de
     automation zelf ook onder een niet-owner-identiteit draait, kan de move op dezelfde manier
     stil falen als de huidige Make-schrijfactie deed.
2. **Make-modules in scenario 6525431 ombouwen** (Hidde doet dit zelf): de `boardId` van de
   betrokken Monday-modules wijzigen van de doelboard-ID's naar de tussenboard-ID's hierboven. Omdat
   de kolom-ID's ongewijzigd zijn gebleven bij het dupliceren, hoeft er verder niets aan
   `columnId`-referenties te veranderen.
3. **De ene Sharif-connectie-module** (Growth funnel sheet-link naar Leadership) omzetten naar
   Hidde's connectie (`8950423`), zodat alle schrijfacties naar het Leadership-tussenboard onder
   dezelfde, als-owner-herkende identiteit lopen.
4. **De subitem-aanmaak-module** (`monday:createSubitem`) verwijst nu naar het originele
   subitems-board 4303252229; dit moet naar het nieuwe, mee-gedupliceerde subitems-board
   (`18423217371`) onder het Tech backlog-tussenboard, met een eigen "verplaats bij aanmaken"-automation
   op dat subitems-tussenboard naar het echte subitems-board.
