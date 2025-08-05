import { render, screen } from '@testing-library/react';
import Editor from '../components/Editor';

describe('Editor', () => {
  it('renders the editor', () => {
    render(<Editor />);
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
  });
});
