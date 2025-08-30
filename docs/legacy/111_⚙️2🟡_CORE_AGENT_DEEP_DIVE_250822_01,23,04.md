# ⚙️ Core Agent Deep Dive - Kärn-agenten

## 🎯 **SYFTE**
Agentens "tekniska specialist" eller "arbetshäst". Denna agent utför de tunga, komplexa tekniska uppgifterna som den får från `Coordinator Agent`. Den har ingen egen planeringsförmåga utan är en ren exekveringsmotor.

## 🧠 **ARKITEKTUR**
En del av den övergripande "Multi-Agent System"-arkitekturen.

### **Komponenter:**
- **LLM Resource Manager (f.d. Orchestration Layer):** Hanterar API-anrop och väljer intelligent mellan LLM:er (t.ex. Gemini Pro för komplexa uppgifter, Flash för enklare) baserat på uppgiftens art och tillgänglig quota.
- **LLM Orchestration Layer:** Agerar som en centraliserad tjänst för alla LLM-anrop i systemet. Den hanterar API-nycklar, modellval (t.ex. Gemini Pro/Flash, Groq) och prompt-strategier för att optimera kostnad och prestanda.
- LlamaIndex Memory (Semantic RAG för teknisk dokumentation)
- Specialized Tools (Jules, Smolagents, **Composio for external service integrations like Google, GitHub, Vercel**, etc.)

### **Minnesarkitektur Notering:**
Inom ramen för "Multi-Loop, Specialized-RAG"-arkitekturen använder Kärn-agenten ett **Semantic RAG** (implementerat med LlamaIndex) för att söka i teknisk data. Detta är i kontrast till den Medvetna Agentens loop, som använder ett **Graph RAG** för att hantera konversationsminne och relationer.

### **Tool Integration (Composio):**
För att interagera med externa system (både vår interna infrastruktur som **GitHub** och **Vercel**, samt senior-vända tjänster som **Google Workspace**) använder Kärn-agenten ett centraliserat verktyg som drivs av en self-hosted Composio-instans. Detta abstraherar bort komplexiteten i varje enskilt API och ger agenten en enhetlig, kraftfull "universal-fjärrkontroll" för att utföra uppgifter. Detta är avgörande för både systemets interna DevOps-automatisering och för att kunna utföra tjänster åt seniorer.

### **Exekveringsmodell (AGERA/ADAPTERA/PROCESSA):**
1.  **Input:** Tar emot en specifik, väl-definierad `Task` från `Coordinator Agent`.
2.  **Taktisk Exekvering (ReAct Loop):** Löser uppgiften med en **ReAct Loop (Reason-Act-Observe)**.
    -   **Reason:** Använder `LangChain` för att resonera kring uppgiften och välja rätt verktyg.
    -   **Act (Agera):** Använder `Tools` (Jules, Composio, Filesystem, etc.) för att utföra handlingar i miljön.
    -   **Observe (Adaptera):** Analyserar resultatet av handlingen. Om det uppstod ett fel eller om resultatet inte var som förväntat, justerar den sin omedelbara plan och försöker igen. Detta är den snabba, taktiska loopen.
3.  **Minne (Kontext):** Använder `LlamaIndex RAG` kontinuerligt för att hämta relevant teknisk kontext och fatta bättre beslut i varje steg av loopen.
4.  **Output:** Returnerar ett konkret resultat (t.ex. genererad kod, en statusrapport) till `Coordinator Agent` för validering och syntes.

*Not: Den djupare, strategiska **PROCESSA**-loopen hanteras av `Coordinator Agent` via `SelfReflectionAssistant` för att säkerställa en tydlig separation mellan taktisk exekvering och långsiktig strategi.*

## 📋 **STATUS**
🟡 SKAPAS - Behöver implementeras baserat på comprehensive tools analysis

## 🔗 **RELATERADE DOKUMENT**
- 01: Master Integration Plan
- 223: Comprehensive Tools Analysis
- 04: Agents Configuration

## 🚀 **NÄSTA STEG**
1. Sätt upp LangChain orchestration för ReAct-loopen.
2. Integrera LlamaIndex memory system för teknisk RAG.
3. Bygg `LLM Orchestration Layer` för att centralisera anrop till Gemini och Groq.
4. Integrera `ComposioTool` för hantering av externa API:er.
5. Implementera den första versionen av den självförbättrande `PROCESSA`-loopen i `Coordinator Agent`.