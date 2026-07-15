---
type: actielijst
project: New Partner Onboarding
ticket: 16 (research-workflow, voorbereidend op 15 en 17)
status: Open, wacht op Hidde
bijgewerkt: 2026-07-15
---

# Hidde-actielijst: Partner Research Workflow (n8n)

Dit zijn de punten die alleen Hidde kan afhandelen: credentials aanmaken, keuzes bevestigen, toegang verifiëren. Sessies vragen nooit om tokens; credentials plakt Hidde altijd zelf in de n8n-UI. De sessie gebruikt daarna alleen de credential-referentie.

## 1. Credentials aanmaken of bevestigen in n8n

### Semrush API (ontbreekt)
- Nodig voor: domain_ranks, top-50 organic keywords, organische concurrenten (taak 4).
- Actie: API-key uit het Semrush Advanced-account ophalen en als nieuwe credential in n8n plakken.
- Naam-suggestie: "SS Research - Semrush API".

### Apify API (bestaat mogelijk al, niet bevestigd)
- Gevonden: "Apify Zeb API" en "Apify account" (beide type `apifyApi`), allebei vermoedelijk van een ander project.
- Niet te verifiëren of een van beide hetzelfde token gebruikt als de Make-connectie "Integration Apify" (credentials tonen nooit secret-waarden).
- Actie: bevestig of een bestaande credential hergebruikt mag worden, of maak een nieuwe aan met hetzelfde token als de Make-connectie "Integration Apify".
- Naam-suggestie bij nieuw: "SS Research - Apify API".

### OpenAI API (bestaat al veelvuldig, niet dedicated)
- Gevonden: 7+ credentials (onder andere "Marijn - OpenAi connection", "Zeb OpenAI API CRS", "Sprints & Sneakers - Alpha - SEO agent"), allemaal gekoppeld aan andere projecten of personen.
- Nodig voor: de cross-checker (prompt 6, GPT-mini-klasse).
- Actie: nieuwe dedicated credential aanmaken (voorkomt afhankelijkheid van een sleutel die een ander project kan intrekken of uitputten), of expliciet aanwijzen welke bestaande herbruikt mag worden.
- Naam-suggestie bij nieuw: "SS Research - OpenAI API".

### Gemini / Google AI (bestaat, niet dedicated)
- Gevonden: "Google Gemini(PaLM) Api account" en "Google GeminiTNO" (beide `googlePalmApi`), lijken aan andere projecten gekoppeld.
- Nodig voor: profiel-agent en markt-agent (Gemini Pro plus grounding), funnel-agent en visuele rubric (Gemini Flash).
- Actie: nieuwe dedicated credential aanmaken, zodat het gratis grondings-quotum (5.000 grounded prompts per maand) niet gedeeld wordt met andere workflows.
- Naam-suggestie: "SS Research - Gemini API".

### Google Drive/Docs met schrijfrechten op de testmap (waarschijnlijk niet nodig, bevestiging gevraagd)
- Gevonden: "S&S N8N - Drive API" (`googleDriveOAuth2Api`), "Google Service Account account" (`googleApi`, generiek), "Google - Accounts@sprintsandsneakers.com" (`googleDocsOAuth2Api`).
- Actie: bevestig welke van deze credentials schrijfrechten heeft op de testmap uit punt 2 hieronder, zodra die map vaststaat. Alleen als geen van deze voldoet: nieuwe credential aanmaken.

## 2. Test-Drive-map bevestigen

De testomgeving van ticket 11 (`Onboarding workflow/Onboarding-Aanpassingen-Overzicht.md` sectie 16) documenteert een test-Registry-sheet en een test-Monday-board, maar geen test-Drive-map.

Kandidaat: map-id `1rizHNIfUqbI87whaLvlc_MqItvfHsdaA`, aangemaakt tijdens de spike van ticket 02 (2026-07-10) via de service-account-endpoint. Ik kon niet verifiëren of deze map nog bestaat of toegankelijk is: de Google Drive-tool gaf de foutmelding "ineligible to be used in generative AI contexts" terug, geen duidelijk bestaat- of bestaat-niet-antwoord.

Actie: bevestig of deze map hergebruikt mag worden, of geef een nieuwe map-id door. Alle output van de proefruns (Research Pack-docs, prefill-JSON's, screenshots) gaat hierin, nooit in een echte partnermap.

## 3. Semrush-verbruikscheck (ter info, geen actie nu)

Zodra de Semrush-credential er is, draait taak 4 eerst een goedkope testcall (domain_ranks, 1 regel, ongeveer 10 units) om de key en het resterende saldo te verifiëren, voordat de grotere calls (top-50 keywords, concurrenten) draaien.

## 4. Naamgevingsadvies (observatie, geen blokkerende actie)

Dit n8n-account bevat 134 credentials, gedeeld over veel andere projecten en mensen (onder andere Zeb, Victor, Bobby, Marijn, Ray, GEO Agent, META Ads Agent, TNO Content). Er is geen consistente naamgeving voor dit project. Advies: geef elke nieuwe credential voor deze workflow een herkenbaar voorvoegsel, bijvoorbeeld "SS Research - ...", zodat ze niet verdwijnen tussen de rest en duidelijk gekoppeld blijven aan ticket 16.

## 5. MCP-zichtbaarheid workflows (ter info, pas relevant vanaf taak 2)

De drie bestaande workflows die matchen op "research" (Creative Research Agent Zeb, PA2 Research_Agent, keyword research SEMRUSH) staan alle drie op `availableInMCP: false`. Dit lijkt een instelling per workflow, niet een accountbrede blokkade. Bij het aanmaken van nieuwe workflows in latere taken: controleren met `get_workflow_details` of ze automatisch beschikbaar zijn via MCP; zo niet, moet dat mogelijk handmatig aangezet worden in de workflow-instellingen in de n8n-UI (zoals de globale randvoorwaarden van het stappenplan al voorschrijven).
