# 🏗️ Uppdaterad Mappstruktur Analys - Fas-Baserad + Hierarkisk

**Datum:** 2025-08-14  
**Status:** 1🟢 AKTIV - Integrerar onboarding, fas-hantering och hierarkiska tasks  
**Syfte:** Uppdatera mappstruktur baserat på nya insikter om onboarding och task-hierarki  
**Relaterat:** 113_🏗️1🟢_DUBBEL_MAPPSTRUKTUR_ANALYS_250814_112.md, gratis-senior-onboarding spec

## 🎯 **KRITISKA INSIKTER FRÅN ANALYS**

### **✅ Onboarding Kan Inte Vara Helt Dolt**
Du har helt rätt - onboarding är den enda tekniska aspekten som seniorer måste se. Men vi kan återanvända samma onboarding-system för alla tekniska val.

**Dokumenterat i:** `.kiro/specs/gratis-senior-onboarding/design.md`
- **Progressive Enhancement**: CRAWL → WALK → RUN → FLY
- **Family-Centered**: Vän/familj hjälper med tekniska steg
- **Zero-Installation**: Börjar med enkel webbsida

### **✅ Hierarkiska Tasks/Underprojekt**
Varje projekt kan delas upp i mindre tasks med samma rika struktur som huvudprojektet.

**Dokumenterat i:** `.kiro/specs/kollaborativ-senior-utveckling/tasks.md`
- **Task 3: Intelligent Arbetsuppdelning**
- **Subtask-struktur** med egen requirements/design/tasks

### **✅ Delegering till Jules**
**Dokumenterat i:** `docs/research/specialist-tool/jules-complete-documentation.md`
- Jules arbetar asynkront - senior kan gå iväg
- "Submit a task, go do something else, return when it's done"
- Perfekt för delegering av tekniska subtasks

## 🗂️ **UPPDATERAD MAPPSTRUKTUR MED FAS-HANTERING**

### **Fas-Integrerad Struktur (Behåller Dokumentation):**
```
community-outreach-platform/
├── medveten-agent/          # 🎭 SENIOR-SYNLIG STRUKTUR
│   ├── projekt/
│   │   └── kyrktjänst-översättning/
│   │       ├── beskrivning.md           # Senior-vänlig beskrivning
│   │       ├── fas-status.md            # CRAWL/WALK/RUN/FLY status
│   │       ├── tidsplan.md              # Utvecklas genom faserna
│   │       ├── kostnad.md               # Uppdateras per fas
│   │       ├── onboarding/              # TEKNISK MEN NÖDVÄNDIG
│   │       │   ├── crawl-guide.md       # "Öppna denna länk"
│   │       │   ├── walk-guide.md        # "Dra denna till bokmärken"
│   │       │   └── family-help.md       # Guide för familjemedlemmar
│   │       └── tasks/                   # HIERARKISKA SUBTASKS
│   │           ├── grundsystem/
│   │           │   ├── beskrivning.md
│   │           │   ├── fas-status.md
│   │           │   └── delegering.md    # "Jules arbetar på detta"
│   │           ├── språkstöd/
│   │           └── gränssnitt/
│   ├── planer/
│   │   ├── aktuell-fas.md               # Vilken fas vi är i nu
│   │   ├── nästa-fas.md                 # Vad som kommer härnäst
│   │   └── fas-progression.md           # CRAWL → WALK → RUN → FLY
│   └── framsteg/
│       ├── slutförda-tasks.md           # Hierarkisk vy av klara tasks
│       ├── pågående-delegering.md       # Vad Jules arbetar på
│       └── nästa-milstones.md           # Kommande fas-övergångar
├── omedveten-agent/         # ⚙️ TEKNISK STRUKTUR (DOLD)
│   ├── core-system/
│   │   └── technical-specs/
│   │       └── church-translation/
│   │           ├── fas-0-crawl/
│   │           │   ├── requirements.md  # EARS-genererat för CRAWL
│   │           │   ├── design.md        # Enkel web-portal
│   │           │   └── tasks.md         # Grundläggande funktionalitet
│   │           ├── fas-1-walk/
│   │           │   ├── requirements.md  # Utökade krav för WALK
│   │           │   ├── design.md        # Bookmarklet + förbättring
│   │           │   └── tasks.md         # Förbättrad funktionalitet
│   │           ├── fas-2-run/
│   │           │   └── [Komplett browser extension]
│   │           ├── fas-3-fly/
│   │           │   └── [Full automation suite]
│   │           └── hierarchical-tasks/  # SUBTASK-STRUKTUR
│   │               ├── grundsystem/
│   │               │   ├── requirements.md
│   │               │   ├── design.md
│   │               │   ├── tasks.md
│   │               │   └── jules-delegation.md
│   │               ├── språkstöd/
│   │               │   └── [Samma struktur]
│   │               └── gränssnitt/
│   │                   └── [Samma struktur]
│   ├── generated-code/
│   │   └── church-translation-app/
│   │       ├── fas-0-crawl/             # Enkel webbsida
│   │       ├── fas-1-walk/              # Bookmarklet
│   │       ├── fas-2-run/               # Browser extension
│   │       └── fas-3-fly/               # Full automation
│   └── jules-integration/
│       ├── delegated-tasks/             # Tasks som Jules arbetar på
│       ├── completed-tasks/             # Klara Jules-tasks
│       └── task-templates/              # Mallar för Jules-delegering
├── ears-system/             # 🧠 ÖVERSÄTTNINGSLAGER
│   ├── fas-aware-processing/            # Förstår vilken fas vi är i
│   ├── hierarchical-analysis/           # Kan dela upp i subtasks
│   └── onboarding-integration/          # Hanterar tekniska onboarding-steg
└── communication-bridge/    # 🌉 SÄKER KOMMUNIKATION
    ├── fas-translators/                 # Översätter mellan faser
    ├── hierarchy-managers/              # Hanterar task-hierarkier
    └── onboarding-filters/              # Gör onboarding senior-vänligt
```

