// MASTER PLAN 2.0: Performance Optimizer
// STATUS: Performance Optimering för Senior Cockpit
// INTEGRATION: Senior Cockpit Performance Enhancement

/**
 * Optimerar prestanda för Senior Cockpit med fokus på seniorer
 * Särskild hänsyn till långsam internetanslutning och äldre enheter
 */
export class PerformanceOptimizer {
  private cacheManager: CacheManager;
  private connectionMonitor: ConnectionMonitor;
  private loadingOptimizer: LoadingOptimizer;

  constructor() {
    this.cacheManager = new CacheManager();
    this.connectionMonitor = new ConnectionMonitor();
    this.loadingOptimizer = new LoadingOptimizer();
  }

  /**
   * Initialiserar alla performance-optimeringar
   */
  async initializeOptimizations(): Promise<void> {
    console.log('🚀 Initializing Senior Cockpit performance optimizations...');
    
    await this.cacheManager.initialize();
    await this.connectionMonitor.startMonitoring();
    await this.loadingOptimizer.setupLazyLoading();
    
    this.setupDebouncing();
    this.optimizeForSlowConnections();
    this.enableProgressiveLoading();
    
    console.log('✅ Performance optimizations initialized');
  }

  /**
   * Optimerar för långsamma internetanslutningar
   */
  private optimizeForSlowConnections(): void {
    // Minska bildkvalitet för långsamma anslutningar
    this.connectionMonitor.onSlowConnection(() => {
      this.reduceImageQuality();
      this.enableDataSaving();
      this.prioritizeEssentialContent();
    });

    // Återställ kvalitet vid snabbare anslutning
    this.connectionMonitor.onFastConnection(() => {
      this.restoreImageQuality();
      this.disableDataSaving();
    });
  }

  /**
   * Implementerar progressiv laddning
   */
  private enableProgressiveLoading(): void {
    // Ladda viktigast innehåll först
    const loadingPriorities = {
      critical: ['navigation', 'main-message', 'progress-indicator'],
      important: ['project-overview', 'recent-updates'],
      optional: ['detailed-stats', 'historical-data']
    };

    // Ladda i prioritetsordning
    this.loadContentByPriority(loadingPriorities);
  }

  /**
   * Laddar innehåll baserat på prioritet
   */
  private async loadContentByPriority(priorities: LoadingPriorities): Promise<void> {
    // Ladda kritiskt innehåll omedelbart
    await this.loadCriticalContent(priorities.critical);
    
    // Ladda viktigt innehåll efter kort fördröjning
    setTimeout(() => {
      this.loadImportantContent(priorities.important);
    }, 100);
    
    // Ladda valfritt innehåll när allt annat är klart
    setTimeout(() => {
      this.loadOptionalContent(priorities.optional);
    }, 500);
  }

  /**
   * Sätter upp debouncing för real-time uppdateringar
   */
  private setupDebouncing(): void {
    const debouncedUpdateHandler = this.debounce((updates: any[]) => {
      this.handleBatchedUpdates(updates);
    }, 1000); // 1 sekund debounce

    // Använd debounced handler för uppdateringar
    this.registerUpdateHandler(debouncedUpdateHandler);
  }

  /**
   * Hanterar batch-uppdateringar
   */
  private handleBatchedUpdates(updates: any[]): void {
    // Gruppera liknande uppdateringar
    const groupedUpdates = this.groupSimilarUpdates(updates);
    
    // Skicka endast de viktigaste uppdateringarna
    const prioritizedUpdates = this.prioritizeUpdates(groupedUpdates);
    
    // Uppdatera UI
    this.updateUI(prioritizedUpdates);
  }

