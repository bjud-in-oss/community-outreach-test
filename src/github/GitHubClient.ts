import { Octokit } from '@octokit/rest';

export class GitHubClient {
  private octokit: Octokit;

  constructor(githubToken: string) {
    this.octokit = new Octokit({ auth: githubToken });
  }

  public async getPullRequestDetails(pullRequestUrl: string): Promise<any> {
    // TODO: Implement logic to extract owner, repo, and pull number from URL
    const owner = 'owner';
    const repo = 'repo';
    const pull_number = 1;

    const { data: prDetails } = await this.octokit.pulls.get({
      owner,
      repo,
      pull_number,
    });

    return {
      hasConflicts: prDetails.mergeable_state === 'dirty',
      branchName: prDetails.head.ref,
      baseBranch: prDetails.base.ref,
      repo: prDetails.head.repo?.full_name,
      // TODO: Add more details as needed
    };
  }

  public async mergePullRequest(pullRequestUrl: string, method: 'merge' | 'squash' | 'rebase' = 'merge'): Promise<void> {
    // TODO: Implement logic to extract owner, repo, and pull number from URL
    const owner = 'owner';
    const repo = 'repo';
    const pull_number = 1;

    await this.octokit.pulls.merge({
      owner,
      repo,
      pull_number,
      merge_method: method,
    });
  }

  public async createBranch(repo: string, baseBranch: string, newBranchName: string): Promise<void> {
    const [owner, repoName] = repo.split('/');
    const { data: baseBranchRef } = await this.octokit.git.getRef({
        owner,
        repo: repoName,
        ref: `heads/${baseBranch}`,
    });

    await this.octokit.git.createRef({
        owner,
        repo: repoName,
        ref: `refs/heads/${newBranchName}`,
        sha: baseBranchRef.object.sha,
    });
  }
}
