# 🏗️ Dubbel Mappstruktur & EARS-Integration

**Datum:** 2025-08-14  
**Status:** 1🟢 AKTIV - Mappstruktur för dubbelt medvetandesystem  
**Syfte:** Designa separata strukturer för medveten/omedveten agent + EARS-integration  
**Relaterat:** 112_🏗️1🟢_KIRO_2D_INTEGRATION_ANALYS_250814_111.md, Master Integration Plan

## 🧠 **DUBBELT MEDVETANDESYSTEM - MAPPSTRUKTUR**

### **🎭 Medveten Agent Struktur (Senior-Synlig)**
```
community-outreach/
├── senior-workspace/                    # MEDVETEN AGENT OMRÅDE
│   ├── projects/                        # Senior-vänliga projektmappar
│   │   ├── kyrktjanst-oversattning/     # Naturliga namn på svenska
│   │   │   ├── min-ide.md              # "Jag vill översätta kyrktjänsten"
│   │   │   ├── vad-vi-bygger.md        # Senior-vänlig beskrivning
│   │   │   ├── hur-det-fungerar.md     # Enkla förklaringar
│   │   │   └── nar-det-ar-klart.md     # Tidsplan och milstolpar
│   │   ├── familjehistoria-bok/
│   │   │   ├── min-ide.md              # "Jag vill göra en bok av foton"
│   │   │   ├── vad-vi-bygger.md
│   │   │   └── hur-det-fungerar.md
│   │   └── kyrkteknik-automation/
│   │       ├── min-ide.md              # "Jag vill automatisera ljudet"
│   │       └── vad-vi-bygger.md
│   ├── conversations/                   # Chat-historik med AI
│   │   ├── 2025-08-14-kyrktjanst.md   # Dagliga konversationer
│   │   └── 2025-08-15-familjebok.md
│   └── progress/                        # Framsteg senior kan förstå
│       ├── denna-vecka.md              # "Vi slutförde grundarbetet"
│       └── nasta-vecka.md              # "Vi testar svenska röster"
```

### **⚙️ Omedveten Agent Struktur (Teknisk Implementation)**
```
community-outreach/
├── core-system/                         # OMEDVETEN AGENT OMRÅDE
│   ├── technical-specs/                 # EARS-genererade tekniska krav
│   │   ├── church-translation/
│   │   │   ├── requirements.md          # Auto-genererat från EARS
│   │   │   ├── design.md               # Teknisk arkitektur
│   │   │   ├── tasks.md                # Implementation tasks
│   │   │   └── apis-and-services.md    # Google Cloud STT, DeepL etc.
│   │   ├── family-history/
│   │   │   ├── requirements.md          # Python PDF-generator krav
│   │   │   ├── design.md               # Web API arkitektur
│   │   │   └── tasks.md                # Tekniska tasks
│   │   └── church-automation/
│   │       ├── requirements.md          # PowerShell automation krav
│   │       └── design.md               # Windows automation design
│   ├── generated-code/                  # Jules-genererad kod
│   │   ├── church-translation-app/
│   │   ├── family-history-web/
│   │   └── church-automation-scripts/
│   ├── deployment/                      # CI/CD och hosting
│   │   ├── vercel-configs/
│   │   ├── github-actions/
│   │   └── environment-vars/
│   └── monitoring/                      # System-övervakning
│       ├── error-logs/
│       ├── performance-metrics/
│       └── usage-analytics/
```

## 🔄 **EARS-GENERERING WORKFLOW**

### **Från Senior-Input till Teknisk Implementation:**

