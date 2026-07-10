# Werkwijze: AI inzetten om digitale systemen te bouwen

*Een methode voor projecten met Claude Code en vergelijkbare agents. Voor het bouwen van automations, agents, webapps en websites. Met een scherp doel, een gedeeld plan en echte afstemming tussen jou en de AI.*

---

## Waarom deze werkwijze

De meeste mislukte AI-projecten gaan niet stuk op de code. Ze gaan stuk op het begin. Je hebt een vaag doel, je geeft een losse opdracht, de agent raadt de rest. Drie uur later heb je iets dat half werkt en niet is wat je bedoelde.

Deze werkwijze lost dat op met één principe. Jij en de AI werken vanuit hetzelfde document. Dat document is de waarheid. Alles wat je bouwt, toetst je daaraan.

De methode heeft acht fasen. Je loopt ze in volgorde. Bij kleine klussen sla je fasen samen. Bij grote systemen neem je elke fase serieus.

---

## De kern in één alinea

Je maakt eerst het doel scherp en meetbaar. Je laat de agent je bevragen tot jullie hetzelfde beeld hebben. Dat beeld leg je vast in een spec. Je knipt de spec in kleine brokken. Elke brok bouw je apart, met een test of check erbij. Na elke brok controleer je of het klopt met de spec. Je zet het live in kleine stappen. Na afloop laat je de agent jouw systeem slimmer maken voor de volgende keer.

---

## Zeven principes die alles dragen

**1. Eén doel, hardop en meetbaar.** Voordat je iets bouwt, schrijf je op wat af betekent. Geen gevoel, een toetsbare uitkomst. "De gebruiker kan met één klik zijn factuur downloaden" is toetsbaar. "Een fijne factuurpagina" is dat niet.

**2. De spec is de gedeelde waarheid.** Jij en de agent verwijzen naar hetzelfde document. Verandert het plan, dan verandert eerst de spec. Zo blijven jullie op één lijn.

**3. Laat de AI terugvertellen.** Voordat de agent bouwt, laat je hem in eigen woorden uitleggen wat hij gaat doen en waarom. Klopt zijn samenvatting niet, dan zaten jullie niet op één lijn. Dit is je belangrijkste afstem-moment.

**4. Klein bouwen, brok voor brok.** Je bouwt in dunne plakjes die elk op zichzelf werken. Een plakje eerst end-to-end werkend, daarna uitbreiden. Zo zie je snel of je op de goede weg zit.

**5. Verifiëren hoort bij elke stap.** De agent levert nooit blind op. Er is altijd een check: een test die draait, een screenshot die klopt, een getal dat de grens haalt. Zonder check weet niemand of het werkt.

**6. Jij houdt de beslissingen, de agent zoekt de feiten.** Feiten haalt de agent zelf uit de code of het web. Keuzes maak jij. Als je die grens niet trekt, gaat de agent zijn eigen vragen beantwoorden en bouwt hij aannames in.

**7. Elk project maakt het volgende beter.** Na afloop leg je vast wat je hebt geleerd. Je updatet je CLAUDE.md, je skills en je kennismap. De volgende keer begin je hoger.

---

## Het stappenplan

Acht fasen. Elke fase heeft een doel, een set acties, een afstem-moment voor de synergie en een duidelijk punt waarop je klaar bent.

### Fase 0. Omgeving klaarzetten

**Doel.** Een schone werkplek waarin de agent weet waar hij is.

**Wat je doet.**
- Open een lege map voor het project. Zet Claude Code klaar in VS Code of de terminal.
- Zet het project onder git vanaf minuut één. Zo kun je altijd terug.
- Maak een `CLAUDE.md` in de hoofdmap (template T1). Kort houden.
- Maak een mappen-opzet: `spec/`, `tickets/`, `bron/` voor ruw materiaal, `kennis/` voor wat de agent moet weten.
- Installeer de skills die je nodig hebt. Voor front-end werk de front-end design skill.

**Afstem-moment.** Laat de agent je CLAUDE.md teruglezen en zeggen wat hij eruit begrijpt. Klopt dat beeld, dan sta je goed.

**Klaar wanneer.** De agent kan de map lezen, git werkt en je CLAUDE.md staat er.

### Fase 1. Doel scherp krijgen

