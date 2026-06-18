# Build public/b2b.html from the B2C shell + Gijs's B2B questions (basics trimmed, with bridges).
import re

src = open("public/index.html", encoding="utf-8").read()

# --- split: keep head (through welcome) + tail (thank-you onward); replace the middle ---
i1 = src.index("SECTION 1: YOUR CUSTOMER"); head = src[: src.rfind("<!--", 0, i1)]
i2 = src.index('<div class="step" id="step-10">'); tail = src[src.rfind("<!--", 0, i2):]

TOTAL = 11

def qta(qid, label, hint="", ph="", tall=False):
    h = f'\n      <p class="q-hint">{hint}</p>' if hint else ""
    cls = ' class="tall"' if tall else ""
    return f'''    <div class="q-block">
      <p class="q-label">{label}</p>{h}
      <textarea id="{qid}"{cls} placeholder="{ph}"></textarea>
    </div>'''

def qinput(qid, label, hint="", ph="", typ="text"):
    h = f'\n      <p class="q-hint">{hint}</p>' if hint else ""
    return f'''    <div class="q-block">
      <p class="q-label">{label}</p>{h}
      <input type="{typ}" id="{qid}" placeholder="{ph}">
    </div>'''

def qinline(base, label, hint="", ph=""):
    h = f'\n      <p class="q-hint">{hint}</p>' if hint else ""
    return f'''    <div class="q-block">
      <p class="q-label">{label}</p>{h}
      <div class="inline-fields">
        <div class="inline-row"><span class="inline-num">1</span><input type="text" id="{base}a" placeholder="{ph}"></div>
        <div class="inline-row"><span class="inline-num">2</span><input type="text" id="{base}b"></div>
        <div class="inline-row"><span class="inline-num">3</span><input type="text" id="{base}c"></div>
      </div>
    </div>'''

def qstack(label, hint, rows):
    h = f'\n      <p class="q-hint">{hint}</p>' if hint else ""
    rws = "\n".join(f'        <div class="stack-row"><span class="stack-label">{lab}</span><input type="text" id="{rid}" placeholder="{ph}"></div>' for lab, rid, ph in rows)
    return f'''    <div class="q-block">
      <p class="q-label">{label}</p>{h}
      <div style="margin-top:4px">
{rws}
      </div>
    </div>'''

def qradio(name, label, hint, opts, note_id=None, note_label=""):
    h = f'\n      <p class="q-hint">{hint}</p>' if hint else ""
    os_ = "\n".join(f'        <div class="opt" onclick="selectOpt(this,\'{name}\')"><input type="radio" name="{name}" value="{v}"><label>{t}</label></div>' for v, t in opts)
    note = f'\n      <p class="q-hint" style="margin-top:10px">{note_label}</p>\n      <input type="text" id="{note_id}" placeholder="">' if note_id else ""
    return f'''    <div class="q-block">
      <p class="q-label">{label}</p>{h}
      <div class="options">
{os_}
      </div>{note}
    </div>'''

def qcheck(name, label, hint, opts):
    h = f'\n      <p class="q-hint">{hint}</p>' if hint else ""
    os_ = "\n".join(f'        <div class="opt" onclick="toggleOpt(this)"><input type="checkbox" name="{name}" value="{v}"><label>{t}</label></div>' for v, t in opts)
    return f'''    <div class="q-block">
      <p class="q-label">{label}</p>{h}
      <div class="options">
{os_}
      </div>
    </div>'''

DIV = '    <hr class="divider">'

