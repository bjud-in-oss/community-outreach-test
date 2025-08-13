# 📋 SELEKTIV IMPORT PLAN - Master Plan 2.0 Clean Repository

## 🎯 **IMPORT KRITERIER**

### **✅ IMPORTERA OM:**
- ⭐ **Hög kodkvalitet** (4-5 stjärnor i IMPORT_ANALYSIS.md)
- 🏗️ **Master Plan 2.0 kompatibel** (>85% kompatibilitet)
- 🧪 **Production-ready** (robust error handling, TypeScript)
- 🔒 **Ingen teknisk skuld** (inga hack eller workarounds)
- 📚 **Väldokumenterad** (tydliga interfaces och kommentarer)

### **❌ IMPORTERA INTE OM:**
- 🚫 **Från konfliktfyllda PRs** utan grundlig cleanup
- 🐛 **Hackiga lösningar** (browser automation, temporära fixes)
- 🔀 **Blandar arkitektur-concerns** (conscious/core agent i samma fil)
- ⚠️ **Instabil kod** (känd för att orsaka problem)
- 📝 **Dåligt dokumenterad** (oklara interfaces eller syfte)

---

## 📦 **GODKÄND KOD FÖR IMPORT**

### **🏆 PRIORITET 1: KÄRNKOMPONENTER (MÅSTE IMPORTERAS)**

#### **1. TaskCard.tsx** ⭐⭐⭐⭐⭐
**📁 Källa**: `src/rescued-pr-code/components/TaskCard.tsx`
**📁 Destination**: `src/conscious-agent/ui-components/TaskCard.tsx`
**🎯 Syfte**: Senior-vänlig task approval interface
**✅ Kvalitet**: Production-ready React component med TypeScript
**🔧 Anpassningar**: 
- Översätt till svenska (Approve → Godkänn, Reject → Avvisa)
- Lägg till senior-vänlig styling (större knappar, tydligare färger)
- Integrera med communication bridge för guardrails

#### **2. AutonomousMergeManager.ts** ⭐⭐⭐⭐⭐
**📁 Källa**: `src/legacy-import/merge-system/AutonomousMergeManager.ts`
**📁 Destination**: `src/core-agent/tools/jules-tool/merge/AutonomousMergeManager.ts`
**🎯 Syfte**: Intelligent merge management med senior approval
**✅ Kvalitet**: Sophisticated logic med loop detection och blacklist
**🔧 Anpassningar**:
- Integrera med dubbelt medvetandesystem
- Lägg till communication bridge för senior-kommunikation
- Implementera requiresSeniorApproval logic

#### **3. github-client.ts** ⭐⭐⭐⭐⭐
**📁 Källa**: `src/legacy-import/infrastructure/github-client.ts`
**📁 Destination**: `src/core-agent/tools/jules-tool/github-client.ts`
**🎯 Syfte**: Robust GitHub API integration
**✅ Kvalitet**: Excellent Octokit wrapper med error handling
**🔧 Anpassningar**: Minimal - redan production-ready

#### **4. RealGitHubMerger.ts** ⭐⭐⭐⭐⭐
**📁 Källa**: `src/legacy-import/merge-system/RealGitHubMerger.ts`
**📁 Destination**: `src/core-agent/tools/jules-tool/merge/RealGitHubMerger.ts`
**🎯 Syfte**: Faktisk GitHub merge implementation
**✅ Kvalitet**: Robust merge strategies med comprehensive error handling
**🔧 Anpassningar**: Integrera med AutonomousMergeManager

### **🥈 PRIORITET 2: INFRASTRUKTUR (VIKTIGT ATT IMPORTERA)**

#### **5. dashboard-components.js** ⭐⭐⭐⭐
**📁 Källa**: `src/legacy-import/visual-dashboard/dashboard-components.js`
**📁 Destination**: `src/conscious-agent/ui-components/legacy-dashboard.js`
**🎯 Syfte**: Beprövad dashboard funktionalitet
**✅ Kvalitet**: Fungerar med auto-refresh och statistics
**🔧 Anpassningar**:
- Konvertera till TypeScript
- Integrera med TaskCard.tsx
- Senior-vänlig svenska översättning

#### **6. types.ts** ⭐⭐⭐⭐
**📁 Källa**: `src/legacy-import/infrastructure/types.ts`
**📁 Destination**: `src/shared/types/legacy-types.ts`
**🎯 Syfte**: TypeScript definitioner för importerad kod
**✅ Kvalitet**: Comprehensive type definitions
**🔧 Anpassningar**:
- Utöka med Master Plan 2.0 types
- Lägg till DualConsciousness interfaces
- Integrera med shared/types/

