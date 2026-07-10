# Spec: New Partner Onboarding v1 (herontwerp)

---
status: Goedgekeurd door Hidde (2026-07-10, zonder aanpassingen). Leidend document; wijzigingen eerst hier, dan in de uitvoering.
opgesteld: 2026-07-10, planningssessie met Claude Fable 5
basis: Contextdossier + eigen verificatie van blueprints, Worker-code en beheersheet + grill-sessie (14 beslissingen)
vervangt: de doel- en scopebeschrijvingen in de analyse- en briefingdocumenten (die blijven bron, dit is de waarheid)
---

## 1. Doel

**Voor de partner:** vanaf dag 1 regie en vertrouwen. Eén professioneel bericht met een concreet tijdpad, de juiste vragenlijst, en toegang die zichtbaar bewaakt wordt in plaats van stilzwijgend te blijven liggen.

**Voor S&S:** elke getekende partner krijgt, ongeacht wie de onboarding start en welk team het wordt, hetzelfde volledige en correcte pakket, of er komt binnen 15 minuten een duidelijke melding dat en waarom dat niet lukte. Geen enkele run valt om door een persoonsgebonden connectie. De status per partner is realtime zichtbaar zonder dat iemand ernaar hoeft te vragen.

In de waarde-lens van het project: dit levert betrouwbaarheid (fundament), tijdsbesparing (team), snelheid (Bart: pakket binnen minuten na het form) én grondigheid (Gijs: compleetheid wordt meetbaar en zichtbaar). De spanning snelheid versus volledigheid wordt niet als compromis opgelost maar als twee aparte meetpunten: de flow start snel, en de checklist is pas groen als alles er echt is.

## 2. Gebruikers en gebruik

| Wie | Doet | Krijgt |
|---|---|---|
| Starter (Bart, Gijs, accountlead) | Vult het verrijkte Slack-form in | Bevestiging + melding als er iets ontbreekt |
| Team en teamlead | Niets (automatisch) | Allocatie-melding, teamlead-DM, Monday-board, Slack-kanalen, checklist met eigen actiepunten |
| Hidde / operations | Bewaakt | Statusoverzicht per partner, foutmeldingen in het alertkanaal |
| Partner | Ontvangt mail, vult vragenlijst in | Eén overzichtelijke mail met tijdpad, juiste vragenlijst, shared folder, DPA |

## 3. Wat het systeem doet (v1)

### 3.1 Intake (verrijkt Slack-form, zachte poort)
- Het bestaande Slack-form blijft de trigger (schrijft naar de sheet "Onboarding new partner", tab Form Responses). HubSpot als bron is een expliciete latere fase.
- Nieuwe velden: partner_type (B2B/B2C), taal van de partnercommunicatie (NL/EN), contactpersoon-e-mails van de partner (meerdere mogelijk), en assignment letter + handover als verplichte links.
- Zachte poort: ontbreekt een verplicht gegeven, dan start de flow wél, maar het gemis wordt zichtbaar gemarkeerd op het statusoverzicht en gemeld. De flow slaat assignment letter en handover voortaan als kopie op in de partnermap (nu gaan ze verloren).

### 3.2 Eén generieke growth-route, Rho apart, fallback verplicht
- De vijf growth-routes (Sigma, Phi, Gamma, Kappa, Alpha) worden één generieke route die zijn teamverschillen (Slack-users, Drive-parent, teamlead-DM, Monday folder-id, subscribers, board-template) uit een teamconfiguratie-tab haalt in dezelfde beheersheet. Een nieuw team wordt een configregel, geen gekopieerde route.
- Rho blijft een bewust aparte tak (recruitment, Good Life Jobs): functioneel bevroren, maar hij gaat volledig mee in de betrouwbaarheidsslag (connecties, foutmelding, registry, stabiele GLJ-afzender in plaats van gino@ persoonlijk).
- De teamrouter krijgt een fallback-route: een onbekende of anders gespelde teamnaam geeft geen stille halve run meer, maar een melding in het alertkanaal.

