# JULES MANUAL PROMPT: Senior-Anpassad Utvecklingsprocess - Heltäckande Analys

## BAKGRUND OCH KONTEXT

Hej Jules! Vi behöver din expertis för en kritisk analys av hela utvecklingsprocessen från senior-perspektiv. Detta är en uppföljning på en preliminär analys som redan gjorts, men vi behöver din djupare insikt och kritiska granskning för att förstå helheten.

**SITUATION:**
- Vi har 40+ dokument i rot-mappen som användaren (senior) upplever som arbetssam
- Nuvarande process: Användarplan → Requirements → Design → Tasks → Execution → Verification
- Processen fungerar tekniskt men är för komplex för seniorer
- Vi har många kraftfulla system redan implementerade som behöver integreras i lösningen

**PRELIMINÄR ANALYS GJORD:**
En första analys har identifierat följande:

### Vad Som Fungerar Bra:
✅ Master Plan 2.0 Dual Consciousness Architecture
✅ Communication Bridge med guardrails
✅ EARS format för requirements (WHEN/THEN/SHALL)
✅ Fasbaserad utveckling (Crawl, Walk, Run, Fly)
✅ Strukturerad dokumentation med filnamnsystem

### Identifierade Problem:
❌ 40+ dokument är överväldigande för seniorer
❌ Teknisk komplexitet exponeras trots arkitektur
❌ För många manuella steg utan automatisering
❌ EARS format kräver teknisk förståelse
❌ Lång feedback-loop

### Preliminära Förslag:
- Konsolidera till 5-7 huvuddokument
- Skapa "Användarplan" före requirements
- Automatisera dokumentgenerering
- Senior-vänlig terminologi
- Visuella guider istället för text

## DIN UPPGIFT: FÖRBÄTTRAD OCH KRITISK ANALYS

**ANVÄND DIN KRITIKER-FUNKTIONALITET** för högsta kvalitet och dubbel review.

### 1. HELTÄCKANDE DOKUMENTANALYS

**PRIORITERADE DOKUMENT (läs dessa först):**
- `01_🎯🟢_MASTER_INTEGRATION_PLAN_240809_ALL.md` - Master plan och arkitektur
- `02_📋🟢_DOCUMENT_INDEX_240812_01.md` - Dokumentöversikt
- `131_🧠🔵_DUAL_CONSCIOUSNESS_ARCHITECTURE_240809_01,10,12.md` - Kärnarkitektur
- `240_👥🔵_ADVANCED_USER_ANALYSIS_240808_01,41,42.md` - Senior-analys
- `132_🎯🔵_PHASE_PLANNING_FRAMEWORK_240809_01,03.md` - Fasplanering
- `AGENTS.md` - Agent-konfiguration och kommunikation

**ALLA ANDRA DOKUMENT (analysera för helhetsbild):**
- Alla 40+ .md filer i rot-mappen
- Alla specs i `.kiro/specs/`
- Alla implementationer i `src/`
- Särskilt fokus på kraftfulla system som redan finns

### 2. KRITISK GRANSKNING AV PRELIMINÄR ANALYS

**Granska och kritisera:**
- Är problemen korrekt identifierade?
- Saknas viktiga aspekter i analysen?
- Är förslagen realistiska och genomförbara?
- Passar förslagen in i Master Plan 2.0 arkitekturen?
- Vilka kraftfulla system finns redan som kan användas?

### 3. IMPLEMENTATION REVIEW

**Granska specifikt:**
- `src/communication-bridge/translation/SeniorTranslator.ts`
- Möter den alla requirements från Requirement 2?
- Finns förbättringsområden?
- Hur integrerar den med befintliga system?

### 4. HELHETSPERSPEKTIV

**Analysera hur allt hänger ihop:**
- Vilka kraftfulla system finns redan implementerade?
- Hur kan dessa användas för att lösa senior-anpassning?
- Vad saknas för att skapa en komplett lösning?
- Hur passar detta in i Master Plan 2.0 vision?

### 5. SENIOR-ANPASSNING I KONTEXT

**Djupare analys:**
- Hur kan befintliga system göras mer senioranpassade?
- Vilka delar av processen kan automatiseras med befintlig teknik?
- Hur kan vi behålla kvaliteten men minska komplexiteten?
- Vad är den optimala balansen mellan kraft och enkelhet?

## SPECIFIKA FRÅGOR ATT BESVARA

### Processanalys:
1. Vilka delar av nuvarande process är mest värdefulla att behålla?
2. Vilka kraftfulla system finns redan som kan lösa senior-anpassning?
3. Hur kan automatisering implementeras med befintlig arkitektur?
4. Vad är den realistiska vägen framåt?

### Senior-Perspektiv:
1. Skulle ett "användarplan" före requirements verkligen hjälpa?
2. Hur kan vi minska från 40+ dokument utan att förlora kvalitet?
3. Vilka delar kan automatiseras med befintlig AI/LLM-integration?
4. Hur kan vi göra processen mer kraftfull OCH enklare?

### Teknisk Integration:
1. Hur kan SeniorTranslator förbättras för bättre senior-anpassning?
2. Vilka befintliga system kan utökas för automatisering?
3. Hur passar detta in i Dual Consciousness Architecture?
4. Vad behöver implementeras vs vad finns redan?

### Kritisk Granskning:
1. Är den preliminära analysen korrekt eller saknar den viktiga aspekter?
2. Vilka risker finns med de föreslagna förändringarna?
3. Hur kan vi säkerställa att kvaliteten bibehålls?
4. Vad är de realistiska tidshorisonterna?

## ÖNSKAD OUTPUT: UTFÖRLIG RAPPORT

Skapa en detaljerad rapport som inkluderar:

### 1. EXECUTIVE SUMMARY
- Huvudsakliga fynd och rekommendationer
- Kritisk bedömning av nuvarande situation
- Prioriterade åtgärder

### 2. DETALJERAD ANALYS
- Dokumentinventering och kategorisering
- Identifierade kraftfulla system
- Gap-analys mellan nuvarande och önskad situation

### 3. SENIOR-ANPASSNINGSPLAN
- Konkreta förslag för förenkling
- Automatiseringsmöjligheter med befintlig teknik
- Steg-för-steg implementation

### 4. TEKNISK IMPLEMENTATION
- SeniorTranslator förbättringar
- Integration med befintliga system
- Arkitektur-kompatibilitet

### 5. KRITISK BEDÖMNING
- Risker och utmaningar
- Realistiska tidsramar
- Kvalitetssäkring

### 6. HANDLINGSPLAN
- Prioriterade åtgärder (kort/medel/lång sikt)
- Resursbehov
- Framgångskriterier

## KVALITETSKRAV

- **Använd kritiker-funktionaliteten** för final review
- Granska alla dokument, inte bara prioriterade
- Identifiera kraftfulla system som redan finns
- Ge konkreta, actionable rekommendationer
- Säkerställ kompatibilitet med Master Plan 2.0
- Fokusera på helhetslösning, inte bara delar

## SLUTKOMMENTAR

Vi har byggt mycket kraftfulla system redan. Nu behöver vi din expertis för att se hur allt kan integreras för att skapa en senior-anpassad utvecklingsprocess som behåller kvaliteten men dramatiskt minskar komplexiteten för användaren.

Din analys kommer att vara grunden för nästa fas av utvecklingen, så det är kritiskt att den är heltäckande och korrekt.

Tack för din hjälp, Jules!