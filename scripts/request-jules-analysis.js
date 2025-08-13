// Request Jules to analyze the entire development process
import { JulesTool } from './src/core-agent/tools/jules-tool/JulesTool.js';

async function requestJulesAnalysis() {
  console.log('🎯 Requesting Jules to analyze senior-adapted development process...');
  
  // Create Jules analysis task
  const analysisTask = {
    title: 'Senior-Anpassad Utvecklingsprocess - Omfattande Analys',
    description: `
# JULES ANALYSIS REQUEST: Senior-Anpassad Utvecklingsprocess

## BAKGRUND
Vi har en omfattande dokumentstruktur med 40+ dokument som användaren (senior) upplever som arbetssam. Vi behöver analysera hela processen och föreslå förbättringar.

## NUVARANDE PROCESS
1. **Användarplan** - Utforska idéer, många underdokument (40+ dokument)
2. **Requirements** - User Stories + EARS format (WHEN/THEN/SHALL)  
3. **Design** - Teknisk design (valfritt)
4. **Tasks** - Task list som hänvisar till requirements
5. **Execution** - En fil per del-task, tester, implementation
6. **Verification** - Verifiera att implementation möter varje requirement

## ANALYS BEGÄRD

### 1. DETALJERAD IMPLEMENTATIONSGRANSKNING
Granska SeniorTranslator.ts implementationen:
- Är koden korrekt och komplett?
- Möter den alla requirements från Requirement 2?
- Finns förbättringsområden?
- Hur väl integrerar den med Communication Bridge?

### 2. PROCESSANALYS  
Analysera nuvarande spec-process:
- Vad fungerar bra i "den stora planen" (Master Plan 2.0)?
- Vilka delar är mest arbetssamma för användaren?
- Hur kan vi behålla kvaliteten men minska komplexiteten?

### 3. SENIOR-ANPASSNING
Förslag för att göra processen mer senioranpassad:
- Skulle ett "användarplan" före requirements hjälpa?
- Hur minska från 40+ dokument till något hanterbart?
- Vilka delar kan automatiseras?
- Hur göra processen mer kraftfull och mindre arbetssam?

### 4. AUTOMATISERING OCH FÖRENKLING
- Vilka delar kan automatiseras?
- Hur kan vi skapa mallar som minskar manuellt arbete?
- Kan vi automatisera dokumentgenerering?
- Hur göra feedback-loopen snabbare?

## DOKUMENT ATT ANALYSERA

### ROT-MAPPEN (Prioriterade dokument)
- 01_🎯🟢_MASTER_INTEGRATION_PLAN_240809_ALL.md
- 02_📋🟢_DOCUMENT_INDEX_240812_01.md  
- 03_📋🟢_NEXT_IMMEDIATE_ACTIONS_240809_01.md
- 131_🧠🔵_DUAL_CONSCIOUSNESS_ARCHITECTURE_240809_01,10,12.md
- 132_🎯🔵_PHASE_PLANNING_FRAMEWORK_240809_01,03.md
- 240_👥🔵_ADVANCED_USER_ANALYSIS_240808_01,41,42.md

### SPECS-MAPPEN
- .kiro/specs/fas-0-communication-bridge/requirements.md
- .kiro/specs/fas-0-communication-bridge/tasks.md
- Alla andra specs i .kiro/specs/

### SRC-MAPPEN  
- src/communication-bridge/translation/SeniorTranslator.ts
- src/communication-bridge/CommunicationBridge.ts
- src/communication-bridge/guardrails/TechnicalFilter.ts
- src/core-agent/tools/jules-tool/JulesTool.ts

## ÖNSKAD OUTPUT
1. **Nulägesanalys** - Vad fungerar bra/dåligt i nuvarande process
2. **Senior-perspektiv** - Hur göra det enklare för seniorer  
3. **Automatiseringsmöjligheter** - Vad kan automatiseras
4. **Förenklingsförslag** - Konkreta förslag för att minska komplexitet
5. **Implementation Review** - Detaljerad granskning av SeniorTranslator
6. **Rekommendationer** - Nästa steg för förbättring

Analysera detta och ge konkreta, actionable förslag för en mer senioranpassad utvecklingsprocess!
    `,
    
    priority: 'high',
    requiresAnalysis: true,
    analysisScope: [
      'All root-level .md documents',
      'All specs in .kiro/specs/',
      'Key implementation files in src/',
      'Development process workflow',
      'Senior user experience'
    ],
    
    expectedDeliverables: [
      'Process analysis report',
      'Senior-adaptation recommendations', 
      'Automation opportunities',
      'Implementation review',
      'Concrete improvement proposals'
    ]
  };
  
  console.log('📋 Jules analysis task created:');
  console.log(`- Title: ${analysisTask.title}`);
  console.log(`- Priority: ${analysisTask.priority}`);
  console.log(`- Analysis scope: ${analysisTask.analysisScope.length} areas`);
  console.log(`- Expected deliverables: ${analysisTask.expectedDeliverables.length} items`);
  
  return analysisTask;
}

// Execute the request
requestJulesAnalysis()
  .then(task => {
    console.log('\n🎯 Jules analysis task ready!');
    console.log('Next step: Execute this task through Jules Tool');
    return task;
  })
  .catch(error => {
    console.error('❌ Failed to create Jules analysis task:', error);
  });