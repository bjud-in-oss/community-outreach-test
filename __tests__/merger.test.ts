import AutonomousMergeManager from '../lib/merger';
import { Octokit } from '@octokit/rest';

jest.mock('@octokit/rest');

const OctokitMock = Octokit as jest.MockedClass<typeof Octokit>;

describe('AutonomousMergeManager', () => {
  let mergeManager: AutonomousMergeManager;
  let octokitMock: any;

  beforeEach(() => {
    octokitMock = {
      pulls: {
        get: jest.fn(),
        merge: jest.fn(),
      },
      graphql: jest.fn(),
    };
    OctokitMock.mockImplementation(() => octokitMock);
    mergeManager = new AutonomousMergeManager('fake-token');
  });

  it('should merge a non-draft PR', async () => {
    octokitMock.pulls.get.mockResolvedValue({
      data: {
        draft: false,
        mergeable: true,
      },
    });
    octokitMock.pulls.merge.mockResolvedValue({
      data: {
        message: 'PR merged',
      },
    });

    const result = await mergeManager.mergePullRequest(
      'https://github.com/owner/repo/pull/1'
    );

    expect(octokitMock.pulls.get).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      pull_number: 1,
    });
    expect(octokitMock.pulls.merge).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      pull_number: 1,
      merge_method: 'squash',
    });
    expect(result.message).toBe('PR merged');
  });

  it('should convert a draft PR to ready and then merge', async () => {
    octokitMock.pulls.get.mockResolvedValue({
      data: {
        draft: true,
        mergeable: true,
        node_id: 'pr_node_id',
      },
    });
    octokitMock.pulls.merge.mockResolvedValue({
      data: {
        message: 'PR merged',
      },
    });

    const result = await mergeManager.mergePullRequest(
      'https://github.com/owner/repo/pull/1'
    );

    expect(octokitMock.graphql).toHaveBeenCalledWith(
      expect.any(String),
      {
        pullRequestId: 'pr_node_id',
      }
    );
    expect(octokitMock.pulls.merge).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      pull_number: 1,
      merge_method: 'squash',
    });
    expect(result.message).toBe('PR merged');
  });

  it('should handle merge conflicts', async () => {
    octokitMock.pulls.get.mockResolvedValue({
      data: {
        draft: false,
        mergeable: true,
      },
    });
    octokitMock.pulls.merge.mockRejectedValue({
      status: 409,
    });

    await expect(
      mergeManager.mergePullRequest('https://github.com/owner/repo/pull/1')
    ).rejects.toThrow('Merge conflict. Please resolve conflicts.');
  });

  it('should handle branch protection rules', async () => {
    octokitMock.pulls.get.mockResolvedValue({
      data: {
        draft: false,
        mergeable: true,
      },
    });
    octokitMock.pulls.merge.mockRejectedValue({
      status: 405,
    });

    await expect(
      mergeManager.mergePullRequest('https://github.com/owner/repo/pull/1')
    ).rejects.toThrow('Merge not allowed. Check branch protection rules.');
  });

  it('should throw an error for non-mergeable PRs', async () => {
    octokitMock.pulls.get.mockResolvedValue({
      data: {
        draft: false,
        mergeable: false,
      },
    });

    await expect(
      mergeManager.mergePullRequest('https://github.com/owner/repo/pull/1')
    ).rejects.toThrow('PR is not mergeable. Please check for conflicts or failed checks.');
  });

  it('should throw an error for invalid PR URLs', async () => {
    await expect(mergeManager.mergePullRequest('invalid-url')).rejects.toThrow(
      'Invalid PR URL'
    );
  });
});
