import React from 'react';
import { render, screen } from '@testing-library/react';
import BranchManager from '../BranchManager';

// Mock the child components to isolate the BranchManager component
jest.mock('../BranchView', () => () => <div>Branch View</div>);

describe('BranchManager', () => {
  it('renders the branch manager title', () => {
    render(<BranchManager />);
    expect(screen.getByText('Branch Manager')).toBeInTheDocument();
  });

  it('renders the correct number of branches', async () => {
    render(<BranchManager />);
    const branchViews = await screen.findAllByText('Branch View');
    expect(branchViews).toHaveLength(3);
  });
});
