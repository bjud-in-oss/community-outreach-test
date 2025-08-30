# Requirements Document

## Introduction

This document defines the requirements for the Unified Cognitive Agent Architecture - a sophisticated AI system designed to provide empathetic, intelligent assistance to seniors and church communities. The system features a dual consciousness architecture with a conscious agent for senior-friendly communication and a core agent for technical implementation. The agent uses a cognitive "Roundabout" loop for decision-making and can recursively instantiate child agents for complex problem-solving.

## Requirements

### Requirement 1: Unified Cognitive Agent Architecture

**User Story:** As a system architect, I want a single unified CognitiveAgent class that can take on different roles, so that the system maintains consistency while providing specialized functionality.

#### Acceptance Criteria

1. WHEN the system initializes THEN there SHALL be only one CognitiveAgent class that handles all intelligent operations
2. WHEN a CognitiveAgent is instantiated THEN it SHALL have the cognitive Roundabout loop as its fundamental operating system
3. WHEN an agent is created THEN it SHALL be assigned a role (Coordinator, Conscious Agent, or Core Agent) based on its position and configuration
4. WHEN the system starts THEN the first Level 0 agent SHALL automatically take on the Coordinator role
5. WHEN a parent agent needs to delegate work THEN it SHALL be able to instantiate new child agents recursively
6. WHEN creating a child agent THEN the parent SHALL provide a Configuration Profile containing:
   - `llm_model` (e.g., groq, gemini-pro)
   - `toolkit` (list of available tools)
   - `memory_scope` (limited RAG memory view)
   - `entry_phase` (EMERGE, ADAPT, or INTEGRATE, defaulting to EMERGE)

### Requirement 2: Roundabout Cognitive Architecture

**User Story:** As an AI system, I want to follow a structured cognitive loop for decision-making, so that I can systematically approach problems and learn from failures.

#### Acceptance Criteria

1. WHEN a separation is detected between current and desired state THEN the Roundabout loop SHALL be initiated
2. WHEN the cognitive loop runs THEN it SHALL follow the strict sequence: EMERGE → ADAPT → INTEGRATE → EMERGE
3. WHEN in any phase THEN no steps SHALL be skipped in the sequence
4. WHEN the INTEGRATE phase completes THEN it SHALL always lead to a new EMERGE cycle
5. WHEN in EMERGE phase THEN the agent SHALL execute the current action plan with FIXES & FIXATION drive
6. IF the action plan is divisible THEN Proactive Delegation MAY occur during EMERGE
7. WHEN EMERGE succeeds and Closure is achieved THEN the loop SHALL exit successfully
8. WHEN EMERGE fails THEN the loop SHALL proceed to ADAPT phase
9. WHEN in ADAPT phase THEN the agent SHALL enter FLIGHT mode and conduct deep internal reflection
10. WHEN in ADAPT phase THEN the agent SHALL make one of two decisions:
    - HALT_AND_REPORT_FAILURE (accepting the goal is impossible)
    - PROCEED (committing to continue solving the separation)
11. IF HALT is chosen THEN the learning SHALL be saved permanently for future strategies
12. IF PROCEED is chosen THEN a new high-level strategic directive SHALL be generated
13. WHEN in INTEGRATE phase THEN the agent SHALL enter FIGHT mode and design tactical plans
14. WHEN in INTEGRATE phase THEN the agent SHALL choose appropriate tactics from its strategic playbook
15. WHEN INTEGRATE completes THEN it SHALL output a concrete, detailed action plan for the next EMERGE phase

### Requirement 3: Initial Perception & Assessment System

**User Story:** As a Level 0 agent, I want to quickly assess and triage user input, so that I can provide immediate responses for simple tasks and properly analyze complex requests.

#### Acceptance Criteria

