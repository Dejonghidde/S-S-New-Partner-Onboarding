---
type: contextdossier
project: New Partner Onboarding (herontwerp)
doel: Input voor een diepe, kritische planningssessie met een zwaar model (Claude Fable 5)
accountable: Hidde
opgesteld: 2026-07-10
status: Volledig, zelf-bevattend. Bedoeld om samen met de bijbehorende prompt te gebruiken.
bron: Alle projectdocumenten in deze repo + live geverifieerde Make-inspectie (2026-07-10)
verwante_bestanden:
  - Prompt-Deep-Planning-Fable5.md
  - Overzicht-New-Partner-Onboarding.md
  - New-Partner-Onboarding-Projectbriefing-Overzicht.md
  - Onboarding-Workflow-Analyse-en-Blueprint.md
  - Briefing-Onboarding-Workflow-Verbeteren.md
  - Onboarding-Aanpassingen-Overzicht.md
---

# Contextdossier: New Partner Onboarding (herontwerp)

## Over dit document

Dit is een **compleet, zelf-bevattend contextdossier** over het New Partner Onboarding-project van Sprints & Sneakers (S&S). Het is geschreven als **input voor een zware planningssessie** met een sterk redeneermodel. Het doel van die sessie is niet om de aannames hieronder te bevestigen, maar om ze **kritisch en objectief te toetsen** en daaruit een oprecht doordacht eindplan te destilleren: wat het einddoel moet zijn, wat er moet gebeuren, hoe, hoe het eruitziet, wanneer het "klaar" is, en wat de meerwaarde is voor zowel de partner als S&S.

### Hoe dit document te gebruiken
- Gebruik dit dossier samen met het bestand `Prompt-Deep-Planning-Fable5.md`. Dat bestand bevat de instructie/prompt; dit bestand bevat de feiten en context.
- Het dossier is zo geschreven dat het **ook los van de repo** te begrijpen is (alle essentie staat erin). Waar dieper detail bestaat, staat een **bestandsverwijzing** zodat het brondocument erbij gepakt kan worden als de omgeving toegang tot de repo heeft.

### Betrouwbaarheidslabels (belangrijk voor kritisch lezen)
Elke belangrijke claim is gelabeld, zodat het planmodel weet wat hard is en wat niet:
- **[GEVERIFIEERD]** = met eigen ogen vastgesteld in het live systeem of in een bronbestand (hoge zekerheid).
- **[BESLOTEN]** = een expliciete projectbeslissing die is genomen (maar herzienbaar als er een sterk argument is).
- **[AANNAME]** = plausibel maar niet hard bevestigd; expliciet bedoeld om te challengen.
- **[OPEN]** = nog onbeslist, vereist een keuze of nader onderzoek.

---

## 0. Kerngegevens en identifiers (snelle referentie)

**Make (automation-platform)**
- Team ID: `43614` · Organization ID: `67982`
- Live scenario: `3059444` "New partner onboarding" (draait in productie) **[GEVERIFIEERD]**
- Sandbox scenario: `6226897` "New partner onboarding V2" (test/rebuild, staat niet live) **[GEVERIFIEERD]**

**Make-connecties (de kern van het betrouwbaarheidsprobleem)** **[GEVERIFIEERD, 2026-07-10]**
| Conn ID | Naam | Type / account | Gebruikt in V2 |
|---|---|---|---|
| `2870801` | "Gmail -Sharif 14-10" | Google (restricted), `sharif@sprintsandsneakers.com`, OAuth, scopes mail+drive | **43-45x** |
| `2655290` | "Slack - Sharif" | Slack **user**-token, `sharif`, 16 scopes | 37x |
| `2541989` | "Sharif monday connection" | Monday v2, `sharif@`, accountId 7225921, basic | 20x |
| `4862297` | (OpenAI) | OpenAI GPT | 17x |
| `6773974` | "Hidde" | Slack **bot**-token, `hidde_de_jong`, 8 scopes | 4x |
| `2071732` | (Google Sheets) | google-sheets | 1x |

**Cloudflare (vragenlijst-infrastructuur)** **[GEVERIFIEERD in README/spec]**
- Account: `tools@sprintsandsneakers.com` · Account ID: `1abe294524503c88d22016d52c424675`
- Pages-project: `ss-onboarding` · Worker: `ss-onboarding-api` (route `onboarding.sprintsandsneakers.dev/api/*`)
- Live: B2C `https://onboarding.sprintsandsneakers.dev` · B2B `.../b2b` · per partner `?c=<Drive-folder-id>`
- Google service-account: `id-onboarding-uploader@ss-onboarding-499712.iam.gserviceaccount.com` (writer op Shared Drive "2. Current projects"). Sleutel als Worker-secret `GOOGLE_SA_KEY` (niet in git).

**Google Drive / Sheets**
- Shared Drive: `0AMl3InXspt_qUk9PVA` · parent `1CX7LsKcUFH2GMwXngo4WShjVXlIesWRk` · map "2. Current projects" `11ncxYJ...`
- Trigger-sheet "Form Responses": `1a98wRYG9dMu2KG866xrd1VO3iSmv0Qw0wm9ZxqavtX8`

