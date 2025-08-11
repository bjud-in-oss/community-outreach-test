// MASTER PLAN 2.0: Intelligent Platform Selector
// Väljer optimal plattform och verktyg baserat på senior-behov

import { SeniorUserProfile, EmotionalResponse } from '../../shared/types.js';

export interface PlatformAnalysis {
  complexity: 'simple' | 'medium' | 'advanced';
  performanceNeeds: 'low' | 'medium' | 'high';
  platformPreference: 'web' | 'desktop' | 'mobile' | 'any';
  offlineRequired: boolean;
  distributionNeeds: 'personal' | 'family' | 'public';
  technicalConstraints: string[];
}

export interface PlatformRecommendation {
  primaryPlatform: string;
  fallbackPlatforms: string[];
  toolChain: string[];
  estimatedComplexity: number; // 1-10
  seniorFriendliness: number; // 1-10
  reasoning: string;
  implementationSteps: string[];
}

export interface AvailablePlatform {
  name: string;
  type: 'web' | 'desktop' | 'mobile' | 'script' | 'game';
  complexity: number; // 1-10
  seniorFriendliness: number; // 1-10
  capabilities: string[];
  limitations: string[];
  cost: 'free' | 'freemium' | 'paid';
  deploymentMethod: string;
}

/**
 * Intelligent Platform Selector för Master Plan 2.0
 * Analyserar senior-behov och väljer optimal teknisk lösning
 */
export class PlatformSelector {
  
  private availablePlatforms: AvailablePlatform[] = [
    {
      name: 'PWA (Progressive Web App)',
      type: 'web',
      complexity: 2,
      seniorFriendliness: 9,
      capabilities: ['offline', 'desktop-like', 'auto-update', 'cross-platform'],
      limitations: ['limited-system-access', 'browser-dependent'],
      cost: 'free',
      deploymentMethod: 'web-install'
    },
    {
      name: 'Electron Desktop App',
      type: 'desktop',
      complexity: 4,
      seniorFriendliness: 8,
      capabilities: ['full-system-access', 'native-feel', 'offline', 'file-system'],
      limitations: ['larger-size', 'platform-specific-builds'],
      cost: 'free',
      deploymentMethod: 'download-install'
    },
    {
      name: 'React Native Mobile App',
      type: 'mobile',
      complexity: 5,
      seniorFriendliness: 7,
      capabilities: ['native-mobile', 'app-store', 'device-features', 'offline'],
      limitations: ['mobile-only', 'app-store-approval'],
      cost: 'freemium',
      deploymentMethod: 'app-store'
    },
    {
      name: 'Flutter Cross-Platform',
      type: 'mobile',
      complexity: 6,
      seniorFriendliness: 7,
      capabilities: ['cross-platform', 'native-performance', 'single-codebase'],
      limitations: ['learning-curve', 'larger-apps'],
      cost: 'free',
      deploymentMethod: 'multi-platform'
    },
    {
      name: 'Python Desktop Script',
      type: 'script',
      complexity: 3,
      seniorFriendliness: 8,
      capabilities: ['automation', 'simple-gui', 'file-processing', 'system-integration'],
      limitations: ['python-required', 'basic-ui'],
      cost: 'free',
      deploymentMethod: 'executable'
    },
    {
      name: 'Godot Game Engine',
      type: 'game',
      complexity: 7,
      seniorFriendliness: 6,
      capabilities: ['2d-3d-games', 'interactive-apps', 'visual-scripting'],
      limitations: ['game-focused', 'learning-curve'],
      cost: 'free',
      deploymentMethod: 'executable'
    }
  ];

  /**
   * Analysera senior-request och rekommendera plattform
   */
  async recommendPlatform(
    seniorRequest: string,
    seniorProfile: SeniorUserProfile
  ): Promise<PlatformRecommendation> {
    
    // Analysera vad senioren egentligen vill ha
    const analysis = await this.analyzeSeniorRequest(seniorRequest, seniorProfile);
    
    // Hitta bästa plattformen
    const rankedPlatforms = this.rankPlatforms(analysis, seniorProfile);
    
    // Skapa rekommendation
    const recommendation = this.createRecommendation(
      rankedPlatforms, 
      analysis, 
      seniorProfile
    );
    
    return recommendation;
  }

