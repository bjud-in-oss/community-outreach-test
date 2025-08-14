# 🔒 Security Steering - Säkerhetsriktlinjer

## 🛡️ SÄKERHETSRIKTLINJER

### **Miljövariabel-hantering:**
- **ALDRIG** hardkoda API-nycklar i kod
- Använd `${VARIABLE_NAME}` format i konfigurationsfiler
- Kontrollera `.env.example` för required variables
- Validera att secrets inte committas till Git

### **Dual Consciousness Guardrails:**
- **Conscious Agent**: Endast senior-vänlig information
- **Core Agent**: All teknisk komplexitet
- **Communication Bridge**: Filtrerar och översätter mellan agenter
- **Audit Logging**: Spåra all informationsöverföring

## 🛡️ SENIOR PROTECTION

### **Informationsfiltrering:**
- **Blockera teknisk jargong**: API, JSON, Git, Stack traces, Error codes
- **Översätt till vardagsspråk**: "Spara" istället för "Commit"
- **Dölj systemfel** från användargränssnitt
- **Automatisk återhämtning** utan användarinteraktion

### **Användarskydd:**
- **Ångra-funktion**: Alltid möjligt att backa
- **Automatisk sparning**: Förlora aldrig arbete
- **Säkra standardinställningar**: Privat som standard
- **Tydliga konsekvenser**: "Detta kommer att..." innan åtgärder

## 🚨 AUTOMATISKA KONTROLLER

### **Development Environment:**
- Använd `.env` för lokala secrets
- Lägg `.env` i `.gitignore`
- Rotera API-nycklar regelbundet
- Begränsa token-permissions

### **Production Säkerhet:**
- Environment variables i hosting-plattform
- HTTPS för all kommunikation
- Rate limiting på API endpoints
- Input validation och sanitization

### **Agent Hook Validations:**
- Filnamnsformat vid sparning (se `file-creation-guide.md`)
- Teknisk jargong-detektion
- API-nyckel exponering
- Tillgänglighets-compliance

**Säkerhet och senior-vänlighet är grundförutsättningar, inte optional!** 🔒