**Documenten (Google-bestanden die de flow kopieert)**
- Strategy Playbook 2025: `10j4W2ISO...` · B2B-playbook (ongebruikt): `1f-Wn24Zfg...` · Growth Funnel: `1hn6uZaO...`

**Teams (routes in de Make-flow):** Sigma, Phi, Gamma, Kappa, Alpha (growth) + **Rho** (recruitment, bewust anders).

---

## 1. Huidige situatie

### 1.1 Wat is het project
S&S onboardt nieuwe partners (klanten) na een getekend contract. De reis loopt van "getekend contract" tot "partner klaar om te starten met growth hacking". Een deel van die reis is al geautomatiseerd via een bestaande **Make-workflow**; een ander deel (de vernieuwde vragenlijst) draait al als eigen webapplicatie op Cloudflare. Het project wil deze keten **eerst consistent laten werken, dan effectiever, dan verbeteren** op basis van praktijkinput. Uitgangspunt: **niet vanaf nul bouwen**, maar verbeteren wat er staat.

De rode draad uit de partner-feedback: **de partner mist geen documenten, maar ritme en regie.** **[GEVERIFIEERD in leads-input, zie 2.3]**

### 1.2 De twee sporen
- **Spoor A: de Make-automation** (de operationele ruggengraat die het S&S-team voedt met partner-info en artefacten). Dit is de kern van het huidige werk.
- **Spoor B: de vragenlijst** (een interactieve web-vragenlijst op Cloudflare die informatie ophaalt die alleen de partner kan geven). Grotendeels klaar en live.

Deze twee sporen moeten uiteindelijk als één keten in elkaar grijpen (de vragenlijst is een stap in de bredere onboarding).

### 1.3 Spoor A: wat de Make-automation nu doet [GEVERIFIEERD]
**Trigger:** iemand van S&S (vaak Bart) vult een **Slack-form** in bij een nieuwe partner. De antwoorden landen in de Google Sheet "Form Responses". De workflow leest die rij.

**Ingelezen velden:** Company name · Partner first name · Partner email · Partner phone · **Assigned team** · Assignment letter (link) · Handover (link) · Started by.

**De flow splitst op Assigned team** in 6 bijna-identieke team-routes en doet per partner:
1. **Slack:** melding in kanaal *Allocatie* + DM naar de teamlead.
2. **Monday:** tech-ticket in operations-backlog, item in *Client overview - Leadership*, en een nieuw board per partner uit een template (via API), team als Owner.
3. **Drive:** partner-projectmap in `S&S Projects / 02. Current projects / [Team] / [Partner]`, plus een `[SHARED]`-submap, en de partner-e-mail toegevoegd aan die shared map.
4. **Documenten kopieren:** DPA, (verouderde) pre-audit questionnaire, Growth Funnel sheet, Strategy Playbook.
5. **AI (3 GPT-stappen):** playbook/strategie-tekst genereren + bedrijfsnaam omzetten naar een Slack-kanaalnaam.
6. **Slack-kanalen:** intern `client-[partner]` en extern `external-[partner]-sprintsandsneakers`, statusbericht gepind.
7. **Partner-e-mail** met links naar DPA, vragenlijst en shared drive folder.

**Omvang:** V2 telt 188 modules, live 191. Apps: google-drive (43-45x), slack (41x), util (38x), monday (20x), openai (17x), builtin (12-13x), http (10x), email (6x), google-sheets (1x). **[GEVERIFIEERD]**

**Handmatig NA de automation (nu nog los):** kickstart-meeting inplannen, LastPass-map aanmaken, partner uitnodigen in Slack/Monday, toegang tot kanalen regelen, kennismakingsmeeting.

Detail: `Onboarding-Workflow-Analyse-en-Blueprint.md` sectie 2, en de blueprint-exports `Onboarding workflow/New partner onboarding.blueprint.json` (live) en `.../New partner onboarding V2.blueprint.json` (sandbox).

> **Belangrijk [GEVERIFIEERD]:** de V2-sandbox is op dit moment vrijwel een 1-op-1 kopie van live (zelfde connectie-IDs, vrijwel zelfde modules). De password-onafhankelijke ombouw is dus nog niet begonnen.

