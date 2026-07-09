---
type: projectbriefing
project: New Partner Onboarding
categorie: Operations / Partner Experience
status: In uitvoering
fase: Define / MVP-scope
accountable: Hidde
bijgewerkt: 2026-07-09
bronnen:
  - Onboarding-Workflow-Analyse-en-Blueprint.md
  - Briefing-Onboarding-Workflow-Verbeteren.md
  - New-Vragenlijst/specs/README.md
  - New-Vragenlijst/specs/2026-06-17-onboarding-questionnaire-design.md
  - New-Vragenlijst/specs/2026-06-22-onboarding-feedback-mira-design.md
  - Input Bart over MVP-richting
---

# New Partner Onboarding - projectbriefing en totaaloverzicht

Dit document bundelt de bevindingen, open vragen, ideeen, aanbevelingen, plannen en het doel van het New Partner Onboarding-project. Het vervangt de eerdere werknotities niet. Het is het centrale overzicht voor scope, prioriteit en besluitvorming.

## 1. Doel

S&S wil nieuwe partners met minimale handmatige frictie onboarden en vanaf dag 1 laten voelen dat ze de juiste keuze hebben gemaakt.

De onboarding moet drie dingen tegelijk doen:

1. **Betrouwbaar werken:** geen stilvallende Make-runs, geen persoonsgebonden afhankelijkheden, geen zoekwerk achteraf.
2. **Het team startklaar maken:** alle basisinformatie, documenten, toegang, vragenlijstinput en maturity scan staan op de juiste plek.
3. **De partner vertrouwen geven:** duidelijke communicatie, een professioneel welkom, concrete vervolgstappen en een zichtbaar gevoel van regie.

De eerste versie hoeft geen volledige first-month partner experience te zijn. Bart heeft de scope aangescherpt naar een praktisch MVP: simpel beginnen, partner onboarden met een druk op de knop, nieuwe onboardingvragen gebruiken, team informeren over de maturity scan, de scan opnieuw inzetten, de onboardingmail verbeteren en partners in de beginfase vertrouwen geven via geautomatiseerde, concrete, on-brand berichten.

## 2. Kernconclusie

De huidige onboarding heeft geen nieuw systeem nodig. De basis bestaat al, maar hij is kwetsbaar, versnipperd en niet sluitend.

De juiste aanpak:

1. Stabiliseer de live workflow.
2. Bouw in V2 een simpele, herhaalbare onboarding-flow.
3. Sluit de vragenlijst- en maturity-scan-lus.
4. Geef het team automatisch zicht op status en ontbrekende onderdelen.
5. Maak de partnercommunicatie scherper, warmer en concreter.
6. Parkeer grotere experience-ideeen tot de basis foutloos draait.

## 3. Scope voor v1

### Wel in v1

- Een partner kunnen onboarden met een druk op de knop of een duidelijke status-trigger.
- Nieuwe onboardingvragen gebruiken.
- B2B- en B2C-vragenlijst correct versturen.
- Maturity scan opnieuw als vast onderdeel opnemen.
- Team automatisch informeren over nieuwe partner, vragenlijststatus en maturity-scanstatus.
- Partner-mail herschrijven: concreet, on-brand, geruststellend, met helder tijdpad.
- Partnerfolder, shared folder, DPA, funnel, playbook, Monday-board en Slack-kanalen correct aanmaken of zichtbaar markeren als open.
- Foutmeldingen zichtbaar maken in Slack of Monday.
- Statusoverzicht per partner aanmaken, zodat Hidde en teamleads zien wat klaar is en wat ontbreekt.

### Niet in v1

- Volledige eerste-maand-experience ontwerpen.
- Fysieke gifts, trophies, thuisfront-gebaar of weekendje weg.
- Volledige B2B/B2C-differentiatie in playbooks, funnels en templates, behalve de juiste vragenlijstlink.
- Volledige automatisering van externe Slack/Monday-toegang als het platform dat beperkt.
- Grote herbouw buiten Make zolang de huidige flow kan worden gestabiliseerd.

