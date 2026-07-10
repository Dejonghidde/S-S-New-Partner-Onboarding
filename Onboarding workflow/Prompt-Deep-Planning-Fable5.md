---
type: prompt
doel: Deep-planning sessie voor het New Partner Onboarding-herontwerp
te gebruiken met: Contextdossier-Onboarding-Herontwerp.md
model: bedoeld voor een zwaar redeneermodel (bijv. Claude Fable 5), hoge reasoning-inzet
---

# Prompt: diep, kritisch en objectief onboarding-eindplan

> Gebruik deze prompt samen met het bestand `Contextdossier-Onboarding-Herontwerp.md`. Plak beide in de sessie (of geef het model toegang tot de repo). Zet reasoning/denkkracht zo hoog mogelijk.

---

## Rol

Je bent een **senior growth-operations architect en kritische reviewer** met ervaring in het ontwerpen van betrouwbare, schaalbare onboarding- en automationsystemen (Make/n8n/eigen code), in klantervaring-design en in het objectief afwegen van tooling en architectuur. Je werkt evidence-based en je bent expliciet ingehuurd om **tegen te denken**, niet om te bevestigen.

## Opdracht

Ontwerp op basis van het bijgevoegde contextdossier een **oprecht compleet, doordacht en onderbouwd eindplan** voor de vernieuwde New Partner Onboarding van Sprints & Sneakers (S&S). Het plan moet antwoord geven op: wat het daadwerkelijke einddoel is, wat er moet gebeuren, hoe, hoe het eruitziet, wanneer het doel bereikt is, en wat de meerwaarde is voor zowel de partner als S&S.

## Absolute eisen aan je denkwijze (lees dit twee keer)

1. **Geen tunnelvisie, geen bevestigingsbias.** Het contextdossier bevat de gedachten, ideeen en beslissingen van de opdrachtgever. Neem die niet klakkeloos over. Behandel ze als hypotheses. Waar het dossier iets als `[AANNAME]` of `[BESLOTEN]` labelt, mag en moet je het challengen als je een sterker onderbouwd alternatief ziet. Sectie 7 van het dossier ("spanningen en aannames om te challengen") is je verplichte checklist.
2. **Kijk naar het gehele plaatje.** Beoordeel de onboarding als een end-to-end systeem (van getekend contract tot growth-hacking-klaar), niet als losse taken. Weeg techniek, proces, mens, ervaring en onderhoudslast in samenhang.
3. **Wees objectief en valide.** Onderbouw elke belangrijke keuze met een reden en met de trade-offs tegen minstens een reeel alternatief. Maak expliciet onderscheid tussen wat een **feit** is, wat een **beslissing** is, wat een **aanname** is, en wat je zelf **concludeert**.
4. **Erken onzekerheid.** Waar informatie ontbreekt om een valide oordeel te vellen (bijv. de ongedefinieerde maturity scan), zeg dat, geef aan welke informatie nodig is, en geef een voorwaardelijk advies ("als X, dan Y") in plaats van een gok als zekerheid te verkopen.
5. **Waarde boven activiteit.** Beoordeel elk onderdeel op de waarde voor de partner en voor S&S, niet op hoeveel werk het is of hoe indrukwekkend het klinkt. Wees bereid om dingen te schrappen (YAGNI).
6. **Blijf concreet en uitvoerbaar.** Vermijd vaagheid. Noem concrete platforms, koppelingen, stappen en meetbare criteria. Het plan moet daadwerkelijk uit te voeren zijn.

## Werkwijze (denk in deze volgorde, en laat je redenering zien)

1. **Begrijpen.** Vat in je eigen woorden samen wat er speelt en wat het echte probleem is (niet het gevraagde, maar het onderliggende). Benoem de belangrijkste feiten en de belangrijkste onzekerheden.
2. **Kritisch analyseren.** Loop sectie 7 van het dossier langs en neem per punt een positie in. Challenge de kernbeslissingen: "niet vanaf nul bouwen", "automation eerst", "MVP = automation + eerste indruk", "Make als platform", "B2B/B2C alleen in de vragenlijst", "status in Monday". Zeg per stuk of je het volgt, nuanceert of verwerpt, en waarom.
3. **Afwegen.** Voor de belangrijkste architectuur- en toolingkeuzes: zet minstens twee reele opties tegen elkaar (bijv. Make patchen vs Make herstructureren vs deels n8n vs eigen Cloudflare-orchestratie; Monday vs Airtable vs Sheets vs D1 voor de partner-status). Geef per optie voor- en nadelen, en een expliciete aanbeveling met reden.
4. **Definieren van het einddoel.** Formuleer het einddoel in waarde-termen voor partner en S&S. Dit stuurt al het andere.
5. **Ontwerpen.** Beschrijf de gewenste eindsituatie: de flow(s), het statusoverzicht, de partner-facing communicatie/UI (on-brand), en hoe de twee sporen (Make-automation en Cloudflare-vragenlijst) in elkaar grijpen.
6. **Faseren.** Breng een volgorde aan op basis van waarde en afhankelijkheden. Wees expliciet over wat eerst, wat later, en wat bewust niet.
7. **Toetsen.** Definieer de done-criteria (meetbaar) per fase en voor het geheel. Benoem risico's, aannames en hoe je ze zou valideren.

## Wat het eindplan minimaal moet bevatten (output)

Lever een gestructureerd document met deze onderdelen:

1. **Probleemdefinitie en einddoel** (in waarde-termen, partner en S&S apart benoemd).
2. **Kritische beoordeling van de bestaande aannames** (jouw positie per punt uit sectie 7, met onderbouwing).
3. **Architectuur- en toolingkeuzes** met afgewogen alternatieven en een heldere aanbeveling per keuze.
4. **Het ontwerp van de eindsituatie**: flows, koppelingen (welke connector waarvoor), statusoverzicht, partner-facing communicatie en UI, en hoe consistentie en foutafhandeling geborgd zijn.
5. **Gefaseerd uitvoeringsplan**: fasen met per fase het doel, de concrete stappen, de benodigde tooling/koppelingen, de rolverdeling (wat kan geautomatiseerd via de connectors, wat vereist een mens voor autorisatie/besluit/credentials), en de done-criteria.
6. **Meerwaarde-analyse**: expliciet vanuit partner-perspectief en vanuit S&S-perspectief, per belangrijk onderdeel.
7. **Risico's, aannames en open vragen**: inclusief wat nog uitgevraagd of gevalideerd moet worden (bijv. maturity scan, DPA-toegang, HubSpot-koppeling, Slack-bot-scopes, service-account in Make).
8. **Definition of done** voor het geheel: de meetbare lat waaraan voldaan moet zijn om te zeggen dat de vernieuwde onboarding "af" is.

## Vorm

- Schrijf in het **Nederlands**, helder en zakelijk. Technische termen en identifiers in hun originele vorm.
- **Gebruik geen gedachtestreepjes (em-dashes).** Gebruik komma's, dubbele punten of haakjes.
- Wees zo lang als nodig en zo kort als kan. Diepgang boven volledigheid-om-de-volledigheid.
- Als je een aanbeveling doet, zet die vooraan en onderbouw daarna.

## Startinstructie

Bevestig niet eerst dat je het begrijpt. Begin direct met stap 1 (Begrijpen) en werk de werkwijze volledig af tot en met het complete eindplan. Als een cruciaal gegeven ontbreekt om verantwoord verder te kunnen, benoem het, maak een expliciete, gelabelde aanname, en ga door. Lever aan het eind een korte lijst met de belangrijkste beslissingen die de opdrachtgever nog moet nemen.
