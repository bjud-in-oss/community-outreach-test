import React, { useState, useEffect } from 'react';
import './BranchManager.css';
import BranchView from './BranchView';

// Mock data for branches
const mockBranches = [
  {
    name: 'main',
    conflict: false,
    pr: 'https://github.com/example/repo/pull/1',
    mergeable: true,
  },
  {
    name: 'feature/new-ui',
    conflict: true,
    pr: 'https://github.com/example/repo/pull/2',
    mergeable: false,
  },
  {
    name: 'bugfix/login-issue',
    conflict: false,
    pr: null,
    mergeable: true,
  },
];

const BranchManager = () => {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch this data from your server API
    setBranches(mockBranches);
  }, []);

  return (
    <div className="branch-manager">
      <h1>Branch Manager</h1>
      <div>
        {branches.map((branch) => (
          <BranchView key={branch.name} branch={branch} />
        ))}
      </div>
    </div>
  );
};

export default BranchManager;
