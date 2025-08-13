// MASTER PLAN 2.0: JulesTool.ts
// STATUS: Ny huvudklass för Jules Tool integration
// INTEGRATION: Core Agent Tool för Jules funktionalitet
// ARCHITECTURE: Dual Consciousness Architecture compliant

import { AutonomousMergeManager } from './merge/AutonomousMergeManager.js';
import { GitHubClient } from './GitHubClient.js';
import { RealGitHubMerger } from './merge/RealGitHubMerger.js';
import { 
  JulesToolConfig, 
  TaskTemplate, 
  JulesTask, 
  JulesToolResponse,
  MergeConfig,
  ArchitectureComplianceCheck,
  AgentType
} from './types.js';

/**
 * MASTER PLAN 2.0 Jules Tool
 * 
 * Huvudklass för Jules integration i Dual Consciousness Architecture:
 * - Endast tillgänglig för Core Agent
 * - Wrapper runt refaktorerad merge system och GitHub client
 * - LangChain tool patterns för integration
 * - Communication Bridge kompatibilitet
 * - Senior-friendly error handling
 */
export class JulesTool {
  private githubClient: GitHubClient;
  private mergeManager: AutonomousMergeManager;
  private config: JulesToolConfig;
  private isInitialized: boolean = false;

  constructor(config: JulesToolConfig) {
    this.config = config;
    this.githubClient = new GitHubClient(config);
    
    const mergeConfig: MergeConfig = {
      previewMode: true,
      autoMergeEnabled: true,
      requireSeniorApproval: true,
      dualConsciousnessCheck: true,
      guardrailsEnabled: true,
      communicationBridgeRequired: true
    };
    
    this.mergeManager = new AutonomousMergeManager(this.githubClient, mergeConfig);
    
    console.log('🎯 Master Plan 2.0 Jules Tool initialized');
  }

