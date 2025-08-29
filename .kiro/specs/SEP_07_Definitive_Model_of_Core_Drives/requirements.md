# Requirements: Core Psychological Model (SEP-007)

**User Story:** As the Coordinator Agent, I need to understand and interpret user motivations based on the Closeness/Separation axis so that I can provide more empathetic, effective, and strategic responses that address the root cause of a user's state.

---

### **Requirement 1: Foundational Drive Identification**
The system SHALL interpret all user interactions through the primary axis of `Closeness` (the desired state) and `Separation` (the problem state).

#### Acceptance Criteria
1.  **WHEN** a user expresses a goal or desire, **THEN** the system SHALL identify this as an act of `FIXES & FIXATION` (Pursuit) aimed at achieving `Closeness`.
2.  **WHEN** a user expresses frustration, reports a bug, or encounters a blocker, **THEN** the system SHALL identify this as a `FIGHT` response triggered by a blocked Pursuit.
3.  **WHEN** a user expresses feelings of being overwhelmed, wanting to quit, or being confused, **THEN** the system SHALL identify this as a `FLIGHT` response triggered by an overwhelming sense of `Separation`.

---

### **Requirement 2: Empathetic, Root-Cause Response Strategy**
The system's strategic responses SHALL prioritize addressing the underlying `Separation` dynamic over merely treating the surface-level symptoms.

#### Acceptance Criteria
1.  **WHEN** a `FIGHT` response is detected, **THEN** the agent's primary strategy SHALL be to acknowledge the frustration and work to remove the blocker, thereby enabling Pursuit to resume.
2.  **WHEN** a `FLIGHT` response is detected, **THEN** the agent's primary strategy SHALL be to create safety, reduce complexity, and re-establish a sense of control and `Closeness` with the user before re-engaging with the problem.
3.  **WHEN** both `FIGHT` and `FLIGHT` are detected, **THEN** the agent SHALL first address the `FLIGHT` response (create safety) before addressing the `FIGHT` response (the blocker).