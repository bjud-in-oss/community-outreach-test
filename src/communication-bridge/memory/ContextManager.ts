// MASTER PLAN 2.0: ContextManager.ts
// STATUS: Strukturerad tanke/minne överföring mellan agenter
// INTEGRATION: Communication Bridge - Context preservation och minneshantering
// ARCHITECTURE: Dual Consciousness Architecture compliant

export interface ContextEntry {
  id: string;
  timestamp: Date;
  agentType: 'conscious' | 'core' | 'bridge';
  contextType: 'thought' | 'memory' | 'decision' | 'state' | 'error';
  content: any;
  metadata: {
    priority: 'low' | 'medium' | 'high' | 'critical';
    seniorSafe: boolean;
    relatedEntries: string[];
    tags: string[];
  };
  expiresAt?: Date;
}

export interface ThoughtProcess {
  id: string;
  initiatedBy: 'conscious' | 'core' | 'bridge';
  startTime: Date;
  endTime?: Date;
  steps: ThoughtStep[];
  conclusion?: any;
  seniorSummary?: string;
}

export interface ThoughtStep {
  stepId: string;
  timestamp: Date;
  agent: 'conscious' | 'core' | 'bridge';
  action: string;
  input: any;
  output: any;
  reasoning: string;
  confidence: number;
  seniorVisible: boolean;
}

export interface MemorySnapshot {
  id: string;
  timestamp: Date;
  agentStates: {
    conscious: any;
    core: any;
    bridge: any;
  };
  activeContexts: string[];
  seniorInteractionHistory: any[];
  systemHealth: {
    memoryUsage: number;
    processingLoad: number;
    errorRate: number;
  };
}

export interface ContextManagerConfig {
  maxContextEntries: number;
  maxThoughtProcesses: number;
  memorySnapshotInterval: number;
  autoCleanupEnabled: boolean;
  seniorSafetyMode: boolean;
  debugMode: boolean;
}

/**
 * MASTER PLAN 2.0 Context Manager
 * 
 * Hanterar strukturerad information överföring:
 * - Bevarar kontext mellan agenter
 * - Strukturerad tanke/minne överföring via JSON
 * - Spårbar kommunikation för debugging
 * - Minnesoptimering för att förhindra overflow
 * - Senior-säker kontexthantering
 */
export class ContextManager {
  private contexts: Map<string, ContextEntry> = new Map();
  private thoughtProcesses: Map<string, ThoughtProcess> = new Map();
  private memorySnapshots: MemorySnapshot[] = [];
  private config: ContextManagerConfig;
  private cleanupInterval?: NodeJS.Timeout;

  constructor(config: Partial<ContextManagerConfig> = {}) {
    this.config = {
      maxContextEntries: 1000,
      maxThoughtProcesses: 100,
      memorySnapshotInterval: 30,
      autoCleanupEnabled: true,
      seniorSafetyMode: true,
      debugMode: false,
      ...config
    };

    this.initializeCleanupScheduler();
    console.log('🧠 Context Manager initialized for Master Plan 2.0');
  }

  /**
   * MASTER PLAN 2.0: Store context entry with senior safety checks
   */
  async storeContext(
    agentType: 'conscious' | 'core' | 'bridge',
    contextType: 'thought' | 'memory' | 'decision' | 'state' | 'error',
    content: any,
    metadata: {
      priority?: 'low' | 'medium' | 'high' | 'critical';
      seniorSafe?: boolean;
      relatedEntries?: string[];
      tags?: string[];
      expiresIn?: number;
    } = {}
  ): Promise<string> {
    const contextId = `ctx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    let seniorSafe = metadata.seniorSafe ?? true;
    if (this.config.seniorSafetyMode && agentType === 'core') {
      seniorSafe = await this.performSeniorSafetyCheck(content);
    }

    const contextEntry: ContextEntry = {
      id: contextId,
      timestamp: new Date(),
      agentType,
      contextType,
      content: this.sanitizeContent(content, seniorSafe),
      metadata: {
        priority: metadata.priority ?? 'medium',
        seniorSafe,
        relatedEntries: metadata.relatedEntries ?? [],
        tags: metadata.tags ?? []
      },
      expiresAt: metadata.expiresIn ? 
        new Date(Date.now() + metadata.expiresIn * 60 * 1000) : undefined
    };

    this.contexts.set(contextId, contextEntry);

    if (this.contexts.size > this.config.maxContextEntries) {
      await this.performCleanup();
    }

    if (this.config.debugMode) {
      console.log(`🧠 Context stored: ${contextId} (${agentType} → ${contextType})`);
    }

    return contextId;
  }

  /**
   * MASTER PLAN 2.0: Retrieve context with senior safety filtering
   */
  async getContext(
    contextId: string,
    requestingAgent: 'conscious' | 'core' | 'bridge'
  ): Promise<ContextEntry | null> {
    const context = this.contexts.get(contextId);
    
    if (!context) {
      return null;
    }

    if (context.expiresAt && context.expiresAt < new Date()) {
      this.contexts.delete(contextId);
      return null;
    }

    if (requestingAgent === 'conscious' && !context.metadata.seniorSafe) {
      if (this.config.debugMode) {
        console.log(`🛡️ Context ${contextId} blocked for conscious agent (not senior-safe)`);
      }
      return null;
    }

    return context;
  }

  /**
   * MASTER PLAN 2.0: Start structured thought process
   */
  async startThoughtProcess(
    initiatedBy: 'conscious' | 'core' | 'bridge',
    initialInput: any,
    purpose: string
  ): Promise<string> {
    const processId = `thought-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const thoughtProcess: ThoughtProcess = {
      id: processId,
      initiatedBy,
      startTime: new Date(),
      steps: [],
      seniorSummary: this.generateSeniorSummary(purpose, initialInput)
    };

    this.thoughtProcesses.set(processId, thoughtProcess);

    await this.addThoughtStep(
      processId,
      initiatedBy,
      'initiate',
      initialInput,
      { purpose },
      `Starting thought process: ${purpose}`,
      0.8,
      initiatedBy === 'conscious'
    );

    if (this.config.debugMode) {
      console.log(`🧠 Thought process started: ${processId} by ${initiatedBy}`);
    }

    return processId;
  }