## 4. Huidige workflow

Er zijn twee Make-scenario's:

| Scenario | Status | Gebruik |
|---|---|---|
| `3059444` - New partner onboarding | Live | Productieflow |
| `6226897` - New partner onboarding V2 | Sandbox | Veilige test- en rebuildversie |

De live workflow start via een Slack-form. De ingevulde antwoorden komen in een Google Sheet `Form Responses`. De workflow leest de rij en splitst daarna op assigned team.

Ingelezen velden:

- Company name
- Partner first name
- Partner email
- Partner phone
- Assigned team
- Assignment letter link
- Handover link
- Started by

Per partner doet de workflow nu ongeveer dit:

1. Slack-bericht in Allocatie en DM naar teamlead.
2. Monday-tech-ticket in operations backlog.
3. Monday-item in Client overview - Leadership.
4. Nieuw Monday-board uit template.
5. Drive-projectfolder aanmaken.
6. Shared Drive-folder aanmaken en partner toevoegen.
7. DPA kopieren.
8. Verouderde pre-audit questionnaire kopieren.
9. Growth Funnel sheet kopieren.
10. Strategy Playbook kopieren.
11. AI-stappen uitvoeren voor strategie/playbooktekst en Slack-kanaalnaam.
12. Intern Slack-kanaal en extern Slack-kanaal aanmaken.
13. Partner-mail sturen met links naar DPA, vragenlijst en shared folder.

## 5. Belangrijkste bevindingen

### 5.1 Technische betrouwbaarheid

| Bevinding | Impact | Status |
|---|---:|---|
| De workflow draait op persoonsgebonden connecties, waaronder Sharifs Google-account. | Hoog | Blokkade |
| Google-token kan verlopen of ingetrokken worden, waarna Make de scenario stillegt. | Hoog | Blokkade |
| Verwijderde Slack-accounts van oude teamleads kunnen runs breken. | Hoog | Blokkade |
| Er is geen goede foutmelding naar eigenaar/team. | Medium | Open |
| De 6 teamroutes zijn kopieen die uit elkaar zijn gegroeid. | Medium | Open |
| Kappa mist stappen of gebruikt verouderde onderdelen. | Medium | Te controleren |
| Rho is bewust anders door recruitment-onboarding. | Laag | Besluit: apart houden |
| Er staan orphaned/dode modules in het scenario. | Laag | Opruimen in V2 |

Aanbeveling: gebruik voor V2 stabiele, niet-persoonsgebonden connecties: Google service-account voor Drive/Sheets, Slack bot-token, Monday API-token, Brevo of stabiele mailprovider voor e-mail.

### 5.2 Documenten en templates

| Onderdeel | Huidige staat | Actie |
|---|---|---|
| Strategy Playbook | Iedereen krijgt de 2025-versie. Geen B2B/B2C-splitsing. | Beslissen of dit bewust is. |
| B2B-playbook | Bestaat, maar wordt niet gebruikt. Dorus staat nog op slide 10 en speakernotes moeten schoon. | Opschonen voor fase 2. |
| B2C-playbook | Nog geen aparte versie gevonden. | Alleen maken als B2C-splitsing doorgaat. |
| Growth Funnel | Een versie voor iedereen. | Later B2B/B2C-splitsing beoordelen. |
| DPA | Wordt gekopieerd. | DPA-template en legal actualiteit checken. |
| Pre-audit questionnaire in Drive | Verouderd. | Vervangen door Cloudflare-vragenlijst. |
| Assignment letter | Komt binnen als link, maar wordt niet opgeslagen in partnermap. | Proces en bron standaardiseren. |
| Handover | Komt binnen als link, ontbreekt soms en wordt niet opgeslagen. | Definieren wat handover is en wie eigenaar is. |
| Tooling access | Geen vast onderdeel van de automation. | Als checklist/statusblok toevoegen. |

### 5.3 Vragenlijst

De nieuwe onboardingvragenlijst staat los van het oude Google Doc-model.

Live:

