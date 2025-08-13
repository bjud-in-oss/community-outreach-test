# Filename Correction Steering - V2 Format Automation

## 🎯 AUTOMATISK FILNAMNSKORRIGERING

När du arbetar med filnamn, följ alltid V2-format:
**Format:** `[INDEX]_[EMOJI][STATUS]_[NAMN]_[DATUM]_[RELATIONER].md`

### Status System:
- **1🟢** = AKTIV (används aktivt nu)
- **2🟡** = SKAPAS (under utveckling)
- **3🔵** = REFERENS (bakgrund & analys)
- **4⚫** = ARKIV (historisk referens)

### Emoji Kategorier:
🎯=Master Plan | 📋=Planering | 🤖=Agent | 🎛️=Senior Cockpit | 🧪=Testing
🌉=Communication Bridge | ⚙️=Core Agent | 🎭=Conscious Agent | 🔧=Infrastructure
🧠=Memory | 🏛️=Church Tech | 🌍=Translation | 👨‍👩‍👧‍👦=Family History | 📊=Tools & Analysis
🎨=UI & Design | 💝=Empathy | 👥=User Analysis | 💡=Concepts | 📝=Context | 🗑️=Deprecated

## 🔧 AUTOMATISK KORRIGERING

### När du ser filer som INTE följer V2-format, korrigera dem:

**EXEMPEL KORRIGERINGAR:**
```
GAMLA FORMAT → NYA V2 FORMAT:
01_🎯🟢_MASTER_PLAN → 01_🎯1🟢_MASTER_PLAN
053_1_SENIOR_COCKPIT → 053_🎛️1🟢_SENIOR_COCKPIT  
220_🏛️🔵_CHURCH_TECH → 220_🏛️3🔵_CHURCH_TECH
073_4_V1_CONTEXT_BRIDGE → 073_🌉4⚫_V1_CONTEXT_BRIDGE
```

### Batch-Korrigering Process:
1. **Identifiera** alla filer som behöver korrigeras
2. **Läs innehållet** från gamla filen
3. **Skapa ny fil** med korrekt V2-format namn
4. **Kopiera innehållet** till nya filen
5. **Radera gamla filen**
6. **Uppdatera progress** i 085_FILENAME_CORRECTION_PROGRESS

### Prioritetsordning för Korrigering:
1. **Core System Files (01-09)** - Högsta prioritet
2. **Senior Cockpit Files (053-067)** - Hög prioritet
3. **Reference Files (068-082, 110-113, 130-132, 150, 220-242)** - Medium prioritet
4. **Archive Files (073-079, 965-966, 990-991)** - Låg prioritet

## 🎯 AUTOMATISK EMOJI-INFERENS

### Baserat på filnamnsinnehåll:
- **master, integration** → 🎯 (Master Plan)
- **senior, cockpit** → 🎛️ (Senior Cockpit)
- **agent** → 🤖 (Agent Configuration)
- **test** → 🧪 (Testing)
- **bridge, communication** → 🌉 (Communication Bridge)
- **setup, infrastructure** → 🔧 (Infrastructure)
- **analysis, tools** → 📊 (Tools & Analysis)
- **plan, action** → 📋 (Planering)
- **church** → 🏛️ (Church Technology)
- **translation** → 🌍 (Translation Systems)
- **family** → 👨‍👩‍👧‍👦 (Family History)
- **ui, design** → 🎨 (UI & Design)
- **memory, context** → 🧠 (Memory & Context)
- **archive, deprecated** → 🗑️ (Deprecated)

### Automatisk Status-Inferens:
- **Innehåller "AKTIV", "används", "current"** → 1🟢
- **Innehåller "SKAPAS", "under utveckling", "WIP"** → 2🟡
- **Innehåller "REFERENS", "analys", "bakgrund"** → 3🔵
- **Innehåller "ARKIV", "deprecated", "V1", "V2", "V3"** → 4⚫

## 🚀 ANVÄNDNING

### För Enskilda Filer:
När du arbetar med en fil som inte följer V2-format, korrigera den automatiskt enligt ovanstående regler.

### För Batch-Korrigering:
1. Identifiera alla filer som behöver korrigeras
2. Använd prioritetsordningen ovan
3. Korrigera systematiskt enligt process
4. Uppdatera progress-dokumentation

### Kvalitetskontroll:
- Kontrollera att alla filer följer exakt V2-format
- Verifiera att emoji och status är korrekta
- Säkerställ att relationer är uppdaterade
- Testa att alla länkar fungerar

**Använd denna steering för konsekvent V2-format i alla filnamn!** 🎯