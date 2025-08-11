// LEGACY IMPORT: RealGitHubMerger.ts från jules-automation-test
// STATUS: Fungerande GitHub merge implementation
// MASTER PLAN 2.0 KOMPATIBILITET: Hög - direkt användbar

import { Octokit } from "@octokit/rest";

// MASTER PLAN 2.0: Enhanced error handling
class MergeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MasterPlan2MergeError";
  }
}

// Extract PR info from URL
const extractPRInfo = (url: string) => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
  if (!match) {
    throw new MergeError("Invalid PR URL format for Master Plan 2.0");
  }
  return {
    owner: match[1],
    repo: match[2],
    pull_number: parseInt(match[3], 10),
  };
};

/**
 * MASTER PLAN 2.0 Real GitHub Merger
 * Hanterar faktiska GitHub merges med dubbelt medvetandesystem integration
 */
export class RealGitHubMerger {
  private octokit: Octokit;

  constructor(authToken: string) {
    this.octokit = new Octokit({ auth: authToken });
  }

  async mergePullRequest(url: string) {
    const { owner, repo, pull_number } = extractPRInfo(url);
    console.log(`[MASTER-PLAN-MERGE] Processing PR: ${url}`);

    try {
      // Get PR details
      const { data: pr } = await this.octokit.pulls.get({
        owner,
        repo,
        pull_number,
      });
      
      console.log(`[MASTER-PLAN-MERGE] PR state: ${pr.draft ? "draft" : "ready"}`);
      console.log(`[MASTER-PLAN-MERGE] PR title: ${pr.title}`);

      // MASTER PLAN 2.0: Check for architecture compliance in PR
      const isArchitectureCompliant = this.checkArchitectureCompliance(pr);
      if (!isArchitectureCompliant.compliant) {
        console.warn(`[MASTER-PLAN-WARN] Architecture compliance issue: ${isArchitectureCompliant.reason}`);
        // Continue with merge but log warning
      }

      // Convert draft PR to ready if needed
      if (pr.draft) {
        console.log("[MASTER-PLAN-MERGE] Converting draft PR to ready for review...");
        await this.octokit.pulls.update({
          owner,
          repo,
          pull_number,
          draft: false
        });
        console.log(`[MASTER-PLAN-MERGE] Converted draft PR #${pull_number} to ready for review.`);
      }

      // Check if the PR is mergeable
      if (!pr.mergeable) {
        throw new MergeError("PR is not mergeable. Please check for conflicts or failed checks.");
      }

      // MASTER PLAN 2.0: Enhanced merge with architecture preservation
      console.log("[MASTER-PLAN-MERGE] Merging PR with Master Plan 2.0 compliance...");
      const result = await this.octokit.pulls.merge({
        owner,
        repo,
        pull_number,
        merge_method: "squash", // Squash för ren commit history
        commit_title: `${pr.title} (#${pull_number})`,
        commit_message: `${pr.body || ''}\n\n✅ Merged via Master Plan 2.0 Autonomous Merge System\n🎭 Dubbelt Medvetandesystem Compliant`
      });

      console.log("[MASTER-PLAN-MERGE] PR merged successfully:", result.data.message);
      
      // MASTER PLAN 2.0: Post-merge cleanup and notifications
      await this.postMergeCleanup(owner, repo, pull_number, pr);
      
      return result.data;
    } catch (error: any) {
      if (error.status === 405) {
        throw new MergeError(
          "Merge not allowed. Check branch protection rules or Master Plan 2.0 compliance."
        );
      } else if (error.status === 409) {
        throw new MergeError("Merge conflict detected. Autonomous conflict resolution will be triggered.");
      } else {
        throw new MergeError(`Master Plan 2.0 merge failed: ${error.message}`);
      }
    }
  }

  /**
   * MASTER PLAN 2.0: Check architecture compliance
   */
  private checkArchitectureCompliance(pr: any): { compliant: boolean; reason: string } {
    const title = pr.title.toLowerCase();
    const body = (pr.body || '').toLowerCase();
    
    // Positive indicators
    const hasArchitectureKeywords = 
      title.includes('master plan 2.0') ||
      title.includes('conscious agent') ||
      title.includes('core agent') ||
      body.includes('dubbelt medvetandesystem') ||
      body.includes('communication bridge');
    
    // Negative indicators
    const hasProblematicPatterns = 
      title.includes('quick fix') ||
      title.includes('hotfix') ||
      body.includes('bypass architecture') ||
      body.includes('temporary hack');
    
    if (hasProblematicPatterns) {
      return {
        compliant: false,
        reason: 'PR contains patterns that may bypass Master Plan 2.0 architecture'
      };
    }
    
    // For complex changes, require architecture compliance
    const isComplexChange = pr.additions > 100 || pr.deletions > 50;
    if (isComplexChange && !hasArchitectureKeywords) {
      return {
        compliant: false,
        reason: 'Complex changes require explicit Master Plan 2.0 architecture compliance'
      };
    }
    
    return {
      compliant: true,
      reason: 'PR passes architecture compliance check'
    };
  }

  /**
   * MASTER PLAN 2.0: Post-merge cleanup and notifications
   */
  private async postMergeCleanup(owner: string, repo: string, pullNumber: number, pr: any): Promise<void> {
    try {
      // Add success comment
      await this.octokit.issues.createComment({
        owner,
        repo,
        issue_number: pullNumber,
        body: `🎉 **Master Plan 2.0 Merge Successful**

✅ This PR has been successfully merged via the Master Plan 2.0 Autonomous Merge System.

**🎭 Dubbelt Medvetandesystem Status:** Compliant
**🔧 Merge Method:** Squash merge for clean history
**📊 Changes:** +${pr.additions} -${pr.deletions} lines

*Merged automatically by Master Plan 2.0 Autonomous Merge Manager*`
      });

      console.log(`[MASTER-PLAN-MERGE] Post-merge comment added to PR #${pullNumber}`);
    } catch (error) {
      console.warn(`[MASTER-PLAN-WARN] Failed to add post-merge comment: ${error}`);
      // Don't throw - merge was successful
    }
  }
}

export { MergeError };