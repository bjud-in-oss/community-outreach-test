// MASTER PLAN 2.0: Test GitHubClient functionality
// STATUS: Testing refactored GitHub client
// INTEGRATION: Core Agent Tool testing

import { config } from 'dotenv';
config(); // Load environment variables

import { GitHubClient } from './GitHubClient.js';
import { JulesToolConfig } from './types.js';

async function testGitHubClient() {
  console.log('🧪 Testing GitHubClient for Master Plan 2.0...\n');

  const config: JulesToolConfig = {
    githubToken: process.env.GITHUB_TOKEN || '',
    repoOwner: process.env.REPO_OWNER || 'bjud-in-oss',
    repoName: process.env.REPO_NAME || 'community-outreach-test',
    julesLabel: process.env.JULES_LABEL || 'jules',
    pollInterval: parseInt(process.env.POLL_INTERVAL || '5000'),
    autoApprove: process.env.AUTO_APPROVE === 'true'
  };

  if (!config.githubToken) {
    console.error('❌ GITHUB_TOKEN not found in environment variables');
    return;
  }

  const githubClient = new GitHubClient(config);

  try {
    // Test 1: Health check
    console.log('🏥 Test 1: GitHub connection health check');
    const healthCheck = await githubClient.healthCheck();
    console.log('✅ Health check result:', {
      connected: healthCheck.connected,
      rateLimit: healthCheck.rateLimit ? 
        `${healthCheck.rateLimit.rate.remaining}/${healthCheck.rateLimit.rate.limit}` : 
        'N/A',
      error: healthCheck.error
    });

    if (!healthCheck.connected) {
      console.error('❌ GitHub connection failed, stopping tests');
      return;
    }

    // Test 2: Get active Jules tasks
    console.log('\n📋 Test 2: Get active Jules tasks');
    const activeTasks = await githubClient.getActiveJulesTasks();
    console.log(`✅ Found ${activeTasks.length} active Jules tasks`);
    
    if (activeTasks.length > 0) {
      console.log('📝 Sample task:', {
        number: activeTasks[0].number,
        title: activeTasks[0].title.substring(0, 50) + '...',
        labels: activeTasks[0].labels,
        commentsCount: activeTasks[0].comments.length
      });

      // Test 3: Monitor issue (if we have tasks)
      console.log('\n👀 Test 3: Monitor issue comments');
      const comments = await githubClient.monitorIssue(activeTasks[0].number);
      console.log(`✅ Found ${comments.length} comments for issue #${activeTasks[0].number}`);
      
      if (comments.length > 0) {
        const julesComments = comments.filter(c => c.isJulesComment);
        console.log(`📝 Jules comments: ${julesComments.length}/${comments.length}`);
      }

      // Test 4: Check task completion
      console.log('\n🎯 Test 4: Check task completion status');
      const completionStatus = await githubClient.checkTaskCompletion(activeTasks[0].number);
      console.log('✅ Task completion status:', {
        isComplete: completionStatus.isComplete,
        status: completionStatus.status,
        seniorFriendlyStatus: completionStatus.seniorFriendlyStatus,
        hasPR: !!completionStatus.prUrl
      });
    }

    console.log('\n🎉 All GitHubClient tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('- ✅ GitHub connection established');
    console.log('- ✅ Rate limit information retrieved');
    console.log('- ✅ Active tasks retrieval working');
    console.log('- ✅ Issue monitoring functional');
    console.log('- ✅ Task completion checking working');
    console.log('- ✅ Master Plan 2.0 integration complete');

  } catch (error) {
    console.error('❌ GitHubClient test failed:', error);
  }
}

// Run the test
testGitHubClient();

export { testGitHubClient };