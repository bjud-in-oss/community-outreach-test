import React from 'react';
import { render, screen } from '@testing-library/react';
import MergeButton from '../MergeButton';

describe('MergeButton', () => {
  it('is enabled when the branch is mergeable', () => {
    render(<MergeButton mergeable={true} />);
    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('is disabled when the branch is not mergeable', () => {
    render(<MergeButton mergeable={false} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