  /**
   * Analysera senior-request för tekniska behov
   */
  private async analyzeSeniorRequest(
    request: string,
    seniorProfile: SeniorUserProfile
  ): Promise<PlatformAnalysis> {
    
    const requestLower = request.toLowerCase();
    
    // Bestäm komplexitet
    let complexity: 'simple' | 'medium' | 'advanced' = 'simple';
    if (requestLower.includes('databas') || requestLower.includes('avancerad')) {
      complexity = 'advanced';
    } else if (requestLower.includes('flera') || requestLower.includes('komplex')) {
      complexity = 'medium';
    }
    
    // Anpassa baserat på senior-profil
    if (seniorProfile.techComfort === 'beginner') {
      complexity = 'simple'; // Alltid förenkla för nybörjare
    }
    
    // Prestanda-behov
    let performanceNeeds: 'low' | 'medium' | 'high' = 'low';
    if (requestLower.includes('snabb') || requestLower.includes('prestanda')) {
      performanceNeeds = 'high';
    } else if (requestLower.includes('bild') || requestLower.includes('video')) {
      performanceNeeds = 'medium';
    }
    
    // Plattforms-preferens
    let platformPreference: 'web' | 'desktop' | 'mobile' | 'any' = 'any';
    if (requestLower.includes('mobil') || requestLower.includes('telefon')) {
      platformPreference = 'mobile';
    } else if (requestLower.includes('dator') || requestLower.includes('skrivbord')) {
      platformPreference = 'desktop';
    } else if (requestLower.includes('hemsida') || requestLower.includes('webb')) {
      platformPreference = 'web';
    }
    
    // Offline-behov (seniorer har ofta dålig internetuppkoppling)
    const offlineRequired = seniorProfile.techComfort === 'beginner' || 
                           requestLower.includes('offline') ||
                           requestLower.includes('utan internet');
    
    // Distributions-behov
    let distributionNeeds: 'personal' | 'family' | 'public' = 'personal';
    if (requestLower.includes('familj') || requestLower.includes('dela')) {
      distributionNeeds = 'family';
    } else if (requestLower.includes('alla') || requestLower.includes('offentlig')) {
      distributionNeeds = 'public';
    }
    
    // Tekniska begränsningar
    const technicalConstraints = [];
    if (seniorProfile.techComfort === 'beginner') {
      technicalConstraints.push('no-installation', 'simple-ui', 'auto-update');
    }
    if (seniorProfile.age > 75) {
      technicalConstraints.push('large-buttons', 'high-contrast', 'simple-navigation');
    }
    
    return {
      complexity,
      performanceNeeds,
      platformPreference,
      offlineRequired,
      distributionNeeds,
      technicalConstraints
    };
  }

  /**
   * Ranka tillgängliga plattformar baserat på analys
   */
  private rankPlatforms(
    analysis: PlatformAnalysis,
    seniorProfile: SeniorUserProfile
  ): AvailablePlatform[] {
    
    return this.availablePlatforms
      .map(platform => ({
        ...platform,
        score: this.calculatePlatformScore(platform, analysis, seniorProfile)
      }))
      .sort((a, b) => b.score - a.score);
  }

  /**
   * Beräkna score för en plattform
   */
  private calculatePlatformScore(
    platform: AvailablePlatform,
    analysis: PlatformAnalysis,
    seniorProfile: SeniorUserProfile
  ): number {
    
    let score = 0;
    
    // Senior-vänlighet är viktigast (40% av score)
    score += platform.seniorFriendliness * 4;
    
    // Låg komplexitet är viktigt (30% av score)
    score += (11 - platform.complexity) * 3;
    
    // Plattforms-matchning (20% av score)
    if (analysis.platformPreference === 'any' || 
        platform.type === analysis.platformPreference) {
      score += 20;
    }
    
    // Offline-stöd för seniorer (10% av score)
    if (analysis.offlineRequired && platform.capabilities.includes('offline')) {
      score += 10;
    }
    
    // Bonus för gratis lösningar
    if (platform.cost === 'free') {
      score += 5;
    }
    
    // Straff för komplexa lösningar för nybörjare
    if (seniorProfile.techComfort === 'beginner' && platform.complexity > 5) {
      score -= 15;
    }
    
    // Bonus för PWA (vår rekommenderade lösning)
    if (platform.name.includes('PWA')) {
      score += 8;
    }
    
    return score;
  }

  /**
   * Skapa slutlig rekommendation
   */
  private createRecommendation(
    rankedPlatforms: any[],
    analysis: PlatformAnalysis,
    seniorProfile: SeniorUserProfile
  ): PlatformRecommendation {
    
    const primary = rankedPlatforms[0];
    const fallbacks = rankedPlatforms.slice(1, 4).map(p => p.name);
    
    // Välj verktygskedja baserat på plattform
    const toolChain = this.selectToolChain(primary.name, analysis);
    
    // Beräkna komplexitet och senior-vänlighet
    const estimatedComplexity = Math.max(1, primary.complexity - (seniorProfile.techComfort === 'advanced' ? 2 : 0));
    const seniorFriendliness = primary.seniorFriendliness;
    
    // Skapa reasoning
    const reasoning = this.generateReasoning(primary, analysis, seniorProfile);
    
    // Skapa implementation steps
    const implementationSteps = this.generateImplementationSteps(primary, analysis);
    
    return {
      primaryPlatform: primary.name,
      fallbackPlatforms: fallbacks,
      toolChain,
      estimatedComplexity,
      seniorFriendliness,
      reasoning,
      implementationSteps
    };
  }