**Doel.** Weten wat je bouwt en waarom, in toetsbare taal.

**Wat je doet.**
- Vul de projectbrief in (template T2). Dit kost twintig minuten en bespaart uren.
- Schrijf het doel in één zin. Schrijf op wie het gebruikt en welk probleem verdwijnt.
- Schrijf de Definition of Done: de lijst met dingen die waar moeten zijn voordat je tevreden bent (template T6).
- Bepaal wat buiten scope valt. Wat bouw je nu niet.

**Afstem-moment.** Geef de brief aan de agent. Vraag: "Wat is hier onduidelijk of tegenstrijdig? Stel me je drie scherpste vragen." Beantwoord die. Zo haal je gaten eruit voordat ze code worden.

**Klaar wanneer.** Je kunt in één zin zeggen wat af betekent. De agent snapt die zin.

### Fase 2. Samen tot een plan komen

**Doel.** Een spec waar jullie allebei achter staan. Dit is de fase waarin de synergie ontstaat.

**Wat je doet.**
- Laat de agent je bevragen met de grill-prompt (template T3). Eén vraag per keer.
- Laat de agent onderscheid maken tussen feiten die hij zelf opzoekt en keuzes die jij maakt.
- Bij iets visueels of interactiefs: laat de agent eerst een ruwe prototype maken. Reageren op iets concreets werkt beter dan praten over een idee.
- Giet de uitkomst in een spec (template T4). De spec beschrijft de bestemming, niet elke stap.

**Afstem-moment.** De teach-back (template T7). Laat de agent de spec samenvatten in eigen woorden, plus de drie grootste risico's. Herken je jouw plan niet in zijn samenvatting, dan stuur je bij tot dat wel zo is. Pas daarna ga je verder.

**Klaar wanneer.** De spec staat, jij hebt hem gelezen en de agent kan hem foutloos navertellen.

### Fase 3. Plan opdelen in brokken

**Doel.** De spec in kleine tickets die je los kunt bouwen.

**Wat je doet.**
- Knip de spec in tickets (template T5). Elk ticket past in één werksessie van de agent.
- Maak het eerste ticket een dun plakje dat end-to-end werkt. Iets kleins dat de hele keten raakt, van invoer tot uitvoer.
- Zet volgorde en afhankelijkheden erbij. Wat moet eerst.

**Afstem-moment.** Loop de ticketlijst samen na. Vraag de agent: "Mist er een stap om de spec te halen? Zit er een ticket te groot in?" Snijd te grote tickets kleiner.

**Klaar wanneer.** Je hebt een lijst tickets, elk klein genoeg voor één sessie, met een duidelijke eerste.

### Fase 4. Bouwen, brok voor brok

**Doel.** Elk ticket werkend krijgen, met een check erbij.

**Wat je doet.**
- Bouw één ticket per sessie. Start elke sessie schoon zodat de context niet vol raakt met oude ballast.
- Laat de agent werken in het ritme redeneren, doen, controleren. Hij bedenkt, bouwt, kijkt naar het resultaat en gaat opnieuw tot het klopt.
- Schrijf waar mogelijk eerst een test, dan de code. Bij front-end: laat de agent screenshots maken en zijn eigen werk vergelijken met het doel.
- Leg na elk werkend ticket vast in git. Kleine commits, zodat je stap voor stap terug kunt.

**Afstem-moment.** Voor de agent begint, laat hem in twee zinnen zeggen hoe hij dit ticket aanpakt. Klopt de aanpak, dan geef je groen licht. Zo voorkom je dat hij de verkeerde kant op rent.

**Klaar wanneer.** Het ticket werkt, de check slaagt en het staat vast in git.

### Fase 5. Verifiëren tegen de spec

**Doel.** Zeker weten dat het gebouwde klopt met wat jullie afspraken.

**Wat je doet.**
- Laat een aparte code review draaien met twee blikken. Eén: voldoet de code aan je standaarden. Twee: doet de code wat de spec vraagt (template T8).
- Loop je Definition of Done langs. Punt voor punt: waar of niet waar.
- Test de randgevallen. Wat als een veld leeg is. Wat als iemand twee keer klikt.
- Kijk er zelf naar. De agent controleert het meetbare. Jij controleert de smaak en het gevoel.

