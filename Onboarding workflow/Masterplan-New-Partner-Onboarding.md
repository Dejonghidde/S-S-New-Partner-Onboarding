---
type: masterplan
project: New Partner Onboarding
status: Opgesteld, ter review bij Hidde
opgesteld: 2026-07-14, autonome uitwerking door Claude Fable 5 in opdracht van Hidde
rol: kompas boven de spec. De spec (spec/spec.md, deel 1 en 2) blijft leidend voor wat er per bouwgolf exact gebouwd wordt; dit plan ordent alle fasen richting het einddoel en is de plek waar prioriteit en volgorde worden bepaald.
bronnen: huidige V1-blueprint (New partner onboarding V2.blueprint.json, export 2026-07-13), spec/spec.md deel 1+2, Benchmarkonderzoek-onboarding-andere-bedrijven.md, Input:inspiratie/Onboarding input leads.md, feedback Bart (2026-07-13, vragenlijst + trigger + video), briefing-vragen aan Bart/Gijs (2026-07-13)
---

# Masterplan New Partner Onboarding

## 1. Einddoel

**Binnen 10 werkdagen na het tekenen van het contract is elke nieuwe partner aantoonbaar klaar om te growth-hacken, zonder dat de partner iets hoeft aan te leveren dat S&S zelf kan achterhalen, zonder dat er ook maar iets stil blijft liggen, en met een eerste indruk die direct vertrouwen geeft.**

Dat einddoel valt uiteen in vier meetbare pijlers. Elke stap in dit plan draagt bij aan minstens een van deze vier; een stap die aan geen enkele pijler bijdraagt hoort niet in dit plan.

| # | Pijler | Meetlat | Huidige situatie |
|---|---|---|---|
| P1 | **Snel en voorspelbaar** | Contract tot growth-ready binnen 10 werkdagen; kickstart binnen 5; toegang compleet binnen 3 | Dagen tot weken, geen vast ritme |
| P2 | **Minimale partnerinspanning** | Vragenlijst minstens 50% korter; alles wat S&S zelf kan achterhalen wordt automatisch opgehaald; invultijd onder 30 minuten | Partner beantwoordt 9 secties waarvan een groot deel zelf te achterhalen is (Bart) |
| P3 | **Volledig bewaakt** | Elke stap, automatisch en handmatig, zichtbaar met eigenaar, termijn, reminder en escalatie; nul stille uitval | Automation bewaakt (V1), handmatige stappen zitten in een bundelkolom zonder detail |
| P4 | **Vertrouwen vanaf dag 0** | Onboarding start automatisch bij contract; persoonlijk welkom (video van Bart, accountlead als benoemde eigenaar); tijdpad zichtbaar voor de partner | Start handmatig via Slack-form; welkom is een mail zonder gezicht |

De onderbouwing komt uit drie onafhankelijke bronnen die naar hetzelfde wijzen: het benchmarkonderzoek (bij 8 van de 9 onderzochte bedrijven is zichtbare regie plus een expliciete eigenaar de gedeelde succesfactor, niet meer documenten), de leads (Anjo: toegang mist altijd iets; Sharif: trajecten starten ongecontroleerd) en Bart (partner niet vervelen met vragen die wij zelf kunnen beantwoorden; onboarding afvuren bij tekenen contract).

## 2. Startpunt (wat er nu staat, geverifieerd in de blueprint)

De V1-herbouw staat klaar en is het fundament waarop dit plan bouwt:

- Eén generieke growth-route met teamverschillen uit de Teamconfig-tab; aparte Rho-route (via Worker/service-account); fallback-melding bij onbekende teamnaam.
- Onerror-handlers op elke kritieke stap met partnernaam en oorzaak (DM naar Hidde).
- B2B/B2C-splitsing (juiste vragenlijst-link), taal NL/EN, zachte poort bij ontbrekende intake-velden.
- Registry-rij per partner, Monday Client overview-item met statuskolommen, welkomstmail NL/EN met accountlead-naam en reply-to per team.
- Tooling Access Guide wordt per partner als verse kopie in de partnermap gezet.
- Aparte scenario's voor de vragenlijst-webhook (status "binnen") en dagelijkse reminders (3 werkdagen).

