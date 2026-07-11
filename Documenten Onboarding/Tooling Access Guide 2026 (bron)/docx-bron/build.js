const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  TabStopType, TabStopPosition, PageNumber, VerticalAlign, HeadingLevel,
} = require('docx');

// ── S&S system ──
const BG      = '181818';
const CARD    = '212121';
const BORDER  = '383838';
const T_HIGH  = 'F4F4F4';
const T_MID   = 'D4D4D4';
const T_LOW   = '9C9C9C';
const LIME    = 'B2FA63';
const NOTE_BG = '20261A'; // lime-faint on dark, flattened
const FONT    = 'Helvetica Neue';

// A4: 11906 x 16838 DXA. Margins 900 (~1.6cm) → content 10106
const CONTENT = 10106;

const noBorder = { style: BorderStyle.NONE, size: 0, color: 'auto' };
const cardBorder = { style: BorderStyle.SINGLE, size: 4, color: BORDER };
const limeBorder = { style: BorderStyle.SINGLE, size: 4, color: LIME };

// ── helpers ──
const run = (text, opts = {}) => new TextRun({
  text, font: FONT, size: opts.size || 20,
  color: opts.color || T_MID, bold: opts.bold || false, ...opts.extra,
});

function spacer(pts = 6) {
  return new Paragraph({ children: [], spacing: { after: pts * 20 } });
}

function kicker(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: text.toUpperCase(), font: FONT, size: 15, color: LIME, bold: true, characterSpacing: 40 })],
  });
}

function sectionTitle(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: text.toUpperCase(), font: FONT, size: 34, color: T_HIGH, bold: true })],
  });
}

function intro(parts) {
  return new Paragraph({
    spacing: { after: 260, line: 300 },
    children: parts.map(p => new TextRun({ text: p.t, font: FONT, size: 20, color: p.b ? T_HIGH : T_MID, bold: !!p.b })),
  });
}

// one paragraph from mixed runs: [{t, b(old→white), lime, mono}]
function rich(parts, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 80, line: opts.line ?? 300 },
    children: parts.map(p => new TextRun({
      text: p.t, font: FONT, size: opts.size || 20,
      color: p.lime ? LIME : (p.b || p.mono ? T_HIGH : (opts.color || T_MID)),
      bold: !!(p.b || p.mono || p.lime),
    })),
  });
}

// step line: lime number + mixed text
function step(n, parts) {
  return new Paragraph({
    spacing: { after: 70, line: 300 },
    indent: { left: 360, hanging: 360 },
    children: [
      new TextRun({ text: `${n}   `, font: FONT, size: 20, color: LIME, bold: true }),
      ...parts.map(p => new TextRun({
        text: p.t, font: FONT, size: 20,
        color: p.lime ? LIME : (p.b || p.mono ? T_HIGH : T_MID),
        bold: !!(p.b || p.mono || p.lime),
      })),
    ],
  });
}

// a full-width card table
function card(children, opts = {}) {
  const fill = opts.fill || CARD;
  const b = opts.lime ? limeBorder : cardBorder;
  return new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    columnWidths: [CONTENT],
    borders: { top: b, bottom: b, left: b, right: b, insideHorizontal: noBorder, insideVertical: noBorder },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT, type: WidthType.DXA },
        shading: { fill, type: ShadingType.CLEAR },
        margins: { top: 200, bottom: 160, left: 260, right: 260 },
        children,
      })],
    })],
  });
}

function cardHead(no, name) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: `${no}   `, font: FONT, size: 18, color: LIME, bold: true }),
      new TextRun({ text: name, font: FONT, size: 25, color: T_HIGH, bold: true }),
    ],
  });
}

function cardNeed(parts) {
  return new Paragraph({
    spacing: { after: 140 },
    children: parts.map(p => new TextRun({
      text: p.t, font: FONT, size: 17,
      color: p.lime ? LIME : T_LOW, bold: !!p.lime,
    })),
  });
}

function note(parts) {
  return new Table({
    width: { size: CONTENT - 520, type: WidthType.DXA },
    columnWidths: [CONTENT - 520],
    borders: {
      top: noBorder, bottom: noBorder, right: noBorder,
      left: { style: BorderStyle.SINGLE, size: 16, color: LIME },
      insideHorizontal: noBorder, insideVertical: noBorder,
    },
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: CONTENT - 520, type: WidthType.DXA },
        shading: { fill: NOTE_BG, type: ShadingType.CLEAR },
        margins: { top: 90, bottom: 90, left: 200, right: 200 },
        children: [new Paragraph({
          spacing: { line: 280 },
          children: parts.map(p => new TextRun({
            text: p.t, font: FONT, size: 18, color: p.b ? T_HIGH : T_MID, bold: !!p.b,
          })),
        })],
      })],
    })],
  });
}

