---
type: uitwerking (hoe-document)
project: New Partner Onboarding
tickets: 15, 16, 17 (masterplan fase 2)
status: Opgesteld, ter review bij Hidde
opgesteld: 2026-07-15, autonome uitwerking door Claude in opdracht van Hidde
rol: het antwoord op "hoe bereiken we dit doel, wat hebben we nodig, wat moet er gebeuren" voordat de bouwsessies starten. Geen bouwwerk; wel alle feiten opgezocht en de keuzes voorbereid.
---

# Uitwerking fase 2: vragenlijst halveren plus Partner Research Pack (tickets 15, 16, 17)

## 1. Het doel, scherp gesteld

Hiddes formulering: "partner research zodat de vragenlijst van tevoren al ingevuld is". Dat doel valt uiteen in drie lagen, en de tickets dekken bewust eerst laag 1 en 2:

1. **Schrappen wat S&S zelf kan achterhalen** (ticket 15). De partner ziet die vragen nooit meer; dit is de grootste winst (minstens de helft van de vragen, invultijd onder 30 minuten).
2. **Het Partner Research Pack als plek waar die antwoorden landen** (ticket 16, daarna 17). S&S beantwoordt de geschrapte vragen zelf, met bronvermelding en zekerheidsniveau, in een vast document per partner. "Vooraf ingevuld" gebeurt dus in het pack, niet in de vragenlijst.
3. **Letterlijke pre-fill in de vragenlijst** (optioneel, na 16/17): het korte verificatieblok tech en tracking toont per partner de gedetecteerde data ("klopt dit beeld?"). Ticket 15 zet dit blok er bewust eerst zonder pre-fill-data in; sectie 8 hieronder beschrijft hoe de data-injectie er later bij kan zonder herbouw.

Waarom deze volgorde en niet meteen laag 3: pre-fill vereist dat de detectie-data er per partner betrouwbaar en gestructureerd ligt, en dat is precies wat ticket 16/17 eerst moet bewijzen. Eerst het pack laten werken, dan pas data de partner-facing form in duwen.

## 2. Wat er nu ligt (feiten, deze sessie opgezocht)

### 2.1 De vragenlijsten

| Lijst | Secties | Vragen (geteld) | Doel na -50% |
|---|---|---|---|
| B2C (`public/index.html`) | 9: Customer, Brand, Capabilities, Funnel, Tech & Tracking, Team, Ambition, Assets, Impact | ~45 | ~22, onder 30 min |
| B2B (`public/b2b.html`, bron `preview/build_b2b.py`) | 11: Offering, ICP & DMU, Positioning, Channels, Pipeline, Retention, Tech, Alignment, Goals, Assets, Impact | ~55 | ~27, onder 30 min |

Let op: ticket 15 zegt "beide lijsten hebben 9 secties"; dat klopt alleen voor B2C. B2B heeft er 11. De mappingtabel moet dus beide structuren apart afdekken.

### 2.2 Waar Barts sectienummers naar verwijzen (ontrafeld)

Barts tabel (masterplan stap 2.1) gebruikt nummers die op geen van beide live lijsten 1-op-1 passen. De ontrafeling:

- **"Metadata" en "sectie 0, the basics"**: dit is Gijs' bron-docx `S&S_Growth_Partnership_Onboarding_B2B.docx` (secties 00 t/m 11, met "Prepared for/Date/Completed by" en 00 THE BASICS: company name, website, year founded, FTEs, talen, contactpersoon). De live lijsten hebben deze secties al niet meer; dit besluit is dus al uitgevoerd, alleen expliciet vast te leggen in de mappingtabel.
- **"Sectie 2, account profile" met subvragen 2.1 t/m 2.7**: matcht exact docx-sectie 02 (ICP, Accounts & Decision-Making Unit, precies 7 subvragen) en daarmee de live B2B-sectie "ICP & DMU" plus het B2C-equivalent "Your Customer".
- **"Sectie 4" met 4.5 (capabilities) en 4.6 (account-based)**: matcht docx-sectie 04 (Acquisition Channels), waar "Who owns each function today?" (4.5) en "Describe your account-based marketing approach" (4.6) in zitten. Live B2B "Channels" en B2C "Capabilities" bevatten deze vragen.
- **"Sectie 5, tech en tracking"**: dat is het B2C-nummer (B2C sectie 5 heet exact zo); in B2B is dit sectie 7 (Tech, Data & Attribution).
- **"Secties 5/6, funnel"**: dat zijn de B2B-nummers (05 Pipeline & Sales Funnel, 06 Retention); in B2C is dit sectie 4 (Your Funnel).
- **"Sectie 8, assets en access"**: B2C-nummer; in B2B is dit sectie 10 (Brand Assets & Guardrails).

