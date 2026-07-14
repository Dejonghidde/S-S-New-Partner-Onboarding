---
type: beslisdocument
project: New Partner Onboarding
ticket: 18
status: Ter review bij Bart/Gijs
opgesteld: 2026-07-14
---

# HubSpot-trigger bij getekend contract: beslisdocument (ticket 18)

Spike, read-only onderzoek: geen wijzigingen aangebracht in HubSpot. Onderzoek uitgevoerd via de Make-HubSpot-connectie "Hubspot | Bob S&S" (leestoegang: pipelines, deal/contact/company-properties, een steekproef van 7 recent gewonnen deals in de meest waarschijnlijke pipeline).

## 1. Welke stage is het startsein?

HubSpot heeft **meerdere sales-pipelines**, elk met een eigen "Closed Won"-stage:

| Pipeline | Pipeline-ID | Closed-won stage-ID | Relevant voor nieuwe groei-partners? |
|---|---|---|---|
| **S&S NL - Sales Pipeline** | 10598459 | **10598465** | **Ja — hoofdkandidaat.** Naam matcht S&S/NL, generieke funnel (Identification → In contact → Salesmeeting → Conceptvoorstel → Def proposal sent → Closed won/lost). |
| S&S KT - Sales Pipeline | 820236455 | 1212119950 | Mogelijk (andere merknaam/afdeling "KT"), navragen bij Bart. |
| AI-agent Pipeline | 820812139 | 1213354538 | Apart product, waarschijnlijk niet dezelfde onboarding-flow. |
| Impact new business | 9908584 | 32870520 | Andere merklijn "Impact", waarschijnlijk niet. |
| New Tides - Pipeline | 39824312 | 84168504 | Ander sub-merk, waarschijnlijk niet. |
| Storylabs SEO Engine | 79877134 | 151067549 | Ander product, waarschijnlijk niet. |
| GLJ Deal Pipeline | 821739594 | 1214773628 | "Good Life Jobs" (recruitment-merk), niet deze onboarding. |
| S&S The new pipline | 890269055 | 1341411077 | Generieke Engelse default-namen, typo in pipeline-naam — lijkt net aangemaakt/ongebruikt. |
| Overig (renewals, festival-sponsoring, hiring-test, HubSpot Shared Selling) | — | — | Expliciet niet van toepassing (geen nieuwe partner-onboarding). |

**Open vraag voor Bart:** triggert de flow alleen op "S&S NL - Sales Pipeline", of ook op "S&S KT - Sales Pipeline"? Dit bepaalt of de trigger op één stage-ID of op meerdere let. Voorlopig advies: begin met alleen de S&S NL-pipeline (de duidelijkste match); KT later toevoegen als blijkt dat daar ook groei-partners doorheen lopen.

## 2. Veldaudit

Steekproef: de 7 meest recent gewonnen deals in S&S NL - Sales Pipeline (stage 10598465), aflopend op sluitingsdatum (2025-07-17 t/m 2025-12-12).

