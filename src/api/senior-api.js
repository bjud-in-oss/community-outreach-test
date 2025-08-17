import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001; // Kör API på port 3001, statiska filer på 3000

// Middleware
app.use(cors());
app.use(express.json());

// Mock data för senior-vänlig demonstration
const mockSeniorView = {
  projectOverview: {
    title: 'Community Outreach Platform',
    description: 'En plattform som hjälper seniorer att skapa egna digitala verktyg utan teknisk komplexitet. Vi bygger ett system som förstår vad du vill ha och skapar det åt dig.',
    currentPhase: 'Crawl',
    overallProgress: 75,
    estimatedCompletion: 'Om 2-3 veckor',
    keyAchievements: [
      'Säker kommunikation mellan systemdelar fungerar',
      '5 viktiga uppgifter slutförda',
      '15 kvalitetstester godkända',
      'Systemet är aktivt och fungerar',
      'Hög systemstabilitet och tillförlitlighet'
    ]
  },
  recentProgress: {
    thisWeek: 'Vi slutförde översättningssystemet som gör att du kan prata med systemet på vanlig svenska istället för tekniska termer. Vi integrerade också säkerhetssystem för att dölja all teknisk komplexitet.',
    nextWeek: 'Nästa steg är att skapa det visuella gränssnittet där du kan se arbetets framsteg på ett enkelt sätt. Vi kommer också att förbättra hur systemet förstår dina önskemål.',
    confidence: 88
  },
  notifications: [
    {
      id: 'success-1',
      title: 'Fantastiska framsteg! 🎉',
      message: 'Översättningssystemet är nu klart. Detta betyder att du kan kommunicera med systemet på vanlig svenska.',
      priority: 'success',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      actionRequired: false
    },
    {
      id: 'info-1',
      title: 'Nästa steg',
      message: 'Vi arbetar nu på att skapa det visuella gränssnittet för dig. Du kommer snart att kunna se arbetets framsteg på ett mycket enklare sätt.',
      priority: 'info',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      actionRequired: false
    },
    {
      id: 'success-2',
      title: 'Systemet fungerar perfekt! ✅',
      message: 'Alla tester har gått igenom och systemet är stabilt. Du kan känna dig trygg med att allt fungerar som det ska.',
      priority: 'success',
      timestamp: new Date(),
      actionRequired: false
    }
  ],
  lastUpdated: new Date()
};

const mockTasks = [
  {
    id: 'task-1',
    title: 'Skapa säker kommunikation',
    description: 'Nu kan systemet prata med dig på vanlig svenska utan tekniska termer.',
    status: 'completed',
    agentType: 'Communication Bridge',
    complexity: 'Medium'
  },
  {
    id: 'task-2',
    title: 'Bygga användarvänligt gränssnitt',
    description: 'Vi skapar enkla sidor där du kan se vad som händer utan förvirring.',
    status: 'completed',
    agentType: 'Senior Cockpit',
    complexity: 'High'
  },
  {
    id: 'task-3',
    title: 'Testa att allt fungerar',
    description: 'Vi kontrollerar att allt är säkert och enkelt att använda för alla.',
    status: 'completed',
    agentType: 'Testing Framework',
    complexity: 'Medium'
  },
  {
    id: 'task-4',
    title: 'Förbättra systemets intelligens',
    description: 'Vi arbetar på att göra systemet ännu smartare så det förstår dig bättre.',
    status: 'pending',
    agentType: 'Core Agent',
    complexity: 'High'
  },
  {
    id: 'task-5',
    title: 'Lägga till fler funktioner',
    description: 'Vi planerar att lägga till funktioner som hjälper dig skapa precis det du vill ha.',
    status: 'pending',
    agentType: 'Feature Development',
    complexity: 'Medium'
  }
];

// API Endpoints