**Restpunten die uit de blueprint-analyse komen en in fase 0 mee moeten (verificatielijst cutover):**

| # | Restpunt | Impact |
|---|---|---|
| R1 | De routes "Copy assignment letter" en "Copy handover" staan `disabled` in het scenario, terwijl de registry wel GEKOPIEERD kan rapporteren. Activeren en testen, of de registry-tekst kloppend maken. | Contextverlies plus misleidende status |
| R2 | Module "Create partner board (per type)" gebruikt een hardcoded board-id (18401703415) in de GraphQL-mutatie; de variabele `templateId` (B2B/B2C) uit module 2 wordt niet gebruikt. Elke partner krijgt nu hetzelfde template. | B2B/B2C-splitsing werkt niet voor het board |
| R3 | De Drive-shares (DPA en SHARED-map) staan op `sendNotificationEmail: true`: de partner krijgt losse Google-notificaties naast de welkomstmail. Bewust uitzetten of accepteren (hangt samen met on hold ticket 08). | Vier versnipperde mails in plaats van een |
| R4 | Drive-modules draaien op persoonsgebonden connecties (Hidde Gmail, Sharif Gmail voor de DPA-map); Monday-module 1023 nog op Sharifs connectie. Deels bewuste interim-keuze, wel expliciet loggen. | Bekend faalpatroon blijft deels bestaan |
| R5 | Lead-naam en lead-e-mail per team zitten hardcoded in een switch-module in plaats van in de Teamconfig-tab (waar de kolommen al bestaan). | Nieuw team of teamlead-wissel vergt scenario-wijziging |
| R6 | Slack-form: velden assignment letter en handover nog verplicht maken (restant ticket 09). | Zachte poort vangt het, maar voorkomen is beter |

## 3. Het stappenplan

Zes fasen. Fase 0 en 1 kunnen deels parallel; fase 2 is het grootste nieuwe werk en start zodra fase 0 loopt. Per stap staat wat er gebeurt, waarom (welke pijler), en wanneer hij klaar is.

---

### Fase 0: V1 live brengen (deze week)

Zonder live fundament heeft niets hierna een drager. Dit is de kortste weg naar zichtbaar resultaat.

**Stap 0.1: E2e-verificatie plus restpuntenlijst afwerken.**
Testrun per team (Sigma, Phi, Gamma, Kappa, Alpha, Rho) tegen de verificatielijst uit de spec-DoD, aangevuld met R1 tot en met R6 hierboven. R2 (board-template per partner_type) en R1 (letter/handover-kopie) zijn functionele fixes die voor de cutover af moeten; R3 tot en met R5 zijn besluiten die expliciet gelogd worden (fixen of bewust accepteren).
*Waarom:* P3. Een statusoverzicht dat GEKOPIEERD zegt terwijl de kopieerstap uitstaat, ondermijnt precies het vertrouwen in het systeem dat we willen opbouwen.
*Klaar wanneer:* zes groene testruns, restpuntenlijst leeg of per punt een gelogd besluit.

**Stap 0.2: Cutover met go en rollback.**
Oud scenario uit, V1-scenario's aan, eerste echte partner-run gecontroleerd, rollback paraat (ticket 10).
*Waarom:* alle vier de pijlers; vanaf dit moment telt elke verbetering voor echte partners.
*Klaar wanneer:* eerste echte run foutloos gecontroleerd tegen de verificatielijst.

---

### Fase 1: Zichtbare regie op de handmatige stappen (week 1 tot 2)

Het directe antwoord op de vraag van Hidde (overzicht van wat wel en niet gedaan is buiten de automation) en op benchmark-P0's 1, 3 en 6.

**Stap 1.1: Granulaire Monday-subitems in plaats van de bundelkolom.**
Elke handmatige stap wordt een los subitem onder het partner-item: partner in extern Slack-kanaal, partner op Monday-board, kickstart ingepland, LastPass-map, brandbook plus tone-of-voice binnen, ontbrekende info (alleen aangemaakt bij gemis). De automation maakt ze aan bij de partner-run; de bestaande reminder-scan (3 werkdagen) loopt voortaan per subitem; na een tweede gemiste termijn (dag 5) escaleert het item naar Hidde.
*Waarom:* P3. De bundelkolom "Access & kickstart" toont dat er iets speelt, niet welk onderdeel vastzit. Dit maakt "niets blijft liggen" per onderdeel afdwingbaar en meetbaar.
*Klaar wanneer:* testpartner heeft zes subitems met eigenaar; bewust open gelaten item geeft dag-3 reminder en dag-5 escalatie.

