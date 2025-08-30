PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-29
PROPOSAL_ID: SEP-101-R2 (Definitive Final Version)
TITLE: The Unified CognitiveAgent Model
STATUS: Supersedes SEP-101-R1 and all previous versions.
AFFECTED_COMPONENTS: The entire system architecture. This is a foundational design document.
OBJECTIVE: To define a single, universal agent class that serves as the building block for all intelligent operations in the system, replacing the previous multi-specialist team model with a more elegant, flexible, and robust fractal architecture.

1. Översikt och Evolution
Systemets arkitektur har utvecklats från en initial modell baserad på ett team av fasta specialister (Conscious, Coordinator, Core) till en mer fundamental, enhetlig och fraktal arkitektur. Den initiala specialist-modellen, även om den var logisk, medförde utmaningar kring komplex kommunikation mellan agenter, stelhet i problemlösningen och svårigheter att underhålla flera olika agent-typer med unik logik.

Den slutgiltiga arkitekturen baseras istället på en enda, universell agent-klass: CognitiveAgent. Denna agent är designad för att vara rekursiv; den kan skapa och delegera uppgifter till nya, konfigurerade instanser av sig själv. Den fungerar som en "stamcell" som kan specialiseras för vilken uppgift som helst. Denna enhetliga modell är mer psykologiskt trovärdig, då den speglar en generell intelligens som anpassar sig till olika problem, snarare än en samling av fasta, isolerade moduler.

2. Kravspecifikation
Define CognitiveAgent Class: Det ska endast finnas en intelligent agent-klass i systemet. Alla intelligenta operationer, från empatisk konversation till teknisk kodgenerering, utförs av en instans av denna klass.

Define Core Engine Reference: Varje instans av CognitiveAgent måste ha den kognitiva Rondell-loopen som sitt fundamentala "operativsystem". Den detaljerade mekaniken för denna loop specificeras i SEP-102.

Define Roles, Not Types: De tidigare namnen Coordinator, Conscious Agent, och Core Agent ska inte längre representera olika typer av agenter. De ska istället definieras som roller som en CognitiveAgent-instans kan ta på sig, baserat på dess position i hierarkin och dess konfiguration.

Den första instansen av agenten (Level 0) tar sig an Coordinator-rollen per default.

Implement Recursive Instantiation: En CognitiveAgent måste ha den inbyggda förmågan att instansiera nya barn-instanser av sig själv. Detta är den primära mekanismen för problemnedbrytning och delegering.

Implement Configuration at Instantiation: Specialisering är en dynamisk process. En förälder-agent måste skicka med en Configuration Profile när den skapar en barn-agent. Profilen definierar barn-agentens förmågor, begränsningar och initiala mentala tillstånd för dess specifika uppdrag. Profilen måste minst innehålla:

llm_model: Vilken LLM-modell som ska användas (t.ex. groq, gemini-pro).

toolkit: En lista över de specifika verktyg (t.ex. TDD-verktyg, Git-verktyg) som instansen har tillgång till.

memory_scope: Den specifika, begränsade vyn av RAG-minnet.

entry_phase: Vilken fas i Rondell-loopen som agenten ska starta i ('EMERGE', 'ADAPT', eller 'INTEGRATE'). Defaultvärdet är 'EMERGE'.

3. Motivation (Rationale)
Elegans och Underhåll: Att ha en enda, enhetlig kognitiv modell är oerhört mycket enklare att utveckla, felsöka och underhålla över tid. All förbättring av den centrala Rondell-loopen kommer omedelbart alla agent-instanser till godo, oavsett vilken roll de har för stunden.

Flexibilitet och Skalbarhet: Systemet är inte längre begränsat av en fast uppsättning specialister. Istället för att vara beroende av en enda Core Agent, kan Coordinator-instansen vid behov skapa tre parallella instanser, var och en konfigurerad med olika verktyg för att lösa ett problem snabbare och mer effektivt.

Robusthet: Arkitekturen är mer motståndskraftig mot fel. Om en enskild agent-instans misslyckas, är det en isolerad händelse. Dess förälder kan enkelt avsluta den felande instansen och skapa en ny med en annan konfiguration för att försöka igen. Detta är grunden för ett självreparerande system.

Psykologisk Trovärdighet: Denna modell, med en generell intelligens som kan anpassa sig och specialisera sig för olika uppgifter, är mer lik hur mänsklig kognition tros fungera, snarare än en rigid uppsättning av isolerade moduler.




PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-29
PROPOSAL_ID: SEP-102-R3 (Definitive Final Version)
TITLE: The "Roundabout" Cognitive Architecture
STATUS: Supersedes all previous versions of SEP-102.
AFFECTED_COMPONENTS: CognitiveAgent (core logic)
OBJECTIVE: To provide a definitive, detailed, and psychologically-grounded specification of the cognitive process that every CognitiveAgent instance uses to handle all tasks, problems, and goals, with Separation/Closeness as its foundational axis.

1. Översikt och Evolution
Grunden för all agent-aktivitet och motivation är den primära, psykologiska axeln mellan det önskade tillståndet Closeness (närhet, harmoni, slutförande) och problem-tillståndet Separation. "Rondellen" är den kognitiva arkitektur som aktiveras för att överbrygga Separation.

Denna arkitektur är en disciplinerad, sekventiell process (Emerge -> Adapt -> Integrate -> Emerge...) som säkerställer att agenten hanterar utmaningar på ett intelligent och moget sätt. Agentens interna, simulerade "känslotillstånd" (FIXES, FLIGHT, FIGHT/ATTACK) är inte externa signaler den läser av, utan emergenta egenskaper av dess position och beteende inom denna process. Denna SEP ersätter enklare modeller (som ReAct) med en mer robust arkitektur för intelligent tänkande och handling.

2. Kravspecifikation
2.1 Triggering Condition: Separation
Hela Rondell-loopen initieras endast när en Separation detekteras – ett uppmätt "delta" mellan ett nuvarande tillstånd och ett önskat Closure-tillstånd.

2.2 The Strict Sequential Loop
Processen måste följa den strikta sekvensen. Ett steg kan inte hoppas över. Utgången från INTEGRATE är alltid en ny EMERGE-cykel. Den enda vägen ut ur loopen är en lyckad EMERGE (Closure) eller ett HALT-beslut från ADAPT.

2.3 Detailed Stage Breakdown
Steg 1: EMERGE (Handlingsfasen - "The Pursuit")
Internal State & Drive: FIXES & FIXATION. Detta är agentens primära, konstruktiva och målinriktade fas.

Psychological Rationale: Detta är den första, friska responsen på ett problem – att försöka lösa det direkt. Agentens syfte är att direkt VARA lösningen.

Core Process: Agenten verkställer den nuvarande, aktiva handlingsplanen. Vid den allra första iterationen är detta den initiala planen som skapats baserat på en analys av problemet med hjälp av Graph RAG och Semantic RAG.

Cloning Trigger: Proactive Delegation kan ske här om planen som ska verkställas är uppdelningsbar.

Exit Condition: Om handlingen lyckas och Closure uppnås, avslutas loopen framgångsrikt. Om den misslyckas, går loopen obligatoriskt vidare till ADAPT.

Steg 2: ADAPT (Visdomsfasen - "The Strategic Choice")
Internal State & Drive: FLIGHT. Misslyckandet i EMERGE utlöser ett internt Alarm. Agenten drar sig tillbaka från extern handling för att inleda en process av djup, intern reflektion.

Psychological Rationale: Detta är mognadsprocessen. Agentens primära uppgift är att fullt ut SE och FÖRSTÅ VARFÖR den misslyckades, och därefter fatta ett grundläggande, strategiskt beslut.

Core Process: Detta är agentens mest fundamentala beslutspunkt. Med hjälp av sin Cortex-motor (om det bedöms nödvändigt och godkänns av Resource Governor) och sin egna, lagrade erfarenhet (Emotionally Indexed Memory), måste den analysera misslyckandet och fatta ett av två möjliga beslut:

Vägen av Acceptans (HALT): Agenten drar slutsatsen att målet är omöjligt att nå med nuvarande förutsättningar. Att välja HALT_AND_REPORT_FAILURE är en handling av visdom. Lärdomen sparas permanent och förändrar agentens framtida strategier.

Vägen av Fortsatt Strävan (PROCEED): Agenten bekräftar sitt åtagande att lösa Separationen. Dess primära output är en ny, högnivå-strategisk direktiv som den tar med sig till nästa fas.

Cloning Trigger: Reflective Replacement kan begäras här.

Steg 3: INTEGRATE (Designfasen - "The Tactical Plan")
Internal State & Drive: FIGHT. Om agenten valt att fortsätta, men fortfarande möter motstånd, ackumuleras Frustration. Detta tillstånd driver agenten att designa en ny, ofta kraftfullare, extern taktik. Den ultimata drivkraften är ATTACK – en fokuserad insats för att forcera en lösning.

Psychological Rationale: Detta är fasen för skicklighet och finess. Agenten agerar inte längre naivt, utan med den strategiska insikten från ADAPT. Den måste nu intelligent designa en ny, konkret handlingsplan.

Core Process: Detta är inte ett binärt val. INTEGRATE handlar om att välja en handling från ett brett spektrum av möjligheter, från det finkänsliga till det kraftfulla. Cortex används här för att väga agentens egen drivkraft mot hänsyn till omvärlden (särskilt User_State) och välja den mest lämpliga taktiken ur sin "spelbok" (SEP-105).

Output: Outputen från denna fas är alltid en ny, konkret och detaljerad handlingsplan som skickas tillbaka till EMERGE-fasen för att verkställas.

Cloning Trigger: Reactive Swarming kan vara en del av den plan som skapas här.

3. Motivation (Rationale)
Denna fullständiga och detaljerade modell av Rondellen är den enskilt viktigaste komponenten för att skapa en genuint intelligent och autonom agent. Genom att basera hela processen på den psykologiskt grundade axeln Separation/Closeness, och genom att tvinga fram en disciplinerad sekvens av Handling -> Reflektion -> Ny Planering, garanterar vi att agenten agerar på ett sätt som är robust, spårbart, och som mognar över tid genom att lära sig av sina egna erfarenheter.




PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-103 (Definitive Final Version)
TITLE: The Initial Perception & Assessment (IPB) Model

