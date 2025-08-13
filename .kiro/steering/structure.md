# Project Structure - Dubbelt Medvetandesystem Arkitektur

## Organization Principles (Master Plan 2.0)
- **Dubbel medvetenhet**: Tydlig separation mellan medveten/kärn-agent komponenter
- **Fasbaserad utveckling**: Struktur som stödjer "Crawl, Walk, Run, Fly" metodologi
- **Strategisk komponentgruppering**: Organisera enligt komponentanalys (🟡🔵🔴)
- **Senior-centrerad design**: Alla beslut filtreras genom senior-användarens perspektiv

## 🎯 FILNAMNSYSTEM V2 (Självförbättrande)

### **Format:** `[INDEX]_[EMOJI][STATUS]_[NAMN]_[DATUM]_[RELATIONER].md`

### **Status System:**
- **1🟢** = AKTIV (används aktivt nu)
- **2🟡** = SKAPAS (under utveckling)  
- **3🔵** = REFERENS (bakgrund & analys)
- **4⚫** = ARKIV (historisk referens)

### **Emoji Kategorier:**
- **🎯** = Master Plan & Navigation | **📋** = Planering & Actions | **🤖** = Agent Configuration
- **🎛️** = Senior Cockpit | **🧪** = Testing & Validation | **🌉** = Communication Bridge  
- **⚙️** = Core Agent & Tools | **🎭** = Conscious Agent | **🔧** = Infrastructure & Setup
- **🧠** = Memory & Context | **🏛️** = Church Technology | **🌍** = Translation Systems
- **👨‍👩‍👧‍👦** = Family History | **📊** = Tools & Analysis | **🎨** = UI & Design
- **💝** = Empathy & Senior | **👥** = User Analysis | **💡** = Concepts & Ideas
- **📝** = Context & History | **🗑️** = Deprecated/Trash

### **Index-Allokering:**
```
Core System (01-09):        Nästa = 007
Implementation (050-099):   Nästa = 087 (efter 086_SYSTEMATIC_APPROACH_SUCCESS)
Deep Dive (100-199):        Nästa = 114
Technical (200-299):        Nästa = 243
Archive (900-999):          Nästa = 967
```

### **Filskapning Workflow:**
1. **Konsultera structure.md** - Hitta rätt serie och nästa lediga index
2. **Använd file-creation-checklist.md** - Systematisk relation-analys
3. **Följ filnamnsformat** - Använd korrekt emoji och sifferstatus
4. **Uppdatera relationer** - Länka till relaterade dokument i filnamnet
5. **Uppdatera structure.md** - Lägg till nya filen i rätt kategori

**ANTI-AD-HOC:** Använd alltid `.kiro/steering/file-creation-checklist.md` för nya filer!

### **Varför V2 Fungerar:**
- **Siffror + emoji** = Tydligare än bara emoji
- **Automatisk sortering** = Fas och prioritet synlig
- **Självförbättrande** = Systemet analyserar och förbättrar sig själv
- **Pragmatisk** = Fokus på funktion över perfektionism

## 🔗 LÄNKAD DOKUMENTARKITEKTUR (KRITISK FÖR OMSTARTER)
**VIKTIGT**: Vi använder en länkad dokumentarkitektur istället för Single Source of Truth:

### **Dokumenthierarki:**
```
MASTER_INTEGRATION_PLAN.md (NAV/HUB)
├── DOCUMENT_INDEX.md (Status och översikt)
├── *_DEEP_DIVE.md (Djupanalys per komponent)
├── *_ANALYSIS.md (Specialistkunskap och research)
└── .kiro/steering/ (Denna mapp - Överlevnad efter omstart)
```

### **Dual Kiro Session Säkerhet:**
- **CHAT-SESSION**: Endast *.md filer (dokumentation)
- **SPECS-SESSION**: Endast *.ts, *.js, *.py filer (kod)
- **ALDRIG samma fil i båda sessionerna**
- **Kontrollera DOCUMENT_INDEX.md** för aktuell status

### **Efter Omstart - Kontrollera:**
1. **FÖRSTA STEGET:** Läs 008_🔄🟢_STRATEGIC_CLEAN_START_PLAN_240808_01.md för vad som ska göras först
2. Läs MASTER_INTEGRATION_PLAN.md för aktuell status
3. Kontrollera DOCUMENT_INDEX.md för dokumentstatus
4. Följ länkad arkitektur enligt denna steering-fil
5. Använd dual session säkerhetsregler

### **RAW Documentation Import System:**
- **docs/research/specialist-tool/jules-complete-documentation.md** - Komplett Jules dokumentation (manuellt importerad 11 aug 2025)
- **docs/research/development-tools/kiro-complete-documentation.md** - Komplett Kiro dokumentation (manuellt importerad 11 aug 2025)
- **docs/research/llm-provider/groq-api-reference.md** - RAW Groq API referens (MCP fetch 11 aug 2025)
- **Andra RAW imports** - Markerade med importdatum och källa för att undvika förvirring med träningsdata

## Directory Layout (Enligt Master Plan 2.0)

