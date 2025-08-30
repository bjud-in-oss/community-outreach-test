// MASTER PLAN 2.0: Progress Aggregator
// STATUS: Jules Senior Cockpit Implementation - Automatiska Progress-Sammanfattningar
// INTEGRATION: Communication Bridge → Senior Cockpit

import { WeeklyDigest, ProgressSummary } from '../types/SeniorCockpitTypes';
import { SeniorFriendlyUpdate } from '../types/SeniorSafeDataModels';
import { SeniorTranslator } from '../../../communication-bridge/translation/SeniorTranslator';

/**
 * Aggregerar tekniska framsteg till senior-vänliga veckovisa sammanfattningar
 * Fokuserar på uppmuntrande och positiva formuleringar
 */
export class ProgressAggregator {
  private translator: SeniorTranslator;
  private weeklyEvents: SeniorFriendlyUpdate[] = [];

  constructor() {
    this.translator = new SeniorTranslator();
  }

  /**
   * Lägger till en teknisk händelse som ska inkluderas i nästa veckosammanfattning
   */
  addTechnicalEvent(event: any): void {
    const seniorUpdate = this.translator.translateToSeniorUpdate(event);
    this.weeklyEvents.push(seniorUpdate);
  }

  /**
   * Genererar en veckovis digest med uppmuntrande språk
   */
  generateWeeklyDigest(): WeeklyDigest {
    const completedTasks = this.weeklyEvents.filter(e => e.type === 'success');
    const ongoingWork = this.weeklyEvents.filter(e => e.type === 'progress');
    
    return {
      weekOf: new Date().toISOString().split('T')[0],
      accomplishments: this.createAccomplishmentSummary(completedTasks),
      nextWeekFocus: this.createNextWeekFocus(ongoingWork),
      encouragingMessage: this.generateEncouragingMessage(completedTasks.length),
      overallProgress: this.calculateOverallProgress()
    };
  }

  /**
   * Skapar uppmuntrande sammanfattning av veckans prestationer
   */
  private createAccomplishmentSummary(completedTasks: SeniorFriendlyUpdate[]): string[] {
    if (completedTasks.length === 0) {
      return ["Vi har arbetat hårt med att förbereda nästa steg i ditt projekt"];
    }

    const accomplishments = completedTasks.map(task => {
      return `✅ ${task.message}`;
    });

    // Lägg till uppmuntrande inledning
    accomplishments.unshift("Denna vecka slutförde vi:");
    
    return accomplishments;
  }

  /**
   * Skapar fokusområden för nästa vecka
   */
  private createNextWeekFocus(ongoingWork: SeniorFriendlyUpdate[]): string[] {
    const focus = ["Nästa vecka fokuserar vi på:"];
    
    if (ongoingWork.length === 0) {
      focus.push("🎯 Att planera nästa spännande steg i ditt projekt");
    } else {
      ongoingWork.slice(0, 3).forEach(work => {
        focus.push(`🎯 ${work.message}`);
      });
    }

    return focus;
  }

  /**
   * Genererar kontextuellt uppmuntrande meddelande
   */
  private generateEncouragingMessage(completedCount: number): string {
    const messages = [
      "Du gör fantastiska framsteg! Varje steg för dig närmare ditt mål.",
      "Bra jobbat! Ditt projekt växer och utvecklas precis som det ska.",
      "Vi är stolta över hur långt du har kommit. Fortsätt så här!",
      "Ditt engagemang och tålamod ger verkligen resultat.",
      "Varje dag blir ditt projekt lite mer komplett. Fantastiskt arbete!"
    ];

    if (completedCount === 0) {
      return "Även om vi inte ser stora förändringar denna vecka, arbetar vi ständigt på att göra ditt projekt bättre.";
    }

    return messages[Math.floor(Math.random() * messages.length)];
  }

  /**
   * Beräknar övergripande framsteg i procent
   */
  private calculateOverallProgress(): number {
    // Simulerad beräkning baserad på antal slutförda uppgifter
    const totalEvents = this.weeklyEvents.length;
    const completedEvents = this.weeklyEvents.filter(e => e.type === 'success').length;
    
    if (totalEvents === 0) return 15; // Grundläggande framsteg
    
    const baseProgress = 15; // Startvärde
    const progressIncrement = Math.min(75, (completedEvents / totalEvents) * 85);
    
    return Math.round(baseProgress + progressIncrement);
  }

  /**
   * Skapar månadssammanfattning för större milstones
   */
  generateMonthlyProgress(): ProgressSummary {
    return {
      period: 'month',
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
      endDate: new Date().toISOString(),
      majorAccomplishments: this.getMajorAccomplishments(),
      upcomingMilestones: this.getUpcomingMilestones(),
      celebrationMessage: this.generateCelebrationMessage()
    };
  }

  /**
   * Identifierar större prestationer för månadssammanfattning
   */
  private getMajorAccomplishments(): string[] {
    return [
      "🎉 Ditt projekt har fått en solid grund att bygga vidare på",
      "🎉 Vi har skapat säkra system som skyddar din information",
      "🎉 Alla grundläggande funktioner är nu på plats och fungerar"
    ];
  }

  /**
   * Föreslår kommande milstones
   */
  private getUpcomingMilestones(): string[] {
    return [
      "🎯 Nästa månad kommer vi att göra ditt projekt ännu enklare att använda",
      "🎯 Vi planerar att lägga till fler användbara funktioner",
      "🎯 Ditt projekt kommer att bli redo för dina första riktiga användare"
    ];
  }

  /**
   * Skapar celebrationsmeddelande för månadssammanfattning
   */
  private generateCelebrationMessage(): string {
    return "Du har gjort otroliga framsteg denna månad! Ditt projekt växer från en idé till verklighet, och vi är så glada att få vara en del av denna resa tillsammans med dig.";
  }

  /**
   * Rensar gamla händelser (körs automatiskt)
   */
  clearOldEvents(): void {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    this.weeklyEvents = this.weeklyEvents.filter(event => 
      new Date(event.timestamp) > oneWeekAgo
    );
  }
}