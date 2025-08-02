export class Octokit {
  constructor() {}

  public pulls = {
    get: jest.fn(),
    merge: jest.fn(),
  };

  public git = {
    getRef: jest.fn(),
    createRef: jest.fn(),
  };
}
