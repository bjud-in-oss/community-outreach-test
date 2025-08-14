// MASTER PLAN 2.0: User Plan Service
// STATUS: Förberedelser för Framtida Användarplan-Funktionalitet
// INTEGRATION: Senior Cockpit → Communication Bridge → Core Agent

import { 
  SeniorSafeUserPlan, 
  SeniorSafeGoal,
  SeniorDataValidator,
  SeniorSafeString,
  SeniorSafeNumber
} from '../types/SeniorSafeDataModels';

/**
 * Service för att hantera användarplaner och AI-driven requirements generation
 * Förberedd för framtida integration med teknisk ledare approval workflow
 */
export class UserPlanService {
  private currentPlan: SeniorSafeUserPlan | null = null;
  private planHistory: SeniorSafeUserPlan[] = [];

  /**
   * Skapar en ny användarplan baserat på senior-input
   */
  async createUserPlan(seniorInput: {
    projectIdea: string;
    goals: string[];
    timeframe?: string;
    priority?: 'low' | 'medium' | 'high';
  }): Promise<SeniorSafeUserPlan> {
    
    // Validera och säkra input från senior
    const safeProjectIdea = SeniorDataValidator.validateSeniorSafeString(
      this.sanitizeSeniorInput(seniorInput.projectIdea)
    );
    
    const safeGoals = seniorInput.goals.map(goal => 
      SeniorDataValidator.validateSeniorSafeString(
        this.sanitizeSeniorInput(goal)
      )
    );

    // Skapa användarplan
    const userPlan: SeniorSafeUserPlan = {
      planName: safeProjectIdea,
      description: SeniorDataValidator.validateSeniorSafeString(
        `Ett spännande projekt: ${safeProjectIdea}`
      ),
      goals: this.createSeniorSafeGoals(safeGoals),
      overallProgress: SeniorDataValidator.validateSeniorSafeNumber(0),
      estimatedTimeframe: SeniorDataValidator.validateSeniorSafeString(
        seniorInput.timeframe || "Inom några månader"
      ),
      motivationalQuote: this.generateMotivationalQuote(),
      nextMilestone: SeniorDataValidator.validateSeniorSafeString(
        "Börja med att planera första steget"
      )
    };

    // Sätt som aktuell plan
    this.currentPlan = userPlan;
    
    // Spara i historik
    this.planHistory.push(userPlan);

    return userPlan;
  }

  /**
   * Genererar AI-drivna requirements från senior-input
   * Förberedd för framtida integration med Core Agent
   */
  async generateRequirementsFromSeniorInput(
    seniorInput: string
  ): Promise<{
    seniorFriendlyRequirements: SeniorSafeString[];
    technicalRequirements: any[]; // För framtida teknisk ledare review
    confidence: SeniorSafeNumber;
  }> {
    
    const sanitizedInput = this.sanitizeSeniorInput(seniorInput);
    
    // Simulerad AI-analys (förberedd för riktig AI-integration)
    const seniorRequirements = this.extractSeniorFriendlyRequirements(sanitizedInput);
    const technicalRequirements = this.prepareTechnicalRequirements(sanitizedInput);
    
    return {
      seniorFriendlyRequirements: seniorRequirements.map(req => 
        SeniorDataValidator.validateSeniorSafeString(req)
      ),
      technicalRequirements, // Dold från senior, för teknisk ledare
      confidence: SeniorDataValidator.validateSeniorSafeNumber(85)
    };
  }

