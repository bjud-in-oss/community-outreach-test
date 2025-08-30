// REFACTORED FOR MASTER PLAN 2.0: RealGitHubMerger.ts
// ORIGINAL: src/legacy-import/merge-system/RealGitHubMerger.ts
// STATUS: Refaktorerad för Dual Consciousness Architecture
// INTEGRATION: Core Agent Tool för faktiska GitHub merges

import { Octokit } from "@octokit/rest";

/**
 * MASTER PLAN 2.0 Enhanced Merge Error
 */
export class MergeError extends Error {
  constructor(
    message: string,
    public code?: string,
    public seniorFriendlyMessage?: string
  ) {
    super(message);
    this.name = "MasterPlan2MergeError";
  }
}

/**
 * Extract PR information from GitHub URL
 */
const extractPRInfo = (url: string) => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
  if (!match) {
    throw new MergeError(
      "Invalid PR URL format for Master Plan 2.0",
      "INVALID_URL",
      "Länken till uppdateringen är felaktig"
    );
  }
  return {
    owner: match[1],
    repo: match[2],
    pull_number: parseInt(match[3], 10),
  };
};

/**
 * MASTER PLAN 2.0 Real GitHub Merger
 * 
 * Refaktorerad för Dual Consciousness Architecture:
 * - Endast tillgänglig för Core Agent
 * - Enhanced architecture compliance checking
 * - Senior-friendly error messages via Communication Bridge
 * - Comprehensive post-merge cleanup and notifications
 */
export class RealGitHubMerger {
  private octokit: Octokit;

  constructor(authToken: string) {
    this.octokit = new Octokit({ auth: authToken });
  }

  /**
   * MASTER PLAN 2.0: Merge pull request with dual consciousness integration
   * 
   * @param url - GitHub PR URL
   * @returns Promise with merge result
   */
  async mergePullRequest(url: string) {
    const { owner, repo, pull_number } = extractPRInfo(url);
    console.log(`[CORE-AGENT-MERGE] Processing PR: ${url}`);

    try {
      // Get PR details
      const { data: pr } = await this.octokit.pulls.get({
        owner,
        repo,
        pull_number,
      });
      
      console.log(`[CORE-AGENT-MERGE] PR state: ${pr.draft ? "draft" : "ready"}`);
      console.log(`[CORE-AGENT-MERGE] PR title: ${pr.title}`);

      // MASTER PLAN 2.0: Enhanced architecture compliance check
      const complianceCheck = await this.performArchitectureComplianceCheck(pr);
      if (!complianceCheck.compliant) {
        console.warn(`[CORE-AGENT-WARN] Architecture compliance issue: ${complianceCheck.reason}`);
        
        // For critical violations, block merge
        if (complianceCheck.severity === 'critical') {
          throw new MergeError(
            `Critical architecture violation: ${complianceCheck.reason}`,
            "ARCHITECTURE_VIOLATION",
            "Uppdateringen följer inte systemets arkitektur och kan inte genomföras"
          );
        }
        
        // For non-critical, log warning and continue
        console.log(`[CORE-AGENT-MERGE] Proceeding with merge despite ${complianceCheck.severity} compliance issue`);
      }

      // Convert draft PR to ready if needed
      if (pr.draft) {
        console.log("[CORE-AGENT-MERGE] Converting draft PR to ready for review...");
        await this.octokit.pulls.update({
          owner,
          repo,
          pull_number,
          draft: false
        });
        console.log(`[CORE-AGENT-MERGE] Converted draft PR #${pull_number} to ready for review.`);
      }

      // Check if the PR is mergeable
      if (!pr.mergeable) {
        throw new MergeError(
          "PR is not mergeable. Conflicts or failed checks detected.",
          "NOT_MERGEABLE",
          "Uppdateringen kan inte genomföras på grund av konflikter"
        );
      }

      // MASTER PLAN 2.0: Enhanced merge with architecture preservation
      console.log("[CORE-AGENT-MERGE] Merging PR with Master Plan 2.0 compliance...");
      const result = await this.octokit.pulls.merge({
        owner,
        repo,
        pull_number,
        merge_method: "squash", // Squash för ren commit history
        commit_title: `${pr.title} (#${pull_number})`,
        commit_message: this.generateEnhancedCommitMessage(pr, complianceCheck)
      });

      console.log("[CORE-AGENT-MERGE] PR merged successfully:", result.data.message);
      
      // MASTER PLAN 2.0: Post-merge cleanup and notifications
      await this.postMergeCleanup(owner, repo, pull_number, pr, complianceCheck);
      
      return {
        ...result.data,
        seniorFriendlyMessage: "Uppdateringen har genomförts framgångsrikt!",
        architectureCompliant: complianceCheck.compliant,
        complianceLevel: complianceCheck.severity
      };
    } catch (error: any) {
      console.error(`[CORE-AGENT-ERROR] Merge failed for ${url}:`, error);
      
      if (error instanceof MergeError) {
        throw error; // Re-throw our custom errors
      }
      
      // Handle GitHub API errors
      if (error.status === 405) {
        throw new MergeError(
          "Merge not allowed. Check branch protection rules or Master Plan 2.0 compliance.",
          "MERGE_NOT_ALLOWED",
          "Uppdateringen är inte tillåten enligt systemets regler"
        );
      } else if (error.status === 409) {
        throw new MergeError(
          "Merge conflict detected. Autonomous conflict resolution will be triggered.",
          "MERGE_CONFLICT",
          "Konflikter upptäcktes. Automatisk konfliktlösning kommer att startas"
        );
      } else if (error.status === 404) {
        throw new MergeError(
          "PR not found or access denied.",
          "PR_NOT_FOUND",
          "Uppdateringen kunde inte hittas"
        );
      } else {
        throw new MergeError(
          `Master Plan 2.0 merge failed: ${error.message}`,
          "UNKNOWN_ERROR",
          "Ett oväntat problem uppstod vid genomförandet"
        );
      }
    }
  }

