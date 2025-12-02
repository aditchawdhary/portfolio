import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { About } from './About';
import type { Profile, Skill } from '../../types';

const mockProfile: Profile = {
  name: "Jane Smith",
  title: "Frontend Developer",
  bio: "Passionate about creating beautiful user experiences with modern web technologies.",
  avatar: "/test-avatar.jpg",
  email: "jane@example.com",
  socialLinks: []
};

const mockSkills: Skill[] = [
  { name: "React", category: "Frontend", proficiency: 90 },
  { name: "TypeScript", category: "Frontend", proficiency: 85 },
  { name: "Node.js", category: "Backend", proficiency: 75 },
  { name: "PostgreSQL", category: "Backend", proficiency: 70 },
];

describe('About', () => {
  it('displays bio from profile data', () => {
    render(<About profile={mockProfile} skills={mockSkills} />);
    expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
  });

  it('renders avatar with correct src and alt', () => {
    render(<About profile={mockProfile} skills={mockSkills} />);
    const avatar = screen.getByAltText(mockProfile.name);
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockProfile.avatar);
  });

  it('avatar has lazy loading attribute', () => {
    render(<About profile={mockProfile} skills={mockSkills} />);
    const avatar = screen.getByAltText(mockProfile.name);
    expect(avatar).toHaveAttribute('loading', 'lazy');
  });

  it('renders all skills', () => {
    render(<About profile={mockProfile} skills={mockSkills} />);
    mockSkills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it('groups skills by category', () => {
    render(<About profile={mockProfile} skills={mockSkills} />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
  });

  it('displays proficiency percentage for each skill', () => {
    render(<About profile={mockProfile} skills={mockSkills} />);
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
  });

  it('has proper section id for navigation', () => {
    const { container } = render(<About profile={mockProfile} skills={mockSkills} />);
    const section = container.querySelector('#about');
    expect(section).toBeInTheDocument();
  });

  it('renders section heading', () => {
    render(<About profile={mockProfile} skills={mockSkills} />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('renders skills heading', () => {
    render(<About profile={mockProfile} skills={mockSkills} />);
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
  });
});
