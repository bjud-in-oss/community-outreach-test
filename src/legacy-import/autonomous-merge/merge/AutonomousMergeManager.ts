import { GitHubClient } from '../github-client.js';
import { JulesAutomationAgent } from '../jules-agent.js';
import { TaskTemplate } from '../types.js';
import { RealGitHubMerger, MergeError } from './RealGitHubMerger.js';

export class Logger {
  public static log(message: string): void {
    console.log(`[MERGE-LOG] ${new Date().toISOString()}: ${message}`);
  }

  public static warn(message: string): void {
    console.warn(`[MERGE-WARN] ${new Date().toISOString()}: ${message}`);
  }

  public static error(message: string, error?: any): void {
    if (error) {
      console.error(`[MERGE-ERROR] ${new Date().toISOString()}: ${message}`, error);
    } else {
      console.error(`[MERGE-ERROR] ${new Date().toISOString()}: ${message}`);
    }
  }
}

export interface PRDetails {
  number: number;
  title: string;
  body: string;
  branchName: string;
  baseBranch: string;
  repo: string;
  user: { login: string };
  commits: Array<{ sha: string; commit: { message: string } }>;
  hasConflicts: boolean;
  html_url: string;
}

export interface MergeConfig {
  previewMode: boolean;
  autoMergeEnabled: boolean;
}

export class AutonomousMergeManager {
  private githubClient: GitHubClient;
  private julesAgent: JulesAutomationAgent;
  private config: MergeConfig;
  private realMerger: RealGitHubMerger;
  
  // 🚫 BLACKLIST: PRs that should never be processed
  private readonly BLACKLISTED_PRS = new Set([
    'https://github.com/MatRen74/community-outreach-test/pull/95',
    'https://github.com/MatRen74/community-outreach-test/pull/103',
    // Add more problematic PRs here
  ]);
  
  // 🔄 LOOP DETECTION: Track conflict resolution attempts
  private conflictAttempts = new Map<string, number>();
  private readonly MAX_CONFLICT_ATTEMPTS = 2;

  constructor(githubClient: GitHubClient, julesAgent: JulesAutomationAgent, config: MergeConfig = { previewMode: true, autoMergeEnabled: true }) {
    this.githubClient = githubClient;
    this.julesAgent = julesAgent;
    this.config = config;
    // Initialize real GitHub merger with token from environment
    this.realMerger = new RealGitHubMerger(process.env.GITHUB_TOKEN || '');
  }

  public async handlePullRequest(prUrl: string): Promise<void> {
    Logger.log(`🔄 Handling pull request: ${prUrl}`);
    
    // 🚫 BLACKLIST CHECK: Skip blacklisted PRs immediately
    if (this.BLACKLISTED_PRS.has(prUrl)) {
      Logger.warn(`🚫 BLACKLISTED PR detected, skipping: ${prUrl}`);
      return;
    }
    
    // 🔄 LOOP DETECTION: Check for excessive conflict attempts
    const attempts = this.conflictAttempts.get(prUrl) || 0;
    if (attempts >= this.MAX_CONFLICT_ATTEMPTS) {
      Logger.warn(`🔄 Too many conflict attempts (${attempts}), blacklisting: ${prUrl}`);
      this.BLACKLISTED_PRS.add(prUrl);
      return;
    }
    
    try {
      const prDetails = await this.getPRDetailsFromUrl(prUrl);
      
      // 🔍 CHECK PR STATUS: Skip closed PRs
      if (await this.isPRClosed(prUrl)) {
        Logger.warn(`🚫 PR is closed, adding to blacklist: ${prUrl}`);
        this.BLACKLISTED_PRS.add(prUrl);
        return;
      }
      
      // 🔍 PREVIEW MODE: Stop here and wait for approval
      if (this.config.previewMode) {
        Logger.log(`🔍 Preview mode enabled - waiting for manual approval`);
        await this.createPreviewNotification(prDetails);
        return; // STOP - don't auto-merge!
      }
      
      // Original auto-merge logic (only if preview mode is off)
      if (prDetails.hasConflicts) {
        await this.handleConflict(prUrl, prDetails);
      } else {
        await this.mergePullRequest(prUrl, prDetails);
      }
    } catch (error) {
      Logger.error(`Failed to handle PR ${prUrl}:`, error);
      // Don't throw - continue with normal operation
      Logger.warn(`Continuing without auto-merge for ${prUrl}`);
    }
  }

