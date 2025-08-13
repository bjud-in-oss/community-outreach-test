// MASTER PLAN 2.0: Jules Tool Integration Test
// STATUS: Test för att verifiera refaktorering och integration
// USAGE: node src/core-agent/tools/jules-tool/test-integration.ts

import { JulesTool } from './JulesTool.js';
import { JulesToolConfig } from './types.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * MASTER PLAN 2.0: Test Jules Tool Integration
 * 
 * Testar att refaktoreringen fungerar korrekt:
 * 1. Initialization
 * 2. Configuration validation
 * 3. GitHub connection
 * 4. Hello World app creation (Fas 0 test)
 */
async function testJulesToolIntegration() {
  console.log('🧪 Starting Master Plan 2.0 Jules Tool Integration Test');
  console.log('=' .repeat(60));
  
  try {
    // 1. Setup configuration
    console.log('📋 Setting up Jules Tool configuration...');
    
    const config: JulesToolConfig = {
      githubToken: process.env.GITHUB_TOKEN || '',
      repoOwner: process.env.REPO_OWNER || 'bjud-in-oss',
      repoName: process.env.REPO_NAME || 'community-outreach-test',
      julesLabel: process.env.JULES_LABEL || 'jules',
      pollInterval: 5000,
      autoApprove: false,
      groqApiKey: process.env.GROQ_API_KEY,
      geminiApiKey: process.env.GEMINI_API_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    };
    
    console.log('✅ Configuration loaded');
    console.log(`   Repository: ${config.repoOwner}/${config.repoName}`);
    console.log(`   Jules Label: ${config.julesLabel}`);
    console.log(`   GitHub Token: ${config.githubToken ? '***configured***' : '❌ MISSING'}`);
    
    // 2. Initialize Jules Tool
    console.log('\n🔧 Initializing Jules Tool...');
    
    const julesTool = new JulesTool(config);
    const initResult = await julesTool.initialize();
    
    if (!initResult.success) {
      throw new Error(`Initialization failed: ${initResult.error}`);
    }
    
    console.log('✅ Jules Tool initialized successfully');
    console.log(`   Senior Message: ${initResult.seniorFriendlyMessage}`);
    
    // 3. Health Check
    console.log('\n🏥 Performing health check...');
    
    const healthResult = await julesTool.healthCheck();
    
    if (!healthResult.success) {
      console.warn('⚠️ Health check issues detected:');
      console.warn(`   Error: ${healthResult.error}`);
      console.warn(`   Senior Message: ${healthResult.seniorFriendlyMessage}`);
    } else {
      console.log('✅ All systems healthy');
      console.log(`   GitHub Connected: ${healthResult.data?.github?.connected}`);
      console.log(`   Rate Limit: ${healthResult.data?.github?.rateLimit?.rate?.remaining}/${healthResult.data?.github?.rateLimit?.rate?.limit}`);
    }
    
    // 4. Test Configuration Access
    console.log('\n⚙️ Testing configuration access...');
    
    const configData = julesTool.getConfiguration();
    console.log('✅ Configuration accessible');
    console.log(`   Repository: ${configData.repoOwner}/${configData.repoName}`);
    console.log(`   Auto Approve: ${configData.autoApprove}`);
    
    // 5. Test Active Tasks Retrieval
    console.log('\n📋 Testing active tasks retrieval...');
    
    const tasksResult = await julesTool.getActiveTasks();
    
    if (tasksResult.success) {
      console.log('✅ Active tasks retrieved successfully');
      console.log(`   Count: ${tasksResult.data?.count || 0}`);
      console.log(`   Senior Message: ${tasksResult.seniorFriendlyMessage}`);
    } else {
      console.warn('⚠️ Failed to retrieve active tasks:');
      console.warn(`   Error: ${tasksResult.error}`);
    }
    
    // 6. Test Hello World App Creation (Fas 0 Test)
    console.log('\n🌍 Testing Hello World app creation (Fas 0 Test)...');
    
    const helloWorldResult = await julesTool.createHelloWorldApp('skapa en enkel test-app');
    
    if (helloWorldResult.success) {
      console.log('✅ Hello World app task created successfully');
      console.log(`   Issue Number: ${helloWorldResult.data?.issueNumber}`);
      console.log(`   Estimated Time: ${helloWorldResult.estimatedTime} minutes`);
      console.log(`   Senior Message: ${helloWorldResult.seniorFriendlyMessage}`);
      console.log(`   Requires Approval: ${helloWorldResult.requiresApproval}`);
      
      // Monitor the task for a short while
      if (helloWorldResult.data?.issueNumber) {
        console.log('\n📊 Monitoring task progress...');
        
        const monitorResult = await julesTool.monitorTaskProgress(helloWorldResult.data.issueNumber);
        
        if (monitorResult.success) {
          console.log('✅ Task monitoring successful');
          console.log(`   Status: ${monitorResult.data?.status}`);
          console.log(`   Senior Message: ${monitorResult.seniorFriendlyMessage}`);
        } else {
          console.warn('⚠️ Task monitoring failed:');
          console.warn(`   Error: ${monitorResult.error}`);
        }
      }
    } else {
      console.warn('⚠️ Hello World app creation failed:');
      console.warn(`   Error: ${helloWorldResult.error}`);
      console.warn(`   Senior Message: ${helloWorldResult.seniorFriendlyMessage}`);
    }
    
    // 7. Summary
    console.log('\n' + '=' .repeat(60));
    console.log('🎉 MASTER PLAN 2.0 JULES TOOL INTEGRATION TEST COMPLETED');
    console.log('=' .repeat(60));
    
    console.log('\n📊 Test Results Summary:');
    console.log(`✅ Configuration: OK`);
    console.log(`${initResult.success ? '✅' : '❌'} Initialization: ${initResult.success ? 'OK' : 'FAILED'}`);
    console.log(`${healthResult.success ? '✅' : '⚠️'} Health Check: ${healthResult.success ? 'OK' : 'ISSUES'}`);
    console.log(`${tasksResult.success ? '✅' : '❌'} Active Tasks: ${tasksResult.success ? 'OK' : 'FAILED'}`);
    console.log(`${helloWorldResult.success ? '✅' : '❌'} Hello World: ${helloWorldResult.success ? 'OK' : 'FAILED'}`);
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Check GitHub for created Jules task');
    console.log('2. Monitor Jules progress on the task');
    console.log('3. Test merge process when Jules completes');
    console.log('4. Proceed to Fas 0.2 (Communication Bridge)');
    
    if (helloWorldResult.success && helloWorldResult.data?.issueNumber) {
      console.log(`\n🔗 Created Task: https://github.com/${config.repoOwner}/${config.repoName}/issues/${helloWorldResult.data.issueNumber}`);
    }
    
  } catch (error) {
    console.error('\n❌ INTEGRATION TEST FAILED:');
    console.error(error);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check that GITHUB_TOKEN is set in .env');
    console.error('2. Verify repository access permissions');
    console.error('3. Ensure Jules GitHub app is installed');
    console.error('4. Check network connectivity');
    
    process.exit(1);
  }
}

// Run the test
if (import.meta.url === `file://${process.argv[1]}`) {
  testJulesToolIntegration().catch(console.error);
}

export { testJulesToolIntegration };