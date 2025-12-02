import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies base styles', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('rounded-card');
    expect(card).toHaveClass('shadow-card');
  });

  it('applies hover styles when hover prop is true', () => {
    render(<Card hover>Hoverable</Card>);
    const card = screen.getByText('Hoverable').parentElement;
    expect(card).toHaveClass('hover:shadow-card-hover');
    expect(card).toHaveClass('cursor-pointer');
  });

  it('does not apply hover styles by default', () => {
    render(<Card>No hover</Card>);
    const card = screen.getByText('No hover').parentElement;
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('handles click events when onClick is provided', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Card onClick={handleClick}>Clickable</Card>);
    await user.click(screen.getByText('Clickable'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Custom</Card>);
    const card = screen.getByText('Custom').parentElement;
    expect(card).toHaveClass('custom-card');
  });
});