## 🧠 **EARS-GENERERING MED FAS-MEDVETENHET**

### **Hur EARS Hanterar Fas-Baserad Utveckling:**

```typescript
const fasAwareEARS = {
  analyzeInput(seniorRequest: string, currentPhase: Phase) {
    // Förstår vilken fas vi är i och anpassar krav därefter
    const requirements = this.generateRequirements(seniorRequest);
    const phaseSpecificRequirements = this.adaptToPhase(requirements, currentPhase);
    
    return {
      crawlRequirements: "Enkel webbsida som fungerar överallt",
      walkRequirements: "Bookmarklet för förbättrad funktionalitet", 
      runRequirements: "Browser extension för full automation",
      flyRequirements: "AI-powered advanced features"
    };
  },
  
  generateHierarchicalTasks(requirements: Requirements) {
    // Delar automatiskt upp i subtasks med egen struktur
    return {
      grundsystem: {
        description: "Grundläggande översättningsfunktion",
        delegateToJules: true,
        requirements: "...",
        design: "...",
        tasks: "..."
      },
      språkstöd: {
        description: "Stöd för arabiska och somaliska",
        delegateToJules: true,
        // ... samma struktur
      },
      gränssnitt: {
        description: "Senior-vänligt gränssnitt",
        delegateToJules: false, // Kräver senior-input
        // ... samma struktur
      }
    };
  }
};
```

### **Onboarding-Integration:**

```typescript
const onboardingAwareEARS = {
  generateOnboardingSteps(technicalRequirements: TechReq) {
    // Skapar senior-vänliga onboarding-steg
    return {
      crawlOnboarding: {
        seniorSteps: [
          "1. Öppna denna länk: hjälp.kyrka.se",
          "2. Följ instruktionerna på skärmen",
          "3. Ring Gunnar om något känns krångligt"
        ],
        familySteps: [
          "1. Hjälp senior öppna länken",
          "2. Förklara vad som händer på skärmen",
          "3. Var tillgänglig för frågor"
        ]
      },
      walkOnboarding: {
        seniorSteps: [
          "1. Dra den blå knappen till dina bokmärken",
          "2. Klicka på bokmärket när du behöver hjälp",
          "3. Systemet kommer guida dig"
        ],
        familySteps: [
          "1. Visa hur man drar till bokmärken",
          "2. Testa tillsammans första gången",
          "3. Förklara att det fungerar på alla webbsidor"
        ]
      }
    };
  }
};
```

## 🎯 **2D-IDÉN I RELATION TILL FAS-HANTERING**

### **2D är EXAKT i linje med vad vi vill åstadkomma:**

