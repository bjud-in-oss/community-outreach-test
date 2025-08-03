import React from 'react';

const ApprovalButtons: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Approvals</h2>
      <div className="flex space-x-2">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold
 py-2 px-4 rounded">
          Approve
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-
2 px-4 rounded">
          Reject
        </button>
      </div>
    </div>
  );
};

export default ApprovalButtons;
