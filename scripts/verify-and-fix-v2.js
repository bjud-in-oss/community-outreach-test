#!/usr/bin/env node
// Verify V2 format compliance with smart auto-fix capability

import fs from 'fs';
import SmartFileRenamer from './smart-file-rename.js';

class V2FormatValidator {
  constructor() {
    this.renamer = new SmartFileRenamer();
    this.steeringFiles = [
      'product.md', 'tech.md', 'security.md', 
      'file-creation-guide.md', 'session-restart-guide.md'
    ];
  }

  // Huvudfunktion för validering och fix
  async validateAndFix(options = {}) {
    console.log('🔍 V2 Format Validation with Smart Auto-Fix...');
    
    const files = this.getAllMdFiles();
    const results = {
      compliant: [],
      nonCompliant: [],
      fixed: [],
      failed: []
    };

    console.log(`\n📋 Checking ${files.length} files:`);
    
    for (const file of files) {
      const compliance = this.checkV2Compliance(file);
      
      if (compliance.isCompliant) {
        results.compliant.push(file);
        console.log(`✅ ${file}`);
      } else {
        results.nonCompliant.push({ file, issues: compliance.issues });
        console.log(`❌ ${file}`);
        
        // Visa problem
        for (const issue of compliance.issues) {
          console.log(`   ${issue}`);
        }

        // Försök auto-fix om användaren vill
        if (options.autoFix && this.canAutoFix(compliance.issues)) {
          console.log(`   🔧 Attempting auto-fix...`);
          
          const fixResult = await this.attemptAutoFix(file, compliance.issues);
          if (fixResult.success) {
            results.fixed.push({ file, newFile: fixResult.newPath });
            console.log(`   ✅ Fixed: ${fixResult.newPath}`);
          } else {
            results.failed.push({ file, error: fixResult.error });
            console.log(`   ❌ Fix failed: ${fixResult.error}`);
          }
        }
        console.log('');
      }
    }

    this.printSummary(results, options);
    return results;
  }

  // Kontrollera V2-compliance för en fil
  checkV2Compliance(filename) {
    const issues = [];
    
    // Skip steering files - de har andra regler
    if (this.steeringFiles.includes(filename)) {
      return { isCompliant: true, issues: [] };
    }

    const parts = filename.split('_');
    
    // Grundläggande struktur
    if (parts.length < 5) {
      issues.push(`❌ Wrong structure. Expected: INDEX_EMOJI_STATUS_NAME_DATE_RELATIONS.md`);
      return { isCompliant: false, issues };
    }

    const [indexPart, emojiStatusPart, namePart, datePart, relationsPart] = parts;

    // Kontrollera index
    if (!/^\d+(\.\d+)?$/.test(indexPart)) {
      issues.push(`❌ Invalid index format: "${indexPart}". Should be number like "01" or "01.1"`);
    }

    // Kontrollera emoji+status
    const validStatuses = ['1🟢', '2🟡', '3🔵', '4⚫'];
    const hasValidStatus = validStatuses.some(status => emojiStatusPart.endsWith(status));
    
    if (!hasValidStatus) {
      issues.push(`❌ Missing or wrong status. Should end with: 1🟢, 2🟡, 3🔵, or 4⚫`);
      issues.push(`   Current: "${emojiStatusPart}"`);
    }

    // Kontrollera datum
    if (!/^\d{6}$/.test(datePart)) {
      issues.push(`❌ Invalid date format: "${datePart}". Should be YYMMDD like "240812"`);
    }

    // Kontrollera extension
    if (!filename.endsWith('.md')) {
      issues.push(`❌ Wrong file extension. Should end with .md`);
    }

    return { isCompliant: issues.length === 0, issues };
  }

  // Kontrollera om vi kan auto-fixa problemen
  canAutoFix(issues) {
    // Vi kan fixa vissa typer av problem automatiskt
    const fixablePatterns = [
      'Missing or wrong status',
      'Wrong structure',
      'Invalid date format'
    ];
    
    return issues.some(issue => 
      fixablePatterns.some(pattern => issue.includes(pattern))
    );
  }

