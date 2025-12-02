import type { Skill } from '../types';

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", proficiency: 90 },
  { name: "TypeScript", category: "Frontend", proficiency: 85 },
  { name: "JavaScript", category: "Frontend", proficiency: 95 },
  { name: "HTML/CSS", category: "Frontend", proficiency: 90 },
  { name: "Tailwind CSS", category: "Frontend", proficiency: 85 },
  
  // Backend
  { name: "Node.js", category: "Backend", proficiency: 85 },
  { name: "Express", category: "Backend", proficiency: 80 },
  { name: "PostgreSQL", category: "Backend", proficiency: 75 },
  { name: "MongoDB", category: "Backend", proficiency: 70 },
  
  // Tools & Others
  { name: "Git", category: "Tools", proficiency: 90 },
  { name: "Docker", category: "Tools", proficiency: 70 },
  { name: "AWS", category: "Tools", proficiency: 65 },
  { name: "Vercel", category: "Tools", proficiency: 85 },
];
