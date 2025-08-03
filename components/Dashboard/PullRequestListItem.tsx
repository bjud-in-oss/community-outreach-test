import React from 'react';

const PullRequestListItem = () => {
  return (
    <li className="p-4 border-b hover:bg-gray-100 cursor-pointer">
      <h3 className="font-bold">PR Title</h3>
      <p className="text-sm text-gray-600">Repo: owner/repo</p>
      <div className="flex items-center mt-2">
        <span className="text-green-500 mr-2">✓ Tests Passing</span>
        <span className="text-yellow-500 mr-2">2 Reviews</span>
        <span className="text-red-500">Conflicts</span>
      </div>
    </li>
  );
};

export default PullRequestListItem;
