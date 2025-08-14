// MASTER PLAN 2.0: SeniorTranslator.ts - Clean Version
// STATUS: Translation Layer för kommunikation mellan agenter
// INTEGRATION: Communication Bridge - Senior-vänlig översättning

export class SeniorTranslator {
  constructor() {
    console.log('🌉 Senior Translator initialized for Master Plan 2.0');
  }

  /**
   * Translate technical event to senior-friendly update
   */
  translateToSeniorUpdate(technicalEvent: any): any {
    try {
      const eventType = technicalEvent.type || 'info';
      const message = technicalEvent.message || 'Systemuppdatering';
      
      let seniorType: 'success' | 'progress' | 'info' | 'celebration' = 'info';
      if (eventType.includes('complete') || eventType.includes('success')) {
        seniorType = 'success';
      } else if (eventType.includes('progress')) {
        seniorType = 'progress';
      } else if (eventType.includes('milestone')) {
        seniorType = 'celebration';
      }
      
      return {
        id: technicalEvent.id || `event-${Date.now()}`,
        timestamp: technicalEvent.timestamp || new Date().toISOString(),
        type: seniorType,
        title: this.generateSeniorTitle(seniorType),
        message: this.translateTechnicalMessage(message),
        encouragingNote: this.generateEncouragingNote(seniorType),
        icon: this.getIconForEventType(seniorType),
        priority: technicalEvent.priority || 'medium',
        category: 'project-progress'
      };
    } catch (error) {
      return {
        id: `fallback-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'info',
        title: 'Projektuppdatering',
        message: 'Vi arbetar på ditt projekt',
        encouragingNote: 'Allt går enligt plan',
        icon: 'ℹ️',
        priority: 'low',
        category: 'project-progress'
      };
    }
  }

  /**
   * Translate error to senior-friendly message
   */
  translateErrorToSeniorMessage(error: any): string {
    const errorMessage = error.message || error.toString() || 'Ett okänt problem uppstod';
    
    if (/network|connection|timeout/i.test(errorMessage)) {
      return 'Det verkar vara ett problem med internetanslutningen. Vi försöker igen automatiskt.';
    } else if (/server|internal|500/i.test(errorMessage)) {
      return 'Vårt system har ett litet problem just nu. Vi arbetar på att fixa det.';
    } else if (/database|storage|data/i.test(errorMessage)) {
      return 'Det är ett litet problem med datalagringen. Ditt arbete är säkert och vi löser det snart.';
    }
    
    return 'Ett litet problem uppstod, men vi arbetar på att lösa det. Ditt arbete är säkert och vi återkommer snart med en lösning.';
  }

  private translateTechnicalMessage(message: string): string {
    return message
      .replace(/api/gi, 'system')
      .replace(/database/gi, 'datalagring')
      .replace(/server/gi, 'system')
      .replace(/commit/gi, 'sparade ändringar')
      .replace(/deploy/gi, 'publicerade')
      .replace(/error/gi, 'problem')
      .replace(/fix/gi, 'löste');
  }

  private generateSeniorTitle(type: string): string {
    const titles: Record<string, string> = {
      success: 'Uppgift slutförd!',
      progress: 'Framsteg gjort',
      info: 'Projektuppdatering',
      celebration: 'Fantastiska nyheter!'
    };
    return titles[type] || 'Uppdatering';
  }

  private generateEncouragingNote(type: string): string {
    const notes: Record<string, string> = {
      success: 'Du gör fantastiska framsteg!',
      progress: 'Allt utvecklas enligt plan',
      info: 'Vi håller dig uppdaterad',
      celebration: 'Detta är värt att fira!'
    };
    return notes[type] || 'Vi arbetar för dig';
  }

  private getIconForEventType(type: string): string {
    const icons: Record<string, string> = {
      success: '✅',
      progress: '🎯',
      info: 'ℹ️',
      celebration: '🎉'
    };
    return icons[type] || 'ℹ️';
  }
}