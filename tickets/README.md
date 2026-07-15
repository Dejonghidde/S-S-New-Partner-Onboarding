# tickets/ : de brokken werk plus het sessieprotocol

De spec (`spec/spec.md`, deel 1 goedgekeurd 2026-07-10, deel 2 in review) is opgeknipt in tickets. Het masterplan (`Onboarding workflow/Masterplan-New-Partner-Onboarding.md`, 2026-07-14) bepaalt het einddoel, de fasen en de volgorde. Dit bestand is de instructie-manual voor elke uitvoerende Claude Code-sessie.

## Sessieprotocol (voor elke sessie die een ticket oppakt)

**Bij de start van de sessie:**
1. Start schoon (een ticket per sessie).
2. Lees in deze volgorde: het ticket zelf, de masterplan-fase waar het bij hoort, en de spec-secties die het ticket noemt. Lees niet meer dan nodig.
3. Check de status-tabellen hieronder en `Onboarding workflow/Onboarding-Aanpassingen-Overzicht.md` op besluiten die na het schrijven van het ticket zijn genomen.

**Autonomie (besluit Hidde, 2026-07-14, vervangt de eerdere twee-zinnen-regel voor tickets 11 en hoger):**
- Bouw, test en ontwerp zelfstandig. Leg de aanpak niet vooraf ter goedkeuring voor; maak ontwerpkeuzes zelf op basis van de aanbevelingen in het ticket en log ze.
- Een poortje (expliciete go van Hidde vooraf) blijft verplicht bij: (a) elke wijziging aan een actief/live Make-scenario of het activeren of deactiveren van een scenario, (b) alles wat partner-facing live gaat (vragenlijst-deploy naar Cloudflare, mail-wijzigingen in een actief scenario, het bronbestand van de Tooling Access Guide vervangen), (c) elke verzending naar een partner of extern kanaal, (d) elke wijziging in HubSpot, (e) alles wat een ticket zelf onder "Poortjes" noemt.
- Loop je vast op een besluit dat echt bij Hidde ligt: leg de vraag met je aanbeveling vast, werk verder aan wat wel kan, en meld het aan het einde.

**Vaste guardrails (ongewijzigd):**
- Het live scenario `3059444` nooit aanraken; bouwen gebeurt in de inactieve V1-scenario's (`6525431`, `6525439`, `6525442`) of nieuwe inactieve scenario's.
- Blueprint-JSON-exports in de repo nooit bewerken om een fix te simuleren; dat zijn snapshots.
- Credentials via geautoriseerde MCP-sessies; nooit om tokens vragen.
- Copy: Nederlands (of Engels waar de deliverable dat vraagt), geen em-dashes, geen pijl-tekens, geen AI-slop. Partner-facing deliverables via de `ss-brand-style` skill, met screenshots ter controle.

**Bij het einde van de sessie:**
1. Werkend werk committen (kleine commits, duidelijke boodschap).
2. Status bijwerken: de tabel hieronder en, bij besluiten of wijzigingen, `Onboarding-Aanpassingen-Overzicht.md`.
3. Eindrapport aan Hidde: wat af is (met bewijs: testruns, screenshots), welke ontwerpkeuzes gemaakt zijn, wat openstaat en welke poortjes wachten op go.

## Deel 1: de ruggengraat (tickets 00 t/m 10)