Conclusie: de masterplan-tabel mixt docx-, B2C- en B2B-nummers. De mappingtabel (eerste stap van ticket 15) moet daarom per **onderwerp** mappen, niet per nummer, en per Bart-besluit beide lijsten benoemen. De twee criteria blijven de scheidsrechter bij twijfel: (a) kan alleen de partner dit weten, (b) verandert het antwoord wat het team doet.

### 2.3 Startvertaling van de Bart-tabel naar beide lijsten

Voorzet voor de mappingtabel (de uitvoerende sessie werkt dit per vraag uit):

| Bart-besluit | B2C-sectie | B2B-sectie | Actie |
|---|---|---|---|
| Metadata plus basics weg | (al afwezig) | (al afwezig) | Vastleggen als "al uitgevoerd"; basisgegevens dekt het pack |
| Bedrijf en markt: zelf te achterhalen | Brand & Positioning (deels: bekendheid, marktverschuiving) | Offering (deels), Positioning (deels: concurrenten) | Schrappen naar pack waar extern waarneembaar; houden wat alleen de partner weet (bijv. "waarom kiezen klanten jou", brand promise) |
| Account profile: 2.3 t/m 2.6 houden, 2.1 herformuleren, 2.7 herschrijven of weg | Your Customer | ICP & DMU | Per subvraag mappen; klare taal, signalen-overlap eruit |
| Sectie 3 "nice", behouden | Capabilities | Positioning | Behouden |
| Sectie 4 weg behalve capabilities (eigen kort hoofdstuk) en account-based-vraag (alleen indien relevant) | Capabilities/Funnel | Channels | Kanalen-feiten naar pack (ad libraries); capabilities-vraag blijft; ABM-vraag conditioneel |
| Tech en tracking: detectie plus kort verificatieblok plus gap-vraag | Tech & Tracking (sectie 5) | Tech, Data & Attribution (sectie 7) | Terugbrengen tot "klopt dit beeld?" plus de open gap-vraag |
| Funnel: weg behalve de lek-vraag | Your Funnel (sectie 4) | Pipeline (5) en Retention (6) | Volumes/percentages naar pack of kickstart; lek-vraag blijft |
| Assets en access: behouden, brandbook explicieter | Assets & Access (sectie 8) | Brand Assets (sectie 10) | Bevestigingsoptie "wij hebben (nog) geen brandbook/tone-of-voice" toevoegen (aanpassingenoverzicht punt 3) |
| Team/Alignment, Ambition/Goals, Impact | Team, Ambition, Impact | Alignment, Goals, Impact | Niet door Bart genoemd: toetsen aan de twee criteria; verwachting: grotendeels behouden (echte partnerkennis), wel de -50% bewaken |

### 2.4 Beschikbare input-data per partner (uit ticket 18, HubSpot)

De parameters die een research-run nodig heeft, zijn er op dag 0 betrouwbaar:

- **Bedrijfsnaam** (`company.name`, 7/7 in de steekproef, met sanity-check op de associatie), **domein/website** (`company.domain`), **contactpersoon** (naam, e-mail, telefoon).
- **partner_type B2B/B2C** (`company.b2b_b2c`): 3/7 gevuld, dus deels; het Slack-form heeft dit veld wel altijd. Voor de research-opdracht is het een verplichte parameter; bij twijfel bepaalt de accountlead hem.
- Team, taal, assignment letter en handover komen niet uit HubSpot; voor de research zijn ze ook niet nodig (het contract/de assignment letter is wel een bron als hij in de partnermap staat).

### 2.5 Antwoord op Hiddes interne uitvraag (Slack, 14 juli, DM met Sharif)

Ticket 16 en 17 verwijzen naar deze uitvraag; het antwoord is binnen en verwerkt:

