export const Octokit = jest.fn().mockImplementation(() => {
  return {
    pulls: {
      get: jest.fn(),
      merge: jest.fn(),
    },
    graphql: jest.fn(),
  };
});
