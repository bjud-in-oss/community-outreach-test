# Design Document

## Overview

The Gratis Senior Onboarding system solves the critical "cold start" problem by providing a zero-installation web-based entry point that gradually enhances capabilities. The design prioritizes family relationships as the primary support mechanism and uses progressive enhancement to move from simple web-based guidance to full browser automation.

**KRITISK INSIKT:** Onboarding är den enda tekniska aspekten som inte kan vara helt dold från seniorer. Men samma onboarding-system kan återanvändas för alla tekniska val, vilket gör det till en investering som lönar sig över tid.

## Architecture

### Progressive Enhancement Phases

#### **CRAWL Phase: Zero-Installation Web Portal**
- **Entry Point**: Simple web link (e.g., `hjälp.senior.se`)
- **Technology**: Pure web-based, works in any browser
- **Capability**: Basic guidance overlays, form explanations
- **Support**: Family members can easily help using the same interface

#### **WALK Phase: Enhanced Web Tools**
- **Entry Point**: Browser bookmarklet (drag-and-drop installation)
- **Technology**: JavaScript bookmarklet that injects guidance
- **Capability**: Cross-site guidance, form auto-fill suggestions
- **Support**: Grandchildren can install bookmarklet in 30 seconds

#### **RUN Phase: Browser Extension**
- **Entry Point**: Guided extension installation with family help
- **Technology**: Cross-platform browser extension
- **Capability**: Full automation, intelligent form filling
- **Support**: Extension provides installation guidance for family helpers

#### **FLY Phase: Full Automation Suite**
- **Entry Point**: Advanced features unlock after comfort is established
- **Technology**: Full Puppeteer integration, AI-powered assistance
- **Capability**: Complete service setup automation
- **Support**: Community network of experienced users

## Components and Interfaces

### 1. Zero-Installation Web Portal (CRAWL)

#### **Core Components:**
```typescript
interface CrawlPortal {
  // Simple web page that works everywhere
  guidanceOverlay: WebBasedOverlay;
  formExplainer: PlainLanguageTranslator;
  familyHelper: FamilyGuidanceInterface;
  progressTracker: SimpleProgressDisplay;
}

class WebBasedOverlay {
  // No installation required - pure web technology
  showGuidance(targetSite: string): void;
  explainFormField(fieldType: string): string;
  highlightNextStep(): void;
  celebrateSuccess(): void;
}
```

#### **Family Helper Interface:**
```typescript
interface FamilyGuidanceInterface {
  // Instructions for grandchildren/family members
  getHelperInstructions(task: string): FamilyInstructions;
  showSeniorProgress(seniorId: string): ProgressView;
  enableRemoteGuidance(): RemoteHelpSession;
}

interface FamilyInstructions {
  title: string; // "Hjälp morfar skapa email"
  steps: SimpleStep[]; // ["Klicka här", "Skriv morfars namn"]
  troubleshooting: CommonProblem[]; // "Om det står 'error'..."
}
```

### 2. Progressive Enhancement Engine

#### **Phase Detection:**
```typescript
class ProgressiveEnhancer {
  detectCurrentPhase(user: SeniorUser): Phase {
    if (!user.hasUsedBefore) return Phase.CRAWL;
    if (user.comfortLevel < 3) return Phase.WALK;
    if (user.hasExtension) return Phase.RUN;
    return Phase.FLY;
  }
  
  suggestUpgrade(currentPhase: Phase): UpgradeOption {
    return {
      nextPhase: getNextPhase(currentPhase),
      benefits: explainBenefits(nextPhase),
      installationHelp: getFamilyInstructions(nextPhase)
    };
  }
}
```

### 3. Service Integration Strategy

#### **Free Service Hierarchy:**
```typescript
interface ServiceHierarchy {
  foundation: {
    email: ['Gmail', 'Outlook']; // Required first
    storage: ['Google Drive', 'OneDrive']; // Builds on email
  };
  
  communication: {
    messaging: ['WhatsApp Web']; // Uses phone number
    video: ['Zoom Free', 'Google Meet']; // Uses email
  };
  
  creation: {
    websites: ['GitHub Pages', 'Netlify']; // Uses email
    documents: ['Google Docs', 'Office Online']; // Uses storage
  };
}
```

#### **Smart Service Selection:**
```typescript
class ServiceSelector {
  selectBestService(category: string, seniorProfile: SeniorProfile): Service {
    const options = getAvailableServices(category);
    return options
      .filter(service => service.permanentlyFree)
      .filter(service => service.dailyQuotaAcceptable)
      .sort((a, b) => a.complexityScore - b.complexityScore)[0];
  }
}
```

## Data Models

### Senior Profile
```typescript
interface SeniorProfile {
  id: string;
  name: string;
  currentPhase: 'CRAWL' | 'WALK' | 'RUN' | 'FLY';
  comfortLevel: number; // 1-10 scale
  completedServices: CompletedService[];
  familyHelpers: FamilyMember[];
  preferredLanguage: 'sv' | 'en' | 'no' | 'da' | 'fi';
  deviceTypes: ('mobile' | 'tablet' | 'desktop')[];
}

interface CompletedService {
  serviceName: string;
  completedAt: Date;
  helpedBy?: 'family' | 'community' | 'self';
  difficultyRating: number; // Senior's feedback
  notes?: string; // What worked well
}

interface FamilyMember {
  name: string;
  relationship: 'grandchild' | 'child' | 'friend' | 'neighbor';
  techComfort: number; // 1-10 scale
  availableFor: 'installation' | 'guidance' | 'troubleshooting';
  contactMethod: 'phone' | 'email' | 'in-person';
}
```

