#!/usr/bin/env node
// Final cleanup of remaining filename issues

import fs from 'fs';

async function finalCleanup() {
  console.log('🔧 Final filename cleanup...');
  
  const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    .filter(file => {
      // Find files that still need fixing
      return file.includes('�') || 
             file.match(/[1-4][🟢🟡🔵⚫][1-4][🟢🟡🔵⚫]/) || // Double status
             file.match(/^[A-Z_]+[1-4][🟢🟡🔵⚫]/) || // Missing index
             !file.match(/^\d+/) // No index at start
    });
  
  console.log(`Found ${files.length} files needing final cleanup:`);
  
  let fixed = 0;
  
  for (const file of files) {
    try {
      let cleanName = file;
      
      // Remove encoding issues
      cleanName = cleanName.replace(/�/g, '');
      
      // Fix double status (1🟢1🟢 -> 1🟢)
      cleanName = cleanName.replace(/([1-4][🟢🟡🔵⚫])[1-4][🟢🟡🔵⚫]/g, '$1');
      
      // Fix files without proper index
      if (cleanName.match(/^[A-Z_]+[1-4][🟢🟡🔵⚫]/)) {
        // These are the DOCUMENT_INTEGRATION etc files - give them proper index
        if (cleanName.startsWith('DOCUMENT_INTEGRATION')) {
          cleanName = '998_🗑️4⚫_' + cleanName.replace(/[1-4][🟢🟡🔵⚫]_?/, '_');
        } else if (cleanName.startsWith('REALTIME_UPDATES')) {
          cleanName = '999_🗑️4⚫_' + cleanName.replace(/[1-4][🟢🟡🔵⚫]_?/, '_');
        } else if (cleanName.startsWith('UPDATED_DOCUMENT')) {
          cleanName = '997_🗑️4⚫_' + cleanName.replace(/[1-4][🟢🟡🔵⚫]_?/, '_');
        }
      }
      
      // Fix remaining issues with 03_📋4⚫�_NEXT_IMMEDIATE_ACTIONS
      if (cleanName.includes('03_📋4⚫�_')) {
        cleanName = cleanName.replace('03_📋4⚫�_', '03_📋1🟢_');
      }
      
      // Fix 087_🔧4⚫�_FILENAME_CORRECTION_TOOLS
      if (cleanName.includes('087_🔧4⚫�_')) {
        cleanName = cleanName.replace('087_🔧4⚫�_', '087_🔧1🟢_');
      }
      
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
  
  console.log(`\n🎉 Final cleanup completed! Fixed ${fixed} files.`);
}

// Run the cleanup
finalCleanup().catch(console.error);