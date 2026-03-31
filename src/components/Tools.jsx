import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowCard from './GlowCard';

gsap.registerPlugin(ScrollTrigger);

const Tools = () => {
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

      // Card animation
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
    <section ref={sectionRef} className="py-32 px-8 relative bg-surface-container-lowest" id="tools">
      <div className="max-w-[1440px] mx-auto">
        <div ref={headerRef} className="text-center mb-24">
          <span className="font-label text-on-surface-variant tracking-widest uppercase text-xs">{t('tools.label')}</span>
          <h2 className="font-headline text-5xl font-bold mt-4 tracking-tight">{t('tools.title')}</h2>
        </div>
        
        <div className="flex justify-center">
          <div ref={cardRef} className="max-w-xl w-full">
            <GlowCard 
              title={t('tools.coming_soon.title')}
              icon="construction"
              glowColor="rgba(93, 63, 211, 0.15)"
              description={
                <>
                  {t('tools.coming_soon.desc')}
                  <div className="mt-8">
                    <a href="https://github.com/YazzinDev/" className="inline-flex items-center justify-center gap-2 w-full bg-primary text-white font-label font-bold py-3 rounded-lg text-sm tracking-widest uppercase hover:brightness-110 transition-all">
                      <span>{t('tools.coming_soon.cta')}</span> <span className="material-symbols-outlined text-sm">arrow_outward</span>
                    </a>
                  </div>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
