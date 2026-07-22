---
type: research
project: New Partner Onboarding
status: Onderzoek afgerond, geen implementatiekeuze gemaakt (bewust)
bijgewerkt: 2026-07-22
---

# Drive-mappenstructuur voor partner-reporting: onderzoek

Dit document verzamelt onderbouwde principes en praktijkvoorbeelden voor een klantgerichte
Drive-mappenstructuur (audit, strategie, monthly updates, content deliverables), plus voor het
vindbaar houden van die structuur via Slack. Dit is bewust **geen voorstel voor een concrete
mappenstructuur** — dat is een aparte, volgende stap zodra dit onderzoek is doorgesproken.

Context: S&S deelt nu één platte gedeelde Drive-map per partner met losse bestanden erin (DPA,
Tooling Access Guide, kickstart-format), zonder submappen.

## Wat de theorie zegt (informatiearchitectuur, Nielsen Norman Group)

- Diepte en breedte van een mappenstructuur zijn **meetbare, testbare variabelen**, geen vaste
  "ideale getallen". NN/g raadt aan om vindbaarheidsproblemen te diagnosticeren met tree testing:
  is content moeilijk vindbaar omdat de structuur te breed of te diep is? ([NN/g, navigation-ia-tests](https://www.nngroup.com/articles/navigation-ia-tests/))
- "Flat vs. deep hierarchy" is een expliciet erkende, benoemde afweging in IA: beide vormen hebben
  eigen voor- en nadelen, en NN/g schrijft geen universele regel voor wanneer het een beter is dan
  het ander ([NN/g, ia-study-guide](https://www.nngroup.com/articles/ia-study-guide/); [NN/g, flat-vs-deep-hierarchy](https://www.nngroup.com/articles/flat-vs-deep-hierarchy/)).
- Naamgeving van categorieën/mappen is een **losstaande** vindbaarheidsfactor, apart van
  diepte/breedte: kunnen gebruikers de naam correct interpreteren en er de juiste inhoud aan
  koppelen? ([NN/g, navigation-ia-tests](https://www.nngroup.com/articles/navigation-ia-tests/))
- Card sorting is de aangewezen methode om te ontdekken hoe gebruikers zelf informatie
  categoriseren (hun mentale model), zodat naamgeving en indeling aansluiten bij hoe gebruikers
  zelf zoeken in plaats van interne/organisatorische logica te volgen ([NN/g, card-sorting](https://www.nngroup.com/videos/card-sorting-why-when/)).

**Wat NIET overeind bleef bij verificatie** (expliciet geweerd uit de conclusies, ter
transparantie): dat platte structuren per definitie beter zijn dan diepe, dat er een vaste
max-diepte van 3 niveaus zou zijn, dat 5-7 topmappen "het" juiste aantal is, en dat NN/g card
sorting specifiek voor externe/niet-technische gebruikers aanbeveelt. Dit zijn populaire
vuistregels die verder gaan dan wat de brontekst daadwerkelijk onderbouwt.

## Genummerde prefixing (00., 01., 02.)

- Het is een **gangbare, herkenbare praktijk** om een voorspelbare sorteervolgorde in
  mapoverzichten af te dwingen, en past goed bij fase- of volgordegebaseerde structuren (bijv.
  01_Research, 02_Development) ([Wisfile](https://www.wisfile.ai/faq/should-i-use-numbers-to-sort-folders); [Overdrive.tools](https://www.overdrive.tools/blog/google-drive-folder-structure-best-practices)).
- Het belangrijkste erkende **nadeel is inflexibiliteit**: een nieuwe categorie tussenvoegen
  vereist hernummering van alle volgende mappen om de volgorde te behouden.
- Belangrijke kanttekening: numerieke prefixing is **niet universeel gedeeld** als
  standaardpraktijk. Twee gepubliceerde bureau-Drive-adviezen (ZenPilot, Filerev) noemen het
  concept helemaal niet en werken in plaats daarvan met consistente naamgevingsconventies zoals
  `[ClientName]_[DocumentType]_[Datum]`, zonder cijfers ([ZenPilot](https://www.zenpilot.com/blog/google-drive-organization/); [Filerev](https://filerev.com/blog/google-drive-folder-structure/)).
- Geen van de gevonden bronnen behandelt specifiek mobiel Drive-gebruik in relatie tot genummerde
  prefixing; dit aspect van de oorspronkelijke vraag bleef onbeantwoord.
- Bronnen hier zijn blog-niveau, geen primaire/academische bron — weeg dit mee in het gewicht dat
  je aan deze bevinding geeft.

## Hoe vergelijkbare bureaus het doen

- Een gepubliceerd bureau-Drive-sjabloon (ZenPilot, gericht op marketing-/creatieve bureaus)
  combineert **terugkerende rapportage en eenmalige/statische documenten binnen dezelfde
  klantmap**, via nevengeschikte submappen: bijvoorbeeld "Reports" (terugkerende maandelijkse
  rapporten, analytics) naast "Admin" (statisch: contracten, SOW's, facturen, onboarding-documenten),
  naast Strategy, Content en Creative ([ZenPilot](https://www.zenpilot.com/blog/google-drive-organization/)).
- Dit is relevant voor de S&S-vraag "hoe combineer je recurring en static in dezelfde hoofdmap
  zonder rommeligheid": het antwoord uit de praktijk is niet scheiden in aparte systemen, maar
  nevengeschikte submappen met een heldere naam per functie.
- Wat **niet** overeind bleef: de claim dat elk klantteam verplicht een identiek sjabloon moet
  gebruiken zodat elk teamlid training-vrij kan navigeren (dat gaat verder dan de bron zelf stelt),
  en een specifiek "5-7 topmappen"-getal.

## Slack: vaste vindplaats voor de partner

- Een gepinde **Slack Canvas** (niet enkel een los gepind bericht) wordt aanbevolen als centrale,
  permanente hub per klant-/partnerkanaal, met vijf vaste onderdelen: projectoverzicht, teamleden
  en rollen (wie voor wat te contacteren), communicatie-afspraken, kernlinks (projectboard,
  gedeelde documenten, facturen), en een doorlopend logboek van belangrijke beslissingen. In de
  geciteerde praktijk vervangt dit zelfs de welkomstmail als "single source of truth" voor de
  relatie ([Mursa.me](https://www.mursa.me/blog/slack-client-communication-manage)). Let op: dit is
  een kleinere/niche-bron, dus matig vertrouwen ondanks eensgezinde verificatie.
- Slack's **Bookmarks-functie** is een structureel aparte laag, los van gepinde berichten:
  bookmarks staan permanent zichtbaar in de kanaalheader ("does not scroll away"), terwijl gepinde
  berichten een klik verderop in een apart Pins-tabblad zitten. Bookmarks zijn expliciet bedoeld om
  belangrijke projectbronnen (dashboards, documenten, links, bestanden) vast te houden, en
  "highlighten" bovendien gepinde berichten — de twee zijn dus complementair, geen duplicaten van
  elkaar ([Slack](https://slack.com/blog/productivity/whats-new-in-slack-simplified-search-channel-bookmarks); [Slack API-docs](https://docs.slack.dev/reference/methods/bookmarks.add/)).
- Wat **niet** overeind bleef: een specifieke verdeelregel tussen Bookmarks/Pins/Saved Items
  ("pin decisions, not discussions") met een aanbevolen maximum van circa 10 pins per kanaal. Het
  architecturale onderscheid (bookmarks vs. pins als aparte zichtbaarheidslagen) staat wel stevig,
  maar dat specifieke getal/regeltje niet.

## Belangrijkste caveat op dit hele onderzoek

De meeste bronnen zijn blogniveau (Wisfile, Overdrive.tools, ZenPilot, Filerev, Mursa.me), niet
academisch of peer-reviewed. Alleen de NN/g-bronnen en Slack's eigen documentatie/blog zijn
primair/gezaghebbend. Tijdens adversariale verificatie zijn verschillende aanvankelijk
aantrekkelijke, scherp geformuleerde vuistregels **weerlegd** (zie hieronder) — dat is op zich een
nuttige bevinding: generieke "best practice"-regels gaan online vaak verder dan wat de bron
werkelijk onderbouwt.

## Wat expliciet weerlegd is (bewust niet gebruikt als basis)

- "Diepe hiërarchieën zijn per definitie moeilijker dan platte" — weerlegd (1-2 stemmen).
- "Platte structuren alleen bij herkenbare categorieën, diep alleen bij te veel categorieën" —
  weerlegd (1-2).
- "NN/g beveelt card sorting specifiek aan voor niet-technische/externe gebruikers" — weerlegd (1-2).
- "Numerieke prefixes forceren sortering op getal in plaats van alfabet" — weerlegd (0-3); het
  mechanisme is subtieler (lexicografische tekstsortering, niet echte getalswaarde).
- "Elk klantteam moet een identiek Drive-sjabloon gebruiken, trainingvrij" — weerlegd (0-3).
- "Drive-hiërarchieën moeten max 3 niveaus diep zijn" — weerlegd (1-2).
- "Aanbevolen breedte is 5-7 topmappen" — weerlegd (0-3).
- "Aanbevolen agency-topstructuur is ~5 hoofdmappen, 2-3 niveaus totaal" — weerlegd (0-3).
- "Slack kent strikt gescheiden, niet-overlappende regels voor Bookmarks/Pins/Saved Items" —
  weerlegd (0-3).
- "Praktisch bruikbaar maximum van ~10 pins per kanaal" — weerlegd (0-3).

## Openstaande vragen (niet te beantwoorden met dit onderzoek)

1. Wat is voor externe, niet-getrainde klantgebruikers specifiek (in tegenstelling tot algemene
   website-bezoekers) de optimale breedte/diepte-vuistregel voor een Drive-structuur? Bestaat
   hiervoor apart onderzoek buiten NN/g's algemene site-IA-werk?
2. Zijn er gepubliceerde card-sorting- of tree-testing-resultaten specifiek uitgevoerd met
   B2B/B2C-klanten van marketingbureaus over hun mentale model van rapportage-mappen (audit,
   strategie, monthly reporting, content)?
3. Hoe gaan vergelijkbare bureaus concreet om met het invoegen van nieuwe categorieën in een
   genummerde structuur (bijv. stap-10-nummering: 10, 20, 30 om ruimte te reserveren)? Is dat al
   gangbare praktijk bij marketingbureaus specifiek?
4. Is er kwantitatief onderzoek (in plaats van praktijkervaring/blogs) naar hoeveel tijd of
   frustratie een externe klant daadwerkelijk bespaart met een gepinde Canvas versus alleen
   gepinde berichten of een kanaalbeschrijving?

## Bronnen (kwaliteit vermeld)

| Bron | Kwaliteit | Hoek |
|---|---|---|
| [NN/g — Flat vs. Deep Hierarchies](https://www.nngroup.com/videos/flat-vs-deep-hierarchies/) | primair | IA-theorie |
| [NN/g — Navigation IA tests](https://www.nngroup.com/articles/navigation-ia-tests/) | primair | IA-theorie |
| [NN/g — IA study guide](https://www.nngroup.com/articles/ia-study-guide/) | primair | IA-theorie |
| [NN/g — Card sorting: why/when](https://www.nngroup.com/videos/card-sorting-why-when/) | primair | IA-theorie |
| [Wisfile — nummers voor mappen](https://www.wisfile.ai/faq/should-i-use-numbers-to-sort-folders) | blog | Nummering |
| [Filerev — Drive folder structure](https://filerev.com/blog/google-drive-folder-structure/) | blog | Nummering / bureaupraktijk |
| [ZenPilot — Drive folder organization system](https://www.zenpilot.com/blog/google-drive-folder-organization-system-for-agencies) | blog | Bureaupraktijk |
| [Overdrive.tools — Drive folder structure best practices](https://www.overdrive.tools/blog/google-drive-folder-structure-best-practices) | blog | Bureaupraktijk |
| [Taskip — Agency SOPs](https://taskip.net/how-to-create-agency-sops/) | blog | SOP-structuur |
| [ManyRequests — SEO client onboarding checklist](https://www.manyrequests.com/templates/seo-client-onboarding-checklist) | blog | Onboarding (weinig relevant gebleken) |
| [ZenPilot — Drive organization (recurring/static)](https://www.zenpilot.com/blog/google-drive-organization/) | blog | Recurring vs. static |
| [Mursa.me — Slack client communication](https://www.mursa.me/blog/slack-client-communication-manage) | blog | Slack |
| [Mursa.me — Bookmarks vs. Pins vs. Save](https://www.mursa.me/blog/slack-bookmarks-pins-save-messages) | blog | Slack |
| [Social Intents — Slack channel organization](https://www.socialintents.com/blog/slack-channel-organization-best-practices/) | blog | Slack |
| [Slack — Channel Bookmarks (officieel blog)](https://slack.com/blog/productivity/whats-new-in-slack-simplified-search-channel-bookmarks) | primair | Slack |
| [Slack API-docs — bookmarks.add](https://docs.slack.dev/reference/methods/bookmarks.add/) | primair | Slack |

## Onderzoeksstatistieken

6 zoekhoeken, 22 bronnen opgehaald, 70 claims geëxtraheerd, 25 adversarieel geverifieerd
(15 bevestigd, 10 weerlegd), 8 bevindingen na synthese.
