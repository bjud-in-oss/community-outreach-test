#!/usr/bin/env node
// Smart File Rename Tool - Avancerad namnändring med validering och automation

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class SmartFileRenamer {
  constructor() {
    this.v2Pattern = /^(\d+)_([^_]*[1-4][🟢🟡🔵⚫])_(.+)_(\d{6})_(.+)\.md$/;
    this.steeringFiles = [
      'product.md', 'tech.md', 'security.md', 
      'file-creation-guide.md', 'session-restart-guide.md'
    ];
  }

  // Huvudfunktion för smart namnändring
  async smartRename(oldPath, newName, options = {}) {
    console.log(`🔄 Smart File Rename: ${oldPath} → ${newName}`);
    
    try {
      // 1. Validera att filen existerar
      if (!fs.existsSync(oldPath)) {
        throw new Error(`Filen ${oldPath} existerar inte`);
      }

      // 2. Generera nytt fullständigt filnamn
      const newPath = this.generateNewPath(oldPath, newName, options);
      
      // 3. Validera V2-format om det är en .md fil
      if (newPath.endsWith('.md')) {
        this.validateV2Format(path.basename(newPath));
      }

      // 4. Kontrollera att nya namnet inte redan existerar
      if (fs.existsSync(newPath)) {
        throw new Error(`Filen ${newPath} existerar redan`);
      }

      // 5. Hitta alla filer som refererar till den gamla filen
      const references = await this.findReferences(oldPath);
      
      // 6. Utför namnändringen
      this.performRename(oldPath, newPath);
      
      // 7. Uppdatera alla referenser
      await this.updateReferences(references, oldPath, newPath);
      
      // 8. Uppdatera index-allokering om nödvändigt
      if (options.updateIndex) {
        await this.updateIndexAllocation(newPath);
      }

      console.log(`✅ Smart rename slutförd: ${newPath}`);
      return { success: true, newPath, updatedReferences: references.length };
      
    } catch (error) {
      console.error(`❌ Smart rename misslyckades: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // Generera nytt fullständigt sökväg
  generateNewPath(oldPath, newName, options) {
    const dir = path.dirname(oldPath);
    const oldBasename = path.basename(oldPath, '.md');
    
    // Om det är en V2-formaterad fil, behåll strukturen
    const v2Match = oldBasename.match(this.v2Pattern);
    if (v2Match && !options.ignoreV2) {
      const [, index, emojiStatus, , date, relations] = v2Match;
      return path.join(dir, `${index}_${emojiStatus}_${newName}_${date}_${relations}.md`);
    }
    
    // Annars, bara ändra namnet
    const ext = path.extname(oldPath);
    return path.join(dir, newName + ext);
  }

  // Validera V2-format
  validateV2Format(filename) {
    if (!filename.match(this.v2Pattern) && !this.steeringFiles.includes(filename)) {
      console.warn(`⚠️  Varning: ${filename} följer inte V2-format`);
    }
  }

  // Hitta alla filer som refererar till den gamla filen
  async findReferences(oldPath) {
    const references = [];
    const oldBasename = path.basename(oldPath);
    const oldNameWithoutExt = path.basename(oldPath, path.extname(oldPath));
    
    // Sök i alla .md filer
    const mdFiles = this.getAllMdFiles();
    
    for (const file of mdFiles) {
      if (file === oldPath) continue;
      
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Sök efter olika typer av referenser
        const patterns = [
          oldBasename,                    // Fullständigt filnamn
          oldNameWithoutExt,             // Namn utan extension
          oldPath.replace(/\\/g, '/'),   // Full sökväg
          path.relative('.', oldPath).replace(/\\/g, '/') // Relativ sökväg
        ];
        
        for (const pattern of patterns) {
          if (content.includes(pattern)) {
            references.push({
              file,
              pattern,
              content: content
            });
            break; // En referens per fil räcker
          }
        }
      } catch (error) {
        console.warn(`⚠️  Kunde inte läsa ${file}: ${error.message}`);
      }
    }
    
    return references;
  }

  // Utför själva namnändringen
  performRename(oldPath, newPath) {
    try {
      // Använd PowerShell move på Windows
      const command = `move "${oldPath.replace(/\//g, '\\')}" "${newPath.replace(/\//g, '\\')}"`;
      execSync(command, { stdio: 'pipe' });
      console.log(`📁 Fil flyttad: ${oldPath} → ${newPath}`);
    } catch (error) {
      throw new Error(`Kunde inte byta namn på fil: ${error.message}`);
    }
  }

  // Uppdatera alla referenser
  async updateReferences(references, oldPath, newPath) {
    const oldBasename = path.basename(oldPath);
    const newBasename = path.basename(newPath);
    const oldNameWithoutExt = path.basename(oldPath, path.extname(oldPath));
    const newNameWithoutExt = path.basename(newPath, path.extname(newPath));
    
    for (const ref of references) {
      try {
        let updatedContent = ref.content;
        
        // Ersätt olika typer av referenser
        updatedContent = updatedContent.replace(
          new RegExp(this.escapeRegex(oldBasename), 'g'), 
          newBasename
        );
        updatedContent = updatedContent.replace(
          new RegExp(this.escapeRegex(oldNameWithoutExt), 'g'), 
          newNameWithoutExt
        );
        updatedContent = updatedContent.replace(
          new RegExp(this.escapeRegex(oldPath.replace(/\\/g, '/')), 'g'), 
          newPath.replace(/\\/g, '/')
        );
        
        fs.writeFileSync(ref.file, updatedContent);
        console.log(`🔗 Uppdaterade referenser i: ${ref.file}`);
      } catch (error) {
        console.warn(`⚠️  Kunde inte uppdatera referenser i ${ref.file}: ${error.message}`);
      }
    }
  }

  // Uppdatera index-allokering
  async updateIndexAllocation(newPath) {
    const indexGuide = '.kiro/steering/file-creation-guide.md';
    if (!fs.existsSync(indexGuide)) return;
    
    try {
      const content = fs.readFileSync(indexGuide, 'utf8');
      // Här skulle vi kunna uppdatera "Nästa Lediga Index" automatiskt
      console.log(`📊 Index-allokering borde uppdateras för: ${newPath}`);
    } catch (error) {
      console.warn(`⚠️  Kunde inte uppdatera index-allokering: ${error.message}`);
    }
  }

  // Hjälpfunktioner
  getAllMdFiles() {
    const files = [];
    
    function scanDir(dir) {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDir(fullPath);
        } else if (item.endsWith('.md')) {
          files.push(fullPath);
        }
      }
    }
    
    scanDir('.');
    return files;
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Kommandorad interface
  static async cli() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
      console.log(`
🔧 Smart File Rename Tool

Användning:
  node scripts/smart-file-rename.js <gammal-fil> <nytt-namn> [options]

Exempel:
  node scripts/smart-file-rename.js .kiro/steering/product.md product-processes
  node scripts/smart-file-rename.js 01_🎯1🟢_MASTER_PLAN.md MASTER_INTEGRATION_PLAN --update-index

Options:
  --update-index    Uppdatera index-allokering
  --ignore-v2       Ignorera V2-format validering
      `);
      return;
    }

    const [oldPath, newName] = args;
    const options = {
      updateIndex: args.includes('--update-index'),
      ignoreV2: args.includes('--ignore-v2')
    };

    const renamer = new SmartFileRenamer();
    const result = await renamer.smartRename(oldPath, newName, options);
    
    if (result.success) {
      console.log(`\n🎉 Smart rename slutförd!`);
      console.log(`📁 Ny fil: ${result.newPath}`);
      console.log(`🔗 Uppdaterade ${result.updatedReferences} referenser`);
    } else {
      console.error(`\n❌ Smart rename misslyckades: ${result.error}`);
      process.exit(1);
    }
  }
}

// Kör CLI om scriptet körs direkt
SmartFileRenamer.cli().catch(console.error);

export default SmartFileRenamer;