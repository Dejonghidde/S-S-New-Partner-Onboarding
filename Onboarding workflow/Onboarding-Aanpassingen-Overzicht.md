---
type: aanpassingenlijst
project: New Partner Onboarding
status: In uitvoering
accountable: Hidde
bijgewerkt: 2026-07-09
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
| 4 | Tooling Access Guide document upgraden | Documenten Onboarding/Tooling Access Guide.docx | - | Open |
| 5 | Splitsing B2B & B2C in workflow | Make (playbook/funnel/Monday-boardtemplates) | - | Open |
| 6 | Consistentie & structuur assignment letter + handover | HubSpot-form → Drive-projectmap | - | Open |
| 7 | DPA — kleine opmaakverbetering | DPA-template (bron: Finance & Legal) | - | Open |
| 8 | Automation foutloos + sneller + minder handmatig werk | Make (live 3059444 + V2 6226897) | 🔴 Hoogste — eerste stap | Besloten (prioriteit), uitvoering loopt |
| 9 | Interactieve onboarding-portal / toegang-afvinklijst | Nieuw (uitbreiding op Cloudflare-vragenlijst) | - | Open — idee, valideren |

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

**Waar (voorstel, nog te bevestigen):**
- Als expliciete upload-vraag onder de bestaande "assets"-categorie in de onboarding-vragenlijst (B2C + B2B) — deze ondersteunt al file-uploads via de Cloudflare Worker naar de Drive-projectmap van de partner, dus dit is een kleine toevoeging, geen nieuwe infrastructuur.
- Als los, zichtbaar checklist-item in de interne teamstatus/-notificatie ("Brandbook/tone-of-voice: aanwezig/ontbreekt"), zodat het net als playbook/funnel/DPA niet stilzwijgend gemist kan worden.

**Status:** Open — toe te voegen.

---

## 4. Tooling Access Guide document upgraden

**Wat:** de Tooling Access Guide herschrijven/herstructureren, zowel qua vormgeving als inhoud.

**Waarom:** audit (2026-07-09) bevestigde meerdere concrete gebreken: geen S&S-huisstijl (kaal Word-standaard, logo rendert kapot), kapotte inhoudsopgave (sectie 3.2 mist doordat 'ie niet als Heading is gestyled), tegenstrijdige instructies (tekst zegt `accounts@`, screenshot toont `hello@` voor HubSpot-toegang), persoonsafhankelijkheid (Gijs' persoonlijke e-mail als instructie voor toegang op ~7 advertentieplatformen), de instructie om wachtwoorden via e-mail te delen (beveiligingsrisico) bij meerdere tools, een dode tool (Google Optimize, sinds september 2023 offline door Google), verouderde merknamen (Twitter i.p.v. X, Bing Ads i.p.v. Microsoft Advertising), en kopieerfouten (dubbele stapnummers). Onafhankelijk bevestigd door de leads-uitvraag: zowel Anjo als Sharif noemen dat klanten toegang verlenen vaak niet snappen (zie Onboarding-Workflow-Analyse-en-Blueprint.md sectie 5, Ronde 2).

**Waar:** `Documenten Onboarding/Tooling Access Guide - [klantnaam] [maak kopie] .docx`

**Status:** Open — scope van de fix (volledige herschrijving vs. gerichte fixes op de risicovolle onderdelen) nog te bepalen.

---

## 5. Splitsing B2B & B2C in workflow

**Wat:** volledige B2B/B2C-differentiatie doorvoeren in de onboarding-workflow: niet alleen de juiste vragenlijstlink, maar ook playbook, growth funnel en Monday-boardtemplates per type.

**Waarom:** momenteel krijgt elke partner dezelfde versie ongeacht B2B/B2C. Dit staat al langer als openstaande vraag/aanbeveling in het project (v1-scope beperkt dit bewust tot alleen de juiste vragenlijstlink; volledige splitsing is expliciet "niet in v1" maar wel benoemd als latere fase).

**Waar:** Make-scenario's (playbook-/funnel-kopieerstap), Monday-boardtemplates.

**Status:** Open — hangt af van prioriteit t.o.v. de andere v1-verbeteringen.

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
