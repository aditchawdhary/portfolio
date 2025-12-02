import React from 'react';
import { Navigation } from './Navigation';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              className="text-2xl font-bold text-white hover:text-accent transition-colors duration-200"
            >
              Portfolio
            </a>
          </div>
          <Navigation activeSection={activeSection} />
        </div>
      </div>
    </header>
  );
};
