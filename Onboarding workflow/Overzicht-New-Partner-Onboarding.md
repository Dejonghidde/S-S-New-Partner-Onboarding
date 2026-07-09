---
type: overzicht
project: New Partner Onboarding
status: In uitvoering
fase: Define / verbeteren
accountable: Hidde
bijgewerkt: 2026-07-09
tags: [onboarding, workflow, make, vragenlijst, overzicht, operations]
---

# New Partner Onboarding — Compleet overzicht

Eén master-document dat alle sporen van het onboarding-project samenbrengt: het doel, waar we staan, de bevindingen, de openstaande vragen, de ideeën, de aanbevelingen en het plan. Dit is het startpunt; de diepte staat in de twee detaildocs:

- **[Briefing-Onboarding-Workflow-Verbeteren.md](Briefing-Onboarding-Workflow-Verbeteren.md)** — de opdracht, scope en waarde-lens.
- **[Onboarding-Workflow-Analyse-en-Blueprint.md](Onboarding-Workflow-Analyse-en-Blueprint.md)** — de 0-meting, geverifieerd tegen de echte Make-scenario, met diagnose en verbeterrichtingen.

---

## 1. Het doel

De hele reis van een nieuwe partner soepel, duidelijk en compleet maken: van getekend contract tot "partner klaar om te starten met growth hacking". Niet vanaf nul bouwen, maar de bestaande (deels geautomatiseerde) keten eerst consistent laten werken, dan effectiever, dan verbeteren op basis van praktijkinput.

De rode draad uit de partner-input: **de partner mist geen documenten, maar ritme en regie.** Het project moet vooral dat oplossen.

---

## 2. Scope

- **Wel:** de volledige journey van getekend contract tot start growth hacking. De vernieuwde vragenlijst is één stap in dat geheel.
- **Ruggengraat:** de bestaande Make-automation die Bart en Gijs voedt met partner-info.
- **Niet nu:** een compleet nieuw systeem bouwen. We verbeteren wat er staat.
- **Focus (Gijs-gesprek):** niveau-1 volledig, plus een gericht stuk van niveau-2. Niet de hele eerste maand willen fixen, maar de verbetering met de meeste impact op de partnerervaring.

---

## 3. De twee sporen en hun status

### Spoor A — De vragenlijst (grotendeels klaar en live)
- **B2C** en **B2B** staan live op Cloudflare Pages: B2C op `onboarding.sprintsandsneakers.dev/`, B2B op `.../b2b`, per partner via `?c=<projectmap-id>`.
- Opslag-pipeline werkt end-to-end: uploads en antwoorden gaan via een Cloudflare Worker met een Google **service-account** naar de juiste partnermap in Drive. Antwoorden worden een leesbaar Google Doc in diezelfde map.
- De-slop copy-pass en de feedbackrondes van Gijs en Mira zijn verwerkt.
- **Open op dit spoor:** hoe Make per partner de juiste B2C- vs B2B-link kiest.

### Spoor B — De Make-workflow (kern van het huidige werk)
- **Live scenario:** `3059444` "New partner onboarding" (draait in productie).
- **Sandbox:** `6226897` "New partner onboarding V2" (veilig testen, staat niet live).
- Blokkade-fixes gebeuren in de live versie; grotere verbeteringen bouwen we in V2 en zetten we pas live als alles klopt.

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

1. **Consistent werkend maken.** Eerst hard definiëren wat "consistent werkend" is, dan de dingen fixen die de keten laten omvallen.
2. **Effectiever maken.** Vooral vanuit de partnerervaring: welke onderdelen, wat is het einddoel per onderdeel.
3. **Verbeteren op input** van Bart, Gijs en de teamleads.

**Definitie "consistent werkend" (harde eis):** de automation levert voor elke getekende partner, ongeacht wie 'm invult en welk team, hetzelfde volledige en correcte pakket op, óf geeft een duidelijke melding als dat niet lukt. Geen enkele run valt om door één persoonsgebonden connectie.

---

## 6. Bevindingen: wat de workflow nu doet

Trigger: een Slack-form dat iemand van S&S invult bij een nieuwe partner. De antwoorden landen in een Google Sheet "Form Responses"; de workflow leest de rij en splitst op **Assigned team** in 6 bijna-identieke team-routes (Sigma, Phi, Gamma, Kappa, Rho, Alpha). Per partner regelt de flow:

1. **Slack:** melding in kanaal *Allocatie* + DM naar de teamlead.
2. **Monday:** tech-ticket, item in Client overview, en een nieuw board per partner uit template.
3. **Drive:** partner-folder + shared folder, partner-e-mail toegevoegd aan de shared folder.
4. **Documenten kopiëren:** DPA, (verouderde) pre-audit questionnaire, Growth Funnel sheet, Strategy Playbook.
5. **AI (3 GPT-stappen):** playbook/strategie-tekst genereren + bedrijfsnaam naar Slack-kanaalnaam.
6. **Slack-kanalen:** intern `client-[partner]` en extern `external-[partner]-sprintsandsneakers`, statusbericht gepind.
7. **Partner-e-mail** met links naar DPA, vragenlijst en shared drive folder.

