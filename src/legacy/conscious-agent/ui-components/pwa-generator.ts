// MASTER PLAN 2.0: PWA Generator för Senior-Friendly Desktop Apps
// Skapar Progressive Web Apps som ser ut som riktiga desktop program

import { SeniorUserProfile, EmotionalResponse } from '../../shared/types.js';

export interface PWAConfig {
  appName: string;
  description: string;
  seniorFriendly: boolean;
  desktopLike: boolean;
  offlineCapable: boolean;
  autoUpdate: boolean;
}

export interface PWAManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui';
  background_color: string;
  theme_color: string;
  icons: PWAIcon[];
  categories: string[];
}

export interface PWAIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable' | 'monochrome';
}

/**
 * PWA Generator för Master Plan 2.0
 * Skapar desktop-liknande appar som körs i webbläsaren
 */
export class PWAGenerator {
  
  /**
   * Generera PWA från senior-vänlig beskrivning
   */
  async generateFromSeniorRequest(
    request: string, 
    seniorProfile: SeniorUserProfile
  ): Promise<{
    manifest: PWAManifest;
    serviceWorker: string;
    installInstructions: string;
    seniorExplanation: string;
  }> {
    
    // Analysera vad senioren vill ha
    const appAnalysis = await this.analyzeSeniorRequest(request, seniorProfile);
    
    // Skapa PWA manifest
    const manifest = this.createSeniorFriendlyManifest(appAnalysis);
    
    // Generera service worker för offline-funktionalitet
    const serviceWorker = this.generateServiceWorker(appAnalysis);
    
    // Skapa senior-vänliga installationsinstruktioner
    const installInstructions = this.createInstallInstructions(appAnalysis, seniorProfile);
    
    // Förklara för senioren vad som händer
    const seniorExplanation = this.createSeniorExplanation(appAnalysis);
    
    return {
      manifest,
      serviceWorker,
      installInstructions,
      seniorExplanation
    };
  }

  /**
   * Analysera vad senioren egentligen vill ha
   */
  private async analyzeSeniorRequest(
    request: string, 
    seniorProfile: SeniorUserProfile
  ): Promise<{
    appType: 'utility' | 'creative' | 'social' | 'health' | 'finance';
    complexity: 'simple' | 'medium' | 'advanced';
    desktopFeatures: string[];
    offlineNeeded: boolean;
    seniorPriorities: string[];
  }> {
    
    const requestLower = request.toLowerCase();
    
    // Identifiera app-typ
    let appType: 'utility' | 'creative' | 'social' | 'health' | 'finance' = 'utility';
    if (requestLower.includes('medicin') || requestLower.includes('hälsa')) {
      appType = 'health';
    } else if (requestLower.includes('foto') || requestLower.includes('bild')) {
      appType = 'creative';
    } else if (requestLower.includes('familj') || requestLower.includes('kontakt')) {
      appType = 'social';
    } else if (requestLower.includes('ekonomi') || requestLower.includes('budget')) {
      appType = 'finance';
    }
    
    // Bestäm komplexitet baserat på senior-profil
    const complexity = seniorProfile.techComfort === 'beginner' ? 'simple' : 
                      seniorProfile.techComfort === 'intermediate' ? 'medium' : 'advanced';
    
    // Desktop-funktioner som seniorer uppskattar
    const desktopFeatures = [
      'large-buttons',
      'clear-text',
      'simple-navigation',
      'auto-save',
      'backup-reminder'
    ];
    
    // Offline behövs ofta för seniorer (dålig internetuppkoppling)
    const offlineNeeded = true;
    
    // Senior-prioriteringar
    const seniorPriorities = [
      'enkelhet',
      'tillförlitlighet',
      'tydlig feedback',
      'hjälp-funktion',
      'säkerhet'
    ];
    
    return {
      appType,
      complexity,
      desktopFeatures,
      offlineNeeded,
      seniorPriorities
    };
  }

