# Community Outreach Platform Architecture Analysis

This document provides a comprehensive analysis of the community-outreach-platform repository, covering the current WYSIWYG implementation, TypeScript context preservation system, specs, and architecture.

## 1. Current Tech Stack and Patterns

*   **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
*   **Backend:** Google Apps Script, Google Sheets
*   **WYSIWYG Editor:** Tiptap
*   **Architecture:** Adapter Pattern, Spec-Driven Development

The project uses a modern tech stack with a unique architecture that combines a Google Apps Script backend with a React frontend. The use of the adapter pattern allows for a clean separation between the data model and the UI components.

## 2. Context Preservation Implementation

The TypeScript context preservation system is the core of the application's architecture. It is responsible for translating the hierarchical layout data from the backend into a format that the UI can easily consume, and then translating the UI changes back into the layout format.

The key components of this system are:

*   **`Element` interface:** This interface defines the structure of a piece of content in the layout.
*   **`IntroContent` interface:** This interface defines the structure of the content that is used by the UI components.
*   **`convertLayoutToIntroContent` function:** This function converts an array of `Element` objects into an `IntroContent` object.
*   **`updateLayoutFromIntroContent` function:** This function updates an array of `Element` objects with the new content from an `IntroContent` object.

The `metadata` field in the `Element` interface is the key to this system. It allows the adapters to understand the semantic meaning of each element, and to correctly map it to and from the `IntroContent` format.

## 3. WYSIWYG Components and Structure

The project uses the Tiptap library for the WYSIWYG editor. There are two implementations of the editor:

*   **`WYSIWYGEditor.tsx`:** A full-featured editor with extensions for tables, text style, and color.
*   **`SimpleWYSIWYGTest.tsx`:** A simpler implementation for testing purposes.

The editor's content is stored as HTML.

## 4. Specs and Documentation Patterns

The project uses a combination of `AGENTS.md` and "Level-2 process documents" to define the specs and documentation.

*   **`AGENTS.md`:** This file defines the communication protocols between the AI agents.
*   **Level-2 process documents:** These documents contain the development process knowledge that is used by the "Enhanced Steering System".
*   **Kiro IDE:** The Kiro IDE is used to create and manage the specs.

## 5. Integration Opportunities with Jules Agent

There are several opportunities to integrate Jules Agent into the project:

*   **Automated Testing:** Jules Agent could be used to automate the testing of the WYSIWYG editor and the context preservation system.
*   **Component Generation:** Jules Agent could be used to generate new UI components based on the specifications in the `.kiro/specs` directory.
*   **Documentation Generation:** Jules Agent could be used to generate documentation for the project.
*   **Code Refactoring:** Jules Agent could be used to refactor the code to improve its quality and maintainability.
*   **Enhanced Steering System Integration:** Jules Agent could be integrated with the "Enhanced Steering System" to provide even more intelligent development guidance.

To better integrate Jules Agent, the communication protocols in `AGENTS.md` should be updated to include a new `jules` agent and new message types. A new `jules` command could also be added to the Kiro IDE.
