import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Profile, ContactFormData } from '../../types/index';
import { Button, Input, Textarea, Card } from '../ui/index';

interface ContactProps {
  profile: Profile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [isSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    // Open email client with pre-filled data
    const subject = encodeURIComponent(`Portfolio Contact: ${data.name}`);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-secondary text-center mb-16">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Name"
                placeholder="Your name"
                error={errors.name?.message}
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  },
                  maxLength: {
                    value: 100,
                    message: 'Name must be less than 100 characters'
                  }
                })}
              />

              <Input
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />

              <Textarea
                label="Message"
                placeholder="Your message..."
                rows={5}
                error={errors.message?.message}
                {...register('message', {
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters'
                  },
                  maxLength: {
                    value: 1000,
                    message: 'Message must be less than 1000 characters'
                  }
                })}
              />

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-button">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {isSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-button">
                  <p className="text-green-600 text-sm">
                    Thank you for your message! I'll get back to you soon.
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>

          {/* Alternative Contact Methods */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-secondary mb-4">
                Email
              </h3>
              <a
                href={`mailto:${profile.email}`}
                className="text-accent hover:underline"
              >
                {profile.email}
              </a>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-secondary mb-4">
                Connect
              </h3>
              <div className="space-y-3">
                {profile.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-secondary hover:text-accent transition-colors duration-200"
                  >
                    <span className="font-medium">{link.platform}</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
