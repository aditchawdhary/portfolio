import React, { useState } from 'react';
import type { Project } from '../../../types/index';

interface ProjectsContentProps {
  projects: Project[];
}

export const ProjectsContent: React.FC<ProjectsContentProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedProject(null)}
          className="text-accent hover:underline mb-4"
        >
          ← Back to Projects
        </button>
        
        <img
          src={selectedProject.image}
          alt={selectedProject.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        
        <h2 className="text-3xl font-bold text-gray-800">{selectedProject.title}</h2>
        
        <p className="text-gray-700 leading-relaxed">{selectedProject.longDescription}</p>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProject.technologies.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-4">
          {selectedProject.liveUrl && (
            <a
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              View Live
            </a>
          )}
          {selectedProject.repoUrl && (
            <a
              href={selectedProject.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Code
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(project => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer group"
          >
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
