// MASTER PLAN 2.0: RealTimeUpdateService.ts
// STATUS: Real-time uppdateringar för Senior Cockpit
// INTEGRATION: WebSocket-baserad automatisk uppdatering
// ARCHITECTURE: Dual Consciousness Architecture compliant

import { SeniorViewService } from './SeniorViewService.js';
import { CommunicationBridge } from '../../../communication-bridge/CommunicationBridge.js';
import { ContextManager } from '../../../communication-bridge/memory/ContextManager.js';
import { SeniorView, CockpitApiResponse } from '../types/SeniorCockpitTypes.js';

export interface RealTimeConfig {
  updateInterval: number; // milliseconds
  enableWebSocket: boolean;
  enablePolling: boolean;
  maxRetries: number;
  seniorSafeMode: boolean;
}

export interface UpdateEvent {
  id: string;
  timestamp: Date;
  type: 'system_change' | 'progress_update' | 'notification' | 'error' | 'health_check';
  source: 'communication_bridge' | 'context_manager' | 'senior_view_service';
  data: any;
  seniorSafe: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface UpdateSubscription {
  id: string;
  callback: (event: UpdateEvent) => void;
  filter?: (event: UpdateEvent) => boolean;
  seniorSafeOnly: boolean;
}

/**
 * JULES REAL-TIME UPDATE SERVICE
 * 
 * Implementerar real-time uppdateringar för Senior Cockpit enligt Jules vision:
 * - Automatiska uppdateringar utan att seniorer behöver klicka "refresh"
 * - Intelligent filtrering av uppdateringar för att undvika överbelastning
 * - Senior-säkra uppdateringar som aldrig exponerar teknisk komplexitet
 * - Graceful degradation vid nätverksproblem
 */
export class RealTimeUpdateService {
  private seniorViewService: SeniorViewService;
  private communicationBridge: CommunicationBridge;
  private contextManager: ContextManager;
  private config: RealTimeConfig;
  private subscriptions: Map<string, UpdateSubscription> = new Map();
  private isRunning: boolean = false;
  private pollingInterval?: NodeJS.Timeout;
  private websocket?: WebSocket;
  private lastUpdate: Date = new Date();
  private retryCount: number = 0;
  private updateQueue: UpdateEvent[] = [];

  constructor(
    seniorViewService: SeniorViewService,
    communicationBridge: CommunicationBridge,
    contextManager: ContextManager,
    config: Partial<RealTimeConfig> = {}
  ) {
    this.seniorViewService = seniorViewService;
    this.communicationBridge = communicationBridge;
    this.contextManager = contextManager;
    
    this.config = {
      updateInterval: 30000, // 30 sekunder för seniorer (inte för aggressivt)
      enableWebSocket: false, // Börja med polling för enkelhet
      enablePolling: true,
      maxRetries: 3,
      seniorSafeMode: true,
      ...config
    };

    console.log('🔄 Real-Time Update Service initialized for Senior Cockpit');
  }

  /**
   * JULES METOD: Starta real-time uppdateringar
   */
  async startRealTimeUpdates(): Promise<{ success: boolean; message: string }> {
    if (this.isRunning) {
      return { success: false, message: 'Real-time updates already running' };
    }

    try {
      console.log('🚀 Starting real-time updates for Senior Cockpit...');

      // Starta polling (primär metod för stabilitet)
      if (this.config.enablePolling) {
        await this.startPolling();
      }

      // Starta WebSocket (sekundär metod för snabbare uppdateringar)
      if (this.config.enableWebSocket) {
        await this.startWebSocket();
      }

      // Lyssna på Communication Bridge events
      this.setupCommunicationBridgeListeners();

      // Lyssna på Context Manager events
      this.setupContextManagerListeners();

      this.isRunning = true;
      this.lastUpdate = new Date();

      console.log('✅ Real-time updates started successfully');
      return { 
        success: true, 
        message: 'Real-time updates started for Senior Cockpit' 
      };

    } catch (error) {
      console.error('❌ Failed to start real-time updates:', error);
      return { 
        success: false, 
        message: `Failed to start real-time updates: ${error}` 
      };
    }
  }

