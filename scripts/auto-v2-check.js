#!/usr/bin/env node
// Auto V2 format checker - triggered by Kiro Agent Hook

import fs from 'fs';
import path from 'path';

function autoV2Check(changedFile) {
  console.log(`🔍 Auto V2 check triggered for: ${changedFile}`);
  
  // Skip if not a markdown file or excluded file
  if (!changedFile.endsWith('.md') || 
      changedFile.startsWith('README') || 
      changedFile.startsWith('CONTRIBUTING') || 
      changedFile.startsWith('AGENTS')) {
    console.log('⏭️  Skipping non-target file');
    return;
  }
  
  // Check V2 compliance
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
  
  const filename = path.basename(changedFile);
  
  if (isV2Compliant(filename)) {
    console.log(`✅ ${filename} is V2 compliant`);
    return;
  }
  
  console.log(`❌ ${filename} is NOT V2 compliant`);
  console.log(`📝 Expected format: INDEX_EMOJI+STATUS_NAME_DATE_RELATIONS.md`);
  console.log(`📝 Status should be: 1🟢 (Active), 2🟡 (Creating), 3🔵 (Reference), 4⚫ (Archive)`);
  
  // Suggest fix
  const parts = filename.split('_');
  if (parts.length >= 2) {
    const indexPart = parts[0];
    const emojiPart = parts[1];
    
    // Try to suggest a fix
    let suggestedFix = filename;
    
    // If emoji part doesn't end with status, suggest adding 1🟢
    const validStatuses = ['1🟢', '2🟡', '3🔵', '4⚫'];
    const hasValidStatus = validStatuses.some(status => emojiPart.endsWith(status));
    
    if (!hasValidStatus) {
      // Default to 1🟢 for new files
      const newEmojiPart = emojiPart + '1🟢';
      suggestedFix = filename.replace(emojiPart, newEmojiPart);
      console.log(`💡 Suggested fix: ${suggestedFix}`);
      console.log(`🔧 Run: node scripts/manual-v2-fix.js to apply fixes`);
    }
  }
  
  // Log to a file for review
  const logEntry = {
    timestamp: new Date().toISOString(),
    file: filename,
    compliant: false,
    suggestion: suggestedFix || 'Manual review needed'
  };
  
  const logFile = 'scripts/v2-compliance.log';
  const logLine = JSON.stringify(logEntry) + '\n';
  
  try {
    fs.appendFileSync(logFile, logLine);
    console.log(`📝 Logged to ${logFile} for review`);
  } catch (error) {
    console.error('Failed to write log:', error.message);
  }
}

// Get the changed file from command line args or environment
const changedFile = process.argv[2] || process.env.KIRO_CHANGED_FILE || '';

if (changedFile) {
  autoV2Check(changedFile);
} else {
  console.log('⚠️  No file specified for V2 check');
}