UPLOAD = '''    <div class="q-block">
      <p class="q-label">Or upload your brand, proof and enablement files directly.</p>
      <p class="q-hint">Drop in whatever you've got, we'd rather have too much than too little. Large files are welcome.</p>
      <div class="upload-examples">
        <div class="ue-col">
          <span class="ue-head">Brand &amp; guidelines</span>
          <ul><li>Brand book / style guide</li><li>Logo files (SVG, PNG, EPS)</li><li>Fonts</li><li>Tone-of-voice</li></ul>
        </div>
        <div class="ue-col">
          <span class="ue-head">Proof &amp; cases</span>
          <ul><li>Case studies</li><li>ROI / results data</li><li>Reference list</li><li>Testimonials</li></ul>
        </div>
        <div class="ue-col">
          <span class="ue-head">Sales enablement</span>
          <ul><li>Pitch decks</li><li>One-pagers</li><li>Battlecards</li><li>Demo recordings</li></ul>
        </div>
        <div class="ue-col">
          <span class="ue-head">Legal &amp; compliance</span>
          <ul><li>Security / DPA package</li><li>Claims you can / can't make</li><li>Certifications</li><li>Required disclaimers</li></ul>
        </div>
      </div>
      <div class="dropzone" id="dropzone" tabindex="0" role="button" aria-label="Upload files">
        <input type="file" id="fileInput" multiple hidden>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 16v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/></svg>
        <p class="dz-title">Drag &amp; drop files here, or <span class="dz-link">browse</span></p>
        <p class="dz-sub">Any format. Large files (200&nbsp;MB+) welcome.</p>
      </div>
      <div class="file-list" id="fileList"></div>
    </div>'''

def section(num, headline, sub, blocks):
    return f'''
<!-- ══ SECTION {num}: {headline.upper()} ══ -->
<div class="step" id="step-{num}" data-section="{num}">
  <div class="content-wrap">
    <div class="section-tag">
      <span class="section-num">{num:02d}</span>
      <span class="section-of">of {TOTAL}</span>
    </div>
    <h2 class="section-headline">{headline}</h2>
    <p class="section-sub">{sub}</p>

{blocks}
  </div>
</div>
'''

def bridge(num, eyebrow, title, body, nextlabel):
    return f'''
<!-- BRIDGE {num} -->
<div class="bridge-step" id="bridge-{num}">
  <div class="bridge-wrap" data-num="{num:02d}">
    <div class="bridge-timer">
      <svg class="countdown-svg" width="50" height="50" viewBox="0 0 50 50">
        <circle class="ring-bg" cx="25" cy="25" r="19" fill="none" stroke-width="2.5"/>
        <circle class="ring-fg" id="ring-{num}" cx="25" cy="25" r="19" fill="none" stroke-width="2.5"
          stroke-dasharray="119.38" stroke-dashoffset="0" transform="rotate(-90 25 25)"/>
        <text class="countdown-num" id="num-{num}" x="25" y="25">5</text>
      </svg>
      <span class="bridge-timer-label">Moving on automatically…</span>
    </div>
    <p class="bridge-eyebrow">{eyebrow}</p>
    <h2 class="bridge-title">{title}</h2>
    <p class="bridge-body">{body}</p>
    <button class="btn-bridge" onclick="advanceBridge({num})">{nextlabel} →</button>
  </div>
</div>
'''

S = []  # (headline, sub, blocks)

# 1 Offering & Commercial Model
S.append(("Offering &amp; Commercial Model", "What you sell, what it costs, and how the money flows in.", "\n\n".join([
    qta("b1_1", "Which single offer or product line drives most of your revenue today?", "", "e.g. Our core SaaS platform on annual contracts; services are a small add-on."),
    qstack("Your commercial snapshot for that core offering.", "Rough figures are fine.", [
        ("ACV", "b1_2a", "e.g. €24k average annual contract value"),
        ("Sales cycle", "b1_2b", "e.g. 8–12 weeks"),
        ("Gross margin", "b1_2c", "e.g. high (~80%)"),
        ("Pricing model", "b1_2d", "e.g. per-seat subscription"),
    ]),
    DIV,
    qta("b1_3", "What problem does your core offering solve, in your best customers' own words?", "Their phrasing, from calls or reviews, not the marketing version.", "e.g. \"We stopped losing deals because finance could finally see margin per project in real time.\""),
    qta("b1_4", "When prospects don't buy from you, what do they usually do instead?", "Build it internally, stick with the status quo, pick a cheaper competitor, go with a full-stack incumbent?", "e.g. Most stick with spreadsheets for another year, or pick a cheaper point tool that they outgrow."),
])))

