// MASTER PLAN 2.0 SHARED TYPES
// Centraliserade TypeScript definitioner för dubbelt medvetandesystem

// =============================================================================
// LEGACY IMPORT TYPES (Enhanced för Master Plan 2.0)
// =============================================================================

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
  agentType?: 'conscious' | 'core' | 'bridge';
  seniorFriendly?: boolean;
  complexity?: 'low' | 'medium' | 'high';
  emotionalContext?: EmotionalResponse;
  architectureCompliant?: boolean;
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
  pollInterval: number;
  autoApprove: boolean;
  webhookUrl?: string;
  // MASTER PLAN 2.0 EXTENSIONS:
  groqApiKey?: string;
  geminiApiKey?: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  dualConsciousnessEnabled?: boolean;
  seniorModeEnabled?: boolean;
}

export interface TaskTemplate {
  name: string;
  title: string;
  description: string;
  dependencies?: string[];
  followUpTasks?: string[];
  // MASTER PLAN 2.0 EXTENSIONS:
  targetAgent?: 'conscious' | 'core' | 'bridge';
  seniorInstructions?: string;
  technicalRequirements?: string[];
  complexityLevel?: 'low' | 'medium' | 'high';
  estimatedDuration?: number;
}

export interface AgentWorkflow {
  id: string;
  name: string;
  tasks: TaskTemplate[];
  currentTaskIndex: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
  // MASTER PLAN 2.0 EXTENSIONS:
  workflowType?: 'crawl' | 'walk' | 'run' | 'fly';
  description?: string;
  estimatedDuration?: number;
  seniorFriendly?: boolean;
}

// =============================================================================
// MASTER PLAN 2.0 CORE TYPES
// =============================================================================

export interface DualConsciousnessConfig {
  consciousAgent: {
    groqApiKey: string;
    empathyLevel: 'low' | 'medium' | 'high';
    languageStyle: 'formal' | 'casual' | 'senior-friendly';
    emotionalIntelligence: boolean;
  };
  coreAgent: {
    geminiApiKey: string;
    langchainConfig: LangChainConfig;
    llamaindexConfig: LlamaIndexConfig;
    complexityHandling: 'basic' | 'advanced' | 'expert';
  };
  communicationBridge: {
    guardrailsEnabled: boolean;
    translationMode: 'auto' | 'manual';
    auditLogging: boolean;
    strictMode: boolean;
  };
}

export interface LangChainConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  timeout: number;
  retryAttempts: number;
}

export interface LlamaIndexConfig {
  indexType: 'vector' | 'keyword' | 'hybrid';
  chunkSize: number;
  chunkOverlap: number;
  cacheEnabled: boolean;
  persistenceEnabled: boolean;
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
  challengingConcepts: string[];
}

export interface EmotionalResponse {
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number; // 0-1
  suggestedTone: 'supportive' | 'encouraging' | 'patient' | 'celebratory';
  contextualHints: string[];
  emotionalTriggers?: string[];
  recommendedApproach?: string;
}

export interface TechnicalTranslation {
  originalText: string;
  seniorFriendlyText: string;
  technicalTermsUsed: string[];
  simplificationLevel: number; // 1-5
  verificationNeeded: boolean;
  confidenceScore: number; // 0-1
}

// =============================================================================
// CONSCIOUS AGENT TYPES (🎭 Medvetna Rondellen)
// =============================================================================

export interface ConsciousAgentState {
  currentSeniorUser?: SeniorUserProfile;
  emotionalContext: EmotionalResponse;
  communicationHistory: ConsciousMessage[];
  empathyLevel: 'low' | 'medium' | 'high';
  languageStyle: 'formal' | 'casual' | 'senior-friendly';
}

export interface ConsciousMessage {
  id: string;
  timestamp: Date;
  fromSenior: boolean;
  originalMessage: string;
  processedMessage?: string;
  emotionalAnalysis: EmotionalResponse;
  responseGenerated?: string;
  seniorSatisfaction?: number; // 1-5
}

export interface EmpathyEngineConfig {
  groqApiKey: string;
  emotionalSensitivity: number; // 0-1
  responsePersonalization: boolean;
  memoryRetention: number; // days
  adaptiveLearning: boolean;
}

export interface LanguageProcessorConfig {
  sourceLanguage: string;
  targetLanguage: string;
  simplificationLevel: number; // 1-5
  technicalTermFiltering: boolean;
  contextPreservation: boolean;
}