**Afstem-moment.** Vraag de agent: "Op welke punten twijfel je of dit de spec haalt?" Zijn twijfels wijzen je naar de zwakke plekken.

**Klaar wanneer.** Elk punt van de Definition of Done is waar, de review is schoon en jij hebt het gezien.

### Fase 6. Live zetten in kleine stappen

**Doel.** Het systeem draait waar het moet draaien, veilig.

**Wat je doet.**
- Werk local-first. Test lokaal en zet pas iets naar buiten als jij dat zegt.
- Bij een website of webapp: koppel git aan een host die vanzelf publiceert. Publiceer een kleine versie, kijk of het klopt, breid dan uit.
- Controleer op geheimen voordat je iets naar een publieke plek stuurt. Geen sleutels, wachtwoorden of tokens in de code.
- Zet de agent op vaste bevestiging voordat je hem alles laat doen. Grote acties keur jij goed.

**Afstem-moment.** Laat de agent opsommen wat er precies naar buiten gaat en wat er zou breken als het misgaat. Klopt die lijst, dan zet je het live.

**Klaar wanneer.** Het draait, het is bereikbaar en er staan geen geheimen op straat.

### Fase 7. Leren en verbeteren

**Doel.** Dit project maakt je volgende project beter.

**Wat je doet.**
- Draai een korte retro met de agent (template T9). Wat ging goed, wat liep stroef, wat kostte onnodig tijd.
- Update je CLAUDE.md met de fouten die je vaak zag. Zo maakt de agent ze de volgende keer minder.
- Stop nieuwe kennis in je kennismap: handige prompts, werkende stukken, beslissingen die je opnieuw zou nemen.
- Zet herhaalbare stappen om in een skill, zodat je ze niet elke keer opnieuw uitlegt.

**Afstem-moment.** Vraag de agent: "Welke instructie had je aan het begin nodig die je pas halverwege kreeg?" Zet die instructie in je CLAUDE.md of spec-template.

**Klaar wanneer.** Je CLAUDE.md, je kennismap en je skills staan een stap verder dan bij de start.

---

## De synergie-laag

Op één lijn blijven met de AI gebeurt niet vanzelf. Vijf mechanismen houden jullie samen. Ze zitten al in de fasen verwerkt, hier staan ze bij elkaar zodat je ze bewust inzet.

**De spec als gedeelde waarheid.** Alles verwijst naar één document. Twijfel over wat de bedoeling was, dan kijk je in de spec. Verandert de bedoeling, dan pas je eerst de spec aan, daarna de code.

**Teach-back.** Voor elke grote stap laat je de agent navertellen wat hij gaat doen en waarom. Zijn samenvatting is je spiegel. Zie je jezelf er niet in, dan stem je bij.

**Beslislog.** Elke keuze die je maakt schrijf je op met de reden erbij. Waarom deze database, waarom deze aanpak. Een maand later weet je nog waarom. De agent ook.

**Feiten tegen keuzes.** De agent zoekt feiten op. Jij maakt keuzes. Die grens houd je scherp, zodat de agent geen aannames als waarheid inbouwt.

**Poortjes.** Op vaste punten mag de agent pas door na jouw akkoord. Na de spec. Voor het live zetten. Zo houd je grip zonder elke regel te sturen.

---

## Veelgemaakte fouten en hoe je ze voorkomt

**Te snel bouwen.** Je slaat het doel en het plan over en laat de agent los. Voorkom het met fase 1 en 2. Twintig minuten plannen scheelt uren herstel.

**Vaag "af".** "Tot het goed is" laat de agent zweven. Geef een toetsbare Definition of Done en waar mogelijk een getal met een harde grens.

**Context vol laten lopen.** In één lange sessie doorbouwen laat de agent details vergeten. Bouw per ticket in een schone sessie.

**Alles in één keer willen.** Een groot systeem in één opdracht mislukt. Knip het in dunne plakjes die elk werken.

**De agent zijn eigen vragen laten beantwoorden.** Zonder de grens feiten tegen keuzes verzint hij antwoorden. Trek die grens hardop.

**Geheimen naar buiten sturen.** Zodra je koppelingen en sleutels gebruikt, let op wat naar een publieke plek gaat. Controleer voor je publiceert.

