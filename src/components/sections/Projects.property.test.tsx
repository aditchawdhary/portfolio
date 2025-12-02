import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { Projects } from './Projects';
import { Project } from '../../types';

// **Feature: portfolio-website, Property 1: All projects are displayed**
describe('Projects - Property Tests', () => {
  // Generator for random projects
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

  it('Property 1: For any array of projects, all projects should appear in the DOM', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(projectArbitrary, { minLength: 1, maxLength: 10 }),
        async (projects) => {
          render(<Projects projects={projects} />);
          
          // Verify all project titles are rendered
          projects.forEach((project) => {
            expect(screen.getByText(project.title)).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 1: Empty project array should display appropriate message', async () => {
    render(<Projects projects={[]} />);
    expect(screen.getByText('No projects to display yet.')).toBeInTheDocument();
  });
});