### **📚 RESEARCH DOCUMENTATION REFERENCE**
```
docs/research/ innehåller djup teknisk dokumentation:
├── agent-framework/     # LangChain, LlamaIndex guides
├── gemini-cli/         # Gemini CLI dokumentation  
├── infrastructure/     # Vercel, Supabase setup
├── mcp-servers/        # MCP server konfiguration
├── memory-framework/   # Minnesystem implementation
├── specialist-tool/    # Jules, Smolagents research
└── ui-framework/       # MCP-UI, senior design

Använd: #docs/research/[kategori] för att ladda specifik dokumentation
Exempel: #docs/research/gemini-cli för Gemini CLI guides
```

## Directory Layout (Enligt Master Plan 2.0)

```
community-outreach/
├── 📋 INDEXERADE DOKUMENT (Root Level)
│   ├── 01_🎯_MASTER_INTEGRATION_PLAN.md        # NAV/HUB - Single source of truth
│   ├── 03_📋_NEXT_IMMEDIATE_ACTIONS.md         # Aktuella åtgärder
│   ├── 04_🤖_AGENTS.md                         # Agent konfiguration
│   ├── 05_📚_DOCUMENTATION_RESEARCH_PLAN.md    # Dokumentationsstrategi
│   ├── 06_⚙️_SETUP_INSTRUCTIONS.md             # Setup guide
│   ├── 08_🔄_STRATEGIC_CLEAN_START_PLAN.md     # Clean start och nukade PRs återställning
│   ├── 09_🔍_STRATEGIC_REPOSITORY_ANALYSIS.md  # Inventering av befintliga resurser
│   ├── 10_🎭_CONSCIOUS_AGENT_DEEP_DIVE.md      # [SKAPAS] Medvetna Rondellen
│   ├── 11_⚙️_CORE_AGENT_DEEP_DIVE.md           # [SKAPAS] Kärn-agent teknisk
│   ├── 12_🌉_COMMUNICATION_BRIDGE_DEEP_DIVE.md # [SKAPAS] Integration guardrails
│   ├── 20_🏛️_CHURCH_TECHNOLOGY_ANALYSIS.md     # PowerShell, Tesira, Zoom
│   ├── 21_🌍_REAL_TIME_TRANSLATION_ANALYSIS.md # Google Cloud STT + DeepL
│   ├── 22_👨‍👩‍👧‍👦_FAMILY_HISTORY_INTEGRATION_ANALYSIS.md # Python → Web API
│   ├── 23_📊_COMPREHENSIVE_TOOLS_ANALYSIS.md   # 20+ verktyg för multi-platform
│   ├── 30_🔧_KIRO_DEVELOPMENT_STRATEGY.md      # Utvecklingsverktyg vs slutprodukt
│   ├── 31_🧠_DUAL_CONSCIOUSNESS_ARCHITECTURE.md # Säker dual sessions workflow
│   ├── 32_🎯_PHASE_PLANNING_FRAMEWORK.md       # Fasbaserad utveckling
│   ├── 40_👥_ADVANCED_USER_ANALYSIS.md         # PWA och multi-platform för seniorer
│   ├── 50_🌉_COMPLETE_INTEGRATION_PLAN.md      # Komplett integrationsplan
│   ├── 51_💡_INITIAL_CONCEPT_DOCUMENTATION.md  # Ursprunglig idémapping
│   ├── 80_📝_KONTEXT_ORIGINAL.md               # Ursprunglig kontext
│   ├── 81_📝_KONTEXT_UPDATED.md                # Uppdaterad kontext
│   └── 90_🗑️_MASTER_PLAN_2_PROGRESS.md         # [ARKIV] Föråldrat progress
├── docs/
│   ├── research/              # Strategisk dokumentationsanalys (→ 05_📚)
│   │   ├── agent-framework/   # LangChain, LlamaIndex dokumentation (→ 11_⚙️)
│   │   ├── gemini-cli-core/   # Gemini CLI kärnfunktionalitet (→ 11_⚙️)
│   │   ├── infrastructure/    # Vercel, Supabase guides (→ 06_⚙️)
│   │   ├── mcp-servers/       # MCP server konfiguration (→ 11_⚙️, 12_🌉)
│   │   ├── memory-framework/  # Minnesystem implementation (→ 11_⚙️, 31_🧠)
│   │   ├── specialist-tool/   # Jules, Smolagents research (→ 11_⚙️, 04_🤖)
│   │   ├── ui-framework/      # MCP-UI, senior design (→ 40_👥, 41_🎨)
│   │   ├── analysis-report.md # Forskningsanalys (→ 05_📚)
│   │   └── documentation-loader.js # Dokumentationsladdare (→ 05_📚, 06_⚙️)
│   ├── architecture/          # Dubbelt medvetandesystem design
│   │   ├── dual-consciousness-specs/ # (→ 31_🧠, 10_🎭, 11_⚙️)
│   │   ├── phase-requirements/       # (→ 32_🎯, 03_📋)
│   │   └── integration-patterns/     # (→ 12_🌉, 50_🌉)
│   └── user-guides/           # Senior-vänlig dokumentation (→ 40_👥)
├── src/
│   ├── conscious-agent/       # 🎭 Medvetna Rondellen (→ 10_🎭)
│   │   ├── empathy-engine/        # Groq-baserad emotionell motor (→ 42_💝)
│   │   ├── language-processor/    # Senior-språk ↔ teknisk översättning (→ 10_🎭)
│   │   ├── ui-components/         # MCP-UI komponenter för seniorer (→ 41_🎨)
│   │   └── communication-memory/  # Lär sig varje seniors stil (→ 10_🎭)
│   ├── core-agent/            # ⚙️ Kärn-agenten (→ 11_⚙️)
│   │   ├── langchain-orchestration/  # 🟡 Agent chains och reasoning (→ 11_⚙️)
│   │   ├── llamaindex-memory/        # 🟡 RAG och minneshantering (→ 11_⚙️)
│   │   ├── tools/                    # Verktygsintegration (→ 23_📊)
│   │   │   ├── jules-tool/           # 🔴 Kontrollerad Jules integration (→ 04_🤖)
│   │   │   ├── smolagents-tool/      # 🔴 Alternativ kodgenerator (→ 23_📊)
│   │   │   ├── web-search/           # Grundläggande verktyg (→ 23_📊)
│   │   │   └── file-operations/      # Filhantering (→ 23_📊)
│   │   └── decision-engine/          # AGERA/ADAPTERA/PROCESSA logik (→ 11_⚙️)
│   ├── communication-bridge/  # 🌉 ReAct Chain of Thought (→ 12_🌉)
│   │   ├── guardrails/           # Informationsseparation & säkerhet (→ 12_🌉)
│   │   ├── thought-memory/       # Strukturerad tanke/minne överföring (→ 12_🌉)
│   │   └── translation-layer/    # Teknisk ↔ senior-vänlig översättning (→ 12_🌉)
│   ├── infrastructure/        # 🔵 Vercel + Supabase Integration (→ 06_⚙️)
│   │   ├── vercel-functions/     # Serverless backend API (→ 06_⚙️)
│   │   ├── supabase-client/      # Databas, auth, fillagring (→ 06_⚙️)
│   │   └── deployment-config/    # CI/CD och hosting konfiguration (→ 06_⚙️)
│   └── shared/                # Gemensamma utilities och typer
│       ├── types/                # TypeScript definitioner
│       ├── constants/            # Konfiguration och konstanter
│       └── utils/                # Hjälpfunktioner
├── tests/
│   ├── conscious-agent-tests/    # Frontend och kommunikationstester (→ 10_🎭)
│   ├── core-agent-tests/         # Backend och logiktester (→ 11_⚙️)
│   ├── integration-tests/        # End-to-end systemtester (→ 12_🌉)
│   └── senior-user-tests/        # Användbarhetstester med seniorer (→ 40_👥)
├── .github/
│   └── workflows/                # GitHub Actions för stabilitet
│       ├── crawl-phase.yml       # Fas 0 deployment (→ 32_🎯)
│       ├── walk-phase.yml        # Fas 1 testing (→ 32_🎯)
│       └── continuous-integration.yml # CI/CD (→ 30_🔧)
└── .kiro/
    └── steering/                 # AI guidance med Master Plan 2.0
        ├── product.md            # Uppdaterad produktvision
        ├── structure.md          # Denna fil
        ├── tech.md               # Strategisk teknisk stack
        ├── document-index.md     # MASTER DOCUMENT INDEX (komplett översikt)
        └── kiro-reference.md     # Kiro-specifik dokumentation
```

