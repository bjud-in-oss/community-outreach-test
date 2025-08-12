// Dashboard Components for Jules Automation System
// Pure JavaScript components that work with our Express server

class TaskDashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.tasks = [];
    this.init();
  }

  init() {
    this.render();
    this.loadTasks();
    // Auto-refresh every 30 seconds
    setInterval(() => this.loadTasks(), 30000);
  }

  async loadTasks() {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      this.tasks = data.tasks || [];
      this.renderTasks();
    } catch (error) {
      console.error('Error loading tasks:', error);
      this.showError('Failed to load tasks');
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="dashboard-header">
        <h1>🤖 Jules Automation Dashboard</h1>
        <div class="dashboard-stats" id="dashboard-stats">
          <div class="stat-item">
            <span class="stat-number" id="pending-count">0</span>
            <span class="stat-label">Pending</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" id="completed-count">0</span>
            <span class="stat-label">Completed</span>
          </div>
          <div class="stat-item">
            <span class="stat-number" id="total-count">0</span>
            <span class="stat-label">Total</span>
          </div>
        </div>
      </div>
      
      <div class="dashboard-content">
        <div class="section">
          <h2>✅ Ready for Approval</h2>
          <div id="completed-tasks" class="task-grid">
            <div class="loading">Loading tasks...</div>
          </div>
        </div>
        
        <div class="section">
          <h2>⏳ In Progress</h2>
          <div id="pending-tasks" class="task-list">
            <div class="loading">Loading tasks...</div>
          </div>
        </div>
      </div>
      
      <div id="error-message" class="error-message" style="display: none;"></div>
    `;
  }

  renderTasks() {
    const completedTasks = this.tasks.filter(task => task.status === 'completed');
    const pendingTasks = this.tasks.filter(task => task.status === 'pending');
    
    // Update stats
    document.getElementById('pending-count').textContent = pendingTasks.length;
    document.getElementById('completed-count').textContent = completedTasks.length;
    document.getElementById('total-count').textContent = this.tasks.length;
    
    // Render completed tasks (ready for approval)
    this.renderCompletedTasks(completedTasks);
    
    // Render pending tasks
    this.renderPendingTasks(pendingTasks);
  }

  renderCompletedTasks(tasks) {
    const container = document.getElementById('completed-tasks');
    
    if (tasks.length === 0) {
      container.innerHTML = '<div class="no-tasks">No tasks ready for approval</div>';
      return;
    }

    container.innerHTML = tasks.map(task => `
      <div class="task-card completed" data-task-id="${task.id}">
        <div class="task-header">
          <h3>${this.escapeHtml(task.title)}</h3>
          <span class="task-status completed">✅ Completed</span>
        </div>
        
        <div class="task-description">
          <p>${this.escapeHtml(task.description.substring(0, 200))}${task.description.length > 200 ? '...' : ''}</p>
        </div>
        
        <div class="task-meta">
          <span>ID: ${task.id}</span>
          <span>Created: ${new Date(task.createdAt).toLocaleDateString()}</span>
          ${task.completedAt ? `<span>Completed: ${new Date(task.completedAt).toLocaleDateString()}</span>` : ''}
          ${task.prUrl ? `<a href="${task.prUrl}" target="_blank" rel="noopener noreferrer">View PR</a>` : ''}
        </div>
        
        <div class="task-actions">
          <button class="btn-approve" onclick="dashboard.approveTask('${task.id}')">
            ✅ Approve & Merge
          </button>
          <button class="btn-reject" onclick="dashboard.rejectTask('${task.id}')">
            ❌ Reject
          </button>
        </div>
      </div>
    `).join('');
  }

  renderPendingTasks(tasks) {
    const container = document.getElementById('pending-tasks');
    
    if (tasks.length === 0) {
      container.innerHTML = '<div class="no-tasks">No pending tasks</div>';
      return;
    }

    container.innerHTML = tasks.map(task => `
      <div class="task-item pending" data-task-id="${task.id}">
        <div class="task-status-icon">⏳</div>
        <div class="task-content">
          <h4>${this.escapeHtml(task.title)}</h4>
          <p>${this.escapeHtml(task.description.substring(0, 150))}${task.description.length > 150 ? '...' : ''}</p>
          <div class="task-meta">
            <span>ID: ${task.id}</span>
            <span>Created: ${new Date(task.createdAt).toLocaleDateString()}</span>
            ${task.githubIssueNumber ? `<span>Issue #${task.githubIssueNumber}</span>` : ''}
          </div>
        </div>
        <div class="task-status-badge pending">PENDING</div>
      </div>
    `).join('');
  }

  async approveTask(taskId) {
    if (!confirm(`Are you sure you want to approve and merge task ${taskId}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/preview/${taskId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      
      if (result.success) {
        this.showSuccess(`Task ${taskId} approved and merged successfully!`);
        // Reload tasks after a short delay
        setTimeout(() => this.loadTasks(), 2000);
      } else {
        this.showError(`Failed to approve task: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error approving task:', error);
      this.showError('Failed to approve task');
    }
  }

  async rejectTask(taskId) {
    const reason = prompt(`Why are you rejecting task ${taskId}?`);
    if (!reason) return;

    try {
      const response = await fetch(`/api/preview/${taskId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });

      const result = await response.json();
      
      if (result.success) {
        this.showSuccess(`Task ${taskId} rejected successfully!`);
        setTimeout(() => this.loadTasks(), 2000);
      } else {
        this.showError(`Failed to reject task: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error rejecting task:', error);
      this.showError('Failed to reject task');
    }
  }

  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  showError(message) {
    this.showMessage(message, 'error');
  }

  showMessage(message, type) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.className = `message ${type}`;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Global dashboard instance
let dashboard;

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  dashboard = new TaskDashboard('dashboard-container');
});

// CSS Styles
const styles = `
<style>
.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  margin: 0 0 20px 0;
  font-size: 2.5em;
}

.dashboard-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2em;
  font-weight: bold;
}

.stat-label {
  font-size: 0.9em;
  opacity: 0.9;
}

.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.section h2 {
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.task-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.task-header h3 {
  margin: 0;
  color: #333;
}

.task-status.completed {
  background: #d4edda;
  color: #155724;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.task-description {
  margin-bottom: 15px;
  color: #666;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #888;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.task-meta a {
  color: #007bff;
  text-decoration: none;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.btn-approve, .btn-reject {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-approve {
  background: #28a745;
  color: white;
}

.btn-approve:hover {
  background: #218838;
}

.btn-reject {
  background: #dc3545;
  color: white;
}

.btn-reject:hover {
  background: #c82333;
}

.task-list {
  space-y: 10px;
}

.task-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  margin-bottom: 10px;
}

.task-status-icon {
  font-size: 20px;
  margin-top: 5px;
}

.task-content {
  flex: 1;
}

.task-content h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.task-status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  height: fit-content;
}

.task-status-badge.pending {
  background: #ffc107;
  color: #856404;
}

.no-tasks {
  text-align: center;
  padding: 40px;
  color: #666;
  font-style: italic;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.message {
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
  font-weight: bold;
}

.message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr;
  }
  
  .task-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-stats {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', styles);