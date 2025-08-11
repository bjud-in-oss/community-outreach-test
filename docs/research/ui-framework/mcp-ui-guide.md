# MCP-UI Guide - Interactive UI Components for MCP Applications

## Introduction

MCP-UI provides tools for building Model Context Protocol (MCP) enabled applications with interactive UI components. It aims to standardize how models and tools can request the display of rich HTML interfaces within a client application.

## What is MCP-UI?

MCP-UI provides SDKs for multiple languages, including:

* **`@mcp-ui/client`**: A Typescript package with UI components for easy rendering of interactive UI. It includes a React component (`<UIResourceRenderer />`) and a standard Web Component (`<ui-resource-renderer>`).
* **`@mcp-ui/server`**: A Typescript package with helper functions (like `createUIResource`) for server-side logic to easily construct `UIResource` objects.
* **`mcp_ui_server`**: A Ruby gem with helper methods (like `create_ui_resource`) for server-side logic in Ruby applications.

## The Interactive UI Resource Protocol

The central piece of this SDK is the `UIResource`. This object defines a contract for how interactive UI should be structured and delivered from a server/tool to a client.

### `UIResource` Structure

```typescript
interface UIResource {
  type: 'resource';
  resource: {
    uri: string;       // ui://component/id
    mimeType: 'text/html' | 'text/uri-list' | 'application/vnd.mcp-ui.remote-dom'; // text/html for HTML content, text/uri-list for URL content, application/vnd.mcp-ui.remote-dom for remote-dom content (Javascript)
    text?: string;      // Inline HTML or external URL
    blob?: string;      // Base64-encoded HTML or URL
  };
}
```

### Key Field Details

* **`uri` (Uniform Resource Identifier)**:
  + All UI resources use the `ui://` scheme (e.g., `ui://my-custom-form/instance-01`)
  + The rendering method is determined by the `mimeType`:
    - `mimeType: 'text/html'` → HTML content rendered via `<iframe srcdoc>`
    - `mimeType: 'text/uri-list'` → URL content rendered via `<iframe src>`
* **`mimeType`**: `'text/html'` for HTML content, `'text/uri-list'` for URL content
* **`text` or `blob`**: The actual content (HTML string or URL string), either as plain text or Base64 encoded

## How It Works

1. **Server Side**: Use the server SDK for your language to create `UIResource` objects.
2. **Client Side**: Use `@mcp-ui/client` to render these resources in your frontend application.

### Example Flow

**Server (MCP Tool):**

```typescript
import { createUIResource } from '@mcp-ui/server';

const resource = createUIResource({
  uri: 'ui://my-tool/dashboard',
  content: { type: 'rawHtml', htmlString: '<h1>Dashboard</h1>' },
  encoding: 'text'
});

// Return in MCP response
return { content: [resource] };
```

**Client (Frontend App):**

React Component:
```tsx
import { UIResourceRenderer } from '@mcp-ui/client';

function App({ mcpResponse }) {
  return (
    <div>
      {mcpResponse.content.map((item) => (
        <UIResourceRenderer
          key={item.resource.uri}
          resource={item.resource}
          onUIAction={(result) => {
            console.log('Action:', result);
            return { status: 'handled' };
          }}
        />
      ))}
    </div>
  );
}
```

Web Component:
```html
<!-- index.html -->
<ui-resource-renderer id="resource-renderer"></ui-resource-renderer>

<!-- main.js -->
<script type="module">
  // 1. Import the script to register the component
  import '@mcp-ui/client/ui-resource-renderer.wc.js';

  // 2. This object would come from your MCP response
  const mcpResource = {
    resource: {
      uri: 'ui://user-form/1',
      mimeType: 'text/uri-list',
      text: 'https://example.com'
    }
  };

  // 3. Get the element and pass data
  const renderer = document.getElementById('resource-renderer');
  renderer.resource = mcpResource.resource;

  // 4. Listen for events
  renderer.addEventListener('onUIAction', (event) => {
    console.log('User action:', event.detail);
  });
</script>
```

## Key Benefits

* **Standardized**: Consistent interface for UI resources across MCP applications
* **Secure**: Sandboxed iframe execution prevents malicious code from affecting the host
* **Interactive**: Two-way communication between resources and host application
* **Flexible**: Supports both direct HTML content and external applications
* **Future-proof**: Extensible design supports new resource types

## Use Cases for Senior-Friendly Applications

* **Dynamic Forms**: Create senior-friendly forms with large buttons and clear labels
* **Interactive Dashboards**: Display information in accessible, easy-to-read formats
* **Guided Workflows**: Step-by-step interfaces that guide seniors through complex tasks
* **Visual Feedback**: Rich visual components that provide clear status and progress indicators