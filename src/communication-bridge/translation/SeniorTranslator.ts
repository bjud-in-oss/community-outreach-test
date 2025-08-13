// MASTER PLAN 2.0: SeniorTranslator.ts
// STATUS: Translation Layer för kommunikation mellan agenter
// INTEGRATION: Communication Bridge - Översättning mellan senior-språk och teknisk spec
// ARCHITECTURE: Dual Consciousness Architecture compliant

import { TechnicalFilter, FilterResult } from '../guardrails/TechnicalFilter.js';

/**
 * MASTER PLAN 2.0 Senior Translator
 * 
 * Translation Layer som hanterar:
 * - Senior-förfrågningar → Tekniska specifikationer
 * - Tekniska svar → Senior-vänligt språk
 * - Kontextbevarande översättning
 * - Intentionsanalys och bevarande
 */

export interface SeniorRequest {
  originalText: string;
  intent: string;
  complexity: 'low' | 'medium' | 'high';
  context?: string;
  emotionalTone?: 'neutral' | 'excited' | 'concerned' | 'frustrated';
}

export interface TechnicalSpecification {
  title: string;
  description: string;
  requirements: string[];
  complexity: 'low' | 'medium' | 'high';
  targetAgent: 'conscious' | 'core' | 'bridge';
  estimatedTime: number;
  seniorContext: {
    originalRequest: string;
    intent: string;
    emotionalTone: string;
  };
}

export interface SeniorResponse {
  message: string;
  tone: 'encouraging' | 'informative' | 'celebratory' | 'supportive';
  nextSteps?: string[];
  estimatedTime?: string;
  needsApproval?: boolean;
}

export interface TranslationResult {
  success: boolean;
  result: TechnicalSpecification | SeniorResponse;
  confidence: number; // 0-1
  explanation: string;
  warnings?: string[];
}

export class SeniorTranslator {
  private technicalFilter: TechnicalFilter;
  private intentPatterns: Map<string, string>;
  private complexityIndicators: Map<string, 'low' | 'medium' | 'high'>;
  private emotionalPatterns: Map<RegExp, string>;

  constructor() {
    this.technicalFilter = new TechnicalFilter({
      strictMode: true,
      allowTechnicalTerms: ['app', 'program', 'fil', 'mapp', 'hemsida']
    });

    this.initializeIntentPatterns();
    this.initializeComplexityIndicators();
    this.initializeEmotionalPatterns();
    
    console.log('🌉 Senior Translator initialized for Master Plan 2.0');
  }