  /**
   * Förbereder bidirektional kommunikation (senior input → teknisk implementation)
   */
  async processSeniorFeedback(feedback: {
    planId: string;
    changes: string[];
    satisfaction: 'low' | 'medium' | 'high';
    additionalRequests?: string[];
  }): Promise<{
    updatedPlan: SeniorSafeUserPlan;
    technicalChanges: any[]; // För Core Agent
    requiresApproval: boolean;
  }> {
    
    if (!this.currentPlan) {
      throw new Error('Ingen aktiv plan att uppdatera');
    }

    // Bearbeta senior-feedback
    const processedChanges = feedback.changes.map(change => 
      this.sanitizeSeniorInput(change)
    );

    // Uppdatera plan baserat på feedback
    const updatedPlan = await this.updatePlanFromFeedback(
      this.currentPlan,
      processedChanges,
      feedback.satisfaction
    );

    // Förbered tekniska ändringar för Core Agent
    const technicalChanges = this.translateToTechnicalChanges(processedChanges);

    // Avgör om teknisk ledare approval krävs
    const requiresApproval = this.assessApprovalRequirement(
      feedback.satisfaction,
      technicalChanges
    );

    return {
      updatedPlan,
      technicalChanges,
      requiresApproval
    };
  }

  /**
   * Förbereder teknisk ledare approval workflow
   */
  async prepareForTechnicalApproval(
    userPlan: SeniorSafeUserPlan,
    technicalRequirements: any[]
  ): Promise<{
    approvalRequest: any; // För teknisk ledare
    seniorSummary: SeniorSafeString; // För senior
    estimatedComplexity: 'low' | 'medium' | 'high';
  }> {
    
    const approvalRequest = {
      planId: Date.now().toString(),
      seniorInput: userPlan.description,
      technicalRequirements,
      estimatedEffort: this.estimateEffort(technicalRequirements),
      riskAssessment: this.assessRisks(technicalRequirements),
      recommendedApproach: this.recommendApproach(technicalRequirements)
    };

    const seniorSummary = SeniorDataValidator.validateSeniorSafeString(
      `Vi granskar ditt projekt för att säkerställa att allt blir perfekt. ` +
      `Detta tar vanligtvis några dagar, och sedan kan vi börja bygga!`
    );

    const complexity = this.assessComplexity(technicalRequirements);

    return {
      approvalRequest,
      seniorSummary,
      estimatedComplexity: complexity
    };
  }

  /**
   * Hämtar aktuell användarplan
   */
  getCurrentPlan(): SeniorSafeUserPlan | null {
    return this.currentPlan;
  }

  /**
   * Hämtar planhistorik
   */
  getPlanHistory(): SeniorSafeUserPlan[] {
    return [...this.planHistory];
  }

  /**
   * Uppdaterar framsteg för aktuell plan
   */
  updateProgress(goalId: string, progress: number): void {
    if (!this.currentPlan) return;

    const goal = this.currentPlan.goals.find(g => g.id === goalId);
    if (goal) {
      goal.progress = SeniorDataValidator.validateSeniorSafeNumber(
        Math.min(100, Math.max(0, progress))
      );
      
      // Uppdatera övergripande framsteg
      const totalProgress = this.currentPlan.goals.reduce(
        (sum, g) => sum + g.progress, 0
      ) / this.currentPlan.goals.length;
      
      this.currentPlan.overallProgress = SeniorDataValidator.validateSeniorSafeNumber(
        Math.round(totalProgress)
      );
    }
  }

  // Private helper methods

  private sanitizeSeniorInput(input: string): string {
    // Ta bort potentiellt teknisk jargong och rensa input
    return input
      .replace(/\b(api|database|server|git|code|programming)\b/gi, '')
      .replace(/[<>{}]/g, '') // Ta bort potentiellt farliga tecken
      .trim();
  }

  private createSeniorSafeGoals(goalDescriptions: SeniorSafeString[]): SeniorSafeGoal[] {
    return goalDescriptions.map((description, index) => ({
      id: `goal-${Date.now()}-${index}`,
      title: description,
      description: SeniorDataValidator.validateSeniorSafeString(
        `Arbeta med: ${description}`
      ),
      priority: 'medium' as const,
      status: 'planning' as const,
      icon: '🎯',
      color: '#2196F3',
      progress: SeniorDataValidator.validateSeniorSafeNumber(0),
      completedSteps: [],
      nextSteps: [
        SeniorDataValidator.validateSeniorSafeString("Planera första steget"),
        SeniorDataValidator.validateSeniorSafeString("Börja arbeta på målet")
      ]
    }));
  }

