// MASTER PLAN 2.0: GracefulDegradation.ts
// STATUS: Graceful degradation för Senior Cockpit
// INTEGRATION: Conscious Agent - Fallback functionality
// ARCHITECTURE: Dual Consciousness Architecture compliant

import { seniorErrorHandler } from './SeniorErrorHandler';
import { seniorNotificationManager } from '../components/SeniorNotification';

/**
 * MASTER PLAN 2.0 Graceful Degradation Types
 */
export interface FallbackOption {
  id: string;
  name: string;
  description: string;
  priority: number; // Lower = higher priority
  isAvailable: () => Promise<boolean>;
  activate: () => Promise<boolean>;
  deactivate: () => Promise<boolean>;
  seniorMessage: string;
}

export interface SystemCapability {
  id: string;
  name: string;
  isEssential: boolean;
  fallbacks: FallbackOption[];
  currentFallback?: string;
  isWorking: boolean;
  lastCheck: Date;
}

export interface DegradationConfig {
  enableAutoFallback: boolean;
  enableNotifications: boolean;
  checkInterval: number; // milliseconds
  maxFallbackLevel: number;
  essentialOnly: boolean;
}

/**
 * MASTER PLAN 2.0 Graceful Degradation Manager
 * 
 * Hanterar fallback-funktionalitet för att säkerställa att seniorer
 * alltid kan använda systemet även när delar inte fungerar:
 * - Automatisk detektering av problem
 * - Stegvis nedgradering till enklare funktioner
 * - Transparent övergång för seniorer
 * - Automatisk återställning när möjligt
 */
export class GracefulDegradation {
  private config: DegradationConfig;
  private capabilities: Map<string, SystemCapability> = new Map();
  private currentDegradationLevel: number = 0;
  private monitoringInterval?: NodeJS.Timeout;
  private isMonitoring: boolean = false;

  constructor(config: Partial<DegradationConfig> = {}) {
    this.config = {
      enableAutoFallback: true,
      enableNotifications: true,
      checkInterval: 30000, // 30 seconds
      maxFallbackLevel: 3,
      essentialOnly: false,
      ...config
    };

    this.initializeCapabilities();
    console.log('🛡️ Graceful Degradation initialized for Master Plan 2.0');
  }

