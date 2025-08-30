// MASTER PLAN 2.0: ComposioTool.ts
// STATUS: Foundational tool for Core Agent to interact with all external services.
// INTEGRATION: Core Agent - Specialized Tool
// ARCHITECTURE: Dual Consciousness Architecture compliant

import axios from 'axios';

interface ComposioAction {
  app: 'github' | 'vercel' | 'google_calendar' | 'google_docs';
  action: string;
  params: Record<string, any>;
}

/**
 * A high-level tool for the Core Agent to interact with a self-hosted Composio instance.
 * This acts as a universal remote for all external APIs (GitHub, Vercel, Google, etc.).
 * The Core Agent's reasoning engine (e.g., LangChain) will decide which app and action to call.
 */
export class ComposioTool {
  private composioUrl: string;
  private apiKey: string;

  constructor() {
    this.composioUrl = process.env.COMPOSIO_URL || 'http://localhost:8080/execute';
    this.apiKey = process.env.COMPOSIO_API_KEY || '';

    if (!this.apiKey) {
      console.warn('🚨 COMPOSIO_API_KEY is not set. ComposioTool will not be able to authenticate.');
    }
  }

  /**
   * Executes an action via the Composio instance.
   * @param {ComposioAction} action - The structured action to perform.
   * @returns {Promise<any>} The result from the external API.
   */
  async execute(action: ComposioAction): Promise<any> {
    console.log(`🤖 Core Agent is using ComposioTool for: ${action.app}.${action.action}`);
    try {
      const response = await axios.post(this.composioUrl, action, { headers: { 'x-api-key': this.apiKey } });
      return response.data;
    } catch (error) {
      console.error(`❌ ComposioTool execution failed for ${action.app}.${action.action}:`, error);
      throw new Error(`Failed to execute Composio action: ${error}`);
    }
  }
}