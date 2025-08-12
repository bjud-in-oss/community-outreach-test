import { GitHubClient } from './github-client.js';
import { AutomationConfig, JulesTask, TaskTemplate, AgentWorkflow } from './types.js';
import { AutonomousMergeManager } from './merge/AutonomousMergeManager.js';
import * as cron from 'node-cron';

export class JulesAutomationAgent {
  private githubClient: GitHubClient;
  private config: AutomationConfig;
  private activeTasks: Map<number, JulesTask> = new Map();
  private workflows: Map<string, AgentWorkflow> = new Map();
  private isRunning: boolean = false;
  private mergeManager: AutonomousMergeManager;

  constructor(config: AutomationConfig) {
    this.config = config;
    this.githubClient = new GitHubClient(config);
    // Enable preview mode by default for better UX
    const mergeConfig = { previewMode: true, autoMergeEnabled: true };
    this.mergeManager = new AutonomousMergeManager(this.githubClient, this, mergeConfig);
  }

  /**
   * Start the automation agent
   */
  async start(): Promise<void> {
    console.log('🚀 Starting Jules Automation Agent...');
    this.isRunning = true;

    // Start monitoring loop with error handling
    try {
      await this.startMonitoring();
    } catch (error) {
      console.warn('⚠️  GitHub connection failed, continuing in offline mode');
      console.warn('   Fix your GITHUB_TOKEN in .env to enable full functionality');
    }
    
    // Schedule periodic checks
    cron.schedule('*/30 * * * * *', () => {
      if (this.isRunning) {
        this.checkAllTasks().catch(error => {
          console.warn('⚠️  Task check failed:', error.message);
        });
      }
    });

    console.log('✅ Jules Automation Agent started');
  }

  /**
   * Stop the automation agent
   */
  stop(): void {
    console.log('🛑 Stopping Jules Automation Agent...');
    this.isRunning = false;
  }

  /**
   * Create and execute a single task
   */
  async executeTask(taskTemplate: TaskTemplate): Promise<JulesTask> {
    console.log(`📝 Creating task: ${taskTemplate.title}`);

    const task: Omit<JulesTask, 'id' | 'createdAt' | 'status'> = {
      title: taskTemplate.title,
      description: taskTemplate.description,
    };

    // Create GitHub issue to trigger Jules
    const issue = await this.githubClient.createJulesTask(task);
    
    const julesTask: JulesTask = {
      id: `task-${issue.number}`,
      title: task.title,
      description: task.description,
      status: 'pending',
      githubIssueNumber: issue.number,
      createdAt: new Date(),
    };

    this.activeTasks.set(issue.number, julesTask);
    
    console.log(`✅ Task created: Issue #${issue.number}`);
    return julesTask;
  }

  /**
   * Execute a complete workflow with multiple tasks
   */
  async executeWorkflow(workflow: AgentWorkflow): Promise<void> {
    console.log(`🔄 Starting workflow: ${workflow.name}`);
    
    workflow.status = 'running';
    this.workflows.set(workflow.id, workflow);

    for (let i = 0; i < workflow.tasks.length; i++) {
      workflow.currentTaskIndex = i;
      const taskTemplate = workflow.tasks[i];
      
      console.log(`📋 Executing task ${i + 1}/${workflow.tasks.length}: ${taskTemplate.title}`);
      
      // Execute current task
      const task = await this.executeTask(taskTemplate);
      
      // Wait for task completion
      await this.waitForTaskCompletion(task.githubIssueNumber!);
      
      console.log(`✅ Task ${i + 1} completed`);
      
      // Small delay between tasks
      await this.sleep(2000);
    }

    workflow.status = 'completed';
    console.log(`🎉 Workflow completed: ${workflow.name}`);
  }

  /**
   * Wait for a specific task to complete
   */
  private async waitForTaskCompletion(issueNumber: number): Promise<void> {
    return new Promise((resolve) => {
      const checkInterval = setInterval(async () => {
        const completion = await this.githubClient.checkTaskCompletion(issueNumber);
        
        if (completion.isComplete) {
          clearInterval(checkInterval);
          
          // Update task status
          const task = this.activeTasks.get(issueNumber);
          if (task) {
            task.status = 'completed';
            task.completedAt = new Date();
            task.prUrl = completion.prUrl;
          }
          
          // Close the issue
          await this.githubClient.closeTask(issueNumber, 'Task completed successfully');
          
          resolve();
        }
      }, 5000); // Check every 5 seconds
    });
  }

  /**
   * Monitor all active tasks
   */
  private async startMonitoring(): Promise<void> {
    // Load existing active tasks from GitHub
    const activeIssues = await this.githubClient.getActiveJulesTasks();
    
    for (const issue of activeIssues) {
      if (!this.activeTasks.has(issue.number)) {
        const task: JulesTask = {
          id: `task-${issue.number}`,
          title: issue.title,
          description: issue.body,
          status: 'executing',
          githubIssueNumber: issue.number,
          createdAt: new Date(),
        };
        
        this.activeTasks.set(issue.number, task);
      }
    }
    
    console.log(`📊 Monitoring ${this.activeTasks.size} active tasks`);
  }

  /**
   * Check status of all active tasks
   */
  private async checkAllTasks(): Promise<void> {
    for (const [issueNumber, task] of this.activeTasks) {
      if (task.status === 'completed') continue;
      
      try {
        const completion = await this.githubClient.checkTaskCompletion(issueNumber);
        
        if (completion.isComplete && (task.status as string) !== 'completed') {
          console.log(`✅ Task completed: ${task.title}`);
          
          task.status = 'completed';
          task.completedAt = new Date();
          task.prUrl = completion.prUrl;
          
          // 🚀 NEW: Auto-merge the PR if available
          if (completion.prUrl) {
            console.log(`🔄 Attempting auto-merge for PR: ${completion.prUrl}`);
            try {
              await this.mergeManager.handlePullRequest(completion.prUrl);
              console.log(`✅ Auto-merge completed for: ${completion.prUrl}`);
            } catch (error) {
              console.warn(`⚠️  Auto-merge failed for ${completion.prUrl}:`, error instanceof Error ? error.message : 'Unknown error');
              // Continue with normal flow even if merge fails
            }
          }
          
          // Auto-close the issue
          await this.githubClient.closeTask(issueNumber, 'Task completed successfully');
        } else if (completion.status !== task.status) {
          task.status = completion.status as any;
          console.log(`📊 Task status updated: ${task.title} -> ${task.status}`);
        }
      } catch (error) {
        console.error(`❌ Error checking task ${issueNumber}:`, error);
      }
    }
  }

  /**
   * Get current status of all tasks
   */
  getTaskStatus(): JulesTask[] {
    return Array.from(this.activeTasks.values());
  }

  /**
   * Get workflow status
   */
  getWorkflowStatus(): AgentWorkflow[] {
    return Array.from(this.workflows.values());
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}