| Intake-veld | HubSpot-bron | Gevuld in steekproef | Oplosbaar? |
|---|---|---|---|
| company | `company.name` via deal-associatie | 7/7, maar **1 van de 7 deals had een foutief gekoppelde company** (Springer Nature-deal wees naar "Coinmerce") | Ja, met een sanity-check op de associatie (bv. company.domain niet leeg) |
| firstName | `contact.firstname` | 7/7 | Ja |
| email | `contact.email` | 7/7 | Ja |
| phone | `contact.phone` / `contact.mobilephone` | 6/7 | Ja, met company.phone als fallback |
| team | Geen direct veld. Kandidaat: `company.growth_hack_cell` (custom property, bestaat) | **0/7 gevuld** | Alleen als sales dit verplicht gaat invullen vóór closed-won; nu een structureel gat |
| letter (assignment letter, Drive-link) | **Geen enkele bron** in deal/contact/company | n.v.t. | Blijft een gat — dit komt nooit uit HubSpot, alleen via het bestaande proces (Slack-form/handmatig) |
| handover (Drive-link) | **Geen enkele bron** | n.v.t. | Blijft een gat, zelfde als hierboven |
| startedBy | Geen direct veld. `hubspot_owner_id` (deal-eigenaar) is een indirecte proxy | n.v.t. | Alleen als aanname (eigenaar = starter), niet gegarandeerd correct — aanbeveling: vast op "HubSpot" zetten (systeem-trigger), niet een persoonsnaam raden |
| partner_type (B2B/B2C) | `company.b2b_b2c` (custom property, bestaat) | 3/7 gevuld, 4/7 leeg | Deels oplosbaar door verplicht te maken vóór closed-won; anders default naar B2B (huidige meerderheid) met zachte-poort-melding |
| taal (NL/EN) | `contact.hs_language` bestaat, maar is een standaard HubSpot-veld voor marketing-mailvoorkeur, niet 1-op-1 hetzelfde doel | **0/7 gevuld** | In de praktijk een gat; default naar "NL" (S&S's hoofdmarkt) |
| contactEmails (meerdere contacten) | Technisch haalbaar (deal kan meerdere gekoppelde contacts hebben, op te halen via associaties) | Niet gemeten in de steekproef (alleen het eerste contact bekeken) | Waarschijnlijk haalbaar, vulgraad per deal niet apart geverifieerd — meenemen in de bouwfase |

**Tussenstand:** van de 11 velden zijn er 4 in de praktijk vandaag structureel leeg vanuit HubSpot (letter, handover, team, taal) en 2 deels onbetrouwbaar (partner_type, startedBy). Dit is precies het scenario waarvoor de zachte-poort-aanpak (spec deel 1, beslissing 8) al bestaat: de flow start ook mét gaten, het gemis wordt zichtbaar in plaats van de run te blokkeren — exact hetzelfde gedrag als nu al geldt voor een onvolledig ingevuld Slack-form.

**Extra datakwaliteitsrisico gevonden (niet in de opdracht gevraagd, wel relevant):** één deal in de steekproef heette letterlijk "DELETE" en stond gewoon in de closed-won-stage van de productiepipeline. Een trigger die blind op stage-verandering afgaat, zou hierop óók een onboarding gestart hebben. Zie risico's hieronder.

## 3. Technische opties

**Optie A — HubSpot-workflow met webhook naar Make (aanbevolen).**
HubSpot's eigen workflow-automation is specifiek gebouwd voor "wanneer deal stage X bereikt, doe Y", vuurt precies één keer af bij het bereiken van de stage (niet bij elke wijziging), en kan een custom webhook aanroepen. Make ontvangt dat via een generieke webhook-trigger.
- Voordeel: de filterlogica (welke stage, welke pipeline) leeft in HubSpot zelf, overzichtelijk voor wie het beheert; geen risico op dubbele triggers door irrelevante deal-updates.
- Nadeel: vereist een nieuwe HubSpot-workflow aanmaken (wijziging in HubSpot, dus een apart poortje per de ticket-regels).

**Optie B — Native Make HubSpot-trigger (`hubspotcrm:WatchCRMObjects`).**
Make's HubSpot-app heeft geen dedicated "stage changed"-trigger (dat bestaat wel bij andere CRM's zoals Pipedrive, niet bij dit HubSpot-pakket); `WatchCRMObjects` triggert op elke create/update van een CRM-object en vereist dan een downstream filter in Make op `dealstage = 10598465` én `pipeline = 10598459`.
- Voordeel: geen wijziging in HubSpot nodig, alles blijft in Make.
- Nadeel: triggert op élke deal-wijziging (ook niet-stage-gerelateerde), dus meer ruis en meer kans op een gemiste of dubbele match als de polling-cadans niet fijn genoeg is.

**Advies: optie A.** Preciezer, minder ruis, en het past bij hoe HubSpot dit soort automations zelf bedoelt. Vereist wel de HubSpot-workflow-wijziging, dus een go van Hidde per wijziging (conform de regels) plus praktisch: iemand met workflow-rechten in HubSpot (Bart/Gijs/Bob) om 'm aan te maken.

## 4. Dedupe-strategie

