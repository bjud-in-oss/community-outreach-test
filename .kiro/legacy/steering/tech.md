# Technology Stack - Strategisk Komponentanalys (Master Plan 2.0)

## Kärnarkitektur: Dubbelt Medvetandesystem

### 🎭 Medvetna Rondellen (Frontend & Kommunikation)
**Syfte**: 100% oteknisk kommunikation med seniorer

| Komponent | Version | Rationale |
|-----------|---------|-----------|
| **Next.js** | ^14.0.0 | React-baserad frontend för medvetna agenten |
| **Groq SDK** | ^0.8.0 | Extremt låg latens för emotionella responser (fight/flight/fix) |
| **MCP-UI** | ^1.0.0 | Dynamiska, AI-genererade gränssnitt för seniorer |
| **Tailwind CSS** | ^3.4.0 | Senior-vänlig styling med stora knappar och tydlig text |

### ⚙️ Kärn-agenten (Backend & Teknisk Implementation)
**Syfte**: All teknisk komplexitet och orkestrering

| Komponent | Version | Rationale |
|-----------|---------|-----------|
| **LangChain** | ^0.1.0 | 🟡 Orkestreringsmotorn - kärnan i agentens logik |
| **LlamaIndex** | ^0.10.0 | 🟡 RAG och minneshantering - agentens kunskapsbas |
| **Gemini API** | latest | 🟡 Arbetshästen för kodgenerering och planering |
| **Jules Integration** | custom | 🔴 Kontrollerat LangChain-verktyg med timeout-logik |
| **Smolagents** | ^0.3.0 | 🔴 Alternativ kodgenerator för enklare uppgifter |

## 📚 UTVECKLINGSVERKTYG & DOKUMENTATION

### **Kiro IDE Integration:**
- **Specs System**: Strukturerad feature-utveckling med requirements/design/tasks
- **Agent Hooks**: Automatiserade workflows för filvalidering och kvalitetskontroll
- **MCP Integration**: Model Context Protocol för externa verktyg
- **Steering Documents**: AI-guidance för konsekvent utveckling

### **Jules Specialist Tool:**
- **Komplett dokumentation**: `docs/research/specialist-tool/jules-complete-documentation.md`
- **Automatiserad kodgenerering**: LangChain-baserad implementation
- **GitHub integration**: Automatiska PR:er och merge-hantering
- **Timeout-logik**: Säker hantering av långvariga operationer

### **RAW Documentation Import System:**
- **docs/research/development-tools/kiro-complete-documentation.md** - Komplett Kiro dokumentation (manuellt importerad 11 aug 2025)
- **docs/research/specialist-tool/jules-complete-documentation.md** - Komplett Jules dokumentation (manuellt importerad 11 aug 2025)
- **docs/research/llm-provider/groq-api-reference.md** - RAW Groq API referens (MCP fetch 11 aug 2025)
- **Andra RAW imports** - Markerade med importdatum och källa för att undvika förvirring med träningsdata

### **📚 RESEARCH DOCUMENTATION REFERENCE**
```
docs/research/ innehåller djup teknisk dokumentation:
├── development-tools/  # Kiro IDE komplett dokumentation
├── specialist-tool/    # Jules, Smolagents research
├── agent-framework/    # LangChain, LlamaIndex guides
├── infrastructure/     # Vercel, Supabase setup
├── memory-framework/   # RAG och minnesystem implementation
├── ui-framework/       # MCP-UI, senior design
└── llm-provider/       # Groq, Gemini API:er

Använd: #docs/research/[kategori] för att ladda specifik dokumentation
Exempel: #docs/research/specialist-tool för Jules dokumentation
```

### 🔵 Infrastruktur & Hosting
**Syfte**: Robust, skalbar och gratis hosting-lösning

| Komponent | Plan | Rationale |
|-----------|------|-----------|
| **Vercel** | Hobby (Gratis) | Hosting för frontend + serverless backend API |
| **Supabase** | Free Tier | PostgreSQL-databas, autentisering, fillagring |
| **GitHub Actions** | Gratis | CI/CD och automatiserade arbetsflöden |

## Fasbaserad Teknisk Implementation

### Fas 0 (CRAWL): Infrastruktur & "Hello, World!"
```bash
# Grundläggande setup
npm create next-app@latest community-outreach --typescript --tailwind
npm install @supabase/supabase-js groq-sdk

# Vercel deployment
vercel --prod

# Supabase setup
npx supabase init
npx supabase start
```

