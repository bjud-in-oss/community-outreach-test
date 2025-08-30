# 📝 File Creation Guide - Filskapning & V2 Format

## 🎯 FILSKAPNING WORKFLOW

### **INNAN DU SKAPAR EN NY FIL:**
1. **Konsultera index-allokering** - Hitta rätt serie och nästa lediga index
2. **Identifiera concern type** - Same concern → Merge, Separate concern → Create new
3. **Följ filnamnsformat** - `[INDEX]_[EMOJI][STATUS]_[NAMN]_[DATUM]_[RELATIONER].md`
4. **Uppdatera index-allokering** - Lägg till nya filen och uppdatera nästa index

## 📝 FILNAMNSFORMAT SPECIFIKATION

### **Format:** `[INDEX]_[EMOJI][STATUS]_[NAMN]_[DATUM]_[RELATIONER].md`

### **Status System:**
- **1🟢** = AKTIV (används aktivt nu)
- **2🟡** = SKAPAS (under utveckling)
- **3🔵** = REFERENS (bakgrund & analys)
- **4⚫** = ARKIV (historisk referens)

### **Emoji Kategorier:**
```
🎯=Master Plan | 📋=Planering | 🤖=Agent | 🎛️=Senior Cockpit | 🧪=Testing
🌉=Communication Bridge | ⚙️=Core Agent | 🎭=Conscious Agent | 🔧=Infrastructure
🧠=Memory | 🏛️=Church Tech | 🌍=Translation | 👨‍👩‍👧‍👦=Family History | 📊=Tools & Analysis
🎨=UI & Design | 💝=Empathy | 👥=User Analysis | 💡=Concepts | 📝=Context | 🗑️=Deprecated
```

### **Standard Header Template:**
```markdown
# [EMOJI] [TITEL] - [BESKRIVNING]

**Datum:** 2025-08-12  
**Status:** [STATUS] [BESKRIVNING]  
**Syfte:** [VAD DOKUMENTET GÖR]  
**Relaterat:** [RELATERADE DOKUMENT]

## 🎯 [HUVUDINNEHÅLL]
```

## 🤖 AUTOMATISK INFERENS

### **Emoji-Inferens från Filnamn:**
- **master, integration** → 🎯 | **senior, cockpit** → 🎛️ | **agent** → 🤖
- **test** → 🧪 | **bridge, communication** → 🌉 | **setup, infrastructure** → 🔧
- **analysis, tools** → 📊 | **plan, action** → 📋 | **church** → 🏛️
- **translation** → 🌍 | **family** → 👨‍👩‍👧‍👦 | **ui, design** → 🎨
- **memory, context** → 🧠 | **archive, deprecated** → 🗑️

### **Status-Inferens från Innehåll:**
- **"AKTIV", "används", "current"** → 1🟢
- **"SKAPAS", "under utveckling", "WIP"** → 2🟡
- **"REFERENS", "analys", "bakgrund"** → 3🔵
- **"ARKIV", "deprecated", "V1", "V2", "V3"** → 4⚫

## 🔧 AUTOMATION SCRIPTS

### **Tillgängliga Verktyg:**
- `scripts/auto-v2-check.js` - **AUTOMATISK** - Körs av V2 Format Validator hook
- `scripts/verify-and-fix-v2.js` - **REKOMMENDERAT** - Manuell validering med smart auto-fix
- `scripts/smart-file-rename.js` - Intelligent namnändring med referensuppdatering (hook tillgänglig)
- `scripts/check-senior-language.js` - **AUTOMATISK** - Körs av Senior Language Guard hook
- `scripts/security-scan.js` - **AUTOMATISK** - Körs av Security Scanner hook
- `scripts/verify-v2-format.js` - Enkel verifiering av format-compliance

