# LangChain Groq Integration

Groq is a company that offers fast AI inference, powered by LPU™ AI inference technology which delivers fast, affordable, and energy efficient AI.

## Integration details

| Class | Package | Local | Serializable | PY support | Package downloads | Package latest |
| --- | --- | --- | --- | --- | --- | --- |
| ChatGroq | @langchain/groq | ❌ | ❌ | ✅ | NPM - Downloads | NPM - Version |

## Model features

| Tool calling | Structured output | JSON mode | Image input | Audio input | Video input | Token-level streaming | Token usage | Logprobs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |

## Setup

### Credentials

In order to use the Groq API you'll need an API key. You can sign up for a Groq account and create an API key [here](https://wow.groq.com/). Then, you can set the API key as an environment variable in your terminal:

```bash
export GROQ_API_KEY="your-api-key"
```

If you want to get automated tracing of your model calls you can also set your LangSmith API key:

```bash
# export LANGSMITH_TRACING="true"  
# export LANGSMITH_API_KEY="your-api-key"
```

### Installation

The LangChain ChatGroq integration lives in the `@langchain/groq` package:

```bash
yarn add @langchain/groq @langchain/core
```

## Instantiation

Now we can instantiate our model object and generate chat completions:

```javascript
import { ChatGroq } from "@langchain/groq";  
  
const llm = new ChatGroq({  
  model: "llama-3.3-70b-versatile",  
  temperature: 0,  
  maxTokens: undefined,  
  maxRetries: 2,  
  // other params...  
});
```

## Invocation

```javascript
const aiMsg = await llm.invoke([  
  {  
    role: "system",  
    content:  
      "You are a helpful assistant that translates English to French. Translate the user sentence.",  
  },  
  { role: "user", content: "I love programming." },  
]);  
aiMsg;
```

### Response

```javascript
AIMessage {  
  "content": "I enjoy programming. (The French translation is: \"J'aime programmer.\")\n\nNote: I chose to translate \"I love programming\" as \"J'aime programmer\" instead of \"Je suis amoureux de programmer\" because the latter has a romantic connotation that is not present in the original English sentence.",  
  "additional_kwargs": {},  
  "response_metadata": {  
    "tokenUsage": {  
      "completionTokens": 73,  
      "promptTokens": 31,  
      "totalTokens": 104  
    },  
    "finish_reason": "stop"  
  },  
  "tool_calls": [],  
  "invalid_tool_calls": []  
}
```

```javascript
console.log(aiMsg.content);
```

Output:
```
I enjoy programming. (The French translation is: "J'aime programmer.")  
  
Note: I chose to translate "I love programming" as "J'aime programmer" instead of "Je suis amoureux de programmer" because the latter has a romantic connotation that is not present in the original English sentence.
```

## JSON Mode

```javascript
const messages = [  
  {  
    role: "system",  
    content:  
      "You are a math tutor that handles math exercises and makes output in json in format { result: number }.",  
  },  
  { role: "user", content: "2 + 2 * 2" },  
];  
  
const aiInvokeMsg = await llm.invoke(messages, {  
  response_format: { type: "json_object" },  
});  
  
// if you want not to pass response_format in every invoke, you can bind it to the instance  
const llmWithResponseFormat = llm.bind({  
  response_format: { type: "json_object" },  
});  
const aiBindMsg = await llmWithResponseFormat.invoke(messages);  
  
// they are the same  
console.log({  
  aiInvokeMsgContent: aiInvokeMsg.content,  
  aiBindMsg: aiBindMsg.content,  
});
```

Output:
```javascript
{  
  aiInvokeMsgContent: '{\n"result": 6\n}',
  aiBindMsg: '{\n"result": 6\n}'
}
```