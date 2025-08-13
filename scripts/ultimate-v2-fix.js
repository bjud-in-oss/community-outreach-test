#!/usr/bin/env node
// Ultimate V2 format fix - handles all remaining issues

import fs from 'fs';

function fixAllV2Issues() {
  console.log('🔧 Ultimate V2 format fix...');
  
  const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.startsWith('README') && !file.startsWith('CONTRIBUTING') && !file.startsWith('AGENTS'));
  
  const v2Pattern = /^\d+_[^_]*[1-4][🟢🟡🔵⚫]_/;
  const nonCompliantFiles = files.filter(file => !v2Pattern.test(file));
  
  console.log(`Found ${nonCompliantFiles.length} files needing V2 fixes:`);
  
  let fixed = 0;
  
  for (const file of nonCompliantFiles) {
    try {
      let newName = file;
      
      // Remove any remaining encoding issues
      newName = newName.replace(/�/g, '');
      
      // Fix double status issues (like 1🟢1🟢 -> 1🟢, 3🔵3🔵 -> 3🔵, etc.)
      newName = newName.replace(/([1-4][🟢🟡🔵⚫])[1-4][🟢🟡🔵⚫]/g, '$1');
      
      // Fix mixed status issues (like 2🟡1🟢 -> 1🟢, 3🔵1🟢 -> 3🔵, etc.)
      newName = newName.replace(/[1-4][🟢🟡🔵⚫]([1-4][🟢🟡🔵⚫])/g, '$1');
      
      // Fix old emoji format (🟢 without number -> 1🟢)
      newName = newName.replace(/([^1-4])🟢_/, '$11🟢_');
      newName = newName.replace(/([^1-4])🟡_/, '$12🟡_');
      newName = newName.replace(/([^1-4])🔵_/, '$13🔵_');
      newName = newName.replace(/([^1-4])⚫_/, '$14⚫_');
      
      // Fix missing status after emoji (like 🎯_ -> 🎯1🟢_)
      newName = newName.replace(/([🎯📋🤖🎛️🧪🌉⚙️🎭🔧🧠🏛️🌍👨‍👩‍👧‍👦📊🎨💝👥💡📝🗑️])_/, '$11🟢_');
      
      // Fix specific problematic patterns
      if (newName.includes('990_🗑️1🟢_')) {
        newName = newName.replace('990_🗑️1🟢_', '990_🗑️4⚫_');
      }
      
      // Fix files that still have encoding issues in the middle
      if (newName.includes('999_🗑️4⚫_REALTIME_UPDATES_�_')) {
        newName = newName.replace('999_🗑️4⚫_REALTIME_UPDATES_�_', '999_🗑️4⚫_REALTIME_UPDATES_');
      }
      
      if (newName !== file) {
        console.log(`🔄 ${file}`);
        console.log(`   → ${newName}`);
        
        // Read content
        const content = fs.readFileSync(file, 'utf8');
        
        // Write to new filename
        fs.writeFileSync(newName, content);
        
        // Delete old file
        fs.unlinkSync(file);
        
        fixed++;
        console.log(`✅ Fixed: ${newName}`);
      } else {
        console.log(`⚠️  Could not fix: ${file}`);
      }
    } catch (error) {
      console.error(`❌ Failed to fix ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Ultimate fix completed! Fixed ${fixed} files.`);
  
  // Run verification again
  console.log('\n🔍 Re-verifying V2 compliance...');
  const allFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.startsWith('README') && !file.startsWith('CONTRIBUTING') && !file.startsWith('AGENTS'));
  
  let compliant = 0;
  let nonCompliant = 0;
  
  for (const file of allFiles) {
    if (v2Pattern.test(file)) {
      compliant++;
    } else {
      nonCompliant++;
      console.log(`❌ Still non-compliant: ${file}`);
    }
  }
  
  console.log(`\n📊 Final Results:`);
  console.log(`✅ V2 Compliant: ${compliant}`);
  console.log(`❌ Non-compliant: ${nonCompliant}`);
  console.log(`📈 Compliance rate: ${Math.round((compliant/(compliant+nonCompliant))*100)}%`);
  
  if (nonCompliant === 0) {
    console.log(`\n🎉 ALL FILES ARE NOW V2 COMPLIANT! 🎉`);
  }
}

fixAllV2Issues();