- B2C: `https://onboarding.sprintsandsneakers.dev`
- B2B: `https://onboarding.sprintsandsneakers.dev/b2b`
- Per partner: `?c=<Drive-folder-id>` op de juiste link

Technische huidige staat:

- `public/index.html` is de B2C-vragenlijst.
- `public/b2b.html` is de B2B-vragenlijst.
- Cloudflare Worker schrijft antwoorden als Google Doc.
- Uploads gaan resumable naar Google Drive via service-account.
- De service-account is lid van de map "2. Current projects".
- Antwoorden en bestanden horen in de Drive-projectmap van de partner, niet in de shared folder.

Open:

- Make moet B2B-partners automatisch de `/b2b`-link sturen.
- Make moet de juiste partnerfolder-id meegeven in `?c=`.
- De oude Drive-kopie van de pre-audit questionnaire moet uit de mail en flow.
- Bij inzending moet Make/Monday/Slack een statusupdate krijgen: vragenlijst ontvangen.

Inhoudelijke lijn:

- Vraag alleen wat de partner zelf kan vertellen.
- Vraag niet wat S&S uit contract, database, markt, analytics of desk research kan halen.
- Vraag wel naar klantinzichten, merkperceptie, kanaalperformance, funnel, tracking, teamproces, ambitie, assets en access.

Toegevoegde feedback uit Mira/Gijs:

- AAARRR/Pirate Funnel gebruiken.
- Capabilities breder maken dan influencers.
- Extra kanalen toevoegen: Organic socials, Affiliate/Marketplaces, Branding/Communication, Referral/Community, Microsoft Ads, LinkedIn, X, Amazon Ads, Bol.com Ads.
- B2B-vragen aansluiten op pipeline, ICP, buying committee, sales handoff en B2B-positionering.
- Vaste sprint-cadans gebruiken: wekelijkse check-in en maandelijkse strategische review.

### 5.4 Partner-ervaring

Input van teamleads laat vooral dit zien:

| Partner ervaart | Betekenis | Oplossingsrichting |
|---|---|---|
| Te lang niets horen | Te weinig ritme | Welkomstmoment + statusritme |
| Onduidelijk wanneer wat gebeurt | Geen tijdpad | Roadmap in mail |
| Planning voelt improviserend | Geen zichtbare regie | Kickoff en access vooraf plannen |
| Access duurt lang | Toegang komt te laat | Access-checklist vroeg in flow |

Rode draad: partners missen minder vaak documenten dan regie. De onboarding moet minder los aanvoelen.

### 5.5 Input van Bart

Bart adviseert om simpel te beginnen:

- Klanten onboarden met een druk op de knop.
- Nieuwe onboardingvragen gebruiken.
- Team op de hoogte stellen van nieuwe maturity scan.
- Maturity scan opnieuw inzetten.
- Onboardingmail verbeteren.
- Partners in de beginfase laten voelen dat ze de juiste keuze hebben gemaakt.
- Dat gevoel opbouwen met geautomatiseerde processen en berichten die on-brand en concreet zijn.

Interpretatie: Bart kiest voor een praktische v1 met directe waarde. Geen brede first-month journey als eerste bouwslag. Wel een betere eerste indruk.

## 6. Openstaande onderdelen en vragen

### 6.1 Strategische scope

- Is v1 officieel beperkt tot automatisering + eerste indruk?
- Wanneer schuiven we door naar een volledige eerste-maand partner experience?
- Wie beslist over B2B/B2C-splitsing buiten de vragenlijst?
- Wat is de minimale lat voor "partner klaar om te growth hacken"?

### 6.2 Make-workflow

- Welke live fixes zijn al gedaan in scenario `3059444`?
- Welke fixes bouwen we alleen in V2?
- Kunnen alle teamroutes terug naar een gedeelde basis met teamconfiguratie?
- Hoe behandelen we Kappa: repareren of eerst inhoudelijk checken?
- Welke dode modules kunnen eruit zonder gedrag te breken?

### 6.3 Connecties en eigenaarschap

