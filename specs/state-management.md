# State Management Strategy

This document outlines the state management strategy for the Visual Approval Dashboard.

## Library

We will use `React Query` for managing server state (data fetching, caching, and synchronization) and `React Context` for managing global UI state.

## Server State (`React Query`)

*   **Caching:** `React Query` will cache the results of API requests to avoid redundant fetching and improve performance.
*   **Real-time Updates:** We will use `React Query`'s `refetchInterval` option to periodically refetch data from the server, providing near real-time updates. For a more advanced implementation, we could integrate with a WebSocket service to push updates to the client.
*   **Mutations:** `React Query`'s `useMutation` hook will be used to handle create, update, and delete operations (e.g., approving or rejecting a pull request).

## UI State (`React Context`)

*   **Global State:** We will use `React Context` to manage global UI state that needs to be shared across multiple components, such as:
    *   The currently selected pull request.
    *   The visibility of modals and dialogs.
    *   User preferences (e.g., theme).

*   **State Structure:**

    ```typescript
    interface AppState {
      selectedPullRequestId: number | null;
      isConfirmationModalOpen: boolean;
    }
    ```
