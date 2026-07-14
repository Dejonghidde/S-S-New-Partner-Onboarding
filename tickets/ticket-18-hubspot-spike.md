# Ticket 18: Spike: onboarding-trigger vanuit HubSpot bij getekend contract

## Doel van dit ticket
Feitelijk vaststellen of en hoe de onboarding automatisch kan starten op het moment dat een deal in HubSpot gewonnen wordt: welke trigger, welke velden zijn dan betrouwbaar gevuld, wat mist er, en wie beheert de koppeling. Output is een beslisdocument met veldmapping en een go/no-go-advies. Geen bouw.

## Hoort bij
Masterplan fase 3, stap 3.1 (pijlers P1 en P4). Barts wens: "idealiter onboarding afvuren bij tekenen contract". Benchmark Springbok (start vóór of bij de handtekening).

## Context voor de sessie
- Lees eerst: masterplan fase 3 en de intake-veldenlijst die de flow nodig heeft (module 2 in scenario 6525431): company, firstName, email, phone, team, letter (assignment letter), handover, startedBy, partner_type, taal, contactEmails.
- HubSpot is expliciet een latere fase in spec deel 1 (beslissing destijds: form blijft de bron); Barts feedback van 2026-07-13 is de aanleiding om dit nu te onderzoeken. Het Slack-form blijft sowieso bestaan als handmatige start en fallback.
- Onderzoek alleen, read-only: niets aanmaken of wijzigen in HubSpot zonder go.

## Opdracht
1. Stel vast welke deal-stage of eigenschap het startsein is ("Closed Won" of een expliciete "start onboarding"-stap; vraag Bart welke stage het tekenmoment het best markeert).
2. Audit per benodigd intake-veld: bestaat er een HubSpot-property voor, is die op het tekenmoment betrouwbaar gevuld (steekproef op de laatste 5 tot 10 gewonnen deals), en zo nee: kan sales het verplicht vullen of blijft het een zachte-poort-gat.
3. Onderzoek de technische opties: HubSpot-workflow met webhook naar Make, versus de native Make-HubSpot-triggermodule (welke connectie/rechten, wie beheert, wat gebeurt er bij dubbele triggers of heropende deals; idempotentie: een deal mag maar één onboarding starten).
4. Bepaal de dedupe-strategie: hoe voorkomt de flow een dubbele run als iemand daarnaast het Slack-form invult (aanbevolen richting: registry-check op bedrijfsnaam plus melding in plaats van stille tweede run).
5. Schrijf het beslisdocument: veldmapping-tabel (HubSpot-property naar form-veld, gevuld ja/nee, actie), triggerkeuze met motivatie, beheerder, risico's, en go/no-go-advies. Leg vast als `Onboarding workflow/HubSpot-Trigger-Beslisdocument.md` en leg het voor aan Bart/Gijs.

## Poortjes (alleen met go van Hidde)
- Elke wijziging in HubSpot zelf (properties, workflows): niet in deze spike.

## Klaar wanneer
- [ ] Beslisdocument compleet: veldmapping met steekproef-onderbouwing, triggerkeuze, dedupe-strategie, beheerder, go/no-go-advies.
- [ ] Voorgelegd aan Bart/Gijs; hun reactie verwerkt of als open punt gelogd.
- [ ] Gelogd en gecommit.

## Afhankelijk van
HubSpot-leestoegang (via geautoriseerde sessie of iemand die meekijkt; geen tokens plakken). Geen bouw-afhankelijkheden.