1. WHEN new user input requires intelligent response THEN it SHALL pass through the sequential IPB process in the Level 0 agent
2. WHEN IPB starts THEN it SHALL perform Initial Triage using a fast, resource-efficient LLM call (e.g., Gemini Flash, Groq)
3. WHEN performing Initial Triage THEN the system SHALL attempt to identify if the task is trivial and can be solved directly
4. IF the task is trivial THEN the system SHALL generate an immediate response and exit the process
5. IF the task is not trivial THEN the system SHALL return a complexity assessment (numerical value) and initial emotional reading
6. WHEN Step 1 indicates deep analysis is needed THEN the Psycho-linguistic Analysis Engine (PLAE) SHALL be activated
7. WHEN PLAE activates THEN it SHALL make three simultaneous, asynchronous calls to separate low-latency LLM endpoints
8. WHEN PLAE runs THEN each endpoint SHALL have a unique system prompt specialized for one of three drives:
   - FIGHT analyzer
   - FLIGHT analyzer  
   - FIXES & FIXATION analyzer
9. WHEN PLAE completes THEN a non-LLM function SHALL synthesize results into a Final_User_State vector
10. WHEN synthesis completes THEN the Final_User_State and complexity assessment SHALL be sent to the Roundabout loop and Resource Governor

### Requirement 4: Relational Delta & Communication Strategy

**User Story:** As a Conscious Agent, I want to calculate and respond to the emotional distance between myself and the user, so that I can communicate empathetically and build rapport.

#### Acceptance Criteria

1. WHEN the Level 0 agent starts its strategic Roundabout loop THEN it SHALL calculate the Relational_Delta as the first step
2. WHEN calculating Relational_Delta THEN it SHALL use the User_State vector from IPB and the current internal Agent_State
3. WHEN calculating Relational_Delta THEN it SHALL perform a mathematical comparison (e.g., cosine similarity) to quantify synchronicity or asynchronicity
4. WHEN communicating THEN the primary goal SHALL be to minimize asynchronous delta (misunderstanding, conflict)
5. WHEN communicating THEN the system SHALL maintain or strengthen synchronous delta (harmony, empathy)
6. WHEN the Conscious role communicates THEN it SHALL follow the "Mirror & Harmonize" two-step strategy
7. WHEN mirroring THEN the initial part of the response SHALL meet the user where they are
8. WHEN mirroring THEN the agent SHALL verbally reflect and validate the perceived User_State
9. WHEN harmonizing THEN the agent SHALL guide the interaction toward a more constructive state after establishing understanding
10. WHEN harmonizing THEN the agent SHALL suggest actions that increase FIXES & FIXATION drive in both user and agent
11. WHEN a high unexpected delta is detected THEN it SHALL trigger the Coordinator agent to enter ADAPT phase immediately
12. IF Agent-FIXES is high but User-FIGHT is also high THEN this SHALL be recognized as a "Misunderstanding" delta requiring immediate adaptation

### Requirement 5: Agent Cloning Governance & Strategic Playbook

**User Story:** As a parent agent, I want to create and manage child agents with proper governance, so that I can delegate complex tasks while maintaining control and accountability.

#### Acceptance Criteria

1. WHEN an agent creates a child agent THEN it SHALL establish a formal "cloning contract"
2. WHEN a cloning contract is created THEN the parent agent SHALL be responsible for the child agent and its final reports
3. WHEN cloning occurs THEN a Context Thread object SHALL be passed containing:
   - `top_level_goal` (reference to ultimate Closure goal from Level 0)
   - `parent_agent_id` (unique identifier establishing hierarchical communication)
   - `task_definition` (exact description of specific task for child agent)
   - `configuration_profile` (complete profile specifying LLM, tools, entry_phase)
   - `memory_scope` (specific limited permissions to MemoryAssistant)
   - `resource_budget` (allocated Compute Units budget)
   - `recursion_depth` (counter incremented by 1 for each delegation level)
   - `workspace_branch` (dedicated Git branch name if relevant)
4. WHEN attempting to clone THEN the request SHALL be validated and approved by Resource Governor first
5. WHEN an agent needs to choose cloning strategy THEN it SHALL access its Strategic Playbook
6. WHEN using the Strategic Playbook THEN the agent's Cortex engine SHALL select the most appropriate strategy based on current Roundabout context
7. WHEN the Strategic Playbook is accessed THEN it SHALL include these patterns:
   - Proactive Delegation (within EMERGE): top-down planning breakdown
   - Reflective Replacement (within ADAPT): self-critical replacement request
   - Reactive Swarming (within INTEGRATE): multiple parallel instances attacking problem
   - Creative Consultation: temporary clone with different LLM configuration

