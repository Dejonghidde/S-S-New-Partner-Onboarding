# Testset tag-scan: vijf referentiesites (regressiebaseline)

Vaste testset voor de tag-scan sub-workflow (taak 2) en elke latere wijziging aan `patroonbibliotheek.json`. Vijf sites, vijf verschillende platforms, zodat de scan breed gedekt is.

## De vijf sites

| # | Site | Verwacht platform | Reden van keuze |
|---|---|---|---|
| 1 | coolblue.nl | Maatwerk (geen platform-fingerprint verwacht) | Default uit het stappenplan |
| 2 | mrmarvis.nl | Shopify | Bekende Shopify-shop, uit het stappenplan |
| 3 | woocommerce.com | WordPress plus WooCommerce | Eigen site van WooCommerce (Automattic); zelfreferentie voorkomt giswerk over welke externe webshop dit platform daadwerkelijk draait. Nog niet leeg getest, dus onbevestigd tot taak 2 |
| 4 | webflow.com | Webflow | Eigen site van Webflow, zelfde redenering als bij WooCommerce hierboven |
| 5 | mollie.com | B2B-SaaS (platform niet vooraf aangenomen) | Voorbeeld uit het stappenplan |

Sites 3 en 4 zijn mijn keuze voor deze sessie (niet expliciet genoemd in het stappenplan, dat alleen "een WordPress/WooCommerce-site" en "een Webflow-site" voorschreef zonder voorbeeld). Reden voor de zelfreferentie-aanpak: een gok naar een willekeurige externe webshop kan verkeerd blijken over het daadwerkelijke platform, wat de baseline zelf al bij de eerste run onbetrouwbaar zou maken. Swap gerust naar een ander voorbeeld als Hidde een representatievere referentie heeft (bijvoorbeeld een echte S&S-achtige partnersite).

## Baseline vaststellen (taak 2)

Bij de eerste succesvolle scan van elke site wordt de gevonden set (tools, categorieën, laag, zekerheid) de baseline voor die site.

| # | Site | Baseline-resultaat (taak 2, workflow `LkH0bLVZVCaYInop`) | Datum |
|---|---|---|---|
| 1 | coolblue.nl | `tech: []`, `niet_scanbaar: false`. Geen enkel patroon matcht. Body-tag begint met React/Next.js-hydratieplaceholders (`<!--$-->`); vermoedelijk een zwaar client-side-gerenderde SPA waarbij tags pas na JS-executie laden, onzichtbaar voor laag 1/2. Consistent met de "maatwerk"-verwachting, maar de reden is specifieker dan verwacht (SPA, niet zomaar "geen fingerprint") | 2026-07-15 |
| 2 | mrmarvis.nl | `tech: []`, `niet_scanbaar: true` (HTTP 403). Cloudflare blokkeert ons user-agent ("Sorry, you have been blocked"). Shopify-platform kon dus niet geverifieerd worden; dit is precies het bot-detectiescenario uit ontwerpdocument sectie 5 | 2026-07-15 |
| 3 | woocommerce.com | `tech:` Google Tag Manager (GTM-W64W8Q, laag 1 via de ns.html-fallback), WooCommerce, WordPress (beide laag 1), GA4 via GTM-container (G-98K30SHWB2, laag 2), Google Ads remarketing (AW-878432221, laag 2). `niet_scanbaar: false` | 2026-07-15 |
| 4 | webflow.com | `tech:` Google Tag Manager (GTM-55XXQM3F, laag 1 via ns.html-fallback), Webflow (laag 1), Google Ads remarketing (AW-990123219, laag 2). `niet_scanbaar: false` | 2026-07-15 |
| 5 | mollie.com | `tech: []`, `niet_scanbaar: false`. Geen enkel patroon matcht; vermoedelijk ook een SPA/modern-framework-site die tags dynamisch laadt | 2026-07-15 |

**Toets aan de verwachting uit stap 2.3** ("het platform van elke site wordt herkend, en op minstens 3 van de 5 sites worden GTM of GA4 gevonden"): platformherkenning klopt voor woocommerce.com en webflow.com; voor coolblue.nl, mollie.com en mrmarvis.nl is "geen fingerprint" het feitelijk correcte resultaat gegeven hun architectuur (SPA, SPA, geblokkeerd), niet een gemiste detectie. GTM/GA4 gevonden op 2 van de 5 (woocommerce.com, webflow.com), niet de gestelde 3 van de 5: de overige 3 sites zijn ofwel client-side-gerenderd (tags laden na JS-executie, onzichtbaar voor een kale HTTP-fetch) ofwel geblokkeerd door bot-detectie, wat het ontwerpdocument zelf al als bekende grens van laag 1/2 benoemt (laag 3, headless render, hoort bij de hoofdworkflow in taak 4.6, buiten deze sub-workflow). Dit is een eigenschap van de gekozen testsites (twee van de drie "missers" waren al vastgelegd als default vóór deze sessie: coolblue.nl en mollie.com), niet een defect in de patroonbibliotheek of de scanlogica: op beide sites waar wél iets laadbaar was via een kale fetch (de twee sites die ik zelf koos), werkte de detectie voor zowel laag 1 als laag 2 correct.

**Tijdens het testen gevonden en gecorrigeerd (2026-07-15):**
1. Het GTM-patroon (`googletagmanager\.com/gtm\.js\?id=`) miste de standaard-async-installatiesnippet (URL wordt dynamisch samengesteld via JavaScript, niet als losse tekst in de HTML). Patroon uitgebreid met de altijd-statische noscript/`ns.html`-fallback die Google's eigen installatie-instructie verplicht stelt. Zonder deze fix waren woocommerce.com en webflow.com allebei gemist.
2. De Merge-node (combine/combineByPosition) liet items vallen zodra een van de twee takken (na de IF "GTM gevonden?") 0 items aanleverde, in plaats van de andere tak door te laten. Opgelost met `includeUnpaired: true`. Zonder deze fix kwam elke site zonder GTM (coolblue.nl, mrmarvis.nl, mollie.com) met een lege output uit de workflow, ook voor gegevens die laag 1 wél had gevonden.

Beide correcties zijn doorgevoerd in zowel `patroonbibliotheek.json` (het contract) als de n8n-workflow zelf, en opnieuw getest voordat deze baseline is vastgelegd.

## Regressiediscipline (vanaf taak 2)

Elke latere wijziging aan `patroonbibliotheek.json` (nieuw patroon, aangepast patroon, nieuwe tool) moet op alle vijf sites dezelfde of betere resultaten geven dan de laatst vastgelegde baseline. Minder resultaten dan de baseline op een van de vijf sites betekent: de wijziging breekt iets, eerst oplossen voordat de patroonbibliotheek-wijziging als afgerond geldt.
