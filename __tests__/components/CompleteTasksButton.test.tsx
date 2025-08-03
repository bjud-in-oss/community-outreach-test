import { render, screen, fireEvent, act } from '@testing-library/react';
import CompleteTasksButton from '../../components/CompleteTasksButton';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Tasks completed successfully' }),
  })
) as jest.Mock;

describe('CompleteTasksButton', () => {
  it('renders the button', () => {
    render(<CompleteTasksButton />);
    expect(
      screen.getByRole('button', { name: /Complete Ready for Review Tasks/i })
    ).toBeInTheDocument();
  });

  it('calls the API on button click', async () => {
    render(<CompleteTasksButton />);
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: /Complete Ready for Review Tasks/i })
      );
    });
    expect(fetch).toHaveBeenCalledWith('/api/complete-tasks', {
      method: 'POST',
    });
  });
});