- Sharif: er bestaat **geen werkende research-flow**; hij heeft het ooit door een stagiair laten proberen, "dat is nooit gelukt".
- Sharif bouwt zelf tegenwoordig workflows met Claude plus MCP ("ging echt mega goed") en stelt voor Hiddes projecten te integreren in hun way-of-work; afspraak om samen te zitten in Groningen (15 juli). Uitkomst van dat gesprek kan de platformkeuze van ticket 17 beïnvloeden; voor ticket 16 (proces, geen infra) blokkeert het niets.

### 2.6 Bestaande bouwstenen (Make team 43614 en n8n, geïnventariseerd)

| Bouwsteen | Status | Bruikbaar voor | Oordeel |
|---|---|---|---|
| "Review Scraper: Trustpilot + Google" (scenario 3033093) | **Actief**, draait op Apify (runActor/runTask/fetchDatasetItems) plus LLM-verwerking | Online reputatie | Bewezen patroon; belangrijkste vondst: er is een **werkende Apify-connectie** in het team |
| "Ad Library Tracker Meta & Google - Sanne" (3843700) | Inactief prototype: platte HTTP GET op de ad-library-URL's | Actieve advertentiekanalen | Werkt vrijwel zeker niet (die pagina's zijn JS-gerenderd); niet als bewezen bouwsteen behandelen, wel bewijs dat de behoefte al eerder gevoeld is |
| "Gather competitor data from TikTok profiles" (3843408) | Aanwezig | Concurrenten/social | Bij bouw ticket 17 inspecteren op herbruikbare Apify-actors |
| "Meta GEO Audit", "Meta Experimentation Wrapped" | Aanwezig | Werkwijze-referentie voor audit-achtige output | Referentie, geen directe bouwsteen |
| n8n: "PA2 Research_Agent" (actief), "Creative Research Agent Zeb - MVP" (inactief), "keyword research SEMRUSH" | Niet via MCP leesbaar (workflow-instelling) | Onbekend | Bij het Groningen-gesprek aan Sharif vragen wat PA2 doet; SEMrush-credential lijkt te bestaan (relevant voor SEO-sectie) |
| Onboarding-infra: Worker `ss-onboarding-api` (service-account, drive-folder/copy/share-endpoints), partner-run 6525431 (maakt de partnermap), registry-spreadsheet, Monday-subitems-patroon (ticket 11), kickstart-format met research-pack-aannames-blok en startvoorwaarde (ticket 13) | Gebouwd | De hele ophang-structuur van ticket 17 | Het pack hoeft alleen nog "ingehangen" te worden: map, subitem, seintje en registry-veld bestaan als patroon |

Netto: **niets bestaands vult het pack end-to-end**; wel liggen er een werkende Apify-connectie, een bewezen review-scraper-patroon en de complete ophang-infra. Hergebruik gaat dus over onderdelen, niet over een bestaande flow.

## 3. De aanpak in één oogopslag (volgorde over de tickets heen)

De ticketnummering suggereert 15 dan 16 dan 17; de slimme uitvoeringsvolgorde vlecht 15 en 16 in elkaar:

1. **Mappingtabel** (ticket 15, stap 1): per vraag, beide lijsten, Bart-besluit, actie, motivatie. Output bepaalt de dekkingslijst voor het pack.
2. **Pack-template plus research-opdracht** (ticket 16, stap 1 en 2): direct daarna, met de dekkingslijst als eis.
3. **Twee testpacks** op echte partners (ticket 16, stap 4) plus teamreview (stap 5). Bewijst dat het pack de geschrapte onderwerpen echt kan vullen.
4. **Vragenlijsten fysiek aanpassen** (ticket 15, stap 3 t/m 5): pas als het pack bewezen dekt; lokaal testen; tellen en rapporteren.
5. **Review Bart/Gijs** op mappingtabel plus preview; daarna **deploy met go van Hidde** (poortje, partner-facing).
6. **Derde pack** plus go/no-go-advies: opent de gate van ticket 17.
7. **Ticket 17**: automatisering (aparte sessie, na expliciete go).

Waarom niet eerst de lijsten inkorten en dan pas het pack: als het pack een onderwerp niet blijkt te kunnen vullen (bijv. funnel-volumes zijn extern niet waarneembaar), moet die vraag terug de lijst in of expliciet naar de kickstart verhuizen. Dat wil je weten voordat de partner de kortere lijst ziet.