## File Naming Conventions (Strategiska)
- **Medveten Agent**: `empathy-`, `language-`, `senior-` prefix
- **Kärn-agent**: `orchestration-`, `memory-`, `tool-` prefix  
- **Communication Bridge**: `guardrail-`, `thought-`, `translation-` prefix
- **Infrastructure**: `vercel-`, `supabase-`, `deployment-` prefix
- **Tests**: Matcha källfilsstruktur med `-test.ts` suffix

## Code Organization Principles
- **Dubbel medvetenhet**: Aldrig blanda medveten/kärn-agent kod i samma fil
- **Fasbaserad modularitet**: Kod organiserad för stegvis "Crawl→Walk→Run→Fly" utveckling
- **Strategisk komponentgruppering**: Relaterade verktyg (🟡🔵🔴) grupperade tillsammans
- **Senior-first design**: Alla API:er och interfaces designade för enkel abstraktion
- **Guardrail enforcement**: Automatiska kontroller för informationsseparation

## Integration Boundaries
- **Medveten ↔ Kärn-agent**: Endast via communication-bridge med strikta guardrails
- **Infrastructure**: Isolerad från business logic, endast via definierade interfaces
- **Tools**: Pluggable arkitektur för enkel utbyte (Jules ↔ Smolagents)
- **Memory Systems**: Separata index för medveten/kärn-agent med olika åtkomstnivåer