import React, { useState } from 'react';
import type { Project } from '../../types/index';
import { Card } from '../ui/index';
import { ProjectDetail } from './ProjectDetail';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-secondary text-center mb-16">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                hover
                onClick={() => setSelectedProject(project)}
                className="flex flex-col h-full"
              >
                <div className="relative overflow-hidden rounded-button mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EProject%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                <h3 className="text-xl font-bold text-secondary mb-2">
                  {project.title}
                </h3>

                <p className="text-secondary-light mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-border-light text-secondary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-border-light text-secondary text-sm rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center text-secondary-light py-12">
              <p className="text-xl">No projects to display yet.</p>
            </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};
