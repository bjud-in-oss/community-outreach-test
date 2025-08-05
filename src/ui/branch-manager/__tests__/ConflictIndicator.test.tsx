import React from 'react';
import { render, screen } from '@testing-library/react';
import ConflictIndicator from '../ConflictIndicator';

describe('ConflictIndicator', () => {
  it('renders a green indicator when there is no conflict', () => {
    render(<ConflictIndicator conflict={false} />);
    const indicator = screen.getByTitle('No Conflict');
    expect(indicator).toHaveStyle('background-color: rgb(0, 128, 0)');
  });

  it('renders a red indicator when there is a conflict', () => {
    render(<ConflictIndicator conflict={true} />);
    const indicator = screen.getByTitle('Conflict');
    expect(indicator).toHaveStyle('background-color: rgb(255, 0, 0)');
  });
});
