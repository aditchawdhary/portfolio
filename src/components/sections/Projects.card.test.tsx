import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { Projects } from './Projects';
import { Project } from '../../types';

// **Feature: portfolio-website, Property 2: Project cards contain required information**
describe('Projects - Card Content Property Tests', () => {
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

  it('Property 2: For any project, the card should contain title, description, and image', async () => {
    await fc.assert(
      fc.asyncProperty(
        projectArbitrary,
        async (project) => {
          render(<Projects projects={[project]} />);
          
          // Verify title is present
          expect(screen.getByText(project.title)).toBeInTheDocument();
          
          // Verify description is present
          expect(screen.getByText(project.description)).toBeInTheDocument();
          
          // Verify image is present with correct alt text
          const image = screen.getByAltText(project.title);
          expect(image).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 2: For any project, technologies should be displayed', async () => {
    await fc.assert(
      fc.asyncProperty(
        projectArbitrary,
        async (project) => {
          render(<Projects projects={[project]} />);
          
          // Verify at least some technologies are displayed
          const displayedTechs = project.technologies.slice(0, 3);
          displayedTechs.forEach((tech) => {
            expect(screen.getByText(tech)).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
