// MASTER PLAN 2.0: Senior-Säkra Datamodeller
// STATUS: Säkra Datastrukturer utan Teknisk Exponering
// INTEGRATION: Communication Bridge → Senior Cockpit

/**
 * Senior-säkra datamodeller som garanterar att ingen teknisk information
 * läcker igenom till Senior Cockpit-gränssnittet
 */

// Grundläggande senior-säkra typer
export type SeniorSafeString = string & { __seniorSafe: true };
export type SeniorSafeNumber = number & { __seniorSafe: true };
export type SeniorSafeDate = string & { __seniorSafeDate: true }; // ISO date string

/**
 * Huvuddatastruktur för senior-vänliga uppdateringar
 */
export interface SeniorFriendlyUpdate {
  id: string;
  timestamp: SeniorSafeDate;
  type: 'success' | 'progress' | 'info' | 'celebration';
  
  // Senior-vänliga meddelanden (inga tekniska termer)
  title: SeniorSafeString;
  message: SeniorSafeString;
  encouragingNote?: SeniorSafeString;
  
  // Visuella element
  icon: '✅' | '🎯' | 'ℹ️' | '🎉' | '💝';
  priority: 'low' | 'medium' | 'high';
  
  // Metadata (dold från UI men tillgänglig för logik)
  category: 'project-progress' | 'system-health' | 'user-achievement';
  relatedPhase?: 'grundläggande' | 'utveckling' | 'förbättring' | 'perfektion';
}

/**
 * Projektöversikt utan tekniska detaljer
 */
export interface SeniorSafeProjectOverview {
  projectName: SeniorSafeString;
  description: SeniorSafeString;
  
  // Framsteg i senior-vänliga termer
  currentPhase: 'grundläggande' | 'utveckling' | 'förbättring' | 'perfektion';
  phaseDescription: SeniorSafeString;
  overallProgress: SeniorSafeNumber; // 0-100
  
  // Uppmuntrande meddelanden
  nextSteps: SeniorSafeString[];
  recentAccomplishments: SeniorSafeString[];
  motivationalMessage: SeniorSafeString;
  
  // Tidslinjer utan tekniska detaljer
  estimatedCompletion: SeniorSafeString; // "Inom några veckor"
  lastUpdate: SeniorSafeDate;
}

/**
 * Fas-progression utan tekniska termer
 */
export interface SeniorSafePhaseProg {
  phases: SeniorSafePhase[];
  currentPhaseIndex: SeniorSafeNumber;
  overallProgress: SeniorSafeNumber;
  celebrationMoments: SeniorSafeCelebration[];
}

export interface SeniorSafePhase {
  name: 'grundläggande' | 'utveckling' | 'förbättring' | 'perfektion';
  displayName: SeniorSafeString;
  description: SeniorSafeString;
  progress: SeniorSafeNumber; // 0-100
  status: 'completed' | 'current' | 'upcoming';
  
  // Visuella element
  icon: '🏗️' | '⚙️' | '✨' | '🎯';
  color: '#4CAF50' | '#2196F3' | '#FF9800' | '#9C27B0';
  
  // Milstones utan tekniska detaljer
  milestones: SeniorSafeMilestone[];
}

export interface SeniorSafeMilestone {
  title: SeniorSafeString;
  description: SeniorSafeString;
  completed: boolean;
  completedDate?: SeniorSafeDate;
  celebrationMessage?: SeniorSafeString;
}

/**
 * Celebrationsmoment för att uppmuntra användaren
 */
export interface SeniorSafeCelebration {
  id: string;
  title: SeniorSafeString;
  message: SeniorSafeString;
  achievementDate: SeniorSafeDate;
  icon: '🎉' | '🏆' | '⭐' | '💝' | '🎯';
  importance: 'minor' | 'major' | 'milestone';
}

/**
 * Notifikationer utan teknisk jargong
 */
export interface SeniorSafeNotification {
  id: string;
  type: 'info' | 'success' | 'encouragement' | 'celebration';
  