### 1.4 Spoor B: de vragenlijst (Cloudflare) [GEVERIFIEERD]
- Twee interactieve, self-contained HTML-vragenlijsten: **B2C** (`public/index.html`) en **B2B** (`public/b2b.html`).
- **9 secties:** 1) Your Customer, 2) Brand & Positioning, 3) Capabilities, 4) Your Funnel (nu S&S AAARRR / Pirate Funnel), 5) Tech & Tracking, 6) Team & Process, 7) Ambition, 8) Assets & Access, 9) Impact.
- **Filosofie (Bart):** alleen vragen wat de partner zelf kan vertellen; niets wat S&S uit contract, database, markt of desk research kan halen.
- **Backend:** Cloudflare Worker schrijft de antwoorden als leesbaar Google Doc en zet uploads (200 MB+) hervatbaar in de Drive-projectmap van die partner, via de **service-account**. Routing puur op de `?c=<token>`-parameter (een Drive-folder-id).
- **Feedback verwerkt:** de-slop copy-pass, plus feedbackrondes van Gijs (17-06) en Mira (11-06 / verwerkt 22-06): AAARRR-funnel, capabilities verbreed voorbij influencers, extra kanalen (Organic socials, Affiliate/Marketplaces, Branding, Referral/Community, Microsoft Ads, LinkedIn, X, Amazon Ads, Bol.com Ads), vaste sprint-cadans, B2B-vragen rond pipeline/ICP/buying committee/sales-handoff.
- **Nog open op dit spoor [OPEN]:** hoe Make per partner de juiste B2C- vs B2B-link kiest, hoe de juiste folder-id in `?c=` meekomt, en het sluiten van de "lus" (seintje terug bij inzending).

Detail: `New-Vragenlijst/specs/README.md`, `.../2026-06-17-onboarding-questionnaire-design.md`, `.../2026-06-22-onboarding-feedback-mira-design.md`. Code: `New-Vragenlijst/specs/public/` en `.../worker/src/index.js`. Bron-B2B-vragen: `.../S&S_Growth_Partnership_Onboarding_B2B.docx`. AAARRR-bron: `.../Growth Audit 3.0 _ AAARRR funnel.docx`.

### 1.5 De documenten in de flow [GEVERIFIEERD]
| Document | Huidige staat | Bron/locatie |
|---|---|---|
| Strategy Playbook | 2025-versie, voor alle teams gelijk, geen B2B/B2C-splitsing. Wordt blind gekopieerd op dag 0. | Drive `10j4W2ISO...` |
| B2B-playbook | Bestaat maar wordt niet gebruikt; Dorus staat nog op slide 10, speakernotes moeten schoon. | Drive `1f-Wn24Zfg...` |
| B2C-playbook | Bestaat nog niet. | n.v.t. |
| Growth Funnel | Een versie voor iedereen. | Drive `1hn6uZaO...` |
| DPA | Wordt gekopieerd; bron in Finance & Legal (geen toegang nu). | Finance & Legal |
| Pre-audit questionnaire (in Drive) | Verouderd; vervangen door de Cloudflare-vragenlijst. | Drive (modules 118/119/120) |
| Assignment letter | Komt binnen als link (HubSpot/mail), wordt NIET in de partnermap opgeslagen. | HubSpot |
| Handover (sales -> growth) | Komt binnen als link, ontbreekt soms, wordt NIET opgeslagen. | HubSpot/wisselend |
| Tooling Access Guide | Kaal Word-document, kapot logo, kapotte inhoudsopgave, persoonsafhankelijk, deelt wachtwoorden via mail, dode tool (Google Optimize), verouderde merknamen. | `Documenten Onboarding/Tooling Access Guide - [klantnaam] [maak kopie] .docx` |

De Strategy Playbook (voorbeeld) staat als `Documenten Onboarding/[PARTNER] x Sprints & Sneakers -  Strategy Playbook 2025.pptx`.

### 1.6 De organisatie (wie is wie)
- **Hidde de Jong** = accountable en uitvoerder van dit project (de gebruiker).
- **Bart** = stuurt op snelheid en een praktisch MVP; vult vaak zelf het start-form in.
- **Gijs** = stuurt op grondigheid en op shipping (waarde-lens).
- **Sharif Sediqui** = degene op wiens persoonlijke accounts (`sharif@`) de automation nu draait; leverde ook lead-input.
- **Anjo** = teamlead, lead-input (interactieve access-checklist).
- **Mira Ahles** = leadership, gaf vragenlijst-feedback.
- **Naomi** = gaf de aanpak-volgorde (consistent -> effectiever -> verbeteren).
- **Teams:** Sigma, Phi, Gamma, Kappa, Alpha (growth) en **Rho** (recruitment, eigen minimale onboarding).

### 1.7 Bronbestanden-index (alle relevante bestanden in de repo)
**Analyse- en overzichtsdocumenten (`Onboarding workflow/`):**
- `Overzicht-New-Partner-Onboarding.md` : master-overzicht (doel, scope, bevindingen, plan).
- `New-Partner-Onboarding-Projectbriefing-Overzicht.md` : uitgebreide projectbriefing met fase 0-4, definition of done, mailconcept, teamnotificatie, risico's.
- `Onboarding-Workflow-Analyse-en-Blueprint.md` : 0-meting geverifieerd tegen de echte Make-scenario, diagnose met bewijs, leads-input rondes 1+2.
- `Briefing-Onboarding-Workflow-Verbeteren.md` : oorspronkelijke opdracht, scope, waarde-lens, keten in kaart.
- `Onboarding-Aanpassingen-Overzicht.md` : changelog van concrete, besloten aanpassingen (9 punten met status).
- `New partner onboarding.blueprint.json` / `New partner onboarding V2.blueprint.json` : Make-exports (let op: dit zijn snapshots, ze sturen het live scenario NIET aan).