// note INSIDE a card (no own table): shaded paragraph alternative
function noteInCard(parts) {
  return new Paragraph({
    spacing: { before: 120, line: 280 },
    shading: { fill: NOTE_BG, type: ShadingType.CLEAR },
    border: { left: { style: BorderStyle.SINGLE, size: 16, color: LIME, space: 4 } },
    indent: { left: 120 },
    children: parts.map(p => new TextRun({
      text: p.t, font: FONT, size: 18, color: p.b ? T_HIGH : T_MID, bold: !!p.b,
    })),
  });
}

const EMAIL = 'accounts@sprintsandsneakers.com';

// ── tool card builder ──
function tool(no, name, need, steps, noteParts) {
  const kids = [cardHead(no, name), cardNeed(need)];
  steps.forEach((s, i) => kids.push(step(i + 1, s)));
  if (noteParts) kids.push(noteInCard(noteParts));
  return card(kids);
}

// ── header / footer ──
const pageHeader = new Header({
  children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER, space: 4 } },
    spacing: { after: 240 },
    children: [
      new TextRun({ text: 'SPRINTS & SNEAKERS', font: FONT, size: 14, color: T_HIGH, bold: true, characterSpacing: 30 }),
      new TextRun({ text: '\tTOOLING ACCESS GUIDE', font: FONT, size: 14, color: LIME, bold: true, characterSpacing: 30 }),
    ],
  })],
});

const pageFooter = new Footer({
  children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: 'SPRINTS & SNEAKERS', font: FONT, size: 13, color: T_LOW, characterSpacing: 30 }),
      new TextRun({ text: '\t', font: FONT, size: 13 }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 13, color: T_MID, bold: true }),
    ],
  })],
});
const emptyHF = { header: new Header({ children: [] }), footer: new Footer({ children: [new Paragraph({
  tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
  children: [
    new TextRun({ text: 'SPRINTS & SNEAKERS', font: FONT, size: 13, color: T_LOW, characterSpacing: 30 }),
    new TextRun({ text: '\t01', font: FONT, size: 13, color: T_MID, bold: true }),
  ],
})] }) };

// ── COVER ──
const logo = fs.readFileSync('logo-full-white.png');
const cover = [
  new Paragraph({
    spacing: { after: 3200 },
    children: [new ImageRun({ type: 'png', data: logo, transformation: { width: 170, height: 38 },
      altText: { title: 'Sprints & Sneakers', description: 'Sprints & Sneakers logo', name: 'logo' } })],
  }),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: 'GROWTH PARTNERSHIP  ·  GETTING STARTED', font: FONT, size: 16, color: LIME, bold: true, characterSpacing: 50 })],
  }),
  new Paragraph({ spacing: { after: 0, line: 216, lineRule: 'auto' }, children: [new TextRun({ text: 'TOOLING', font: FONT, size: 88, color: 'FFFFFF', bold: true })] }),
  new Paragraph({ spacing: { after: 0, line: 216, lineRule: 'auto' }, children: [new TextRun({ text: 'ACCESS', font: FONT, size: 88, color: 'FFFFFF', bold: true })] }),
  new Paragraph({ spacing: { after: 400, line: 216, lineRule: 'auto' }, children: [new TextRun({ text: 'GUIDE', font: FONT, size: 88, color: LIME, bold: true })] }),
  new Paragraph({
    spacing: { after: 500, line: 330 },
    children: [
      new TextRun({ text: 'Access to your platforms is the first sprint of our partnership. This guide shows you exactly how to grant it: ', font: FONT, size: 24, color: T_MID }),
      new TextRun({ text: 'safely, without sharing a single password, in a few minutes per tool.', font: FONT, size: 24, color: 'FFFFFF', bold: true }),
    ],
  }),
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: LIME, space: 1 } },
    indent: { right: 7000 },
    spacing: { after: 2600 },
    children: [],
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'You are just a few steps away from ', font: FONT, size: 19, color: T_LOW }),
      new TextRun({ text: 'growing your company.', font: FONT, size: 19, color: LIME, bold: true }),
    ],
  }),
];

