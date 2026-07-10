# Ticket 10: DoD-verificatie en cutover

## Doel van dit ticket
V2 vervangt het live scenario, aantoonbaar conform de hele Definition of Done, met rollback paraat en de laatste beveiligingsactie (token-rotatie) afgerond.

## Hoort bij
Spec 7 (volledige DoD) en 3.9; fasering cutover. DoD-punten 14, 16 en 17.

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: (1) alle DoD-punten langslopen, punt voor punt waar/niet-waar, met bewijs (testruns, screenshots, connectie-audit); (2) registry- en teamconfig-tabs van de sandbox-kopie naar de live sheet; (3) go van Hidde; (4) V2 activeren, oude scenario deactiveren maar bewaren als rollback; (5) direct daarna het oude hardcoded Monday-token roteren (niet eerder: live gebruikt het tot de cutover); (6) de eerste echte partner-run tegen de verificatielijst controleren; (7) alles loggen in Onboarding-Aanpassingen-Overzicht.md.

## Klaar wanneer
- [ ] Elke regel van de Definition of Done in spec sectie 7 is waar, met bewijs.
- [ ] V2 draait live; het oude scenario staat uit maar is binnen minuten te heractiveren (rollback beschreven).
- [ ] Het oude Monday-token is geroteerd en aantoonbaar ongeldig.
- [ ] De eerste echte partner-onboarding na cutover is gecontroleerd en compleet.
- [ ] Besluiten en wijzigingen gelogd; de blueprint-exports in de repo zijn ververst als snapshot van de nieuwe situatie.

## Afhankelijk van
Alle voorgaande tickets. Expliciete go van Hidde (poortje fase 6).