| # | Ticket | Afhankelijk van | Status |
|---|---|---|---|
| 00 | [Echte foutmelding in live](ticket-00-live-foutmelding.md) | go per wijziging | Sandbox klaar, live-toepassing bij cutover |
| 01 | [Playbook-kopieerstap schrappen](ticket-01-live-playbook-schrappen.md) | go per wijziging | Sandbox klaar, live-toepassing bij cutover |
| 02 | [Spike: service-account + bot-scopes](ticket-02-spike-service-account-en-scopes.md) | geen | Bewezen |
| 03 | [Teamconfig- en registry-tabs](ticket-03-teamconfig-en-registry-tabs.md) | 02 (zacht) | Klaar |
| 04 | [Generieke route e2e, een team](ticket-04-generieke-route-een-team.md) | 02, 03 | Gebouwd, e2e-test nog te doen (Hidde) |
| 05 | [Uitrol alle teams + Rho](ticket-05-uitrol-alle-teams-en-rho.md) | 04 | Meegebouwd, e2e-test nog te doen |
| 06 | [Webhook-lus Worker + Make](ticket-06-webhook-lus-worker-en-make.md) | 03 | Gebouwd, e2e-test nog te doen |
| 07 | [Monday-status + reminders](ticket-07-monday-status-en-reminders.md) | 04/05, 06 | Gebouwd, e2e-test nog te doen |
| 08 | [Brevo-mail](ticket-08-brevo-mail.md) | 05, Brevo-domeinauth | On hold (Gmail blijft, management-besluit nodig) |
| 09 | [Form-verrijking](ticket-09-form-verrijking.md) | 03, 04 | Deels; E/F verplicht maken loopt mee als R6 in ticket 10 |
| 10 | [Cutover + DoD-verificatie + restpunten R1-R6](ticket-10-cutover-en-dod-verificatie.md) | alles, go | Nog niet gestart; bevat nu ook de blueprint-restpunten |

## Deel 2: het masterplan (tickets 11 t/m 19)

**Herziene prioriteit (besluit Hidde, 2026-07-14, vervangt de fase-volgorde hieronder):** eerst 13, dan 18, dan 19. Daarna pas 15+16+17 (vereisen een grotere research-agent/workflow-opzet). Ticket 12 voorlopig overslaan (geen impact/meerwaarde nu). Ticket 14 is al gedaan door Hidde zelf buiten deze tickets-flow om (nieuwe Tooling Access Guide, on-brand, inhoudelijk bijgewerkt, al gekoppeld in de live onboarding-workflow als de PDF die gekopieerd wordt).

