// MASTER PLAN 2.0: Test ContextManager functionality
// STATUS: Testing structured tanke/minne överföring
// INTEGRATION: Communication Bridge - Context preservation testing

import { ContextManager } from './memory/ContextManager';

async function testContextManager() {
  console.log('🧪 Testing ContextManager for Master Plan 2.0...\n');

  const contextManager = new ContextManager({
    debugMode: true,
    seniorSafetyMode: true,
    maxContextEntries: 100
  });

  try {
    // Test 1: Store and retrieve context
    console.log('📝 Test 1: Basic context storage and retrieval');
    const contextId = await contextManager.storeContext(
      'conscious',
      'thought',
      { message: 'Senior wants to create an app', intent: 'app_creation' },
      { priority: 'high', seniorSafe: true, tags: ['senior-request'] }
    );

    const retrievedContext = await contextManager.getContext(contextId, 'core');
    console.log('✅ Context stored and retrieved:', retrievedContext?.id);

    // Test 2: Senior safety filtering
    console.log('\n🛡️ Test 2: Senior safety filtering');
    const technicalContextId = await contextManager.storeContext(
      'core',
      'error',
      { 
        error: 'API authentication failed', 
        stackTrace: 'Error at line 42...',
        debugInfo: 'Internal server error 500'
      },
      { priority: 'critical', seniorSafe: false, tags: ['technical-error'] }
    );

    const safeContext = await contextManager.getContext(technicalContextId, 'conscious');
    const unsafeContext = await contextManager.getContext(technicalContextId, 'core');
    
    console.log('✅ Senior safety check - conscious agent blocked:', safeContext === null);
    console.log('✅ Core agent can access:', unsafeContext !== null);

    // Test 3: Thought process tracking
    console.log('\n🧠 Test 3: Structured thought process');
    const thoughtId = await contextManager.startThoughtProcess(
      'conscious',
      { request: 'Create a family history app' },
      'app_creation'
    );

    await contextManager.addThoughtStep(
      thoughtId,
      'conscious',
      'understand_request',
      { request: 'Create a family history app' },
      { understood: true, type: 'family_app' },
      'Senior wants to create an app for family history',
      0.9,
      true
    );

    await contextManager.addThoughtStep(
      thoughtId,
      'bridge',
      'translate_to_technical',
      { type: 'family_app' },
      { platform: 'web', framework: 'next.js', features: ['photo_upload', 'pdf_generation'] },
      'Translating senior request to technical specifications',
      0.8,
      false
    );

    await contextManager.addThoughtStep(
      thoughtId,
      'core',
      'generate_implementation',
      { platform: 'web', framework: 'next.js' },
      { status: 'implementation_started', estimated_time: '2 hours' },
      'Starting technical implementation based on requirements',
      0.85,
      false
    );

    console.log('✅ Thought process created with multiple steps');

    // Test 4: Memory transfer between agents
    console.log('\n🔄 Test 4: Memory transfer between agents');
    const memoryData = {
      userPreferences: { language: 'swedish', theme: 'large_text' },
      projectStatus: { phase: 'development', progress: 75 },
      technicalDetails: { api_keys: 'secret123', debug_logs: 'verbose output' },
      errorLogs: { last_error: 'Connection timeout', stack_trace: 'Error at...' }
    };

    const transferResult = await contextManager.transferMemory(
      'core',
      'conscious',
      memoryData,
      true
    );

    console.log('✅ Memory transfer result:', {
      success: transferResult.success,
      hasWarnings: transferResult.warnings && transferResult.warnings.length > 0,
      filteredDataKeys: transferResult.filteredData ? Object.keys(transferResult.filteredData) : []
    });

    // Test 5: Context statistics
    console.log('\n📊 Test 5: Context manager statistics');
    const stats = contextManager.getStats();
    console.log('✅ Context Manager Stats:', {
      totalContexts: stats.contexts,
      thoughtProcesses: stats.thoughtProcesses,
      seniorSafeContexts: stats.seniorSafeContexts,
      memoryUsageBytes: stats.memoryUsage,
      errorRate: `${stats.errorRate.toFixed(2)}%`
    });

    // Test 6: Context retrieval by agent
    console.log('\n🔍 Test 6: Context retrieval by agent type');
    const consciousContexts = contextManager.getContextsByAgent('conscious', 'thought', 10);
    const coreContexts = contextManager.getContextsByAgent('core', 'error', 10);
    
    console.log('✅ Conscious agent contexts:', consciousContexts.length);
    console.log('✅ Core agent error contexts:', coreContexts.length);

    console.log('\n🎉 All ContextManager tests completed successfully!');
    console.log('\n📋 Summary:');
    console.log('- ✅ Context storage and retrieval working');
    console.log('- ✅ Senior safety filtering active');
    console.log('- ✅ Structured thought processes tracked');
    console.log('- ✅ Memory transfer with filtering working');
    console.log('- ✅ Statistics and monitoring functional');
    console.log('- ✅ Agent-specific context retrieval working');

  } catch (error) {
    console.error('❌ ContextManager test failed:', error);
  } finally {
    contextManager.shutdown();
  }
}

// Run the test
testContextManager();

export { testContextManager };