# Ticket 05: Uitrol naar alle growth-teams + Rho omhangen

## Doel van dit ticket
De generieke route werkt voor alle vijf growth-teams (als configregels), en de Rho-tak draait op dezelfde betrouwbare connecties zonder functionele wijziging.

## Hoort bij
Spec 3.2 (Rho apart, betrouwbaarheid mee), beslislog #3 en #12; fasering plak 3. DoD-punten 1 en 8 (alle teams).

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: teamconfig valideren per team en testruns draaien voor Sigma, Phi, Gamma, Kappa en Alpha; bekende kopieerbugs verdwijnen vanzelf door de consolidatie (Phi's dubbele bedrijfsnaam, Kappa's rauwe kolomreferenties). Daarna de Rho-tak: zelfde stappen als nu (functioneel bevroren), maar connecties omgehangen, onerror-alert erbij, registry-write erbij, en de mail voorbereid op een stabiel Good Life Jobs-afzendadres (definitieve afzender in ticket 08).

## Klaar wanneer
- [ ] Sandbox-testrun per growth-team slaagt volledig (verificatielijst per team afgevinkt).
- [ ] Rho-testrun levert het bestaande Rho-pakket zonder persoonsgebonden connecties, met alert en registry-rij.
- [ ] Geen hardcoded Monday-token meer in de sandbox (nieuw token als connectie; rotatie van het oude volgt bij de cutover).
- [ ] Alle zes teams staan als regel in de teamconfig; geen route-kopieën meer in V2.

## Afhankelijk van
Ticket 04.
