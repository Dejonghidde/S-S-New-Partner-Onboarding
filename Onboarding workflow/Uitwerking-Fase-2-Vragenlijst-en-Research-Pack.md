---
type: ontwerpdocument (spec voor de bouw)
project: New Partner Onboarding
tickets: 15, 16, 17 (masterplan fase 2)
status: Ontwerp definitief na brainstorm met Hidde (2026-07-15); bouw via Stappenplan-Research-Workflow-n8n.md
opgesteld: 2026-07-15, brainstorm Hidde + Claude (vervangt de eerdere versie van dit document volledig)
---

# Ontwerp: Partner Research Workflow plus vragenlijst-pre-fill (tickets 15, 16, 17)

## 1. Doel en eindbeeld (besluit Hidde)

**Combinatie van beide werelden:** de vragenlijst wordt flink korter (alles wat S&S zelf kan achterhalen gaat eruit), EN de feitenblokken die overblijven staan per partner vooraf gevuld met onze research, zodat de partner alleen bevestigt en aanvult. De research levert daarnaast een volledig intern Research Pack per partner voor team, audit en kickstart.

**Aanpak (besluit Hidde):** hybride tempo. De research-workflow wordt in n8n gebouwd (geen Claude-afhankelijkheid: usage-limits en kosten), handmatig getriggerd per partner, maar vanaf run 1 met het definitieve datamodel zodat automatisering (ticket 17) er later omheen kan zonder herwerk. Hidde beoordeelt eerst echte output (proefpacks) voordat er iets partner-facing gebeurt; de review-regels voor pre-fill worden pas daarna vastgesteld.

**Volume:** gemiddeld 1 a 2 nieuwe partners per maand, uitschieters tot 4. Alles is daarom pay-per-use ingericht; er komt geen enkel nieuw abonnement bij.

## 2. Besluiten uit de brainstorm (2026-07-15, allemaal van Hidde)

| # | Besluit |
|---|---|
| 1 | Eindbeeld: kortere lijst plus pre-filled verificatieblokken (combinatie) |
| 2 | Platform: n8n (eigen cloud, n8n.sprintsandsneakers.com); geen Claude in de runtime |
| 3 | Architectuur: deterministische feiten-blokken plus n8n AI Agent-nodes met tools voor interpretatie; multi-LLM (verschillende modelfamilies bundelen en elkaar laten cross-checken) |
| 4 | Data-doorstroom: branches hergebruiken elkaars output (geen dubbele API-kosten); eerst goedkoop fundament, dan gerichte bronnen |
| 5 | SEO-data: Semrush (Advanced-abonnement met API aanwezig); verbruik per run raming 600 tot 1.000 units (3 tot 5 dollarcent) |
| 6 | Google Ads Transparency: Apify-actor eerst (pay-per-use, zelfde beheer); SerpApi als upgrade-pad bij onbetrouwbaarheid |
| 7 | KvK-API: geschrapt (voegt niets toe aan wat LinkedIn/website/HubSpot al leveren) |
| 8 | Tag-detectie: kan zonder partner-toegang (publieke HTML plus gtm.js-container); configuratie-kwaliteit kan niet van buiten en blijft kickstart/audit-onderwerp |
| 9 | Output: twee producten per run: intern pack (Google Doc) plus pre-fill-JSON (contract met de vragenlijst) |
| 10 | Vragenlijst-weergave: verificatiekaart (wij beweren met bron, partner bevestigt/corrigeert), geen vooringevulde invulvelden |
| 11 | Pre-fill confidence-gate: alleen "vastgesteld" toont als feit; "waarschijnlijk" alleen in vraagvorm; "aanname" nooit in de form |
| 12 | Review-beleid voor partner-zichtbare pre-fill: besluit uitgesteld tot Hidde de proefpack-output heeft beoordeeld |
| 13 | Eerst theorie en ontwerp, dan pas bouwen; proefruns op 3 verschillende bedrijfstypes ter beoordeling door Hidde |

## 3. De WAT plus HOE-matrix (definitief)

Rode draad: eerst het gratis fundament (website-fetch, tag-scan, interne bronnen), en dat context-object stroomt door naar de gerichte bronnen. De pixel-scan is de voorfilter voor welke ad libraries bevraagd worden.

