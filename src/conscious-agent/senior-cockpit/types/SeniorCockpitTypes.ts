// MASTER PLAN 2.0: Senior Cockpit Types
// STATUS: Jules Senior Cockpit Implementation - Data Models
// INTEGRATION: Conscious Agent - Senior View Data Structures
// ARCHITECTURE: Dual Consciousness Architecture compliant

/**
 * JULES SENIOR COCKPIT TYPES
 * 
 * Baserat på Jules analys: "Senior Cockpit" som intelligent filter
 * mellan seniorer och teknisk komplexitet.
 * 
 * Dessa typer definierar vad som visas i Senior View (inte System View)
 */

export type Phase = 'Crawl' | 'Walk' | 'Run' | 'Fly';

export type UserPlanStatus = 'draft' | 'approved' | 'in_progress' | 'completed';

export type NotificationPriority = 'info' | 'success' | 'warning' | 'celebration';

export interface SeniorView {
  projectOverview: ProjectOverview;
  recentProgress: RecentProgress;
  userPlan?: UserPlan;
  notifications: SeniorNotification[];
  lastUpdated: Date;
}

export interface ProjectOverview {
  title: string;
  description: string; // Senior-vänlig beskrivning av vad som byggs
  currentPhase: Phase;
  overallProgress: number; // 0-100%
  estimatedCompletion?: string; // "Om 2 månader" istället för "2025-10-15"
  keyAchievements: string[]; // Vad som redan är klart
}

export interface RecentProgress {
  thisWeek: string; // "Vi slutförde grundläggande databas-setup"
  nextWeek: string; // "Nästa steg är att skapa användarinloggning"
  blockers?: string; // Endast om det finns problem som påverkar senioren
  confidence: number; // 0-100% - hur säkra vi är på tidsplanen
}

export interface UserPlan {
  originalDescription: string; // Seniorens egna ord
  currentStatus: UserPlanStatus;
  generatedRequirements?: string[]; // AI-genererade från användarplan
  technicalApproval?: {
    approved: boolean;
    approvedBy: string;
    approvedAt: Date;
    comments?: string;
  };
  estimatedImplementation?: {
    timeframe: string; // "2-3 månader"
    complexity: 'Enkel' | 'Medel' | 'Avancerad';
    resources: string; // "2 utvecklare, deltid"
  };
}

export interface SeniorNotification {
  id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  timestamp: Date;
  actionRequired?: boolean;
  actionText?: string; // "Godkänn förslag" eller "Ge feedback"
  actionUrl?: string;
}

export interface PhaseStatus {
  phase: Phase;
  description: string; // Vad denna fas innebär för senioren
  progress: number; // 0-100%
  keyMilestones: PhaseMilestone[];
  estimatedDuration: string; // "2-4 veckor"
}

export interface PhaseMilestone {
  title: string;
  description: string; // Senior-vänlig beskrivning
  completed: boolean;
  completedAt?: Date;
  estimatedCompletion?: string;
}

export interface WeeklyUpdate {
  weekOf: Date;
  summary: string; // Huvudsaklig framsteg denna vecka
  achievements: string[]; // Vad som slutfördes
  nextWeekFocus: string; // Vad som händer nästa vecka
  needsAttention?: string; // Om något kräver seniorens uppmärksamhet
  celebrationWorthy?: string; // Stora milstones att fira
}

export interface SeniorSummary {
  projectHealth: 'Excellent' | 'Good' | 'Needs Attention' | 'Critical';
  healthDescription: string; // Förklaring av hälsostatus
  keyMetrics: {
    completedTasks: number;
    upcomingMilestones: number;
    teamMorale: 'High' | 'Medium' | 'Low';
    budgetStatus: 'On Track' | 'Under Budget' | 'Over Budget';
  };
  recommendations?: string[]; // Vad senioren bör fokusera på
}

// System View Data (vad som kommer från tekniska system)
export interface SystemViewData {
  gitCommits: GitCommit[];
  completedTasks: Task[];
  openIssues: Issue[];
  pullRequests: PullRequest[];
  buildStatus: BuildStatus;
  testResults: TestResults;
  deploymentStatus: DeploymentStatus;
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  timestamp: Date;
  filesChanged: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed' | 'blocked';
  assignee?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedHours?: number;
  actualHours?: number;
  completedAt?: Date;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved';
  assignee?: string;
  createdAt: Date;
}

export interface PullRequest {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'merged' | 'closed';
  author: string;
  reviewers: string[];
  createdAt: Date;
  mergedAt?: Date;
}

export interface BuildStatus {
  status: 'success' | 'failure' | 'in_progress';
  lastBuild: Date;
  duration?: number; // seconds
  testsPassed?: number;
  testsFailed?: number;
}

export interface TestResults {
  totalTests: number;
  passed: number;
  failed: number;
  coverage: number; // 0-100%
  lastRun: Date;
}

export interface DeploymentStatus {
  environment: 'development' | 'staging' | 'production';
  status: 'deployed' | 'deploying' | 'failed';
  version: string;
  deployedAt?: Date;
  uptime: number; // percentage
}

// Cockpit Configuration
export interface CockpitConfig {
  refreshInterval: number; // milliseconds
  showTechnicalDetails: boolean; // För debugging, normalt false
  notificationSettings: {
    enablePush: boolean;
    enableEmail: boolean;
    quietHours: {
      start: string; // "22:00"
      end: string;   // "08:00"
    };
  };
  language: 'sv' | 'en'; // Svenska som default
}

// API Response Types
export interface CockpitApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
  seniorFriendlyMessage?: string; // Alltid inkluderat för fel
}

export type GetSeniorViewResponse = CockpitApiResponse<SeniorView>;
export type GetPhaseStatusResponse = CockpitApiResponse<PhaseStatus>;
export type GetWeeklyUpdateResponse = CockpitApiResponse<WeeklyUpdate>;
export type SubmitUserPlanResponse = CockpitApiResponse<{ planId: string; estimatedReview: string }>;

// Form Types för Användarplan
export interface UserPlanFormData {
  projectTitle: string;
  description: string; // Vad vill du skapa?
  targetUsers: string; // Vem ska använda det?
  keyFeatures: string[]; // Vad ska det kunna göra?
  priority: 'Måste ha' | 'Bra att ha' | 'Kanske senare';
  timeline: 'Så snart som möjligt' | 'Inom en månad' | 'Inom tre månader' | 'Ingen brådska';
  budget?: string; // Valfritt
  additionalNotes?: string;
}

export interface UserPlanValidation {
  isValid: boolean;
  errors: {
    field: keyof UserPlanFormData;
    message: string;
  }[];
  warnings?: {
    field: keyof UserPlanFormData;
    message: string;
  }[];
}