**Blind vertrouwen op één poging.** De eerste versie is zelden de laatste. Reken op een paar rondes en bouw de controle-lus in de agent.

**Hype naäpen.** Iemand draait tien agents dag en nacht. Dat past misschien niet bij jouw werk. Kies de aanpak die bij jouw taak hoort.

---

## De templates

Kant-en-klaar. Kopieer wat je nodig hebt en vul het in per project.

### T1. CLAUDE.md

Zet dit in de hoofdmap van je project. Kort houden, richtlijn is onder de vijftig regels. De agent leest dit voor elke actie.

```markdown
# Project: [naam]

## Wat dit is
[Eén of twee zinnen. Wat bouwen we en voor wie.]

## Doel
[De ene zin uit je projectbrief. Wat "af" betekent.]

## Mappen
- spec/      de spec, de gedeelde waarheid
- tickets/   de brokken werk
- bron/      ruw materiaal dat je niet aanpast
- kennis/    wat de agent moet weten
- src/       de code

## Werkafspraken
- Lees altijd eerst spec/ voordat je bouwt.
- Werk local-first. Zet niets naar buiten zonder mijn akkoord.
- Bouw één ticket per keer. Leg werkend werk vast in git.
- Voor je bouwt: vertel in twee zinnen je aanpak en wacht op groen licht.
- Feiten zoek je zelf op. Keuzes leg je aan mij voor.
- Voor front-end: gebruik de front-end design skill en maak screenshots.

## Wat vaak misgaat (aanvullen na elk project)
- [fout die je vaker zag]
- [fout die je vaker zag]
```

### T2. Projectbrief

Het canvas dat je in fase 1 invult. Dit is de bron voor je spec.

```markdown
# Projectbrief: [naam]

## Doel in één zin
[Wat kan de gebruiker straks dat nu niet kan.]

## Voor wie
[Wie gebruikt dit. Wat is hun probleem vandaag.]

## Type systeem
[Automation / agent / webapp / website / anders]

## Waarom nu
[Waarom is dit de moeite waard.]

## Definition of Done (zie ook T6)
- [ ] [toetsbaar punt]
- [ ] [toetsbaar punt]
- [ ] [toetsbaar punt]

## Buiten scope
[Wat bouwen we nu niet. Wat komt later of nooit.]

## Randvoorwaarden
[Budget, techniek die vast ligt, koppelingen, deadlines.]

## Onbekend / risico
[Wat weet ik nog niet. Waar zit het grootste risico.]
```

### T3. Grill- en planningsprompt

Plak dit in fase 2 om de agent jou te laten bevragen.

```text
Je gaat me helpen dit project te plannen. Bouw nog niets.

Lees eerst mijn projectbrief in bron/ (of hieronder).

Bevraag me daarna om het plan scherp te krijgen. Regels:
- Stel één vraag per keer en wacht op mijn antwoord.
- Vraag door op onduidelijkheden, tegenstrijdigheden en gaten.
- Splits feiten van keuzes. Feiten die je zelf kunt opzoeken,
  zoek je op. Keuzes leg je aan mij voor.
- Ga door tot je genoeg weet om een spec te schrijven.

Als je genoeg weet, zeg je dat. Enact het plan pas als ik
bevestig dat we hetzelfde beeld hebben.
```

### T4. Spec-template

De gedeelde waarheid. Leg dit vast in `spec/spec.md`.

```markdown
# Spec: [naam]

## Doel
[De zin uit de brief.]

## Gebruikers en gebruik
[Wie doet wat, in welke situatie.]

## Wat het systeem doet
[De functies, van belangrijk naar minder belangrijk.
Beschrijf gedrag, geen code.]

## Wat het niet doet
[Grenzen van deze versie.]

## Aannames en keuzes
[Beslissingen met de reden erbij. Dit is je beslislog.]

## Definition of Done
[De toetsbare lijst. Kopieer uit T6.]

## Open vragen
[Wat nog beslist moet worden en door wie.]
```

### T5. Ticket-template

Eén ticket per brok. Elk ticket past in één sessie.