**Vragenlijst (`New-Vragenlijst/specs/`):**
- `README.md` : architectuur, live-links, deploy-instructies, backend-config.
- `2026-06-17-onboarding-questionnaire-design.md` : ontwerp B2C (architectuur, token-model, IDs).
- `2026-06-22-onboarding-feedback-mira-design.md` : verwerkte feedback (AAARRR, kanalen, cadans).
- `public/index.html` (B2C), `public/b2b.html` (B2B), `worker/src/index.js` (backend), `preview/build_b2b.py` (B2B-generator).
- `S&S_Growth_Partnership_Onboarding_B2B.docx` : Gijs' bron-B2B-vragen. `Growth Audit 3.0 _ AAARRR funnel.docx` : AAARRR-bron.
- `Vragenlijst notities en messages.txt` : oorspronkelijke briefing vragenlijst.

**Documenten (`Documenten Onboarding/`):**
- `Tooling Access Guide - [klantnaam] [maak kopie] .docx` : de te upgraden toegangsgids.
- `[PARTNER] x Sprints & Sneakers -  Strategy Playbook 2025.pptx` : voorbeeld strategy playbook.

**Brand assets (`S&S Brand Assets/`):** logo's (SVG/PNG), font (Helvetica Neue). Voor on-brand deliverables. Zie ook de skill `ss-brand-style`.

---

## 2. Pijnpunten, knelpunten, errors en zwakke plekken

### 2.1 Technische betrouwbaarheid (met live bewijs)
**A. De keten valt om door persoonsgebonden connecties. [GEVERIFIEERD] [BLOKKADE]**
De hele workflow draait op Sharifs persoonlijke accounts. De grootste is de Google-connectie `2870801` (`sharif@`), gebruikt in **43-45 modules**. Bij een wachtwoordwijziging of security-event wordt de OAuth refresh-token ongeldig en faalt het scenario met `AccountValidationError` (0 operaties, start niet eens). Make zet het scenario daarna automatisch uit.

*Live bewijs (executions van scenario 3059444):* op **17 juni 2026** faalde het scenario **3x automatisch achter elkaar** (08:00, 09:00, 10:00) plus een handmatige run, telkens met exact:
> `AccountValidationError: Cannot initialize the scenario because of the reason 'Failed to verify connection 'Gmail -Sharif 14-10'. Invalid refresh token. Please reauthorize the connection.'`
Pas na reautorisatie volgde een succesvolle run (14:26, 32 operaties). Dit is dus geen theoretisch risico maar een terugkerend, aangetoond faalpatroon.

**B. Verwijderde Slack-accounts van (oud-)teamleads. [GEVERIFIEERD in analyse] [BLOKKADE]**
Uitnodigingen naar niet meer bestaande Slack-accounts zetten de automation stil.

**C. Geen foutmelding. [GEVERIFIEERD] [MEDIUM]**
Als het misgaat, gaat het stil mis. Niemand krijgt een seintje; het kan weken doorlopen voordat iemand het merkt.

**D. 6x team-duplicatie (drift). [GEVERIFIEERD] [MEDIUM]**
De 6 routes zijn losse kopieen die uit elkaar zijn gelopen. In de praktijk verschillen ze maar op 2 dingen: de lijst uit te nodigen Slack-users en de Drive-parent-folder per team. Kappa mist een paar (deels verouderde) stappen. Rho is bewust anders (recruitment).

**E. Orphaned/dode modules. [GEVERIFIEERD] [LAAG]**
Losgekoppelde test-/restant-branches in het scenario.

**Positief om mee te wegen [GEVERIFIEERD]:** de bouwstenen voor de echte fix bestaan grotendeels al: er is al een Slack **bot**-token (`6773974`), de Google **service-account** draait al voor de vragenlijst-Worker, Monday heeft een API-token-model, en Brevo is als mailprovider beschikbaar. De ombouw is vooral **herbedraden**, niet from-scratch bouwen. (Aandachtspunt: de bestaande bot-token heeft 8 scopes vs de user-token 16, dus mogelijk ontbreken scopes voor kanaal aanmaken/uitnodigen/pinnen.)

### 2.2 Documenten en templates [GEVERIFIEERD]
- Strategy Playbook wordt **blind gekopieerd op dag 0**, wanneer er nog geen audit/strategie is; levert geen waarde en brengt een vertrouwelijkheidsrisico (oude, niet-geschoonde klantdata). **[BESLOTEN: auto-kopieerstap schrappen]**
- Geen B2B/B2C-splitsing in playbook en funnel.
- Assignment letter + handover worden niet in de partnermap opgeslagen; team start soms met contextverlies.
- Tooling Access Guide is verouderd, off-brand en bevat beveiligingsrisico's (wachtwoorden via mail).

### 2.3 Partner-ervaring (leads-input, 2 rondes) [GEVERIFIEERD]
**Ronde 1:** partners horen te vaak te lang niks (te weinig ritme), weten niet wanneer wat gebeurt (geen tijdpad), planning voelt improviserend, access duurt te lang.

