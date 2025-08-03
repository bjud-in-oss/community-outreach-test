import { JulesAutomationAgent } from './jules-agent';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    readdir: jest.fn(),
  },
}));

describe('JulesAutomationAgent', () => {
  let agent: JulesAutomationAgent;

  beforeEach(() => {
    agent = new JulesAutomationAgent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should analyze a Next.js project correctly', async () => {
    const packageJson = {
      dependencies: {
        next: '14.2.3',
        react: '^18',
      },
      devDependencies: {
        jest: '^29',
      },
    };
    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify(packageJson));
    (fs.readFile as jest.Mock).mockResolvedValueOnce(JSON.stringify({ compilerOptions: {} }));
    (fs.readdir as jest.Mock).mockResolvedValueOnce([
      { name: 'pages', isDirectory: () => true },
      { name: 'public', isDirectory: () => true },
      { name: 'package.json', isDirectory: () => false },
    ]);
    (fs.readdir as jest.Mock).mockResolvedValueOnce([{ name: 'index.tsx', isDirectory: () => false }]);
    (fs.readdir as jest.Mock).mockResolvedValueOnce([{ name: 'favicon.ico', isDirectory: () => false }]);

    const analysis = await agent.analyzeRepository();

    expect(analysis.projectType).toBe('Next.js');
    expect(analysis.keyDependencies).toEqual([
      { name: 'next', version: '14.2.3' },
      { name: 'react', version: '^18' },
    ]);
    expect(analysis.testingSetup.framework).toBe('Jest');
  });
});
