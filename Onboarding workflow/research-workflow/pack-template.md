# Research Pack: {{bedrijfsnaam}}

**Partner:** {{bedrijfsnaam}} ({{domein}}, type {{type}})
**Datum:** {{datum}}
**Workflow-versie:** {{workflow_versie}}
**Totale kosten van deze run:** {{kosten_totaal}}

## Reviewblok (leeg tot beoordeling)

- **Gereviewd door:**
- **Datum:**
- **Bevindingen:**

---

## Notatieregel voor elk gegeven

Elk gegeven in de secties 1 tot en met 10 krijgt een bron en een zekerheid, in dit format: `<gegeven> (bron: <bron>; zekerheid: vastgesteld / waarschijnlijk / aanname)`. Een gegeven zonder bron hoort niet in het pack. Wat na alle bronnen leeg blijft, wordt letterlijk "onbekend" genoteerd (nooit stilzwijgend weggelaten en nooit door het LLM ingevuld met een aanname zonder het aanname-label).

Dit pack gaat nooit als geheel naar de partner. Het is bedoeld voor het team, de audit en de kickstart. Alleen de hard vastgestelde feiten uit de secties tech-stack, actieve ad-kanalen en concurrenten stromen (apart, via het prefill-contract) door naar de verificatiekaart in de vragenlijst.

---

## 1. Basisgegevens

*Naam, domein(en), contactpersonen, grootte-indicatie en locatie. Bron: HubSpot (naam, domein, contactpersoon) plus de LinkedIn-bedrijfspagina.*

## 2. Profiel en propositie

*Wat het bedrijf doet, voor wie, en de kern van de propositie. Volgt de bronnen-stapeling: eerst interne bronnen (HubSpot-dealnotities, e-mails, meetingverslagen, assignment letter, handover), dan de LinkedIn-bedrijfspagina en vacatures, dan web-research (nieuws, PR, interviews, podcasts), dan klantperspectief uit reviews. Bij type B2C ook een korte marktplaats-check (bol.com/Amazon): hoe presenteert het merk zich daar. Een gat in deze stapeling wordt nooit door het LLM opgevuld; markeer het als "onbekend".*

## 3. Markt en 3 tot 5 directe concurrenten

*Dubbelcheck: Semrush organic competitors (data) naast LLM-web-research (grounding). Staat een concurrent in beide bronnen: zekerheid vastgesteld. Staat een concurrent alleen in de LLM-research: zekerheid waarschijnlijk. Per concurrent: naam, domein, waarom concurrent (bewijs).*

## 4. Actieve ad-kanalen per platform

*Per platform: actief ja/nee, volume-indicatie, soort creatives.*

- **Meta:** (Apify Ad Library-actor)
- **Google:** (Apify Google Ads Transparency-actor, SerpApi als upgrade-pad)
- **TikTok:** (Commercial Content Library, alleen gecheckt als de tag-scan een TikTok-pixel vond)
- **LinkedIn:** (publieke Ad Library-pagina, lichte handmatige check, geen API)

## 5. Tech-stack en tracking

*Resultaat van de drie-lagen-scan (laag 1: statische HTML-fetch, laag 2: gtm.js-container-parse, laag 3: headless render bij een verdacht leeg beeld). Aanwezigheid van een tool is betrouwbaar vast te stellen; de kwaliteit van de configuratie is van buiten nooit vast te stellen en blijft expliciet kickstart/audit-onderwerp. Een niet-scanbare site (bot-detectie die ook laag 3 blokkeert) wordt zichtbaar als "niet scanbaar" genoteerd, nooit stil overgeslagen.*

## 6. Social-aanwezigheid

*Per gevonden kanaal (uit de footer-links van de site): volgers, aantal posts, posts per week (laatste 90 dagen), regelmaat (vast ritme / onregelmatig), engagement-rate, terugkerende onderwerpen. Groei alleen vermelden als er een bruikbare publieke bron is (Social Blade); is die er niet, dan letterlijk "groei: nog geen historie beschikbaar".*

## 7. Reputatie

*Google-rating en aantal, Trustpilot-score en aantal, en 3 tot 5 terugkerende thema's uit de meest recente reviews, gesplitst in positief en negatief.*

## 8. SEO en organisch verkeer

*Semrush domain overview (verkeer-indicatie), top-50 organische keywords (de belangrijkste eruit gelicht), organische concurrenten.*

## 9. Zichtbare funnel

*Type (webshop-checkout, leadgen-formulier, demo-aanvraag), stappen tot conversie, e-mail-capture (popup, nieuwsbrief), opvallende frictie. Alleen wat zichtbaar is vanaf de site; niets aannemen over wat daarachter gebeurt. Zekerheid hier is maximaal "waarschijnlijk".*

## 10. Visuele eerste indruk

*Vaste vision-rubric over screenshots (site desktop/mobiel, Instagram-grid, top-ad-creatives): (1) consistentie tussen site, social en ads, (2) professionaliteit (beeldkwaliteit, typografie-discipline, witruimte), (3) herkenbare visuele identiteit, (4) verouderings-signalen. Altijd gelabeld "eerste indruk, aanname-niveau"; het brandbook van de partner blijft de waarheid, niet dit oordeel.*

## 11. Aannames voor de kickstart

*De 3 tot 5 strategisch relevante beweringen die niet hard vastgesteld konden worden, maar waar het 90-dagen-plan op leunt. Afgeleid uit alle velden met zekerheid "waarschijnlijk" of "aanname" plus alle "onbekend"-velden, gescoord op impact maal onzekerheid. Elke aanname in exact dit 5-punts-format:*

### Aanname 1

1. **Bewering:**
2. **Waarop gebaseerd (bron):**
3. **Waarom het ertoe doet:**
4. **De letterlijke vraag aan de partner:**
5. **Wat er verandert als het niet klopt:**

### Aanname 2

1. **Bewering:**
2. **Waarop gebaseerd (bron):**
3. **Waarom het ertoe doet:**
4. **De letterlijke vraag aan de partner:**
5. **Wat er verandert als het niet klopt:**

### Aanname 3

1. **Bewering:**
2. **Waarop gebaseerd (bron):**
3. **Waarom het ertoe doet:**
4. **De letterlijke vraag aan de partner:**
5. **Wat er verandert als het niet klopt:**

*(Aanname 4 en 5 alleen toevoegen als de impact-score dat rechtvaardigt.)*
