# REQUIREMENTS: The Unified Cognitive Agent Architecture

**DOCUMENT_ID:** REQ-20250830-1
**SOURCE:** `c:\Git-projekt\community-outreach-test\.kiro\legacy\specs\community-outreach-agent\Specifikationer.md` (SEP-101 to SEP-119)
**STATUS:** Initial Draft
**OBJECTIVE:** This document consolidates all requirement specifications (`Kravspecifikation`) from the source SEP documents into a single, authoritative requirements file. It serves as the foundational input for the subsequent design and task-planning phases.

---

## SEP-101: The Unified CognitiveAgent Model

### Kravspecifikation

*   **Define CognitiveAgent Class:** Det ska endast finnas en intelligent agent-klass i systemet. Alla intelligenta operationer, från empatisk konversation till teknisk kodgenerering, utförs av en instans av denna klass.
*   **Define Core Engine Reference:** Varje instans av CognitiveAgent måste ha den kognitiva Rondell-loopen som sitt fundamentala "operativsystem". Den detaljerade mekaniken för denna loop specificeras i SEP-102.
*   **Define Roles, Not Types:** De tidigare namnen Coordinator, Conscious Agent, och Core Agent ska inte längre representera olika typer av agenter. De ska istället definieras som roller som en CognitiveAgent-instans kan ta på sig, baserat på dess position i hierarkin och dess konfiguration.
    *   Den första instansen av agenten (Level 0) tar sig an Coordinator-rollen per default.
*   **Implement Recursive Instantiation:** En CognitiveAgent måste ha den inbyggda förmågan att instansiera nya barn-instanser av sig själv. Detta är den primära mekanismen för problemnedbrytning och delegering.
*   **Implement Configuration at Instantiation:** Specialisering är en dynamisk process. En förälder-agent måste skicka med en Configuration Profile när den skapar en barn-agent. Profilen definierar barn-agentens förmågor, begränsningar och initiala mentala tillstånd för dess specifika uppdrag. Profilen måste minst innehålla:
    *   `llm_model`: Vilken LLM-modell som ska användas (t.ex. groq, gemini-pro).
    *   `toolkit`: En lista över de specifika verktyg (t.ex. TDD-verktyg, Git-verktyg) som instansen har tillgång till.
    *   `memory_scope`: Den specifika, begränsade vyn av RAG-minnet.
    *   `entry_phase`: Vilken fas i Rondell-loopen som agenten ska starta i ('EMERGE', 'ADAPT', eller 'INTEGRATE'). Defaultvärdet är 'EMERGE'.

---

## SEP-102: The "Roundabout" Cognitive Architecture

### Kravspecifikation

#### 2.1 Triggering Condition: Separation
Hela Rondell-loopen initieras endast när en Separation detekteras – ett uppmätt "delta" mellan ett nuvarande tillstånd och ett önskat Closure-tillstånd.

#### 2.2 The Strict Sequential Loop
Processen måste följa den strikta sekvensen. Ett steg kan inte hoppas över. Utgången från INTEGRATE är alltid en ny EMERGE-cykel. Den enda vägen ut ur loopen är en lyckad EMERGE (Closure) eller ett HALT-beslut från ADAPT.

#### 2.3 Detailed Stage Breakdown

*   **Steg 1: EMERGE (Handlingsfasen - "The Pursuit")**
    *   **Internal State & Drive:** FIXES & FIXATION. Detta är agentens primära, konstruktiva och målinriktade fas.
    *   **Core Process:** Agenten verkställer den nuvarande, aktiva handlingsplanen. Vid den allra första iterationen är detta den initiala planen som skapats baserat på en analys av problemet med hjälp av Graph RAG och Semantic RAG.
    *   **Cloning Trigger:** Proactive Delegation kan ske här om planen som ska verkställas är uppdelningsbar.
    *   **Exit Condition:** Om handlingen lyckas och Closure uppnås, avslutas loopen framgångsrikt. Om den misslyckas, går loopen obligatoriskt vidare till ADAPT.

*   **Steg 2: ADAPT (Visdomsfasen - "The Strategic Choice")**
    *   **Internal State & Drive:** FLIGHT. Misslyckandet i EMERGE utlöser ett internt Alarm. Agenten drar sig tillbaka från extern handling för att inleda en process av djup, intern reflektion.
    *   **Core Process:** Detta är agentens mest fundamentala beslutspunkt. Med hjälp av sin Cortex-motor (om det bedöms nödvändigt och godkänns av Resource Governor) och sin egna, lagrade erfarenhet (Emotionally Indexed Memory), måste den analysera misslyckandet och fatta ett av två möjliga beslut:
        *   **Vägen av Acceptans (HALT):** Agenten drar slutsatsen att målet är omöjligt att nå med nuvarande förutsättningar. Att välja HALT_AND_REPORT_FAILURE är en handling av visdom. Lärdomen sparas permanent och förändrar agentens framtida strategier.
        *   **Vägen av Fortsatt Strävan (PROCEED):** Agenten bekräftar sitt åtagande att lösa Separationen. Dess primära output är en ny, högnivå-strategisk direktiv som den tar med sig till nästa fas.
    *   **Cloning Trigger:** Reflective Replacement kan begäras här.