  // Senior-vänligt innehåll
  title: SeniorSafeString;
  message: SeniorSafeString;
  actionText?: SeniorSafeString;
  
  // Visuell presentation
  icon: string;
  color: string;
  priority: 'low' | 'medium' | 'high';
  
  // Timing
  timestamp: SeniorSafeDate;
  expiresAt?: SeniorSafeDate;
  dismissed: boolean;
}

/**
 * Felmeddelanden i senior-vänlig form
 */
export interface SeniorSafeError {
  id: string;
  title: SeniorSafeString; // "Ett litet problem uppstod"
  message: SeniorSafeString; // "Vi arbetar på att lösa det"
  suggestion?: SeniorSafeString; // "Du kan försöka igen om en stund"
  
  // Uppmuntrande element
  reassurance: SeniorSafeString; // "Ditt arbete är säkert"
  supportMessage: SeniorSafeString; // "Vi hjälper dig gärna"
  
  // Metadata
  severity: 'minor' | 'moderate' | 'major';
  timestamp: SeniorSafeDate;
  resolved: boolean;
}

/**
 * Användarplan-data (förberedelse för framtida funktionalitet)
 */
export interface SeniorSafeUserPlan {
  planName: SeniorSafeString;
  description: SeniorSafeString;
  
  // Mål utan tekniska detaljer
  goals: SeniorSafeGoal[];
  currentGoal?: SeniorSafeGoal;
  
  // Framsteg
  overallProgress: SeniorSafeNumber;
  estimatedTimeframe: SeniorSafeString;
  
  // Uppmuntran
  motivationalQuote: SeniorSafeString;
  nextMilestone: SeniorSafeString;
}

export interface SeniorSafeGoal {
  id: string;
  title: SeniorSafeString;
  description: SeniorSafeString;
  priority: 'low' | 'medium' | 'high';
  status: 'planning' | 'in-progress' | 'completed';
  
  // Visuell representation
  icon: string;
  color: string;
  
  // Framsteg
  progress: SeniorSafeNumber;
  completedSteps: SeniorSafeString[];
  nextSteps: SeniorSafeString[];
}

/**
 * Validering för att säkerställa senior-säkerhet
 */
export class SeniorDataValidator {
  private static readonly FORBIDDEN_TERMS = [
    'api', 'json', 'http', 'sql', 'database', 'server', 'client',
    'endpoint', 'authentication', 'authorization', 'token', 'hash',
    'algorithm', 'encryption', 'ssl', 'tls', 'cors', 'csrf',
    'git', 'commit', 'push', 'pull', 'merge', 'branch',
    'docker', 'kubernetes', 'deployment', 'pipeline', 'ci/cd',
    'stack trace', 'exception', 'error code', 'debug', 'log',
    'npm', 'node', 'react', 'typescript', 'javascript', 'css',
    'html', 'dom', 'xhr', 'ajax', 'websocket', 'sse'
  ];

  /**
   * Validerar att en sträng är senior-säker
   */
  static validateSeniorSafeString(text: string): SeniorSafeString {
    const lowerText = text.toLowerCase();
    
    for (const term of this.FORBIDDEN_TERMS) {
      if (lowerText.includes(term)) {
        throw new Error(`Teknisk term upptäckt: "${term}" i "${text}"`);
      }
    }
    
    return text as SeniorSafeString;
  }

  /**
   * Validerar att ett nummer är inom senior-säkra gränser
   */
  static validateSeniorSafeNumber(num: number): SeniorSafeNumber {
    if (num < 0 || num > 100) {
      throw new Error(`Nummer utanför senior-säkra gränser: ${num}`);
    }
    
    return num as SeniorSafeNumber;
  }