// =============================================================================
// CORE AGENT TYPES (⚙️ Kärn-agenten)
// =============================================================================

export interface CoreAgentState {
  currentTasks: JulesTask[];
  memoryIndex: LlamaIndexMemory;
  orchestrationChains: LangChainOrchestration[];
  decisionEngine: DecisionEngineState;
  toolsAvailable: AvailableTool[];
}

export interface LlamaIndexMemory {
  indexId: string;
  documentCount: number;
  lastUpdated: Date;
  queryHistory: MemoryQuery[];
  knowledgeGraph: KnowledgeNode[];
}

export interface MemoryQuery {
  id: string;
  query: string;
  timestamp: Date;
  results: MemoryResult[];
  confidence: number;
}

export interface MemoryResult {
  documentId: string;
  content: string;
  relevanceScore: number;
  metadata: Record<string, any>;
}

export interface KnowledgeNode {
  id: string;
  concept: string;
  connections: string[];
  importance: number;
  lastAccessed: Date;
}

export interface LangChainOrchestration {
  chainId: string;
  chainType: 'sequential' | 'parallel' | 'conditional';
  steps: OrchestrationStep[];
  currentStep: number;
  status: 'idle' | 'running' | 'completed' | 'failed';
}

export interface OrchestrationStep {
  id: string;
  name: string;
  tool: string;
  input: any;
  output?: any;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
}

export interface DecisionEngineState {
  currentDecision?: Decision;
  decisionHistory: Decision[];
  learningModel: LearningModel;
  confidenceThreshold: number;
}

export interface Decision {
  id: string;
  context: string;
  options: DecisionOption[];
  selectedOption?: string;
  confidence: number;
  reasoning: string;
  outcome?: DecisionOutcome;
}

export interface DecisionOption {
  id: string;
  description: string;
  probability: number;
  expectedOutcome: string;
  risks: string[];
  benefits: string[];
}

export interface DecisionOutcome {
  success: boolean;
  actualResult: string;
  learningPoints: string[];
  adjustments: string[];
}

export interface LearningModel {
  modelVersion: string;
  trainingData: TrainingDataPoint[];
  accuracy: number;
  lastTrained: Date;
}

export interface TrainingDataPoint {
  input: any;
  expectedOutput: any;
  actualOutput?: any;
  feedback?: number; // -1 to 1
}

export interface AvailableTool {
  name: string;
  description: string;
  category: 'jules' | 'smolagents' | 'web-search' | 'file-operations' | 'custom';
  enabled: boolean;
  configuration: Record<string, any>;
  usageStats: ToolUsageStats;
}

export interface ToolUsageStats {
  totalUses: number;
  successRate: number;
  averageDuration: number;
  lastUsed: Date;
  errorCount: number;
}

// =============================================================================
// COMMUNICATION BRIDGE TYPES (🌉 ReAct Chain of Thought)
// =============================================================================

export interface CommunicationBridgeState {
  activeTranslations: ActiveTranslation[];
  guardrailsStatus: GuardrailsStatus;
  thoughtMemory: ThoughtMemoryEntry[];
  auditLog: AuditLogEntry[];
}

export interface ActiveTranslation {
  id: string;
  fromAgent: 'conscious' | 'core';
  toAgent: 'conscious' | 'core';
  originalMessage: string;
  translatedMessage: string;
  translationType: 'technical-to-senior' | 'senior-to-technical';
  confidence: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface GuardrailsStatus {
  enabled: boolean;
  strictMode: boolean;
  blockedAttempts: number;
  lastViolation?: Date;
  activeRules: GuardrailRule[];
}

export interface GuardrailRule {
  id: string;
  name: string;
  description: string;
  pattern: string;
  action: 'block' | 'warn' | 'transform';
  enabled: boolean;
  violationCount: number;
}

export interface ThoughtMemoryEntry {
  id: string;
  timestamp: Date;
  sourceAgent: 'conscious' | 'core';
  thought: string;
  context: Record<string, any>;
  associatedTask?: string;
  importance: number; // 1-5
}

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  event: string;
  sourceAgent: 'conscious' | 'core' | 'bridge';
  details: Record<string, any>;
  severity: 'info' | 'warn' | 'error';
  seniorImpact: boolean;
}

// =============================================================================
// INFRASTRUCTURE TYPES (🔵 Vercel + Supabase)
// =============================================================================

