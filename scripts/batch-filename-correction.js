#!/usr/bin/env node
// Batch Filename Correction Script for Kiro
// Automatically corrects filenames to V2 format

import fs from 'fs';
import path from 'path';

// V2 Format Mapping
const statusMapping = {
  '🟢': '1🟢',
  '🟡': '2🟡', 
  '🔵': '3🔵',
  '⚫': '4⚫'
};

const emojiMapping = {
  // Core categories
  'master': '🎯', 'integration': '🎯', 'plan': '📋', 'action': '📋',
  'agent': '🤖', 'cockpit': '🎛️', 'senior': '🎛️',
  'test': '🧪', 'bridge': '🌉', 'communication': '🌉',
  'core': '⚙️', 'conscious': '🎭', 'setup': '🔧', 'infrastructure': '🔧',
  'memory': '🧠', 'context': '🧠', 'church': '🏛️', 'translation': '🌍',
  'family': '👨‍👩‍👧‍👦', 'tools': '📊', 'analysis': '📊',
  'ui': '🎨', 'design': '🎨', 'empathy': '💝', 'user': '👥',
  'concept': '💡', 'deprecated': '🗑️', 'archive': '🗑️'
};

function isV2Format(filename) {
  // Check if filename already follows V2 format: INDEX_EMOJI[1-4][🟢🟡🔵⚫]_NAME
  const v2Pattern = /^\d+_[^_]*[1-4][🟢🟡🔵⚫]_/;
  return v2Pattern.test(filename);
}

function inferEmoji(filename) {
  const lower = filename.toLowerCase();
  
  // Check for keywords in filename
  for (const [keyword, emoji] of Object.entries(emojiMapping)) {
    if (lower.includes(keyword)) {
      return emoji;
    }
  }
  
  // Default fallback
  return '📝'; // Context & History
}

function inferStatus(filename, content = '') {
  const lower = filename.toLowerCase();
  const lowerContent = content.toLowerCase();
  
  // Check for status indicators
  if (lower.includes('archive') || lower.includes('deprecated') || 
      lower.includes('v1_') || lower.includes('v2_') || lower.includes('v3_') ||
      lowerContent.includes('arkiv') || lowerContent.includes('deprecated')) {
    return '4⚫';
  }
  
  if (lower.includes('skapas') || lower.includes('wip') || lower.includes('under') ||
      lowerContent.includes('skapas') || lowerContent.includes('under utveckling')) {
    return '2🟡';
  }
  
  if (lower.includes('referens') || lower.includes('analysis') || lower.includes('background') ||
      lowerContent.includes('referens') || lowerContent.includes('bakgrund')) {
    return '3🔵';
  }
  
  // Default to active
  return '1🟢';
}

function generateV2Name(oldName) {
  // Skip if already V2 format
  if (isV2Format(oldName)) {
    return null;
  }
  
  const parts = oldName.split('_');
  if (parts.length < 3) return null;
  
  const index = parts[0];
  let emoji = '';
  let status = '';
  
  // Handle different old formats
  if (parts[1].match(/^[1-4]$/)) {
    // Format: INDEX_STATUS_NAME (missing emoji)
    status = parts[1] + '🟢'; // Default to green, will be corrected by inferStatus
    emoji = inferEmoji(oldName);
  } else if (parts[1].includes('🟢') || parts[1].includes('🟡') || 
             parts[1].includes('🔵') || parts[1].includes('⚫')) {
    // Format: INDEX_EMOJI+STATUS_NAME (old emoji format)
    const emojiPart = parts[1];
    const lastChar = emojiPart.slice(-1);
    
    if (statusMapping[lastChar]) {
      emoji = emojiPart.slice(0, -1);
      status = statusMapping[lastChar];
    } else {
      emoji = emojiPart;
      status = inferStatus(oldName);
    }
  } else {
    // Format: INDEX_EMOJI_NAME or other
    emoji = parts[1] || inferEmoji(oldName);
    status = inferStatus(oldName);
  }
  
  // Ensure emoji is present
  if (!emoji || emoji.length === 0) {
    emoji = inferEmoji(oldName);
  }
  
  // Reconstruct filename
  const nameStart = 2;
  const nameParts = parts.slice(nameStart);
  const newName = `${index}_${emoji}${status}_${nameParts.join('_')}`;
  
  return newName;
}

