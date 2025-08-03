import React from 'react';

const TaskStatus: React.FC = () => {
  const tasks = [
    { id: 1, name: 'Task 1', status: 'In Progress' },
    { id: 2, name: 'Task 2', status: 'Completed' },
    { id: 3, name: 'Task 3', status: 'Waiting' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Task Status</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center mb-1">
            <span>{task.name}</span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              task.status === 'Completed' ? 'bg-green-200 text-green-800' :
              task.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
              'bg-gray-200 text-gray-800'
            }`}>
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskStatus;
