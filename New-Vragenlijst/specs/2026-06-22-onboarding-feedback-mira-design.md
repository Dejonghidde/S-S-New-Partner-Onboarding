# Onboarding-vragenlijst — verwerking feedback Mira (leadership2026)

**Datum:** 2026-06-22
**Bron:** Feedback Mira Ahles in Slack #leadership2026 (11 juni), akkoord Bart.
**Scope:** Beide pagina's volledig — B2C ([public/index.html](../../../public/index.html)) en B2B ([public/b2b.html](../../../public/b2b.html)).

## Beslissingen (met Hidde afgestemd)

1. **Tussenpagina's:** auto-doorspring van 5 → **10 seconden** (geen handmatige-only).
2. **Funnel:** vervangen door S&S **AAARRR / Pirate Funnel** (bron: `Growth Audit 3.0 _ AAARRR funnel.docx`).
3. **Capabilities-vervolgvragen:** verbreden naar alle kanalen (niet alleen influencers).
4. **Scope:** beide pagina's volledig.

## Wijzigingen — overkoepelend (B2C + B2B)

- **Contrast.** `--text-low #4A4A4A → #757575`, `--text-mid #8A8A8A → #ABABAB`. B2B light-thema `.section-sub #AAAAAA → #6B6B6B` (+ eventuele andere lichte low-contrast overrides).
- **Bridge-timer.** `elapsed/5000 → /10000`, `>= 5000 → >= 10000`, countdown-start `5 → 10` (zowel statische SVG-tekst als JS-reset en `Math.ceil`).
- **Jaartal.** Hardcoded "2029" → dynamisch `new Date().getFullYear() + 3` via een span-id, op load gezet.

## Wijzigingen — B2C ([public/index.html](../../../public/index.html))

- **Customer:** secundaire customer-vraag toevoegen onder de primaire.
- **Brand:** sub-kop → "How your customers see you, and how you want to be felt."
- **Capabilities-tabel:**
  - Voorbeelden weg achter Paid Social en Paid Search.
  - `SEO / Content → SEO / GEO`
  - `Creative / Video → Content: organic / ads`
  - `Email & SMS → Retentie / Mail / SMS / WhatsApp`
  - `CRO / Experimentation → CRO / Website`
  - `Analytics & Data → Analytics / Data`, rij tussen de andere i.p.v. als laatste.
  - **+4 rijen:** Organic socials · Affiliate / Marketplaces · Branding / Communication · Referral / Community.
- **Capabilities-vervolgvragen:** verbreden van influencer-only naar alle externe groeipartnerschappen (creator, affiliate, marketplace, referral).
- **Funnel → AAARRR.** Opties: Awareness · Acquisition · Activation · Revenue · Retention · Referral (+ "meerdere stages"), met korte uitleg per stage. **Extra vraag:** "Wat is nu je sterkste onderdeel in de funnel?" (radio `funnel_strength`, toevoegen aan collect-array).
- **Ad-platforms:** + Microsoft Advertising, LinkedIn, X, Amazon Ads, Bol.com Ads, affiliate-platforms.
- **Cadans:** keuze weekly/bi-weekly/monthly → vaste sprint-cadans (wekelijkse check-in + maandelijkse strategische review); optioneel voorkeursmoment behouden. `cadence` uit collect-array.

## Wijzigingen — B2B ([public/b2b.html](../../../public/b2b.html))

- Cadans (`b8_5`) → zelfde vaste sprint-cadans.
- Ad-/kanalenlijst: B2B-relevante toevoegingen (Microsoft Advertising, X) naast bestaande LinkedIn/Google/Meta.
- Vervolgvragen verbreden + AAARRR-terminologie aanlijnen waar de pipeline-sectie een stage-vraag stelt.

## Technische aandachtspunten

- Nieuwe `<input>/<select>` met `id` worden automatisch verzameld (`collectAnswers`) en in de samenvatting opgenomen (`answerHtml`/`buildAnswersHTML`).
- Nieuwe radio-groepen (`funnel_strength`) expliciet toevoegen aan de radio-collect-array.
- Capabilities-tabel-rijen worden generiek uitgelezen in `answerHtml` — nieuwe rijen komen vanzelf mee.