| # | WAT (datapunten) | HOE (route) | Kosten/run | Zekerheid |
|---|---|---|---|---|
| 1 | Basisgegevens: naam, domein(en), contactpersonen, grootte-indicatie, locatie | HubSpot (naam, domein, contact; bewezen in ticket 18) plus LinkedIn-bedrijfspagina | ~0 | Vastgesteld |
| 2 | Profiel en propositie | Bronnen-stapeling, zie sectie 4 | centen | Gemengd |
| 3 | Markt en 3 tot 5 directe concurrenten | Dubbelcheck: Semrush organic competitors (data) naast LLM-web-research (grounding); overlap = vastgesteld, alleen-LLM = waarschijnlijk | ~0,05 | Gemengd, expliciet |
| 4 | Actieve ad-kanalen per platform: actief ja/nee, volume-indicatie, soort creatives | Meta: Apify-actor. Google: Apify-actor (SerpApi als upgrade-pad). TikTok: Commercial Content Library (publiek, EEA) via Apify. LinkedIn: publieke Ad Library-pagina, lichte check. Pixel-scan als voorfilter | 0,10 tot 0,50 | Vastgesteld |
| 5 | Tech-stack en tracking | Drie-lagen-scan, zie sectie 5 | 0 | Vastgesteld (aanwezigheid) |
| 6 | Social-aanwezigheid: kanalen, volgers, posts, frequentie, consistentie, engagement, onderwerpen | Kanalen uit footer-links; per kanaal Apify-profielactor (laatste 20 a 30 posts); metrics deterministisch berekend; onderwerpen via goedkope LLM-stap; groei via Social Blade waar beschikbaar, anders expliciet "nog geen historie" | centen | Vastgesteld |
| 7 | Reputatie: Google-rating/aantal, Trustpilot-score, terugkerende thema's | Apify (patroon bestaat al in Make: Review Scraper); thema-extractie via LLM over de opgehaalde reviews | ~0,10 | Vastgesteld (scores), waarschijnlijk (thema's) |
| 8 | SEO/organisch: verkeer-indicatie, ranked keywords, top-keywords, organische concurrenten | Semrush API (Advanced aanwezig): domain overview, top-50 organic keywords, competitors | 0,03 tot 0,05 | Vastgesteld (indicatief) |
| 9 | Zichtbare funnel: type, stappen, e-mail-capture, frictie | Statisch uit de fetch (forms, CTA's); dieper met headless render; beschrijving door LLM | centen | Waarschijnlijk |
| 10 | Visuele eerste indruk | Verbrede input plus vaste vision-rubric, zie sectie 6 | centen | Aanname |
| 11 | De 3 tot 5 kickstart-aannames | Systematische afleiding, zie sectie 7 | centen | n.v.t. |

## 4. Profiel en propositie: bronnen-stapeling (het "de site zegt niet alles"-probleem)

Vaste volgorde, elke laag vult de gaten van de vorige:

1. **Interne bronnen eerst:** HubSpot-dealnotities, e-mails en meetingverslagen uit het salestraject, plus assignment letter en handover-document uit de partnermap. Sales heeft propositie, doelgroep, budget en pijnpunten vaak al besproken.
2. **LinkedIn-bedrijfspagina plus vacatures:** over-ons, medewerkersaantal, en openstaande vacatures (verraden businessmodel, teamgaten en ambities).
3. **Web-research via grounding:** nieuws, PR, founder-interviews, podcasts, branchevermeldingen.
4. **Klantperspectief:** wat reviews zeggen over wat klanten denken te kopen, naast de eigen propositie.
5. **Marktplaats-check (B2C):** aanwezigheid en presentatie op bol.com/Amazon.

Systeemregel: **een gat wordt nooit door het LLM opgevuld.** Velden die na alle lagen leeg blijven worden "onbekend" gemarkeerd en zijn automatisch kandidaat voor de aannames-sectie of de kickstart.

## 5. Tech-scan: drie lagen (grondige uitwerking)

| Laag | Methode | Ziet | Ziet niet |
|---|---|---|---|
| 1. Statische HTML-fetch | GET op home plus 2 a 3 kernpagina's, patroonbibliotheek over de broncode | Hardcoded scripts: GTM-snippet, pixels, CMS-fingerprints, CMP-scripts, e-mail-tooling | Tags die runtime of via GTM laden |
| 2. gtm.js-container-parse | Publieke GTM-container ophalen, geconfigureerde tags parsen | GA4-id's en pixel-id's die via GTM laden, ook als ze pas na consent vuren | Server-side tags, custom templates deels |
| 3. Headless render (alleen bij verdacht leeg beeld) | Browser-rendering, netwerkverkeer inspecteren | Runtime-geladen tags, SPA-sites | Alles achter consent of login |

Waarom: laag 2 omzeilt het consent-probleem (een CMP blokkeert het vuren, niet de leesbare configuratie). Volgorde is goedkoop naar duur.

**Voorwaarden en verwachte blokkades:**
- Bot-detectie (Cloudflare/Akamai): nette user-agent, rate-limiting; blijft het geblokkeerd: laag 3; lukt ook dat niet: veld op "niet scanbaar" (zichtbaar, nooit stil).
- Multi-domein (shop op subdomein of ander domein): alle domeinen uit HubSpot plus footer-links meescannen.
- Server-side tagging: detecteerbaar aan first-party loader-domein; output dan "server-side aanwezig, configuratie onbekend, kickstart-onderwerp".
- Regionale/taalversies: NL-versie plus hoofdversie scannen.

**Consistentie-borging:** patroonbibliotheek als geversioneerd bestand in git (per tool: naam, patroon, categorie); vaste output-JSON (tool, id, detectielaag, zekerheid); vaste testset van 5 bekende sites als regressiecheck na elke patroonwijziging.

**Verwachting hard gemaakt:** aanwezigheid is betrouwbaar; configuratie-kwaliteit is van buitenaf nooit vast te stellen en blijft expliciet kickstart/audit-werk.

## 6. Visuele eerste indruk: input en vaste rubric

Input: screenshots van home plus 2 kernpagina's (desktop en mobiel, headless render), het Instagram-grid, top-ad-creatives uit de libraries, logo-bestand, kleurenpalet (dominante kleuren uit screenshots plus CSS-variabelen), fonts (uit CSS). Analyse: **vaste vision-rubric** met dezelfde vragen per partner: consistentie tussen site, social en ads; professionaliteit (beeldkwaliteit, typografie-discipline, witruimte); herkenbare identiteit; verouderings-signalen. Output blijft gelabeld "eerste indruk, aanname-niveau"; het brandbook van de partner blijft de waarheid.

## 7. De kickstart-aannames (uitgewerkt format)

- **Definitie:** een strategisch relevante bewering die niet hard vastgesteld kon worden maar waar het 90-dagen-plan op leunt.
- **Afleiding (systematisch):** alle velden met zekerheid "waarschijnlijk" of "aanname" scoren op impact; top 3 tot 5 op impact maal onzekerheid.
- **Format per aanname:** (1) bewering, (2) waarop gebaseerd (bron), (3) waarom het ertoe doet, (4) de letterlijke vraag aan de partner, (5) wat er verandert als het niet klopt.
- **De lus:** pack-slot, dan het aannames-blok in het kickstart-format (ticket 13, bestaat al), na de kickstart terug het pack in als "bevestigd" of "gecorrigeerd plus het echte antwoord". Meet meteen de research-kwaliteit per branche (hoeveel aannames sneuvelen).

## 8. n8n-architectuur

- **Deterministische hoofd-workflow:** trigger (handmatig in v1), fundament-fetches, tag-scan, bronnen-branches, output-assemblage. Voorspelbaar en per blok testbaar.
- **AI Agent-nodes voor interpretatie** (profiel, markt/concurrenten, funnel-duiding, visuele rubric, aannames-synthese) met tools: de deterministische scans als sub-workflow-tools, HTTP Request-tool (Apify, Semrush), MCP Client-tool voor latere koppelingen.
- **Multi-LLM per rol:** goedkoop model (Gemini Flash) voor bulk-extractie; sterker model (Gemini Pro) voor synthese en aannames; bewust een **andere modelfamilie** (bijv. GPT-mini) als cross-checker in de verificatie-pass (verschillende families maken verschillende fouten). Gemini-grounding: 5.000 gratis grounded prompts per maand op de 3.x-modellen, ruim voldoende bij dit volume.
- **Kennisbank (v2, na de eerste reviews):** vector store met gereviewde packs plus reviewer-correcties, door de agent als tool geraadpleegd. Standaard memory-nodes zijn alleen gespreksgeheugen; het zelflerende effect komt uit deze kennisbank.
- **Kanttekening:** agents zijn flexibel maar minder voorspelbaar; feiten blijven deterministisch en alle agent-output gaat door de verificatie-pass voordat het pack geschreven wordt.

## 9. Output: twee producten plus een contract

**Product 1: Research Pack** (Google Doc in de partnermap): alle 11 secties inclusief interpretatie, per gegeven bron plus zekerheid; slot met de aannames. Voor team, audit en kickstart; gaat nooit als geheel naar de partner. Naamconventie: "{{bedrijfsnaam}} | Research Pack | S&S".

**Product 2: pre-fill-JSON** (het contract met de vragenlijst): kleine subset, alleen hard vastgestelde feiten. Schema v1.0:

```json
{
  "version": "1.0",
  "partner": "<slug>",
  "generated_at": "<datum>",
  "reviewed": false,
  "fields": {
    "tech_stack":        { "value": ["Shopify", "GTM", "GA4", "Meta Pixel", "Klaviyo", "Cookiebot"],
                            "source": "site-scan <domein> (laag 1+2)", "confidence": "vastgesteld" },
    "active_ad_channels": { "value": {"meta": 14, "google": true, "tiktok": 0, "linkedin": 0},
                            "source": "Meta Ad Library, Google Ads Transparency", "confidence": "vastgesteld" },
    "competitors":        { "value": ["MerkX", "MerkY", "MerkZ"],
                            "source": "Semrush-overlap plus web-research", "confidence": "waarschijnlijk" }
  }
}
```

Veldnamen zijn gekoppeld aan de question-id's van de vragenlijst; het schema is geversioneerd; workflow en form kunnen onafhankelijk veranderen zolang het contract staat. Opslag op een plek die de Cloudflare Worker kan lezen; de Worker serveert het later via de bestaande `?c=`-partnertoken.

## 10. Weergave in de vragenlijst: de verificatiekaart

Alleen de feitelijke verificatieblokken krijgen pre-fill: tech-stack, actieve ad-kanalen, en (in vraagvorm) de concurrenten. Interpretatieve research komt niet in de form; dat is kickstart-gespreksstof.

**Vorm: verificatiekaart, geen vooringevulde invulvelden.** Wij blijven eigenaar van de bewering (met bron), de partner van de correctie. Elk gevonden item is een aanklikbare chip (bevestigen of afwijzen), plus een veld "wat mist of klopt er niet?", plus de open gap-vraag die alleen de partner kan beantwoorden. Geen default-selectie: de partner kiest actief "klopt" of "klopt deels".

**Techniek:** de form haalt de JSON bij laden op via de Worker (bestaande `?c=`-token). Geen data: het blok toont de kale versie; de form heeft nooit een harde afhankelijkheid van de research.

**Perceptie-regels (hoe de partner het ervaart):**
1. Bronvermelding bij elk blok ("our scan of your site", "Meta Ad Library"): transparantie haalt het opdringerige eruit.
2. Confidence-gate: alleen "vastgesteld" als feit; "waarschijnlijk" alleen in vraagvorm; "aanname" nooit. Liever een kleinere kaart die klopt dan een volle die misschien klopt.
3. Intro-copy benoemt expliciet: wij hebben uitgezocht wat van buiten zichtbaar is; wat overblijft zijn de vragen die alleen jij kunt beantwoorden.
4. Actieve bevestiging verplicht; correctie-veld prominent.
5. Toon: "dit is wat wij van buiten zien, jij kent je bedrijf beter". Nooit arrogant, geen AI-slop, geen em-dashes of pijltekens in de copy.

Samenvattende regel: **de partner ziet de ondergrens (harde feiten met bron), het team ziet alles, de kickstart is waar die twee elkaar ontmoeten.**

## 11. Kosten

Per partner-run ruwweg 0,50 tot 2,00 euro (vrijwel volledig Apify; LLM-kosten verwaarloosbaar; Semrush-units 3 tot 5 dollarcent; Gemini-grounding binnen de gratis tier). Bij 4 partners in een piekmaand blijft het totaal onder de 10 euro. Geen nieuwe abonnementen; kosten per run worden per proefrun gelogd.

## 12. Wat bewust later komt

1. **Vragenlijst-sanering (ticket 15):** uitvoeren nadat de proefpacks bewijzen dat het pack de geschrapte onderwerpen echt dekt. De mappingtabel (Bart-besluiten naar beide lijsten) blijft de eerste stap van dat ticket.
2. **Pre-fill-bouw in de form plus Worker-endpoint:** pas na Hiddes beoordeling van de proefpack-output en zijn besluit over het review-beleid (besluit 12). Partner-facing, dus poortje.
3. **Automatische trigger (ticket 17):** gated; minstens drie bruikbare packs plus expliciete go.
4. **Kennisbank/vector store:** v2, zodra er gereviewde packs plus correcties bestaan om van te leren.

## 13. Openstaand

- Keuze van de 3 proefbedrijven (verschillende branches; Hidde kiest of bevestigt een voorstel).
- Credentials in n8n aanmaken (Semrush, Apify, HubSpot, OpenAI): Hidde plakt zelf de keys in de n8n-UI; sessies vragen nooit om tokens.
- Semrush: API-key en unit-saldo verifiëren met een goedkope testcall.
- Review-beleid pre-fill (besluit 12) na de beoordeling van de proefpacks.