// ── PAGE 2: rules ──
function rule(n, title, parts) {
  return card([
    new Paragraph({
      spacing: { after: 30 },
      children: [
        new TextRun({ text: `${n}   `, font: FONT, size: 22, color: LIME, bold: true }),
        new TextRun({ text: title, font: FONT, size: 23, color: T_HIGH, bold: true }),
      ],
    }),
    new Paragraph({
      spacing: { line: 290 },
      indent: { left: 360 },
      children: parts.map(p => new TextRun({ text: p.t, font: FONT, size: 19, color: p.lime ? LIME : T_MID, bold: !!p.lime })),
    }),
  ]);
}

const page2 = [
  kicker('Read this first'),
  sectionTitle('Five rules that make this fast and safe'),
  intro([
    { t: 'Why we ask for access: audits, tracking, campaigns and experiments all start inside your tools. The sooner access is complete, the sooner the real work starts. These five rules apply to every tool in this guide.' },
  ]),
  rule('1', 'Never share passwords by email', [
    { t: 'Every platform in this guide has an invite or partner flow, so you stay in control and can revoke access at any time. If a shared login truly cannot be avoided, we exchange it through a password manager, never in plain text.' },
  ]), spacer(5),
  rule('2', 'One address for everything', [
    { t: 'Grant access to ' }, { t: EMAIL, lime: true }, { t: '. That address reaches your whole growth team at once, so access never depends on one person’s account.' },
  ]), spacer(5),
  rule('3', 'Grant the highest workable role', [
    { t: 'Admin rights let us set up tracking, audiences and campaigns without waiting on extra permission rounds. You can always scale a role down later.' },
  ]), spacer(5),
  rule('4', 'Only what applies to you', [
    { t: 'Skip the tools you do not use. Your growth team confirms the exact list for your stack before or during the kickstart.' },
  ]), spacer(5),
  rule('5', 'Stuck? We do it together', [
    { t: 'Send a message in our shared Slack channel and we will walk through it with you on a call, screen share included. No access question is too small.' },
  ]), spacer(8),
  card([
    new Paragraph({
      spacing: { after: 120 },
      children: [new TextRun({ text: 'KEY DETAILS YOU WILL NEED', font: FONT, size: 15, color: LIME, bold: true, characterSpacing: 40 })],
    }),
    ...[
      ['Our access e-mail', EMAIL],
      ['Our Meta Business Portfolio ID', '187500493833634'],
      ['Google Ads & Microsoft Advertising', 'You send us your account ID, we send the request'],
    ].map(([k, v]) => new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: 9500 }],
      spacing: { after: 60 },
      children: [
        new TextRun({ text: k, font: FONT, size: 19, color: T_MID }),
        new TextRun({ text: `\t${v}`, font: FONT, size: 19, color: 'FFFFFF', bold: true }),
      ],
    })),
  ], { lime: true, fill: '1E2415' }),
];

// ── PAGE 3: checklist ──
const CHK = [560, 2700, 5786, 1060];
function chkHeader() {
  return new TableRow({
    children: ['', 'TOOL', 'WHAT YOU DO', 'GUIDE'].map((t, i) => new TableCell({
      width: { size: CHK[i], type: WidthType.DXA },
      borders: { top: noBorder, left: noBorder, right: noBorder, bottom: { style: BorderStyle.SINGLE, size: 6, color: T_LOW } },
      shading: { fill: BG, type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 80, right: 80 },
      children: [new Paragraph({ children: [new TextRun({ text: t, font: FONT, size: 14, color: T_LOW, bold: true, characterSpacing: 30 })] })],
    })),
  });
}
function chkCat(label) {
  return new TableRow({
    children: [new TableCell({
      columnSpan: 4,
      width: { size: CONTENT, type: WidthType.DXA },
      borders: { top: noBorder, left: noBorder, right: noBorder, bottom: { style: BorderStyle.SINGLE, size: 4, color: LIME } },
      shading: { fill: BG, type: ShadingType.CLEAR },
      margins: { top: 140, bottom: 40, left: 80, right: 80 },
      children: [new Paragraph({ children: [new TextRun({ text: label.toUpperCase(), font: FONT, size: 14, color: LIME, bold: true, characterSpacing: 40 })] })],
    })],
  });
}
function chkRow(toolName, what, sec) {
  const cells = [
    new Paragraph({ children: [new TextRun({ text: '☐', font: 'Arial', size: 20, color: T_MID })] }),
    new Paragraph({ children: [new TextRun({ text: toolName, font: FONT, size: 19, color: T_HIGH, bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: what, font: FONT, size: 19, color: T_MID })] }),
    new Paragraph({ children: [new TextRun({ text: sec, font: FONT, size: 18, color: T_LOW, bold: true })] }),
  ];
  return new TableRow({
    children: cells.map((p, i) => new TableCell({
      width: { size: CHK[i], type: WidthType.DXA },
      borders: { top: noBorder, left: noBorder, right: noBorder, bottom: { style: BorderStyle.SINGLE, size: 4, color: BORDER } },
      shading: { fill: BG, type: ShadingType.CLEAR },
      margins: { top: 70, bottom: 70, left: 80, right: 80 },
      verticalAlign: VerticalAlign.CENTER,
      children: [p],
    })),
  });
}