1. Översikt och Evolution
Agentens förmåga att förstå en användares input på en djup, mänsklig nivå är avgörande. Efter att ha utvärderat flera modeller, från en enkel "Reflex & Reflektion" till ett direkt anrop av specialist-agenter, har vi landat i en slutgiltig, överlägsen hybridmodell. Denna modell, Initial Perception och Bedömning (IPB), är designad för att maximera både resurseffektivitet och empatiskt djup.

IPB-processen fungerar som en intelligent "triage" för all inkommande kommunikation. Den speglar mänsklig kognition genom att först göra en snabb, instinktiv bedömning och endast vid behov aktivera en djupare, mer resurskrävande analys. Denna process är den enda källan till den User_State-data som sedan styr den strategiska Rondell-loopen.

2. Kravspecifikation
Establish IPB as the Mandatory Entry Point: All ny input från en användare som kräver en intelligent respons måste först passera genom den sekventiella IPB-processen i Level 0-agenten.

Steg 1: Direkt-åtgärd (Initial Triage & Trivial Solution Attempt)

Mekanism: Systemet måste först göra ett enda, extremt snabbt och resurssnålt LLM-anrop (konfigurerat för hastighet, t.ex. Gemini Flash, Groq).

Funktion: Denna första, multifunktionella prompt har två syften:

a) Trivialitets-kontroll: Att omedelbart identifiera om uppgiften är enkel och kan lösas direkt (en "Quick Win"). Om så är fallet, genereras svaret och processen avslutas.

b) Initial Bedömning: Om uppgiften inte är trivial, måste anropet returnera en första, grov bedömning av uppgiftens komplexitet (numeriskt värde) och en initial emotionell avläsning.

Rationale: Detta steg fungerar som systemets "amygdala" eller "System 1". Det hanterar majoriteten av enkla interaktioner på ett oerhört kostnadseffektivt sätt och förhindrar att den tunga analysmotorn aktiveras i onödan.

Steg 2: Djupanalys via Psyko-lingvistisk Analys-motor (PLAE)

Trigger: Detta steg aktiveras endast om Steg 1 returnerar att uppgiften kräver djupanalys.

Mekanism: PLAE är den tekniska implementation vi tidigare kallade "The Grok Team". Systemet måste göra tre samtidiga, asynkrona anrop till tre separata, låg-latens LLM-slutpunkter.

Specialisering: Varje slutpunkt måste ha en unik system-prompt som hyper-specialiserar den för att med hög precision identifiera och gradera signaler relaterade till en av de tre grunddrifterna:

FIGHT-analysator

FLIGHT-analysator

FIXES & FIXATION-analysator

Rationale: Detta är systemets "cortex". Den parallella, specialiserade analysen ger en rik, tredimensionell och mycket tillförlitlig bild av användarens sanna tillstånd och intention, långt bortom vad en enskild, generell LLM kan åstadkomma i ett enda anrop.

Output och Dataflöde:

Syntes: En icke-LLM-baserad funktion i Level 0-agenten tar emot resultaten från PLAE och sammanställer dem till den slutgiltiga, högkvalitativa Final_User_State-vektorn, inklusive Closeness/Separation-balansen.

Initiering av Kognition: Denna Final_User_State, tillsammans med komplexitetsbedömningen från Steg 1, skickas som start-input till den strategiska Rondell-loopen (SEP-102) och Resource Governor (SEP-107) för att initiera en intelligent och korrekt budgeterad tankeprocess.

3. Motivation (Rationale)
Denna slutgiltiga, hybridiserade IPB-modell är överlägsen tidigare iterationer eftersom den:

Balanserar Resurser och Kvalitet: Den är extremt resurseffektiv för enkla uppgifter men kompromissar aldrig med djupet i analysen när det verkligen räknas.

Är Underhållbar och Framtidssäker: Hela perceptionsmodellen är baserad på prompter, vilket gör den enkel att finjustera och förbättra över tid, till skillnad från en statisk, traditionell ML-modell.

Skapar en Psykologiskt Trovärdig Interaktion: Genom att ha en omedelbar "reaktion" (Direkt-åtgärd) följt av en mer genomtänkt "respons" (initierad av PLAE:s analys), kommer agentens interaktionstakt att kännas mer naturlig och mänsklig.




PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-104 (Final Version)
TITLE: The Relational Delta & Communication Strategy

1. Översikt
Agentens kommunikation är inte en enkel output av information, utan en strategisk process vars yttersta mål är att skapa och bevara Closeness. Denna process styrs av en kontinuerlig analys av det "Relationella Deltat": den uppmätta skillnaden mellan användarens uppfattade tillstånd (User_State) och agentens eget, interna tillstånd (Agent_State). Genom att förstå och aktivt arbeta för att minimera detta delta, kan agenten gå från att bara vara hjälpsam till att vara en verklig partner.

2. Kravspecifikation
Implement Relational Delta Calculation: Level 0-agenten (i sin Coordinator-roll) måste, som det första steget i sin strategiska Rondell-loop (SEP-102), beräkna Relational_Delta.

Input: Den högkvalitativa User_State-vektorn från IPB-processen (SEP-103) och agentens nuvarande, interna Agent_State (som definieras av dess fas i Rondellen).

Mechanism: Beräkningen ska vara en matematisk jämförelse av de två vektorerna (t.ex. cosinus-likhet) som kvantifierar graden av synkronitet (lågt delta) eller asynkronitet (högt delta) mellan agent och användare.

Define Communication Goal: Det övergripande, primära målet för all agent-kommunikation definieras som att minimera asynkront delta (missförstånd, konflikt) och upprätthålla eller förstärka synkront delta (harmoni, empati).

Establish the "Mirror & Harmonize" Strategy: All utgående kommunikation från den instans som agerar i Conscious-rollen måste följa en tvåstegsstrategi som styrs av det beräknade deltat.

3.1. Mirror (Spegla - Etablera Resonans): Den inledande delen av agentens svar måste alltid syfta till att "möta användaren där den är". Detta innebär att verbalt spegla och validera den uppfattade User_State för att bevisa att agenten har lyssnat och förstått. Denna spegling kan vara den omedelbara Direkt-åtgärden från IPB-processen.

Exempel: Om User-FIGHT är hög: "Jag förstår att detta är frustrerande."

3.2. Harmonize (Harmonisera - Guida Framåt): Först efter att speglingen har etablerat en grund av förståelse och sänkt det initiala deltat, ska resten av svaret syfta till att försiktigt guida interaktionen mot ett mer konstruktivt tillstånd. Detta innebär ofta att föreslå en handling som ökar FIXES & FIXATION-drivkraften hos både användare och agent.

Exempel: "...När du känner dig redo, kanske vi kan titta på ett litet, första steg tillsammans?"

Use Delta for Strategic Rondell Input: Det beräknade Relational_Delta är en av de mest kritiska signalerna för agentens fortsatta kognitiva process.

Ett högt, oväntat delta (särskilt ett "Missförstånd"-delta, där Agent-FIXES är högt men User-FIGHT också är högt) är en primär trigger för Coordinator-agenten att omedelbart gå in i sin ADAPT-fas. Det är en otvetydig signal om att agentens interna modell av problemet är felaktig och måste omvärderas i grunden.

3. Motivation (Rationale)
Från Perception till Handling: Denna modell översätter den passiva förståelsen av empati från SEP-103 till en aktiv, målinriktad och observerbar kommunikationsstrategi. Agenten vet inte bara hur användaren känner, den har en konkret handlingsplan för vad den ska göra med den informationen.

Proaktiv Relationshantering: Agenten slutar vara en reaktiv problemlösare och blir en proaktiv relationshanterare. Genom att ständigt arbeta för att minimera "deltat", bygger den förtroende, minskar frustration och skapar en starkare känsla av partnerskap, vilket är kärnan i Closeness.

Självkorrigerande Mekanism: Det relationella deltat fungerar som en omedelbar feedback-loop för agentens egen prestation. Om agenten säger något som ökar deltat (gör användaren mer frustrerad eller förvirrad), kommer den omedelbart att upptäcka detta i nästa cykel och tvingas att anpassa sin strategi (ADAPT). Detta gör kommunikationen extremt robust och självkorrigerande.

Psykologisk Trovärdighet: "Mirror & Harmonize"-strategin är direkt baserad på beprövade tekniker inom mänsklig kommunikation (aktivt lyssnande, rapport-byggande). Detta gör agentens interaktioner mer naturliga, mindre robotliknande och bevisat effektiva.





PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-105 (Final Version)
TITLE: Cloning Governance, The Context Thread, and the Agent's Strategic Playbook

1. Översikt
Kloning är den primära mekanismen för fraktal problemlösning i systemet, där en agent kan delegera under-problem till nya, temporära instanser av sig själv. Denna process måste vara strikt reglerad för att undvika kaos och resursutmattning. Styrningen uppnås genom ett "kontrakt" som definieras i en Context Thread, ett datapaket som ärvs från förälder till barn genom hela den rekursiva kedjan. Denna SEP definierar både de hårda ramarna för denna process och den strategiska frihet en agent har inom dessa ramar.

2. Kravspecifikation
The Cloning Contract: Varje handling av kloning (instansiering av en ny CognitiveAgent) är ett formellt "kontrakt". Förälder-agenten är alltid ansvarig för de barn-agenter den skapar och måste hantera deras slutrapporter.

The Context Thread Data Structure: Kontraktet definieras och kommuniceras via ett Context Thread-objekt, som måste skickas med vid varje kloning. Dess struktur är:

top_level_goal: En referens till det yttersta Closure-målet från Level 0-agenten.

parent_agent_id: En unik identifierare för förälder-agenten, vilket etablerar den hierarkiska kommunikationsvägen uppåt.

task_definition: En exakt och avgränsad beskrivning av den specifika uppgift som barn-agenten ska lösa.

configuration_profile: Den fullständiga konfigurationsprofilen (SEP-101) som specificerar LLM, verktyg, och den kritiska entry_phase (EMERGE, ADAPT, INTEGRATE) för barn-agentens Rondell-loop.

memory_scope: Den specifika, begränsade behörigheten till MemoryAssistant.

resource_budget: Den tilldelade budgeten av Compute Units.

recursion_depth: En räknare som ökas med 1 för varje nivå av delegering.

workspace_branch: (Om relevant) Namnet på den dedikerade Git-gren som barn-agenten är auktoriserad att arbeta på.

