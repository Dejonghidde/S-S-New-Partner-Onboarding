---
type: logboek (bouwlog research-workflow)
project: New Partner Onboarding
tickets: 16 (voorbereidend op 15 en 17)
status: Lopend, wordt bijgewerkt aan het einde van elke taak
gestart: 2026-07-15
---

# Logboek: Partner Research Workflow (n8n)

Bouwlog voor de n8n-workflow uit `Onboarding workflow/Stappenplan-Research-Workflow-n8n.md`. Elke sectie hieronder komt overeen met een taak uit dat plan: wat er is uitgevoerd, wat de resultaten waren, workflow-id's, testresultaten en kosten. Openstaande punten voor Hidde staan niet hier maar in `hidde-actielijst.md`.

---

## Taak 0: Toegangscheck en credential-inventaris (2026-07-15)

Geen bouwwerk, alleen verificatie. Alle acties waren leesacties.

### Stap 0.1: n8n-toegang verifiëren

`search_workflows` aangeroepen met query "research". Resultaat zonder auth-fout, dus n8n-toegang via de MCP-tools werkt. Drie bestaande workflows zichtbaar (geen daarvan is van dit project):

| Workflow | ID | Actief | Beschikbaar in MCP |
|---|---|---|---|
| Creative Research Agent Zeb - MVP | 8Kz4nYgBWvQy3WaJ | Nee | Nee |
| PA2 _ Research_Agent | ZzDJWIJnjWQC5czl | Ja | Nee |
| keyword research SEMRUSH | rfcalbOz6iINZoEi | Nee | Nee |

Let op voor latere taken (2+): alle drie tonen `availableInMCP: false`. Dit lijkt een instelling per workflow, niet een accountbrede blokkade; de globale randvoorwaarde ("check na het aanmaken van elke workflow met `get_workflow_details` of hij via MCP leesbaar is") is dus reëel en niet vanzelfsprekend aan te nemen. Zie ook hidde-actielijst.md punt 5.

### Stap 0.2: Credential-inventaris

`list_credentials` aangeroepen (geen filter). Resultaat: 134 credentials in totaal, verspreid over veel andere projecten en personen binnen hetzelfde n8n-account (onder andere Zeb, Victor, Bobby, Marijn, Ray, GEO Agent, META Ads Agent, TNO Content, Doorzetters). Geen enkele credential is momenteel dedicated aan dit onboarding-researchproject.

Bevindingen per benodigde dienst:

| Dienst | Aanwezig | Kandidaat-credential(s) in n8n | Opmerking |
|---|---|---|---|
| Gemini / Google AI | Ja, ambigu | "Google Gemini(PaLM) Api account", "Google GeminiTNO" (beide `googlePalmApi`) | Lijken aan andere projecten gekoppeld (onder andere TNO); geen credential specifiek voor deze workflow |
| OpenAI | Ja, ambigu, veel | 7+ credentials, onder andere "Marijn - OpenAi connection", "Zeb OpenAI API CRS", "Sprints & Sneakers - Alpha - SEO agent" (allemaal `openAiApi`), plus enkele `httpHeaderAuth`-varianten | Gedeeld met tientallen andere workflows; geen credential dedicated aan de cross-checker van dit project |
| Apify | Ja, ambigu | "Apify Zeb API", "Apify account" (beide `apifyApi`) | Niet te verifiëren (credentials tonen nooit secret-waarden) of een van beide hetzelfde token gebruikt als de Make-connectie "Integration Apify" |
| Semrush | Nee | - | Zoals verwacht in het ontwerp: moet worden aangemaakt |
| HubSpot | Ja | "hubsport S&S" (`hubspotAppToken`, waarschijnlijk de S&S-brede), plus 10+ andere persoons- of testgebonden credentials | Meest waarschijnlijke kandidaat voor de read-only company/deal-lookup in latere taken (3+); niet bevestigd |
| Google Drive | Ja | "S&S N8N - Drive API" (`googleDriveOAuth2Api`), "Google Service Account account" (`googleApi`) | Niet-persoonsgebonden kandidaten aanwezig; schrijfrecht op de (nog te bevestigen) testmap niet geverifieerd |
| Google Docs | Ja | "Google - Accounts@sprintsandsneakers.com" (`googleDocsOAuth2Api`) | Niet-persoonsgebonden kandidaat aanwezig |