**Ronde 2 (Anjo & Sharif):**
- Bij de start ontbreken altijd een aantal toegangen; klanten nemen de toegang-lijst niet goed door. Dit vertraagt niet alleen het gevoel maar **concreet de audit en strategie**. (Anjo + Sharif, onafhankelijk)
- Sharif: het probleem zit minder in de onboarding zelf en meer in **verwachtingsmanagement daarna** (wanneer wordt wat opgeleverd).
- Sharif: klanten voeren dezelfde gesprekken meermaals met wisselende personen (gebrek aan **continuiteit van contactpersoon**).
- Sharif: klanten willen zo snel mogelijk een **plan en resultaat** zien (pleit voor gefaseerde oplevering).
- Sharif: trajecten beginnen soms **ongecontroleerd, niet volgens opdrachtbrief** (pleit voor het afdwingen van een vaste volgorde/volledig pakket voor start).

**Rode draad:** partners missen minder vaak documenten dan ritme en regie.

### 2.4 Proces en organisatie [GEVERIFIEERD/AANNAME]
- Persoonsafhankelijkheid: kennis en toegang hangen aan individuen (Sharif, Gijs).
- Geen live statusoverzicht per partner; Hidde heeft geen realtime zicht op wat klaar is en wat ontbreekt.
- Veel handmatige vervolgstappen die traag en ongestructureerd verlopen.

---

## 3. Wensen, eisen, visie, gedachten en verwachtingen (voor de vernieuwde versie)

### 3.1 De waarde-lens en de kernspanning [GEVERIFIEERD]
Elk onderdeel wordt beoordeeld op **waarde, niet op taken**:
| Waarde | Voor wie | Betekenis |
|---|---|---|
| Klantervaring | Partner | Belangrijkste. Gemak, duidelijkheid, professioneel gevoel vanaf dag 1. |
| Tijdsbesparing | S&S team | Minder handmatig geklungel, minder losse to-do's. |
| Snelheid | Bart | Hoe snel na tekenen kunnen we diensten leveren. |
| Grondigheid | Gijs | Direct na onboarding staat alles perfect klaar om te growth hacken. |

**Kernspanning om te managen:** Bart wil snelheid, Gijs wil volledigheid. De workflow moet **beide** leveren: snel live, maar compleet.

### 3.2 Bart's richting (praktisch MVP) [GEVERIFIEERD]
Simpel beginnen: partner onboarden met een druk op de knop; nieuwe onboardingvragen gebruiken; team informeren over de maturity scan; maturity scan opnieuw inzetten; onboardingmail verbeteren; partners in de beginfase laten voelen dat ze de juiste keuze hebben gemaakt via geautomatiseerde, on-brand, concrete berichten.

### 3.3 Gijs' richting (grondigheid + shipping) [GEVERIFIEERD]
- Playbook: eerst het nut bepalen. Is versturen uberhaupt nodig? Zo ja, pas nadat het echt is ingevuld, niet als lege template.
- Begin van de onboarding komt vooral uit **HubSpot**; meenemen als bron bij het opnieuw inrichten van de start.
- Access-tooling: opnieuw checken op actuele data + rebranding (2026-vibe).
- DPA: iets nettere opmaak, geen inhoudelijke gekke dingen.

### 3.4 Maturity scan [OPEN, belangrijk]
Bart noemt een "maturity scan" expliciet als vast onderdeel, maar deze is nog niet gedefinieerd: welke scan precies, waar die staat, intern/extern, wanneer in de flow, wie de uitkomst ziet, welke Monday-status, of de uitkomst in de partnermap moet. Dit is een belangrijk open gat.

### 3.5 Visie op "consistent werkend" en "klaar om te growth-hacken" [GEVERIFIEERD/BESLOTEN]
**Definitie "consistent werkend" (harde eis):** de automation levert voor elke getekende partner, ongeacht wie het invult en welk team, hetzelfde volledige en correcte pakket op, of geeft een duidelijke melding als dat niet lukt. Geen enkele run valt om door een persoonsgebonden connectie.

**Een partner is pas "klaar om te growth-hacken" als dit er allemaal is:**
1. Partner-folder + shared folder + partner-toegang tot shared folder
2. DPA klaargezet en gedeeld
3. Growth funnel sheet + strategy playbook (juiste, actuele versie)
4. Monday: item in Client overview + eigen board uit template + team als Owner
5. Slack: intern + extern kanaal, team toegevoegd
6. Partner + partner-contactpersonen toegevoegd aan extern kanaal, Monday-board en shared folder
7. Juiste vragenlijst (B2B/B2C) verstuurd en binnen (lus gesloten)
8. Tooling-access geregeld
9. Welkomstmoment + tijdpad + kickstart gecommuniceerd
10. Alles zichtbaar afgevinkt op een statusoverzicht

