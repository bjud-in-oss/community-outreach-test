// MASTER PLAN 2.0: CommunicationBridge.ts
// STATUS: Huvudklass för säker kommunikation mellan agenter
// INTEGRATION: Communication Bridge - Säker message routing och guardrails
// ARCHITECTURE: Dual Consciousness Architecture compliant

import { TechnicalFilter, FilterResult } from './guardrails/TechnicalFilter.js';
import { SeniorTranslator, TranslationResult, TechnicalSpecification, SeniorResponse } from './translation/SeniorTranslator.js';

/**
 * MASTER PLAN 2.0 Communication Bridge
 * 
 * Huvudklass som säkerställer:
 * - All kommunikation mellan agenter går genom bridge
 * - Teknisk komplexitet döljs från Conscious Agent
 * - Senior-säkerhet genom guardrails
 * - Strukturerad message routing
 * - Audit logging för spårbarhet
 */

export interface BridgeMessage {
  id: string;
  timestamp: Date;
  fromAgent: 'conscious' | 'core' | 'bridge' | 'external';
  toAgent: 'conscious' | 'core' | 'bridge' | 'external';
  messageType: 'request' | 'response' | 'notification' | 'error' | 'status';
  originalContent: any;
  processedContent?: any;
  guardrailsApplied: string[];
  seniorSafe: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  requiresApproval?: boolean;
}

export interface BridgeConfig {
  guardrailsEnabled: boolean;
  translationMode: 'auto' | 'manual';
  auditLogging: boolean;
  errorFiltering: boolean;
  strictMode: boolean;
  emergencyBypass: boolean;
}

export interface BridgeStats {
  messagesProcessed: number;
  guardrailsTriggered: number;
  translationsPerformed: number;
  errorsFiltered: number;
  averageProcessingTime: number;
  seniorSafetyScore: number; // 0-100
}

export class CommunicationBridge {
  private technicalFilter: TechnicalFilter;
  private seniorTranslator: SeniorTranslator;
  private config: BridgeConfig;
  private messageHistory: BridgeMessage[] = [];
  private stats: BridgeStats;
  private isInitialized: boolean = false;

  constructor(config: Partial<BridgeConfig> = {}) {
    this.config = {
      guardrailsEnabled: true,
      translationMode: 'auto',
      auditLogging: true,
      errorFiltering: true,
      strictMode: true,
      emergencyBypass: false,
      ...config
    };

    this.technicalFilter = new TechnicalFilter({
      strictMode: this.config.strictMode,
      emergencyBypass: this.config.emergencyBypass
    });

    this.seniorTranslator = new SeniorTranslator();

    this.stats = {
      messagesProcessed: 0,
      guardrailsTriggered: 0,
      translationsPerformed: 0,
      errorsFiltered: 0,
      averageProcessingTime: 0,
      seniorSafetyScore: 100
    };

    console.log('🌉 Communication Bridge initialized for Master Plan 2.0');
  }

