# Ticket 01: Playbook-kopieerstap schrappen (live + sandbox)

## Doel van dit ticket
Nieuwe partners krijgen geen blinde kopie meer van het Strategy Playbook op dag 0 (geen waarde, vertrouwelijkheidsrisico: niet-geschoonde klantdata). Besluit stond al vast (Aanpassingen #1, 2026-07-09), dit ticket voert het uit.

## Hoort bij
Spec 3.3, fasering plak 0. Aanpassingen-Overzicht punt 1. DoD-punt 10 (deels).

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: de playbook-kopieermodules verwijderen in alle 5 growth-routes van zowel live 3059444 als sandbox 6226897 (Rho heeft deze stap niet), via het echte Make-scenario (nooit de blueprint-exports in de repo bewerken). Ook de bijbehorende GPT-module voor playbook-tekst kan mee (die output landt nergens anders); dat controleren voor verwijdering.

## Klaar wanneer
- [ ] Een sandbox-testrun levert het pakket zonder playbook-kopie, verder compleet.
- [ ] De stap is uit beide scenario's (5 growth-routes), geverifieerd in Make zelf.
- [ ] Status van Aanpassingen-Overzicht punt 1 staat op Gedaan, met datum.

## Afhankelijk van
Go van Hidde voor de live-wijziging. Kan samen met of direct na ticket 00.