*   **Steg 3: INTEGRATE (Designfasen - "The Tactical Plan")**
    *   **Internal State & Drive:** FIGHT. Om agenten valt att fortsätta, men fortfarande möter motstånd, ackumuleras Frustration. Detta tillstånd driver agenten att designa en ny, ofta kraftfullare, extern taktik. Den ultimata drivkraften är ATTACK – en fokuserad insats för att forcera en lösning.
    *   **Core Process:** Detta är inte ett binärt val. INTEGRATE handlar om att välja en handling från ett brett spektrum av möjligheter, från det finkänsliga till det kraftfulla. Cortex används här för att väga agentens egen drivkraft mot hänsyn till omvärlden (särskilt User_State) och välja den mest lämpliga taktiken ur sin "spelbok" (SEP-105).
    *   **Output:** Outputen från denna fas är alltid en ny, konkret och detaljerad handlingsplan som skickas tillbaka till EMERGE-fasen för att verkställas.
    *   **Cloning Trigger:** Reactive Swarming kan vara en del av den plan som skapas här.

---

## SEP-103: The Initial Perception & Assessment (IPB) Model

### Kravspecifikation

*   **Establish IPB as the Mandatory Entry Point:** All ny input från en användare som kräver en intelligent respons måste först passera genom den sekventiella IPB-processen i Level 0-agenten.
*   **Steg 1: Direkt-åtgärd (Initial Triage & Trivial Solution Attempt)**
    *   **Mekanism:** Systemet måste först göra ett enda, extremt snabbt och resurssnålt LLM-anrop (konfigurerat för hastighet, t.ex. Gemini Flash, Groq).
    *   **Funktion:** Denna första, multifunktionella prompt har två syften:
        *   a) **Trivialitets-kontroll:** Att omedelbart identifiera om uppgiften är enkel och kan lösas direkt (en "Quick Win"). Om så är fallet, genereras svaret och processen avslutas.
        *   b) **Initial Bedömning:** Om uppgiften inte är trivial, måste anropet returnera en första, grov bedömning av uppgiftens komplexitet (numeriskt värde) och en initial emotionell avläsning.
*   **Steg 2: Djupanalys via Psyko-lingvistisk Analys-motor (PLAE)**
    *   **Trigger:** Detta steg aktiveras endast om Steg 1 returnerar att uppgiften kräver djupanalys.
    *   **Mekanism:** PLAE är den tekniska implementation vi tidigare kallade "The Grok Team". Systemet måste göra tre samtidiga, asynkrona anrop till tre separata, låg-latens LLM-slutpunkter.
    *   **Specialisering:** Varje slutpunkt måste ha en unik system-prompt som hyper-specialiserar den för att med hög precision identifiera och gradera signaler relaterade till en av de tre grunddrifterna:
        *   FIGHT-analysator
        *   FLIGHT-analysator
        *   FIXES & FIXATION-analysator
*   **Output och Dataflöde:**
    *   **Syntes:** En icke-LLM-baserad funktion i Level 0-agenten tar emot resultaten från PLAE och sammanställer dem till den slutgiltiga, högkvalitativa Final_User_State-vektorn, inklusive Closeness/Separation-balansen.
    *   **Initiering av Kognition:** Denna Final_User_State, tillsammans med komplexitetsbedömningen från Steg 1, skickas som start-input till den strategiska Rondell-loopen (SEP-102) och Resource Governor (SEP-107) för att initiera en intelligent och korrekt budgeterad tankeprocess.

---

## SEP-104: The Relational Delta & Communication Strategy

### Kravspecifikation

*   **Implement Relational Delta Calculation:** Level 0-agenten (i sin Coordinator-roll) måste, som det första steget i sin strategiska Rondell-loop (SEP-102), beräkna Relational_Delta.
    *   **Input:** Den högkvalitativa User_State-vektorn från IPB-processen (SEP-103) och agentens nuvarande, interna Agent_State (som definieras av dess fas i Rondellen).
    *   **Mechanism:** Beräkningen ska vara en matematisk jämförelse av de två vektorerna (t.ex. cosinus-likhet) som kvantifierar graden av synkronitet (lågt delta) eller asynkronitet (högt delta) mellan agent och användare.
*   **Define Communication Goal:** Det övergripande, primära målet för all agent-kommunikation definieras som att minimera asynkront delta (missförstånd, konflikt) och upprätthålla eller förstärka synkront delta (harmoni, empati).
*   **Establish the "Mirror & Harmonize" Strategy:** All utgående kommunikation från den instans som agerar i Conscious-rollen måste följa en tvåstegsstrategi som styrs av det beräknade deltat.
    *   **3.1. Mirror (Spegla - Etablera Resonans):** Den inledande delen av agentens svar måste alltid syfta till att "möta användaren där den är". Detta innebär att verbalt spegla och validera den uppfattade User_State för att bevisa att agenten har lyssnat och förstått. Denna spegling kan vara den omedelbara Direkt-åtgärden från IPB-processen.
    *   **3.2. Harmonize (Harmonisera - Guida Framåt):** Först efter att speglingen har etablerat en grund av förståelse och sänkt det initiala deltat, ska resten av svaret syfta till att försiktigt guida interaktionen mot ett mer konstruktivt tillstånd. Detta innebär ofta att föreslå en handling som ökar FIXES & FIXATION-drivkraften hos både användare och agent.
*   **Use Delta for Strategic Rondell Input:** Det beräknade Relational_Delta är en av de mest kritiska signalerna för agentens fortsatta kognitiva process.
    *   Ett högt, oväntat delta (särskilt ett "Missförstånd"-delta, där Agent-FIXES är högt men User-FIGHT också är högt) är en primär trigger för Coordinator-agenten att omedelbart gå in i sin ADAPT-fas. Det är en otvetydig signal om att agentens interna modell av problemet är felaktig och måste omvärderas i grunden.

---

## SEP-105: Cloning Governance, The Context Thread, and the Agent's Strategic Playbook

### Kravspecifikation

