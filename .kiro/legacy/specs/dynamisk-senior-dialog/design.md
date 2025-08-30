# Design Document - Dynamisk Senior Dialog

**Datum:** 2025-08-14  
**Status:** 2🟡 SKAPAS - Hybrid navigation med intelligent verktygsekosystem  
**Syfte:** Designa hur statisk struktur + dynamisk dialog + automatiserade verktyg fungerar tillsammans  
**Relaterat:** requirements.md, 110_⏰1🟢_TID_TYDLIGHET_DIMENSIONER_250814_109.md

## Overview

Vi designar ett **verktygsekosystem** där varje verktyg är en specialist-agent som kan aktiveras både från statisk navigation och dynamisk dialog. Istället för att skapa requirements för varje verktyg, använder vi **verktygs-DNA** - en mall som gör alla verktyg konsekvent fantastiska.

## Architecture

### 🏗️ **Tre-Lagers Arkitektur**

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  ┌─────────────────┐              ┌─────────────────────┐   │
│  │  Statisk 2D     │ ←→ Hybrid ←→ │  Dynamisk Dialog    │   │
│  │  Navigation     │    Bridge    │  LLM-Agent          │   │
│  └─────────────────┘              └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   ORCHESTRATION LAYER                       │
│              ┌─────────────────────────────────┐            │
│              │     Verktygs-Orkestrator        │            │
│              │   (Tool Selection & Context)    │            │
│              └─────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                      TOOL ECOSYSTEM                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │Diagram  │ │Color    │ │Text     │ │File     │ │Custom   ││
│  │Agent    │ │Agent    │ │Agent    │ │Agent    │ │Agents   ││
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 🧬 **Verktygs-DNA (Universal Tool Template)**

Istället för individuella requirements för varje verktyg, använder vi denna mall:

```typescript
interface ToolDNA {
  // Identitet
  name: string;
  purpose: string;
  seniorFriendlyDescription: string;
  
  // Aktivering
  triggers: {
    keywords: string[];           // "färg", "diagram", "lista"
    contexts: Context[];          // När verktyget är relevant
    staticNavigation: Position[]; // Var i 2D-grid det aktiveras
  };
  
  // Senior-Interface
  interface: {
    inputMethod: 'dialog' | 'visual' | 'hybrid';
    outputFormat: 'visual' | 'text' | 'interactive';
    complexity: 'simple' | 'guided' | 'advanced';
  };
  
  // Automatisering
  automation: {
    autoSuggest: boolean;         // Föreslå verktyget automatiskt
    contextAware: boolean;        // Anpassa till användarens situation
    learningEnabled: boolean;     // Lär sig av användarens preferenser
  };
}
```

### 🎯 **Verktygs-Orkestrator**

Central intelligens som:
- **Känner igen** när ett verktyg behövs (från dialog eller statisk navigation)
- **Väljer rätt verktyg** baserat på kontext och användarpreferenser
- **Introducerar verktyget** på ett senior-vänligt sätt
- **Koordinerar** mellan flera verktyg när det behövs

### 🛠️ **Kända Verktyg (Utöver Kiro)**

#### **Kiro's Inbyggda Verktyg:**
- **Specs System** - Requirements/Design/Tasks strukturering
- **Agent Hooks** - Automatiserade workflows
- **MCP Integration** - Externa verktyg och API:er
- **Steering Documents** - AI-guidance och konsistens

#### **Verktygs-Kategorier (Kostnadsstrategi):**

```typescript
const toolCategories = {
  // 🟢 GRATIS & ÖPPEN KÄLLKOD (Prioritet 1)
  freeTools: {
    mermaid: "Gratis JS-bibliotek för diagram",
    excalidraw: "Gratis handritade diagram",
    colorhunt: "Gratis färgpaletter",
    unsplash: "Gratis bilder via API",
    markdown: "Inbyggd textformatering",
    html_canvas: "Inbyggd ritfunktion i webbläsare"
  },
  
  // 🟡 FREEMIUM MED GRATIS API-TIER (Prioritet 2)  
  freemiumTools: {
    deepl: "500 tecken/månad gratis",
    canva: "Begränsad gratis version",
    airtable: "1,200 records gratis",
    notion: "Personal use gratis",
    google_sheets: "Gratis med Google-konto"
  },
  
  // 🔴 BETALVERKTYG (Endast för Premium-användare)
  paidTools: {
    figma: "$12/månad för team-features",
    grammarly: "$12/månad för premium",
    lucidchart: "$8/månad",
    zapier: "$20/månad för automation",
    github_copilot: "$10/månad"
  },
  
  // 🔵 EGEN IMPLEMENTATION (Bästa lösningen)
  customBuilt: {
    simple_diagram: "Egen Mermaid-wrapper",
    color_picker: "Egen färgväljare",
    text_editor: "Egen markdown-editor",
    file_manager: "Egen filhantering",
    chat_interface: "Egen LLM-integration"
  }
};
```

#### **Kostnadsstrategi för Seniorer:**

