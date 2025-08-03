import React from 'react';
import DiffViewer from './DiffViewer';
import ApprovalButtons from './ApprovalButtons';

const PullRequestDetail = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">PR Title</h2>
      <p className="text-sm text-gray-600">Branch: feature-branch</p>
      <div className="my-4">
        <h3 className="font-bold">Description</h3>
        <p>This is a description of the pull request.</p>
      </div>
      <DiffViewer />
      <ApprovalButtons />
    </div>
  );
};

export default PullRequestDetail;