```markdown
# Ticket: [korte titel]

## Doel van dit ticket
[Wat werkt er na dit ticket dat daarvoor niet werkte.]

## Hoort bij
[Welk deel van de spec.]

## Aanpak (agent vult in, jij keurt goed)
[Twee zinnen: hoe pak je dit aan.]

## Klaar wanneer
- [ ] [check]
- [ ] [test slaagt / screenshot klopt / getal haalt grens]

## Afhankelijk van
[Welk ticket moet eerst.]
```

### T6. Definition of Done en verificatie-checklist

Vul dit in fase 1 en loop het langs in fase 5.

```markdown
# Definition of Done: [naam]

## Werkt het
- [ ] De hoofdtaak werkt end-to-end.
- [ ] De randgevallen werken (leeg veld, dubbele klik, geen internet).
- [ ] Tests slagen. Type-check is schoon.

## Klopt het met de spec
- [ ] Elk "wat het systeem doet" uit de spec is gebouwd.
- [ ] Niets uit "wat het niet doet" is per ongeluk toch gebouwd.

## Is het veilig en netjes
- [ ] Geen sleutels of wachtwoorden in de code.
- [ ] De code voldoet aan mijn standaarden.

## Voelt het goed
- [ ] Ik heb er zelf naar gekeken.
- [ ] Het doet wat ik bedoelde, niet alleen wat ik opschreef.
```

### T7. Afstem-prompt (teach-back)

Je belangrijkste synergie-check. Gebruik dit na de spec en voor grote stappen.

```text
Voordat we verder gaan, wil ik checken of we op één lijn zitten.

Vertel me in je eigen woorden:
1. Wat gaan we bouwen en waarom.
2. Wat de drie grootste risico's of onzekerheden zijn.
3. Welke keuze je zou maken op het eerste open punt en waarom.

Vat samen, verzin niets bij. Als je iets niet zeker weet,
zeg dat. Ik lees je samenvatting en corrigeer waar nodig.
```

### T8. Code review en verificatie-prompt

Draai dit in fase 5, het liefst met aparte sub-agents.

```text
Review het werk op twee vlakken. Gebruik voor elk een aparte blik.

1. Standaarden: voldoet de code aan de standaarden in
   [standaarden-bestand]? Noem concrete plekken die afwijken.

2. Spec: doet de code wat spec/spec.md vraagt? Loop de
   "wat het systeem doet" punt voor punt langs. Noem wat mist
   of afwijkt.

Zoek ook naar bekende zwakke plekken: onduidelijke namen,
dubbele code, te lange functies, te veel aannames.

Geef per punt: waar, wat en je voorstel om het op te lossen.
Los nog niets op. Wacht op mijn akkoord.
```

### T9. Retro- en verbeter-prompt

Sluit elk project hiermee af, in fase 7.

```text
We zijn klaar met dit project. Help me ervan leren.

1. Wat ging goed en zou ik weer zo doen.
2. Wat liep stroef en kostte onnodig tijd.
3. Welke instructie had je aan het begin nodig die je pas
   halverwege kreeg.

Stel daarna voor:
- Welke regels ik aan mijn CLAUDE.md toevoeg.
- Welke stukken kennis ik in kennis/ bewaar.
- Welke herhaalbare stap een skill zou moeten worden.

Doe concrete voorstellen die ik meteen kan overnemen.
```

---

## Hoe je deze week start

Je hoeft niet alles in één keer. Begin klein.

Kies een project dat je toch al wilde doen. Iets kleins, geen levenswerk. Zet fase 0 op: lege map, git, een CLAUDE.md uit T1.

Vul de projectbrief in (T2). Laat de agent je bevragen (T3). Schrijf samen een spec (T4). Doe de teach-back (T7). Dat is het halve werk. Dit is het deel dat de meeste mensen overslaan.

Bouw daarna één dun plakje volgens fase 4. Verifieer het (T6). Merk hoe anders het voelt om vanuit een gedeeld plan te werken.

Na dit eerste project vul je je CLAUDE.md en je templates aan met wat je leerde. Vanaf project twee begin je hoger. Dat is het hele punt.

---

*Deze werkwijze bouwt voort op de acht bronnen uit je eerdere analyse, aangevuld met gangbare praktijk voor het bouwen met AI-agents: spec-gedreven werken, dunne verticale plakjes, verificatie-poortjes en een gedeeld document als bron van waarheid.*
