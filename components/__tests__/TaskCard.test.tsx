import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../TaskCard';

const task = {
  id: 1,
  title: 'Test Task',
  status: 'pending' as const,
};

test('renders task card with title and status', () => {
  render(<TaskCard task={task} onApprove={() => {}} onReject={() => {}} />);
  expect(screen.getByText('Test Task')).toBeInTheDocument();
  expect(screen.getByText('pending')).toBeInTheDocument();
});

test('calls onApprove when approve button is clicked', () => {
  const onApprove = jest.fn();
  render(<TaskCard task={task} onApprove={onApprove} onReject={() => {}} />);
  fireEvent.click(screen.getByText('Approve'));
  expect(onApprove).toHaveBeenCalledWith(1);
});

test('calls onReject when reject button is clicked', () => {
  const onReject = jest.fn();
  render(<TaskCard task={task} onApprove={() => {}} onReject={onReject} />);
  fireEvent.click(screen.getByText('Reject'));
  expect(onReject).toHaveBeenCalledWith(1);
});