#### **7. context-bridge-system.ts** ⭐⭐⭐⭐
**📁 Källa**: `src/legacy-import/context-preservation/context-bridge-system.ts`
**📁 Destination**: `src/communication-bridge/context-preservation/context-bridge-system.ts`
**🎯 Syfte**: Session continuity och context preservation
**✅ Kvalitet**: 1,500+ lines sophisticated system
**🔧 Anpassningar**:
- Integrera med Master Plan 2.0 communication bridge
- Lägg till guardrails för informationsseparation
- Anpassa för dubbelt medvetandesystem

### **🥉 PRIORITET 3: SPECIALISERADE VERKTYG (BRA ATT HA)**

#### **8. real-time-translator.ts** ⭐⭐⭐⭐
**📁 Källa**: `src/core-agent/tools/church-automation/real-time-translator.ts`
**📁 Destination**: `src/core-agent/tools/church-automation/real-time-translator.ts`
**🎯 Syfte**: Kyrktjänst-översättning (testfall 1)
**✅ Kvalitet**: Google Cloud STT + DeepL integration
**🔧 Anpassningar**: Redan anpassad för Master Plan 2.0

#### **9. powershell-generator.ts** ⭐⭐⭐
**📁 Källa**: `src/core-agent/tools/church-automation/powershell-generator.ts`
**📁 Destination**: `src/core-agent/tools/church-automation/powershell-generator.ts`
**🎯 Syfte**: Windows automation (testfall 3)
**✅ Kvalitet**: Functional PowerShell generation
**🔧 Anpassningar**: Redan anpassad för Master Plan 2.0

#### **10. platform-selector.ts** ⭐⭐⭐⭐
**📁 Källa**: `src/core-agent/decision-engine/platform-selector.ts`
**📁 Destination**: `src/core-agent/decision-engine/platform-selector.ts`
**🎯 Syfte**: Intelligent teknikval för senior-requests
**✅ Kvalitet**: Sophisticated platform analysis
**🔧 Anpassningar**: Redan implementerad för Master Plan 2.0

---

## 🚫 **KOD SOM INTE SKA IMPORTERAS**

### **❌ PROBLEMATISK KOD:**

#### **Browser Automation Components**
**📁 Källa**: `src/legacy-import/browser-automation/`
**❌ Anledning**: Hackigt och instabilt enligt KONTEXT_ORIGINAL.md
**🔄 Alternativ**: Använd Jules API direkt istället

#### **Konfliktfylld PR-kod**
**📁 Källa**: Kod från stängda PRs med merge conflicts
**❌ Anledning**: Okänd kvalitet, potentiell teknisk skuld
**🔄 Alternativ**: Återskapa funktionalitet från scratch med Jules

#### **Temporära Hack och Workarounds**
**📁 Källa**: Kod markerad som "temporary" eller "hack"
**❌ Anledning**: Inte production-ready, skapar teknisk skuld
**🔄 Alternativ**: Implementera proper lösningar från början

#### **Mixed Architecture Code**
**📁 Källa**: Kod som blandar conscious/core agent concerns
**❌ Anledning**: Bryter dubbelt medvetandesystem-arkitektur
**🔄 Alternativ**: Separera i rätt komponenter från start

---

## 📋 **DOKUMENTATION SOM SKA IMPORTERAS**

### **✅ VÄRDEFULL DOKUMENTATION:**

#### **1. Strategiska Analyser** ⭐⭐⭐⭐⭐
- `220_🏛️_CHURCH_TECHNOLOGY_ANALYSIS.md` → `docs/analysis/church-technology.md`
- `221_🌍_REAL_TIME_TRANSLATION_ANALYSIS.md` → `docs/analysis/real-time-translation.md`
- `222_👨‍👩‍👧‍👦_FAMILY_HISTORY_INTEGRATION_ANALYSIS.md` → `docs/analysis/family-history.md`
- `223_📊_COMPREHENSIVE_TOOLS_ANALYSIS.md` → `docs/analysis/comprehensive-tools.md`

#### **2. Arkitektur Dokumentation** ⭐⭐⭐⭐⭐
- `01_🎯_MASTER_INTEGRATION_PLAN.md` → `docs/architecture/master-integration-plan.md`
- `31_🧠_DUAL_CONSCIOUSNESS_ARCHITECTURE.md` → `docs/architecture/dual-consciousness.md`
- `32_🎯_PHASE_PLANNING_FRAMEWORK.md` → `docs/architecture/phase-planning.md`

#### **3. Implementation Guides** ⭐⭐⭐⭐
- `COMPLETE_CODE_INVENTORY.md` → `docs/implementation/code-inventory.md`
- `IMPORT_ANALYSIS.md` → `docs/implementation/import-analysis.md`
- `PR_95_PROBLEM_SOLUTION.md` → `docs/lessons-learned/pr-95-problems.md`