# 2 ICP, Accounts & DMU
S.append(("ICP, Accounts &amp; Decision-Making Unit", "Who you sell to, who signs, and who can kill the deal.", "\n\n".join([
    qta("b2_1", "Describe your best-fit account.", "Industry, size (FTEs and revenue), region, tech stack, and any signals that mark a strong fit.", "e.g. B2B SaaS, 50–500 FTE, Benelux + DACH, already on HubSpot, scaling a revenue team.", tall=True),
    qta("b2_2", "Who sits in the typical buying group, and what's their role?", "List each role and tag it: Champion, Economic Buyer, Technical User, Influencer or Blocker.", "e.g. VP Marketing (Champion), CFO (Economic Buyer), RevOps lead (Technical User), CEO (Influencer), IT/security (Blocker)."),
    DIV,
    qta("b2_3", "Which industries, sizes or buyer profiles are a poor fit?", "Naming who to avoid sharpens targeting straight away.", "e.g. Sub-10-FTE startups (no budget) and heavily regulated enterprises (12-month security reviews)."),
    qinline("b2_4", "Top 3 reasons your best customers chose you.", "Use their words.", "e.g. Fastest time-to-value in the category"),
    qinline("b2_5", "Top 3 reasons deals stall or are lost.", "The real reason behind the objection, not just \"price\".", "e.g. No clear ROI case for the CFO"),
    DIV,
    qta("b2_6", "Which signal or trigger most reliably means an account is ready to talk?", "Funding round, leadership hire, job posting, tech change, regulatory shift, end of an incumbent contract.", "e.g. A new VP of Revenue in their first 90 days, or a fresh Series B."),
    qradio("b2_7", "How do you target accounts today?", "", [("named", "A named account list"), ("programmatic", "Programmatic / broad"), ("hybrid", "A mix of both")], note_id="b2_7_note", note_label="Briefly, how does that work in practice?"),
])))

# 3 Positioning & Competition
S.append(("Positioning &amp; Competition", "How the market shortlists you, and how you want to be framed.", "\n\n".join([
    qinline("b3_1", "The three competitors prospects most often shortlist you against.", "", "e.g. Incumbent X"),
    qinput("b3_2", "The single biggest reason customers pick you over them.", "One sentence. The real reason.", "e.g. We're the only one that ties marketing spend to closed revenue, not leads."),
    DIV,
    qinput("b3_3", "Your current one-line positioning statement.", "No statement yet? Write what you'd want it to be.", "e.g. The revenue platform for B2B teams that sell through complex buying groups."),
    qinput("b3_4", "If you could own one new category label in your market, what would it be?", "", "e.g. \"Revenue orchestration\""),
    qta("b3_5", "Which common industry assumption would you happily challenge in your marketing?", "The tired belief everyone repeats that you think is wrong.", "e.g. That more leads is the goal. We'd argue most pipeline is the wrong pipeline."),
])))

