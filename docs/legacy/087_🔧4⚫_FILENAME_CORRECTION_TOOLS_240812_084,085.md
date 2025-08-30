# 🔧 Filename Correction Tools - Automatiserad Batch-Korrigering

**Datum:** 2025-08-12  
**Status:** 1🟢 AKTIV - Skapar verktyg för effektiv batch-korrigering av filnamn  
**Syfte:** Automatisera filnamnskorrigering med Kiro Hooks och Steering integration  
**Relaterat:** 084_FILENAME_BATCH_CORRECTION, 085_FILENAME_CORRECTION_PROGRESS

## 🎯 VERKTYGSDESIGN BASERAT PÅ KIRO-DOKUMENTATION

### **Approach: Steering-Driven + Optional Hooks**

Baserat på Kiro-dokumentationen är **Steering Documents** perfekta för detta:
- **Automatisk aktivering** - Steering läses automatiskt av Kiro
- **Ingen komplexitet** - Inga hooks att konfigurera
- **Självdokumenterande** - Processen är tydligt beskriven
- **Flexibel** - Kan användas för både batch och enskilda korrigeringar

## 🔧 VERKTYG 1: STEERING-BASERAD FILNAMNSKORRIGERING

### **Skapa: `.kiro/steering/filename-correction.md`**

```markdown
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

### Automatisk Korrigering:
När du ser filer som INTE följer V2-format, korrigera dem automatiskt:

EXEMPEL KORRIGERINGAR:
- `01_🎯🟢_MASTER_PLAN` → `01_🎯1🟢_MASTER_PLAN`
- `053_1_SENIOR_COCKPIT` → `053_🎛️1🟢_SENIOR_COCKPIT`
- `220_🏛️🔵_CHURCH_TECH` → `220_🏛️3🔵_CHURCH_TECH`

### Batch-Korrigering Process:
1. Identifiera alla filer som behöver korrigeras
2. Läs innehållet från gamla filen
3. Skapa ny fil med korrekt V2-format namn
4. Kopiera innehållet till nya filen
5. Radera gamla filen
6. Uppdatera progress i 085_FILENAME_CORRECTION_PROGRESS
```

## 🔧 VERKTYG 2: KIRO HOOK FÖR AUTOMATISERING (OPTIONAL)

### **Hook Configuration: `.kiro/hooks/filename-correction.json`**

```json
{
  "name": "Filename V2 Format Correction",
  "description": "Automatically correct filenames to V2 format",
  "trigger": {
    "type": "manual",
    "command": "correct-filenames"
  },
  "actions": [
    {
      "type": "script",
      "script": "scripts/batch-filename-correction.js"
    }
  ],
  "settings": {
    "confirmBeforeExecution": true,
    "showProgress": true,
    "logResults": true
  }
}
```

### **Hook Script: `scripts/batch-filename-correction.js`**

```javascript
// Batch Filename Correction Script for Kiro
const fs = require('fs');
const path = require('path');

// V2 Format Mapping
const statusMapping = {
  '🟢': '1🟢',
  '🟡': '2🟡', 
  '🔵': '3🔵',
  '⚫': '4⚫'
};

const emojiMapping = {
  // Core categories
  'master': '🎯', 'plan': '📋', 'agent': '🤖', 'cockpit': '🎛️',
  'test': '🧪', 'bridge': '🌉', 'core': '⚙️', 'conscious': '🎭',
  'setup': '🔧', 'memory': '🧠', 'church': '🏛️', 'translation': '🌍',
  'family': '👨‍👩‍👧‍👦', 'tools': '📊', 'ui': '🎨', 'empathy': '💝',
  'user': '👥', 'concept': '💡', 'context': '📝', 'deprecated': '🗑️'
};

async function correctFilenames() {
  console.log('🔧 Starting batch filename correction...');
  
  // Get all .md files in root
  const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    .filter(file => !isV2Format(file));
  
  console.log(`Found ${files.length} files to correct`);
  
  let corrected = 0;
  
  for (const file of files) {
    try {
      const newName = generateV2Name(file);
      if (newName && newName !== file) {
        await correctSingleFile(file, newName);
        corrected++;
        console.log(`✅ ${file} → ${newName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to correct ${file}:`, error.message);
    }
  }
  
  console.log(`🎉 Corrected ${corrected} files successfully!`);
  
  // Update progress file
  await updateProgressFile(corrected, files.length);
}

function isV2Format(filename) {
  // Check if filename already follows V2 format
  const v2Pattern = /^\d+_[^_]+[1-4][🟢🟡🔵⚫]_/;
  return v2Pattern.test(filename);
}

function generateV2Name(oldName) {
  // Extract components and generate V2 name
  const parts = oldName.split('_');
  if (parts.length < 3) return null;
  
  const index = parts[0];
  let emoji = parts[1];
  let status = parts[1];
  
  // Extract emoji and status
  if (emoji.includes('🟢') || emoji.includes('🟡') || emoji.includes('🔵') || emoji.includes('⚫')) {
    // Old format - needs conversion
    const oldStatus = emoji.slice(-1);
    emoji = emoji.slice(0, -1);
    status = statusMapping[oldStatus] || '1🟢';
  } else if (/^[1-4]$/.test(parts[1])) {
    // Missing emoji - need to infer
    status = parts[1] + '🟢'; // Default to green
    emoji = inferEmoji(oldName);
  }
  
  // Reconstruct filename
  const nameStart = 2;
  const nameParts = parts.slice(nameStart);
  const newName = `${index}_${emoji}${status}_${nameParts.join('_')}`;
  
  return newName;
}

function inferEmoji(filename) {
  const lower = filename.toLowerCase();
  
  // Infer emoji based on filename content
  if (lower.includes('master') || lower.includes('integration')) return '🎯';
  if (lower.includes('senior') || lower.includes('cockpit')) return '🎛️';
  if (lower.includes('agent')) return '🤖';
  if (lower.includes('test')) return '🧪';
  if (lower.includes('bridge') || lower.includes('communication')) return '🌉';
  if (lower.includes('setup') || lower.includes('infrastructure')) return '🔧';
  if (lower.includes('analysis') || lower.includes('tools')) return '📊';
  if (lower.includes('plan') || lower.includes('action')) return '📋';
  
  return '📝'; // Default to context/history
}

async function correctSingleFile(oldName, newName) {
  // Read content from old file
  const content = fs.readFileSync(oldName, 'utf8');
  
  // Write to new file
  fs.writeFileSync(newName, content);
  
  // Delete old file
  fs.unlinkSync(oldName);
}

async function updateProgressFile(corrected, total) {
  const progressFile = '085_📊1🟢_FILENAME_CORRECTION_PROGRESS_240812_084.md';
  
  if (fs.existsSync(progressFile)) {
    let content = fs.readFileSync(progressFile, 'utf8');
    
    // Update progress statistics
    const timestamp = new Date().toISOString();
    const updateText = `\n\n## 🤖 AUTOMATED BATCH CORRECTION - ${timestamp}\n- ✅ **${corrected}/${total} files corrected** using automated tools\n- 🔧 **Tool used:** Kiro Hook + Steering integration\n- 📊 **Success rate:** ${Math.round((corrected/total)*100)}%`;
    
    content += updateText;
    fs.writeFileSync(progressFile, content);
  }
}

