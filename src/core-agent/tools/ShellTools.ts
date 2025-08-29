// MASTER PLAN 2.0: ShellTool.ts
// STATUS: Foundational tool for Core Agent to interact with the command line.
// INTEGRATION: Core Agent - Specialized Tool
// ARCHITECTURE: Dual Consciousness Architecture compliant

import { exec } from 'child_process';
import { promisify } from 'util';

// Promisify the exec function to use it with async/await for cleaner code
const execPromise = promisify(exec);

/**
 * Represents a tool for the Core Agent to execute shell commands.
 * This is essential for tasks like installing UI components via CLI (e.g., shadcn/ui),
 * managing packages, or interacting with other command-line interfaces.
 */
export class ShellTool {
  private allowedCommands: string[];

  constructor() {
    // --- SECURITY CRITICAL ---
    // Define a strict whitelist of commands the agent is allowed to execute.
    // This prevents the agent from performing malicious or unintended actions.
    this.allowedCommands = [
      'npx shadcn-ui@latest add',
      'npm install',
      'git status', // Example of another safe, read-only command
    ];
    console.log('🛠️ ShellTool initialized with security whitelist.');
  }

  /**
   * Executes a shell command after validating it against a security whitelist.
   * @param command The full command string to execute (e.g., "npx shadcn-ui@latest add button").
   * @returns A promise that resolves with the standard output of the command.
   * @throws An error if the command is not in the whitelist or if the execution fails.
   */
  async execute(command: string): Promise<string> {
    console.log(`🐚 ShellTool attempting to execute: "${command}"`);

    const isAllowed = this.allowedCommands.some(allowedCmd => command.startsWith(allowedCmd));

    if (!isAllowed) {
      const errorMessage = `Security Alert: Command not allowed: "${command}"`;
      console.error(`🚨 ${errorMessage}`);
      throw new Error(errorMessage);
    }

    try {
      const { stdout, stderr } = await execPromise(command);
      if (stderr) {
        console.warn(`⚠️ ShellTool command produced stderr: ${stderr}`);
      }
      return stdout;
    } catch (error: any) {
      console.error(`❌ ShellTool execution failed for command: "${command}"\nError: ${error.stderr || error.message}`);
      throw new Error(`Failed to execute command: ${error.stderr || error.message}`);
    }
  }
}