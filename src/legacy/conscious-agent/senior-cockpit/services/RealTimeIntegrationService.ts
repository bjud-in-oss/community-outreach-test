// MASTER PLAN 2.0: Real-time System View Integration
// STATUS: Real-time Uppdateringar för Senior Cockpit
// INTEGRATION: System View → Communication Bridge → Senior Cockpit

import { SeniorFriendlyUpdate, SeniorSafeNotification } from '../types/SeniorSafeDataModels';
import { SeniorTranslator } from '../../communication-bridge/translation/SeniorTranslator';

/**
 * Hanterar real-time integration mellan System View och Senior Cockpit
 * Säkerställer att seniorer får uppdateringar utan teknisk exponering
 */
export class RealTimeIntegrationService {
  private translator: SeniorTranslator;
  private updateQueue: SeniorFriendlyUpdate[] = [];
  private quietHours: QuietHoursConfig;
  private batchingConfig: BatchingConfig;
  private connectionStatus: 'connected' | 'disconnected' | 'reconnecting' = 'disconnected';

  constructor() {
    this.translator = new SeniorTranslator();
    this.quietHours = {
      enabled: true,
      startTime: '22:00',
      endTime: '08:00',
      timezone: 'Europe/Stockholm'
    };
    this.batchingConfig = {
      maxBatchSize: 5,
      batchTimeoutMs: 30000, // 30 sekunder
      priorityThreshold: 'medium'
    };
  }

  /**
   * Initialiserar real-time anslutning
   */
  async initializeRealTimeConnection(): Promise<void> {
    try {
      // Simulera WebSocket eller Server-Sent Events anslutning
      await this.establishConnection();
      this.setupEventHandlers();
      this.startBatchingTimer();
      
      console.log('✅ Real-time connection established for Senior Cockpit');
    } catch (error) {
      console.error('❌ Failed to establish real-time connection:', error);
      await this.handleConnectionFailure();
    }
  }

  /**
   * Hanterar inkommande system-uppdateringar
   */
  async handleSystemUpdate(systemUpdate: any): Promise<void> {
    try {
      // Filtrera och översätt teknisk information
      const seniorUpdate = await this.translator.translateToSeniorUpdate(systemUpdate);
      
      // Kontrollera quiet hours
      if (this.isQuietHours() && seniorUpdate.priority !== 'high') {
        await this.queueForLater(seniorUpdate);
        return;
      }

      // Lägg till i batch-kö
      this.addToBatch(seniorUpdate);
      
      // Skicka omedelbart om hög prioritet
      if (seniorUpdate.priority === 'high') {
        await this.sendImmediateUpdate(seniorUpdate);
      }
      
    } catch (error) {
      console.error('Error handling system update:', error);
      // Skicka generiskt senior-vänligt felmeddelande
      await this.sendErrorNotification('Ett litet problem uppstod, men allt fungerar som det ska');
    }
  }

  /**
   * Skickar batch-uppdateringar till Senior Cockpit
   */
  private async sendBatchUpdates(): Promise<void> {
    if (this.updateQueue.length === 0) return;

    try {
      // Gruppera uppdateringar intelligent
      const groupedUpdates = this.groupUpdatesByCategory(this.updateQueue);
      
      // Skapa sammanfattande meddelanden
      const summaryUpdates = this.createSummaryUpdates(groupedUpdates);
      
      // Skicka till Senior Cockpit
      for (const update of summaryUpdates) {
        await this.deliverToSeniorCockpit(update);
      }
      
      // Rensa kön
      this.updateQueue = [];
      
    } catch (error) {
      console.error('Error sending batch updates:', error);
    }
  }

  /**
   * Skapar intelligent gruppering av uppdateringar
   */
  private groupUpdatesByCategory(updates: SeniorFriendlyUpdate[]): GroupedUpdates {
    const grouped: GroupedUpdates = {
      progress: [],
      success: [],
      info: [],
      celebration: []
    };

    updates.forEach(update => {
      grouped[update.type].push(update);
    });

    return grouped;
  }

