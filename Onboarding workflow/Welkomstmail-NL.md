# Welkomstmail — NL (module 33)

Voor scenario 6525431, modules "Send email to partner (NL)" (33). Placeholders zijn live Make-variabelen; zie de tabel onderaan voor de volledige lijst en waar elke waarde vandaan komt. Geldt niet voor Rho/GLJ (module 56, apart en eenvoudiger).

```html
<!DOCTYPE html>
<html lang="nl">
<body style="margin:0;padding:0;background:#F2F2F2;">
<div style="display:none;max-height:0;overflow:hidden;">Vier stappen om te starten met {{2.company}}: DPA, vragenlijst, Drive-map en platformtoegang.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

<!-- HEADER -->
<tr><td style="background:#000000;padding:36px 60px 32px 60px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="border-top:2px solid #B2FA63;font-size:0;line-height:0;">&nbsp;</td>
</tr></table>
</td></tr>

<!-- HERO -->
<tr><td style="background:#000000;padding:0 40px 44px 40px;">
<h1 style="margin:0;color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:30px;line-height:1.15;font-weight:bold;text-transform:uppercase;">Welkom, {{2.company}}</h1>
</td></tr>

<!-- BODY INTRO -->
<tr><td style="background:#FFFFFF;padding:44px 40px 32px 40px;">
<p style="margin:0 0 20px 0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;">Hi {{2.firstName}},</p>
<p style="margin:0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;">We kijken ernaar uit om met <strong>{{2.company}}</strong> samen te werken. Om de samenwerking goed te starten hebben we vier zaken van jullie nodig, hieronder toegelicht.</p>
</td></tr>

<!-- JOURNEY TRACK -->
<tr><td style="background:#FFFFFF;padding:0 40px 36px 40px;">
<p style="margin:0 0 14px 0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Waar we nu staan</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td width="25%" align="center" style="padding:0 4px;">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td width="10" height="10" style="background:#DADADA;font-size:0;line-height:0;">&nbsp;</td></tr></table>
<p style="margin:8px 0 0 0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.4;">Contract getekend</p>
</td>
<td width="25%" align="center" style="padding:0 4px;border-left:1px solid #EEEEEE;border-right:1px solid #EEEEEE;">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td width="10" height="10" style="background:#B2FA63;font-size:0;line-height:0;">&nbsp;</td></tr></table>
<p style="margin:8px 0 0 0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:bold;line-height:1.4;">Onboarding</p>
</td>
<td width="25%" align="center" style="padding:0 4px;border-right:1px solid #EEEEEE;">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td width="10" height="10" style="background:#DADADA;font-size:0;line-height:0;">&nbsp;</td></tr></table>
<p style="margin:8px 0 0 0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.4;">Growth audit</p>
</td>
<td width="25%" align="center" style="padding:0 4px;">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td width="10" height="10" style="background:#DADADA;font-size:0;line-height:0;">&nbsp;</td></tr></table>
<p style="margin:8px 0 0 0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.4;">Strategiesessie</p>
</td>
</tr>
</table>
</td></tr>

<!-- 4 ACTIONS -->
<tr><td style="background:#FFFFFF;padding:8px 40px 12px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">

<tr>
<td width="40" valign="top" style="padding:0 16px 24px 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="32" height="32" align="center" valign="middle" style="background:#B2FA63;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#000000;">1</td></tr></table>
</td>
<td valign="top" style="padding:0 0 24px 0;border-bottom:1px solid #EEEEEE;">
<a href="{{973.webViewLink}}" style="color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;">Onderteken de verwerkersovereenkomst</a>
<p style="margin:6px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;">Legt de afspraken over gegevensverwerking vast conform de AVG. Voorwaarde om te kunnen starten.</p>
</td>
</tr>

<tr>
<td width="40" valign="top" style="padding:20px 16px 24px 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="32" height="32" align="center" valign="middle" style="background:#B2FA63;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#000000;">2</td></tr></table>
</td>
<td valign="top" style="padding:20px 0 24px 0;border-bottom:1px solid #EEEEEE;">
<a href="{{2.qPath}}{{965.id}}" style="color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;">Vertel ons over {{2.company}}</a>
<p style="margin:6px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;">De antwoorden vormen de basis voor de eerste growth audit.</p>
</td>
</tr>

<tr>
<td width="40" valign="top" style="padding:20px 16px 24px 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="32" height="32" align="center" valign="middle" style="background:#B2FA63;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#000000;">3</td></tr></table>
</td>
<td valign="top" style="padding:20px 0 24px 0;border-bottom:1px solid #EEEEEE;">
<a href="{{966.webViewLink}}" style="color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;">Bekijk jullie gedeelde Drive-map</a>
<p style="margin:6px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;">Hier wisselen we gedurende de samenwerking documenten, briefings en materiaal uit.</p>
</td>
</tr>

<tr>
<td width="40" valign="top" style="padding:20px 16px 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="32" height="32" align="center" valign="middle" style="background:#B2FA63;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#000000;">4</td></tr></table>
</td>
<td valign="top" style="padding:20px 0 0 0;">
<a href="{{972.webViewLink}}" style="color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;">Geef ons toegang tot jullie platforms</a>
<p style="margin:6px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;">Deze gids beschrijft per platform hoe je ons toegang verleent, zodat we het werk voor jullie kunnen uitvoeren.</p>
</td>
</tr>

</table>
</td></tr>

<!-- NEXT STEP -->
<tr><td style="background:#FFFFFF;padding:0 40px 8px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 8px 0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;line-height:1.5;">Wat er nu gebeurt</p>
<p style="margin:0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.55;">Ons team richt jullie omgeving in zodra de vier stappen hierboven binnen zijn. Binnen 3 tot 5 werkdagen nemen we contact op om de kickstart in te plannen.</p>
</td></tr>
</table>
</td></tr>

<!-- WELCOME VIDEO PLACEHOLDER -->
<!--
  Video-blok reserveren, nog niet zichtbaar (Bart's welkomstvideo, zie tickets/README.md sectie welkomstvideo).
  Zodra de video klaar is: thumbnail + play-icon + link hier tussen NEXT STEP en SIGN OFF.
-->

<!-- SIGN OFF -->
<tr><td style="background:#FFFFFF;padding:28px 40px 44px 40px;">
<p style="margin:0 0 4px 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;">{{961.leadName}} is jullie vaste aanspreekpunt en bewaakt de hele onboarding. Loopt iets vast of duurt iets te lang, mail <a href="mailto:{{961.leadEmail}}" style="color:#111111;font-weight:bold;text-decoration:underline;">{{961.leadEmail}}</a>.</p>
<p style="margin:16px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;">Tot snel,</p>
<p style="margin:0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;">Team Sprints &amp; Sneakers</p>
</td></tr>

<!-- FOOTER -->
<tr><td style="background:#000000;padding:28px 60px 0 60px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="border-top:2px solid #B2FA63;font-size:0;line-height:0;">&nbsp;</td>
</tr></table>
</td></tr>
<tr><td style="background:#000000;padding:24px 40px 8px 40px;" align="center">
<p style="margin:0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;">Sprints &amp; Sneakers B.V. &middot; Duivendrechtsekade 80B, 1096 AH Amsterdam</p>
</td></tr>
<tr><td style="background:#000000;padding:8px 40px 32px 40px;" align="center">
<p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;">
<a href="https://www.facebook.com/sprintsandsneakers" style="color:#B2FA63;text-decoration:none;">Facebook</a>
<span style="color:#555555;"> &middot; </span>
<a href="https://www.instagram.com/sprintsandsneakers" style="color:#B2FA63;text-decoration:none;">Instagram</a>
<span style="color:#555555;"> &middot; </span>
<a href="https://www.youtube.com/@sprintsandsneakers" style="color:#B2FA63;text-decoration:none;">YouTube</a>
<span style="color:#555555;"> &middot; </span>
<a href="https://www.tiktok.com/@sprintsandsneakers" style="color:#B2FA63;text-decoration:none;">TikTok</a>
</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>
```