- Wordt `accounts@sprintsandsneakers.com` alleen interim gebruikt?
- Wie beheert de Google service-account?
- Wie beheert Slack bot-token en Monday API-token?
- Welke mailbox of mailprovider verstuurt partnermails?
- Wie krijgt foutmeldingen?

### 6.4 Maturity scan

- Welke maturity scan bedoelt Bart precies?
- Waar staat de scan nu?
- Is de scan intern, extern of allebei?
- Wanneer in de flow sturen we de scan?
- Wie moet de uitkomst zien?
- Welke status krijgt de scan in Monday?
- Moet de scan-uitkomst in de partnerfolder komen?
- Moet de partner een bevestiging of samenvatting ontvangen?

### 6.5 Assignment letter en handover

- Wie maakt de assignment letter?
- Waar komt de assignment letter vandaan: HubSpot, mail, Drive, template?
- Wie maakt de sales-to-growth handover?
- Wat is de minimale inhoud van de handover?
- Waarom ontbreekt de handover soms?
- Willen we assignment letter en handover altijd opslaan in de partnermap?
- Moet de workflow alleen links opslaan of bestanden kopieren?

### 6.6 DPA en legal

- Is het huidige DPA-template juridisch actueel?
- Wie is eigenaar van het DPA-template?
- Heeft Hidde toegang tot de bron in Finance & Legal?
- Moet DPA automatisch met de partner worden gedeeld of eerst intern gecontroleerd worden?

### 6.7 Tooling access

- Hoort tooling access als vast onderdeel in onboarding? Advies: ja.
- Welke tools moeten standaard in de checklist?
- Welke e-mail hoort bij welke tool?
- Hoe voorkomen we dat Meta Ads of andere platformen aan een persoon hangen?
- Welke onderdelen kunnen we automatiseren en welke blijven handmatig?
- Wie vinkt toegang af?

### 6.8 B2B/B2C

- Moet B2B/B2C alleen de vragenlijst sturen in v1?
- Krijgt B2B later een eigen playbook en funnel?
- Krijgt B2C later een eigen playbook en funnel?
- Welke Monday-boardtemplates horen bij B2B en B2C?
- Wordt B2B/B2C gekozen in het Slack-form, HubSpot of Monday?

### 6.9 Partnercontacten

- Welke partnercontactpersonen moeten we uitvragen?
- Moeten we meerdere e-mails toestaan?
- Wie krijgt Drive, Slack en Monday?
- Moeten finance/legal-contacten apart worden gevraagd?
- Hoe voorkomen we dat access blijft hangen op een enkel algemeen e-mailadres?

### 6.10 Communicatie

- Op wiens naam gaat de onboardingmail?
- Welke reply-to gebruiken we?
- Moet de mail Nederlands of Engels zijn?
- Wat is de minimale roadmap in de mail?
- Sturen we een aparte bevestiging na ingevulde vragenlijst?
- Sturen we een aparte bevestiging na maturity scan?

## 7. Ideeen

### 7.1 MVP-ideeen die nu passen

- Een knop of status-trigger: "Start onboarding".
- Partnerstatus in Monday met checklist.
- Automatisch Slack-bericht naar teamlead met partnerinfo, vragenlijstlink en open acties.
- Maturity scan opnemen als vaste stap.
- Bevestiging naar partner zodra vragenlijst binnen is.
- Partnermail met korte roadmap: nu, deze week, richting kickoff.
- Missing-items reminder voor assignment letter, handover en tooling access.
- Foutmelding naar eigenaar als Make-run faalt.
- Duidelijke mailcopy die S&S positioneert als growth partner en de partner als hoofdrolspeler.

### 7.2 Fase-2 ideeen voor betere partner experience

