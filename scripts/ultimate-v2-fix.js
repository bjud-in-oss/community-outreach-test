#!/usr/bin/env node
// Ultimate V2 format fix - handles all remaining issues

import fs from 'fs';

function fixAllV2Issues() {
  console.log('🔧 Ultimate V2 format fix...');
  
  const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    .filter(file => !file.startsWith('README') && !file.startsWith('CONTRIBUTING') && !file.startsWith('AGENTS'));
  
  console.log(`Found ${files.length} files to check:`);
  
  let fixed = 0;
  
  for (const file of files) {
    try {
      let newName = file;
      let needsFix = false;
      
      // Remove any remaining encoding issues
      if (newName.includes('�')) {
        newName = newName.replace(/�/g, '');
        needsFix = true;
      }
      
      // Fix double status issues (like 1🟢1🟢 -> 1🟢, 3🔵3🔵 -> 3🔵, etc.)
      if (newName.match(/[1-4][🟢🟡🔵⚫][1-4][🟢🟡🔵⚫]/)) {
        newName = newName.replace(/([1-4][🟢🟡🔵⚫])[1-4][🟢🟡🔵⚫]/g, '$1');
        needsFix = true;
      }
      
      // Fix mixed status issues (like 2🟡1🟢 -> 1🟢, 3🔵1🟢 -> 1🟢, etc.)
      // Priority: 1🟢 > 2🟡 > 3🔵 > 4⚫
      if (newName.match(/[2-4][🟢🟡🔵⚫]1🟢/)) {
        newName = newName.replace(/[2-4][🟢🟡🔵⚫](1🟢)/g, '$1');
        needsFix = true;
      } else if (newName.match(/[3-4][🟢🟡🔵⚫]2🟡/)) {
        newName = newName.replace(/[3-4][🟢🟡🔵⚫](2🟡)/g, '$1');
        needsFix = true;
      } else if (newName.match(/4⚫3🔵/)) {
        newName = newName.replace(/4⚫(3🔵)/g, '$1');
        needsFix = true;
      }
      
      // Fix emoji without status number (🟢 -> 1🟢, 🟡 -> 2🟡, etc.)
      if (newName.match(/[^1-4]🟢_/)) {
        newName = newName.replace(/([^1-4])🟢_/g, '$11🟢_');
        needsFix = true;
      }
      if (newName.match(/[^1-4]🟡_/)) {
        newName = newName.replace(/([^1-4])🟡_/g, '$12🟡_');
        needsFix = true;
      }
      if (newName.match(/[^1-4]🔵_/)) {
        newName = newName.replace(/([^1-4])🔵_/g, '$13🔵_');
        needsFix = true;
      }
      if (newName.match(/[^1-4]⚫_/)) {
        newName = newName.replace(/([^1-4])⚫_/g, '$14⚫_');
        needsFix = true;
      }
      
      // Fix missing status after emoji (like 🎯_ -> 🎯1🟢_)
      if (newName.match(/[🎯📋🤖🎛️🧪🌉⚙️🎭🔧🧠🏛️🌍👨‍👩‍👧‍👦📊🎨💝👥💡📝🗑️]_/)) {
        newName = newName.replace(/([🎯📋🤖🎛️🧪🌉⚙️🎭🔧🧠🏛️🌍👨‍👩‍👧‍👦📊🎨💝👥💡📝🗑️])_/g, '$11🟢_');
        needsFix = true;
      }
      
      // Fix specific problematic patterns
      if (newName.includes('990_🗑️1🟢_')) {
        newName = newName.replace('990_🗑️1🟢_', '990_🗑️4⚫_');
        needsFix = true;
      }
      
      // Fix files that still have encoding issues in the middle
      if (newName.includes('999_🗑️4⚫_REALTIME_UPDATES_�_')) {
        newName = newName.replace('999_🗑️4⚫_REALTIME_UPDATES_�_', '999_🗑️4⚫_REALTIME_UPDATES_');
        needsFix = true;
      }
      
      if (needsFix && newName !== file) {
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
      } else if (needsFix) {
        console.log(`⚠️  Could not fix: ${file} (no change generated)`);
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
  
  const v2Pattern = /^\d+_[^_]*[1-4][🟢🟡🔵⚫]_/;
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