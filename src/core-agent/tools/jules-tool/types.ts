// REFACTORED FOR MASTER PLAN 2.0: types.ts
// ORIGINAL: src/legacy-import/infrastructure/types.ts
// STATUS: Utökad för Dual Consciousness Architecture
// INTEGRATION: Core Agent Tool type definitions

// MASTER PLAN 2.0 Core Agent Tool Types

export interface JulesToolConfig {
  githubToken: string;
  repoOwner: string;
  repoName: string;
  julesLabel: string;
  pollInterval: number;
  autoApprove: boolean;
  webhookUrl?: string;
  // MASTER PLAN 2.0 EXTENSIONS:
  groqApiKey?: string;        // För Conscious Agent empathy engine
  geminiApiKey?: string;      // För Core Agent kod generation
  supabaseUrl?: string;       // För databas integration
  supabaseKey?: string;       // För autentisering
}

export interface TaskTemplate {
  name: string;
  title: string;
  description: string;
  dependencies?: string[];
  followUpTasks?: string[];
  // MASTER PLAN 2.0 EXTENSIONS:
  targetAgent?: 'conscious' | 'core' | 'bridge';  // Vilken agent som ska hantera
  seniorInstructions?: string;                     // Senior-vänliga instruktioner
  technicalRequirements?: string[];               // Tekniska krav
  complexity?: 'low' | 'medium' | 'high';        // Komplexitetsnivå
  estimatedDuration?: number;                      // Uppskattad tid i minuter
}

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
  agentType?: 'conscious' | 'core' | 'bridge';    // Vilken agent som hanterar task
  seniorFriendly?: boolean;                        // Om task är senior-vänlig
  complexity?: 'low' | 'medium' | 'high';        // Komplexitetsnivå
  seniorFriendlyStatus?: string;                   // Status på svenska för seniorer
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

export interface PRDetails {
  number: number;
  title: string;
  body: string;
  branchName: string;
  baseBranch: string;
  repo: string;
  user: { login: string };
  commits: Array<{ sha: string; commit: { message: string } }>;
  hasConflicts: boolean;
  html_url: string;
  // MASTER PLAN 2.0 EXTENSIONS:
  seniorFriendly?: boolean;                        // Om PR är senior-vänlig
  agentType?: 'conscious' | 'core' | 'bridge';    // Vilken agent som skapade PR
  complexity?: 'low' | 'medium' | 'high';        // Komplexitetsnivå
  architectureCompliant?: boolean;                 // Om PR följer dual consciousness
  seniorImpact?: 'low' | 'medium' | 'high';      // Påverkan på senior användare
}

export interface MergeConfig {
  previewMode: boolean;
  autoMergeEnabled: boolean;
  // MASTER PLAN 2.0 EXTENSIONS:
  requireSeniorApproval?: boolean;                 // Om senior-godkännande krävs
  dualConsciousnessCheck?: boolean;               // Om arkitektur check krävs
  guardrailsEnabled?: boolean;                     // Om guardrails är aktiverade
  communicationBridgeRequired?: boolean;           // Om communication bridge krävs
}

// MASTER PLAN 2.0 SPECIFIC TYPES:

export interface DualConsciousnessConfig {
  consciousAgent: {
    groqApiKey: string;
    empathyLevel: 'low' | 'medium' | 'high';
    languageStyle: 'formal' | 'casual' | 'senior-friendly';
    translationEnabled: boolean;
  };
  coreAgent: {
    geminiApiKey: string;
    langchainConfig: object;
    llamaindexConfig: object;
    julesIntegration: boolean;
  };
  communicationBridge: {
    guardrailsEnabled: boolean;
    translationMode: 'auto' | 'manual';
    auditLogging: boolean;
    errorFiltering: boolean;
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
  successfulInteractions: number;
  preferredComplexity: 'low' | 'medium' | 'high';
}

export interface EmotionalResponse {
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number; // 0-1
  suggestedTone: 'supportive' | 'encouraging' | 'patient' | 'celebratory';
  contextualHints: string[];
  seniorFriendlyMessage: string;
}

export interface TechnicalTranslation {
  originalText: string;
  seniorFriendlyText: string;
  technicalTermsUsed: string[];
  simplificationLevel: number; // 1-5
  verificationNeeded: boolean;
  confidence: number; // 0-1
}

export interface CommunicationBridgeMessage {
  id: string;
  timestamp: Date;
  fromAgent: 'conscious' | 'core' | 'bridge';
  toAgent: 'conscious' | 'core' | 'bridge';
  messageType: 'request' | 'response' | 'notification' | 'error';
  originalContent: any;
  translatedContent?: any;
  guardrailsApplied: string[];
  seniorSafe: boolean;
}

export interface ArchitectureComplianceCheck {
  approved: boolean;
  reason: string;
  violations: string[];
  recommendations: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface JulesToolResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  seniorFriendlyMessage?: string;
  technicalDetails?: any;
  requiresApproval?: boolean;
  estimatedTime?: number;
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'skipped';
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  agent: 'conscious' | 'core' | 'bridge';
  seniorVisible: boolean;
  technicalDetails?: any;
  seniorFriendlyDescription?: string;
}

export interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  currentStepIndex: number;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed';
  // MASTER PLAN 2.0 EXTENSIONS:
  workflowType?: 'crawl' | 'walk' | 'run' | 'fly';  // Fas i Master Plan 2.0
  estimatedDuration?: number;                        // Uppskattad tid i minuter
  seniorFriendlyName?: string;                      // Namn på svenska för seniorer
  seniorFriendlyDescription?: string;               // Beskrivning på svenska
  requiresSeniorApproval?: boolean;                 // Om senior-godkännande krävs
}

// Error types for better error handling
export class JulesToolError extends Error {
  constructor(
    message: string,
    public code: string,
    public seniorFriendlyMessage?: string,
    public technicalDetails?: any
  ) {
    super(message);
    this.name = 'JulesToolError';
  }
}

export class CommunicationBridgeError extends Error {
  constructor(
    message: string,
    public fromAgent: string,
    public toAgent: string,
    public originalMessage?: any
  ) {
    super(message);
    this.name = 'CommunicationBridgeError';
  }
}

export class ArchitectureViolationError extends Error {
  constructor(
    message: string,
    public violations: string[],
    public severity: 'low' | 'medium' | 'high' | 'critical'
  ) {
    super(message);
    this.name = 'ArchitectureViolationError';
  }
}

// Utility types
export type AgentType = 'conscious' | 'core' | 'bridge';
export type ComplexityLevel = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'planning' | 'executing' | 'completed' | 'failed';
export type WorkflowPhase = 'crawl' | 'walk' | 'run' | 'fly';
export type MessageType = 'request' | 'response' | 'notification' | 'error';
export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';