### Fas 1 (WALK): Den Funktionella Kärn-agenten
```bash
# Agent-ramverk
npm install langchain llamaindex @langchain/community

# LLM-leverantörer
npm install @google/generative-ai groq-sdk

# Verktygsintegration
npm install @octokit/rest puppeteer
```

### Fas 2 (RUN): Den Empatiska Upplevelsen
```bash
# Senior-vänligt UI
npm install @mcp-ui/react @radix-ui/react-*

# Emotionell motor
npm install sentiment natural

# Guardrails och säkerhet
npm install zod joi validator
```

### Fas 3 (FLY): Autonom Självförbättrande Agent
```bash
# Metakognitiva förmågor
npm install @babel/parser @babel/traverse

# Sandlåde-testning
npm install vm2 isolated-vm

# Governance och monitoring
npm install winston pino datadog-metrics
```

## Common Commands (Fasbaserade)

### Fas 0 (CRAWL) Commands
```bash
# Development
npm run dev              # Starta Next.js development server
npm run build           # Bygg för produktion
npm run start           # Starta production server

# Infrastructure
vercel dev              # Lokal Vercel development
supabase start          # Starta lokal Supabase
supabase status         # Kontrollera Supabase status
```

### Fas 1 (WALK) Commands
```bash
# Agent Development
npm run test:agents     # Testa LangChain agents
npm run test:memory     # Testa LlamaIndex minnesystem
npm run test:jules      # Testa Jules integration

# Documentation Loading
npm run load-docs       # Ladda strategisk dokumentation
npm run analyze-docs    # Analysera för dubbelt medvetandesystem
```

### Fas 2 (RUN) Commands
```bash
# Senior Testing
npm run test:seniors    # Kör användbarhetstester
npm run test:empathy    # Testa emotionell motor
npm run test:guardrails # Validera informationsseparation

# UI Development
npm run storybook       # Utveckla senior-komponenter
npm run accessibility   # Testa tillgänglighet
```

### Fas 3 (FLY) Commands
```bash
# Metakognitiv Development
npm run self-analyze    # Agenten analyserar sin egen kod
npm run sandbox-test    # Testa kodändringar i sandlåda
npm run governance      # Kör governance-kontroller

# Monitoring
npm run monitor         # Övervaka agentens prestanda
npm run health-check    # Systemhälsokontroll
```

## Environment Variables (Säkerhet & Konfiguration)

### Fas 0 (CRAWL) - Grundläggande
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Groq (Emotionell motor)
GROQ_API_KEY=your_groq_api_key
```

### Fas 1 (WALK) - Agent Integration
```bash
# LLM-leverantörer
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key  # Backup

# GitHub (Jules integration)
GITHUB_TOKEN=your_github_token
GITHUB_REPO_OWNER=bjud-in-oss
GITHUB_REPO_NAME=community-outreach-test

# LlamaIndex
LLAMAINDEX_CACHE_DIR=./cache/llamaindex
```

### Fas 2 (RUN) - Senior Experience
```bash
# MCP Servers
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Monitoring
SENTRY_DSN=your_sentry_dsn  # Error tracking
ANALYTICS_ID=your_analytics_id  # Usage analytics
```

## Development Environment Setup

### Förutsättningar
- **Node.js**: ^18.17.0 (LTS)
- **npm**: ^9.0.0
- **Git**: ^2.40.0
- **VS Code**: Rekommenderad IDE med Kiro extension

### Första Installation
```bash
# 1. Klona repository
git clone https://github.com/bjud-in-oss/community-outreach-test.git
cd community-outreach-test

# 2. Installera dependencies
npm install

# 3. Sätt upp environment
cp .env.example .env.local
# Fyll i dina API-nycklar

# 4. Starta development
npm run dev
```

### Kvalitetskontroll
```bash
# Linting & Formatting
npm run lint            # ESLint kontroll
npm run lint:fix        # Automatisk fix
npm run format          # Prettier formatting
npm run type-check      # TypeScript kontroll

# Testing
npm run test            # Alla tester
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage rapport
```

## Säkerhetsaspekter

### API-säkerhet
- Alla API-nycklar i environment variables
- Rate limiting på alla endpoints
- Input validation med Zod schemas
- CORS konfiguration för production

### Guardrails Implementation
- Automatisk filtrering av teknisk jargong
- Informationsseparation mellan medveten/kärn-agent
- Säker kommunikation via ReAct bridge
- Audit logging för alla agent-interaktioner

### Senior-säkerhet
- Ingen exponering av tekniska fel
- Graceful degradation vid systemfel
- Automatisk fallback till mänsklig support
- Transparent men oteknisk felhantering