## 4. Ticket 15: wat er concreet moet gebeuren

1. **Mappingtabel** als `New-Vragenlijst/specs/2026-07-sanering-mapping.md`, met de ontrafeling uit sectie 2.2/2.3 hierboven als startpunt. Kolommen: sectie, vraag (kort), Bart-besluit, actie (behouden / schrappen naar pack / herformuleren / conditioneel / naar kickstart), motivatie. "Naar kickstart" is een bewuste vierde uitkomst: sommige geschrapte onderwerpen zijn geen research maar gesprek (server-side tracking, CAPI, CMP; masterplan stap 2.3).
2. **Verificatieblok tech en tracking** ontwerpen: de huidige vier vragen (core stack, actieve ad-platforms, tracking-setup, grootste gap) worden: één bevestigingsvraag ("wij hebben dit beeld van jullie stack en kanalen, klopt dit?", met vrij tekstveld voor correcties) plus de open gap-vraag (die blijft, dat is echte partnerkennis). Voorlopig zonder pre-fill-data; de tekst verwijst naar wat de accountlead in de kickstart meebrengt.
3. **Brandbook-bevestigingsoptie** in de assets-sectie: expliciete optie "wij hebben (nog) geen brandbook / tone-of-voice-document", zodat afwezigheid een zichtbaar feit is (aanpassingenoverzicht punt 3).
4. **Doorvoeren**: B2C in `index.html`, B2B in `build_b2b.py` plus regeneratie; sectienummering, voortgang, navigatie en de submit-payload kloppend houden (payload-structuurwijzigingen samen met een Worker-check).
5. **Tellen en lokaal testen**: aantal vragen en invultijd voor en na, per lijst; volledige doorkliktest van beide flows.
6. **Poortje**: deploy naar Cloudflare pas na Bart/Gijs-akkoord op mapping plus preview, en go van Hidde. Tot die tijd alles lokaal en in git.

Benodigd: niets nieuws. De copy-regels (Nederlands waar van toepassing, geen em-dashes, geen pijltekens, de-slop) en de bestaande schil blijven gelden; de lijsten zelf zijn Engelstalig en blijven dat.

## 5. Ticket 16: het Partner Research Pack

### 5.1 Template (elf secties, dekt exact de lijst uit Hiddes Slack-uitvraag)

1. Basisgegevens (naam, domein, vestiging, omvang-indicatie, contactpersonen; bron: HubSpot plus contract)
2. Bedrijfsprofiel en propositie
3. Markt en directe concurrenten
4. Actieve advertentiekanalen
5. Zichtbare tech-stack en tracking-indicaties
6. Social-aanwezigheid
7. Online reputatie
8. SEO/organisch profiel
9. Zichtbare funnel en klantreis
10. Visuele eerste indruk (voorlopig beeld, geen vervanging van het echte brandbook)
11. Slot: de drie tot vijf aannames die de partner in de kickstart moet bevestigen (koppelt 1-op-1 aan het aannames-blok dat al in het kickstart-format van ticket 13 zit)

Per gegeven verplicht: bron (URL of systeem) plus zekerheidsniveau (vastgesteld / waarschijnlijk / aanname). Formaat: Google Doc in de partnermap, naamconventie "{{bedrijfsnaam}} | Research Pack | S&S". Intern werkmateriaal; gaat nooit ongereviewd richting partner.

### 5.2 Bronnen-matrix (welke bron vult welke sectie, en wat er al ligt)