  /**
   * MASTER PLAN 2.0: Initialize system capabilities with fallbacks
   */
  private initializeCapabilities(): void {
    // Network Communication Capability
    this.capabilities.set('network', {
      id: 'network',
      name: 'Internetanslutning',
      isEssential: true,
      isWorking: true,
      lastCheck: new Date(),
      fallbacks: [
        {
          id: 'cached-data',
          name: 'Sparad information',
          description: 'Använd tidigare sparad information',
          priority: 1,
          isAvailable: async () => true,
          activate: async () => {
            console.log('🛡️ Activating cached data fallback');
            return true;
          },
          deactivate: async () => {
            console.log('🛡️ Deactivating cached data fallback');
            return true;
          },
          seniorMessage: 'Vi använder sparad information medan internetanslutningen återställs.'
        },
        {
          id: 'offline-mode',
          name: 'Offline-läge',
          description: 'Grundläggande funktioner utan internet',
          priority: 2,
          isAvailable: async () => true,
          activate: async () => {
            console.log('🛡️ Activating offline mode');
            return true;
          },
          deactivate: async () => {
            console.log('🛡️ Deactivating offline mode');
            return true;
          },
          seniorMessage: 'Vi arbetar offline medan internetanslutningen återställs.'
        }
      ]
    });

    // Real-time Updates Capability
    this.capabilities.set('realtime', {
      id: 'realtime',
      name: 'Direktuppdateringar',
      isEssential: false,
      isWorking: true,
      lastCheck: new Date(),
      fallbacks: [
        {
          id: 'polling',
          name: 'Regelbundna kontroller',
          description: 'Kontrollera uppdateringar med jämna mellanrum',
          priority: 1,
          isAvailable: async () => true,
          activate: async () => {
            console.log('🛡️ Activating polling fallback');
            return true;
          },
          deactivate: async () => {
            console.log('🛡️ Deactivating polling fallback');
            return true;
          },
          seniorMessage: 'Vi kontrollerar uppdateringar lite oftare för att hålla dig informerad.'
        },
        {
          id: 'manual-refresh',
          name: 'Manuell uppdatering',
          description: 'Användaren uppdaterar manuellt',
          priority: 2,
          isAvailable: async () => true,
          activate: async () => {
            console.log('🛡️ Activating manual refresh fallback');
            return true;
          },
          deactivate: async () => {
            console.log('🛡️ Deactivating manual refresh fallback');
            return true;
          },
          seniorMessage: 'Du kan uppdatera informationen genom att klicka på uppdatera-knappen.'
        }
      ]
    });

    // Advanced Features Capability
    this.capabilities.set('advanced', {
      id: 'advanced',
      name: 'Avancerade funktioner',
      isEssential: false,
      isWorking: true,
      lastCheck: new Date(),
      fallbacks: [
        {
          id: 'simplified-ui',
          name: 'Förenklat gränssnitt',
          description: 'Enklare version med grundfunktioner',
          priority: 1,
          isAvailable: async () => true,
          activate: async () => {
            console.log('🛡️ Activating simplified UI');
            return true;
          },
          deactivate: async () => {
            console.log('🛡️ Deactivating simplified UI');
            return true;
          },
          seniorMessage: 'Vi använder ett förenklat gränssnitt för bättre prestanda.'
        },
        {
          id: 'basic-mode',
          name: 'Grundläggande läge',
          description: 'Endast de mest nödvändiga funktionerna',
          priority: 2,
          isAvailable: async () => true,
          activate: async () => {
            console.log('🛡️ Activating basic mode');
            return true;
          },
          deactivate: async () => {
            console.log('🛡️ Deactivating basic mode');
            return true;
          },
          seniorMessage: 'Vi fokuserar på de viktigaste funktionerna för att allt ska fungera smidigt.'
        }
      ]
    });

    console.log(`🛡️ Initialized ${this.capabilities.size} system capabilities`);
  }

  /**
   * MASTER PLAN 2.0: Start monitoring system capabilities
   */
  startMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    this.monitoringInterval = setInterval(async () => {
      await this.checkAllCapabilities();
    }, this.config.checkInterval);