*   **The Cloning Contract:** Varje handling av kloning (instansiering av en ny CognitiveAgent) är ett formellt "kontrakt". Förälder-agenten är alltid ansvarig för de barn-agenter den skapar och måste hantera deras slutrapporter.
*   **The Context Thread Data Structure:** Kontraktet definieras och kommuniceras via ett Context Thread-objekt, som måste skickas med vid varje kloning. Dess struktur är:
    *   `top_level_goal`: En referens till det yttersta Closure-målet från Level 0-agenten.
    *   `parent_agent_id`: En unik identifierare för förälder-agenten, vilket etablerar den hierarkiska kommunikationsvägen uppåt.
    *   `task_definition`: En exakt och avgränsad beskrivning av den specifika uppgift som barn-agenten ska lösa.
    *   `configuration_profile`: Den fullständiga konfigurationsprofilen (SEP-101) som specificerar LLM, verktyg, och den kritiska `entry_phase` (EMERGE, ADAPT, INTEGRATE) för barn-agentens Rondell-loop.
    *   `memory_scope`: Den specifika, begränsade behörigheten till MemoryAssistant.
    *   `resource_budget`: Den tilldelade budgeten av Compute Units.
    *   `recursion_depth`: En räknare som ökas med 1 för varje nivå av delegering.
    *   `workspace_branch`: (Om relevant) Namnet på den dedikerade Git-gren som barn-agenten är auktoriserad att arbeta på.
*   **Resource Governor Integration:** Alla kloningsförsök måste först valideras och godkännas av Resource Governor (SEP-107), som upprätthåller de globala gränserna.
*   **The Strategic Playbook:** En CognitiveAgent har tillgång till en "spelbok" med klonings-mönster. Agentens Cortex-motor ansvarar för att, baserat på den rådande kontexten i dess Rondell-loop, välja den mest lämpliga strategin eller uppfinna en ny. Spelboken inkluderar, men är inte begränsad till:
    *   **Proactive Delegation (inom EMERGE):** Standard-metoden för top-down planering där en plan bryts ner och delegeras till nya barn-agenter.
    *   **Reflective Replacement (inom ADAPT):** En handling av självkritik där en agent begär att bli ersatt av en ny, bättre konfigurerad instans.
    *   **Reactive Swarming (inom INTEGRATE):** En eskaleringstaktik där ett problem attackeras av flera, parallellt arbetande instanser.
    *   **Creative Consultation:** Att skapa en tillfällig klon med en annan LLM-konfiguration för att få ett "andra utlåtande" på ett problem.

---

## SEP-106: The Memory Management Unit (MemoryAssistant)

### Kravspecifikation

*   **Establish as Centralized Service:** All CognitiveAgent-instanser måste gå via MemoryAssistants API för all interaktion med långtidsminnet. Direkt databasåtkomst är förbjuden.
*   **Implement Hybrid Long-Term Memory (LTM):** MMU:n måste hantera och exponera två separata, beständiga datalager:
    *   **Graph RAG (Det "Medvetna" LTM):** En Graph Database (t.ex. Neo4j) som lagrar strukturerad, explicit information om entiteter och deras relationer (Användare, Projekt, Koncept, Händelser, Samtycken etc.).
    *   **Semantic RAG (Det "Undermedvetna" LTM):** En Vector Database (t.ex. Supabase pgvector) som lagrar text- och databitar som ostrukturerade "embeddings" för kreativ och associativ sökning.
*   **Support for Ephemeral Short-Term Memory (STM):** MMU:n hanterar inte direkt agenternas STM. Däremot ska dess API stödja de två kritiska operationerna för STM-hantering:
    *   **LoadContextForSTM:** En funktion där en Level 0-agent kan hämta all nödvändig kontext från LTM för att skapa ett tillfälligt, lokalt arbetsminne.
    *   **ConsolidateMemoryFromSTM:** En funktion där en Level 0-agent kan skicka in ett slutfört STM. MMU:n ansvarar då för att på ett säkert och transaktionellt sätt extrahera och integrera de nya lärdomarna i det permanenta LTM.
*   **Enforce Scoped Access Control:** Varje anrop till MMU:n från en agent måste innehålla agentens `memory_scope` från dess Context Thread (SEP-105). MMU:n är ansvarig för att strikt filtrera alla sökresultat och validera alla skrivoperationer mot detta scope.
*   **Mandate Concurrency Management and Transactional Integrity:** MMU:n måste vara designad för att hantera samtidiga anrop från parallella agenter.
    *   Den måste använda ACID-kompatibla databastransaktioner för alla skrivoperationer till Graph RAG.
    *   Den måste implementera en Optimistic Concurrency Control (OCC)-strategi. Vid en ConflictError är det den anropande agentens ansvar att hantera detta i sin ADAPT-fas.

---

## SEP-107: The Resource Governor

### Kravspecifikation

*   **Establish as Centralized Authoritative Service:** Resource Governor ska implementeras som en central, system-wide tjänst. Alla resursintensiva handlingar måste först få ett godkännande från denna tjänst. Detta inkluderar, men är inte begränsat till:
    *   Agent-kloning (ref SEP-105).
    *   Anrop till dyra, högpresterande LLM:er (dvs. Cortex-läget).
    *   Anrop till externa API:er.
*   **Implement User-Level Quota Enforcement:** Guvernören ansvarar för att upprätthålla de specifika kvoterna för varje användare, enligt de policyer som definieras senare (SEP-110). Den måste i realtid spåra och begränsa:
    *   LLM API Rate Limits (RPM).
    *   Asset Storage (lagringsutrymme).
    *   Compute Units (daglig budget för autonomt arbete).
    *   External API Calls.