export interface VercelFunctionConfig {
  functionName: string;
  runtime: 'nodejs18.x' | 'nodejs20.x';
  memory: 128 | 256 | 512 | 1024;
  timeout: number;
  environment: Record<string, string>;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  serviceRoleKey: string;
  database: DatabaseConfig;
  auth: AuthConfig;
  storage: StorageConfig;
}

export interface DatabaseConfig {
  connectionString: string;
  maxConnections: number;
  ssl: boolean;
  schema: string;
}

export interface AuthConfig {
  enabled: boolean;
  providers: string[];
  jwtSecret: string;
  sessionTimeout: number;
}

export interface StorageConfig {
  buckets: StorageBucket[];
  maxFileSize: number;
  allowedMimeTypes: string[];
}

export interface StorageBucket {
  name: string;
  public: boolean;
  allowedMimeTypes: string[];
  maxFileSize: number;
}

// =============================================================================
// MERGE SYSTEM TYPES (Enhanced från Legacy Import)
// =============================================================================

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
  seniorFriendly?: boolean;
  agentType?: 'conscious' | 'core' | 'bridge';
  complexity?: 'low' | 'medium' | 'high';
  architectureCompliant?: boolean;
  emotionalContext?: EmotionalResponse;
}

export interface MergeConfig {
  previewMode: boolean;
  autoMergeEnabled: boolean;
  requireSeniorApproval?: boolean;
  dualConsciousnessCheck?: boolean;
  architectureComplianceRequired?: boolean;
  maxConflictAttempts?: number;
}

export interface MergeOutcome {
  success: boolean;
  prUrl: string;
  mergeCommitSha?: string;
  duration: number;
  conflictsResolved: number;
  architectureCompliant: boolean;
  seniorSafe: boolean;
  learningPoints: string[];
}

// =============================================================================
// VISUAL DASHBOARD TYPES
// =============================================================================

export interface VisualDashboardState {
  activeTasks: VisualTask[];
  systemHealth: SystemHealthMetrics;
  seniorActivity: SeniorActivityMetrics;
  realTimeUpdates: boolean;
  websocketConnected: boolean;
}

export interface VisualTask {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number; // 0-100
  agentType: 'conscious' | 'core' | 'bridge';
  seniorVisible: boolean;
  visualRepresentation: TaskVisualization;
}

export interface TaskVisualization {
  color: string;
  icon: string;
  progressBar: boolean;
  statusIndicator: 'spinner' | 'checkmark' | 'error' | 'warning';
  seniorFriendlyDescription: string;
}

export interface SystemHealthMetrics {
  overallHealth: 'healthy' | 'warning' | 'critical';
  consciousAgentStatus: 'online' | 'offline' | 'degraded';
  coreAgentStatus: 'online' | 'offline' | 'degraded';
  communicationBridgeStatus: 'online' | 'offline' | 'degraded';
  infrastructureStatus: 'online' | 'offline' | 'degraded';
  lastHealthCheck: Date;
}

export interface SeniorActivityMetrics {
  activeSeniors: number;
  successfulInteractions: number;
  challengingInteractions: number;
  averageSatisfaction: number; // 1-5
  commonQuestions: string[];
  improvementAreas: string[];
}

// =============================================================================
// ERROR HANDLING TYPES
// =============================================================================

export interface MasterPlan2Error {
  id: string;
  timestamp: Date;
  component: 'conscious' | 'core' | 'bridge' | 'infrastructure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  technicalDetails: string;
  seniorFriendlyMessage: string;
  resolution?: string;
  preventionStrategy?: string;
}

export interface ErrorRecoveryStrategy {
  errorType: string;
  recoverySteps: string[];
  fallbackOptions: string[];
  seniorCommunication: string;
  escalationRequired: boolean;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type AgentType = 'conscious' | 'core' | 'bridge';
export type ComplexityLevel = 'low' | 'medium' | 'high';
export type SeniorComfortLevel = 'beginner' | 'intermediate' | 'advanced';
export type EmotionalTone = 'supportive' | 'encouraging' | 'patient' | 'celebratory';
export type SystemStatus = 'online' | 'offline' | 'degraded';
export type TaskStatus = 'pending' | 'planning' | 'executing' | 'completed' | 'failed';
export type WorkflowPhase = 'crawl' | 'walk' | 'run' | 'fly';