**Stap 1.2: Welkomstmail aanscherpen: eigenaarschap en volgende stap.**
Twee copy-wijzigingen in de al klaarliggende mail-drafts: de accountlead wordt expliciet benoemd als vaste eigenaar van de hele onboarding (niet alleen "bij vragen"), en de mail eindigt met een vaste alinea wat er nu gebeurt, wie eigenaar is en wanneer de partner weer iets hoort.
*Waarom:* P4. De twee goedkoopste ingrepen met bewezen effect (benchmark: elk contact eindigt met volgende stap plus datum; een benoemde owner bij 8 van de 9 bedrijven).
*Klaar wanneer:* NL- en EN-mail bijgewerkt en door Bart/Gijs goedgekeurd (loopt mee in de al gestelde briefing-vragen).

---

### Fase 2: De partner ontlasten: vragenlijst halveren plus self-research (week 2 tot 3)

De kern van Barts feedback. De hardste ingreep op partnerervaring (P2) en tegelijk een kwaliteitsslag: data-analyse in plaats van gut feeling als basis voor de audit.

**Stap 2.1: Vragenlijst-sanering, doelstelling minimaal -50%.**
De B2C- en B2B-vragenlijst worden per vraag langs twee criteria gelegd: (a) kan alleen de partner dit weten, en (b) verandert het antwoord wat het team doet. Alles wat faalt op (a) gaat eruit en verhuist naar het research pack (stap 2.2). Barts besluiten per sectie zijn de bindende richtlijn:

| Onderdeel | Besluit Bart | Actie |
|---|---|---|
| Metadata (prepared for, date, completed by) | Weg, systeem weet dit al | Schrappen |
| Sectie 0, the basics | Volledig weg (staat in contract, zelf te achterhalen) | Schrappen, naar research pack |
| Sectie 1, bedrijf en markt | Uit database en markt te halen | Schrappen, naar research pack |
| Sectie 2, account profile | Data-analyse in plaats van klantperceptie; kern kan weg | 2.3, 2.4, 2.5 en 2.6 behouden; 2.1 behouden maar signalen-overlap met 2.6 eruit en herformuleren in klare taal; 2.7 herschrijven in klare taal of schrappen; rest weg |
| Sectie 3 | "Nice" | Behouden |
| Sectie 4 | Zelf uitzoeken | Schrappen naar research pack; 4.5 (capabilities) wordt een eigen kort hoofdstuk; 4.6 alleen tonen als account-based approach relevant is, anders weg |
| Sectie 5, tech en tracking | Zelf detecteerbaar | Pre-fill via detectie (stap 2.3); alleen bevestiging plus de open vraag naar de grootste tracking-gap blijft (dat is echte partnerkennis) |
| Secties 5/6, funnel | Zelf uitzoeken, behalve het lek | Funnelvragen schrappen; de vraag waar de funnel lekt blijft |
| Assets en access (sectie 8) | Niet genoemd door Bart | Behouden; brandbook plus tone-of-voice wordt hier juist explicieter (besluit Experience-laag) |
| Geheel | Minstens -50%, daarna nog een kritische ronde | Na de eerste sanering een tweede reductieronde met Bart |

*Waarom:* P2 direct, P1 indirect (kortere vragenlijst wordt sneller ingevuld, dus minder wachten op input). Elke geschrapte vraag is bovendien een kwaliteitswinst: het antwoord komt uit data in plaats van uit de onderbuik van de invuller (Barts kernpunt bij account profile).
*Klaar wanneer:* beide vragenlijsten geschoond, invultijd getest onder 30 minuten, akkoord van Bart en Gijs, live gedeployed. De mapping per vraagnummer gebeurt in het ticket zelf tegen de daadwerkelijke vragenlijst-inhoud; de tabel hierboven is de bindende bron.