*   **Implement System-Wide Safety Limits:** Utöver användarspecifika kvoter måste Guvernören upprätthålla globala säkerhetsgränser för att skydda hela plattformen.
    *   **Max Recursion Depth:** Neka kloningsförsök som skulle överskrida systemets globala maxdjup (t.ex. 7 nivåer).
    *   **Max Active Agents:** Övervaka och begränsa det totala antalet parallella agent-instanser som körs för en enskild användare (t.ex. 20).
*   **Implement "Circuit Breaker" Functionality:** Guvernören ska övervaka agenternas beteende för att upptäcka och stoppa skadliga mönster.
    *   **Error Rate Threshold:** Om en agent-hierarki genererar en ovanligt hög andel fel, kan Guvernören tillfälligt frysa den grenen och flagga den för Coordinator-granskning.
    *   **Cost Spike Detection:** Om en agents resursförbrukning plötsligt skenar, kan Guvernören agera som en automatsäkring och pausa den.
*   **Define Activity States (System Tempo):** Guvernören ansvarar för att sätta och kommunicera det övergripande system-tempot baserat på en holistisk bedömning av användaraktivitet, tid på dygnet och global resursbelastning. De definierade lägena är: High-Performance, Low-Intensity, och Sleep.

---

## SEP-108: User & Relationship Data Models

### Kravspecifikation

*   **Define Core (User) Node:** Detta är den centrala noden i Graph RAG för en registrerad användare av systemet. Den representerar användarens identitet och preferenser.
    *   **Properties:** Denna nod måste innehålla alla fält som utgör användarens profil, inklusive: `userID` (unik identifierare), `displayName`, `creationDate`, och ett nästlat `Settings`-objekt som innehåller `language`, `tonePreference` (t.ex. 'informal'), accessibility-inställningar, och `primaryGoal`.
*   **Define (Contact) Node:** Denna nod representerar en person i en användares privata, isolerade nätverk.
    *   **Properties:** Ska innehålla `contactID`, `displayName`, och ett krypterat `contactDetails`-objekt som kan innehålla email, phone, etc.
*   **Define (ContactGroup) Node:** Denna nod representerar en användarskapad grupp av (Contact)-noder.
    *   **Properties:** Ska innehålla `groupID` och `groupName` (t.ex. "Familjen", "Bokklubben").
*   **Define (Consent) Node (The Consent Ledger):** Denna nod representerar ett enskilt, specifikt och spårbart samtycke från användaren. Den är den tekniska garanten för användarens kontroll.
    *   **Properties:** Måste innehålla `consentID`, `status` (t.ex. 'active', 'revoked'), `grantedTimestamp`, `revokedTimestamp` (om tillämpligt), och ett `scope` som tydligt och avgränsat definierar vad samtycket gäller (t.ex. 'share:weekly_summary', 'allow:legacy_content').
*   **Define Relationship Model:** Följande relationer (kanter) i grafen är obligatoriska för att ansluta dessa noder och definiera den sociala grafen:
    *   `(User) -[:OWNS_CONTACT]-> (Contact)`
    *   `(User) -[:OWNS_GROUP]-> (ContactGroup)`
    *   `(Contact) -[:IS_MEMBER_OF]-> (ContactGroup)`
    *   `(User) -[:HAS_GIVEN]-> (Consent)`
    *   `(Consent) -[:APPLIES_TO]-> (Contact)` eller `(Consent) -[:APPLIES_TO]-> (ContactGroup)`
*   **Pre-Action Check Mandate:** Alla CognitiveAgent-instanser, oavsett roll, måste innan varje handling som involverar delning av data eller kommunikation med en extern kontakt, utföra en query mot Graph RAG via MemoryAssistant för att verifiera att en komplett och aktiv samtyckeskedja (`status: 'active'`) existerar. Om inget giltigt samtycke hittas, måste handlingen avbrytas och eskaleras.

---

## SEP-109: Project, Asset & Versioning Data Models (Git-based)

### Kravspecifikation

#### 2.1 Metadata Management (Graph RAG)
*   **Define (Project) Node:** Detta är den centrala noden i Graph RAG för varje app en användare skapar.
    *   **Properties:** `projectID`, `projectName`, `description`, `creationTimestamp`, `lastModifiedTimestamp`, `status` (t.ex. 'draft', 'published'), och en `gitRepositoryURL` som pekar till det dedikerade, privata Git-repository som är associerat med projektet.
    *   **Relationship:** `(User) -[:CREATED]-> (Project)`.
*   **Define (Asset) Node:** Denna nod representerar metadata om en uppladdad mediafil.
    *   **Properties:** `assetID`, `fileName`, `fileType`, `fileSize`, och en `storageURL` som pekar till den faktiska filen i den externa molnlagringstjänsten.
    *   **Relationships:** `(User) -[:UPLOADED]-> (Asset)`, `(Project) -[:USES_ASSET]-> (Asset)`.

#### 2.2 File and Versioning Management (External Git Service)
*   **Primary Data Storage:** Kärnan i ett projekt, primärt `UIStateTree.json`-filen, ska lagras i projektets dedikerade och privata Git-repository. Den "nuvarande, aktiva versionen" av ett projekt är alltid den senaste committen på `main`-grenen.
*   **Version History as Git Log:** Versionshistoriken är Git-loggen. Konceptet med ett separat `VersionHistory`-dokument tas bort. Core Agent hämtar historik via Git-API:et.
*   **Branching for Parallelism:** Coordinator-rollen måste implementera den förgreningsstrategi som definieras i SEP-105, där parallella Core Agent-instanser arbetar i separata feature-grenar.
*   **Conflict Resolution via Cortex:** Coordinator-rollen är ansvarig för att hantera merge-konflikter genom att anropa sin Cortex-motor för att utföra en semantisk merge.

