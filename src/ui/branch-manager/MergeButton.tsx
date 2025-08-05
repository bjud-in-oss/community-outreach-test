import React from 'react';

interface MergeButtonProps {
  mergeable: boolean;
}

const MergeButton: React.FC<MergeButtonProps> = ({ mergeable }) => {
  return (
    <button disabled={!mergeable}>
      Merge
    </button>
  );
};

export default MergeButton;
