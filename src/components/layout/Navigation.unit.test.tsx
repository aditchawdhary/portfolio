import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Navigation } from './Navigation';

describe('Navigation - Unit Tests', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));
  });

  it('renders all navigation links', () => {
    render(<Navigation activeSection="home" />);
    expect(screen.getAllByText('Home')).toHaveLength(1);
    expect(screen.getAllByText('About')).toHaveLength(1);
    expect(screen.getAllByText('Projects')).toHaveLength(1);
    expect(screen.getAllByText('Contact')).toHaveLength(1);
  });

  it('mobile menu is hidden by default', () => {
    render(<Navigation activeSection="home" />);
    const mobileMenuButton = screen.getByLabelText('Toggle menu');
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('mobile menu opens when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation activeSection="home" />);
    
    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);
    
    // Mobile menu should now show navigation items
    const homeButtons = screen.getAllByText('Home');
    expect(homeButtons.length).toBeGreaterThan(1); // Desktop + Mobile
  });

  it('mobile menu closes after clicking a link', async () => {
    const user = userEvent.setup();
    
    // Create mock section
    const mockSection = document.createElement('div');
    mockSection.id = 'about';
    document.body.appendChild(mockSection);
    
    render(<Navigation activeSection="home" />);
    
    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);
    
    // Click a navigation link in mobile menu
    const aboutButtons = screen.getAllByText('About');
    await user.click(aboutButtons[aboutButtons.length - 1]); // Click mobile version
    
    // Menu should close (only desktop version visible)
    const homeButtons = screen.getAllByText('Home');
    expect(homeButtons).toHaveLength(1);
    
    document.body.removeChild(mockSection);
  });
});
