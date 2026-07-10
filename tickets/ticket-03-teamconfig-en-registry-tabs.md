# Ticket 03: Teamconfig-tab en registry-tab in de beheersheet

## Doel van dit ticket
De twee datastructuren bestaan waar de nieuwe flow op leunt: een teamconfiguratie-tab (teamverschillen als data in plaats van zes gekopieerde routes) en een registry-tab (machinebron per partner).

## Hoort bij
Spec 3.2 en 3.5, beslislog #3 en #6, fasering plak 2 (voorbereiding).

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: kolommenschema's ontwerpen en ter goedkeuring voorleggen; daarna aanmaken in een sandbox-kopie van de sheet "Onboarding new partner" (niet in de live sheet tot de cutover). Teamconfig: per team Slack-userlijsten, teamlead-DM-doel, Drive-parent-folder, Monday folder-id, subscribers, board-template-id (let op: Alpha wijkt af, 18086982 vs 18084016, bewust of erfenis navragen). Registry: folder-ids, links, partner_type, taal, statusvelden van de checklist uit spec 3.5 plus een gereserveerde maturity-scan-kolom. De bestaande "Monday users"-tab blijft en wordt bron voor de user-mapping.

## Klaar wanneer
- [ ] Kolommenschema's voor beide tabs goedgekeurd door Hidde.
- [ ] Tabs aangemaakt in de sandbox-kopie; teamconfig gevuld voor alle 6 teams op basis van de blueprint-waarden.
- [ ] Actualiteit van teamleads en subscribers gecheckt bij Hidde (verouderde Slack-accounts zijn blokkade B).
- [ ] De registry dekt elk checklist-item uit spec 3.5.

## Afhankelijk van
Ticket 02 (niet hard, kan parallel). Input van Hidde over actuele teamleads.
