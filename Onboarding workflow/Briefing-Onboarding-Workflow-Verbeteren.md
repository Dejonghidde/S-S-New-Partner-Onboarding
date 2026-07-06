---
type: briefing
project: New Partner Onboarding V2 (Make-workflow verbeteren)
categorie: Operations
monday-board-id: 18394719436
status: In uitvoering
fase: Define
accountable: Hidde
aangemaakt: 2026-07-01
tags: [onboarding, workflow, make, briefing, operations]
---

# Briefing: New Partner Onboarding workflow verbeteren

Werkdocument. Verzamelt alles wat we weten over wat er moet gebeuren aan de nieuwe-partner-onboarding. Bron voor het denkwerk, de leads-uitvraag en de latere uitvoering.

## 1. Kern in 3 zinnen

De onboarding draait al deels geautomatiseerd via een bestaande Make-workflow. Die keten hapert en is niet consistent. Jouw opdracht: de bestaande workflow consistent werkend maken, daarna effectiever, daarna verbeteren op basis van input van B/G en teamleads. Je bouwt niets vanaf nul.

## 2. Scope

- **Wel:** de volledige journey, van getekend contract tot "partner klaar om te starten met growth hacking". De vernieuwde vragenlijst is 1 stap in dat geheel.
- **Ruggengraat:** de bestaande Make-automation die B/G voedt met partner-info.
- **Niet nu:** een nieuw systeem bouwen. Verbeteren wat er staat.

## 3. Deliverable deze week (voor vrijdag 2026-07-03)

Gijs stuurt op shipping. De hele journey is niet voor vrijdag af, dus concreet deze week:

1. Deze blueprint: volledige keten in kaart, per stap waar het misgaat en welke waarde die stap heeft.
2. Teamleads uitgevraagd: wat hebben zij nodig en wat horen zij van partners. Input verwerkt in de blueprint.

## 4. Waarde-lens (Gijs-gesprek)

Elk onderdeel omschrijven in termen van waarde, niet in taken. Dit is het kader waarmee je keuzes maakt.

| Waarde | Voor wie | Wat het betekent |
|--------|----------|------------------|
| Klantervaring | Partner | Belangrijkste. Gemak, duidelijkheid, professioneel gevoel vanaf dag 1. |
| Tijdsbesparing | S&S team | Minder handmatig geklungel, minder losse to-do's na de automation. |
| Snelheid | Bart | Hoe snel kunnen we na tekenen diensten leveren. |
| Grondigheid | Gijs | Direct na onboarding moet alles perfect klaarstaan om meteen te growth hacken. |

Spanning om te managen: Bart wil snelheid, Gijs wil volledigheid. De workflow moet beide leveren: snel live, maar compleet.

## 5. Aanpak-volgorde (Naomi)

1. **Consistent werkend maken.** Eerst definieren: wat betekent "consistent werkend"? Wat gaat er nu fout met de info die B/G invullen bij de start van de automation?
2. **Effectiviteit verbeteren.** Welke onderdelen? Wat is het einddoel per onderdeel?
3. **Verbeteren op input B/G/leads.** Deze week de teamleads concreet uitvragen wat ze nodig hebben, op basis van eigen ervaring en wat ze van partners horen.

Aannames die Naomi wil laten toetsen (niet aannemen, uitvragen):
- Bart = snelheid. Aanname of besproken? Heeft hij nog meer ideeen?
- Gijs = grondigheid. Zelfde vragen.
- Partner = gemak en ervaring. Is dat zo, en is dat alles?
- Leads = hetzelfde als partners of iets anders?

## 6. De volledige keten (huidige staat)

| # | Stap | Bestaat | Status / wat mist |
|---|------|---------|-------------------|
| 1 | Sales gesloten: assignment letter + sales-to-growth handover | ja | uitgangspunt automation |
| 2 | B/G vullen partner-info in, Make-automation start | ja | hapert. Naomi stap 1: wat gaat hier fout met de ingevulde info |
| 3 | Auto-generatie: DPA, pre-audit vragenlijst, Drive-mappen, growth funnel sheet, strategy playbook, Monday-board | ja | consistentie onbekend, moet geverifieerd |
| 4 | Slack-bericht + handmatige to-do-lijst | ja | veel handmatige stappen, kandidaat voor automatisering |
| 5 | Vragenlijst naar partner, partner vult in | deels | vragenlijst B2C vernieuwd (Hidde), opslag antwoorden nog open |
| 6 | Antwoorden + documenten opgeslagen, team vindt terug | nee | open: Sheet + Drive-koppeling nog te bouwen |
| 7 | Kickstart-meeting + kennismaking, klaar voor growth hacking | ja | kickstart-template bestaat |

## 7. Wat de automation nu oplevert (uit Slack-template)

Het Make-bericht "New partner onboarding" genereert per partner deze artefacten. Dit is de inventaris om tegen te verifieren:

