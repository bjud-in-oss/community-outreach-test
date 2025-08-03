import React from 'react';

const ApprovalButtons = () => {
  return (
    <div className="flex justify-end mt-4">
      <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-300">
        Reject
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
        Approve
      </button>
    </div>
  );
};

export default ApprovalButtons;
