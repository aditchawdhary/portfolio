import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import { Contact } from './Contact';
import { Profile } from '../../types';

const mockProfile: Profile = {
  name: "Test User",
  title: "Developer",
  bio: "Test bio",
  avatar: "/avatar.jpg",
  email: "test@example.com",
  socialLinks: []
};

// **Feature: portfolio-website, Property 6: Invalid form data shows validation errors**
describe('Contact - Form Validation Property Tests', () => {
  it('Property 6: For any empty name field, validation error should be displayed', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constant(''),
        async (emptyName) => {
          const user = userEvent.setup();
          render(<Contact profile={mockProfile} />);
          
          const nameInput = screen.getByLabelText('Name');
          const submitButton = screen.getByText('Send Message');
          
          await user.clear(nameInput);
          await user.type(nameInput, emptyName);
          await user.click(submitButton);
          
          await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 10 }
    );
  });

  it('Property 6: For any name shorter than 2 characters, validation error should be displayed', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 1 }),
        async (shortName) => {
          const user = userEvent.setup();
          render(<Contact profile={mockProfile} />);
          
          const nameInput = screen.getByLabelText('Name');
          const submitButton = screen.getByText('Send Message');
          
          await user.type(nameInput, shortName);
          await user.click(submitButton);
          
          await waitFor(() => {
            expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 6: For any invalid email format, validation error should be displayed', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => !s.includes('@')),
        async (invalidEmail) => {
          const user = userEvent.setup();
          render(<Contact profile={mockProfile} />);
          
          const emailInput = screen.getByLabelText('Email');
          const submitButton = screen.getByText('Send Message');
          
          await user.type(emailInput, invalidEmail);
          await user.click(submitButton);
          
          await waitFor(() => {
            expect(screen.getByText('Invalid email address')).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 6: For any message shorter than 10 characters, validation error should be displayed', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 9 }),
        async (shortMessage) => {
          const user = userEvent.setup();
          render(<Contact profile={mockProfile} />);
          
          const messageInput = screen.getByLabelText('Message');
          const submitButton = screen.getByText('Send Message');
          
          await user.type(messageInput, shortMessage);
          await user.click(submitButton);
          
          await waitFor(() => {
            expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Property 6: For any whitespace-only message, validation error should be displayed', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 20 }).map(s => ' '.repeat(s.length)),
        async (whitespaceMessage) => {
          const user = userEvent.setup();
          render(<Contact profile={mockProfile} />);
          
          const messageInput = screen.getByLabelText('Message');
          const submitButton = screen.getByText('Send Message');
          
          await user.type(messageInput, whitespaceMessage);
          await user.click(submitButton);
          
          await waitFor(() => {
            const errorMessage = screen.queryByText('Message is required') || 
                                screen.queryByText('Message must be at least 10 characters');
            expect(errorMessage).toBeInTheDocument();
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
