# Smolagents - Agents that think in code!

`smolagents` is a library that enables you to run powerful agents in a few lines of code. It offers:

## Key Features

✨ **Simplicity**: the logic for agents fits in ~1,000 lines of code (see agents.py). We kept abstractions to their minimal shape above raw code!

🧑‍💻 **First-class support for Code Agents**. Our `CodeAgent` writes its actions in code (as opposed to "agents being used to write code"). To make it secure, we support executing in sandboxed environments via E2B, Docker, or Pyodide+Deno WebAssembly sandbox.

🤗 **Hub integrations**: you can share/pull tools or agents to/from the Hub for instant sharing of the most efficient agents!

🌐 **Model-agnostic**: smolagents supports any LLM. It can be a local `transformers` or `ollama` model, one of many providers on the Hub, or any model from OpenAI, Anthropic and many others via our LiteLLM integration.

👁️ **Modality-agnostic**: Agents support text, vision, video, even audio inputs!

🛠️ **Tool-agnostic**: you can use tools from any MCP server, from LangChain, you can even use a Hub Space as a tool.

## Quick demo

First install the package with a default set of tools:

```bash
pip install smolagents[toolkit]
```

Then define your agent, give it the tools it needs and run it!

```python
from smolagents import CodeAgent, WebSearchTool, InferenceClientModel

model = InferenceClientModel()
agent = CodeAgent(tools=[WebSearchTool()], model=model, stream_outputs=True)

agent.run("How many seconds would it take for a leopard at full speed to run through Pont des Arts?")
```

You can even share your agent to the Hub, as a Space repository:

```python
agent.push_to_hub("my-agent")
```

## Integration Capabilities

### MCP Server Integration
- Use tools from any MCP server
- Seamless integration with existing MCP infrastructure

### LangChain Integration  
- Import tools from LangChain ecosystem
- Bridge between smolagents and LangChain workflows

### Hub Integration
- Share agents and tools on Hugging Face Hub
- Use Hub Spaces as tools directly
- Instant sharing and collaboration

### Model Support
- Local models via `transformers` or `ollama`
- Hub providers for hosted inference
- OpenAI, Anthropic via LiteLLM integration
- Model-agnostic architecture

### Execution Environments
- **E2B**: Cloud-based sandboxed execution
- **Docker**: Containerized execution environment
- **Pyodide+Deno**: WebAssembly sandbox for browser execution

## Security Features

Code agents execute in secure, sandboxed environments to prevent malicious code execution while maintaining full functionality.

## Documentation

Full documentation can be found at: https://huggingface.co/docs/smolagents/index