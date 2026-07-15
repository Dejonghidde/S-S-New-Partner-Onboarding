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

## Openstaand beslispunt: Google Search grounding voor de profiel- en markt-agent (na taak 5)

Het ontwerp vraagt "Gemini Pro met Google Search grounding" voor de profiel-agent en markt-agent. De n8n-node voor Gemini Chat Model (`lmChatGoogleGemini`, v1.1) heeft geen grounding-parameter in de opgehaalde typedefinitie; native Gemini-grounding is dus niet beschikbaar via deze node-versie. Beide agents draaien nu zonder grounding, alleen op trainingskennis plus de meegegeven context; in de testrun (zie LOG.md "Taak 5") gaf dit nog steeds bruikbare, eerlijk gelabelde output, dus dit is geen blokkade, maar wel een kwaliteitsbeperking (geen actuele/live informatie).

Opties:
1. Niets doen: agents blijven zonder grounding werken (huidige staat).
2. Een losse zoektool aan de agent hangen (SerpApi of Perplexity, beide via `get_suggested_nodes` als optie getoond); dit vereist een nieuwe, betaalde credential die nu nergens in het account bestaat (`list_credentials` gaf 0 resultaten voor beide). Ik maak deze keuze niet zelf omdat het een nieuwe doorlopende kostenpost is, geen eenmalige technische keuze.

Mijn aanbeveling: optie 1 aanhouden tot na de eerste proefpack-beoordeling (taak 7); pas dan blijkt of het gebrek aan actuele web-informatie daadwerkelijk een probleem is in de praktijk.

## Taak 7: proefbedrijven (besluit Hidde, 2026-07-15)

De drie proefbedrijven voor de eindtest (stap 7.1) staan al vast, ruim voordat taak 5 en 6 klaar zijn: **Uitelkaar.nl**, **Boekenwereld**, **WONDR Experience**. Geen verdere actie nodig tot taak 7 aan de beurt is.

## Inspiratie ontvangen (2026-07-15)

Hidde deelde een bestaande, werkende n8n-workflow "Growth Scan Website" ([workflow](https://n8n.sprintsandsneakers.com/workflow/hzgnmy7cw8g0sXPY), JSON-export in `Input:inspiratie/Growth Scan Website.json`) als mogelijke inspiratie. Relevante observaties staan in `LOG.md` onder "Inspiratie: bestaande Growth Scan-workflow"; geen van de huidige ontwerpbesluiten is hierdoor gewijzigd. Bestand blijft untracked (bevestigd door Hidde, 2026-07-15).

## Nog te doen na taak 4.4/4.5/4.6 (2026-07-15), geen blokkade

- **Nieuwe Apify-credentials handmatig koppelen:** "LinkedIn: bedrijfspagina zoeken", "Socials: Instagram-profiel ophalen", "Screenshots: desktop maken", "Screenshots: mobiel maken" zijn niet automatisch gekoppeld bij het aanmaken/bijwerken van de workflow (zelfde structurele beperking als eerder gemeld voor de Semrush/Apify-nodes uit taak 4.1-4.3). Even controleren in de n8n-UI voor een echte run.
- **Ongeverifieerde outputvelden:** de exacte veldnamen van de LinkedIn-actor (`aboutUs`, `employeeCount`, `industry`, `headquarters`, `jobCount`) en de screenshot-actor (`screenshotUrl`) zijn gebaseerd op de gedocumenteerde inputschema's/readme-voorbeelden, niet op een echte outputrun met de credential. De parse-code raadt met meerdere veldnaam-varianten als vangnet, maar de eerste echte run moet dit bevestigen (zelfde soort openstaand punt als bij de ad-libraries-actors uit taak 4.2).
- **Instagram-actor levert max. 12 posts, niet 25:** `apify/instagram-profile-scraper` is gekozen voor de rijke profieldata (volgers, posts, captions in één call), maar levert maximaal de laatste 12 posts. Voor het volle aantal van 25 uit het ontwerp is een aanvullende actor nodig (kandidaat: `apify/instagram-post-scraper`); niet gebouwd deze sessie, staat expliciet in de output zelf (`instagram.opmerking`).
- **Alleen Instagram, geen TikTok/YouTube/X/LinkedIn-profielstatistieken:** taak 4.5 vroeg om "elk gevonden social-kanaal"; deze sessie is bewust alleen Instagram geïmplementeerd. Staat expliciet in de pack-sectie zelf als "onbekend, niet gebouwd deze sessie", geen stille aanname.
- **Laag-3-fallback (tagscan-patronen op gerenderde HTML) niet gebouwd:** de gekozen screenshot-actor (`apify/screenshot-url`) levert alleen een PNG, geen gerenderde HTML/DOM, dus kan de laag-3-fallback uit het ontwerp niet voeden. Kandidaat-tool voor een latere sessie: Firecrawl.
- **Visuele-rubric-agent nog niet aangesloten op vision-input:** screenshots worden nu wel gemaakt en in Drive opgeslagen, maar de AI Agent-node zelf gebruikt ze nog niet als vision-input. n8n's `passthroughBinaryImages`-optie op de Agent-node lijkt dit te ondersteunen, maar het combineren van meerdere binaire afbeeldingen in één aanroep is niet getest deze sessie; bewust geen ongeteste koppeling als "af" opgeleverd.