  /**
   * MASTER PLAN 2.0: Enhanced architecture compliance check
   */
  private async performArchitectureComplianceCheck(pr: any): Promise<{
    compliant: boolean;
    reason: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    violations: string[];
    recommendations: string[];
  }> {
    const title = pr.title.toLowerCase();
    const body = (pr.body || '').toLowerCase();
    const violations: string[] = [];
    const recommendations: string[] = [];
    
    // Check for Master Plan 2.0 architecture keywords
    const hasArchitectureKeywords = 
      title.includes('master plan 2.0') ||
      title.includes('conscious agent') ||
      title.includes('core agent') ||
      body.includes('dubbelt medvetandesystem') ||
      body.includes('communication bridge') ||
      body.includes('dual consciousness');
    
    // Check for problematic patterns
    const problematicPatterns = [
      { pattern: 'quick fix', severity: 'medium' as const, message: 'Quick fixes may bypass architecture' },
      { pattern: 'hotfix', severity: 'medium' as const, message: 'Hotfixes should follow architecture guidelines' },
      { pattern: 'bypass architecture', severity: 'critical' as const, message: 'Explicit architecture bypass detected' },
      { pattern: 'temporary hack', severity: 'high' as const, message: 'Temporary hacks create technical debt' },
      { pattern: 'direct communication', severity: 'high' as const, message: 'Direct communication bypasses Communication Bridge' },
      { pattern: 'skip guardrails', severity: 'critical' as const, message: 'Guardrails are essential for senior safety' }
    ];
    
    let maxSeverity: 'low' | 'medium' | 'high' | 'critical' = 'low';
    
    // Check for violations
    for (const check of problematicPatterns) {
      if (title.includes(check.pattern) || body.includes(check.pattern)) {
        violations.push(check.message);
        if (this.severityLevel(check.severity) > this.severityLevel(maxSeverity)) {
          maxSeverity = check.severity;
        }
      }
    }
    
    // Check for complex changes without architecture documentation
    const isComplexChange = pr.additions > 100 || pr.deletions > 50;
    if (isComplexChange && !hasArchitectureKeywords) {
      violations.push('Complex changes require explicit Master Plan 2.0 architecture compliance documentation');
      recommendations.push('Add Master Plan 2.0 architecture compliance section to PR description');
      if (maxSeverity === 'low') maxSeverity = 'medium';
    }
    
    // Check for senior-facing changes
    const affectsSeniorInterface = 
      title.includes('ui') || title.includes('interface') || title.includes('frontend') ||
      body.includes('conscious agent') || body.includes('senior');
    
    if (affectsSeniorInterface && !body.includes('senior-friendly')) {
      violations.push('Senior-facing changes should explicitly confirm senior-friendly design');
      recommendations.push('Add confirmation that changes maintain senior-friendly interface');
      if (maxSeverity === 'low') maxSeverity = 'medium';
    }
    
    // Generate recommendations
    if (violations.length > 0) {
      recommendations.push('Review Master Plan 2.0 architecture guidelines');
      recommendations.push('Ensure dual consciousness principles are followed');
      recommendations.push('Verify Communication Bridge integration');
    }
    
    const compliant = violations.length === 0 || maxSeverity === 'low';
    
    return {
      compliant,
      reason: violations.length > 0 ? violations[0] : 'PR passes architecture compliance check',
      severity: maxSeverity,
      violations,
      recommendations
    };
  }

  /**
   * Helper method to compare severity levels
   */
  private severityLevel(severity: 'low' | 'medium' | 'high' | 'critical'): number {
    const levels = { low: 1, medium: 2, high: 3, critical: 4 };
    return levels[severity];
  }

  /**
   * MASTER PLAN 2.0: Generate enhanced commit message
   */
  private generateEnhancedCommitMessage(pr: any, complianceCheck: any): string {
    const baseMessage = pr.body || '';
    
    const enhancedMessage = `${baseMessage}

✅ Merged via Master Plan 2.0 Autonomous Merge System
🎭 Dubbelt Medvetandesystem: ${complianceCheck.compliant ? 'Compliant' : `${complianceCheck.severity} issues`}
🔧 Architecture Check: ${complianceCheck.violations.length === 0 ? 'Passed' : `${complianceCheck.violations.length} violations`}
📊 Changes: +${pr.additions} -${pr.deletions} lines
🤖 Agent: Core Agent (Autonomous Merge Manager)`;

    return enhancedMessage;
  }