Oorspronkelijke aanbevolen uitvoeringsvolgorde volgde de masterplan-fasen, niet de nummering: eerst 11 en 12 (fase 1), dan 15 en 16 (fase 2), dan 18 en 19 (fase 3), dan 13 en 14 (fase 4). Ticket 17 is gated en komt pas na drie bewezen research packs. Tickets 11, 12, 15 en 16 kunnen parallel aan de e2e-test van ticket 10 (ze bouwen in inactieve scenario's of lokaal).

| # | Ticket | Masterplan-fase | Afhankelijk van | Status |
|---|---|---|---|---|
| 11 | [Monday-subitems + reminders + escalatie](ticket-11-monday-subitems.md) | 1 | geen (activering met/na 10) | Gebouwd en getest in test-omgeving (2026-07-14); correctie na feedback Hidde: subitems horen op board 4197869424 (Tech backlog), niet Client overview, met Created/Deadline-kolommen en Hidde altijd als mede-eigenaar (zie sessielog); registry-sync en Rho-tak nog open |
| 12 | [Welkomstmail-copy: eigenaarschap + volgende stap](ticket-12-welkomstmail-copy.md) | 1 | copy-akkoord Bart/Gijs voor live | Overgeslagen op verzoek Hidde (2026-07-14), geen impact nu |
| 13 | [Kickstart-standaard + handover-gate + dag-0 scheduling](ticket-13-kickstart-standaard.md) | 4 | 11, 12 | Grotendeels gedaan (2026-07-14): format-template + gate live in Drive, kopieerstap getest in test-omgeving, Teamconfig-kolom klaar (echte sheet wacht op go); mail-koppeling en accountlead-instructie nog open |
| 14 | [Tooling Access Guide herschrijven + koppelen](ticket-14-tooling-access-guide.md) | 4 | 11, inhoud-akkoord Gijs/Bart | Gedaan door Hidde zelf (buiten deze flow, gemeld 2026-07-14) |
| 15 | [Vragenlijst-sanering -50%](ticket-15-vragenlijst-sanering.md) | 2 | Bart-tabel (bindend), deploy met go | Wacht op bewezen proefpacks (besluit brainstorm 2026-07-15); ontwerp in `Onboarding workflow/Uitwerking-Fase-2-Vragenlijst-en-Research-Pack.md` |
| 16 | [Partner Research Pack v1](ticket-16-research-pack-v1.md) | 2 | 15 (zacht) | Ontwerp definitief na brainstorm Hidde (2026-07-15): n8n-workflow, combinatie kort+pre-fill; bouwplan klaar in `Onboarding workflow/Stappenplan-Research-Workflow-n8n.md` (uit te voeren door verse sessie, taak 0 t/m 7) |
| 17 | [Research Pack v2: automatisch (GATED)](ticket-17-research-pack-automatisering.md) | 2 | 16: drie bewezen packs + go Hidde | Gated; architectuur en wat-bewust-later-lijst staan in het ontwerpdocument (2026-07-15) |
| 18 | [HubSpot-spike](ticket-18-hubspot-spike.md) | 3 | HubSpot-leestoegang | Beslisdocument klaar (2026-07-14), ter review bij Bart/Gijs |
| 19 | [HubSpot-trigger bouwen](ticket-19-hubspot-trigger.md) | 3 | 18 + go Bart/Gijs | Scaffold gebouwd en getest (2026-07-14) vooruitlopend op ticket 18; echte trigger + dedupe-vertakking wachten op go Bart/Gijs |

## Fase 5: de welkomstvideo van Bart (integratieplan, nog geen ticket)

Bart neemt een welkomstvideo op (hij vroeg zelf om een reminder). Zo wordt hij verwerkt zodra hij er is:

- **Wat:** een generieke video van 60 tot 90 seconden: welkom, gezicht geven aan S&S, en wat de partner de eerste twee weken kan verwachten. Generiek genoeg voor elke partner (geen namen), zodat een opname lang meegaat.
- **Waar:** als blok in de welkomstmail, tussen de intro en de vier acties: thumbnail met afspeelknop die linkt naar de video. De placeholder-plek wordt in ticket 12 al gereserveerd als commentaarblok in de HTML.
- **Hosting:** unlisted YouTube heeft de voorkeur (licht in de mail, afspeelstatistieken, geen Drive-rechtenproblemen bij partners buiten het domein); Drive is het alternatief.
- **Wanneer verstuurd:** geen aparte mail; de video zit in het bestaande dag-0 welkomstmoment. Optioneel later ook pinnen in het externe Slack-kanaal zodra de partner daar zit.
- **Acties nu:** (1) Bart de briefing sturen (doel, lengte, toon, dat hij niets partner-specifieks noemt) en een reminder zetten; (2) zodra de video er is: mini-ticket voor het mailblok (NL en EN, klikbaar getest), livegang met go want partner-facing.
- **Blokkeert niets:** de mail werkt zonder video; het blok wordt toegevoegd zodra de video er is.

## Fase 6: meten en bijsturen (hoofdlijnen)

Vanaf de cutover, voor de eerste drie tot vijf partners, zonder nieuwe tooling:

- **Zes metingen per partner:** tijd van start tot welkomstmail; tijd tot kickstart gepland en gehouden; tijd tot toegang compleet; tijd tot vragenlijst binnen; tijd tot growth-ready (alle subitems groen); en handmatig: hoe vaak de partner iets dubbel moest aanleveren of uitleggen.
- **Bron:** registry-timestamps, Monday-subitems en maildatums; een simpel meetblad (tab in de V1-spreadsheet) volstaat.
- **Daarna:** reviewronde met Bart en Gijs: tijdsdoelen uit spec deel 2 sectie 13 bevestigen of bijstellen, tweede reductieronde op de vragenlijst (Barts "nog eens heel kritisch kijken"), en de eerstvolgende investering kiezen (kandidaten: portal, Brevo, maturity scan, HubSpot-velden verrijken).
- Wordt een eigen ticket zodra de eerste partner door de nieuwe flow is.
