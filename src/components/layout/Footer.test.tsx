import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Footer } from './Footer';
import { profile } from '../../data/profile';

describe('Footer', () => {
  it('renders profile name', () => {
    render(<Footer />);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
  });

  it('displays current year in copyright', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('renders social links from profile data', () => {
    render(<Footer />);
    profile.socialLinks.forEach((link) => {
      expect(screen.getByText(link.platform)).toBeInTheDocument();
    });
  });

  it('renders email address', () => {
    render(<Footer />);
    expect(screen.getByText(profile.email)).toBeInTheDocument();
  });

  it('social links open in new tab', () => {
    render(<Footer />);
    profile.socialLinks.forEach((link) => {
      const linkElement = screen.getByText(link.platform).closest('a');
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('email link has mailto href', () => {
    render(<Footer />);
    const emailLink = screen.getByText(profile.email);
    expect(emailLink).toHaveAttribute('href', `mailto:${profile.email}`);
  });
});
