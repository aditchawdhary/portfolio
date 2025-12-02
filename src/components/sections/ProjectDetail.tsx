import React from 'react';
import type { Project } from '../../types/index';
import { Modal, Button } from '../ui/index';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} title={project.title}>
      <div className="space-y-6">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover rounded-button"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23ddd" width="800" height="400"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="32" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EProject Image%3C/text%3E%3C/svg%3E';
          }}
        />

        <div>
          <h3 className="text-xl font-semibold text-secondary mb-2">
            Description
          </h3>
          <p className="text-secondary-light leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-secondary mb-3">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-accent/10 text-accent font-medium rounded-button"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {(project.liveUrl || project.repoUrl) && (
          <div className="flex flex-wrap gap-4 pt-4">
            {project.liveUrl && (
              <Button
                onClick={() => window.open(project.liveUrl, '_blank')}
                variant="primary"
              >
                View Live Demo
              </Button>
            )}
            {project.repoUrl && (
              <Button
                onClick={() => window.open(project.repoUrl, '_blank')}
                variant="outline"
              >
                View Source Code
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
