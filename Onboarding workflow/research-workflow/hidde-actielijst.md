---
type: actielijst
project: New Partner Onboarding
ticket: 16 (research-workflow, voorbereidend op 15 en 17)
status: Beantwoord door Hidde (2026-07-15), zie vastgelegde keuzes hieronder
bijgewerkt: 2026-07-15
---

# Hidde-actielijst: Partner Research Workflow (n8n)

Alle punten uit de eerste versie van dit bestand (taak 0) zijn door Hidde beantwoord op 2026-07-15. Dit bestand blijft staan als vastgelegde beslissing, niet als open vraag. Latere taken gebruiken de tabel hieronder letterlijk.

## Vastgelegde keuzes (antwoord Hidde, 2026-07-15)

| Onderdeel | Te gebruiken | Bron/toelichting |
|---|---|---|
| Semrush API | Zelfde key als in workflow [z4qoXxd8yRG5HyXf](https://n8n.sprintsandsneakers.com/workflow/z4qoXxd8yRG5HyXf), node "2B - SEMrush Backlinks1" | Hidde heeft deze koppeling al opgezet in een andere workflow; key hergebruiken. Key zelf niet in de repo overnemen (staat alleen in n8n zelf), zie opmerking hieronder |
| Apify API | Credential "Apify Account" | Bevestigd door Hidde, niet nieuw aanmaken |
| OpenAI API | Credential "Sprints & Sneakers - Alpha - SEO agent" | Bevestigd door Hidde: bestaande credential hergebruiken, geen dedicated nieuwe |
| Gemini / Google AI | Credential "Google Gemini(PaLM) Api account" | Bevestigd door Hidde: bestaande credential hergebruiken, geen dedicated nieuwe |
| Google Drive | Credential "S&S N8N - Drive API" | Bevestigd door Hidde. Voor de Google Docs-node in taak 6 nog te checken of dezelfde credential volstaat of dat een aparte Docs-credential nodig is; geen actie nu |
| Test-Drive-map | "Gamma - Hidde test map", folder-ID `19ujq_RJ39UoFhyuKGfShF1PF1p2O4J4N` ([link](https://drive.google.com/drive/folders/19ujq_RJ39UoFhyuKGfShF1PF1p2O4J4N)), pad Shared Drive/S&S - Projects/2. Current projects/6. Gamma/ | Nieuwe, door Hidde aangewezen map. Vervangt de ticket-02-spikemap uit de eerste versie van dit bestand; die kandidaat is niet meer relevant |
| Naamgeving credentials | Niet aanpassen | Hidde: "niet doen, laten staan zoals het nu is". Mijn naamgevingsadvies (voorvoegsel "SS Research - ...") is dus niet van toepassing; bestaande, gedeelde credentials blijven ongewijzigd in gebruik |
| MCP-zichtbaarheid workflows | Geen actie nodig | Hidde bevestigt: bewust zo (bestaande workflows van andere projecten hoeven niet MCP-zichtbaar); voor de workflow die wij bouwen zet Hidde zelf `availableInMCP` aan na aanmaak |

**Belangrijk over de Semrush-key:** Hidde heeft de sleutel in de sessie gedeeld (gekopieerd uit een bestaande, disabled node in een andere workflow). Die sleutel wordt hier bewust niet als tekst herhaald, om te voorkomen dat een API-key in git terechtkomt (zelfde risico als het bekende, al gelogde probleem met het hardcoded Monday-token uit 2021 in de Make-blueprints). Bij het bouwen van de Semrush-tak (taak 4) wordt dezelfde sleutel rechtstreeks in de n8n-node overgenomen (consistent met hoe de bestaande node het al doet), niet in een repo-bestand.

## Nog te doen, geen blokkade (uitvoering hoort bij latere taken)

- **Semrush-verbruikscheck** (stap 0.5 / taak 4): eerst de goedkope testcall (domain_ranks, 1 regel, circa 10 units) draaien zodra er een echte run gebeurt.
- **Google Docs-credential voor taak 6**: bevestigen of "S&S N8N - Drive API" ook de Docs-node dekt, of dat "Google - Accounts@sprintsandsneakers.com" (`googleDocsOAuth2Api`) nodig is. Geen actie nu, pas relevant bij de pack-doc-assemblage.
- **Handmatige credential-koppeling in de n8n-UI (structureel, niet per credential):** voor alle HTTP Request-nodes (Semrush x3, Apify x5, de twee kale site-fetches) koppelt de n8n-MCP-tool credentials nooit automatisch, ongeacht de naam; dat geldt voor elke node van dit type, telkens wanneer de workflow wordt bijgewerkt. Even in elke node de credential-dropdown controleren in de UI voordat een echte run gedraaid wordt.

## Antwoorden Hidde op de actielijst-update (2026-07-15, na taak 4.1/4.2/4.3)

| Onderdeel | Antwoord Hidde | Verwerkt |
|---|---|---|
| Semrush-credential | Aangemaakt: Query Auth, naam "SemRush API" (in n8n zelf geregistreerd als "Semrush API"), parameter "key", met de sleutel | Naam kwam al exact overeen met de referentie in de workflow (`newCredential('Semrush API')`); geen codewijziging nodig |
| Apify-credential | "Apify account is goed!" | Bevestigd, geen wijziging |
| Google Sheets-credential | Gebruik "Google Sheet Hidde-Ops" (niet de eerder zelf gekozen "Google sheets account - Google cloud project n8n") | Workflow bijgewerkt: `Partnerrij ophalen (Form Responses)`-node verwijst nu naar "Google Sheet Hidde-Ops" |
| Losse `Input:inspiratie/Growth Scan Website.json` | "nee hoeft niet meegenomen te worden!" | Blijft untracked, geen actie nodig |
| Proefbedrijven taak 7 (stap 7.1) | Uitelkaar.nl, Boekenwereld, WONDR Experience | Vastgelegd hieronder, wordt pas gebruikt bij taak 7 |

## Taak 7: proefbedrijven (besluit Hidde, 2026-07-15)

De drie proefbedrijven voor de eindtest (stap 7.1) staan al vast, ruim voordat taak 5 en 6 klaar zijn: **Uitelkaar.nl**, **Boekenwereld**, **WONDR Experience**. Geen verdere actie nodig tot taak 7 aan de beurt is.

## Inspiratie ontvangen (2026-07-15)

Hidde deelde een bestaande, werkende n8n-workflow "Growth Scan Website" ([workflow](https://n8n.sprintsandsneakers.com/workflow/hzgnmy7cw8g0sXPY), JSON-export in `Input:inspiratie/Growth Scan Website.json`) als mogelijke inspiratie. Relevante observaties staan in `LOG.md` onder "Inspiratie: bestaande Growth Scan-workflow"; geen van de huidige ontwerpbesluiten is hierdoor gewijzigd. Bestand blijft untracked (bevestigd door Hidde, 2026-07-15).
