export class PullRequest {
  constructor(public id: number, public attempts: number = 0, public isProblematic: boolean = false) {}
}
