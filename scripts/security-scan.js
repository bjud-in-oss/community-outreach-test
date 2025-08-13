#!/usr/bin/env node
// Security Scanner - checks for hardcoded secrets and vulnerabilities

import fs from 'fs';
import path from 'path';

function securityScan(filePath) {
  console.log(`🔒 Security Scanner checking: ${filePath}`);
  
  if (!fs.existsSync(filePath)) {
    console.log('⏭️  File not found, skipping');
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Patterns for common secrets
  const secretPatterns = {
    'GitHub Token': /ghp_[a-zA-Z0-9]{36}/g,
    'OpenAI API Key': /sk-[a-zA-Z0-9]{48}/g,
    'Private Key': /-----BEGIN (RSA )?PRIVATE KEY-----/g,
    'AWS Access Key': /AKIA[0-9A-Z]{16}/g,
    'Generic API Key': /api[_-]?key["\s]*[:=]["\s]*[a-zA-Z0-9]{20,}/gi,
    'Password': /password["\s]*[:=]["\s]*["'][^"']{8,}["']/gi,
    'Secret': /secret["\s]*[:=]["\s]*["'][^"']{8,}["']/gi
  };
  
  // Check for hardcoded secrets
  for (const [type, pattern] of Object.entries(secretPatterns)) {
    const matches = content.match(pattern);
    if (matches) {
      for (const match of matches) {
        // Skip if it's a template variable like ${GITHUB_TOKEN}
        if (match.includes('${') || match.includes('your_') || match.includes('example_')) {
          continue;
        }
        
        issues.push({
          type: 'SECRET',
          severity: 'HIGH',
          description: `Potential ${type} found`,
          match: match.substring(0, 20) + '...',
          line: content.substring(0, content.indexOf(match)).split('\n').length
        });
      }
    }
  }
  
  // Check for other security issues
  const securityIssues = {
    'Eval Usage': /eval\s*\(/g,
    'innerHTML Usage': /innerHTML\s*=/g,
    'Document.write': /document\.write\s*\(/gi,
    'Unsafe Regex': /new RegExp\([^)]*\$[^)]*\)/g
  };
  
  for (const [type, pattern] of Object.entries(securityIssues)) {
    const matches = content.match(pattern);
    if (matches) {
      for (const match of matches) {
        issues.push({
          type: 'VULNERABILITY',
          severity: 'MEDIUM',
          description: `Potentially unsafe ${type}`,
          match: match,
          line: content.substring(0, content.indexOf(match)).split('\n').length
        });
      }
    }
  }
  
  if (issues.length === 0) {
    console.log('✅ No security issues detected');
    return;
  }
  
  console.log(`🚨 Found ${issues.length} potential security issues:`);
  
  const highSeverity = issues.filter(i => i.severity === 'HIGH');
  const mediumSeverity = issues.filter(i => i.severity === 'MEDIUM');
  
  if (highSeverity.length > 0) {
    console.log(`\n🔴 HIGH SEVERITY (${highSeverity.length}):`);
    for (const issue of highSeverity) {
      console.log(`   Line ${issue.line}: ${issue.description}`);
      console.log(`   Match: ${issue.match}`);
    }
  }
  
  if (mediumSeverity.length > 0) {
    console.log(`\n🟡 MEDIUM SEVERITY (${mediumSeverity.length}):`);
    for (const issue of mediumSeverity) {
      console.log(`   Line ${issue.line}: ${issue.description}`);
    }
  }
  
  // Log to file for review
  const logEntry = {
    timestamp: new Date().toISOString(),
    file: filePath,
    issues: issues.length,
    highSeverity: highSeverity.length,
    mediumSeverity: mediumSeverity.length,
    details: issues
  };
  
  const logFile = 'scripts/security-scan.log';
  const logLine = JSON.stringify(logEntry) + '\n';
  
  try {
    fs.appendFileSync(logFile, logLine);
    console.log(`\n📝 Logged to ${logFile} for review`);
  } catch (error) {
    console.error('Failed to write log:', error.message);
  }
  
  if (highSeverity.length > 0) {
    console.log('\n🚨 HIGH SEVERITY ISSUES FOUND - REVIEW IMMEDIATELY!');
    process.exit(1);
  }
}

// Get the changed file from command line args or environment
const changedFile = process.argv[2] || process.env.KIRO_CHANGED_FILE || '';

if (changedFile) {
  securityScan(changedFile);
} else {
  console.log('⚠️  No file specified for security scan');
}