import { promises as fs } from 'fs';
import path from 'path';

export interface RepositoryAnalysis {
  projectType: string;
  keyDependencies: { name: string; version: string }[];
  folderStructure: string[];
  testingSetup: any;
}

export class JulesAutomationAgent {
  async analyzeRepository(): Promise<RepositoryAnalysis> {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf-8'));
    const tsconfigJson = JSON.parse(await fs.readFile('tsconfig.json', 'utf-8'));

    const projectType = this.determineProjectType(packageJson);
    const keyDependencies = this.extractKeyDependencies(packageJson);
    const folderStructure = await this.getFolderStructure('.');
    const testingSetup = this.getTestingSetup(packageJson);

    return {
      projectType,
      keyDependencies,
      folderStructure,
      testingSetup,
    };
  }

  private determineProjectType(packageJson: any): string {
    if (packageJson.dependencies?.next) {
      return 'Next.js';
    }
    if (packageJson.dependencies?.react) {
      return 'React';
    }
    return 'Unknown';
  }

  private extractKeyDependencies(packageJson: any): { name: string; version: string }[] {
    const dependencies = packageJson.dependencies || {};
    return Object.keys(dependencies).map(key => ({ name: key, version: dependencies[key] }));
  }

  private async getFolderStructure(dir: string): Promise<string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? this.getFolderStructure(res) : res;
    }));
    return Array.prototype.concat(...files);
  }

  private getTestingSetup(packageJson: any): any {
    const devDependencies = packageJson.devDependencies || {};
    const testingSetup: any = {};
    if (devDependencies.jest) {
      testingSetup.framework = 'Jest';
    }
    if (devDependencies['@testing-library/react']) {
      testingSetup.testingLibrary = 'React Testing Library';
    }
    return testingSetup;
  }
}
