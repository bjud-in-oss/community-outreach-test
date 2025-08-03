import React from 'react';
import TaskStatus from './TaskStatus';
import ApprovalButtons from './ApprovalButtons';
import SystemHealth from './SystemHealth';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Development Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskStatus />
        <ApprovalButtons />
        <SystemHealth />
      </div>
    </div>
  );
};

export default Dashboard;