Handmatig ná de automation (nu nog los): kickstart-meeting, LastPass-map, partner uitnodigen in Slack/Monday, toegang tot kanalen, kennismakingsmeeting.

---

## 7. Bevindingen: wat er nu misgaat

| # | Probleem | Ernst |
|---|----------|-------|
| A | Keten valt om door **persoonsgebonden connecties** (draait op Sharifs persoonlijke Google/Monday/Slack). Wachtwoordrotatie trekt de OAuth-token in, scenario faalt met `AccountValidationError` en Make zet 'm uit. | Blokkade |
| B | **Verwijderde Slack-accounts** van (oud-)teamleads zetten de automation stil. | Blokkade |
| C | **Geen foutmelding.** Gaat het mis, dan gaat het stil mis; kan weken doorlopen. | Medium |
| D | **6x team-duplicatie (drift).** De routes zijn losse kopieën die uit elkaar zijn gelopen. Rho is bewust anders (recruitment). | Medium |
| E | **Orphaned/dode modules** (losse test-/restant-branches). | Laag |

**Geverifieerd over de documenten:**
- **Strategy Playbook** = de 2025-versie, voor alle teams gelijk, geen B2B/B2C-splitsing. Update nodig.
- **Growth Funnel** = ook één versie voor iedereen.
- **DPA** wordt wél gekopieerd (bron in Finance & Legal).
- **Assignment letter + Handover** worden NIET in de partnermap opgeslagen (wisselende bronnen, geen vast bestand).
- De **pre-audit questionnaire in Drive is verouderd**; de echte vragenlijst staat op Cloudflare.

---

## 8. Nieuwe richting uit het Gijs-gesprek (2026-07-09)

Kern: niet de hele eerste maand willen oplossen, maar **de verbetering met de meeste impact op de partnerervaring** eerst. Bart en Gijs denken mee over wat de ervaring écht verbetert. Alle onduidelijkheden (waar komt wat vandaan, waar wordt wat opgezet) zelf oplossen door er een strakke, duidelijke methode voor te maken.

Concrete brokken uit dit gesprek:

- **Playbook — eerst het nut bepalen.** Is versturen überhaupt nodig? Wat is het, wat is de meerwaarde, en als we het versturen: pas nadat het écht is ingevuld, niet als lege template.
- **Begin van de onboarding komt vooral uit HubSpot.** Meenemen als bron bij het opnieuw inrichten van de start van de keten.
- **Access-tooling — opnieuw checken op actuele data + rebranding.** Meer een 2026-vibe. (Sluit aan op de bekende klacht dat access te lang duurt.)
- **DPA — misschien een iets nettere opmaak,** maar geen gekke dingen.

Deze brokken zijn kandidaten voor niveau-2; welke prioriteit krijgt, hangt af van de leads-uitvraag (zie hieronder).

---

## 9. De leads-uitvraag (concrete to-do)

**Doel:** ophalen wat partners nodig hebben en wat S&S-mensen zelf nodig hebben tijdens de onboarding, om de verbeteringen te laten aansluiten op de praktijk. Antwoorden naast elkaar leggen, kijken waar de overlap zit, en daaruit concluderen wat we wel/niet oppakken.

**Methode:** privé Slack-DM naar elke lead. Zelfde bericht voor iedereen (niet per persoon afgestemd). Kort en concreet, ik lever de tekst, Hidde stuurt zelf.

**Definitief bericht:**

> Hey [naam],
>
> Ik ben de onboarding van nieuwe partners aan het verbeteren en heb daar nog wat input voor nodig, zodat het beter aansluit op de praktijkervaringen.
>
> Zou je me kunnen helpen door aan te geven wat jouw kijk is op de knelpunten van de huidige onboarding, en wat je vanuit de partners hun perspectief weet?
>
> Geef bijvoorbeeld je top 3 à 5 grootste punten per vraag:
>
> 1. Waar hebben partners tijdens de onboarding het meest behoefte aan en/of de grootste problemen mee gehad?
> 2. Wat heb je nodig om na de onboarding van een nieuwe partner daadwerkelijk je werk te kunnen doen? Dat mag iets zijn wat er nu al is, maar ook iets wat nog niet standaard geregeld is maar wel nodig.

**Verwerking:** antwoorden bundelen per thema, overlap markeren, conclusie trekken over wat wel/niet in scope komt. Verwerken in dit overzicht en in de analyse/blueprint (sectie partner-ervaring, lopend log).

**Status:** Ronde 2 binnen (2026-07-09): Anjo en Sharif. Verwerkt in `Onboarding-Workflow-Analyse-en-Blueprint.md` sectie 5. Nog wachten op de overige leads (Phi, Kappa, Rho, Alpha, Gamma waar nog niet gedekt).

---

## 10. Ideeën & aanbevelingen (verbeterrichtingen)

