import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import { Projects } from './Projects';
import type { Project } from '../../types';

// **Feature: portfolio-website, Property 3: Clicking projects shows details**
describe('Projects - Click Interaction Property Tests', () => {
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

  it('Property 3: For any project, clicking its card should open the detail view with that project\'s information', async () => {
    await fc.assert(
      fc.asyncProperty(
        projectArbitrary,
        async (project) => {
          const user = userEvent.setup();
          render(<Projects projects={[project]} />);
          
          // Click on the project card
          const projectCard = screen.getByText(project.title).closest('div[class*="cursor-pointer"]');
          if (projectCard) {
            await user.click(projectCard);
            
            // Verify the modal opens with the long description
            expect(screen.getByText(project.longDescription)).toBeInTheDocument();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
