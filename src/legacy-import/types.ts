// Jules Automation Types
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
}

export interface TaskTemplate {
  name: string;
  title: string;
  description: string;
  dependencies?: string[];
  followUpTasks?: string[];
}

export interface AgentWorkflow {
  id: string;
  name: string;
  tasks: TaskTemplate[];
  currentTaskIndex: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
}