Documenten en mappen (automatisch):
- Assignment letter
- Sales to growth handover
- Data processing agreement (DPA)
- Pre-audit questionnaire (= de vragenlijst)
- Google Drive project folder
- Google Drive shared folder
- Growth funnel sheet
- Strategy playbook
- Monday-board (nieuw board per partner)

Handmatige to-do na de automation (nu nog los):
- Project kickstart meeting met business development
- LastPass-map aanmaken voor partner-wachtwoorden
- Partner uitnodigen in gedeeld Slack-kanaal
- Partner uitnodigen op gedeeld Monday-board
- Toegang krijgen tot alle relevante kanalen
- Kennismakingsmeeting met partner

Referentie kickstart-template: Google Slides "Project kickstart and first acquaintance meeting template".

## 8. Vragenlijst-stap (stap 5): huidige staat en open punten

- B2C-versie is klaar en live: single-file HTML-quiz, 9 secties (Customer, Brand & Positioning, Capabilities, Funnel, Tech & Tracking, Team & Process, Ambition, Assets & Access, Impact).
- Gehost op Cloudflare via tools@ account.
- Filosofie (Bart): alleen vragen wat de partner zelf kan vertellen, niets wat we uit contract, database of markt halen.

Open op de vragenlijst:
- B2B-variant maken (Gijs-verzoek 17-06). B2C + B2B apart.
- Opslag antwoorden: Apps Script naar Google Sheet.
- Document-upload (brandbook, beeld, product, legal) naar Google Drive-partnermap.
- Beheer-sheet met alle links per partner (vragenlijst, antwoorden-sheet, documentenmap).
- Naam + bedrijf vooraan uitvragen zolang unieke link per bedrijf nog niet automatisch koppelt.

Inhoudelijke toevoegingen uit Gijs-feedback (17-06), B2C:
- Customer: insights over hoe klanten hen vinden / wat ze voelen, buiten de data om.
- Brand: huidig brand-awareness-niveau en hoe ze dat meten; markttrends.
- Capabilities: score 1-10 op kanaalperformance + toelichting best/worst.
- Technology: Google Ads enhanced conversions.
- Team & Process: verwachte doorlooptijd feedback aan ons; risico's die klant ziet.
- Ambition: marge en unit economics; runway / financiele zekerheid.

## 9. Open beslissingen

- Definitie "consistent werkend": wat is de harde eis waaraan de automation moet voldoen voordat we effectiviteit aanpakken.
- Wat gaat er precies mis in stap 2 en 3 (vereist inzage in de Make-scenario zelf).
- Technische aanpak documenten naar Drive: Apps Script upload, Make/n8n automation, of Drive MCP.
- B2B-variant vragenlijst: nu al of later.
- Welke van de handmatige to-do's (stap 4) automatiseerbaar zijn.

## 10. Concrete acties deze week (W27)

| Actie | Waarom | Deblokkade / wie |
|-------|--------|------------------|
| Inzage krijgen in de bestaande Make-scenario | Zonder de workflow te zien kun je "wat gaat fout" niet definieren | Assertief opvragen bij bouwer/Bart vandaag, niet zelf reverse-engineeren |
| Definitie "consistent werkend" op papier | Naomi stap 1, kader voor de rest | Zelf, daarna check bij Gijs |
| 3 vragen naar teamleads sturen | Input B/G/leads, Naomi | Leads van Phi, Kappa, Rho, Alpha, Gamma |
| Blueprint (dit document) aanscherpen met leads-input | Vrijdag-deliverable | Zelf |
| B/G-aannames toetsen (snelheid vs grondigheid) | Voorkom bouwen op aanname | Korte vraag aan Bart en Gijs |

Voorgestelde 3 vragen aan de teamleads:
1. Wat mist er in de huidige onboarding waardoor je niet direct kunt starten met growth hacking?
2. Wat hoor je van partners over hoe zij de onboarding ervaren?
3. Welke info of toegang heb je standaard nog nodig na de automation, die er nu niet automatisch is?

## 11. Assertiviteit-check

Blokkade: je kunt de automation niet verbeteren zonder inzage in de bestaande Make-scenario.
Actie vandaag: opeisen bij de bouwer of Bart, inzage of uitleg. Niet wachten, niet zelf reconstrueren. Bij geen reactie: escaleren naar Gijs.

## 12. Betrouwbaarheid

Betrouwbaarheid: Matig. De keten is gereconstrueerd uit de Slack-template, de projectnotities en de handmatige onboardings (ChefMaison, BSL). De exacte werking en foutpunten van de Make-scenario zijn nog niet met eigen ogen geverifieerd. Zodra je inzage hebt, stap 2, 3 en 9 aanscherpen.

---

*Bronnen: Onboarding-B2B-B2C-2.0.md, onboarding vragenlijst.md, Vragenlijst onboarding feedback.md, onboarding brainstorm-idee.md, Onboarding handmatig/ (ChefMaison, BSL, Slack links). Gijs-gesprek en Naomi-tips (2026-07-01).*
