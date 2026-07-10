# Ticket 08: Partnermail via Brevo als het ene touchpoint

## Doel van dit ticket
De partner krijgt op dag 1 precies één verzorgd, on-brand bericht met tijdpad en de juiste links, van een stabiel adres op naam van de accountlead, in de eigen taal.

## Hoort bij
Spec 3.4, beslislog #10; fasering plak 5. DoD-punten 9 en 13.

## Aanpak (agent vult in, Hidde keurt goed)
Voorstel: Brevo-afzender opzetten (SPF/DKIM op het S&S-domein; apart GLJ-afzendadres voor Rho), mailtemplates NL en EN schrijven volgens de ss-brand-style skill (geen em-dashes, geen AI-slop), met tijdpad (nu, deze week, kickstart), links naar DPA, juiste vragenlijst (B2B/B2C met ?c) en shared folder. De mailmodules in de sandbox omzetten van Gmail naar Brevo; het partner-e-mailadres 1-op-1 uit het form. De drie sendNotificationEmail-vlaggen op de Drive-shares uit. Verouderde Tooling guide-PDF en gamma.app-links eruit.

## Klaar wanneer
- [ ] Testmail in NL en EN ontvangen: juiste afzendernaam, reply-to accountlead, tijdpad, drie werkende links, on-brand copy.
- [ ] Het ontvangeradres is byte-gelijk aan het form-veld (geen transformatie ertussen).
- [ ] Testrun geeft geen losse Google-share-notificaties meer.
- [ ] Rho-testmail komt van het GLJ-adres.
- [ ] Copy gecontroleerd op em-dashes en slop voordat Hidde hem ziet.

## Afhankelijk van
Ticket 05. Brevo-domeinauthenticatie en GLJ-afzenddomein (actie Hidde, open vraag uit de spec).
