import React from 'react';
import PullRequestList from './PullRequestList';
import PullRequestDetail from './PullRequestDetail';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r">
        <PullRequestList />
      </div>
      <div className="w-2/3">
        <PullRequestDetail />
      </div>
    </div>
  );
};

export default Dashboard;
