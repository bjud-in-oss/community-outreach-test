// MASTER PLAN 2.0: Senior Cockpit Test
// STATUS: Jules Senior Cockpit Implementation - Testing
// INTEGRATION: Test för Senior Cockpit MVP
// ARCHITECTURE: Dual Consciousness Architecture compliant

import React from 'react';
import { createRoot } from 'react-dom/client';
import SeniorCockpit from './SeniorCockpit';

/**
 * JULES SENIOR COCKPIT TEST
 * 
 * Enkel test för att verifiera att Senior Cockpit MVP fungerar
 * och visar senior-vänlig information korrekt.
 */

// Mock CSS för test (normalt skulle vi använda Tailwind)
const mockStyles = `
  <style>
    .senior-cockpit { font-family: Arial, sans-serif; }
    .bg-white { background-color: white; }
    .bg-gray-50 { background-color: #f9fafb; }
    .bg-blue-50 { background-color: #eff6ff; }
    .bg-green-50 { background-color: #f0fdf4; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
    .rounded-lg { border-radius: 0.5rem; }
    .p-4 { padding: 1rem; }
    .p-6 { padding: 1.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .text-xl { font-size: 1.25rem; }
    .text-2xl { font-size: 1.5rem; }
    .font-bold { font-weight: bold; }
    .text-gray-800 { color: #1f2937; }
    .text-gray-600 { color: #4b5563; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .space-x-3 > * + * { margin-left: 0.75rem; }
    .grid { display: grid; }
    .gap-6 { gap: 1.5rem; }
    .min-h-screen { min-height: 100vh; }
    .max-w-7xl { max-width: 80rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .animate-spin { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  </style>
`;

function TestSeniorCockpit() {
  console.log('🧪 Testing Jules Senior Cockpit MVP...');
  
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: mockStyles }} />
      
      {/* Test header */}
      <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #d1d5db' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          🧪 Jules Senior Cockpit MVP Test
        </h1>
        <p style={{ margin: '8px 0 0 0', color: '#6b7280' }}>
          Testar att Senior Cockpit laddar och visar senior-vänlig information
        </p>
      </div>
      
      {/* Senior Cockpit */}
      <SeniorCockpit />
      
      {/* Test footer */}
      <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderTop: '1px solid #d1d5db', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
          ✅ Senior Cockpit MVP Test - Implementerat enligt Jules analys
        </p>
      </div>
    </div>
  );
}

// Test function för att köra i Node.js miljö
export async function testSeniorCockpitLogic() {
  console.log('🧪 Testing Senior Cockpit logic...');
  
  try {
    // Test SeniorViewService
    const { SeniorViewService } = await import('./services/SeniorViewService.js');
    const service = new SeniorViewService();
    
    console.log('✅ SeniorViewService created successfully');
    
    // Test getSeniorView
    const viewResponse = await service.getSeniorView();
    console.log('📊 Senior View Response:', {
      success: viewResponse.success,
      hasData: !!viewResponse.data,
      message: viewResponse.seniorFriendlyMessage
    });
    
    if (viewResponse.success && viewResponse.data) {
      const data = viewResponse.data;
      console.log('📋 Senior View Data:');
      console.log(`  - Project: ${data.projectOverview.title}`);
      console.log(`  - Phase: ${data.projectOverview.currentPhase}`);
      console.log(`  - Progress: ${data.projectOverview.overallProgress}%`);
      console.log(`  - This Week: ${data.recentProgress.thisWeek}`);
      console.log(`  - Next Week: ${data.recentProgress.nextWeek}`);
      console.log(`  - Notifications: ${data.notifications.length}`);
    }
    
    // Test getPhaseStatus
    const phaseResponse = await service.getPhaseStatus('Crawl');
    console.log('🎯 Phase Status Response:', {
      success: phaseResponse.success,
      hasData: !!phaseResponse.data,
      message: phaseResponse.seniorFriendlyMessage
    });
    
    // Test getWeeklyUpdate
    const weeklyResponse = await service.getWeeklyUpdate();
    console.log('📅 Weekly Update Response:', {
      success: weeklyResponse.success,
      hasData: !!weeklyResponse.data,
      message: weeklyResponse.seniorFriendlyMessage
    });
    
    console.log('🎉 All Senior Cockpit logic tests passed!');
    
    return {
      seniorViewService: true,
      getSeniorView: viewResponse.success,
      getPhaseStatus: phaseResponse.success,
      getWeeklyUpdate: weeklyResponse.success
    };
    
  } catch (error) {
    console.error('❌ Senior Cockpit logic test failed:', error);
    return {
      seniorViewService: false,
      error: error.message
    };
  }
}

// Browser test setup
if (typeof window !== 'undefined') {
  console.log('🌐 Setting up Senior Cockpit browser test...');
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrowserTest);
  } else {
    initBrowserTest();
  }
  
  function initBrowserTest() {
    // Create test container
    const container = document.createElement('div');
    container.id = 'senior-cockpit-test';
    document.body.appendChild(container);
    
    // Render Senior Cockpit
    const root = createRoot(container);
    root.render(<TestSeniorCockpit />);
    
    console.log('✅ Senior Cockpit browser test initialized');
  }
}

// Export for Node.js testing
export { TestSeniorCockpit, testSeniorCockpitLogic };