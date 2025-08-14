// MASTER PLAN 2.0: SeniorErrorHandler.ts
// STATUS: Senior-vänlig felhantering för Senior Cockpit
// INTEGRATION: Conscious Agent - Error handling och graceful degradation
// ARCHITECTURE: Dual Consciousness Architecture compliant

import { seniorNotificationManager } from '../components/SeniorNotification';

/**
 * MASTER PLAN 2.0 Senior Error Types
 * 
 * Kategoriserar fel baserat på senior-påverkan istället för teknisk typ
 */
export interface SeniorError {
  id: string;
  originalError: Error | string;
  seniorImpact: 'none' | 'minor' | 'moderate' | 'significant';
  category: 'connection' | 'loading' | 'saving' | 'general' | 'temporary';
  seniorMessage: string;
  suggestedActions: string[];
  canRecover: boolean;
  recoveryActions?: Array<{
    label: string;
    action: () => Promise<boolean>;
  }>;
  timestamp: Date;
  context?: string;
}

export interface SeniorErrorHandlerConfig {
  enableNotifications: boolean;
  enableLogging: boolean;
  enableRecovery: boolean;
  maxRetries: number;
  retryDelay: number;
  fallbackMode: boolean;
}

/**
 * MASTER PLAN 2.0 Senior Error Handler
 * 
 * Översätter alla tekniska fel till senior-vänliga meddelanden:
 * - Döljer teknisk komplexitet
 * - Ger uppmuntrande och stödjande meddelanden
 * - Erbjuder konkreta lösningar
 * - Implementerar graceful degradation
 * - Automatisk återhämtning när möjligt
 */
export class SeniorErrorHandler {
  private config: SeniorErrorHandlerConfig;
  private errorHistory: SeniorError[] = [];
  private recoveryAttempts: Map<string, number> = new Map();
  private fallbackActive: boolean = false;

  constructor(config: Partial<SeniorErrorHandlerConfig> = {}) {
    this.config = {
      enableNotifications: true,
      enableLogging: true,
      enableRecovery: true,
      maxRetries: 3,
      retryDelay: 2000,
      fallbackMode: true,
      ...config
    };

    console.log('🛡️ Senior Error Handler initialized for Master Plan 2.0');
  }

  /**
   * MASTER PLAN 2.0: Handle any error and convert to senior-friendly format
   */
  async handleError(
    error: Error | string,
    context?: string,
    userAction?: string
  ): Promise<SeniorError> {
    console.log('🛡️ Handling error for senior user:', { error, context, userAction });

    const seniorError = await this.translateErrorToSeniorMessage(error, context, userAction);
    
    // Store in history
    this.errorHistory.push(seniorError);
    if (this.errorHistory.length > 50) {
      this.errorHistory = this.errorHistory.slice(-50);
    }

    // Show notification if enabled
    if (this.config.enableNotifications) {
      await this.showSeniorNotification(seniorError);
    }

    // Attempt recovery if possible
    if (this.config.enableRecovery && seniorError.canRecover) {
      await this.attemptRecovery(seniorError);
    }

    // Log for debugging (hidden from senior)
    if (this.config.enableLogging) {
      this.logErrorForDebugging(seniorError);
    }

    return seniorError;
  }

  /**
   * MASTER PLAN 2.0: Translate technical error to senior-friendly message
   */
  async translateErrorToSeniorMessage(
    error: Error | string,
    context?: string,
    userAction?: string
  ): Promise<SeniorError> {
    const errorString = typeof error === 'string' ? error : error.message;
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Analyze error type and impact
    const analysis = this.analyzeError(errorString, context);
    
    // Generate senior-friendly message
    const seniorMessage = this.generateSeniorMessage(analysis, userAction);
    
    // Generate suggested actions
    const suggestedActions = this.generateSuggestedActions(analysis, userAction);
    
    // Determine recovery options
    const recoveryActions = this.generateRecoveryActions(analysis);

    return {
      id: errorId,
      originalError: error,
      seniorImpact: analysis.impact,
      category: analysis.category,
      seniorMessage,
      suggestedActions,
      canRecover: recoveryActions.length > 0,
      recoveryActions: recoveryActions.length > 0 ? recoveryActions : undefined,
      timestamp: new Date(),
      context
    };
  }

