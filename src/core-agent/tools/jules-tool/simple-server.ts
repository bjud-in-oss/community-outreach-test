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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    system: 'Master Plan 2.0 - Dual Consciousness Architecture'
  });
});

// Status endpoint for dashboard
app.get('/api/status', (req, res) => {
  res.json({
    tasks: [
      {
        id: 'test-1',
        title: 'Test Task - Master Plan 2.0 Integration',
        description: 'Testing the rescued infrastructure integration',
        status: 'completed',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      }
    ],
    system: {
      phase: 'CRAWL (Phase 0)',
      architecture: 'Dual Consciousness',
      status: 'Infrastructure Testing'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Master Plan 2.0 Server running on port ${PORT}`);
  console.log(`🎭 Dual Consciousness Architecture - Phase 0 (CRAWL)`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Status API: http://localhost:${PORT}/api/status`);
});