Geen van deze kandidaten is in deze sessie ergens aan gekoppeld of getest; dat gebeurt pas in latere taken (2+) zodra Hidde bevestigt welke gebruikt mogen worden. Volledige inventarisatie (alle 134 namen/types) staat niet in dit logboek, alleen de dienst-relevante subset.

### Stap 0.3: Hidde-actielijst

Zie `hidde-actielijst.md`: ontbrekende en ambigue credentials, plus een naamgevingsadvies.

### Stap 0.4: Test-Drive-map

Nog niet bevestigd. Ticket 11's testomgeving (Onboarding-Aanpassingen-Overzicht.md sectie 16) documenteert een test-Registry-sheet en een test-Monday-board, maar geen test-Drive-map. Een kandidaat uit de ticket-02-spike (map-id `1rizHNIfUqbI87whaLvlc_MqItvfHsdaA`) is voorgelegd aan Hidde ter bevestiging; niet geverifieerd of deze nog bestaat (zie hidde-actielijst.md punt 2). Folder-ID wordt hier genoteerd zodra bevestigd.

### Stap 0.5: Semrush-verbruikscheck

Voorbereid, niet uitgevoerd (geen Semrush-credential aanwezig). Actie staat op de actielijst; uitvoering hoort bij taak 4.

### Kosten

Geen. Alleen leesacties via de n8n-MCP-tools en één (mislukte) Drive-metadata-check.

---

## Taak 1: Contract- en referentiebestanden (2026-07-15)

Zes bestanden aangemaakt in `Onboarding workflow/research-workflow/`, allemaal statisch (geen n8n-koppeling in deze taak):

- `prefill-schema-v1.json`: het pre-fill-contract met de vragenlijst, versie 1.0, exact overgenomen uit het ontwerpdocument sectie 9.
- `patroonbibliotheek.json`: tag-scan-patronen (30 entries), letterlijk uit het stappenplan geëxtraheerd (regels 58-89 van `Stappenplan-Research-Workflow-n8n.md`) in plaats van overgetypt, om transcriptiefouten in de sterk ge-escapete regexpatronen te voorkomen. Gevalideerd met `jq empty`.
- `pack-template.md`: de 11 secties van het Research Pack plus het aannames-slot en het reviewblok.
- `prompts.md`: de zes agent-prompts (profiel, markt, funnel, visuele rubric, aannames-synthese, cross-checker), letterlijk overgenomen uit het stappenplan stap 1.4.
- `beoordelingsrubric.md`: het beoordelingsformat voor Hidde per proefpack.
- `testset-tagscan.md`: de vijf referentiesites voor de tag-scan-regressietest, nog zonder baseline-resultaten (die komen in taak 2). Twee sites (woocommerce.com voor WordPress/WooCommerce, webflow.com voor Webflow) zijn mijn eigen keuze omdat het stappenplan hiervoor geen concreet voorbeeld gaf; onderbouwing staat in het bestand zelf.

Geen van deze bestanden is in deze taak tegen een echte n8n-workflow of externe API getest; dat gebeurt in latere taken. Beide JSON-bestanden gevalideerd met `jq empty` (geldige syntax). Kosten: geen (alleen bestanden schrijven en lezen).

---

## Tussenstap: antwoorden Hidde op de actielijst (2026-07-15)

Hidde heeft alle punten uit `hidde-actielijst.md` beantwoord. Volledige tabel met te gebruiken credentials en de test-Drive-map staat nu in `hidde-actielijst.md`. Kort samengevat: bestaande credentials hergebruiken (Apify Account, Sprints & Sneakers - Alpha - SEO agent voor OpenAI, Google Gemini(PaLM) Api account, S&S N8N - Drive API), naamgevingsadvies vervalt (niet aanpassen), MCP-zichtbaarheid regelt Hidde zelf bij het aanmaken van onze workflow, en de test-Drive-map wordt "Gamma - Hidde test map" (folder-ID `19ujq_RJ39UoFhyuKGfShF1PF1p2O4J4N`).

