# Context7 MCP - Up-to-date Code Docs For Any Prompt - RAW Import

**Import Date:** 11 augusti 2025  
**Source:** https://github.com/upstash/context7  
**Note:** This is RAW documentation since I lack this MCP server information in my training data  
**Status:** Complete Context7 MCP documentation with installation and usage

# Context7 MCP - Up-to-date Code Docs For Any Prompt

## Problem Context7 Solves

### ❌ Without Context7
LLMs rely on outdated or generic information about the libraries you use. You get:
- ❌ Code examples are outdated and based on year-old training data
- ❌ Hallucinated APIs don't even exist
- ❌ Generic answers for old package versions

### ✅ With Context7
Context7 MCP pulls up-to-date, version-specific documentation and code examples straight from the source — and places them directly into your prompt.

Add `use context7` to your prompt in Cursor:

```
Create a Next.js middleware that checks for a valid JWT in cookies and redirects unauthenticated users to `/login`. use context7
```

```
Configure a Cloudflare Worker script to cache JSON API responses for five minutes. use context7
```

Context7 fetches up-to-date code examples and documentation right into your LLM's context.

## How It Works

1. **Write your prompt naturally**
2. **Tell the LLM to `use context7`**
3. **Get working code answers**

No tab-switching, no hallucinated APIs that don't exist, no outdated code generations.

## Installation

### Requirements
- Node.js >= v18.0.0
- Cursor, Windsurf, Claude Desktop or another MCP Client

### Installing via Smithery

To install Context7 MCP Server for any client automatically via Smithery:

```bash
npx -y @smithery/cli@latest install @upstash/context7-mcp --client <CLIENT_NAME> --key <YOUR_SMITHERY_KEY>
```

You can find your Smithery key in the Smithery.ai webpage.

### Install in Cursor

Go to: `Settings` -> `Cursor Settings` -> `MCP` -> `Add new global MCP server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file is the recommended approach. You may also install in a specific project by creating `.cursor/mcp.json` in your project folder.

#### Cursor Remote Server Connection

```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp"
    }
  }
}
```

#### Cursor Local Server Connection

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

#### Alternative: Use Bun

```json
{
  "mcpServers": {
    "context7": {
      "command": "bunx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

#### Alternative: Use Deno

```json
{
  "mcpServers": {
    "context7": {
      "command": "deno",
      "args": [
        "run",
        "--allow-env=NO_DEPRECATION,TRACE_DEPRECATION",
        "--allow-net",
        "npm:@upstash/context7-mcp"
      ]
    }
  }
}
```

## Key Features

- **Up-to-date Documentation**: Fetches current documentation directly from source
- **Version-specific Examples**: Gets code examples for the exact version you're using
- **No Hallucinations**: Real APIs and methods, not made-up ones
- **Natural Integration**: Just add "use context7" to any prompt
- **Multiple Client Support**: Works with Cursor, Windsurf, Claude Desktop, and other MCP clients
- **Multiple Runtime Support**: Works with Node.js, Bun, and Deno

## Usage Examples

### Next.js Middleware Example
```
Create a Next.js middleware that checks for a valid JWT in cookies and redirects unauthenticated users to `/login`. use context7
```

### Cloudflare Worker Example
```
Configure a Cloudflare Worker script to cache JSON API responses for five minutes. use context7
```

## Adding Projects

Check out the project addition guide to learn how to add (or update) your favorite libraries to Context7.

## Benefits for Development

- **No Tab-switching**: Get documentation directly in your prompt
- **Current Information**: Always up-to-date with latest versions
- **Working Code**: Examples that actually work with current APIs
- **Faster Development**: Less time searching for documentation
- **Reduced Errors**: Fewer bugs from outdated examples