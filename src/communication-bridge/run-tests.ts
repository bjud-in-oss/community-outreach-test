#!/usr/bin/env node

// MASTER PLAN 2.0: Communication Bridge Test Runner
// STATUS: Test runner för Dual Consciousness Architecture
// INTEGRATION: Kör alla Communication Bridge tester
// ARCHITECTURE: Verifierar att systemet är redo för produktion

import { CommunicationBridgeIntegrationTest } from './test-bridge-integration.js';

/**
 * MASTER PLAN 2.0: Test Runner för Communication Bridge
 * 
 * Kör alla integrationstester och rapporterar resultat:
 * - Hello World Flow
 * - Senior Safety Filtering  
 * - Technical Translation
 * - Context Preservation
 * - Error Handling
 * - Memory Management
 * - Performance
 */
async function runCommunicationBridgeTests(): Promise<void> {
  console.log('🚀 Starting Communication Bridge Integration Tests...');
  console.log('📋 Master Plan 2.0 - Dual Consciousness Architecture Verification');
  console.log('=' .repeat(80));
  
  const startTime = Date.now();
  
  try {
    // Initialize test suite
    const tester = new CommunicationBridgeIntegrationTest();
    
    // Run all tests
    const summary = await tester.runAllTests();
    
    const totalTime = Date.now() - startTime;
    
    // Print final summary
    console.log('\\n🏁 TEST EXECUTION COMPLETED');
    console.log(`⏱️ Total execution time: ${totalTime}ms`);
    console.log(`📊 Overall status: ${summary.overallStatus}`);
    
    // Exit with appropriate code
    if (summary.overallStatus === 'PASS') {
      console.log('\\n✅ All tests passed! Communication Bridge is ready for production.');
      console.log('🎯 Next step: Proceed to Fas 0.3 - Conscious Agent Hello World');
      process.exit(0);
    } else {
      console.log('\\n❌ Some tests failed. Please review and fix issues before proceeding.');
      console.log('🔧 Check the detailed test results above for specific failures.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\\n💥 Test execution failed with error:', error);
    console.error('🚨 This indicates a critical issue with the Communication Bridge.');
    
    if (error instanceof Error) {
      console.error('📋 Error details:', error.message);
      console.error('📍 Stack trace:', error.stack);
    }
    
    process.exit(2);
  }
}

/**
 * MASTER PLAN 2.0: Health check before running tests
 */
async function performHealthCheck(): Promise<boolean> {
  console.log('🏥 Performing system health check...');
  
  try {
    // Check Node.js version
    const nodeVersion = process.version;
    console.log(`   Node.js version: ${nodeVersion}`);
    
    if (!nodeVersion.startsWith('v18') && !nodeVersion.startsWith('v20')) {
      console.warn('   ⚠️ Warning: Recommended Node.js version is 18.x or 20.x');
    }
    
    // Check memory availability
    const memoryUsage = process.memoryUsage();
    const totalMemoryMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    console.log(`   Memory usage: ${totalMemoryMB}MB`);
    
    if (totalMemoryMB > 500) {
      console.warn('   ⚠️ Warning: High memory usage detected');
    }
    
    // Check environment
    const env = process.env.NODE_ENV || 'development';
    console.log(`   Environment: ${env}`);
    
    console.log('   ✅ Health check completed');
    return true;
    
  } catch (error) {
    console.error('   ❌ Health check failed:', error);
    return false;
  }
}

/**
 * MASTER PLAN 2.0: Main execution
 */
async function main(): Promise<void> {
  console.log('🎯 MASTER PLAN 2.0 - COMMUNICATION BRIDGE TEST SUITE');
  console.log('🏗️ Dual Consciousness Architecture Verification');
  console.log('📅 ' + new Date().toISOString());
  console.log('');
  
  // Perform health check
  const healthOk = await performHealthCheck();
  if (!healthOk) {
    console.error('❌ Health check failed. Aborting tests.');
    process.exit(3);
  }
  
  console.log('');
  
  // Run tests
  await runCommunicationBridgeTests();
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught exception:', error);
  process.exit(4);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled rejection at:', promise, 'reason:', reason);
  process.exit(5);
});

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Main execution failed:', error);
    process.exit(6);
  });
}

export { runCommunicationBridgeTests, performHealthCheck };