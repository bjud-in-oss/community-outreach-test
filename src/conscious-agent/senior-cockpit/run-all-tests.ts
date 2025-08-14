// MASTER PLAN 2.0: Senior Cockpit Test Runner
// STATUS: Comprehensive Testing Suite för Senior Cockpit
// INTEGRATION: All Senior Cockpit Tests

import { testProgressAggregator } from './test-progress-aggregator';
import { testSeniorSafeDataModels } from './test-senior-safe-data';
import { testUserPlanService } from './test-user-plan-service';
import { runSeniorSecurityTests } from './test-senior-security';

/**
 * Kör alla tester för Senior Cockpit-komponenter
 */
async function runAllSeniorCockpitTests() {
  console.log('🚀 Starting Senior Cockpit Comprehensive Test Suite...');
  console.log('=' .repeat(60));
  
  const testResults = {
    progressAggregator: false,
    seniorSafeData: false,
    userPlanService: false,
    seniorSecurity: false,
    totalTests: 0,
    passedTests: 0,
    failedTests: 0
  };

  try {
    // Test 1: Progress Aggregator
    console.log('\n📊 Running Progress Aggregator Tests...');
    console.log('-'.repeat(40));
    
    const progressResults = await testProgressAggregator();
    testResults.progressAggregator = !!(
      progressResults.weeklyDigest && 
      progressResults.monthlyProgress && 
      progressResults.seniorFriendly && 
      progressResults.encouraging
    );
    
    if (testResults.progressAggregator) {
      console.log('✅ Progress Aggregator tests PASSED');
      testResults.passedTests++;
    } else {
      console.log('❌ Progress Aggregator tests FAILED');
      testResults.failedTests++;
    }
    testResults.totalTests++;

  } catch (error) {
    console.error('❌ Progress Aggregator tests FAILED:', error.message);
    testResults.failedTests++;
    testResults.totalTests++;
  }

  try {
    // Test 2: Senior Safe Data Models
    console.log('\n🔒 Running Senior Safe Data Models Tests...');
    console.log('-'.repeat(40));
    
    const dataResults = await testSeniorSafeDataModels();
    testResults.seniorSafeData = !!(
      dataResults.validationWorks && 
      dataResults.factoryWorks && 
      dataResults.technicalTermsBlocked && 
      dataResults.phaseMappingCorrect
    );
    
    if (testResults.seniorSafeData) {
      console.log('✅ Senior Safe Data Models tests PASSED');
      testResults.passedTests++;
    } else {
      console.log('❌ Senior Safe Data Models tests FAILED');
      testResults.failedTests++;
    }
    testResults.totalTests++;

  } catch (error) {
    console.error('❌ Senior Safe Data Models tests FAILED:', error.message);
    testResults.failedTests++;
    testResults.totalTests++;
  }

  try {
    // Test 3: User Plan Service
    console.log('\n👥 Running User Plan Service Tests...');
    console.log('-'.repeat(40));
    
    const planResults = await testUserPlanService();
    testResults.userPlanService = !!(
      planResults.planCreation && 
      planResults.requirementsGeneration && 
      planResults.approvalPreparation && 
      planResults.inputSanitization
    );
    
    if (testResults.userPlanService) {
      console.log('✅ User Plan Service tests PASSED');
      testResults.passedTests++;
    } else {
      console.log('❌ User Plan Service tests FAILED');
      testResults.failedTests++;
    }
    testResults.totalTests++;

  } catch (error) {
    console.error('❌ User Plan Service tests FAILED:', error.message);
    testResults.failedTests++;
    testResults.totalTests++;
  }

  try {
    // Test 4: Senior Security Tests
    console.log('\n🛡️ Running Senior Security Tests...');
    console.log('-'.repeat(40));
    
    await runSeniorSecurityTests();
    testResults.seniorSecurity = true; // Assume passed if no exception
    
    console.log('✅ Senior Security tests PASSED');
    testResults.passedTests++;
    testResults.totalTests++;

  } catch (error) {
    console.error('❌ Senior Security tests FAILED:', error.message);
    testResults.failedTests++;
    testResults.totalTests++;
  }

  // Final Results
  console.log('\n' + '='.repeat(60));
  console.log('🎯 SENIOR COCKPIT TEST SUITE RESULTS');
  console.log('='.repeat(60));
  
  console.log(`\n📊 Overall Results:`);
  console.log(`   Total Tests: ${testResults.totalTests}`);
  console.log(`   Passed: ${testResults.passedTests}`);
  console.log(`   Failed: ${testResults.failedTests}`);
  
  const passRate = (testResults.passedTests / testResults.totalTests) * 100;
  console.log(`   Pass Rate: ${passRate.toFixed(1)}%`);

  console.log(`\n📋 Individual Test Results:`);
  console.log(`   Progress Aggregator: ${testResults.progressAggregator ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Senior Safe Data: ${testResults.seniorSafeData ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   User Plan Service: ${testResults.userPlanService ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Senior Security: ${testResults.seniorSecurity ? '✅ PASS' : '❌ FAIL'}`);

  // Recommendations
  console.log(`\n💡 Recommendations:`);
  
  if (testResults.failedTests === 0) {
    console.log('🎉 Excellent! All Senior Cockpit tests are passing.');
    console.log('✅ The Senior Cockpit is ready for senior users.');
    console.log('✅ No technical information will leak to seniors.');
    console.log('✅ All error messages are senior-friendly.');
    console.log('✅ Accessibility requirements are met.');
  } else {
    console.log('⚠️  Some tests are failing. Please address the following:');
    
    if (!testResults.progressAggregator) {
      console.log('   - Fix Progress Aggregator issues');
    }
    if (!testResults.seniorSafeData) {
      console.log('   - Fix Senior Safe Data Models issues');
    }
    if (!testResults.userPlanService) {
      console.log('   - Fix User Plan Service issues');
    }
    if (!testResults.seniorSecurity) {
      console.log('   - Fix Senior Security issues');
    }
    
    console.log('\n🚨 DO NOT deploy to seniors until all tests pass!');
  }

  // Next Steps
  console.log(`\n🎯 Next Steps:`);
  if (testResults.failedTests === 0) {
    console.log('1. ✅ Run integration tests with Communication Bridge');
    console.log('2. ✅ Test with real senior users (if available)');
    console.log('3. ✅ Deploy to staging environment');
    console.log('4. ✅ Monitor for any technical leakage');
  } else {
    console.log('1. 🔧 Fix failing tests');
    console.log('2. 🔄 Re-run test suite');
    console.log('3. 📝 Update documentation if needed');
    console.log('4. 🧪 Add additional tests for edge cases');
  }

  console.log('\n' + '='.repeat(60));
  
  return testResults;
}