### 3.3 Het pakket per partner
Ongewijzigd in opzet, opgeschoond in uitvoering: Drive-projectmap + [SHARED]-map + partner-toegang, DPA-kopie gedeeld met de partner, Growth Funnel sheet, Monday (tech-ticket, item op Client overview, partner-board uit template met team als owner), intern + extern Slack-kanaal met gepind statusbericht. Nieuw: assignment letter en handover in de partnermap. Vervalt: de Strategy Playbook-kopieerstap (besloten 2026-07-09, dag 0 heeft niets partner-specifieks plus vertrouwelijkheidsrisico) en de verouderde Drive-vragenlijstkopie (de Cloudflare-vragenlijst is de waarheid).

### 3.4 Partnermail: het ene touchpoint
- Verzonden via Brevo vanaf een stabiel adres, ondertekend met de naam van de accountlead, reply-to naar die persoon. Taal (NL/EN) uit het intake-form. Rho mailt vanaf een stabiel Good Life Jobs-adres.
- Inhoud: welkom, concreet tijdpad (wat gebeurt er nu, deze week, wanneer de kickstart), links naar DPA, de juiste vragenlijst (B2B of B2C, met ?c-parameter) en de shared folder.
- De drie losse Google-share-notificaties gaan uit (sendNotificationEmail: false); de verouderde Tooling guide-PDF en het gamma.app-deck gaan eruit totdat vervangers bestaan (tooling-instructies lopen tijdelijk via de accountlead en de kickstart).
- Het e-mailadres van de partner gaat 1-op-1 uit het form naar de mailmodule: geen LLM meer in dat pad.

### 3.5 Statusoverzicht: registry-tab + Monday-view
- Nieuwe registry-tab in de bestaande sheet "Onboarding new partner": de machinebron. Per partner: folder-ids (project + shared), alle links (board, kanalen, doc), partner_type, taal, en de statusvelden van de checklist.
- Het Monday-item per partner krijgt statuskolommen die de automation bijwerkt: dat is waar het team kijkt.
- De checklist per partner omvat minimaal: pakket compleet, assignment letter aanwezig, handover aanwezig, vragenlijst verstuurd, vragenlijst binnen, partner in extern kanaal, partner op Monday-board, tooling access, kickstart gepland, LastPass-map. Eén kolom gereserveerd voor de maturity scan (nu leeg, zie open vragen).
- Slack-meldingen bij mijlpalen (vragenlijst binnen, pakket compleet, iets ontbreekt).

### 3.6 De vragenlijst-lus (spoor B sluit aan op spoor A)
- De Worker stuurt bij het indienen van de antwoorden een webhook naar een Make custom webhook (verbindingsloos, geen OAuth) met folder-id, bedrijfsnaam, B2B/B2C en de link naar het antwoorden-doc. Make zet de status op "binnen" in registry en Monday en meldt het in Slack bij het team.
- Het seintje betekent "antwoorden binnen"; bestanden kunnen nog volgen (de uploads starten na de submit). Een apart "alles binnen"-event kan later als de praktijk erom vraagt.
- De fallback bij een kapotte of ontbrekende ?c-link wordt een aparte quarantainemap mét melding, in plaats van stil de root van "2. Current projects".
- De Worker geeft geen ruwe Google-foutdetails meer terug aan de browser.

### 3.7 Foutafhandeling (nieuw ontworpen, niet gerepareerd)
- Onerror-handlers op de kritieke modules sturen een melding naar een vast Slack-alertkanaal via de bot-token, met partnernaam, gefaalde stap en de echte foutinhoud. Make's eigen e-mailnotificatie bij scenariofalen staat aan als vangnet (voor als Slack zelf de falende schakel is).
- De vier bestaande "Error"-modules die nu bij succes vuren verdwijnen; de misleidende hardcoded fouttekst verdwijnt.
- Norm: elke gefaalde of onvolledige run geeft binnen 15 minuten een melding met partnernaam en oorzaak.

