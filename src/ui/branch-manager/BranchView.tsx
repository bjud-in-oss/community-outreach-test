import React from 'react';
import ConflictIndicator from './ConflictIndicator';
import MergeButton from './MergeButton';

interface Branch {
  name: string;
  conflict: boolean;
  pr: string | null;
  mergeable: boolean;
}

interface BranchViewProps {
  branch: Branch;
}

const BranchView: React.FC<BranchViewProps> = ({ branch }) => {
  return (
    <div className="branch-view">
      <h3>{branch.name}</h3>
      <ConflictIndicator conflict={branch.conflict} />
      {branch.pr && (
        <a href={branch.pr} target="_blank" rel="noopener noreferrer">
          View PR
        </a>
      )}
      <MergeButton mergeable={branch.mergeable} />
    </div>
  );
};

export default BranchView;