**Stap 2.2: Partner Research Pack v1 (proces eerst, automatisering daarna).**
Alles wat uit de vragenlijst verdwijnt, moet ergens vandaan komen. Er komt een vast "Partner Research Pack": een gestructureerd document per partner in de partnermap, gevuld door AI-deep-research plus een menselijke check, aangemaakt zodra de onboarding start. Vaste inhoud: bedrijfsprofiel en propositie, markt en directe concurrenten, actieve advertentiekanalen (via Meta Ad Library en het Google Ads Transparency Center), zichtbare tech-stack en tracking-indicaties (tag-scan van de site), online reputatie (reviews), en wat uit HubSpot en het contract al bekend is. Elk gegeven krijgt een bronvermelding en een zekerheidsniveau; het pack sluit af met de drie tot vijf aannames die de partner in de kickstart moet bevestigen.
V1 is bewust een proces, geen bouwwerk: een vast template plus een vaste research-opdracht die per partner wordt uitgevoerd (door Hidde of de accountlead getriggerd, uitgevoerd met een AI-research-agent). Pas als het patroon bij drie partners bewezen is, wordt het geautomatiseerd (stap 2.4). Dit voorkomt dat we infrastructuur bouwen voor een format dat nog moet uitkristalliseren.
*Waarom:* P2 (de partner hoeft het niet meer aan te leveren) en de kwaliteitseis van Bart (data in plaats van gut feeling). Sluit ook aan op Sharifs punt dat het team met volledige info moet starten.
*Klaar wanneer:* template staat vast, bij twee testpartners is een pack opgeleverd in de partnermap, en het team bevestigt dat de audit ermee sneller start.

**Stap 2.3: Tech en tracking: van vragen naar verifiëren.**
De sectie uit de screenshot (ad-platforms, tracking-setup) wordt omgedraaid: S&S detecteert vooraf wat detecteerbaar is (actieve ad-platforms via de publieke ad-bibliotheken, aanwezige tags via een site-scan) en zet dat als voorlopig ingevuld in het research pack. In de vragenlijst blijft alleen: een korte bevestiging ("klopt dit beeld?") en de open vraag naar de grootste tracking-gap. Server-side zaken die niet van buiten zichtbaar zijn (CAPI, CMP-configuratie) worden een kickstart-gespreksonderwerp in plaats van een checkbox-lijst.
*Waarom:* P2, en eerlijker naar de partner: een marketingmanager weet vaak zelf niet precies wat er live staat ("honestly not sure" staat er nu letterlijk als antwoordoptie in).
*Klaar wanneer:* detectie-checklist bestaat (welke bron voor welk gegeven), sectie 5 in beide vragenlijsten is teruggebracht tot bevestiging plus gap-vraag.

**Stap 2.4: Research Pack v2: automatisch getriggerd.**
Zodra v1 bewezen is: de Make-flow (of de Worker) start de research automatisch bij elke nieuwe partner en zet het pack in de partnermap, met een subitem "Research pack klaar" op het Monday-item en een seintje in het teamkanaal.
*Waarom:* P1 en P2 structureel; het pack ligt er dan al voordat iemand eraan denkt.
*Klaar wanneer:* nieuwe partner krijgt zonder menselijke trigger een pack binnen een werkdag, met menselijke review als vast checklist-item.

---

### Fase 3: Start bij contract (week 3 tot 4)

Barts wens ("idealiter onboarding afvuren bij tekenen contract") en de sterkste benchmark-les van Springbok: hoe eerder de start, hoe minder dode tijd.

**Stap 3.1: Spike HubSpot-trigger.**
Onderzoeken: welke deal-stage is het startsein, welke velden zijn betrouwbaar gevuld (bedrijfsnaam, contactpersoon, e-mail, team-toewijzing, partner_type, taal, assignment letter, handover), wie beheert de koppeling, en wat er gebeurt bij onvolledige data (de zachte poort blijft gelden). Een dag werk, geen bouw.
*Waarom:* de trigger is alleen zo goed als de data die HubSpot op dat moment heeft; dit moet eerst feitelijk vastgesteld worden.
*Klaar wanneer:* beslisdocument met veldmapping en go/no-go van Bart/Gijs.

