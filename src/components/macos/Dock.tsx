import React from 'react';
import type { Profile, Project, Skill } from '../../types/index';
import { AboutContent } from './windows/AboutContent';
import { ProjectsContent } from './windows/ProjectsContent';
import { ContactContent } from './windows/ContactContent';

interface DockProps {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  onOpenWindow: (id: string, title: string, content: React.ReactNode) => void;
}

interface DockApp {
  id: string;
  title: string;
  icon: string;
  color: string;
  content: React.ReactNode;
}

export const Dock: React.FC<DockProps> = ({ profile, projects, skills, onOpenWindow }) => {
  const apps: DockApp[] = [
    {
      id: 'about',
      title: 'About Me',
      icon: '👤',
      color: 'bg-blue-500',
      content: <AboutContent profile={profile} skills={skills} />
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: '💼',
      color: 'bg-purple-500',
      content: <ProjectsContent projects={projects} />
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: '✉️',
      color: 'bg-green-500',
      content: <ContactContent profile={profile} />
    },
    {
      id: 'resume',
      title: 'Resume',
      icon: '📄',
      color: 'bg-orange-500',
      content: <div className="text-center py-20">
        <p className="text-gray-600 mb-4">Resume viewer coming soon!</p>
        <a href="#" className="text-accent hover:underline">Download PDF</a>
      </div>
    }
  ];

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      {/* Snow Leopard style dock with glass effect */}
      <div 
        className="px-6 py-4 rounded-3xl border border-white/40"
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="flex items-end space-x-4">
          {apps.map(app => (
            <div key={app.id} className="flex flex-col items-center">
              {/* Icon button */}
              <button
                onClick={() => onOpenWindow(app.id, app.title, app.content)}
                className="group relative w-16 h-16 flex items-center justify-center text-5xl transition-all duration-300 ease-out hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-xl"
                title={app.title}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                }}
              >
                {app.icon}
                
                {/* Tooltip on hover */}
                <div 
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                >
                  {app.title}
                </div>
              </button>
              
              {/* Reflection effect */}
              <div 
                className="w-16 h-8 flex items-start justify-center text-5xl overflow-hidden opacity-30 pointer-events-none"
                style={{
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
                  transform: 'scaleY(-1)'
                }}
              >
                {app.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
