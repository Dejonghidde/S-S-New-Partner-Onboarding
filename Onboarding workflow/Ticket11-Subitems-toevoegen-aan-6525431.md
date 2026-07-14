---
type: actiedocument
project: New Partner Onboarding
ticket: 11
status: Klaar om toe te voegen aan 6525431, wacht op uitvoering
opgesteld: 2026-07-14
---

# Ticket 11: subitems + kickstart-format toevoegen aan scenario 6525431

Dit document bevat de kant-en-klare JSON-blokken om handmatig toe te voegen aan het live-bestemde scenario **6525431 "New partner onboarding V2"** in de Make-designer. Ik kan dit niet zelf via de API doen: het scenario is 923.555 tekens / 32.096 regels, ruim boven wat in één keer veilig via `scenarios_update` teruggestuurd kan worden (zie `Onboarding-Aanpassingen-Overzicht.md` sectie 16 en de memory `onboarding-make-blueprint-size-limit`).

De structuur (module-ID's, connecties, variabelen) is rechtstreeks uit het bestaande scenario opgezocht, dus dit sluit 1-op-1 aan — geen giswerk.

## Waar het hoort

Plak alles hieronder **aan het einde van de growth-route, na module 30 ("Registry-rij schrijven")**. Op dat punt in de flow zijn alle benodigde gegevens al berekend:
- `{{3.id}}` — het item op board "#Operations - Tech backlog" (4197869424) dat module 3 aanmaakt (`"{{2.company}} - onboarding"`)
- `{{10.leadId}}` — de teamlead uit de Teamconfig-lookup
- `{{2.startDatum}}`, `{{2.ontbrekend}}`, `{{2.company}}` — de form-velden uit module 2
- `{{965.id}}` — de projectmap die module 965 ("Create project folder") al heeft aangemaakt

**Connecties die hergebruikt worden (dezelfde als de rest van het scenario, geen nieuwe nodig):** Monday `8950423`, Google Drive `3434372`, Slack-alerts `6773974`.

## Volgorde van de nieuwe modules

`30` (bestaand) → `9001` → `9002` → `9003` → `9004` → `9005` → `9006` → `9007` → `9008`

---

## Blok 1 — due date berekenen (1 module)

```json
{
  "id": 9001,
  "mapper": {
    "scope": "roundtrip",
    "variables": [
      {
        "name": "dueDate",
        "value": "{{formatDate(switch(formatDate(now; \"ddd\"); \"Mon\"; addDays(now; 3); \"Tue\"; addDays(now; 3); \"Wed\"; addDays(now; 5); \"Thu\"; addDays(now; 5); \"Fri\"; addDays(now; 5); \"Sat\"; addDays(now; 4); addDays(now; 3)); \"YYYY-MM-DD\")}}"
      }
    ]
  },
  "module": "util:SetVariables",
  "version": 1,
  "metadata": { "designer": { "x": 0, "y": 1200, "name": "Due date subitems (+3 werkdagen)" } },
  "parameters": {}
}
```

## Blok 2 — de 6 subitems (op het Tech-backlog-item, `{{3.id}}`)

Eigenaar is overal `{{10.leadId}}` én altijd Hidde (80896353) erbij. Kolommen op de bestaande Subitems-board (4303252229): `person` = Owner, `date0` = Created, `date_mm5823e` = Deadline.

```json
[
  {
    "id": 9002,
    "mapper": {
      "boardId": "4197869424",
      "itemId": "{{3.id}}",
      "name": "Partner in extern Slack-kanaal",
      "columnValuesToChange": [
        { "columnId": "person", "columnDataType": "people", "columnValue": { "personsAndTeams": [{ "kind": "person", "id": "{{10.leadId}}" }, { "kind": "person", "id": "80896353" }] } },
        { "columnId": "date0", "columnDataType": "date", "columnValue": { "date": "{{2.startDatum}}", "includeTime": false } },
        { "columnId": "date_mm5823e", "columnDataType": "date", "columnValue": { "date": "{{9001.dueDate}}", "includeTime": false } }
      ],
      "create_labels_if_missing": false
    },
    "module": "monday:createSubitem",
    "version": 1,
    "metadata": { "designer": { "x": 300, "y": 1000, "name": "Subitem 1: extern Slack-kanaal" } },
    "parameters": { "__IMTCONN__": 8950423 },
    "onerror": [
      {
        "id": 9101,
        "mapper": { "text": "Failed step in New Partner Onboarding V1\nPartner: {{2.company}}\nFailed step: Subitem 1 (extern Slack-kanaal)\nReason: {{9002.error}}\n\nCheck het V1-scenario in Make.", "parse": false, "idType": "channel", "mrkdwn": true, "channel": "D0ATPSA2GAX", "channelType": "im", "channelWType": "list" },
        "module": "slack:CreateMessage",
        "version": 4,
        "metadata": { "designer": { "x": 300, "y": 1300, "name": "Alert: subitem 1 mislukt" } },
        "parameters": { "__IMTCONN__": 6773974 }
      }
    ]
  },
  {
    "id": 9003,
    "mapper": {
      "boardId": "4197869424",
      "itemId": "{{3.id}}",
      "name": "Partner op Monday-board",
      "columnValuesToChange": [
        { "columnId": "person", "columnDataType": "people", "columnValue": { "personsAndTeams": [{ "kind": "person", "id": "{{10.leadId}}" }, { "kind": "person", "id": "80896353" }] } },
        { "columnId": "date0", "columnDataType": "date", "columnValue": { "date": "{{2.startDatum}}", "includeTime": false } },
        { "columnId": "date_mm5823e", "columnDataType": "date", "columnValue": { "date": "{{9001.dueDate}}", "includeTime": false } }
      ],
      "create_labels_if_missing": false
    },
    "module": "monday:createSubitem",
    "version": 1,
    "metadata": { "designer": { "x": 600, "y": 1000, "name": "Subitem 2: Monday-board" } },
    "parameters": { "__IMTCONN__": 8950423 },
    "onerror": [
      {
        "id": 9102,
        "mapper": { "text": "Failed step in New Partner Onboarding V1\nPartner: {{2.company}}\nFailed step: Subitem 2 (Monday-board)\nReason: {{9003.error}}\n\nCheck het V1-scenario in Make.", "parse": false, "idType": "channel", "mrkdwn": true, "channel": "D0ATPSA2GAX", "channelType": "im", "channelWType": "list" },
        "module": "slack:CreateMessage",
        "version": 4,
        "metadata": { "designer": { "x": 600, "y": 1300, "name": "Alert: subitem 2 mislukt" } },
        "parameters": { "__IMTCONN__": 6773974 }
      }
    ]
  },
  {
    "id": 9004,
    "mapper": {
      "boardId": "4197869424",
      "itemId": "{{3.id}}",
      "name": "Kickstart-meeting ingepland",
      "columnValuesToChange": [
        { "columnId": "person", "columnDataType": "people", "columnValue": { "personsAndTeams": [{ "kind": "person", "id": "{{10.leadId}}" }, { "kind": "person", "id": "80896353" }] } },
        { "columnId": "date0", "columnDataType": "date", "columnValue": { "date": "{{2.startDatum}}", "includeTime": false } },
        { "columnId": "date_mm5823e", "columnDataType": "date", "columnValue": { "date": "{{9001.dueDate}}", "includeTime": false } }
      ],
      "create_labels_if_missing": false
    },
    "module": "monday:createSubitem",
    "version": 1,
    "metadata": { "designer": { "x": 900, "y": 1000, "name": "Subitem 3: kickstart-meeting" } },
    "parameters": { "__IMTCONN__": 8950423 },
    "onerror": [
      {
        "id": 9103,
        "mapper": { "text": "Failed step in New Partner Onboarding V1\nPartner: {{2.company}}\nFailed step: Subitem 3 (kickstart-meeting)\nReason: {{9004.error}}\n\nCheck het V1-scenario in Make.", "parse": false, "idType": "channel", "mrkdwn": true, "channel": "D0ATPSA2GAX", "channelType": "im", "channelWType": "list" },
        "module": "slack:CreateMessage",
        "version": 4,
        "metadata": { "designer": { "x": 900, "y": 1300, "name": "Alert: subitem 3 mislukt" } },
        "parameters": { "__IMTCONN__": 6773974 }
      }
    ]
  },
  {
    "id": 9005,
    "mapper": {
      "boardId": "4197869424",
      "itemId": "{{3.id}}",
      "name": "LastPass-toegangsmap aangemaakt",
      "columnValuesToChange": [
        { "columnId": "person", "columnDataType": "people", "columnValue": { "personsAndTeams": [{ "kind": "person", "id": "{{10.leadId}}" }, { "kind": "person", "id": "80896353" }] } },
        { "columnId": "date0", "columnDataType": "date", "columnValue": { "date": "{{2.startDatum}}", "includeTime": false } },
        { "columnId": "date_mm5823e", "columnDataType": "date", "columnValue": { "date": "{{9001.dueDate}}", "includeTime": false } }
      ],
      "create_labels_if_missing": false
    },
    "module": "monday:createSubitem",
    "version": 1,
    "metadata": { "designer": { "x": 1200, "y": 1000, "name": "Subitem 4: LastPass-map" } },
    "parameters": { "__IMTCONN__": 8950423 },
    "onerror": [
      {
        "id": 9104,
        "mapper": { "text": "Failed step in New Partner Onboarding V1\nPartner: {{2.company}}\nFailed step: Subitem 4 (LastPass-map)\nReason: {{9005.error}}\n\nCheck het V1-scenario in Make.", "parse": false, "idType": "channel", "mrkdwn": true, "channel": "D0ATPSA2GAX", "channelType": "im", "channelWType": "list" },
        "module": "slack:CreateMessage",
        "version": 4,
        "metadata": { "designer": { "x": 1200, "y": 1300, "name": "Alert: subitem 4 mislukt" } },
        "parameters": { "__IMTCONN__": 6773974 }
      }
    ]
  },
  {
    "id": 9006,
    "mapper": {
      "boardId": "4197869424",
      "itemId": "{{3.id}}",
      "name": "Brandbook + tone-of-voice binnen",
      "columnValuesToChange": [
        { "columnId": "person", "columnDataType": "people", "columnValue": { "personsAndTeams": [{ "kind": "person", "id": "{{10.leadId}}" }, { "kind": "person", "id": "80896353" }] } },
        { "columnId": "date0", "columnDataType": "date", "columnValue": { "date": "{{2.startDatum}}", "includeTime": false } },
        { "columnId": "date_mm5823e", "columnDataType": "date", "columnValue": { "date": "{{9001.dueDate}}", "includeTime": false } }
      ],
      "create_labels_if_missing": false
    },
    "module": "monday:createSubitem",
    "version": 1,
    "metadata": { "designer": { "x": 1500, "y": 1000, "name": "Subitem 5: brandbook + tone-of-voice" } },
    "parameters": { "__IMTCONN__": 8950423 },
    "onerror": [
      {
        "id": 9105,
        "mapper": { "text": "Failed step in New Partner Onboarding V1\nPartner: {{2.company}}\nFailed step: Subitem 5 (brandbook)\nReason: {{9006.error}}\n\nCheck het V1-scenario in Make.", "parse": false, "idType": "channel", "mrkdwn": true, "channel": "D0ATPSA2GAX", "channelType": "im", "channelWType": "list" },
        "module": "slack:CreateMessage",
        "version": 4,
        "metadata": { "designer": { "x": 1500, "y": 1300, "name": "Alert: subitem 5 mislukt" } },
        "parameters": { "__IMTCONN__": 6773974 }
      }
    ]
  },
  {
    "id": 9007,
    "filter": {
      "name": "Alleen bij onvolledige intake",
      "conditions": [[{ "a": "{{length(2.ontbrekend)}}", "b": "0", "o": "number:greater" }]]
    },
    "mapper": {
      "boardId": "4197869424",
      "itemId": "{{3.id}}",
      "name": "Ontbrekende intake-info: {{2.ontbrekend}}",
      "columnValuesToChange": [
        { "columnId": "person", "columnDataType": "people", "columnValue": { "personsAndTeams": [{ "kind": "person", "id": "{{10.leadId}}" }, { "kind": "person", "id": "80896353" }] } },
        { "columnId": "date0", "columnDataType": "date", "columnValue": { "date": "{{2.startDatum}}", "includeTime": false } },
        { "columnId": "date_mm5823e", "columnDataType": "date", "columnValue": { "date": "{{9001.dueDate}}", "includeTime": false } }
      ],
      "create_labels_if_missing": false
    },
    "module": "monday:createSubitem",
    "version": 1,
    "metadata": { "designer": { "x": 1800, "y": 1000, "name": "Subitem 6: ontbrekende intake-info (alleen bij gemis)" } },
    "parameters": { "__IMTCONN__": 8950423 },
    "onerror": [
      {
        "id": 9106,
        "mapper": { "text": "Failed step in New Partner Onboarding V1\nPartner: {{2.company}}\nFailed step: Subitem 6 (ontbrekende intake-info)\nReason: {{9007.error}}\n\nCheck het V1-scenario in Make.", "parse": false, "idType": "channel", "mrkdwn": true, "channel": "D0ATPSA2GAX", "channelType": "im", "channelWType": "list" },
        "module": "slack:CreateMessage",
        "version": 4,
        "metadata": { "designer": { "x": 1800, "y": 1300, "name": "Alert: subitem 6 mislukt" } },
        "parameters": { "__IMTCONN__": 6773974 }
      }
    ]
  }
]
```

## Blok 3 — kickstart-format kopiëren naar de projectmap

Zelfde patroon als "Copy DPA" (module 973), naar dezelfde map (`{{965.id}}`, de al aangemaakte projectmap).

```json
{
  "id": 9008,
  "mapper": {
    "select": "map",
    "file": "1_zPMdVfykJO1-2A0all2zHFiwp20OrB-c5rVgqGrQ6U",
    "folderId": "{{965.id}}",
    "name": "Kickstart-format - {{2.company}}"
  },
  "module": "google-drive:copyAFile",
  "version": 4,
  "metadata": { "designer": { "x": 2100, "y": 1000, "name": "Kickstart-format kopieren naar projectmap" } },
  "parameters": { "__IMTCONN__": 3434372 },
  "onerror": [
    {
      "id": 9107,
      "mapper": { "text": "Failed step in New Partner Onboarding V1\nPartner: {{2.company}}\nFailed step: Kickstart-format kopieren\nReason: {{9008.error}}\n\nCheck het V1-scenario in Make.", "parse": false, "idType": "channel", "mrkdwn": true, "channel": "D0ATPSA2GAX", "channelType": "im", "channelWType": "list" },
      "module": "slack:CreateMessage",
      "version": 4,
      "metadata": { "designer": { "x": 2100, "y": 1300, "name": "Alert: kickstart-format mislukt" } },
      "parameters": { "__IMTCONN__": 6773974 }
    }
  ]
}
```

---

## Hoe je dit toevoegt

1. Open scenario 6525431 in de Designer.
2. Kopieer bovenstaande JSON-blokken (1 t/m 3, in die volgorde) en probeer op het canvas te plakken (Cmd+V) — Make herkent los-gekopieerde module-JSON vaak automatisch als "plak module(s)".
3. Lukt dat niet: elke module handmatig toevoegen via het "+"-icoon en de velden hierboven overtypen (zelfde informatie, dan via de UI).
4. Verbind ze in volgorde na module 30: 9001 → 9002 → 9003 → 9004 → 9005 → 9006 → 9007 → 9008.
5. Check op ID-conflicten: als Make klaagt dat een ID al bestaat, hernoem `9001`-`9107` naar iets dat vrij is.

## Twee openstaande punten

- **Rho-route**: zelfde aanpak, maar Rho's modules gebruiken net iets andere veldnamen (`{{45.data.id}}` in plaats van `{{965.id}}`, `{{40.leadId}}` met fallback `29186877`). Nog niet uitgeschreven — wacht op bevestiging dat Rho dezelfde 6 subitems + kickstart-format moet krijgen.
- **Module 28** (het bestaande statusbericht in het interne Slack-kanaal) heeft nog de oude platte to-do-lijst ("☐ Project kickstart meeting...", "☐ Create LastPass folder...") staan, die nu dubbel op is met de nieuwe subitems. Op verzoek lever ik een aangepaste tekst zonder de checklist.