### Requirement 6: Memory Management Unit (MemoryAssistant)

**User Story:** As a CognitiveAgent, I want centralized access to long-term memory with proper scoping and concurrency control, so that I can store and retrieve information safely across multiple agent instances.

#### Acceptance Criteria

1. WHEN any CognitiveAgent needs memory access THEN it SHALL use the MemoryAssistant API exclusively
2. WHEN accessing memory THEN direct database access SHALL be forbidden for all agents
3. WHEN MemoryAssistant operates THEN it SHALL manage two separate persistent data stores:
   - Graph RAG (Conscious LTM): Graph Database storing structured, explicit information about entities and relationships
   - Semantic RAG (Subconscious LTM): Vector Database storing unstructured embeddings for creative and associative search
4. WHEN a Level 0 agent needs STM context THEN MemoryAssistant SHALL provide LoadContextForSTM function
5. WHEN a Level 0 agent completes STM work THEN MemoryAssistant SHALL provide ConsolidateMemoryFromSTM function
6. WHEN ConsolidateMemoryFromSTM runs THEN it SHALL safely and transactionally extract and integrate new learnings into permanent LTM
7. WHEN any agent calls MemoryAssistant THEN the call SHALL include the agent's memory_scope from its Context Thread
8. WHEN processing requests THEN MemoryAssistant SHALL strictly filter search results and validate write operations against the provided scope
9. WHEN handling concurrent requests THEN MemoryAssistant SHALL use ACID-compatible database transactions for all Graph RAG write operations
10. WHEN implementing concurrency control THEN MemoryAssistant SHALL use Optimistic Concurrency Control (OCC) strategy
11. WHEN a ConflictError occurs THEN the calling agent SHALL handle it in its ADAPT phase

### Requirement 7: Resource Governor

**User Story:** As a system administrator, I want centralized resource management and quota enforcement, so that the system remains stable and costs are controlled across all users and agent instances.

#### Acceptance Criteria

1. WHEN the system operates THEN Resource Governor SHALL be implemented as a central, system-wide service
2. WHEN any resource-intensive action is requested THEN it SHALL require approval from Resource Governor first
3. WHEN Resource Governor evaluates requests THEN it SHALL cover:
   - Agent cloning operations
   - Calls to expensive, high-performance LLMs (Cortex mode)
   - External API calls
4. WHEN enforcing quotas THEN Resource Governor SHALL track and limit in real-time:
   - LLM API Rate Limits (RPM)
   - Asset Storage (storage space)
   - Compute Units (daily budget for autonomous work)
   - External API Calls
5. WHEN protecting the platform THEN Resource Governor SHALL maintain global safety limits:
   - Max Recursion Depth (e.g., 7 levels) for cloning attempts
   - Max Active Agents (e.g., 20) per individual user
6. WHEN monitoring agent behavior THEN Resource Governor SHALL implement circuit breaker functionality
7. WHEN error rate threshold is exceeded THEN Resource Governor SHALL temporarily freeze the agent branch and flag for Coordinator review
8. WHEN cost spike is detected THEN Resource Governor SHALL act as automatic safety and pause the agent
9. WHEN managing system tempo THEN Resource Governor SHALL set and communicate overall system tempo based on:
   - User activity assessment
   - Time of day
   - Global resource load
10. WHEN setting system tempo THEN the defined modes SHALL be: High-Performance, Low-Intensity, and Sleep

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
#
## Additional Requirements (To Be Converted)

The following SEP sections contain additional requirements that need to be converted to the proper user story format:

- SEP-108: User & Relationship Data Models
- SEP-109: Project, Asset & Versioning Data Models (Git-based)  
- SEP-110: Operational & Memory Policies
- SEP-111: The Personal Chronicler Application
- SEP-112: The Hierarchical TDD Process
- SEP-113: The WYSIWYG-JSON Editor

These sections contain detailed technical specifications that should be transformed into user stories with EARS format acceptance criteria following the same pattern as the requirements above.