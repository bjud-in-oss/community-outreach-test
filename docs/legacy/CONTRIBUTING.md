# 🤝 Contributing to Master Plan 2.0

## 🎯 Utvecklingsfilosofi

Detta projekt är optimerat för **AI-assisterad utveckling** med Kiro IDE och följer **Master Plan 2.0** arkitekturen med dubbelt medvetandesystem.

## 🏗️ Arkitekturprinciper

### 🎭 Dubbel Medvetenhet
- **Medvetna Rondellen**: Aldrig exponera teknisk komplexitet för seniorer
- **Kärn-agenten**: All teknisk implementation dold från slutanvändare
- **Communication Bridge**: Säker kommunikation mellan system

### 📋 Fasbaserad Utveckling
```
FAS 0 (CRAWL): Infrastruktur & "Hello World"
FAS 1 (WALK): Funktionell kärn-agent
FAS 2 (RUN): Empatisk seniorupplevelse
FAS 3 (FLY): Autonom självförbättrande agent
```

## 🛠️ Utvecklingsmiljö

### Kiro IDE Integration
Detta projekt är designat för **Kiro IDE** med:
- **CHAT-läge**: Dokumentation och planering (.md filer)
- **SPECS-läge**: Strukturerad implementation (.ts/.js filer)
- **Dual Sessions**: Aldrig samma fil i båda lägena

### Steering System
AI-guidance finns i `.kiro/steering/`:
- `product-processes.md` - Produktvision och senior-fokus
- `structure.md` - Projektstruktur och arkitektur
- `tech.md` - Teknisk stack och verktyg
- `document-index.md` - Master dokumentindex

## 📁 Projektstruktur

```
src/
├── conscious-agent/       # 🎭 Medvetna Rondellen (senior-interface)
├── core-agent/           # ⚙️ Kärn-agenten (teknisk implementation)
├── communication-bridge/ # 🌉 Säker kommunikation mellan agenter
├── infrastructure/       # 🔵 Vercel + Supabase integration
└── shared/              # Gemensamma utilities och typer
```

## 🎯 Kodningsregler

### Senior-First Design
```typescript
// ✅ RÄTT: Senior ser aldrig teknisk komplexitet
const seniorMessage = "Skapar din översättningsapp... 🌍";
const hiddenTechnical = "Implementing Google Cloud Speech-to-Text API";

// ❌ FEL: Exponerar teknisk jargon för senior
const errorMessage = "API rate limit exceeded, retry in 60 seconds";
```

### Guardrails Implementation
```typescript
// Alla meddelanden till seniorer måste filtreras
export function filterTechnicalJargon(message: string): string {
  return message
    .replace(/API/g, "tjänst")
    .replace(/database/g, "lagring")
    .replace(/error/g, "problem")
    .replace(/timeout/g, "tar lite längre tid");
}
```

### Filnamnskonventioner
- **Medveten Agent**: `empathy-`, `language-`, `senior-` prefix
- **Kärn-agent**: `orchestration-`, `memory-`, `tool-` prefix
- **Communication Bridge**: `guardrail-`, `thought-`, `translation-` prefix
- **Tests**: Matcha källfilsstruktur med `-test.ts` suffix

## 🧪 Testing Strategy

### Senior User Testing
```bash
npm run test:seniors    # Användbarhetstester
npm run test:empathy    # Emotionell motor
npm run test:guardrails # Informationsseparation
```

### Testfall som Måste Fungera
1. **Kyrktjänst-översättning**: "Jag vill att alla ska förstå"
2. **Familjehistoria**: "Jag vill göra en bok av mina foton"
3. **Automation**: "Jag vill att allt startar automatiskt"

## 📚 Dokumentationsregler

### Länkad Dokumentarkitektur
- **Master Integration Plan** är single source of truth
- Alla dokument länkas hierarkiskt
- Status markeras: 1🟢 AKTIV, 2🟡 SKAPAS, 3🔵 REFERENS, 4⚫ ARKIV