### Service Configuration
```typescript
interface ServiceConfig {
  name: string;
  category: 'email' | 'storage' | 'communication' | 'creation';
  permanentlyFree: boolean;
  dailyQuota?: {
    limit: number;
    resetTime: string;
    seniorFriendlyExplanation: string;
  };
  complexityScore: number; // 1-10, lower is simpler
  prerequisites: string[]; // Other services needed first
  automationSupport: {
    crawl: boolean; // Can guide manually
    walk: boolean; // Can use bookmarklet
    run: boolean; // Can automate with extension
    fly: boolean; // Full automation available
  };
}
```

## Error Handling

### Graceful Degradation Strategy
```typescript
class ErrorHandler {
  handleServiceUnavailable(service: string): Recovery {
    const alternatives = this.getAlternatives(service);
    return {
      message: `${service} är inte tillgänglig just nu. Ska vi prova ${alternatives[0]} istället?`,
      alternatives: alternatives,
      canContinueLater: true,
      familyHelpSuggested: alternatives.length === 0
    };
  }
  
  handleAutomationFailure(phase: Phase): Fallback {
    const lowerPhase = this.getPreviousPhase(phase);
    return {
      message: "Det blev lite krångligt. Ska vi prova på ett enklare sätt?",
      fallbackPhase: lowerPhase,
      familyHelpRecommended: phase === 'CRAWL' // If even CRAWL fails, suggest family
    };
  }
}
```

### Family Support Integration
```typescript
class FamilySupport {
  requestFamilyHelp(senior: SeniorProfile, task: string): HelpRequest {
    const availableHelpers = senior.familyHelpers
      .filter(helper => helper.availableFor.includes(task))
      .sort((a, b) => b.techComfort - a.techComfort);
    
    return {
      message: `Vill du be ${availableHelpers[0].name} om hjälp med detta?`,
      helperInstructions: this.generateHelperGuide(task),
      seniorInstructions: this.generateSeniorGuide(task),
      estimatedTime: this.estimateTaskTime(task)
    };
  }
}
```

## Testing Strategy

### Phase-Based Testing
```typescript
interface TestStrategy {
  crawlPhase: {
    // Test zero-installation functionality
    webPortalAccessibility: boolean;
    crossBrowserCompatibility: boolean;
    mobileResponsiveness: boolean;
    familyHelperInterface: boolean;
  };
  
  walkPhase: {
    // Test bookmarklet functionality
    bookmarkletInstallation: boolean;
    crossSiteGuidance: boolean;
    formAutoFillSuggestions: boolean;
  };
  
  runPhase: {
    // Test browser extension
    extensionInstallation: boolean;
    automationCapabilities: boolean;
    crossPlatformConsistency: boolean;
  };
  
  flyPhase: {
    // Test full automation
    puppeteerIntegration: boolean;
    aiPoweredAssistance: boolean;
    communitySupport: boolean;
  };
}
```

### Senior User Testing
```typescript
interface SeniorTestingFramework {
  testWithRealSeniors: {
    ageRange: '65-85';
    techComfort: 'low' | 'medium';
    familySupport: 'available' | 'limited' | 'none';
    devices: ('smartphone' | 'tablet' | 'computer')[];
  };
  
  successMetrics: {
    completionRate: number; // % who complete onboarding
    familyInvolvement: number; // % who get family help
    phaseProgression: number; // % who advance to next phase
    satisfactionScore: number; // 1-10 rating
  };
}
```

## Implementation Alternatives to Puppeteer

### Simpler Automation Options

#### **1. Browser Bookmarklets (WALK Phase)**
```javascript
// Drag-and-drop installation, works everywhere
javascript:(function(){
  // Inject guidance overlay
  const overlay = document.createElement('div');
  overlay.innerHTML = 'Guidance content here';
  document.body.appendChild(overlay);
})();
```

#### **2. Web-Based Form Assistance (CRAWL Phase)**
```typescript
// No installation required
class WebFormAssistant {
  // Runs entirely in the browser, no extensions needed
  analyzeCurrentPage(): FormGuidance {
    const forms = document.querySelectorAll('form');
    return this.generateGuidance(forms);
  }
  
  provideRealTimeHelp(element: HTMLElement): string {
    // Plain language explanation of form fields
    return this.translateToPlainLanguage(element);
  }
}
```

#### **3. Progressive Web App (PWA)**
```typescript
// Installable like an app, but still web-based
interface PWACapabilities {
  offlineSupport: boolean;
  pushNotifications: boolean; // Remind seniors of next steps
  homeScreenIcon: boolean; // Easy access
  fullScreenMode: boolean; // Less confusing interface
}
```

### Zero-Installation Solutions

#### **1. QR Code Entry Point**
- Family member scans QR code on senior's device
- Instantly opens guidance portal
- No typing of URLs required

#### **2. SMS/WhatsApp Integration**
- Send link via text message
- Senior clicks link to start
- Works on any device with messaging

#### **3. Voice-Activated Setup**
- "Hey Google, help me set up email"
- Integrates with existing voice assistants
- Familiar interface for many seniors

## Critical Success Factors

### 1. Family Engagement Strategy
- Make it easier for grandchildren to help than to avoid helping
- Provide clear, simple instructions for family helpers
- Celebrate family collaboration in the setup process

### 2. Zero-Friction Entry
- No downloads, installations, or account creation required initially
- Works immediately in any browser on any device
- Clear, large buttons and simple language from first contact

### 3. Progressive Trust Building
- Start with completely safe, reversible actions
- Build confidence through small successes
- Only introduce more complex features after trust is established

### 4. Cultural Sensitivity
- Recognize that seniors may prefer family help over stranger support
- Respect the pace at which seniors want to learn
- Provide options for different comfort levels with technology

This design creates a pathway from zero technical knowledge to full automation capabilities, with family relationships as the primary support mechanism and progressive enhancement ensuring no one gets left behind.