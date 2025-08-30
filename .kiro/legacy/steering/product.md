# Product Overview - DIY Coding Platform for Seniors

## Vision Statement
Banbrytande DIY-kodningsplattform med primärt fokus på seniorer och kyrkliga gemenskaper. Plattformen abstraherar helt bort teknisk komplexitet och ger användare makten att omvandla idéer till fungerande applikationer genom naturligt språk. Kärnan är en AI med dubbel medvetandestruktur och emotionell motor som strävar efter genuin närhet. Systemet ska uppnå metakognitiv förmåga att förstå och förbättra sin egen kod.

## 🚨 KRITISK UTVECKLINGSPRINCIP
**KIRO ÄR ENDAST UTVECKLINGSVERKTYG - ALDRIG SLUTPRODUKT**
- Seniorer kommer ALDRIG att se eller använda Kiro
- Slutprodukten är en fristående web-applikation i vanlig webbläsare
- Ingen installation eller teknisk setup krävs för slutanvändare
- All kod måste fungera UTAN Kiro-dependencies

## 🎯 KÄRNKOMPONENTER (Uppdaterad Prioritering)

### **1. Family History Web Platform (HÖGSTA PRIORITET)**
- **Google Drive Integration** - Automatisk import av familjefoton
- **Python Script Web Wrapper** - Ditt excellenta PDF-script som web API
- **Senior-Friendly Interface** - Drag-and-drop för familjeböcker
- **FamilySearch Integration** - Permanent bevarande för framtiden

### **2. Real-Time Translation & Closed Captioning (HÖGSTA PRIORITET)**
- **Google Cloud Speech-to-Text** - Svenska tal → text (40 kr/månad)
- **DeepL Translation** - Högkvalitativ översättning (gratis tier)
- **Zoom CC Integration** - Live closed captions för hybrid-deltagande
- **Smart Audio Filtering** - Tesira-integration för kostnadsbesparing

### **3. Church PowerShell Automation (HÖGSTA PRIORITET)**
- **Zoom Automation** - Automatisk kyrktjänst-setup
- **Tesira Integration** - Ljudsystem-kontroll via TCP
- **Presentation Automation** - PowerPoint + projektor-setup
- **System Configuration** - Windows-optimering för kyrkteknik

## Kärnarkitektur: Dubbelt Medvetandesystem

### **Dubbelt Medvetandesystem:**
- **Conscious Agent** (🎭): Senior-vänlig kommunikation, empati-motor
- **Core Agent** (⚙️): Teknisk implementation, LangChain/LlamaIndex
- **Communication Bridge** (🌉): Säker informationsöverföring mellan agenter

### Den Medvetna Rondellen (Frontend & Kommunikation)
- **Syfte**: Agentens "ansikte utåt" - 100% oteknisk kommunikation med seniorer
- **Komponenter**: Empati-motor, språkprocessor, MCP-UI gränssnitt
- **Teknisk Stack**: Next.js frontend, Groq för emotionella responser

### Kärn-agenten (Backend & Teknisk Implementation) 
- **Syfte**: Agentens "muskler och hjärnstam" - all teknisk komplexitet
- **Komponenter**: LangChain orchestration, LlamaIndex minne, Jules/Smolagents integration
- **Teknisk Stack**: Vercel serverless functions, Supabase databas

## **Fasbaserad Utveckling:** "Crawl, Walk, Run, Fly"
- **Fas 0 (CRAWL)**: Infrastruktur & "Hello World" ✅ SLUTFÖRD
- **Fas 1 (WALK)**: Funktionell kärn-agent ⏳ PÅGÅENDE
- **Fas 2 (RUN)**: Empatisk senior-upplevelse 🔜 NÄSTA
- **Fas 3 (FLY)**: Autonom självförbättring 🔮 FRAMTID

## 🏗️ KODSTRUKTUR & NAMNGIVNING