  /**
   * JULES METOD: Stoppa real-time uppdateringar
   */
  async stopRealTimeUpdates(): Promise<{ success: boolean; message: string }> {
    if (!this.isRunning) {
      return { success: false, message: 'Real-time updates not running' };
    }

    try {
      console.log('⏹️ Stopping real-time updates...');

      // Stoppa polling
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = undefined;
      }

      // Stäng WebSocket
      if (this.websocket) {
        this.websocket.close();
        this.websocket = undefined;
      }

      // Rensa subscriptions
      this.subscriptions.clear();
      this.updateQueue = [];

      this.isRunning = false;

      console.log('✅ Real-time updates stopped');
      return { 
        success: true, 
        message: 'Real-time updates stopped' 
      };

    } catch (error) {
      console.error('❌ Failed to stop real-time updates:', error);
      return { 
        success: false, 
        message: `Failed to stop real-time updates: ${error}` 
      };
    }
  }

  /**
   * JULES METOD: Prenumerera på uppdateringar
   */
  subscribe(
    callback: (event: UpdateEvent) => void,
    filter?: (event: UpdateEvent) => boolean,
    seniorSafeOnly: boolean = true
  ): string {
    const subscriptionId = `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const subscription: UpdateSubscription = {
      id: subscriptionId,
      callback,
      filter,
      seniorSafeOnly
    };

    this.subscriptions.set(subscriptionId, subscription);
    
    console.log(`📡 New subscription created: ${subscriptionId} (senior-safe: ${seniorSafeOnly})`);
    
    return subscriptionId;
  }

  /**
   * JULES METOD: Avsluta prenumeration
   */
  unsubscribe(subscriptionId: string): boolean {
    const removed = this.subscriptions.delete(subscriptionId);
    if (removed) {
      console.log(`📡 Subscription removed: ${subscriptionId}`);
    }
    return removed;
  }

  /**
   * JULES METOD: Manuell uppdatering (för "Uppdatera Nu" knapp)
   */
  async triggerManualUpdate(): Promise<CockpitApiResponse<SeniorView>> {
    console.log('🔄 Manual update triggered by senior user');
    
    try {
      // Hämta senaste data från SeniorViewService
      const seniorViewResponse = await this.seniorViewService.getSeniorView();
      
      if (seniorViewResponse.success) {
        // Skapa update event
        const updateEvent: UpdateEvent = {
          id: `manual-${Date.now()}`,
          timestamp: new Date(),
          type: 'progress_update',
          source: 'senior_view_service',
          data: seniorViewResponse.data,
          seniorSafe: true,
          priority: 'medium'
        };

        // Notifiera alla subscribers
        this.notifySubscribers(updateEvent);
        
        this.lastUpdate = new Date();
      }

      return seniorViewResponse;

    } catch (error) {
      console.error('❌ Manual update failed:', error);
      
      return {
        success: false,
        error: `Manual update failed: ${error}`,
        timestamp: new Date(),
        seniorFriendlyMessage: 'Uppdateringen misslyckades. Vi försöker igen automatiskt.'
      };
    }
  }

  /**
   * PRIVAT: Starta polling för automatiska uppdateringar
   */
  private async startPolling(): Promise<void> {
    console.log(`🔄 Starting polling with ${this.config.updateInterval}ms interval`);
    
    this.pollingInterval = setInterval(async () => {
      try {
        await this.checkForUpdates();
      } catch (error) {
        console.error('❌ Polling update failed:', error);
        this.handleUpdateError(error);
      }
    }, this.config.updateInterval);
  }

  /**
   * PRIVAT: Starta WebSocket för snabbare uppdateringar
   */
  private async startWebSocket(): Promise<void> {
    // TODO: Implementera WebSocket server först
    console.log('🔌 WebSocket support planned for future implementation');
  }

  /**
   * PRIVAT: Kontrollera för uppdateringar
   */
  private async checkForUpdates(): Promise<void> {
    // Kontrollera Communication Bridge för nya meddelanden
    const bridgeStats = this.communicationBridge.getBridgeStats();
    const contextStats = this.contextManager.getStats();
    
    // Kontrollera om det finns nya meddelanden sedan senaste uppdatering
    const recentMessages = this.communicationBridge.getMessageHistory(5);
    const hasNewMessages = recentMessages.some(msg => 
      msg.timestamp > this.lastUpdate
    );

    if (hasNewMessages || this.shouldUpdateBasedOnStats(bridgeStats, contextStats)) {
      console.log('📊 New system activity detected, updating Senior View...');
      
      try {
        const seniorViewResponse = await this.seniorViewService.getSeniorView();
        
        if (seniorViewResponse.success) {
          const updateEvent: UpdateEvent = {
            id: `auto-${Date.now()}`,
            timestamp: new Date(),
            type: 'system_change',
            source: 'communication_bridge',
            data: seniorViewResponse.data,
            seniorSafe: true,
            priority: 'low'
          };

          this.notifySubscribers(updateEvent);
          this.lastUpdate = new Date();
          this.retryCount = 0; // Reset retry count on success
        }

      } catch (error) {
        console.error('❌ Auto-update failed:', error);
        this.handleUpdateError(error);
      }
    }
  }

  /**
   * PRIVAT: Avgör om uppdatering behövs baserat på statistik
   */
  private shouldUpdateBasedOnStats(bridgeStats: any, contextStats: any): boolean {
    // Uppdatera om det finns nya översättningar eller meddelanden
    return bridgeStats.translationsPerformed > 0 || 
           contextStats.contexts > 0;
  }

  /**
   * PRIVAT: Setup Communication Bridge listeners
   */
  private setupCommunicationBridgeListeners(): void {
    // TODO: Implementera event listeners för Communication Bridge
    console.log('🌉 Communication Bridge listeners setup (placeholder)');
  }

  /**
   * PRIVAT: Setup Context Manager listeners
   */
  private setupContextManagerListeners(): void {
    // TODO: Implementera event listeners för Context Manager
    console.log('🧠 Context Manager listeners setup (placeholder)');
  }

  /**
   * PRIVAT: Notifiera alla subscribers om uppdatering
   */
  private notifySubscribers(event: UpdateEvent): void {
    let notifiedCount = 0;

    for (const [id, subscription] of this.subscriptions) {
      try {
        // Kontrollera senior-safe filter
        if (subscription.seniorSafeOnly && !event.seniorSafe) {
          continue;
        }

        // Kontrollera custom filter
        if (subscription.filter && !subscription.filter(event)) {
          continue;
        }

        // Anropa callback
        subscription.callback(event);
        notifiedCount++;

      } catch (error) {
        console.error(`❌ Failed to notify subscription ${id}:`, error);
      }
    }

    console.log(`📡 Notified ${notifiedCount} subscribers about ${event.type} event`);
  }

  /**
   * PRIVAT: Hantera uppdateringsfel
   */
  private handleUpdateError(error: any): void {
    this.retryCount++;
    
    if (this.retryCount >= this.config.maxRetries) {
      console.warn(`⚠️ Max retries (${this.config.maxRetries}) reached, backing off...`);
      
      // Skapa error event för subscribers
      const errorEvent: UpdateEvent = {
        id: `error-${Date.now()}`,
        timestamp: new Date(),
        type: 'error',
        source: 'senior_view_service',
        data: { error: 'Temporary connection issues' },
        seniorSafe: true,
        priority: 'low'
      };

      this.notifySubscribers(errorEvent);
      
      // Reset retry count efter en stund
      setTimeout(() => {
        this.retryCount = 0;
      }, this.config.updateInterval * 2);
    }
  }

  /**
   * PUBLIK: Hämta service status
   */
  getStatus(): {
    isRunning: boolean;
    lastUpdate: Date;
    subscriptions: number;
    retryCount: number;
    config: RealTimeConfig;
  } {
    return {
      isRunning: this.isRunning,
      lastUpdate: this.lastUpdate,
      subscriptions: this.subscriptions.size,
      retryCount: this.retryCount,
      config: this.config
    };
  }

  /**
   * PUBLIK: Uppdatera konfiguration
   */
  updateConfig(newConfig: Partial<RealTimeConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('⚙️ Real-time update configuration updated');
    
    // Starta om polling med ny interval om den ändrats
    if (newConfig.updateInterval && this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.startPolling();
    }
  }
}