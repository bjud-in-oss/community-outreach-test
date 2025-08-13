# Development Workflow Steering - Kiro + Jules Integration

## 🔄 UTVECKLINGSPROCESS

### **Dual Session Workflow**
- **CHAT-SESSION**: Endast dokumentation (*.md filer)
- **SPECS-SESSION**: Endast kod (*.ts, *.js, *.py filer)
- **ALDRIG samma fil i båda sessionerna**
- **Kontrollera DOCUMENT_INDEX.md** för aktuell status

### **Jules Integration Pattern**
```typescript
// Standard Jules workflow
const julesTask = {
  type: "implementation",
  priority: "high",
  context: "Master Plan 2.0 - Senior Cockpit",
  requirements: "V2 format compliance + Senior-friendly design",
  guardrails: "No technical jargon in user-facing elements"
};
```

## 🎯 FASBASERAD UTVECKLING

### **Fas 0 (CRAWL): Infrastruktur**
- Grundläggande setup och "Hello World"
- V2 format compliance för alla filer
- Automatiska hooks för kvalitetskontroll

### **Fas 1 (WALK): Funktionell Kärn-agent**
- LangChain orchestration
- LlamaIndex minnesystem
- Jules tool integration

### **Fas 2 (RUN): Empatisk Senior-upplevelse**
- Conscious Agent implementation
- Senior Cockpit UI
- Communication Bridge guardrails

### **Fas 3 (FLY): Autonom Självförbättring**
- Metakognitiva förmågor
- Självoptimerande system
- Kontinuerlig evolution

## 🤖 AGENT COORDINATION

### **Task Distribution**
- **Kiro**: Dokumentation, planering, arkitektur
- **Jules**: Kodimplementation, testing, deployment
- **Human**: Godkännande, riktning, kvalitetskontroll

### **Communication Protocol**
```markdown
## Jules Task Request
**Context**: [Aktuell fas och komponent]
**Requirement**: [Specifik funktionalitet]
**Constraints**: [Senior-focus, V2 format, etc.]
**Success Criteria**: [Mätbara resultat]
```

## 🛡️ KVALITETSKONTROLLER

### **Automatiska Validationer**
- V2 format compliance (Agent Hook)
- Senior-friendly language check
- Technical jargon filtering
- Accessibility compliance

### **Manuella Reviews**
- Senior user testing
- Code quality assessment
- Documentation completeness
- Integration testing

## 📊 PROGRESS TRACKING

### **Dokumentation Updates**
- Uppdatera Master Integration Plan vid milstones
- Logga framsteg i relevanta dokument
- Maintain Document Index för översikt

### **Version Control Strategy**
- Feature branches för större ändringar
- V2 format validation i pre-commit hooks
- Semantic commit messages
- Regular sync mellan Kiro instances

**Följ denna workflow för konsekvent och effektiv utveckling!** 🚀