  // Försök auto-fix
  async attemptAutoFix(filename, issues) {
    try {
      // Analysera filnamnet och försök generera ett korrekt V2-namn
      const suggestedName = this.generateV2Name(filename);
      
      if (!suggestedName || suggestedName === filename) {
        return { success: false, error: 'Could not generate valid V2 name' };
      }

      // Använd smart-file-rename för att fixa
      const result = await this.renamer.smartRename(filename, suggestedName, {
        ignoreV2: true, // Vi fixar V2-format själva
        updateIndex: false
      });

      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Generera korrekt V2-namn baserat på befintligt namn
  generateV2Name(filename) {
    const nameWithoutExt = filename.replace('.md', '');
    const parts = nameWithoutExt.split('_');
    
    if (parts.length < 2) return null;

    // Försök extrahera komponenter
    let index = parts[0];
    let emojiStatus = parts[1];
    let name = parts.slice(2).join('_');
    
    // Fixa index om nödvändigt
    if (!/^\d+(\.\d+)?$/.test(index)) {
      // Försök hitta nummer i början
      const match = filename.match(/^(\d+)/);
      index = match ? match[1] : '999'; // Fallback
    }

    // Fixa emoji+status
    const validStatuses = ['1🟢', '2🟡', '3🔵', '4⚫'];
    if (!validStatuses.some(status => emojiStatus.endsWith(status))) {
      // Försök inferera emoji och status
      const emoji = this.inferEmoji(filename);
      const status = this.inferStatus(filename);
      emojiStatus = emoji + status;
    }

    // Generera datum (dagens datum)
    const today = new Date();
    const date = `${String(today.getFullYear()).slice(-2)}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    
    // Generera relationer (enkel fallback)
    const relations = 'AUTO';

    // Sätt ihop namnet
    const newName = `${index}_${emojiStatus}_${name}_${date}_${relations}`;
    
    return newName;
  }

  // Inferera emoji från filnamn (återanvänd från smart-file-rename)
  inferEmoji(filename) {
    const lower = filename.toLowerCase();
    
    const emojiMap = {
      'master': '🎯', 'integration': '🎯', 'plan': '📋', 'action': '📋',
      'agent': '🤖', 'cockpit': '🎛️', 'senior': '🎛️',
      'test': '🧪', 'bridge': '🌉', 'communication': '🌉',
      'core': '⚙️', 'conscious': '🎭', 'setup': '🔧', 'infrastructure': '🔧',
      'memory': '🧠', 'context': '🧠', 'church': '🏛️', 'translation': '🌍',
      'family': '👨‍👩‍👧‍👦', 'tools': '📊', 'analysis': '📊',
      'ui': '🎨', 'design': '🎨', 'empathy': '💝', 'user': '👥',
      'concept': '💡', 'deprecated': '🗑️', 'archive': '🗑️'
    };

    for (const [keyword, emoji] of Object.entries(emojiMap)) {
      if (lower.includes(keyword)) {
        return emoji;
      }
    }
    
    return '📝'; // Default
  }

  // Inferera status från filnamn
  inferStatus(filename) {
    const lower = filename.toLowerCase();
    
    if (lower.includes('archive') || lower.includes('deprecated') || 
        lower.includes('v1_') || lower.includes('v2_') || lower.includes('v3_')) {
      return '4⚫';
    }
    
    if (lower.includes('skapas') || lower.includes('wip') || lower.includes('under')) {
      return '2🟡';
    }
    
    if (lower.includes('referens') || lower.includes('analysis') || lower.includes('background')) {
      return '3🔵';
    }
    
    return '1🟢'; // Default to active
  }

  // Hämta alla .md filer
  getAllMdFiles() {
    return fs.readdirSync('.')
      .filter(file => file.endsWith('.md'))
      .filter(file => !file.startsWith('README') && !file.startsWith('CONTRIBUTING') && !file.startsWith('AGENTS'));
  }

  // Skriv ut sammanfattning
  printSummary(results, options) {
    console.log(`\n📊 VALIDATION SUMMARY:`);
    console.log(`✅ Compliant: ${results.compliant.length}`);
    console.log(`❌ Non-compliant: ${results.nonCompliant.length}`);
    
    if (options.autoFix) {
      console.log(`🔧 Auto-fixed: ${results.fixed.length}`);
      console.log(`❌ Fix failed: ${results.failed.length}`);
    }
    
    const total = results.compliant.length + results.nonCompliant.length;
    const compliantAfterFix = results.compliant.length + results.fixed.length;
    console.log(`📈 Compliance rate: ${Math.round((compliantAfterFix/total)*100)}%`);
    
    if (results.nonCompliant.length === 0 || (options.autoFix && results.failed.length === 0)) {
      console.log(`\n🎉 ALL FILES ARE V2 COMPLIANT! 🎉`);
    } else if (options.autoFix) {
      console.log(`\n🔧 Auto-fix completed. ${results.failed.length} files still need manual attention.`);
    } else {
      console.log(`\n💡 Run with --auto-fix to attempt automatic corrections.`);
    }
  }

  // CLI interface
  static async cli() {
    const args = process.argv.slice(2);
    const options = {
      autoFix: args.includes('--auto-fix') || args.includes('-f'),
      verbose: args.includes('--verbose') || args.includes('-v')
    };

    if (args.includes('--help') || args.includes('-h')) {
      console.log(`
🔍 V2 Format Validator with Smart Auto-Fix

Usage:
  node scripts/verify-and-fix-v2.js [options]

Options:
  --auto-fix, -f    Automatically fix V2 format issues using smart-file-rename
  --verbose, -v     Show detailed information about each file
  --help, -h        Show this help message

Examples:
  node scripts/verify-and-fix-v2.js                    # Just validate
  node scripts/verify-and-fix-v2.js --auto-fix         # Validate and fix
  node scripts/verify-and-fix-v2.js -f -v              # Fix with verbose output
      `);
      return;
    }

    const validator = new V2FormatValidator();
    await validator.validateAndFix(options);
  }
}

// Kör CLI
V2FormatValidator.cli().catch(console.error);