  /**
   * MASTER PLAN 2.0: Initialize Communication Bridge
   */
  async initialize(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🔧 Initializing Master Plan 2.0 Communication Bridge...');

      // Test all components
      await this.performHealthCheck();

      this.isInitialized = true;
      console.log('✅ Communication Bridge initialized successfully');

      return {
        success: true,
        message: 'Communication Bridge ready for dual consciousness architecture'
      };
    } catch (error) {
      console.error('❌ Communication Bridge initialization failed:', error);
      return {
        success: false,
        message: `Initialization failed: ${error}`
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Process message from Conscious Agent to Core Agent
   * 
   * Senior request → Technical specification
   */
  async processConsciousToCore(
    seniorRequest: string,
    context?: string,
    priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<{
    success: boolean;
    technicalSpec?: TechnicalSpecification;
    message: BridgeMessage;
    error?: string;
  }> {
    const startTime = Date.now();
    console.log('🌉 Processing Conscious Agent → Core Agent communication');

    try {
      // 1. Create bridge message
      const message = this.createBridgeMessage(
        'conscious',
        'core',
        'request',
        seniorRequest,
        priority
      );

      // 2. Apply guardrails (check for dangerous content)
      if (this.config.guardrailsEnabled) {
        const filterResult = await this.technicalFilter.filterForSenior(seniorRequest);
        
        if (filterResult.riskLevel === 'critical' && this.config.strictMode) {
          message.guardrailsApplied.push('Critical content blocked');
          message.seniorSafe = false;
          
          this.logMessage(message);
          this.updateStats(startTime, true, false, false);
          
          return {
            success: false,
            message,
            error: 'Request contains content that cannot be processed safely'
          };
        }
      }

      // 3. Translate to technical specification
      const translationResult = await this.seniorTranslator.translateSeniorRequestToTechnical(
        seniorRequest,
        context
      );

      if (!translationResult.success) {
        message.guardrailsApplied.push('Translation failed - using fallback');
        this.logMessage(message);
        this.updateStats(startTime, false, true, false);
        
        return {
          success: false,
          message,
          error: 'Failed to translate senior request to technical specification'
        };
      }

      // 4. Finalize message
      message.processedContent = translationResult.result;
      message.seniorSafe = true;
      message.guardrailsApplied.push('Translation completed');
      
      if (translationResult.confidence < 0.7) {
        message.requiresApproval = true;
        message.guardrailsApplied.push('Low confidence - requires approval');
      }

      this.logMessage(message);
      this.updateStats(startTime, false, true, false);

      console.log(`✅ Conscious → Core translation completed (${Date.now() - startTime}ms)`);

      return {
        success: true,
        technicalSpec: translationResult.result as TechnicalSpecification,
        message
      };
    } catch (error) {
      console.error('❌ Conscious → Core processing failed:', error);
      
      const errorMessage = this.createBridgeMessage(
        'conscious',
        'core',
        'error',
        seniorRequest,
        'high'
      );
      errorMessage.guardrailsApplied.push('Processing error occurred');
      errorMessage.seniorSafe = false;
      
      this.logMessage(errorMessage);
      this.updateStats(startTime, false, false, true);

      return {
        success: false,
        message: errorMessage,
        error: `Processing failed: ${error}`
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Process message from Core Agent to Conscious Agent
   * 
   * Technical response → Senior-friendly message
   */
  async processCoreToConscious(
    technicalResponse: any,
    originalRequest?: string,
    priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<{
    success: boolean;
    seniorResponse?: SeniorResponse;
    message: BridgeMessage;
    error?: string;
  }> {
    const startTime = Date.now();
    console.log('🌉 Processing Core Agent → Conscious Agent communication');

    try {
      // 1. Create bridge message
      const message = this.createBridgeMessage(
        'core',
        'conscious',
        'response',
        technicalResponse,
        priority
      );

      // 2. Apply technical filtering (critical for senior safety)
      if (this.config.guardrailsEnabled) {
        const filterResult = await this.technicalFilter.filterForSenior(
          typeof technicalResponse === 'string' ? technicalResponse : JSON.stringify(technicalResponse)
        );

        message.guardrailsApplied.push(`Filtered ${filterResult.technicalTermsRemoved.length} technical terms`);

        if (filterResult.riskLevel === 'critical') {
          message.guardrailsApplied.push('Critical technical content blocked');
          message.seniorSafe = false;
          
          // Use safe fallback message
          const safeResponse: SeniorResponse = {
            message: 'Systemet arbetar på din begäran. Vi återkommer snart med resultat.',
            tone: 'supportive',
            nextSteps: ['Vänta på uppdatering', 'Kontakta support vid frågor']
          };

          message.processedContent = safeResponse;
          this.logMessage(message);
          this.updateStats(startTime, true, false, false);

          return {
            success: true,
            seniorResponse: safeResponse,
            message
          };
        }
      }

      // 3. Translate to senior-friendly response
      const translationResult = await this.seniorTranslator.translateTechnicalResponseToSenior(
        technicalResponse,
        originalRequest
      );

      if (!translationResult.success) {
        message.guardrailsApplied.push('Translation failed - using safe fallback');
        
        const fallbackResponse: SeniorResponse = {
          message: 'Vi har tagit emot din begäran och arbetar på den.',
          tone: 'supportive',
          nextSteps: ['Vi återkommer med uppdatering snart']
        };

        message.processedContent = fallbackResponse;
        message.seniorSafe = true;
        
        this.logMessage(message);
        this.updateStats(startTime, false, true, false);

        return {
          success: true,
          seniorResponse: fallbackResponse,
          message
        };
      }

      // 4. Finalize message
      message.processedContent = translationResult.result;
      message.seniorSafe = true;
      message.guardrailsApplied.push('Senior-friendly translation completed');

      this.logMessage(message);
      this.updateStats(startTime, false, true, false);

      console.log(`✅ Core → Conscious translation completed (${Date.now() - startTime}ms)`);

      return {
        success: true,
        seniorResponse: translationResult.result as SeniorResponse,
        message
      };
    } catch (error) {
      console.error('❌ Core → Conscious processing failed:', error);

      const errorMessage = this.createBridgeMessage(
        'core',
        'conscious',
        'error',
        technicalResponse,
        'high'
      );
      errorMessage.guardrailsApplied.push('Processing error - using safe fallback');
      errorMessage.seniorSafe = true;

      const safeErrorResponse: SeniorResponse = {
        message: 'Ett tekniskt problem uppstod, men vi arbetar på att lösa det.',
        tone: 'supportive',
        nextSteps: ['Vi återkommer snart', 'Kontakta support om problemet kvarstår']
      };

      errorMessage.processedContent = safeErrorResponse;
      
      this.logMessage(errorMessage);
      this.updateStats(startTime, false, false, true);

      return {
        success: true, // Still success because we provided safe fallback
        seniorResponse: safeErrorResponse,
        message: errorMessage
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Process status update or notification
   */
  async processStatusUpdate(
    fromAgent: 'conscious' | 'core' | 'bridge',
    statusUpdate: any,
    priority: 'low' | 'medium' | 'high' | 'critical' = 'low'
  ): Promise<BridgeMessage> {
    console.log(`🌉 Processing status update from ${fromAgent} agent`);

    const message = this.createBridgeMessage(
      fromAgent,
      'bridge',
      'status',
      statusUpdate,
      priority
    );

    // Apply filtering if going to conscious agent
    if (fromAgent === 'core') {
      const filterResult = await this.technicalFilter.filterForSenior(
        typeof statusUpdate === 'string' ? statusUpdate : JSON.stringify(statusUpdate)
      );
      
      message.processedContent = filterResult.seniorFriendlyText;
      message.guardrailsApplied.push(`Status filtered for senior safety`);
      message.seniorSafe = true;
    } else {
      message.processedContent = statusUpdate;
      message.seniorSafe = true;
    }

    this.logMessage(message);
    return message;
  }

  /**
   * MASTER PLAN 2.0: Create bridge message with proper structure
   */
  private createBridgeMessage(
    fromAgent: 'conscious' | 'core' | 'bridge' | 'external',
    toAgent: 'conscious' | 'core' | 'bridge' | 'external',
    messageType: 'request' | 'response' | 'notification' | 'error' | 'status',
    content: any,
    priority: 'low' | 'medium' | 'high' | 'critical'
  ): BridgeMessage {
    return {
      id: `bridge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      fromAgent,
      toAgent,
      messageType,
      originalContent: content,
      guardrailsApplied: [],
      seniorSafe: false, // Will be determined during processing
      priority,
      requiresApproval: false
    };
  }

  /**
   * MASTER PLAN 2.0: Log message for audit trail
   */
  private logMessage(message: BridgeMessage): void {
    if (this.config.auditLogging) {
      this.messageHistory.push(message);
      
      // Keep only last 1000 messages to prevent memory issues
      if (this.messageHistory.length > 1000) {
        this.messageHistory = this.messageHistory.slice(-1000);
      }

      console.log(`📝 Bridge message logged: ${message.id} (${message.fromAgent} → ${message.toAgent})`);
    }
  }

  /**
   * MASTER PLAN 2.0: Update bridge statistics
   */
  private updateStats(
    startTime: number,
    guardrailsTriggered: boolean,
    translationPerformed: boolean,
    errorOccurred: boolean
  ): void {
    const processingTime = Date.now() - startTime;
    
    this.stats.messagesProcessed++;
    if (guardrailsTriggered) this.stats.guardrailsTriggered++;
    if (translationPerformed) this.stats.translationsPerformed++;
    if (errorOccurred) this.stats.errorsFiltered++;
    
    // Update average processing time
    this.stats.averageProcessingTime = 
      (this.stats.averageProcessingTime * (this.stats.messagesProcessed - 1) + processingTime) / 
      this.stats.messagesProcessed;
    
    // Update senior safety score
    const safetyRate = (this.stats.messagesProcessed - this.stats.errorsFiltered) / this.stats.messagesProcessed;
    this.stats.seniorSafetyScore = Math.round(safetyRate * 100);
  }

  /**
   * MASTER PLAN 2.0: Perform health check on all components
   */
  async performHealthCheck(): Promise<{
    overall: boolean;
    components: {
      technicalFilter: boolean;
      seniorTranslator: boolean;
      messageRouting: boolean;
      auditLogging: boolean;
    };
  }> {
    console.log('🏥 Performing Communication Bridge health check');

    const components = {
      technicalFilter: false,
      seniorTranslator: false,
      messageRouting: false,
      auditLogging: false
    };

    try {
      // Test technical filter
      const filterTest = await this.technicalFilter.testFilter('API error occurred');
      components.technicalFilter = filterTest.filtered;

      // Test senior translator
      const translatorTest = await this.seniorTranslator.testTranslation('skapa en enkel app');
      components.seniorTranslator = translatorTest.toTechnical.success;

      // Test message routing
      const testMessage = this.createBridgeMessage('conscious', 'core', 'request', 'test', 'low');
      components.messageRouting = testMessage.id.startsWith('bridge-');

      // Test audit logging
      components.auditLogging = this.config.auditLogging;

      const overall = Object.values(components).every(status => status);

      console.log(`🏥 Health check completed - Overall: ${overall ? '✅' : '❌'}`);

      return { overall, components };
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return { overall: false, components };
    }
  }

  /**
   * MASTER PLAN 2.0: Get bridge statistics
   */
  getBridgeStats(): BridgeStats {
    return { ...this.stats };
  }

  /**
   * MASTER PLAN 2.0: Get recent message history
   */
  getMessageHistory(limit: number = 50): BridgeMessage[] {
    return this.messageHistory.slice(-limit);
  }

  /**
   * MASTER PLAN 2.0: Emergency bypass for critical situations
   */
  enableEmergencyBypass(reason: string): void {
    console.warn(`🚨 Communication Bridge emergency bypass enabled: ${reason}`);
    this.config.emergencyBypass = true;
    this.technicalFilter.enableEmergencyBypass(reason);
  }

  disableEmergencyBypass(): void {
    console.log('🛡️ Communication Bridge emergency bypass disabled');
    this.config.emergencyBypass = false;
    this.technicalFilter.disableEmergencyBypass();
  }

  /**
   * MASTER PLAN 2.0: Update bridge configuration
   */
  updateConfig(newConfig: Partial<BridgeConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('⚙️ Communication Bridge configuration updated');
  }

  /**
   * MASTER PLAN 2.0: Test complete bridge flow
   */
  async testBridgeFlow(sampleSeniorRequest: string): Promise<{
    consciousToCore: any;
    coreToConscious: any;
    healthCheck: any;
    stats: BridgeStats;
  }> {
    console.log('🧪 Testing complete Communication Bridge flow');

    const consciousToCore = await this.processConsciousToCore(sampleSeniorRequest);
    const coreToConscious = await this.processCoreToConscious(
      'Task completed successfully',
      sampleSeniorRequest
    );
    const healthCheck = await this.performHealthCheck();
    const stats = this.getBridgeStats();

    return {
      consciousToCore,
      coreToConscious,
      healthCheck,
      stats
    };
  }
}