```typescript
interface EARSWorkflow {
  // Steg 1: Senior Input (Medveten Agent)
  seniorInput: {
    location: "senior-workspace/projects/kyrktjanst-oversattning/min-ide.md";
    content: "Jag vill att alla ska förstå vår kyrktjänst";
    context: "Svensk kyrka, många språk, live-översättning";
  };
  
  // Steg 2: EARS-Generering (Communication Bridge)
  earsProcessing: {
    llmEngine: "Groq API för snabb analys";
    contextSources: [
      "LlamaIndex minne av tidigare projekt",
      "Comprehensive Tools kunskap",
      "Platform Selector intelligent teknikval"
    ];
    output: "Kompletta tekniska requirements";
  };
  
  // Steg 3: Teknisk Spec (Omedveten Agent)
  technicalOutput: {
    location: "core-system/technical-specs/church-translation/requirements.md";
    content: `
      # Church Translation - Technical Requirements
      
      ## Functional Requirements
      - Real-time Swedish speech recognition via Google Cloud STT
      - Multi-language translation (English, Arabic, Somaliska) via DeepL
      - Live closed captions integration with Zoom SDK
      - PWA deployment for cross-platform access
      
      ## Technical Constraints
      - Cost target: ~40 SEK/month
      - No installation required for end users
      - Senior-friendly UI with large buttons
      - Accessibility compliance (WCAG 2.1)
      
      ## Implementation Stack
      - Frontend: Next.js PWA
      - Backend: Vercel serverless functions
      - APIs: Google Cloud STT, DeepL, Zoom SDK
      - Database: Supabase (user preferences)
    `;
  };
}
```

## 🖥️ **2-PANEL ANVÄNDARGRÄNSSNITT**

### **Layout för Stora Skärmar (Höger-Vänster):**
```
┌─────────────────────────────────────────────────────────────┐
│                    POSITION INDICATOR                       │
│         🎭 Kyrktjänst Översättning - Bygger Grundsystem     │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────┬───────────────────────────────────┐
│     MEDVETEN PLAN       │         DYNAMISK CHAT            │
│     (Vänster Panel)     │        (Höger Panel)             │
│                         │                                   │
│ 📋 Vad Vi Bygger:       │ 💬 Prata med AI:                 │
│                         │                                   │
│ "En app som översätter  │ 👵 Du: "Jag vill att alla ska    │
│  kyrktjänsten live så   │ förstå vår kyrktjänst"           │
│  alla förstår"          │                                   │
│                         │ 🤖 AI: "Vilka språk behöver ni   │
│ 🎯 Hur Det Fungerar:    │ mest? Svenska och engelska?"     │
│                         │                                   │
│ • Du pratar i mikrofon  │ 👵 Du: "Arabiska och somaliska   │
│ • Systemet översätter   │ också"                            │
│ • Alla ser text på      │                                   │
│   sina telefoner        │ 🤖 AI: "Perfekt! Jag skapar en  │
│                         │ app som översätter live till     │
│ ⏰ Tidsplan:            │ alla fyra språken"               │
│                         │                                   │
│ Denna vecka: ✅ Grund   │ [Textinput: "Berätta mer..."]    │
│ Nästa vecka: 🔄 Testa  │ [Skicka-knapp]                   │
│ Om 2 veckor: 🎉 Klar   │                                   │
│                         │                                   │
│ 💰 Kostnad: ~40kr/mån   │ 📊 Automatisk Uppdatering:       │
│                         │ "Skapar teknisk plan från din    │
│ 🎮 Testa Appen:        │ beskrivning..."                   │
│ [Stor Grön Knapp]      │                                   │
└─────────────────────────┴───────────────────────────────────┘
```

### **Layout för Mobil (Övre-Nedre):**
```
┌─────────────────────────────────────────┐
│           POSITION INDICATOR            │
│    🎭 Kyrktjänst - Bygger Grundsystem   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│          MEDVETEN PLAN                  │
│          (Övre Panel)                   │
│                                         │
│ 📋 Vad Vi Bygger:                       │
│ "Översättningsapp för kyrktjänst"       │
│                                         │
│ 🎯 Status: Bygger grundsystem ✅        │
│ ⏰ Nästa: Testar svenska röster 🔄      │
│ 💰 Kostnad: ~40kr/mån                   │
│                                         │
│ [Testa Appen - Stor Knapp]             │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         DYNAMISK CHAT                   │
│         (Nedre Panel)                   │
│                                         │
│ 💬 Senaste meddelanden:                 │
│                                         │
│ 🤖 "Jag har skapat grundsystemet för   │
│ översättning. Vill du testa det?"       │
│                                         │
│ [Textinput: "Ja, låt oss testa"]       │
│ [Skicka]                                │
└─────────────────────────────────────────┘
```