**Stap 3.2: HubSpot-trigger naast het Slack-form.**
Deal naar "gewonnen" vuurt een webhook naar Make die dezelfde generieke route start. Het Slack-form blijft bestaan als handmatige start en fallback. Ontbrekende velden lopen via de bestaande zachte poort (run start, gemis zichtbaar).
*Waarom:* P1 en P4. Dag 0 wordt letterlijk de dag van de handtekening; het welkom komt binnen minuten na het tekenmoment, precies het moment waarop de partner het meest ontvankelijk is (benchmark: twijfel na aankoop opvangen).
*Klaar wanneer:* testdeal in HubSpot levert end-to-end hetzelfde pakket als het Slack-form, inclusief registry-rij en subitems.

---

### Fase 4: Kickstart-standaard en begeleide access (week 4 tot 5)

Sharifs kernklacht (ongecontroleerd starten) en Anjo's kernklacht (toegang mist altijd iets) structureel oplossen. Dit is Experience-laag blok B en C uit de spec.

**Stap 4.1: Kickstart-standaardformat plus handover als startvoorwaarde.**
Vast format, ingevuld door de accountlead tijdens de kickstart: succescriteria voor deze onboarding, rollen en contactpersonen aan beide kanten, communicatieritme, eerste-waardemijlpaal met datum, plus bevestiging van de research-pack-aannames (koppeling met fase 2). De accountlead bevestigt de kickstart pas als assignment letter en handover niet meer op "ontbreekt" staan (proces-gate, geen automation-blokkade). De welkomstmail krijgt een directe manier om de kickstart in te plannen (scheduling-link of drie voorgestelde sloten).
*Waarom:* P1 (kickstart binnen 5 werkdagen lukt alleen als plannen op dag 0 begint) en P3 (geen traject meer zonder vastgelegde afspraken).
*Klaar wanneer:* testpartner doorloopt kickstart met volledig ingevuld format, vastgelegd op het Monday-item.

**Stap 4.2: Tooling Access Guide herschrijven en koppelen aan de subitems.**
De guide die de automation nu per partner kopieert is inhoudelijk verouderd (dode tools, persoonsgebonden instructies, wachtwoorden-via-mail-instructie). Volledige herschrijving on-brand, en de toegangen uit de guide worden een-op-een dezelfde items als de access-subitems uit stap 1.1, met de accountlead als actieve begeleider in de eerste drie werkdagen in plaats van een pdf die de partner zelfstandig moet ontcijferen.
*Waarom:* P1 (toegang is de aangetoonde bottleneck voor audit en strategie) en P3. De automation-plumbing bestaat al (verse kopie per partner); alleen de bron moet goed worden.
*Klaar wanneer:* nieuwe guide vervangt het bronbestand dat de automation kopieert; toegang-subitems matchen de guide; eerste partner haalt toegang compleet binnen 3 werkdagen.

---

### Fase 5: Persoonlijk welkom met Barts video (parallel, afhankelijk van Bart)

**Stap 5.1: Bart herinneren en briefen voor de welkomstvideo.**
Actiepunt dat Bart zelf heeft gevraagd. Korte briefing maken: doel (twijfel na tekenen wegnemen, gezicht geven aan het team), lengte (60 tot 90 seconden), toon (welkom plus wat de partner de eerste twee weken kan verwachten), en hosting (unlisted YouTube of Drive-embed, zodat de mail licht blijft).
*Waarom:* P4. De menselijke video-overdracht is een van de weinige benchmark-onderdelen (KlientBoost) die vrijwel niets kosten en direct persoonlijk maken wat nu volledig geautomatiseerd voelt.
*Klaar wanneer:* Bart heeft de briefing en een reminder staat.

**Stap 5.2: Video verwerken in de welkomstmail.**
Nieuw blok in de mail (thumbnail plus link), NL en EN, generiek genoeg om voor elke partner te werken tot er ooit per-team-varianten komen.
*Waarom:* P4.
*Klaar wanneer:* mail met video-blok live in het scenario, klikbaar getest.

---

### Fase 6: Meten en bijsturen (doorlopend vanaf de cutover)

