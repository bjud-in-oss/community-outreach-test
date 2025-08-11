# Gemini CLI - Förstå grundkapabiliteterna i Googles CLI-verktyg

## Dokumentinformation
- **URL**: https://github.com/google-gemini/gemini-cli
- **Kategori**: gemini-cli-core
- **Relevans**: karn-agent
- **Prioritet**: critical
- **Rationale**: Arbetshästen för kärn-agenten - kodgenerering, planering, dokumentanalys

## Analys för Dubbelt Medvetandesystem

### Medveten Agent Relevans
- **Free Tier**: 60 requests/min perfekt för senior-interaktioner
- **Multimodal**: Kan förstå bilder/sketches från seniorer
- **Natural Language**: Direkt kommunikation utan teknisk jargong

### Omedveten Agent Relevans
- **Code Understanding**: Analysera stora kodbaser för kärn-agenten
- **Built-in Tools**: Google Search, file operations, shell commands
- **MCP Support**: Extensible med custom integrations
- **1M Token Context**: Hantera stora dokument och komplex kontext

### Integration med Dubbelt System
- **Guardrail Requirements**: Custom context files (GEMINI.md) för beteendekontroll
- **Memory System Impact**: Conversation checkpointing för sessionskontinuitet
- **ReAct Chain Integration**: Non-interactive scripting för automation

### Kostnadspåverkan
- **Free Tier**: 60 requests/min, 1000/dag - perfekt för start
- **Church Budget**: Helt gratis med personligt Google-konto
- **Scalability**: Kan uppgradera till betald tier vid behov

### Implementation Prioritet
- **Score**: 18 (Critical + Free + Powerful)
- **Phase**: Fas 0
- **Reasoning**: Gratis, kraftfull, perfekt för både agenter

## Key Features för Dubbelt Medvetandesystem

### Code Understanding & Generation
- Query och edit stora kodbaser (kärn-agent)
- Generate apps från PDFs/images (medveten agent kan visa seniorer)
- Debug med natural language (dölj teknisk komplexitet)

### Automation & Integration  
- MCP servers för custom capabilities
- Non-interactive scripts för workflow automation
- GitHub integration för kodhantering

### Advanced Capabilities
- Google Search grounding för real-time info
- Conversation checkpointing för minne
- Custom context files för projektspecifik beteende

## Originalinnehåll
## Gemini CLI

Gemini CLI is an open-source AI agent that brings the power of Gemini directly into your terminal. It provides lightweight access to Gemini, giving you the most direct path from your prompt to our model.

## 🚀 Why Gemini CLI?

* **🎯 Free tier**: 60 requests/min and 1,000 requests/day with personal Google account
* **🧠 Powerful Gemini 2.5 Pro**: Access to 1M token context window
* **🔧 Built-in tools**: Google Search grounding, file operations, shell commands, web fetching
* **🔌 Extensible**: MCP (Model Context Protocol) support for custom integrations
* **💻 Terminal-first**: Designed for developers who live in the command line
* **🛡️ Open source**: Apache 2.0 licensed

## 📦 Installation
### Quick Install
#### Run instantly with npx
```
npx https://github.com/google-gemini/gemini-cli
```

## 📋 Key Features
* **Code Understanding & Generation**
  + Query and edit large codebases
  + Generate new apps from PDFs, images, or sketches using multimodal capabilities
  + Debug issues and troubleshoot with natural language
* **Automation & Integration**
  + Automate operational tasks like querying pull requests or handling complex rebases
  + Use MCP servers to connect new capabilities
  + Run non-interactively in scripts for workflow automation
* **Advanced Capabilities**
  + Ground your queries with built-in Google Search for real-time information
  + Conversation checkpointing to save and resume complex sessions
  + Custom context files (GEMINI.md) to tailor behavior for your projects