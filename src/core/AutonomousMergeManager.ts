import { GitHubClient } from '../github/GitHubClient';
import { JulesTaskGenerator } from '../tasks/JulesTaskGenerator';
import { Logger } from './Logger';

export class AutonomousMergeManager {
  private githubClient: GitHubClient;
  private taskGenerator: JulesTaskGenerator;

  constructor(githubToken: string) {
    this.githubClient = new GitHubClient(githubToken);
    this.taskGenerator = new JulesTaskGenerator();
  }

  public async handlePullRequest(pullRequestUrl: string): Promise<void> {
    Logger.log(`Handling pull request: ${pullRequestUrl}`);
    const prDetails = await this.githubClient.getPullRequestDetails(pullRequestUrl);

    if (prDetails.hasConflicts) {
      await this.handleConflict(pullRequestUrl, prDetails);
    } else {
      await this.mergePullRequest(pullRequestUrl);
    }
  }

  private async mergePullRequest(pullRequestUrl: string): Promise<void> {
    Logger.log(`Attempting to merge pull request: ${pullRequestUrl}`);
    try {
      // First, try a direct merge
      await this.githubClient.mergePullRequest(pullRequestUrl, 'merge');
      Logger.log(`Successfully merged pull request: ${pullRequestUrl}`);
      return;
    } catch (error) {
      Logger.warn(`Direct merge failed for ${pullRequestUrl}, trying rebase and merge.`);
    }

    try {
      // Fallback to rebase and merge
      await this.githubClient.mergePullRequest(pullRequestUrl, 'rebase');
      Logger.log(`Successfully rebased and merged pull request: ${pullRequestUrl}`);
      return;
    } catch (error) {
      Logger.error(`Rebase and merge failed for ${pullRequestUrl}.`, error);
    }

    // If all merge strategies fail, create an alternative branch
    const prDetails = await this.githubClient.getPullRequestDetails(pullRequestUrl);
    const alternativeBranchName = `alternative/${prDetails.branchName}`;
    await this.githubClient.createBranch(prDetails.repo, prDetails.baseBranch, alternativeBranchName);
    Logger.log(`Created alternative branch: ${alternativeBranchName}`);

    // Delegate to Jules for complex conflict resolution
    await this.handleConflict(pullRequestUrl, prDetails);
  }

  private async handleConflict(pullRequestUrl: string, prDetails: any): Promise<void> {
    Logger.warn(`Conflict detected in pull request: ${pullRequestUrl}`);
    const backupBranchName = `backup/${prDetails.branchName}`;
    await this.githubClient.createBranch(prDetails.repo, prDetails.baseBranch, backupBranchName);
    Logger.log(`Created backup branch: ${backupBranchName}`);

    const task = this.taskGenerator.createConflictResolutionTask(prDetails);
    Logger.log('Created Jules task for conflict resolution:', task);
    // TODO: Trigger the Jules task
  }
}