# 4 Acquisition Channels
S.append(("Acquisition Channels", "Where pipeline comes from today, and what stopped working.", "\n\n".join([
    qinline("b4_1", "The three channels generating the most new pipeline today, ranked.", "", "e.g. Outbound SDR"),
    qta("b4_2", "Which channels did you stop using in the past two years, and why?", "", "e.g. Dropped trade shows in 2024, cost per opportunity was triple our outbound."),
    qta("b4_3", "Your strongest message, hook or angle in market right now.", "What's working, and your best guess at why.", "e.g. A teardown of the prospect's own funnel on the first call. It earns the second meeting."),
    DIV,
    qstack("Rough split of new pipeline: inbound vs outbound.", "", [
        ("Inbound %", "b4_4a", "e.g. 40"),
        ("Outbound %", "b4_4b", "e.g. 60"),
    ]),
    qstack("Who owns each function today?", "In-house, freelance, or the agency name.", [
        ("Content", "b4_5a", "e.g. In-house, 1 writer"),
        ("Paid media", "b4_5b", "e.g. Agency — name"),
        ("SEO", "b4_5c", "e.g. Freelance"),
        ("Outbound (SDR/BDR)", "b4_5d", "e.g. In-house, 2 SDRs"),
        ("Events", "b4_5e", "e.g. Not active"),
    ]),
    qta("b4_6", "Describe your account-based marketing approach, if any.", "If you don't run ABM, just say so.", "e.g. Light ABM on ~50 target accounts: tailored LinkedIn ads plus SDR sequences. No formal scoring yet."),
])))

# 5 Pipeline & Sales Funnel
S.append(("Pipeline &amp; Sales Funnel", "The numbers between first touch and signed contract.", "\n\n".join([
    qstack("Monthly average volumes across your pipeline.", "Rough averages are fine.", [
        ("Leads", "b5_1a", ""), ("MQLs", "b5_1b", ""), ("SQLs", "b5_1c", ""),
        ("Opportunities", "b5_1d", ""), ("Won deals", "b5_1e", ""),
    ]),
    qta("b5_2", "Where do deals stall or die most often?", "The stage that worries you most, and your best guess why.", "e.g. Between demo and proposal. Champions love it but can't get the CFO to prioritise."),
    qinput("b5_3", "Win rate from SQL to closed-won (%).", "", "e.g. 22%"),
    DIV,
    qstack("Average weekly sales activity per rep.", "", [
        ("Discovery calls", "b5_4a", ""), ("Demos", "b5_4b", ""),
        ("Proposals sent", "b5_4c", ""), ("Touches per account", "b5_4d", ""),
    ]),
    qta("b5_5", "What does win/loss analysis tell you about why you win and why you lose?", "If you don't run formal win/loss, your honest read is fine.", "e.g. We win on ease of onboarding, we lose when procurement runs a feature checklist."),
    qta("b5_6", "Which capability or asset is most missing from your funnel?", "Nurture flow, demo, business-case template, ROI calculator, references, security or legal package.", "e.g. A CFO-ready ROI calculator. Champions can't sell up without it."),
])))

# 6 Retention, Expansion & Advocacy
S.append(("Retention, Expansion &amp; Advocacy", "What happens after the contract is signed.", "\n\n".join([
    qstack("Your annual churn.", "", [("Logo churn %", "b6_1a", ""), ("Revenue churn %", "b6_1b", "")]),
    qstack("Net and gross revenue retention, if you measure them.", "Leave blank if you don't track these yet.", [("NRR %", "b6_2a", ""), ("GRR %", "b6_2b", "")]),
    DIV,
    qta("b6_3", "The single most common reason customers leave.", "", "e.g. Champion changes job and the replacement never adopted it."),
    qta("b6_4", "Where's the biggest expansion opportunity in your existing book?", "Upsell tier, cross-sell module, multi-team or multi-region rollout.", "e.g. Rolling out from marketing into the sales team inside accounts we already serve."),
    qta("b6_5", "How many reference-ready customers do you have, and which two would join a case study or reference call this quarter?", "Names or accounts is all we need.", "e.g. About 8 references. Acme and Globex would both go on record."),
])))

