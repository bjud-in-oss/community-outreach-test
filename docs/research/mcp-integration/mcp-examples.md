# MCP Examples och Patterns - Förstå hur MCP servers integreras

## Dokumentinformation
- **URL**: https://modelcontextprotocol.io/examples
- **Kategori**: mcp-integration
- **Relevans**: both-agents
- **Prioritet**: critical
- **Rationale**: Förstå hur MCP servers integreras för verktygshantering

## Analys för Dubbelt Medvetandesystem

### Medveten Agent Relevans
- **Fetch Server**: Hämta web-innehåll för senior-research
- **Memory Server**: Persistent minne för senior-konversationer
- **Time Server**: Tidshantering för senior-vänliga scheman

### Omedveten Agent Relevans
- **Filesystem Server**: Säker filhantering för kodgenerering
- **Git Server**: Repository-manipulation för utveckling
- **Sequential Thinking**: Komplex problemlösning genom tankesekvenser

### Integration med Dubbelt System
- **Guardrail Requirements**: Filesystem med configurable access controls
- **Memory System Impact**: Memory server för knowledge graph-baserat minne
- **ReAct Chain Integration**: Sequential Thinking för strukturerad problemlösning

### Kostnadspåverkan
- **Free Tier**: Alla reference servers är open source
- **Church Budget**: Helt gratis att använda och modifiera
- **Scalability**: Kan köras lokalt eller i molnet efter behov

### Implementation Prioritet
- **Score**: 17 (Critical + Both Agents + Free + Extensible)
- **Phase**: Fas 0
- **Reasoning**: Kritisk infrastruktur för verktygsintegration

## Key MCP Servers för Dubbelt Medvetandesystem

### Current Reference Servers (Aktiva)
- **Everything**: Test server för utveckling och debugging
- **Fetch**: Web content fetching (kritisk för research)
- **Filesystem**: Säker filhantering med access controls
- **Git**: Repository-manipulation för kodhantering
- **Memory**: Knowledge graph för persistent minne
- **Sequential Thinking**: Strukturerad problemlösning
- **Time**: Tidshantering och timezone-konvertering

### Archived Servers (Historisk referens)
- **PostgreSQL/SQLite**: Databasintegration för framtida behov
- **Google Drive**: Filintegration för senior-dokument
- **GitHub/GitLab**: Repository management
- **Puppeteer**: Browser automation för testing

## Integration Pattern för Dubbelt Medvetandesystem

### Medveten Agent MCP Stack
```
- Fetch Server (web research för seniorer)
- Memory Server (konversationsminne)
- Time Server (schemahantering)
- Google Drive Server (senior-dokument)
```

### Omedveten Agent MCP Stack
```
- Filesystem Server (kodfilhantering)
- Git Server (repository-kontroll)
- Sequential Thinking (komplex problemlösning)
- GitHub Server (deployment och CI/CD)
```

## Originalinnehåll
This page showcases various Model Context Protocol (MCP) servers that demonstrate the protocol's capabilities and versatility. These servers enable Large Language Models (LLMs) to securely access tools and data sources.

## Reference implementations
These official reference servers demonstrate core MCP features and SDK usage:

### Current reference servers
* **Everything** - Reference / test server with prompts, resources, and tools
* **Fetch** - Web content fetching and conversion for efficient LLM usage
* **Filesystem** - Secure file operations with configurable access controls
* **Git** - Tools to read, search, and manipulate Git repositories
* **Memory** - Knowledge graph-based persistent memory system
* **Sequential Thinking** - Dynamic and reflective problem-solving through thought sequences
* **Time** - Time and timezone conversion capabilities

### Archived servers (historical reference)
⚠️ Note: The following servers have been moved to the servers-archived repository and are no longer actively maintained.

#### Data and file systems
* **PostgreSQL** - Read-only database access with schema inspection
* **SQLite** - Database interaction and business intelligence features
* **Google Drive** - File access and search capabilities

#### Development tools
* **Git** - Repository manipulation tools
* **GitHub** - Repository management and GitHub API integration
* **GitLab** - GitLab API integration for project management
* **Sentry** - Issue analysis from Sentry.io

#### Web and browser automation
* **Brave Search** - Web and local search using Brave's Search API
* **Puppeteer** - Browser automation capabilities