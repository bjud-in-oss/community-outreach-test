import React from 'react';
import PullRequestListItem from './PullRequestListItem';

const PullRequestList = () => {
  return (
    <div>
      <h2 className="text-lg font-bold p-4">Pull Requests</h2>
      <ul>
        <PullRequestListItem />
        <PullRequestListItem />
        <PullRequestListItem />
      </ul>
    </div>
  );
};

export default PullRequestList;