### **Huvudkomponenter:**
```
src/
├── conscious-agent/      # 🎭 Senior-vänlig kommunikation
├── core-agent/          # ⚙️ Teknisk implementation  
├── communication-bridge/ # 🌉 Säker informationsöverföring
└── infrastructure/      # 🔵 Vercel + Supabase integration
```

### **Namngivningskonventioner:**
- **Conscious Agent**: `empathy-`, `language-`, `senior-` prefix
- **Core Agent**: `orchestration-`, `memory-`, `tool-` prefix  
- **Communication Bridge**: `guardrail-`, `thought-`, `translation-` prefix
- **Infrastructure**: `vercel-`, `supabase-`, `deployment-` prefix

### **Code Organization Principles:**
- **Dubbel medvetenhet**: Aldrig blanda medveten/kärn-agent kod i samma fil
- **Fasbaserad modularitet**: Kod organiserad för stegvis "Crawl→Walk→Run→Fly" utveckling
- **Senior-first design**: Alla API:er och interfaces designade för enkel abstraktion
- **Guardrail enforcement**: Automatiska kontroller för informationsseparation

### **Integration Boundaries:**
- **Medveten ↔ Kärn-agent**: Endast via communication-bridge med strikta guardrails
- **Infrastructure**: Isolerad från business logic, endast via definierade interfaces
- **Tools**: Pluggable arkitektur för enkel utbyte (Jules ↔ Smolagents)
- **Memory Systems**: Separata index för medveten/kärn-agent med olika åtkomstnivåer

## 🤖 AGENT COORDINATION

### **Task Distribution:**
- **Kiro**: Dokumentation, planering, arkitektur
- **Jules**: Kodimplementation, testing, deployment
- **Human**: Godkännande, riktning, kvalitetskontroll

### **Jules Integration Pattern:**
```typescript
const julesTask = {
  type: "implementation",
  priority: "high",
  context: "Master Plan 2.0 - [AKTUELL KOMPONENT]",
  requirements: "Senior-friendly design + teknisk implementation",
  guardrails: "No technical jargon in user-facing elements"
};
```

## Målgrupp & Användningsfall
- **Primär**: Seniorer (65-85 år) i kyrkliga gemenskaper
- **Teknisk nivå**: Minimal - ingen förståelse för "databas", "API", "kod"
- **Användningsfall**: Medicin-tracking, familjekalendrar, enkla verktyg
- **Kostnadskrav**: 100% gratis för slutanvändare (kyrkans budget)

## 👥 SENIOR-CENTRERADE DESIGNPRINCIPER

### **Designprinciper:**
- **Enkelhet först**: Aldrig exponera teknisk komplexitet
- **Stora knappar**: Minst 44px touch targets
- **Tydlig text**: Minst 16px fontstorlek, hög kontrast
- **Förutsägbar navigation**: Konsekvent layout och flöde

### **Språkstrategi:**
- **Vardagsspråk**: "Spara" istället för "Commit"
- **Visuella metaforer**: "Mapp" istället för "Directory"
- **Bekräftelser**: "Är du säker?" för alla viktiga åtgärder
- **Hjälptext**: Alltid tillgänglig, aldrig teknisk

### **Conscious Agent Kommunikation:**
- **Varm och personlig**: "Hej [namn], hur kan jag hjälpa dig idag?"
- **Tålmodig**: Aldrig rusa eller pressa användaren
- **Uppmuntrande**: "Bra jobbat!" när något lyckas
- **Ursäktande**: "Förlåt, det blev fel" när något misslyckas

**Filtrera alla beslut genom: "Skulle min 75-åriga mamma förstå detta?"** 👵

## Framgångskriterier
- Senior kan skapa app genom naturlig konversation utan teknisk exponering
- Systemet hanterar alla tekniska fel osynligt
- Genererade applikationer är omedelbart användbara
- AI-agenten förbättrar sig själv över tid