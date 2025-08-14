// MASTER PLAN 2.0: Senior User Testing Framework
// STATUS: Framework för Testning med Riktiga Seniorer
// INTEGRATION: Senior Cockpit User Experience Testing

import { SeniorSafeString, SeniorDataValidator } from '../types/SeniorSafeDataModels';

/**
 * Framework för att testa Senior Cockpit med riktiga seniorer
 * Fokuserar på användbarhet, förståelse och komfort
 */
export class SeniorUserTestingFramework {
  private testSessions: SeniorTestSession[] = [];
  private feedbackData: SeniorFeedback[] = [];

  /**
   * Skapar en ny testplan för senior-användare
   */
  createSeniorTestingPlan(): SeniorTestingPlan {
    return {
      testId: `senior-test-${Date.now()}`,
      title: SeniorDataValidator.validateSeniorSafeString(
        "Hjälp oss förbättra din upplevelse"
      ),
      description: SeniorDataValidator.validateSeniorSafeString(
        "Vi vill säkerställa att allt fungerar perfekt för dig"
      ),
      scenarios: this.createTestScenarios(),
      successCriteria: this.defineSeniorSuccessCriteria(),
      duration: SeniorDataValidator.validateSeniorSafeString("30-45 minuter"),
      preparation: this.createPreparationSteps()
    };
  }

  /**
   * Skapar testscenarier för seniorer
   */
  private createTestScenarios(): SeniorTestScenario[] {
    return [
      {
        id: 'first-visit',
        name: SeniorDataValidator.validateSeniorSafeString("Första besöket"),
        description: SeniorDataValidator.validateSeniorSafeString(
          "Hur känns det att använda systemet för första gången?"
        ),
        tasks: [
          SeniorDataValidator.validateSeniorSafeString("Öppna hemsidan"),
          SeniorDataValidator.validateSeniorSafeString("Förstå vad som visas"),
          SeniorDataValidator.validateSeniorSafeString("Hitta nästa steg")
        ],
        expectedOutcome: SeniorDataValidator.validateSeniorSafeString(
          "Användaren förstår vad systemet gör och känner sig välkommen"
        ),
        timeLimit: "10 minuter"
      },
      {
        id: 'progress-understanding',
        name: SeniorDataValidator.validateSeniorSafeString("Förstå framsteg"),
        description: SeniorDataValidator.validateSeniorSafeString(
          "Kan användaren förstå hur projektet utvecklas?"
        ),
        tasks: [
          SeniorDataValidator.validateSeniorSafeString("Titta på projektöversikten"),
          SeniorDataValidator.validateSeniorSafeString("Förstå vad som hänt"),
          SeniorDataValidator.validateSeniorSafeString("Se vad som kommer härnäst")
        ],
        expectedOutcome: SeniorDataValidator.validateSeniorSafeString(
          "Användaren förstår projektets status och känner sig informerad"
        ),
        timeLimit: "10 minuter"
      },
      {
        id: 'error-handling',
        name: SeniorDataValidator.validateSeniorSafeString("Hantera problem"),
        description: SeniorDataValidator.validateSeniorSafeString(
          "Hur reagerar användaren när något går fel?"
        ),
        tasks: [
          SeniorDataValidator.validateSeniorSafeString("Simulera ett litet problem"),
          SeniorDataValidator.validateSeniorSafeString("Läsa felmeddelandet"),
          SeniorDataValidator.validateSeniorSafeString("Förstå vad som ska göras")
        ],
        expectedOutcome: SeniorDataValidator.validateSeniorSafeString(
          "Användaren känner sig lugn och vet att hjälp finns tillgänglig"
        ),
        timeLimit: "10 minuter"
      },
      {
        id: 'navigation',
        name: SeniorDataValidator.validateSeniorSafeString("Navigera systemet"),
        description: SeniorDataValidator.validateSeniorSafeString(
          "Kan användaren hitta runt i systemet?"
        ),
        tasks: [
          SeniorDataValidator.validateSeniorSafeString("Gå mellan olika sidor"),
          SeniorDataValidator.validateSeniorSafeString("Hitta tillbaka till startsidan"),
          SeniorDataValidator.validateSeniorSafeString("Använda menyerna")
        ],
        expectedOutcome: SeniorDataValidator.validateSeniorSafeString(
          "Användaren kan navigera utan att känna sig vilse"
        ),
        timeLimit: "15 minuter"
      }
    ];
  }