## 🔄 **EARS-INTEGRATION I ANVÄNDARGRÄNSSNITTET**

### **Automatisk Uppdatering av Medveten Plan:**

```typescript
interface EARSUIIntegration {
  // När senior chattar
  onSeniorMessage(message: string) {
    // 1. Skicka till EARS-generering
    const technicalSpecs = await this.earsGenerator.process(message);
    
    // 2. Uppdatera teknisk struktur (osynligt)
    await this.updateTechnicalSpecs(technicalSpecs);
    
    // 3. Översätt till senior-vänlig plan
    const seniorPlan = await this.translateToSeniorPlan(technicalSpecs);
    
    // 4. Uppdatera vänster panel
    this.updateMedvetenPlan(seniorPlan);
    
    // 5. Ge feedback i chat
    this.addChatMessage("🤖", "Jag har uppdaterat planen baserat på det du sa!");
  }
  
  // Exempel på översättning
  translateToSeniorPlan(technicalSpecs: TechnicalSpecs): SeniorPlan {
    return {
      vadViBygger: "En app som översätter kyrktjänsten live",
      hurDetFungerar: [
        "Du pratar i mikrofon",
        "Systemet översätter automatiskt", 
        "Alla ser text på sina telefoner"
      ],
      tidsplan: {
        dennaVecka: "Bygger grundsystem ✅",
        nastaVecka: "Testar svenska röster 🔄",
        om2Veckor: "Appen är klar att använda 🎉"
      },
      kostnad: "~40 kr/månad",
      // Döljer: Google Cloud STT, DeepL API, Zoom SDK, etc.
    };
  }
}
```

Nu ska jag skapa en exempelsida som visar detta:

<function_calls>
<invoke name="fsWrite">
<parameter name="path">dist/dubbel-medvetenhet-demo.htmlYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🧠 Dubbelt Medvetandesystem - EARS Demo</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: #f8f9fa;
            font-size: 16px;
            height: 100vh;
            overflow: hidden;
        }

        .workspace-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* Position Indicator */
        .position-indicator {
            background: linear-gradient(135deg, #6a5acd, #483d8b);
            color: white;
            padding: 15px;
            text-align: center;
            font-weight: bold;
            font-size: 1.2em;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        /* Main 2-Panel Layout */
        .main-panels {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            overflow: hidden;
        }

        /* Panel Styling */
        .panel {
            background: white;
            border-right: 3px solid #e0e0e0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .panel:last-child {
            border-right: none;
        }

        .panel-header {
            background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
            padding: 20px;
            border-bottom: 3px solid #e0e0e0;
            font-weight: bold;
            color: #2c3e50;
            font-size: 1.3em;
            text-align: center;
        }

        .panel-content {
            flex: 1;
            padding: 25px;
            overflow-y: auto;
        }

        /* Medveten Plan Panel (Vänster) */
        .medveten-panel {
            background: #f8f9fa;
            border-right: 3px solid #6a5acd;
        }

        .medveten-panel .panel-header {
            background: linear-gradient(135deg, #e8e4ff, #d4c5ff);
            color: #6a5acd;
        }

        .plan-section {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-left: 5px solid #6a5acd;
        }

        .plan-section h3 {
            color: #6a5acd;
            margin-top: 0;
            font-size: 1.2em;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .plan-section p, .plan-section li {
            color: #2c3e50;
            line-height: 1.6;
            font-size: 1.1em;
        }

        .plan-section ul {
            padding-left: 20px;
        }

        .timeline-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
            font-size: 1.1em;
        }

        .status-icon {
            font-size: 1.2em;
        }

        .test-button {
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.2em;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin-top: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }

        .test-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
        }

        /* Chat Panel (Höger) */
        .chat-panel {
            background: #ffffff;
        }

        .chat-panel .panel-header {
            background: linear-gradient(135deg, #e8f5e8, #d4f4d4);
            color: #2e7d32;
        }

        .chat-messages {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            height: 400px;
            overflow-y: auto;
            margin-bottom: 20px;
            border: 2px solid #e0e0e0;
        }

        .chat-message {
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 12px;
            animation: fadeIn 0.3s ease;
            max-width: 85%;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message-senior {
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            border-left: 4px solid #2196f3;
            margin-left: auto;
            text-align: right;
        }

        .message-ai {
            background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
            border-left: 4px solid #4caf50;
            margin-right: auto;
        }

        .message-system {
            background: linear-gradient(135deg, #fff3e0, #ffe0b2);
            border-left: 4px solid #ff9800;
            font-style: italic;
            text-align: center;
            margin: 10px auto;
            max-width: 95%;
        }

        .chat-sender {
            font-weight: bold;
            font-size: 1em;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .chat-input-container {
            display: flex;
            gap: 12px;
            align-items: stretch;
        }

        .chat-input {
            flex: 1;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 25px;
            font-size: 1.1em;
            outline: none;
            transition: border-color 0.3s ease;
        }

        .chat-input:focus {
            border-color: #4caf50;
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }

        .chat-send {
            background: linear-gradient(135deg, #4caf50, #45a049);
            color: white;
            border: none;
            padding: 15px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1.1em;
            transition: all 0.3s ease;
        }

        .chat-send:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        }

        /* EARS Processing Indicator */
        .ears-processing {
            background: linear-gradient(135deg, #fff3e0, #ffe0b2);
            border: 2px solid #ff9800;
            border-radius: 12px;
            padding: 15px;
            margin: 15px 0;
            text-align: center;
            font-weight: bold;
            color: #f57c00;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
            .main-panels {
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 1fr;
            }
            
            .panel {
                border-right: none;
                border-bottom: 3px solid #e0e0e0;
            }
            
            .chat-messages {
                height: 250px;
            }
            
            .plan-section {
                padding: 15px;
                margin-bottom: 15px;
            }
        }

        /* Technical Structure Visualization (Hidden) */
        .technical-structure {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: #00ff00;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            z-index: 1000;
            max-width: 80%;
            max-height: 80%;
            overflow: auto;
        }

        .show-technical {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #333;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="workspace-container">
        <!-- Position Indicator -->
        <div class="position-indicator">
            🧠 Dubbelt Medvetandesystem - EARS Demo: Kyrktjänst Översättning
        </div>

        <!-- Main 2-Panel Layout -->
        <div class="main-panels">
            <!-- Medveten Plan Panel (Vänster) -->
            <div class="panel medveten-panel">
                <div class="panel-header">
                    🎭 Medveten Plan (Senior-Synlig)
                </div>
                <div class="panel-content">
                    <div class="plan-section">
                        <h3>📋 Vad Vi Bygger</h3>
                        <p>"En app som översätter kyrktjänsten live så alla förstår, oavsett vilket språk de pratar"</p>
                    </div>

                    <div class="plan-section">
                        <h3>🎯 Hur Det Fungerar</h3>
                        <ul>
                            <li>Du pratar i mikrofon under kyrktjänsten</li>
                            <li>Systemet översätter automatiskt till olika språk</li>
                            <li>Alla ser text på sina telefoner eller datorer</li>
                            <li>Fungerar med svenska, engelska, arabiska och somaliska</li>
                        </ul>
                    </div>

                    <div class="plan-section">
                        <h3>⏰ Tidsplan</h3>
                        <div class="timeline-item">
                            <span class="status-icon">✅</span>
                            <span>Denna vecka: Grundsystem är byggt</span>
                        </div>
                        <div class="timeline-item">
                            <span class="status-icon">🔄</span>
                            <span>Nästa vecka: Testar svenska röster</span>
                        </div>
                        <div class="timeline-item">
                            <span class="status-icon">🎉</span>
                            <span>Om 2 veckor: Appen är klar att använda</span>
                        </div>
                    </div>

                    <div class="plan-section">
                        <h3>💰 Kostnad & Praktiskt</h3>
                        <p><strong>Kostnad:</strong> Cirka 40 kr per månad</p>
                        <p><strong>Installation:</strong> Ingen - fungerar i vanlig webbläsare</p>
                        <p><strong>Användning:</strong> Enkla, stora knappar för seniorer</p>
                    </div>

                    <button class="test-button" onclick="testApp()">
                        🎮 Testa Appen (Demo)
                    </button>
                </div>
            </div>

            <!-- Chat Panel (Höger) -->
            <div class="panel chat-panel">
                <div class="panel-header">
                    💬 Dynamisk Chat med AI
                </div>
                <div class="panel-content">
                    <div class="chat-messages" id="chatMessages">
                        <div class="chat-message message-senior">
                            <div class="chat-sender">👵 Du</div>
                            <div>Jag vill att alla ska förstå vår kyrktjänst</div>
                        </div>
                        
                        <div class="chat-message message-system">
                            <div class="chat-sender">🤖 EARS-System</div>
                            <div>Analyserar din begäran och skapar teknisk plan automatiskt...</div>
                        </div>
                        
                        <div class="chat-message message-ai">
                            <div class="chat-sender">🤖 AI-Assistenten</div>
                            <div>Vilken bra idé! Jag förstår att du vill ha live-översättning för kyrktjänsten. Vilka språk behöver ni mest? Svenska och engelska, eller finns det andra språk i er församling?</div>
                        </div>
                        
                        <div class="chat-message message-senior">
                            <div class="chat-sender">👵 Du</div>
                            <div>Vi har många som pratar arabiska och somaliska också</div>
                        </div>
                        
                        <div class="chat-message message-system">
                            <div class="chat-sender">🤖 EARS-System</div>
                            <div>Uppdaterar teknisk specifikation: Multi-språk stöd (Svenska, Engelska, Arabiska, Somaliska)</div>
                        </div>
                        
                        <div class="chat-message message-ai">
                            <div class="chat-sender">🤖 AI-Assistenten</div>
                            <div>Perfekt! Jag har uppdaterat planen för att stödja alla fyra språken. Systemet kommer använda avancerad AI för att översätta live. Vill du att jag börjar bygga grundsystemet?</div>
                        </div>
                    </div>
                    
                    <div class="ears-processing" id="earsProcessing" style="display: none;">
                        🧠 EARS-Generering pågår: Skapar tekniska krav från din beskrivning...
                    </div>
                    
                    <div class="chat-input-container">
                        <input type="text" class="chat-input" id="chatInput" placeholder="Berätta mer om vad du vill ha...">
                        <button class="chat-send" onclick="sendMessage()">Skicka</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Hidden Technical Structure (Omedveten Agent) -->
    <div class="technical-structure" id="technicalStructure">
        <h3>⚙️ OMEDVETEN AGENT - TEKNISK STRUKTUR (DOLD FRÅN SENIOR)</h3>
        <pre>
core-system/technical-specs/church-translation/
├── requirements.md (EARS-Genererat)
│   ├── Google Cloud Speech-to-Text API
│   ├── DeepL Translation Service  
│   ├── Zoom SDK Integration
│   ├── Multi-language Support (sv, en, ar, so)
│   └── PWA Deployment Target
├── design.md
│   ├── Next.js Frontend Architecture
│   ├── Vercel Serverless Backend
│   ├── Real-time WebSocket Connections
│   └── Supabase User Preferences
├── tasks.md
│   ├── Setup Google Cloud STT API
│   ├── Integrate DeepL Translation
│   ├── Build PWA Interface
│   ├── Implement Zoom SDK
│   └── Deploy to Vercel
└── apis-and-services.md
    ├── Google Cloud STT: ~30 SEK/month
    ├── DeepL API: ~10 SEK/month  
    ├── Vercel Hosting: Gratis
    └── Total: ~40 SEK/month

generated-code/church-translation-app/
├── frontend/ (Next.js PWA)
├── backend/ (Vercel Functions)
├── config/ (API Keys & Settings)
└── deployment/ (CI/CD Scripts)
        </pre>
        <button onclick="hideTechnical()">Stäng</button>
    </div>

    <button class="show-technical" onclick="showTechnical()">
        👨‍💻 Visa Teknisk Struktur (Utvecklare)
    </button>

    <script>
        let messageCount = 0;
        
        const earsResponses = [
            {
                system: "EARS-System analyserar: Realtidsöversättning + Multi-språk stöd",
                ai: "Jag har skapat en plan för live-översättning med fyra språk. Systemet kommer kosta cirka 40 kr/månad och fungera i vanlig webbläsare. Ska jag börja bygga?"
            },
            {
                system: "EARS-System uppdaterar: Tillgänglighet + Senior-vänligt gränssnitt",
                ai: "Bra! Jag har lagt till stora knappar och enkel navigation för seniorer. Appen kommer också fungera på både datorer och telefoner."
            },
            {
                system: "EARS-System optimerar: Kostnad + Prestanda för kyrkmiljö",
                ai: "Perfekt! Jag har optimerat systemet för kyrkmiljö med bra ljudkvalitet och snabb översättning. Vill du se en demo av hur det kommer fungera?"
            }
        ];

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (message) {
                // Add user message
                addChatMessage('senior', '👵 Du', message);
                
                // Show EARS processing
                showEARSProcessing();
                
                // Simulate EARS processing and response
                setTimeout(() => {
                    hideEARSProcessing();
                    
                    const response = earsResponses[messageCount % earsResponses.length];
                    
                    // Add system message
                    addChatMessage('system', '🤖 EARS-System', response.system);
                    
                    // Add AI response
                    setTimeout(() => {
                        addChatMessage('ai', '🤖 AI-Assistenten', response.ai);
                        updateMedvetenPlan();
                    }, 1000);
                    
                    messageCount++;
                }, 2000);
                
                input.value = '';
            }
        }

        function addChatMessage(type, sender, message) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message message-${type}`;
            messageDiv.innerHTML = `
                <div class="chat-sender">${sender}</div>
                <div>${message}</div>
            `;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function showEARSProcessing() {
            document.getElementById('earsProcessing').style.display = 'block';
        }

        function hideEARSProcessing() {
            document.getElementById('earsProcessing').style.display = 'none';
        }

        function updateMedvetenPlan() {
            // Simulate updating the medveten plan based on EARS processing
            console.log('🎭 Medveten Plan uppdaterad baserat på EARS-generering');
            
            // Add visual feedback
            const planSections = document.querySelectorAll('.plan-section');
            planSections.forEach(section => {
                section.style.animation = 'none';
                section.offsetHeight; // Trigger reflow
                section.style.animation = 'fadeIn 0.5s ease';
            });
        }

        function testApp() {
            alert('🎮 Demo: "Hej och välkomna till kyrktjänsten" → "Hello and welcome to the church service" / "مرحبا ومرحبا بكم في خدمة الكنيسة" / "Soo dhaweynta adeegga kaniisadda"');
        }

        function showTechnical() {
            document.getElementById('technicalStructure').style.display = 'block';
        }

        function hideTechnical() {
            document.getElementById('technicalStructure').style.display = 'none';
        }

        // Enter key support for chat
        document.getElementById('chatInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        console.log('🧠 Dubbelt Medvetandesystem Demo laddad!');
        console.log('🎭 Medveten Agent: Senior-vänlig plan och chat');
        console.log('⚙️ Omedveten Agent: Teknisk implementation (dold)');
        console.log('🔄 EARS-Generering: Automatisk översättning senior → teknisk');
    </script>
</body>
</html>