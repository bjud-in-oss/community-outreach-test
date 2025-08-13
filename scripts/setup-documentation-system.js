#!/usr/bin/env node

/**
 * Documentation System Setup - Steg 1A-1C Implementation
 * Automatiserad setup för Context7, Gemini CLI och dokumentationsinsamling
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class DocumentationSystemSetup {
  constructor() {
    this.setupLog = [];
    // Uppdaterad dokumentationslista baserad på Master Plan 2.0 strategisk komponentanalys
    this.criticalUrls = [
      // === GRUNDLÄGGANDE AGENT-RAMVERK ===
      {
        url: 'https://docs.langchain.com/docs/',
        priority: 'critical',
        category: 'agent-framework',
        relevance: 'karn-agent',
        description: 'LangChain: Kärnan i agentens logik och orkestrering.',
        rationale: 'Orkestreringsmotorn för att kedja ihop anrop, hantera komplex logik och integrera verktyg'
      },
      {
        url: 'https://docs.llamaindex.ai/en/stable/',
        priority: 'critical',
        category: 'memory-framework',
        relevance: 'both-agents',
        description: 'LlamaIndex: Grunden för agentens minne och RAG-förmåga.',
        rationale: 'Specialiserat på RAG för att indexera och hämta information från dokument'
      },
      
      // === KÄRNVERKTYG & LLM-LEVERANTÖRER ===
      {
        url: 'https://github.com/google-gemini/gemini-cli',
        priority: 'critical',
        category: 'gemini-cli-core',
        relevance: 'karn-agent',
        description: 'Gemini CLI: Förstå grundkapabiliteterna i Googles CLI-verktyg.',
        rationale: 'Arbetshästen för kärn-agenten - kodgenerering, planering, dokumentanalys'
      },
      {
        url: 'https://github.com/google-gemini/gemini-cli/blob/main/docs/core/tools-api.md',
        priority: 'critical',
        category: 'gemini-cli-tools',
        relevance: 'karn-agent',
        description: 'Gemini CLI Tools: Specifikt vilka inbyggda verktyg som finns.',
        rationale: 'Förstå WebFetchTool och andra verktyg för integration'
      },
      {
        url: 'https://groq.com/docs/',
        priority: 'critical',
        category: 'llm-provider',
        relevance: 'medveten-agent',
        description: 'Groq API: Förstå hur den snabba emotionella motorn kan anropas.',
        rationale: 'Extremt låg latens för empatiska reaktioner på frustration/oro i realtid'
      },
      
      // === INFRASTRUKTUR & HOSTING (Kritiska saknade delar) ===
      {
        url: 'https://supabase.com/docs',
        priority: 'critical',
        category: 'infrastructure',
        relevance: 'karn-agent',
        description: 'Supabase: Förstå hur vi hanterar användare, databaser och fillagring.',
        rationale: 'PostgreSQL-databas, autentisering och fillagring med generös gratisnivå'
      },
      {
        url: 'https://vercel.com/docs',
        priority: 'critical',
        category: 'infrastructure',
        relevance: 'both-agents',
        description: 'Vercel: Förstå hur vi hostar och driftsätter vår applikation.',
        rationale: 'Hostar frontend (medvetna agenten) och backend-logik (kärn-agentens API-endpoints)'
      },
      
      // === MCP INTEGRATION ===
      {
        url: 'https://modelcontextprotocol.io/examples',
        priority: 'critical',
        category: 'mcp-integration',
        relevance: 'both-agents',
        description: 'MCP examples och patterns',
        rationale: 'Förstå hur MCP servers integreras för verktygshantering'
      },
      {
        url: 'https://github.com/upstash/context7',
        priority: 'critical',
        category: 'memory-system',
        relevance: 'both-agents',
        description: 'Context7 för dokumentationshantering och minne',
        rationale: 'Dokumentationshantering och minne utan hallucinationer'
      },
      
      // === SPECIALIST-VERKTYG & FRAMTIDA TEKNIK ===
      {
        url: 'https://github.com/huggingface/smolagents',
        priority: 'high',
        category: 'specialist-tool',
        relevance: 'karn-agent',
        description: 'Smolagents: Utvärdera som ett alternativt kodgenereringsverktyg.',
        rationale: 'Komplement till Jules för enklare, välavgränsade uppgifter'
      },
      {
        url: 'https://mcpui.dev/guide/introduction',
        priority: 'high',
        category: 'ui-framework',
        relevance: 'medveten-agent',
        description: 'MCP-UI: Research för framtida UI-utveckling i Fas 2/3.',
        rationale: 'Strategisk satsning på dynamiska, AI-genererade gränssnitt'
      },
      
      // === DEVOPS & AUTOMATISERING ===
      {
        url: 'https://github.com/google-github-actions/run-gemini-cli',
        priority: 'medium',
        category: 'devops',
        relevance: 'karn-agent',
        description: 'GitHub Actions for Gemini: Förstå hur vi kan automatisera DevOps-flöden.',
        rationale: 'Automatiserade arbetsflöden för kontinuerlig drift'
      }
    ];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
    console.log(logEntry);
    this.setupLog.push(logEntry);
  }

  async createDirectoryStructure() {
    this.log('Skapar directory struktur för dokumentationssystem...');
    
    const directories = [
      'docs/research',
      'docs/research/gemini-cli',
      'docs/research/mcp-servers', 
      'docs/research/ui-frameworks',
      'docs/research/integration-patterns',
      'docs/architecture',
      'docs/implementation',
      'src/consciousness/conscious-agent',
      'src/consciousness/unconscious-agent',
      'src/consciousness/communication-bridge',
      'src/integrations/jules-integration',
      'src/integrations/gemini-cli',
      'src/integrations/mcp-servers',
      'src/memory-systems/llamaindex-integration',
      'src/memory-systems/langchain-integration',
      'src/memory-systems/context7-integration',
      'src/ui-components/senior-interface',
      'src/ui-components/mcp-ui-components',
      'tests/consciousness-tests',
      'tests/integration-tests',
      'tests/senior-user-tests'
    ];

    for (const dir of directories) {
      try {
        await fs.mkdir(dir, { recursive: true });
        this.log(`✅ Skapade directory: ${dir}`);
      } catch (error) {
        this.log(`❌ Misslyckades skapa directory ${dir}: ${error.message}`, 'error');
      }
    }
  }

  async setupMCPConfiguration() {
    this.log('Skapar MCP server konfiguration...');
    
    const mcpConfig = {
      mcpServers: {
        "context7": {
          "command": "uvx",
          "args": ["upstash/context7@latest"],
          "env": {
            "UPSTASH_REDIS_REST_URL": "your_redis_url_here",
            "UPSTASH_REDIS_REST_TOKEN": "your_redis_token_here",
            "FASTMCP_LOG_LEVEL": "ERROR"
          },
          "disabled": false,
          "autoApprove": ["store", "query", "search", "list"]
        },
        "fetch": {
          "command": "uvx",
          "args": ["modelcontextprotocol/fetch@latest"],
          "env": {
            "FASTMCP_LOG_LEVEL": "ERROR"
          },
          "disabled": false,
          "autoApprove": ["fetch"]
        },
        "filesystem": {
          "command": "uvx", 
          "args": ["modelcontextprotocol/filesystem@latest"],
          "env": {
            "FASTMCP_LOG_LEVEL": "ERROR"
          },
          "disabled": false,
          "autoApprove": ["read_file", "write_file", "list_directory"]
        },
        "memory": {
          "command": "uvx",
          "args": ["modelcontextprotocol/memory@latest"],
          "env": {
            "FASTMCP_LOG_LEVEL": "ERROR"
          },
          "disabled": false,
          "autoApprove": ["store_memory", "retrieve_memory", "search_memory"]
        }
      }
    };

    try {
      // Skapa .kiro/settings directory om det inte finns
      await fs.mkdir('.kiro/settings', { recursive: true });
      
      // Skriv MCP konfiguration
      await fs.writeFile(
        '.kiro/settings/mcp.json',
        JSON.stringify(mcpConfig, null, 2)
      );
      
      this.log('✅ MCP konfiguration skapad i .kiro/settings/mcp.json');
      this.log('⚠️  VIKTIGT: Uppdatera UPSTASH_REDIS_REST_URL och UPSTASH_REDIS_REST_TOKEN');
    } catch (error) {
      this.log(`❌ Misslyckades skapa MCP konfiguration: ${error.message}`, 'error');
    }
  }

  async createDocumentationLoader() {
    this.log('Skapar dokumentationsladdare...');
    
    const loaderCode = `
/**
 * Documentation Loader för Dubbelt Medvetandesystem
 * Automatiserad inläsning och analys av kritisk dokumentation
 */

