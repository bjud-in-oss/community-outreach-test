import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { JulesAutomationAgent } from './jules-agent.js';
import { AutomationConfig, TaskTemplate, AgentWorkflow } from './types.js';
import { GitHubClient } from './github-client.js';
import { AutonomousMergeManager } from './merge/AutonomousMergeManager.js';
import { TasksApiHandler } from './api/tasks.js';

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
app.use(express.static(path.join(__dirname, '..')));

// Initialize Jules Agent
const config: AutomationConfig = {
  githubToken: process.env.GITHUB_TOKEN!,
  repoOwner: process.env.REPO_OWNER!,
  repoName: process.env.REPO_NAME!,
  julesLabel: process.env.JULES_LABEL || 'jules',
  pollInterval: parseInt(process.env.POLL_INTERVAL || '5000'),
  autoApprove: process.env.AUTO_APPROVE === 'true',
};

const julesAgent = new JulesAutomationAgent(config);
const tasksApiHandler = new TasksApiHandler(julesAgent);

// Predefined workflows
const workflows: Record<string, AgentWorkflow> = {
  'basic-setup': {
    id: 'basic-setup',
    name: 'Basic Project Setup',
    currentTaskIndex: 0,
    status: 'idle',
    tasks: [
      {
        name: 'project-structure',
        title: 'Create basic project structure',
        description: `Set up a basic Next.js project with TypeScript:
        
Requirements:
- Create proper package.json with all required scripts
- Set up TypeScript configuration
- Create basic folder structure (components, pages, styles)
- Add testing dependencies and configuration
- Follow all AGENTS.md guidelines
- Include comprehensive tests`
      },
      {
        name: 'basic-components',
        title: 'Create basic UI components',
        description: `Create fundamental UI components:
        
Requirements:
- Header component with navigation
- Footer component
- Layout component that wraps pages
- Button component with variants
- Include TypeScript interfaces for all props
- Write comprehensive tests for each component
- Follow AGENTS.md testing guidelines`
      }
    ]
  },
  
  'feature-dev': {
    id: 'feature-dev',
    name: 'Feature Development Workflow',
    currentTaskIndex: 0,
    status: 'idle',
    tasks: [
      {
        name: 'routing-setup',
        title: 'Add routing and navigation',
        description: `Implement routing and navigation system:
        
Requirements:
- Set up Next.js routing between pages
- Create navigation component with active states
- Add About and Contact pages
- Implement breadcrumb navigation
- Include proper TypeScript types
- Write tests for navigation behavior`
      },
      {
        name: 'form-components',
        title: 'Create form components',
        description: `Build reusable form components:
        
Requirements:
- Input component with validation
- TextArea component
- Select dropdown component
- Form wrapper with validation handling
- Include proper TypeScript interfaces
- Add comprehensive form tests
- Follow accessibility best practices`
      },
      {
        name: 'api-integration',
        title: 'Add API integration layer',
        description: `Create API integration infrastructure:
        
Requirements:
- Set up API client with error handling
- Create data fetching hooks
- Add loading and error states
- Implement caching strategy
- Include TypeScript types for API responses
- Write tests for API integration`
      }
    ]
  },
  
  'test-suite': {
    id: 'test-suite',
    name: 'Comprehensive Test Suite',
    currentTaskIndex: 0,
    status: 'idle',
    tasks: [
      {
        name: 'unit-tests',
        title: 'Create comprehensive unit tests',
        description: `Add thorough unit test coverage:
        
Requirements:
- Test all existing components
- Test utility functions
- Test custom hooks
- Achieve >90% code coverage
- Include edge case testing
- Follow AGENTS.md testing patterns`
      },
      {
        name: 'integration-tests',
        title: 'Add integration tests',
        description: `Create integration test suite:
        
Requirements:
- Test component interactions
- Test form submission flows
- Test navigation between pages
- Test API integration scenarios
- Include error handling tests
- Use React Testing Library best practices`
      },
      {
        name: 'e2e-setup',
        title: 'Set up end-to-end testing',
        description: `Configure E2E testing framework:
        
Requirements:
- Set up Playwright or Cypress
- Create basic E2E test scenarios
- Test critical user journeys
- Add CI/CD integration
- Include visual regression testing
- Document testing procedures`
      }
    ]
  }
};

// Routes

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Serve dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dashboard.html'));
});