**Stap 6.1: Nulmeting op de eerste drie tot vijf partners.**
Vijf metingen, allemaal uit systemen die er al zijn (registry, Monday, mail-timestamps): tijd van start tot welkomstmail, tijd tot kickstart gepland en gehouden, tijd tot toegang compleet, tijd tot vragenlijst binnen, tijd tot growth-ready (alle subitems groen). Plus een zesde handmatige: hoe vaak moest de partner iets twee keer aanleveren of uitleggen.
*Waarom:* zonder nulmeting zijn de tijdsdoelen uit pijler P1 een mening. Het benchmarkonderzoek waarschuwt hier expliciet voor: eerst meten, dan doelen vastzetten.
*Klaar wanneer:* meetblad gevuld voor drie partners.

**Stap 6.2: Reviewronde met Bart en Gijs.**
Na de eerste drie partners: tijdsdoelen bevestigen of bijstellen, tweede reductieronde op de vragenlijst (Barts "nog eens heel kritisch kijken"), en besluiten wat de eerstvolgende investering wordt (kandidaten: portal met afvink-checklist, Brevo-afzender, maturity scan-definitie, HubSpot-velden verrijken).
*Waarom:* dit plan is af als het einddoel gehaald wordt, niet als alle stappen zijn afgevinkt. De review is het moment waarop dat onderscheid gemaakt wordt.

---

## 4. Wat bewust niet in dit plan zit

- **Onboarding-portal** (eigen frontend met afvink-checklist en video's): expliciet besluit van 2026-07-13, interne regie eerst. Kandidaat voor de reviewronde in stap 6.2; de Cloudflare-infra ligt er al.
- **Brevo / stabiel afzendadres**: on hold, wacht op management-goedkeuring. De mail blijft tot die tijd via de bestaande Gmail-connecties lopen (bekend en geaccepteerd risico).
- **Maturity scan**: nog steeds ongedefinieerd; kolom staat gereserveerd. Definitiegesprek met Bart hoort bij stap 6.2.
- **B2B/B2C-playbooks en funnel-varianten, rolgerichte training, advocacy-momenten, fysieke gestures**: waardevol, maar pas nadat de bovenstaande fasen staan en gemeten zijn.

## 5. Risico's en hoe ze afgedekt worden

| Risico | Afdekking |
|---|---|
| Scope groeit tijdens de fasen (bekend patroon) | Elke stap heeft een klaar-wanneer; nieuwe ideeën gaan naar de stap 6.2-lijst, niet het lopende werk in |
| HubSpot-data blijkt onvolledig bij het tekenmoment | Spike (3.1) vóór de bouw; zachte poort vangt gaten; Slack-form blijft fallback |
| Research pack bevat fouten die de audit insluipen | Bronvermelding plus zekerheidsniveau per gegeven; menselijke review als vast checklist-item; partner bevestigt kernaannames in de kickstart |
| Vragenlijst-sanering blijft hangen in reviewrondes | Barts tabel is de bindende richtlijn; één reviewronde met Bart/Gijs, daarna live; tweede reductieronde pas bij stap 6.2 |
| Barts video laat op zich wachten | Fase 5 blokkeert niets; de mail werkt zonder video en het blok wordt toegevoegd zodra de video er is |
| Gmail-afzender valt uit (wachtwoord/reauth) | Bekend geaccepteerd risico tot Brevo-besluit; onerror-handler meldt het binnen 15 minuten |

## 6. Volgorde in een oogopslag

| Fase | Wat | Wanneer | Pijlers |
|---|---|---|---|
| 0 | V1 live: e2e-test, restpunten R1-R6, cutover | Deze week | P3, fundament |
| 1 | Monday-subitems, reminders, escalatie, mailcopy | Week 1-2 | P3, P4 |
| 2 | Vragenlijst -50%, research pack, tech-detectie | Week 2-3 | P2, P1 |
| 3 | HubSpot-trigger (spike, dan bouw) | Week 3-4 | P1, P4 |
| 4 | Kickstart-standaard, access-guide plus begeleiding | Week 4-5 | P1, P3 |
| 5 | Welkomstvideo Bart | Parallel | P4 |
| 6 | Nulmeting en reviewronde | Vanaf cutover | Alle |

Elke fase is een eigen ticketreeks volgens de bestaande werkwijze: aanpak in twee zinnen voorleggen, groen licht, één ticket per sessie, werkend werk in git, besluiten in het aanpassingenoverzicht.