| Pack-sectie | Bron(nen) zonder partner-input | Methode v1 (handmatig proces) | Al aanwezig |
|---|---|---|---|
| Basisgegevens | HubSpot (name, domain, contact), contract/assignment letter in partnermap | Uitlezen; bij gaten: aanname markeren | HubSpot-leestoegang via Make-connectie (ticket 18) |
| Profiel en propositie | Website (home, over, pricing), LinkedIn-bedrijfspagina | AI-research met webtoegang, bronvermelding verplicht | Nee (agent-opdracht schrijven) |
| Markt en concurrenten | Web-research, reviewvergelijking, SEO-tooling | AI-research; concurrenten benoemen met bewijs (waarom deze drie) | SEMrush-credential in n8n (checken) |
| Advertentiekanalen | Meta Ad Library, Google Ads Transparency Center, TikTok Ad Library, LinkedIn Ad Library | v1: handmatig/AI-geassisteerd per bibliotheek kijken (publiek toegankelijk, geen login); per kanaal: actief ja/nee, indicatie volume/soort creatives | Ad-library-prototype (werkt niet); Apify-actors voor ad libraries bestaan op de marketplace als v2-optie |
| Tech-stack en tracking | HTML/tag-scan van de site: GTM, GA4, Meta Pixel, TikTok pixel, LinkedIn Insight, Hotjar/Clarity, CMS/shop-platform | v1: AI leest de paginabron; alleen client-side zichtbare zaken, server-side (CAPI, CMP-config) expliciet als kickstart-onderwerp markeren | Nee; v2-optie: klein Worker-endpoint (fetch plus patroonlijst), deterministisch en gratis |
| Social-aanwezigheid | Publieke profielen (IG, TikTok, LinkedIn, YouTube, X) | Kanalen, volgers-orde, publicatieritme | TikTok-competitor-flow als referentie |
| Reputatie | Google reviews, Trustpilot | v1: handmatig/AI kijken; v2: bestaande Review Scraper hergebruiken | **Ja: actieve Apify-scraper** |
| SEO/organisch | Sitemap, blog, zichtbare rankings; SEMrush indien credential werkt | Orde-indicatie: organische zichtbaarheid, contentcadans, quick wins | SEMrush in n8n (checken) |
| Funnel en klantreis | De site zelf doorlopen (signup/checkout/leadflow) | AI-walkthrough plus beschrijving; B2B: demo-aanvraagflow | Nee |
| Visuele indruk | Website, socials, ad-creatives uit de libraries | Korte beschrijving plus voorbeelden (screenshots/links) | Nee |

### 5.3 De research-agent voor v1: drie opties, één aanbeveling

| Optie | Wat | Voor | Tegen |
|---|---|---|---|
| **A. Claude met een vaste, parametriseerbare opdracht** (claude.ai of Claude Code, met web search; parameters: bedrijfsnaam, website, B2B/B2C) | De opdracht uit `Research-Pack-Template-en-Opdracht.md` wordt per partner als run uitgevoerd; output is het ingevulde template, dat als Google Doc in de partnermap wordt gezet | Nul nieuwe infrastructuur; sterkste research-kwaliteit en bronvermelding; direct te testen; sluit aan op hoe dit team al werkt | Iemand moet de run starten en het doc plaatsen (maar dat is v1 per definitie: proces, geen bouwwerk) |
| B. n8n-agent-workflow | Workflow met LLM-nodes en tools bouwt het pack | Teamzichtbaarheid, sluit aan op Sharifs way-of-work-aanbod | Bouwtijd voor iets dat nog moet uitkristalliseren; eerdere ervaring: Perplexity-nodes gaven problemen en zijn al eens vervangen; precies wat ticket 17's gate wil voorkomen |
| C. Make-scenario met GPT-modules plus Apify | Scenario per bron, LLM-samenvatting | Sluit aan op bestaande flow | V1-herbouw heeft GPT-modules bewust op nul gezet (determinisme); lange agentic research past slecht bij Make; hoogste kans op stille halve output |

**Aanbeveling: optie A voor v1.** De gate van ticket 17 zegt precies dit: eerst het format laten uitkristalliseren via een proces, dan pas infrastructuur. Optie A is dat proces. De bestaande Apify-review-scraper kan als gerichte aanvulling dienen wanneer de reviews-sectie meer diepgang nodig heeft. Herzie de keuze voor v2 (ticket 17) op basis van het Groningen-gesprek met Sharif; als het team op n8n-agents standaardiseert, is dat het logische automatiseringsplatform, met de Worker als alternatief.

### 5.4 Het v1-proces (vast te leggen in `Onboarding workflow/Research-Pack-Template-en-Opdracht.md`)

- **Trigger**: accountlead of Hidde start de research zodra de onboarding loopt (partnermap bestaat).
- **Doorlooptijd**: pack binnen 1 werkdag in de partnermap.
- **Review**: een teamlid dat er een audit mee zou starten checkt het pack, corrigeert en markeert het als gereviewd (blokje bovenin het doc: gereviewd door, datum). Vaste regel: geen pack-inhoud richting partner zonder deze review.
- **Koppeling kickstart**: de aannames uit sectie 11 gaan 1-op-1 het aannames-blok van het kickstart-format in (ticket 13); het startvoorwaarden-blok daar verwijst al naar het research pack.
- **Testrun**: twee packs op echte, recente partners; feedback ophalen bij minstens één teamlid; template en opdracht bijstellen.