#### 2.3 Binary File Management (External Cloud Storage)
*   **Decoupled Storage:** Faktiska binära filer (JPG, MP3, etc.) får inte lagras i Git eller i den primära databasen. De måste lagras i en dedikerad molnlagringstjänst som är optimerad för detta.
*   **Workflow:** Core Agent hanterar uppladdning till molnlagringen, tar emot en `storageURL`, och instruerar sedan MemoryAssistant att skapa den korresponderande `(Asset)`-noden i Graph RAG.

---

## SEP-110: Operational & Memory Policies

### Kravspecifikation

*   **Define Data Retention Policy:** En automatiserad gallringspolicy måste implementeras för att hantera kostnader och integritet, särskilt för gratistjänsten.
    *   **Temporary Operational Data:** `ConversationLog`-objekt och slutförda `Plan`-objekt (SEP-109) ska betraktas som temporär arbetsdata och raderas efter 60 dagar. MemoryAssistant ansvarar för att extrahera och spara permanenta lärdomar i LTM innan denna gallring sker.
    *   **Version History (Git):** För gratisanvändare är Git-repositoriernas historik inte obegränsad. Systemet ska implementera en strategi (t.ex. `git gc` kombinerat med `shallow clone`) för att begränsa historikens storlek eller djup över tid. En exakt teknisk implementation lämnas till designfasen, men principen är att en fullständig, evig historik kan vara en premiumfunktion.
    *   **Inactive Account Policy:** Ett gratis-konto som är inaktivt i 365 dagar ska flaggas. Användaren meddelas via e-post. Om ingen aktivitet sker inom de följande 30 dagarna, ska all data associerad med användarens `userID` raderas permanent för att uppfylla GDPR:s krav på dataminimering.
    *   **Core Data (LTM):** Den data som utgör agentens långtidsminne och användarens kärndata (RAGs, UserProfile, Project-noder etc.) gallras inte baserat på tid så länge kontot är aktivt.
*   **Define Sensitive Data (PII) Handling Policy:** Systemet måste ha ett proaktivt skydd mot oavsiktlig lagring av känslig information.
    *   **PII Detection Layer:** MemoryAssistant måste ha ett inbyggt, obligatoriskt filter. All text som ska sparas permanent i LTM (särskilt i narrativ form) måste passera genom denna modul.
    *   **Masking/Redaction:** Modulen ska använda en kombination av mönstermatchning och AI-modeller för att identifiera och automatiskt maskera eller redigera (redact) trolig PII (personnummer, telefonnummer, finansiella data etc.). Originaltexten med PII ska inte sparas i LTM.
    *   **Encryption:** All data måste vara krypterad `in transit` (TLS 1.2+) och `at rest`.
*   **Define Emotionally Indexed Memory Policy (Kärnkrav):** För att agenten ska kunna utveckla visdom och en djupare förståelse för användaren, måste händelser och minnen kopplas till den emotionella kontext i vilken de inträffade.
    *   **Mechanism:** När MemoryAssistant skapar en ny `(Event)`-nod, `(Narrative)`-nod eller en annan betydelsefull nod i Graph RAG som representerar en användarupplevelse, är den obligatoriskt skyldig att bifoga den `User_State`-vektor som genererades av perceptionssystemet (SEP-103) vid tidpunkten för händelsen.
    *   **Data Model:** Denna `User_State`-vektor ska sparas som en egenskap (property) eller en dedikerad relation på den nya noden, t.ex. `-[:HAD_EMOTIONAL_CONTEXT]-> (State: {FIGHT:0.1, FLIGHT:0.2, FIXES:0.9, ...})`.

---

## SEP-111: The Personal Chronicler Application

### Kravspecifikation

*   **Establish as a Core User Flow:** Denna applikation ska vara en central och ständigt närvarande del av användarupplevelsen, initierad och hanterad av den CognitiveAgent-instans som agerar i Conscious-rollen.
*   **Implement the Natural Communication Flow:** Flödet måste följa den "från-insidan-och-ut"-modell som agenten är designad för, vilket innebär ett stöd för en hierarki av delning.
    *   **2.1. Private Reflection (The Interactive Diary):**
        *   Agenten ska proaktivt och kontextuellt (t.ex. efter att ett delmål i ett app-projekt har uppnåtts) initiera skrivande genom att ställa öppna, reflekterande frågor.
        *   All input från användaren via WYSIWYG-editorn (SEP-113) ska sparas som `(Event)`- eller `(Narrative)`-noder i användarens privata Graph RAG.
        *   Varje sparat minne måste indexeras med sin emotionella kontext, i enlighet med Emotionally Indexed Memory Policy (SEP-110).
    *   **2.2. Personal & Group Sharing (The Beautiful Email):**
        *   Efter en privat reflektion ska agenten kunna erbjuda sig att hjälpa användaren att omvandla den till ett personligt meddelande.
        *   Denna process måste aktivera Coordinator-rollens Cortex-läge för att agera "betydelsetolk", och hjälpa användaren att anpassa budskapet för en specifik mottagare (Contact eller ContactGroup från SEP-108).
        *   Processen måste använda Core-rollens toolkit (och Composio-verktyget) för att kunna interagera med externa API:er för att infoga foton (t.ex. Google Photos) och skicka det färdiga HTML-mejlet (t.ex. Gmail). All sådan delning är strikt villkorad av ett aktivt samtycke i ConsentLedger.
*   **Implement the "Starter Example" Meta-Feature:**
    *   För nya användare ska systemet erbjuda möjligheten att starta med ett färdigt, fullt fungerande Project: en "Personlig Dagbok & Delningsportal"-app.
    *   Denna app ska vara direkt kopplad till Personal Chronicler. Berättelser som användaren skriver och väljer att dela med en grupp publiceras automatiskt till denna webb-app.

