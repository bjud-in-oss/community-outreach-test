# ⚙️ Kärn-agenten (Backend & Teknisk Implementation)

**Syfte**: Agentens "muskler och hjärnstam" - all teknisk komplexitet

## Komponenter:
- **langchain-orchestration/**: 🟡 Agent chains och reasoning
- **llamaindex-memory/**: 🟡 RAG och minneshantering
- **tools/**: Verktygsintegration
  - **jules-tool/**: 🔴 Kontrollerad Jules integration
  - **smolagents-tool/**: 🔴 Alternativ kodgenerator
  - **web-search/**: Grundläggande verktyg
  - **file-operations/**: Filhantering
- **decision-engine/**: AGERA/ADAPTERA/PROCESSA logik

## Teknisk Stack:
- LangChain orchestration
- LlamaIndex minne
- Gemini API för kodgenerering
- Vercel serverless functions
- Supabase databas