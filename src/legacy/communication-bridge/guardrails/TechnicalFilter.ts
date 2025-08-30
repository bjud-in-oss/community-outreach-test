// MASTER PLAN 2.0: TechnicalFilter.ts
// STATUS: Guardrails för att filtrera teknisk komplexitet från seniorer
// INTEGRATION: Communication Bridge - Säkerhet och informationsfiltrering
// ARCHITECTURE: Dual Consciousness Architecture compliant

/**
 * MASTER PLAN 2.0 Technical Filter
 * 
 * Guardrails system som säkerställer att:
 * - Teknisk jargong filtreras bort från senior-kommunikation
 * - Felmeddelanden översätts till senior-vänliga meddelanden
 * - Kod-relaterad information abstraheras bort
 * - Ingen teknisk terminologi läcker igenom till Conscious Agent
 */

export interface FilterResult {
  filtered: boolean;
  originalText: string;
  seniorFriendlyText: string;
  technicalTermsRemoved: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  explanation: string;
}

export interface GuardrailsConfig {
  strictMode: boolean;
  allowTechnicalTerms: string[];
  seniorFriendlyReplacements: Record<string, string>;
  emergencyBypass: boolean;
}

export class TechnicalFilter {
  private config: GuardrailsConfig;
  private technicalTermsDatabase: Map<string, string>;
  private dangerousPatterns: RegExp[];

  constructor(config: Partial<GuardrailsConfig> = {}) {
    this.config = {
      strictMode: true,
      allowTechnicalTerms: ['app', 'program', 'fil', 'mapp'],
      seniorFriendlyReplacements: {},
      emergencyBypass: false,
      ...config
    };

    this.initializeTechnicalTermsDatabase();
    this.initializeDangerousPatterns();
    
    console.log('🛡️ Technical Filter initialized with Master Plan 2.0 guardrails');
  }

  /**
   * MASTER PLAN 2.0: Filter teknisk text för senior-säkerhet
   */
  async filterForSenior(text: string): Promise<FilterResult> {
    console.log('🛡️ Filtering technical content for senior safety');
    
    const originalText = text;
    let filteredText = text;
    const technicalTermsRemoved: string[] = [];
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';

    // 1. Detect dangerous patterns first
    const dangerousPatterns = this.detectDangerousPatterns(text);
    if (dangerousPatterns.length > 0) {
      riskLevel = 'critical';
      console.warn('🚨 Critical technical patterns detected:', dangerousPatterns);
      
      if (this.config.strictMode && !this.config.emergencyBypass) {
        return {
          filtered: true,
          originalText,
          seniorFriendlyText: 'Ett tekniskt problem uppstod. Vi arbetar på att lösa det.',
          technicalTermsRemoved: dangerousPatterns,
          riskLevel: 'critical',
          explanation: 'Critical technical patterns blocked for senior safety'
        };
      }
    }

    // 2. Filter technical terms
    const technicalTerms = this.detectTechnicalTerms(text);
    for (const term of technicalTerms) {
      if (!this.config.allowTechnicalTerms.includes(term.toLowerCase())) {
        const replacement = this.getSeniorFriendlyReplacement(term);
        filteredText = filteredText.replace(new RegExp(term, 'gi'), replacement);
        technicalTermsRemoved.push(term);
        
        if (riskLevel === 'low') riskLevel = 'medium';
      }
    }

    // 3. Filter error messages
    filteredText = this.filterErrorMessages(filteredText);

    // 4. Filter code-related content
    filteredText = this.filterCodeContent(filteredText);

    // 5. Apply positive, encouraging tone
    filteredText = this.applyPositiveTone(filteredText);

    const wasFiltered = filteredText !== originalText;
    
    if (wasFiltered) {
      console.log(`🛡️ Filtered ${technicalTermsRemoved.length} technical terms for senior safety`);
    }

    return {
      filtered: wasFiltered,
      originalText,
      seniorFriendlyText: filteredText,
      technicalTermsRemoved,
      riskLevel,
      explanation: wasFiltered ? 
        `Filtered ${technicalTermsRemoved.length} technical terms for senior-friendly communication` :
        'No filtering needed - content is already senior-friendly'
    };
  }

