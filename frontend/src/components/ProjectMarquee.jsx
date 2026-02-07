import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const ProjectMarquee = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend'den projeleri çekiyoruz
    fetch('http://localhost:8080/api/projects')
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

  // Tasarımın sonsuz döngüde görünmesi için gelen veriyi 3 kez yan yana diziyoruz
  const displayProjects = [...projects, ...projects, ...projects];

  return (
    <div className="w-full overflow-hidden py-10 bg-accent/5 dark:bg-white/5 mt-10">
      {/* Kayan Kapsayıcı */}
      <div className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]">
        {displayProjects.map((project, index) => (
          <Link 
            key={`${project.id}-${index}`} 
            to={`/projects#project-${project.id}`}
            className="w-72 h-48 glass card flex flex-col items-center justify-between overflow-hidden group border border-transparent hover:border-accent dark:hover:border-darkAccent relative rounded-2xl p-6 transition-all duration-300"
          >
             {/* Arka Plan Görseli (Backend'deki imageUrl'den gelir) */}
             <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity" 
                style={{ backgroundImage: `url(${project.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'})` }}
             ></div>
             
             {/* Proje Bilgileri */}
             <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <h3 className="text-xl font-bold text-accent dark:text-darkAccent mb-2 drop-shadow-md">
                  {project.title}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-wider bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full text-textPrimary dark:text-darkTextPrimary">
                  {project.stack}
                </span>
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectMarquee;