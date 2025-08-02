module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@octokit/rest$': '<rootDir>/src/__mocks__/octokit.ts',
  },
};