// Export for Kiro Hook system
module.exports = { correctFilenames };

// Run if called directly
if (require.main === module) {
  correctFilenames().catch(console.error);
}
```

## 🎯 VERKTYG 3: STEERING INTEGRATION I STRUCTURE.MD

### **Uppdatera `.kiro/steering/structure.md`:**

```markdown
### **Automatisk Filnamnskorrigering:**
- **Steering-driven** - Automatisk korrigering via `.kiro/steering/filename-correction.md`
- **Hook-assisted** - Optional Kiro Hook för batch-operationer
- **V2-format enforcement** - Alla filer följer konsekvent format
- **Progress tracking** - Automatisk uppdatering av progress-filer

### **Användning:**
1. **Automatisk** - Steering aktiveras automatiskt när du arbetar med filer
2. **Manuell batch** - Kör `Ctrl/Cmd + K` → "correct-filenames" för batch-korrigering
3. **Enskilda filer** - Steering guidar dig att korrigera filer du arbetar med
```

## 🚀 IMPLEMENTATION PLAN

### **Fas 1: Skapa Steering Document (Nu)**
1. Skapa `.kiro/steering/filename-correction.md`
2. Integrera i `structure.md`
3. Testa med några filer manuellt

### **Fas 2: Skapa Hook System (Optional)**
1. Skapa Hook configuration
2. Implementera batch-script
3. Testa automatiserad korrigering

### **Fas 3: Slutför Alla Filnamn**
1. Använd verktyg för resterande 40+ filer
2. Verifiera alla korrigeringar
3. Uppdatera progress-dokumentation

## 🎯 FÖRDELAR MED DENNA APPROACH

### **Steering-Driven (Rekommenderat):**
- ✅ **Automatisk aktivering** - Ingen konfiguration behövs
- ✅ **Självdokumenterande** - Process tydligt beskriven
- ✅ **Flexibel** - Fungerar för både batch och enskilda filer
- ✅ **Integrerat** - Del av Kiro's naturliga workflow

### **Hook-Assisted (Optional):**
- ✅ **Batch-effektivitet** - Korrigera många filer samtidigt
- ✅ **Automatiserad** - Minimal manuell intervention
- ✅ **Progress tracking** - Automatisk uppdatering
- ✅ **Felhantering** - Robust error handling

### **Kombinerat System:**
- ✅ **Bäst av båda** - Steering för dagligt arbete, Hooks för batch
- ✅ **Skalbart** - Fungerar för 1 fil eller 100+ filer
- ✅ **Konsekvent** - Samma V2-format överallt
- ✅ **Underhållbart** - Lätt att uppdatera och förbättra

## 🎉 NÄSTA STEG

1. **Skapa Steering Document** - Implementera automatisk vägledning
2. **Testa med några filer** - Verifiera att approach fungerar
3. **Skapa Hook System** - För effektiv batch-korrigering
4. **Slutför alla filnamn** - Använd verktyg för resterande filer

**Detta verktyg kommer att göra filnamnskorrigering både effektivare och mer konsekvent!** 🚀