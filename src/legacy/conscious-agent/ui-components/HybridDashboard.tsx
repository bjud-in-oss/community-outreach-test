// HYBRID DASHBOARD - Master Plan 2.0
// Kombinerar TaskCard.tsx (React) med dashboard-components.js (funktionalitet)
// Integrerar med simple-server.ts för backend

import React, { useState, useEffect } from 'react';

// Import rescued TaskCard component
import TaskCard from '../../rescued-pr-code/components/TaskCard';

// Types from legacy system
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  completedAt?: string;
  agentType?: 'conscious' | 'core' | 'bridge';
  complexity?: 'low' | 'medium' | 'high';
  requiresSeniorApproval?: boolean;
}

interface DashboardStats {
  pending: number;
  completed: number;
  total: number;
  approved: number;
  rejected: number;
}

const HybridDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    pending: 0,
    completed: 0,
    total: 0,
    approved: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from our simple-server.ts backend
  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/status');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const tasksData = data.tasks || [];
      
      setTasks(tasksData);
      updateStats(tasksData);
      setError(null);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Kunde inte ladda uppgifter. Kontrollera att servern körs.');
    } finally {
      setLoading(false);
    }
  };

  // Update statistics
  const updateStats = (tasksData: Task[]) => {
    const stats = {
      total: tasksData.length,
      pending: tasksData.filter(t => t.status === 'pending').length,
      completed: tasksData.filter(t => t.status === 'completed').length,
      approved: tasksData.filter(t => t.status === 'approved').length,
      rejected: tasksData.filter(t => t.status === 'rejected').length
    };
    setStats(stats);
  };

  // Handle task approval (senior-friendly)
  const handleApprove = async (taskId: number) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update task status locally
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId 
              ? { ...task, status: 'approved' as const }
              : task
          )
        );
        
        // Show senior-friendly success message
        showSeniorMessage('✅ Uppgiften godkändes!', 'success');
      } else {
        throw new Error('Kunde inte godkänna uppgiften');
      }
    } catch (err) {
      console.error('Error approving task:', err);
      showSeniorMessage('❌ Något gick fel. Försök igen.', 'error');
    }
  };

  // Handle task rejection (senior-friendly)
  const handleReject = async (taskId: number) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update task status locally
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId 
              ? { ...task, status: 'rejected' as const }
              : task
          )
        );
        
        // Show senior-friendly success message
        showSeniorMessage('🚫 Uppgiften avvisades.', 'info');
      } else {
        throw new Error('Kunde inte avvisa uppgiften');
      }
    } catch (err) {
      console.error('Error rejecting task:', err);
      showSeniorMessage('❌ Något gick fel. Försök igen.', 'error');
    }
  };

  // Senior-friendly message system
  const showSeniorMessage = (message: string, type: 'success' | 'error' | 'info') => {
    // TODO: Implement toast notification system
    // For now, use simple alert (will be replaced with proper UI)
    alert(message);
  };

  // Auto-refresh every 30 seconds (from legacy dashboard-components.js)
  useEffect(() => {
    loadTasks();
    const interval = setInterval(loadTasks, 30000);
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (loading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laddar uppgifter...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-8 rounded-lg">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">Något gick fel</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadTasks}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Försök igen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Header - Senior-friendly */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎭 Din Kodningsassistent
        </h1>
        <p className="text-gray-600 mb-6">
          Här kan du se och godkänna vad din AI-assistent har gjort åt dig.
        </p>
        
        {/* Statistics - Adapted from dashboard-components.js */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-blue-800">Totalt</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-yellow-800">Väntar</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-green-800">Godkända</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-red-800">Avvisade</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
            <div className="text-sm text-gray-800">Klara</div>
          </div>
        </div>
      </div>

      {/* Tasks Grid - Using rescued TaskCard component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Inga uppgifter än
            </h3>
            <p className="text-gray-500">
              Din AI-assistent har inte skapat några uppgifter än. 
              När den gör det kommer de att visas här.
            </p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>

      {/* Refresh Button - Senior-friendly */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={loadTasks}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? '🔄' : '↻'} Uppdatera
        </button>
      </div>
    </div>
  );
};

export default HybridDashboard;