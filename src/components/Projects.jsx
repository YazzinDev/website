import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import gameJamPhoto from '../assets/gamejamwinnerphoto.jpeg';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current.children, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      });

      // Project card animation
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-8" id="projects">
      <div className="max-w-[1440px] mx-auto">
        <div ref={headerRef} className="flex justify-between items-end mb-20">
          <div>
            <h2 className="font-headline text-5xl font-bold tracking-tighter mb-4">{t('projects.title')}</h2>
            <p className="font-body text-on-surface-variant max-w-md">{t('projects.description')}</p>
          </div>
          <div className="hidden md:block">
            <span className="font-label text-on-surface-variant text-sm uppercase">{t('projects.label')}</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div ref={cardRef} className="group bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container transition-colors duration-300 gradient-border max-w-xl w-full">
            <div className="aspect-video bg-surface-container overflow-hidden rounded-2xl mb-6 relative">
              <img 
                src={gameJamPhoto} 
                alt="HHU Game Jam Winner" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.4)]">
                <span className="font-label text-[10px] font-black uppercase tracking-widest leading-none text-amber-400">{t('projects.terrafix.badge')}</span>
              </div>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2 text-on-surface">{t('projects.terrafix.title')}</h3>
            <p className="font-body text-on-surface/70 text-sm mb-6">{t('projects.terrafix.desc')}</p>
            <Link className="inline-flex items-center justify-center gap-2 w-full bg-primary text-white font-label font-bold py-3 rounded-lg text-sm tracking-widest uppercase hover:brightness-110 transition-all shadow-lg shadow-primary/20 cursor-pointer" to="/projects/terrafix">
              <span>{t('projects.terrafix.cta')}</span> <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
