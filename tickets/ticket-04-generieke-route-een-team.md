# Ticket 04: Generieke growth-route end-to-end voor één team

## Doel van dit ticket
Het dunne plakje dat de hele keten raakt: één testrij in het form leidt in de sandbox tot het volledige pakket voor één team, via de nieuwe generieke route op password-onafhankelijke connecties, met fallback en foutmelding.

## Hoort bij
Spec 3.2, 3.3, 3.7, 3.9; fasering plak 2. DoD-punten 1 t/m 4 en 8 (voor één team).

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: in sandbox 6226897 de nieuwe route bouwen die zijn teamwaarden uit de teamconfig-tab leest (voorstel testteam: Kappa, dat is al de aangepaste testroute). Alle Google-acties via de in ticket 02 bewezen methode, Slack via bot-token, Monday via een nette token-connectie (nieuw token; het oude hardcoded token pas roteren bij de cutover, anders breekt live). GPT-modules vervangen door deterministische functies. Fallback-route op de router met melding. Onerror-handlers naar het alertkanaal. Registry-rij schrijven.

## Klaar wanneer
- [ ] Testrun levert het volledige pakket uit spec 3.3 per verificatielijst, binnen 15 minuten.
- [ ] Nul persoonsgebonden connecties en nul OpenAI-modules in de route.
- [ ] Een run met onbekende teamnaam geeft een fallback-melding, geen stille halve run.
- [ ] Een geforceerde fout geeft een melding met partnernaam en oorzaak in het alertkanaal.
- [ ] De registry-rij is compleet en correct voor de testpartner.

## Afhankelijk van
Tickets 02 en 03.