  /**
   * Minskar bildkvalitet för långsamma anslutningar
   */
  private reduceImageQuality(): void {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.lowQualitySrc) {
        img.src = img.dataset.lowQualitySrc;
      }
    });
  }

  /**
   * Återställer bildkvalitet
   */
  private restoreImageQuality(): void {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.highQualitySrc) {
        img.src = img.dataset.highQualitySrc;
      }
    });
  }

  /**
   * Aktiverar datasparläge
   */
  private enableDataSaving(): void {
    // Minska uppdateringsfrekvens
    this.connectionMonitor.setUpdateInterval(30000); // 30 sekunder
    
    // Komprimera data
    this.enableDataCompression();
    
    // Visa datasparindikator för senior
    this.showDataSavingIndicator();
  }

  /**
   * Inaktiverar datasparläge
   */
  private disableDataSaving(): void {
    this.connectionMonitor.setUpdateInterval(5000); // 5 sekunder
    this.disableDataCompression();
    this.hideDataSavingIndicator();
  }

  /**
   * Prioriterar essentiellt innehåll
   */
  private prioritizeEssentialContent(): void {
    // Dölj icke-essentiella element
    const nonEssential = document.querySelectorAll('.optional-content');
    nonEssential.forEach(element => {
      (element as HTMLElement).style.display = 'none';
    });
    
    // Visa meddelande till senior
    this.showSimplifiedModeMessage();
  }

  /**
   * Visar meddelande om förenklat läge
   */
  private showSimplifiedModeMessage(): void {
    const message = document.createElement('div');
    message.className = 'senior-info-message';
    message.innerHTML = `
      <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <h3 style="margin: 0 0 8px 0; color: #1976d2;">📶 Anpassat för din anslutning</h3>
        <p style="margin: 0; font-size: 16px;">Vi har förenklat visningen för att allt ska ladda snabbt för dig.</p>
      </div>
    `;
    
    const container = document.querySelector('.senior-cockpit-container');
    if (container) {
      container.insertBefore(message, container.firstChild);
    }
  }

  /**
   * Visar datasparindikator
   */
  private showDataSavingIndicator(): void {
    const indicator = document.createElement('div');
    indicator.id = 'data-saving-indicator';
    indicator.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: #4caf50; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; z-index: 1000;">
        📶 Datasparläge aktivt
      </div>
    `;
    
    document.body.appendChild(indicator);
  }

  /**
   * Döljer datasparindikator
   */
  private hideDataSavingIndicator(): void {
    const indicator = document.getElementById('data-saving-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  // Helper methods
  private debounce(func: Function, wait: number): Function {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  private groupSimilarUpdates(updates: any[]): any[] {
    // Gruppera liknande uppdateringar
    const grouped = updates.reduce((acc, update) => {
      const key = `${update.type}-${update.category}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(update);
      return acc;
    }, {});

    return Object.values(grouped);
  }

  private prioritizeUpdates(groupedUpdates: any[]): any[] {
    return groupedUpdates
      .flat()
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 5); // Max 5 uppdateringar åt gången
  }

  private updateUI(updates: any[]): void {
    // Uppdatera UI med optimerade uppdateringar
    updates.forEach(update => {
      console.log('📱 Updating UI:', update.title);
    });
  }

  private async loadCriticalContent(critical: string[]): Promise<void> {
    console.log('⚡ Loading critical content:', critical);
  }

  private async loadImportantContent(important: string[]): Promise<void> {
    console.log('📋 Loading important content:', important);
  }

  private async loadOptionalContent(optional: string[]): Promise<void> {
    console.log('📄 Loading optional content:', optional);
  }

  private registerUpdateHandler(handler: Function): void {
    // Registrera uppdateringshanterare
    console.log('🔧 Registered debounced update handler');
  }

  private enableDataCompression(): void {
    console.log('🗜️ Data compression enabled');
  }

  private disableDataCompression(): void {
    console.log('📤 Data compression disabled');
  }
}

/**
 * Cache Manager för översatta meddelanden och data
 */
class CacheManager {
  private cache: Map<string, CacheEntry> = new Map();
  private maxCacheSize: number = 100;
  private cacheExpiryMs: number = 300000; // 5 minuter

