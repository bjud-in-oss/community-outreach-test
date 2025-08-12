import { Octokit } from "@octokit/rest";

// Basic error handling
class MergeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MergeError";
  }
}

// Extract PR info from URL
const extractPRInfo = (url: string) => {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/);
  if (!match) {
    throw new MergeError("Invalid PR URL");
  }
  return {
    owner: match[1],
    repo: match[2],
    pull_number: parseInt(match[3], 10),
  };
};

export class RealGitHubMerger {
  private octokit: Octokit;

  constructor(authToken: string) {
    this.octokit = new Octokit({ auth: authToken });
  }

  async mergePullRequest(url: string) {
    const { owner, repo, pull_number } = extractPRInfo(url);
    console.log(`[REAL-MERGE] Processing PR: ${url}`);

    try {
      // Check if the PR is a draft
      const { data: pr } = await this.octokit.pulls.get({
        owner,
        repo,
        pull_number,
      });
      console.log(`[REAL-MERGE] PR state: ${pr.draft ? "draft" : "ready"}`);

      if (pr.draft) {
        // Convert draft PR to ready for review using REST API
        console.log("[REAL-MERGE] Converting draft PR to ready for review...");
        await this.octokit.pulls.update({
          owner,
          repo,
          pull_number,
          draft: false
        });
        console.log(`[REAL-MERGE] Converted draft PR #${pull_number} to ready for review.`);
      }

      // Check if the PR is mergeable
      if (!pr.mergeable) {
        throw new MergeError("PR is not mergeable. Please check for conflicts or failed checks.");
      }

      // Merge the PR
      console.log("[REAL-MERGE] Merging PR...");
      const result = await this.octokit.pulls.merge({
        owner,
        repo,
        pull_number,
        merge_method: "squash", // or 'merge', 'rebase'
      });

      console.log("[REAL-MERGE] PR merged successfully:", result.data.message);
      return result.data;
    } catch (error: any) {
      if (error.status === 405) {
        throw new MergeError(
          "Merge not allowed. Check branch protection rules."
        );
      } else if (error.status === 409) {
        throw new MergeError("Merge conflict. Please resolve conflicts.");
      } else {
        throw new MergeError(`Failed to merge PR: ${error.message}`);
      }
    }
  }
}

export { MergeError };