# 7 Tech, Data & Attribution
S.append(("Tech, Data &amp; Attribution", "The plumbing that powers your growth engine.", "\n\n".join([
    qstack("Your core stack.", "Leave anything blank if you're unsure.", [
        ("CRM", "b7_1a", "e.g. HubSpot, Salesforce"),
        ("Marketing automation", "b7_1b", "e.g. HubSpot, Marketo"),
        ("Analytics", "b7_1c", "e.g. GA4, Mixpanel"),
        ("Sales engagement", "b7_1d", "e.g. Outreach, Salesloft, Apollo"),
    ]),
    DIV,
    qcheck("b7_2", "Which ad accounts are currently active?", "Select all that apply.", [
        ("linkedin", "LinkedIn"), ("google", "Google"), ("meta", "Meta"), ("other", "Other"),
    ]),
    qcheck("b7_3", "How is conversion tracking set up?", "Select everything that's live and actually working.", [
        ("ga4", "GA4"), ("serverside", "Server-side tagging"), ("metacapi", "Meta Conversions API (CAPI)"),
        ("linkedincapi", "LinkedIn Conversions API"), ("offline", "Offline conversion upload"), ("unsure", "Honestly not sure what's live"),
    ]),
    qta("b7_4", "Where does your team look for the single source of truth on pipeline and marketing performance?", "", "e.g. A Looker dashboard off the CRM. Marketing still argues with sales about attribution."),
    qta("b7_5", "The biggest data or tracking gap blocking better commercial decisions.", "", "e.g. We can't tie closed revenue back to the campaign that sourced it."),
])))

# 8 Sales & Marketing Alignment
S.append(("Sales &amp; Marketing Alignment", "How sales and marketing talk to each other, and how we plug in.", "\n\n".join([
    qta("b8_1", "How are sales and marketing structured?", "Roles, headcount (FTE) and reporting lines. A rough sketch is fine.", "e.g. CMO (1) → Demand Gen (1), Content (1). VP Sales (1) → 2 AEs, 2 SDRs. Both report to the CEO."),
    qta("b8_2", "Describe the lead handoff from marketing to sales.", "Criteria, SLA, tooling.", "e.g. MQL at score 50 routes to an SDR in HubSpot, follow-up within 24 hours. Honoured about half the time."),
    DIV,
    qta("b8_3", "What's the current state of CRM hygiene and pipeline data quality?", "Be honest, it shapes what we can trust.", "e.g. Stages are inconsistent between reps and close dates slip without updates."),
    qinput("b8_4", "Who has final sign-off on creative, messaging and budget?", "", "e.g. CMO for messaging and budget up to €10k, CEO above that."),
    qradio("b8_5", "Which meeting cadence works best to align with us?", "", [
        ("weekly", "Weekly check-in, 30 minutes"), ("biweekly", "Bi-weekly, 60 minutes"), ("monthly", "Monthly, 90-minute review"),
    ], note_id="b8_5_time", note_label="Preferred day and time (optional):"),
])))

# 9 Goals, KPIs & Constraints
S.append(("Goals, KPIs &amp; Constraints", "Where you're heading, and what's off the table.", "\n\n".join([
    qta("b9_1", "Your three-year vision.", "Where is this business in 2029 if everything goes right?", "e.g. The default revenue platform for mid-market B2B in the Benelux, €30M ARR, profitable."),
    qstack("Commercial targets for the next 12 months.", "", [
        ("Revenue / ARR", "b9_2a", "e.g. €8M ARR (+45%)"),
        ("Pipeline", "b9_2b", "e.g. €30M qualified pipeline"),
        ("New logos", "b9_2c", "e.g. 120 new logos"),
        ("NRR / expansion", "b9_2d", "e.g. NRR from 105% to 115%"),
    ]),
    qinput("b9_3", "The one metric that, if it moves, the business wins.", "One. The north star everything else serves.", "e.g. Net new ARR per quarter."),
    DIV,
    qinput("b9_4", "Realistic monthly budget for marketing and growth.", "A range is fine. It shapes sprint sizing, not a commitment.", "e.g. €30k–€50k per month."),
    qta("b9_5", "What's off-limits for compliance, legal or brand reasons?", "Claims, tactics or topics we must never touch in your name.", "e.g. No naming customers in regulated sectors. No competitor comparison ads without legal sign-off."),
])))

