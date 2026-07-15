# Stappenplan: Partner Research Workflow in n8n (tickets 16, voorbereidend op 15 en 17)

> **Voor de uitvoerende sessie:** dit plan is geschreven voor een verse Claude-sessie (Sonnet) zonder voorkennis van de brainstorm. Het ontwerp staat in `Onboarding workflow/Uitwerking-Fase-2-Vragenlijst-en-Research-Pack.md`; lees dat eerst volledig. Werk taak voor taak, in volgorde, een taak per sessie is prima. Stappen hebben checkbox-syntax voor voortgang. Volg daarnaast het sessieprotocol in `tickets/README.md`.

**Doel:** een n8n-workflow die per partner (input: bedrijfsnaam, domein, type B2B/B2C) een Research Pack (Google Doc) plus een pre-fill-JSON produceert, handmatig getriggerd, getest met drie proefruns die Hidde beoordeelt.

**Architectuur:** deterministische feiten-blokken (tag-scan, Semrush, Apify, reviews, socials) rond een gedeeld context-object, AI Agent-nodes alleen voor interpretatie (multi-LLM: Gemini Flash/Pro plus een GPT-cross-checker), assemblage naar twee outputs. Data stroomt door: geen branch haalt op wat een eerdere branch al heeft.

**Tech stack:** n8n (cloud, n8n.sprintsandsneakers.com) via de n8n-MCP-tools; Semrush API (Advanced); Apify; Gemini API (met Google Search grounding); OpenAI API (cross-check); Google Drive/Docs via bestaande n8n-credential; HubSpot via bestaande credential.

## Globale randvoorwaarden (gelden voor elke taak)

