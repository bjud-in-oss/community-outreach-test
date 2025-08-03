# Context Preservation System

This system is responsible for preserving context between sessions, managing working/short-term/long-term memory, and integrating with the existing agent system.

## Interfaces

- `IMemory.ts`: Defines the interface for a memory store.
- `ISession.ts`: Defines the interface for a session, which includes short-term and long-term memory.
- `IContext.ts`: Defines the interface for managing sessions.

## Implementations

- `Memory.ts`: An in-memory implementation of `IMemory`.
- `Session.ts`: An implementation of `ISession`.
- `Context.ts`: An implementation of `IContext` that manages sessions.

## Agent

- `agent.ts`: A simple agent that demonstrates how to use the context preservation system.

## Usage

To use the context preservation system, create an instance of the `Context` class and use it to create or retrieve sessions.

```typescript
import { Context } from './implementations/Context';
import { Agent } from './agent/agent';

const context = new Context();
const session = await context.createSession();
const agent = new Agent(context, session.id);

const response = await agent.processMessage("Hello, world!");
console.log(response);
```
