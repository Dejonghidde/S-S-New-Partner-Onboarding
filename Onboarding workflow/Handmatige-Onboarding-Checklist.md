---
type: werkchecklist
project: New Partner Onboarding
doel: Handmatig een partner onboarden zolang de nieuwe automation (V1) nog niet live staat
gebruik: kopieer dit bestand per partner, of loop het gewoon direct af
bron: Onboarding-Workflow-Analyse-en-Blueprint.md, Contextdossier-Onboarding-Herontwerp.md, spec/spec.md, Onboarding-Aanpassingen-Overzicht.md
opgesteld: 2026-07-15
---

# Handmatige onboarding checklist (oud proces)

Partner: **[Bedrijfsnaam]**
Team: **[Sigma / Phi / Gamma / Kappa / Alpha / Rho]**
Accountlead: **[naam]**

Rho (recruitment) volgt een eigen, kleinere onboarding met andere documenten. De rest van deze lijst is voor de vijf growth-teams. Bij Rho: sla sectie 2 (Growth Funnel), 3 (vragenlijst) en 4 (playbook-gerelateerde velden) over en vervang door de recruitmentdocumenten (Talent Hacking Way of Work, sollicitanten-sheet, wervingscampagne-checklist).

**Eerst dit:** het oude Make-scenario (`3059444`) draait nog en kan het pakket soms nog automatisch aanmaken. Hij valt wel eens stil zonder melding, omdat hij op iemands persoonlijke Google/Slack/Monday-account draait. Probeer het Slack-form dus gerust eerst. Controleer daarna met deze lijst wat er echt staat, en vul handmatig aan wat mist.

---

## 1. Gegevens verzamelen

- [ ] Bedrijfsnaam
- [ ] Contactpersoon partner: naam, e-mail, telefoonnummer
- [ ] Eventuele extra contactpersonen bij de partner (e-mailadressen)
- [ ] Team (Sigma / Phi / Gamma / Kappa / Alpha / Rho)
- [ ] B2B of B2C — staat nog niet als apart veld in het oude form, dus navragen of zelf vaststellen. Bepaalt de vragenlijst-link en het Monday-boardsjabloon
- [ ] Taal van de partnercommunicatie (NL/EN)
- [ ] Link naar assignment letter
- [ ] Link naar handover

---

## 2. Drive: partnermap en documenten

- [ ] Partnermap aanmaken: `S&S Projects / 02. Current projects / [Team] / [Bedrijfsnaam]`
- [ ] Submap `[SHARED]` aanmaken in de partnermap
- [ ] Partner-e-mail (en eventuele extra contactpersonen) toegang geven tot de `[SHARED]`-map
- [ ] Deel-notificatiemails van Google uitzetten bij het delen, als de optie er staat (voorkomt drie losse Google-mails naast je eigen welkomstmail)
- [ ] DPA-sjabloon kopiëren naar de partnermap (bron: Finance & Legal)
- [ ] Growth Funnel sheet kopiëren naar de partnermap
- [ ] Kopie van de assignment letter opslaan in de partnermap
- [ ] Kopie van de handover opslaan in de partnermap

**Bewust niet doen:**
- [ ] Geen Strategy Playbook kopiëren op dag 0. Besluit van 2026-07-09: op dag 0 is er nog niets partner-specifieks in te vullen, en de oude kopie bevat ongeschoonde data van andere partners. De playbook komt later, ná de strategiesessie.
- [ ] Geen oude pre-audit vragenlijst uit Drive kopiëren. Die is verouderd; de Cloudflare-vragenlijst hieronder is de bron.

---

## 3. Vragenlijst (Cloudflare, draait al zelfstandig)

- [ ] Noteer de Drive-folder-id van de partnermap uit stap 2 (niet de `[SHARED]`-submap, de hoofdmap)
- [ ] Bouw de juiste link:
  - B2C: `https://onboarding.sprintsandsneakers.dev/?c=<folder-id>`
  - B2B: `https://onboarding.sprintsandsneakers.dev/b2b?c=<folder-id>`
- [ ] Open de link zelf ter controle voor je 'm verstuurt. Een verkeerde of ontbrekende folder-id stuurt antwoorden nu nog naar de verkeerde plek; er is nog geen aparte quarantainemap live
- [ ] Bewaar de link, hij gaat straks mee in de partnermail

---

## 4. Monday

