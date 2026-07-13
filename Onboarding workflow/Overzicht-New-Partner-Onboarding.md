---
type: overzicht
project: New Partner Onboarding
status: In uitvoering
fase: Bouwen / verbeteren
accountable: Hidde
bijgewerkt: 2026-07-13
tags: [onboarding, workflow, make, vragenlijst, overzicht, operations]
---

# New Partner Onboarding — Compleet overzicht

Eén master-document dat alle sporen van het onboarding-project samenbrengt: het doel, waar we staan, wat er gebouwd en gefixt is, de bevindingen, de openstaande vragen, de ideeën en het plan. Dit is het startpunt; de diepte staat in de detaildocs:

- **[Briefing-Onboarding-Workflow-Verbeteren.md](Briefing-Onboarding-Workflow-Verbeteren.md)** — de opdracht, scope en waarde-lens.
- **[Onboarding-Workflow-Analyse-en-Blueprint.md](Onboarding-Workflow-Analyse-en-Blueprint.md)** — de 0-meting van de oude workflow.
- **[Onboarding-Aanpassingen-Overzicht.md](Onboarding-Aanpassingen-Overzicht.md)** — het volledige, regel-voor-regel besluiten- en wijzigingenlog.
- **[../Input:inspiratie/Benchmarkonderzoek-onboarding-andere-bedrijven.md](../Input:inspiratie/Benchmarkonderzoek-onboarding-andere-bedrijven.md)** — benchmarkonderzoek 9 bedrijven, 59 onderdelen, geprioriteerd.
- **[../Input:inspiratie/Onboarding input leads.md](../Input:inspiratie/Onboarding input leads.md)** — de leads-uitvraag (Anjo, Sharif).

---

## 1. Het doel

De hele reis van een nieuwe partner soepel, duidelijk en compleet maken: van getekend contract tot "partner klaar om te starten met growth hacking". Niet vanaf nul bouwen, maar de bestaande (deels geautomatiseerde) keten eerst consistent laten werken, dan effectiever, dan verbeteren op basis van praktijkinput en benchmarkonderzoek.

De rode draad uit de partner-input: **de partner mist geen documenten, maar ritme en regie.** Dat blijft de kern, en het recente benchmarkonderzoek bevestigt dit onafhankelijk (zie sectie 10).

---

## 2. Scope

- **Wel:** de volledige journey van getekend contract tot start growth hacking. De vernieuwde vragenlijst is één stap in dat geheel.
- **Ruggengraat:** een herbouwde Make-automation (V1), generiek per team in plaats van 6x gedupliceerd.
- **Niet nu:** een compleet nieuw systeem bouwen. We verbeteren wat er staat, en breiden gericht uit met wat het benchmarkonderzoek en de leads aandragen.

---

## 3. De twee sporen en hun status

### Spoor A — De vragenlijst (grotendeels klaar en live)
- **B2C** en **B2B** staan live op Cloudflare Pages: B2C op `onboarding.sprintsandsneakers.dev/`, B2B op `.../b2b`, per partner via `?c=<projectmap-id>`.
- Opslag-pipeline werkt end-to-end via een Cloudflare Worker met een Google **service-account** naar de juiste partnermap in Drive. Antwoorden worden een leesbaar Google Doc in diezelfde map.
- De Worker is uitgebreid met interne Drive-endpoints (folder aanmaken, bestand kopiëren, delen) die Make nu gebruikt, en met een webhook-ping bij het inzenden van de vragenlijst (sluit de "vragenlijst binnen"-lus, zie spoor B).
- **Nog open:** brandbook + tone-of-voice als verplicht onderdeel toevoegen (zie sectie 10/12, nieuwe eis vanuit de leads-uitvraag).

### Spoor B — De Make-workflow: van 0-meting naar V1-herbouw

**Uitgangssituatie (tot 2026-07-10):** één live scenario `3059444`, met 6 bijna-identieke, uit elkaar gelopen team-routes, persoonsgebonden connecties en geen foutmelding. Zie sectie 7 voor de volledige 0-meting; **dit scenario wordt nooit aangeraakt zonder expliciete go per wijziging.**

**V1-herbouw (2026-07-11 t/m nu):** drie nieuwe, generieke sandbox-scenario's, inactief, klaar voor cutover na e2e-test:

| Scenario | ID | Functie | Status |
|---|---|---|---|
| New partner onboarding V1 (generiek) | `6525431` | Hoofdflow: trigger t/m partner-mail | Gebouwd, laatste stap (welkomstmail) wacht op handmatige module-toevoeging in Make (zie sectie 9) |
| Onboarding V1 - vragenlijst binnen (webhook) | `6525439` | Vangt de Worker-webhook op zodra de vragenlijst binnen is | Gebouwd en gefixt |
| Onboarding V1 - reminders | `6525442` | Herinneringen | Gebouwd, geen wijzigingen nodig gebleken |

Zie sectie 8 voor wat er precies in `6525431` zit, en sectie 9 voor de belangrijkste fixes.

---

## 4. De waarde-lens

Elk onderdeel beoordelen we op waarde, niet op taken.

| Waarde | Voor wie | Wat het betekent |
|--------|----------|------------------|
| Klantervaring | Partner | Belangrijkste. Gemak, duidelijkheid, professioneel gevoel vanaf dag 1. |
| Tijdsbesparing | S&S team | Minder handmatig geklungel, minder losse to-do's na de automation. |
| Snelheid | Bart | Hoe snel kunnen we na tekenen diensten leveren. |
| Grondigheid | Gijs | Direct na onboarding staat alles perfect klaar om meteen te growth hacken. |

Spanning om te managen: Bart wil snelheid, Gijs wil volledigheid. De workflow moet beide leveren: snel live, maar compleet.

---

## 5. Aanpak-volgorde

1. **Consistent werkend maken.** ✅ Grotendeels gedaan in de V1-herbouw: generieke route i.p.v. 6x duplicatie, gedeelde connecties i.p.v. persoonsgebonden, foutmeldingen per stap (onerror-alerts naar Slack).
2. **Effectiever maken.** In uitvoering: welkomstmail herontworpen (sectie 9), dynamisch teamcontact, tooling-access als echte per-partner kopie.
3. **Verbeteren op input.** Net binnengehaald: benchmarkonderzoek + leads-uitvraag afgerond, wacht op prioritering (sectie 10/12).

**Definitie "consistent werkend" (harde eis):** de automation levert voor elke getekende partner, ongeacht wie 'm invult en welk team, hetzelfde volledige en correcte pakket op, óf geeft een duidelijke melding als dat niet lukt. Geen enkele run valt om door één persoonsgebonden connectie. **Dit is met de V1-herbouw functioneel opgelost**, definitieve bevestiging volgt uit de e2e-test (sectie 12).

---

## 6. 0-meting: wat de oude workflow deed (vóór V1, referentie)

Trigger: een Slack-form dat iemand van S&S invult bij een nieuwe partner. De antwoorden landen in een Google Sheet "Form Responses"; de oude workflow las de rij en splitste op **Assigned team** in 6 bijna-identieke team-routes (Sigma, Phi, Gamma, Kappa, Rho, Alpha). Per partner regelde de flow:

1. **Slack:** melding in kanaal *Allocatie* + DM naar de teamlead.
2. **Monday:** tech-ticket, item in Client overview, en een nieuw board per partner uit template.
3. **Drive:** partner-folder + shared folder, partner-e-mail toegevoegd aan de shared folder.
4. **Documenten kopiëren:** DPA, (verouderde) pre-audit questionnaire, Growth Funnel sheet, Strategy Playbook.
5. **AI (3 GPT-stappen):** playbook/strategie-tekst genereren + bedrijfsnaam naar Slack-kanaalnaam.
6. **Slack-kanalen:** intern `client-[partner]` en extern `external-[partner]-sprintsandsneakers`, statusbericht gepind.
7. **Partner-e-mail** met links naar DPA, vragenlijst en shared drive folder.

Handmatig ná de automation (nog steeds los, ook na V1): kickstart-meeting, LastPass-map, kennismakingsmeeting.

---

## 7. 0-meting: wat er misging, en wat de status nu is

| # | Probleem (0-meting) | Status na V1-herbouw |
|---|----------|-------|
| A | Keten viel om door **persoonsgebonden connecties** (Sharifs persoonlijke Google/Monday/Slack). Wachtwoordrotatie trok de OAuth-token in. | **Opgelost.** Drive loopt via service-account + Worker; Monday-connectie is de gedeelde `8950423`, niet meer persoonsgebonden. |
| B | **Verwijderde Slack-accounts** van (oud-)teamleads zetten de automation stil. | **Grotendeels opgelost** door dynamische Teamconfig-lookup; 3 losse verouderde Slack-ID's in het sheet staan nog open (zie sectie 11). |
| C | **Geen foutmelding.** Ging het mis, dan ging het stil mis. | **Opgelost.** Elke kritieke stap heeft een `onerror`-Slack-alert. |
| D | **6x team-duplicatie (drift).** Losse kopieën die uit elkaar liepen. | **Opgelost.** Eén generieke route, teamdata komt uit het Teamconfig-sheet. Rho blijft bewust een eigen tak (recruitment). |
| E | **Orphaned/dode modules.** | **N.v.t.** Nieuwe bouw heeft geen restanten. |