const page3 = [
  kicker('Your overview'),
  sectionTitle('The access checklist'),
  intro([{ t: 'Tick the tools off as you go. Each one links to a numbered section with exact steps. Most take under five minutes. Not sure whether a tool applies to you? Ask your growth team, they know your stack.' }]),
  new Table({
    width: { size: CONTENT, type: WidthType.DXA },
    columnWidths: CHK,
    borders: { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder },
    rows: [
      chkHeader(),
      chkCat('1 · Analytics & Measurement'),
      chkRow('Google Analytics 4', 'Add our e-mail as Administrator', '1.1'),
      chkRow('Google Tag Manager', 'Add our e-mail as Admin, with Publish rights', '1.2'),
      chkRow('Google Search Console', 'Add our e-mail with Full permission', '1.3'),
      chkRow('Hotjar / Microsoft Clarity', 'Invite our e-mail as Admin', '1.4'),
      chkCat('2 · Advertising'),
      chkRow('Google Ads', 'Send us your customer ID, accept our request', '2.1'),
      chkRow('Meta Ads', 'Add us as partner with our Business Portfolio ID', '2.2'),
      chkRow('LinkedIn', 'Add page admin + Account Manager in Campaign Manager', '2.3'),
      chkRow('TikTok Ads', 'Invite us in Business Center, assign the ad account', '2.4'),
      chkRow('Microsoft Advertising', 'Send us your account number, accept our request', '2.5'),
      chkRow('Other ad platforms', 'Pinterest, Snapchat, Reddit: invite our e-mail as admin', '2.6'),
      chkCat('3 · Website & CMS'),
      chkRow('WordPress', 'Create an Administrator user for our e-mail', '3.1'),
      chkRow('Shopify', 'Send us your collaborator code, approve our request', '3.2'),
      chkRow('Other platforms', 'Invite our e-mail as admin, or loop in your developer', '3.3'),
      chkCat('4 · E-mail, CRM & Automation'),
      chkRow('HubSpot', 'Add our e-mail with full marketing access', '4.1'),
      chkRow('Klaviyo', 'Add our e-mail as Admin or Manager', '4.2'),
      chkRow('Mailchimp', 'Invite our e-mail as Admin', '4.3'),
      chkRow('ActiveCampaign', 'Add our e-mail with admin rights', '4.4'),
    ],
  }),
  spacer(8),
  note([
    { t: 'Using a tool that is not listed? ', b: true },
    { t: `Great, tell your growth team. The same principle always applies: invite ${EMAIL} through the platform’s own user management, with the highest workable role.` },
  ]),
];