  /**
   * Definierar framgångskriterier för senior-testning
   */
  private defineSeniorSuccessCriteria(): SeniorSuccessCriteria {
    return {
      intuitive: {
        description: SeniorDataValidator.validateSeniorSafeString(
          "Systemet känns naturligt och logiskt"
        ),
        measurements: [
          "Användaren hittar funktioner utan hjälp",
          "Användaren förstår vad som händer",
          "Användaren känner sig säker"
        ],
        targetScore: 4.0 // av 5
      },
      comfortable: {
        description: SeniorDataValidator.validateSeniorSafeString(
          "Användaren känner sig bekväm och avslappnad"
        ),
        measurements: [
          "Inga tecken på stress eller frustration",
          "Användaren ler och verkar nöjd",
          "Användaren vill fortsätta använda systemet"
        ],
        targetScore: 4.0
      },
      helpful: {
        description: SeniorDataValidator.validateSeniorSafeString(
          "Systemet upplevs som hjälpsamt och användbart"
        ),
        measurements: [
          "Användaren ser värdet i systemet",
          "Användaren förstår hur det hjälper dem",
          "Användaren skulle rekommendera det till andra"
        ],
        targetScore: 4.0
      },
      safe: {
        description: SeniorDataValidator.validateSeniorSafeString(
          "Användaren känner sig trygg och säker"
        ),
        measurements: [
          "Inga farhågor om säkerhet",
          "Förtroende för systemet",
          "Känner att deras information är skyddad"
        ],
        targetScore: 4.5
      }
    };
  }

  /**
   * Skapar förberedelsesteg för testning
   */
  private createPreparationSteps(): string[] {
    return [
      "Förbered en lugn och bekväm testmiljö",
      "Se till att skärmen är stor nog och ljus nog",
      "Ha ett glas vatten och eventuellt kaffe tillgängligt",
      "Förklara att det inte finns några 'fel' svar",
      "Betona att vi testar systemet, inte användaren",
      "Säg att användaren kan avbryta när som helst",
      "Påminn om att det är okej att tänka högt"
    ];
  }

  /**
   * Startar en testsession med en senior
   */
  startTestSession(participant: SeniorParticipant): SeniorTestSession {
    const session: SeniorTestSession = {
      sessionId: `session-${Date.now()}`,
      participant,
      startTime: new Date().toISOString(),
      testPlan: this.createSeniorTestingPlan(),
      observations: [],
      feedback: [],
      completed: false,
      currentScenario: 0
    };

    this.testSessions.push(session);
    return session;
  }

  /**
   * Registrerar observation under testsession
   */
  recordObservation(
    sessionId: string, 
    observation: {
      timestamp: string;
      scenario: string;
      behavior: string;
      emotion: 'positive' | 'neutral' | 'negative' | 'confused';
      notes: string;
    }
  ): void {
    const session = this.testSessions.find(s => s.sessionId === sessionId);
    if (session) {
      session.observations.push({
        timestamp: observation.timestamp,
        scenarioId: observation.scenario,
        behaviorObserved: SeniorDataValidator.validateSeniorSafeString(observation.behavior),
        emotionalState: observation.emotion,
        observerNotes: SeniorDataValidator.validateSeniorSafeString(observation.notes)
      });
    }
  }

  /**
   * Samlar in feedback från senior efter testning
   */
  collectSeniorFeedback(
    sessionId: string,
    feedback: {
      overallExperience: 1 | 2 | 3 | 4 | 5;
      easeOfUse: 1 | 2 | 3 | 4 | 5;
      clarity: 1 | 2 | 3 | 4 | 5;
      comfort: 1 | 2 | 3 | 4 | 5;
      helpfulness: 1 | 2 | 3 | 4 | 5;
      safety: 1 | 2 | 3 | 4 | 5;
      wouldRecommend: boolean;
      favoriteFeature?: string;
      mostConfusing?: string;
      suggestions?: string;
      additionalComments?: string;
    }
  ): void {
    const session = this.testSessions.find(s => s.sessionId === sessionId);
    if (session) {
      const seniorFeedback: SeniorFeedback = {
        sessionId,
        participantId: session.participant.id,
        timestamp: new Date().toISOString(),
        ratings: {
          overallExperience: feedback.overallExperience,
          easeOfUse: feedback.easeOfUse,
          clarity: feedback.clarity,
          comfort: feedback.comfort,
          helpfulness: feedback.helpfulness,
          safety: feedback.safety
        },
        wouldRecommend: feedback.wouldRecommend,
        favoriteFeature: feedback.favoriteFeature ? 
          SeniorDataValidator.validateSeniorSafeString(feedback.favoriteFeature) : undefined,
        mostConfusing: feedback.mostConfusing ? 
          SeniorDataValidator.validateSeniorSafeString(feedback.mostConfusing) : undefined,
        suggestions: feedback.suggestions ? 
          SeniorDataValidator.validateSeniorSafeString(feedback.suggestions) : undefined,
        additionalComments: feedback.additionalComments ? 
          SeniorDataValidator.validateSeniorSafeString(feedback.additionalComments) : undefined
      };

      this.feedbackData.push(seniorFeedback);
      session.feedback.push(seniorFeedback);
    }
  }

