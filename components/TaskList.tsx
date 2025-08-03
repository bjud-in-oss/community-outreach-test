import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 border rounded-md">
          <a href={`/testing/${task.id}`} className="text-lg font-bold hover:underline">{task.title}</a>
          <p className="text-sm text-gray-500">Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
