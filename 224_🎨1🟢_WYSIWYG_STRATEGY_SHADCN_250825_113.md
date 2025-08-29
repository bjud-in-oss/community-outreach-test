# 🎨 WYSIWYG Editor Strategy

**PROPOSAL_ID:** SEP-0023 (Implicit)
**STATUS:** 🟢 BESLUTAT
**TITLE:** Strategy for Building a WYSIWYG Editor using the Decided UI Stack
**TARGET_AUDIENCE:** Core Agent, UI Developers

## 1. Core Problem

The platform requires a rich-text (WYSIWYG) editor for various applications, such as "Minnenas Bok" (SEP-008) and "Empatibryggan" (SEP-009). This editor must be:
1.  **Senior-Friendly:** Intuitive and simple, hiding unnecessary complexity.
2.  **Customizable:** Easily adaptable to different project needs.
3.  **Agent-Driven:** Possible for the `Core Agent` to construct and manipulate programmatically.

## 2. Architectural Decision: Tiptap + shadcn/ui

The official strategy is to combine a "headless" editor core with our existing `shadcn/ui` component library.

-   **Editor Core: Tiptap**
    -   **Why?** Tiptap is a headless, framework-agnostic rich-text editor toolkit. It provides all the complex state management and logic for text editing but leaves the entire UI (the "head") up to us. This gives us maximum control.
    -   **Function:** Manages the document model, schema, and commands (e.g., `toggleBold()`, `setHeading()`, `insertImage()`).

-   **UI Layer: shadcn/ui**
    -   **Why?** Our decided UI stack (`113_🎨1🟢_UI_STACK_SHADCN...`) provides the perfect, un-styled, and accessible components to build a custom UI for the editor.
    -   **Function:** We will use `shadcn/ui` components like `Toolbar`, `Toggle`, `Button`, `DropdownMenu`, and `Dialog` to build the editor's entire user interface. Each UI element will simply trigger a command on the Tiptap editor instance.

### Conceptual Implementation

```tsx
// A conceptual example of the integration
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { EditorToolbar } from './EditorToolbar' // Our custom toolbar built with shadcn/ui

const WysiwygEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div className="flex flex-col">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="p-4 border rounded-b-md" />
    </div>
  )
}
```

## 3. Benefits of this Approach

-   **Total Design Control:** We can make the editor look and feel *exactly* how we want, ensuring it's 100% senior-friendly.
-   **Extensibility:** We can easily add custom functionality (e.g., a special "memory" block) by creating new Tiptap extensions and corresponding `shadcn/ui` components.
-   **Agent-Friendly:** The `Core Agent` can easily construct an editor by generating the React code that combines Tiptap with the required `shadcn/ui` components.

## 4. Alternative: BlockNote

For rapid prototyping, **BlockNote** is an excellent higher-level library. It is built on top of Tiptap and is designed with a similar philosophy to `shadcn/ui`. It offers a more out-of-the-box experience while still being highly customizable and has official integration examples with `shadcn/ui`. It can be considered a "fast track" to achieving our goal.

## 🚀 Next Steps

1.  Create a prototype of the WYSIWYG editor using Tiptap and `shadcn/ui` for the "Minnenas Bok" application.
2.  Define a set of standard, senior-friendly toolbar configurations that the `Core Agent` can choose from.