### Dokumentuppdatering
```bash
# När dokument ändras:
1. Uppdatera datum i filnamn
2. Kontrollera relaterade dokument
3. Uppdatera Master Integration Plan
4. Uppdatera Document Index
```

## 🔄 Git Workflow

### Branch Strategy
```bash
main                    # Produktionsklar kod
├── develop            # Integration branch
├── feature/conscious-* # Medvetna Rondellen features
├── feature/core-*     # Kärn-agent features
└── feature/bridge-*   # Communication Bridge features
```

### Commit Messages
```bash
# Format: [KOMPONENT] Beskrivning
git commit -m "[CONSCIOUS] Implementera empati-motor för senior-kommunikation"
git commit -m "[CORE] Integrera Jules tool med timeout-hantering"
git commit -m "[BRIDGE] Lägg till guardrails för teknisk jargong-filtrering"
```

## 🚀 Deployment

### Environment Variables
```bash
# Grundläggande (Fas 0)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
GROQ_API_KEY=your_groq_api_key

# Agent Integration (Fas 1)
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_token

# Senior Experience (Fas 2)
UPSTASH_REDIS_REST_URL=your_redis_url
SENTRY_DSN=your_sentry_dsn
```

### Fasbaserad Deployment
```bash
# Fas 0: Grundläggande infrastruktur
vercel --prod

# Fas 1: Agent integration
npm run test:agents && vercel --prod

# Fas 2: Senior testing
npm run test:seniors && vercel --prod
```

## 🎭 AI-Assisterad Utveckling

### Jules Integration
```typescript
// Jules används för kodgenerering med timeout-logik
const julesTask = await jules.generateCode({
  description: "Skapa senior-vänlig PDF-generator",
  timeout: 300000, // 5 minuter max
  guardrails: ["no-technical-exposure", "senior-friendly-ui"]
});
```

### Kiro Specs Format
```yaml
# conscious-agent.spec
name: Conscious Agent Implementation
phase: 1
components:
  - empathy-engine
  - language-processor
  - senior-ui
requirements:
  - No technical jargon exposure
  - Swedish language support
  - Emotional intelligence integration
```

## 🔒 Säkerhetsriktlinjer

### Senior-säkerhet
- Aldrig exponera tekniska fel för seniorer
- Graceful degradation vid systemfel
- Automatisk fallback till mänsklig support
- Transparent men oteknisk felhantering

### API-säkerhet
- Alla API-nycklar i environment variables
- Rate limiting på alla endpoints
- Input validation med Zod schemas
- CORS konfiguration för production

## 📊 Success Metrics

### Fas 1 Success
- ✅ Senior kan skapa enkel app genom naturligt språk
- ✅ Ingen teknisk komplexitet exponerad
- ✅ Grundläggande dubbelt medvetandesystem fungerar

### Fas 2 Success
- ✅ Alla tre testfallen fungerar perfekt
- ✅ Multi-platform stöd implementerat
- ✅ Senior-vänlig UI validerad

## 🤝 Code Review Process

### Review Checklist
- [ ] Följer dubbelt medvetandesystem-arkitektur
- [ ] Ingen teknisk exponering för seniorer
- [ ] Guardrails implementerade korrekt
- [ ] Senior-vänlig felhantering
- [ ] Dokumentation uppdaterad
- [ ] Tester passerar för målgrupp

### AI-Assisterad Review
```bash
# Använd Kiro för automatisk code review
npm run governance      # Kör governance-kontroller
npm run self-analyze    # Agenten analyserar sin egen kod
```

## 📞 Support

För frågor om utveckling:
1. Kontrollera [Master Integration Plan](01_🎯🟢_MASTER_INTEGRATION_PLAN_240809_ALL.md)
2. Läs [Document Index](02_📋🟢_DOCUMENT_INDEX_240812_01.md)
3. Använd Kiro IDE för AI-assisterad problemlösning

---

*Tack för att du bidrar till att revolutionera hur seniorer skapar teknik!* 🎭