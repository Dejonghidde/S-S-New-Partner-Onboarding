# Welcome email — EN (module 34)

For scenario 6525431, module "Send email to partner (EN)" (34). Placeholders are live Make variables; see the table below for the full list and where each value comes from. Does not apply to Rho/GLJ (module 56, separate and simpler).

```html
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#F2F2F2;">
<div style="display:none;max-height:0;overflow:hidden;">Four steps to get started with {{2.company}}: DPA, questionnaire, Drive folder and platform access.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

<!-- HEADER -->
<tr><td style="background:#000000;padding:36px 60px 32px 60px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="border-top:2px solid #B2FA63;font-size:0;line-height:0;"> </td>
</tr></table>
</td></tr>

<!-- HERO -->
<tr><td style="background:#000000;padding:0 40px 44px 40px;">
<h1 style="margin:0;color:#FFFFFF;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:30px;line-height:1.15;font-weight:bold;text-transform:uppercase;">Welcome, {{2.company}}</h1>
</td></tr>

<!-- BODY INTRO -->
<tr><td style="background:#FFFFFF;padding:44px 40px 32px 40px;">
<p style="margin:0 0 20px 0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;">Hi {{2.firstName}},</p>
<p style="margin:0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;">We look forward to working with <strong>{{2.company}}</strong>. To get the partnership off to a good start, we need four things from you, outlined below.</p>
</td></tr>

<!-- JOURNEY TRACK -->
<tr><td style="background:#FFFFFF;padding:0 40px 36px 40px;">
<p style="margin:0 0 14px 0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Where we stand</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
<td width="25%" align="center" style="padding:0 4px;">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td width="10" height="10" style="background:#DADADA;font-size:0;line-height:0;"> </td></tr></table>
<p style="margin:8px 0 0 0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.4;">Contract signed</p>
</td>
<td width="25%" align="center" style="padding:0 4px;border-left:1px solid #EEEEEE;border-right:1px solid #EEEEEE;">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td width="10" height="10" style="background:#B2FA63;font-size:0;line-height:0;"> </td></tr></table>
<p style="margin:8px 0 0 0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:bold;line-height:1.4;">Onboarding</p>
</td>
<td width="25%" align="center" style="padding:0 4px;border-right:1px solid #EEEEEE;">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td width="10" height="10" style="background:#DADADA;font-size:0;line-height:0;"> </td></tr></table>
<p style="margin:8px 0 0 0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.4;">Growth audit</p>
</td>
<td width="25%" align="center" style="padding:0 4px;">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td width="10" height="10" style="background:#DADADA;font-size:0;line-height:0;"> </td></tr></table>
<p style="margin:8px 0 0 0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.4;">Strategy session</p>
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
<a href="{{973.webViewLink}}" style="color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;">Sign the data processing agreement</a>
<p style="margin:6px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;">Sets out our data processing agreements under the GDPR. Required before we can start.</p>
</td>
</tr>

<tr>
<td width="40" valign="top" style="padding:20px 16px 24px 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="32" height="32" align="center" valign="middle" style="background:#B2FA63;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#000000;">2</td></tr></table>
</td>
<td valign="top" style="padding:20px 0 24px 0;border-bottom:1px solid #EEEEEE;">
<a href="{{2.qPath}}{{965.id}}" style="color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;">Tell us about {{2.company}}</a>
<p style="margin:6px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;">The answers form the basis for the first growth audit.</p>
</td>
</tr>

<tr>
<td width="40" valign="top" style="padding:20px 16px 24px 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="32" height="32" align="center" valign="middle" style="background:#B2FA63;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#000000;">3</td></tr></table>
</td>
<td valign="top" style="padding:20px 0 24px 0;border-bottom:1px solid #EEEEEE;">
<a href="{{966.webViewLink}}" style="color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;">Check out your shared Drive folder</a>
<p style="margin:6px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;">This is where we exchange documents, briefings and materials throughout the partnership.</p>
</td>
</tr>

<tr>
<td width="40" valign="top" style="padding:20px 16px 0 0;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="32" height="32" align="center" valign="middle" style="background:#B2FA63;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;color:#000000;">4</td></tr></table>
</td>
<td valign="top" style="padding:20px 0 0 0;">
<a href="{{972.webViewLink}}" style="color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;">Grant us access to your platforms</a>
<p style="margin:6px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;">This guide describes, per platform, how to grant us access so we can carry out the work for you.</p>
</td>
</tr>

</table>
</td></tr>

<!-- NEXT STEP -->
<tr><td style="background:#FFFFFF;padding:0 40px 8px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2F2F2;">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 8px 0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:bold;line-height:1.5;">What happens now</p>
<p style="margin:0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.55;">Our team sets up your environment as soon as the four steps above are in. Within 3 to 5 working days we will reach out to schedule the kickstart.</p>
</td></tr>
</table>
</td></tr>

<!-- WELCOME VIDEO PLACEHOLDER -->
<!--
  Reserved video block, not yet visible (Bart's welcome video, see tickets/README.md welkomstvideo section).
  Once the video is ready: thumbnail + play icon + link here, between NEXT STEP and SIGN OFF.
-->

<!-- SIGN OFF -->
<tr><td style="background:#FFFFFF;padding:28px 40px 44px 40px;">
<p style="margin:0 0 4px 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;">{{961.leadName}} is your fixed point of contact and owns the entire onboarding. If anything stalls or takes too long, email <a href="mailto:{{961.leadEmail}}" style="color:#111111;font-weight:bold;text-decoration:underline;">{{961.leadEmail}}</a>.</p>
<p style="margin:16px 0 0 0;color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.5;">Talk soon,</p>
<p style="margin:0;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;font-weight:bold;">Team Sprints & Sneakers</p>
</td></tr>

<!-- FOOTER -->
<tr><td style="background:#000000;padding:28px 60px 0 60px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="border-top:2px solid #B2FA63;font-size:0;line-height:0;"> </td>
</tr></table>
</td></tr>
<tr><td style="background:#000000;padding:24px 40px 8px 40px;" align="center">
<p style="margin:0;color:#8A8A8A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;">Sprints & Sneakers B.V. · Duivendrechtsekade 80B, 1096 AH Amsterdam</p>
</td></tr>
<tr><td style="background:#000000;padding:8px 40px 32px 40px;" align="center">
<p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.6;">
<a href="https://www.facebook.com/sprintsandsneakers" style="color:#B2FA63;text-decoration:none;">Facebook</a>
<span style="color:#555555;"> · </span>
<a href="https://www.instagram.com/sprintsandsneakers" style="color:#B2FA63;text-decoration:none;">Instagram</a>
<span style="color:#555555;"> · </span>
<a href="https://www.youtube.com/@sprintsandsneakers" style="color:#B2FA63;text-decoration:none;">YouTube</a>
<span style="color:#555555;"> · </span>
<a href="https://www.tiktok.com/@sprintsandsneakers" style="color:#B2FA63;text-decoration:none;">TikTok</a>
</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>
```

