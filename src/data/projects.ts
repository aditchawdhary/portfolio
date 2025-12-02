import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with real-time inventory management",
    longDescription: "Built a full-stack e-commerce platform featuring real-time inventory tracking, secure payment processing, and an intuitive admin dashboard. The platform handles thousands of transactions daily and provides a seamless shopping experience across all devices.",
    image: "/images/projects/ecommerce.jpg",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/yourusername/ecommerce",
    featured: true
  },
  {
    id: "project-2",
    title: "Task Management App",
    description: "Collaborative task management tool for remote teams",
    longDescription: "Developed a collaborative task management application that helps remote teams stay organized and productive. Features include real-time updates, drag-and-drop task organization, team chat, and detailed analytics.",
    image: "/images/projects/taskmanager.jpg",
    technologies: ["React", "Firebase", "Material-UI", "WebSockets"],
    liveUrl: "https://example.com/tasks",
    repoUrl: "https://github.com/yourusername/taskmanager",
    featured: true
  },
  {
    id: "project-3",
    title: "Weather Dashboard",
    description: "Real-time weather tracking with interactive maps",
    longDescription: "Created an interactive weather dashboard that provides real-time weather data, forecasts, and severe weather alerts. The application features beautiful data visualizations and supports multiple locations.",
    image: "/images/projects/weather.jpg",
    technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
    liveUrl: "https://example.com/weather",
    featured: false
  },
];