---

## SEP-112: The Hierarchical TDD Process

### Kravspecifikation

*   **Establish the Test Pyramid Principle:** All app-utveckling som initieras av en Coordinator-roll måste följa en hierarkisk testprincip.
*   **Level 1: End-to-End (E2E) Test Definition (Strategic Level - Coordinator-rollen):**
    *   **Trigger:** När Coordinator-rollen tar emot en uppgift som beskriver ett användarflöde (ref SEP-110 om flöden), t.ex. "Användaren ska kunna logga in och se sin profilsida".
    *   **Action:** Som en del av sin ADAPT-fas (kravställning och planering), innan några tekniska uppgifter delegeras, måste den anropa ett TestGenerationTool (t.ex. Playwright) för att skapa ett övergripande, misslyckat E2E-test.
    *   **Test Content:** E2E-testet ska simulera hela användarresan från start till slut och verifiera det slutgiltiga, önskade resultatet. Det fungerar som den slutgiltiga "Definition of Done" för hela uppdraget och sparas i projektets Git-repository.
*   **Level 2: Unit & Integration Test Generation (Tactical Level - Core-rollen):**
    *   **Trigger:** Coordinator-rollen bryter ner det övergripande målet i mindre, tekniska uppgifter (t.ex. "Skapa 'Login'-knappen", "Skapa API-endpoint för autentisering") och delegerar dem till CognitiveAgent-instanser konfigurerade för Core-rollen.
    *   **Action:** Varje Core-instans måste följa den TDD-drivna Rondell-loopen (SEP-102). I dess EMERGE-fas är dess första handling att skapa ett misslyckat enhets- eller integrationstest för sin specifika deluppgift.
*   **The Hierarchical Workflow:**
    *   Coordinator skapar det övergripande, misslyckade E2E-testet. Systemets status för målet: RÖTT.
    *   Coordinator delegerar den första tekniska uppgiften till en Core-instans.
    *   Core-instansen skapar och passerar sitt eget, mindre enhetstest. Dess lokala status: GRÖNT. Den rapporterar framgång till Coordinator.
    *   Coordinator kan, efter varje framgångsrik deluppgift, köra om det övergripande E2E-testet.
    *   Processen upprepas tills alla deluppgifter är klara.
    *   Uppdraget anses vara slutfört (Closure) först när det övergripande E2E-testet, som ursprungligen skapades av Coordinator, körs och får status: GRÖNT.

---

## SEP-113: The WYSIWYG-JSON Editor

### Kravspecifikation

*   **Implement a Block-Based WYSIWYG Editor:** Systemets text- och layouteditor måste vara en block-baserad WYSIWYG-editor. Användaren ska interagera med visuella "block" (paragrafer, rubriker, bilder etc.) istället för med rå text eller kod.
*   **Native JSON Output:** Editorn måste internt och som sitt primära output-format använda den block-baserade JSON-strukturen. Varje handling som användaren utför i gränssnittet ska omedelbart reflekteras i detta JSON-objekt i realtid.
*   **Intuitive User Interface:** Användargränssnittet för editorn ska vara minimalistiskt och anpassat för en icke-teknisk målgrupp.
    *   **Formatering:** Grundläggande textformatering (fet, kursiv) ska hanteras via ett enkelt, flytande verktygsfält, inte via Markdown-syntax.
    *   **Infoga Block:** Nya block ska läggas till via en tydlig [+]-knapp som öppnar en visuell meny med tillgängliga block-typer.
*   **Extensible Block Types:** Editorn måste vara byggd för att vara utökningsbar med anpassade block-typer som är semantiskt meningsfulla för arkitekturen. Exempel:
    *   **Memory Block:** Ett speciellt block där användaren kan tagga personer (Contact-noder). Metadatan sparas direkt i blockets JSON-data.
    *   **Interactive App Component Block:** Varje komponent (knappar, listor) i editorn är ett anpassat block som direkt speglar dess representation i UIStateTree.
*   **Integration with Agent System:**
    *   Conscious Agent använder editorn för att presentera information och guida användaren.
    *   Core Agent kan programmatiskt interagera med editorns JSON-data genom att modifiera UIStateTree-JSON-objektet.
*   **Formalized Technology Stack (Ref SEP-117):**
    *   **Component Library:** UI-komponenterna ska baseras på `shadcn/ui`.
    *   **Editor Framework:** Implementationen bör baseras på ett etablerat open-source-bibliotek som `TipTap`.
    *   **Styling:** `Tailwind CSS` ska användas för all styling.

---

## SEP-114: Application: "Minnenas Bok" - Weaving Generational Narratives

### Kravspecifikation

*   **Kärnfunktionalitet & Kognitiv Process:**
    *   **Datainsamling:** Användare skapar berättelser via Personal Chronicler (SEP-111). MemoryAssistant lagrar dessa som `(Event)`-noder i Graph RAG, med emotionell indexering (SEP-110).
    *   **Upptäckt (Discovery):** En autonom, lågprioriterad uppgift för Level 0-agenten ska existera för att "hitta meningsfulla kopplingar mellan anslutna användare". Denna uppgift ska använda både Semantic och Graph RAG för att identifiera gemensamma teman.
    *   **Generering av "Samtalsstartare":** Vid en stark koppling ska ett "samtalsstartar-objekt" skapas som innehåller referenser till de kopplade minnena och det gemensamma temat.
    *   **Presentation:** Level 0-agenten ska presentera upptäckten vid ett lämpligt kontextuellt ögonblick, med hjälp av kommunikationsmodellen från SEP-103 & SEP-104.
