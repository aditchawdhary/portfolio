import { useState, useEffect } from 'react';
import { Header, Footer } from './components/layout/index';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { Desktop } from './components/macos';
import { StarField } from './components/effects/StarField';
import { profile } from './data/profile';
import { projects } from './data/projects';
import { skills } from './data/skills';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMacOSMode, setIsMacOSMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMacOSMode) {
    return (
      <>
        <Desktop profile={profile} projects={projects} skills={skills} />
        <button
          onClick={() => setIsMacOSMode(false)}
          className="fixed top-8 right-4 z-50 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg shadow-lg hover:bg-white transition-colors text-sm font-medium"
        >
          Switch to Classic View
        </button>
      </>
    );
  }

  return (
    <div className="min-h-screen relative">
      <StarField />
      <div className="relative z-10">
        <Header activeSection={activeSection} />
        <button
          onClick={() => setIsMacOSMode(true)}
          className="fixed top-20 right-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg shadow-lg hover:bg-white/20 transition-all text-sm font-medium"
        >
          🖥️ Try Retro View
        </button>
        <main>
          <Hero profile={profile} />
          <About profile={profile} skills={skills} />
          <Projects projects={projects} />
          <Contact profile={profile} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
