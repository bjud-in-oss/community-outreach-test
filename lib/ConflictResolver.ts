import { PullRequest } from './PullRequest';

export class ConflictResolver {
  private static readonly MAX_ATTEMPTS = 3;

  public static handleConflicts(prs: PullRequest[]): string[] {
    const logs: string[] = [];

    for (const pr of prs) {
      if (pr.isProblematic) {
        logs.push(`Skipping problematic PR #${pr.id}`);
        continue;
      }

      let resolved = false;
      while (pr.attempts < this.MAX_ATTEMPTS && !resolved) {
        pr.attempts++;
        logs.push(`Attempting to resolve conflict for PR #${pr.id} (Attempt ${pr.attempts})`);
        resolved = this.attemptResolution(pr);
      }

      if (!resolved) {
        pr.isProblematic = true;
        logs.push(`Marking PR #${pr.id} as problematic after ${this.MAX_ATTEMPTS} failed attempts.`);
      }
    }

    return logs;
  }

  private static attemptResolution(pr: PullRequest): boolean {
    // Simulate a 50% chance of resolving the conflict
    const success = Math.random() > 0.5;
    if (success) {
      console.log(`Successfully resolved conflict for PR #${pr.id}`);
    } else {
      console.log(`Failed to resolve conflict for PR #${pr.id}`);
    }
    return success;
  }
}