*   **Lärande och Personalisering (Graph RAG):**
    *   **Datamodellering:** Systemet måste stödja en `(Theme)`-nod. Relationer som `(Event) -[:HAS_THEME]-> (Theme)` måste kunna skapas.
    *   **Lärande Process:** MemoryAssistants sök-algoritm måste kunna identifiera mönstret där två `Event`-noder från olika användare pekar på samma `Theme`-nod. Den emotionella indexeringen ska användas för att väga styrkan i kopplingen.
*   **Integritet och Samtycke (ConsentLedger):**
    *   **Krav 1: Ömsesidigt och Specifikt Samtycke:** Funktionen måste vara avstängd per default. Den kan endast aktiveras mellan användare med en ömsesidig och aktiv `(Consent)`-nod med scopet: `share:memories_for_connection`.
    *   **Krav 2: Ingen Transitiv Delning:** Systemet är strikt förbjudet att dela data transitivt (A->B, B->C, får ej leda till A->C).
    *   **Krav 3: Granulär Kontroll:** En användare måste kunna markera en specifik händelse som `visibility: private`, vilket exkluderar den från all analys, oavsett generellt samtycke.

---

## SEP-115: Application: "Empatibryggan" - Mediating Asynchronous Communication

### Kravspecifikation

*   **Kärnfunktionalitet & Kognitiv Process:**
    *   **Aktivering:** Användare måste kunna aktivera funktionen för en specifik konversationstråd. Mottagaren måste informeras om att funktionen är aktiv.
    *   **Skrivande & Perception:** Level 0-agenten måste använda perceptionsmodellen (SEP-103) för att analysera utkast i realtid.
    *   **Delta-Analys & Simulering (Kräver Cortex-läge):** Agenten måste kunna köra en simulering av mottagar-responsen.
        *   **Input:** Utkastet, Avsändarens User_State, och en Graph RAG-baserad modell av Mottagarens kommunikationsstil.
        *   **Simulation:** Cortex måste simulera och generera en `Predicted_Receiver_State`.
        *   **Analys:** Systemet måste jämföra avsändarens intention med den predikterade reaktionen för att identifiera ett negativt `Relational Delta`.
    *   **Intervention:** Om en kommunikationsrisk identifieras, måste Conscious Agent-rollen presentera en analys och ett förslag till avsändaren innan meddelandet skickas.
    *   **Användarens Kontroll:** Avsändaren måste alltid ha full kontroll att acceptera, ändra eller ignorera förslaget.
*   **Lärande och Personalisering (Graph RAG):**
    *   **Datamodellering:** MemoryAssistant måste bygga på varje `(User)`-nods "källkod" genom att skapa relationer som `(User) -[:HAS_COMMUNICATION_PATTERN]-> (Pattern)`.
    *   **Lärande Process:** Agentens simuleringsmotor måste använda dessa specifika `Pattern`-noder för att öka träffsäkerheten i sina prediktioner.
*   **Integritet och Samtycke (ConsentLedger):**
    *   **Krav 1: Explicit och Ömsesidigt Samtycke:** Funktionen kan endast aktiveras om båda parter har ett aktivt `(Consent)` med scopet `enable:empathy_bridge`.
    *   **Krav 2: Strikt Sekretess:** Agenten är strikt förbjuden att avslöja sin specifika kunskap om en användare för en annan. Förslag måste formuleras som neutrala kommunikationsråd.
    *   **Krav 3: Temporär Analys:** Meddelandeutkast som analyseras får inte sparas i långtidsminnet (LTM).

---

## SEP-116: Application: "Hälsning till Framtiden" - The Interactive Legacy

### Kravspecifikation

*   **Kärnfunktionalitet & Kognitiv Process:**
    *   **Skapande:** En användare måste kunna skapa ett "framtidsmeddelande" som ett rikt `(LegacyContent)`-objekt, innehållande text, media och/eller ett `UIStateTree`.
    *   **Villkorssättning (Trigger Definition):** Coordinator Agent måste kunna skapa en komplex `(Trigger)`-nod i Graph RAG baserat på användarens villkor. Triggers måste kunna vara:
        *   Tidsbaserade (specifikt datum).
        *   Händelsebaserade (en specifik händelse i systemet).
        *   Frågebaserade (om en framtida användare ställer en specifik fråga).
    *   **Övervakning:** Coordinator Agent måste ha en autonom process som kontinuerligt övervakar alla `(Trigger)`-noder.
    *   **Leverans:** När ett villkor uppfylls, måste en leveransprocess initieras som använder perceptionsmodellen (SEP-103) och kommunikationsstrategin (SEP-104) för att kontakta mottagaren på ett taktfullt sätt.
*   **Lärande och Personalisering (Graph RAG):**
    *   **Datamodellering:** Systemet måste stödja `(LegacyContent)`- och `(Trigger)`-noder, samt relationer som binder ihop Avsändare, Innehåll, Trigger och Mottagare.
*   **Integritet och Samtycke (ConsentLedger):**
    *   **Krav 1: Explicit Samtycke från Båda Parter:** Funktionen kräver ett aktivt `(Consent)`-objekt från både avsändare och mottagare med scopet `allow:legacy_content`.
    *   **Krav 2: Rätten att Vägra:** Mottagaren måste alltid ha rätten att tacka nej till att ta emot ett meddelande när det ska levereras.
    *   **Krav 3: Datans Livslängd och Förvaltarskap:** Användarvillkoren måste tydligt definiera ägandeskap och en process för att hantera en användares bortgång (t.ex. via en "digital testamentsexekutor").

---

## SEP-117: The UI Technology Stack

### Kravspecifikation