- **Niets activeren.** Alle n8n-workflows blijven inactief/handmatig; er komt geen trigger op productie-events.
- **Testomgeving.** Output (docs, JSON) gaat uitsluitend naar de test-Drive-map (taak 0 wijst die aan), nooit naar echte partnermappen. Geen berichten naar teamkanalen; als een melding nodig is, alleen DM naar Hidde.
- **Credentials: nooit om tokens vragen.** Ontbreekt een credential in n8n, zet de benodigde credential (naam plus type) op de Hidde-actielijst; Hidde maakt hem zelf aan in de n8n-UI. Sessies gebruiken alleen de credential-referentie.
- **Geen wijzigingen** aan Make-scenario's, HubSpot, de live vragenlijst of de Cloudflare Worker. Lezen mag, schrijven niet.
- **Copy-regels:** Nederlands voor interne documenten, geen em-dashes (het teken tussen woorden), geen pijltekens, geen AI-slop. Pack-inhoud in het Nederlands.
- **n8n-MCP-werkvolgorde bij elke workflow-bouwstap:** eerst `get_sdk_reference`, dan `get_suggested_nodes`, dan `search_nodes` voor elke benodigde node, dan `get_node_types` met alle node-id's, dan pas code schrijven, dan `validate_workflow`, dan `create_workflow_from_code` (of `update_workflow`). Sla nooit stappen over; parameter-namen raden geeft kapotte workflows.
- **MCP-leesbaarheid:** check na het aanmaken van elke workflow met `get_workflow_details` of hij via MCP leesbaar is. Zo niet: zet "beschikbaar maken in MCP" op de Hidde-actielijst (instelling in de workflow-settings in de UI).
- **Loggen:** elke taak eindigt met een update van `Onboarding workflow/research-workflow/LOG.md` (wat gebouwd, workflow-id's, testresultaten, kosten) en een git-commit van de repo-bestanden.
- **Kosten:** log per proefrun de werkelijke kosten (Apify-runkosten uit het Apify-dashboard-resultaat, Semrush-units uit de API-respons-header, LLM-tokens uit de node-output).

---

## Taak 0: Toegangscheck en credential-inventaris (geen bouw)

**Bestanden:**
- Aanmaken: `Onboarding workflow/research-workflow/LOG.md`
- Aanmaken: `Onboarding workflow/research-workflow/hidde-actielijst.md`

**Levert op:** zekerheid over wat er klaarstaat en een concrete actielijst voor Hidde voor alles wat alleen hij kan (credentials, instellingen).

- [ ] **Stap 0.1: n8n-toegang verifiëren.** Roep `search_workflows` aan (query: "research"). Verwacht: resultaat zonder auth-fout. Noteer in LOG.md welke workflows zichtbaar zijn.
- [ ] **Stap 0.2: Credential-inventaris.** Roep `list_credentials` aan. Zoek naar: Gemini/Google AI, OpenAI, Apify, Semrush, HubSpot, Google Drive, Google Docs. Noteer per stuk: aanwezig ja/nee, credential-naam.
- [ ] **Stap 0.3: Hidde-actielijst schrijven.** Zet in `hidde-actielijst.md` elke ontbrekende credential met naam en type, minimaal te verwachten: `Semrush API` (API-key uit het Advanced-account), `Apify API` (token staat al in de Make-connectie "Integration Apify"; zelfde token hergebruiken), `OpenAI API` (voor de cross-checker), en als Google Drive/Docs ontbreekt: een Google-credential met schrijfrechten op de testmap. Vermeld erbij: Hidde plakt keys zelf in de n8n-UI, de sessie vraagt er nooit om.
- [ ] **Stap 0.4: Test-Drive-map.** Vraag Hidde (via de actielijst) om de ID van een test-Drive-map te bevestigen, of gebruik als default de bestaande testomgeving uit ticket 11 (zie `Onboarding workflow/Onboarding-Aanpassingen-Overzicht.md` sectie 16). Noteer de folder-ID in LOG.md zodra bevestigd.
- [ ] **Stap 0.5: Semrush-verbruikscheck voorbereiden.** Noteer in de actielijst: na het aanmaken van de Semrush-credential draait taak 4 eerst één goedkope call (domain_ranks, 1 regel, ~10 units) om key en saldo te verifiëren.
- [ ] **Stap 0.6: Commit.** `git add "Onboarding workflow/research-workflow/" && git commit -m "Taak 0: toegangscheck en Hidde-actielijst research-workflow"`

---

## Taak 1: Contract- en referentiebestanden in de repo

**Bestanden (allemaal aanmaken in `Onboarding workflow/research-workflow/`):**
- `prefill-schema-v1.json` (het contract met de vragenlijst)
- `patroonbibliotheek.json` (tag-scan-patronen, geversioneerd)
- `pack-template.md` (de 11 secties van het Research Pack)
- `prompts.md` (alle agent-prompts, letterlijk)
- `beoordelingsrubric.md` (waarmee Hidde de proefpacks beoordeelt)
- `testset-tagscan.md` (5 referentiesites plus baseline)

**Interfaces:** alle latere taken gebruiken deze bestanden letterlijk; wijzigingen hier zijn wijzigingen aan het contract en horen in de LOG.

- [ ] **Stap 1.1: prefill-schema-v1.json.** Neem het schema exact over uit het ontwerpdocument sectie 9 (velden `tech_stack`, `active_ad_channels`, `competitors`, elk met `value`, `source`, `confidence`; toplevel `version`, `partner`, `generated_at`, `reviewed`). Voeg een `"_comment"` toe: "Contract met de vragenlijst; veldnamen wijzigen alleen met versie-ophoging en log-entry."
- [ ] **Stap 1.2: patroonbibliotheek.json.** Structuur per entry: `{"tool": "...", "categorie": "...", "laag": 1, "patroon": "..."}` (patroon is een case-insensitive substring of regex). Neem minimaal op:

```json
[
  {"tool": "Google Tag Manager", "categorie": "tagmanager", "laag": 1, "patroon": "googletagmanager\\.com/gtm\\.js\\?id=(GTM-[A-Z0-9]+)"},
  {"tool": "GA4", "categorie": "analytics", "laag": 1, "patroon": "gtag/js\\?id=(G-[A-Z0-9]{6,})"},
  {"tool": "GA4 (via GTM-container)", "categorie": "analytics", "laag": 2, "patroon": "(G-[A-Z0-9]{6,})"},
  {"tool": "Universal Analytics (verouderd)", "categorie": "analytics", "laag": 1, "patroon": "(UA-[0-9]{4,}-[0-9]+)"},
  {"tool": "Google Ads remarketing", "categorie": "adpixel", "laag": 2, "patroon": "(AW-[0-9]{6,})"},
  {"tool": "Meta Pixel", "categorie": "adpixel", "laag": 1, "patroon": "connect\\.facebook\\.net/[a-zA-Z_]+/fbevents\\.js|fbq\\('init'"},
  {"tool": "Meta Pixel (id via GTM)", "categorie": "adpixel", "laag": 2, "patroon": "\"pixelId\"\\s*:\\s*\"([0-9]{10,})\""},
  {"tool": "TikTok Pixel", "categorie": "adpixel", "laag": 1, "patroon": "analytics\\.tiktok\\.com/i18n/pixel|ttq\\.load\\("},
  {"tool": "LinkedIn Insight", "categorie": "adpixel", "laag": 1, "patroon": "snap\\.licdn\\.com/li\\.lms-analytics/insight\\.min\\.js|_linkedin_partner_id"},
  {"tool": "Pinterest Tag", "categorie": "adpixel", "laag": 1, "patroon": "s\\.pinimg\\.com/ct/core\\.js|pintrk\\("},
  {"tool": "Snap Pixel", "categorie": "adpixel", "laag": 1, "patroon": "sc-static\\.net/scevent\\.min\\.js"},
  {"tool": "Hotjar", "categorie": "behaviour", "laag": 1, "patroon": "static\\.hotjar\\.com/c/hotjar-"},
  {"tool": "Microsoft Clarity", "categorie": "behaviour", "laag": 1, "patroon": "clarity\\.ms/tag/"},
  {"tool": "Cookiebot", "categorie": "cmp", "laag": 1, "patroon": "consent\\.cookiebot\\.com/uc\\.js"},
  {"tool": "OneTrust", "categorie": "cmp", "laag": 1, "patroon": "cdn\\.cookielaw\\.org/scripttemplates/otSDKStub\\.js"},
  {"tool": "CookieYes", "categorie": "cmp", "laag": 1, "patroon": "cdn-cookieyes\\.com"},
  {"tool": "Complianz", "categorie": "cmp", "laag": 1, "patroon": "complianz-gdpr"},
  {"tool": "Klaviyo", "categorie": "email", "laag": 1, "patroon": "static\\.klaviyo\\.com/onsite/js/klaviyo\\.js|klaviyo\\.init"},
  {"tool": "ActiveCampaign", "categorie": "email", "laag": 1, "patroon": "trackcmp\\.net"},
  {"tool": "Mailchimp", "categorie": "email", "laag": 1, "patroon": "chimpstatic\\.com"},
  {"tool": "HubSpot", "categorie": "crm", "laag": 1, "patroon": "js\\.hs-scripts\\.com/"},
  {"tool": "Shopify", "categorie": "platform", "laag": 1, "patroon": "cdn\\.shopify\\.com|Shopify\\.theme"},
  {"tool": "WooCommerce", "categorie": "platform", "laag": 1, "patroon": "woocommerce"},
  {"tool": "WordPress", "categorie": "platform", "laag": 1, "patroon": "/wp-content/"},
  {"tool": "Magento", "categorie": "platform", "laag": 1, "patroon": "Magento_|/static/version"},
  {"tool": "Lightspeed", "categorie": "platform", "laag": 1, "patroon": "assets\\.lightspeedhq|webshopapp\\.com"},
  {"tool": "Webflow", "categorie": "platform", "laag": 1, "patroon": "assets\\.website-files\\.com"},
  {"tool": "Wix", "categorie": "platform", "laag": 1, "patroon": "static\\.parastorage\\.com"},
  {"tool": "Squarespace", "categorie": "platform", "laag": 1, "patroon": "static1\\.squarespace\\.com"},
  {"tool": "Server-side GTM (indicatie)", "categorie": "tagmanager", "laag": 1, "patroon": "/gtm\\.js\\?id=GTM-[A-Z0-9]+\" (geladen van een first-party domein, niet googletagmanager.com); markeer als: server-side aanwezig, configuratie onbekend"}
]
```

- [ ] **Stap 1.3: pack-template.md.** De 11 secties uit het ontwerpdocument sectie 3, elk met een korte instructie wat erin hoort en de verplichte bron-plus-zekerheid-notatie per gegeven (vastgesteld / waarschijnlijk / aanname). Slotsectie: "Aannames voor de kickstart" met het 5-punts-format uit ontwerpdocument sectie 7. Kop van het template: partnernaam, datum, versie, en een leeg reviewblok (gereviewd door, datum, bevindingen).
- [ ] **Stap 1.4: prompts.md.** Schrijf de zes prompts volledig uit, in het Nederlands, elk met: rol, input (welke context-velden), opdracht, en het verplichte output-format (JSON of markdown-sectie). De zes:
  1. **Profiel-agent** (Gemini Pro plus grounding): "Je stelt het bedrijfsprofiel en de propositie op voor {{bedrijf}} ({{domein}}, type {{type}}). Je krijgt: de website-teksten, de LinkedIn-bedrijfsdata, interne salesnotities (indien aanwezig) en reviewthema's. Gebruik web-research alleen voor gaten (nieuws, interviews, vacatures). Is het type B2C: check ook de marktplaats-aanwezigheid (bol.com, Amazon) en beschrijf kort hoe het merk daar gepresenteerd wordt. Regels: elk gegeven krijgt een bron; wat je niet kunt vaststellen markeer je letterlijk als 'onbekend'; je vult nooit een gat met een aanname zonder het label aanname; geen em-dashes. Output: markdown volgens sectie 2 van het pack-template."
  2. **Markt-agent** (Gemini Pro plus grounding): "Bepaal markt en 3 tot 5 directe concurrenten voor {{bedrijf}}. Je krijgt de Semrush-concurrentenlijst (data) en het bedrijfsprofiel. Beoordeel per Semrush-kandidaat of het een echte directe concurrent is (zelfde doelgroep en aanbod, niet alleen keyword-overlap). Vul aan via web-research. Per concurrent: naam, domein, waarom concurrent (bewijs), bron. Markeer: staat de concurrent in zowel Semrush als je eigen research, dan zekerheid 'vastgesteld', anders 'waarschijnlijk'. Output: markdown plus een JSON-regel met de definitieve lijst."
  3. **Funnel-agent** (Gemini Flash): "Beschrijf de zichtbare funnel van {{domein}} op basis van de meegeleverde pagina-inhoud en screenshots: type (webshop-checkout, leadgen-formulier, demo-aanvraag), stappen tot conversie, e-mail-capture (popup, nieuwsbrief), opvallende frictie. Alleen wat zichtbaar is; niets aannemen over wat erachter gebeurt. Zekerheid maximaal 'waarschijnlijk'. Output: markdown volgens pack-sectie 9."
  4. **Visuele rubric** (Gemini Flash met vision): "Beoordeel de meegeleverde screenshots (site desktop en mobiel, Instagram-grid, ad-creatives) op exact deze vier vragen: (1) is de visuele stijl consistent tussen site, social en ads; (2) oogt het professioneel: beeldkwaliteit, typografie-discipline, witruimte; (3) is er een herkenbare visuele identiteit: kleuren, vormen, terugkerende elementen; (4) zijn er verouderings-signalen. Per vraag: 2 tot 3 zinnen plus concrete voorbeelden uit de beelden. Sluit af met: 'Dit is een eerste indruk op aanname-niveau; het brandbook van de partner is leidend.'"
  5. **Aannames-synthese** (Gemini Pro): "Je krijgt het volledige pack-concept. Verzamel alle gegevens met zekerheid 'waarschijnlijk' of 'aanname' plus alle velden 'onbekend'. Scoor elk op impact: verandert dit wat het team in de eerste 90 dagen doet? Kies de top 3 tot 5 op impact maal onzekerheid. Per aanname exact dit format: bewering; waarop gebaseerd (bron); waarom het ertoe doet; de letterlijke vraag aan de partner in de kickstart; wat er verandert als het niet klopt."
  6. **Cross-checker** (OpenAI, GPT-mini-klasse): "Je bent factchecker. Je krijgt het pack-concept plus de onderliggende brondata (scans, Semrush, Apify-output). Controleer per sectie: (a) staat er een bewering zonder bron; (b) spreekt een bewering de brondata tegen; (c) is een 'vastgesteld'-label te sterk voor het bewijs. Output: lijst van bevindingen met sectie, citaat, probleem, voorstel (afzwakken naar waarschijnlijk/aanname, of verwijderen). Geen bevindingen: zeg dat expliciet."
- [ ] **Stap 1.5: beoordelingsrubric.md.** Voor Hidde, per proefpack: per sectie een oordeel (juist / deels juist / onjuist / niet opgehaald) plus een steekproef van 3 bronnen per pack (klik de bron aan: klopt de bewering?), plus drie totaalvragen: zou de audit hiermee sneller starten; is de kwaliteit consistent tussen de drie branches; welke sectie moet beter voordat een partner hier iets van mag zien.
- [ ] **Stap 1.6: testset-tagscan.md.** Vijf referentiesites met verschillende platforms, default: coolblue.nl (maatwerk), een bekende Shopify-shop (bijv. mrmarvis.nl), een WordPress/WooCommerce-site, een Webflow-site, een B2B-SaaS-site (bijv. mollie.com). Instructie: bij de eerste succesvolle scan wordt de gevonden set per site de baseline; elke latere wijziging aan de patroonbibliotheek moet op alle vijf dezelfde of betere resultaten geven (regressiecheck).
- [ ] **Stap 1.7: Commit.** `git commit -m "Taak 1: contract, patroonbibliotheek, pack-template, prompts, rubric, testset"`

---

## Taak 2: Sub-workflow "SS Research - Tagscan" in n8n

**Interfaces:**
- Consumeert: `{"domein": "example.nl", "extra_domeinen": []}` als input.
- Produceert: `{"tech": [{"tool": "...", "categorie": "...", "id": "GTM-XXX of null", "laag": 1, "zekerheid": "vastgesteld"}], "niet_scanbaar": false, "sgtm_indicatie": false}`. Taken 3 en 6 rekenen op exact deze veldnamen.

- [x] **Stap 2.1:** Volg de n8n-MCP-werkvolgorde (zie randvoorwaarden). Nodes: Execute Workflow Trigger (input), HTTP Request (GET `https://{{domein}}`, user-agent `Mozilla/5.0 (compatible; SS-ResearchBot/1.0)`, timeout 30s, redirects volgen), Code-node laag 1 (laad de patroonbibliotheek als constante in de code; pas alle laag-1-patronen toe op de HTML), IF (GTM gevonden?), HTTP Request laag 2 (GET `https://www.googletagmanager.com/gtm.js?id={{GTM-id}}`), Code-node laag 2 (pas laag-2-patronen toe op de containerbody), Merge, Code-node output (bouw het output-object; dedupliceer per tool; zet `niet_scanbaar: true` als de eerste fetch een 403/blokkade gaf).
- [x] **Stap 2.2:** `validate_workflow`, fix fouten, dan `create_workflow_from_code` met beschrijving "Tag-scan sub-workflow voor het Partner Research Pack (laag 1: HTML, laag 2: GTM-container). Inactief, handmatig." Workflow-id `LkH0bLVZVCaYInop`.
- [x] **Stap 2.3: Regressietest.** Getest met `test_workflow` (pin data met echte, actuele site-inhoud; `execute_workflow` bleek de Execute Workflow Trigger niet te ondersteunen). Baseline per site in `testset-tagscan.md`. Resultaat: platformherkenning correct op alle 5 sites (inclusief de 3 waar "geen fingerprint"/geblokkeerd het feitelijk juiste antwoord is); GTM/GA4 gevonden op 2 van de 5 in plaats van de gestelde 3, met een eerlijke verklaring per site (2 vermoedelijke SPA's, 1 bot-blokkade) in plaats van een defect in de scanlogica. Tijdens het testen twee echte fouten gevonden en gecorrigeerd (GTM-patroon miste de standaard-installatiesnippet; Merge liet items vallen bij een lege tak), zie LOG.md en testset-tagscan.md.
- [x] **Stap 2.4:** LOG.md bijgewerkt (workflow-id, testresultaten per site, gevonden fouten) en commit volgt.

---

## Taak 3: Hoofd-workflow deel 1: "SS Research - Fundament"

**Interfaces (bijgewerkt tijdens de bouw, zie LOG.md "Taak 3" voor de volledige onderbouwing):**
- ~~Input (handmatige form-trigger): `bedrijfsnaam` (tekst), `domein` (tekst), `type` (dropdown B2B/B2C), `hubspot_zoeken` (ja/nee).~~ Vervangen op instructie van Hidde: Manual Trigger + "Testinvoer"-node (`bedrijfsnaam_zoekterm`, `domein`, `type_override`) + een Google Sheets-lookup op de sheet "Form Responses" (`1a98wRYG9dMu2KG866xrd1VO3iSmv0Qw0wm9ZxqavtX8`, dezelfde bron als de Make-onboarding-automatisering) voor `bedrijfsnaam`/`type`. `domein` blijft handmatig (staat niet in de sheet). `hubspot_zoeken` vervalt: de HubSpot-tak (stap 3.2) is op instructie van Hidde overgeslagen voor nu.
- Produceert het context-object dat alle latere branches gebruiken: `{"bedrijf", "domein", "type", "paginas": [{"url", "tekst"}], "footer_links": [], "social_links": {"instagram": null, "tiktok": null, "linkedin": null, "youtube": null, "x": null}, "extra_domeinen": [], "hubspot": {"company": {}, "notities_samenvatting": ""}, "tagscan": {}}`

- [x] **Stap 3.1:** Gebouwd met het herontwerp hierboven. Workflow `SS Research - Fundament`, id `I6wPX5cUZcKjiugp`. Zie LOG.md voor het volledige nodeoverzicht.
- [~] **Stap 3.2: HubSpot-tak.** Overgeslagen op expliciete instructie van Hidde tijdens de bouw ("sla deze hubspot stap over en ga door naar de belangrijkere nodes"). De `hubspot`-sleutel blijft gevuld met de lege standaardwaarde uit het ontwerp. Niet vergeten, bewust uitgesteld; kan in een latere sessie alsnog toegevoegd worden.
- [x] **Stap 3.3:** `validate_workflow` en `create_workflow_from_code` doorlopen, twee testruns met `test_workflow` en echte, curl-opgehaalde inhoud van mollie.com als pin-data (nep-partner, want niet in de sheet: test van het fallback-pad). Context-object bevat alle velden inclusief een echte tagscan-sub-executie. Eén echte fout gevonden en gecorrigeerd tijdens het testen (`new URL` niet beschikbaar in de Code-node-sandbox), zie LOG.md.
- [x] **Stap 3.4:** LOG.md bijgewerkt, commit volgt.

---

## Taak 4: Bronnen-branches aan de hoofd-workflow

**Interfaces:** elke branch leest het context-object en schrijft zijn resultaat onder een eigen sleutel: `semrush`, `ad_channels`, `linkedin_company`, `reviews`, `socials`, `screenshots`.

- [x] **Stap 4.1: Semrush-branch.** Gebouwd: drie HTTP Request-nodes (domain_ranks overview, domain_organic top-keywords, domain_organic_organic concurrenten) plus een Code-node die de CSV-respons parseert en het unit-verbruik schat. Gestructureerd getest met realistische CSV-pin-data (zie LOG.md "Taak 4.1"). De eenmalige echte verificatiecall kan pas als Hidde de credential `Semrush API` heeft aangemaakt (staat op de actielijst); dat is de enige nog ontbrekende stap voor een live run.
- [x] **Stap 4.2: Ad-libraries-branch.** Meta (`curious_coder/facebook-ads-library-scraper`, 33.739 gebruikers) en Google (`solidcode/ads-transparency-scraper`, 1.130 gebruikers) actors gekozen via Apify's publieke store-API en getest met realistische pin-data (zie LOG.md "Taak 4.2"). TikTok-actor bewust nog niet geselecteerd/getest (voorfilter werkt wel: alleen check als tagscan een TikTok-pixel vond). LinkedIn: vaste handmatige link, zoals voorgeschreven.
- [x] **Stap 4.3: Reviews-branch.** Make-scenario 3033093 gelezen (alleen lezen): bevat geen Trustpilot-actor (bleek een kale HTTP-fetch + GPT te zijn), wel twee Google Maps-actors (`compass/google-maps-extractor`, `compass/Google-Maps-Reviews-Scraper`), hergebruikt via Apify's REST-API (dedicated Apify-node kon niet via `get_node_types` opgezocht worden, tool-beperking). Trustpilot gebouwd als kale HTTP GET + regex-extractie (geen GPT nodig). Thema-extractie met een echte, live Gemini Flash-call getest (zie LOG.md "Taak 4.3"): kwalitatief goede, correct geciteerde thema-clustering.
- [ ] **Stap 4.4: LinkedIn-bedrijfsdata.** Haal de publieke LinkedIn-bedrijfspagina op (Apify-actor voor LinkedIn company pages, zelfde selectie-aanpak als 4.2): over-ons-tekst, medewerkersaantal-range, sector, opgegeven locatie, en het aantal openstaande vacatures met titels. Lukt de actor niet: laat de profiel-agent (taak 5) dit via Google Search grounding ophalen en markeer de zekerheid dan als "waarschijnlijk" in plaats van "vastgesteld". Resultaat onder sleutel `linkedin_company`.
- [ ] **Stap 4.5: Socials-branch.** Voor elk gevonden social-kanaal uit het context-object een Apify-profielactor (zelfde selectie-aanpak als 4.2): volgers, aantal posts, laatste 25 posts met datum, likes, comments, caption. Code-node berekent: posts per week (laatste 90 dagen), regelmaat (standaarddeviatie van de intervallen, vertaald naar "vast ritme / onregelmatig"), engagement-rate (gemiddelde interacties gedeeld door volgers). Gemini Flash clustert de captions in onderwerpen. Groei: alleen als er een bruikbare publieke bron is (Social Blade); anders letterlijk "groei: nog geen historie beschikbaar".
- [ ] **Stap 4.6: Screenshots-branch.** Headless screenshots van home plus 1 kernpagina, desktop (1440px) en mobiel (390px). Gebruik een Apify-screenshot-actor of een bestaande n8n-community-node; sla de beelden op in de test-Drive-map. Voeg de top-3 ad-creatives uit 4.2 toe aan de beeldenset. Deze render is tegelijk de laag-3-fallback van de tagscan: gaf de tagscan `niet_scanbaar` of een verdacht leeg beeld, geef dan de gerenderde HTML alsnog door de laag-1-patronen en markeer die vondsten met `"laag": 3`.
- [ ] **Stap 4.7:** Elke branch apart testen met `test_workflow` op dezelfde nep-partner als taak 3, resultaten en kosten per branch in LOG.md, commit.

---

## Taak 5: AI Agent-blokken plus verificatie-pass

**Interfaces:** consumeert het volledige context-object plus alle branch-resultaten; produceert `pack_concept` (markdown per sectie) en `prefill_concept` (JSON volgens `prefill-schema-v1.json`).

- [x] **Stap 5.1:** Vier AI Agent-nodes gebouwd (profiel-agent, markt-agent op Gemini 3.1 Pro; funnel-agent op Gemini 3.1 Flash-lite). Google Search grounding niet geïmplementeerd (niet beschikbaar in de n8n Gemini-node v1.1); openstaand beslispunt op de actielijst. Visuele rubric vervangen door een stub (geen screenshots beschikbaar, taak 4.6 niet gebouwd); zie LOG.md "Taak 5".
- [x] **Stap 5.2: Aannames-synthese.** Gemini 3.1 Pro-call gebouwd en getest; gaf 4 concrete, bruikbare aannames in het gevraagde 5-punts-format.
- [x] **Stap 5.3: Cross-check.** OpenAI gpt-5-mini-call gebouwd en getest; vond echte kwaliteitsproblemen in de conceptoutput (zie LOG.md). Bevindingen komen nu als apart tekstveld door, nog niet automatisch verwerkt in het pack_concept zelf.
- [x] **Stap 5.4: Prefill-extractie.** Gebouwd; een echte bug gevonden en gefixt tijdens het testen (JSON-extractie uit de markt-agent-output matchte gulzig het verkeerde haakjespaar), zie LOG.md.
- [x] **Stap 5.5:** Volledige end-to-end testrun (execution 97067) met vijf echte, live LLM-aanroepen. Alle pack-secties bevatten bronnen, "onbekend" verschijnt correct waar branches niet gebouwd zijn (LinkedIn, socials, screenshots, HubSpot), prefill-JSON is valide en compleet na de fix. LOG.md bijgewerkt, commit volgt.

---

## Taak 6: Assemblage en output

- [ ] **Stap 6.1: Pack-doc.** Google Docs-node: maak een document in de test-Drive-map met naam `{{bedrijfsnaam}} | Research Pack | S&S (PROEF)`, gevuld vanuit `pack_concept` volgens `pack-template.md`, inclusief het lege reviewblok bovenaan en een slotregel met datum, workflow-versie en totale kosten van de run.
- [ ] **Stap 6.2: Prefill-JSON.** Schrijf het JSON als bestand naar dezelfde test-Drive-map (naam `{{bedrijfsnaam}}-prefill-v1.json`). De koppeling met de Worker en de vragenlijst is bewust buiten scope (partner-facing, wacht op Hiddes beoordeling en go).
- [ ] **Stap 6.3: Kostenregel.** Code-node die de gelogde kosten per branch optelt en in de LOG.md-structuur meegeeft (per run: Apify-kosten, Semrush-units, LLM-tokens, totaal in euro).
- [ ] **Stap 6.4:** End-to-end-run op de nep-partner, doc en JSON handmatig openen en controleren, LOG.md plus commit.

---

## Taak 7: Drie proefruns plus beoordelingspakket voor Hidde

- [ ] **Stap 7.1: Bedrijfskeuze.** Stel Hidde drie proefbedrijven voor uit drie verschillende hoeken: een B2C-e-commerce, een B2B-SaaS of -dienstverlener, en een traditioneel/lokaal bedrijf. Bij voorkeur echte recente partners (packs blijven in de testmap), anders bekende Nederlandse bedrijven. Wacht op zijn bevestiging (dit is een expliciet beslispunt, geen default nemen).
- [ ] **Stap 7.2:** Draai de volledige workflow per bedrijf. Log per run: doorlooptijd, kosten per branch, welke velden "onbekend" bleven, welke branches faalden.
- [ ] **Stap 7.3: Beoordelingspakket.** Zet voor Hidde klaar: de drie pack-docs, de drie prefill-JSONs, en per pack een ingevulde kop van `beoordelingsrubric.md` (de secties alvast opgesomd, oordeel-kolommen leeg). Stuur hem de locaties als DM of noteer ze in het eindrapport van de sessie.
- [ ] **Stap 7.4:** LOG.md afronden met een eerlijk overzicht: wat werkt, wat wankel is, welke kosten per run, en de openstaande punten voor na de beoordeling (review-beleid pre-fill, vragenlijst-sanering ticket 15, Worker-koppeling, automatisering ticket 17). Commit.

---

## Wat dit plan bewust NIET doet

1. **Vragenlijst-sanering (ticket 15):** pas na Hiddes beoordeling van de proefpacks (het pack moet bewijzen dat het de te schrappen onderwerpen dekt).
2. **Pre-fill in de live vragenlijst plus Worker-endpoint:** partner-facing; wacht op het review-beleid-besluit en een expliciete go.
3. **Automatische trigger (ticket 17):** gated op drie bruikbare packs plus go van Hidde.
4. **Kennisbank/vector store (zelflerend):** v2, zodra er gereviewde packs met correcties bestaan.
5. **Notificaties, Monday-subitems, registry-koppeling:** horen bij ticket 17.

## Definitie van klaar (voor dit plan als geheel)

- [ ] Alle referentiebestanden staan in de repo en zijn gecommit.
- [ ] De n8n-workflows (tagscan-sub-workflow plus hoofd-workflow) bestaan, zijn inactief, via MCP leesbaar, en end-to-end getest.
- [ ] Drie proefpacks plus prefill-JSONs staan in de test-Drive-map.
- [ ] Kosten per run zijn gelogd en onder de 2 euro, of de overschrijding is verklaard.
- [ ] Hidde heeft het beoordelingspakket en de rubric; zijn oordeel bepaalt de volgende fase.
