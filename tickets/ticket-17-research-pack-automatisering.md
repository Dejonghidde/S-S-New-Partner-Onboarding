# Ticket 17: Research Pack v2: automatisch getriggerd (GATED)

## Gate
Dit ticket start pas als: (1) minstens drie packs volgens het v1-proces zijn opgeleverd en bruikbaar bevonden (ticket 16), en (2) Hidde expliciet go geeft. Niet eerder oppakken; het format moet eerst uitkristalliseren voordat er infrastructuur omheen komt.

## Doel van dit ticket
Elke nieuwe partner krijgt zonder menselijke trigger binnen een werkdag een Research Pack in de partnermap, met een bewaakt review-item en een seintje aan het team.

## Hoort bij
Masterplan fase 2, stap 2.4 (pijlers P1 en P2 structureel).

## Context voor de sessie (op hoofdlijnen, uitwerken bij start)
- Lees eerst: ticket 16-resultaten (template, opdracht, go/no-go-advies), masterplan stap 2.4, en het antwoord op Hiddes interne vraag over bestaande n8n-research-flows.
- Platformkeuze is open: Make (sluit aan op de bestaande flow), de Cloudflare Worker (service-account-patroon bestaat al), of n8n (als er intern al research-flows draaien die hergebruikt kunnen worden). Kies op basis van wat er dan ligt; hergebruik gaat voor nieuwbouw.
- Architectuurrichting: partner-run (scenario 6525431) triggert na het aanmaken van de partnermap de research (webhook of module), de research-agent vult het template en schrijft het doc in de partnermap, daarna: Monday-subitem "Research pack: reviewen" aangemaakt, seintje in het interne teamkanaal met de doc-link, registry-veld bijgewerkt.
- Menselijke review blijft verplicht voordat het pack in de kickstart gebruikt wordt; automatisering vervangt de check niet.

## Klaar wanneer (concept, aanscherpen bij start)
- [ ] Testpartner krijgt zonder menselijke trigger een pack binnen een werkdag.
- [ ] Review-subitem en teamseintje werken; falen van de research geeft een foutmelding volgens het bestaande onerror-patroon (geen stille uitval).
- [ ] Kosten per run en foutgedrag gedocumenteerd.
- [ ] Gelogd en gecommit.

## Afhankelijk van
Ticket 16 (drie bewezen packs) plus expliciete go van Hidde. Ticket 11 (subitem-patroon).