#### **4. Steering Documents** ⭐⭐⭐⭐⭐
- `.kiro/steering/product.md` → `.kiro/steering/product.md`
- `.kiro/steering/structure.md` → `.kiro/steering/structure.md`
- `.kiro/steering/tech.md` → `.kiro/steering/tech.md`
- `.kiro/steering/document-index.md` → `.kiro/steering/document-index.md`

---

## 🔄 **IMPORT PROCESS**

### **🎯 FAS 1: KÄRNKOMPONENTER (Dag 1)**
```bash
# 1. Skapa ny repo struktur
mkdir -p community-outreach/{src,docs,public,.kiro}

# 2. Importera kärnkomponenter
cp TaskCard.tsx → src/conscious-agent/ui-components/
cp AutonomousMergeManager.ts → src/core-agent/tools/jules-tool/merge/
cp github-client.ts → src/core-agent/tools/jules-tool/
cp RealGitHubMerger.ts → src/core-agent/tools/jules-tool/merge/

# 3. Anpassa imports och paths
# 4. Testa att allt kompilerar
```

### **🎯 FAS 2: INFRASTRUKTUR (Dag 2)**
```bash
# 1. Importera infrastruktur
cp dashboard-components.js → src/conscious-agent/ui-components/
cp types.ts → src/shared/types/legacy-types.ts
cp context-bridge-system.ts → src/communication-bridge/context-preservation/

# 2. Konvertera JavaScript till TypeScript
# 3. Integrera med Master Plan 2.0 arkitektur
# 4. Testa integration
```

### **🎯 FAS 3: DOKUMENTATION (Dag 3)**
```bash
# 1. Importera strategisk dokumentation
cp docs/analysis/ → docs/analysis/
cp docs/architecture/ → docs/architecture/
cp .kiro/steering/ → .kiro/steering/

# 2. Uppdatera filnamn för Windows-kompatibilitet
# 3. Uppdatera interna länkar
# 4. Validera dokumentstruktur
```

### **🎯 FAS 4: SPECIALISERADE VERKTYG (Dag 4)**
```bash
# 1. Importera church automation tools
cp real-time-translator.ts → src/core-agent/tools/church-automation/
cp powershell-generator.ts → src/core-agent/tools/church-automation/
cp platform-selector.ts → src/core-agent/decision-engine/

# 2. Testa att alla verktyg fungerar
# 3. Integrera med core-agent
# 4. Validera end-to-end funktionalitet
```

---

## ✅ **KVALITETSKONTROLL**

### **Efter varje fas:**
```bash
# 1. Kompileringstest
npm run type-check

# 2. Linting
npm run lint

# 3. Grundläggande funktionalitetstest
npm run test

# 4. Import validation
# Kontrollera att alla imports fungerar
# Validera att ingen kod refererar till gamla paths
```

### **Slutgiltig validering:**
```bash
# 1. Full build test
npm run build

# 2. Server startup test
npm run dev

# 3. Dashboard functionality test
curl http://localhost:3000/api/health
curl http://localhost:3000/api/status

# 4. End-to-end test
# Testa att TaskCard kan approve/reject tasks
# Validera att AutonomousMergeManager kan hantera PRs
```

---

## 🎯 **SUCCESS METRICS**

### **Fas 1 Success:**
- ✅ Alla kärnkomponenter kompilerar utan errors
- ✅ TaskCard renderas korrekt i ny repo
- ✅ AutonomousMergeManager kan instansieras
- ✅ GitHub client kan ansluta till API

### **Fas 2 Success:**
- ✅ Dashboard visar tasks från backend
- ✅ Context bridge system fungerar
- ✅ Alla TypeScript types är korrekta
- ✅ Integration med Master Plan 2.0 arkitektur

### **Fas 3 Success:**
- ✅ All dokumentation är tillgänglig och länkad
- ✅ Steering system fungerar med Kiro
- ✅ Arkitektur-dokumentation är uppdaterad
- ✅ Lessons learned är dokumenterade

### **Fas 4 Success:**
- ✅ Alla tre testfall kan implementeras
- ✅ Church automation tools fungerar
- ✅ Platform selector kan rekommendera tekniker
- ✅ End-to-end system är funktionellt

---

## 📊 **ESTIMERAD EFFORT**

### **Total tid**: 4 dagar
### **Total filer att importera**: ~25 filer
### **Total lines of code**: ~8,000 lines (endast högkvalitativ kod)
### **Dokumentation**: ~15 strategiska dokument

### **Risk assessment**: **LÅG**
- Endast beprövad, högkvalitativ kod importeras
- Tydliga kriterier för vad som ska/inte ska importeras
- Stegvis process med validering efter varje fas
- Möjlighet att rollback om problem upptäcks

---

**Status: Redo för implementation!** 🚀

*Denna plan säkerställer att vi endast importerar värdefull, högkvalitativ kod som stödjer Master Plan 2.0 arkitekturen, samtidigt som vi undviker all teknisk skuld och problematisk kod från det gamla systemet.*