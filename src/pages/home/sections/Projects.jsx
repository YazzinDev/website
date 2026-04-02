import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import gameJamPhoto from '../../../assets/gamejamwinnerphoto.jpeg';
import exambytePhoto from '../../../assets/exambyte.jpg'

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
useEffect(() => {
  const ctx = gsap.context(() => {
    // Animate Header
    gsap.from(headerRef.current.children, {
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Animate Project cards simultaneously with their own trigger
    const cards = gsap.utils.toArray(".project-card");
    if (cards.length > 0) {
      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ExamByte Project */}
          <Link
            to="/projects/exambyte"
            className="project-card group bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container transition-[background-color,border-color,box-shadow] duration-300 gradient-border flex flex-col hover:-translate-y-1"
          >
            <div className="aspect-video bg-surface-container overflow-hidden rounded-2xl mb-6 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
              <img
                src={exambytePhoto}
                alt="ExamByte University Platform"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-secondary/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.9)]">
                <span className="font-label text-[10px] font-black uppercase tracking-widest leading-none text-secondary">{t('projects.exambyte.badge')}</span>
              </div>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2 text-on-surface">{t('projects.exambyte.title')}</h3>
            <p className="font-body text-on-surface/75 text-sm mb-6 flex-grow">{t('projects.exambyte.desc')}</p>
            <div className="flex gap-4 mb-8">
              <span className="px-3 py-1 bg-surface-container-highest text-[10px] font-label uppercase tracking-wider rounded text-on-surface/80">Java</span>
              <span className="px-3 py-1 bg-surface-container-highest text-[10px] font-label uppercase tracking-wider rounded text-on-surface/80">Spring Boot</span>
              <span className="px-3 py-1 bg-surface-container-highest text-[10px] font-label uppercase tracking-wider rounded text-on-surface/80">PostgreSQL</span>
            </div>
            <div className="inline-flex items-center justify-center gap-2 w-full bg-primary text-white font-label font-bold py-3 rounded-lg text-sm tracking-widest uppercase group-hover:brightness-110 transition-all shadow-lg shadow-primary/20">
              <span>{t('projects.exambyte.cta')}</span> <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </div>
          </Link>

          {/* Terrafix Project */}
          <Link
            to="/projects/terrafix"
            className="project-card group bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container transition-[background-color,border-color,box-shadow] duration-300 gradient-border flex flex-col hover:-translate-y-1"
          >
            <div className="aspect-video bg-surface-container overflow-hidden rounded-2xl mb-6 relative">
              <img
                src={gameJamPhoto}
                alt="HHU Game Jam Winner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.4)]">
                <span className="font-label text-[10px] font-black uppercase tracking-widest leading-none text-amber-400">{t('projects.terrafix.badge')}</span>
              </div>
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2 text-on-surface">{t('projects.terrafix.title')}</h3>
            <p className="font-body text-on-surface/75 text-sm mb-6 flex-grow">{t('projects.terrafix.desc')}</p>
            <div className="flex gap-4 mb-8">
              <span className="px-3 py-1 bg-surface-container-highest text-[10px] font-label uppercase tracking-wider rounded text-on-surface/80">Unreal Engine</span>
              <span className="px-3 py-1 bg-surface-container-highest text-[10px] font-label uppercase tracking-wider rounded text-on-surface/80">Perforce</span>
              <span className="px-3 py-1 bg-surface-container-highest text-[10px] font-label uppercase tracking-wider rounded text-on-surface/80">C++</span>
            </div>
            <div className="inline-flex items-center justify-center gap-2 w-full bg-primary text-white font-label font-bold py-3 rounded-lg text-sm tracking-widest uppercase group-hover:brightness-110 transition-all shadow-lg shadow-primary/20">
              <span>{t('projects.terrafix.cta')}</span> <span className="material-symbols-outlined text-sm">arrow_outward</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