  /**
   * MASTER PLAN 2.0: Initialize technical terms database
   */
  private initializeTechnicalTermsDatabase(): void {
    this.technicalTermsDatabase = new Map([
      // Programming terms
      ['API', 'systemgränssnitt'],
      ['database', 'informationslager'],
      ['server', 'dator'],
      ['client', 'program'],
      ['repository', 'projektmapp'],
      ['commit', 'spara ändringar'],
      ['merge', 'sammanfoga'],
      ['pull request', 'förslag på ändringar'],
      ['branch', 'arbetsversion'],
      ['deployment', 'publicering'],
      ['configuration', 'inställningar'],
      ['authentication', 'inloggning'],
      ['authorization', 'behörighet'],
      ['endpoint', 'anslutningspunkt'],
      ['middleware', 'mellanprogram'],
      
      // Error terms
      ['error', 'problem'],
      ['exception', 'oväntat problem'],
      ['bug', 'fel'],
      ['crash', 'stopp'],
      ['timeout', 'för lång väntetid'],
      ['connection failed', 'anslutning misslyckades'],
      ['invalid', 'felaktig'],
      ['undefined', 'saknas'],
      ['null', 'tom'],
      ['404', 'hittades inte'],
      ['500', 'serverfel'],
      
      // Technical processes
      ['compilation', 'förberedelse'],
      ['execution', 'körning'],
      ['initialization', 'start'],
      ['termination', 'avslut'],
      ['synchronization', 'synkronisering'],
      ['optimization', 'förbättring'],
      ['refactoring', 'omstrukturering'],
      ['debugging', 'felsökning'],
      ['testing', 'kontroll'],
      ['validation', 'verifiering'],
      
      // Architecture terms
      ['microservice', 'tjänst'],
      ['container', 'paket'],
      ['orchestration', 'samordning'],
      ['load balancer', 'fördelningssystem'],
      ['cache', 'snabbminne'],
      ['queue', 'kö'],
      ['webhook', 'automatisk meddelande'],
      ['SSL', 'säker anslutning'],
      ['encryption', 'kryptering'],
      ['hash', 'fingeravtryck']
    ]);

    // Add Master Plan 2.0 specific terms
    this.technicalTermsDatabase.set('dual consciousness', 'smart system');
    this.technicalTermsDatabase.set('communication bridge', 'översättare');
    this.technicalTermsDatabase.set('guardrails', 'säkerhetssystem');
    this.technicalTermsDatabase.set('core agent', 'teknisk del');
    this.technicalTermsDatabase.set('conscious agent', 'användarvänlig del');
    
    console.log(`🛡️ Technical terms database initialized with ${this.technicalTermsDatabase.size} terms`);
  }

  /**
   * MASTER PLAN 2.0: Initialize dangerous patterns that must be blocked
   */
  private initializeDangerousPatterns(): void {
    this.dangerousPatterns = [
      /stack\s+trace/gi,
      /segmentation\s+fault/gi,
      /memory\s+leak/gi,
      /buffer\s+overflow/gi,
      /sql\s+injection/gi,
      /cross-site\s+scripting/gi,
      /authentication\s+failed/gi,
      /access\s+denied/gi,
      /permission\s+denied/gi,
      /fatal\s+error/gi,
      /critical\s+error/gi,
      /system\s+failure/gi,
      /connection\s+refused/gi,
      /timeout\s+exceeded/gi,
      /resource\s+exhausted/gi,
      /out\s+of\s+memory/gi,
      /disk\s+full/gi,
      /network\s+unreachable/gi,
      /service\s+unavailable/gi,
      /internal\s+server\s+error/gi
    ];
    
    console.log(`🛡️ Dangerous patterns database initialized with ${this.dangerousPatterns.length} patterns`);
  }

  /**
   * MASTER PLAN 2.0: Detect dangerous technical patterns
   */
  private detectDangerousPatterns(text: string): string[] {
    const detected: string[] = [];
    
    for (const pattern of this.dangerousPatterns) {
      const matches = text.match(pattern);
      if (matches) {
        detected.push(...matches);
      }
    }
    
    return detected;
  }

  /**
   * MASTER PLAN 2.0: Detect technical terms in text
   */
  private detectTechnicalTerms(text: string): string[] {
    const detected: string[] = [];
    
    for (const [term] of this.technicalTermsDatabase) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      if (regex.test(text)) {
        detected.push(term);
      }
    }
    