  /**
   * Avslutar en testsession
   */
  completeTestSession(sessionId: string): SeniorTestSessionSummary {
    const session = this.testSessions.find(s => s.sessionId === sessionId);
    if (!session) {
      throw new Error('Test session not found');
    }

    session.completed = true;
    session.endTime = new Date().toISOString();

    return this.generateSessionSummary(session);
  }

  /**
   * Genererar sammanfattning av testsession
   */
  private generateSessionSummary(session: SeniorTestSession): SeniorTestSessionSummary {
    const feedback = session.feedback[0]; // Senaste feedback
    
    return {
      sessionId: session.sessionId,
      participant: session.participant,
      duration: this.calculateSessionDuration(session),
      scenariosCompleted: session.observations.length,
      overallRating: feedback?.ratings.overallExperience || 0,
      keyFindings: this.extractKeyFindings(session),
      recommendations: this.generateRecommendations(session),
      successCriteriaResults: this.evaluateSuccessCriteria(session)
    };
  }

  /**
   * Analyserar alla testsessioner och genererar rapport
   */
  generateTestingReport(): SeniorTestingReport {
    const completedSessions = this.testSessions.filter(s => s.completed);
    
    if (completedSessions.length === 0) {
      throw new Error('No completed test sessions available');
    }

    const averageRatings = this.calculateAverageRatings();
    const commonIssues = this.identifyCommonIssues();
    const recommendations = this.generateOverallRecommendations();

    return {
      reportId: `report-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      totalSessions: completedSessions.length,
      averageRatings,
      commonIssues,
      recommendations,
      successRate: this.calculateSuccessRate(),
      readyForSeniors: this.assessReadinessForSeniors()
    };
  }

  // Helper methods

  private calculateSessionDuration(session: SeniorTestSession): string {
    if (!session.endTime) return "Pågående";
    
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);
    const minutes = Math.round((end.getTime() - start.getTime()) / 60000);
    
    return `${minutes} minuter`;
  }

  private extractKeyFindings(session: SeniorTestSession): string[] {
    const findings = [];
    
    // Analysera observationer
    const positiveObservations = session.observations.filter(o => o.emotionalState === 'positive');
    const negativeObservations = session.observations.filter(o => o.emotionalState === 'negative');
    const confusedObservations = session.observations.filter(o => o.emotionalState === 'confused');

    if (positiveObservations.length > negativeObservations.length) {
      findings.push("Användaren hade en övervägande positiv upplevelse");
    }

    if (confusedObservations.length > 2) {
      findings.push("Användaren verkade förvirrad vid flera tillfällen");
    }

    return findings;
  }

  private generateRecommendations(session: SeniorTestSession): string[] {
    const recommendations = [];
    const feedback = session.feedback[0];

    if (feedback) {
      if (feedback.ratings.easeOfUse < 4) {
        recommendations.push("Förbättra användarvänligheten");
      }
      if (feedback.ratings.clarity < 4) {
        recommendations.push("Gör instruktioner tydligare");
      }
      if (feedback.mostConfusing) {
        recommendations.push(`Förtydliga: ${feedback.mostConfusing}`);
      }
    }

    return recommendations;
  }

  private evaluateSuccessCriteria(session: SeniorTestSession): any {
    const feedback = session.feedback[0];
    if (!feedback) return {};

    return {
      intuitive: feedback.ratings.easeOfUse >= 4,
      comfortable: feedback.ratings.comfort >= 4,
      helpful: feedback.ratings.helpfulness >= 4,
      safe: feedback.ratings.safety >= 4.5
    };
  }

  private calculateAverageRatings(): any {
    if (this.feedbackData.length === 0) return {};

    const totals = this.feedbackData.reduce((acc, feedback) => {
      acc.overallExperience += feedback.ratings.overallExperience;
      acc.easeOfUse += feedback.ratings.easeOfUse;
      acc.clarity += feedback.ratings.clarity;
      acc.comfort += feedback.ratings.comfort;
      acc.helpfulness += feedback.ratings.helpfulness;
      acc.safety += feedback.ratings.safety;
      return acc;
    }, {
      overallExperience: 0,
      easeOfUse: 0,
      clarity: 0,
      comfort: 0,
      helpfulness: 0,
      safety: 0
    });

    const count = this.feedbackData.length;
    return {
      overallExperience: (totals.overallExperience / count).toFixed(1),
      easeOfUse: (totals.easeOfUse / count).toFixed(1),
      clarity: (totals.clarity / count).toFixed(1),
      comfort: (totals.comfort / count).toFixed(1),
      helpfulness: (totals.helpfulness / count).toFixed(1),
      safety: (totals.safety / count).toFixed(1)
    };
  }

  private identifyCommonIssues(): string[] {
    const issues = [];
    const confusingFeatures = this.feedbackData
      .map(f => f.mostConfusing)
      .filter(Boolean);

    // Hitta vanliga förvirrande funktioner
    const featureCounts = confusingFeatures.reduce((acc, feature) => {
      acc[feature!] = (acc[feature!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(featureCounts)
      .filter(([_, count]) => count > 1)
      .forEach(([feature, _]) => {
        issues.push(`Många användare förvirras av: ${feature}`);
      });

    return issues;
  }

  private generateOverallRecommendations(): string[] {
    const recommendations = [];
    const averages = this.calculateAverageRatings();

    if (parseFloat(averages.easeOfUse) < 4.0) {
      recommendations.push("Förbättra övergripande användarvänlighet");
    }
    if (parseFloat(averages.clarity) < 4.0) {
      recommendations.push("Gör all text och instruktioner tydligare");
    }
    if (parseFloat(averages.safety) < 4.5) {
      recommendations.push("Stärk känslan av säkerhet och trygghet");
    }

    return recommendations;
  }

  private calculateSuccessRate(): number {
    const successfulSessions = this.feedbackData.filter(f => 
      f.ratings.overallExperience >= 4 && f.wouldRecommend
    ).length;

    return this.feedbackData.length > 0 ? 
      (successfulSessions / this.feedbackData.length) * 100 : 0;
  }

  private assessReadinessForSeniors(): boolean {
    const averages = this.calculateAverageRatings();
    const successRate = this.calculateSuccessRate();

    return parseFloat(averages.overallExperience) >= 4.0 &&
           parseFloat(averages.safety) >= 4.5 &&
           successRate >= 80;
  }
}

// Type definitions
interface SeniorTestingPlan {
  testId: string;
  title: SeniorSafeString;
  description: SeniorSafeString;
  scenarios: SeniorTestScenario[];
  successCriteria: SeniorSuccessCriteria;
  duration: SeniorSafeString;
  preparation: string[];
}

interface SeniorTestScenario {
  id: string;
  name: SeniorSafeString;
  description: SeniorSafeString;
  tasks: SeniorSafeString[];
  expectedOutcome: SeniorSafeString;
  timeLimit: string;
}

interface SeniorSuccessCriteria {
  intuitive: {
    description: SeniorSafeString;
    measurements: string[];
    targetScore: number;
  };
  comfortable: {
    description: SeniorSafeString;
    measurements: string[];
    targetScore: number;
  };
  helpful: {
    description: SeniorSafeString;
    measurements: string[];
    targetScore: number;
  };
  safe: {
    description: SeniorSafeString;
    measurements: string[];
    targetScore: number;
  };
}

interface SeniorParticipant {
  id: string;
  age: number;
  techExperience: 'beginner' | 'intermediate' | 'advanced';
  preferredLanguage: string;
  accessibilityNeeds?: string[];
}

interface SeniorTestSession {
  sessionId: string;
  participant: SeniorParticipant;
  startTime: string;
  endTime?: string;
  testPlan: SeniorTestingPlan;
  observations: SeniorObservation[];
  feedback: SeniorFeedback[];
  completed: boolean;
  currentScenario: number;
}

interface SeniorObservation {
  timestamp: string;
  scenarioId: string;
  behaviorObserved: SeniorSafeString;
  emotionalState: 'positive' | 'neutral' | 'negative' | 'confused';
  observerNotes: SeniorSafeString;
}

interface SeniorFeedback {
  sessionId: string;
  participantId: string;
  timestamp: string;
  ratings: {
    overallExperience: 1 | 2 | 3 | 4 | 5;
    easeOfUse: 1 | 2 | 3 | 4 | 5;
    clarity: 1 | 2 | 3 | 4 | 5;
    comfort: 1 | 2 | 3 | 4 | 5;
    helpfulness: 1 | 2 | 3 | 4 | 5;
    safety: 1 | 2 | 3 | 4 | 5;
  };
  wouldRecommend: boolean;
  favoriteFeature?: SeniorSafeString;
  mostConfusing?: SeniorSafeString;
  suggestions?: SeniorSafeString;
  additionalComments?: SeniorSafeString;
}

interface SeniorTestSessionSummary {
  sessionId: string;
  participant: SeniorParticipant;
  duration: string;
  scenariosCompleted: number;
  overallRating: number;
  keyFindings: string[];
  recommendations: string[];
  successCriteriaResults: any;
}

interface SeniorTestingReport {
  reportId: string;
  generatedAt: string;
  totalSessions: number;
  averageRatings: any;
  commonIssues: string[];
  recommendations: string[];
  successRate: number;
  readyForSeniors: boolean;
}

export {
  SeniorUserTestingFramework,
  type SeniorTestingPlan,
  type SeniorTestScenario,
  type SeniorParticipant,
  type SeniorTestSession,
  type SeniorFeedback,
  type SeniorTestingReport
};