- [ ] Tech-ticket aanmaken op board **#Operations - Tech backlog**, item `[Bedrijfsnaam] - onboarding`
- [ ] Item aanmaken op **Client overview - Leadership** (board `3337611330`), met link naar de Growth Funnel. Playbook-link laat je leeg tot ná de strategiesessie
- [ ] Nieuw board voor de partner aanmaken uit het juiste sjabloon (B2B of B2C), team ingesteld als Owner
- [ ] Statuskolommen op het Client overview-item handmatig bijwerken zodra iets klaar is: **Vragenlijst**, **Onboarding pakket**, **Access & kickstart**, **Vragenlijst antwoorden**-link (deze kolommen bestaan al, ze worden nu alleen nog niet automatisch gevuld)

---

## 5. Slack

- [ ] Bericht in `#Allocatie`: nieuwe partner gestart, team genoemd
- [ ] DM naar de teamlead van het toegewezen team
- [ ] Kanaal `client-[bedrijfsnaam]` aanmaken (intern), team uitnodigen
- [ ] Kanaal `external-[bedrijfsnaam]-sprintsandsneakers` aanmaken (extern gedeeld), team toevoegen
- [ ] Statusbericht pinnen in beide kanalen

---

## 6. Partnermail (het ene contactmoment)

- [ ] Versturen vanaf een stabiel adres, niet vanaf een persoonlijk account
- [ ] Ondertekend met de naam van de accountlead
- [ ] Taal: NL of EN, op basis van de partner
- [ ] Inhoud:
  - [ ] Welkom
  - [ ] Link naar de DPA
  - [ ] Link naar de juiste vragenlijst (met werkende `?c`-parameter, getest in stap 3)
  - [ ] Link naar de gedeelde Drive-map
- [ ] Verouderde Tooling-guide-PDF en het gamma.app-deck níet meebijlagen. Stuur de nieuwe Tooling Access Guide apart of loop 'm samen door tijdens de kickstart (zie stap 7)

---

## 7. Toegang en tooling

- [ ] Nieuwe Tooling Access Guide naar de partner sturen (`Documenten Onboarding/Tooling Access Guide 2026 - Sprints & Sneakers.docx` of de pdf-versie), of samen doornemen tijdens de kickstart
- [ ] Bijhouden welke tools binnen zijn: GA4, Tag Manager, Search Console, Hotjar/Clarity, Google Ads, Meta Ads, LinkedIn, TikTok, Microsoft Advertising, overige advertentieplatformen, website/CMS, e-mail/CRM
- [ ] LastPass-toegangsmap aanmaken voor deze partner

---

## 8. Kickstart

- [ ] Kickstart-meeting inplannen, streefdoel 3 tot 5 werkdagen na de start
- [ ] Kickstart-format-template gebruiken (gedeelde Drive-map "New Partner Onboarding", naast DPA en Tooling Access Guide) en tijdens de meeting samen invullen: succescriteria voor déze partner, rollen en contactpersonen aan beide kanten, communicatieritme, eerste-waardemijlpaal met datum
- [ ] Kickstart pas bevestigen als assignment letter én handover binnen zijn, tenzij je dat bewust overrulet

---

## 9. Partner-toegang afronden

- [ ] Partner en contactpersonen toevoegen aan het externe Slack-kanaal
- [ ] Partner en contactpersonen toevoegen aan het Monday-board
- [ ] Nogmaals checken dat iedereen ook echt toegang heeft tot de `[SHARED]`-Drive-map

---

## 10. Bewaken en afronden

- [ ] Statuskolommen op Client overview actueel houden terwijl je de stappen hierboven afwerkt
- [ ] Vragenlijst binnen: status **Vragenlijst** op "Binnen" zetten, link naar het antwoorden-document toevoegen, kort melden in het interne kanaal
- [ ] Alles compleet: status **Onboarding pakket** op "Done" zetten
- [ ] Toegang en kickstart pas afvinken als ze ook echt gebeurd zijn, niet vooruit

---

## Samengevat: wat je bewust niet doet

- Geen Strategy Playbook op dag 0 kopiëren
- Geen oude pre-audit vragenlijst uit Drive gebruiken
- Geen drie losse Google-share-mails naast je eigen welkomstmail (notificaties uit waar mogelijk)
- Geen verouderde Tooling-guide-PDF of gamma.app-deck meesturen