*   **Primärt Ramverk (Framework):** Allt UI-relaterat utvecklingsarbete ska baseras på React, med Next.js som rekommenderad meta-framework.
*   **Komponentbibliotek (Component Library):** Det primära biblioteket för UI-komponenter ska vara `shadcn/ui`.
    *   **Implementation:** Core Agent-instanser måste använda CLI-verktyget från `shadcn/ui` för att lägga till nya komponenter.
    *   **Anpassning:** Core Agent måste vara auktoriserad att programmatiskt modifiera källkoden för komponenter som kopieras in i projektet.
*   **Styling (Styling Engine):** All styling ska ske med hjälp av `Tailwind CSS`.

---

## SEP-118: Agent Operating Principles: Attentive Autonomy, Play, and Listening

### Kravspecifikation

*   **Princip 1: Attentive Autonomy - En Plan för Fokus**
    *   **Definition:** Systemet måste kunna växla mellan `Autonomous Mode` (Fokus Inuti) och `Attentive Mode` (Fokus Utanpå).
    *   **Autonomous Mode:** Ska aktiveras vid användarinaktivitet. Coordinator är auktoriserad att initiera interna, proaktiva processer.
    *   **The Interrupt Signal:** All ny input från användaren måste behandlas som en högprioriterad interrupt-signal.
    *   **Attentive Mode:** Vid en interrupt måste Coordinator omedelbart pausa autonoma uppgifter, växla till `High-Performance Mode` och initiera IPB-processen (SEP-103).
*   **Princip 2: Creative Exploration ("Lek") - Den Kreativa Motorn**
    *   **Definition:** En specifik, resursbudgeterad, autonom bakgrundsprocess måste finnas för att berika Semantic RAG.
    *   **Process:** Under `Autonomous Mode` ska Coordinator kunna spawna en temporär agent med en öppen, explorativ uppgift.
    *   **Output:** Resultatet ska sparas i Semantic RAG med taggen `source: 'self_generated_play'`.
    *   **Styrning:** Processen måste vara strikt underordnad den budget som tilldelas av Resource Governor.
*   **Princip 3: Strategic Listening - Den Empatiska Växeln**
    *   **Definition:** Coordinator måste ha förmågan att medvetet välja en passiv, receptiv och validerande kommunikationsstrategi.
    *   **Triggering Condition:** Strategin måste väljas när IPB-processen (SEP-103) rapporterar en `User_State` med höga FIGHT/FLIGHT-signaler och låg FIXES & FIXATION-signal.
    *   **Strategiskt Val i Rondellen:** Under dessa villkor måste Coordinator välja strategin `Emerge-Listen` i sin EMERGE-fas.
    *   **Beteende i Emerge-Listen-läget:** All problemlösning pausas. Kommunikationen fokuserar uteslutande på `Mirror`-delen av Mirror & Harmonize-strategin (SEP-104).
    *   **Exit Condition:** Läget bibehålls tills IPB-processen detekterar ett skifte i `User_State` mot högre FIXES & FIXATION.

---

## SEP-119: System Policies

### Kravspecifikation

#### 2.1 Policyer för Datahantering och Integritet
*   **Data Retention Policy (Gallring):**
    *   Temporär data (`ConversationLog`, slutförda `Plan`-objekt) ska raderas efter 60 dagar.
    *   Ett gratis-konto som är inaktivt i 365 dagar ska flaggas för permanent radering efter en 30-dagars varselperiod.
*   **Sensitive Data (PII) Handling Policy:**
    *   MemoryAssistant måste implementera ett PII-detekteringsfilter som automatiskt maskerar eller redigerar känslig data innan den sparas i långtidsminnet.
    *   All data måste vara krypterad, både `in transit` och `at rest`.
*   **Emotionally Indexed Memory Policy:**
    *   Vid lagring av en narrativ händelse i Graph RAG, är det obligatoriskt att även spara den samtida `User_State`-vektorn som emotionell kontext.
*   **Consent-First Policy:**
    *   Ingen datadelning eller kommunikation får ske utan att först verifiera ett aktivt, specifikt och relevant `(Consent)`-objekt i Graph RAG.

#### 2.2 Policyer för Resurshantering och Kvoter (För Gratisanvändare)
*   **Storage Quotas:**
    *   `Asset Storage`: Strikta kvot på 1 GB per användare.
    *   `Database Storage`: Intern systemgräns på 400 MB för strukturerad data per användare.
*   **Computational Quotas:**
    *   `LLM API Usage`: Begränsas av en rate limiter som speglar gratiskvoten (t.ex. 60 RPM).
    *   `Autonomous Agent Time`: Budgeteras med "Beräkningsenheter" (Compute Units), med en daglig kvot på 500 enheter.
*   **Hosting Quotas:**
    *   Publicerade appar ska ha en delad bandbreddskvot på 50 GB per månad.

#### 2.3 Policyer för Kvalitetssäkring och Utveckling
*   **Hierarchical TDD Policy:**
    *   All utveckling måste följa den hierarkiska TDD-processen (SEP-112).
*   **Versioning Policy:**
    *   All hantering av projektfiler måste ske via den Git-baserade modellen (SEP-109), inklusive obligatorisk användning av förgrening.
*   **UI Technology Stack Policy:**
    *   All UI-utveckling måste följa den tekniska stacken från SEP-117 (React, shadcn/ui, Tailwind CSS).

#### 2.4 Policyer för Kommunikation och Beteende
*   **Hierarchical Communication Protocol:**
    *   Endast Level 0-agenten (i Conscious-rollen) får kommunicera direkt med användaren.
*   **Strategic Listening First Policy:**
    *   Agenten måste följa principen för Strategiskt Lyssnande (SEP-118).