import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../dashboard';

jest.mock('../../data/tasks', () => ({
  ...jest.requireActual('../../data/tasks'),
  tasks: [
    { id: 1, title: 'Task 1', status: 'pending' },
    { id: 2, title: 'Task 2', status: 'approved' },
  ],
}));

test('renders dashboard with tasks', () => {
  render(<Dashboard />);
  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();
});

test('approves a task when approve button is clicked', () => {
  render(<Dashboard />);
  const approveButtons = screen.getAllByText('Approve');
  fireEvent.click(approveButtons[0]);
  const pendingTasks = screen.queryAllByText('pending');
  expect(pendingTasks.length).toBe(0);
});

test('rejects a task when reject button is clicked', () => {
  render(<Dashboard />);
  const rejectButtons = screen.getAllByText('Reject');
  fireEvent.click(rejectButtons[0]);
  const pendingTasks = screen.queryAllByText('pending');
  expect(pendingTasks.length).toBe(0);
});