class DocumentationLoader {
  constructor() {
    this.loadedDocuments = new Map();
    this.analysisResults = new Map();
  }

  async loadCriticalDocumentation() {
    console.log('🚀 Börjar ladda kritisk dokumentation...');
    
    const criticalUrls = ${JSON.stringify(this.criticalUrls, null, 6)};
    
    for (const doc of criticalUrls) {
      try {
        console.log(\`📖 Laddar: \${doc.description}\`);
        await this.processDocument(doc);
        console.log(\`✅ Klart: \${doc.url}\`);
      } catch (error) {
        console.error(\`❌ Misslyckades ladda \${doc.url}: \${error.message}\`);
      }
    }
    
    await this.generateAnalysisReport();
  }

  async processDocument(docInfo) {
    // Simulera dokumentladdning (ersätt med faktisk MCP fetch)
    const mockContent = \`# \${docInfo.description}
    
URL: \${docInfo.url}
Kategori: \${docInfo.category}
Relevans: \${docInfo.relevance}
Prioritet: \${docInfo.priority}

[Dokumentinnehåll skulle laddas här med MCP fetch tool]
\`;

    // Analysera för dubbelt medvetandesystem
    const analysis = await this.analyzeForDualConsciousness(mockContent, docInfo);
    
    // Lagra resultat
    this.loadedDocuments.set(docInfo.url, mockContent);
    this.analysisResults.set(docInfo.url, analysis);
    
    // Spara till fil
    const filename = \`docs/research/\${docInfo.category}/\${this.sanitizeFilename(docInfo.url)}.md\`;
    await this.saveDocumentAnalysis(filename, docInfo, mockContent, analysis);
  }

  async analyzeForDualConsciousness(content, docInfo) {
    return {
      consciousRelevance: {
        seniorFriendlyAspects: this.extractSeniorFriendlyInfo(content),
        communicationPatterns: this.identifyCommunicationPatterns(content),
        empathyOpportunities: this.findEmpathyOpportunities(content)
      },
      unconsciousRelevance: {
        technicalCapabilities: this.extractTechnicalInfo(content),
        integrationPoints: this.identifyIntegrationPoints(content),
        implementationComplexity: this.assessComplexity(content)
      },
      dualSystemIntegration: {
        guardrailRequirements: this.identifyGuardrailNeeds(content),
        memorySystemImpact: this.assessMemoryImpact(content),
        reactChainIntegration: this.evaluateReactIntegration(content)
      },
      costImplications: {
        freeTierLimitations: this.analyzeCostImplications(content),
        scalabilityFactors: this.assessScalability(content),
        churchBudgetFit: this.evaluateChurchAffordability(content)
      },
      implementationPriority: this.assessImplementationPriority(content, docInfo)
    };
  }

  extractSeniorFriendlyInfo(content) {
    // Identifiera aspekter som kan göras senior-vänliga
    return {
      naturalLanguageSupport: content.includes('natural language'),
      visualComponents: content.includes('visual') || content.includes('UI'),
      simplicityFactors: content.includes('simple') || content.includes('easy')
    };
  }

  extractTechnicalInfo(content) {
    // Identifiera tekniska kapaciteter
    return {
      apiEndpoints: this.findAPIReferences(content),
      integrationMethods: this.findIntegrationMethods(content),
      technicalRequirements: this.findTechnicalRequirements(content)
    };
  }

  identifyIntegrationPoints(content) {
    return {
      julesCompatibility: content.includes('jules') || content.includes('github'),
      mcpServerSupport: content.includes('MCP') || content.includes('server'),
      geminiCliIntegration: content.includes('gemini') || content.includes('cli')
    };
  }

  assessImplementationPriority(content, docInfo) {
    let priority = 0;
    
    if (docInfo.priority === 'critical') priority += 10;
    if (docInfo.priority === 'high') priority += 7;
    if (docInfo.relevance === 'both-agents') priority += 5;
    if (content.includes('free') || content.includes('open source')) priority += 3;
    
    return {
      score: priority,
      phase: priority >= 15 ? 'Fas 0' : priority >= 10 ? 'Fas 1' : 'Fas 2',
      reasoning: \`Prioritet baserad på: \${docInfo.priority} prioritet, \${docInfo.relevance} relevans\`
    };
  }

  sanitizeFilename(url) {
    return url.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);
  }

  async saveDocumentAnalysis(filename, docInfo, content, analysis) {
    const analysisDocument = \`# \${docInfo.description}

## Dokumentinformation
- **URL**: \${docInfo.url}
- **Kategori**: \${docInfo.category}
- **Relevans**: \${docInfo.relevance}
- **Prioritet**: \${docInfo.priority}

## Analys för Dubbelt Medvetandesystem

### Medveten Agent Relevans
\${JSON.stringify(analysis.consciousRelevance, null, 2)}

### Omedveten Agent Relevans
\${JSON.stringify(analysis.unconsciousRelevance, null, 2)}

### Integration med Dubbelt System
\${JSON.stringify(analysis.dualSystemIntegration, null, 2)}

### Kostnadspåverkan
\${JSON.stringify(analysis.costImplications, null, 2)}

### Implementation Prioritet
\${JSON.stringify(analysis.implementationPriority, null, 2)}

## Originalinnehåll
\${content}
\`;

    try {
      const fs = require('fs').promises;
      await fs.mkdir(require('path').dirname(filename), { recursive: true });
      await fs.writeFile(filename, analysisDocument);
    } catch (error) {
      console.error(\`Misslyckades spara \${filename}: \${error.message}\`);
    }
  }

  async generateAnalysisReport() {
    console.log('📊 Genererar analysrapport...');
    
    const report = \`# Dokumentationsanalys Rapport
    
## Sammanfattning
Totalt \${this.loadedDocuments.size} dokument analyserade för dubbelt medvetandesystem.

## Prioritetsordning för Implementation
\${Array.from(this.analysisResults.entries())
  .sort(([,a], [,b]) => b.implementationPriority.score - a.implementationPriority.score)
  .map(([url, analysis]) => \`- \${url} (Prioritet: \${analysis.implementationPriority.score}, Fas: \${analysis.implementationPriority.phase})\`)
  .join('\\n')}

## Nästa Steg
1. Implementera högst prioriterade integrationer
2. Sätt upp MCP servers för kritiska funktioner  
3. Börja med grundläggande medveten/omedveten kommunikation

Genererad: \${new Date().toISOString()}
\`;

    await fs.writeFile('docs/research/analysis-report.md', report);
    console.log('✅ Analysrapport sparad i docs/research/analysis-report.md');
  }

  // Hjälpmetoder för analys
  findAPIReferences(content) { return []; }
  findIntegrationMethods(content) { return []; }
  findTechnicalRequirements(content) { return []; }
  identifyCommunicationPatterns(content) { return {}; }
  findEmpathyOpportunities(content) { return []; }
  identifyGuardrailNeeds(content) { return []; }
  assessMemoryImpact(content) { return {}; }
  evaluateReactIntegration(content) { return {}; }
  analyzeCostImplications(content) { return {}; }
  assessScalability(content) { return {}; }
  evaluateChurchAffordability(content) { return {}; }
  assessComplexity(content) { return 'medium'; }
}

// Export för användning
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DocumentationLoader;
}

// Kör om anropad direkt
if (require.main === module) {
  const loader = new DocumentationLoader();
  loader.loadCriticalDocumentation().catch(console.error);
}
`;

    try {
      await fs.writeFile('docs/research/documentation-loader.js', loaderCode);
      this.log('✅ Dokumentationsladdare skapad i docs/research/documentation-loader.js');
    } catch (error) {
      this.log(`❌ Misslyckades skapa dokumentationsladdare: ${error.message}`, 'error');
    }
  }

  async createPackageJson() {
    this.log('Skapar package.json för dokumentationssystem...');
    
    const packageJson = {
      name: "community-outreach-documentation-system",
      version: "1.0.0",
      description: "Dokumentationssystem för DIY Coding Platform for Seniors",
      main: "docs/research/documentation-loader.js",
      scripts: {
        "load-docs": "node docs/research/documentation-loader.js",
        "setup-system": "node setup-documentation-system.js",
        "test-mcp": "echo 'Testing MCP servers...' && node -e 'console.log(\"MCP test placeholder\")'",
        "validate-docs": "echo 'Validating documentation...' && node -e 'console.log(\"Validation placeholder\")'"
      },
      dependencies: {
        "@upstash/context7": "^1.0.0",
        "llamaindex": "^0.3.0",
        "langchain": "^0.1.0"
      },
      devDependencies: {
        "jest": "^29.0.0",
        "nodemon": "^3.0.0"
      },
      keywords: [
        "ai",
        "seniors",
        "diy-coding",
        "gemini-cli",
        "mcp",
        "documentation"
      ],
      author: "Community Outreach Platform Team",
      license: "MIT"
    };

    try {
      await fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));
      this.log('✅ package.json skapad');
    } catch (error) {
      this.log(`❌ Misslyckades skapa package.json: ${error.message}`, 'error');
    }
  }

  async createSetupInstructions() {
    this.log('Skapar setup-instruktioner...');
    
    const instructions = `# Setup Instruktioner - Dokumentationssystem

## Steg 1: Grundläggande Setup

### 1A. Installera Dependencies
\`\`\`bash
npm install
\`\`\`

### 1B. Konfigurera Environment Variables
Skapa en \`.env\` fil:
\`\`\`
GEMINI_API_KEY=your_gemini_api_key_here
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
GITHUB_TOKEN=your_github_token
\`\`\`

### 1C. Installera UV för MCP Servers
\`\`\`bash
# På macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# På Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
\`\`\`

## Steg 2: Testa MCP Servers

### 2A. Testa Context7
\`\`\`bash
uvx upstash/context7@latest --help
\`\`\`

### 2B. Testa Fetch MCP
\`\`\`bash
uvx modelcontextprotocol/fetch@latest --help
\`\`\`

## Steg 3: Ladda Dokumentation

### 3A. Kör Dokumentationsladdare
\`\`\`bash
npm run load-docs
\`\`\`

### 3B. Kontrollera Resultat
\`\`\`bash
ls -la docs/research/
cat docs/research/analysis-report.md
\`\`\`

## Steg 4: Validera Setup

### 4A. Testa MCP Integration
\`\`\`bash
npm run test-mcp
\`\`\`

### 4B. Validera Dokumentation
\`\`\`bash
npm run validate-docs
\`\`\`

## Nästa Steg

Efter framgångsrik setup:
1. Granska \`docs/research/analysis-report.md\`
2. Prioritera implementation baserat på analysresultat
3. Börja med Fas 1 implementation av medveten/omedveten agenter

## Felsökning

### Problem: MCP Server startar inte
- Kontrollera att UV är installerat: \`uv --version\`
- Kontrollera environment variables i \`.env\`

### Problem: Dokumentation laddas inte
- Kontrollera internetanslutning
- Verifiera API keys i \`.env\`

### Problem: Context7 anslutning misslyckas
- Kontrollera Upstash Redis credentials
- Testa anslutning manuellt
`;

    try {
      await fs.writeFile('SETUP_INSTRUCTIONS.md', instructions);
      this.log('✅ Setup-instruktioner skapade i SETUP_INSTRUCTIONS.md');
    } catch (error) {
      this.log(`❌ Misslyckades skapa setup-instruktioner: ${error.message}`, 'error');
    }
  }

  async saveSetupLog() {
    const logContent = this.setupLog.join('\n');
    try {
      await fs.writeFile('setup-log.txt', logContent);
      this.log('✅ Setup-logg sparad i setup-log.txt');
    } catch (error) {
      console.error(`❌ Misslyckades spara setup-logg: ${error.message}`);
    }
  }

  async runFullSetup() {
    this.log('🚀 Startar komplett dokumentationssystem setup...');
    
    try {
      await this.createDirectoryStructure();
      await this.setupMCPConfiguration();
      await this.createDocumentationLoader();
      await this.createPackageJson();
      await this.createSetupInstructions();
      await this.saveSetupLog();
      
      this.log('🎉 Dokumentationssystem setup komplett!');
      this.log('📖 Läs SETUP_INSTRUCTIONS.md för nästa steg');
      
    } catch (error) {
      this.log(`❌ Setup misslyckades: ${error.message}`, 'error');
      throw error;
    }
  }
}

// Kör setup om scriptet anropas direkt
if (require.main === module) {
  const setup = new DocumentationSystemSetup();
  setup.runFullSetup().catch(console.error);
}

module.exports = DocumentationSystemSetup;