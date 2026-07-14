# Ticket 16: Partner Research Pack v1 (template, research-opdracht, testrun)

## Doel van dit ticket
Alles wat uit de vragenlijst is geschrapt komt voortaan uit een vast Partner Research Pack: een gestructureerd document per partner in de partnermap, gevuld door AI-research met bronvermelding en een menselijke check. V1 is een herhaalbaar proces, nog geen automatisering.

## Hoort bij
Masterplan fase 2, stap 2.2 (pijlers P2 en P1; Barts kwaliteitseis: data-analyse in plaats van gut feeling). Voedt ticket 13 (aannames bevestigen in de kickstart) en wordt geautomatiseerd in ticket 17.

## Context voor de sessie
- Lees eerst: masterplan stap 2.2 en 2.3, en de output van ticket 15 (lijst "gaat naar research pack"). Is ticket 15 nog niet af, gebruik dan de Bart-tabel uit het masterplan als voorlopige dekkingslijst.
- Check eerst intern of er al bruikbare research-flows bestaan (Hidde heeft dit in Slack uitgevraagd, o.a. n8n-opzet bij collega's); hergebruik gaat voor nieuw maken. Verwerk het antwoord in de aanpak.
- Bronnen zonder partner-input: website van de partner (propositie, doelgroep, zichtbare funnel, tags in de HTML), Meta Ad Library, Google Ads Transparency Center, TikTok Ad Library, LinkedIn-bedrijfspagina, reviewplatforms (Google, Trustpilot), SEO-tooling, HubSpot-dealdata en het contract.
- Het pack is intern werkmateriaal; het gaat nooit ongereviewd naar de partner.

## Opdracht
1. Ontwerp het pack-template als markdown/Google Doc met vaste secties: basisgegevens; bedrijfsprofiel en propositie; markt en directe concurrenten; actieve advertentiekanalen; zichtbare tech-stack en tracking-indicaties; social-aanwezigheid; online reputatie; SEO/organisch profiel; zichtbare funnel en klantreis; visuele eerste indruk (voorlopig beeld, geen vervanging van het echte brandbook). Per gegeven: bron plus zekerheidsniveau (vastgesteld / waarschijnlijk / aanname). Slotsectie: de drie tot vijf aannames die de partner in de kickstart moet bevestigen.
2. Schrijf de vaste research-opdracht: een herbruikbare, parametriseerbare opdracht (bedrijfsnaam, website, type B2B/B2C) die een AI-research-agent het template laat vullen, met de instructie per bron en de eis van bronvermelding en zekerheidsniveau. Leg vast in `Onboarding workflow/Research-Pack-Template-en-Opdracht.md`.
3. Beschrijf het v1-proces in hetzelfde document: trigger (accountlead of Hidde start de research zodra de onboarding loopt), doorlooptijd (pack binnen 1 werkdag), review (teamlid checkt en markeert het pack als gereviewd), locatie en naamconventie in de partnermap ("{{bedrijfsnaam}} | Research Pack | S&S").
4. Draai de testrun op twee partners (recente echte partners of een testcase met een echt bedrijf): lever twee packs op in de betreffende partnermap.
5. Haal feedback op bij minstens een teamlid dat er een audit mee zou starten en verwerk die in template en opdracht.

## Poortjes (alleen met go van Hidde)
- Geen: alles is intern. Wel de vaste regel: geen pack of pack-inhoud richting de partner zonder menselijke review.

## Klaar wanneer
- [ ] Template plus research-opdracht plus procesbeschrijving vastgelegd in de repo.
- [ ] Twee packs opgeleverd in partnermappen, met bronnen en zekerheidsniveaus, gereviewd.
- [ ] Dekking gecheckt tegen de ticket-15-lijst: elk geschrapt onderwerp heeft een plek in het pack.
- [ ] Teamfeedback verwerkt; go/no-go-advies voor automatisering (ticket 17) opgeschreven.
- [ ] Gelogd en gecommit.

## Afhankelijk van
Ticket 15 (dekkingslijst) wenselijk maar niet blokkerend. Antwoord op Hiddes interne n8n-vraag meenemen zodra beschikbaar.
