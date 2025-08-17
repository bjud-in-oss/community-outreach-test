# Requirements Document - Dynamisk Senior Dialog

**Datum:** 2025-08-14  
**Status:** 2🟡 SKAPAS - Revolutionerande dialogbaserad navigation  
**Syfte:** Ersätta statisk 2D-navigation med intelligent LLM-driven dialog  
**Relaterat:** 110_⏰1🟢_TID_TYDLIGHET_DIMENSIONER_250814_109.md

## Introduction

Vi skapar ett hybrid-system där statisk 2D-navigation (tid/tydlighet) ger struktur och stabilitet, medan intelligent dialog-agent erbjuder flexibel, naturlig interaktion. Den statiska planen utgör "ryggmärgen" som låter den dynamiska dialogen blomstra och förlängas. Användaren kan välja mellan strukturerad navigation och fri dialog beroende på situation och preferens.

## Requirements

### Requirement 1: Hybrid Navigation System

**User Story:** Som senior användare vill jag kunna välja mellan strukturerad navigation och fri dialog, så att jag kan arbeta på det sätt som känns bäst för mig i stunden.

#### Acceptance Criteria

1. WHEN användaren öppnar systemet THEN de SHALL kunna välja mellan "Strukturerad planering" och "Fri dialog"
2. WHEN användaren använder dialog THEN systemet SHALL automatiskt uppdatera den statiska strukturen bakom kulisserna
3. WHEN användaren använder statisk navigation THEN dialogen SHALL förstå var de befinner sig i processen
4. WHEN användaren vill växla mellan metoderna THEN övergången SHALL vara smidig utan informationsförlust

### Requirement 2: Kontextuell Verktygsintegration

**User Story:** Som senior användare vill jag att systemet automatiskt erbjuder rätt verktyg vid rätt tidpunkt, så att jag slipper välja mellan tekniska alternativ jag inte förstår.

#### Acceptance Criteria

1. WHEN användaren beskriver visuella element THEN systemet SHALL automatiskt erbjuda diagram-verktyg med enkla ord
2. WHEN användaren nämner färger THEN systemet SHALL visa färgväljare utan att fråga om hex-koder
3. WHEN användaren beskriver funktionalitet THEN systemet SHALL rita upp samband automatiskt
4. WHEN användaren behöver förtydliga THEN systemet SHALL erbjuda konkreta exempel istället för abstrakta begrepp

### Requirement 3: Adaptiv Fördjupning

**User Story:** Som senior användare vill jag att systemet anpassar sig till min kunskapsnivå och energi, så att jag aldrig känner mig överväldigad eller underskattad.

#### Acceptance Criteria

1. WHEN användaren ger korta svar THEN systemet SHALL ställa mer specifika frågor för att hjälpa
2. WHEN användaren ger detaljerade svar THEN systemet SHALL anpassa sig till deras kunskapsnivå
3. WHEN användaren verkar trött THEN systemet SHALL föreslå att spara och fortsätta senare
4. WHEN användaren är entusiastisk THEN systemet SHALL matcha deras energi och gå djupare

### Requirement 4: Osynlig Strukturering

**User Story:** Som senior användare vill jag att mina tankar organiseras automatiskt, så att jag kan fokusera på innehållet istället för struktur.

#### Acceptance Criteria

1. WHEN användaren pratar fritt THEN systemet SHALL automatiskt identifiera requirements, design och tasks
2. WHEN strukturen byggs THEN användaren SHALL aldrig se tekniska termer som "acceptance criteria"
3. WHEN användaren vill se framsteg THEN systemet SHALL visa detta som en berättelse om deras resa
4. WHEN systemet behöver förtydliganden THEN det SHALL fråga med vardagsord och konkreta exempel

### Requirement 5: Berättelse-Driven Feedback

**User Story:** Som senior användare vill jag förstå vad som händer genom berättelser och metaforer, så att jag känner mig delaktig i processen.

#### Acceptance Criteria

1. WHEN systemet visar framsteg THEN det SHALL använda berättelser som "Vi har nu en tydlig bild av din idé"
2. WHEN något behöver förtydligas THEN systemet SHALL förklara varför med konkreta exempel
3. WHEN användaren gör framsteg THEN systemet SHALL fira detta med uppmuntrande ord
4. WHEN problem uppstår THEN systemet SHALL förklara lösningar som en hjälpsam vän

### Requirement 6: Statisk Struktur som Ryggmärg

**User Story:** Som senior användare vill jag ha en pålitlig struktur att falla tillbaka på, så att jag alltid vet var jag är även när dialogen blir komplex.

#### Acceptance Criteria

1. WHEN dialogen pågår THEN den statiska 2D-strukturen (tid/tydlighet) SHALL alltid vara synlig och uppdaterad
2. WHEN användaren blir förvirrad i dialogen THEN de SHALL kunna klicka på statiska element för att orientera sig
3. WHEN systemet skapar ny information THEN det SHALL automatiskt placeras rätt i den statiska strukturen
4. WHEN användaren vill se framsteg THEN både dialog-historik och statisk karta SHALL vara tillgängliga

### Requirement 7: Smidig Växling Mellan Modaliteter

**User Story:** Som senior användare vill jag kunna växla mellan strukturerad och fri navigation utan att tappa tråden, så att jag kan använda det bästa från båda världarna.

#### Acceptance Criteria

1. WHEN användaren växlar från dialog till statisk navigation THEN aktuell position SHALL markeras tydligt
2. WHEN användaren växlar från statisk till dialog THEN dialogen SHALL förstå kontexten och fortsätta naturligt
3. WHEN användaren arbetar i hybrid-läge THEN båda modaliteterna SHALL komplettera varandra smidigt
4. WHEN användaren gör framsteg THEN det SHALL synas i både dialog-flödet och den statiska kartan

## Success Criteria

- Senior kan utveckla sin idé genom naturlig konversation utan att se tekniska termer
- Systemet skapar korrekt requirements/design/tasks-struktur automatiskt bakom kulisserna
- Användaren känner sig förstådd och stöttad genom hela processen
- Processen anpassar sig dynamiskt till användarens behov och kunskapsnivå
- Verktyg (som diagram-ritning) introduceras naturligt när de behövs