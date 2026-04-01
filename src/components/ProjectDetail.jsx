import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import gameJamPhoto from '../assets/gamejamwinnerphoto.jpeg';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animation
    const ctx = gsap.context(() => {
      gsap.from(".animate-in", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    });

    return () => ctx.revert();
  }, [projectId]);

  if (projectId !== 'terrafix') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-on-surface">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="project-content">
      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px] mb-24">
          <div className="lg:col-span-7 flex flex-col items-start text-left animate-in">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">Project</span>
              <span className="h-px w-4 bg-outline-variant/30"></span>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary">HHU Game Jam 2025 Winner</span>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8">Terrafix</h1>
            <p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed mb-8">
              Planetary Restoration Reverse-Factorio. Developed during the 48-hour Game Jam 2025. Harness the power of nature to heal and recover dying worlds occupied by machines.
            </p>
          </div>
          <div className="lg:col-span-5 relative group animate-in">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
            <div className="glow-card aspect-video bg-surface-container-low rounded-2xl relative overflow-hidden group gradient-border">
              <img 
                alt="Terrafix Gameplay" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                src={gameJamPhoto} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-0 right-0 flex flex-wrap justify-end gap-3 px-8">
                {['GAMEPLAY', 'PROCEDURAL', 'UI/UX'].map(badge => (
                  <div key={badge} className="bg-black/80 backdrop-blur-md px-4 py-1 rounded-full border border-primary/30 shadow-[0_0_15px_rgba(0,0,0,0.4)] flex items-center">
                    <span className="font-label text-[10px] font-black uppercase tracking-widest text-primary-fixed-dim">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Foundation */}
        <section className="bg-surface-container-lowest w-full px-8 py-24 border-y border-outline-variant/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 animate-in">
              <div>
                <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-4 block">THE STACK</span>
                <h2 className="font-headline text-5xl font-bold tracking-tight text-on-surface">Technical Foundation</h2>
              </div>
              <p className="font-body text-on-surface-variant max-w-xs">The core technologies and methodologies that powered Terrafix.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Unreal Engine', icon: 'view_in_ar', desc: 'Development with <b>C++</b> for high-performance systems and <b>Blueprints</b> for rapid game mechanics iteration.', color: 'rgba(93, 63, 211, 0.15)' },
                { title: 'Perforce', icon: 'groups', desc: 'Team collaboration and versioning of complex assets in a real-time development environment.', color: 'rgba(166, 230, 255, 0.15)' },
                { title: 'Figma', icon: 'design_services', desc: 'UI/UX prototyping and visual conceptualization of the organic user interface.', color: 'rgba(255, 182, 139, 0.15)' },
                { title: 'Custom Shaders', icon: 'flare', desc: 'Custom <b>HLSL</b> shaders for procedural terrain healing and atmospheric reclamation effects.', color: 'rgba(93, 63, 211, 0.15)' }
              ].map((tech, i) => (
                <div key={i} className="animate-in bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 hover:bg-surface-container-highest transition-colors">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg text-primary mb-6">
                    <span className="material-symbols-outlined">{tech.icon}</span>
                  </div>
                  <h4 className="font-headline text-xl font-bold mb-2 text-on-surface">{tech.title}</h4>
                  <p className="font-body text-sm text-on-surface-variant" dangerouslySetInnerHTML={{ __html: tech.desc }}></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Vision */}
        <section className="w-full px-8 py-32 animate-in">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-4xl">
              <h2 className="font-headline text-4xl sm:text-5xl font-bold mb-12 text-on-surface">The Vision</h2>
              <div className="space-y-16">
                <div>
                  <h3 className="font-label text-sm uppercase tracking-widest text-secondary mb-6 flex items-center gap-4">
                    Overview <span className="h-px w-12 bg-secondary/30"></span>
                  </h3>
                  <div className="font-body text-lg leading-relaxed text-on-surface-variant space-y-6">
                    <p>
                      Terrafix redefines the Factorio principle: instead of gray factories, you use the power of nature. As a small, renegade robot, you build a complex, plant-based network based on a specially developed <b>Custom Node System</b>.
                    </p>
                    <p>
                      Each plant acts as a living module with individual inputs and outputs that must be strategically linked to transform resources and clean the atmosphere.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-label text-sm uppercase tracking-widest text-secondary mb-6 flex items-center gap-4">
                    Gameplay & Tech <span className="h-px w-12 bg-secondary/30"></span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {[
                      { title: 'Node-based Growth', icon: 'biotech', desc: 'Linking plant structures for automated resource flows and energy networks.' },
                      { title: 'Defense & Companions', icon: 'shield', desc: 'Defending against enemy waves with the help of a loyal companion.' },
                      { title: 'Visual Reclamation', icon: 'palette', desc: 'Custom HLSL shaders visualize mechanical corrosion giving way to blooming life.' },
                      { title: 'Research Table', icon: 'inventory_2', desc: 'Strategic development of new plants through found mechanical and organic artifacts.' }
                    ].map((card, i) => (
                      <div key={i} className="flex flex-col gap-4 p-6 bg-surface-container-low rounded-xl border border-outline-variant/10">
                        <div className="flex items-center gap-3 text-primary">
                          <span className="material-symbols-outlined">{card.icon}</span>
                          <span className="font-headline font-bold">{card.title}</span>
                        </div>
                        <p className="text-on-surface-variant text-sm">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;
