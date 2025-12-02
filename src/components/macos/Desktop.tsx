import React, { useState } from 'react';
import { Dock } from './Dock';
import { Window } from './Window';
import type { Profile, Project, Skill } from '../../types/index';

interface DesktopProps {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
}

interface OpenWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  zIndex: number;
}

export const Desktop: React.FC<DesktopProps> = ({ profile, projects, skills }) => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);

  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    const existingWindow = openWindows.find(w => w.id === id);
    if (existingWindow) {
      bringToFront(id);
      return;
    }

    setOpenWindows([...openWindows, { id, title, content, zIndex: nextZIndex }]);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const bringToFront = (id: string) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ 
      backgroundImage: 'url(/images/galaxy-wallpaper.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>

      {/* Menu Bar - Classic Mac OS Style */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400 flex items-center px-3 text-gray-900 text-sm z-50 shadow-md" style={{
        fontFamily: 'Chicago, "Courier New", monospace'
      }}>
        <span className="font-bold mr-4">🍎</span>
        <span className="font-semibold px-2 hover:bg-blue-600 hover:text-white cursor-pointer">File</span>
        <span className="font-semibold px-2 hover:bg-blue-600 hover:text-white cursor-pointer">Edit</span>
        <span className="font-semibold px-2 hover:bg-blue-600 hover:text-white cursor-pointer">View</span>
        <span className="font-semibold px-2 hover:bg-blue-600 hover:text-white cursor-pointer">Special</span>
        <div className="ml-auto flex items-center space-x-3">
          <span className="font-mono text-xs">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Windows */}
      {openWindows.map(window => (
        <Window
          key={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
          zIndex={window.zIndex}
        >
          {window.content}
        </Window>
      ))}

      {/* Dock */}
      <Dock 
        profile={profile}
        projects={projects}
        skills={skills}
        onOpenWindow={openWindow}
      />
    </div>
  );
};
