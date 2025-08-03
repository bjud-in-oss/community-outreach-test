import { render, screen } from '@testing-library/react';
import Testing from '../testing';

// Mock the QRCodeCanvas component
jest.mock('qrcode.react', () => ({
  QRCodeCanvas: () => <canvas />,
}));

describe('Testing Page', () => {
  it('renders the dashboard title', () => {
    render(<Testing />);
    const heading = screen.getByRole('heading', {
      name: /live testing dashboard/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the deployment status section', () => {
    render(<Testing />);
    const heading = screen.getByRole('heading', {
      name: /deployment status/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the QR code section', () => {
    render(<Testing />);
    const heading = screen.getByRole('heading', {
      name: /qr code/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the performance metrics section', () => {
    render(<Testing />);
    const heading = screen.getByRole('heading', {
      name: /performance metrics/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
