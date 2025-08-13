# 📋 INSTRUKTIONER: Skapa GitHub Issue för Jules Dokumentanalys

## 🚨 PROBLEM
GitHub MCP-servern fungerar inte korrekt, så vi kan inte skapa issue automatiskt.

## 🔧 MANUELL LÖSNING

### Steg 1: Gå till GitHub
Öppna: https://github.com/bjud-in-oss/community-outreach-test/issues/new

### Steg 2: Fyll i Issue
**Title:**
```
JULES: Heltäckande Dokumentanalys för Strategic Clean Start
```

**Body:**
        ```markdown
        # 🎯 UPPDRAG: Komplett Dokumentanalys för Strategic Clean Start

        Vi är i Fas 0 Strategic Clean Start och behöver en heltäckande analys av ALLA dokument i rotmappen innan vi fattar beslut om ny repository vs fortsätta i nuvarande.

        ## Instruktioner för Jules

        1. **LÄSA ALLA DOKUMENT** - Se AGENTS.md för komplett lista av 40+ dokument
        2. **ANVÄND KRITIKER-FUNKTIONALITET** - Dubbel review för högsta kvalitet  
        3. **SKAPA RAPPORT** - Fil: JULES_COMPLETE_DOCUMENT_ANALYSIS_[DATUM].md

        ## Rapport ska innehålla:

        ### A) DOKUMENTINVENTERING
        - Lista ALLA dokument som analyserats
        - Kategorisera enligt status (🟢🟡🔵⚫)
        - Identifiera eventuella saknade eller föråldrade dokument

        ### B) STRATEGISK ANALYS
        - **VAD SOM FAKTISKT SKA BYGGAS**: Baserat på alla dokument
        - **ARKITEKTUR KRAV**: Dubbelt medvetandesystem krav
        - **TEKNISK SKULD**: Identifiera problem i befintlig kod
        - **VÄRDEFULL KOD**: Vilken kod som ska räddas

        ### C) REPOSITORY REKOMMENDATION
        Baserat på ALLA dokument, rekommendera:
        - **NY REPOSITORY** vs **FORTSÄTT I NUVARANDE**
        - **SELEKTIV IMPORT PLAN**: Exakt vilka komponenter som ska importeras
        - **ARKITEKTUR MIGRATION**: Hur befintlig kod ska anpassas till Master Plan 2.0

        ### D) PRIORITERAD HANDLINGSPLAN
        - **FAS 0 (CRAWL)**: Konkreta nästa steg
        - **KRITISKA BESLUT**: Vad som måste bestämmas först
        - **RISKER**: Potentiella problem och mitigation

        ## Framgångskriterier
        ✅ Alla 40+ dokument analyserade
        ✅ Kritiker-funktionalitet använd för kvalitetssäkring  
        ✅ Tydlig rekommendation för repository-beslut
        ✅ Konkret handlingsplan för nästa steg
        ✅ Identifiering av värdefull kod för selektiv import

        **VIKTIGT**: Detta är grunden för alla framtida beslut. Kvalitet över hastighet!
        ```

        ### Steg 3: Lägg till Labels
        Lägg till dessa labels (om de finns):
        - `jules`
        - `documentation`
        - `analysis`
        - `strategic-planning`
        - `high-priority`

        ### Steg 4: Skapa Issue
        Klicka "Submit new issue"

        ## ✅ VERIFIERING

        Efter att issue är skapad:
        1. **Kontrollera att Jules ser issue** - Han ska kommentera inom några minuter
        2. **Verifiera AGENTS.md** - Jules läser denna fil för kontext
        3. **Övervaka progress** - Jules kommer att kommentera med uppdateringar

        ## 🔄 ALTERNATIV APPROACH

        Om GitHub web interface inte fungerar:
        1. **Använd GitHub CLI**: `gh issue create --title "JULES: Heltäckande Dokumentanalys för Strategic Clean Start" --body-file JULES_ISSUE_BODY.md --label jules`
        2. **Använd GitHub Desktop**: Skapa issue via desktop app
        3. **Direkt kommunikation**: Lägg till "jules" label på befintlig issue

        ## 📊 STATUS

        - ✅ AGENTS.md skapad med instruktioner för Jules
        - ✅ GitHub token konfigurerad i MCP
        - ❌ GitHub MCP-server fungerar inte korrekt
        - ⏳ Väntar på manuell issue-skapande

        **Nästa steg**: Skapa issue manuellt enligt instruktionerna ovan.