  /**
   * MASTER PLAN 2.0: Enhanced post-merge cleanup and notifications
   */
  private async postMergeCleanup(
    owner: string, 
    repo: string, 
    pullNumber: number, 
    pr: any, 
    complianceCheck: any
  ): Promise<void> {
    try {
      // Create comprehensive success comment
      const commentBody = this.generatePostMergeComment(pr, complianceCheck);
      
      await this.octokit.issues.createComment({
        owner,
        repo,
        issue_number: pullNumber,
        body: commentBody
      });

      console.log(`[CORE-AGENT-MERGE] Post-merge comment added to PR #${pullNumber}`);
      
      // If there were compliance issues, create follow-up issue
      if (!complianceCheck.compliant && complianceCheck.severity !== 'low') {
        await this.createComplianceFollowUpIssue(owner, repo, pullNumber, pr, complianceCheck);
      }
      
    } catch (error) {
      console.warn(`[CORE-AGENT-WARN] Failed to complete post-merge cleanup: ${error}`);
      // Don't throw - merge was successful
    }
  }

  /**
   * MASTER PLAN 2.0: Generate comprehensive post-merge comment
   */
  private generatePostMergeComment(pr: any, complianceCheck: any): string {
    const complianceEmoji = complianceCheck.compliant ? '✅' : '⚠️';
    const complianceStatus = complianceCheck.compliant ? 'Compliant' : `${complianceCheck.severity} issues detected`;
    
    let comment = `🎉 **Master Plan 2.0 Merge Successful**

${complianceEmoji} This PR has been successfully merged via the Master Plan 2.0 Autonomous Merge System.

**🎭 Dubbelt Medvetandesystem Status:** ${complianceStatus}
**🔧 Merge Method:** Squash merge for clean history
**📊 Changes:** +${pr.additions} -${pr.deletions} lines
**🤖 Processed by:** Core Agent (Autonomous Merge Manager)`;

    if (!complianceCheck.compliant) {
      comment += `

**⚠️ Architecture Compliance Issues:**
${complianceCheck.violations.map((v: string) => `- ${v}`).join('\n')}

**💡 Recommendations:**
${complianceCheck.recommendations.map((r: string) => `- ${r}`).join('\n')}`;
    }

    comment += `

*Merged automatically by Master Plan 2.0 Autonomous Merge Manager*`;

    return comment;
  }

  /**
   * MASTER PLAN 2.0: Create follow-up issue for compliance problems
   */
  private async createComplianceFollowUpIssue(
    owner: string, 
    repo: string, 
    pullNumber: number, 
    pr: any, 
    complianceCheck: any
  ): Promise<void> {
    try {
      const issueTitle = `Architecture Compliance Follow-up: PR #${pullNumber}`;
      const issueBody = `**🎭 Master Plan 2.0 Architecture Compliance Follow-up**

**Original PR:** #${pullNumber} - ${pr.title}
**Merged:** ✅ (with ${complianceCheck.severity} compliance issues)

**⚠️ Compliance Issues Detected:**
${complianceCheck.violations.map((v: string) => `- ${v}`).join('\n')}

**💡 Recommended Actions:**
${complianceCheck.recommendations.map((r: string) => `- ${r}`).join('\n')}

**🎯 Next Steps:**
1. Review the merged code for architecture compliance
2. Implement recommended improvements
3. Update documentation if needed
4. Consider refactoring if violations are significant

**📋 Compliance Checklist:**
- [ ] Verify dual consciousness architecture is maintained
- [ ] Ensure Communication Bridge is properly used
- [ ] Confirm senior-friendly interfaces are preserved
- [ ] Update architecture documentation if needed

*Auto-generated by Master Plan 2.0 Autonomous Merge Manager*`;

      await this.octokit.issues.create({
        owner,
        repo,
        title: issueTitle,
        body: issueBody,
        labels: ['architecture', 'compliance', 'follow-up', 'master-plan-2.0']
      });

      console.log(`[CORE-AGENT-MERGE] Compliance follow-up issue created for PR #${pullNumber}`);
    } catch (error) {
      console.warn(`[CORE-AGENT-WARN] Failed to create compliance follow-up issue: ${error}`);
    }
  }

  /**
   * MASTER PLAN 2.0: Health check for GitHub connection
   */
  async healthCheck(): Promise<{
    connected: boolean;
    rateLimit?: any;
    error?: string;
  }> {
    try {
      const rateLimit = await this.octokit.rest.rateLimit.get();
      
      console.log(`✅ Core Agent GitHub Merger connection healthy. Rate limit: ${rateLimit.data.rate.remaining}/${rateLimit.data.rate.limit}`);
      
      return {
        connected: true,
        rateLimit: rateLimit.data
      };
    } catch (error) {
      console.error(`❌ Core Agent GitHub Merger connection failed:`, error);
      return {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}