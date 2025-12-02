import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import { Navigation } from './Navigation';

// **Feature: portfolio-website, Property 10: Active section highlights navigation**
describe('Navigation - Active Section Property Tests', () => {
  it('Property 10: For any section currently in viewport, the corresponding navigation item should have an active/highlighted state', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('home', 'about', 'projects', 'contact'),
        async (activeSection) => {
          render(<Navigation activeSection={activeSection} />);
          
          // Get the label for the active section
          const label = activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
          const navButton = screen.getByText(label);

          // Verify the active section has the accent color class
          expect(navButton).toHaveClass('text-accent');
          expect(navButton).toHaveClass('border-accent');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 10: Non-active sections should not have active styling', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('home', 'about', 'projects', 'contact'),
        async (activeSection) => {
          const allSections = ['home', 'about', 'projects', 'contact'];
          const inactiveSections = allSections.filter(s => s !== activeSection);
          
          render(<Navigation activeSection={activeSection} />);
          
          // Check that inactive sections don't have active styling
          for (const section of inactiveSections) {
            const label = section.charAt(0).toUpperCase() + section.slice(1);
            const navButton = screen.getByText(label);
            
            expect(navButton).toHaveClass('text-secondary');
            expect(navButton).not.toHaveClass('border-accent');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
