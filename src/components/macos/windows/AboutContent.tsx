import React from 'react';
import type { Profile, Skill } from '../../../types/index';

interface AboutContentProps {
  profile: Profile;
  skills: Skill[];
}

export const AboutContent: React.FC<AboutContentProps> = ({ profile, skills }) => {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-6">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-32 h-32 rounded-full object-cover shadow-lg"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h2>
          <p className="text-xl text-gray-600 mb-4">{profile.title}</p>
          <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Skills</h3>
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map(skill => (
                  <span
                    key={skill.name}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