Hidde deelde ook een Semrush-key (uit een bestaande, disabled node in een andere workflow) rechtstreeks in de sessie. Die key is bewust niet in dit logboek of enig ander repo-bestand overgenomen: alleen in n8n zelf gebruiken, zodra taak 4 de Semrush-tak bouwt.

### Inspiratie: bestaande "Growth Scan Website"-workflow

Hidde deelde ter inspiratie een bestaande, werkende n8n-workflow (`hzgnmy7cw8g0sXPY`, JSON-export in `Input:inspiratie/Growth Scan Website.json`, 54 nodes). Dit is een ander soort scan (algemene growth/CRO-beoordeling met SEO en contactdata, niet partner-onboarding-research), maar met bruikbare parallellen. Bevindingen:

- **Firecrawl** (`@mendable/n8n-nodes-firecrawl`, resource "Agent", operatie "agent", prompt "scrape the whole site") haalt in één call de volledige site op inclusief `homepage_content`. Mogelijk alternatief voor de ruwe HTTP-fetch plus handmatige link-extractie uit taak 3.1: robuuster (rendert JS, geeft schone content terug) maar waarschijnlijk duurder per run dan een kale fetch. Niet toegepast: het ontwerpdocument koos bewust "eerst het gratis fundament" (besluit 4); dit blijft een optie om aan Hidde voor te leggen bij taak 3, geen automatische wijziging.
- **DataForSEO** (`n8n-nodes-dataforseo`) wordt in die workflow gebruikt voor keyword-data (get-keyword-ideas, get-ranked-keywords), als alternatief voor Semrush. Niet nodig nu (Semrush is akkoord), maar een bruikbare fallback-optie mocht Semrush ooit onvoldoende blijken.
- **Multi-model aanpak bevestigd:** de workflow gebruikt zowel een OpenAI- als een Anthropic-agent voor "search"-taken (ChatGPT Search, Claude Search) naast elkaar. Bevestigt dat de multi-LLM-aanpak uit ons ontwerp (besluit 3) al eerder werkt binnen dit n8n-account. Onze eigen prompts blijven in het Nederlands en met de bron-plus-zekerheid-discipline; die andere workflow schrijft in het Engels en zonder brondwang, dus geen 1-op-1 kopieerbare prompts.
- **Gestructureerde JSON-output-in-prompt** (het "Website beoordeling"-node, Claude Sonnet, vraagt expliciet om een vaste JSON-schema-structuur in de output) bevestigt hetzelfde patroon dat wij al gebruiken in `prompts.md` (prompt 2) en `prefill-schema-v1.json`.
- **Supabase vector store** ("Growth strategy agent" met `vectorStoreSupabase`) is relevant, bestaand prior art voor de v2-kennisbank uit het ontwerpdocument sectie 8 (nog niet aan de orde, pas na de eerste gereviewde packs).
- **Rapportage:** HTML-opbouw in een Code-node, dan `Convert to File` plus PDFco naar PDF, upload naar Drive. Ons eigen ontwerp kiest bewust voor een Google Doc als Product 1 (ontwerpdocument sectie 9); dit HTML/PDF-patroon is een alternatief dat pas relevant wordt als Hidde ooit van Doc naar PDF wil overstappen, geen wijziging nu.
- **Trigger:** deze workflow draait op een Google Sheets-trigger (rowAdded, gepolld elke minuut). Relevant voor ticket 17 (automatische trigger, gated), niet voor nu (v1 blijft handmatig getriggerd, besluit uit het ontwerpdocument).

Geen van deze observaties verandert een bestaand ontwerpbesluit; ze zijn genoteerd als opties voor latere taken/tickets.
