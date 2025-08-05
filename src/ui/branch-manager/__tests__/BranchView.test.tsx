import React from 'react';
import { render, screen } from '@testing-library/react';
import BranchView from '../BranchView';

describe('BranchView', () => {
  const mockBranch = {
    name: 'test-branch',
    conflict: false,
    pr: 'https://github.com/example/repo/pull/3',
    mergeable: true,
  };

  it('renders the branch name', () => {
    render(<BranchView branch={mockBranch} />);
    expect(screen.getByText('test-branch')).toBeInTheDocument();
  });

  it('renders the PR link if it exists', () => {
    render(<BranchView branch={mockBranch} />);
    expect(screen.getByText('View PR')).toBeInTheDocument();
  });

  it('does not render the PR link if it does not exist', () => {
    const branchWithoutPR = { ...mockBranch, pr: null };
    render(<BranchView branch={branchWithoutPR} />);
    expect(screen.queryByText('View PR')).not.toBeInTheDocument();
  });
});
