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

- **Semrush-verbruikscheck** (stap 0.5 / taak 4): eerst de goedkope testcall (domain_ranks, 1 regel, circa 10 units) draaien zodra de Semrush-tak gebouwd wordt.
- **Semrush-credential aanmaken in n8n (actie voor Hidde, blokkeert alleen de live/echte run, niet de bouw):** de Semrush-tak (taak 4.1) is gebouwd en gestructureerd getest met gesimuleerde CSV-data, maar heeft voor een echte call een generieke Query Auth-credential nodig, genaamd exact `Semrush API`, met als query-parameternaam `key` en als waarde de sleutel die je al eerder in deze sessie deelde (uit de disabled node in workflow z4qoXxd8yRG5HyXf). Ik zet zelf nooit een API-key in een n8n-node-parameter of in dit bestand (n8n-SDK-regel en projectregel); dat maakt dit de enige stap die alleen jij in de n8n-UI kan doen. Zodra de credential met deze exacte naam bestaat, hoeft er verder niets aangepast te worden aan de workflow zelf.
- **Google Docs-credential voor taak 6**: bevestigen of "S&S N8N - Drive API" ook de Docs-node dekt, of dat "Google - Accounts@sprintsandsneakers.com" (`googleDocsOAuth2Api`) nodig is. Geen actie nu, pas relevant bij de pack-doc-assemblage.

## Inspiratie ontvangen (2026-07-15)

Hidde deelde een bestaande, werkende n8n-workflow "Growth Scan Website" ([workflow](https://n8n.sprintsandsneakers.com/workflow/hzgnmy7cw8g0sXPY), JSON-export in `Input:inspiratie/Growth Scan Website.json`) als mogelijke inspiratie. Relevante observaties staan in `LOG.md` onder "Inspiratie: bestaande Growth Scan-workflow"; geen van de huidige ontwerpbesluiten is hierdoor gewijzigd.
