import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import ProjectMarquee from '../components/ProjectMarquee';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:8080/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
      
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
      }
    }
  }, [location, projects]);

  return (
    <div className="min-h-screen pt-20">
      <ProjectMarquee />
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-16">Our Project Catalog</h1>
        <div className="grid gap-16">
          {projects.map(project => (
            <div key={project.id} id={`project-${project.id}`} className="glass p-8 rounded-[2rem] flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 h-64 bg-accent/10 rounded-2xl overflow-hidden">
                <img src={project.imageUrl} className="w-full h-full object-cover" alt={project.title} />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-accent mb-4">{project.title}</h2>
                <p className="text-lg opacity-80 mb-6">{project.description}</p>
                <div className="flex gap-4">
                  <span className="px-4 py-2 bg-accent text-white rounded-full text-sm">{project.stack}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 p-4 bg-accent text-white rounded-full shadow-2xl hover:scale-110 transition-all z-50"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Projects;