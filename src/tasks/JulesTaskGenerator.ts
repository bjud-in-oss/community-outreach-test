export class JulesTaskGenerator {
  public createConflictResolutionTask(prDetails: any): any {
    const task = {
      title: `Resolve merge conflicts in PR #${prDetails.number}`,
      description: `
**Original Task Intent:**
${prDetails.body}

**Implementation History:**
- PR created by: @${prDetails.user.login}
- Commits:
${prDetails.commits.map((c: any) => `  - ${c.sha}: ${c.commit.message}`).join('\n')}

**Design Decisions:**
[Please fill in with relevant design decisions]

**Conflict Analysis:**
- Conflicting files: [List of conflicting files]
- Conflict breakdown: [Detailed breakdown of conflicts]

**Resolution Guidelines:**
- Preserve original functionality.
- Maintain original task goals.

**Success Criteria:**
- All conflicts are resolved.
- All tests pass.
- The PR is mergeable.

**Link to original task:**
${prDetails.html_url}
`,
    };

    return task;
  }
}
