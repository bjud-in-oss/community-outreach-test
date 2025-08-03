import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  status: string;
}

const ApprovalList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data.filter((task: Task) => task.status === 'Pending Approval')));
  }, []);

  const handleUpdateStatus = (id: number, status: string) => {
    fetch('/api/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      });
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 border rounded-md">
          <h2 className="text-lg font-bold">{task.title}</h2>
          <p className="text-sm text-gray-500">Status: {task.status}</p>
          {task.status === 'Pending Approval' && (
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleUpdateStatus(task.id, 'Approved')}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdateStatus(task.id, 'Rejected')}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApprovalList;