## Variabelen in deze mail

| Variabele | Betekenis | Bron |
|---|---|---|
| `{{2.company}}` | Bedrijfsnaam van de partner | Intake-form, module 2 |
| `{{2.firstName}}` | Voornaam van de contactpersoon | Intake-form, module 2 |
| `{{2.qPath}}` | Basis-URL van de vragenlijst: `.../b2b?c=` voor B2B, `.../?c=` voor B2C. Bepaalt zo automatisch welke vragenlijst de partner ziet, zonder dat de mailcopy zelf verschilt. | Afgeleid in module 2 uit het veld `partner_type` |
| `{{965.id}}` | Project-map-ID, achter `qPath` geplakt zodat de vragenlijst voorgesorteerd opent op de juiste partner | Module 965 (Drive-map aanmaken) |
| `{{973.webViewLink}}` | Link naar de DPA (verwerkersovereenkomst) | Module 973 (DPA-document aanmaken) |
| `{{966.webViewLink}}` | Link naar de gedeelde Drive-map van de partner | Module 966 (Drive-map aanmaken) |
| `{{972.webViewLink}}` | Link naar de Tooling Access Guide | Module 972 |
| `{{961.leadName}}` | Naam van de accountlead, per team bepaald (Sigma/Alpha/Phi/Kappa/Gamma) | Module 961 (Lead-contact per team) |
| `{{961.leadEmail}}` | E-mailadres van de accountlead; ook ingesteld als reply-to van de mail | Module 961 |

## Toelichting op deze versie

- Eén doorlopende, opgeruimde structuur: header, hero, korte intro, voortgangstrack, vier genummerde acties, "wat er nu gebeurt"-blok, eigenaarschap-sign-off, footer met socials. Geen losse of overbodige teksten boven de hero.
- Geen em-dashes, geen pijl-tekens, geen AI-slop.
- B2B en B2C krijgen dezelfde tekst; het onderscheid loopt uitsluitend via `{{2.qPath}}`, dat automatisch naar de juiste vragenlijst linkt. Geen dubbele copy-onderhoud nodig.
- Preheader-tekst toegevoegd (verborgen `div` direct na `<body>`) zodat de inbox-preview iets zinnigs toont in plaats van de eerste toevallige regel HTML.
- Sign-off benoemt de accountlead expliciet als vaste eigenaar (in plaats van het vrijblijvende "heb je vragen?"), gevolgd door een vast "wat gebeurt er nu"-blok met de kickstart-termijn uit de spec (3 tot 5 werkdagen).
- Video-placeholder als HTML-commentaarblok, nog niet zichtbaar, klaar voor zodra Bart's welkomstvideo er is.
