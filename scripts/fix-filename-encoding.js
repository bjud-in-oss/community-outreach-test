#!/usr/bin/env node
// Fix filename encoding issues from batch correction

import fs from 'fs';

async function fixEncodingIssues() {
  console.log('🔧 Fixing filename encoding issues...');
  
  // Get all .md files with encoding issues
  const files = fs.readdirSync('.')
    .filter(file => file.includes('�'))
    .filter(file => file.endsWith('.md'));
  
  console.log(`Found ${files.length} files with encoding issues:`);
  
  let fixed = 0;
  
  for (const file of files) {
    try {
      // Clean the filename by removing the weird characters
      let cleanName = file.replace(/�/g, '');
      
      // Fix double status issues (like 1🟢1🟢 -> 1🟢)
      cleanName = cleanName.replace(/([1-4][🟢🟡🔵⚫])[1-4][🟢🟡🔵⚫]/g, '$1');
      
      if (cleanName !== file) {
        console.log(`🔄 ${file}`);
        console.log(`   → ${cleanName}`);
        
        // Read content
        const content = fs.readFileSync(file, 'utf8');
        
        // Write to clean filename
        fs.writeFileSync(cleanName, content);
        
        // Delete old file
        fs.unlinkSync(file);
        
        fixed++;
        console.log(`✅ Fixed: ${cleanName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to fix ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Fixed ${fixed} files with encoding issues!`);
}

// Run the fix
fixEncodingIssues().catch(console.error);