---

## 8. V1 gebouwd: wat er nu in scenario 6525431 zit

1. **Trigger:** Google Sheets watchRows op "Form Responses".
2. **Form-velden + afgeleiden** (module 2): company, firstName, email, team, partnerType (B2B/B2C/regulier), taal (NL/EN), qPath (juiste vragenlijst-URL), templateId, companyQ (sanitized voor gebruik in namen/queries).
3. **Tech-ticket** (Monday) + Slack-melding.
4. **Teamconfig-lookup + aggregator** (modules 5/6): haalt per team de Drive-folder, Monday-workspace, Slack-kanalen en `monday_lead_user_id` op uit het Teamconfig-sheet.
5. **Router:** groei-teams (Sigma/Alpha/Phi/Kappa/Gamma) vs. Rho (eigen tak, ongewijzigd) vs. fallback.
6. **Drive:** projectmap + `[SHARED]`-submap aanmaken, DPA en Growth Funnel sheet kopiëren en delen, `[SHARED]`-map gedeeld met de partner.
7. **Monday:** item in "Client overview" met dynamische Team- en Lead-kolommen, nieuw partnerboard uit template, teamleden als board-owners toegevoegd (`add_users_to_board`), statuskolommen bijgewerkt.
8. **Slack:** intern + extern kanaal aangemaakt, teamleden uitgenodigd, statusbericht gepind.
9. **Registry-sheet:** rij weggeschreven met alle links en status (RAW-formaat, geen datumcorruptie).
10. **Partnermail:** sub-router NL/EN, momenteel de laatste stap die nog een handmatige aanvulling in Make nodig heeft (zie sectie 9).
11. **Rho-tak** (modules 40-56): eigen, losse flow voor recruitment-onboarding, bewust niet aangeraakt bij de mail-herbouw.

`6525439` vangt de Worker-webhook op zodra de vragenlijst binnen is en werkt de Monday-status + Registry bij. `6525442` verstuurt reminders en gebruikt geen van de gefixte connecties.

---

## 9. Welkomstmail: herontwerp en status

De partnermail is dit spoor drie keer herzien op basis van concrete feedback, en staat nu op een professionele v3:

- Eyebrow "Onboarding gestart" weg, geen pijltjes/gedachtestreepjes, een concrete voortgangstrack (Contract getekend → Onboarding → Growth audit → Strategiesessie) i.p.v. een vage tijdlijn.
- Vier acties met korte, zakelijke toelichting: DPA tekenen, vragenlijst invullen, gedeelde Drive-map, **toegang geven tot de eigen platforms van de partner** (niet: "welke tools wij gebruiken").
- Dynamisch, per-team contact in de afsluiting (module 961 "Lead-contact per team": Sigma→Jorg, Alpha→Sharif, Phi→Anjo, Kappa→Walter, Gamma→Hidde als fallback), inclusief werkende `replyTo`.
- De "toegang tot platforms"-gids wordt nu **per partner gekopieerd** (module 962 "Copy Tooling access") naar de gedeelde map, net als de DPA, i.p.v. één statische link.
- Social-links (Facebook, Instagram, YouTube, TikTok) in de footer.

**Status:** tekst en logica zijn klaar en geverifieerd; de daadwerkelijke wijziging in `6525431` (modules 961, 962, en de html/replyTo van modules 33/34) is **nog niet gepusht** — de blueprint is te groot geworden om in één keer veilig via de API te pushen, dus dit gaat handmatig in de Make-UI (instructies zijn al gegeven). Bestanden klaar om te plakken: `Welkomstmail-NL.md`, `Welkomstmail-EN.md`, en `Welkomstmail.html` (beide talen met tab-switch, ter controle) in deze map. Een goedkeuringsdemo (Template B.V. / Gerard Broekhuizen) en een PDF-export staan er ook, voor akkoord vragen aan derden.

---

## 10. Benchmarkonderzoek + leads-uitvraag: bevindingen (2026-07-10)

