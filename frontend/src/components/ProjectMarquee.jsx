import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ProjectMarquee = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://tuievolution-backend.onrender.com')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || projects.length === 0) return null;

  // Sonsuz döngü için veriyi çoğalt
  const displayProjects = [...projects, ...projects, ...projects, ...projects];

  // Helper: Başlıktaki boşlukları _ yapar
  const getProjectSlug = (title) => title.trim().replace(/\s+/g, '_');

  return (
    <div className="w-full overflow-hidden py-10 bg-accent/5 dark:bg-white/5 mt-10 relative">
      <div className="flex w-max gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {displayProjects.map((project, index) => (
          <Link 
            key={`${project.id}-${index}`} 
            // ID yerine Title Slug kullanıyoruz (Örn: #TuiEvolution_AI)
            to={`/projects#${getProjectSlug(project.title)}`}
            className="w-72 h-48 glass card flex flex-col items-center justify-center overflow-hidden group border border-transparent hover:border-accent relative rounded-2xl p-0 transition-all duration-300 flex-shrink-0"
          >
             {/* Arka Plan Görseli */}
             <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url(${project.imageUrl || 'https://via.placeholder.com/300x200'})` }}
             >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
             </div>
             
             {/* Sadece Başlık */}
             <div className="relative z-10 text-center px-4">
                <h3 className="text-xl font-bold text-white drop-shadow-md tracking-wider">
                  {project.title}
                </h3>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectMarquee;