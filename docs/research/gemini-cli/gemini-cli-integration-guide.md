# Gemini CLI Integration Guide - RAW Documentation

**Källa**: Baserat på befintlig gemini-cli-core dokumentation  
**Skapad**: 2024-08-11  
**Syfte**: Integration guide för Gemini CLI i vårt dubbelt medvetandesystem

---

# Gemini CLI Integration för Community Outreach Builder

## Översikt

Gemini CLI är ett kommandoradsverktyg för att interagera med Google's Gemini AI-modeller. I vårt dubbelt medvetandesystem används det som en del av kärn-agenten för teknisk implementation.

## Installation och Setup

```bash
# Installation via npm
npm install -g @google/gemini-cli

# Eller via uvx (rekommenderat för Python-miljöer)
uvx @google/gemini-cli

# Konfigurera API-nyckel
export GEMINI_API_KEY="your-api-key-here"
```

## Integration i Dubbelt Medvetandesystem

### Kärn-agenten (Backend):
```typescript
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class GeminiCLIIntegration {
  async generateCode(prompt: string): Promise<string> {
    const command = `gemini-cli generate --model=gemini-2.5-pro --prompt="${prompt}"`;
    const { stdout } = await execAsync(command);
    return stdout.trim();
  }
  
  async analyzeCode(filePath: string): Promise<string> {
    const command = `gemini-cli analyze --file="${filePath}" --model=gemini-2.5-pro`;
    const { stdout } = await execAsync(command);
    return stdout.trim();
  }
  
  async optimizeForSeniors(code: string): Promise<string> {
    const prompt = `
      Optimera denna kod för senior-användare:
      - Större knappar (min 44px)
      - Tydligare text
      - Enklare navigation
      - Hög kontrast
      
      Kod: ${code}
    `;
    
    return await this.generateCode(prompt);
  }
}
```

### Communication Bridge:
```typescript
class GeminiCommunicationBridge {
  async translateTechnicalToSenior(technicalContent: string): Promise<string> {
    const prompt = `
      Översätt denna tekniska information till senior-vänligt språk:
      - Inga tekniska termer
      - Enkla förklaringar
      - Fokus på vad användaren kan göra
      
      Tekniskt innehåll: ${technicalContent}
    `;
    
    const command = `gemini-cli generate --model=gemini-2.5-pro --prompt="${prompt}"`;
    const { stdout } = await execAsync(command);
    return stdout.trim();
  }
}
```

## Användningsfall i Master Plan

### Fas 1 (WALK) - Grundläggande Integration:
- Kodgenerering för grundläggande komponenter
- Teknisk dokumentation till senior-språk
- Grundläggande AI-assistans

### Fas 2 (RUN) - Avancerad Funktionalitet:
- WYSIWYG komponent-generering
- Senior-optimerad kod-analys
- Automatisk tillgänglighetsförbättringar

### Fas 3 (FLY) - Metakognitiva Förmågor:
- Självanalys av genererad kod
- Automatisk förbättring baserat på användning
- Prediktiv kodgenerering

## Säkerhet och Guardrails

```typescript
class GeminiSafetyGuards {
  async validateGeneratedCode(code: string): Promise<boolean> {
    // Kontrollera att koden är säker för seniorer
    const dangerousPatterns = [
      'eval(',
      'innerHTML =',
      'document.write(',
      'window.location =',
    ];
    
    return !dangerousPatterns.some(pattern => code.includes(pattern));
  }
  
  async ensureAccessibility(code: string): Promise<string> {
    const prompt = `
      Kontrollera och förbättra tillgängligheten i denna kod:
      - ARIA-labels
      - Keyboard navigation
      - Screen reader support
      - Color contrast
      
      Kod: ${code}
    `;
    
    const command = `gemini-cli generate --model=gemini-2.5-pro --prompt="${prompt}"`;
    const { stdout } = await execAsync(command);
    return stdout.trim();
  }
}
```

## Best Practices

### 1. Rate Limiting:
```typescript
class RateLimitedGemini {
  private lastCall = 0;
  private minInterval = 1000; // 1 sekund mellan anrop
  
  async safeCall(command: string): Promise<string> {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCall;
    
    if (timeSinceLastCall < this.minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minInterval - timeSinceLastCall)
      );
    }
    
    this.lastCall = Date.now();
    const { stdout } = await execAsync(command);
    return stdout.trim();
  }
}
```

### 2. Error Handling:
```typescript
class RobustGeminiIntegration {
  async generateWithFallback(prompt: string): Promise<string> {
    try {
      return await this.generateCode(prompt);
    } catch (error) {
      console.warn('Gemini CLI failed, using fallback:', error);
      return this.getFallbackResponse(prompt);
    }
  }
  
  private getFallbackResponse(prompt: string): string {
    // Enkel fallback-logik för när Gemini inte är tillgängligt
    return "// Gemini CLI inte tillgängligt, använd manuell implementation";
  }
}
```

## Integration med Jules

```typescript
class JulesGeminiIntegration {
  async enhanceJulesTask(task: string): Promise<string> {
    const prompt = `
      Förbättra denna Jules automation task:
      - Gör den mer specifik
      - Lägg till error handling
      - Optimera för vårt dubbelt medvetandesystem
      
      Task: ${task}
    `;
    
    return await this.generateCode(prompt);
  }
}
```

---

## Koppling till Andra Dokument

- **v1.15 Intelligent Merge System**: Gemini CLI för merge-beslut
- **224 WYSIWYG Integration**: AI-genererade komponenter
- **Master Integration Plan**: Fas-baserad Gemini integration