// Senior View API - för senior-cockpit.html
app.get('/api/senior-view', (req, res) => {
  console.log('📱 Senior View API anropad');
  
  // Simulera lite laddningstid för realism
  setTimeout(() => {
    res.json({
      success: true,
      data: mockSeniorView,
      seniorFriendlyMessage: 'Din arbetsyta har uppdaterats med senaste informationen!'
    });
  }, 500);
});

// Status API - för dashboard.html
app.get('/api/status', (req, res) => {
  console.log('📊 Status API anropad');
  
  setTimeout(() => {
    res.json({
      success: true,
      tasks: mockTasks,
      summary: {
        total: mockTasks.length,
        completed: mockTasks.filter(t => t.status === 'completed').length,
        pending: mockTasks.filter(t => t.status === 'pending').length,
        approved: mockTasks.filter(t => t.status === 'approved').length,
        rejected: mockTasks.filter(t => t.status === 'rejected').length
      },
      seniorFriendlyMessage: 'Din översikt är uppdaterad!'
    });
  }, 300);
});

// Task Actions - för att godkänna/avvisa uppgifter
app.post('/api/tasks/:taskId/approve', (req, res) => {
  const { taskId } = req.params;
  console.log(`✅ Uppgift ${taskId} godkänd`);
  
  // Uppdatera task status i mock data
  const task = mockTasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'approved';
  }
  
  res.json({
    success: true,
    message: 'Uppgiften har godkänts!',
    seniorFriendlyMessage: 'Bra jobbat! Uppgiften är nu godkänd och vi fortsätter arbetet.'
  });
});

app.post('/api/tasks/:taskId/reject', (req, res) => {
  const { taskId } = req.params;
  console.log(`❌ Uppgift ${taskId} avvisad`);
  
  // Uppdatera task status i mock data
  const task = mockTasks.find(t => t.id === taskId);
  if (task) {
    task.status = 'rejected';
  }
  
  res.json({
    success: true,
    message: 'Uppgiften har avvisats.',
    seniorFriendlyMessage: 'Okej, vi tar en annan riktning med denna uppgift.'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'API:et fungerar perfekt!',
    timestamp: new Date(),
    seniorFriendlyMessage: 'Allt fungerar som det ska! 🎉'
  });
});

// Deployment API - för framtida "Gör Tillgänglig" funktionalitet
app.post('/api/deploy-for-senior', (req, res) => {
  const { name, email, siteType } = req.body;
  console.log(`🚀 Deployment begärd för ${name} (${email})`);
  
  // Simulera deployment-process
  setTimeout(() => {
    const subdomain = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    res.json({
      success: true,
      message: 'Perfekt! Din sida är nu tillgänglig för alla.',
      url: `https://${subdomain}.varteknikstod.se`,
      supportMessage: 'Ring 08-123-456 om du behöver hjälp',
      seniorFriendlyMessage: `Fantastiskt ${name}! Din sida är nu live och du kan dela länken med vem du vill.`
    });
  }, 2000);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    success: false,
    message: 'Vi arbetar på det just nu. Allt kommer att fungera snart!',
    seniorFriendlyMessage: 'Något gick fel, men vi fixar det åt dig. Prova igen om en liten stund.',
    supportMessage: 'Ring 08-123-456 om problemet kvarstår'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Vi hittade inte det du letade efter.',
    seniorFriendlyMessage: 'Den sidan finns inte, men vi hjälper dig hitta rätt!',
    supportMessage: 'Ring 08-123-456 för hjälp'
  });
});

// Start server
app.listen(port, () => {
  console.log(`
🎉 Senior API Server startad!

📡 API körs på: http://localhost:${port}
🌐 Statiska filer på: http://localhost:3000

📋 Tillgängliga endpoints:
   GET  /api/senior-view     - Senior arbetsyta data
   GET  /api/status          - Uppgiftsöversikt  
   POST /api/tasks/:id/approve - Godkänn uppgift
   POST /api/tasks/:id/reject  - Avvisa uppgift
   GET  /api/health          - Hälsokontroll
   POST /api/deploy-for-senior - Deployment service

🚀 Systemet är redo för senior-testning!
  `);
});