```typescript
const costStrategy = {
  // Fas 1: 100% Gratis (Grundfunktionalitet)
  phase1: {
    budget: "0 kr/månad",
    tools: ["mermaid", "excalidraw", "colorhunt", "markdown", "canvas"],
    coverage: "80% av användarnas behov"
  },
  
  // Fas 2: Freemium (Utökad funktionalitet)  
  phase2: {
    budget: "0-50 kr/månad per användare",
    tools: ["deepl_free", "canva_free", "notion_free"],
    coverage: "95% av användarnas behov"
  },
  
  // Fas 3: Premium (Avancerade funktioner)
  phase3: {
    budget: "100-200 kr/månad per användare",
    tools: ["figma", "grammarly", "zapier"],
    coverage: "100% + avancerade funktioner"
  }
};
```

## Data Models

### 🗂️ **Verktygs-Kontext Model**

```typescript
interface ToolContext {
  // Användarens nuvarande situation
  currentPosition: {
    time: 1 | 2 | 3 | 4 | 5 | 6;     // Idé → Test
    clarity: 1 | 2 | 3 | 4;          // Vagt → Kristallklart
  };
  
  // Projektinformation
  project: {
    type: 'family' | 'church' | 'personal' | 'community';
    complexity: 'simple' | 'medium' | 'complex';
    timeline: 'urgent' | 'normal' | 'flexible';
  };
  
  // Användarens preferenser
  user: {
    techComfort: 'low' | 'medium' | 'high';
    preferredInterface: 'dialog' | 'visual' | 'hybrid';
    previousTools: string[];
    learningStyle: 'visual' | 'auditory' | 'kinesthetic';
  };
  
  // Dialog-historik
  conversation: {
    recentTopics: string[];
    currentFocus: string;
    emotionalState: 'excited' | 'confused' | 'focused' | 'tired';
  };
}
```

## Error Handling

### 🛡️ **Verktygs-Felhantering**

1. **Graceful Degradation**: Om ett verktyg inte fungerar, erbjud alternativ
2. **Senior-Vänliga Felmeddelanden**: "Det verktyget är upptaget just nu, ska vi prova något annat?"
3. **Automatisk Återhämtning**: Spara användarens arbete och fortsätt med enklare verktyg
4. **Lärande System**: Kom ihåg vad som inte fungerade för användaren

## Testing Strategy

### 🧪 **Verktygs-Testning**

1. **Senior User Testing**: Testa varje verktyg med riktiga seniorer
2. **Context Switching Tests**: Testa växling mellan statisk/dynamisk navigation
3. **Tool Integration Tests**: Testa hur verktyg fungerar tillsammans
4. **Failure Recovery Tests**: Testa vad som händer när verktyg kraschar

## Implementation Phases

### 📋 **Fas 1: Grundläggande Verktygs-DNA**
- Skapa verktygs-mall och orkestrator
- Implementera 3 kärnverktyg (Diagram, Färg, Text)
- Grundläggande hybrid-navigation

### 📋 **Fas 2: Intelligent Aktivering**
- Kontextmedveten verktygsförslag
- Smidig växling mellan modaliteter
- Användarpreferens-lärande

### 📋 **Fas 3: Verktygs-Ekosystem**
- Integration med externa verktyg
- Avancerad orkestration
- Personaliserad verktygsuppsättning

## 🎯 **Fokuserad Lösning: Kärn-Automation Först**

### **SWOT-Analys Visar:**
- **Styrka**: Vi har redan Jules integration påbörjad + Kiro specs-system
- **Svaghet**: Fragmenterad implementation, för många parallella spår
- **Möjlighet**: 2D-GitHub integration kan strukturera allt
- **Hot**: Över-komplexitet och feature creep

### **Rekommenderad Strategi:**

#### **Fas 1: Slutför Jules Foundation (2 veckor)**
1. **Slutför `.kiro/specs/fas-0-jules-tool-integration/`**
2. **Få requirements→design→tasks automation att fungera**
3. **Testa med enkel "Hello World" automation**

#### **Fas 2: 2D-GitHub Integration (2 veckor)**  
1. **Skapa GitHub repository struktur som speglar 2D-grid**
2. **Automatisk filplacering baserat på tid/tydlighet-position**
3. **Integrera med befintlig specs-automation**

#### **Fas 3: Hybrid Navigation (2 veckor)**
1. **Kombinera statisk 2D-grid med dynamisk dialog**
2. **Kontextmedveten verktygsval baserat på position**
3. **Senior-testa hela systemet**

### **Kärninsikt från SWOT:**
- **2D-strukturen är LÖSNINGEN, inte problemet** - Den ger tydlig organisation
- **Fokusera på EN sak i taget** - Slutför Jules automation först
- **Hybrid-approach är rätt** - Statisk struktur + dynamisk dialog
- **Fas-baserat filsystem** löser strukturproblemet elegant (se [114_🏗️1🟢_UPPDATERAD_MAPPSTRUKTUR_ANALYS_250814_113.md](../../../114_🏗️1🟢_UPPDATERAD_MAPPSTRUKTUR_ANALYS_250814_113.md))

### **Konkreta Nästa Steg:**
1. **Uppdatera Jules Integration Spec** med 2D-integration
2. **Slutför Jules Tool Implementation** 
3. **Implementera fas-baserat filsystem** (enligt uppdaterad mappstruktur-analys)
4. **Testa end-to-end workflow**

**Resultatet**: Ett fungerande automation-system med tydlig 2D-struktur istället för många halvfärdiga experiment.