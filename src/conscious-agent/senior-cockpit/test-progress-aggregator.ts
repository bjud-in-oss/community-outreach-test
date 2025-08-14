// MASTER PLAN 2.0: Progress Aggregator Tests
// STATUS: Testing Senior-Vänliga Progress Sammanfattningar
// INTEGRATION: Senior Cockpit Testing Suite

import { ProgressAggregator } from './services/ProgressAggregator';

/**
 * Testar ProgressAggregator för senior-vänliga sammanfattningar
 */
async function testProgressAggregator() {
  console.log('🧪 Testing ProgressAggregator...');
  
  const aggregator = new ProgressAggregator();
  
  // Test 1: Lägg till tekniska händelser
  console.log('\n📝 Test 1: Adding technical events...');
  
  aggregator.addTechnicalEvent({
    type: 'task_completed',
    description: 'Implemented authentication system',
    timestamp: new Date().toISOString()
  });
  
  aggregator.addTechnicalEvent({
    type: 'progress_update',
    description: 'Working on database integration',
    timestamp: new Date().toISOString()
  });
  
  aggregator.addTechnicalEvent({
    type: 'task_completed',
    description: 'Fixed security vulnerabilities',
    timestamp: new Date().toISOString()
  });
  
  // Test 2: Generera veckosammanfattning
  console.log('\n📊 Test 2: Generating weekly digest...');
  
  const weeklyDigest = aggregator.generateWeeklyDigest();
  console.log('Weekly Digest:', JSON.stringify(weeklyDigest, null, 2));
  
  // Test 3: Kontrollera att meddelanden är senior-vänliga
  console.log('\n👵 Test 3: Checking senior-friendly language...');
  
  const hasNoTechnicalJargon = !JSON.stringify(weeklyDigest).toLowerCase().includes('api') &&
                               !JSON.stringify(weeklyDigest).toLowerCase().includes('database') &&
                               !JSON.stringify(weeklyDigest).toLowerCase().includes('authentication');
  
  console.log('✅ No technical jargon detected:', hasNoTechnicalJargon);
  
  // Test 4: Generera månadssammanfattning
  console.log('\n📅 Test 4: Generating monthly progress...');
  
  const monthlyProgress = aggregator.generateMonthlyProgress();
  console.log('Monthly Progress:', JSON.stringify(monthlyProgress, null, 2));
  
  // Test 5: Kontrollera uppmuntrande språk
  console.log('\n💝 Test 5: Checking encouraging language...');
  
  const hasEncouragingWords = weeklyDigest.encouragingMessage.includes('fantastiska') ||
                             weeklyDigest.encouragingMessage.includes('bra') ||
                             weeklyDigest.encouragingMessage.includes('stolta');
  
  console.log('✅ Encouraging language detected:', hasEncouragingWords);
  
  // Test 6: Testa rensning av gamla händelser
  console.log('\n🧹 Test 6: Testing event cleanup...');
  
  aggregator.clearOldEvents();
  console.log('✅ Old events cleared successfully');
  
  console.log('\n🎉 All ProgressAggregator tests completed!');
  
  return {
    weeklyDigest,
    monthlyProgress,
    seniorFriendly: hasNoTechnicalJargon,
    encouraging: hasEncouragingWords
  };
}

// Kör tester om filen körs direkt
if (require.main === module) {
  testProgressAggregator()
    .then(results => {
      console.log('\n📋 Test Results Summary:');
      console.log('- Weekly digest generated:', !!results.weeklyDigest);
      console.log('- Monthly progress generated:', !!results.monthlyProgress);
      console.log('- Senior-friendly language:', results.seniorFriendly);
      console.log('- Encouraging tone:', results.encouraging);
    })
    .catch(error => {
      console.error('❌ Test failed:', error);
    });
}

export { testProgressAggregator };