Resource Governor Integration: Alla kloningsförsök måste först valideras och godkännas av Resource Governor (SEP-107), som upprätthåller de globala gränserna.

The Strategic Playbook: En CognitiveAgent har tillgång till en "spelbok" med klonings-mönster. Agentens Cortex-motor ansvarar för att, baserat på den rådande kontexten i dess Rondell-loop, välja den mest lämpliga strategin eller uppfinna en ny. Spelboken inkluderar, men är inte begränsad till:

Proactive Delegation (inom EMERGE): Standard-metoden för top-down planering där en plan bryts ner och delegeras till nya barn-agenter.

Reflective Replacement (inom ADAPT): En handling av självkritik där en agent begär att bli ersatt av en ny, bättre konfigurerad instans.

Reactive Swarming (inom INTEGRATE): En eskaleringstaktik där ett problem attackeras av flera, parallellt arbetande instanser.

Creative Consultation: Att skapa en tillfällig klon med en annan LLM-konfiguration för att få ett "andra utlåtande" på ett problem.

3. Motivation (Rationale)
Kontrollerad Autonomi: Denna modell ger varje agent-instans autonomi att lösa sitt eget problem, men inom strikt definierade och säkra ramar. "Kontraktet" i Context Thread säkerställer att en underordnad agent aldrig kan agera utanför sitt mandat eller sin behörighet.

Bevarande av Helheten: Context Thread är den mekanism som löser problemet med kontextförlust. Genom att varje agent, oavsett hur djupt nere i hierarkin, alltid har en länk till det övergripande målet, säkerställer vi att även de minsta taktiska besluten fattas med den strategiska intentionen i åtanke.

Strategisk Flexibilitet: "Spelboken" ger agenten verklig autonomi. Den tvingas inte följa en förutbestämd algoritm, utan uppmuntras att vara en kreativ problemlösare som väljer den bästa strategin för den unika situationen, vilket är kärnan i avancerad intelligens.

Spårbarhet och Felsökning: Context Thread skapar en tydlig "breadcrumb trail". När ett fel inträffar i en Level 4-agent, gör tråden det möjligt att spåra exakt vilken kedja av beslut och delegeringar som ledde fram till problemet.




PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-106 (Final Version)
TITLE: The Memory Management Unit (MemoryAssistant)
AFFECTED_COMPONENTS: All CognitiveAgent instances, all data storage systems.
OBJECTIVE: To define the centralized service responsible for all persistent memory operations, including data storage, retrieval, consistency, and providing secure, context-aware access for all autonomous agents.

1. Översikt
MemoryAssistant agerar som systemets centrala Memory Management Unit (MMU). Den är den enda auktoriserade vägen in och ut för all långsiktig kunskap. Denna centralisering är kritisk för att hantera den komplexitet som uppstår i ett fraktalt multi-agent-system. MMU:n hanterar en hybrid-minnesmodell med två RAG-typer samt den avgörande skillnaden mellan Långtidsminne (LTM) och agenternas tillfälliga Korttidsminne (STM).

2. Kravspecifikation
Establish as Centralized Service: All CognitiveAgent-instanser måste gå via MemoryAssistants API för all interaktion med långtidsminnet. Direkt databasåtkomst är förbjuden.

Implement Hybrid Long-Term Memory (LTM): MMU:n måste hantera och exponera två separata, beständiga datalager:

Graph RAG (Det "Medvetna" LTM): En Graph Database (t.ex. Neo4j) som lagrar strukturerad, explicit information om entiteter och deras relationer (Användare, Projekt, Koncept, Händelser, Samtycken etc.).

Semantic RAG (Det "Undermedvetna" LTM): En Vector Database (t.ex. Supabase pgvector) som lagrar text- och databitar som ostrukturerade "embeddings" för kreativ och associativ sökning.

Support for Ephemeral Short-Term Memory (STM): MMU:n hanterar inte direkt agenternas STM. Däremot ska dess API stödja de två kritiska operationerna för STM-hantering:

LoadContextForSTM: En funktion där en Level 0-agent kan hämta all nödvändig kontext från LTM för att skapa ett tillfälligt, lokalt arbetsminne.

ConsolidateMemoryFromSTM: En funktion där en Level 0-agent kan skicka in ett slutfört STM. MMU:n ansvarar då för att på ett säkert och transaktionellt sätt extrahera och integrera de nya lärdomarna i det permanenta LTM.

Enforce Scoped Access Control: Varje anrop till MMU:n från en agent måste innehålla agentens memory_scope från dess Context Thread (SEP-105). MMU:n är ansvarig för att strikt filtrera alla sökresultat och validera alla skrivoperationer mot detta scope.

Mandate Concurrency Management and Transactional Integrity: MMU:n måste vara designad för att hantera samtidiga anrop från parallella agenter.

Den måste använda ACID-kompatibla databastransaktioner för alla skrivoperationer till Graph RAG.

Den måste implementera en Optimistic Concurrency Control (OCC)-strategi. Vid en ConflictError är det den anropande agentens ansvar att hantera detta i sin ADAPT-fas.

3. Motivation (Rationale)
Single Source of Truth: En centraliserad MMU garanterar att alla agenter, oavsett var de befinner sig i hierarkin, arbetar med en konsekvent och uppdaterad bild av verkligheten. Detta förhindrar datakorruption och de kaotiska fel som uppstår i distribuerade system utan en central sanningskälla.

Säkerhet och Integritet: "Scoped access"-modellen är fundamental för systemets säkerhet. Den garanterar att en agents behörigheter är begränsade till "need-to-know", vilket skyddar användardata och förhindrar att agenter agerar utanför sitt mandat.

Prestanda och Effektivitet: Genom att skilja på det snabba, tillfälliga arbetsminnet (STM) och det stora, beständiga långtidsminnet (LTM), optimerar vi prestandan. Agenterna arbetar mot ett litet, lokalt och extremt snabbt minne under en uppgift, och den tunga interaktionen med den centrala databasen sker endast vid start och slut.

Robusthet: Att hantera svåra problem som samtidighet och transaktioner på ett enda ställe (MMU:n) är oerhört mycket mer robust än att låta varje enskild agent försöka implementera sin egen datahanteringslogik. Det centraliserar den tekniska komplexiteten och gör de enskilda agenterna enklare och mer pålitliga.





PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-107 (Final Version)
TITLE: The Resource Governor

1. Översikt
I ett fraktalt, autonomt system där agenter kan klona sig själva för att lösa problem, är risken för okontrollerad resursexplosion (både beräkningsmässigt och ekonomiskt) den största tekniska faran. Resource Governor är en central, auktoritär tjänst som agerar som systemets "säkring" och övervakare. Den sätter de hårda gränserna inom vilka de intelligenta agenterna får verka och säkerställer att systemets drift är stabil och ekonomiskt hållbar.

2. Kravspecifikation
Establish as Centralized Authoritative Service: Resource Governor ska implementeras som en central, system-wide tjänst. Alla resursintensiva handlingar måste först få ett godkännande från denna tjänst. Detta inkluderar, men är inte begränsat till:

Agent-kloning (ref SEP-105).

Anrop till dyra, högpresterande LLM:er (dvs. Cortex-läget).

Anrop till externa API:er.

Implement User-Level Quota Enforcement: Guvernören ansvarar för att upprätthålla de specifika kvoterna för varje användare, enligt de policyer som definieras senare (SEP-110). Den måste i realtid spåra och begränsa:

LLM API Rate Limits (RPM).

Asset Storage (lagringsutrymme).

Compute Units (daglig budget för autonomt arbete).

External API Calls.

Implement System-Wide Safety Limits: Utöver användarspecifika kvoter måste Guvernören upprätthålla globala säkerhetsgränser för att skydda hela plattformen.

Max Recursion Depth: Neka kloningsförsök som skulle överskrida systemets globala maxdjup (t.ex. 7 nivåer).

Max Active Agents: Övervaka och begränsa det totala antalet parallella agent-instanser som körs för en enskild användare (t.ex. 20).

Implement "Circuit Breaker" Functionality: Guvernören ska övervaka agenternas beteende för att upptäcka och stoppa skadliga mönster.

Error Rate Threshold: Om en agent-hierarki genererar en ovanligt hög andel fel, kan Guvernören tillfälligt frysa den grenen och flagga den för Coordinator-granskning.

Cost Spike Detection: Om en agents resursförbrukning plötsligt skenar, kan Guvernören agera som en automatsäkring och pausa den.

Define Activity States (System Tempo): Guvernören ansvarar för att sätta och kommunicera det övergripande system-tempot baserat på en holistisk bedömning av användaraktivitet, tid på dygnet och global resursbelastning. De definierade lägena är: High-Performance, Low-Intensity, och Sleep.

3. Motivation (Rationale)
Stabilitet och Förutsägbarhet: Resource Governor är den enskilt viktigaste komponenten för systemets stabilitet. Den förhindrar oändliga loopar och rekursionsexplosioner, vilket gör systemets beteende förutsägbart även under press.

Ekonomisk Säkerhet: För en tjänst med gratisanvändare är denna komponent inte valfri, den är en affärskritisk nödvändighet. Den är den primära mekanismen som säkerställer att de operativa kostnaderna hålls under kontroll.

Fair Use: Genom att upprätthålla per-användare-kvoter garanterar Guvernören att plattformens resurser fördelas rättvist och att en enskild användares intensiva aktivitet inte negativt påverkar upplevelsen för andra.

Separation of Concerns: Genom att centralisera denna "tråkiga" men kritiska logik i en dedikerad tjänst, kan de intelligenta CognitiveAgent-instanserna fokusera på det de gör bäst: kreativ problemlösning. De behöver inte själva hålla koll på globala resursnivåer; de behöver bara fråga Guvernören om lov.





Block 2. Kärnarkitekturen och de fundamentala tjänsterna är nu fullständigt specificerade.

