# SEP-001: Limbic System Service: Core Emotional State Monitor

**PROPOSAL_ID:** SEP-001 (Consolidated Final Version)
**DATE:** 2025-08-25
**TITLE:** Limbic System Service: Core Emotional State Monitor
**AFFECTED_COMPONENTS:** Conscious Agent, Coordinator Agent, Core Agent

## 1. Översikt

Denna tjänst utgör systemets "nervsystem". Istället för att emotionell intelligens är en isolerad funktion i kommunikationslagret, blir den en fundamental, underliggande tjänst som alla andra agenter använder för att förstå den rådande kontexten. Den tillhandahåller en kontinuerlig, dubbelriktad analys av den relationella dynamiken.

## 2. Kravspecifikation

**ACTION:**

1.  **Extract & Establish Service:** Den nuvarande `Empathy Engine`-funktionaliteten ska extraheras från `Conscious Agent` och etableras som en fristående, fundamental systemtjänst: `Limbic System Service`.

2.  **Implement Dual-Tracking Model:** Tjänsten måste generera och sända ut två separata, parallella tillstånds-vektorer i realtid:
    -   **`User_State`:** Baserad på extern avläsning av användarens input och kontext.
    -   **`Agent_State`:** Baserad på intern självdiagnostik, som mäter agentens egen framgång, konflikt eller osäkerhet i förhållande till sina mål.

3.  **Define Core Measurement Axis:** Tjänstens analys ska vara hierarkisk och grundad i anknytningsteori:
    -   **3.1. Primary Axis Tracking:** Den primära och mest fundamentala mätningen ska vara den upplevda nivån av `Closeness` och `Separation`. Detta är den grundläggande relationella balansen.
    -   **3.2. Adaptive Response Tracking:** Tjänsten ska därefter mäta de tre grunddrifterna – `FIGHT`, `FLIGHT`, och `FIXES & FIXATION` – som sekundära, adaptiva responser på den rådande `Closeness/Separation`-balansen. Dessa värden ska populeras i både `User_State`- och `Agent_State`-vektorerna.

4.  **Establish Subscription Model:** Alla primära agenter (`Conscious`, `Coordinator`, `Core`) och relevanta assistenter måste prenumerera på `Limbic System Service`s dataström. Denna ström av `User_State` och `Agent_State` ska användas som en fundamental del av deras kontext för allt beslutsfattande.

## 3. Motivation (Rationale)

Denna förfining säkerställer att systemets emotionella analys inte bara är symptomatisk, utan att den alltid är grundad i den primära, relationella dynamiken (`Closeness/Separation`). Detta flyttar emotionell intelligens från att vara en kommunikationsfunktion till att bli en central del av systemets kognitiva arkitektur. Det ger `Coordinator Agent` en mycket djupare grund för strategiska beslut, möjliggör djupare självmedvetenhet och felhantering i `Core Agent`, och skapar en rikare, mer genuint empatisk kommunikation i `Conscious Agent`. Den symmetriska modellen (inre/yttre) är en förutsättning för avancerat agentskap.