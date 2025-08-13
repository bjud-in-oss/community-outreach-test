// Jules Task: Analyze Senior-Adapted Development Process
import { JulesTool } from './src/core-agent/tools/jules-tool/JulesTool.js';
import { JulesToolConfig } from './src/core-agent/tools/jules-tool/types.js';
import dotenv from 'dotenv';

dotenv.config();

async function createJulesProcessAnalysisTask() {
  console.log('🎯 Creating Jules task for development process analysis...');
  
  try {
    // Setup Jules Tool
    const config = {
      githubToken: process.env.GITHUB_TOKEN || '',
      repoOwner: process.env.REPO_OWNER || 'bjud-in-oss', 
      repoName: process.env.REPO_NAME || 'community-outreach-test',
      julesLabel: 'jules',
      pollInterval: 5000,
      autoApprove: false
    };
    
    const julesTool = new JulesTool(config);
    await julesTool.initialize();
    
    // Create comprehensive analysis task
    const analysisTaskDescription = `
# JULES ANALYSIS: Senior-Anpassad Utvecklingsprocess

## BAKGRUND
Vi har en omfattande dokumentstruktur med 40+ dokument som användaren (senior) upplever som arbetssam. Vi behöver analysera hela processen och föreslå förbättringar för att göra den mer senioranpassad.

## NUVARANDE PROCESS
1. **Användarplan** - Utforska idéer, många underdokument (40+ dokument)
2. **Requirements** - User Stories + EARS format (WHEN/THEN/SHALL)
3. **Design** - Teknisk design (valfritt)  
4. **Tasks** - Task list som hänvisar till requirements
5. **Execution** - En fil per del-task, tester, implementation
6. **Verification** - Verifiera att implementation möter varje requirement

## ANALYS BEGÄRD

### 1. DETALJERAD IMPLEMENTATIONSGRANSKNING
Granska \`src/communication-bridge/translation/SeniorTranslator.ts\`:
- Är koden korrekt och komplett?
- Möter den alla requirements från Requirement 2 i \`.kiro/specs/fas-0-communication-bridge/requirements.md\`?
- Finns förbättringsområden i implementationen?
- Hur väl integrerar den med \`src/communication-bridge/CommunicationBridge.ts\`?

### 2. PROCESSANALYS
Analysera nuvarande spec-process genom att läsa:
- \`01_🎯🟢_MASTER_INTEGRATION_PLAN_240809_ALL.md\`
- \`02_📋🟢_DOCUMENT_INDEX_240812_01.md\`
- \`131_🧠🔵_DUAL_CONSCIOUSNESS_ARCHITECTURE_240809_01,10,12.md\`
- \`132_🎯🔵_PHASE_PLANNING_FRAMEWORK_240809_01,03.md\`

Frågor att besvara:
- Vad fungerar bra i "den stora planen" (Master Plan 2.0)?
- Vilka delar är mest arbetssamma för användaren?
- Hur kan vi behålla kvaliteten men minska komplexiteten?

### 3. SENIOR-ANPASSNING
Läs senior-fokuserade dokument:
- \`240_👥🔵_ADVANCED_USER_ANALYSIS_240808_01,41,42.md\`
- \`241_🎨🟡_SENIOR_UI_COMPONENTS_ANALYSIS_000000_40,10.md\`
- \`242_💝🟡_EMPATHY_ENGINE_ANALYSIS_000000_40,10.md\`

Förslag för att göra processen mer senioranpassad:
- Skulle ett "användarplan" före requirements hjälpa?
- Hur minska från 40+ dokument till något hanterbart?
- Vilka delar kan automatiseras?
- Hur göra processen mer kraftfull och mindre arbetssam?

### 4. SPECS-ANALYS
Analysera alla specs i \`.kiro/specs/\`:
- \`fas-0-communication-bridge/\`
- \`fas-0-conscious-agent-hello-world/\`
- \`fas-0-jules-tool-integration/\`
- \`fas-0-end-to-end-test/\`

Identifiera:
- Gemensamma mönster
- Onödig komplexitet
- Automatiseringsmöjligheter

## ÖNSKAD OUTPUT

Skapa en detaljerad analysrapport som innehåller:

### 1. NULÄGESANALYS
- Vad fungerar bra i nuvarande process
- Vad är problematiskt och arbetssamt
- Identifierade flaskhalsar

### 2. SENIOR-PERSPEKTIV
- Hur processen upplevs från senior-synvinkel
- Konkreta förbättringsområden
- Förslag för förenkling

### 3. AUTOMATISERINGSMÖJLIGHETER
- Vilka delar kan automatiseras
- Mallar som kan skapas
- Verktyg som kan utvecklas

### 4. IMPLEMENTATION REVIEW
- Detaljerad granskning av SeniorTranslator.ts
- Verifiering mot requirements
- Förbättringsförslag

### 5. KONKRETA REKOMMENDATIONER
- Steg-för-steg plan för förbättring
- Prioriterade åtgärder
- Tidsestimering för implementering

## FRAMGÅNGSKRITERIER
- Processen blir mer senioranpassad
- Minskar från 40+ dokument till något hanterbart
- Behåller kvaliteten men minskar komplexiteten
- Ger konkreta, actionable förslag

Analysera detta grundligt och ge konkreta förslag för en mer senioranpassad utvecklingsprocess!
    `;
    
    // Create the Jules task
    const result = await julesTool.createCustomTask(
      'Senior-Anpassad Utvecklingsprocess - Omfattande Analys',
      analysisTaskDescription,
      'high',
      ['analysis', 'senior-adaptation', 'process-improvement', 'documentation']
    );
    
    if (result.success) {
      console.log('✅ Jules analysis task created successfully!');
      console.log(`   Issue Number: ${result.data?.issueNumber}`);
      console.log(`   Estimated Time: ${result.estimatedTime} minutes`);
      console.log(`   Senior Message: ${result.seniorFriendlyMessage}`);
      console.log(`   GitHub URL: https://github.com/${config.repoOwner}/${config.repoName}/issues/${result.data?.issueNumber}`);
      
      // Monitor initial progress
      console.log('\n📊 Monitoring initial progress...');
      
      if (result.data?.issueNumber) {
        setTimeout(async () => {
          const monitorResult = await julesTool.monitorTaskProgress(result.data.issueNumber);
          if (monitorResult.success) {
            console.log(`📈 Task Status: ${monitorResult.data?.status}`);
            console.log(`📝 Senior Update: ${monitorResult.seniorFriendlyMessage}`);
          }
        }, 10000); // Check after 10 seconds
      }
      
      return result;
    } else {
      console.error('❌ Failed to create Jules analysis task:');
      console.error(`   Error: ${result.error}`);
      console.error(`   Senior Message: ${result.seniorFriendlyMessage}`);
      return null;
    }
    
  } catch (error) {
    console.error('❌ Error creating Jules analysis task:', error);
    return null;
  }
}

// Execute the task creation
createJulesProcessAnalysisTask()
  .then(result => {
    if (result) {
      console.log('\n🎉 Jules analysis task successfully created!');
      console.log('Jules will now analyze the entire development process and provide recommendations.');
      console.log('Check the GitHub issue for progress updates.');
    } else {
      console.log('\n❌ Failed to create Jules analysis task.');
    }
  })
  .catch(error => {
    console.error('❌ Execution failed:', error);
  });