### 3.6 Ideeen voor latere fasen (nog te toetsen) [AANNAME/OPEN]
Interactieve onboarding-portal / toegang-afvinklijst (Anjo + Sharif wijzen hier onafhankelijk naar); gefaseerde oplevering van de audit; onboarding-workshops; vroege waarde via een directory van ~3 direct inzetbare agents/tools; dag-5 update; teamintro via werk; growth-hacking-introductie; partnerjargon vastleggen; starter kit / AI-cadeau. Grotere experience-gebaren (weekendje weg, trofee, thuisfront-gebaar) staan expliciet als "later/selectief".

---

## 4. 100% bevestigde, definitieve vereisten [BESLOTEN / hard]

Dit zijn de vastliggende beslissingen. Herzienbaar alleen met een sterk, expliciet argument; anders zijn dit gegevens.

| # | Vereiste | Waarom | Bron |
|---|---|---|---|
| 1 | **Connecties password-onafhankelijk maken** in de echte fix: Google **service-account** (Drive/Sheets), **Brevo API-key** (mail), **Monday API-token**, **Slack bot-token**. | Persoonsgebonden OAuth valt om bij wachtwoordrotatie (aangetoond). | Analyse 9, memory connections-fix |
| 2 | **`accounts@sprintsandsneakers.com` is alleen interim**, niet de echte fix (roteert wachtwoord wekelijks). | Zelfde reden als 1. | Analyse 9 |
| 3 | **B2B/B2C bepaalt voorlopig alleen de vragenlijst-link.** Bredere differentiatie (playbook/funnel/boards) is een aparte, latere beslissing. | Scope klein houden voor v1. | Projectbriefing 8.5 |
| 4 | **Rho blijft bewust apart** (recruitment-onboarding), niet "repareren" naar de growth-template. | Andere dienst. | Analyse 9 |
| 5 | **Strategy Playbook auto-kopieerstap schrappen** in beide scenario's. | Op dag 0 niets partner-specifieks + vertrouwelijkheidsrisico. Playbook blijft als handmatig, later opgeleverd document. | Aanpassingen #1 (besloten 2026-07-09) |
| 6 | **Automation eerst** (foutloos + minder handmatig + sneller in de vervolgstappen) voordat losse documenten worden verbeterd. | Fundament waar de rest op leunt. | Aanpassingen #8 (hoogste prioriteit) |
| 7 | **Blueprint-JSON-exports in de repo nooit hand-editen om een "fix" te simuleren.** Live wijzigingen horen in het echte Make-scenario; besluiten in de changelog. | Voorkomt vals gevoel van "afgehandeld". | memory working-style |
| 8 | **Vragenlijst blijft op Cloudflare** (Pages + Worker + service-account); de oude Drive-kopie van de pre-audit questionnaire gaat eruit. | Cloudflare-versie is de waarheid. | Analyse 4, README |
| 9 | **"Consistent werkend" = het volledige pakket of een duidelijke melding**, geen stille fout. | Harde eis (zie 3.5). | Analyse 7 |

Let op de scope-afspraak in de projectbriefing: **v1 = automation + eerste indruk**, niet de volledige first-month experience. Grote experience-ideeen zijn expliciet "niet in v1". Dit is een [BESLOTEN] scopekeuze, maar wel een die het planmodel mag challengen als het een sterker totaalplaatje ziet.

---

## 5. Beschikbare tooling: plugins, skills, connectors

Dit project heeft een ongewoon rijke set aan **live gekoppelde MCP-connectors** en Claude-skills. Hieronder wat beschikbaar is, waarvoor, en een indicatieve volgorde. Dit is een menu, geen voorschrift; het planmodel mag kiezen en combineren.

### 5.1 MCP-connectors (live gekoppeld, direct bruikbaar)
| Connector | Waarvoor in dit project | Kernmogelijkheden |
|---|---|---|
| **Make** | De automation-ruggengraat lezen en (om)bouwen. | Scenario's/blueprints ophalen en updaten, connecties inspecteren, executions/faalhistorie lezen, scenario's activeren/deactiveren, blueprint-componenten extraheren. |
| **Monday** | Statusoverzicht per partner, tech-tickets, client overview, boards uit template. | Boards/items/kolommen/groepen/updates lezen en schrijven, docs, forms, dashboards, automations. |
| **Slack** | Notificaties, foutmeldingen, kanaal-aanmaak, gepinde statusberichten. | Berichten sturen/plannen, kanalen zoeken/lezen, canvas, reacties, threads. |
| **Google Drive** | Partnermappen en documenten. | Bestanden zoeken/lezen/kopieren, metadata, permissions. |
| **Gmail** | Mail lezen/labelen (de automation-mail gaat echter bewust naar Brevo). | Threads/berichten zoeken, drafts, labels. |
| **Google Calendar** | Kickstart- en kennismakingsmeetings inplannen. | Events aanmaken/wijzigen, beschikbaarheid voorstellen. |
| **Cloudflare** | De vragenlijst-Worker/Pages en een eventuele onboarding-portal. | Workers/Pages, D1 (database), KV, R2 (opslag), builds, observability/logs, docs. |
| **Airtable** | Alternatief voor een centrale partner-status/registry (afwegen tegen Monday/Sheets). | Bases/tabellen/records/interfaces lezen en schrijven. |
| **n8n** | Alternatief of aanvullend automation-platform (afwegen tegen Make). | Workflows bouwen/valideren/uitvoeren, data tables, credentials, executions. |
| **Canva** | On-brand visuele deliverables (playbook, tooling guide, one-pagers). | Designs genereren/bewerken/exporteren, brand templates, folders. |
| **Playwright / Kapture** | Browser-automatie voor platform-acties zonder API of voor testen van flows. | Navigeren, klikken, invullen, screenshots, netwerk inspecteren. |
| **Desktop Commander** | Lokale bestandsbewerking (docx/pptx aanpassen, scripts draaien). | Bestanden lezen/schrijven/zoeken, processen, edit-blocks. |