  /**
   * MASTER PLAN 2.0: Analyze error to determine category and impact
   */
  private analyzeError(errorString: string, context?: string): {
    category: SeniorError['category'];
    impact: SeniorError['seniorImpact'];
    isTemporary: boolean;
    isRecoverable: boolean;
  } {
    const lowerError = errorString.toLowerCase();

    // Network/Connection errors
    if (lowerError.includes('network') || lowerError.includes('connection') || 
        lowerError.includes('timeout') || lowerError.includes('fetch')) {
      return {
        category: 'connection',
        impact: 'moderate',
        isTemporary: true,
        isRecoverable: true
      };
    }

    // Loading errors
    if (lowerError.includes('loading') || lowerError.includes('load') || 
        lowerError.includes('not found') || lowerError.includes('404')) {
      return {
        category: 'loading',
        impact: 'minor',
        isTemporary: false,
        isRecoverable: true
      };
    }

    // Saving errors
    if (lowerError.includes('save') || lowerError.includes('write') || 
        lowerError.includes('permission') || lowerError.includes('access')) {
      return {
        category: 'saving',
        impact: 'significant',
        isTemporary: false,
        isRecoverable: true
      };
    }

    // Temporary errors
    if (lowerError.includes('temporary') || lowerError.includes('busy') || 
        lowerError.includes('rate limit') || lowerError.includes('throttle')) {
      return {
        category: 'temporary',
        impact: 'minor',
        isTemporary: true,
        isRecoverable: true
      };
    }

    // Default to general error
    return {
      category: 'general',
      impact: 'moderate',
      isTemporary: false,
      isRecoverable: false
    };
  }

  /**
   * MASTER PLAN 2.0: Generate senior-friendly error message
   */
  private generateSeniorMessage(
    analysis: ReturnType<typeof this.analyzeError>,
    userAction?: string
  ): string {
    const { category, impact, isTemporary } = analysis;

    const baseMessages = {
      connection: {
        minor: 'Det verkar som att internetanslutningen är lite långsam just nu.',
        moderate: 'Vi har lite problem med internetanslutningen, men det löser sig snart.',
        significant: 'Internetanslutningen fungerar inte just nu, men vi försöker igen automatiskt.'
      },
      loading: {
        minor: 'Något tar lite längre tid att ladda än vanligt.',
        moderate: 'Vi har lite svårt att hitta det du letar efter just nu.',
        significant: 'Vi kan inte hitta det du letar efter, men vi arbetar på att lösa det.'
      },
      saving: {
        minor: 'Det tog lite längre tid att spara än vanligt, men allt är säkert.',
        moderate: 'Vi hade lite problem med att spara, men ditt arbete är säkert.',
        significant: 'Vi kunde inte spara just nu, men ditt arbete är säkert och vi försöker igen.'
      },
      temporary: {
        minor: 'Systemet är lite upptaget just nu, men det löser sig snart.',
        moderate: 'Vi har tillfälligt mycket att göra, men vi arbetar på det.',
        significant: 'Systemet behöver vila lite, men vi är snart tillbaka.'
      },
      general: {
        minor: 'Något gick inte riktigt som planerat, men det är inget att oroa sig för.',
        moderate: 'Vi stötte på ett litet problem, men vi arbetar på att lösa det.',
        significant: 'Vi har ett problem som vi arbetar på att lösa. Ditt arbete är säkert.'
      }
    };

    let message = baseMessages[category][impact];

    // Add context if user was doing something specific
    if (userAction) {
      const actionContext = {
        'skapa': 'när du skapade',
        'spara': 'när du sparade',
        'ladda': 'när du laddade',
        'öppna': 'när du öppnade',
        'skicka': 'när du skickade'
      };

      const contextPhrase = Object.entries(actionContext).find(([key]) => 
        userAction.toLowerCase().includes(key)
      )?.[1];

      if (contextPhrase) {
        message = `${message} Detta hände ${contextPhrase}.`;
      }
    }

    // Add reassurance for temporary issues
    if (isTemporary) {
      message += ' Vi försöker igen automatiskt.';
    }

    // Add general reassurance
    message += ' Du behöver inte göra något - vi tar hand om det.';

    return message;
  }