  private async mergePullRequest(prUrl: string, prDetails: PRDetails): Promise<void> {
    Logger.log(`🚀 Attempting REAL merge for pull request: ${prUrl}`);
    
    try {
      // Use Jules' real GitHub merge implementation
      const result = await this.realMerger.mergePullRequest(prUrl);
      Logger.log(`✅ REAL merge completed: ${result.message}`);
      return;
    } catch (error) {
      if (error instanceof MergeError) {
        Logger.warn(`⚠️ Real merge failed: ${error.message}`);
        if (error.message.includes('conflict')) {
          await this.handleConflict(prUrl, prDetails);
        } else {
          Logger.error(`❌ Merge error: ${error.message}`);
        }
      } else {
        Logger.error(`❌ Unexpected merge error:`, error);
      }
    }
  }

  private async handleConflict(prUrl: string, prDetails: PRDetails): Promise<void> {
    Logger.warn(`⚠️ Conflict detected in pull request: ${prUrl}`);
    
    // 🔄 INCREMENT CONFLICT ATTEMPTS
    const attempts = (this.conflictAttempts.get(prUrl) || 0) + 1;
    this.conflictAttempts.set(prUrl, attempts);
    
    if (attempts >= this.MAX_CONFLICT_ATTEMPTS) {
      Logger.warn(`🔄 Max conflict attempts reached for ${prUrl}, blacklisting`);
      this.BLACKLISTED_PRS.add(prUrl);
      return;
    }
    
    // Create conflict resolution task for Jules
    const conflictTask = this.createConflictResolutionTask(prDetails);
    Logger.log('🔧 Creating Jules task for conflict resolution');
    
    try {
      const julesTask = await this.julesAgent.executeTask(conflictTask);
      Logger.log(`✅ Conflict resolution task created: Issue #${julesTask.githubIssueNumber}`);
      
    } catch (error) {
      Logger.error(`❌ Failed to create conflict resolution task:`, error);
    }
  }

  private createConflictResolutionTask(prDetails: PRDetails): TaskTemplate {
    return {
      name: `conflict-resolution-${prDetails.number}`,
      title: `Resolve merge conflicts in PR #${prDetails.number}`,
      description: `
**🔄 MERGE CONFLICT RESOLUTION TASK**

**Original PR:** #${prDetails.number} - ${prDetails.title}
**PR URL:** ${prDetails.html_url}

**📋 ORIGINAL TASK CONTEXT:**
${prDetails.body}

**👤 IMPLEMENTATION HISTORY:**
- PR created by: @${prDetails.user.login}
- Branch: ${prDetails.branchName} → ${prDetails.baseBranch}

**⚠️ CONFLICT SITUATION:**
This PR has merge conflicts that prevent automatic merging. The autonomous merge system has tried standard merge strategies but they failed.

**🎯 RESOLUTION STRATEGY:**
1. **Analyze Conflicts:** Understand what changed in both branches
2. **Preserve Intent:** Maintain the original functionality and purpose
3. **Integrate Changes:** Merge both sets of changes intelligently
4. **Test Integration:** Ensure all tests pass after resolution
5. **Update PR:** Push resolved changes to the existing PR

**📋 RESOLUTION GUIDELINES:**
- **Primary Goal:** Preserve the functionality and intent from the original PR
- **Secondary Goal:** Integrate cleanly with changes in target branch
- **Code Style:** Follow existing patterns and conventions
- **Testing:** Ensure all tests pass, add new tests if needed

**✅ SUCCESS CRITERIA:**
- All merge conflicts resolved while preserving original intent
- Code integrates seamlessly with target branch changes
- All existing tests pass
- Original functionality works as designed
- PR is ready for automatic merge

**🔗 CONTEXT LINK:** This resolves conflicts for PR #${prDetails.number}

**Auto-generated by Autonomous Merge System**
- Follow all guidelines in AGENTS.md
- Resolve conflicts and update existing PR #${prDetails.number}
- Include comprehensive tests
- Use TypeScript best practices
      `
    };
  }