// ── SECTION PAGES ──
const sec1 = [
  kicker('Section 1'),
  sectionTitle('Analytics & Measurement'),
  intro([{ t: 'Everything we do starts with reliable data. These four tools tell us what visitors actually do, so decisions run on evidence instead of gut feeling.' }]),
  tool('1.1', 'Google Analytics 4',
    [{ t: 'We need: ' }, { t: 'Administrator', lime: true }, { t: ' (Editor is the workable minimum)  ·  takes ± 2 minutes' }],
    [
      [{ t: 'Go to ' }, { t: 'analytics.google.com', mono: true }, { t: ' and click ' }, { t: 'Admin', b: true }, { t: ' (the gear, bottom left).' }],
      [{ t: 'Open ' }, { t: 'Account access management', b: true }, { t: '. Account level gives us all properties in one go; property level works too.' }],
      [{ t: 'Click the ' }, { t: '+', b: true }, { t: ' button and choose ' }, { t: 'Add users', b: true }, { t: '.' }],
      [{ t: 'Enter ' }, { t: EMAIL, mono: true }, { t: ', select the ' }, { t: 'Administrator', b: true }, { t: ' role and click ' }, { t: 'Add', b: true }, { t: '.' }],
    ],
    [{ t: 'No GA4 property yet? ', b: true }, { t: 'No problem, we set it up for you. Grant us Tag Manager and website access and we take it from there.' }]),
  spacer(6),
  tool('1.2', 'Google Tag Manager',
    [{ t: 'We need: ' }, { t: 'Admin', lime: true }, { t: ' on the account, ' }, { t: 'Publish', lime: true }, { t: ' on the container  ·  takes ± 2 minutes' }],
    [
      [{ t: 'Go to ' }, { t: 'tagmanager.google.com', mono: true }, { t: ' and open your container.' }],
      [{ t: 'Open the ' }, { t: 'Admin', b: true }, { t: ' tab and click ' }, { t: 'User Management', b: true }, { t: ' in the Account column.' }],
      [{ t: 'Click ' }, { t: '+', b: true }, { t: ', then ' }, { t: 'Add users', b: true }, { t: ', and enter ' }, { t: EMAIL, mono: true }, { t: '.' }],
      [{ t: 'Set account permission to ' }, { t: 'Admin', b: true }, { t: ' and container permission to ' }, { t: 'Publish', b: true }, { t: ', then save.' }],
    ],
    [{ t: 'No Tag Manager yet? ', b: true }, { t: 'We create the container and deliver the code snippet for your site. One line to your developer and it is live.' }]),
  spacer(6),
  tool('1.3', 'Google Search Console',
    [{ t: 'We need: ' }, { t: 'Full', lime: true }, { t: ' permission  ·  takes ± 2 minutes' }],
    [
      [{ t: 'Go to ' }, { t: 'search.google.com/search-console', mono: true }, { t: ' and select your property.' }],
      [{ t: 'Open ' }, { t: 'Settings', b: true }, { t: ' in the left menu, then ' }, { t: 'Users and permissions', b: true }, { t: '.' }],
      [{ t: 'Click ' }, { t: 'Add user', b: true }, { t: ', enter ' }, { t: EMAIL, mono: true }, { t: ' and choose ' }, { t: 'Full', b: true }, { t: '.' }],
    ],
    [{ t: 'No verified property yet? ', b: true }, { t: 'We verify it together via Tag Manager or a DNS record, five minutes on a call.' }]),
];

const sec1b = [
  tool('1.4', 'Hotjar or Microsoft Clarity',
    [{ t: 'We need: ' }, { t: 'Admin', lime: true }, { t: '  ·  behavior recordings and heatmaps  ·  takes ± 2 minutes' }],
    [
      [{ t: 'Hotjar: ', b: true }, { t: 'go to Settings, open ' }, { t: 'Organization > Members', b: true }, { t: ', click ' }, { t: 'Invite members', b: true }, { t: ' and add ' }, { t: EMAIL, mono: true }, { t: ' as ' }, { t: 'Admin', b: true }, { t: '.' }],
      [{ t: 'Microsoft Clarity: ', b: true }, { t: 'open your project, go to ' }, { t: 'Settings > Team', b: true }, { t: ', click ' }, { t: 'Add team member', b: true }, { t: ' and add ' }, { t: EMAIL, mono: true }, { t: ' as ' }, { t: 'Admin', b: true }, { t: '.' }],
    ],
    [{ t: 'Neither one installed? ', b: true }, { t: 'Clarity is free. We happily set it up through Tag Manager once we have access there.' }]),
  spacer(10),
  kicker('Section 2'),
  sectionTitle('Advertising'),
  intro([{ t: 'Your ad accounts are where budget meets results. For Google and Microsoft you send us an ID and we send the request, so you never touch a permission screen. For the social platforms you add us as a partner from your side.' }]),
  tool('2.1', 'Google Ads',
    [{ t: 'We need: ' }, { t: 'to link your account to our manager account (MCC)', lime: true }, { t: '  ·  you send one ID, we do the rest' }],
    [
      [{ t: 'Find your ' }, { t: 'customer ID', b: true }, { t: ': click the profile icon in the top right of Google Ads. It looks like ' }, { t: '123-456-7890', mono: true }, { t: '.' }],
      [{ t: 'Send the ID to your S&S contact through Slack or e-mail. Just the ID, never login details.' }],
      [{ t: 'We send a link request from our manager account. You get a notification in Google Ads and by e-mail.' }],
      [{ t: 'Accept it under ' }, { t: 'Admin > Access and security > Managers', b: true }, { t: '. Done.' }],
    ],
    [{ t: 'Creating a fresh account? ', b: true }, { t: 'Set the currency and time zone with care: Google locks both permanently after creation. Skip the campaign wizard, we build the campaigns.' }]),
];

