# Requirements: Limbic System Service (SEP-001)

**User Story:** As a primary agent (Conscious, Coordinator, Core), I need to subscribe to a central `Limbic System Service` to receive real-time updates on both `User_State` and `Agent_State` so that I can make more context-aware, empathetic, and robust decisions.

---

### **Requirement 1: Service Extraction and Establishment**
The functionality of the `Empathy Engine` SHALL be extracted from the `Conscious Agent` and refactored into a new, standalone, and foundational `Limbic System Service`.

#### Acceptance Criteria
1.  **WHEN** the system starts, **THEN** the `Limbic System Service` SHALL be initialized as a core, independent service.
2.  **WHEN** the `Conscious Agent` is initialized, **THEN** it SHALL NOT contain the `Empathy Engine` logic directly.

---

### **Requirement 2: Dual-State Vector Tracking**
The `Limbic System Service` SHALL continuously generate and broadcast two distinct state vectors: `User_State` and `Agent_State`.

#### Acceptance Criteria
1.  **GIVEN** user input, **THEN** the service SHALL analyze it and publish an updated `User_State` vector structured according to the SEP-007 model (`Closeness/Separation`, `FIGHT`, `FLIGHT`, `FIXES & FIXATION`).
2.  **GIVEN** internal system events (e.g., task success, tool failure, resource depletion), **THEN** the service SHALL analyze them and publish an updated `Agent_State` vector structured according to the SEP-007 model.

---

### **Requirement 3: Agent Subscription Model**
All primary agents (`Conscious`, `Coordinator`, `Core`) SHALL implement a subscriber client to receive and process real-time updates from the `Limbic System Service`.

#### Acceptance Criteria
1.  **WHEN** the `Limbic System Service` broadcasts a new `User_State`, **THEN** the `Conscious Agent` and `Coordinator Agent` SHALL receive and use this data to inform their next actions.
2.  **WHEN** the `Limbic System Service` broadcasts a new `Agent_State`, **THEN** the `Core Agent` and `Coordinator Agent` SHALL receive and use this data to inform their internal state and error-handling strategies.