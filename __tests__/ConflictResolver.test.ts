import { ConflictResolver } from '../lib/ConflictResolver';
import { PullRequest } from '../lib/PullRequest';

const randomSpy = jest.spyOn(global.Math, 'random');

describe('ConflictResolver', () => {
  afterEach(() => {
    randomSpy.mockRestore();
  });

  it('should mark a PR as problematic after 3 failed attempts', () => {
    const pr = new PullRequest(1);
    const prs = [pr];

    randomSpy.mockReturnValue(0.4);

    ConflictResolver.handleConflicts(prs);
    expect(pr.isProblematic).toBe(true);
  });

  it('should not mark a PR as problematic if it is resolved', () => {
    const pr = new PullRequest(1);
    const prs = [pr];

    randomSpy.mockReturnValue(0.6);

    ConflictResolver.handleConflicts(prs);
    expect(pr.isProblematic).toBe(false);
  });

  it('should skip problematic PRs', () => {
    const pr = new PullRequest(1, 0, true);
    const prs = [pr];
    const logs = ConflictResolver.handleConflicts(prs);
    expect(logs).toContain('Skipping problematic PR #1');
  });
});