const sec2 = [
  tool('2.2', 'Meta Ads (Facebook & Instagram)',
    [{ t: 'We need: ' }, { t: 'partner access', lime: true }, { t: ' to your Business Portfolio assets  ·  our Business Portfolio ID: ' }, { t: '187500493833634', lime: true }],
    [
      [{ t: 'Go to ' }, { t: 'business.facebook.com', mono: true }, { t: ' and open ' }, { t: 'Settings', b: true }, { t: ' of your Business Portfolio.' }],
      [{ t: 'Under ' }, { t: 'Users', b: true }, { t: ', click ' }, { t: 'Partners', b: true }, { t: ', then ' }, { t: 'Add', b: true }, { t: ' and choose ' }, { t: 'Give a partner access to your assets', b: true }, { t: '.' }],
      [{ t: 'Enter our Business Portfolio ID: ' }, { t: '187500493833634', mono: true }, { t: '.' }],
      [{ t: 'Select the assets that apply and grant ' }, { t: 'full control', b: true }, { t: ' per asset: your Facebook Page, ad account(s), pixel / datasets, catalog(s) and Instagram account.' }],
      [{ t: 'Click ' }, { t: 'Save changes', b: true }, { t: '. We confirm from our side as soon as it lands.' }],
    ],
    [{ t: 'No Business Portfolio yet? ', b: true }, { t: 'Create one at business.facebook.com with your business e-mail (not a personal profile), add your Page and ad account, then run the steps above. This keeps your ads independent from any individual’s Facebook account, which protects you and us.' }]),
  spacer(6),
  tool('2.3', 'LinkedIn (Page + Campaign Manager)',
    [{ t: 'We need: ' }, { t: 'page admin', lime: true }, { t: ' on your company page and ' }, { t: 'Account Manager', lime: true }, { t: ' on the ad account' }],
    [
      [{ t: 'LinkedIn ties admin roles to personal profiles. Your S&S contact sends you a connection request first.' }],
      [{ t: 'Page: ', b: true }, { t: 'open your company page as super admin, go to ' }, { t: 'Settings > Manage admins', b: true }, { t: ' and add your S&S contact as ' }, { t: 'Super admin', b: true }, { t: ' or ' }, { t: 'Content admin', b: true }, { t: '.' }],
      [{ t: 'Campaign Manager: ', b: true }, { t: 'open your ad account, click the account name, then ' }, { t: 'Manage access', b: true }, { t: '.' }],
      [{ t: 'Click ' }, { t: 'Add user to account', b: true }, { t: ' and add your S&S contact as ' }, { t: 'Account Manager', b: true }, { t: '.' }],
    ],
    [{ t: 'Billing is on you. ', b: true }, { t: 'Add a payment method under Billing center yourself. Without billing details LinkedIn will not deliver a single impression.' }]),
];

const sec2b = [
  tool('2.4', 'TikTok Ads',
    [{ t: 'We need: ' }, { t: 'Admin', lime: true }, { t: ' in your Business Center plus ' }, { t: 'Ad account admin', lime: true }, { t: '  ·  takes ± 3 minutes' }],
    [
      [{ t: 'Go to ' }, { t: 'business.tiktok.com', mono: true }, { t: ' and open your Business Center.' }],
      [{ t: 'Under ' }, { t: 'Users > Members', b: true }, { t: ', click ' }, { t: 'Invite member', b: true }, { t: ' and add ' }, { t: EMAIL, mono: true }, { t: ' as ' }, { t: 'Admin', b: true }, { t: '.' }],
      [{ t: 'Assign your ad account to the new member with ' }, { t: 'Ad account admin', b: true }, { t: ' permission and confirm.' }],
    ],
    [{ t: 'Prefer a partner link? ', b: true }, { t: 'That works too: under Partners, add us with our Business Center ID. Ask your S&S contact for the ID.' }]),
  spacer(6),
  tool('2.5', 'Microsoft Advertising (Bing)',
    [{ t: 'We need: ' }, { t: 'to manage your account from our agency account', lime: true }, { t: '  ·  you send one number, we do the rest' }],
    [
      [{ t: 'In Microsoft Advertising, open ' }, { t: 'Settings > Accounts & Billing', b: true }, { t: ' and copy your ' }, { t: 'account number', b: true }, { t: ' (looks like ' }, { t: 'X1234567', mono: true }, { t: ').' }],
      [{ t: 'Send it to your S&S contact through Slack or e-mail.' }],
      [{ t: 'We send a management request. Accept it via the link in the e-mail you receive, or under ' }, { t: 'Settings > Requests', b: true }, { t: '.' }],
    ],
    [{ t: 'No account yet? ', b: true }, { t: 'Often we can import your Google Ads setup into Microsoft in one afternoon. Ask your growth team whether the channel is worth it for your audience first.' }]),
  spacer(6),
  tool('2.6', 'Other ad platforms (Pinterest, Snapchat, Reddit)',
    [{ t: 'We need: ' }, { t: 'admin-level access', lime: true }, { t: ' through the platform’s own business or ads manager' }],
    [
      [{ t: 'Pinterest: ', b: true }, { t: 'in your business account, go to ' }, { t: 'Settings > Account access', b: true }, { t: ', invite ' }, { t: EMAIL, mono: true }, { t: ' with Admin access to the ad account.' }],
      [{ t: 'Snapchat: ', b: true }, { t: 'in Business Manager, go to ' }, { t: 'Members', b: true }, { t: ', invite ' }, { t: EMAIL, mono: true }, { t: ' as Business Admin and assign the ad account.' }],
      [{ t: 'Reddit: ', b: true }, { t: 'in Ads Manager, open your business settings, invite ' }, { t: EMAIL, mono: true }, { t: ' with admin permissions.' }],
    ],
    [{ t: 'Exploring a new channel together? ', b: true }, { t: 'Perfect. Set up the account with a business e-mail (never a personal profile), then invite us before you build anything. We take it from there.' }]),
];