## Variables in this email

| Variable                | Meaning                                                                                                                                                                      | Source                                             |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `{{2.company}}`       | Partner's company name                                                                                                                                                       | Intake form, module 2                              |
| `{{2.firstName}}`     | First name of the contact person                                                                                                                                             | Intake form, module 2                              |
| `{{2.qPath}}`         | Base URL of the questionnaire:`.../b2b?c=` for B2B, `.../?c=` for B2C. Automatically determines which questionnaire the partner sees, without the copy itself differing. | Derived in module 2 from the`partner_type` field |
| `{{965.id}}`          | Project folder ID, appended to`qPath` so the questionnaire opens pre-linked to the right partner                                                                           | Module 965 (Drive folder creation)                 |
| `{{973.webViewLink}}` | Link to the DPA (data processing agreement)                                                                                                                                  | Module 973 (DPA document creation)                 |
| `{{966.webViewLink}}` | Link to the partner's shared Drive folder                                                                                                                                    | Module 966 (Drive folder creation)                 |
| `{{972.webViewLink}}` | Link to the Tooling Access Guide                                                                                                                                             | Module 972                                         |
| `{{961.leadName}}`    | Name of the account lead, determined per team (Sigma/Alpha/Phi/Kappa/Gamma)                                                                                                  | Module 961 (Lead contact per team)                 |
| `{{961.leadEmail}}`   | Account lead's email address; also set as the reply-to of the email                                                                                                          | Module 961                                         |

## Notes on this version

- One continuous, clean structure: header, hero, short intro, progress track, four numbered actions, "what happens now" block, ownership sign-off, footer with socials. No stray or redundant text above the hero.
- No em-dashes, no arrow glyphs, no AI-slop.
- B2B and B2C get identical copy; the distinction runs solely through `{{2.qPath}}`, which links to the correct questionnaire automatically. No duplicate copy to maintain.
- Preheader text added (hidden `div` right after `<body>`) so the inbox preview shows something meaningful instead of a random first line of HTML.
- Sign-off explicitly names the account lead as the fixed owner (instead of the noncommittal "any questions?"), followed by a fixed "what happens now" block with the kickstart timeline from the spec (3 to 5 working days).
- Video placeholder as an HTML comment block, not yet visible, ready for once Bart's welcome video exists.
