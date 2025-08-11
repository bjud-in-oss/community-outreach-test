// Test av Church Real-Time Translation System
// Kör: node test-church-translation.js

import ChurchRealtimeTranslator from './src/core-agent/tools/church-automation/real-time-translator.js';

async function testChurchTranslation() {
  console.log('🏛️ KYRKTJÄNST REALTIDSÖVERSÄTTNING TEST');
  console.log('=' * 50);
  
  // Konfigurera för test
  const config = {
    sourceLanguage: 'sv-SE',
    targetLanguages: ['en', 'de', 'fr', 'es', 'ar'], // Engelska, tyska, franska, spanska, arabiska
    zoomMeetingId: '123-456-789',
    tesiraIP: '192.168.1.100',
    costOptimization: true,
    premiumVoices: false // Börja med gratis röster
  };
  
  // Skapa translator
  const translator = new ChurchRealtimeTranslator(config);
  
  try {
    // Starta översättning
    await translator.startChurchTranslation();
    
    // Låt det köra i 30 sekunder för demo
    console.log('⏱️ Kör demo i 30 sekunder...');
    
    // Visa status var 5:e sekund
    const statusInterval = setInterval(() => {
      console.log('\n📊 Status:');
      console.log(translator.getSeniorStatus());
    }, 5000);
    
    // Stoppa efter 30 sekunder
    setTimeout(async () => {
      clearInterval(statusInterval);
      
      console.log('\n⏹️ Stoppar översättning...');
      const finalStats = await translator.stopTranslation();
      
      console.log('\n📈 SLUTSTATISTIK:');
      console.log(`   Tecken processade: ${finalStats.charactersProcessed}`);
      console.log(`   Månadskostnad: ${Math.round(finalStats.monthlyCost)} kr`);
      console.log(`   Språk aktiva: ${finalStats.languagesActive.length}`);
      console.log(`   Genomsnittlig latency: ${Math.round(finalStats.latencyMs)}ms`);
      console.log(`   Kvalitetspoäng: ${Math.round(finalStats.qualityScore)}%`);
      
      console.log('\n💡 KOSTNADSKALKYL:');
      const monthlyChars = finalStats.charactersProcessed * 30 * 4; // 30 dagar, 4 veckor
      const monthlyCost = (monthlyChars / 1000) * 0.16; // Google Cloud STT pricing
      console.log(`   Uppskattad månadskostnad: ${Math.round(monthlyCost)} kr`);
      console.log(`   Tecken per månad: ${monthlyChars.toLocaleString()}`);
      
      if (monthlyCost < 50) {
        console.log('   ✅ Mycket kostnadseffektivt!');
      } else if (monthlyCost < 200) {
        console.log('   ✅ Rimlig kostnad för kyrkan');
      } else {
        console.log('   ⚠️ Överväg kostnadsbesparing');
      }
      
    }, 30000);
    
  } catch (error) {
    console.error('❌ Fel vid test:', error);
  }
}

// Kör test
testChurchTranslation().catch(console.error);