  /**
   * MASTER PLAN 2.0: Initialize Jules Tool with health checks
   */
  async initialize(): Promise<JulesToolResponse> {
    try {
      console.log('🔧 Initializing Master Plan 2.0 Jules Tool...');
      
      // Health check GitHub connection
      const githubHealth = await this.githubClient.healthCheck();
      if (!githubHealth.connected) {
        throw new Error(`GitHub connection failed: ${githubHealth.error}`);
      }
      
      // Verify configuration
      this.validateConfiguration();
      
      this.isInitialized = true;
      
      console.log('✅ Master Plan 2.0 Jules Tool initialized successfully');
      
      return {
        success: true,
        message: 'Jules Tool initialized successfully',
        seniorFriendlyMessage: 'Systemet är redo att hjälpa dig',
        data: {
          githubConnected: true,
          rateLimit: githubHealth.rateLimit,
          dualConsciousnessEnabled: true
        }
      };
    } catch (error) {
      console.error('❌ Jules Tool initialization failed:', error);
      
      return {
        success: false,
        message: `Initialization failed: ${error}`,
        error: error instanceof Error ? error.message : 'Unknown error',
        seniorFriendlyMessage: 'Systemet kunde inte startas. Kontakta support.'
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Validate configuration
   */
  private validateConfiguration(): void {
    const required = ['githubToken', 'repoOwner', 'repoName', 'julesLabel'];
    const missing = required.filter(key => !this.config[key as keyof JulesToolConfig]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required configuration: ${missing.join(', ')}`);
    }
    
    console.log('✅ Jules Tool configuration validated');
  }

  /**
   * MASTER PLAN 2.0: Create Jules task from technical specification
   * 
   * @param specification - Technical specification from Communication Bridge
   * @returns Promise<JulesToolResponse>
   */
  async createTaskFromSpecification(specification: {
    title: string;
    description: string;
    complexity: 'low' | 'medium' | 'high';
    targetAgent: AgentType;
    seniorRequest?: string;
    technicalRequirements?: string[];
  }): Promise<JulesToolResponse> {
    if (!this.isInitialized) {
      const initResult = await this.initialize();
      if (!initResult.success) {
        return initResult;
      }
    }

    try {
      console.log(`🎯 Creating Jules task from specification: ${specification.title}`);
      
      // Create task template with Master Plan 2.0 enhancements
      const taskTemplate: TaskTemplate = {
        name: `jules-task-${Date.now()}`,
        title: specification.title,
        description: specification.description,
        targetAgent: specification.targetAgent,
        complexity: specification.complexity,
        seniorInstructions: this.generateSeniorInstructions(specification),
        technicalRequirements: [
          'Master Plan 2.0 architecture compliance',
          'Dual consciousness pattern adherence',
          'Communication bridge integration',
          'Senior-friendly interface preservation',
          ...(specification.technicalRequirements || [])
        ]
      };
      
      // Create GitHub issue for Jules
      const issue = await this.githubClient.createJulesTask(taskTemplate);
      
      console.log(`✅ Jules task created: Issue #${issue.number}`);
      
      return {
        success: true,
        message: `Jules task created successfully: Issue #${issue.number}`,
        seniorFriendlyMessage: 'Uppgiften har skickats till systemet och arbetet börjar snart',
        data: {
          issueNumber: issue.number,
          taskTemplate,
          estimatedTime: this.estimateTaskTime(specification.complexity)
        },
        requiresApproval: specification.complexity === 'high',
        estimatedTime: this.estimateTaskTime(specification.complexity)
      };
    } catch (error) {
      console.error('❌ Failed to create Jules task:', error);
      
      return {
        success: false,
        message: `Failed to create Jules task: ${error}`,
        error: error instanceof Error ? error.message : 'Unknown error',
        seniorFriendlyMessage: 'Kunde inte skapa uppgiften. Försök igen senare.'
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Generate senior-friendly instructions
   */
  private generateSeniorInstructions(specification: any): string {
    const baseInstructions = 'Ensure all changes maintain senior-friendly interface and hide technical complexity';
    
    if (specification.seniorRequest) {
      return `${baseInstructions}. Original senior request: "${specification.seniorRequest}"`;
    }
    
    return baseInstructions;
  }

  /**
   * MASTER PLAN 2.0: Estimate task completion time
   */
  private estimateTaskTime(complexity: 'low' | 'medium' | 'high'): number {
    const timeEstimates = {
      low: 15,    // 15 minutes
      medium: 45, // 45 minutes
      high: 120   // 2 hours
    };
    
    return timeEstimates[complexity];
  }

  /**
   * MASTER PLAN 2.0: Monitor task progress
   * 
   * @param issueNumber - GitHub issue number
   * @returns Promise<JulesToolResponse>
   */
  async monitorTaskProgress(issueNumber: number): Promise<JulesToolResponse> {
    try {
      console.log(`📊 Monitoring Jules task progress: Issue #${issueNumber}`);
      
      const completion = await this.githubClient.checkTaskCompletion(issueNumber);
      
      return {
        success: true,
        message: `Task status: ${completion.status}`,
        seniorFriendlyMessage: completion.seniorFriendlyStatus || 'Kontrollerar status...',
        data: {
          issueNumber,
          status: completion.status,
          isComplete: completion.isComplete,
          prUrl: completion.prUrl
        }
      };
    } catch (error) {
      console.error(`❌ Failed to monitor task progress for issue #${issueNumber}:`, error);
      
      return {
        success: false,
        message: `Failed to monitor task: ${error}`,
        error: error instanceof Error ? error.message : 'Unknown error',
        seniorFriendlyMessage: 'Kunde inte kontrollera status. Försök igen senare.'
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Handle completed task (trigger merge process)
   * 
   * @param issueNumber - GitHub issue number
   * @param prUrl - Pull request URL
   * @returns Promise<JulesToolResponse>
   */
  async handleCompletedTask(issueNumber: number, prUrl: string): Promise<JulesToolResponse> {
    try {
      console.log(`🎉 Handling completed Jules task: Issue #${issueNumber}, PR: ${prUrl}`);
      
      // Trigger autonomous merge process
      await this.mergeManager.handlePullRequest(prUrl);
      
      // Close the original issue
      await this.githubClient.closeTask(issueNumber, 'Task completed and PR processed by Master Plan 2.0 system');
      
      return {
        success: true,
        message: `Task completed and merge process initiated for PR: ${prUrl}`,
        seniorFriendlyMessage: 'Uppgiften är slutförd och ändringarna granskas nu',
        data: {
          issueNumber,
          prUrl,
          mergeStatus: 'initiated'
        }
      };
    } catch (error) {
      console.error(`❌ Failed to handle completed task for issue #${issueNumber}:`, error);
      
      return {
        success: false,
        message: `Failed to handle completed task: ${error}`,
        error: error instanceof Error ? error.message : 'Unknown error',
        seniorFriendlyMessage: 'Problem uppstod vid slutförandet. Kontakta support.'
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Create "Hello World" app (for Fas 0 testing)
   * 
   * @param seniorRequest - Original request from senior user
   * @returns Promise<JulesToolResponse>
   */
  async createHelloWorldApp(seniorRequest: string = 'skapa en enkel app'): Promise<JulesToolResponse> {
    console.log(`🌍 Creating Hello World app for senior request: "${seniorRequest}"`);
    
    const specification = {
      title: 'Create Hello World App - Master Plan 2.0 Test',
      description: `
**🎯 MASTER PLAN 2.0 HELLO WORLD TEST**

**Senior Request:** "${seniorRequest}"

**🎭 DUAL CONSCIOUSNESS REQUIREMENTS:**
This is a test of the Master Plan 2.0 dual consciousness architecture.

**📋 IMPLEMENTATION REQUIREMENTS:**
1. Create a simple "Hello World" web application
2. Use Next.js + React for senior-friendly interface
3. Ensure zero technical complexity is exposed to seniors
4. Include basic styling with Tailwind CSS
5. Deploy-ready configuration for Vercel

**✅ SUCCESS CRITERIA:**
- Functional "Hello World" app that loads in browser
- Senior-friendly interface (large text, simple design)
- Master Plan 2.0 architecture compliance
- Ready for deployment
- Comprehensive test coverage

**🎭 SENIOR-FRIENDLY FEATURES:**
- Large, readable text
- Simple, clean design
- No technical jargon visible
- Encouraging welcome message in Swedish

This task tests the complete flow: Senior request → Communication Bridge → Core Agent → Jules Tool → Working app
      `,
      complexity: 'low' as const,
      targetAgent: 'core' as const,
      seniorRequest,
      technicalRequirements: [
        'Next.js + React implementation',
        'Tailwind CSS styling',
        'Vercel deployment configuration',
        'Swedish language support',
        'Senior-friendly design patterns'
      ]
    };
    
    return await this.createTaskFromSpecification(specification);
  }

  /**
   * MASTER PLAN 2.0: Get all active tasks
   * 
   * @returns Promise<JulesToolResponse>
   */
  async getActiveTasks(): Promise<JulesToolResponse> {
    try {
      console.log('📋 Getting all active Jules tasks');
      
      const tasks = await this.githubClient.getActiveJulesTasks();
      
      return {
        success: true,
        message: `Found ${tasks.length} active tasks`,
        seniorFriendlyMessage: `${tasks.length} uppgifter pågår just nu`,
        data: {
          tasks,
          count: tasks.length
        }
      };
    } catch (error) {
      console.error('❌ Failed to get active tasks:', error);
      
      return {
        success: false,
        message: `Failed to get active tasks: ${error}`,
        error: error instanceof Error ? error.message : 'Unknown error',
        seniorFriendlyMessage: 'Kunde inte hämta uppgifter. Försök igen senare.'
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Health check for entire Jules Tool system
   * 
   * @returns Promise<JulesToolResponse>
   */
  async healthCheck(): Promise<JulesToolResponse> {
    try {
      console.log('🏥 Performing Jules Tool health check');
      
      const githubHealth = await this.githubClient.healthCheck();
      const mergerHealth = await new RealGitHubMerger(this.config.githubToken).healthCheck();
      
      const allHealthy = githubHealth.connected && mergerHealth.connected;
      
      return {
        success: allHealthy,
        message: allHealthy ? 'All systems healthy' : 'Some systems have issues',
        seniorFriendlyMessage: allHealthy ? 'Systemet fungerar bra' : 'Vissa delar av systemet har problem',
        data: {
          github: githubHealth,
          merger: mergerHealth,
          initialized: this.isInitialized,
          dualConsciousness: true
        }
      };
    } catch (error) {
      console.error('❌ Health check failed:', error);
      
      return {
        success: false,
        message: `Health check failed: ${error}`,
        error: error instanceof Error ? error.message : 'Unknown error',
        seniorFriendlyMessage: 'Systemkontroll misslyckades'
      };
    }
  }

  /**
   * MASTER PLAN 2.0: Get tool configuration (for debugging)
   */
  getConfiguration(): Partial<JulesToolConfig> {
    return {
      repoOwner: this.config.repoOwner,
      repoName: this.config.repoName,
      julesLabel: this.config.julesLabel,
      pollInterval: this.config.pollInterval,
      autoApprove: this.config.autoApprove,
      // Exclude sensitive data like tokens
    };
  }
}