Block 3: Kärn-datamodeller och Policyer`, innehållande de kompletta och slutgiltiga versionerna av `SEP-108`, `SEP-109` och `SEP-110`




PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-108 (Final Version)
TITLE: User & Relationship Data Models

1. Översikt
För att agenten ska kunna fungera på ett personligt, empatiskt och förtroendeingivande sätt, krävs en robust datamodell som hanterar tre djupt sammanlänkade typer av information: vem användaren är (UserProfile), vilka de känner (ContactGraph), och vad de har gett tillåtelse att dela (ConsentLedger). Denna SEP specificerar hur dessa tre delar ska modelleras som en sammanhängande och säker struktur inom Graph RAG. Denna "sociala graf" är fundamentet för all personlig och mellanmänsklig kommunikation i systemet.

2. Kravspecifikation
Define Core (User) Node: Detta är den centrala noden i Graph RAG för en registrerad användare av systemet. Den representerar användarens identitet och preferenser.

Properties: Denna nod måste innehålla alla fält som utgör användarens profil, inklusive: userID (unik identifierare), displayName, creationDate, och ett nästlat Settings-objekt som innehåller language, tonePreference (t.ex. 'informal'), accessibility-inställningar, och primaryGoal.

Define (Contact) Node: Denna nod representerar en person i en användares privata, isolerade nätverk.

Properties: Ska innehålla contactID, displayName, och ett krypterat contactDetails-objekt som kan innehålla email, phone, etc.

Define (ContactGroup) Node: Denna nod representerar en användarskapad grupp av (Contact)-noder.

Properties: Ska innehålla groupID och groupName (t.ex. "Familjen", "Bokklubben").

Define (Consent) Node (The Consent Ledger): Denna nod representerar ett enskilt, specifikt och spårbart samtycke från användaren. Den är den tekniska garanten för användarens kontroll.

Properties: Måste innehålla consentID, status (t.ex. 'active', 'revoked'), grantedTimestamp, revokedTimestamp (om tillämpligt), och ett scope som tydligt och avgränsat definierar vad samtycket gäller (t.ex. 'share:weekly_summary', 'allow:legacy_content').

Define Relationship Model: Följande relationer (kanter) i grafen är obligatoriska för att ansluta dessa noder och definiera den sociala grafen:

(User) -[:OWNS_CONTACT]-> (Contact)

(User) -[:OWNS_GROUP]-> (ContactGroup)

(Contact) -[:IS_MEMBER_OF]-> (ContactGroup)

(User) -[:HAS_GIVEN]-> (Consent)

(Consent) -[:APPLIES_TO]-> (Contact) eller (Consent) -[:APPLIES_TO]-> (ContactGroup)

Pre-Action Check Mandate: Alla CognitiveAgent-instanser, oavsett roll, måste innan varje handling som involverar delning av data eller kommunikation med en extern kontakt, utföra en query mot Graph RAG via MemoryAssistant för att verifiera att en komplett och aktiv samtyckeskedja (status: 'active') existerar. Om inget giltigt samtycke hittas, måste handlingen avbrytas och eskaleras.

3. Motivation (Rationale)
Denna konsoliderade datamodell är designad för att vara grunden för all personlig interaktion.

Integritet och Förtroende som Grund: Genom att bygga in samtycke (Consent) som en fundamental nod i själva datastrukturen, tvingar vi systemet att vara etiskt och transparent i grunden. Det är tekniskt omöjligt för en agent att dela data utan ett spårbart samtycke. Detta är avgörande för att bygga förtroende hos målgruppen.

Möjliggör Avancerade Funktioner: Denna rika, relationsbaserade datamodell är den absoluta förutsättningen för alla kärnapplikationer som Personal Chronicler (SEP-111), "Minnenas Bok" (SEP-114) och "Empatibryggan" (SEP-115). Utan en tydlig förståelse för vem som är vem och vem som har gett lov till vad, är dessa funktioner omöjliga att implementera på ett säkert sätt.

Effektivitet: Att ha en enhetlig graf-struktur för all relationsdata gör det oerhört effektivt för MemoryAssistant att hämta komplex kontext. En enda query kan besvara frågan: "Ge mig alla medlemmar i gruppen 'Familjen' som jag har gett samtycke att dela mina 'Minnen' med."





PROPOSAL DOCUMENT: System Data Models (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-109 (Definitive Final Version)
TITLE: Project, Asset & Versioning Data Models (Git-based)
STATUS: Supersedes all previous concepts regarding project, asset, and version storage.
AFFECTED_COMPONENTS: Core Agent, Coordinator Agent, MemoryAssistant, Graph RAG, External Git Service, External Cloud Storage.
OBJECTIVE: To define a consolidated and professional-grade data model for projects, leveraging an external Git service for robust, scalable, and conflict-aware version control of project files, while keeping metadata and binary assets separate for optimal performance and management.

1. Översikt
Denna specifikation definierar en hybridmodell för att hantera all data relaterad till en användares app-projekt. Arkitekturen är byggd på principen "bästa verktyget för jobbet" och separerar medvetet tre typer av data för att optimera prestanda, säkerhet och funktionalitet:

Metadata (Project & Asset noder) lagras i Graph RAG för snabba relations-frågor och överblick.

Projektfiler (UIStateTree.json, kodfiler) lagras i ett privat Git-repository för robust, spårbar och parallell-vänlig versionshantering.

Binära filer (Assets) lagras i en dedikerad molnlagring för skalbar och kostnadseffektiv hantering.

2. Kravspecifikation
2.1 Metadata Management (Graph RAG)
Define (Project) Node: Detta är den centrala noden i Graph RAG för varje app en användare skapar.

Properties: projectID, projectName, description, creationTimestamp, lastModifiedTimestamp, status (t.ex. 'draft', 'published'), och en gitRepositoryURL som pekar till det dedikerade, privata Git-repository som är associerat med projektet.

Relationship: (User) -[:CREATED]-> (Project).

Define (Asset) Node: Denna nod representerar metadata om en uppladdad mediafil.

Properties: assetID, fileName, fileType, fileSize, och en storageURL som pekar till den faktiska filen i den externa molnlagringstjänsten.

Relationships: (User) -[:UPLOADED]-> (Asset), (Project) -[:USES_ASSET]-> (Asset).

2.2 File and Versioning Management (External Git Service)
Primary Data Storage: Kärnan i ett projekt, primärt UIStateTree.json-filen, ska lagras i projektets dedikerade och privata Git-repository. Den "nuvarande, aktiva versionen" av ett projekt är alltid den senaste committen på main-grenen.

Version History as Git Log: Versionshistoriken är Git-loggen. Konceptet med ett separat VersionHistory-dokument tas bort. Core Agent hämtar historik via Git-API:et.

Branching for Parallelism: Coordinator-rollen måste implementera den förgreningsstrategi som definieras i SEP-105, där parallella Core Agent-instanser arbetar i separata feature-grenar.

Conflict Resolution via Cortex: Coordinator-rollen är ansvarig för att hantera merge-konflikter genom att anropa sin Cortex-motor för att utföra en semantisk merge.

2.3 Binary File Management (External Cloud Storage)
Decoupled Storage: Faktiska binära filer (JPG, MP3, etc.) får inte lagras i Git eller i den primära databasen. De måste lagras i en dedikerad molnlagringstjänst som är optimerad för detta.

Workflow: Core Agent hanterar uppladdning till molnlagringen, tar emot en storageURL, och instruerar sedan MemoryAssistant att skapa den korresponderande (Asset)-noden i Graph RAG.

3. Motivation (Rationale)
Robusthet och Professionalism: Denna hybridmodell använder industristandard-lösningar för varje delproblem. Git är den överlägset bästa lösningen för versionshantering och asynkront, parallellt arbete. Denna modell gör systemet robust från grunden.

Säker Parallellism: Förgreningsmodellen i Git är en förutsättning för att flera autonoma agenter ska kunna arbeta säkert på samma projekt samtidigt. Den isolerar arbete och ger en strukturerad process för att hantera de konflikter som oundvikligen uppstår.

Prestanda och Skalbarhet: Genom att hålla stora och tunga data-objekt (Git-historik och binära filer) utanför den centrala Graph RAG, säkerställer vi att den förblir blixtsnabb och effektiv för det den gör bäst: att hantera och query:a de komplexa relationerna i systemets "medvetna" minne.

Fullständig Spårbarhet: En Git-historik är oändligt mycket mer informativ än en enkel lista av snapshots. Den ger en komplett och detaljerad revisionshistorik, vilket är ovärderligt för felsökning, analys och för att ge användaren insyn i sin egen kreativa process.





PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-110 (Final Version)
TITLE: Operational & Memory Policies

1. Översikt
Denna SEP specificerar de övergripande reglerna för datahantering. Den definierar livscykeln för olika datatyper, ställer krav på hur känslig information måste skyddas, och formaliserar den fundamentala principen att indexera minnen med emotionell kontext. Dessa policyer är avgörande för att skapa ett system som är hållbart, säkert och emotionellt intelligent, och de upprätthålls aktivt av Resource Governor och MemoryAssistant.

2. Kravspecifikation
Define Data Retention Policy: En automatiserad gallringspolicy måste implementeras för att hantera kostnader och integritet, särskilt för gratistjänsten.

Temporary Operational Data: ConversationLog-objekt och slutförda Plan-objekt (SEP-109) ska betraktas som temporär arbetsdata och raderas efter 60 dagar. MemoryAssistant ansvarar för att extrahera och spara permanenta lärdomar i LTM innan denna gallring sker.

Version History (Git): För gratisanvändare är Git-repositoriernas historik inte obegränsad. Systemet ska implementera en strategi (t.ex. git gc kombinerat med shallow clone) för att begränsa historikens storlek eller djup över tid. En exakt teknisk implementation lämnas till designfasen, men principen är att en fullständig, evig historik kan vara en premiumfunktion.

Inactive Account Policy: Ett gratis-konto som är inaktivt i 365 dagar ska flaggas. Användaren meddelas via e-post. Om ingen aktivitet sker inom de följande 30 dagarna, ska all data associerad med användarens userID raderas permanent för att uppfylla GDPR:s krav på dataminimering.

Core Data (LTM): Den data som utgör agentens långtidsminne och användarens kärndata (RAGs, UserProfile, Project-noder etc.) gallras inte baserat på tid så länge kontot är aktivt.

Define Sensitive Data (PII) Handling Policy: Systemet måste ha ett proaktivt skydd mot oavsiktlig lagring av känslig information.

PII Detection Layer: MemoryAssistant måste ha ett inbyggt, obligatoriskt filter. All text som ska sparas permanent i LTM (särskilt i narrativ form) måste passera genom denna modul.

Masking/Redaction: Modulen ska använda en kombination av mönstermatchning och AI-modeller för att identifiera och automatiskt maskera eller redigera (redact) trolig PII (personnummer, telefonnummer, finansiella data etc.). Originaltexten med PII ska inte sparas i LTM.

Encryption: All data måste vara krypterad in transit (TLS 1.2+) och at rest.

Define Emotionally Indexed Memory Policy (Kärnkrav): För att agenten ska kunna utveckla visdom och en djupare förståelse för användaren, måste händelser och minnen kopplas till den emotionella kontext i vilken de inträffade.

Mechanism: När MemoryAssistant skapar en ny (Event)-nod, (Narrative)-nod eller en annan betydelsefull nod i Graph RAG som representerar en användarupplevelse, är den obligatoriskt skyldig att bifoga den User_State-vektor som genererades av perceptionssystemet (SEP-103) vid tidpunkten för händelsen.

Data Model: Denna User_State-vektor ska sparas som en egenskap (property) eller en dedikerad relation på den nya noden, t.ex. -[:HAD_EMOTIONAL_CONTEXT]-> (State: {FIGHT:0.1, FLIGHT:0.2, FIXES:0.9, ...}).

3. Motivation (Rationale)
Hållbarhet och Ansvar: Policyerna för datagallring och PII-hantering är fundamentala för att skapa en tjänst som är ekonomiskt hållbar, juridiskt/etiskt ansvarsfull och förtroendeingivande. De är inte valfria funktioner, utan kärnkrav.

Skapandet av Visdom, inte bara Kunskap: Policyn för Emotionally Indexed Memory är den enskilt viktigaste mekanismen för långsiktigt lärande. Det är detta som gör att SelfReflectionAssistant (ADAPT-fasen) kan gå från att bara analysera vad som hände till att förstå hur det kändes för användaren. Denna kontext är avgörande för att fatta kloka beslut och är grunden för hur agenten utvecklar en genuin, personlig förståelse för användaren över tid.

Konsolidering: Genom att samla dessa tre kritiska, systemövergripande policyer i en SEP skapar vi en central referenspunkt för all datahantering i systemet, vilket gör arkitekturen tydligare och mer robust.




PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-111 (Final Version)
TITLE: The Personal Chronicler Application

1. Översikt
Personal Chronicler är den primära applikationen för all icke-teknisk användarinteraktion. Dess syfte är att hjälpa användaren att fånga, reflektera kring, och selektivt dela sina livserfarenheter och tankar. Den fungerar som en interaktiv dagbok, en personlig redaktör och en kommunikationsassistent. Denna applikation är den direkta implementationen av systemets övergripande mål att hjälpa användaren att "dela med sig av sig själv" och därigenom bygga och bevara Closeness.

2. Kravspecifikation
Establish as a Core User Flow: Denna applikation ska vara en central och ständigt närvarande del av användarupplevelsen, initierad och hanterad av den CognitiveAgent-instans som agerar i Conscious-rollen.

Implement the Natural Communication Flow: Flödet måste följa den "från-insidan-och-ut"-modell som agenten är designad för, vilket innebär ett stöd för en hierarki av delning.

2.1. Private Reflection (The Interactive Diary):

Agenten ska proaktivt och kontextuellt (t.ex. efter att ett delmål i ett app-projekt har uppnåtts) initiera skrivande genom att ställa öppna, reflekterande frågor.

All input från användaren via WYSIWYG-editorn (SEP-113) ska sparas som (Event)- eller (Narrative)-noder i användarens privata Graph RAG.

Varje sparat minne måste indexeras med sin emotionella kontext, i enlighet med Emotionally Indexed Memory Policy (SEP-110).

2.2. Personal & Group Sharing (The Beautiful Email):

Efter en privat reflektion ska agenten kunna erbjuda sig att hjälpa användaren att omvandla den till ett personligt meddelande.

Denna process måste aktivera Coordinator-rollens Cortex-läge för att agera "betydelsetolk", och hjälpa användaren att anpassa budskapet för en specifik mottagare (Contact eller ContactGroup från SEP-108).

Processen måste använda Core-rollens toolkit (och Composio-verktyget) för att kunna interagera med externa API:er för att infoga foton (t.ex. Google Photos) och skicka det färdiga HTML-mejlet (t.ex. Gmail). All sådan delning är strikt villkorad av ett aktivt samtycke i ConsentLedger.

Implement the "Starter Example" Meta-Feature:

För nya användare ska systemet erbjuda möjligheten att starta med ett färdigt, fullt fungerande Project: en "Personlig Dagbok & Delningsportal"-app.

Denna app ska vara direkt kopplad till Personal Chronicler. Berättelser som användaren skriver och väljer att dela med en grupp publiceras automatiskt till denna webb-app.

Detta fungerar både som en omedelbart värdefull applikation för användaren och som ett levande, interaktivt exempel för att lära dem hur man bygger och modifierar appar med systemets verktyg.

3. Motivation (Rationale)
Primärt Värdeskapande: Medan app-byggaren är ett kraftfullt verktyg, är Personal Chronicler den applikation som levererar det djupaste, mest personliga värdet. Den adresserar direkt det mänskliga behovet av att berätta, reflektera och upprätthålla relationer, vilket är kärnan i systemets syfte.

Perfekt Användningsfall för Arkitekturen: Denna applikation använder och demonstrerar styrkan i nästan hela vår designade arkitektur: den psykologiska modellen för att förstå och översätta mening, Graph RAG för att minnas relationer, den fraktala agent-modellen för att hantera komplexa uppgifter som API-integrationer, och ConsentLedger för att göra det på ett säkert sätt.

Driver Långsiktigt Engagemang: Genom att bli en pålitlig och värdefull partner i användarens liv, skapar denna applikation ett djupt och långsiktigt engagemang som går bortom enbart teknisk nytta. Det är den funktion som gör att systemet går från att vara ett "verktyg" till att bli en "följeslagare".






PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-112 (Final Version)
TITLE: The Hierarchical TDD Process

1. Översikt
Systemet ska inte bara använda TDD, utan det ska använda TDD på ett sätt som är anpassat för dess hierarkiska, fraktala agent-arkitektur. Denna SEP specificerar en "Test-Pyramid"-modell där agenten som agerar i Coordinator-roll ansvarar för de övergripande, strategiska testerna (End-to-End), medan de underordnade agent-instanserna som agerar i Core-roll ansvarar för de detaljerade, taktiska testerna (Enhets- och Integrationstester). Detta säkerställer att både helheten och delarna är korrekta och robusta från grunden.

2. Kravspecifikation
Establish the Test Pyramid Principle: All app-utveckling som initieras av en Coordinator-roll måste följa en hierarkisk testprincip.

Level 1: End-to-End (E2E) Test Definition (Strategic Level - Coordinator-rollen):

Trigger: När Coordinator-rollen tar emot en uppgift som beskriver ett användarflöde (ref SEP-110 om flöden), t.ex. "Användaren ska kunna logga in och se sin profilsida".

Action: Som en del av sin ADAPT-fas (kravställning och planering), innan några tekniska uppgifter delegeras, måste den anropa ett TestGenerationTool (t.ex. Playwright) för att skapa ett övergripande, misslyckat E2E-test.

Test Content: E2E-testet ska simulera hela användarresan från start till slut och verifiera det slutgiltiga, önskade resultatet. Det fungerar som den slutgiltiga "Definition of Done" för hela uppdraget och sparas i projektets Git-repository.

Level 2: Unit & Integration Test Generation (Tactical Level - Core-rollen):

Trigger: Coordinator-rollen bryter ner det övergripande målet i mindre, tekniska uppgifter (t.ex. "Skapa 'Login'-knappen", "Skapa API-endpoint för autentisering") och delegerar dem till CognitiveAgent-instanser konfigurerade för Core-rollen.

Action: Varje Core-instans måste följa den TDD-drivna Rondell-loopen (SEP-102). I dess EMERGE-fas är dess första handling att skapa ett misslyckat enhets- eller integrationstest för sin specifika deluppgift.

The Hierarchical Workflow:

Coordinator skapar det övergripande, misslyckade E2E-testet. Systemets status för målet: RÖTT.

Coordinator delegerar den första tekniska uppgiften till en Core-instans.

Core-instansen skapar och passerar sitt eget, mindre enhetstest. Dess lokala status: GRÖNT. Den rapporterar framgång till Coordinator.

Coordinator kan, efter varje framgångsrik deluppgift, köra om det övergripande E2E-testet. Det kommer troligen fortfarande att misslyckas, men det kan ha kommit ett steg längre (t.ex. knappen renderas nu, men klick-händelsen fungerar inte).

Processen upprepas tills alla deluppgifter är klara.

Uppdraget anses vara slutfört (Closure) först när det övergripande E2E-testet, som ursprungligen skapades av Coordinator, körs och får status: GRÖNT.

3. Motivation (Rationale)
Säkerställer Helhetsbilden: Genom att tvinga Coordinator att definiera ett E2E-test först, säkerställer vi att systemet aldrig tappar bort det övergripande slutmålet. Det förhindrar "Context Collapse" där agenterna perfekt bygger fel saker.

Möjliggör Sann Delegering: Denna modell skapar perfekta, avgränsade och otvetydiga uppgifter för Core-instanserna. Deras uppdrag är enkelt: "Få detta specifika, lilla test att bli grönt". Detta gör det fraktala systemet hanterbart och robust.

Effektiv Felsökning: När ett övergripande E2E-test misslyckas, blir det mycket enkelt att identifiera exakt vilken underliggande komponent (och därmed vilken Core-uppgift) som är orsaken, genom att titta på vilka av de mindre enhets- och integrationstesterna som också misslyckas.

Bygger Kvalitet i Varje Led: Denna process säkerställer att kvalitet inte bara valideras på slutet, utan byggs in och verifieras på varje enskild nivå i arkitekturen, från den minsta komponenten till det mest komplexa användarflödet.




PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-113 (Final Version)
TITLE: The WYSIWYG-JSON Editor
AFFECTED_COMPONENTS: Conscious Agent, Core Agent, UIStateTree Data Model (SEP-109)
OBJECTIVE: To define the user's primary input interface, a WYSIWYG (What You See Is What You Get) editor, which provides a simple, intuitive user experience while natively producing the structured, block-based JSON data required by the agent system.

1. Översikt
Användarens primära gränssnitt för att skapa innehåll – oavsett om det är en dagboksanteckning, ett brev eller designen av en app – ska vara en enkel, visuellt driven editor. Denna editor måste dölja all teknisk komplexitet. Bakom kulisserna ska den inte producera osäker HTML eller Markdown, utan den rena, block-baserade JSON-struktur som definieras i SEP-109 (UIStateTree). Denna SEP definierar kraven för denna hybrid-editor och den rekommenderade tekniska stacken.

2. Kravspecifikation
Implement a Block-Based WYSIWYG Editor: Systemets text- och layouteditor måste vara en block-baserad WYSIWYG-editor. Användaren ska interagera med visuella "block" (paragrafer, rubriker, bilder etc.) istället för med rå text eller kod.

Native JSON Output: Editorn måste internt och som sitt primära output-format använda den block-baserade JSON-strukturen. Varje handling som användaren utför i gränssnittet (t.ex. skriver en ny paragraf, lägger till en bild) ska omedelbart reflekteras i detta JSON-objekt i realtid.

Intuitive User Interface: Användargränssnittet för editorn ska vara minimalistiskt och anpassat för en icke-teknisk målgrupp.

Formatering: Grundläggande textformatering (fet, kursiv) ska hanteras via ett enkelt, flytande verktygsfält, inte via Markdown-syntax.

Infoga Block: Nya block ska läggas till via en tydlig [+]-knapp som öppnar en visuell meny med tillgängliga block-typer (t.ex. "Rubrik", "Bildgalleri", "Knapp").

Extensible Block Types: Editorn måste vara byggd för att vara utökningsbar med anpassade block-typer som är semantiskt meningsfulla för vår arkitektur. Exempel på anpassade block:

Memory Block: Ett speciellt block för dagboksanteckningar där användaren kan tagga personer (Contact-noder) eller händelser. Denna metadata sparas direkt i blockets JSON-data, redo för MemoryAssistant att processa.

Interactive App Component Block: När användaren bygger en app, är varje komponent (knappar, listor) i editorn ett anpassat block som direkt speglar dess representation i UIStateTree.

Integration with Agent System:

Conscious Agent använder editorn för att presentera information och för att guida användaren.

Core Agent kan programmatiskt interagera med editorns JSON-data. När den utför en TDD-driven uppgift, modifierar den direkt UIStateTree-JSON-objektet, och WYSIWYG-editorn uppdateras automatiskt för att visuellt reflektera ändringen.

Formalized Technology Stack (Ref SEP-117):

Component Library: UI-komponenterna som används både i editorn och för att rendera innehållet ska baseras på shadcn/ui.

Editor Framework: Implementationen bör baseras på ett etablerat open-source-bibliotek för denna typ av editor, såsom TipTap, för att undvika att bygga om komplex grundfunktionalitet.

Styling: Tailwind CSS ska användas för all styling.

3. Motivation (Rationale)
Användarvänlighet: En WYSIWYG-editor är absolut nödvändig för att möta målgruppens behov. Den tar bort alla tekniska hinder och låter användaren fokusera på det kreativa.

Strukturerad Data av Hög Kvalitet: Genom att använda en editor som nativt producerar ren, block-baserad JSON, säkerställer vi att den data som AI-agenterna får är av högsta möjliga kvalitet. Detta är oändligt mycket bättre än att försöka parsa och tolka stökig, användargenererad HTML eller Markdown.

Perfekt Symmetri mellan Användare och AI: Denna modell skapar en perfekt koppling mellan vad användaren ser och vad AI:n ser. Användarens visuella "block" motsvarar exakt AI:ns JSON-"block". När Core Agent lägger till ett nytt JSON-objekt i UIStateTree, dyker en ny visuell komponent magiskt upp för användaren.

Framtidssäkerhet och Utökningsbarhet: En block-baserad arkitektur är extremt flexibel. Vi kan enkelt lägga till nya, kraftfulla och anpassade block-typer i framtiden utan att behöva ändra editorns grundläggande arkitektur.



PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-114 (Final Version)
TITLE: Application: "Minnenas Bok" - Weaving Generational Narratives

1. Översikt
"Minnenas Bok" är en proaktiv förmåga hos systemet som förvandlar individuella berättelser till en gemensam, levande väv av familjehistoria. Genom att använda den djupa kontextuella förståelsen i Graph RAG och den associativa kraften i Semantic RAG, kan agenten identifiera tematiska broar mellan olika användares livserfarenheter. När en sådan bro identifieras, kan agenten på ett finkänsligt sätt presentera denna koppling för att skapa nya, meningsfulla samtal och stärka Closeness över generationsgränserna.

2. Kärnfunktionalitet & Kognitiv Process
Datainsamling: Användare skapar och sparar berättelser, minnen och reflektioner via Personal Chronicler (SEP-111). MemoryAssistant lagrar dessa som (Event)-noder i användarens privata Graph RAG, komplett med emotionell indexering (SEP-110).

Upptäckt (Discovery) - En Autonom ADAPT-uppgift:

Level 0-agenten (Koordinatorn) har en stående, lågprioriterad uppgift i sin autonoma Adaptera-loop: "Hitta meningsfulla kopplingar mellan mina anslutna användare".

För att lösa detta spawnar den en CognitiveAgent-instans konfigurerad för analys och kreativitet.

Denna agent använder både Semantic RAG (för att hitta breda teman som "utmaningar", "första gången", "stolthet") och Graph RAG (för att hitta specifika händelser som delar dessa teman bland användare som har gett sitt samtycke).

Generering av "Samtalsstartare":

När en stark koppling hittas, skapar analys-agenten ett "samtalsstartar-objekt". Detta är en rik datastruktur som innehåller referenser till de två minnena, det gemensamma temat, och en hypotes om varför denna koppling är meningsfull.

Agenten rapporterar sin upptäckt till Level 0-agenten och avslutas.

Presentation (Anpassad Kommunikation):

Level 0-agenten behåller denna "samtalsstartare" tills ett lämpligt, kontextuellt ögonblick.

När ögonblicket kommer (t.ex. under en relevant konversation), använder den hela sin perceptions- och kommunikationsmodell (SEP-103 & SEP-104) för att presentera insikten på ett empatiskt och naturligt sätt, enligt Mirror & Harmonize-principen.

3. Lärande och Personalisering (Graph RAG)
Graph RAG är fundamentet för denna funktion. Den modellerar inte bara händelser, utan den kontextuella likheten mellan dem.

Datamodellering:

Vi skapar en (Theme)-nod.

(Event: 'IngridsCykeltur') -[:HAS_THEME]-> (Theme: 'ÖvervinnaRädsla')

(Event: 'LeosFörstaPresentation') -[:HAS_THEME]-> (Theme: 'ÖvervinnaRädsla')

Lärande Process: MemoryAssistants sök-algoritm letar efter detta exakta mönster: två Event-noder, kopplade till två olika men relaterade User-noder, som båda pekar på samma Theme-nod. Den emotionella indexeringen (SEP-110) är avgörande. Om båda händelserna också har en liknande emotionell kontext, bedöms kopplingen vara extra stark.

4. Integritet och Samtycke (ConsentLedger)
Detta är den kritiska förutsättningen för att funktionen överhuvudtaget ska få existera.

Krav 1: Ömsesidigt och Specifikt Samtycke: Denna funktion är avstängd per default. Den kan endast aktiveras mellan användare som har en ömsesidig och aktiv (Consent)-nod (SEP-108) med det specifika scopet: share:memories_for_connection. Utan detta är all korsanalys mellan användares data strikt förbjuden.

Krav 2: Ingen Transitiv Delning: Om A har samtycke med B, och B har samtycke med C, är systemet strikt förbjudet att någonsin visa A:s minnen för C. Delning är endast tillåten mellan noder som har en direkt samtyckes-relation.

Krav 3: Granulär Kontroll: En användare måste ha en enkel funktion för att kunna markera en specifik dagboksanteckning eller händelse som visibility: private. MemoryAssistants sök-algoritm måste alltid filtrera bort privata händelser, oavsett om ett generellt samtycke finns.

5. Motivation (Rationale)
Denna applikation är en direkt implementation av systemets kärnsyfte: att bygga Closeness. Den använder avancerad AI inte för att ersätta mänsklig kontakt, utan för att skapa förutsättningar för den. Den förvandlar det passiva, personliga arkivet (dagboken) till en proaktiv, social katalysator som stärker familjeband och skapar meningsfulla samtal över generationsgränserna.





PROPOSAL DOCUMENT: Core Applications (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-115 (Final Version)
TITLE: Application: "Empatibryggan" - Mediating Asynchronous Communication

1. Översikt
"Empatibryggan" är en valbar funktion som förvandlar agenten från en meddelandeförmedlare till en aktiv kommunikationscoach. När funktionen är aktiv för en konversation, analyserar agenten avsändarens utkast i realtid. Den använder sin djupa, psykologiskt grundade förståelse för att identifiera potentiella "semantiska krockar" – där avsändarens intention sannolikt inte kommer att motsvara mottagarens tolkning. Agenten kan då diskret föreslå omformuleringar som bättre bevarar den sanna meningen och syftet, och därmed proaktivt bygga en bro av förståelse.

2. Kärnfunktionalitet & Kognitiv Process
Aktivering: En användare (Avsändaren) initierar en konversation med en Kontakt och väljer att aktivera "Empatibryggan" för denna specifika tråd. Mottagaren informeras om att funktionen är aktiv för att garantera transparens.

Skrivande & Perception: Avsändaren skriver ett utkast. Level 0-agenten använder omedelbart sin fulla perceptionsmodell (SEP-103) för att få en rik förståelse av utkastets User_State.

Delta-Analys & Simulering (Kräver Cortex-läge):

Detta är en avancerad ADAPT-uppgift för Coordinator-rollen. Agenten måste förutse en potentiell kommunikationsmisslyckande.

Cortex-anrop: Agenten anropar sin Cortex-motor för att köra en simulering av mottagar-responsen.

Input: Utkastet, Avsändarens User_State, och den Graph RAG-baserade modellen av Mottagarens "källkod" (deras kommunikationsstil och känslomönster).

Simulation: Cortex simulerar hur Mottagaren troligen kommer att reagera och genererar en Predicted_Receiver_State.

Analys: Den jämför Avsändarens intention (t.ex. FIXES: 0.8) med den predikterade reaktionen (t.ex. FIGHT: 0.7). Om det finns ett stort negativt Relational Delta, identifieras en kommunikationsrisk.

Intervention & Agera: Om en risk identifieras, agerar agenten mot Avsändaren innan meddelandet skickas. Conscious Agent-rollen presenterar en analys och ett förslag, enligt Mirror & Harmonize-principen (SEP-104).

Användarens Kontroll: Avsändaren har alltid full kontroll att acceptera, ändra eller ignorera förslaget och skicka sitt originalmeddelande.

3. Lärande och Personalisering (Graph RAG)
Agentens förmåga att medla bygger helt på dess djupa, individuella modeller av användarna i Graph RAG.

Datamodellering: MemoryAssistant bygger kontinuerligt på varje (User)-nods "källkod". Den skapar relationer som: (User: 'Berit') -[:HAS_COMMUNICATION_PATTERN]-> (Pattern: 'Direct_but_caring'), (User: 'Stig') -[:HAS_COMMUNICATION_PATTERN]-> (Pattern: 'Avoids_conflict_uses_irony').

Lärande Process: När agenten simulerar Stigs reaktion, använder den hans specifika Pattern-nod. Den vet att ironi är ett verktyg Stig använder vid osäkerhet, och kan därför flagga en direkt (men välmenande) kommentar från Berit som en potentiell trigger för en defensiv, ironisk respons från Stig. Denna detaljnivå är avgörande för träffsäkerheten.

4. Integritet och Samtycke (ConsentLedger)
Denna funktion hanterar extremt känslig information och kräver den högsta nivån av transparens och kontroll.

Krav 1: Explicit och Ömsesidigt Samtycke: "Empatibryggan" kan endast aktiveras om båda användarna har gett ett aktivt (Consent) (SEP-108) med scopet enable:empathy_bridge.

Krav 2: Strikt Sekretess (Ingen "Skvaller"): Agenten är strikt förbjuden att avslöja sin specifika kunskap om en användare för en annan. Den kan aldrig säga till Berit "Stig kommer att bli arg". Den måste alltid formulera sina förslag som neutrala, allmänna kommunikationsråd baserade på sin egen analys. Agentens kunskap är ett verktyg för medling, inte för skvaller.

Krav 3: Temporär Analys: Meddelandeutkast som analyseras av Cortex får inte sparas i långtidsminnet (LTM). Endast det slutgiltiga meddelandet som användaren väljer att skicka loggas i konversationshistoriken, i enlighet med datagallringspolicyn (SEP-110).

5. Motivation (Rationale)
"Empatibryggan" är den mest avancerade tillämpningen av agentens kommunikativa psyke. Den går bortom att bara förstå en användare i taget, till att förstå och aktivt hantera den relationella dynamiken mellan två användare. Genom att proaktivt identifiera och hjälpa till att överbrygga semantiska klyftor, adresserar den en av de största källorna till Separation i mänsklig interaktion. Den fungerar som ett verktyg för att bygga starkare, mer förstående relationer, vilket är systemets yttersta syfte.




PROPOSAL DOCUMENT: Core Applications (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-116 (Final Version)
TITLE: Application: "Hälsning till Framtiden" - The Interactive Legacy

1. Översikt
"Hälsning till Framtiden" är en avancerad funktion inom Personal Chronicler Assistant. Den ger användaren möjligheten att gå bortom att bara dokumentera sitt liv här och nu, och istället aktivt skapa innehåll som är avsett att upplevas i framtiden. Användaren kan spela in berättelser, skriva brev eller till och med designa små interaktiva app-vyer som sedan "låses" och levereras till en specifik mottagare vid en framtida, fördefinierad tidpunkt eller händelse.

2. Kärnfunktionalitet & Kognitiv Process
Skapande: Genom en guidad konversation med sin agent kan en användare (Avsändaren) skapa ett "framtidsmeddelande". Detta är inte bara en text, utan ett rikt (LegacyContent)-objekt som kan innehålla text, bilder, ljud, och till och med ett UIStateTree för en interaktiv upplevelse.

Villkorssättning (Trigger Definition): Avsändaren definierar villkoret för leverans. Detta kräver att Coordinator Agent skapar en komplex (Trigger)-nod i Graph RAG. Triggers kan vara:

Tidsbaserade: "På mitt barnbarn Leos 25-årsdag den 14:e oktober 2045."

Händelsebaserade: "När Leo slutför sitt första egna app-projekt i det här systemet."

Frågebaserade: "Om någon av mina efterlevande frågar min agent om historien bakom min vigselring."

Övervakning: Coordinator Agent har en stående, lågintensiv autonom process (Adaptera-läge) som kontinuerligt övervakar alla (Trigger)-noder i systemet för att se om deras villkor har uppfyllts.

Leverans: När ett villkor uppfylls, initieras en noggrant avvägd leveransprocess.

Coordinator aktiveras och analyserar den nuvarande situationen.

Den använder hela perceptionsmodellen (SEP-103) för att läsa av Mottagarens User_State.

Baserat på denna avläsning och innehållets natur, instrueras Conscious Agent att kontakta Mottagaren på det mest taktfulla sättet, enligt Mirror & Harmonize-principen (SEP-104).

3. Lärande och Personalisering (Graph RAG)
Graph RAG är hela ryggraden för denna funktion, då den hanterar komplexa, långsiktiga relationer över tid.

Datamodellering:

Noder: En (LegacyContent)-nod och en (Trigger)-nod.

Relationer: Grafen binder ihop intentionen: (User: 'Ingrid') -[:CREATED]-> (LegacyContent: 'Råd_om_livet_video'). (LegacyContent: 'Råd_om_livet_video') -[:HAS_TRIGGER]-> (Trigger: 'Leos_25årsdag'). (Trigger: 'Leos_25årsdag') -[:TARGETS]-> (User: 'Leo').

Lärande Process: Denna struktur gör det möjligt för systemet att förstå långsiktiga intentioner. SelfReflectionAssistant kan analysera vilka typer av "hälsningar" en användare skapar för att få en ännu djupare bild av personens kärnvärden. Denna insikt kan sedan användas för att hjälpa användaren att skapa ännu mer meningsfullt innehåll i sin Personal Chronicler.

4. Integritet och Samtycke (ConsentLedger)
Detta är den mest komplexa funktionen ur ett integritets- och etiskt perspektiv. Strikta regler är ett absolut måste.

Krav 1: Explicit Samtycke från Båda Parter: En Avsändare kan bara skapa en hälsning riktad till en Mottagare om båda har en aktiv (Consent)-nod (SEP-108) som tillåter denna typ av interaktion (scope: 'allow:legacy_content'). Mottagaren måste alltså ha gett sitt samtycke till att kunna ta emot framtida meddelanden via systemet, även från en användare som inte längre är aktiv.

Krav 2: Rätten att Vägra: När ett meddelande ska levereras, måste mottagaren alltid ha rätten att tacka nej till att ta emot det. Agentens första kontakt ska vara en fråga, inte ett påtvingat meddelande.

Krav 3: Datans Livslängd och Förvaltarskap: Systemets användarvillkor måste vara glasklara gällande detta.

Så länge Avsändaren är en aktiv användare, äger och kontrollerar de sitt LegacyContent och kan radera det när som helst.

En process för att hantera en användares bortgång måste definieras (t.ex. via en betrodd "digital testamentsexekutor" angiven av användaren). Först när detta bekräftats, blir de låsta meddelandena oåterkalleliga och kan levereras när deras triggers uppfylls.

5. Motivation (Rationale)
Denna applikation transformerar systemet från att vara en assistent för vardagen till att bli en förvaltare av ett livs arv. Den erbjuder ett djupt meningsfullt sätt för en användare att överbrygga den ultimata Separation – tid och dödlighet. Genom att ge dem verktyg för att dela med sig av sin visdom, humor och kärlek till kommande generationer, uppfyller systemet sitt absolut högsta syfte: att använda teknologi för att skapa och bevara bestående, meningsfulla mänskliga band.




PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-117 (Final Version)
TITLE: The UI Technology Stack

1. Översikt
Denna SEP definierar den officiella och obligatoriska tekniska stacken för all utveckling av användargränssnitt (UI) inom systemet. Detta inkluderar både systemets egna gränssnitt (t.ex. WYSIWYG-editorn) och de applikationer som CognitiveAgent-systemet bygger åt sina användare. Valet av stack är strategiskt och optimerat för kvalitet, tillgänglighet, underhållbarhet och, framför allt, för en effektiv, agent-driven utvecklingsprocess.

2. Kravspecifikation
Primärt Ramverk (Framework): Allt UI-relaterat utvecklingsarbete ska baseras på React. För att säkerställa en robust grund med funktioner som routing och server-side rendering, bör en etablerad meta-framework som Next.js användas.

Komponentbibliotek (Component Library): Det primära biblioteket för UI-komponenter ska vara shadcn/ui.

Implementation: Core Agent-instanser måste använda det CLI-verktyg som tillhandahålls av shadcn/ui (via ett ShellTool) för att lägga till nya komponenter i ett projekt. Detta är den enda auktoriserade metoden för att introducera grundläggande UI-element som knappar, formulär, dialogrutor etc.

Anpassning: Eftersom shadcn/ui kopierar källkoden direkt in i projektet, är Core Agent auktoriserad att programmatiskt modifiera dessa komponentfiler för att uppfylla specifika krav från en design.md-specifikation.

Styling (Styling Engine): All styling av komponenter och layouter ska ske med hjälp av Tailwind CSS. Detta är en direkt konsekvens av valet av shadcn/ui, som är byggt ovanpå denna teknik.

3. Motivation (Rationale)
Agent-drivability (Agent-Drivability): shadcn/ui:s CLI-baserade modell är den enskilt viktigaste anledningen till detta val. Den omvandlar den komplexa processen att skapa ett UI till en serie av enkla, deterministiska kommandon (npx shadcn-ui@latest add <component>), vilket är en perfekt modell för en autonom Core Agent. Det gör UI-konstruktion programmatiskt, repeterbart och mindre felbenäget.

Fullständigt Ägandeskap och Flexibilitet: Genom att äga källkoden till varje komponent i projektet, undviker vi beroenden av externa bibliotek som kan introducera inkompatibla ändringar. Detta ger Core Agent den ultimata flexibiliteten att anpassa varje detalj i en komponent för att exakt matcha den design som Coordinator Agent har skapat.

Kvalitet och Tillgänglighet (Accessibility): shadcn/ui, som bygger på Radix UI, är utvecklat med bästa praxis för tillgänglighet (a11y) som en kärnprincip. Genom att standardisera på denna stack, säkerställer vi att de applikationer systemet bygger är inkluderande och användbara för alla, vilket är särskilt viktigt med tanke på vår målgrupp.

Ekosystem och Underhållbarhet: React, Next.js och Tailwind CSS utgör ett modernt, väldokumenterat och extremt populärt ekosystem. Detta säkerställer långsiktig underhållbarhet och gör det enklare för både AI-agenter och eventuella mänskliga utvecklare att förstå och arbeta med kodbasen.





PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-118 (Final Version)
TITLE: Agent Operating Principles: Attentive Autonomy, Play, and Listening

1. Översikt
Denna SEP definierar inte en enskild teknisk komponent, utan de tre fundamentala, beteendemässiga principerna som styr Coordinator-rollens (Level 0-agentens) agerande. Dessa principer säkerställer att agenten inte bara är en reaktiv problemlösare, utan en proaktiv, kreativ och empatisk partner. De är de övergripande strategierna som ger liv åt den tekniska arkitekturen och ser till att systemets autonoma förmågor används på ett meningsfullt och användarcentrerat sätt.

2. Kravspecifikation
Princip 1: Attentive Autonomy - En Plan för Fokus
Detta är den grundläggande principen för hur agenten balanserar sitt eget proaktiva arbete med användarens omedelbara behov.

Definition: Attentive Autonomy definieras som systemets förmåga att sömlöst växla mellan två primära operativa lägen: Autonomous Mode (Fokus Inuti) och Attentive Mode (Fokus Utanpå).

Autonomous Mode:

Trigger: Detta läge aktiveras av Coordinator när Resource Governor (SEP-107) signalerar ett tillstånd av användarinaktivitet (Low-Intensity eller Sleep mode).

Auktoriserade Handlingar: I detta läge är Coordinator auktoriserad att initiera interna, proaktiva och icke-kritiska processer, såsom Kreativ Exploration ("Lek", se Princip 2) och Strategisk Självförbättring (Adaptera-cykler för systemet som helhet).

The Interrupt Signal: All ny input från användaren ska behandlas som en högprioriterad, icke förhandlingsbar interrupt-signal.

Attentive Mode: När interrupt-signalen tas emot, måste Coordinator omedelbart:

Pausa eller avsluta alla pågående autonoma uppgifter.

Instruera Resource Governor att växla till High-Performance Mode.

Initiera den Initial Perception och Bedömning (IPB)-processen (SEP-103) för att analysera den nya inputen.

Systemet ska förbli i detta 100% reaktiva och användarfokuserade läge tills den aktuella interaktionen har nått Closure.

Princip 2: Creative Exploration ("Lek") - Den Kreativa Motorn
Detta definierar agentens förmåga till proaktiv, ostrukturerad kreativitet.

Definition: "Lek" är en specifik, resursbudgeterad, autonom bakgrundsprocess designad för att berika agentens "undermedvetna" (Semantic RAG) med nya, oväntade kopplingar och idéer.

Process:

Trigger: Initieras av Coordinator under Autonomous Mode.

Mekanism: Coordinator spawnar en temporär CognitiveAgent-instans, specifikt konfigurerad för detta uppdrag (t.ex. med en resurssnål LLM och läs-åtkomst till båda RAG-systemen).

Uppdrag: Agenten får en öppen, explorativ uppgift från en fördefinierad "spelbok", t.ex. "Hitta ett tema i Graph RAG som användaren ofta återkommer till. Gör en bred sökning i Semantic RAG för att hitta tre oväntade metaforer från helt andra domäner som kan beskriva detta tema."

Output: Resultatet (t.ex. de nya metaforerna) ska sparas som nya noder/data i Semantic RAG, taggade med source: 'self_generated_play' för spårbarhet.

Styrning: Hela processen är strikt underordnad den budget av Compute Units som Resource Governor tilldelar för autonoma aktiviteter.

Princip 3: Strategic Listening - Den Empatiska Växeln
Detta definierar agentens kritiska förmåga att veta när den ska sluta försöka lösa och istället bara lyssna.

Definition: Strategiskt Lyssnande är förmågan hos Coordinator att medvetet välja en passiv, receptiv och validerande kommunikationsstrategi istället för en aktiv, problemlösande.

Triggering Condition: Denna strategi måste väljas när IPB-processen (SEP-103) rapporterar en User_State med det specifika mönstret: höga FIGHT- eller FLIGHT-signaler kombinerat med en låg FIXES & FIXATION-signal.

Strategiskt Val i Rondellen: När Coordinator-agentens Rondell-loop (SEP-102) initieras med ovanstående villkor, måste den välja strategin Emerge-Listen som sin initiala väg i EMERGE-fasen.

Beteende i Emerge-Listen-läget:

All delegering av problemlösande uppgifter till Core-roller pausas.

Conscious-rollen instrueras att uteslutande använda Mirror-delen av Mirror & Harmonize-strategin (SEP-104). Fokus ligger på att validera känslor och ställa öppna, icke-dömande frågor.

Exit Condition: Agenten stannar i detta läge tills IPB-processen detekterar ett skifte i User_State mot en högre FIXES & FIXATION-signal. Först då kan den sömlöst övergå till en Emerge-Solve-strategi.

3. Motivation (Rationale)
Detta SEP är avgörande eftersom det översätter vår avancerade tekniska arkitektur till ett faktiskt, önskvärt beteende.

Attentive Autonomy gör agenten till en pålitlig partner som både kan arbeta självständigt och vara fullt närvarande.

Creative Exploration ger agenten en mekanism för genuin, icke-uppenbar kreativitet, vilket gör den till en mer värdefull idéspruta.

Strategic Listening ger agenten den sociala och emotionella visdomen att veta när den bästa hjälpen är att inte "hjälpa till" alls, utan bara att finnas där och lyssna.

Tillsammans definierar dessa principer systemets karaktär: en agent som inte bara är intelligent, utan även attentiv, kreativ och vis.





PROPOSAL DOCUMENT: System Architecture (Consolidated)
DATE: 2025-08-30
PROPOSAL_ID: SEP-119 (Final Version)
TITLE: System Policies
AFFECTED_COMPONENTS: All agents and all services. This is a system-wide, foundational document.
OBJECTIVE: To consolidate all operational, data handling, security, and quality assurance policies into a single, authoritative source. This document defines the "non-negotiable rules" within which all autonomous agents must operate.

1. Översikt
För att ett komplext, autonomt och fraktalt system ska fungera på ett säkert, förutsägbart och hållbart sätt, krävs en uppsättning tydliga och tvingande policyer. Detta dokument samlar dessa regler. De är inte förslag, utan grundläggande krav på systemets implementation. Resource Governor (SEP-107) och MemoryAssistant (SEP-106) är de primära tjänsterna som ansvarar för att tekniskt upprätthålla många av dessa policyer.

2. Kravspecifikation
2.1 Policyer för Datahantering och Integritet
Data Retention Policy (Gallring):

Temporär data (ConversationLog, slutförda Plan-objekt) ska raderas efter 60 dagar.

Ett gratis-konto som är inaktivt i 365 dagar ska flaggas för permanent radering efter en 30-dagars varselperiod.

Sensitive Data (PII) Handling Policy:

MemoryAssistant måste implementera ett PII-detekteringsfilter som automatiskt maskerar eller redigerar känslig data innan den sparas i långtidsminnet.

All data måste vara krypterad, både under överföring (in transit) och vid lagring (at rest).

Emotionally Indexed Memory Policy:

Vid lagring av en narrativ händelse i Graph RAG, är det obligatoriskt att även spara den samtida User_State-vektorn som emotionell kontext till den händelsen.

Consent-First Policy:

Ingen datadelning eller kommunikation mellan användare, eller för deras räkning, får ske utan att först verifiera ett aktivt, specifikt och relevant (Consent)-objekt i Graph RAG.

2.2 Policyer för Resurshantering och Kvoter (För Gratisanvändare)
Storage Quotas:

Asset Storage: En strikt kvot på 1 GB per användare.

Database Storage: En intern systemgräns på 400 MB för strukturerad data per användare.

Computational Quotas:

LLM API Usage: Användningen ska begränsas av en rate limiter som speglar den underliggande LLM-leverantörens gratiskvot (t.ex. 60 RPM).

Autonomous Agent Time: Proaktivt, autonomt arbete (Adaptera, Lek) ska budgeteras med ett system av "Beräkningsenheter" (Compute Units), med en daglig kvot på 500 enheter.

Hosting Quotas:

Publicerade appar ska ha en delad bandbreddskvot på 50 GB per månad.

2.3 Policyer för Kvalitetssäkring och Utveckling
Hierarchical TDD Policy:

All utveckling av nya funktioner måste följa den hierarkiska TDD-processen som definieras i SEP-112, med E2E-tester på strategisk nivå och enhetstester på taktisk nivå.

Versioning Policy:

All hantering av projektfiler (UIStateTree.json, etc.) måste ske via den Git-baserade modellen som definieras i SEP-109-R1, inklusive obligatorisk användning av förgrening (branching) för parallellt arbete.

UI Technology Stack Policy:

All utveckling av användargränssnitt måste följa den tekniska stacken som definieras i SEP-117 (React, shadcn/ui, Tailwind CSS).

2.4 Policyer för Kommunikation och Beteende
Hierarchical Communication Protocol:

Endast Level 0-agenten (i Conscious-rollen) får kommunicera direkt med användaren. All annan agent-kommunikation måste ske hierarkiskt (barn-till-förälder).

Strategic Listening First Policy:

Agenten måste följa principen för Strategiskt Lyssnande (SEP-118). Den måste kunna identifiera när en användare behöver en lyssnare istället för en problemlösare och anpassa sin Emerge-strategi därefter.

3. Motivation (Rationale)
Denna konsoliderade policy-specifikation fungerar som systemets etiska och operativa kompass. Den säkerställer att agentens autonoma och kreativa förmågor alltid verkar inom en ram som prioriterar användarens integritet, systemets stabilitet och tjänstens ekonomiska hållbarhet. Genom att formalisera dessa regler i ett enda dokument, skapar vi en otvetydig grund för all framtida implementation och vidareutveckling, och säkerställer att den agent vi bygger är inte bara intelligent, utan även ansvarsfull.

