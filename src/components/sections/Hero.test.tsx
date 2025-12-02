import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Hero } from './Hero';
import type { Profile } from '../../types';

const mockProfile: Profile = {
  name: "John Doe",
  title: "Full Stack Developer",
  bio: "Test bio",
  avatar: "/test-avatar.jpg",
  email: "test@example.com",
  socialLinks: []
};

describe('Hero', () => {
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

  it('renders name from profile data', () => {
    render(<Hero profile={mockProfile} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders title from profile data', () => {
    render(<Hero profile={mockProfile} />);
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Hero profile={mockProfile} />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('View Projects')).toBeInTheDocument();
  });

  it('Get In Touch button scrolls to contact section', async () => {
    const user = userEvent.setup();
    
    // Create mock contact section
    const mockSection = document.createElement('div');
    mockSection.id = 'contact';
    document.body.appendChild(mockSection);
    
    render(<Hero profile={mockProfile} />);
    
    const button = screen.getByText('Get In Touch');
    await user.click(button);
    
    expect(window.scrollTo).toHaveBeenCalled();
    
    document.body.removeChild(mockSection);
  });

  it('View Projects button scrolls to projects section', async () => {
    const user = userEvent.setup();
    
    // Create mock projects section
    const mockSection = document.createElement('div');
    mockSection.id = 'projects';
    document.body.appendChild(mockSection);
    
    render(<Hero profile={mockProfile} />);
    
    const button = screen.getByText('View Projects');
    await user.click(button);
    
    expect(window.scrollTo).toHaveBeenCalled();
    
    document.body.removeChild(mockSection);
  });

  it('renders scroll indicator', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    const scrollIndicator = container.querySelector('.animate-bounce');
    expect(scrollIndicator).toBeInTheDocument();
  });

  it('has proper section id for navigation', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    const section = container.querySelector('#home');
    expect(section).toBeInTheDocument();
  });
});