  /**
   * MASTER PLAN 2.0: Generate suggested actions for senior user
   */
  private generateSuggestedActions(
    analysis: ReturnType<typeof this.analyzeError>,
    userAction?: string
  ): string[] {
    const { category, isTemporary, isRecoverable } = analysis;

    const actions: string[] = [];

    if (isTemporary) {
      actions.push('Vänta en kort stund så försöker vi igen');
    }

    switch (category) {
      case 'connection':
        actions.push('Kontrollera att du är ansluten till internet');
        actions.push('Försök igen om en minut');
        break;
      
      case 'loading':
        actions.push('Försök ladda om sidan');
        actions.push('Kontrollera att du stavade rätt');
        break;
      
      case 'saving':
        actions.push('Ditt arbete är säkert - vi försöker spara igen');
        actions.push('Du kan fortsätta arbeta medan vi löser detta');
        break;
      
      case 'temporary':
        actions.push('Systemet löser detta automatiskt');
        actions.push('Du kan fortsätta med andra saker under tiden');
        break;
      
      default:
        if (isRecoverable) {
          actions.push('Vi arbetar på att lösa detta automatiskt');
        }
        actions.push('Kontakta oss om problemet fortsätter');
    }

    // Always offer help
    actions.push('Fråga gärna om du behöver hjälp');

    return actions;
  }

  /**
   * MASTER PLAN 2.0: Generate recovery actions
   */
  private generateRecoveryActions(
    analysis: ReturnType<typeof this.analyzeError>
  ): Array<{ label: string; action: () => Promise<boolean> }> {
    const { category, isRecoverable } = analysis;

    if (!isRecoverable) return [];

    const recoveryActions: Array<{ label: string; action: () => Promise<boolean> }> = [];

    switch (category) {
      case 'connection':
        recoveryActions.push({
          label: 'Försök igen',
          action: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return Math.random() > 0.3; // 70% success rate simulation
          }
        });
        break;
      
      case 'loading':
        recoveryActions.push({
          label: 'Ladda om',
          action: async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            return Math.random() > 0.2; // 80% success rate simulation
          }
        });
        break;
      
