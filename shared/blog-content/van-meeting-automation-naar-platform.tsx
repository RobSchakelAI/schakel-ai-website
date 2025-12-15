export const vanMeetingAutomationNaarPlatformContent = `
In een eerdere post schreef ik over hoe we ons Meeting Automation Center bouwden. Van Fireflies webhook tot taken in Productive, notulen in SharePoint en conceptmails in Outlook. Het complete verhaal, stap-voor-stap.

Deze post gaat niet over hoe het werkt.
Deze post gaat over waarom het werd wat het nu is.

Want wat begon als "laten we meeting follow-up automatiseren" evolueerde naar iets veel groter. En die evolutie—van simpele n8n flow naar multi-tenant platform—leerde ons meer over de toekomst van software dan we vooraf hadden kunnen bedenken.

---

## Van n8n naar "wacht, we kunnen dit beter"

We begonnen in n8n.
Gewoon om te testen of meeting automation überhaupt realistisch was.

Het antwoord: ja, maar beperkt.

We konden het transcript ophalen, Claude aanroepen, data wegschrijven. Het werkte. Maar we liepen constant tegen dezelfde frustraties aan:

**Geen controle over de gebruikerservaring**
We wilden een UI waar je kunt zien wat er gebeurt. Waar je resultaten kunt checken voor ze weggeschreven worden. Waar je instellingen kunt aanpassen zonder een flow te moeten herbouwen.

n8n biedt dat niet. Je hebt een flow-builder, geen applicatie.

**Je moet altijd terug naar de backend**
n8n heeft prima debugging—je kunt zien wat er misgaat. Maar je moet daarvoor altijd terug naar de n8n interface. Niet ideaal als je wilt dat gebruikers zelf inzicht hebben, of als je een team hebt dat niet in flows wil duiken.

**Geen configuratie-laag voor eindgebruikers**
Elke wijziging betekent de flow openen, nodes aanpassen, opslaan. Geen settings-scherm, geen role-based access, geen tenant-specifieke instellingen. Het blijft een tool voor de builder, niet voor de gebruiker.

**En n8n is low-code, maar niet "no-code"**
Je moet leren hoe n8n werkt. Hoe nodes werken, hoe expressions werken, hoe je errors afvangt. Het is vrij technisch. Je moet er tijd in steken om het goed te kunnen gebruiken.

En toen realiseerden we:

Als we toch een nieuw systeem moeten leren, waarom zouden we dan n8n leren in plaats van bouwen in eigen code?

In een andere post schreef ik uitgebreid over waarom we kozen voor vibecoding boven low-code: eigenaarschap, flexibiliteit, geen vendor lock-in. Dat verhaal ga ik hier niet herhalen.

Het punt is: we stapten over naar eigen code.

---

## Het moment waarop het groter werd

En toen hadden we een discussie.

We waren bezig met de database opzetten. PostgreSQL via Supabase.

De praktische vraag: bouwen we dit single-tenant of multi-tenant?

Single-tenant = simpeler, sneller te bouwen.
Multi-tenant = meer werk, maar schaalbaar.

We hadden geen klanten. Het was voor onszelf.
Dus waarom multi-tenant?

En toen zei ik: "Wacht. Als we dit over 6 maanden wél willen uitbreiden, moeten we dan niet alles herbouwen?"

Data scheiding met Row Level Security.
Role-based access control.
Configureerbare instellingen per organisatie.
Encrypted settings.

Met vibecoding was het plotseling realistisch om dit meteen goed te doen.

Niet omdat we al klanten hadden.
Maar omdat we wisten: dit kán groter worden. En dan willen we er klaar voor zijn.

Dat was het moment waarop dit platform van "automation voor onszelf" werd naar "systeem dat we aan het bouwen zijn met bredere toepassingen."

---

## Wat er tijdens het bouwen gebeurde

En toen begon het systeem eigenschappen te krijgen die we niet vooraf hadden bedacht.

Niet omdat we de scope groter maakten.
Maar omdat elke stap nieuwe mogelijkheden opleverde:

"We moeten kunnen zien welke meetings verwerkt zijn"
→ Dashboard met statistieken

"We moeten fouten kunnen debuggen"
→ Log viewer met error tracking

"We moeten kunnen instellen hoe samenvattingen eruitzien"
→ Template editor met live preview

"We moeten kunnen bepalen welke meetings wel/niet verwerkt worden"
→ Meeting categorization met confidence scores

"We moeten kunnen zien wat er in de pipeline gebeurt"
→ Pipeline visualisatie

Elke feature voegde een laag toe:

• Multi-tenant architectuur (met proper data isolation)
• Front-end configuratie (geen code aanpassen voor settings)
• Dashboard voor inzichten
• Log viewer voor troubleshooting
• Pipeline visualisatie om te zien wat er draait
• Meeting overzicht met historie
• Role-based permissions (superadmin, admin, member)

En toen realiseerden we: dit is geen automation meer.

---

## MeetingOps-engine: de categorie tussen automation en SaaS

Het platform past niet meer in één hokje.

**Het is een automation...**
...want het draait autonoom. Webhook komt binnen → verwerken → wegschrijven. Zonder menselijke input.

**Maar het is meer dan een automation...**
...want gewone automations hebben geen:

• Dashboard waar je inzichten krijgt
• UI waar je configuraties aanpast
• Log viewer waar je troubleshoot
• Pipeline visualisatie waar je ziet wat er gebeurt
• Multi-tenant architectuur met RLS
• Role-based access control

**Maar het is ook geen klassieke SaaS...**
...want je werkt er niet dagelijks in. Het is geen workspace waar je taken uitvoert.

De UI is geen plek waar je werk doet.
Het is een operations center waar je overzicht hebt.

Een cockpit voor je meeting workflows.
Een controlescherm voor automatisering.
Een auditor die laat zien wat er gebeurd is.

Wij noemen dit een **MeetingOps-engine**:

Een systeem dat de volledige operatie na een meeting uitvoert (autonoom), én de controle- en inzichtlaag biedt die je van volwassen software verwacht (transparant).

Het werkt op de achtergrond.
Maar je hebt altijd volledige transparantie en controle wanneer je dat wilt.

---

## Het "uit de hand lopen" waar we dankbaar voor zijn

Eerlijk: ja, het platform werd groter dan we aanvankelijk planden.

We begonnen met "transcript ophalen en samenvatten".

Nu hebben we een volledig systeem met multi-tenant architectuur, dashboards, log viewers, pipeline visualisatie, configureerbare templates, meeting categorization en integraties met 4 systemen (met 5 meer in de planning).

Maar hier is het ding:

Precies dit "uit de hand lopen" maakte het waardevol.

Want tijdens het bouwen ontdekten we:

• Wat er écht nodig is voor betrouwbare automation (niet alleen de happy path)
• Hoe je software schaalbaar maakt zonder over-engineering
• Waar de grenzen van automation liggen en waar menselijke controle nodig is
• Hoe je iets bouwt dat meegroeit met een organisatie in plaats van statisch blijft

En vooral: hoe software fundamenteel aan het veranderen is.

---

## Ons platform als ontdekkingsreis

Want tijdens het bouwen realiseerden we iets groters.

Software verandert.

Niet meer applicaties waar je in werkt, maar systemen die werk voor je doen.
Niet meer statische tools, maar adaptieve workflows.
Niet meer features, maar capabilities die je kunt combineren.

Ons Meeting Automation Platform werd het vehicle om deze verschuiving te begrijpen:

Van automation → naar applicatie → naar platform → naar MeetingOps-engine → en straks: naar een agentic systeem.

Niet in theorie.
Maar in de praktijk, met echte meetings, echte data, echte fouten en échte oplossingen.

---

## Waar het systeem nu staat

We gebruiken het platform dagelijks. Elke klantmeeting, elke interne sessie gaat erdoorheen.

Het werkt stabiel.
Het bespaart ons wekelijks uren.
En het wordt steeds beter.

Maar het belangrijkste is dit:

Dit is geen eindproduct.
Dit is een platform dat meegroeit.

Het fundament is gelegd:

✅ Multi-tenant met proper data scheiding
✅ Configurabel zonder code aan te passen
✅ Modulair opgebouwd
✅ Volledig inzichtelijk
✅ Betrouwbaar met error handling

En dat fundament maakt het perfect voor de volgende stap.

---

## De brug naar de toekomst

In de komende posts delen we wat we zien gebeuren:

**Post 2: De toekomst van software - van tools naar autonome workflows**
Waarom software verschuift van applicaties naar autonome systemen. Hoe "capabilities" de bouwstenen worden van toekomstige software. En waarom dit software radicaal persoonlijk maakt.

**Post 3: Hoe we ons Meeting Automation Platform voorbereiden op een agentic toekomst**
Hoe we het systeem ombouwen van vaste pipeline naar capability-based architectuur. Wat dat concreet betekent. En welke stappen we nemen richting een volledig agentic systeem dat zichzelf kan aanpassen.

Dit is geen theorie.
Dit is wat we aan het bouwen zijn.

Ons Meeting Automation Platform is ons laboratorium om de toekomst van software te ontdekken.

---

## Slotgedachte

Het begon als "kunnen we meeting follow-up automatiseren?"

Het werd een MeetingOps-engine met multi-tenant architectuur, dashboards, configuratie-lagen en integraties.

En nu wordt het ons vehicle om te ontdekken hoe software eruitziet in een wereld waar AI niet alleen assisteert, maar werk uit handen neemt.

We weten niet alles.
Maar we bouwen het. We gebruiken het. We leren ervan.

En we zien elke dag in de praktijk:

Software die meedenkt, meegroeit en werk uit handen neemt, is niet de toekomst.

Het is nu.

---

Benieuwd hoe het platform intern werkt? Lees de technische deep-dive over hoe we de volledige pipeline bouwden.

Wil je weten waarom we kozen voor vibecoding boven low-code? Lees waarom wij niet meer bouwen met low-code.

In de volgende post: waarom de hele software-industrie beweegt van statische applicaties naar autonome workflows—en wat dat voor bedrijven betekent.
`;
