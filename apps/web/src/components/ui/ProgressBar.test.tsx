import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct percentage', () => {
    render(<ProgressBar value={50} max={100} label="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('shows value when showValue is true', () => {
    render(<ProgressBar value={10} max={20} showValue />);
    expect(screen.getByText('10/20')).toBeInTheDocument();
  });

  it('caps percentage at 100', () => {
    const { container } = render(<ProgressBar value={150} max={100} />);
    const fill = container.querySelector('.progress-bar-fill');
    expect(fill).toHaveStyle({ width: '100%' });
  });

  it('has correct aria attributes', () => {
    render(<ProgressBar value={5} max={10} />);
    const meter = screen.getByRole('meter');
    expect(meter).toHaveAttribute('aria-valuenow', '5');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '10');
  });
});