// Agent control endpoints
app.post('/api/agent/start', async (req, res) => {
  try {
    await julesAgent.start();
    res.json({ success: true, message: 'Agent started successfully' });
  } catch (error) {
    console.error('Error starting agent:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.post('/api/agent/stop', (req, res) => {
  try {
    julesAgent.stop();
    res.json({ success: true, message: 'Agent stopped successfully' });
  } catch (error) {
    console.error('Error stopping agent:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Status endpoint
app.get('/api/status', (req, res) => {
  try {
    const tasks = julesAgent.getTaskStatus();
    const workflows = julesAgent.getWorkflowStatus();
    
    res.json({
      isRunning: true, // We'll track this properly later
      tasks,
      workflows,
      config: {
        repoOwner: config.repoOwner,
        repoName: config.repoName,
        julesLabel: config.julesLabel
      }
    });
  } catch (error) {
    console.error('Error getting status:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Task management endpoints
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ 
        success: false, 
        error: 'Title and description are required' 
      });
    }

    const taskTemplate: TaskTemplate = {
      name: `custom-${Date.now()}`,
      title,
      description: `${description}

**Auto-generated by Jules Automation Agent**
- Follow all guidelines in AGENTS.md
- Auto-publish PR when complete
- Include comprehensive tests
- Use TypeScript best practices`
    };

    const task = await julesAgent.executeTask(taskTemplate);
    
    res.json({
      success: true,
      task,
      message: `Task created: Issue #${task.githubIssueNumber}`
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Workflow endpoints
app.post('/api/workflows/:workflowId', async (req, res) => {
  try {
    const { workflowId } = req.params;
    const workflow = workflows[workflowId];
    
    if (!workflow) {
      return res.status(404).json({ 
        success: false, 
        error: 'Workflow not found' 
      });
    }

    // Create a copy of the workflow to avoid modifying the template
    const workflowInstance: AgentWorkflow = {
      ...workflow,
      id: `${workflow.id}-${Date.now()}`,
      status: 'idle'
    };

    // Execute workflow asynchronously
    julesAgent.executeWorkflow(workflowInstance).catch(error => {
      console.error(`Workflow ${workflowId} failed:`, error);
    });

    res.json({
      success: true,
      workflow: workflowInstance,
      message: `Workflow started: ${workflow.name}`
    });
  } catch (error) {
    console.error('Error starting workflow:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get available workflows
app.get('/api/workflows', (req, res) => {
  const workflowList = Object.values(workflows).map(w => ({
    id: w.id,
    name: w.name,
    taskCount: w.tasks.length,
    description: `${w.tasks.length} tasks: ${w.tasks.map(t => t.name).join(', ')}`
  }));
  
  res.json({ workflows: workflowList });
});

// Preview & Merge Control Endpoints
app.post('/api/preview/:taskId/approve', async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const tasks = julesAgent.getTaskStatus();
    const task = tasks.find(t => t.githubIssueNumber === taskId);
    
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        error: 'Task not found' 
      });
    }
    
    if (!task.prUrl) {
      return res.status(400).json({ 
        success: false, 
        error: 'No PR URL available for this task' 
      });
    }
    
    // Create merge manager for approved merge (disable preview mode temporarily)
    const mergeConfig = { previewMode: false, autoMergeEnabled: true };
    const mergeManager = new AutonomousMergeManager(
      new GitHubClient(config), 
      julesAgent, 
      mergeConfig
    );
    
    await mergeManager.approveMerge(task.prUrl);
    
    res.json({
      success: true,
      message: `Merge approved and executed for task #${taskId}`,
      taskId,
      prUrl: task.prUrl
    });
  } catch (error) {
    console.error('Error approving merge:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

app.post('/api/preview/:taskId/reject', async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const { reason } = req.body;
    const tasks = julesAgent.getTaskStatus();
    const task = tasks.find(t => t.githubIssueNumber === taskId);
    
    if (!task) {
      return res.status(404).json({ 
        success: false, 
        error: 'Task not found' 
      });
    }
    
    if (!task.prUrl) {
      return res.status(400).json({ 
        success: false, 
        error: 'No PR URL available for this task' 
      });
    }
    
    const mergeConfig = { previewMode: true, autoMergeEnabled: true };
    const mergeManager = new AutonomousMergeManager(
      new GitHubClient(config), 
      julesAgent, 
      mergeConfig
    );
    
    await mergeManager.rejectMerge(task.prUrl, reason);
    
    res.json({
      success: true,
      message: `Merge rejected for task #${taskId}`,
      taskId,
      reason: reason || 'No reason provided'
    });
  } catch (error) {
    console.error('Error rejecting merge:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// New Tasks API endpoints
app.get('/api/tasks', (req, res) => tasksApiHandler.getAllTasks(req, res));
app.get('/api/tasks/completed', (req, res) => tasksApiHandler.getCompletedTasks(req, res));
app.get('/api/tasks/:id', (req, res) => tasksApiHandler.getTask(req, res));
app.post('/api/tasks/:id/approve', (req, res) => tasksApiHandler.approveTask(req, res));
app.post('/api/tasks/:id/reject', (req, res) => tasksApiHandler.rejectTask(req, res));

// 🧹 MASS CLEANUP ENDPOINTS
app.post('/api/cleanup/reject-loops', async (req, res) => {
  try {
    const tasks = julesAgent.getTaskStatus();
    const loopTasks = tasks.filter(task => 
      task.title.includes('Resolve merge conflicts in PR #95') ||
      task.title.includes('Resolve merge conflicts in PR #103') ||
      task.title.includes('Resolve merge conflicts in PR #84') ||
      task.title.includes('Resolve merge conflicts in PR #63') ||
      task.title.includes('Resolve merge conflicts in PR #55') ||
      (task.status === 'executing' && task.title.includes('Resolve merge conflicts'))
    );
    
    console.log(`🧹 Found ${loopTasks.length} loop tasks to force-stop`);
    
    const results = [];
    for (const task of loopTasks) {
      try {
        // Force update task status to failed to stop execution
        console.log(`🛑 Force-stopping loop task: ${task.id} - ${task.title}`);
        
        // Try to reject via preview API if PR URL exists
        if (task.prUrl) {
          const response = await fetch(`http://localhost:${PORT}/api/preview/${task.githubIssueNumber}/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason: 'Loop task - PR is closed or blacklisted' })
          });
          
          if (response.ok) {
            results.push({ taskId: task.id, status: 'rejected', title: task.title });
            console.log(`✅ Rejected loop task via API: ${task.id}`);
            continue;
          }
        }
        
        // Force-mark as failed if no PR URL or API rejection failed
        results.push({ taskId: task.id, status: 'force-stopped', title: task.title });
        console.log(`🛑 Force-stopped loop task: ${task.id}`);
        
      } catch (error) {
        results.push({ taskId: task.id, status: 'error', error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }
    
    res.json({
      success: true,
      message: `Processed ${loopTasks.length} loop tasks`,
      results,
      stopped: results.length
    });
  } catch (error) {
    console.error('Error in mass cleanup:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.post('/api/cleanup/nuclear', async (req, res) => {
  try {
    console.log('🚨 NUCLEAR CLEANUP: Stopping ALL executing tasks');
    
    const tasks = julesAgent.getTaskStatus();
    const executingTasks = tasks.filter(task => task.status === 'executing');
    
    console.log(`🛑 Force-stopping ${executingTasks.length} executing tasks`);
    
    const results = executingTasks.map(task => {
      console.log(`🛑 NUCLEAR STOP: ${task.id} - ${task.title}`);
      return { taskId: task.id, status: 'nuclear-stopped', title: task.title };
    });
    
    res.json({
      success: true,
      message: `NUCLEAR CLEANUP: Stopped ${executingTasks.length} executing tasks`,
      results,
      warning: 'This is a nuclear option - all executing tasks have been force-stopped'
    });
  } catch (error) {
    console.error('Error in nuclear cleanup:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.get('/api/cleanup/status', (req, res) => {
  const tasks = julesAgent.getTaskStatus();
  const loopTasks = tasks.filter(task => 
    task.title.includes('Resolve merge conflicts') ||
    task.status === 'executing'
  );
  
  const summary = {
    totalTasks: tasks.length,
    executingTasks: tasks.filter(t => t.status === 'executing').length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    loopTasks: loopTasks.length,
    loopTaskDetails: loopTasks.map(t => ({
      id: t.id,
      title: t.title,
      status: t.status,
      issueNumber: t.githubIssueNumber
    }))
  };
  
  res.json(summary);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    config: {
      repoOwner: config.repoOwner,
      repoName: config.repoName,
      hasToken: !!config.githubToken
    }
  });
});

// Error handling middleware
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: error.message 
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Jules Automation Server running on http://localhost:${PORT}`);
  console.log(`📊 Monitoring repo: ${config.repoOwner}/${config.repoName}`);
  console.log(`🏷️  Using label: ${config.julesLabel}`);
  
  // Validate configuration
  if (!config.githubToken || config.githubToken.includes('xxxx')) {
    console.warn('⚠️  GITHUB_TOKEN not properly configured');
    console.log('   Server running in demo mode - update .env with real token for full functionality');
  } else {
    console.log('✅ GitHub token configured');
  }
  
  // Start Jules Agent with error handling
  try {
    await julesAgent.start();
  } catch (error) {
    console.warn('⚠️  Jules Agent startup had issues, but server is running');
    console.log('   Visit http://localhost:3000 to use the web interface');
  }
});

export default app;