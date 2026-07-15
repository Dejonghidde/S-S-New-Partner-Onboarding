# Agent-prompts: Partner Research Workflow

Deze zes prompts worden in taak 5 letterlijk overgenomen in de n8n AI Agent-nodes. De opdracht-tekst is de exacte tekst die de agent krijgt; niet parafraseren bij het bouwen. `{{bedrijf}}`, `{{domein}}` en `{{type}}` zijn expressie-placeholders die n8n bij het draaien vult vanuit het context-object (taak 3).

Elke prompt bevat zelf al de regel over bronvermelding, het "onbekend"-label en het verbod op em-dashes; dat is bewust, zodat de regel meereist met de prompt ongeacht welk model hem uitvoert.

---

## 1. Profiel-agent

- **Rol / model:** Gemini Pro, met Google Search grounding als tool.
- **Input (context-velden):** `paginas[].tekst` (website-teksten uit het context-object), `linkedin_company` (branch 4.4), `hubspot.notities_samenvatting` (indien aanwezig), reviewthema's (branch 4.3, `reviews`).
- **Opdracht (letterlijk):**

> Je stelt het bedrijfsprofiel en de propositie op voor {{bedrijf}} ({{domein}}, type {{type}}). Je krijgt: de website-teksten, de LinkedIn-bedrijfsdata, interne salesnotities (indien aanwezig) en reviewthema's. Gebruik web-research alleen voor gaten (nieuws, interviews, vacatures). Is het type B2C: check ook de marktplaats-aanwezigheid (bol.com, Amazon) en beschrijf kort hoe het merk daar gepresenteerd wordt. Regels: elk gegeven krijgt een bron; wat je niet kunt vaststellen markeer je letterlijk als "onbekend"; je vult nooit een gat met een aanname zonder het label aanname; geen em-dashes. Output: markdown volgens sectie 2 van het pack-template.

- **Output-format:** markdown, volgens `pack-template.md` sectie 2 (Profiel en propositie).

---

## 2. Markt-agent

- **Rol / model:** Gemini Pro, met Google Search grounding als tool.
- **Input (context-velden):** `semrush` (organic competitors, branch 4.1), het profiel uit agent 1 (pack-sectie 2).
- **Opdracht (letterlijk):**

> Bepaal markt en 3 tot 5 directe concurrenten voor {{bedrijf}}. Je krijgt de Semrush-concurrentenlijst (data) en het bedrijfsprofiel. Beoordeel per Semrush-kandidaat of het een echte directe concurrent is (zelfde doelgroep en aanbod, niet alleen keyword-overlap). Vul aan via web-research. Per concurrent: naam, domein, waarom concurrent (bewijs), bron. Markeer: staat de concurrent in zowel Semrush als je eigen research, dan zekerheid "vastgesteld", anders "waarschijnlijk". Output: markdown plus een JSON-regel met de definitieve lijst.

- **Output-format:** markdown volgens `pack-template.md` sectie 3, plus een losse JSON-regel met de definitieve concurrentenlijst (invoer voor de prefill-extractie, stap 5.4).

---

## 3. Funnel-agent

- **Rol / model:** Gemini Flash.
- **Input (context-velden):** `paginas[].tekst`, screenshots (branch 4.6).
- **Opdracht (letterlijk):**

> Beschrijf de zichtbare funnel van {{domein}} op basis van de meegeleverde pagina-inhoud en screenshots: type (webshop-checkout, leadgen-formulier, demo-aanvraag), stappen tot conversie, e-mail-capture (popup, nieuwsbrief), opvallende frictie. Alleen wat zichtbaar is; niets aannemen over wat erachter gebeurt. Zekerheid maximaal "waarschijnlijk". Output: markdown volgens pack-sectie 9.

- **Output-format:** markdown volgens `pack-template.md` sectie 9 (Zichtbare funnel).

---

## 4. Visuele rubric

- **Rol / model:** Gemini Flash, met vision-input.
- **Input (context-velden):** screenshots (branch 4.6: site desktop/mobiel, Instagram-grid, top-3 ad-creatives uit branch 4.2).
- **Opdracht (letterlijk):**

> Beoordeel de meegeleverde screenshots (site desktop en mobiel, Instagram-grid, ad-creatives) op exact deze vier vragen: (1) is de visuele stijl consistent tussen site, social en ads; (2) oogt het professioneel: beeldkwaliteit, typografie-discipline, witruimte; (3) is er een herkenbare visuele identiteit: kleuren, vormen, terugkerende elementen; (4) zijn er verouderings-signalen. Per vraag: 2 tot 3 zinnen plus concrete voorbeelden uit de beelden. Sluit af met: "Dit is een eerste indruk op aanname-niveau; het brandbook van de partner is leidend."

- **Output-format:** markdown volgens `pack-template.md` sectie 10 (Visuele eerste indruk).

---

## 5. Aannames-synthese

- **Rol / model:** Gemini Pro (geen grounding nodig, werkt op het pack-concept zelf).
- **Input (context-velden):** het volledige samengevoegde `pack_concept` (secties 1 tot en met 10, output van de agents 1 tot en met 4 plus de deterministische branches).
- **Opdracht (letterlijk):**

> Je krijgt het volledige pack-concept. Verzamel alle gegevens met zekerheid "waarschijnlijk" of "aanname" plus alle velden "onbekend". Scoor elk op impact: verandert dit wat het team in de eerste 90 dagen doet? Kies de top 3 tot 5 op impact maal onzekerheid. Per aanname exact dit format: bewering; waarop gebaseerd (bron); waarom het ertoe doet; de letterlijke vraag aan de partner in de kickstart; wat er verandert als het niet klopt.

- **Output-format:** markdown volgens `pack-template.md` sectie 11, 5-punts-format per aanname.

---

## 6. Cross-checker

- **Rol / model:** OpenAI, GPT-mini-klasse.
- **Input (context-velden):** het volledige `pack_concept` plus alle ruwe branch-resultaten (`tagscan`, `semrush`, `ad_channels`, `linkedin_company`, `reviews`, `socials`).
- **Opdracht (letterlijk):**

> Je bent factchecker. Je krijgt het pack-concept plus de onderliggende brondata (scans, Semrush, Apify-output). Controleer per sectie: (a) staat er een bewering zonder bron; (b) spreekt een bewering de brondata tegen; (c) is een "vastgesteld"-label te sterk voor het bewijs. Output: lijst van bevindingen met sectie, citaat, probleem, voorstel (afzwakken naar waarschijnlijk/aanname, of verwijderen). Geen bevindingen: zeg dat expliciet.

- **Output-format:** lijst met bevindingen (sectie, citaat, probleem, voorstel), of een expliciete bevestiging "geen bevindingen". Bevindingen die overblijven na automatische verwerking komen als "openstaande twijfels" zichtbaar in het pack (stap 5.3), nooit stilzwijgend weggelaten.
