// Simplified server for Master Plan 2.0 testing
// Based on rescued infrastructure from jules-automation-test

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    system: 'Master Plan 2.0 - Dual Consciousness Architecture'
  });
});

// Senior Cockpit endpoint - JULES INTEGRATION with Real-time Support
app.get('/api/senior-view', async (req, res) => {
  try {
    // Add real-time headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // TODO: Integrate with real SeniorViewService and RealTimeUpdateService
    // For now, return enhanced mock data with real-time indicators
    const now = new Date();
    const seniorView = {
      projectOverview: {
        title: 'Community Outreach Platform',
        description: 'En plattform som hjälper seniorer att skapa egna digitala verktyg utan teknisk komplexitet. Vi bygger ett system som förstår vad du vill ha och skapar det åt dig.',
        currentPhase: 'Crawl',
        overallProgress: 68,
        estimatedCompletion: 'Om 2-3 veckor',
        keyAchievements: [
          'Communication Bridge integrerat och fungerar',
          'Senior Cockpit implementerat som intelligent filter',
          'Säkerhetssystem för att dölja teknisk komplexitet',
          'Översättningssystem mellan senior-språk och teknik',
          'Automatisk progress-spårning implementerad'
        ]
      },
      recentProgress: {
        thisWeek: 'Vi slutförde integreringen av Communication Bridge med Senior Cockpit. Nu fungerar systemet som ett intelligent filter som döljer all teknisk komplexitet från dig.',
        nextWeek: 'Nästa steg är att implementera real-time uppdateringar så du automatiskt ser när framsteg görs, utan att behöva uppdatera sidan.',
        confidence: 88
      },
      notifications: [
        {
          id: 'realtime-updates-active',
          title: 'Real-time uppdateringar aktiverade! 🚀',
          message: 'Systemet uppdateras nu automatiskt var 30:e sekund. Du behöver inte längre klicka på "Uppdatera" - allt sker automatiskt!',
          priority: 'success',
          timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 min sedan
          actionRequired: false
        },
        {
          id: 'integration-success',
          title: 'Communication Bridge integrerat',
          message: 'All teknisk information översätts nu automatiskt till begripligt språk för dig.',
          priority: 'success',
          timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 min sedan
          actionRequired: false
        },
        {
          id: 'offline-support',
          title: 'Offline-stöd tillagt',
          message: 'Om internetanslutningen bryts tillfälligt fortsätter systemet att fungera och uppdaterar automatiskt när anslutningen återställs.',
          priority: 'info',
          timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 min sedan
          actionRequired: false
        }
      ],
      lastUpdated: new Date()
    };

    res.json({
      success: true,
      data: seniorView,
      timestamp: now,
      seniorFriendlyMessage: 'Projektinformationen har uppdaterats och är redo att visas.',
      realTimeStatus: {
        enabled: true,
        lastUpdate: now,
        nextUpdate: new Date(now.getTime() + 30000), // 30 sekunder
        updateInterval: 30000,
        isOnline: true
      }
    });

  } catch (error) {
    console.error('Error generating senior view:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load project information',
      timestamp: new Date(),
      seniorFriendlyMessage: 'Det uppstod ett problem när vi hämtade projektinformationen. Vi arbetar på att lösa det.',
      realTimeStatus: {
        enabled: false,
        lastUpdate: new Date(),
        nextUpdate: null,
        updateInterval: 30000,
        isOnline: false
      }
    });
  }
});

// Real-time status endpoint
app.get('/api/senior-view/status', async (req, res) => {
  try {
    const now = new Date();
    
    res.json({
      success: true,
      realTimeStatus: {
        enabled: true,
        serverTime: now,
        lastUpdate: now,
        nextUpdate: new Date(now.getTime() + 30000),
        updateInterval: 30000,
        isOnline: true,
        version: '1.0.0-realtime'
      },
      seniorFriendlyMessage: 'Real-time uppdateringar fungerar perfekt!'
    });
    
  } catch (error) {
    console.error('Error getting real-time status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get real-time status',
      seniorFriendlyMessage: 'Kunde inte kontrollera uppdateringsstatus.'
    });
  }
});

// In-memory task storage (will be replaced with database later)
let tasks = [
  {
    id: 1,
    title: 'Test Task - Master Plan 2.0 Integration',
    description: 'Testing the rescued infrastructure integration',
    status: 'pending',
    createdAt: new Date().toISOString(),
    agentType: 'core',
    complexity: 'low',
    requiresSeniorApproval: true
  },
  {
    id: 2,
    title: 'Skapa Senior-Vänlig Dashboard',
    description: 'Integrera TaskCard med dashboard-components för visual approval',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date().toISOString(),
    agentType: 'conscious',
    complexity: 'medium',
    requiresSeniorApproval: false
  },
  {
    id: 3,
    title: 'Konfigurera Dubbelt Medvetandesystem',
    description: 'Sätt upp kommunikation mellan medveten och kärn-agent',
    status: 'approved',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    agentType: 'bridge',
    complexity: 'high',
    requiresSeniorApproval: true
  }
];

// Status endpoint for dashboard
app.get('/api/status', (req, res) => {
  res.json({
    tasks: tasks,
    system: {
      phase: 'CRAWL (Phase 0) - Visual Dashboard Integration',
      architecture: 'Dual Consciousness',
      status: 'Hybrid Dashboard Active'
    }
  });
});

// Task approval endpoint
app.post('/api/tasks/:id/approve', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  task.status = 'approved';
  task.completedAt = new Date().toISOString();
  
  console.log(`✅ Task ${taskId} approved: ${task.title}`);
  
  res.json({
    success: true,
    message: 'Task approved successfully',
    task: task
  });
});

// Task rejection endpoint
app.post('/api/tasks/:id/reject', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  task.status = 'rejected';
  task.completedAt = new Date().toISOString();
  
  console.log(`🚫 Task ${taskId} rejected: ${task.title}`);
  
  res.json({
    success: true,
    message: 'Task rejected successfully',
    task: task
  });
});

// Create new task endpoint (for future Jules integration)
app.post('/api/tasks', (req, res) => {
  const { title, description, agentType = 'core', complexity = 'medium' } = req.body;
  
  const newTask = {
    id: Math.max(...tasks.map(t => t.id)) + 1,
    title,
    description,
    status: 'pending',
    createdAt: new Date().toISOString(),
    agentType,
    complexity,
    requiresSeniorApproval: complexity === 'high' || agentType === 'conscious'
  };
  
  tasks.push(newTask);
  
  console.log(`📝 New task created: ${title}`);
  
  res.json({
    success: true,
    message: 'Task created successfully',
    task: newTask
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Master Plan 2.0 Server running on port ${PORT}`);
  console.log(`🎭 Dual Consciousness Architecture - Phase 0 (CRAWL)`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Status API: http://localhost:${PORT}/api/status`);
});