    console.log('🛡️ Started capability monitoring');
  }

  /**
   * MASTER PLAN 2.0: Stop monitoring system capabilities
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
    }
    this.isMonitoring = false;
    console.log('🛡️ Stopped capability monitoring');
  }

  /**
   * MASTER PLAN 2.0: Check all system capabilities
   */
  private async checkAllCapabilities(): Promise<void> {
    for (const [id, capability] of this.capabilities) {
      await this.checkCapability(id);
    }
  }

  /**
   * MASTER PLAN 2.0: Check specific capability
   */
  async checkCapability(capabilityId: string): Promise<boolean> {
    const capability = this.capabilities.get(capabilityId);
    if (!capability) return false;

    try {
      // Simulate capability check (in real implementation, this would be actual health checks)
      const isWorking = await this.performCapabilityCheck(capabilityId);
      
      capability.lastCheck = new Date();
      
      if (capability.isWorking && !isWorking) {
        // Capability just failed
        console.log(`⚠️ Capability ${capability.name} failed`);
        capability.isWorking = false;
        
        if (this.config.enableAutoFallback) {
          await this.activateFallback(capabilityId);
        }
      } else if (!capability.isWorking && isWorking) {
        // Capability recovered
        console.log(`✅ Capability ${capability.name} recovered`);
        capability.isWorking = true;
        
        await this.deactivateFallback(capabilityId);
      }

      return isWorking;
    } catch (error) {
      console.error(`❌ Error checking capability ${capabilityId}:`, error);
      return false;
    }
  }

  /**
   * MASTER PLAN 2.0: Perform actual capability check
   */
  private async performCapabilityCheck(capabilityId: string): Promise<boolean> {
    // Simulate different failure rates for different capabilities
    const failureRates = {
      network: 0.1,    // 10% chance of failure
      realtime: 0.15,  // 15% chance of failure
      advanced: 0.05   // 5% chance of failure
    };

    const failureRate = failureRates[capabilityId as keyof typeof failureRates] || 0.1;
    return Math.random() > failureRate;
  }

  /**
   * MASTER PLAN 2.0: Activate fallback for capability
   */
  async activateFallback(capabilityId: string): Promise<boolean> {
    const capability = this.capabilities.get(capabilityId);
    if (!capability || capability.currentFallback) return false;

    // Find best available fallback
    const availableFallbacks = [];
    for (const fallback of capability.fallbacks) {
      if (await fallback.isAvailable()) {
        availableFallbacks.push(fallback);
      }
    }

    if (availableFallbacks.length === 0) {
      console.log(`⚠️ No fallbacks available for ${capability.name}`);
      return false;
    }

    // Sort by priority and activate the best one
    availableFallbacks.sort((a, b) => a.priority - b.priority);
    const bestFallback = availableFallbacks[0];

    try {
      const success = await bestFallback.activate();
      if (success) {
        capability.currentFallback = bestFallback.id;
        this.currentDegradationLevel = Math.max(this.currentDegradationLevel, bestFallback.priority);
        
        console.log(`🛡️ Activated fallback ${bestFallback.name} for ${capability.name}`);
        
        // Notify senior user
        if (this.config.enableNotifications) {
          seniorNotificationManager.info(
            'Systemanpassning',
            bestFallback.seniorMessage,
            false
          );
        }
        
        return true;
      }
    } catch (error) {
      console.error(`❌ Failed to activate fallback ${bestFallback.name}:`, error);
    }

    return false;
  }

  /**
   * MASTER PLAN 2.0: Deactivate fallback for capability
   */
  async deactivateFallback(capabilityId: string): Promise<boolean> {
    const capability = this.capabilities.get(capabilityId);
    if (!capability || !capability.currentFallback) return false;

    const fallback = capability.fallbacks.find(f => f.id === capability.currentFallback);
    if (!fallback) return false;

    try {
      const success = await fallback.deactivate();
      if (success) {
        capability.currentFallback = undefined;
        
        // Recalculate degradation level
        this.recalculateDegradationLevel();
        
        console.log(`✅ Deactivated fallback ${fallback.name} for ${capability.name}`);
        
        // Notify senior user of recovery
        if (this.config.enableNotifications) {
          seniorNotificationManager.success(
            'Systemet fungerar igen',
            `${capability.name} fungerar normalt igen. Alla funktioner är tillgängliga.`
          );
        }
        
        return true;
      }
    } catch (error) {
      console.error(`❌ Failed to deactivate fallback ${fallback.name}:`, error);
    }

    return false;
  }

  /**
   * MASTER PLAN 2.0: Recalculate current degradation level
   */
  private recalculateDegradationLevel(): void {
    let maxLevel = 0;
    
    for (const capability of this.capabilities.values()) {
      if (capability.currentFallback) {
        const fallback = capability.fallbacks.find(f => f.id === capability.currentFallback);
        if (fallback) {
          maxLevel = Math.max(maxLevel, fallback.priority);
        }
      }
    }
    
    this.currentDegradationLevel = maxLevel;
  }

  /**
   * MASTER PLAN 2.0: Handle error with graceful degradation
   */
  async handleErrorWithDegradation(
    error: Error | string,
    context?: string,
    affectedCapability?: string
  ): Promise<void> {
    // Handle the error through the error handler
    await seniorErrorHandler.handleError(error, context);

    // If a specific capability is affected, check and potentially activate fallback
    if (affectedCapability && this.capabilities.has(affectedCapability)) {
      const isWorking = await this.checkCapability(affectedCapability);
      if (!isWorking) {
        await this.activateFallback(affectedCapability);
      }
    }

    // If degradation level is too high, enable essential-only mode
    if (this.currentDegradationLevel >= this.config.maxFallbackLevel) {
      await this.enableEssentialOnlyMode();
    }
  }

  /**
   * MASTER PLAN 2.0: Enable essential-only mode
   */
  async enableEssentialOnlyMode(): Promise<void> {
    if (this.config.essentialOnly) return;

    this.config.essentialOnly = true;
    console.log('🛡️ Enabled essential-only mode');

    // Deactivate non-essential capabilities
    for (const [id, capability] of this.capabilities) {
      if (!capability.isEssential && capability.currentFallback) {
        await this.deactivateFallback(id);
      }
    }

    // Notify senior user
    if (this.config.enableNotifications) {
      seniorNotificationManager.info(
        'Förenklat läge aktiverat',
        'Vi fokuserar på de viktigaste funktionerna för att säkerställa att allt fungerar smidigt för dig.',
        true
      );
    }
  }

  /**
   * MASTER PLAN 2.0: Disable essential-only mode
   */
  async disableEssentialOnlyMode(): Promise<void> {
    if (!this.config.essentialOnly) return;

    this.config.essentialOnly = false;
    console.log('🛡️ Disabled essential-only mode');

    // Re-check all capabilities
    await this.checkAllCapabilities();

    // Notify senior user
    if (this.config.enableNotifications) {
      seniorNotificationManager.success(
        'Alla funktioner tillgängliga',
        'Systemet fungerar normalt igen och alla funktioner är tillgängliga.'
      );
    }
  }

  /**
   * MASTER PLAN 2.0: Get current system status
   */
  getSystemStatus(): {
    degradationLevel: number;
    essentialOnlyMode: boolean;
    workingCapabilities: number;
    totalCapabilities: number;
    activeFallbacks: Array<{
      capability: string;
      fallback: string;
      message: string;
    }>;
    lastCheck: Date;
  } {
    const activeFallbacks = [];
    let workingCapabilities = 0;

    for (const capability of this.capabilities.values()) {
      if (capability.isWorking) {
        workingCapabilities++;
      }
      
      if (capability.currentFallback) {
        const fallback = capability.fallbacks.find(f => f.id === capability.currentFallback);
        if (fallback) {
          activeFallbacks.push({
            capability: capability.name,
            fallback: fallback.name,
            message: fallback.seniorMessage
          });
        }
      }
    }

    return {
      degradationLevel: this.currentDegradationLevel,
      essentialOnlyMode: this.config.essentialOnly,
      workingCapabilities,
      totalCapabilities: this.capabilities.size,
      activeFallbacks,
      lastCheck: new Date()
    };
  }

  /**
   * MASTER PLAN 2.0: Force capability failure for testing
   */
  async forceCapabilityFailure(capabilityId: string): Promise<boolean> {
    const capability = this.capabilities.get(capabilityId);
    if (!capability) return false;

    capability.isWorking = false;
    console.log(`🧪 Forced failure of capability: ${capability.name}`);
    
    if (this.config.enableAutoFallback) {
      return await this.activateFallback(capabilityId);
    }
    
    return true;
  }

  /**
   * MASTER PLAN 2.0: Force capability recovery for testing
   */
  async forceCapabilityRecovery(capabilityId: string): Promise<boolean> {
    const capability = this.capabilities.get(capabilityId);
    if (!capability) return false;

    capability.isWorking = true;
    console.log(`🧪 Forced recovery of capability: ${capability.name}`);
    
    return await this.deactivateFallback(capabilityId);
  }

  /**
   * MASTER PLAN 2.0: Get capability details
   */
  getCapabilityDetails(capabilityId: string): SystemCapability | undefined {
    return this.capabilities.get(capabilityId);
  }

  /**
   * MASTER PLAN 2.0: List all capabilities
   */
  getAllCapabilities(): SystemCapability[] {
    return Array.from(this.capabilities.values());
  }
}

// Export default graceful degradation instance
export const gracefulDegradation = new GracefulDegradation();

export default GracefulDegradation;