  /**
   * MASTER PLAN 2.0: Add step to thought process
   */
  async addThoughtStep(
    processId: string,
    agent: 'conscious' | 'core' | 'bridge',
    action: string,
    input: any,
    output: any,
    reasoning: string,
    confidence: number,
    seniorVisible: boolean = false
  ): Promise<boolean> {
    const thoughtProcess = this.thoughtProcesses.get(processId);
    
    if (!thoughtProcess) {
      console.warn(`⚠️ Thought process ${processId} not found`);
      return false;
    }

    const step: ThoughtStep = {
      stepId: `step-${thoughtProcess.steps.length + 1}`,
      timestamp: new Date(),
      agent,
      action,
      input: this.sanitizeContent(input, seniorVisible),
      output: this.sanitizeContent(output, seniorVisible),
      reasoning,
      confidence,
      seniorVisible
    };

    thoughtProcess.steps.push(step);

    await this.storeContext(
      agent,
      'thought',
      step,
      {
        priority: 'medium',
        seniorSafe: seniorVisible,
        relatedEntries: [processId],
        tags: ['thought-step', action]
      }
    );

    if (this.config.debugMode) {
      console.log(`🧠 Thought step added: ${processId} → ${step.stepId} (${agent})`);
    }

    return true;
  }

  /**
   * MASTER PLAN 2.0: Transfer structured memory between agents
   */
  async transferMemory(
    fromAgent: 'conscious' | 'core' | 'bridge',
    toAgent: 'conscious' | 'core' | 'bridge',
    memoryData: any,
    preserveStructure: boolean = true
  ): Promise<{
    success: boolean;
    transferId: string;
    filteredData?: any;
    warnings?: string[];
  }> {
    const transferId = `transfer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const warnings: string[] = [];

    try {
      let processedData = memoryData;

      if (toAgent === 'conscious' && this.config.seniorSafetyMode) {
        const safetyResult = await this.applySeniorSafetyFiltering(memoryData);
        processedData = safetyResult.filteredData;
        if (safetyResult.warnings.length > 0) {
          warnings.push(...safetyResult.warnings);
        }
      }

      if (preserveStructure) {
        processedData = this.preserveMemoryStructure(processedData, fromAgent, toAgent);
      }

      await this.storeContext(
        'bridge',
        'memory',
        {
          transferId,
          fromAgent,
          toAgent,
          originalSize: JSON.stringify(memoryData).length,
          processedSize: JSON.stringify(processedData).length,
          preserveStructure,
          warnings
        },
        {
          priority: 'medium',
          seniorSafe: toAgent === 'conscious',
          tags: ['memory-transfer', `${fromAgent}-to-${toAgent}`]
        }
      );

      if (this.config.debugMode) {
        console.log(`🧠 Memory transferred: ${transferId} (${fromAgent} → ${toAgent})`);
      }

      return {
        success: true,
        transferId,
        filteredData: processedData,
        warnings: warnings.length > 0 ? warnings : undefined
      };
    } catch (error) {
      console.error(`❌ Memory transfer failed: ${transferId}`, error);
      
      return {
        success: false,
        transferId,
        warnings: [`Transfer failed: ${error}`]
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Get contexts by agent and type
   */
  getContextsByAgent(
    agentType: 'conscious' | 'core' | 'bridge',
    contextType?: 'thought' | 'memory' | 'decision' | 'state' | 'error',
    limit: number = 50
  ): ContextEntry[] {
    const contexts = Array.from(this.contexts.values())
      .filter(ctx => {
        if (ctx.agentType !== agentType) return false;
        if (contextType && ctx.contextType !== contextType) return false;
        if (ctx.expiresAt && ctx.expiresAt < new Date()) return false;
        return true;
      })
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    return contexts;
  }

  /**
   * MASTER PLAN 2.0: Get context manager statistics
   */
  getStats(): {
    contexts: number;
    thoughtProcesses: number;
    memorySnapshots: number;
    memoryUsage: number;
    errorRate: number;
    seniorSafeContexts: number;
  } {
    const seniorSafeContexts = Array.from(this.contexts.values())
      .filter(ctx => ctx.metadata.seniorSafe).length;

    return {
      contexts: this.contexts.size,
      thoughtProcesses: this.thoughtProcesses.size,
      memorySnapshots: this.memorySnapshots.length,
      memoryUsage: Array.from(this.contexts.values())
        .reduce((sum, ctx) => sum + JSON.stringify(ctx.content).length, 0),
      errorRate: this.calculateErrorRate(),
      seniorSafeContexts
    };
  }

  // Private helper methods
  private async performSeniorSafetyCheck(content: any): Promise<boolean> {
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
    
    const dangerousPatterns = [
      /error|exception|crash|fail/gi,
      /stack trace|debug|log/gi,
      /api|endpoint|server|database/gi,
      /authentication|authorization|token/gi,
      /configuration|deployment|build/gi
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(contentStr)) {
        return false;
      }
    }

    return true;
  }

  private sanitizeContent(content: any, seniorSafe: boolean): any {
    if (!seniorSafe || !this.config.seniorSafetyMode) {
      return content;
    }

    if (typeof content === 'string') {
      return content
        .replace(/error/gi, 'problem')
        .replace(/failed/gi, 'did not work')
        .replace(/crash/gi, 'stopped')
        .replace(/exception/gi, 'issue');
    }

    if (typeof content === 'object' && content !== null) {
      const sanitized = { ...content };
      delete sanitized.stackTrace;
      delete sanitized.debugInfo;
      delete sanitized.internalError;
      delete sanitized.systemDetails;
      return sanitized;
    }

    return content;
  }

  private generateSeniorSummary(purpose: string, input: any): string {
    const purposeMap: Record<string, string> = {
      'create_app': 'Skapar en app åt dig',
      'translate_content': 'Översätter innehåll',
      'automate_task': 'Automatiserar en uppgift',
      'process_request': 'Behandlar din begäran',
      'analyze_data': 'Analyserar information',
      'generate_content': 'Skapar innehåll'
    };

    const friendlyPurpose = purposeMap[purpose] || 'Arbetar på din begäran';
    return `${friendlyPurpose}. Vi håller dig uppdaterad om framstegen.`;
  }

  private async applySeniorSafetyFiltering(memoryData: any): Promise<{
    filteredData: any;
    warnings: string[];
  }> {
    const warnings: string[] = [];
    let filteredData = memoryData;

    if (typeof memoryData === 'object' && memoryData !== null) {
      filteredData = { ...memoryData };
      
      const technicalFields = [
        'stackTrace', 'debugInfo', 'internalError', 'systemDetails',
        'apiKeys', 'tokens', 'credentials', 'configuration',
        'errorDetails', 'technicalSpecs', 'implementationDetails'
      ];

      for (const field of technicalFields) {
        if (filteredData[field]) {
          delete filteredData[field];
          warnings.push(`Removed technical field: ${field}`);
        }
      }
    }

    return { filteredData, warnings };
  }

  private preserveMemoryStructure(
    data: any,
    fromAgent: 'conscious' | 'core' | 'bridge',
    toAgent: 'conscious' | 'core' | 'bridge'
  ): any {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    return {
      ...data,
      _metadata: {
        transferredFrom: fromAgent,
        transferredTo: toAgent,
        timestamp: new Date().toISOString(),
        structurePreserved: true
      }
    };
  }

  private calculateErrorRate(): number {
    const errorContexts = Array.from(this.contexts.values())
      .filter(ctx => ctx.contextType === 'error');
    
    const totalContexts = this.contexts.size;
    return totalContexts > 0 ? (errorContexts.length / totalContexts) * 100 : 0;
  }

  private initializeCleanupScheduler(): void {
    if (this.config.autoCleanupEnabled) {
      this.cleanupInterval = setInterval(() => {
        this.performCleanup();
      }, this.config.memorySnapshotInterval * 60 * 1000);
    }
  }

  private async performCleanup(): Promise<void> {
    const now = new Date();
    let cleanedCount = 0;

    for (const [id, context] of this.contexts) {
      if (context.expiresAt && context.expiresAt < now) {
        this.contexts.delete(id);
        cleanedCount++;
      }
    }

    if (this.contexts.size > this.config.maxContextEntries) {
      const sortedContexts = Array.from(this.contexts.entries())
        .sort(([, a], [, b]) => {
          const priorityOrder = { low: 0, medium: 1, high: 2, critical: 3 };
          const priorityDiff = priorityOrder[a.metadata.priority] - priorityOrder[b.metadata.priority];
          if (priorityDiff !== 0) return priorityDiff;
          return a.timestamp.getTime() - b.timestamp.getTime();
        });

      const toRemove = sortedContexts.slice(0, this.contexts.size - this.config.maxContextEntries);
      for (const [id] of toRemove) {
        this.contexts.delete(id);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0 && this.config.debugMode) {
      console.log(`🧹 Context cleanup completed: ${cleanedCount} entries removed`);
    }
  }

  shutdown(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    console.log('🧠 Context Manager shutdown completed');
  }
}