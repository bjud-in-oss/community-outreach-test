#!/usr/bin/env node
// Verify all files follow V2 format

import fs from 'fs';

function verifyV2Format() {
  console.log('🔍 Verifying V2 format compliance...');
  
  const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.startsWith('README') && !file.startsWith('CONTRIBUTING') && !file.startsWith('AGENTS'));
  
  console.log(`Checking ${files.length} files...`);
  
  let compliant = 0;
  let nonCompliant = 0;
  
  const v2Pattern = /^\d+_[^_]*[1-4][🟢🟡🔵⚫]_/;
  
  for (const file of files) {
    if (v2Pattern.test(file)) {
      compliant++;
      console.log(`✅ ${file}`);
    } else {
      nonCompliant++;
      console.log(`❌ ${file}`);
    }
  }
  
  console.log(`\n📊 Results:`);
  console.log(`✅ V2 Compliant: ${compliant}`);
  console.log(`❌ Non-compliant: ${nonCompliant}`);
  console.log(`📈 Compliance rate: ${Math.round((compliant/(compliant+nonCompliant))*100)}%`);
  
  if (nonCompliant === 0) {
    console.log(`\n🎉 ALL FILES ARE V2 COMPLIANT! 🎉`);
  }
}

verifyV2Format();