### 5.5 Klaar-wanneer (uit het ticket, ongewijzigd van kracht)

Template plus opdracht plus proces in de repo; twee gereviewde packs in partnermappen; dekking gecheckt tegen de ticket-15-lijst; teamfeedback verwerkt; go/no-go-advies voor ticket 17.

## 6. Ticket 17: automatisering (architectuurrichting, bouwen pas na de gate)

Gate blijft: minstens drie bruikbare v1-packs plus expliciete go van Hidde. Richting die nu al vastgelegd kan worden:

- **Trigger**: naast het bestaande partner-run-scenario 6525431, als los satellietscenario op een nieuwe Registry-rij (zelfde bewezen patroon als ticket 11: klein, event-gedreven, geen wijziging aan het grote scenario nodig).
- **Research-run**: de vaste opdracht wordt machinaal uitgevoerd. Kandidaten, te kiezen op wat er bij de start ligt: een Claude-API-aanroep vanuit de Worker (Agent SDK; service-account-patroon bestaat, geen persoonsgebonden connectie), of een n8n-agent-workflow (als het team daar dan op draait, uitkomst Groningen-gesprek). Make alleen als orchestrator (trigger, plaatsing, meldingen), niet als research-engine.
- **Plaatsing**: doc naar de partnermap via de bestaande Worker-endpoints (drive-copy/drive-share-patroon).
- **Bewaking**: Monday-subitem "Research pack: reviewen" (ticket-11-patroon), seintje met doc-link in het interne teamkanaal, registry-veld bijgewerkt, onerror-melding volgens het bestaande patroon (geen stille uitval).
- **Te documenteren bij de bouw**: kosten per run (API-tokens plus eventuele Apify-runs; orde van grootte enkele euro's per pack, exact meten bij de testruns) en foutgedrag.
- **Poortjes**: nieuwe scenario's inactief bouwen; activering en elke wijziging aan actieve scenario's alleen met go.

## 7. Dekking van de geschrapte onderwerpen: waar landt wat

Elke geschrapte vraag krijgt één van drie bestemmingen, vastgelegd in de mappingtabel:

1. **Research pack** (extern waarneembaar: profiel, markt, kanalen, tech-scan, social, reputatie, SEO, funnel-buitenkant, visuele indruk, basics).
2. **Kickstart-gesprek** (niet extern waarneembaar, wel S&S-werk: server-side tracking, CAPI, CMP-configuratie, funnel-volumes die de partner mondeling beter duidt, bevestiging van de pack-aannames).
3. **Blijft in de lijst** (alleen de partner weet het én het verandert wat het team doet: waarom klanten kiezen, de lek-vraag, de gap-vraag, sign-off en samenwerking, budget en doelen, guardrails, assets).

Deze driedeling voorkomt het bekende gat: een vraag schrappen "want research" terwijl de research dat onderwerp niet kan leveren.

## 8. Optionele laag 3: echte pre-fill in de vragenlijst (na 16/17, eigen mini-ticket)

Kan zonder herbouw, de infrastructuur ligt er al:

- De form kent al een per-partner-token (`?c=<Drive-folder-id>`); de Worker weet bij welke partner die hoort (registry).
- Nieuw Worker-endpoint (bijv. `GET /api/prefill?c=...`) dat per partner een klein JSON-object teruggeeft met de detectie-data uit het pack (stack, actieve kanalen). De form vult daarmee het verificatieblok bij laden; geen data, dan gewoon het lege blok (geen harde afhankelijkheid).
- Vereist: de detectie-data gestructureerd opslaan (registry-kolommen of een JSON naast het pack), en dat is pas zinvol als ticket 17 die data machinaal produceert.
- Partner-facing wijziging, dus poortje: Bart/Gijs plus go van Hidde.

Bewust buiten de huidige tickets; hier vastgelegd zodat de tickets er naartoe bouwen zonder er iets voor te hoeven slopen.

## 9. Wat we nodig hebben (checklist)

**Besluiten van Hidde (geen blokkade voor de start, wel voor afronding):**
1. Keuze van de twee testpartners voor de packs (voorstel: twee recente, echte partners waarvan de partnermap bestaat; geen poortje nodig, het pack is intern).
2. Akkoord op optie A (Claude-run) als v1-research-agent, of een andere voorkeur na het gesprek met Sharif.
3. Wie de pack-review doet bij de testruns (teamlid dat er een audit mee zou starten; kandidaten: Sharif, Sanne, of de accountlead van de testpartner).
4. Review-moment Bart/Gijs voor de mappingtabel plus preview (bepaalt het deploy-poortje van ticket 15).

**Toegangen en middelen (vrijwel alles aanwezig):**
- HubSpot-lees via Make-connectie: aanwezig (ticket 18). Drive service-account plus Worker: aanwezig. Apify via Make: aanwezig en actief. Ad libraries (Meta, Google, TikTok, LinkedIn): publiek, geen account nodig. SEMrush-credential in n8n: aanwezig lijkt het, werking checken. Claude met web search: aanwezig (deze omgeving).
- Nieuw of betaald: niets voor v1. Voor v2 eventueel Apify-actors voor ad libraries (kosten per run, meten bij ticket 17).

**Geen poortjes nodig voor:** mappingtabel, template, opdracht, testpacks (intern), lokale vragenlijst-aanpassingen. **Wel poortjes voor:** Cloudflare-deploy (15), alles wat ticket 17 activeert, en laag 3 (pre-fill).

## 10. Risico's en afdekking

| Risico | Afdekking |
|---|---|
| Pack bevat fouten die de audit insluipen | Bronvermelding plus zekerheidsniveau per gegeven; verplichte menselijke review; partner bevestigt de kernaannames in de kickstart (blok bestaat al in het ticket-13-format) |
| Research kan een onderwerp niet leveren (bijv. funnel-volumes) | Driedeling uit sectie 7: zulke onderwerpen expliciet naar de kickstart, niet stilzwijgend laten vallen; blijkt het pas bij de testpacks, dan de vraag terug de lijst in vóór de deploy |
| -50% wordt niet gehaald zonder kwaliteitsverlies | De lat blijft; per behouden vraag een motivatie op de twee criteria; tweede reductieronde met Bart staat al gepland (masterplan stap 6.2) |
| Ad-library-detectie is handwerk en blijft liggen | In v1 accepteren (proces met doorlooptijd van 1 werkdag); automatiseren is precies waar ticket 17 voor is |
| Sanering breekt de submit-payload of de Worker-verwerking | Lokale doorkliktest plus payload-check hoort bij ticket 15 stap 5; structuurwijzigingen alleen samen met een Worker-aanpassing |
| Platformkeuze v2 verkeerd getimed | Keuze bewust uitgesteld tot na drie bewezen packs plus het Groningen-gesprek; architectuurrichting (sectie 6) is platform-neutraal opgehangen aan bestaande patronen |

## 11. Inschatting tijd en kosten

- **Ticket 15**: 1 sessie voor mapping plus copy-ontwerp, 1 sessie voor doorvoeren en testen (B2C en B2B samen); review-doorlooptijd Bart/Gijs bepaalt de deploy-datum.
- **Ticket 16**: 1 sessie voor template plus opdracht plus proces; per testpack circa een dagdeel doorlooptijd (AI-run plus review van 30 tot 60 minuten door een teamlid).
- **Ticket 17**: pas na de gate; grootste bouwblok is de machinale research-run, de ophang-structuur (trigger, subitem, seintje, registry) is bestaand patroon.
- **Kosten v1**: verwaarloosbaar (bestaande abonnementen); v2: API-kosten per run, te meten en te documenteren (eis uit ticket 17).

## 12. Samengevat: de eerstvolgende concrete stappen

1. Mappingtabel maken (`2026-07-sanering-mapping.md`), met sectie 2.2/2.3 hierboven als startpunt.
2. Pack-template plus research-opdracht plus procesbeschrijving vastleggen (`Research-Pack-Template-en-Opdracht.md`).
3. Twee testpacks draaien op door Hidde te kiezen partners; review door een teamlid; bijstellen.
4. Vragenlijsten aanpassen, tellen, lokaal testen; mappingtabel plus preview naar Bart/Gijs.
5. Deploy met go (poortje); derde pack; go/no-go-advies voor ticket 17.