# 10 Brand Assets & Guardrails (+ upload)
S.append(("Brand Assets &amp; Guardrails", "What we can use on day one, and what we must never touch.", "\n\n".join([
    qinput("b10_1", "Where can we access your brand guidelines?", "A shareable link works (Drive, Figma, Notion), or upload the files below.", "https://…", typ="url"),
    UPLOAD,
    qta("b10_2", "Who's willing to be the public face?", "Founders, execs or subject-matter experts, for LinkedIn, podcasts, webinars or events. Name and platform.", "e.g. Our CEO is comfortable on LinkedIn and panels. Our Head of Product can do technical webinars."),
    qta("b10_3", "What proof can we use externally?", "Customer cases, data points, ROI numbers, press. Flag any usage limits.", "e.g. Two named case studies (approved), an aggregate \"31% faster close\" stat, plus a G2 leader badge."),
    qinput("b10_4", "Words, tones or imagery we must never use in your name.", "", "e.g. No \"disrupt\", no hype, never name a customer's competitor."),
])))

# 11 Your Positive Impact (closing, no bridge)
S.append(("Your Positive Impact", "Growth and impact are inseparable at Sprints &amp; Sneakers. We end every partnership conversation here.", "\n\n".join([
    qta("b11_1", "What positive change should our partnership help your business create?", "For people, society or the planet, and where in your current growth work is that ambition still under-served?", "e.g. We want every new customer to cut their reporting waste. Right now that story is buried in a feature list instead of leading our pitch.", tall=True),
    '''    <div class="callout">
      <p class="callout-label">Almost there</p>
      <p class="callout-body">Every honest answer here shaves days off the Audit phase and weeks off the time to your first growth result. Hit submit and we'll take it from here.</p>
    </div>''',
])))

BRIDGES = [
    ("Offering — done", "We get how you<br>make money.", "Your core offer, your economics and the problem you solve give us the commercial frame. Every play we run is judged on the revenue it can move.", "Continue to ICP &amp; DMU"),
    ("Accounts — done", "We know who to win,<br>and who signs.", "Your best-fit accounts and the people in the room shape our targeting and our messaging. We aim at the accounts worth winning and speak to each role that moves the deal.", "Continue to Positioning"),
    ("Positioning — done", "We know how<br>to frame you.", "Most vendors in your space sound interchangeable. Your answers let us frame you sharply and hold that frame across every touch.", "Continue to Channels"),
    ("Channels — done", "We see where<br>pipeline comes from.", "What's working, what you dropped and why. We double down on the channels earning pipeline and stop the ones that drain it.", "Continue to Pipeline"),
    ("Pipeline — done", "We found where<br>deals get stuck.", "Your funnel numbers point us at the stage that's leaking. The first sprint targets that stage until the conversion moves.", "Continue to Retention"),
    ("Retention — done", "The base matters as<br>much as new logos.", "Churn, expansion and references show us where the durable revenue sits. We protect the base and grow the accounts you already won.", "Continue to Tech"),
    ("Tech — done", "Solid data,<br>then we scale.", "We map your stack and tracking, close the gaps you flagged, and make every euro measurable before we scale a channel.", "Continue to Alignment"),
    ("Alignment — done", "Sales and marketing,<br>one motion.", "Clear handoffs, clean pipeline data and the right cadence. We slot into how your teams already work and tighten the seams.", "Continue to Goals"),
    ("Goals — done", "Targets set.<br>Now we work back.", "On the kick-off call we turn these numbers into sprint priorities. Every play points back to the one metric you named.", "Continue to Brand Assets"),
    ("Assets — done", "Day-one content<br>is ready.", "With brand access, proof and a willing face, we move at sprint speed. No scrambling for files, no waiting on approvals.", "Continue to Impact"),
]

# assemble body: section i, bridge i (for i 1..10), section 11
body = ""
for i in range(1, TOTAL + 1):
    h, sub, blocks = S[i - 1]
    body += section(i, h, sub, blocks)
    if i <= 10:
        e, t, b, nl = BRIDGES[i - 1]
        body += bridge(i, e, t, b, nl)

