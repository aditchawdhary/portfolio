import React from 'react';
import { profile } from '../../data/profile';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">{profile.name}</p>
            <p className="text-sm text-gray-300 mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            {profile.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors duration-200"
                aria-label={link.platform}
              >
                <span className="text-sm font-medium">{link.platform}</span>
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-gray-300 hover:text-accent transition-colors duration-200"
            >
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
