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

---

## Taak 2: Sub-workflow "SS Research - Tagscan" (2026-07-15)

**Workflow:** `SS Research - Tagscan`, id `LkH0bLVZVCaYInop`, [n8n-link](https://n8n.sprintsandsneakers.com/workflow/LkH0bLVZVCaYInop). Inactief (`active: false`), handmatig via Execute Workflow Trigger. `availableInMCP: true` (stond al aan bij aanmaak, geen actie van Hidde nodig geweest). Acht nodes: Start (Execute Workflow Trigger) → Fetch homepage (laag 1) → Code laag 1 → IF "GTM gevonden?" → (waar/onwaar) Fetch GTM-container (laag 2) → Code laag 2 → Merge (combine, combineByPosition, `includeUnpaired: true`) → Code "Output samenstellen".

### Stap 2.1 en 2.2: bouw en aanmaak

Gevolgd: `get_sdk_reference`, `get_suggested_nodes` (categorieën scraping_and_research, data_transformation), `search_nodes` voor elke nodetype, `get_node_types` met alle discriminators, code geschreven, `validate_workflow`, `create_workflow_from_code`. Patroonbibliotheek als constante in beide Code-nodes ingebed (niet dynamisch ingeladen, zoals voorgeschreven); de entry "Server-side GTM (indicatie)" is bewust buiten de generieke patroon-loop gehouden en apart geïmplementeerd (het patroon in het JSON-bestand is geen zuivere regex maar een regex-plus-mensentekst-hybride; de eigenlijke logica: een `/gtm.js?id=GTM-xxx`-loader die niet van googletagmanager.com komt).

### Stap 2.3: regressietest op de 5 testsites

Getest met `test_workflow` (pin data), niet met `execute_workflow`: dat laatste bleek de Execute Workflow Trigger niet te ondersteunen ("Only workflows with the following trigger nodes can be executed: Schedule Trigger, Webhook Trigger, Form Trigger, Chat Trigger, Manual Trigger"), een tool-beperking die het stappenplan niet kon voorzien. Om de scanlogica echt tegen levende sites te toetsen (test_workflow simuleert HTTP Request-nodes altijd) is de homepage-HTML en, waar relevant, de GTM-containerinhoud vooraf met curl opgehaald (zelfde user-agent als de node) en als pin data ingevoerd. Dit test de detectielogica tegen echte, actuele site-inhoud; het bewijst niet dat n8n's eigen HTTP Request-node vanaf het n8n-serveradres dezelfde respons krijgt (bijvoorbeeld bij IP-gebaseerde bot-detectie). Volledige, definitieve resultaten en twee tijdens het testen gevonden en gecorrigeerde fouten (GTM-patroon miste de standaard-snippet; Merge liet items vallen bij een lege tak) staan in `testset-tagscan.md`. Samengevat:

| Site | Resultaat |
|---|---|
| coolblue.nl | Geen patronen (vermoedelijk SPA, tags laden na JS-executie), `niet_scanbaar: false` |
| mrmarvis.nl | Cloudflare-blokkade (HTTP 403), `niet_scanbaar: true` |
| woocommerce.com | GTM, WooCommerce, WordPress (laag 1); GA4 en Google Ads remarketing via container (laag 2) |
| webflow.com | GTM, Webflow (laag 1); Google Ads remarketing via container (laag 2) |
| mollie.com | Geen patronen (vermoedelijk ook SPA), `niet_scanbaar: false` |

Toets aan de verwachting uit het stappenplan ("minstens 3 van de 5 sites GTM/GA4"): gehaald op 2 van de 5. De overige 3 zijn eerlijk verklaarbaar (2 vermoedelijke SPA's, 1 bot-blokkade) en geen defect in de scanlogica: op beide sites waar via een kale fetch iets te vinden was, werkte de detectie correct in zowel laag 1 als laag 2. Volledige onderbouwing en de letterlijke resultaten per site in `testset-tagscan.md`.

**Aanbeveling voor een latere sessie (geen actie nu):** de patroonbibliotheek test Hotjar, Klaviyo, de oude Universal Analytics-property en het TikTok/LinkedIn/Pinterest/Snap-pixel alleen op laag 1 (directe HTML), niet op laag 2 (GTM-container). Bij woocommerce.com bleken Hotjar en Klaviyo wel degelijk aanwezig, maar uitsluitend via de GTM-container geladen, dus gemist. Zelfde soort gat als het GTM-patroon dat deze sessie al herstelde, maar voor andere tools; buiten scope van taak 2 om nu zelfstandig te verbreden, wel het signaleren waard voor wie de patroonbibliotheek verder verfijnt.

### Stap 2.4: kosten

Geen kosten aan externe betaalde diensten (alleen publieke HTTP-fetches, curl vanaf mijn eigen omgeving voor de testdata, en n8n-MCP-calls).

---

## Taak 3: Hoofd-workflow "SS Research - Fundament" (2026-07-15)

**Ontwerpwijziging op verzoek Hidde (tijdens de bouw):** het stappenplan schreef een handmatige form-trigger voor met vier invoervelden voor te bedrijfsnaam/domein/type/hubspot_zoeken. Hidde heeft dit tijdens de sessie expliciet gecorrigeerd: de invoer (bedrijfsnaam, type) moet uit dezelfde Google-spreadsheet komen die ook als bron dient voor de bestaande Make-onboarding-automatisering, niet opnieuw met de hand getypt worden. Uitgezocht (alleen lezend, sandbox-regel gerespecteerd: sandbox `6226897` zelf bleek niet los opvraagbaar via de Make-API, dus de bron is bevestigd via de al gedocumenteerde analyse in `Onboarding workflow/Onboarding-Workflow-Analyse-en-Blueprint.md` en `Contextdossier-Onboarding-Herontwerp.md`, en de sheet zelf rechtstreeks gelezen via Drive): de live/sandbox Make-automatisering "New partner onboarding" leest een rij uit Google Sheet "Form Responses" (`1a98wRYG9dMu2KG866xrd1VO3iSmv0Qw0wm9ZxqavtX8`). Kolommen: Company name, Partner - first name, Partner - email, Partner - phone number, Assigned team, Link to assignment letter, Link to handover, Project kickstart meeting planned?, Submitted By, Timestamp, Partner type, Taal partnercommunicatie. Er is geen domein-kolom; die blijft dus noodgedwongen een handmatig veld. De kolom "Partner type" bestaat wel, maar staat in vrijwel alle bestaande rijen leeg (steekproef van de hele sheet bevestigt dit), dus de workflow valt terug op een handmatige override als de sheet leeg is.

**Herontwerp van de interface (stap 3.1), na overleg-vervangende beslissing van Hidde:**
- Trigger blijft Manual Trigger (geen enkele workflow in dit project mag automatisch triggeren van productie-events, ongewijzigde randvoorwaarde), maar de losse "form"-velden zijn vervangen door een "Testinvoer"-Set-node met drie handmatige waarden: `bedrijfsnaam_zoekterm` (zoekterm voor de sheet-lookup), `domein` (blijft altijd handmatig, staat niet in de sheet), `type_override` (alleen gebruikt als de sheet-kolom leeg is).
- Nieuwe node "Partnerrij ophalen (Form Responses)": Google Sheets read met filter op kolom "Company name" = de zoekterm, `alwaysOutputData: true` zodat een niet-gevonden rij niet de hele workflow stil laat stoppen (zelfde soort veiligheid als de Merge-fix uit taak 2).
- `hubspot_zoeken` uit de oorspronkelijke interface is geschrapt: Hidde gaf tijdens deze sessie expliciet opdracht om de HubSpot-stap (oorspronkelijk stap 3.2) nu over te slaan en direct door te gaan naar taak 4 en 5. De `hubspot`-sleutel in het context-object wordt daarom altijd gevuld met de lege standaardwaarde uit het ontwerp (`{"company": {}, "notities_samenvatting": ""}`), nooit met een echte HubSpot-lookup. Dit is een bewuste, tijdelijke keuze op Hidde's instructie, geen vergeten stap; stap 3.2 kan alsnog worden toegevoegd in een latere sessie.
- Ontwerpkeuze (eigen invulling, niet expliciet in het stappenplan): de homepage-tekst zelf is toegevoegd als eerste entry in `paginas` (naast de maximaal 3 kernpagina's), omdat dit de rijkste directe bron over het bedrijf is en de latere profiel-agent (taak 5) er baat bij heeft.

**Bouw:** Workflow `SS Research - Fundament`, id `I6wPX5cUZcKjiugp`, [n8n-link](https://n8n.sprintsandsneakers.com/workflow/I6wPX5cUZcKjiugp). Inactief, handmatig, `availableInMCP: true` (stond al aan bij aanmaak). 14 nodes: Start (Manual Trigger) → Testinvoer (Set) → Partnerrij ophalen (Google Sheets, credential "Google sheets account - Google cloud project n8n", zie opmerking hieronder) → Context-basis samenstellen (Code) → Homepage ophalen (HTTP) → Links en kernpaginas extraheren (Code) → [fan-out: Kernpaginas uitsplitsen (Split Out) → Kernpagina ophalen (HTTP) → Paginatekst extraheren (Code, per item) → Paginateksten combineren (Aggregate)] + [direct] → Basis en paginas samenvoegen (Merge, combine/combineByPosition, `includeUnpaired: true`, zelfde veiligheidspatroon als taak 2) → Context-object samenstellen (basis) (Code) → Tagscan uitvoeren (Execute Sub-workflow, roept `LkH0bLVZVCaYInop` aan) → Context-object afronden (Code).

**Credential-keuze (eigen invulling, geen expliciete Hidde-bevestiging):** voor de Google Sheets-node was er geen credential eerder aangewezen (taak 0 checkte dit niet, want de sheet-koppeling was toen nog niet ontworpen). Van de 6 beschikbare `googleSheetsOAuth2Api`-credentials in het account (waarvan de meeste persoonsgebonden ogen: "Bobby - Google", "Victor google", "Google Sheet Hidde-Ops", "NBFM (Ray)") is gekozen voor "Google sheets account - Google cloud project n8n" als de minst persoonsgebonden optie. Dit is een aanname, geen bevestigd besluit; Hidde kan dit met één klik in de node-UI wijzigen als een andere credential beter past.

**Gevonden en gecorrigeerde fout (tijdens het testen):** de eerste testrun (execution 96995) gaf `footer_links: []` en `kernpagina_urls: []` ondanks HTML met duidelijke, aanwezige links. Oorzaak: `new URL(...)` is niet beschikbaar als global in de n8n Code-node-sandbox; elke aanroep gooide een exception die door de eigen try/catch werd opgevangen en stil `null` teruggaf. De social-links-detectie (die geen `new URL` gebruikt, alleen een kale regex-test op de ruwe href-string) werkte wel meteen correct, wat de diagnose bevestigde. Opgelost door `toAbsolute`/hostname/pathname-bepaling te herschrijven met handmatige string-parsing in plaats van de WHATWG URL-klasse. Na de fix (execution 97003, getest met een echte, actuele homepage- en about-pagina-inhoud van mollie.com als pin-data): `footer_links` (4 links), `social_links` (instagram/linkedin/x correct herkend), `extra_domeinen` (`blog.mollie.com` correct als apart domein herkend), en `kernpagina_urls` (3 relatieve links `./about`, `./pricing`, `./products/checkout` correct omgezet naar absolute URL's) werken allemaal correct.

**Testresultaat (execution 97003, fallback-pad "niet gevonden in sheet"):** het volledige context-object bevat alle verplichte velden (`bedrijf`, `domein`, `type`, `paginas`, `footer_links`, `social_links`, `extra_domeinen`, `hubspot` als lege stub, `tagscan` met een echte sub-executie van de tagscan-workflow erin). Alleen het "niet gevonden in de sheet"-pad is empirisch getest (bewust: dit is het risicovollere pad omdat `alwaysOutputData` hier het verschil maakt); het "wel gevonden"-pad gebruikt dezelfde, eenvoudigere code (alleen een andere kolom lezen) en is wel gelezen maar niet apart met een eigen testrun geverifieerd. Ook is de `Kernpagina ophalen`-node door `test_workflow` gepind tot één vaste respons ongeacht hoeveel van de 3 kernpagina-URL's er werkelijk doorheen liepen, dus de meervoudige-kernpagina's-fan-out is structureel bewezen (Split Out leverde 3 items af) maar niet met 3 verschillende pagina-teksten in de uiteindelijke `paginas`-array; dat is een beperking van `test_workflow`'s pin-mechanisme, geen bekende fout in de workflow zelf.

**Kosten:** geen (publieke HTTP-fetches, curl vanaf eigen omgeving, n8n-MCP-calls; Google Sheets-lookup en tagscan-sub-executie zijn gesimuleerd via pin data in deze testrun).

---

## Taak 4.1: Semrush-branch (2026-07-15)

Op instructie Hidde direct doorgebouwd na taak 3 (taken 4 en 5 kregen prioriteit; HubSpot-tak blijft uitgesteld).

**Bouw:** drie HTTP Request-nodes toegevoegd aan `SS Research - Fundament` (na "Context-object afronden"): "Semrush domain_ranks (overview)", "Semrush top keywords" (`domain_organic`, display_limit 50), "Semrush organische concurrenten" (`domain_organic_organic`, display_limit 10), gevolgd door Code-node "Semrush CSV parsen" die de drie CSV-responses (puntkomma-gescheiden) omzet naar rijen-objecten en een geschat unit-verbruik berekent. Resultaat komt onder sleutel `semrush` in het context-object, exact zoals taak 4's interface voorschrijft.

**Credential:** er bestaat nog geen Semrush-credential in n8n (taak 0 checkte dit niet, toen was er nog geen Semrush-tak). De nodes verwijzen naar een generieke Query Auth-credential met de naam `Semrush API` (query-parameternaam `key`); dit moet Hidde zelf aanmaken in de n8n-UI met de sleutel die hij al in deze sessie deelde (zie hidde-actielijst.md, nieuw punt). Ik heb de sleutel zelf nergens overgenomen, conform de standing rule en de n8n-SDK-regel om nooit statische auth-waarden in node-parameters te zetten.

**Test:** `test_workflow` met realistische, met de hand samengestelde CSV-pin-data (formaat en kolomnamen exact volgens Semrush's eigen API-documentatie-conventie: `Dn;Rk;Or;Ot;Ad;At` voor domain_ranks, `Ph;Po;Nq;Tr` voor domain_organic, `Dn;Cr;Np;Or` voor domain_organic_organic) voor alle drie de Semrush-nodes. Resultaat (execution 97006): CSV correct geparsed naar objecten per rij, `top_keywords` (3 rijen), `organische_concurrenten` (2 rijen), `geschat_verbruik_units: 15` correct berekend (10 + 3 + 2). Dit bewijst de parselogica; het bewijst niet dat de echte Semrush-API exact dit CSV-formaat teruggeeft of dat de credential/sleutel werkt, dat kan pas na de eenmalige verificatiecall die op de actielijst staat (stap 0.5).

**Kosten:** geen (gesimuleerde data, geen echte API-call).