  /**
   * Validerar att ett datum är i senior-säkert format
   */
  static validateSeniorSafeDate(dateString: string): SeniorSafeDate {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Ogiltigt datum');
      }
      return dateString as SeniorSafeDate;
    } catch (error) {
      throw new Error(`Ogiltigt datum format: ${dateString}`);
    }
  }

  /**
   * Validerar en komplett SeniorFriendlyUpdate
   */
  static validateSeniorFriendlyUpdate(update: any): SeniorFriendlyUpdate {
    return {
      id: update.id,
      timestamp: this.validateSeniorSafeDate(update.timestamp),
      type: update.type,
      title: this.validateSeniorSafeString(update.title),
      message: this.validateSeniorSafeString(update.message),
      encouragingNote: update.encouragingNote ? 
        this.validateSeniorSafeString(update.encouragingNote) : undefined,
      icon: update.icon,
      priority: update.priority,
      category: update.category,
      relatedPhase: update.relatedPhase
    };
  }
}

/**
 * Factory för att skapa senior-säkra datastrukturer
 */
export class SeniorSafeDataFactory {
  /**
   * Skapar en senior-säker projektöversikt från teknisk data
   */
  static createProjectOverview(technicalData: any): SeniorSafeProjectOverview {
    return {
      projectName: SeniorDataValidator.validateSeniorSafeString(
        technicalData.name || "Ditt projekt"
      ),
      description: SeniorDataValidator.validateSeniorSafeString(
        "Ett spännande projekt som växer och utvecklas"
      ),
      currentPhase: this.mapTechnicalPhaseToSeniorPhase(technicalData.phase),
      phaseDescription: SeniorDataValidator.validateSeniorSafeString(
        this.getPhaseDescription(technicalData.phase)
      ),
      overallProgress: SeniorDataValidator.validateSeniorSafeNumber(
        Math.min(100, Math.max(0, technicalData.progress || 25))
      ),
      nextSteps: [
        SeniorDataValidator.validateSeniorSafeString("Fortsätta bygga på grunderna"),
        SeniorDataValidator.validateSeniorSafeString("Lägga till fler funktioner")
      ],
      recentAccomplishments: [
        SeniorDataValidator.validateSeniorSafeString("Skapat en solid grund"),
        SeniorDataValidator.validateSeniorSafeString("Säkrat ditt projekt")
      ],
      motivationalMessage: SeniorDataValidator.validateSeniorSafeString(
        "Du gör fantastiska framsteg! Varje steg för dig närmare ditt mål."
      ),
      estimatedCompletion: SeniorDataValidator.validateSeniorSafeString(
        "Inom några veckor"
      ),
      lastUpdate: SeniorDataValidator.validateSeniorSafeDate(
        new Date().toISOString()
      )
    };
  }

  private static mapTechnicalPhaseToSeniorPhase(technicalPhase: string): 
    'grundläggande' | 'utveckling' | 'förbättring' | 'perfektion' {
    switch (technicalPhase?.toLowerCase()) {
      case 'crawl':
      case 'setup':
      case 'initialization':
        return 'grundläggande';
      case 'walk':
      case 'development':
      case 'implementation':
        return 'utveckling';
      case 'run':
      case 'optimization':
      case 'enhancement':
        return 'förbättring';
      case 'fly':
      case 'autonomous':
      case 'advanced':
        return 'perfektion';
      default:
        return 'grundläggande';
    }
  }

  private static getPhaseDescription(technicalPhase: string): string {
    const phase = this.mapTechnicalPhaseToSeniorPhase(technicalPhase);
    
    switch (phase) {
      case 'grundläggande':
        return "Vi bygger en stark grund för ditt projekt";
      case 'utveckling':
        return "Vi utvecklar och förbättrar ditt projekt";
      case 'förbättring':
        return "Vi finsliper och optimerar allt";
      case 'perfektion':
        return "Ditt projekt är nästan perfekt!";
      default:
        return "Vi arbetar hårt på ditt projekt";
    }
  }
}

// Export av alla typer för enkel import
export type {
  SeniorSafeString,
  SeniorSafeNumber,
  SeniorSafeDate,
  SeniorFriendlyUpdate,
  SeniorSafeProjectOverview,
  SeniorSafePhaseProg,
  SeniorSafePhase,
  SeniorSafeMilestone,
  SeniorSafeCelebration,
  SeniorSafeNotification,
  SeniorSafeError,
  SeniorSafeUserPlan,
  SeniorSafeGoal
};