const sec3 = [
  kicker('Section 3'),
  sectionTitle('Website & CMS'),
  intro([{ t: 'Landing pages, pixels, experiments and conversion fixes all happen on your website. With the right role we ship improvements ourselves instead of adding tickets to your developer’s backlog.' }]),
  tool('3.1', 'WordPress',
    [{ t: 'We need: our own ' }, { t: 'Administrator', lime: true }, { t: ' user  ·  takes ± 2 minutes' }],
    [
      [{ t: 'Log in to your WordPress admin and go to ' }, { t: 'Users > Add New User', b: true }, { t: '.' }],
      [{ t: 'Enter ' }, { t: EMAIL, mono: true }, { t: ' as the e-mail, pick any username, and set the role to ' }, { t: 'Administrator', b: true }, { t: '.' }],
      [{ t: 'Tick ' }, { t: 'Send the new user an e-mail about their account', b: true }, { t: '. We set our own password through that link, so no password ever travels by mail.' }],
    ], null),
  spacer(6),
  tool('3.2', 'Shopify',
    [{ t: 'We need: ' }, { t: 'collaborator access', lime: true }, { t: '  ·  does not use one of your staff seats' }],
    [
      [{ t: 'Find your ' }, { t: 'collaborator request code', b: true }, { t: ': in Shopify admin go to ' }, { t: 'Settings > Users > Security', b: true }, { t: ' and copy the 4-digit code.' }],
      [{ t: 'Send the code to your S&S contact. Sharing the code gives us nothing yet, it only lets us send you a request.' }],
      [{ t: 'We submit a collaborator request from our Shopify Partner account.' }],
      [{ t: 'Approve it under ' }, { t: 'Settings > Users', b: true }, { t: ' (filter on Requests) and confirm the permissions.' }],
    ], null),
  spacer(6),
  tool('3.3', 'Other platforms (Webflow, Wix, Lightspeed, custom)',
    [{ t: 'We need: ' }, { t: 'admin-level access', lime: true }, { t: ' through the platform’s own user management' }],
    [
      [{ t: 'Invite ' }, { t: EMAIL, mono: true }, { t: ' as admin through the platform’s team or user settings.' }],
      [{ t: 'Custom-built website? Connect us with your developer in the shared Slack channel and we agree on a workable setup together.' }],
    ], null),
];

