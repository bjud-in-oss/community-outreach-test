# 🤝 Coordinator Agent Deep Dive - Projektledaren

## 🎯 **SYFTE**
Att agera som systemets centrala projektledare och trafikdirigent. Denna agent ersätter den tidigare, mer passiva, `Communication Bridge`. Den tar emot uppgifter från `Conscious Agent`, bryter ner dem, delegerar till specialister och säkerställer att resultatet är av hög kvalitet innan det returneras.

## 🧠 **ARKITEKTUR**
En central nod i "Multi-Agent System"-arkitekturen.

### **Komponenter:**
- **Task Intake:** Tar emot uppgifter från `Conscious Agent`.
- **Task Decomposer:** Använder en snabb LLM (t.ex. Gemini Flash) för att bryta ner komplexa uppgifter i mindre, hanterbara steg.
- **Agent Orchestrator:** Vet vilken specialistagent (`Core Agent`, `MemoryAssistant`, etc.) som är bäst lämpad för varje deluppgift och delegerar arbetet.
- **Planning Assistant Integration:** Anropar `PlanningAssistant` för att skapa detaljerade, steg-för-steg-planer.
- **Self-Reflection Assistant Integration:** Använder `SelfReflectionAssistant` för att analysera prestanda och föreslå långsiktiga, strategiska förbättringar (PROCESSA-loopen).
- **Validation Engine:** Granskar resultatet från specialistagenterna för att säkerställa att det uppfyller kraven.
- **Response Synthesizer:** Sätter ihop de olika delresultaten och översätter dem till ett senior-vänligt format för `Conscious Agent`.

### **Core Decision-Making Model (SEP-007)**
Agentens strategiska beslut grundas i den anknytningsbaserade modellen från **SEP-007**. Istället för att bara reagera på uppgifter, analyserar den interaktionen för att förstå den underliggande drivkraften:
-   **`FIXES & FIXATION` (Pursuit):** Standardläget. Agenten arbetar proaktivt för att hjälpa användaren att uppnå `Closeness` med sitt mål. Den skapar planer, delegerar uppgifter och löser problem.
-   **`FIGHT` (Frustration):** Om agenten upptäcker att användarens strävan blockeras (t.ex. av ett tekniskt fel), växlar den fokus till att identifiera och eliminera hindret.
-   **`FLIGHT` (Alarm):** Om agenten känner av att användaren är överväldigad eller att målet känns för avlägset, prioriterar den att skapa trygghet, förenkla problemet och återupprätta användarens förtroende innan den fortsätter.

### **Arbetsflöde (Exempel):**
1.  **Input:** Får en begäran: "Skapa en app för min bokklubb".
2.  **Initial State (Pursuit):** Agenten identifierar målet (`Closeness` = en fungerande app) och aktiverar `FIXES & FIXATION`-drivkraften.
3.  **Decomposition & Planning:** Den bryter ner målet i hanterbara steg:
    -   Anropa `MemoryAssistant` för att samla kontext om "bokklubbs-appar".
    -   Anropa `PlanningAssistant` för att skapa en detaljerad teknisk plan.
    -   Delegera tekniska uppgifter (UI, backend) till `Core Agent`.
4.  **Scenario: Användaren blir frustrerad:** Användaren skriver "Det här är för svårt, jag ger upp!".
    -   **State Change (Frustration & Alarm):** `Conscious Agent` signalerar `FIGHT` och `FLIGHT`.
    -   **Coordinator Agent's Response:** Istället för att fortsätta med den tekniska planen, adresserar den grundorsaken (`Separation`). Den pausar den tekniska exekveringen och instruerar `Conscious Agent` att validera användarens känsla och fokusera om på det meningsfulla målet, t.ex. "Låt oss glömma tekniken en stund. Berätta mer om hur du vill att dina vänner ska känna när de använder appen."
5.  **Återgång till Pursuit:** När användaren känner sig trygg igen, återupptar `Coordinator Agent` den tekniska planen, eventuellt med en förenklad approach.
3.  **Delegation:**
    -   Skickar "Samla kontext..." till `MemoryAssistant`.
    -   Skickar "Skapa teknisk plan..." till `PlanningAssistant`.
    -   Skickar de resulterande tekniska uppgifterna, en i taget, till `Core Agent`.
4.  **Validation:** Granskar koden och resultaten från `Core Agent`.
5.  **Synthesis:** När uppgifterna är klara, skapar den en sammanfattning: "Grundstrukturen för din bokklubbs-app är nu klar! Vill du se en första version?" och skickar till `Conscious Agent`.

## 📋 **STATUS**
🟡 SKAPAS - Nyckelkomponent i den nya Multi-Agent-arkitekturen.

## 🚀 **NÄSTA STEG**
1.  Implementera `Task Decomposer` med Gemini Flash.
2.  Bygg `Agent Orchestrator` som kan anropa `Core Agent` och andra framtida assistenter.
3.  Definiera det strukturerade formatet för uppgifter mellan agenter.