### **Rekommenderat Workflow:**
```bash
# 1. AUTOMATISKT - Kiro agent hooks kör automatiskt vid filsparning
{
  "enabled": true,
  "name": "V2 Format Validation",
  "description": "Naming validation and auto fix",
  "version": "1",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.md"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "A .md file has been edited. If it's in the root directory and not README.md, AGENTS.md, LICENSE, or CONTRIBUTING.md, then verify and fix V2 format compliance:\n\nnode scripts/verify-and-fix-v2.js --auto-fix --verbose\n\nOnly run this for documentation files that should follow V2 naming convention."
  }
}

# 2. MANUELLT - För batch-operationer eller specifika behov:
node scripts/verify-and-fix-v2.js --auto-fix    # Batch V2 fix
node scripts/smart-file-rename.js [gammal-fil] [nytt-namn]  # Intelligent rename

# 3. MANUELLA HOOKS - Tillgängliga i Kiro Agent Hooks panel:
# - Smart File Rename Hook
# - V2 Format Validation Hook (manual trigger)
```

## 📁 INDEX-ALLOKERING FÖR NYA FILER

### **Nästa Lediga Index:**
```
Core System (01-09):        Nästa = 091
Implementation (050-099):   Nästa = 091 (efter 090_STEERING_OPTIMIZATION)
Deep Dive (100-199):        Nästa = 114
Technical (200-299):        Nästa = 243
Archive (900-999):          Nästa = 967
```

### **Serie-Kategorier:**
- **01-09**: Master Plan, Navigation, Core System
- **050-099**: Implementation, Planning, Progress
- **100-199**: Deep Dive Analysis per komponent
- **200-299**: Technical Analysis, Church Tech, Translation
- **900-999**: Archive, Deprecated, V-series

## 🔗 LÄNKAD DOKUMENTARKITEKTUR

### **Dokumenthierarki:**
```
MASTER_INTEGRATION_PLAN.md (NAV/HUB)
├── DOCUMENT_INDEX.md (Status och översikt)
├── *_DEEP_DIVE.md (Djupanalys per komponent)
├── *_ANALYSIS.md (Specialistkunskap och research)
└── .kiro/steering/ (Denna mapp - Överlevnad efter omstart)
```

## 🛡️ AUTOMATISKA KONTROLLER (KIRO AGENT HOOKS)

### **Aktiva Agent Hooks i Kiro:**

#### **1. V2 Format Validator** ✅
- **Trigger**: När .md filer sparas (exkluderar README.md, CONTRIBUTING.md, AGENTS.md)
- **Script**: `scripts/auto-v2-check.js`
- **Action**: Automatisk V2 format validering och korrigering
- **Status**: Aktiverad med auto-approve

#### **2. Senior Language Guard** ✅
- **Trigger**: När kod-filer sparas (src/**/*.{tsx,jsx,ts,js})
- **Script**: `scripts/check-senior-language.js`
- **Action**: Kontrollerar teknisk jargong och föreslår senior-vänliga alternativ
- **Status**: Aktiverad, kräver godkännande

#### **3. Security Scanner** ✅
- **Trigger**: När filer sparas (js,ts,json,md,env)
- **Script**: `scripts/security-scan.js`
- **Action**: Skannar efter hårdkodade secrets och säkerhetsproblem
- **Status**: Aktiverad, kräver godkännande

#### **4. Smart File Rename Hook** ✅
- **Trigger**: Manuell
- **Script**: `scripts/smart-file-rename.js`
- **Action**: Intelligent filnamnändring med referensuppdatering
- **Status**: Manuell hook för specifika namnändringar

## 🚀 ANTI-AD-HOC SAFEGUARDS

### **Red Flags (STOP and Think):**
- ❌ Creating without checking index-allokering
- ❌ Similar title to existing file
- ❌ No clear separate concern
- ❌ Using wrong emoji/status

### **Green Lights (Proceed):**
- ✅ Checked index-allokering first
- ✅ Clear separate concern identified
- ✅ Proper format planned
- ✅ Relations mapped out

### **Decision Tree:**
```
New Content Needed?
├── YES → Check index-allokering
│   ├── Similar file exists?
│   │   ├── YES → Same concern?
│   │   │   ├── YES → Merge with existing
│   │   │   └── NO → Create new (separate concern)
│   │   └── NO → Create new file
│   └── Follow format
└── NO → Use existing file
```

**Använd denna guide för konsekvent och effektiv filskapning!** 🎯