import React from 'react';
import type { Profile, Skill } from '../../types/index';
import { Card } from '../ui/index';

interface AboutProps {
  profile: Profile;
  skills: Skill[];
}

export const About: React.FC<AboutProps> = ({ profile, skills }) => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-secondary text-center mb-16">
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Avatar and Bio */}
          <div className="space-y-8">
            <div className="flex justify-center lg:justify-start">
              <img
                src={profile.avatar}
                alt={profile.name}
                loading="lazy"
                className="w-64 h-64 rounded-card object-cover shadow-card"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="256" height="256"%3E%3Crect fill="%23ddd" width="256" height="256"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="64" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EAvatar%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            <Card>
              <h3 className="text-2xl font-bold text-secondary mb-4">
                My Story
              </h3>
              <p className="text-secondary-light leading-relaxed">
                {profile.bio}
              </p>
            </Card>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-secondary mb-6">
              Skills & Expertise
            </h3>

            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <Card key={category} className="space-y-4">
                <h4 className="text-xl font-semibold text-secondary mb-4">
                  {category}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-secondary font-medium">
                          {skill.name}
                        </span>
                        <span className="text-sm text-secondary-light">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-border-light rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