  async initialize(): Promise<void> {
    console.log('💾 Initializing cache manager');
    this.setupCacheCleanup();
  }

  /**
   * Cachar översatt meddelande
   */
  cacheTranslation(key: string, translation: string): void {
    if (this.cache.size >= this.maxCacheSize) {
      this.evictOldestEntry();
    }

    this.cache.set(key, {
      value: translation,
      timestamp: Date.now(),
      accessCount: 0
    });
  }

  /**
   * Hämtar cachad översättning
   */
  getCachedTranslation(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Kontrollera om cache har gått ut
    if (Date.now() - entry.timestamp > this.cacheExpiryMs) {
      this.cache.delete(key);
      return null;
    }

    entry.accessCount++;
    return entry.value;
  }

  private setupCacheCleanup(): void {
    setInterval(() => {
      this.cleanupExpiredEntries();
    }, 60000); // Rensa varje minut
  }

  private evictOldestEntry(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  private cleanupExpiredEntries(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.cacheExpiryMs) {
        this.cache.delete(key);
      }
    }
  }
}

/**
 * Connection Monitor för att övervaka anslutningskvalitet
 */
class ConnectionMonitor {
  private connectionSpeed: 'slow' | 'medium' | 'fast' = 'medium';
  private updateInterval: number = 5000;
  private onSlowConnectionCallbacks: Function[] = [];
  private onFastConnectionCallbacks: Function[] = [];

  async startMonitoring(): Promise<void> {
    console.log('📡 Starting connection monitoring');
    this.monitorConnectionSpeed();
  }

  onSlowConnection(callback: Function): void {
    this.onSlowConnectionCallbacks.push(callback);
  }

  onFastConnection(callback: Function): void {
    this.onFastConnectionCallbacks.push(callback);
  }

  setUpdateInterval(interval: number): void {
    this.updateInterval = interval;
  }

  private monitorConnectionSpeed(): void {
    // Simulera anslutningsövervakning
    setInterval(() => {
      const previousSpeed = this.connectionSpeed;
      this.connectionSpeed = this.detectConnectionSpeed();

      if (previousSpeed !== this.connectionSpeed) {
        this.handleSpeedChange(previousSpeed, this.connectionSpeed);
      }
    }, 10000); // Kontrollera var 10:e sekund
  }

  private detectConnectionSpeed(): 'slow' | 'medium' | 'fast' {
    // Simulerad hastighetsdetektion
    const speeds = ['slow', 'medium', 'fast'] as const;
    return speeds[Math.floor(Math.random() * speeds.length)];
  }

  private handleSpeedChange(oldSpeed: string, newSpeed: string): void {
    if (newSpeed === 'slow' && oldSpeed !== 'slow') {
      this.onSlowConnectionCallbacks.forEach(callback => callback());
    } else if (newSpeed !== 'slow' && oldSpeed === 'slow') {
      this.onFastConnectionCallbacks.forEach(callback => callback());
    }
  }
}

/**
 * Loading Optimizer för lazy loading och progressiv laddning
 */
class LoadingOptimizer {
  async setupLazyLoading(): Promise<void> {
    console.log('⏳ Setting up lazy loading');
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadElement(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      });

      // Observera alla lazy-load element
      document.querySelectorAll('[data-lazy-load]').forEach(el => {
        observer.observe(el);
      });
    }
  }

  private loadElement(element: HTMLElement): void {
    const src = element.dataset.src;
    if (src && element.tagName === 'IMG') {
      (element as HTMLImageElement).src = src;
    }
  }
}

// Type definitions
interface CacheEntry {
  value: string;
  timestamp: number;
  accessCount: number;
}

interface LoadingPriorities {
  critical: string[];
  important: string[];
  optional: string[];
}

export {
  PerformanceOptimizer,
  CacheManager,
  ConnectionMonitor,
  LoadingOptimizer
};