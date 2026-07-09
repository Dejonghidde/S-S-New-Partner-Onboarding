---
type: werkdocument
project: New Partner Onboarding (Make-workflow verbeteren)
status: In uitvoering
fase: Define / 0-meting
accountable: Hidde
bijgewerkt: 2026-07-03
bron: 0-meting + geverifieerd tegen de echte Make-blueprint + leads-input
---

# New Partner Onboarding — Analyse & Werkblueprint

Eén werkdocument dat de huidige onboarding-workflow vastlegt (0-meting), onderbouwt met de echte Make-scenario, en de verbeterrichting + openstaande vragen bundelt. Groeit mee met de input van teamleads/B/G.

Aanpak (Naomi): eerst **consistent werkend** maken, dan **effectiever** (vooral vanuit de partner-ervaring), dan **verbeteren op input** van B/G/leads.

---

## 1. De twee scenario's

- **Live:** `3059444` "New partner onboarding" (actief, draait in productie).
- **Sandbox:** `6226897` "New partner onboarding V2" (Hidde's testversie om veilig in te werken, staat niet live).

De blokkade-fixes (autorisatie, teamleads) gebeuren in de **live** versie. De grotere verbeteringen bouwen we in **V2** en zetten we pas live als alles klopt.

---

## 2. Wat de workflow nu concreet doet (0-meting, geverifieerd)

Trigger: een **Slack-form** (shortcut) dat iemand van S&S invult bij een nieuwe partner. De antwoorden landen in een **Google Sheet "Form Responses"** (`1a98wRYG9dMu2KG866xrd1VO3iSmv0Qw0wm9ZxqavtX8`). De workflow leest die rij en verwerkt 'm.

Ingelezen velden: Company name, Partner first name, Partner email, Partner phone, **Assigned team**, Assignment letter (link), Handover (link), Started by.

De flow splitst op **Assigned team** in 6 bijna-identieke team-routes (Sigma, Phi, Gamma, Kappa, Rho, Alpha) en doet per partner:

1. **Slack:** bericht in kanaal *Allocatie* dat een nieuwe partner is gestart + DM naar de teamlead ("Onboarding for [partner] has started. Priority: ...").
2. **Monday:** tech-ticket in de operations-backlog; item in *Client overview - Leadership* met de funnel- en playbook-URL's; en een **nieuw board per partner** uit een template (via API), interne team als Owner.
3. **Drive:** partner-folder in `S&S Projects / 02. Current projects / [Team] / [Partner]`, een shared folder daarin, en de partner-e-mail toegevoegd aan die shared folder.
4. **Documenten kopiëren:** DPA, (verouderd) pre-audit questionnaire, Growth Funnel sheet, Strategy Playbook.
5. **AI (3 GPT-stappen):** genereren playbook/strategie-tekst en zetten de bedrijfsnaam om naar een Slack-kanaalnaam.
6. **Slack-kanalen:** `client-[partner]` (intern, team uitgenodigd) en `external-[partner]-sprintsandsneakers` (gedeeld, team toegevoegd). Statusbericht wordt gepind.
7. **Partner-e-mail** met links naar DPA, vragenlijst en shared drive folder.

---

## 3. Wat er nu misgaat (diagnose met bewijs)

**A. De keten valt om door persoonsgebonden connecties. `[BLOKKADE]`**
De hele workflow draait op Sharifs persoonlijke accounts (Google-connectie `2870801` = `sharif@sprintsandsneakers.com`, plus zijn Monday/Slack). Bij een wachtwoordwijziging of security-event trekt Google de token in en faalt de scenario met `AccountValidationError` (start niet eens, 0 operaties). Make zet 'm daarna automatisch uit. Bewijs: herhaalde mislukte runs (2, 16, 17 juni). Deze connectie zit óók onder ~9 andere scenario's.

**B. Verwijderde Slack-accounts van (oud-)teamleads. `[BLOKKADE]`**
Uitnodigingen naar niet meer bestaande Slack-accounts zetten de automation stil.

**C. Geen foutmelding. `[MEDIUM]`**
Als het misgaat, gaat het stil mis. Niemand krijgt een seintje; het kan weken doorlopen.

**D. 6x team-duplicatie (drift). `[MEDIUM]`**
De 6 routes zijn losse kopieën die uit elkaar zijn gelopen. Ze verschillen in de praktijk maar op 2 dingen: de lijst uit te nodigen Slack-users en de Drive-parent-folder per team. Kappa mist een paar (deels verouderde) stappen; **Rho is bewust anders** (recruitment-team, eigen minimale onboarding met recruitment-documenten, geen growth hacking).

**E. Orphaned/dode modules. `[LAAG]`**
Losgekoppelde test-/restant-branches in de scenario. Opruimen.

Fixes A en B doet Hidde in de live versie. C wordt ingebouwd. D en E horen bij de opschoning/rebuild.

---

## 4. Geverifieerde bevindingen over de documenten

Uit de echte bronbestanden die de workflow kopieert:

- **Strategy Playbook = de 2025-versie** (bestand `10j4W2ISO…`), voor **alle teams gelijk**, geen B2B/B2C-splitsing. De aparte B2B-playbook (`1f-Wn24Zfg…`, met Dorus op slide 10 + restant-speakernotes) wordt **niet** gebruikt. Update dus nodig.
- **Growth Funnel** (`1hn6uZaO…`): ook één versie voor iedereen, geen B2B/B2C-splitsing.
- **DPA** wordt wél gekopieerd (top-level, bron in Finance & Legal).
- **Assignment letter + Handover worden NIET in de partnermap opgeslagen.** Geen enkele module kopieert ze; ze komen binnen als links en gaan alleen door naar Monday/e-mail. Reden: wisselende bronnen (mail / HubSpot / presentatie), geen vast bestand.
- **De pre-audit questionnaire in Drive is verouderd.** De vragenlijst staat nu in Cloudflare (B2C `onboarding.sprintsandsneakers.dev/`, B2B `.../b2b`, per partner `?c=<projectmap-id>`). De Drive-kopie (modules 118/119/120) kan eruit; de partner-mail moet de Cloudflare-link sturen.
- **Rho** kopieert recruitment-documenten (Talent Hacking Way of Work, Sollicitanten-sheet, Wervingscampagne checklist).

---

## 5. Partner-ervaring: input van de teamleads (lopend log)

**Ronde 1 (2026-07-02):**

| Wat de partner ervaart | Wat het ons vertelt | Knop |
|---|---|---|
| Horen te vaak te lang niks | Stiltes, te weinig proactieve momenten | Welkomstmoment + bevestiging + statusritme |
| Niet duidelijk wanneer wat gebeurt | Geen helder tijdpad/verwachtingen | Roadmap in welkomstbericht |
| Niet van tevoren netjes gepland | Voelt improviserend | Planning vooraf vastleggen en communiceren |
| Access duurt onnodig lang | Toegang regelen is traag | Toegang zo vroeg mogelijk klaarzetten |

Rode draad: **de partner mist geen documenten, maar ritme en regie.**

**Ronde 2 (2026-07-09): Anjo & Sharif**

| Wat de lead ervaart/aangeeft | Wat het ons vertelt | Knop | Bron |
|---|---|---|---|
| Bij de start mis je altijd een aantal toegangen, moet wachten | Toegang-lijst wordt door klanten niet goed genoeg doorgenomen; vertraagt niet alleen het gevoel maar concreet de audit en strategie | Interactieve afvink-omgeving i.p.v. statische lijst (zie ideeën) | Anjo |
| Onboarding zelf is niet het probleem, de verwachting daarna wel | Verschuift de focus van "onboarding beter maken" naar "doorlopend verwachtingen managen ná onboarding" | Expliciet managen wanneer wat wordt opgeleverd | Sharif |
| Zelfde gesprekken meermaals voeren, telkens met een andere persoon | Gebrek aan continuïteit van contactpersoon/overdracht van context | Vaste contactpersoon of nette overdracht van context tussen gesprekken | Sharif |
| Klanten snappen toegang verlenen vaak niet | Bevestigt Anjo's punt onafhankelijk — twee leads noemen exact dezelfde frictie | Zie Tooling Access Guide-upgrade + interactieve afvink-omgeving | Sharif |
| Klanten willen zo snel mogelijk een plan en resultaat | Sluit aan bij bestaande fase-2-ideeën (vroege waarde) | Ergens in de onboarding al concrete waarde/plan laten zien | Sharif |
| Trajecten beginnen ongecontroleerd, niet volgens opdrachtbrief | Bevestigt onafhankelijk waarom "consistent werkend"/altijd het volledige pakket vóór start moet (zie Onboarding-Aanpassingen-Overzicht.md #8) | Vaste volgorde afdwingen zodat het team alle info heeft vóór start | Sharif |

**Overlap met Ronde 1:** toegang was al bekend ("Access duurt onnodig lang"); Ronde 2 maakt hard dat dit niet alleen traag is maar de audit/strategie concreet vertraagt, en dat twee onafhankelijke leads het noemen. Ook "wanneer wat gebeurt" wordt door Sharif scherper getrokken: niet alleen het welkomstbericht, maar doorlopende verwachtingsmanagement gedurende het hele traject.

**Nieuw t.o.v. Ronde 1:** continuïteit van contactpersoon (herhaalde gesprekken met wisselende personen), en de expliciete bevestiging dat trajecten soms starten zonder dat het team het volledige pakket/de juiste info heeft (opdrachtbrief-issue).

**Ideeën uit deze ronde:**
- Interactieve toegang-checklist: klant vinkt per tool "heb ik niet" af en gaat door naar de volgende (Anjo) — direct bruikbaar voor de Tooling Access Guide-upgrade.
- Onboarding-workshops met de klant (Sharif).
- Gefaseerde oplevering van de audit i.p.v. één grote oplevering aan het eind (Sharif) — sluit aan bij "zsm een plan en resultaat willen".
- Snel waarde bieden via een directory van ~3 direct inzetbare agents/tools (Sharif) — nader uit te werken wat hiermee precies bedoeld wordt.
- Eigen onboarding-frontend met checklist van te voltooien stappen + video's over het S&S-proces (Sharif) — **overlapt met Anjo's afvink-idee.** Beide wijzen onafhankelijk naar dezelfde soort oplossing: een begeleide, interactieve onboarding-omgeving in plaats van statische documenten/lijsten. Er is al precedent/infrastructuur voor (de vragenlijst draait al als eigen Cloudflare-frontend).

*(Volgende input van andere leads hier toevoegen.)*

---

## 6. Verbeterrichtingen

Opgehangen aan de drie waarden. Suggesties, nog te toetsen bij B/G/leads.

**Sneller**
- Partner + partner-contactpersonen sneller toegang geven (Slack, Monday, Drive). Access is een expliciete partner-klacht. (Automatiseren van externe gast-uitnodigingen is technisch lastig, hangt af van het Slack-plan; later uitzoeken.)

**Grondiger**
- Live compleetheids-check per partner op Monday: vinkjes per onderdeel die de workflow zelf aftikt.
- Vragenlijst-lus sluiten: Cloudflare-Worker stuurt bij inzending een seintje naar Make (met partner-id) → Slack-melding + Monday-status "ingevuld".
- Foutmelding in Slack bij een mislukte run.
- Vooraf klaarzetten wat we al weten (open: waar staat die info nu).

**Betere partner-ervaring**
- Eén helder welkomstmoment i.p.v. losse mails/uitnodigingen, met roadmap + contactpersoon.
- Communicatie op naam van de accountlead (verzenden vanaf stabiel account, ondertekend met naam + reply-to naar de persoon, zodat geen reauth-risico).
- Bevestiging aan de partner zodra de vragenlijst binnen is, met de volgende stap.

---

## 7. Definitie "consistent werkend" + minimaal volledige onboarding

**Consistent werkend (harde eis):** de automation levert voor elke getekende partner, ongeacht wie 'm invult en welk team, hetzelfde volledige en correcte pakket op, of geeft een duidelijke melding als dat niet lukt. Geen enkele run valt om door één persoonsgebonden connectie.

**Een partner is pas "klaar om te growth hacken" als dit er allemaal is:**

1. Partner-folder + shared folder + partner-toegang tot shared folder
2. DPA klaargezet en gedeeld
3. Growth funnel sheet + strategy playbook (juiste, actuele versie)
4. Monday: item in Client overview + eigen board uit template + team als Owner
5. Slack: intern + extern kanaal, team toegevoegd
6. Partner + partner-contactpersonen toegevoegd aan extern kanaal, Monday-board en shared folder
7. Juiste vragenlijst (B2B/B2C) verstuurd én binnen (lus gesloten)
8. Tooling-access geregeld
9. Welkomstmoment + tijdpad + kickstart gecommuniceerd
10. Alles zichtbaar afgevinkt op één statusoverzicht

---

## 8. Openstaande vragen om uit te vragen

**DPA**
- Toegang tot het DPA-template in Finance & Legal (mist nu).
- Mag er een juridische update in?

**Assignment letter + Handover**
- Proces: wie maakt/vult/verstuurt/bewaart, en waar komt het vandaan?
- Waarom wisselt het bestandstype (mail / HubSpot / presentatie), en waarom soms wel/niet aanwezig?
- Wat ís de handover precies, en waarom ontbreekt die vaak?
- Willen we ze voortaan in de partnermap bewaren? (Zo ja: consistente bron nodig.)

**Tooling Access**
- Welke e-mail hoort bij welke tool? (nu oude/niet-bestaande adressen)
- Meta Ads: hoe voorkomen we koppeling aan 1 persoon? (raakt de service-account-keuze)
- Tooling-access hoort als expliciet onderdeel in de onboarding; nu ontbreekt het.

**B2B/B2C-splitsing**
- Willen we playbook + funnel splitsen naar B2B/B2C? B2B-playbook bestaat al (opschonen: Dorus + speakernotes), B2C nog niet. B2B/B2C Monday-boards bestaan al. Nu krijgt iedereen dezelfde 2025-playbook + funnel.

**Partner-contactpersonen**
- E-mailadressen uitvragen in het Slack-form, zodat ze klaarstaan voor Slack/Monday/Drive.

**Overzicht voor Hidde**
- Hoe krijg ik realtime zicht om de handmatige stappen te doen? → combinatie van compleetheids-status op Monday + foutmelding in Slack + gesloten vragenlijst-lus.

---

## 9. Vastliggende beslissingen

- **Connecties:** nu op `accounts@sprintsandsneakers.com` als tussenoplossing (goedkeuring uitstaand). Echte fix in V2: password-onafhankelijk (Google **service-account** voor Drive/Sheets, **Brevo API-key** voor e-mail, **Monday API-token**, **Slack bot-token**). `accounts@` roteert wachtwoord wekelijks, dus alleen interim.
- **B2B/B2C in de workflow:** voor nu bepaalt het veld alleen de vragenlijst-link. Bredere differentiatie (playbook/funnel) is een aparte beslissing.
- **Rho:** eigen recruitment-onboarding, blijft anders. Niet "repareren".

---

## 10. Brainstorm (origineel, behouden)

- Monday Operations Tech-Backlog: betere statusaanduiding van wat wel/niet gedaan is en wat openstaat. Nu staat er alleen "onboarding - [partner]". Wil: lijst met alle onboarding-stappen + statuskolom.
- Hoe komen we aan de e-mailadressen van de partner-personen voor Slack/Monday/Drive? → uitvragen in het Slack-form.
- Tooling Access-documenten missen in de onboarding. Bewust eruit?
- Partner-personen worden nu niet automatisch toegevoegd aan extern kanaal/Monday-board. Automatiseren is lastig, waarschijnlijk (deels) handmatig.
- Hoe krijgt Hidde overzicht/notificatie/inzicht om dit uit te voeren?
- Assignment letter + Handover worden niet in de Drive-partnermap opgeslagen. Bewust?
- Bestanden upgraden qua ervaring/gemak zoals bij de vragenlijst (Tooling Access, DPA, Assignment letter, Handover).