out = head + body + "\n" + tail

# --- shell edits (constants, nav made TOTAL-based, labels, B2B markers) ---
edits = [
    ("const SECTION_NAMES = ['Customer','Brand','Capabilities','Funnel','Tech','Team','Ambition','Assets','Impact'];",
     "const SECTION_NAMES = ['Offering','ICP & DMU','Positioning','Channels','Pipeline','Retention','Tech','Alignment','Goals','Assets','Impact'];"),
    ("const TOTAL = 9;", "const TOTAL = 11;"),
    ("if (n < 0 || n > 10) return;", "if (n < 0 || n > TOTAL + 1) return;"),
    ("} else if (n >= 1 && n <= 9) {", "} else if (n >= 1 && n <= TOTAL) {"),
    ("document.getElementById('btnNext').textContent = n === 9 ? 'Submit →' : 'Next →';",
     "document.getElementById('btnNext').textContent = n === TOTAL ? 'Submit →' : 'Next →';"),
    ("} else if (n === 10) {", "} else if (n === TOTAL + 1) {"),
    ("document.getElementById('step-10').classList.add('active');",
     "document.getElementById('step-thankyou').classList.add('active');"),
    ("if (currentStep >= 1 && currentStep <= 8) showBridge(currentStep, currentStep + 1);",
     "if (currentStep >= 1 && currentStep <= TOTAL - 1) showBridge(currentStep, currentStep + 1);"),
    ("else if (currentStep === 9) submitToSheets();", "else if (currentStep === TOTAL) submitToSheets();"),
    ('<div class="step" id="step-10">', '<div class="step" id="step-thankyou">'),
    ("const KEY = 'ss_onboarding_b2c_v3_' + (new URLSearchParams(location.search).get('c') || 'anon');",
     "const KEY = 'ss_onboarding_b2b_v1_' + (new URLSearchParams(location.search).get('c') || 'anon');"),
    ('<p class="welcome-eyebrow">B2C Edition &middot; 9 sections &middot; ~15 min</p>',
     '<p class="welcome-eyebrow">B2B Edition &middot; 11 sections &middot; ~20 min</p>'),
    ('Growth Partnership Onboarding &middot; B2C Edition &middot; 9 sections',
     'Growth Partnership Onboarding &middot; B2B Edition &middot; 11 sections'),
    ('<title>Growth Partnership Onboarding, Sprints &amp; Sneakers</title>',
     '<title>Growth Partnership Onboarding (B2B), Sprints &amp; Sneakers</title>'),
    ('<p class="welcome-body">We pull the channel data, market research and competitor analysis ourselves. This covers the rest: what only you can tell us.</p>',
     '<p class="welcome-body">We pull the market and competitor research ourselves. This covers the rest: what only you can tell us.</p>'),
    ("let h = `<h1>Growth Partnership Onboarding</h1>", "let h = `<h1>Growth Partnership Onboarding — B2B</h1>"),
    ("        token,\n        name: (document.getElementById('meta_name')",
     "        token,\n        kind: 'B2B',\n        name: (document.getElementById('meta_name')"),
    ("goToStep(10);", "goToStep(TOTAL + 1);"),
]
missing = []
for old, new in edits:
    if old in out:
        out = out.replace(old, new, 1)
    else:
        missing.append(old[:60])

out = out.replace(" — ", ", ")  # de-slop prose em-dashes (bridge eyebrows etc.), matching the B2C copy-pass

open("public/b2b.html", "w", encoding="utf-8").write(out)

print("sections:", out.count('data-section="'))
print("bridges:", out.count('class="bridge-step"'))
print("dropzones:", out.count('id="dropzone"'))
print("edits applied:", len(edits) - len(missing), "/", len(edits))
print("em-dashes (—):", out.count("—"))
if missing:
    print("!! NOT FOUND:")
    for m in missing: print("   -", m)