async function correctSingleFile(oldName, newName) {
  try {
    // Read content from old file
    const content = fs.readFileSync(oldName, 'utf8');
    
    // Infer better status from content
    const betterStatus = inferStatus(oldName, content);
    
    // Update newName with better status if needed
    const finalName = newName.replace(/[1-4][🟢🟡🔵⚫]/, betterStatus);
    
    // Write to new file
    fs.writeFileSync(finalName, content);
    
    // Delete old file
    fs.unlinkSync(oldName);
    
    return { success: true, finalName };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function correctFilenames() {
  console.log('🔧 Starting batch filename correction...');
  
  // Get all .md files in root
  const files = fs.readdirSync('.')
    .filter(file => file.endsWith('.md'))
    .filter(file => !isV2Format(file))
    .filter(file => !file.startsWith('README') && !file.startsWith('CONTRIBUTING'));
  
  console.log(`Found ${files.length} files to correct:`);
  files.forEach(file => console.log(`  - ${file}`));
  
  let corrected = 0;
  let failed = 0;
  const results = [];
  
  for (const file of files) {
    const newName = generateV2Name(file);
    
    if (newName && newName !== file) {
      console.log(`\n🔄 Processing: ${file}`);
      console.log(`   → ${newName}`);
      
      const result = await correctSingleFile(file, newName);
      
      if (result.success) {
        corrected++;
        console.log(`✅ Success: ${result.finalName}`);
        results.push({ old: file, new: result.finalName, status: 'success' });
      } else {
        failed++;
        console.log(`❌ Failed: ${result.error}`);
        results.push({ old: file, new: newName, status: 'failed', error: result.error });
      }
    } else {
      console.log(`⚠️  Skipped: ${file} (already V2 or couldn't generate name)`);
    }
  }
  
  console.log(`\n🎉 Batch correction completed!`);
  console.log(`📊 Results: ${corrected} corrected, ${failed} failed, ${files.length} total`);
  
  // Update progress file
  await updateProgressFile(corrected, failed, files.length, results);
  
  return { corrected, failed, total: files.length, results };
}

async function updateProgressFile(corrected, failed, total, results) {
  const progressFile = '085_📊1🟢_FILENAME_CORRECTION_PROGRESS_240812_084.md';
  
  if (fs.existsSync(progressFile)) {
    let content = fs.readFileSync(progressFile, 'utf8');
    
    // Create detailed update
    const timestamp = new Date().toISOString();
    const successRate = Math.round((corrected/total)*100);
    
    const updateText = `

## 🤖 AUTOMATED BATCH CORRECTION - ${timestamp}

### **Results:**
- ✅ **${corrected}/${total} files corrected successfully**
- ❌ **${failed} files failed**
- 📊 **Success rate:** ${successRate}%
- 🔧 **Tool used:** Kiro Steering + JavaScript automation

### **Detailed Results:**
${results.map(r => {
  if (r.status === 'success') {
    return `- ✅ \`${r.old}\` → \`${r.new}\``;
  } else {
    return `- ❌ \`${r.old}\` → Failed: ${r.error}`;
  }
}).join('\n')}

### **Updated Progress:**
- **Total files processed:** ${corrected + 10} (10 manual + ${corrected} automated)
- **Remaining files:** ~${40 - corrected} estimated
- **Completion rate:** ~${Math.round(((corrected + 10) / 50) * 100)}%
`;
    
    content += updateText;
    fs.writeFileSync(progressFile, content);
    console.log(`📝 Updated progress file: ${progressFile}`);
  }
}

// Export for module usage
export { 
  correctFilenames, 
  correctSingleFile, 
  generateV2Name, 
  isV2Format,
  inferEmoji,
  inferStatus
};

// Run if called directly
correctFilenames().catch(console.error);