// two-up email/CRM cards → laid out as single column for Word robustness
const sec4 = [
  kicker('Section 4'),
  sectionTitle('E-mail, CRM & Automation'),
  intro([{ t: 'Your e-mail list is the channel you own. Whichever platform you use, the pattern is the same: invite our address through user management with an admin role.' }]),
  tool('4.1', 'HubSpot',
    [{ t: 'We need: ' }, { t: 'full marketing access', lime: true }, { t: ' (Super admin works fastest)' }],
    [
      [{ t: 'Go to ' }, { t: 'Settings > Users & Teams', b: true }, { t: ' and click ' }, { t: 'Create user', b: true }, { t: '.' }],
      [{ t: 'Add ' }, { t: EMAIL, mono: true }, { t: '.' }],
      [{ t: 'Grant full access to the Marketing tools, or Super admin if you prefer one clean role.' }],
    ], null),
  spacer(6),
  tool('4.2', 'Klaviyo',
    [{ t: 'We need: ' }, { t: 'Admin', lime: true }, { t: ' or ' }, { t: 'Manager', lime: true }],
    [
      [{ t: 'Click your account name, then ' }, { t: 'Settings > Users', b: true }, { t: '.' }],
      [{ t: 'Click ' }, { t: 'Add new user', b: true }, { t: ' and enter ' }, { t: EMAIL, mono: true }, { t: '.' }],
      [{ t: 'Select the ' }, { t: 'Admin', b: true }, { t: ' or ' }, { t: 'Manager', b: true }, { t: ' role and send the invite.' }],
    ], null),
  spacer(6),
  tool('4.3', 'Mailchimp',
    [{ t: 'We need: ' }, { t: 'Admin', lime: true }],
    [
      [{ t: 'Click your profile icon and go to ' }, { t: 'Account & billing > Settings > Users', b: true }, { t: '.' }],
      [{ t: 'Click ' }, { t: 'Invite a user', b: true }, { t: ' and enter ' }, { t: EMAIL, mono: true }, { t: '.' }],
      [{ t: 'Choose the ' }, { t: 'Admin', b: true }, { t: ' role and send the invite.' }],
    ], null),
  spacer(6),
  tool('4.4', 'ActiveCampaign',
    [{ t: 'We need: ' }, { t: 'admin rights', lime: true }],
    [
      [{ t: 'Go to ' }, { t: 'Settings > Users', b: true }, { t: ' (bottom left).' }],
      [{ t: 'Click ' }, { t: 'Add a user', b: true }, { t: ' and enter ' }, { t: EMAIL, mono: true }, { t: '.' }],
      [{ t: 'Add the user to the ' }, { t: 'Admin', b: true }, { t: ' group and save.' }],
    ], null),
  spacer(6),
  note([
    { t: 'Different e-mail or CRM platform? ', b: true },
    { t: 'Same recipe: user management, our address, admin role. Mention it to your growth team so we tick it off on our side too.' },
  ]),
];

// ── CLOSER ──
const closer = [
  spacer(40),
  kicker('Almost there'),
  new Paragraph({ spacing: { after: 0, line: 230 }, children: [new TextRun({ text: 'THAT’S IT.', font: FONT, size: 68, color: 'FFFFFF', bold: true })] }),
  new Paragraph({ spacing: { after: 300, line: 230 }, children: [new TextRun({ text: 'LET’S GROW.', font: FONT, size: 68, color: LIME, bold: true })] }),
  new Paragraph({
    spacing: { after: 500, line: 320 },
    children: [
      new TextRun({ text: 'Access sounds like paperwork, but it is the single biggest predictor of a fast start. Partners who complete this checklist in week one see their audit, strategy and first experiments land ', font: FONT, size: 23, color: T_MID }),
      new TextRun({ text: 'weeks earlier', font: FONT, size: 23, color: 'FFFFFF', bold: true }),
      new TextRun({ text: '.', font: FONT, size: 23, color: T_MID }),
    ],
  }),
  rule('1', 'You grant access', [
    { t: 'Work through the checklist on page 3. Most tools take less than five minutes, and your growth team confirms which ones apply to your stack.' },
  ]), spacer(5),
  rule('2', 'We verify everything', [
    { t: 'Within two working days we confirm each tool and flag anything missing in our shared Slack channel, so nothing quietly stays behind.' },
  ]), spacer(5),
  rule('3', 'The real work starts', [
    { t: 'Audit, strategy and the first experiments, powered by your data instead of assumptions. Questions along the way? Your growth team is one Slack message away.' },
  ]),
];

// ── document ──
const pageBreak = () => new Paragraph({ pageBreakBefore: true, children: [] });

const doc = new Document({
  background: { color: BG },
  styles: { default: { document: { run: { font: FONT, size: 20, color: T_MID } } } },
  sections: [{
    properties: {
      titlePage: true,
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 900, right: 900, bottom: 900, left: 900, header: 500, footer: 400 },
      },
    },
    headers: { default: pageHeader, first: emptyHF.header },
    footers: { default: pageFooter, first: emptyHF.footer },
    children: [
      ...cover, pageBreak(),
      ...page2, pageBreak(),
      ...page3, pageBreak(),
      ...sec1, pageBreak(),
      ...sec1b, pageBreak(),
      ...sec2, pageBreak(),
      ...sec2b, pageBreak(),
      ...sec3, pageBreak(),
      ...sec4, pageBreak(),
      ...closer,
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('Tooling Access Guide 2026 - Sprints & Sneakers.docx', buf);
  console.log('written', buf.length, 'bytes');
});