Aanbevolen (uit de ticket-opdracht, hier bevestigd als haalbaar): vóór het schrijven van een nieuwe rij een **Registry-check op bedrijfsnaam**. Bestaat er al een rij met (nagenoeg) dezelfde bedrijfsnaam, dan schrijft de flow geen tweede rij maar stuurt een melding ("dubbele start voor X, gecontroleerd of dit bewust is") naar het interne kanaal in plaats van een stille tweede onboarding-run.

Dit is exact hetzelfde technische patroon (item/rij opzoeken op naam vóór een actie) dat al gebouwd en getest is in ticket 11 (Client overview-item opzoeken) en het ticket-19-scaffold (zie hieronder) — geen nieuw risico, wel nog te bouwen als losse, geteste stap in het echte scenario.

## 5. Wat al gebouwd en getest is (vooruitlopend, in de test-omgeving)

Los van de HubSpot-trigger zelf is de architectuur "minimale ingreep: schrijf een rij in de Form Responses-tab met `Submitted By = HubSpot`" al gebouwd en getest (ticket 19-scaffold, 2026-07-14): een testrij met de bevestigde velden (company, firstName, email, phone, partner_type, taal) en lege waarden voor de bevestigde gaten (team, letter, handover) is succesvol weggeschreven naar een testkopie van de Form Responses-structuur. De dedupe-vertakking zelf is nog niet als geteste module gebouwd.

## 6. Risico's

1. **Foutieve company-koppeling** (1 van 7 in de steekproef): een trigger zou een onboarding voor de verkeerde partner kunnen starten. Mitigatie: sanity-check op `company.domain` niet leeg, en de bestaande zachte-poort-melding maakt een foute start zichtbaar in plaats van stil.
2. **Test/rommeldeals in de echte closed-won-stage** (de "DELETE"-deal): een naïeve trigger zou hierop ook afgaan. Mitigatie: geen harde technische oplossing gevonden in dit onderzoek; wel een proceswaarschuwing waard richting sales (closed-won-stage schoonhouden) en eventueel een minimale sanity-check (bedrijfsnaam niet leeg/niet "test"/"delete" e.d.) als extra vangnet.
3. **Vier structurele veld-gaten** (letter, handover, team, taal): worden opgevangen door de bestaande zachte-poort-aanpak, dus geen blokkade, wel iets voor het team om te wennen dat een HubSpot-gestarte onboarding vaker een "ontbrekende info"-subitem krijgt dan een form-gestarte.
4. **`startedBy`-onbetrouwbaarheid**: geen betrouwbare bron voor wie de onboarding startte. Advies: vaste waarde "HubSpot" i.p.v. een gegokte naam.
5. **Meerdere pipelines**: scope-beslissing nodig (zie sectie 1) om te voorkomen dat andere merklijnen (Impact, GLJ, Storylabs, New Tides) onterecht deze onboarding-flow triggeren.

## 7. Beheerder

Wie de HubSpot-workflow (optie A) beheert en wie de Make-koppeling onderhoudt, is nog niet belegd — voorstel: dezelfde persoon/rol die nu de HubSpot-pipeline-inrichting beheert (Bart/Gijs/Bob), met Hidde als vangnet voor de Make-kant, zelfde patroon als de rest van V1.

## 8. Go/no-go-advies

**Voorwaardelijk GO**, met drie voorwaarden vóór bouw (ticket 19):
1. Bart bevestigt de scope: alleen S&S NL - Sales Pipeline, of ook KT.
2. Akkoord op optie A (HubSpot-workflow-webhook) inclusief wie 'm in HubSpot aanmaakt.
3. Akkoord dat de vier veld-gaten (letter, handover, team, taal) via de bestaande zachte poort lopen, niet via een nieuwe blokkade.

Technisch is het minst-invasieve pad (rij in Form Responses, geen wijziging aan de generieke route zelf) al bewezen haalbaar in de test-omgeving.

## Openstaand

Voorgelegd aan Bart/Gijs: nog te doen (dit document is klaar voor die review). Reactie hier bijwerken zodra ontvangen.
