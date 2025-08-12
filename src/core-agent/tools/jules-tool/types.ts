// LEGACY IMPORT: types.ts från jules-automation-test
// STATUS: Fungerande TypeScript definitioner
// MASTER PLAN 2.0 KOMPATIBILITET: Hög - kan utökas för dubbelt medvetandesystem

// Jules Automation Types - ANPASSAS TILL MASTER PLAN 2.0
export interface JulesTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'planning' | 'executing' | 'completed' | 'failed';
  githubIssueNumber?: number;
  branchName?: string;
  prUrl?: string;
  createdAt: Date;
  completedAt?: Date;
  // MASTER PLAN 2.0 EXTENSIONS:
  agentType?: 'conscious' | 'core' | 'bridge'; // Vilken agent som hanterar task
  seniorFriendly?: boolean; // Om task är senior-vänlig
  complexity?: 'low' | 'medium' | 'high'; // Komplexitetsnivå
}

export interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  labels: string[];
  state: 'open' | 'closed';
  comments: GitHubComment[];
}

export interface GitHubComment {
  id: number;
  user: string;
  body: string;
  created_at: string;
  isJulesComment: boolean;
}

export interface AutomationConfig {
  githubToken: string;
  repoOwner: string;
  repoName: string;
  julesLabel: string;
  pollInterval: number; // milliseconds
  autoApprove: boolean;
  webhookUrl?: string;
  // MASTER PLAN 2.0 EXTENSIONS:
  groqApiKey?: string; // För emotionell motor
  geminiApiKey?: string; // För kodgenerering
  supabaseUrl?: string; // För databas
  supabaseKey?: string; // För autentisering
}

export interface TaskTemplate {
  name: string;
  title: string;
  description: string;
  dependencies?: string[];
  followUpTasks?: string[];
  // MASTER PLAN 2.0 EXTENSIONS:
  targetAgent?: 'conscious' | 'core' | 'bridge'; // Vilken agent som ska hantera
  seniorInstructions?: string; // Instruktioner för senior-vänlig implementation
  technicalRequirements?: string[]; // Tekniska krav
}

export interface AgentWorkflow {
  id: string;
  name: string;
  tasks: TaskTemplate[];
  currentTaskIndex: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  // MASTER PLAN 2.0 EXTENSIONS:
  workflowType?: 'crawl' | 'walk' | 'run' | 'fly'; // Fas i Master Plan 2.0
  description?: string; // Beskrivning av workflow
  estimatedDuration?: number; // Uppskattad tid i minuter
}

// MASTER PLAN 2.0 SPECIFIC TYPES:

export interface DualConsciousnessConfig {
  consciousAgent: {
    groqApiKey: string;
    empathyLevel: 'low' | 'medium' | 'high';
    languageStyle: 'formal' | 'casual' | 'senior-friendly';
  };
  coreAgent: {
    geminiApiKey: string;
    langchainConfig: object;
    llamaindexConfig: object;
  };
  communicationBridge: {
    guardrailsEnabled: boolean;
    translationMode: 'auto' | 'manual';
    auditLogging: boolean;
  };
}

export interface SeniorUserProfile {
  id: string;
  name: string;
  age: number;
  techComfort: 'beginner' | 'intermediate' | 'advanced';
  preferredLanguage: string;
  communicationStyle: 'direct' | 'detailed' | 'encouraging';
  learningHistory: string[];
}

export interface EmotionalResponse {
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number; // 0-1
  suggestedTone: 'supportive' | 'encouraging' | 'patient' | 'celebratory';
  contextualHints: string[];
}

export interface TechnicalTranslation {
  originalText: string;
  seniorFriendlyText: string;
  technicalTermsUsed: string[];
  simplificationLevel: number; // 1-5
  verificationNeeded: boolean;
}