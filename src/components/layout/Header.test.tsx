import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders the portfolio logo/title', () => {
    render(<Header activeSection="home" />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders with fixed positioning', () => {
    const { container } = render(<Header activeSection="home" />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('fixed');
  });

  it('includes Navigation component', () => {
    render(<Header activeSection="about" />);
    // Check that navigation items are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('passes activeSection prop to Navigation', () => {
    render(<Header activeSection="projects" />);
    const projectsButton = screen.getByText('Projects');
    expect(projectsButton).toHaveClass('text-accent');
  });
});
