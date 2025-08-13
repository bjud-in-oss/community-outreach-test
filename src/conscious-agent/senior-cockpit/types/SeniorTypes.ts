/**
 * TypeScript types för Senior Cockpit
 * Alla types är designade för att vara senior-säkra och aldrig exponera teknisk komplexitet
 */

// Grundläggande senior-säkra datatyper
export interface SeniorSafeData {
  // Endast senior-vänlig information - inga tekniska fält
  projectName: string;
  friendlyDescription: string;
  currentActivity: string;
  progressPercentage: number;
  nextSteps: string[];
  celebrationMoments: string[];
}

export interface ProjectSummary {
  title: string;
  description: string; // Senior-vänlig beskrivning utan teknisk jargong
  currentPhase: 'Crawl' | 'Walk' | 'Run' | 'Fly';
  currentPhaseDisplay: string; // "Grundläggande Setup" istället för "CRAWL"
  overallProgress: number; // 0-100
  nextMilestone: string;
  lastUpdate: Date;
}

export interface PhaseStatus {
  name: string;
  displayName: string; // Senior-vänligt namn
  status: 'completed' | 'active' | 'upcoming';
  progress: number; // 0-100
  description: string; // Senior-vänlig förklaring
  estimatedCompletion?: string; // "Nästa vecka" istället för datum
}

export interface PhaseIndicator {
  phases: PhaseStatus[];
  currentPhase: string;
  visualStyle: 'progress-bar' | 'milestone-dots' | 'journey-map';
  totalProgress: number;
}

export interface SeniorFriendlyUpdate {
  id: string;
  title: string; // "Vi har gjort framsteg!" istället för "Build successful"
  description: string; // "Idag slutförde vi grundläggande setup"
  type: 'progress' | 'celebration' | 'milestone' | 'info' | 'encouragement';
  timestamp: Date;
  relatedPhase?: string;
  priority: 'high' | 'medium' | 'low';
  isRead: boolean;
}

export interface SeniorNotification {
  id: string;
  type: 'success' | 'info' | 'working' | 'celebration' | 'encouragement';
  title: string; // "Bra jobbat!" istället för tekniska meddelanden
  message: string; // Senior-vänligt språk
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
  autoHide: boolean;
  duration?: number; // Millisekunder innan auto-hide
  actions?: SeniorNotificationAction[];
}

export interface SeniorNotificationAction {
  label: string; // "Visa mer" eller "Okej"
  action: () => void;
  style: 'primary' | 'secondary';
}

// Tillgänglighetsrelaterade types
export interface AccessibilityFeatures {
  screenReaderSupport: boolean;
  keyboardNavigation: boolean;
  highContrastMode: boolean;
  textScaling: boolean;
  reducedMotion: boolean;
  voiceNavigation?: boolean; // Framtida förbättring
}

export interface SeniorPreferences {
  fontSize: 'normal' | 'large' | 'extra-large';
  contrast: 'normal' | 'high';
  animations: 'normal' | 'reduced' | 'none';
  notifications: 'all' | 'important' | 'minimal';
  language: 'sv' | 'en'; // Stöd för flera språk
}

// Komponentrelaterade types
export interface SeniorDashboard {
  projectOverview: ProjectSummary;
  phaseProgress: PhaseIndicator;
  recentUpdates: SeniorFriendlyUpdate[];
  notifications: SeniorNotification[];
  preferences: SeniorPreferences;
}

export interface SeniorCockpitProps {
  className?: string;
  onPreferencesChange?: (preferences: SeniorPreferences) => void;
  onNotificationDismiss?: (notificationId: string) => void;
  onUpdateRead?: (updateId: string) => void;
}

// Felhantering types - alla fel översätts till senior-vänliga meddelanden
export interface SeniorError {
  id: string;
  originalError?: Error; // Teknisk fel (loggas separat)
  seniorMessage: string; // Senior-vänligt meddelande
  type: 'temporary' | 'recoverable' | 'info';
  suggestedAction?: string; // "Försök igen om en stund"
  timestamp: Date;
}

// Service layer types
export interface SeniorViewServiceInterface {
  getProjectOverview(): Promise<ProjectSummary>;
  getPhaseProgress(): Promise<PhaseIndicator>;
  getRecentUpdates(): Promise<SeniorFriendlyUpdate[]>;
  getNotifications(): Promise<SeniorNotification[]>;
  markUpdateAsRead(updateId: string): Promise<void>;
  dismissNotification(notificationId: string): Promise<void>;
}

// Testing types för senior user testing
export interface SeniorTestGroup {
  ageRange: string;
  techComfort: 'novice' | 'comfortable' | 'experienced';
  participants: number;
  testScenarios: string[];
}

export interface SeniorTestingPlan {
  testGroups: {
    age65to75: SeniorTestGroup;
    age75to85: SeniorTestGroup;
    techComfortable: SeniorTestGroup;
    techNovice: SeniorTestGroup;
  };
  
  testScenarios: string[];
  
  successCriteria: {
    intuitive: string; // 'Senior förstår utan förklaring'
    comfortable: string; // 'Senior känner sig trygg'
    helpful: string; // 'Senior får värde från informationen'
    safe: string; // 'Senior ser aldrig teknisk komplexitet'
  };
}

// Event types för interaktion
export interface SeniorInteractionEvent {
  type: 'click' | 'view' | 'dismiss' | 'help_requested';
  element: string;
  timestamp: Date;
  context?: Record<string, any>;
}

// Hjälpfunktioner types
export type SeniorMessageType = 'encouragement' | 'celebration' | 'progress' | 'info' | 'gentle';

export interface SeniorMessageTemplate {
  type: SeniorMessageType;
  templates: string[];
  context?: string[];
}

// Union types för säkerhet
export type SeniorSafeString = string & { __brand: 'SeniorSafe' };
export type TechnicalString = string & { __brand: 'Technical' };

// Utility types
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type SeniorSafeProps<T> = Omit<T, 'technical' | 'debug' | 'error' | 'api' | 'config'>;

// Export all types as a namespace för enkel import
export namespace SeniorTypes {
  export type SafeData = SeniorSafeData;
  export type Dashboard = SeniorDashboard;
  export type Notification = SeniorNotification;
  export type Update = SeniorFriendlyUpdate;
  export type Error = SeniorError;
  export type Preferences = SeniorPreferences;
  export type Interaction = SeniorInteractionEvent;
}