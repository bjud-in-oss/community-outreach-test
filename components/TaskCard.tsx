import React from 'react';
import { Task } from '../data/tasks';

interface TaskCardProps {
  task: Task;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const statusColors = {
  pending: 'bg-yellow-500',
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onApprove, onReject }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold">{task.title}</h3>
        <div className="flex items-center mt-2">
          <span className={`w-3 h-3 rounded-full ${statusColors[task.status]} mr-2`}></span>
          <p className="text-sm text-gray-500 capitalize">{task.status}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => onApprove(task.id)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(task.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