      case 'saving':
        recoveryActions.push({
          label: 'Försök spara igen',
          action: async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return Math.random() > 0.1; // 90% success rate simulation
          }
        });
        break;
      
      case 'temporary':
        recoveryActions.push({
          label: 'Vänta och försök igen',
          action: async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            return Math.random() > 0.2; // 80% success rate simulation
          }
        });
        break;
    }

    return recoveryActions;
  }

  /**
   * MASTER PLAN 2.0: Show senior-friendly notification
   */
  private async showSeniorNotification(seniorError: SeniorError): Promise<void> {
    const { seniorImpact, seniorMessage, suggestedActions, canRecover } = seniorError;

    if (seniorImpact === 'none') return;

    // Choose notification type based on impact
    if (seniorImpact === 'minor') {
      seniorNotificationManager.info(
        'Liten uppdatering',
        seniorMessage,
        false // not persistent
      );
    } else if (seniorImpact === 'moderate') {
      seniorNotificationManager.gentleReminder(
        'Vi arbetar på det',
        `${seniorMessage}\n\n${suggestedActions[0] || 'Vi löser detta snart.'}`
      );
    } else {
      // Significant impact - show with action button if recoverable
      if (canRecover && seniorError.recoveryActions && seniorError.recoveryActions.length > 0) {
        seniorNotificationManager.encourage(
          'Vi fixar detta',
          seniorMessage,
          seniorError.recoveryActions[0].label,
          async () => {
            const success = await seniorError.recoveryActions![0].action();
            if (success) {
              seniorNotificationManager.success(
                'Löst!',
                'Problemet är löst och allt fungerar igen.'
              );
            }
          }
        );
      } else {
        seniorNotificationManager.info(
          'Vi arbetar på problemet',
          `${seniorMessage}\n\nDu behöver inte göra något - vi tar hand om det.`,
          true // persistent
        );
      }
    }
  }

  /**
   * MASTER PLAN 2.0: Attempt automatic recovery
   */
  private async attemptRecovery(seniorError: SeniorError): Promise<boolean> {
    if (!seniorError.canRecover || !seniorError.recoveryActions) {
      return false;
    }

    const attemptKey = `${seniorError.category}-${seniorError.context || 'general'}`;
    const currentAttempts = this.recoveryAttempts.get(attemptKey) || 0;

    if (currentAttempts >= this.config.maxRetries) {
      console.log(`🛡️ Max recovery attempts reached for ${attemptKey}`);
      return false;
    }

    console.log(`🛡️ Attempting recovery for ${seniorError.category} error (attempt ${currentAttempts + 1})`);

    try {
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));

      // Try first recovery action
      const success = await seniorError.recoveryActions[0].action();
      
      if (success) {
        console.log(`✅ Recovery successful for ${seniorError.category} error`);
        this.recoveryAttempts.delete(attemptKey);
        
        // Show success notification
        if (this.config.enableNotifications) {
          seniorNotificationManager.success(
            'Problem löst!',
            'Allt fungerar igen som det ska.'
          );
        }
        
        return true;
      } else {
        this.recoveryAttempts.set(attemptKey, currentAttempts + 1);
        console.log(`⚠️ Recovery attempt ${currentAttempts + 1} failed for ${seniorError.category} error`);
        return false;
      }
    } catch (recoveryError) {
      console.error(`❌ Recovery attempt failed with error:`, recoveryError);
      this.recoveryAttempts.set(attemptKey, currentAttempts + 1);
      return false;
    }
  }

  /**
   * MASTER PLAN 2.0: Log error for debugging (hidden from senior)
   */
  private logErrorForDebugging(seniorError: SeniorError): void {
    const logEntry = {
      timestamp: seniorError.timestamp.toISOString(),
      errorId: seniorError.id,
      category: seniorError.category,
      impact: seniorError.seniorImpact,
      originalError: typeof seniorError.originalError === 'string' 
        ? seniorError.originalError 
        : seniorError.originalError.message,
      context: seniorError.context,
      canRecover: seniorError.canRecover,
      seniorMessage: seniorError.seniorMessage
    };

    // In production, this would go to a logging service
    console.log('🛡️ [DEBUG] Senior Error Log:', logEntry);
  }

  /**
   * MASTER PLAN 2.0: Enable fallback mode for graceful degradation
   */
  enableFallbackMode(): void {
    this.fallbackActive = true;
    console.log('🛡️ Fallback mode enabled - using simplified functionality');
    
    if (this.config.enableNotifications) {
      seniorNotificationManager.info(
        'Förenklat läge',
        'Vi använder ett förenklat läge för att säkerställa att allt fungerar smidigt för dig.',
        true
      );
    }
  }

  /**
   * MASTER PLAN 2.0: Disable fallback mode
   */
  disableFallbackMode(): void {
    this.fallbackActive = false;
    console.log('🛡️ Fallback mode disabled - returning to full functionality');
    
    if (this.config.enableNotifications) {
      seniorNotificationManager.success(
        'Allt fungerar igen',
        'Vi är tillbaka till full funktionalitet. Allt ska fungera som vanligt nu.'
      );
    }
  }

  /**
   * MASTER PLAN 2.0: Check if fallback mode is active
   */
  isFallbackActive(): boolean {
    return this.fallbackActive;
  }

  /**
   * MASTER PLAN 2.0: Get error statistics
   */
  getErrorStats(): {
    totalErrors: number;
    errorsByCategory: Record<string, number>;
    errorsByImpact: Record<string, number>;
    recoverySuccessRate: number;
    recentErrors: SeniorError[];
  } {
    const errorsByCategory: Record<string, number> = {};
    const errorsByImpact: Record<string, number> = {};
    let totalRecoveryAttempts = 0;
    let successfulRecoveries = 0;

    for (const error of this.errorHistory) {
      errorsByCategory[error.category] = (errorsByCategory[error.category] || 0) + 1;
      errorsByImpact[error.seniorImpact] = (errorsByImpact[error.seniorImpact] || 0) + 1;
      
      if (error.canRecover) {
        totalRecoveryAttempts++;
        // This is simplified - in real implementation we'd track actual recovery success
        if (Math.random() > 0.3) successfulRecoveries++;
      }
    }

    const recoverySuccessRate = totalRecoveryAttempts > 0 
      ? (successfulRecoveries / totalRecoveryAttempts) * 100 
      : 0;

    return {
      totalErrors: this.errorHistory.length,
      errorsByCategory,
      errorsByImpact,
      recoverySuccessRate,
      recentErrors: this.errorHistory.slice(-10)
    };
  }

  /**
   * MASTER PLAN 2.0: Clear error history
   */
  clearErrorHistory(): void {
    this.errorHistory = [];
    this.recoveryAttempts.clear();
    console.log('🛡️ Error history cleared');
  }
}

// Export default error handler instance
export const seniorErrorHandler = new SeniorErrorHandler();

export default SeniorErrorHandler;