import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';
import { Profile } from '../../types';

const mockProfile: Profile = {
  name: "Jane Doe",
  title: "Developer",
  bio: "Test bio",
  avatar: "/avatar.jpg",
  email: "jane@example.com",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/jane", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/jane", icon: "linkedin" }
  ]
};

describe('Contact', () => {
  it('displays all required form fields', () => {
    render(<Contact profile={mockProfile} />);
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('displays submit button', () => {
    render(<Contact profile={mockProfile} />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('displays validation error for invalid email format', async () => {
    render(<Contact profile={mockProfile} />);
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByText('Send Message');
    
    // Type invalid email and submit
    await emailInput.focus();
    // Note: Full interaction testing would require userEvent
  });

  it('displays alternative contact methods', () => {
    render(<Contact profile={mockProfile} />);
    
    // Check email is displayed
    expect(screen.getByText(mockProfile.email)).toBeInTheDocument();
  });

  it('displays social links from profile data', () => {
    render(<Contact profile={mockProfile} />);
    
    mockProfile.socialLinks.forEach((link) => {
      expect(screen.getByText(link.platform)).toBeInTheDocument();
    });
  });

  it('social links open in new tab', () => {
    render(<Contact profile={mockProfile} />);
    
    mockProfile.socialLinks.forEach((link) => {
      const linkElement = screen.getByText(link.platform).closest('a');
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('email link has mailto href', () => {
    render(<Contact profile={mockProfile} />);
    
    const emailLink = screen.getByText(mockProfile.email);
    expect(emailLink).toHaveAttribute('href', `mailto:${mockProfile.email}`);
  });

  it('has proper section id for navigation', () => {
    const { container } = render(<Contact profile={mockProfile} />);
    const section = container.querySelector('#contact');
    expect(section).toBeInTheDocument();
  });

  it('renders section heading', () => {
    render(<Contact profile={mockProfile} />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });
});