### 3.8 Bewaakte handmatige stappen
Access verlenen (partner in extern kanaal, partner op Monday-board), kickstart-meeting plannen en de LastPass-map blijven mensenwerk, maar worden checklist-items met de accountlead als eigenaar. De automation stuurt een reminder in het teamkanaal als een item na de afgesproken termijn nog openstaat. Zo wordt de access-vertraging (de zwaarste concrete partnerklacht) meetbaar en bewaakt zonder fragiele API-avonturen.

### 3.9 Connecties: password-onafhankelijk, geen interim
- Google: service-account (het patroon draait al in productie voor de vragenlijst-Worker). Slack: bot-token. Monday: API-token als nette connectie. Mail: Brevo API-key. Trigger: de sheets-trigger gaat mee in de service-account-oplossing.
- Er komt géén accounts@-interim (wachtwoord roteert wekelijks: zelfde faalmechanisme, dubbel omhangwerk). Live blijft tot de cutover op sharif@, met als enige live-wijzigingen (elk met expliciete go): een echte onerror-foutmelding en het schrappen van de playbook-kopieerstap.
- Het hardcoded Monday-token uit 2021 (staat in 10 modules én via de blueprint-exports in git) wordt geroteerd en vervangen.
- Alle GPT-modules verdwijnen uit het scenario; string-bewerkingen worden deterministische functies.

## 4. Wat het systeem niet doet (v1, bewust)

- Geen onboarding-portal of interactieve access-frontend (het idee van Anjo en Sharif: latere fase, bouwt voort op de Cloudflare-infra).
- Geen document-upgrades: playbook (B2B/B2C), Tooling Access Guide, DPA-opmaak komen ná de automation (besloten volgorde). De DPA wordt automatisch gedeeld zoals nu; juridische check en opmaak zijn een open punt buiten de automation.
- Geen HubSpot-koppeling (expliciete latere fase; het form blijft de bron).
- Geen maturity scan (ongedefinieerd; kolom gereserveerd, definitiegesprek met Bart als open punt).
- Geen bredere B2B/B2C-differentiatie dan: veld bij intake, juiste vragenlijst-link, label in de teamnotificatie en het statusveld.
- Geen automatische Slack Connect-uitnodiging van de partner (onderzoek later; nu bewaakt handwerk).
- Geen opaak token, Turnstile of rate limiting op de vragenlijst (bewust geaccepteerd risico voor v1, te herzien bij de portal-fase; quarantaine en foutlek-fix komen wél in v1).
- Geen fix van de ~9 andere scenario's die op de sharif-connectie draaien (bedrijfsbreed risico, gelogd, apart vervolgproject).
- Geen first-month experience (dag-5 updates, workshops, cadeaus: later of selectief).
- Geen optimalisatie van scenario-runtime of module-aantallen als doel op zich ("sneller" betekent hier: de menselijke vervolgacties sneller en gestructureerder, conform besluit punt 8).

## 5. Aannames en keuzes (beslislog)