```
2D-Grid med Fas-Integration:

        Tidigare  →  →  →  →  →  Senare
Vagt        💭    📝    🎨    🔨    🧪    ✅
  ↓       CRAWL  CRAWL  WALK   RUN   FLY   FLY
  ↓       
  ↓       
Tydligt     💡    📋    🎯    🚀    🔬    🎉
          CRAWL  WALK   RUN   RUN   FLY   FLY
```

**Fördelar:**
- **Tid-axeln** = Fas-progression (CRAWL → WALK → RUN → FLY)
- **Tydlighet-axeln** = Krav-mognad (Vagt → Kristallklart)
- **Varje cell** = Specifik fas + tydlighetsnivå
- **Naturlig progression** = Både i tid och tydlighet

## 📱 **UPPDATERAT ANVÄNDARGRÄNSSNITT**

### **Fas-Medveten 2-Panel Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│     🧠 Fas 1 (WALK) - Kyrktjänst Översättning              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────┬───────────────────────────────────────┐
│   🎭 MEDVETEN PLAN  │        💬 EARS-DRIVEN CHAT           │
│   (Fas-Medveten)    │        (Hierarkisk Task-Skapning)    │
│                     │                                       │
│ 📋 Vad Vi Bygger    │ Senior: "Jag vill översätta..."     │
│ 🎯 Aktuell Fas:     │ EARS: Skapar hierarkiska tasks...   │
│     WALK (2/4)      │ AI: "Jag delar upp i 3 delar:"     │
│ ⏰ Fas-Progression  │   1. Grundsystem (Jules arbetar)    │
│     ✅ CRAWL        │   2. Språkstöd (Jules arbetar)      │
│     🔄 WALK         │   3. Gränssnitt (behöver din hjälp) │
│     ⏳ RUN          │                                       │
│     ⏳ FLY          │ Senior: "Låter bra!"                │
│                     │ AI: "Jules börjar med grundsystem"   │
│ 🔧 Onboarding:     │                                       │
│ "Dra blå knapp till │ [Skriv meddelande...] [Skicka]      │
│  dina bokmärken"    │                                       │
│                     │                                       │
│ 👥 Delegering:     │                                       │
│ Jules arbetar på:   │                                       │
│ - Grundsystem ✅    │                                       │
│ - Språkstöd 🔄      │                                       │
│                     │                                       │
│ [Testa Nuvarande]   │                                       │
└─────────────────────┴───────────────────────────────────────┘
```

## 🚀 **FAS 0 - VAD ÅTERSTÅR ATT GÖRA**

### **Baserat på Master Integration Plan:**

#### **✅ Slutfört i Fas 0:**
- Grundläggande mappstruktur
- EARS-koncept och demo
- 2D-navigation analys
- Dubbel medvetenhet arkitektur

#### **🔄 Återstår i Fas 0:**

1. **Repository Setup & Migration**
   - Skapa ny GitHub repository med fas-baserad struktur
   - Migrera befintliga komponenter till rätt mappar
   - Sätta upp grundläggande CI/CD

2. **EARS-System Implementation**
   - LLM-integration (Groq + Gemini)
   - Fas-medveten krav-generering
   - Hierarkisk task-uppdelning
   - Onboarding-steg generering

3. **Jules Integration Foundation**
   - Slutföra `.kiro/specs/fas-0-jules-tool-integration/`
   - Skapa delegering-system för subtasks
   - Asynkron task-hantering
   - Progress-rapportering till medveten agent

4. **Communication Bridge**
   - Guardrails för informationsseparation
   - Fas-medvetna översättare
   - Onboarding-filter (gör tekniskt senior-vänligt)
   - Hierarki-hanterare för subtasks

5. **Gratis Senior Onboarding**
   - CRAWL-fas web-portal
   - Family-helper guides
   - Progressive enhancement setup
   - Zero-installation entry point

6. **Grundläggande UI**
   - 2-panel layout med fas-medvetenhet
   - EARS-driven chat med hierarkisk task-skapning
   - Onboarding-integration
   - Jules delegering-interface

### **🎯 Prioriterad Ordning:**
1. **Repository & EARS** (Vecka 1)
2. **Jules Integration** (Vecka 2) 
3. **Communication Bridge** (Vecka 3)
4. **Onboarding System** (Vecka 4)
5. **UI Integration** (Vecka 5)
6. **End-to-End Testing** (Vecka 6)

**Resultatet:** Ett komplett Fas 0-system som kan hantera hierarkiska tasks, delegera till Jules, och guida seniorer genom teknisk onboarding på ett vänligt sätt.