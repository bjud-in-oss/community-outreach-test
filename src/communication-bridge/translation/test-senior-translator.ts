// Test script for SeniorTranslator
import { SeniorTranslator } from './SeniorTranslator.js';

async function testSeniorTranslator() {
  console.log('🧪 Testing SeniorTranslator implementation...');
  
  const translator = new SeniorTranslator();
  
  // Test 1: Senior request to technical specification
  console.log('\n📝 Test 1: Senior request to technical specification');
  const testRequest = "Jag vill skapa en enkel app för att hålla koll på mina mediciner";
  const technicalResult = await translator.translateSeniorRequestToTechnical(testRequest);
  
  console.log('✅ Technical translation result:');
  console.log(`- Success: ${technicalResult.success}`);
  console.log(`- Confidence: ${Math.round(technicalResult.confidence * 100)}%`);
  console.log(`- Title: ${(technicalResult.result as any).title}`);
  console.log(`- Target Agent: ${(technicalResult.result as any).targetAgent}`);
  console.log(`- Requirements count: ${(technicalResult.result as any).requirements?.length || 0}`);
  
  // Test 2: Technical response to senior-friendly language
  console.log('\n📝 Test 2: Technical response to senior-friendly language');
  const technicalResponse = "Application created successfully. Database initialized. API endpoints configured.";
  const seniorResult = await translator.translateTechnicalResponseToSenior(
    technicalResponse, 
    testRequest
  );
  
  console.log('✅ Senior translation result:');
  console.log(`- Success: ${seniorResult.success}`);
  console.log(`- Confidence: ${Math.round(seniorResult.confidence * 100)}%`);
  console.log(`- Message: ${(seniorResult.result as any).message}`);
  console.log(`- Tone: ${(seniorResult.result as any).tone}`);
  console.log(`- Next steps: ${(seniorResult.result as any).nextSteps?.join(', ') || 'None'}`);
  
  // Test 3: Built-in test method
  console.log('\n📝 Test 3: Built-in test method');
  const builtInTest = await translator.testTranslation("Hjälp mig att organisera mina familjefoton");
  
  console.log('✅ Built-in test results:');
  console.log(`- To Technical Success: ${builtInTest.toTechnical.success}`);
  console.log(`- Back to Senior Success: ${builtInTest.backToSenior.success}`);
  console.log(`- Overall Confidence: ${Math.round((builtInTest.toTechnical.confidence + builtInTest.backToSenior.confidence) / 2 * 100)}%`);
  
  console.log('\n🎉 SeniorTranslator tests completed successfully!');
  
  return {
    allTestsPassed: technicalResult.success && seniorResult.success && builtInTest.toTechnical.success && builtInTest.backToSenior.success,
    averageConfidence: (technicalResult.confidence + seniorResult.confidence + builtInTest.toTechnical.confidence + builtInTest.backToSenior.confidence) / 4
  };
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testSeniorTranslator()
    .then(result => {
      console.log(`\n📊 Final Results:`);
      console.log(`- All tests passed: ${result.allTestsPassed}`);
      console.log(`- Average confidence: ${Math.round(result.averageConfidence * 100)}%`);
      process.exit(result.allTestsPassed ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Test failed:', error);
      process.exit(1);
    });
}

export { testSeniorTranslator };