    return detected;
  }

  /**
   * MASTER PLAN 2.0: Get senior-friendly replacement for technical term
   */
  private getSeniorFriendlyReplacement(term: string): string {
    // Check custom replacements first
    if (this.config.seniorFriendlyReplacements[term.toLowerCase()]) {
      return this.config.seniorFriendlyReplacements[term.toLowerCase()];
    }
    
    // Check database
    const replacement = this.technicalTermsDatabase.get(term);
    if (replacement) {
      return replacement;
    }
    
    // Fallback to generic friendly term
    return 'systemdel';
  }

  /**
   * MASTER PLAN 2.0: Filter error messages to be senior-friendly
   */
  private filterErrorMessages(text: string): string {
    const errorPatterns = [
      { pattern: /error\s*:\s*(.+)/gi, replacement: 'Ett problem uppstod: $1' },
      { pattern: /failed\s+to\s+(.+)/gi, replacement: 'Kunde inte $1' },
      { pattern: /cannot\s+(.+)/gi, replacement: 'Kan inte $1' },
      { pattern: /unable\s+to\s+(.+)/gi, replacement: 'Kan inte $1' },
      { pattern: /invalid\s+(.+)/gi, replacement: 'Felaktig $1' },
      { pattern: /missing\s+(.+)/gi, replacement: '$1 saknas' },
      { pattern: /not\s+found/gi, replacement: 'hittades inte' },
      { pattern: /access\s+denied/gi, replacement: 'åtkomst nekad' },
      { pattern: /connection\s+timeout/gi, replacement: 'anslutningen tog för lång tid' },
      { pattern: /server\s+error/gi, replacement: 'systemfel' }
    ];
    
    let filteredText = text;
    
    for (const { pattern, replacement } of errorPatterns) {
      filteredText = filteredText.replace(pattern, replacement);
    }
    
    return filteredText;
  }

  /**
   * MASTER PLAN 2.0: Filter code-related content
   */
  private filterCodeContent(text: string): string {
    let filteredText = text;
    
    // Remove code blocks
    filteredText = filteredText.replace(/```[\s\S]*?```/g, '[Teknisk information dold]');
    filteredText = filteredText.replace(/`[^`]+`/g, '[teknisk term]');
    
    // Remove file paths
    filteredText = filteredText.replace(/[a-zA-Z]:\\[^\s]+/g, '[filsökväg]');
    filteredText = filteredText.replace(/\/[^\s]+\.[a-zA-Z]+/g, '[fil]');
    
    // Remove URLs (except user-friendly ones)
    filteredText = filteredText.replace(/https?:\/\/[^\s]+/g, '[länk]');
    
    // Remove technical IDs and hashes
    filteredText = filteredText.replace(/[a-f0-9]{8,}/g, '[ID]');
    
    return filteredText;
  }

  /**
   * MASTER PLAN 2.0: Apply positive, encouraging tone
   */
  private applyPositiveTone(text: string): string {
    const tonePatterns = [
      { pattern: /failed/gi, replacement: 'behöver hjälp' },
      { pattern: /broken/gi, replacement: 'behöver reparation' },
      { pattern: /crashed/gi, replacement: 'stoppade oväntat' },
      { pattern: /died/gi, replacement: 'avslutades' },
      { pattern: /killed/gi, replacement: 'stoppades' },
      { pattern: /destroyed/gi, replacement: 'togs bort' },
      { pattern: /corrupted/gi, replacement: 'skadades' },
      { pattern: /invalid/gi, replacement: 'behöver korrigeras' },
      { pattern: /illegal/gi, replacement: 'inte tillåtet' },
      { pattern: /forbidden/gi, replacement: 'inte tillåtet' },
      { pattern: /rejected/gi, replacement: 'accepterades inte' },
      { pattern: /denied/gi, replacement: 'nekades' }
    ];
    
    let positiveText = text;
    
    for (const { pattern, replacement } of tonePatterns) {
      positiveText = positiveText.replace(pattern, replacement);
    }
    
    // Add encouraging phrases
    if (positiveText.includes('problem') || positiveText.includes('fel')) {
      positiveText += ' Vi arbetar på att lösa detta.';
    }
    
    return positiveText;
  }

  /**
   * MASTER PLAN 2.0: Emergency bypass for critical situations
   */
  enableEmergencyBypass(reason: string): void {
    console.warn(`🚨 Emergency bypass enabled: ${reason}`);
    this.config.emergencyBypass = true;
  }

  disableEmergencyBypass(): void {
    console.log('🛡️ Emergency bypass disabled - normal guardrails restored');
    this.config.emergencyBypass = false;
  }

  /**
   * MASTER PLAN 2.0: Get filter statistics
   */
  getFilterStats(): {
    technicalTermsCount: number;
    dangerousPatternsCount: number;
    strictMode: boolean;
    emergencyBypass: boolean;
  } {
    return {
      technicalTermsCount: this.technicalTermsDatabase.size,
      dangerousPatternsCount: this.dangerousPatterns.length,
      strictMode: this.config.strictMode,
      emergencyBypass: this.config.emergencyBypass
    };
  }

  /**
   * MASTER PLAN 2.0: Add custom senior-friendly replacement
   */
  addCustomReplacement(technicalTerm: string, seniorFriendly: string): void {
    this.config.seniorFriendlyReplacements[technicalTerm.toLowerCase()] = seniorFriendly;
    console.log(`🛡️ Added custom replacement: "${technicalTerm}" → "${seniorFriendly}"`);
  }

  /**
   * MASTER PLAN 2.0: Test filter with sample text
   */
  async testFilter(sampleText: string): Promise<FilterResult> {
    console.log('🧪 Testing Technical Filter with sample text');
    return await this.filterForSenior(sampleText);
  }
}