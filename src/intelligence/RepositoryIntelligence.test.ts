import { RepositoryIntelligence } from './RepositoryIntelligence';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

describe('RepositoryIntelligence', () => {
  const projectRoot = '/test-project';

  beforeEach(() => {
    // Reset the mock file system before each test
    jest.resetAllMocks();
  });

  it('should detect Next.js architecture', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    const repoIntel = new RepositoryIntelligence(projectRoot);
    expect(repoIntel.detectArchitecture()).toBe('Next.js');
  });

  it('should identify code patterns', () => {
    const repoIntel = new RepositoryIntelligence(projectRoot);
    expect(repoIntel.identifyCodePatterns()).toEqual(['Singleton', 'Factory', 'Observer']);
  });

  it('should analyze dependencies from package.json', () => {
    const packageJsonContent = {
      dependencies: {
        react: '^18',
        'next': '14.2.3',
      },
    };
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(packageJsonContent));
    const repoIntel = new RepositoryIntelligence(projectRoot);
    expect(repoIntel.analyzeDependencies()).toEqual(packageJsonContent.dependencies);
  });

  it('should detect testing patterns', () => {
    const repoIntel = new RepositoryIntelligence(projectRoot);
    expect(repoIntel.detectTestingPatterns()).toEqual(['Unit', 'Integration', 'End-to-End']);
  });

  it('should parse AGENTS.md file', () => {
    const agentsFileContent = 'This is a test AGENTS.md file.';
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(agentsFileContent);
    const repoIntel = new RepositoryIntelligence(projectRoot);
    expect(repoIntel.parseAgentsFile()).toBe(agentsFileContent);
  });

  it('should return null when AGENTS.md does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const repoIntel = new RepositoryIntelligence(projectRoot);
    expect(repoIntel.parseAgentsFile()).toBeNull();
  });
});
