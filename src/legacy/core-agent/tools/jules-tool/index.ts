// MASTER PLAN 2.0: Jules Tool Index
// STATUS: Export definitions för Jules Tool integration
// INTEGRATION: Core Agent Tool exports

export { JulesTool } from './JulesTool.js';
export { GitHubClient } from './GitHubClient.js';
export { AutonomousMergeManager } from './merge/AutonomousMergeManager.js';
export { RealGitHubMerger, MergeError } from './merge/RealGitHubMerger.js';

export type {
  JulesToolConfig,
  TaskTemplate,
  JulesTask,
  GitHubIssue,
  GitHubComment,
  PRDetails,
  MergeConfig,
  JulesToolResponse,
  DualConsciousnessConfig,
  SeniorUserProfile,
  EmotionalResponse,
  TechnicalTranslation,
  CommunicationBridgeMessage,
  ArchitectureComplianceCheck,
  WorkflowStep,
  AgentWorkflow,
  AgentType,
  ComplexityLevel,
  TaskStatus,
  WorkflowPhase,
  MessageType,
  SeverityLevel
} from './types.js';

export {
  JulesToolError,
  CommunicationBridgeError,
  ArchitectureViolationError
} from './types.js';