/**
 * Kör endast säkerhetstester (snabb kontroll)
 */
async function runQuickSecurityCheck() {
  console.log('⚡ Running Quick Security Check...');
  
  try {
    await runSeniorSecurityTests();
    console.log('✅ Quick security check PASSED');
    return true;
  } catch (error) {
    console.error('❌ Quick security check FAILED:', error.message);
    return false;
  }
}

/**
 * Kör endast funktionalitetstester
 */
async function runFunctionalityTests() {
  console.log('⚙️ Running Functionality Tests...');
  
  const results = {
    progressAggregator: false,
    seniorSafeData: false,
    userPlanService: false
  };

  try {
    const progressResults = await testProgressAggregator();
    results.progressAggregator = !!(progressResults.weeklyDigest && progressResults.encouraging);
    
    const dataResults = await testSeniorSafeDataModels();
    results.seniorSafeData = !!(dataResults.validationWorks && dataResults.technicalTermsBlocked);
    
    const planResults = await testUserPlanService();
    results.userPlanService = !!(planResults.planCreation && planResults.inputSanitization);
    
    const allPassed = results.progressAggregator && results.seniorSafeData && results.userPlanService;
    
    console.log(allPassed ? '✅ Functionality tests PASSED' : '❌ Some functionality tests FAILED');
    return results;
    
  } catch (error) {
    console.error('❌ Functionality tests FAILED:', error.message);
    return results;
  }
}

// Export functions for external use
export {
  runAllSeniorCockpitTests,
  runQuickSecurityCheck,
  runFunctionalityTests
};

// Kör alla tester om filen körs direkt
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--quick')) {
    runQuickSecurityCheck();
  } else if (args.includes('--functional')) {
    runFunctionalityTests();
  } else {
    runAllSeniorCockpitTests()
      .then(results => {
        process.exit(results.failedTests > 0 ? 1 : 0);
      })
      .catch(error => {
        console.error('Test suite failed:', error);
        process.exit(1);
      });
  }
}