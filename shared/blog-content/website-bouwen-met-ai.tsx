export const websiteBouwenMetAIContent = `
**Kan je zonder programmeur een professionele website bouwen met AI?**
Ja. Wij deden het. En het werkte verrassend goed.

We hebben onze website zelf gevibecoded.
Niet omdat het moest, maar omdat we wilden testen hoe ver je komt als je:

- geen programmeur bent,
- wél snapt hoe systemen werken,
- én AI slim inzet om het zware werk te doen.

Mijn achtergrond ligt in finance en BI. Dus ik kan prima nadenken in processen, datastructuren, afhankelijkheden en logica.
Maar dingen als React, Vite, bundlers, CORS (Cross-Origin Resource Sharing: de regels die bepalen welke websites met elkaar mogen praten), UI components… dat was allemaal vrij nieuw voor me.

Toch kun je tegenwoordig een website bouwen met AI, zolang je:

1. weet wat je wil bouwen,
2. logisch nadenkt,
3. en AI niet dom volgt, maar kritisch gebruikt.

Dit was trouwens niet onze allereerste AI-first build.
Vorig jaar bouwden we onze eerste gevibecode website — dat was de échte vuurdoop waar we alles voor het eerst uitvogelden.
Sindsdien hebben we meerdere webapplicaties gebouwd (een website is natuurlijk een vrij simpele webapplicatie).
Over die eerste projecten heb ik nooit publiekelijk geschreven.

Maar de lessen, de struggles, de doorbraken — die zijn universeel.
Dus dit verhaal gaat over hoe we schakel.ai bouwden, maar de ervaring die je hier leest? 
Die komt uit al die projecten samen.

Hier het eerlijke, volledige verhaal.

---

## AI-first bouwen — dit is hoe wij werken {#ai-first-bouwen}

Bij [Schakel](https://schakel.ai) proberen we alles opnieuw te bekijken.

Niet omdat we het beter weten, maar omdat dit het juiste moment in de geschiedenis is om processen vanaf nul te herontwerpen.

Onze basisvragen:

**Hoe zou je dit vandaag bouwen als je helemaal opnieuw mag beginnen?**

**Kunnen we dit (deels) door AI laten maken, en zelf de kwaliteit bewaken?**

Je hoeft geen fulltime developer te zijn om met AI een website te bouwen —
maar je moet wél snappen wat je aan het doen bent.

De website was een ideaal testproject:
klein genoeg om helder te blijven, groot genoeg om alle onderdelen écht tegen te komen.

---

## Waarom deze architectuur — future-proof zonder gedoe {#architectuur}

We hadden deze site in een dag op één platform kunnen zetten,
maar dat was níet het doel.

We wilden een setup die:

- modulair is
- schaalbaar is
- AI-first werkt
- netjes te debuggen is
- logisch is voor grotere projecten

Daarom werken we standaard met twee lagen:

**1. Core Stack → de vaste basis**
Deze verandert niet snel.

**2. Build Tooling → per project, per vibe**
Wat nu logisch is, kan over een jaar anders zijn.

Dat geeft rust en duidelijkheid. Vooral als je snel wilt bouwen.

---

## Onze Schakel Core Stack (de stabiele basis onder alles) {#core-stack}

Deze tools vormen de fundering van onze manier van bouwen:

- [Supabase](https://supabase.com) → auth, database, storage, edge functions
- [Vercel](https://vercel.com) → super snelle frontend hosting
- [Railway](https://railway.app) → Node runtimes & microservices
- [GitHub](https://github.com) → version control + CI/CD (Continuous Integration/Deployment: automatisch testen en deployen)
- [Replit](https://replit.com) → vibecoding + AI agents
- Codex → AI code reviewer
- LLM's: ChatGPT, Claude, Gemini, Grok, Perplexity
- [Schakel Development Standards](https://schakel.ai) → onze eigen spelregels

Voor deze website hadden we géén database nodig, dus we bleven bij in-memory opslag + MailerSend.

De kern:
Deze stack is getest, schaalbaar, en voelt logisch in de praktijk.

---

## Build tooling (voor deze site) — gewoon wat nu het lekkerst werkt {#build-tooling}

Voor deze site gebruikten we:

- React + TypeScript
- Vite
- Tailwind
- shadcn/ui

Niet omdat het "moet", maar omdat het:

- snel is,
- prettig itereren is,
- en AI goed met deze toolset overweg kan.

Ik ben niet begonnen met "React is de beste keuze",
maar met:
"Wat is de snelste manier om dit design en deze interacties te bouwen?"

React + Vite bleek voor nu het meest logisch.

---

## Frontend — vooral de animatie (en de tekst!) waren werk {#frontend}

Hier moet ik eerlijk zijn:
de hero-animatie was níet "AI deed dit wel even".

**We hebben echt veel iteraties gedaan**

- tientallen varianten
- heel veel prompts
- Agent 3 die soms compleet andere kanten opging
- dingen die te druk waren
- dingen die te simpel waren
- dingen die gewoon lelijk waren

**Veel sparren met Simon**

We hebben continu afgestemd:

- past dit bij Schakel?
- past dit bij wie wij zijn?
- voelt het modern maar niet schreeuwerig?
- klopt de vibe?

**70% itereren, 30% AI, 100% teamwork**

Replit Agent 3 maakte elke keer de ruwe versie.
Wij gaven richting, nuance en smaak.

**Maar de tekst… die was echt het meeste werk**

Omdat:

- het moet passen bij onze stijl
- het moet menselijk zijn
- niet marketingachtig
- niet stoffig
- niet te saai
- niet te blij
- en wel persoonlijk

AI kan je helpen oefenen, maar de inhoud moet van jezelf komen.
Dat merkten we hier heel sterk.

---

## Backend — simpel, duidelijk, en exact wat het moet doen (niet meer) {#backend}

De backend doet één ding:
het contactformulier verwerken.

Met:

- Express + TS
- Zod validatie
- Railway hosting
- MailerSend

Dat is alles.
En dat is precies genoeg.

**Flow**

1. formulier → POST
2. backend valideert
3. MailerSend stuurt mail
4. backend antwoordt
5. Umami logt

**CORS (vriendelijke uitleg)**

CORS is basically een regel-setje dat bepaalt wie tegen je backend mag praten.

Onze regels:

- schakel.ai
- www.schakel.ai
- localhost (tijdens bouwen)
- preview-URL's van Vercel en Railway

Custom middleware, geen wildcardgedoe.

---

## Deployment: frontend op Vercel, backend op Railway {#deployment}

Dit is misschien wel de keuze die het meeste rust geeft.

**Frontend → [Vercel](https://vercel.com)**
**Backend → [Railway](https://railway.app)**

Deze setup is eigenlijk overkill voor een simpele website zoals deze.
Maar het is precies hoe we willen werken.

Het is future-proof.
Het legt de basis voor grotere projecten.
Het maakt schalen makkelijk wanneer dat nodig is.

We bouwen niet voor nu, we bouwen voor straks.

---

## DNS: klein onderdeel, maar cruciaal {#dns}

DNS staat bij Namecheap.
Een paar records naar Vercel.
Dat was het.

DNS lijkt simpel, totdat het fout staat.
Dan werkt je hele website niet.

---

## Code review met AI — maar eerst: onze Schakel Standards {#code-review}

Voordat we het over code review hebben, iets belangrijks:

**We bouwen niet zomaar**

Op basis van eerdere builds hebben we Schakel Development Standards opgesteld.
Dit zijn onze eigen spelregels voor hoe code eruitziet, hoe componenten worden opgezet, en hoe alles met elkaar praat.

Tijdens het bouwen blijven we continu scherp op:

- gecentraliseerde code (niet overal hetzelfde herhalen)
- consistente naming
- logische structuur
- herbruikbaarheid
- schaalbaarheid

AI kan snel bouwen, maar zonder standaarden krijg je rommel.
Wij zorgen dat alles netjes blijft — van eerste commit tot laatste deploy.

**Dan pas komt de review**

Dit is een workflow die we vaker gaan gebruiken:

**Stap 1: AI (Codex) doet de eerste review**

Codex checkt:

- structuur
- naming
- type fouten
- inconsistenties
- kleine optimalisaties
- afwijkingen van onze standards

Het haalt de ruis eruit, zodat je niet alles handmatig hoeft na te lopen.

**Stap 2: programmeur doet de final check**

Die kijkt:

- klopt de logica echt?
- is dit herbruikbaar?
- blijft dit stabiel als we uitbreiden?
- klopt het binnen onze architectuur?
- ziet dit eruit zoals wij willen?

AI maakt het snel.
Mens maakt het goed.
Standaards maken het consistent.

En precies deze combi maakt bouwen écht haalbaar als je geen fulltime developer bent.

---

## Analytics: Umami (licht, cookieloos, simpel) {#analytics}

We gebruiken [Umami](https://umami.is) omdat het precies genoeg data geeft zonder gedoe.

We meten:

- pageviews
- sectie-views
- taalwissels
- thema-toggles
- navigatie
- form-submits

Geen cookies.
Geen banners.
Geen irritatie.

---

## AI tijdens bouwen & schrijven: supercharger, geen vervanging {#ai-tijdens-bouwen}

AI heeft geholpen bij:

- eerste drafts
- brainstorms
- debug hints
- code sanity checks
- refactor suggesties
- tekststructuur

Maar:
de keuzes, de smaak, de logica en het verhaal waren menselijk.

AI maakt je tien keer sneller,
maar alleen als je zelf precies weet wat je wil.

---

## Vibecode-notities: wat tegenviel en wat meeviel {#vibecode-notities}

**Agent 3 is bizar!**
Probeer het zelf, simpelweg bizar. Een aanzienlijk verschil met maanden geleden. De kwaliteit van wat het genereert is echt next level.

**Blijf bij de les, en let op de details**
Replit's eerste versie lijkt geweldig, maar the devil is in the details. En dan begint het werk pas echt. Die laatste 20% kost 80% van je tijd.

**Besef altijd dat een LLM met je meepraat**
Het is nooit kritisch genoeg. Zorg dat je continue kritisch blijft en de LLM challenged op wat hij voorstelt of zegt. Hij zal vrijwel altijd "ja dat klopt" zeggen, ook als het niet klopt.

**Denk goed na over architectuur**
Zorg dat je goed nadenkt over hoe processen lopen en hoe de flow van de applicatie is. Denk echt goed na over de architectuur voordat je begint. AI helpt je bouwen, maar niet met strategisch denken.

**Spar met meerdere LLM's**
Spar met een LLM en spar daarna met een andere LLM. Wees superkritisch. Claude zegt soms iets anders dan ChatGPT. Gebruik dat.

**Keep it simple: less is more**
Elke extra feature is extra complexity. Elke extra animatie is iets dat kan breken. Begin minimaal, voeg toe wat echt nodig is.

**Let op je budget met Replit**
Gebruik LLM's waar je al een vast maandbedrag voor betaalt, en niet alleen via Replit. Kan wel, maar de rekening wordt bepaald aan de hand van gebruik. Kan snel oplopen.

**Heb geduld!**
Blijf itereren totdat het echt goed is. En probeer je laptop niet uit het raam te gooien. Sommige bugs zijn frustrerend, maar bijna altijd oplosbaar.

**Documenteer je keuzes**
Schrijf op waarom je iets op een bepaalde manier deed. Over twee maanden weet je het niet meer. Future you zal dankbaar zijn.

**Test in verschillende browsers**
Wat werkt in Chrome werkt niet altijd in Safari. Wat werkt op desktop werkt niet altijd op mobile. Test vroeg, test vaak.

**Version control is je vriend**
Commit vaak, met duidelijke messages. Als iets kapot gaat, kun je terug. Git is je parachute.

---

## Slot {#slot}

Het eindresultaat is een website die:

- snel is
- modern is
- AI-first is
- technisch netjes in elkaar zit
- en precies past bij wie wij zijn

En misschien nog het belangrijkste:
het was leuk om te bouwen.

Want dát is precies waar Schakel voor staat:
slimmer bouwen, niet ingewikkelder.

---

**Wil je ook AI-first bouwen?** 
[Bekijk onze aanpak](https://schakel.ai) of [neem contact op](https://schakel.ai/#contact) voor een gesprek over jouw project.

---

## Veelgestelde vragen over website bouwen met AI

**Heb je programmeerervaring nodig om met AI een website te bouwen?**
Nee, geen programmeerervaring maar wel logisch denkvermogen. Je moet systemen kunnen begrijpen en AI kritisch kunnen gebruiken, niet klakkeloos volgen.

**Welke AI tools zijn het beste voor website development?**
Wij werkten vooral met Replit Agent 3, ChatGPT, en Claude. Daarnaast gebruikten we Codex voor code reviews. De combinatie van meerdere tools werkt beter dan één tool alleen.

**Hoeveel tijd kost het om een website te bouwen met AI?**
Dat hangt af van complexiteit. Voor een eenvoudige site: 1 of 2 dagen. Voor onze site met custom animaties en een boodschap die echt goed moest zijn: een klein weekje, waarbij iteratie en verfijning het meeste tijd kostten.

**Is een AI-gebouwde website even goed als een handmatig gecodeerde?**
Als je AI goed gebruikt, zelf kwaliteit bewaakt en de code laat reviewen: ja. Maar het kan ook heel snel spaghetti worden. Dat heb je zelf in de hand.
`;
