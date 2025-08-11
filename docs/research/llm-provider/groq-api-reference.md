# Groq API Reference - RAW Import

**Import Date:** 11 augusti 2025  
**Source:** https://console.groq.com/docs/api-reference  
**Note:** This is RAW documentation since I may lack current API details in my training data  
**Status:** Complete API reference with all parameters and examples

# Groq API Reference

## Create chat completion

POST https://api.groq.com/openai/v1/chat/completions

Creates a model response for the given chat conversation.

### Request Body

* **messages** (array, Required) - A list of messages comprising the conversation so far.
* **model** (string, Required) - ID of the model to use. For details on which models are compatible with the Chat API, see available models
* **exclude_domains** (array or null, Optional, Deprecated) - Use search_settings.exclude_domains instead. A list of domains to exclude from the search results when the model uses a web search tool.
* **exclude_instance_ids** (array or null, Optional) - For internal use only
* **frequency_penalty** (number or null, Optional, Defaults to 0, Range: -2 - 2) - This is not yet supported by any of our models. Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
* **function_call** (string / object or null, Optional, Deprecated) - Deprecated in favor of `tool_choice`. Controls which (if any) function is called by the model. `none` means the model will not call a function and instead generates a message. `auto` means the model can pick between generating a message or calling a function. Specifying a particular function via `{"name": "my_function"}` forces the model to call that function. `none` is the default when no functions are present. `auto` is the default if functions are present.
* **functions** (array or null, Optional, Deprecated) - Deprecated in favor of `tools`. A list of functions the model may generate JSON inputs for.
* **include_domains** (array or null, Optional, Deprecated) - Use search_settings.include_domains instead. A list of domains to include in the search results when the model uses a web search tool.
* **include_reasoning** (boolean or null, Optional) - Whether to include reasoning in the response. If true, the response will include a `reasoning` field. If false, the model's reasoning will not be included in the response. This field is mutually exclusive with `reasoning_format`.
* **logit_bias** (object or null, Optional) - This is not yet supported by any of our models. Modify the likelihood of specified tokens appearing in the completion.
* **logprobs** (boolean or null, Optional, Defaults to false) - This is not yet supported by any of our models. Whether to return log probabilities of the output tokens or not. If true, returns the log probabilities of each output token returned in the `content` of `message`.
* **max_completion_tokens** (integer or null, Optional) - The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
* **max_tokens** (integer or null, Optional, Deprecated) - Deprecated in favor of `max_completion_tokens`. The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
* **metadata** (object or null, Optional) - This parameter is not currently supported.
* **n** (integer or null, Optional, Defaults to 1, Range: 1 - 1) - How many chat completion choices to generate for each input message. Note that the current moment, only n=1 is supported. Other values will result in a 400 response.
* **parallel_tool_calls** (boolean or null, Optional, Defaults to true) - Whether to enable parallel function calling during tool use.
* **presence_penalty** (number or null, Optional, Defaults to 0, Range: -2 - 2) - This is not yet supported by any of our models. Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
* **reasoning_effort** (string or null, Optional, Allowed values: `none, default, low, medium, high`) - qwen3 models support the following values. Set to 'none' to disable reasoning. Set to 'default' or null to let Qwen reason. openai/gpt-oss-20b and openai/gpt-oss-120b support 'low', 'medium', or 'high'. 'medium' is the default value.
* **reasoning_format** (string or null, Optional, Allowed values: `hidden, raw, parsed`) - Specifies how to output reasoning tokens. This field is mutually exclusive with `include_reasoning`.
* **response_format** (object / object / object or null, Optional) - An object specifying the format that the model must output. Setting to `{ "type": "json_schema", "json_schema": {...} }` enables Structured Outputs which ensures the model will match your supplied JSON schema. `json_schema` response format is only available on supported models. Setting to `{ "type": "json_object" }` enables the older JSON mode, which ensures the message the model generates is valid JSON. Using `json_schema` is preferred for models that support it.
* **search_settings** (object or null, Optional) - Settings for web search functionality when the model uses a web search tool.
* **seed** (integer or null, Optional) - If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same `seed` and parameters should return the same result. Determinism is not guaranteed, and you should refer to the `system_fingerprint` response parameter to monitor changes in the backend.
* **service_tier** (string or null, Optional, Allowed values: `auto, on_demand, flex, performance, null`) - The service tier to use for the request. Defaults to `on_demand`. `auto` will automatically select the highest tier available within the rate limits of your organization. `flex` uses the flex tier, which will succeed or fail quickly.
* **stop** (string / array or null, Optional) - Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.
* **store** (boolean or null, Optional) - This parameter is not currently supported.
* **stream** (boolean or null, Optional, Defaults to false) - If set, partial message deltas will be sent. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a `data: [DONE]` message.
* **stream_options** (object or null, Optional) - Options for streaming response. Only set this when you set `stream: true`.
* **temperature** (number or null, Optional, Defaults to 1, Range: 0 - 2) - What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.
* **tool_choice** (string / object or null, Optional) - Controls which (if any) tool is called by the model. `none` means the model will not call any tool and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools. Specifying a particular tool via `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool. `none` is the default when no tools are present. `auto` is the default if tools are present.
* **tools** (array or null, Optional) - A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for. A max of 128 functions are supported.
* **top_logprobs** (integer or null, Optional, Range: 0 - 20) - This is not yet supported by any of our models. An integer between 0 and 20 specifying the number of most likely tokens to return at each token position, each with an associated log probability. `logprobs` must be set to `true` if this parameter is used.
* **top_p** (number or null, Optional, Defaults to 1, Range: 0 - 1) - An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both.
* **user** (string or null, Optional) - A unique identifier representing your end-user, which can help us monitor and detect abuse.

### Example Request

```bash
curl https://api.groq.com/openai/v1/chat/completions -s \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $GROQ_API_KEY" \
-d '{
  "model": "llama-3.3-70b-versatile",
  "messages": [{
      "role": "user",
      "content": "Explain the importance of fast language models"
  }]
}'
```

### Example Response

```json
{
  "id": "chatcmpl-f51b2cd2-bef7-417e-964e-a08f0b513c22",
  "object": "chat.completion",
  "created": 1730241104,
  "model": "llama3-8b-8192",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Fast language models have gained significant attention in recent years due to their ability to process and generate human-like text quickly and efficiently..."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "queue_time": 0.037493756,
    "prompt_tokens": 18,
    "prompt_time": 0.000680594,
    "completion_tokens": 556,
    "completion_time": 0.463333333,
    "total_tokens": 574,
    "total_time": 0.464013927
  },
  "system_fingerprint": "fp_179b0f92c9",
  "x_groq": { "id": "req_01jbd6g2qdfw2adyrt2az8hz4w" }
}
```

## Create response

POST https://api.groq.com/openai/v1/responses

Creates a model response for the given input.

### Request Body

* **input** (string / array, Required) - Text input to the model, used to generate a response.
* **model** (string, Required) - ID of the model to use. For details on which models are compatible with the Responses API, see available models
* **instructions** (string or null, Optional) - Inserts a system (or developer) message as the first item in the model's context.
* **max_output_tokens** (integer or null, Optional) - An upper bound for the number of tokens that can be generated for a response, including visible output tokens and reasoning tokens.
* **metadata** (object or null, Optional) - Custom key-value pairs for storing additional information. Maximum of 16 pairs.
* **parallel_tool_calls** (boolean or null, Optional, Defaults to true) - Enable parallel execution of multiple tool calls.
* **reasoning** (object or null, Optional) - Configuration for reasoning capabilities when using compatible models.
* **service_tier** (string or null, Optional, Defaults to auto, Allowed values: `auto, default, flex`) - Specifies the latency tier to use for processing the request.
* **store** (boolean or null, Optional, Defaults to false) - Response storage flag. Note: Currently only supports false or null values.
* **stream** (boolean or null, Optional, Defaults to false) - Enable streaming mode to receive response data as server-sent events.
* **temperature** (number or null, Optional, Defaults to 1, Range: 0 - 2) - Controls randomness in the response generation. Range: 0 to 2. Lower values produce more deterministic outputs, higher values increase variety and creativity.
* **text** (object, Optional) - Response format configuration. Supports plain text or structured JSON output.
* **tool_choice** (string / object or null, Optional) - Controls which (if any) tool is called by the model. `none` means the model will not call any tool and instead generates a message. `auto` means the model can pick between generating a message or calling one or more tools. `required` means the model must call one or more tools. Specifying a particular tool via `{"type": "function", "function": {"name": "my_function"}}` forces the model to call that tool. `none` is the default when no tools are present. `auto` is the default if tools are present.
* **tools** (array or null, Optional) - List of tools available to the model. Currently supports function definitions only. Maximum of 128 functions.
* **top_p** (number or null, Optional, Defaults to 1, Range: 0 - 1) - Nucleus sampling parameter that controls the cumulative probability cutoff. Range: 0 to 1. A value of 0.1 restricts sampling to tokens within the top 10% probability mass.
* **truncation** (string or null, Optional, Defaults to disabled, Allowed values: `auto, disabled`) - Context truncation strategy. Supported values: `auto` or `disabled`.
* **user** (string, Optional) - Optional identifier for tracking end-user requests.