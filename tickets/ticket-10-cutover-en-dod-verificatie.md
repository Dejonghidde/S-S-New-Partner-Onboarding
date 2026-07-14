# Ticket 10: DoD-verificatie en cutover

## Doel van dit ticket
V2 vervangt het live scenario, aantoonbaar conform de hele Definition of Done, met rollback paraat en de laatste beveiligingsactie (token-rotatie) afgerond.

## Hoort bij
Spec 7 (volledige DoD) en 3.9; fasering cutover. DoD-punten 14, 16 en 17.

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: (1) alle DoD-punten langslopen, punt voor punt waar/niet-waar, met bewijs (testruns, screenshots, connectie-audit); (2) registry- en teamconfig-tabs van de sandbox-kopie naar de live sheet; (3) go van Hidde; (4) V2 activeren, oude scenario deactiveren maar bewaren als rollback; (5) direct daarna het oude hardcoded Monday-token roteren (niet eerder: live gebruikt het tot de cutover); (6) de eerste echte partner-run tegen de verificatielijst controleren; (7) alles loggen in Onboarding-Aanpassingen-Overzicht.md.

## Restpunten uit de blueprint-analyse (2026-07-14, masterplan sectie 2): mee in de verificatie
- [ ] R1: De routes "Copy assignment letter" en "Copy handover" staan `disabled` terwijl de registry GEKOPIEERD kan rapporteren. Activeren en testen, of de registry-tekst kloppend maken.
- [ ] R2: Module "Create partner board (per type)" gebruikt een hardcoded board-id (18401703415) in de GraphQL-mutatie; de variabele `templateId` (B2B/B2C) wordt genegeerd. Fixen: `{{2.templateId}}` (met fallback) in de mutatie.
- [ ] R3: Drive-shares (DPA, SHARED-map) staan op `sendNotificationEmail: true`. Besluit: uitzetten (spec 3.4) of bewust accepteren tot ticket 08; loggen.
- [ ] R4: Drive-modules op persoonsgebonden connecties (Hidde Gmail, Sharif Gmail voor DPA-map) en Monday-module 1023 op Sharifs connectie. Bewuste interim-keuzes expliciet loggen.
- [ ] R5: Lead-naam/-e-mail per team zit hardcoded in switch-module 961 in plaats van in de Teamconfig-tab (kolommen bestaan). Verplaatsen naar Teamconfig of bewust laten en loggen.
- [ ] R6: Slack-form: assignment letter en handover verplicht maken (restant ticket 09).

## Klaar wanneer
- [ ] Elke regel van de Definition of Done in spec sectie 7 is waar, met bewijs.
- [ ] Restpunten R1 t/m R6 zijn gefixt of hebben elk een gelogd besluit.
- [ ] V2 draait live; het oude scenario staat uit maar is binnen minuten te heractiveren (rollback beschreven).
- [ ] Het oude Monday-token is geroteerd en aantoonbaar ongeldig.
- [ ] De eerste echte partner-onboarding na cutover is gecontroleerd en compleet.
- [ ] Besluiten en wijzigingen gelogd; de blueprint-exports in de repo zijn ververst als snapshot van de nieuwe situatie.

## Afhankelijk van
Alle voorgaande tickets. Expliciete go van Hidde (poortje fase 6).
