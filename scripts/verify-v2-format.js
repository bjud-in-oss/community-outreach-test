#!/usr/bin/env node
// Verify V2 format compliance

import fs from 'fs';

function verifyV2Format() {
  console.log('🔍 Verifying V2 format compliance...');
  
  const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.startsWith('README') && !file.startsWith('CONTRIBUTING') && !file.startsWith('AGENTS'));
  
  // Check V2 compliance using endsWith for emoji compatibility
  function isV2Compliant(filename) {
    const parts = filename.split('_');
    if (parts.length < 3) return false;
    
    const indexPart = parts[0];
    const emojiStatusPart = parts[1];
    
    // Check index format
    if (!/^\d+(\.\d+)?$/.test(indexPart)) return false;
    
    // Check status format
    const validStatuses = ['1🟢', '2🟡', '3🔵', '4⚫'];
    return validStatuses.some(status => emojiStatusPart.endsWith(status));
  }
  
  let compliant = 0;
  let nonCompliant = 0;
  
  console.log('\n📋 Checking all files:');
  
  for (const file of files) {
    if (isV2Compliant(file)) {
      compliant++;
      console.log(`✅ ${file}`);
    } else {
      nonCompliant++;
      console.log(`❌ ${file}`);
      
      // Analyze what's wrong
      const parts = file.split('_');
      if (parts.length >= 3) {
        const indexPart = parts[0];
        const emojiStatusPart = parts[1];
        
        console.log(`   Index: "${indexPart}"`);
        console.log(`   Emoji+Status: "${emojiStatusPart}"`);
        
        // Check if it has the right status format using endsWith
        const validStatuses = ['1🟢', '2🟡', '3🔵', '4⚫'];
        const hasValidStatus = validStatuses.some(status => emojiStatusPart.endsWith(status));
        
        if (!hasValidStatus) {
          console.log(`   ❌ Missing or wrong status format. Should end with: 1🟢, 2🟡, 3🔵, or 4⚫`);
          console.log(`   📝 Current ending: "${emojiStatusPart.slice(-3)}"`);
        } else {
          const matchedStatus = validStatuses.find(status => emojiStatusPart.endsWith(status));
          console.log(`   ✅ Status format is correct: ${matchedStatus}`);
        }
      }
      console.log('');
    }
  }
  
  console.log(`\n📊 Results:`);
  console.log(`✅ V2 Compliant: ${compliant}`);
  console.log(`❌ Non-compliant: ${nonCompliant}`);
  console.log(`📈 Compliance rate: ${Math.round((compliant/(compliant+nonCompliant))*100)}%`);
  
  if (nonCompliant === 0) {
    console.log(`\n🎉 ALL FILES ARE V2 COMPLIANT! 🎉`);
  } else {
    console.log(`\n🔧 ${nonCompliant} files need fixing.`);
  }
}

verifyV2Format();