  /**
   * Välj verktygskedja för plattform
   */
  private selectToolChain(platformName: string, analysis: PlatformAnalysis): string[] {
    
    const baseTools = ['jules', 'groq', 'gemini'];
    
    if (platformName.includes('PWA')) {
      return [...baseTools, 'pwa-generator', 'vercel', 'service-worker'];
    } else if (platformName.includes('Electron')) {
      return [...baseTools, 'electron', 'github-actions', 'auto-updater'];
    } else if (platformName.includes('React Native')) {
      return [...baseTools, 'react-native', 'expo', 'app-store-connect'];
    } else if (platformName.includes('Flutter')) {
      return [...baseTools, 'flutter', 'dart', 'firebase'];
    } else if (platformName.includes('Python')) {
      return [...baseTools, 'python', 'tkinter', 'pyinstaller'];
    } else if (platformName.includes('Godot')) {
      return [...baseTools, 'godot', 'gdscript', 'export-templates'];
    }
    
    return baseTools;
  }

  /**
   * Generera reasoning för rekommendation
   */
  private generateReasoning(
    platform: any,
    analysis: PlatformAnalysis,
    seniorProfile: SeniorUserProfile
  ): string {
    
    const reasons = [];
    
    // Senior-vänlighet
    if (platform.seniorFriendliness >= 8) {
      reasons.push(`Mycket senior-vänlig (${platform.seniorFriendliness}/10)`);
    }
    
    // Komplexitet
    if (platform.complexity <= 3) {
      reasons.push(`Låg teknisk komplexitet (${platform.complexity}/10)`);
    }
    
    // Kostnad
    if (platform.cost === 'free') {
      reasons.push('Helt gratis att använda');
    }
    
    // Plattforms-specifika fördelar
    if (platform.name.includes('PWA')) {
      reasons.push('Fungerar som desktop-app utan installation');
    } else if (platform.name.includes('Electron')) {
      reasons.push('Riktig desktop-applikation med full funktionalitet');
    } else if (platform.name.includes('Python')) {
      reasons.push('Perfekt för automation och enkla verktyg');
    }
    
    // Senior-profil anpassning
    if (seniorProfile.techComfort === 'beginner') {
      reasons.push('Anpassad för nybörjare inom teknik');
    }
    
    return reasons.join(', ');
  }

  /**
   * Generera implementation steps
   */
  private generateImplementationSteps(platform: any, analysis: PlatformAnalysis): string[] {
    
    const baseSteps = [
      'Analysera senior-krav i detalj',
      'Skapa senior-vänlig design',
      'Implementera kärnfunktionalitet'
    ];
    
    if (platform.name.includes('PWA')) {
      return [
        ...baseSteps,
        'Skapa PWA manifest för desktop-känsla',
        'Implementera service worker för offline-funktionalitet',
        'Testa installation på olika webbläsare',
        'Skapa senior-vänliga installationsinstruktioner'
      ];
    } else if (platform.name.includes('Electron')) {
      return [
        ...baseSteps,
        'Sätt upp Electron build-process',
        'Konfigurera auto-updater',
        'Skapa installer för Windows/Mac',
        'Testa på målplattformar'
      ];
    } else if (platform.name.includes('Python')) {
      return [
        ...baseSteps,
        'Skapa Python GUI med tkinter',
        'Testa på målsystem',
        'Kompilera till executable med PyInstaller',
        'Skapa enkel installer'
      ];
    }
    
    return [
      ...baseSteps,
      'Implementera plattforms-specifik funktionalitet',
      'Testa med senior-användare',
      'Optimera för målplattform',
      'Skapa distribution-paket'
    ];
  }

  /**
   * Få detaljerad plattforms-information
   */
  getPlatformDetails(platformName: string): AvailablePlatform | undefined {
    return this.availablePlatforms.find(p => p.name === platformName);
  }

  /**
   * Lista alla tillgängliga plattformar
   */
  getAllPlatforms(): AvailablePlatform[] {
    return this.availablePlatforms;
  }
}

export default PlatformSelector;