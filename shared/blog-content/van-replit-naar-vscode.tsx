export const vanReplitNaarVscodeContent = `
Je tools werken. Tot ze het niet meer doen.

Niet omdat ze kapot zijn. Niet omdat ze slecht zijn. Maar omdat je behoeften veranderen naarmate je projecten groeien en complexer worden.

Dit is het verhaal van hoe onze development omgeving evolueerde, van Replit naar een lokale VS Code setup met Claude Code. Niet omdat Replit slecht is (integendeel), maar omdat we tegen een fundamentele beperking aanliepen die ons dwong om te veranderen.

---

## Waar het begon

In een eerdere post over [hoe we schakel.ai bouwden](/blog/website-bouwen-met-ai) schreef ik uitgebreid over Replit. Over hoe je zonder programmeur een professionele website kunt bouwen. Over Agent 3 die "simpelweg bizar" is. Dat is het nog steeds.

En in [AI Coding Tools Begrijpen](/blog/ai-coding-tools-begrijpen) legde ik het drielagen-framework uit: je IDE (waar je werkt), je AI Agent (wie het werk doet), en je Model (het brein erachter). Die drie lagen bepalen samen hoe effectief je bouwt.

En waar we de 2e laag al hebben gewisseld, zijn we nu ook de eerste laag, je IDE, aan het wisselen. Ook deze keuze is niet statisch. Die verschuift. En wanneer dat gebeurt, verandert er een hoop.

---

## De reis in stappen

Laat me even de tijdlijn schetsen, want het was geen plotselinge switch. Het was een geleidelijke evolutie, gedreven door praktische problemen.

**Stap 1: Replit + Replit Agent**
Hier begon het allemaal. Replit is fantastisch voor vibecoding. Alles in de cloud, geen setup, direct bouwen. Agent 3 maakt de ruwe versie, jij geeft richting en smaak. Precies zoals ik eerder schreef.

Maar: de kosten liepen op. Rond de \u20AC1.000 per maand aan API-gebruik. Voor een startup die net begint, is dat fors.

**Stap 2: Replit + OpenCode + eigen Claude abonnement**
We ontdekten dat je een open-source tool genaamd OpenCode in Replit kon draaien, met je eigen Claude Max abonnement. Zelfde kwaliteit, maar dan voor \u20AC180 per maand in plaats van \u20AC1.000. Een besparing van ruim \u20AC800 per maand.

**Stap 3: Anthropic trekt de stekker eruit**
En toen kwam de verrassing: Anthropic blokkeerde het gebruik van hun consumer-abonnement via third-party tools. OpenCode werkte van de ene op de andere dag niet meer. Maar in plaats van terug naar af te gaan, stapten we over op Claude Code, Anthropic's eigen agentic coding tool die w\u00E9l werkt met je Max abonnement.

**Stap 4: Claude Code in Replit**
Claude Code draait prima in Replit's terminal. De voordelen van instant deployment, live preview en werken op je mobiele telefoon. Probleem opgelost, zou je denken. Maar er was nog iets.

---

## De echte reden: ge\u00EFsoleerde kennis

En hier zit het eigenlijke verhaal, want het gaat niet over tools of kosten.

Naarmate we meer projecten tegelijk gingen draaien, onze LinkedIn Content Automation, het Meeting Automation Platform, drie verschillende klantprojecten en onze website, merkten we iets frustrerends.

**Elk Replit-project is een ge\u00EFsoleerde sandbox.**

Dat betekent: de Pipedrive-integratie die we voor een klantproject hadden uitgedacht? Die kennis bestaat niet in het LinkedIn-project. De Supabase auth-flow die we al drie keer hadden opgezet? Elke keer opnieuw uitleggen. Onze eigen Schakel Development Standards? Per project handmatig kopi\u00EBren.

Je zou denken: maak een gedeeld GitHub repository met al die kennis en koppel dat aan elk project. Maar Replit heeft een harde beperking: **\u00E9\u00E9n priv\u00E9 GitHub repo per project**. En die plek is al bezet door het project zelf.

De enige optie was om ons knowledge repo publiek te maken (nee), of het handmatig in elk project te kopi\u00EBren en synchroon te houden (nee, nee, nee).

Dat schaalt simpelweg niet, en voor een agency die steeds meer projecten tegelijk runt is dat een dealbreaker.

---

## De oplossing: lokaal werken met centraal geheugen

Claude Code heeft een feature die alles veranderde: \`--add-dir\`.

\`\`\`
claude --add-dir ~/schakel-knowledge
\`\`\`

E\u00E9n commando dat een extra directory koppelt aan je Claude Code sessie. Ongeacht welk project je open hebt, Claude kan altijd bij je gedeelde kennis.

Dat betekent: \u00E9\u00E9n centraal knowledge repo op je laptop, met daarin:

- **Skills**: Hoe we Pipedrive, MailerSend, LLM's, etc integreren, hoe onze Supabase auth werkt, RLS set up
- **Frameworks**: Het Schakel Framework, onze client discovery methode
- **Templates**: Hoe een CLAUDE.md eruitziet, hoe we architectuur documenteren
- **Learnings**: Veelgemaakte fouten, tech stack beslissingen, wat wel en niet werkt

Elk project verwijst naar dezelfde bron. Geen duplicatie, geen sync-problemen. Alles in Git. En het wordt met elk project slimmer, want elke les die we leren voegen we \u00E9\u00E9n keer toe en is overal beschikbaar.

**Maar dat werkt alleen lokaal.** Niet in Replit's cloud. Niet in een browser-IDE. Alleen als je een eigen filesystem hebt waar je mappen kunt delen.

En daar begon de zoektocht naar de juiste lokale setup.

---

## VS Code vs Cursor: de keuze

Even eerlijk: Cursor ziet er aantrekkelijk uit. Het is gebouwd op VS Code, maar dan met AI-features erin gebakken. Tab completions die meerdere regels voorspellen, background agents, codebase indexing, Cursor Rules.

Maar als je goed kijkt naar wat je \u00E9cht nodig hebt:

**Cursor's sterke punten** (\u20AC20-200/maand):
- Slimme multi-line autocomplete
- Eigen AI agent met Plan Mode
- Codebase indexing en @Docs
- Multi-model switching

**Wat ik daadwerkelijk gebruik:**
- Claude Code als mijn primaire agent (niet Cursor's agent)
- Claude Code's eigen codebase-begrip (niet Cursor's indexing)
- \`--add-dir\` voor mijn knowledge repo (Cursor ondersteunt dit niet)

Dus betaal ik \u20AC20-200 per maand voor... tab completions? Die zijn fijn, maar niet essentieel. Zeker niet als je net je maandelijkse kosten van \u20AC1.000 naar \u20AC180 hebt teruggebracht.

**De beslissing:** start met VS Code (gratis), en upgrade naar Cursor alleen als ik die autocomplete \u00E9cht ga missen na een maand. Pragmatisch, niet dogmatisch.

---

## Claude Code: CLI, Extension, of Desktop App?

Dit is waar het voor veel mensen verwarrend wordt. Claude Code is namelijk niet \u00E9\u00E9n ding, maar beschikbaar op meerdere plekken, elk met een eigen karakter.

**Claude Code CLI (in je terminal)**
Je opent een terminal, navigeert naar je project, typt \`claude\`. Puur tekst, geen visuele franje, maar wel de volledige feature set: \`--add-dir\` voor je knowledge repo, scripting, automation en tab completion. Voor power users is dit waar het echte werk gebeurt.

**Claude Code Extension (in VS Code)**
Een sidebar panel naast je code. Je ziet je bestanden links, de chat rechts, en diffs direct in je editor. Je kunt screenshots erin plakken, files @-mentionen en terminal output refereren. Het deelt conversation history met de CLI, dus je kunt naadloos wisselen. In de praktijk wordt dit je dagelijkse werkplek: code en AI naast elkaar.

**Claude Code in de Desktop App (Code tab)**
De Claude Desktop app heeft naast Chat en Cowork ook een Code tab. Je selecteert een project folder via een visuele file picker, en je kunt meerdere sessies parallel draaien via Git worktrees.

Klinkt ideaal, maar de ervaringen zijn gemengd. Developers noemen het "clunky" en "lacking" vergeleken met de IDE-experience. Geen ingebouwde file browser, geen code naast de chat. Het is beter geschikt voor architectuur en planning dan voor daadwerkelijk bouwen. Zelf ervaar ik voornamelijk een chat-sessie met te veel dingen op de achtergrond ipv de rijke ervaring in een IDE.

**De consensus die ik overal terugzie:**
- IDE extension = waar je **bouwt**
- CLI = waar je **automatiseert**
- Desktop App Code tab = waar je **plant**

Voor mijn dagelijkse workflow: VS Code met de Claude Code extension als primaire werkplek, CLI in de integrated terminal voor \`--add-dir\` en automation.

---

## Even terzijde: Claude is niet \u00E9\u00E9n tool

Dit verbaast mensen vaak. Als ik zeg "Bij Schakel werken we met Claude", denken ze aan de chatbot. Maar Claude is inmiddels een heel ecosysteem:

**Claude Chat** is voor sparren, brainstormen en kennis opdoen. De "even snel iets vragen" modus. Hier plannen we, denken we na, en schrijven we (zoals deze blog).

**Claude Code** is voor bouwen. In je IDE, in je terminal, of in de desktop app. Dit is de agentic tool die je codebase begrijpt en er daadwerkelijk in werkt.

**Claude Cowork** is voor alles buiten code. Excel-bestanden maken, PowerPoints bouwen, documenten organiseren. Claude krijgt toegang tot je filesystem en d\u00F3\u00E9t het werk, in plaats van alleen adviseren.

Drie tools, elk met een eigen kracht, en samen vormen ze een workflow die veel breder is dan "een AI chatbot".

---

## De mobile escape hatch: GitHub Codespaces

E\u00E9n ding dat ik mis van Replit: de mogelijkheid om overal te werken. Laptop, tablet, telefoon, het maakte niet uit. Lokaal werken met VS Code betekent in principe: alleen op je desktop/laptop.

De oplossing: **GitHub Codespaces**. Wat veel mensen niet weten is dat Codespaces letterlijk VS Code is, maar dan in de cloud. Gemaakt door Microsoft, net als VS Code zelf. Zelfde interface, zelfde extensions, zelfde keybindings. Zelfs de Claude Code extension werkt erin. Je kunt er priv\u00E9 repo's in clonen en werken alsof je lokaal zit. Kosten: \u20AC0,18 per uur voor een basisinstantie, en GitHub geeft gratis maandelijkse uren.

Het is niet perfect: je moet je knowledge repo apart clonen in elke Codespace, en het is net iets trager dan lokaal. Maar als escape hatch voor een laat-avond idee of een snelle fix onderweg is het meer dan goed genoeg.

---

## Wat dit oplevert

Het eindresultaat is een setup die er zo uitziet:

**Dagelijks werk:** VS Code + Claude Code lokaal
- Extension in de sidebar voor bouwen
- CLI in de terminal met \`--add-dir ~/schakel-knowledge\`
- E\u00E9n centraal knowledge repo dat elk project voedt

**Onderweg:** GitHub Codespaces
- Browser-based VS Code
- Voor snelle fixes en late-night idee\u00EBn

**Buiten code:** Claude Chat + Cowork
- Chat voor sparren en brainstormen
- Cowork voor Excel, PowerPoint, en documenten

**Kosten:** \u20AC180/maand (Claude Max)
- Versus \u20AC1.000/maand met Replit Agent
- Besparing: ~\u20AC800/maand, ~\u20AC10.000/jaar

---

## Wat ik hiervan leer

De grootste les is niet technisch, maar eerder een mindset:

**Je tools moeten meegroeien met je projecten.**

Replit was perfect toen we \u00E9\u00E9n website bouwden. Het is nog steeds fantastisch voor losse projecten. Maar zodra je meerdere projecten tegelijk runt, en kennis tussen die projecten wilt delen, loop je tegen de architecturale grenzen van een cloud-sandbox.

Dat is geen kritiek op Replit, het is een observatie over hoe je behoeften verschuiven naarmate je groeit.

En dat geldt niet alleen voor IDE's. Het geldt voor elk stuk tooling. De tool die je vandaag fantastisch vindt, kan morgen je bottleneck zijn. Niet omdat de tool slechter wordt, maar omdat jij verandert.

De kunst is om dat moment te herkennen en dan te durven switchen, zonder sentimentaliteit.

---

## Vibecode-notities

Wat ik meeneem naar de volgende fase:

**Wees eerlijk over wat je verliest**
Lokaal werken met VS Code betekent dat je Vercel, Railway en GitHub vanaf het begin moet inrichten voordat je iets live kunt laten zien. In Replit klik je op Deploy en het staat online. Dat verschil is re\u00EBel, en vooral voor beginners of snelle pilot-projecten is die drempel niet te onderschatten. Ik sluit niet uit dat ik voor een snelle pilot of proof-of-concept nog steeds in Replit zou beginnen, simpelweg omdat je binnen een uur iets werkends kunt laten zien aan een klant. De overhead van een volledige deployment pipeline is het op dat moment nog niet waard. Maar zodra een pilot serieus wordt en je het naar productie wilt brengen, migreer je naar je eigen stack. Dat is geen verspilling, dat is bewust faseren.

**Documenteer je keuzes**
Niet alleen w\u00E1t je bouwt, maar waar\u00F3m je bepaalde keuzes maakt. Over drie maanden weet je het niet meer. Je knowledge repo is je geheugen.

**Begin met gratis, upgrade als het moet**
VS Code in plaats van Cursor. Codespaces in plaats van een dedicated cloud IDE. Bespaar waar je kunt, investeer waar het telt.

**E\u00E9n bron van waarheid**
Het centraal knowledge repo is misschien wel de belangrijkste beslissing. Elke les \u00E9\u00E9n keer vastleggen, overal beschikbaar. Dat is hoe je als kleine agency kunt bouwen alsof je een groot team hebt.

**Tools zijn middelen, geen identiteit**
Ik was fan van Replit. Dat ben ik nog steeds. Maar fan zijn van een tool mag nooit de reden zijn om er aan vast te houden als het niet meer past.

---

Dit verhaal is nog niet af. De lokale setup draait nog maar net. Ik verwacht nieuwe lessen, nieuwe frustraties, en waarschijnlijk weer een verschuiving over een paar maanden.

Maar dat is precies het punt: je development omgeving is geen eindbestemming. Het is een reis. En de beste setup is de setup die past bij waar je n\u00FA bent, niet waar je vorig jaar was.

Wil je sparren over je eigen development setup of AI-workflow? [Neem contact op](https://schakel.ai/#contact).
`;