Opgehangen aan de drie waarden. Suggesties, nog te toetsen bij Bart, Gijs en de leads.

**Sneller**
- Partner en partner-contactpersonen zo vroeg mogelijk toegang geven (Slack, Monday, Drive). Access is een expliciete partner-klacht.
- Snel waarde bieden via een directory van ~3 direct inzetbare agents/tools tijdens de onboarding (Sharif) — nader uit te werken.

**Grondiger**
- Live compleetheids-check per partner op Monday: vinkjes per onderdeel die de workflow zelf aftikt.
- Vragenlijst-lus sluiten: Worker seint bij inzending naar Make (met partner-id) → Slack-melding + Monday-status "ingevuld".
- Foutmelding in Slack bij een mislukte run.
- Vooraf klaarzetten wat we al weten (deels uit HubSpot).
- Interactieve toegang-checklist i.p.v. statische lijst: klant vinkt per tool "heb ik niet" af en gaat door (Anjo) — twee leads noemen onafhankelijk dat klanten toegang verlenen niet snappen.

**Betere partner-ervaring**
- Eén helder welkomstmoment i.p.v. losse mails/uitnodigingen, met roadmap + contactpersoon.
- Communicatie op naam van de accountlead, verzonden vanaf een stabiel account (geen reauth-risico).
- Bevestiging aan de partner zodra de vragenlijst binnen is, met de volgende stap.
- Vaste contactpersoon of nette overdracht van context, i.p.v. dezelfde gesprekken meermaals voeren met wisselende personen (Sharif).
- Gefaseerde oplevering van de growth audit i.p.v. één grote oplevering aan het eind, zodat de partner sneller een plan/resultaat ziet (Sharif).
- Onboarding-workshops met de klant (Sharif).

**Bestanden upgraden (ervaring/gemak)**
- Access-tooling, DPA, Assignment letter en Handover naar hetzelfde niveau tillen als de vernieuwde vragenlijst.
- Overweeg een eigen onboarding-portal/frontend met checklist van te voltooien stappen + korte video's over het S&S-proces (Sharif) — overlapt met Anjo's toegang-afvink-idee; bouwt voort op de bestaande Cloudflare-vragenlijst-aanpak.

---

## 11. Openstaande vragen & beslissingen

**Consistent werkend**
- Definitie op papier verifiëren bij Gijs; wat gaat er precies mis in de team-routes.

**DPA**
- Toegang tot het DPA-template in Finance & Legal (mist nu). Mag er een juridische update in? Alleen opmaak of ook inhoud?

**Assignment letter + Handover**
- Wie maakt/vult/verstuurt/bewaart, en waar komt het vandaan? Waarom wisselt het bestandstype? Willen we ze voortaan in de partnermap bewaren?

**Tooling Access**
- Welke e-mail hoort bij welke tool? (nu oude/niet-bestaande adressen)
- Meta Ads: hoe voorkomen we koppeling aan één persoon?

**Playbook**
- Is versturen nodig, en zo ja pas na invullen? Splitsen naar B2B/B2C? (B2B-playbook bestaat al, moet opgeschoond; B2C nog niet.)

**HubSpot**
- Wat kunnen we precies uit HubSpot trekken om de start van de keten te voeden, en hoe koppelen we dat?

**Partner-contactpersonen**
- E-mailadressen uitvragen in het Slack-form, zodat ze klaarstaan voor Slack/Monday/Drive.

**Vastliggende beslissingen**
- **Connecties:** interim op `accounts@sprintsandsneakers.com`; echte fix in V2 is password-onafhankelijk (Google service-account, Brevo API-key, Monday API-token, Slack bot-token).
- **B2B/B2C:** het teamveld bepaalt voorlopig alleen de vragenlijst-link; bredere differentiatie is een aparte beslissing.
- **Rho:** eigen recruitment-onboarding, blijft bewust anders.

---

## 12. Plan / volgende stappen

1. **Leads-uitvraag versturen** (bericht staat klaar in sectie 9) en antwoorden verzamelen.
2. **Overlap-analyse:** partner-behoeften en S&S-behoeften naast elkaar, conclusie wat wel/niet in scope.
3. **Prioriteit bepalen** binnen de Gijs-brokken (Playbook, HubSpot-start, Access-tooling/rebranding, DPA) op basis van impact op partnerervaring.
4. **Consistent werkend** afmaken in de live scenario (blokkades A en B), foutmelding (C) inbouwen.
5. **Gekozen niveau-2-brok** uitwerken in V2 en pas live zetten als het klopt.
6. Dit overzicht en de analyse/blueprint bijwerken met de nieuwe input.

---

*Bronnen: memory-project (vragenlijst-status, Make-integratie, Gijs-feedback, AAARRR-funnel, workflow-connections-fix), Briefing-Onboarding-Workflow-Verbeteren.md, Onboarding-Workflow-Analyse-en-Blueprint.md, Gijs-gesprek 2026-07-09.*