| # | Keuze | Alternatieven overwogen | Reden |
|---|---|---|---|
| 1 | V1 = betrouwbare ruggengraat + gesloten lus + statusoverzicht + tijdpad-mail | Alleen automation + mail (dossier); ook portal erbij | Zonder lus en status is "volledig pakket of duidelijke melding" niet meetbaar; portal is te groot bovenop een onbetrouwbare basis |
| 2 | Geen accounts@-interim, direct naar de echte fix | Interim met of zonder gepauzeerde rotatie | Wekelijkse rotatie = wekelijks faalrisico; dubbel omhangwerk voor ~50 modules; live krijgt wel direct een echte foutmelding |
| 3 | Eén generieke growth-route + teamconfig, Rho apart | 6 routes patchen; alles consolideren incl. Rho | Verschillen zijn parametrisch; elke fix 1x in plaats van 5x; nieuw team = configregel; Rho is inhoudelijk een ander proces |
| 4 | Make blijft het platform | n8n; eigen Cloudflare-orchestratie | De problemen zitten in bedrading, niet in het platform; bouwstenen (bot-token, service-account, Brevo, Monday-token) bestaan al; migratie gooit werkende integraties weg en voegt een leercurve toe zonder een probleem op te lossen dat consolidatie niet oplost |
| 5 | Google via service-account; technisch te valideren in Make | Persoonsgebonden OAuth houden; alles via de Worker | De Worker bewijst het patroon in productie. Validatiepad: native module met SA, anders HTTP+SA (zoals de Worker), anders Make laat Drive-schrijfacties via de Worker lopen. Dit is de eerste technische spike |
| 6 | Registry in de bestaande sheet, Monday als teamview | Alleen Monday; alleen sheet; Airtable; D1 | Sheet bestaat al en is de goedkoopste machinebron; team kijkt al in Monday; Airtable voegt een systeem toe zonder uniek voordeel; D1 wordt pas logisch bij de portal |
| 7 | Lus via webhook uit de Worker | Drive-watcher in Make; Monday-automation; AI-tussenlaag | Webhook is verbindingsloos (geen OAuth), instant en draagt gestructureerde data; een watcher pollt, kost operations en hangt weer aan een Google-connectie; het seintje moet saai en deterministisch zijn |
| 8 | Zachte poort bij intake | Harde poort (flow weigert); geen poort | Ontbrekende stukken zichtbaar maken lost het regie-probleem op zonder Barts snelheid te blokkeren; een harde poort kan later alsnog als de praktijk erom vraagt |
| 9 | Foutmeldingen naar een vast teamkanaal + mailvangnet | Persoonlijke DM (huidig patroon); alleen e-mail | Persoonlijke kanalen zijn de faalwijze die we elimineren; het vangnet dekt het geval dat Slack zelf de falende schakel is |
| 10 | Mail via Brevo, stabiel adres, naam accountlead, taal uit form | Generiek van S&S; vanaf de mailbox van de accountlead | Persoonlijk gevoel zonder reauth-risico; raakt de continuiteitspijn; internationale partners maken taal een veld, geen aanname |
| 11 | GPT volledig uit het kritieke pad | Behouden; alleen reviewen | Niet-deterministisch (mail kan naar een verkeerd adres), 17 calls per run voor stringwerk; de playbook-tekstgeneratie vervalt met het playbook-besluit |
| 12 | Rho: betrouwbaarheid mee, functioneel bevroren | Rho buiten v1; Rho herontwerpen | Anders geldt de harde eis niet voor een groot deel van de partners (~40% van de intake-rijen is Rho); inhoudelijk herontwerp heeft geen aanleiding |
| 13 | Vragenlijst blijft op Cloudflare zoals hij is, plus webhook, quarantaine en foutlek-fix | Herbouw; opaak token nu | De vragenlijst is live en werkt; beveiliging voorbij de basisfixes is een bewust geaccepteerd risico tot de portal-fase |
| 14 | Kwantitatieve normen: melding binnen 15 minuten, pakket binnen 15 minuten na form-submit (happy path) | Geen normen | Zonder getal is "betrouwbaar" niet toetsbaar; drempels zijn bespreekbaar maar staan tot die tijd |

**Aannames die in de eerste bouwfase gevalideerd worden:**
- Make's native Google-modules accepteren een service-account, of het HTTP+SA-pad is gelijkwaardig werkbaar (spike, eerste ticket).
- De bestaande Slack-bot-token (6773974) heeft of krijgt de scopes voor kanaal aanmaken, uitnodigen en pinnen (8 scopes nu, de user-token heeft er 16).
- Brevo kan verzenden namens het S&S-domein (SPF/DKIM) en er is een werkbaar GLJ-afzenddomein voor Rho.

## 6. Hoe de twee sporen in elkaar grijpen