  /**
   * Skapa senior-vänligt PWA manifest
   */
  private createSeniorFriendlyManifest(analysis: any): PWAManifest {
    return {
      name: `${analysis.appType === 'health' ? 'Hälso' : 'Min'}-Assistent`,
      short_name: "MinApp",
      description: "Ett enkelt och användarvänligt program skapat speciellt för dig",
      start_url: "/",
      display: "standalone", // Ser ut som desktop app
      background_color: "#f0f8ff", // Lugn, senior-vänlig färg
      theme_color: "#4a90e2", // Tydlig men inte skrikig
      icons: [
        {
          src: "/icons/icon-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/icons/icon-512.png", 
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ],
      categories: ["productivity", "lifestyle", "health"]
    };
  }

  /**
   * Generera service worker för offline-funktionalitet
   */
  private generateServiceWorker(analysis: any): string {
    return `
// Service Worker för Senior-Friendly PWA
// Säkerställer att appen fungerar även utan internet

const CACHE_NAME = 'senior-app-v1';
const urlsToCache = [
  '/',
  '/styles/senior-friendly.css',
  '/scripts/app.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Installera service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Förbereder appen för offline-användning');
        return cache.addAll(urlsToCache);
      })
  );
});

// Hantera nätverksförfrågningar
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Returnera från cache om tillgängligt
        if (response) {
          return response;
        }
        
        // Annars försök hämta från nätet
        return fetch(event.request).catch(() => {
          // Om inget nätverk, visa vänlig offline-sida
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// Uppdatera cache när ny version finns
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Uppdaterar appen till senaste version');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;
  }

  /**
   * Skapa senior-vänliga installationsinstruktioner
   */
  private createInstallInstructions(analysis: any, seniorProfile: SeniorUserProfile): string {
    const browserInstructions = {
      chrome: `
1. Klicka på de tre prickarna (⋮) uppe till höger i webbläsaren
2. Välj "Installera [AppNamn]..." 
3. Klicka "Installera" i rutan som kommer upp
4. Nu finns ditt program på skrivbordet!
      `,
      edge: `
1. Klicka på de tre prickarna (...) uppe till höger
2. Välj "Appar" och sedan "Installera den här webbplatsen som en app"
3. Klicka "Installera"
4. Ditt program är nu installerat!
      `,
      safari: `
1. Klicka på "Dela" knappen (fyrkant med pil uppåt)
2. Välj "Lägg till på hemskärmen"
3. Klicka "Lägg till"
4. Nu finns appen på din hemskärm!
      `
    };

    return `
# Så här installerar du ditt program

## Det här är INTE svårt - följ bara stegen:

### För Windows/Chrome:
${browserInstructions.chrome}

### För Windows/Edge:
${browserInstructions.edge}

### För Mac/Safari:
${browserInstructions.safari}

## Vad händer efter installation?
- Ditt program får en egen ikon på skrivbordet
- Det öppnas i ett eget fönster (inte i webbläsaren)
- Det fungerar även när internet är dåligt
- Det uppdateras automatiskt när du öppnar det

## Behöver du hjälp?
Ring [supportnummer] så hjälper vi dig installera ditt program!
    `;
  }

  /**
   * Förklara för senioren vad som händer
   */
  private createSeniorExplanation(analysis: any): string {
    return `
# Ditt program är klart! 🎉

## Vad har vi skapat åt dig?
Vi har byggt ett **riktigt program** som fungerar på din dator, precis som du bad om.

## Hur fungerar det?
- **Det ser ut som ett vanligt program** med egen ikon och fönster
- **Det är säkert** - inga virus eller konstigheter
- **Det fungerar offline** - även när internet är dåligt
- **Det uppdateras själv** - du behöver aldrig oroa dig för nya versioner

## Vad är skillnaden från vanliga program?
- **Enklare installation** - bara några klick
- **Alltid uppdaterat** - inga krångliga uppdateringar
- **Säkrare** - kan inte skada din dator
- **Fungerar överallt** - på alla datorer och surfplattor

## Nästa steg:
1. **Testa programmet** genom att klicka runt
2. **Installera det** med instruktionerna ovan
3. **Använd det dagligen** - det blir bättre ju mer du använder det!

*Du har skapat något riktigt bra! 👏*
    `;
  }
}

export default PWAGenerator;