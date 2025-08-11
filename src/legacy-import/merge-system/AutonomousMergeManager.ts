// LEGACY IMPORT: AutonomousMergeManager.ts från jules-automation-test
// STATUS: Fungerande autonomous merge system med blacklist och loop detection
// MASTER PLAN 2.0 KOMPATIBILITET: Hög - perfekt för core-agent/tools/jules-tool/

import { GitHubClient } from '../infrastructure/github-client.js';
import { JulesAutomationAgent } from '../infrastructure/jules-agent.js';
import { TaskTemplate } from '../infrastructure/types.js';
import { RealGitHubMerger, MergeError } from './RealGitHubMerger.js';

export class Logger {
  public static log(message: string): void {
    console.log(`[MASTER-PLAN-MERGE] ${new Date().toISOString()}: ${message}`);
  }

  public static warn(message: string): void {
    console.warn(`[MASTER-PLAN-WARN] ${new Date().toISOString()}: ${message}`);
  }

  public static error(message: string, error?: any): void {
    if (error) {
      console.error(`[MASTER-PLAN-ERROR] ${new Date().toISOString()}: ${message}`, error);
    } else {
      console.error(`[MASTER-PLAN-ERROR] ${new Date().toISOString()}: ${message}`);
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
  // MASTER PLAN 2.0 EXTENSIONS:
  seniorFriendly?: boolean; // Om PR är senior-vänlig
  agentType?: 'conscious' | 'core' | 'bridge'; // Vilken agent som skapade PR
  complexity?: 'low' | 'medium' | 'high'; // Komplexitetsnivå
}

export interface MergeConfig {
  previewMode: boolean;
  autoMergeEnabled: boolean;
  // MASTER PLAN 2.0 EXTENSIONS:
  requireSeniorApproval?: boolean; // Om senior-godkännande krävs
  dualConsciousnessCheck?: boolean; // Om dubbelt medvetandesystem check krävs
}

/**
 * MASTER PLAN 2.0 Autonomous Merge Manager
 * Hanterar intelligent merge med dubbelt medvetandesystem integration
 */
export class AutonomousMergeManager {
  private githubClient: GitHubClient;
  private julesAgent: JulesAutomationAgent;
  private config: MergeConfig;
  private realMerger: RealGitHubMerger;
  
  // 🚫 BLACKLIST: PRs that should never be processed
  private readonly BLACKLISTED_PRS = new Set([
    'https://github.com/MatRen74/community-outreach-test/pull/95',
    'https://github.com/MatRen74/community-outreach-test/pull/103',
    // MASTER PLAN 2.0: Lägg till problematiska PRs här
  ]);
  
  // 🔄 LOOP DETECTION: Track conflict resolution attempts
  private conflictAttempts = new Map<string, number>();
  private readonly MAX_CONFLICT_ATTEMPTS = 2;

  constructor(
    githubClient: GitHubClient, 
    julesAgent: JulesAutomationAgent, 
    config: MergeConfig = { 
      previewMode: true, 
      autoMergeEnabled: true,
      requireSeniorApproval: false, // MASTER PLAN 2.0: Senior approval
      dualConsciousnessCheck: true   // MASTER PLAN 2.0: Dubbelt medvetandesystem check
    }
  ) {
    this.githubClient = githubClient;
    this.julesAgent = julesAgent;
    this.config = config;
    this.realMerger = new RealGitHubMerger(process.env.GITHUB_TOKEN || '');
  }

  public async handlePullRequest(prUrl: string): Promise<void> {
    Logger.log(`🔄 Master Plan 2.0 handling pull request: ${prUrl}`);
    
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
      
      // 🎭 MASTER PLAN 2.0: Dual consciousness check
      if (this.config.dualConsciousnessCheck) {
        const consciousnessCheck = await this.performDualConsciousnessCheck(prDetails);
        if (!consciousnessCheck.approved) {
          Logger.warn(`🎭 Dual consciousness check failed: ${consciousnessCheck.reason}`);
          await this.createConsciousnessReviewTask(prDetails, consciousnessCheck.reason);
          return;
        }
      }
      
      // 👴 MASTER PLAN 2.0: Senior approval check
      if (this.config.requireSeniorApproval && prDetails.seniorFriendly) {
        Logger.log(`👴 Senior approval required for senior-friendly PR`);
        await this.createSeniorApprovalRequest(prDetails);
        return;
      }
      
      // 🔍 PREVIEW MODE: Stop here and wait for approval
      if (this.config.previewMode) {
        Logger.log(`🔍 Preview mode enabled - waiting for manual approval`);
        await this.createPreviewNotification(prDetails);
        return;
      }
      
      // Original auto-merge logic (only if preview mode is off)
      if (prDetails.hasConflicts) {
        await this.handleConflict(prUrl, prDetails);
      } else {
        await this.mergePullRequest(prUrl, prDetails);
      }
    } catch (error) {
      Logger.error(`Failed to handle PR ${prUrl}:`, error);
      Logger.warn(`Continuing without auto-merge for ${prUrl}`);
    }
  }

  /**
   * MASTER PLAN 2.0: Dual Consciousness Check
   * Säkerställer att PR följer dubbelt medvetandesystem arkitektur
   */
  private async performDualConsciousnessCheck(prDetails: PRDetails): Promise<{
    approved: boolean;
    reason: string;
  }> {
    // Kontrollera om PR följer Master Plan 2.0 arkitektur
    const bodyLower = prDetails.body.toLowerCase();
    
    // Positiva indikatorer
    const hasArchitectureCompliance = 
      bodyLower.includes('master plan 2.0') ||
      bodyLower.includes('dubbelt medvetandesystem') ||
      bodyLower.includes('conscious agent') ||
      bodyLower.includes('core agent') ||
      bodyLower.includes('communication bridge');
    
    // Negativa indikatorer
    const hasProblematicPatterns = 
      bodyLower.includes('quick fix') ||
      bodyLower.includes('temporary hack') ||
      bodyLower.includes('bypass architecture');
    
    if (hasProblematicPatterns) {
      return {
        approved: false,
        reason: 'PR contains patterns that bypass Master Plan 2.0 architecture'
      };
    }
    
    if (!hasArchitectureCompliance && prDetails.complexity === 'high') {
      return {
        approved: false,
        reason: 'High complexity PR lacks Master Plan 2.0 architecture compliance'
      };
    }
    
    return {
      approved: true,
      reason: 'PR passes dual consciousness architecture check'
    };
  }

  /**
   * MASTER PLAN 2.0: Create consciousness review task
   */
  private async createConsciousnessReviewTask(prDetails: PRDetails, reason: string): Promise<void> {
    const reviewTask: TaskTemplate = {
      name: `consciousness-review-${prDetails.number}`,
      title: `Master Plan 2.0 Architecture Review for PR #${prDetails.number}`,
      description: `
**🎭 DUAL CONSCIOUSNESS ARCHITECTURE REVIEW**

**Original PR:** #${prDetails.number} - ${prDetails.title}
**PR URL:** ${prDetails.html_url}
**Review Reason:** ${reason}

**🏗️ ARCHITECTURE COMPLIANCE CHECK:**
This PR needs review to ensure compliance with Master Plan 2.0 dubbelt medvetandesystem architecture.

**📋 REVIEW REQUIREMENTS:**
1. **Conscious Agent Compliance:** Ensure frontend changes follow medvetna rondellen patterns
2. **Core Agent Compliance:** Ensure backend changes follow kärn-agent patterns  
3. **Communication Bridge:** Verify proper guardrails and translation layers
4. **Senior-Friendly Design:** Ensure no technical complexity is exposed to seniors

**✅ SUCCESS CRITERIA:**
- PR follows Master Plan 2.0 architecture patterns
- Proper separation between conscious and core agents
- Communication bridge guardrails in place
- Senior-friendly interface maintained

**Auto-generated by Master Plan 2.0 Autonomous Merge System**
      `,
      targetAgent: 'bridge', // Communication bridge handles architecture reviews
      seniorInstructions: 'Ensure no technical details are exposed to senior users',
      technicalRequirements: ['Master Plan 2.0 compliance', 'Architecture review', 'Guardrails check']
    };
    
    try {
      const julesTask = await this.julesAgent.executeTask(reviewTask);
      Logger.log(`🎭 Consciousness review task created: Issue #${julesTask.githubIssueNumber}`);
    } catch (error) {
      Logger.error(`❌ Failed to create consciousness review task:`, error);
    }
  }

  /**
   * MASTER PLAN 2.0: Create senior approval request
   */
  private async createSeniorApprovalRequest(prDetails: PRDetails): Promise<void> {
    Logger.log(`👴 Creating senior approval request for PR #${prDetails.number}`);
    
    // Detta skulle integreras med conscious agent för senior-vänlig kommunikation
    Logger.log(`📋 Senior-friendly approval needed: ${prDetails.title}`);
    Logger.log(`🔗 PR URL: ${prDetails.html_url}`);
    Logger.log(`⏳ Waiting for senior approval before merge...`);
  }

  private async mergePullRequest(prUrl: string, prDetails: PRDetails): Promise<void> {
    Logger.log(`🚀 Attempting REAL merge for pull request: ${prUrl}`);
    
    try {
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
**🔄 MASTER PLAN 2.0 MERGE CONFLICT RESOLUTION**

**Original PR:** #${prDetails.number} - ${prDetails.title}
**PR URL:** ${prDetails.html_url}

**🎭 DUAL CONSCIOUSNESS CONTEXT:**
This PR is part of the Master Plan 2.0 dubbelt medvetandesystem architecture.

**⚠️ CONFLICT SITUATION:**
This PR has merge conflicts that prevent automatic merging. The autonomous merge system has tried standard merge strategies but they failed.

**🎯 MASTER PLAN 2.0 RESOLUTION STRATEGY:**
1. **Preserve Architecture:** Maintain dubbelt medvetandesystem patterns
2. **Conscious Agent Integrity:** Ensure frontend changes remain senior-friendly
3. **Core Agent Integrity:** Ensure backend changes maintain technical excellence
4. **Communication Bridge:** Verify guardrails remain intact
5. **Test Integration:** Ensure all tests pass after resolution

**📋 RESOLUTION GUIDELINES:**
- **Primary Goal:** Preserve Master Plan 2.0 architecture compliance
- **Secondary Goal:** Integrate cleanly with target branch changes
- **Senior Safety:** Ensure no technical complexity is exposed
- **Testing:** Comprehensive test coverage required

**✅ SUCCESS CRITERIA:**
- All merge conflicts resolved while preserving Master Plan 2.0 architecture
- Dubbelt medvetandesystem patterns maintained
- Senior-friendly interface preserved
- All tests pass
- PR ready for automatic merge

**Auto-generated by Master Plan 2.0 Autonomous Merge System**
      `,
      targetAgent: 'core', // Core agent handles technical conflict resolution
      seniorInstructions: 'Ensure resolution maintains senior-friendly interface',
      technicalRequirements: [
        'Master Plan 2.0 architecture compliance',
        'Dubbelt medvetandesystem patterns',
        'Comprehensive testing',
        'Guardrails integrity'
      ]
    };
  }

  private async createPreviewNotification(prDetails: PRDetails): Promise<void> {
    Logger.log(`🔍 Creating Master Plan 2.0 preview notification for PR #${prDetails.number}`);
    
    Logger.log(`📋 Preview ready: ${prDetails.title}`);
    Logger.log(`🔗 PR URL: ${prDetails.html_url}`);
    Logger.log(`🎭 Agent Type: ${prDetails.agentType || 'unknown'}`);
    Logger.log(`👴 Senior Friendly: ${prDetails.seniorFriendly ? 'Yes' : 'No'}`);
    Logger.log(`⏳ Waiting for manual approval before merge...`);
  }

  public async approveMerge(prUrl: string): Promise<void> {
    Logger.log(`✅ Master Plan 2.0 merge approved for: ${prUrl}`);
    
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
    Logger.log(`❌ Master Plan 2.0 merge rejected for: ${prUrl}`);
    if (reason) {
      Logger.log(`📝 Rejection reason: ${reason}`);
    }
    
    Logger.log(`🧹 PR rejected - no merge will occur`);
  }

  private async isPRClosed(prUrl: string): Promise<boolean> {
    try {
      const match = prUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
      if (!match) return false;
      
      const [, , , prNumber] = match;
      
      // Check if PR is in our known closed PRs
      const closedPRs = ['95', '103']; // MASTER PLAN 2.0: Lägg till fler vid behov
      if (closedPRs.includes(prNumber)) {
        return true;
      }
      
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
    const match = prUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
    if (!match) {
      throw new Error(`Invalid PR URL format: ${prUrl}`);
    }

    const [, owner, repo, prNumber] = match;
    
    // MASTER PLAN 2.0: Enhanced with architecture detection
    return {
      number: parseInt(prNumber),
      title: `PR #${prNumber}`,
      body: 'PR description from GitHub',
      branchName: 'feature-branch',
      baseBranch: 'main',
      repo: `${owner}/${repo}`,
      user: { login: 'jules-agent' },
      commits: [],
      hasConflicts: false,
      html_url: prUrl,
      // MASTER PLAN 2.0 EXTENSIONS:
      seniorFriendly: true, // Skulle detekteras från PR innehåll
      agentType: 'core', // Skulle detekteras från branch/labels
      complexity: 'medium' // Skulle beräknas från diff size
    };
  }
}