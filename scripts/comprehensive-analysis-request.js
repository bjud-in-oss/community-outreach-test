// Comprehensive Analysis Request for Jules
// Analyzing the entire development process for senior-friendliness

console.log('🔍 Preparing comprehensive analysis request for Jules...');

// Define the analysis scope
const analysisScope = {
  rootDocuments: [
    // Master planning documents
    '01_🎯🟢_MASTER_INTEGRATION_PLAN_240809_ALL.md',
    '02_📋🟢_DOCUMENT_INDEX_240812_01.md',
    '03_📋🟢_NEXT_IMMEDIATE_ACTIONS_240809_01.md',
    
    // Strategic documents
    '008_🔄🟢_STRATEGIC_CLEAN_START_PLAN_240808_01.md',
    '009_🔍🟢_STRATEGIC_REPOSITORY_ANALYSIS_240808_01.md',
    
    // Architecture documents
    '131_🧠🔵_DUAL_CONSCIOUSNESS_ARCHITECTURE_240809_01,10,12.md',
    '132_🎯🔵_PHASE_PLANNING_FRAMEWORK_240809_01,03.md',
    '150_🌉🔵_COMPLETE_INTEGRATION_PLAN_240809_01,31,05.md',
    
    // Deep dive documents
    '110_🎭🟡_CONSCIOUS_AGENT_DEEP_DIVE_000000_01,12,31.md',
    '111_⚙️🟡_CORE_AGENT_DEEP_DIVE_000000_01,23,04.md',
    '112_🌉🟡_COMMUNICATION_BRIDGE_DEEP_DIVE_000000_01,10,11.md',
    
    // Senior-focused documents
    '240_👥🔵_ADVANCED_USER_ANALYSIS_240808_01,41,42.md',
    '241_🎨🟡_SENIOR_UI_COMPONENTS_ANALYSIS_000000_40,10.md',
    '242_💝🟡_EMPATHY_ENGINE_ANALYSIS_000000_40,10.md'
  ],
  
  specsDocuments: [
    '.kiro/specs/fas-0-communication-bridge/requirements.md',
    '.kiro/specs/fas-0-communication-bridge/tasks.md',
    '.kiro/specs/fas-0-conscious-agent-hello-world/requirements.md',
    '.kiro/specs/fas-0-jules-tool-integration/requirements.md',
    '.kiro/specs/fas-0-end-to-end-test/requirements.md'
  ],
  
  implementationFiles: [
    'src/communication-bridge/CommunicationBridge.ts',
    'src/communication-bridge/translation/SeniorTranslator.ts',
    'src/communication-bridge/guardrails/TechnicalFilter.ts',
    'src/core-agent/tools/jules-tool/JulesTool.ts',
    'src/conscious-agent/ui-components/HybridDashboard.tsx'
  ]
};

// Define analysis questions
const analysisQuestions = {
  processAnalysis: [
    'Hur fungerar nuvarande spec-process från idé till implementation?',
    'Vilka steg är mest arbetssamma för användaren?',
    'Vad gör vi redan bra i Master Plan 2.0?',
    'Hur kan vi behålla kvaliteten men minska komplexiteten?'
  ],
  
  seniorAdaptation: [
    'Hur kan utvecklingsprocessen göras mer senioranpassad?',
    'Skulle ett "användarplan" före requirements hjälpa?',
    'Hur kan vi minska från 40+ dokument till något hanterbart?',
    'Vilka delar kan automatiseras för att minska användarens arbete?'
  ],
  
  implementationReview: [
    'Är SeniorTranslator.ts implementation korrekt och komplett?',
    'Möter implementationen alla requirements från Requirement 2?',
    'Finns det förbättringsområden i koden?',
    'Hur väl integrerar det med Communication Bridge?'
  ],
  
  processImprovement: [
    'Vilka konkreta förändringar skulle göra processen mer kraftfull?',
    'Hur kan vi automatisera dokumentgenerering?',
    'Kan vi skapa mallar som minskar manuellt arbete?',
    'Hur kan vi göra feedback-loopen snabbare?'
  ]
};

// Create the comprehensive request
const comprehensiveRequest = {
  title: 'Senior-Anpassad Utvecklingsprocess Analys',
  description: `
Analysera hela utvecklingsprocessen från senior-perspektiv och föreslå förbättringar.

BAKGRUND:
- Vi har 40+ dokument i rot-mappen som användaren måste hantera
- Nuvarande process: Användarplan → Requirements → Design → Tasks → Execution
- Processen upplevs som arbetssam och komplex
- Vi vill behålla kvaliteten men göra det mer senioranpassat

NUVARANDE PROCESS:
1. Utforska idéer och skapa användarplan (många underdokument)
2. Skapa Requirements med User Stories och EARS format
3. Eventuell Design-fas
4. Skapa Task list som hänvisar till requirements
5. Execution med en fil per del-task
6. Verification att implementation möter requirements

ANALYS ÖNSKAD:
1. Detaljerad granskning av SeniorTranslator implementation
2. Processanalys - vad fungerar bra/dåligt
3. Senior-anpassningsförslag
4. Automatiseringsmöjligheter
5. Konkreta förbättringsförslag
  `,
  
  scope: analysisScope,
  questions: analysisQuestions,
  
  expectedOutput: [
    'Nulägesanalys av utvecklingsprocessen',
    'Senior-perspektiv på komplexitet och arbetsbörda', 
    'Konkreta förslag för processförenkling',
    'Automatiseringsmöjligheter',
    'Implementation review av SeniorTranslator',
    'Rekommendationer för nästa steg'
  ]
};

console.log('📋 Analysis request prepared:');
console.log(`- Root documents to analyze: ${analysisScope.rootDocuments.length}`);
console.log(`- Specs documents to analyze: ${analysisScope.specsDocuments.length}`);
console.log(`- Implementation files to analyze: ${analysisScope.implementationFiles.length}`);
console.log(`- Analysis questions: ${Object.values(analysisQuestions).flat().length}`);

console.log('\n🎯 Ready to send comprehensive analysis request to Jules!');

export { comprehensiveRequest, analysisScope, analysisQuestions };