Let op [OPEN]: enkele connectors vereisen nog autorisatie in een interactieve sessie (bijv. GitHub, Vercel). Voor het planmodel is dat geen blokkade, maar het is goed om te weten dat niet elke connector in elke omgeving beschikbaar is.

### 5.2 Bestaande infrastructuur (al opgezet, kan hergebruikt) [GEVERIFIEERD]
- **Cloudflare Pages + Worker** met **Google service-account** en **R2** (hervatbare uploads, 200 MB+). Dit is bewezen infrastructuur die ook een bredere onboarding-portal zou kunnen dragen.
- **Slack bot-token** (`6773974`) al aanwezig als niet-persoonsgebonden connectie.
- **Brevo** als mailprovider gekoppeld.
- **Monday** met API-token-model.

### 5.3 Claude-skills en agents (relevant voor uitvoering)
- **`ss-brand-style`** : de complete S&S huisstijl (kleuren Lime `#B2FA63` op zwart `#0A0A0A`, Sun `#FF7833`, typografie, tone-of-voice). **Verplicht toepassen op elke partner-facing deliverable** (onboardingmail, tooling guide, portal, playbook, DPA-opmaak).
- **`frontend-design`, `high-end-visual-design`, `redesign-existing-projects`, `design-taste-frontend`, `ui-ux-pro-max`, `emil-design-eng`** : voor een interactieve onboarding-portal / access-afvinklijst (bouwt voort op de bestaande Cloudflare-frontend).
- **`superpowers:brainstorming` -> `writing-plans` -> `executing-plans`** : het proces om van idee naar implementatieplan naar uitvoering te gaan. **`subagent-driven-development`, `test-driven-development`, `systematic-debugging`, `verification-before-completion`** voor het bouwwerk.
- **`n8n-workflow-patterns` + `n8n-*`** : als n8n als (deel)platform wordt overwogen.
- **`email-automation-builder`, `email-drip-sequence`** : voor de partner-communicatieflows (welkomstmoment, dag-5 update, bevestigingen).
- **Cloudflare-skills** (`workers-best-practices`, `wrangler`, `durable-objects`, `agents-sdk`) : voor Worker-uitbreiding en een eventuele portal-backend.
- **Agents:** `feature-dev` (code-architect, code-explorer, code-reviewer), `Explore`, `Plan`, `general-purpose` voor parallelle research/bouw.

### 5.4 Indicatieve inzet-volgorde (voorstel, geen voorschrift)
1. **Make** (read-only) om de exacte huidige staat te verifieren; **Slack/Monday/Drive** (read-only) om de artefacten te zien.
2. **Make** (sandbox) voor de connectie-ombouw + foutmelding; **Slack** bot-token en **Brevo/service-account/Monday-token** als niet-persoonsgebonden connecties.
3. **Monday** (+ evt. **Airtable**) voor het statusoverzicht per partner; **Slack** voor notificaties en foutmeldingen.
4. **Cloudflare** (Worker/Pages, evt. D1/KV) voor het sluiten van de vragenlijst-lus en een eventuele portal; **ss-brand-style** + design-skills voor de partner-facing UI.
5. **Canva/Drive/Desktop Commander** + **ss-brand-style** voor de document-upgrades (tooling guide, mail, playbook, DPA-opmaak).

---

## 6. Openstaande vragen en beslissingen [OPEN]

Het planmodel moet hier expliciet een positie of onderzoeksrichting over innemen; dit zijn de echte keuzes.

**Scope en einddoel**
- Is v1 officieel beperkt tot automatisering + eerste indruk, of is er een sterker totaalplaatje?
- Wat is de minimale lat voor "partner klaar om te growth-hacken"? (zie 3.5 als voorstel)
- Wanneer schuift het door naar een volledige eerste-maand-experience?

**Platform en architectuur**
- Blijft Make de ruggengraat, of is (deels) n8n / een eigen Cloudflare-orchestratie beter voor betrouwbaarheid en onderhoud? (De 6x-drift en 188 modules zijn een onderhoudslast.)
- Kunnen de 6 team-routes terug naar een gedeelde basis met teamconfiguratie?
- Accepteert Make's native Google Drive/Sheets-module een service-account, of moet dat via HTTP+JWT (zoals de Worker al doet)? [OPEN, technisch te valideren]
- Heeft de bestaande Slack-bot-token alle benodigde scopes (kanaal aanmaken/uitnodigen/pinnen)? [OPEN]