  /**
   * Skapar sammanfattande meddelanden från grupperade uppdateringar
   */
  private createSummaryUpdates(grouped: GroupedUpdates): SeniorFriendlyUpdate[] {
    const summaries: SeniorFriendlyUpdate[] = [];

    // Framsteg-sammanfattning
    if (grouped.progress.length > 0) {
      summaries.push({
        id: `progress-summary-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'progress',
        title: 'Ditt projekt utvecklas',
        message: `Vi har gjort ${grouped.progress.length} förbättringar på ditt projekt idag`,
        encouragingNote: 'Allt går enligt plan och utvecklas fint',
        icon: '🎯',
        priority: 'medium',
        category: 'project-progress'
      });
    }

    // Framgångs-sammanfattning
    if (grouped.success.length > 0) {
      summaries.push({
        id: `success-summary-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'success',
        title: 'Fantastiska framsteg!',
        message: `${grouped.success.length} viktiga milstones har slutförts`,
        encouragingNote: 'Du gör verkligen framsteg mot ditt mål',
        icon: '✅',
        priority: 'medium',
        category: 'user-achievement'
      });
    }

    // Celebration-sammanfattning
    if (grouped.celebration.length > 0) {
      summaries.push({
        id: `celebration-summary-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'celebration',
        title: 'Dags att fira!',
        message: 'Ditt projekt har nått flera viktiga milstones',
        encouragingNote: 'Du förtjänar att vara stolt över vad du har åstadkommit',
        icon: '🎉',
        priority: 'high',
        category: 'user-achievement'
      });
    }

    return summaries;
  }

  /**
   * Levererar uppdatering till Senior Cockpit
   */
  private async deliverToSeniorCockpit(update: SeniorFriendlyUpdate): Promise<void> {
    try {
      // Simulera leverans till Senior Cockpit UI
      console.log('📨 Delivering to Senior Cockpit:', update.title);
      
      // Här skulle vi skicka till faktisk UI-komponent
      // this.seniorCockpitUI.displayUpdate(update);
      
      // Logga för debugging (dold från seniorer)
      this.logUpdateDelivery(update);
      
    } catch (error) {
      console.error('Failed to deliver update to Senior Cockpit:', error);
    }
  }

  /**
   * Kontrollerar om det är quiet hours
   */
  private isQuietHours(): boolean {
    if (!this.quietHours.enabled) return false;

    const now = new Date();
    const currentTime = now.toLocaleTimeString('sv-SE', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: this.quietHours.timezone 
    });

    return currentTime >= this.quietHours.startTime || currentTime <= this.quietHours.endTime;
  }

  /**
   * Köar uppdatering för senare leverans
   */
  private async queueForLater(update: SeniorFriendlyUpdate): Promise<void> {
    // Spara för leverans efter quiet hours
    const queuedUpdate = {
      ...update,
      queuedAt: new Date().toISOString(),
      deliverAfter: this.calculateDeliveryTime()
    };

    // Här skulle vi spara i persistent storage
    console.log('📥 Queued update for later delivery:', update.title);
  }

  /**
   * Beräknar när uppdatering ska levereras efter quiet hours
   */
  private calculateDeliveryTime(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0); // 08:00 nästa dag
    return tomorrow.toISOString();
  }

  /**
   * Lägger till uppdatering i batch-kö
   */
  private addToBatch(update: SeniorFriendlyUpdate): void {
    this.updateQueue.push(update);

    // Skicka batch om den blir för stor
    if (this.updateQueue.length >= this.batchingConfig.maxBatchSize) {
      this.sendBatchUpdates();
    }
  }

  /**
   * Skickar omedelbar uppdatering för hög prioritet
   */
  private async sendImmediateUpdate(update: SeniorFriendlyUpdate): Promise<void> {
    await this.deliverToSeniorCockpit(update);
  }

  /**
   * Skickar felnotifikation till senior
   */
  private async sendErrorNotification(message: string): Promise<void> {
    const errorNotification: SeniorSafeNotification = {
      id: `error-${Date.now()}`,
      type: 'info',
      title: 'Information',
      message,
      icon: 'ℹ️',
      color: '#2196F3',
      priority: 'low',
      timestamp: new Date().toISOString(),
      dismissed: false
    };

    // Skicka till Senior Cockpit
    console.log('📨 Sending error notification to senior:', message);
  }

  /**
   * Etablerar anslutning till System View
   */
  private async establishConnection(): Promise<void> {
    // Simulera anslutning
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connectionStatus = 'connected';
        resolve();
      }, 1000);
    });
  }

  /**
   * Sätter upp event handlers
   */
  private setupEventHandlers(): void {
    // Simulera event handlers för WebSocket/SSE
    console.log('🔧 Setting up real-time event handlers');
  }

  /**
   * Startar batch-timer
   */
  private startBatchingTimer(): void {
    setInterval(() => {
      this.sendBatchUpdates();
    }, this.batchingConfig.batchTimeoutMs);
  }

  /**
   * Hanterar anslutningsfel
   */
  private async handleConnectionFailure(): Promise<void> {
    this.connectionStatus = 'disconnected';
    
    // Försök återanslutning
    setTimeout(() => {
      this.connectionStatus = 'reconnecting';
      this.initializeRealTimeConnection();
    }, 5000);
  }

  /**
   * Loggar uppdateringsleverans (dold från seniorer)
   */
  private logUpdateDelivery(update: SeniorFriendlyUpdate): void {
    // Teknisk loggning som aldrig visas för seniorer
    const logEntry = {
      timestamp: new Date().toISOString(),
      updateId: update.id,
      type: update.type,
      priority: update.priority,
      delivered: true
    };
    
    // Här skulle vi skicka till logging-system
    console.log('📊 Update delivery logged:', logEntry);
  }

  /**
   * Hämtar anslutningsstatus
   */
  getConnectionStatus(): string {
    switch (this.connectionStatus) {
      case 'connected':
        return 'Allt fungerar bra';
      case 'disconnected':
        return 'Arbetar på att återställa anslutningen';
      case 'reconnecting':
        return 'Återansluter...';
      default:
        return 'Kontrollerar anslutning';
    }
  }

  /**
   * Konfigurerar quiet hours
   */
  configureQuietHours(config: Partial<QuietHoursConfig>): void {
    this.quietHours = { ...this.quietHours, ...config };
  }

  /**
   * Konfigurerar batching
   */
  configureBatching(config: Partial<BatchingConfig>): void {
    this.batchingConfig = { ...this.batchingConfig, ...config };
  }
}

// Type definitions
interface QuietHoursConfig {
  enabled: boolean;
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
  timezone: string;
}

interface BatchingConfig {
  maxBatchSize: number;
  batchTimeoutMs: number;
  priorityThreshold: 'low' | 'medium' | 'high';
}

interface GroupedUpdates {
  progress: SeniorFriendlyUpdate[];
  success: SeniorFriendlyUpdate[];
  info: SeniorFriendlyUpdate[];
  celebration: SeniorFriendlyUpdate[];
}

export {
  RealTimeIntegrationService,
  type QuietHoursConfig,
  type BatchingConfig
};