- Eerste update vroeger sturen dan verwacht, bijvoorbeeld rond dag 5.
- In week 1 het jargon van de partner vastleggen en gebruiken in communicatie.
- Teamintro via werk: specialisten delen kort een relevant experiment of leerpunt.
- Introductie in growth hacking met voorbeelden uit S&S-werk.
- S&S wordt eerst klant van de partner: iemand doorloopt de klantreis en deelt observaties.
- Eerste mislukte experiment delen met les erbij, zodat de partner ziet hoe S&S leert.
- Klantstem ophalen: korte fragmenten van echte klanten of doelgroep teruggeven.
- Starter kit of goodiebag met uitleg over hoe S&S werkt.
- AI-cursus, skill of agent als nuttig onboardingcadeau.

### 7.3 Ideeen die later of selectief passen

- Weekendje weg voor partnercontactpersoon.
- Eerste resultaat als trofee.
- Persoonlijk Kimpton-achtig gebaar op basis van iets uit de eerste gesprekken.
- Iets kleins voor het thuisfront.

Deze ideeen kunnen sterk zijn, maar horen niet in de eerste technische rebuild. Ze vragen eigenaarschap, budget, timing en duidelijke criteria. Anders worden ze losse gestures in plaats van een schaalbare onboarding.

## 8. Aanbevelingen

### 8.1 Bouw v1 rond regie, niet rond spektakel

De grootste partnerpijn zit in stilte, onduidelijkheid en toegang. Los dat eerst op. Een scherpe onboardingmail en statusritme leveren sneller vertrouwen op dan een groot experience-concept dat operationeel nog niet klopt.

### 8.2 Maak de workflow statusgedreven

Maak per partner een onboardingstatus met vaste onderdelen:

- Partner aangemaakt
- Folder aangemaakt
- Shared folder gedeeld
- DPA klaar
- Playbook/funnel klaar
- Vragenlijst verstuurd
- Vragenlijst ontvangen
- Maturity scan verstuurd
- Maturity scan ontvangen
- Team geinformeerd
- Slack intern klaar
- Slack extern klaar
- Monday-board klaar
- Tooling access gestart
- Assignment letter opgeslagen
- Handover opgeslagen
- Kickoff gepland

### 8.3 Sluit de vragenlijst-lus

De vragenlijst is pas waardevol als het team automatisch weet dat hij binnen is. Laat Cloudflare Worker of Make bij submit een statusupdate sturen naar Monday en Slack.

### 8.4 Behandel maturity scan als kerninput

Bart noemt de maturity scan expliciet. Maak hem geen losse link, maar een eigen stap met eigenaar, status, outputlocatie en notificatie.

### 8.5 Laat B2B/B2C in v1 alleen de juiste vragenlijst bepalen

Volledige splitsing in playbooks, funnels en boards is zinvol, maar vergroot de eerste bouwslag. Voor v1 is genoeg:

- veld `partner_type`: B2B / B2C / anders
- juiste vragenlijstlink
- juiste label in teamnotificatie
- status om later playbook/funnel te splitsen

### 8.6 Haal persoonsgebonden accounts uit de kritieke keten

Een onboarding mag niet stoppen omdat iemand een wachtwoord wijzigt. Gebruik service-accounts, bot-tokens en centrale API-keys waar dat kan.

### 8.7 Bewaar assignment letter en handover voortaan zichtbaar

Deze documenten horen bij de overdracht van sales naar growth. Als ze ontbreken of alleen als losse link door de flow gaan, start het team met contextverlies.

## 9. Plan

### Fase 0 - Live stabiliseren

Doel: productieflow stopt niet meer op bekende blokkades.

Acties:

- Persoonsgebonden connecties vervangen of tijdelijk stabiliseren.
- Verwijderde Slack-users vervangen.
- Foutmelding toevoegen bij falende run.
- Controleren welke teamroutes afwijken.
- Oude pre-audit questionnaire niet meer als waarheid behandelen.

Output:

- Live onboarding draait zonder bekende blokkades.
- Eigenaar krijgt melding bij failure.

### Fase 1 - MVP in V2 bouwen

Doel: een partner kan met een druk op de knop door de basis-onboarding.

Acties:

- Trigger standaardiseren.
- Partner_type toevoegen: B2B/B2C.
- Correcte Cloudflare-vragenlijstlink sturen.
- Maturity scan toevoegen als vaste stap.
- Teamnotificatie maken met partnerinfo, status, scan en open acties.
- Partnermail herschrijven.
- Statuschecklist in Monday of centrale sheet maken.
- Assignment letter en handover als expliciete status opnemen.
- Tooling access als expliciete status opnemen.

Output:

- V2-flow werkt end-to-end in sandbox.
- Team ziet per partner wat klaar is en wat ontbreekt.
- Partner ontvangt een duidelijke onboardingmail.

### Fase 2 - Vragenlijst en scan-lus sluiten

Doel: input komt automatisch terug bij het team.

Acties:

- Submit van vragenlijst koppelen aan Make/Monday/Slack.
- Status "vragenlijst ontvangen" automatisch zetten.
- Maturity-scan-submit of -resultaat koppelen aan status.
- Antwoorden en uploads in juiste Drive-projectmap controleren.
- Partnerbevestiging sturen na ontvangst.

Output:

- Geen handmatig zoekwerk naar antwoorden of documenten.
- Teamlead krijgt automatisch seintje.

### Fase 3 - Partner experience verbeteren

Doel: de eerste maand voelt geregisseerd en persoonlijk.

Acties:

- Dag-5 update ontwerpen.
- Teamintro via werk ontwerpen.
- Growth hacking introductie toevoegen.
- Partnerjargon vastleggen en gebruiken.
- Selectieve experience-ideeen testen bij passende partners.

Output:

- S&S heeft een herkenbare first-month rhythm.
- Partners ervaren minder stilte en meer grip.

### Fase 4 - B2B/B2C-differentiatie

Doel: onboardingmateriaal sluit beter aan op type partner.

Acties:

- B2B-playbook opschonen.
- Beslissen of B2C-playbook nodig is.
- Growth Funnel varianten beoordelen.
- Monday-boardtemplates per type koppelen.
- Vragenlijstinzichten vertalen naar kickoff-template.

Output:

- B2B en B2C krijgen waar nodig eigen materiaal.

## 10. Definition of done voor v1

V1 is klaar wanneer:

- Een S&S'er de onboarding kan starten via een duidelijke knop, form of status.
- De workflow gebruikt geen kritieke persoonsgebonden connectie meer of heeft een goedgekeurde interim.
- De juiste B2B/B2C-vragenlijstlink wordt verstuurd.
- Partnerfolder en shared folder worden aangemaakt.
- DPA, funnel en playbook worden klaargezet of zichtbaar gemarkeerd als open.
- Teamlead krijgt een Slack/Monday-update met nieuwe partner, scanstatus en open acties.
- Maturity scan is een vaste stap met status.
- Partner krijgt een concrete, on-brand onboardingmail.
- Assignment letter, handover en tooling access staan als expliciete checklistitems.
- Bij falen krijgt de eigenaar een melding.
- Er is een statusoverzicht per partner.

## 11. Concept voor nieuwe partnermail

Onderwerp: We zijn gestart met jullie growth onboarding

Hi {{first_name}},

Welkom bij Sprints & Sneakers.

We hebben jullie onboarding gestart. De komende dagen verzamelen we de input waarmee het team direct scherp kan beginnen: jullie context, groeidoelen, maturity scan, toegang en de documenten die we nodig hebben voor de kickstart.

Dit staat nu voor jullie klaar:

- Onboardingvragenlijst: {{questionnaire_link}}
- Maturity scan: {{maturity_scan_link}}
- Gedeelde projectmap: {{shared_folder_link}}
- DPA: {{dpa_link}}

Wat er daarna gebeurt:

1. Jullie vullen de vragenlijst en maturity scan in.
2. Ons team checkt de input en zet ontbrekende toegang of documenten op een rij.
3. We gebruiken dit als basis voor de kickstart en de eerste growth-sprints.

Stuur de vragenlijst het liefst door naar de persoon die jullie klant, merk, funnel en interne processen het best kent. Voor toegang en tooling mag iemand anders helpen.

