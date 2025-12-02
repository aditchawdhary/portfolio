import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { ProjectDetail } from './ProjectDetail';
import { Project } from '../../types';

// **Feature: portfolio-website, Property 4: Project details include all available metadata**
describe('ProjectDetail - Property Tests', () => {
  const projectArbitrary = fc.record({
    id: fc.uuid(),
    title: fc.string({ minLength: 5, maxLength: 50 }),
    description: fc.string({ minLength: 10, maxLength: 100 }),
    longDescription: fc.string({ minLength: 50, maxLength: 200 }),
    image: fc.constant('/test-image.jpg'),
    technologies: fc.array(fc.string({ minLength: 2, maxLength: 15 }), { minLength: 1, maxLength: 8 }),
    liveUrl: fc.option(fc.webUrl(), { nil: undefined }),
    repoUrl: fc.option(fc.webUrl(), { nil: undefined }),
    featured: fc.boolean()
  }) as fc.Arbitrary<Project>;

  it('Property 4: For any project with technologies, all technologies should be displayed in detail view', async () => {
    await fc.assert(
      fc.asyncProperty(
        projectArbitrary,
        async (project) => {
          render(<ProjectDetail project={project} onClose={vi.fn()} />);
          
          // Verify all technologies are displayed
          project.technologies.forEach((tech) => {
            expect(screen.getByText(tech)).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 4: For any project with liveUrl, the live demo button should be present', async () => {
    await fc.assert(
      fc.asyncProperty(
        projectArbitrary.filter(p => p.liveUrl !== undefined),
        async (project) => {
          render(<ProjectDetail project={project} onClose={vi.fn()} />);
          
          // Verify live demo button is present
          expect(screen.getByText('View Live Demo')).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 4: For any project with repoUrl, the source code button should be present', async () => {
    await fc.assert(
      fc.asyncProperty(
        projectArbitrary.filter(p => p.repoUrl !== undefined),
        async (project) => {
          render(<ProjectDetail project={project} onClose={vi.fn()} />);
          
          // Verify source code button is present
          expect(screen.getByText('View Source Code')).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 4: For any project, long description should be displayed', async () => {
    await fc.assert(
      fc.asyncProperty(
        projectArbitrary,
        async (project) => {
          render(<ProjectDetail project={project} onClose={vi.fn()} />);
          
          // Verify long description is present
          expect(screen.getByText(project.longDescription)).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });
});