De leads-uitvraag (sectie 12, oude planning) is binnen: Anjo en Sharif hebben gereageerd, zie `Onboarding input leads.md`. Daarnaast is een apart benchmarkonderzoek afgerond naar 9 vergelijkbare bedrijven (Hello Social, Superside, Springbok Agency, WebFX, KlientBoost, HubSpot, Superhuman, Asana, Seven Figure Agency), 59 ontdubbelde onboardingonderdelen, zie `Benchmarkonderzoek-onboarding-andere-bedrijven.md`.

**Belangrijkste, 100%-vereiste bevinding uit de leads:** de partner moet **brandbook + tone-of-voice** aanleveren; dit ontbreekt nu volledig in de vragenlijst/automation en is nodig voor al het contentgerelateerde werk (content, ads, outbound). Dit staat nog niet gebouwd.

**Bevestigd door beide bronnen onafhankelijk:** de partner mist geen documenten maar ritme en regie. Concreet ontbreekt nu:
- één partnerzichtbare roadmap (taken, eigenaren, deadlines, status);
- een vaste sales→delivery-overdracht als startvoorwaarde;
- een benoemde accountlead + escalatieroute vóór het welkomstmoment (deels al gedekt door module 961);
- een begeleide access-sprint (toegang is dé bevestigde vertraging, ook door Anjo/Sharif expliciet genoemd);
- een gestructureerde kickstart met succescriteria, rollen en ritme;
- een vast "volgende stap"-protocol;
- een expliciete afronding/overgang naar de vaste sprintcadans.

Deze zes punten zijn de P0-prioriteiten uit het benchmarkonderzoek (sectie 6 daarvan). Er is nog **geen besluit** genomen over welke hiervan in welke volgorde gebouwd worden — zie sectie 12.

---

## 11. Openstaande vragen & beslissingen

**Genomen besluiten**
- **Connecties:** service-account (Drive) + gedeelde Monday-connectie `8950423`. Slack blijft bewust persoonsgebonden (Sharif), zie ticket 02.
- **Playbook:** de auto-copy-stap is geschrapt; een handmatige, latere levering blijft staan.
- **Tooling Access:** de oude, verouderde en onbrand `.docx` wordt vervangen door een per-partner PDF-kopie (module 962); geen credential-sharing meer in de mail zelf.
- **B2B/B2C:** het teamveld bepaalt de vragenlijst-link; bredere differentiatie is een aparte beslissing.
- **Rho:** eigen recruitment-onboarding, blijft bewust anders, niet meegenomen in de mail-herbouw.
- **Stabiel e-mailadres (ticket 08):** on hold, wacht op management-goedkeuring; V1 verstuurt voorlopig via Sharif's Gmail.

**Nog open**
- **Team Gamma mist een geldige Lead** (kapotte Monday-ID in Teamconfig); valt nu terug op Hidde. Nog 3 losse verouderde Slack-ID's in het Teamconfig-sheet staan ook nog open.
- **Brandbook + tone-of-voice:** waar in de vragenlijst, verplicht upload/link-veld, en meenemen als hard-gate richting "growth-ready"? (spoor A, zie sectie 12)
- **Prioritering van de zes P0-punten** uit het benchmarkonderzoek (sectie 10): welke worden een ticket, in welke volgorde?
- **Tooling access-link:** nu een Google Doc; jij gaf ook een folder- en PDF-link door, definitieve keuze staat nog open.

---

## 12. Plan / volgende stappen

**Direct, klein:**
1. Handmatig in Make: module 961 + 962 toevoegen, modules 33/34 bijwerken (instructies al gegeven, wacht op uitvoering).
2. E2e-test door Hidde zelf; ik lees de executies na via de Make-API.
3. Spec-compliance-review (nog niet gedaan, eerder overgeslagen).
4. Cutover (ticket 10): V1-scenario's activeren, live scenario `3059444` uitzetten, met expliciete go.

**Middellange termijn, prioritering nodig:**
5. **Spoor A — brandbook + tone-of-voice** toevoegen aan de vragenlijst + Drive + hard-gate. Klein, concreet, snel te bouwen.
6. **Spoor B — regielaag** uit het benchmarkonderzoek: roadmap, sales→delivery-overdracht, gestructureerde kickstart, vast volgende-stap-protocol, expliciete afronding. Groter, raakt spec.md, wordt uitgewerkt in nieuwe tickets zodra de prioritering (sectie 11) vaststaat.

---

*Bronnen: memory-project (vragenlijst-status, Make-integratie, workflow-connections-fix, V1-rebuild-state, blueprint-size-limit), Onboarding-Aanpassingen-Overzicht.md, Benchmarkonderzoek-onboarding-andere-bedrijven.md, Onboarding input leads.md, Gijs-gesprek 2026-07-09.*