Groet,

{{account_lead_name}}  
Sprints & Sneakers

## 12. Interne teamnotificatie

Kanaal: teamlead of toegewezen teamkanaal.

Inhoud:

- Nieuwe partner: `{{company_name}}`
- Type: `{{partner_type}}`
- Team: `{{assigned_team}}`
- Gestart door: `{{started_by}}`
- Partnercontact: `{{partner_first_name}} / {{partner_email}}`
- Projectfolder: `{{project_folder_link}}`
- Shared folder: `{{shared_folder_link}}`
- Vragenlijst: `{{questionnaire_link}}`
- Vragenlijststatus: `verstuurd / ontvangen`
- Maturity scan: `{{maturity_scan_link}}`
- Maturity-scanstatus: `verstuurd / ontvangen`
- Assignment letter: `aanwezig / ontbreekt`
- Handover: `aanwezig / ontbreekt`
- Tooling access: `nog te starten / bezig / compleet`
- Eerstvolgende actie: `{{next_action}}`

## 13. Risico's

| Risico | Gevolg | Mitigatie |
|---|---|---|
| Scope groeit naar volledige first-month journey | MVP vertraagt | Fase 1 strikt houden |
| Service-account/API-tokens ontbreken | Workflow blijft kwetsbaar | Tijdelijke connectie expliciet als interim markeren |
| Maturity scan is niet duidelijk gedefinieerd | Teamnotificatie blijft vaag | Eigenaar en bron vastleggen |
| Assignment letter/handover blijven losse links | Contextverlies | Opslaan of checklist-blokkade maken |
| B2B/B2C-splitsing wordt te vroeg groot | Veel templates tegelijk aanpassen | Eerst alleen juiste vragenlijst |
| Externe Slack/Monday-uitnodigingen blijken beperkt | Access blijft handmatig | Checklist + eigenaar + reminder |

## 14. Directe next steps

1. Bart/Gijs laten bevestigen dat v1 deze scope heeft: automation + onboardingvragen + maturity scan + teamnotificatie + mail.
2. Maturity scan identificeren: link, eigenaar, output, gewenste status.
3. Beslissen waar partnerstatus komt: Monday-item, Monday-board, Sheet of combinatie.
4. Make V2 uitbreiden met partner_type, juiste vragenlijstlink en statusvelden.
5. Oude pre-audit questionnaire uit partnermail vervangen door Cloudflare-link.
6. Teamnotificatie bouwen.
7. Onboardingmail herschrijven en laten checken.
8. Assignment letter en handover-proces met Bart/Gijs vastleggen.
9. Tooling-access-checklist maken.
10. Failure-alert toevoegen.

## 15. Bronnen en betrouwbaarheid

Betrouwbaarheid: hoog voor technische workflowbevindingen die uit de echte Make-blueprint en bestaande analyses komen. Matig voor onderdelen waar nog een eigenaar of besluit ontbreekt, vooral maturity scan, tooling access, assignment letter, handover en B2B/B2C-playbookstrategie.

Gebruikte repo-bronnen:

- `Onboarding workflow/Briefing-Onboarding-Workflow-Verbeteren.md`
- `Onboarding workflow/Onboarding-Workflow-Analyse-en-Blueprint.md`
- `Onboarding workflow/New partner onboarding.blueprint.json`
- `Onboarding workflow/New partner onboarding V2.blueprint.json`
- `New-Vragenlijst/specs/README.md`
- `New-Vragenlijst/specs/2026-06-17-onboarding-questionnaire-design.md`
- `New-Vragenlijst/specs/2026-06-22-onboarding-feedback-mira-design.md`
- `New-Vragenlijst/specs/Vragenlijst notities en messages.txt`

Nieuw toegevoegde input:

- Bart: simpel beginnen, een-druk-op-de-knop onboarding, nieuwe onboardingvragen, team op de hoogte van maturity scan, scan opnieuw gebruiken, onboardingmail verbeteren, partners in de beginfase vertrouwen geven met geautomatiseerde on-brand berichten.