  private generateMotivationalQuote(): SeniorSafeString {
    const quotes = [
      "Varje stor resa börjar med ett enda steg",
      "Dina idéer har kraften att förändra världen",
      "Tillsammans kan vi göra det omöjliga möjligt",
      "Din kreativitet är din superkraft",
      "Framgång är summan av små ansträngningar som upprepas dag efter dag"
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return SeniorDataValidator.validateSeniorSafeString(randomQuote);
  }

  private extractSeniorFriendlyRequirements(input: string): string[] {
    // Simulerad AI-analys för att extrahera krav
    const keywords = input.toLowerCase().split(' ');
    const requirements = [];

    if (keywords.includes('familj') || keywords.includes('släkt')) {
      requirements.push("Skapa något som hjälper familjen att hålla kontakten");
    }
    
    if (keywords.includes('kyrka') || keywords.includes('församling')) {
      requirements.push("Bygga något för kyrkgemenskapen");
    }
    
    if (keywords.includes('hjälp') || keywords.includes('stöd')) {
      requirements.push("Skapa ett hjälpsamt verktyg");
    }

    if (requirements.length === 0) {
      requirements.push("Skapa något användbart och meningsfullt");
    }

    return requirements;
  }

  private prepareTechnicalRequirements(input: string): any[] {
    // Förberedd för framtida teknisk analys
    return [
      {
        type: 'functional',
        description: `Technical implementation for: ${input}`,
        complexity: 'medium',
        estimatedHours: 40
      }
    ];
  }

  private async updatePlanFromFeedback(
    currentPlan: SeniorSafeUserPlan,
    changes: string[],
    satisfaction: 'low' | 'medium' | 'high'
  ): Promise<SeniorSafeUserPlan> {
    
    const updatedPlan = { ...currentPlan };
    
    // Uppdatera baserat på satisfaction level
    if (satisfaction === 'low') {
      updatedPlan.motivationalQuote = SeniorDataValidator.validateSeniorSafeString(
        "Vi lyssnar på din feedback och gör det bättre tillsammans"
      );
    } else if (satisfaction === 'high') {
      updatedPlan.motivationalQuote = SeniorDataValidator.validateSeniorSafeString(
        "Fantastiskt! Du är på rätt väg mot något underbart"
      );
    }

    return updatedPlan;
  }

  private translateToTechnicalChanges(changes: string[]): any[] {
    // Översätt senior-feedback till tekniska ändringar
    return changes.map(change => ({
      type: 'requirement_change',
      seniorInput: change,
      technicalImplication: `Implement: ${change}`,
      priority: 'medium'
    }));
  }

  private assessApprovalRequirement(
    satisfaction: 'low' | 'medium' | 'high',
    technicalChanges: any[]
  ): boolean {
    // Kräv approval för stora ändringar eller låg satisfaction
    return satisfaction === 'low' || technicalChanges.length > 3;
  }

  private estimateEffort(requirements: any[]): 'low' | 'medium' | 'high' {
    const totalComplexity = requirements.reduce((sum, req) => {
      switch (req.complexity) {
        case 'low': return sum + 1;
        case 'medium': return sum + 2;
        case 'high': return sum + 3;
        default: return sum + 2;
      }
    }, 0);

    if (totalComplexity <= 3) return 'low';
    if (totalComplexity <= 6) return 'medium';
    return 'high';
  }

  private assessRisks(requirements: any[]): string[] {
    // Simulerad riskbedömning
    return [
      'Standard implementation risks',
      'User experience considerations',
      'Technical complexity assessment needed'
    ];
  }

  private recommendApproach(requirements: any[]): string {
    return 'Incremental development with regular senior feedback';
  }

  private assessComplexity(requirements: any[]): 'low' | 'medium' | 'high' {
    return this.estimateEffort(requirements);
  }
}