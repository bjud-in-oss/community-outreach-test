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
- `scripts/verify-and-fix-v2.js` - **REKOMMENDERAT** - Validering med smart auto-fix
- `scripts/smart-file-rename.js` - Intelligent namnändring med referensuppdatering
- `scripts/batch-filename-correction.js` - Batch-korrigering av alla filer
- `scripts/verify-v2-format.js` - Enkel verifiering av format-compliance

### **Rekommenderat Workflow:**
```bash
# 1. Validera och fixa automatiskt
node scripts/verify-and-fix-v2.js --auto-fix

# 2. För manuell namnändring av specifika filer
node scripts/smart-file-rename.js [gammal-fil] [nytt-namn]

# 3. För enkel validering utan ändringar
node scripts/verify-and-fix-v2.js
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

## 🛡️ AUTOMATISKA KONTROLLER

### **Format Validation:**
- **Trigger**: När .md filer sparas
- **Action**: Kör format validation
- **Fallback**: Automatisk korrigering om möjligt

### **Pre-commit Hooks:**
```bash
#!/bin/bash
# Format validation
node scripts/verify-v2-format.js --quiet || exit 1

# Senior-friendly language check
node scripts/check-senior-language.js --quiet || exit 1

# Secrets scanning
git diff --cached --name-only | xargs grep -l "ghp_\|sk-\|pk_" && exit 1
```

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