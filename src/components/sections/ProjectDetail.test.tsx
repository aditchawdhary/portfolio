import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { ProjectDetail } from './ProjectDetail';
import type { Project } from '../../types';

const mockProject: Project = {
  id: 'test-1',
  title: 'Test Project',
  description: 'Short description',
  longDescription: 'This is a detailed description of the test project with more information.',
  image: '/test-image.jpg',
  technologies: ['React', 'TypeScript', 'Tailwind'],
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/test/repo',
  featured: true
};

describe('ProjectDetail', () => {
  beforeEach(() => {
    // Mock window.open
    window.open = vi.fn();
  });

  it('displays correct project data', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.longDescription)).toBeInTheDocument();
  });

  it('displays all technologies', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    mockProject.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('renders external links when present', () => {
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    expect(screen.getByText('View Live Demo')).toBeInTheDocument();
    expect(screen.getByText('View Source Code')).toBeInTheDocument();
  });

  it('does not render link buttons when URLs are missing', () => {
    const projectWithoutLinks = { ...mockProject, liveUrl: undefined, repoUrl: undefined };
    render(<ProjectDetail project={projectWithoutLinks} onClose={vi.fn()} />);
    
    expect(screen.queryByText('View Live Demo')).not.toBeInTheDocument();
    expect(screen.queryByText('View Source Code')).not.toBeInTheDocument();
  });

  it('opens live demo in new tab when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    const liveButton = screen.getByText('View Live Demo');
    await user.click(liveButton);
    
    expect(window.open).toHaveBeenCalledWith(mockProject.liveUrl, '_blank');
  });

  it('opens source code in new tab when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProjectDetail project={mockProject} onClose={vi.fn()} />);
    
    const repoButton = screen.getByText('View Source Code');
    await user.click(repoButton);
    
    expect(window.open).toHaveBeenCalledWith(mockProject.repoUrl, '_blank');
  });

  it('calls onClose when modal close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    render(<ProjectDetail project={mockProject} onClose={handleClose} />);
    
    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    render(<ProjectDetail project={mockProject} onClose={handleClose} />);
    
    // Click the backdrop (the parent of the modal content)
    const backdrop = screen.getByText(mockProject.longDescription).parentElement?.parentElement?.parentElement;
    if (backdrop) {
      await user.click(backdrop);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });
});