**Maturity scan** (zie 3.4): volledige definitie ontbreekt.

**Documenten en proces**
- DPA: toegang tot brontemplate, mag er een juridische update in of alleen opmaak?
- Assignment letter + handover: wie maakt/vult/verstuurt/bewaart, en willen we ze voortaan in de partnermap? Komt uit HubSpot.
- HubSpot als bron: wat kunnen we eruit trekken om de start van de keten te voeden, en hoe koppelen?
- Tooling Access: welke e-mail hoort bij welke tool; hoe voorkomen we koppeling van bijv. Meta Ads aan een persoon; volledige herschrijving of gerichte fixes?

**Partner-contactpersonen**
- E-mailadressen uitvragen in het start-form zodat ze klaarstaan voor Slack/Monday/Drive; meerdere contacten toestaan?

**Communicatie**
- Op wiens naam en vanaf welk (stabiel) account gaat de onboardingmail; reply-to; Nederlands of Engels; welke minimale roadmap?

**Statusoverzicht**
- Waar leeft de partner-status: Monday-item, Monday-board, Sheet, Airtable, of een combinatie? Hoe krijgt Hidde realtime zicht + notificaties?

---

## 7. Expliciete spanningen en aannames om te challengen (anti-tunnelvisie)

Het planmodel moet deze punten actief tegen het licht houden en niet klakkeloos overnemen:

1. **"Niet vanaf nul bouwen, alleen verbeteren."** [BESLOTEN, maar te challengen] Klopt dit gegeven de 188 modules, 6x-drift en de onderhoudslast? Wanneer is gericht herbouwen (of platform-migratie) juist goedkoper op termijn dan blijven patchen?
2. **"Automation eerst, dan de documenten/experience."** [BESLOTEN, te challengen] Is de betrouwbaarheidsfix echt de grootste waarde-hefboom voor de partner, of is dat de partner-ervaring (ritme/regie/access)? De leads zeggen dat het probleem minder in de onboarding zelf zit en meer in verwachtingsmanagement daarna.
3. **"MVP = automation + betere eerste indruk."** [BESLOTEN, te challengen] Is dat ambitieus genoeg om de echte partnerpijn (regie, access, continuiteit) op te lossen, of te smal?
4. **Snelheid (Bart) vs grondigheid (Gijs).** Hoe lost het plan deze spanning structureel op in plaats van als compromis?
5. **B2B/B2C alleen in de vragenlijst.** [BESLOTEN, te challengen] Wanneer wordt bredere differentiatie noodzakelijk in plaats van uitstelbaar?
6. **Make als platform.** Is een grote no-code-flow met 188 modules het juiste fundament voor "consistent werkend", of introduceert het juist fragiliteit? Weeg Make vs n8n vs eigen code objectief af.
7. **De maturity scan** wordt genoemd als vast onderdeel maar is ongedefinieerd. Bouw geen aannames bovenop een leeg begrip; definieer het eerst.
8. **Statusoverzicht in Monday.** Is Monday de juiste plek, of leidt dat tot meer persoonsafhankelijkheid en handwerk? Weeg alternatieven.

---

## 8. Wat een goed eindplan moet opleveren (opdracht aan het plan)

Het eindplan dat uit de planningssessie komt, moet in elk geval het volgende scherp en onderbouwd beantwoorden:

- **Einddoel:** wat is het daadwerkelijke einddoel van de vernieuwde onboarding, in termen van waarde voor partner en S&S (niet in termen van taken)?
- **Wat:** welke concrete onderdelen/componenten omvat het, met heldere grenzen (scope in/uit).
- **Hoe:** welke methoden, technieken, platforms, tooling en koppelingen, met een objectieve afweging van alternatieven (bijv. Make vs n8n vs eigen Cloudflare-orchestratie; Monday vs Airtable vs Sheets voor status).
- **Hoe het eruitziet:** de gewenste eindsituatie concreet beschreven (flows, statusoverzicht, partner-facing UI/communicatie, on-brand).
- **Done-criteria:** meetbare eisen waaraan voldaan moet zijn om te zeggen dat het doel bereikt is (per fase en als geheel).
- **Meerwaarde:** expliciet vanuit partner-perspectief en vanuit S&S-perspectief.
- **Fasering en volgorde:** wat eerst, wat daarna, met de reden (waarde en afhankelijkheden), en wat bewust later of niet.
- **Risico's en aannames:** wat kan misgaan, welke aannames zitten erin, en hoe te valideren.
- **Rolverdeling:** wat kan geautomatiseerd/door Claude via de connectors, en wat vereist een mens (authenticatie, besluiten, credentials).

---

*Einde contextdossier. Gebruik samen met `Prompt-Deep-Planning-Fable5.md`.*
