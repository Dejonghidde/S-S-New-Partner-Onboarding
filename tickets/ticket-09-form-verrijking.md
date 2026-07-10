# Ticket 09: Intake-form verrijken (zachte poort)

## Doel van dit ticket
De intake levert voortaan alles wat de keten nodig heeft: partner_type, taal, contactpersonen en de verplichte assignment letter en handover, die de flow als kopie in de partnermap bewaart. Ontbreekt iets, dan is dat zichtbaar in plaats van stil.

## Hoort bij
Spec 3.1, beslislog #8; fasering plak 5. DoD-punt 11.

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: het Slack-form (workflow) uitbreiden met partner_type (B2B/B2C), taal (NL/EN) en contactpersoon-e-mails; assignment letter en handover als verplichte velden. De flow kopieert beide documenten naar de partnermap (let op: bronnen wisselen, HubSpot-links met verloopdatum kunnen niet blind gekopieerd; dan de link in de registry en het gemis-mechanisme gebruiken). Zachte poort: bij een ontbrekend of onbruikbaar veld start de flow, markeert het gemis in registry en Monday en meldt het aan de starter.

## Klaar wanneer
- [ ] Nieuwe velden landen in de Form Responses-tab en de registry.
- [ ] Testrun met complete input: assignment letter en handover staan als kopie of vastgelegde link in de partnermap.
- [ ] Testrun met ontbrekend veld: run draait door, gemis gemarkeerd en gemeld aan de starter.
- [ ] partner_type stuurt aantoonbaar de juiste vragenlijst-link (B2C-root of /b2b).

## Afhankelijk van
Ticket 04 (route), ticket 03 (registry). Beheerrechten op de Slack-workflow.