De sleutel die alles verbindt is de **Drive-folder-id** van de partnermap. Spoor A (Make) maakt de map aan, schrijft de id in de registry, bouwt er de ?c-link mee en mailt die naar de partner. Spoor B (Cloudflare) valideert de id, schrijft antwoorden en uploads in die map, en meldt zich bij inzending terug met diezelfde id via de webhook. Spoor A zoekt de partner op in de registry en werkt status, Monday en Slack bij. Er is dus één identiteit per partner door de hele keten, vastgelegd op één plek (de registry-tab), en beide sporen kunnen falen zonder dat het stil blijft: Make meldt via onerror-handlers, de Worker via de quarantainemap-melding.

## 7. Definition of Done (v1, per punt waar of niet waar)

**Werkt het (aantoonbaar in de sandbox, daarna live):**
1. Een testrun voor élk team (Sigma, Phi, Gamma, Kappa, Alpha, Rho) levert het volledige pakket uit 3.3; per artefact afgevinkt op een verificatielijst.
2. Het pakket staat er binnen 15 minuten na het indienen van het form (happy path).
3. Een run met een onbekende teamnaam geeft binnen 15 minuten een melding in het alertkanaal en geen stille halve run.
4. Een geforceerde fout (bijv. ongeldige folder-id) geeft binnen 15 minuten een melding met partnernaam en echte oorzaak; een normale succesvolle run geeft géén foutmelding (de omgekeerde meldingen zijn weg).
5. Een test-inzending van de vragenlijst zet binnen 5 minuten de status op "binnen" in registry én Monday, met werkende doc-link, en meldt het in Slack.
6. Een inzending met kapotte ?c-link landt in de quarantainemap en geeft een melding; de root blijft leeg.
7. Een openstaand access- of kickstart-item geeft na de afgesproken termijn automatisch een reminder in het teamkanaal.

**Klopt het met de spec:**
8. Geen enkele module in het scenario gebruikt nog een persoonsgebonden OAuth-connectie (audit van de connectielijst: alleen service-account, bot-token, API-token, Brevo, webhook).
9. Nul OpenAI-modules in het scenario; het partner-e-mailadres in de verzonden mail is byte-gelijk aan het form-veld.
10. De playbook-kopieerstap en de oude Drive-vragenlijstkopie bestaan niet meer (partner ontvangt exact één vragenlijst).
11. Het intake-form bevat partner_type, taal en contactpersonen; assignment letter en handover staan na de run als kopie in de partnermap, of het gemis is gemarkeerd op het statusoverzicht.
12. De registry-tab bevat per testpartner alle ids, links en statussen, 100% correct bij een steekproef van 3.
13. De partnermail komt van het stabiele adres, in de gekozen taal, met tijdpad en de drie juiste links, zonder share-notificaties en zonder verouderde links.

**Is het veilig en netjes:**
14. Het oude Monday-token is geroteerd en ongeldig; er staan geen werkende secrets in het scenario of in de repo.
15. De Worker geeft geen ruwe Google-foutdetails meer terug aan de client.

**Live en geborgd:**
16. De cutover (V2 aan, oud scenario uit) is gebeurd met expliciete go, met een beschreven rollback (oude scenario weer aanzetten), en de eerste echte partner-run na cutover is gecontroleerd tegen de verificatielijst.
17. Alle wijzigingen aan het live scenario zijn per stuk met go gedaan en gelogd in Onboarding-Aanpassingen-Overzicht.md (inclusief het tot nu toe ontbrekende interim-besluit: vervallen ten gunste van de directe fix).

## 8. Meerwaarde per perspectief

**Partner:** één verzorgde mail met tijdpad in de eigen taal in plaats van vier versnipperde notificaties met deels verouderde links; de juiste vragenlijst in één keer; toegang die bewaakt wordt in plaats van te blijven liggen; en een afzender met een naam die ook de reply leest. Dag 1 voelt geregisseerd.