  private async createPreviewNotification(prDetails: PRDetails): Promise<void> {
    Logger.log(`🔍 Creating preview notification for PR #${prDetails.number}`);
    
    // This will be displayed in the web UI as "Ready for Review"
    // The task status will remain as "awaiting-review" until user approves
    Logger.log(`📋 Preview ready: ${prDetails.title}`);
    Logger.log(`🔗 PR URL: ${prDetails.html_url}`);
    Logger.log(`⏳ Waiting for manual approval before merge...`);
  }

  public async approveMerge(prUrl: string): Promise<void> {
    Logger.log(`✅ Merge approved for: ${prUrl}`);
    
    const prDetails = await this.getPRDetailsFromUrl(prUrl);
    
    // Temporarily disable preview mode for this merge
    const originalPreviewMode = this.config.previewMode;
    this.config.previewMode = false;
    
    try {
      await this.mergePullRequest(prUrl, prDetails);
      Logger.log(`🎉 Approved merge completed for: ${prUrl}`);
    } finally {
      // Restore preview mode
      this.config.previewMode = originalPreviewMode;
    }
  }

  public async rejectMerge(prUrl: string, reason?: string): Promise<void> {
    Logger.log(`❌ Merge rejected for: ${prUrl}`);
    if (reason) {
      Logger.log(`📝 Rejection reason: ${reason}`);
    }
    
    // Could implement branch cleanup here
    Logger.log(`🧹 PR rejected - no merge will occur`);
  }

  private async isPRClosed(prUrl: string): Promise<boolean> {
    try {
      const match = prUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
      if (!match) return false;
      
      const [, , , prNumber] = match;
      
      // Check if PR is in our known closed PRs (like #95)
      const closedPRs = ['95', '103']; // Add more as needed
      if (closedPRs.includes(prNumber)) {
        return true;
      }
      
      // Could enhance with real GitHub API call here
      return false;
    } catch (error) {
      Logger.warn(`Failed to check PR status for ${prUrl}: ${error}`);
      return false;
    }
  }

  // 🧹 MASS CLEANUP METHODS
  public getBlacklistedPRs(): string[] {
    return Array.from(this.BLACKLISTED_PRS);
  }
  
  public addToBlacklist(prUrl: string): void {
    this.BLACKLISTED_PRS.add(prUrl);
    Logger.log(`🚫 Added to blacklist: ${prUrl}`);
  }
  
  public clearConflictAttempts(): void {
    this.conflictAttempts.clear();
    Logger.log(`🧹 Cleared all conflict attempt counters`);
  }

  private async getPRDetailsFromUrl(prUrl: string): Promise<PRDetails> {
    // Extract owner, repo, and PR number from URL
    const match = prUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
    if (!match) {
      throw new Error(`Invalid PR URL format: ${prUrl}`);
    }

    const [, owner, repo, prNumber] = match;
    
    // For now, return mock data - this would be enhanced with real GitHub API calls
    return {
      number: parseInt(prNumber),
      title: `PR #${prNumber}`,
      body: 'PR description from GitHub',
      branchName: 'feature-branch',
      baseBranch: 'main',
      repo: `${owner}/${repo}`,
      user: { login: 'jules-agent' },
      commits: [],
      hasConflicts: false, // This would be determined by GitHub API
      html_url: prUrl
    };
  }
}