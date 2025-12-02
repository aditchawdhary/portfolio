import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import { Navigation } from './Navigation';

// **Feature: portfolio-website, Property 9: Navigation links scroll to sections**
describe('Navigation - Property Tests', () => {
  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = vi.fn();
    
    // Mock getBoundingClientRect
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

  it('Property 9: For any navigation link, clicking it should scroll to the corresponding section', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('home', 'about', 'projects', 'contact'),
        async (sectionId) => {
          const user = userEvent.setup();
          
          // Create mock section element
          const mockSection = document.createElement('div');
          mockSection.id = sectionId;
          document.body.appendChild(mockSection);

          render(<Navigation activeSection="" />);
          
          // Find and click the navigation link
          const navButton = screen.getByText(
            sectionId.charAt(0).toUpperCase() + sectionId.slice(1)
          );
          await user.click(navButton);

          // Verify scrollTo was called
          expect(window.scrollTo).toHaveBeenCalled();
          
          // Cleanup
          document.body.removeChild(mockSection);
        }
      ),
      { numRuns: 100 }
    );
  });
});