**S&S:** geen stille uitval meer (aangetoond faalpatroon van juni verdwijnt als klasse); onboarding is niet langer afhankelijk van de accounts van één persoon; Hidde ziet realtime per partner wat klaar is en wat blijft liggen; het team hoort het binnen minuten als een vragenlijst binnenkomt; een nieuw team toevoegen is een configregel; en elke toekomstige verbetering hoeft nog maar op één plek in plaats van in zes kopieën.

## 9. Fasering op hoofdlijnen

**Plak 0, live-stabilisatie (parallel aan de bouw, per wijziging met go):** echte onerror-foutmelding in live 3059444; playbook-kopieerstap schrappen (al besloten, vertrouwelijkheidsrisico loopt anders door bij elke nieuwe partner).

**Plak 1, spike (eerste ticket):** service-account in Make valideren op één Drive-actie, plus Slack-bot-scopes checken. Dit is de enige technische onzekerheid onder de hele spec; hij gaat eerst.

**Plakken 2 t/m 6, sandbox, elk end-to-end werkend:** (2) geconsolideerde growth-route met teamconfig-tab en fallback, op de nieuwe connecties, voor één team; (3) uitrol naar alle teams + Rho-tak omgehangen; (4) registry-tab + Monday-statuskolommen + reminders; (5) webhook-lus + quarantainemap + Worker-hygiëne; (6) Brevo-mail + form-verrijking. Volgorde: fundament eerst, daarna wat erop leunt; de mail als laatste omdat die alle voorgaande stukken (links, taal, tijdpad, lus) nodig heeft.

**Cutover:** DoD-verificatie, go, omzetten, eerste echte run gecontroleerd, rollback paraat.

**Daarna (bewust later, aparte besluiten):** document-upgrades (tooling guide, playbook B2B/B2C, DPA-opmaak, alles on-brand), HubSpot als bron, onboarding-portal met access-checklist (natuurlijke landing voor opaak token en D1), maturity scan na definitie, Slack Connect-onderzoek, de ~9 andere scenario's op de sharif-connectie.

## 10. Open vragen (besluit of actie nodig, niet blokkerend voor de bouwstart behalve waar vermeld)

| Vraag | Wie | Wanneer nodig |
|---|---|---|
| Definitie maturity scan (welke scan, wanneer, wie ziet uitkomst) | Hidde + Bart | Vóór de fase na v1; kolom staat klaar |
| Bevestiging v1-scope door Bart en Gijs (stond in de briefing nog open) | Hidde | Vóór de bouwstart |
| Brevo: domein-authenticatie (SPF/DKIM) en het GLJ-afzenddomein voor Rho | Hidde | Plak 6 |
| Slack-plan en bot-scopes (kanaal aanmaken, uitnodigen, pinnen; later Slack Connect) | Hidde | Plak 1 (spike) |
| DPA: toegang tot het brontemplate (Finance & Legal) en juridische actualiteit | Hidde + Finance & Legal | Latere documentfase; delen loopt intussen door zoals nu |
| Leads-uitvraag overige teams (ronde 2 dekt alleen Anjo en Sharif): deadline of fallback | Hidde | Vóór de experience-fase |
| Teamconfig-inhoud actualiseren (teamleads, subscribers, Alpha's afwijkende board-template: bewust of erfenis?) | Hidde + teamleads | Plak 2 |
| ?c bevat nu de interne project-folder-id (uploads intern is by design, maar de id staat in een externe URL): accepteren tot de portal-fase of eerder oplossen | Hidde | Vastleggen bij plak 5 |
| Wie kan er naast Hidde deployen op tools@ (wrangler); komt er CI/CD | Hidde | Vóór oplevering (continuïteit) |
| Kwantitatieve drempels bevestigen: 15 min meldnorm, 15 min pakketnorm, reminder-termijn access (voorstel: 3 werkdagen) | Hidde | Bij spec-akkoord |
| Git-historie bevat het oude Monday-token via de blueprint-exports: na rotatie onschadelijk, maar besluit of de exports uit de historie moeten | Hidde | Na rotatie |