  /**
   * MASTER PLAN 2.0: Översätt senior-förfrågan till teknisk specifikation
   */
  async translateSeniorRequestToTechnical(request: string, context?: string): Promise<TranslationResult> {
    console.log('🌉 Translating senior request to technical specification');
    
    try {
      // 1. Analyze senior request
      const seniorRequest = await this.analyzeSeniorRequest(request, context);
      
      // 2. Generate technical specification
      const technicalSpec = await this.generateTechnicalSpecification(seniorRequest);
      
      // 3. Calculate confidence
      const confidence = this.calculateTranslationConfidence(seniorRequest, technicalSpec);
      
      console.log(`🌉 Translation completed with ${Math.round(confidence * 100)}% confidence`);
      
      return {
        success: true,
        result: technicalSpec,
        confidence,
        explanation: `Translated senior request "${request}" to technical specification for ${technicalSpec.targetAgent} agent`,
        warnings: confidence < 0.7 ? ['Low confidence translation - may need clarification'] : undefined
      };
    } catch (error) {
      console.error('❌ Translation failed:', error);
      
      return {
        success: false,
        result: await this.createFallbackTechnicalSpec(request),
        confidence: 0.3,
        explanation: `Translation failed, using fallback specification: ${error}`,
        warnings: ['Translation failed - using basic fallback specification']
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Översätt teknisk respons till senior-vänligt språk
   */
  async translateTechnicalResponseToSenior(
    technicalResponse: any, 
    originalRequest?: string,
    emotionalContext?: string
  ): Promise<TranslationResult> {
    console.log('🌉 Translating technical response to senior-friendly language');
    
    try {
      // 1. Filter technical content
      const filterResult = await this.technicalFilter.filterForSenior(
        typeof technicalResponse === 'string' ? technicalResponse : JSON.stringify(technicalResponse)
      );
      
      // 2. Generate senior response
      const seniorResponse = await this.generateSeniorResponse(
        filterResult, 
        originalRequest, 
        emotionalContext
      );
      
      // 3. Calculate confidence
      const confidence = this.calculateResponseConfidence(filterResult, seniorResponse);
      
      console.log(`🌉 Response translation completed with ${Math.round(confidence * 100)}% confidence`);
      
      return {
        success: true,
        result: seniorResponse,
        confidence,
        explanation: `Translated technical response to senior-friendly message with ${filterResult.technicalTermsRemoved.length} terms filtered`,
        warnings: filterResult.riskLevel === 'high' || filterResult.riskLevel === 'critical' ? 
          ['High-risk technical content was filtered'] : undefined
      };
    } catch (error) {
      console.error('❌ Response translation failed:', error);
      
      return {
        success: false,
        result: {
          message: 'Systemet arbetar på din begäran. Vi återkommer snart med resultat.',
          tone: 'supportive' as const,
          nextSteps: ['Vänta på uppdatering', 'Kontakta support vid frågor']
        },
        confidence: 0.3,
        explanation: `Response translation failed, using fallback message: ${error}`,
        warnings: ['Translation failed - using generic supportive message']
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Analyze senior request for intent and complexity
   */
  private async analyzeSeniorRequest(request: string, context?: string): Promise<SeniorRequest> {
    const normalizedRequest = request.toLowerCase().trim();
    
    // Detect intent
    let intent = 'unknown';
    let confidence = 0;
    
    for (const [pattern, detectedIntent] of this.intentPatterns) {
      if (normalizedRequest.includes(pattern)) {
        intent = detectedIntent;
        confidence = Math.max(confidence, 0.8);
        break;
      }
    }
    
    // Detect complexity
    let complexity: 'low' | 'medium' | 'high' = 'low';
    
    for (const [indicator, level] of this.complexityIndicators) {
      if (normalizedRequest.includes(indicator)) {
        if (level === 'high') complexity = 'high';
        else if (level === 'medium' && complexity === 'low') complexity = 'medium';
      }
    }
    
    // Detect emotional tone
    let emotionalTone: 'neutral' | 'excited' | 'concerned' | 'frustrated' = 'neutral';
    
    for (const [pattern, tone] of this.emotionalPatterns) {
      if (pattern.test(request)) {
        emotionalTone = tone as any;
        break;
      }
    }
    
    return {
      originalText: request,
      intent,
      complexity,
      context,
      emotionalTone
    };
  }

  /**
   * MASTER PLAN 2.0: Generate technical specification from senior request
   */
  private async generateTechnicalSpecification(seniorRequest: SeniorRequest): Promise<TechnicalSpecification> {
    const { originalText, intent, complexity, emotionalTone } = seniorRequest;
    
    // Determine target agent based on intent
    let targetAgent: 'conscious' | 'core' | 'bridge' = 'core';
    if (intent.includes('ui') || intent.includes('interface') || intent.includes('design')) {
      targetAgent = 'conscious';
    } else if (intent.includes('communication') || intent.includes('translation')) {
      targetAgent = 'bridge';
    }
    
    // Generate title
    const title = this.generateTechnicalTitle(intent, originalText);
    
    // Generate description
    const description = this.generateTechnicalDescription(seniorRequest);
    
    // Generate requirements
    const requirements = this.generateTechnicalRequirements(seniorRequest);
    
    // Estimate time
    const estimatedTime = this.estimateImplementationTime(complexity, requirements.length);
    
    return {
      title,
      description,
      requirements,
      complexity,
      targetAgent,
      estimatedTime,
      seniorContext: {
        originalRequest: originalText,
        intent,
        emotionalTone: emotionalTone || 'neutral'
      }
    };
  }

  /**
   * MASTER PLAN 2.0: Generate technical title from intent
   */
  private generateTechnicalTitle(intent: string, originalText: string): string {
    const titleMappings = {
      'create_app': 'Create Application',
      'create_website': 'Create Website',
      'automate_task': 'Automate Task',
      'translate_content': 'Translate Content',
      'manage_files': 'File Management',
      'create_document': 'Document Creation',
      'send_message': 'Message Sending',
      'schedule_event': 'Event Scheduling',
      'backup_data': 'Data Backup',
      'organize_photos': 'Photo Organization'
    };
    
    const mappedTitle = titleMappings[intent as keyof typeof titleMappings];
    if (mappedTitle) {
      return `${mappedTitle} - Master Plan 2.0`;
    }
    
    // Fallback: extract key words from original text
    const words = originalText.split(' ').filter(word => word.length > 3);
    const keyWords = words.slice(0, 3).join(' ');
    return `${keyWords} - Master Plan 2.0 Task`;
  }

  /**
   * MASTER PLAN 2.0: Generate technical description
   */
  private generateTechnicalDescription(seniorRequest: SeniorRequest): string {
    const { originalText, intent, complexity, emotionalTone } = seniorRequest;
    
    let description = `**🎯 MASTER PLAN 2.0 TASK**

**Senior Request:** "${originalText}"
**Detected Intent:** ${intent}
**Complexity Level:** ${complexity}
**Emotional Context:** ${emotionalTone}

**🎭 DUAL CONSCIOUSNESS REQUIREMENTS:**
This task is part of the Master Plan 2.0 dual consciousness architecture.

**📋 IMPLEMENTATION REQUIREMENTS:**`;

    // Add specific requirements based on intent
    if (intent.includes('create')) {
      description += `
1. Create the requested functionality with senior-friendly interface
2. Ensure zero technical complexity is exposed to senior users
3. Include comprehensive error handling with friendly messages
4. Implement responsive design for accessibility`;
    } else if (intent.includes('automate')) {
      description += `
1. Automate the requested process with minimal user intervention
2. Provide clear status updates in senior-friendly language
3. Include safety checks and confirmation steps
4. Create simple controls for starting/stopping automation`;
    } else {
      description += `
1. Implement the requested functionality
2. Maintain senior-friendly interface throughout
3. Provide clear feedback and status updates
4. Ensure robust error handling`;
    }

    description += `

**✅ SUCCESS CRITERIA:**
- Functionality works as requested by senior user
- Interface remains completely senior-friendly
- No technical jargon or complexity exposed
- Comprehensive testing completed
- Master Plan 2.0 architecture compliance maintained

**🎭 SENIOR-FRIENDLY FEATURES:**
- Clear, simple language in all messages
- Large, readable interface elements
- Encouraging feedback and progress updates
- Graceful error handling with helpful suggestions

This task maintains the complete flow: Senior request → Communication Bridge → ${seniorRequest.complexity === 'high' ? 'Core Agent' : 'Appropriate Agent'} → Working solution`;

    return description;
  }

  /**
   * MASTER PLAN 2.0: Generate technical requirements
   */
  private generateTechnicalRequirements(seniorRequest: SeniorRequest): string[] {
    const baseRequirements = [
      'Master Plan 2.0 architecture compliance',
      'Dual consciousness pattern adherence',
      'Communication bridge integration',
      'Senior-friendly interface preservation',
      'Comprehensive error handling',
      'Swedish language support'
    ];

    const { intent, complexity } = seniorRequest;

    // Add intent-specific requirements
    if (intent.includes('create_app') || intent.includes('create_website')) {
      baseRequirements.push(
        'Next.js + React implementation',
        'Tailwind CSS styling',
        'Responsive design',
        'Accessibility compliance'
      );
    } else if (intent.includes('automate')) {
      baseRequirements.push(
        'Automation script implementation',
        'Status monitoring and reporting',
        'Safety checks and confirmations',
        'User control interface'
      );
    } else if (intent.includes('translate')) {
      baseRequirements.push(
        'Translation service integration',
        'Language detection',
        'Quality assurance',
        'Batch processing support'
      );
    }

    // Add complexity-specific requirements
    if (complexity === 'high') {
      baseRequirements.push(
        'Advanced testing suite',
        'Performance optimization',
        'Security audit',
        'Documentation generation'
      );
    } else if (complexity === 'medium') {
      baseRequirements.push(
        'Unit testing',
        'Basic performance checks',
        'Security best practices'
      );
    }

    return baseRequirements;
  }

  /**
   * MASTER PLAN 2.0: Estimate implementation time
   */
  private estimateImplementationTime(complexity: 'low' | 'medium' | 'high', requirementsCount: number): number {
    const baseTime = {
      low: 15,    // 15 minutes
      medium: 45, // 45 minutes
      high: 120   // 2 hours
    };

    const complexityMultiplier = requirementsCount > 8 ? 1.5 : 1.0;
    return Math.round(baseTime[complexity] * complexityMultiplier);
  }

  /**
   * MASTER PLAN 2.0: Generate senior-friendly response
   */
  private async generateSeniorResponse(
    filterResult: FilterResult,
    originalRequest?: string,
    emotionalContext?: string
  ): Promise<SeniorResponse> {
    let message = filterResult.seniorFriendlyText;
    let tone: 'encouraging' | 'informative' | 'celebratory' | 'supportive' = 'informative';

    // Determine appropriate tone
    if (filterResult.riskLevel === 'critical' || filterResult.riskLevel === 'high') {
      tone = 'supportive';
      message = 'Vi arbetar på din begäran och kommer att återkomma med resultat snart.';
    } else if (message.includes('slutförd') || message.includes('klar') || message.includes('framgång')) {
      tone = 'celebratory';
    } else if (message.includes('problem') || message.includes('fel')) {
      tone = 'supportive';
    } else {
      tone = 'encouraging';
    }

    // Add encouraging elements
    if (tone === 'encouraging') {
      message += ' Vi håller dig uppdaterad om framstegen.';
    } else if (tone === 'supportive') {
      message += ' Kontakta oss gärna om du har frågor.';
    } else if (tone === 'celebratory') {
      message += ' Bra jobbat!';
    }

    // Generate next steps
    const nextSteps: string[] = [];
    if (originalRequest) {
      if (originalRequest.includes('skapa') || originalRequest.includes('create')) {
        nextSteps.push('Vänta medan vi skapar det du begärde');
        nextSteps.push('Du får en uppdatering när det är klart');
      } else if (originalRequest.includes('hjälp') || originalRequest.includes('help')) {
        nextSteps.push('Vi analyserar din begäran');
        nextSteps.push('Du får svar inom kort');
      } else {
        nextSteps.push('Vi arbetar på din begäran');
        nextSteps.push('Återkommer med uppdatering snart');
      }
    }

    return {
      message,
      tone,
      nextSteps: nextSteps.length > 0 ? nextSteps : undefined,
      estimatedTime: this.generateEstimatedTimeString(filterResult),
      needsApproval: filterResult.riskLevel === 'high' || filterResult.riskLevel === 'critical'
    };
  }

  /**
   * MASTER PLAN 2.0: Generate estimated time string for seniors
   */
  private generateEstimatedTimeString(filterResult: FilterResult): string {
    if (filterResult.riskLevel === 'critical') {
      return 'Vi återkommer inom kort';
    } else if (filterResult.riskLevel === 'high') {
      return 'Några minuter';
    } else if (filterResult.riskLevel === 'medium') {
      return 'Ett par minuter';
    } else {
      return 'Strax';
    }
  }

  /**
   * MASTER PLAN 2.0: Calculate translation confidence
   */
  private calculateTranslationConfidence(
    seniorRequest: SeniorRequest, 
    technicalSpec: TechnicalSpecification
  ): number {
    let confidence = 0.5; // Base confidence

    // Intent detection confidence
    if (seniorRequest.intent !== 'unknown') confidence += 0.2;
    
    // Complexity detection confidence
    if (seniorRequest.complexity !== 'low') confidence += 0.1;
    
    // Requirements quality
    if (technicalSpec.requirements.length >= 6) confidence += 0.1;
    
    // Context preservation
    if (technicalSpec.seniorContext.originalRequest === seniorRequest.originalText) confidence += 0.1;

    return Math.min(confidence, 1.0);
  }

  /**
   * MASTER PLAN 2.0: Calculate response confidence
   */
  private calculateResponseConfidence(filterResult: FilterResult, seniorResponse: SeniorResponse): number {
    let confidence = 0.6; // Base confidence

    // Filtering success
    if (filterResult.riskLevel === 'low') confidence += 0.2;
    else if (filterResult.riskLevel === 'medium') confidence += 0.1;
    
    // Message quality
    if (seniorResponse.message.length > 20 && seniorResponse.message.length < 200) confidence += 0.1;
    
    // Next steps provided
    if (seniorResponse.nextSteps && seniorResponse.nextSteps.length > 0) confidence += 0.1;

    return Math.min(confidence, 1.0);
  }

  /**
   * MASTER PLAN 2.0: Create fallback technical specification
   */
  private async createFallbackTechnicalSpec(request: string): Promise<TechnicalSpecification> {
    return {
      title: 'General Task - Master Plan 2.0',
      description: `**🎯 FALLBACK TASK**

Senior Request: "${request}"

This is a fallback task created when the translation system couldn't fully understand the request.

**📋 BASIC REQUIREMENTS:**
1. Analyze the senior's request more carefully
2. Provide appropriate assistance
3. Maintain senior-friendly communication
4. Follow Master Plan 2.0 architecture

**✅ SUCCESS CRITERIA:**
- Senior's needs are addressed
- Communication remains friendly and clear
- No technical complexity exposed`,
      requirements: [
        'Master Plan 2.0 architecture compliance',
        'Senior-friendly interface',
        'Clear communication',
        'Appropriate assistance'
      ],
      complexity: 'medium',
      targetAgent: 'core',
      estimatedTime: 30,
      seniorContext: {
        originalRequest: request,
        intent: 'general_assistance',
        emotionalTone: 'neutral'
      }
    };
  }

  /**
   * MASTER PLAN 2.0: Initialize intent patterns
   */
  private initializeIntentPatterns(): void {
    this.intentPatterns = new Map([
      // Creation intents
      ['skapa en app', 'create_app'],
      ['skapa ett program', 'create_app'],
      ['skapa en hemsida', 'create_website'],
      ['skapa en webbsida', 'create_website'],
      ['gör en app', 'create_app'],
      ['bygg en app', 'create_app'],
      
      // Automation intents
      ['automatisera', 'automate_task'],
      ['gör automatiskt', 'automate_task'],
      ['schemalägg', 'schedule_event'],
      ['planera', 'schedule_event'],
      
      // Translation intents
      ['översätt', 'translate_content'],
      ['translate', 'translate_content'],
      
      // File management intents
      ['organisera filer', 'manage_files'],
      ['sortera bilder', 'organize_photos'],
      ['backup', 'backup_data'],
      ['säkerhetskopiera', 'backup_data'],
      
      // Communication intents
      ['skicka meddelande', 'send_message'],
      ['skicka mail', 'send_message'],
      ['kontakta', 'send_message'],
      
      // Document intents
      ['skapa dokument', 'create_document'],
      ['skriv brev', 'create_document'],
      ['gör rapport', 'create_document']
    ]);
    
    console.log(`🌉 Intent patterns initialized with ${this.intentPatterns.size} patterns`);
  }

  /**
   * MASTER PLAN 2.0: Initialize complexity indicators
   */
  private initializeComplexityIndicators(): void {
    this.complexityIndicators = new Map([
      // High complexity indicators
      ['databas', 'high'],
      ['integration', 'high'],
      ['api', 'high'],
      ['säkerhet', 'high'],
      ['betalning', 'high'],
      ['användare', 'high'],
      ['inloggning', 'high'],
      
      // Medium complexity indicators
      ['flera', 'medium'],
      ['olika', 'medium'],
      ['avancerad', 'medium'],
      ['komplex', 'medium'],
      ['automatisk', 'medium'],
      ['schemalägg', 'medium'],
      
      // Low complexity indicators remain default
      ['enkel', 'low'],
      ['basic', 'low'],
      ['simpel', 'low']
    ]);
    
    console.log(`🌉 Complexity indicators initialized with ${this.complexityIndicators.size} indicators`);
  }

  /**
   * MASTER PLAN 2.0: Initialize emotional patterns
   */
  private initializeEmotionalPatterns(): void {
    this.emotionalPatterns = new Map([
      [/!+|mycket|verkligen|absolut/gi, 'excited'],
      [/problem|fel|fungerar inte|hjälp/gi, 'concerned'],
      [/frustrerad|arg|irriterad|dåligt/gi, 'frustrated'],
      [/tack|bra|perfekt|utmärkt/gi, 'neutral'] // Positive but calm
    ]);
    
    console.log(`🌉 Emotional patterns initialized with ${this.emotionalPatterns.size} patterns`);
  }

  /**
   * MASTER PLAN 2.0: Test translation with sample data
   */
  async testTranslation(sampleRequest: string): Promise<{
    toTechnical: TranslationResult;
    backToSenior: TranslationResult;
  }> {
    console.log('🧪 Testing Senior Translator with sample request');
    
    const toTechnical = await this.translateSeniorRequestToTechnical(sampleRequest);
    const backToSenior = await this.translateTechnicalResponseToSenior(
      'Task completed successfully',
      sampleRequest
    );
    
    return { toTechnical, backToSenior };
  }
}