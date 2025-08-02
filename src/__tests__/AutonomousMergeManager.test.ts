import { AutonomousMergeManager } from '../core/AutonomousMergeManager';
import { GitHubClient } from '../github/GitHubClient';
import { JulesTaskGenerator } from '../tasks/JulesTaskGenerator';

jest.mock('../github/GitHubClient');
jest.mock('../tasks/JulesTaskGenerator');

describe('AutonomousMergeManager', () => {
  let mergeManager: AutonomousMergeManager;
  let githubClientMock: jest.Mocked<GitHubClient>;
  let taskGeneratorMock: jest.Mocked<JulesTaskGenerator>;

  beforeEach(() => {
    mergeManager = new AutonomousMergeManager('fake-token');
    githubClientMock = new (GitHubClient as any)();
    taskGeneratorMock = new (JulesTaskGenerator as any)();
    (mergeManager as any).githubClient = githubClientMock;
    (mergeManager as any).taskGenerator = taskGeneratorMock;
  });

  it('should handle a pull request without conflicts', async () => {
    githubClientMock.getPullRequestDetails.mockResolvedValue({ hasConflicts: false });
    await mergeManager.handlePullRequest('https://github.com/owner/repo/pull/1');
    expect(githubClientMock.mergePullRequest).toHaveBeenCalledWith('https://github.com/owner/repo/pull/1', 'merge');
  });

  it('should handle a pull request with conflicts', async () => {
    const prDetails = {
      hasConflicts: true,
      branchName: 'feature-branch',
      baseBranch: 'main',
      repo: 'owner/repo',
    };
    githubClientMock.getPullRequestDetails.mockResolvedValue(prDetails);
    await mergeManager.handlePullRequest('https://github.com/owner/repo/pull/1');
    expect(githubClientMock.createBranch).toHaveBeenCalledWith('owner/repo', 'main', 'backup/feature-branch');
    expect(taskGeneratorMock.createConflictResolutionTask).toHaveBeenCalledWith(prDetails);
  });
});
