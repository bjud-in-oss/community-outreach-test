#!/usr/bin/env node
// Senior Language Guard - checks for technical jargon

import fs from 'fs';
import path from 'path';

function checkSeniorLanguage(filePath) {
  console.log(`👵 Senior Language Guard checking: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log('⏭️  File not found, skipping');
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Technical jargon to avoid in user-facing text
  const technicalTerms = {
    'API': 'tjänst',
    'database': 'databas',
    'server': 'tjänst',
    'endpoint': 'anslutning',
    'JSON': 'data',
    'HTTP': 'webb',
    'URL': 'länk',
    'Git': 'versionshantering',
    'commit': 'spara',
    'push': 'skicka',
    'pull': 'hämta',
    'merge': 'sammanfoga',
    'repository': 'projekt',
    'branch': 'gren',
    'deploy': 'publicera',
    'build': 'bygga',
    'compile': 'bearbeta',
    'debug': 'felsöka',
    'error': 'fel',
    'exception': 'problem',
    'timeout': 'tidsgräns',
    'cache': 'mellanlagring',
    'cookie': 'webbdata',
    'session': 'besök',
    'authentication': 'inloggning',
    'authorization': 'behörighet'
  };
  
  const issues = [];
  
  // Check for technical terms in strings (user-facing text)
  const stringMatches = content.match(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g) || [];
  
  for (const match of stringMatches) {
    const text = match.slice(1, -1); // Remove quotes
    
    for (const [technical, friendly] of Object.entries(technicalTerms)) {
      if (text.toLowerCase().includes(technical.toLowerCase())) {
        issues.push({
          term: technical,
          suggestion: friendly,
          context: text,
          line: content.substring(0, content.indexOf(match)).split('\n').length
        });
      }
    }
  }
  
  if (issues.length === 0) {
    console.log('✅ No technical jargon found in user-facing text');
    return;
  }
  
  console.log(`⚠️  Found ${issues.length} potential senior-unfriendly terms:`);
  
  for (const issue of issues) {
    console.log(`\n📍 Line ${issue.line}:`);
    console.log(`   Technical: "${issue.term}"`);
    console.log(`   Suggestion: "${issue.suggestion}"`);
    console.log(`   Context: "${issue.context}"`);
  }
  
  // Log to file for review
  const logEntry = {
    timestamp: new Date().toISOString(),
    file: filePath,
    issues: issues.length,
    details: issues
  };
  
  const logFile = 'scripts/senior-language.log';
  const logLine = JSON.stringify(logEntry) + '\n';
  
  try {
    fs.appendFileSync(logFile, logLine);
    console.log(`\n📝 Logged to ${logFile} for review`);
  } catch (error) {
    console.error('Failed to write log:', error.message);
  }
  
  console.log('\n💡 Consider using senior-friendly alternatives in user-facing text');
}

// Get the changed file from command line args or environment
const changedFile = process.argv[2] || process.env.KIRO_CHANGED_FILE || '';

if (changedFile) {
  checkSeniorLanguage(changedFile);
} else {
  console.log('⚠️  No file specified for senior language check');
}