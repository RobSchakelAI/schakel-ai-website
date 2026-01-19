export const mapVoorbereidenAgenticToekomstContent = `
In mijn vorige post schreef ik over de verschuiving van tools naar autonome systemen. Over software die niet alleen ondersteunt, maar werk uitvoert. En over het moment waarop software zicht krijgt op haar eigen kwaliteit, en zich kan verbeteren: [de toekomst van software](/blog/toekomst-van-software).

Mooi verhaal, toch? En nu nog in de praktijk brengen.

Dit is wat er gebeurt als je de theorie in praktijk probeert te brengen, met ons eigen Meeting Automation Platform (MAP) als proeftuin.

---

## Waar we tegenaan liepen

Ons MAP doet wat het moet doen, maar het is op dit moment nog wel een lineaire flow. Transcripten ophalen, notulen maken, documenten opslaan op SharePoint, mails klaarzetten in Outlook, taken aanmaken in Productive. Het werkt en het bespaart ons echte tijd.

En dat is voorlopig prima. Maar we bouwen niet alleen voor nu, we bouwen om te leren wat er allemaal mogelijk is en hoe we kúnnen voorbereiden op die mogelijkheden. Dus de vraag die we ons stelden was: hoe kunnen we ons meeting platform nu al zo bouwen dat we het kunnen uitbouwen naar een agentic systeem?

---

## Van vaste pipeline naar bouwstenen

De kern van wat we nu aan het veranderen zijn is dit: elke actie die het platform uitvoert, wordt een zelfstandige "capability". Geen onderdeel van een flow meer, maar een op zichzelf staande bouwsteen.

- fetch_transcript
- summarize_meeting
- upload_document
- create_tasks
- send_followup_draft

Allemaal losse bouwstenen die we kunnen combineren. In de basis lijkt dit simpelweg een variabele, een stukje code dat je ergens gebruikt of hergebruikt, maar door het te verrijken wordt het méér dan dat.

Elke capability heeft een uitgebreide beschrijving over wat het doet, wat het nodig heeft, wat het oplevert, met validatie en duidelijke grenzen. En belangrijke metadata zoals: Is deze actie destructief? Maakt het iets aan in externe systemen? Is het omkeerbaar? Vereist het goedkeuring van een mens?

Al deze metadata is momenteel nog niet nodig voor hoe het systeem gebruikt wordt, maar straks gaan we het wél nodig hebben. Want als je software autonoom wil laten beslissen welke stappen nodig zijn, moet het weten wat er mogelijk is, waar het beschikking over heeft, hoe het werkt, wat veilig is, wat risicovol is, wat menselijke invloed nodig heeft.

En daar zit het verschil met "gewoon modulair bouwen". We bouwen dit niet om code overzichtelijker of herbruikbaarder te maken. We bouwen dit zodat "een agent" straks deze capabilities kan combineren. Zodat software niet langer een vast proces hoeft te volgen, maar zelf kan bepalen: voor dit type meeting heb ik deze stappen nodig, voor dat type andere. En daarvoor moet elke capability niet alleen technisch los staan, maar ook beschreven zijn op een manier die een AI kan interpreteren.

Dat maakt het fundamenteel anders. En hoewel onze MAP dit nu nog niet vereist, willen we dit nu alvast wel zo inrichten. Want we gaan die agent bouwen en we gaan hem/haar/het toegang geven tot de capabilities binnen onze applicatie.

---

## Leren van wat mensen corrigeren

En dan het tweede dat we inbouwen: feedbackloops.

Elke keer dat we iets aanpassen — een samenvatting wijzigen, een categorie corrigeren, een taak verwijderen — loggen we dat. Niet als fout, maar als signaal. We doen er nu nog niks mee, maar we verzamelen. Want als software moet leren, moet je eerst zien waar het afwijkt van wat we willen.

Die data, over waar de AI dingen anders heeft gedaan dan wij hadden gewild, vormen straks de basis voor: "Deze categorie wordt nooit correct herkend, we moeten de beschrijving aanpassen". Of "lange zinnen worden altijd verwijderd uit de notulen, laten we de prompt voor de AI aanpassen". Of "deze taken worden altijd direct verwijderd of afgevinkt, laten we ze alleen nog maar noemen, maar niet als taak definiëren".

We hebben dit nog niet gebouwd, laat staan dat het autonoom werkt. Maar de eerste delen van de infrastructuur staan. We loggen de afwijkingen, de herkansingen. En we beginnen patronen te zien. En dat is al heel leerzaam, want je ziet waar de AI systematisch afwijkt van wat mensen willen. En dat zijn soms dingen die je verwacht, maar vaak ook niet.

---

## Slimmer ja, blind vertrouwen nee

Software die zelf beslist, die leert, die zich aanpast, dat klinkt best een beetje eng. En terecht. Maar het is wel waar de wereld naartoe gaat en we bouwen daarom controle in vanaf het begin.

Wat dat betekent? Elke actie die iets aanmaakt buiten ons platform — een taak in Productive, een mail in Outlook, een document op SharePoint — gaat eerst door een goedkeuringsflow. We loggen alles. En wij/de gebruikers bepalen welke stappen automatisch mogen en welke niet.

Onze MAP wordt slimmer, maar wij blijven zelf aan het stuur. Want autonomie zonder controle is geen vooruitgang, maar een risico.

Slimmer worden? Ja. Blind vertrouwen? Nee.

---

## Wat dit oplevert

Op dit moment verandert er aan de frontend nog weinig. De grootste winst zit onder de motorkap. Maar wat we nu bouwen? Dat is het fundament voor iets dat over 6 maanden, een jaar, compleet anders werkt. Wanneer ons systeem zichzelf gaat verbeteren en wanneer we een of meerdere "agents" hebben gebouwd die taken kunnen uitvoeren in ons platform. Eerst nog op ons verzoek en na onze expliciete goedkeuring, maar straks autonoom.

We bouwen nu het fundament zodat die stappen straks mogelijk zijn.

En wat nou echt het tofste is: hoeveel je leert door gewoon te bouwen. Niet alleen maar lezen of YouTube-video's kijken over AI, maar gewoon zelf bouwen, toepassen, leren en verbeteren. Dan leer je wat er werkelijk kan, wat het werkelijk betekent en ga je de oneindige mogelijkheden zien van wat we allemaal kunnen bouwen.

Simon en ik zeggen wekelijks wel tegen elkaar: "Als je het kunt bedenken, kun je het bouwen". En dat is het echt.

En dat leer je niet uit een blog, of boek, een YouTube-video of een "AI Masterclass". Dat ontdek je door het gewoon te doen, te bouwen en te kijken wat er gebeurt.

---

## Waar dit naartoe gaat (en waar we nog láng niet zijn)

Dit is fase 1. De volgende stappen?

1. We gaan een agent bouwen die capabilities kan gebruiken op ons verzoek (fase 2)
2. Dan laten we die agent zelf bepalen welke capabilities wanneer nodig zijn (fase 3)
3. Vervolgens gaat het platform voorstellen doen op basis van patronen (fase 4)
4. En uiteindelijk? Volledig agentic: het past zichzelf aan, met controle, maar zonder dat wij er continu bij hoeven (fase 5)

Daar zijn we nog láng niet. Maar we bouwen ernaartoe, stap voor stap, en het is echt tof om te zien hoe elke stap nieuwe vragen, nieuwe uitdagingen en nieuwe mogelijkheden blootlegt.

---

## Wat ik tot nu toe leer

Autonome, zelflerende software is geen magie, geen feature. Het is bewust gekozen architectuur. Je moet het vanaf de basis ontwerpen. En dat betekent keuzes maken die nu overbodig lijken: structuren, fundamenten en metadata toevoegen die we nog niet gebruiken, feedback verzamelen die we nog niet analyseren. Maar zonder die basis kom je er niet.

We bouwen onze MAP deels als een tool die we dagelijks gebruiken, en deels als proeftuin om zelf te ontdekken, in de praktijk, waar de toekomst van software naartoe kan gaan, als je er actief en experimenteel op doorbouwt.

Soms werkt iets heel goed. Soms crasht het. Soms doet de AI iets totaal onverwachts waardoor je denkt: "Wacht... dat is eigenlijk slimmer dan wat ik had bedacht."

Maar het is altijd leerzaam. Altijd een stap verder.

AI, agents, living software. Hippe buzzwords die rondgeslingerd worden, maar ze krijgen echt betekenis en body als je gaat bouwen. Een agentic systeem? We bouwen er onbedoeld maar onvermijdelijk naartoe, en ik ben benieuwd wat we onderweg nog tegenkomen.
`;
