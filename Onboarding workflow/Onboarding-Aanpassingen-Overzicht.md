---
type: aanpassingenlijst
project: New Partner Onboarding
status: In uitvoering
accountable: Hidde
bijgewerkt: 2026-07-13
---

# Onboarding — Aanpassingen die gedaan moeten worden

Concrete actielijst van wijzigingen die nog doorgevoerd moeten worden aan de onboarding (Make-scenario's, documenten, vragenlijst). Dit is geen analyse-document — daarvoor zijn er [Overzicht-New-Partner-Onboarding.md](Overzicht-New-Partner-Onboarding.md) en [New-Partner-Onboarding-Projectbriefing-Overzicht.md](New-Partner-Onboarding-Projectbriefing-Overzicht.md). Dit is een changelog van beslissingen mét actie: wat, waar, waarom, en de status.

**Statuswaarden:** Besloten (nog uit te voeren) · Open (nog te bepalen/uit te voeren) · Gedaan.

---

## Overzicht

| # | Aanpassing | Waar | Prioriteit | Status |
|---|---|---|---|---|
| 1 | Playbook auto-kopieerstap schrappen | Make (live 3059444 + V2 6226897) | - | Besloten, nog uit te voeren |
| 2 | Kickstart-template link vervangen in Slack-bericht | Make Slack-module (live 3059444 + V2 6226897) | - | Open |
| 3 | Tone-of-voice + brandbook expliciet uitvragen | Onboarding-vragenlijst / teamstatus | - | Open |
| 4 | Tooling Access Guide document upgraden | Documenten Onboarding/Tooling Access Guide.docx | - | Gedaan door Hidde (gemeld 2026-07-14): on-brand, inhoudelijk bijgewerkt, al live gekoppeld |
| 5 | Splitsing B2B & B2C in workflow | Make (playbook/funnel/Monday-boardtemplates) | - | Open |
| 6 | Consistentie & structuur assignment letter + handover | HubSpot-form → Drive-projectmap | - | Open |
| 7 | DPA — kleine opmaakverbetering | DPA-template (bron: Finance & Legal) | - | Open |
| 8 | Automation foutloos + sneller + minder handmatig werk | Make (live 3059444 + V2 6226897) | 🔴 Hoogste — eerste stap | Besloten (prioriteit), uitvoering loopt |
| 9 | Interactieve onboarding-portal / toegang-afvinklijst | Nieuw (uitbreiding op Cloudflare-vragenlijst) | - | Open — idee, valideren (buiten v1, zie spec) |
| 10 | Spec v1 goedgekeurd; accounts@-interim vervallen | spec/spec.md + tickets/ | 🔴 Kader voor alles | Gedaan (2026-07-10) |
| 11 | Live 3059444 blijft ongemoeid tijdens de bouw; alles eerst in kopie 6226897 | Make (live 3059444 + V2 6226897), tickets 00/01 | 🔴 Veiligheidsregel | Besloten (2026-07-10) |
| 12 | V1-herbouw neergezet: 3 nieuwe inactieve scenario's + Worker-uitbreiding + config/registry | Make, Cloudflare Worker, V1-spreadsheet, Monday | 🔴 Hoofdlevering | Gebouwd (2026-07-11), activatie = cutover met go |
| 13 | Ticket 08 (Brevo-mail) on hold; V1 blijft voorlopig op Sharif/Gino's Gmail | Make-scenario's 6525431/6525442 (mail-modules) | - | On hold (2026-07-12) — wacht op management-goedkeuring voor stabiel adres |
| 14 | Experience-laag (deel 2 van de spec): granulaire Monday-subitems, kickstart-standaardformat, begeleide access-sprint, doorlooptijd-doelen | spec/spec.md deel 2 + nieuwe tickets 11-14 | 🔴 Volgende hoofdlevering na V1-cutover | In review bij Hidde (2026-07-13) |
| 15 | Masterplan opgesteld (einddoel + 6 fasen) op basis van Bart-feedback: vragenlijst -50% + research pack, HubSpot-trigger bij contract, welkomstvideo Bart | Onboarding workflow/Masterplan-New-Partner-Onboarding.md | 🔴 Kompas voor de volgorde | Opgesteld (2026-07-14), ter review bij Hidde |
| 16 | Ticket 11: granulaire Monday-subitems (Blok A) — drie scenario's (subitems aanmaken, reminders, bundelkolom-sync) gebouwd en getest in test-omgeving | Make (sandbox 6557113/6557428/6557435) + test-board/-sheet | 🔴 Volgende hoofdlevering | Gebouwd en getest (2026-07-14); registry-sync + Rho-tak open; overzetten naar live is apart poortje |
| 17 | Tickets 13/18/19 op prioriteit van Hidde: kickstart-format + gate + kopieerstap (13), HubSpot-veldonderzoek + beslisdocument (18), HubSpot-naar-Form-Responses-scaffold (19) | Drive (kickstart-template), Make (sandbox), `Onboarding workflow/HubSpot-Trigger-Beslisdocument.md` | 🔴 Nieuwe prioriteit boven 12/14/15/16 | Grotendeels gedaan (2026-07-14), zie sectie 18 |

---

## 1. Strategy Playbook — automatische kopieerstap schrappen

**Wat:** verwijder de stap die het Strategy Playbook-bestand automatisch kopieert naar de partnermap bij het aanmaken van een nieuwe partner.

**Waar:** Make-scenario's `3059444` (live) en `6226897` (V2 sandbox), stap "Documenten kopiëren", voor alle teamroutes (Sigma/Phi/Gamma/Kappa/Alpha).

**Waarom:** op het moment van kopiëren (dag 0) heeft nog geen growth audit of strategiesessie plaatsgevonden, dus er is niets partner-specifieks om in te vullen. De automatische kopie levert geen waarde en brengt een vertrouwelijkheidsrisico met zich mee (oude, niet-geschoonde klantdata van andere partners staat er nog in). De playbook zelf blijft bestaan als handmatig, later opgeleverd document ná de strategiesessie — dit schrapt alleen de blinde automatisering, niet het document.

**Status:** Besloten (2026-07-09) — nog uit te voeren in de daadwerkelijke Make-scenario's.

---

## 2. Slack-onboardingbericht — verouderde link naar kickstart-template

**Wat:** de link naar "Project kickstart and first acquaintance meeting template" in het automatische Slack-bericht ("🚨 TO DO LIST - Finalise before starting") moet worden bijgewerkt.

**Waar:** Make-scenario's `3059444` (live) en `6226897` (V2 sandbox), Slack-bericht-module, in alle 5 teamroutes die dit bericht gebruiken (Sigma/Phi/Gamma/Kappa/Alpha — Rho gebruikt dit bericht niet).

**Van:** `https://docs.google.com/presentation/d/1OPpJXPtg055yQUcYJtZ2w43jjZtXptvMvkPPGN0IPeM/edit#slide=id.g32d201e166c_0_0`

**Naar:** `https://docs.google.com/presentation/d/1PVWfyM9pPtd5_nz3BCrbvTKemkL2cbxLJvRwgFKtpbc/edit?slide=id.g3b52c8a0a68_2_41#slide=id.g3b52c8a0a68_2_41`

**Status:** Open — nog toe te passen in Make zelf. Bewust niet doorgevoerd in de lokale blueprint-JSON-bestanden in de repo, want dat zijn exports/snapshots die het live scenario niet aansturen — aanpassen daar zou een vals gevoel van "afgehandeld" geven.

---

## 3. Tone-of-voice + brandbook expliciet uitvragen tijdens onboarding

**Wat:** voeg een expliciete stap/vraag toe aan de onboarding waarin het tone-of-voice-document en brandbook van de partner wordt opgevraagd.

**Waarom:** dit wordt momenteel niet duidelijk uitgevraagd in de onboarding, waardoor het vaak vergeten wordt of simpelweg niet binnenkomt. Het is echter cruciaal: zonder tone-of-voice en brandbook kan het team ná de onboarding niet direct on-brand aan de slag (content, campagnes, communicatie namens de partner).

**Waar:** opgenomen als onderdeel van de Experience-laag (spec/spec.md deel 2, Blok A): een los subitem "Brandbook + tone-of-voice" op het Monday-partner-item, plus een bevestigingsoptie in de vragenlijst-assetssectie ("we hebben (nog) geen brandbook/tone-of-voice") zodat afwezigheid zichtbaar is in plaats van stil.

**Status:** In uitvoering via ticket 11 (spec/spec.md deel 2).

---

## 4. Tooling Access Guide document upgraden

**Wat:** de Tooling Access Guide herschrijven/herstructureren, zowel qua vormgeving als inhoud.

**Waarom:** audit (2026-07-09) bevestigde meerdere concrete gebreken: geen S&S-huisstijl (kaal Word-standaard, logo rendert kapot), kapotte inhoudsopgave (sectie 3.2 mist doordat 'ie niet als Heading is gestyled), tegenstrijdige instructies (tekst zegt `accounts@`, screenshot toont `hello@` voor HubSpot-toegang), persoonsafhankelijkheid (Gijs' persoonlijke e-mail als instructie voor toegang op ~7 advertentieplatformen), de instructie om wachtwoorden via e-mail te delen (beveiligingsrisico) bij meerdere tools, een dode tool (Google Optimize, sinds september 2023 offline door Google), verouderde merknamen (Twitter i.p.v. X, Bing Ads i.p.v. Microsoft Advertising), en kopieerfouten (dubbele stapnummers). Onafhankelijk bevestigd door de leads-uitvraag: zowel Anjo als Sharif noemen dat klanten toegang verlenen vaak niet snappen (zie Onboarding-Workflow-Analyse-en-Blueprint.md sectie 5, Ronde 2).

**Waar:** `Documenten Onboarding/Tooling Access Guide - [klantnaam] [maak kopie] .docx`. Opgenomen als onderdeel van de Experience-laag (spec/spec.md deel 2, Blok C): volledige herschrijving, 1-op-1 gekoppeld aan de toegang-subitems uit Blok A.

**Status:** In uitvoering via ticket 14 (spec/spec.md deel 2).

---

## 5. Splitsing B2B & B2C in workflow

**Wat:** volledige B2B/B2C-differentiatie doorvoeren in de onboarding-workflow: niet alleen de juiste vragenlijstlink, maar ook playbook, growth funnel en Monday-boardtemplates per type.

**Waarom:** momenteel krijgt elke partner dezelfde versie ongeacht B2B/B2C. Dit staat al langer als openstaande vraag/aanbeveling in het project (v1-scope beperkt dit bewust tot alleen de juiste vragenlijstlink; volledige splitsing is expliciet "niet in v1" maar wel benoemd als latere fase).

**Waar:** Make-scenario's (playbook-/funnel-kopieerstap), Monday-boardtemplates.

**Status:** Deels besloten (2026-07-10, ticket 03): Monday-boardtemplate wordt bepaald door partner_type (B2B `239400674` / B2C `239420131` / regulier-fallback `188077189`), niet meer per team. Overige B2B/B2C-differentiatie (playbook, funnel) blijft open.

---

## 6. Consistentie & structuur assignment letter + handover

**Wat:** bepalen hoe het assignment letter en het handover-bestand consistent en gestructureerd aangeleverd en bewaard kunnen worden.

**Context:** deze documenten komen uit HubSpot en worden vaak door Bart ingevuld in het form bij de start van een nieuwe partneronboarding, maar niet altijd volledig of correct. Ze komen bovendien niet altijd terecht in de Drive-projectmap, waardoor medewerkers ze niet kunnen inzien.

**Open vraag:** is het bewust dat deze niet altijd in de Drive-projectmap terechtkomen, of moeten ze standaard toegankelijk gemaakt worden voor het team? Uit te vragen bij Bart/Gijs.

**Status:** Open — vraag uitstaand richting Bart/Gijs (wie maakt/vult/bewaart, en of het express is dat toegang wisselend is).

---

## 7. DPA — kleine opmaakverbetering

**Wat:** de opmaak/vormgeving van het DPA-document licht verbeteren.

**Waarom:** puur visueel netter maken; bewust terughoudend met inhoudelijke wijzigingen vanwege juridische regelgeving en eisen — geen "gekke dingen", alleen opmaak.

**Waar:** DPA-template (bron: Finance & Legal).

**Status:** Open — toegang tot het brontemplate in Finance & Legal ontbreekt nog; alleen opmaak, geen inhoudelijke aanpassing zonder juridische check.

---

## 8. Automation als eerste stap: foutloos + sneller + minder handmatig werk

**Prioriteit:** 🔴 Hoogste — dit gaat vóór de losse documentverbeteringen (punten 1, 4, 6, 7). Eerst de automation zelf op orde, dan de rest.

**Wat:** de Make-automation aanpakken vóórdat de losse onboarding-documenten verder worden verbeterd, met drie doelen tegelijk:

1. **Minder handmatig werk** voor medewerkers.
2. **Foutloos / minder foutgevoelig** — met name de bekende faalpunten wegnemen: reautorisatie-errors (persoonsgebonden Google/Slack/Monday-connecties die breken bij wachtwoordwijziging) en Slack-user-errors (verwijderde teamlead-accounts die de run stilzetten).
3. **Sneller** — expliciet gedefinieerd als: de handmatige vervolgacties die mensen ná de automation nog moeten uitvoeren sneller en gestructureerder/effectiever in werking laten zetten (bijv. kickstart-meeting inplannen, LastPass-map aanmaken, teamleden uitnodigen). **Nadrukkelijk NIET bedoeld als:** minder modulen/nodes in het scenario gebruiken, of de run-time van één automation-run verkorten — dat mag gelijk blijven.

**Waarom:** dit is het fundament waar de rest op leunt. Losse documenten verbeteren (playbook, tooling guide, DPA) heeft weinig zin als de keten zelf nog omvalt op bekende blokkades of de overdracht naar mensen traag/onduidelijk blijft. Sluit direct aan bij de al bestaande "Fase 0 - Live stabiliseren" en de bekende blokkades uit de projectanalyse (persoonsgebonden connecties, verwijderde Slack-accounts, geen foutmelding). Onafhankelijk bevestigd door Sharif in de leads-uitvraag: "trajecten beginnen vaker ongecontroleerd en niet volgens opdrachtbrief" (zie Onboarding-Workflow-Analyse-en-Blueprint.md sectie 5, Ronde 2).

**Waar:** Make-scenario's `3059444` (live) en `6226897` (V2 sandbox).

**Status:** Besloten als hoogste prioriteit (2026-07-09) — volgorde t.o.v. de andere punten: dit eerst, dan de rest.

---

## 9. Interactieve onboarding-portal / toegang-afvinklijst (idee, valideren)

**Wat:** een begeleide, interactieve onboarding-omgeving in plaats van statische documenten/lijsten — bijvoorbeeld een checklist waarin de klant per tool "heb ik niet" kan afvinken en doorgaat naar de volgende, gecombineerd met een overzicht van te voltooien stappen en korte video's over het S&S-proces.

**Waarom:** twee leads (Anjo en Sharif) wezen onafhankelijk van elkaar naar dezelfde soort oplossing vanuit verschillende invalshoeken — Anjo specifiek voor toegang verlenen, Sharif breder voor de hele onboarding-checklist + procesuitleg. Er is al precedent/infrastructuur voor (de vragenlijst draait al als eigen Cloudflare-frontend), dus dit is geen nieuwe technische stack.

**Waar:** nieuw te bouwen, vermoedelijk als uitbreiding op de bestaande Cloudflare-vragenlijst-aanpak.

**Status:** Open — idee vanuit leads-input (Anjo/Sharif, 2026-07-09), nog niet besloten of geprioriteerd. Eerst valideren bij Bart/Gijs en afwegen tegen punt 8 (automation eerst).

---

## 10. Spec v1 goedgekeurd: kader voor alle bovenstaande punten, accounts@-interim vervallen

**Wat:** de spec voor het herontwerp (`spec/spec.md`) is opgesteld in de planningssessie met Fable 5 en door Hidde goedgekeurd zonder aanpassingen. De spec is vanaf nu het leidende document; dit changelog blijft de plek waar doorgevoerde wijzigingen worden gelogd. Het werk is opgeknipt in tickets (`tickets/`).

**Belangrijkste besluiten uit de spec die dit changelog raken:**
- **accounts@-interim vervalt.** Het eerdere voornemen (connecties tijdelijk op accounts@) is geschrapt: het wachtwoord roteert wekelijks (zelfde faalmechanisme als het probleem zelf) en het omhangen zou dubbel werk zijn. Live blijft tot de cutover op de huidige connecties, met als enige live-wijzigingen (elk met expliciete go): een echte onerror-foutmelding en punt 1 (playbook-kopieerstap schrappen).
- **Punt 8 wordt uitgevoerd via de spec-fasering:** geen zes routes patchen, maar in de sandbox een geconsolideerde growth-route + teamconfiguratie bouwen; Rho apart maar mee in de betrouwbaarheidsslag.
- **Punt 5 (B2B/B2C) blijft beperkt tot v1-scope** zoals besloten: veld bij intake, juiste vragenlijst-link, label, statusveld.
- **Punt 9 (portal) staat expliciet buiten v1** (latere fase, na de ruggengraat).
- **Nieuw geverifieerd tijdens de sessie:** 4 van de 6 "Error"-DM-modules in de scenario's vuren bij succes (sequentieel, geen onerror-handler), en er zit een hardcoded Monday API-token uit 2021 in 10 HTTP-modules (staat ook in de blueprint-exports in git). Rotatie is onderdeel van de cutover (eerder roteren zou live breken).

**Waar:** `spec/spec.md` (beslislog, Definition of Done, fasering) en `tickets/` (uitvoering).

**Status:** Gedaan (2026-07-10). Uitvoering loopt via de tickets.

---

## 12. V1-herbouw neergezet (2026-07-11): drie nieuwe inactieve scenario's

**Wat er staat (niets is geactiveerd; activatie = cutover, ticket 10, met expliciete go van Hidde):**

- **Make-scenario `6525431` "New partner onboarding V1 (generiek)"** (inactief): één generieke growth-route die teamverschillen uit de Teamconfig-tab leest, aparte functioneel-bevroren Rho-route, fallback-route bij onbekende teamnaam (DM-melding, geen stille halve run), 18 onerror-handlers met partnernaam en echte oorzaak, nul GPT-modules (vervangen door deterministische formules), partner-e-mailadres 1-op-1 uit het form, B2B/B2C-splitsing (Monday-template `239400674`/`239420131`/fallback `188077189`, juiste vragenlijst-link `/b2b?c=` vs `/?c=`, type-label in teamnotificaties), zachte poort (ontbrekende intake-velden zichtbaar in melding, statusbericht en registry), playbook-stap bestaat niet meer, nieuwe kickstart-link (punt 2 hierboven daarmee uitgevoerd in V1), registry-rij per partner, Monday-statuskolommen bijgewerkt, partnermail in NL of EN met tijdpad en drie links.
- **Make-scenario `6525439` "Onboarding V1 - vragenlijst binnen"** (inactief): custom webhook `3377014`; de Worker pingt bij elke vragenlijst-inzending; zet registry op "binnen", Monday-kolom Vragenlijst op "Binnen" plus antwoorden-link, en meldt het in het interne teamkanaal. Webhook zonder registry-match geeft een DM-melding.
- **Make-scenario `6525442` "Onboarding V1 - reminders"** (inactief): dagelijks 09:00 op werkdagen; open checklist-items (access, kickstart, LastPass, extern kanaal, Monday-board) ouder dan 3 dagen geven een reminder in het interne teamkanaal.
- **Cloudflare Worker `ss-onboarding-api`** (live, gedeployed): nieuwe interne endpoints `drive-folder`/`drive-copy`/`drive-share` op de service-account (Drive-acties zonder persoonsgebonden OAuth), webhook-ping bij submit, quarantainemap `17Vu9hd7l4QAObt0ggoIV7Q-dxThTRxzI` voor kapotte `?c`-links (root blijft leeg), en publieke endpoints lekken geen ruwe Google-fouten meer.
- **V1-spreadsheet `1FQjIGn8-tMU4ZE9-hiu0RT_xWeKEAdq6EI4OXvg9Gcw`**: tab Teamconfig (6 teams: Drive-parent, Monday folder/lead/teamlabel, subscribers, Slack-invites, teamlead-DM) en tab Registry (30 kolommen, dekt de hele spec 3.5-checklist plus gereserveerde maturity-kolom). Bewuste afwijking van de spec: apart spreadsheet in plaats van tabs in de live beheersheet (guardrail blokkeerde schrijven aan de gedeelde live-sheet; samenvoegen kan desgewenst bij de cutover).
- **Monday Client overview (3337611330)**: 4 nieuwe kolommen: Vragenlijst (`color_mm55t9hn`), Onboarding pakket (`color_mm55bhm1`), Access & kickstart (`color_mm551f8`), Vragenlijst antwoorden (`link_mm55b40b`).
- **Eenmalig**: DPA-template gekopieerd naar `0. Onboarding templates (V1)` (`1DfGHjemTeJbtrPXjkjOYfA8ZkPRUPyOn`) zodat de service-account hem kan lezen; DPA-kopie per partner landt voortaan in de partnerprojectmap in plaats van de Leadership-drive (bewuste V1-afwijking).

**Bewuste keuzes van Hidde die hierin verwerkt zijn:** bestaande connecties hergebruiken (Slack `2655290`, Monday `2541989`, mail `2870801`/`3156710`, sheets `8884641`); foutmeldingen als DM naar Hidde (`D0ATPSA2GAX` via `6773974`); Monday-boardtemplate per partner_type in plaats van per team.

**Status:** Gebouwd (2026-07-11). Restpunten en handmatige acties: zie tickets/README.md en het eindrapport in de sessie.

---

## 14. Experience-laag: zichtbare status, kickstart-standaard en begeleide access-sprint

**Wat:** een tweede bouwgolf bovenop de V1-ruggengraat, omdat een eerste smalle toevoeging (alleen het brandbook/tone-of-voice-statusveld) op zichzelf te weinig meerwaarde bleek te hebben. Drie bouwstenen: (A) de bundelkolom "Access & kickstart" op het Monday-board wordt losse, granulaire subitems per handmatig checklist-item; (B) een vast kickstart-standaardformat met handover als startvoorwaarde; (C) de Tooling Access Guide herschreven en gekoppeld aan de toegang-subitems. Alle drie sturen op een kort, consistent tijdpad (kickstart binnen 3-5 werkdagen, toegang compleet binnen 3 werkdagen, "klaar om te growth-hacken" binnen 7-10 werkdagen) in plaats van de huidige dagen-tot-weken zonder vast ritme.

**Waarom:** rechtstreeks uit het benchmarkonderzoek (regie/zichtbaarheid is de meest gedeelde succesfactor bij 8 van de 9 onderzochte bedrijven) en de leads-input (Anjo: toegang mist altijd iets; Sharif: trajecten beginnen ongecontroleerd).

**Waar:** `spec/spec.md`, Deel 2 (sectie 11-18). Uitvoering via nieuwe tickets 11 t/m 14.

**Status:** In review bij Hidde (2026-07-13). Niet starten met de tickets tot akkoord op de spec.

---

## 15. Masterplan: einddoel, zes fasen, Bart-feedback verwerkt

**Wat:** overkoepelend masterplan met het einddoel (partner binnen 10 werkdagen na contract growth-ready, met minimale partnerinspanning, volledige bewaking en vertrouwen vanaf dag 0) en zes fasen vanaf de huidige V1-automation. Verwerkt drie nieuwe punten uit de feedback van Bart (2026-07-13):

1. **Vragenlijst minstens 50% korter.** Alles wat S&S zelf kan achterhalen gaat eruit (sectie 0 en 1 volledig, account profile grotendeels, Q4/Q5 research, tech & tracking via detectie) en verhuist naar een "Partner Research Pack" per partner (AI-research plus menselijke check, in de partnermap). Barts besluiten per sectie staan als bindende richtlijnentabel in het masterplan, stap 2.1.
2. **Onboarding afvuren bij tekenen contract.** HubSpot-deal-trigger naast het bestaande Slack-form (spike eerst, form blijft fallback). Fase 3 in het masterplan.
3. **Welkomstvideo van Bart.** Bart wil een video opnemen voor in de onboarding; actiepunt met briefing en reminder staat in fase 5 van het masterplan. Herinnering aan Bart is expliciet gevraagd door Bart zelf.

Daarnaast legt het masterplan zes restpunten vast uit de analyse van de actuele blueprint-export (o.a. disabled kopieerroutes voor assignment letter/handover, hardcoded Monday-boardtemplate die de B2B/B2C-variabele negeert, share-notificaties nog aan): verificatielijst voor de cutover.

**Waar:** `Onboarding workflow/Masterplan-New-Partner-Onboarding.md`. De spec (deel 1 en 2) blijft leidend voor wat er per bouwgolf gebouwd wordt; het masterplan bepaalt volgorde en prioriteit.

**Status:** Opgesteld (2026-07-14), ter review bij Hidde.

---

## 16. Ticket 11: granulaire Monday-subitems (Blok A)

**Wat:** twee bouwstukken, uitgewerkt volgens het autonome sessieprotocol (tickets/README.md).

1. **Nieuw scenario "Onboarding V1 - subitems aanmaken"** (nog niet aangemaakt in Make, zie blokkade). Luistert op nieuwe rijen in de Registry-tab, zoekt het bijbehorende Client overview-item op naam op (GraphQL, board 3337611330, groep "New partners"), en maakt daaronder zes subitems aan: partner in extern Slack-kanaal, partner op Monday-board, kickstart-meeting, LastPass-toegangsmap, brandbook + tone-of-voice, en (alleen bij een onvolledige intake) ontbrekende intake-info. Eigenaar en due date (aanmaakdatum + 3 werkdagen, met een Ma-Vr-omrekening) staan zowel leesbaar in de subitemnaam als gestructureerd in de kolommen "person"/"datum" op de automatisch aangemaakte Subitems-board. Elke stap heeft een eigen foutmelding naar Hidde's DM, zelfde patroon als de rest van V1.
2. **Ombouw reminder-scenario 6525442** (specniveau uitgewerkt, nog niet gebouwd): scant voortaan per subitem in plaats van de vijf registry-statuskolommen, met dezelfde 3-dagen-drempel als het bestaande scenario (kalenderdagen, geen echte werkdagenteller, bewust gelijk gehouden aan de huidige implementatie). Een subitem dat na de eerste reminder nog 2 dagen langer openstaat (dag 5) escaleert naar een directe DM aan Hidde in plaats van het teamkanaal. De bundelkolom "Access & kickstart" wordt na elke run bijgewerkt (To do/Partially Done/Done) op basis van de subitemstatussen. De registry-kolommen X, Y, AA, AB (partner-extern-kanaal, Monday-board, kickstart, LastPass) worden dagelijks vanuit de subitems gesynchroniseerd zodat de registry machinebron blijft voor fase 6 (meten). Kolom Z (tooling access) heeft in dit ticket geen subitem-tegenhanger en blijft dus buiten de sync, dat hoort bij ticket 14 (Tooling Access Guide).

**Ontwerpkeuzes (zelfstandig gemaakt, met onderbouwing):**

- Subitem-aanmaak als apart, event-gedreven scenario (trigger op nieuwe Registry-rij) in plaats van ingebouwd in het bestaande partner-runscenario 6525431: dat scenario is 923.555 tekens / 32.096 regels, ruim boven wat in één keer via de Make-API terug te sturen is (zelfde beperking als eerder vastgelegd voor 3059444/6226897, alleen bleek 6525431 zelf ook al te groot). Functioneel is het resultaat identiek ("na het aanmaken van het item maakt de flow de subitems aan"); technisch is het een los, klein scenario.
- Kolom-ID's "person" (people) en "datum" (date) op de automatisch aangemaakte Subitems-board zijn niet vooraf getest (zie blokkade) maar wel onderbouwd: twee vergelijkbare klantboards in het account (Sigma - BSL, E Health Ventures) gebruiken exact deze twee kolom-ID's als account-standaardsjabloon. Mocht dit sjabloon toch afwijken, faalt alleen de kolomtoewijzing (met foutmelding naar Hidde); de subitem zelf en de leesbare eigenaar/due-date-tekst in de naam blijven altijd werken.
- Rho-tak valt terug op het bestaande hardcoded lead-ID (29186877) als de Teamconfig-lookup niets oplevert, zelfde patroon als het bestaande scenario 6525431 voor Rho.

**Blokkade:** het aanmaken van het nieuwe scenario in Make is door de ingebouwde permissieklassifier geweigerd, ook al zou het scenario inactief blijven staan: de trigger en acties verwijzen naar de live Registry-sheet en het live Client overview-board, en dat leest de classifier als een wijziging aan gedeelde, externe systemen waarvoor vooraf expliciet akkoord nodig is. Het volledig uitgewerkte en tegen Make's eigen schema/RPC-validators geteste blueprint staat klaar in de sessie-scratchpad; zodra Hidde akkoord geeft kan het in enkele minuten worden aangemaakt (door mij via de MCP-tools, of door Hidde zelf via "Import Blueprint" in de Make-designer).

**Update 2026-07-14, na akkoord Hidde:** gebouwd en getest, volledig in een test-omgeving (Hidde's eis: geen echte documenten, Slack-kanalen of Monday-boards). Test-Registry-sheet (kopie, `1N1xmkqbVH9ajx6HR9wwT-z-1CwkP4UX9dFVeO-ZgN88`), test-Monday-board (`18421889561`, in de Gamma-map), en alle testberichten als DM naar Hidde. Drie werkende, inactieve scenario's in Make (team 43614): `6557113` (subitems aanmaken), `6557428` (reminders), `6557435` (bundelkolom-sync). Alle drie end-to-end getest met echte runs (niet alleen schema-gevalideerd):
- Subitems aanmaken: getest met complete én onvolledige intake; 5 resp. 6 subitems, eigenaar en due date kloppend. Tijdens het testen bleek de auto-gegenereerde Subitems-board de kolommen `person`/`date0` te gebruiken (niet `person`/`datum` zoals eerder ingeschat op basis van andere boards) — gecorrigeerd vóór oplevering.
- Bundelkolom-sync: alle drie standen (To do, Partially Done, Done) bevestigd door subitems handmatig op Done te zetten tussen testruns.
- Reminders: draait foutloos; de 3-/5-dagen-drempel zelf kon niet end-to-end getest worden (Monday's `created_at` van een subitem is niet terug te zetten via de API).

**Openstaand:** registry-sync (kolommen X/Y/AA/AB) is nog niet gebouwd (bewust uitgesteld, geen risico voor de kern van het ticket) en de Rho-tak is nog niet uitgewerkt. Overzetten van test- naar live resources (echte Registry-sheet, Client overview-board 3337611330, teamlead-DM's i.p.v. Hidde) is een volgende stap met een eigen poortje.

**Status:** Gebouwd en getest in test-omgeving (2026-07-14). Zie sessielog deel 2 in `tickets/ticket-11-monday-subitems.md` voor het volledige testverslag.

**Correctie na feedback Hidde (2026-07-14):** de subitems moeten NIET aan het Client overview-item hangen, maar aan het item dat module 3 van scenario 6525431 al aanmaakt op board "#Operations - Tech backlog" (4197869424): item-naam `"{{company}} - onboarding"`, groep `topics`. Dit board heeft al een echte, in gebruik zijnde Subitems-board (`4303252229`, 621 items) met bevestigde kolommen (rechtstreeks uit de Monday-API): `person` (Owner, people), `status`, `date0` (Created), `date_mm5823e` (Deadline). Owner-kolom krijgt voortaan de verantwoordelijke (teamlead/lead) plus altijd Hidde de Jong (80896353) erbij. Module-configuratie gevalideerd tegen deze echte kolom-ID's; nog niet opnieuw end-to-end getest (prioriteit lag op tickets 13/18/19). Volledige toelichting in `tickets/ticket-11-monday-subitems.md`.

---

## 17. Tickets 13, 18, 19 (prioriteit Hidde, 2026-07-14)

**Wat:** op verzoek van Hidde omgezet naar prioriteit boven 12/14/15/16 (die ofwel geen impact hebben nu, ofwel al gedaan zijn, ofwel een groter vervolgtraject vereisen).

**Ticket 13 — kickstart-standaard:** on-brand kickstart-format-template aangemaakt in de echte gedeelde Drive-map "New Partner Onboarding" (naast DPA en Tooling Access Guide), met een verplicht startvoorwaarden-blok (assignment letter, handover, research pack, met overrule-optie) en de vijf vaste onderdelen (succescriteria, rollen, communicatieritme, eerste-waardemijlpaal, research-pack-aannames). Teamconfig-kolom `kickstart_scheduling_link` getest op een testkopie (echte sheet-wijziging geweigerd door de permissieklassifier, wacht op go). Kopieerstap (format → partnermap + Slack-melding) gebouwd en getest als los satellietscenario in de test-omgeving (4/4 geslaagde kopieën). Mail-koppeling en accountlead-instructie nog open (hangen af van ticket 12, nu overgeslagen).

**Ticket 18 — HubSpot-spike:** volledig beslisdocument opgeleverd, `Onboarding workflow/HubSpot-Trigger-Beslisdocument.md`. HubSpot-leestoegang bleek beschikbaar via bestaande Make-connecties (in tegenstelling tot de eerste inschatting). Kernbevindingen: meerdere pipelines met eigen closed-won-stage (S&S NL - Sales Pipeline is de hoofdkandidaat); van de 11 benodigde intake-velden zijn er 4 structureel leeg in HubSpot (assignment letter, handover, team, taal) en 2 deels onbetrouwbaar (partner_type, startedBy) — opgevangen door de bestaande zachte-poort-aanpak; twee datakwaliteitsrisico's gevonden (foutieve company-koppeling, testdeal in de echte closed-won-stage); voorwaardelijk go-advies met drie openstaande beslissingen voor Bart. Nog te doen: voorleggen aan Bart/Gijs (buiten mijn bereik in deze sessie).

**Ticket 19 — HubSpot-trigger bouwen:** formeel geblokkeerd tot ticket 18 is goedgekeurd door Bart/Gijs, dus geen echte trigger aangesloten of geactiveerd. Wel vooruitlopend getest: de aanbevolen architectuur ("HubSpot schrijft via Make een rij in de Form Responses-tab, met startedBy = HubSpot") werkt — een testrij met de bevestigde velden en lege waarden voor de bevestigde HubSpot-gaten is succesvol weggeschreven naar een testkopie van de Form Responses-structuur. Dedupe-vertakking (schrijf alleen als bedrijfsnaam nog niet in de Registry staat) is als ontwerp vastgelegd maar nog niet als aparte geteste module gebouwd.

**Waar:** Drive (kickstart-template + testresources), Make (sandbox-scenario's, team 43614), `Onboarding workflow/HubSpot-Trigger-Beslisdocument.md`.

**Status:** Grotendeels gedaan (2026-07-14). Volledige sessielogs in `tickets/ticket-13-kickstart-standaard.md`, `tickets/ticket-18-hubspot-spike.md`, `tickets/ticket-19-hubspot-trigger.md`.
