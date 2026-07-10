# Ticket 01: Playbook-kopieerstap schrappen (live + sandbox)

## Doel van dit ticket
Nieuwe partners krijgen geen blinde kopie meer van het Strategy Playbook op dag 0 (geen waarde, vertrouwelijkheidsrisico: niet-geschoonde klantdata). Besluit stond al vast (Aanpassingen #1, 2026-07-09), dit ticket voert het uit.

## Hoort bij
Spec 3.3, fasering plak 0. Aanpassingen-Overzicht punt 1. DoD-punt 10 (deels).

## Aanpak (agent vult in, Hidde keurt goed)
**Eerst verwijderen en verifiëren in sandbox `6226897`.** Live `3059444` verwerkt doorlopend echte onboardingen en wordt tijdens de bouw niet aangeraakt, ook niet read-only. Voorstel: de playbook-kopieermodules verwijderen in alle 5 growth-routes (Rho heeft deze stap niet), via het echte Make-scenario (nooit de blueprint-exports in de repo bewerken). Ook de bijbehorende GPT-module voor playbook-tekst kan mee (die output landt nergens anders); dat controleren voor verwijdering. Dezelfde verwijdering op live 3059444 is een aparte, latere stap: per wijziging met go van Hidde, op een moment dat hij kiest.

## Klaar wanneer
- [ ] Een testrun in **6226897** levert het pakket zonder playbook-kopie, verder compleet, in alle 5 routes.
- [ ] (Aparte, latere stap) Dezelfde verwijdering is doorgevoerd op live 3059444, met go van Hidde, op een moment dat hij kiest.
- [ ] Status van Aanpassingen-Overzicht punt 1 staat op Gedaan, met datum.

## Afhankelijk van
Niets voor de bouw in 6226897 (kan direct). Voor live 3059444: go van Hidde én een apart, door hem gekozen moment (niet automatisch gelijktijdig met de sandbox-wijziging).
