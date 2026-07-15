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

Bij de eerste succesvolle scan van elke site wordt de gevonden set (tools, categorieën, laag, zekerheid) de baseline voor die site. Baseline hieronder invullen zodra taak 2 draait:

| # | Site | Baseline-resultaat (taak 2) | Datum |
|---|---|---|---|
| 1 | coolblue.nl | | |
| 2 | mrmarvis.nl | | |
| 3 | woocommerce.com | | |
| 4 | webflow.com | | |
| 5 | mollie.com | | |

Verwachting uit het stappenplan (stap 2.3): het platform van elke site wordt herkend, en op minstens 3 van de 5 sites worden GTM of GA4 gevonden.

## Regressiediscipline (vanaf taak 2)

Elke latere wijziging aan `patroonbibliotheek.json` (nieuw patroon, aangepast patroon, nieuwe tool) moet op alle vijf sites dezelfde of betere resultaten geven dan de laatst vastgelegde baseline. Minder resultaten dan de baseline op een van de vijf sites betekent: de wijziging breekt iets, eerst oplossen voordat de patroonbibliotheek-wijziging als afgerond geldt.
