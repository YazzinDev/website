// src/components/TechStack.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, Trans } from 'react-i18next';
import GlowCard from '../../../components/ui/GlowCard.jsx';

gsap.registerPlugin(ScrollTrigger);

const skillItems = [
  {
    key: "java",
    icon: "terminal",
    color: "rgba(93, 63, 211, 0.15)",
    accentColor: "primary"
  },
  {
    key: "web",
    icon: "web",
    color: "rgba(166, 230, 255, 0.15)",
    accentColor: "secondary"
  },
  {
    key: "devops",
    icon: "settings_suggest",
    color: "rgba(255, 182, 139, 0.15)",
    accentColor: "tertiary"
  },
  {
    key: "game",
    icon: "sports_esports",
    color: "rgba(93, 63, 211, 0.15)",
    accentColor: "primary"
  }
];

export default function TechStack() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const sweeps = cards.map(card => card.querySelector('.shine-sweep'));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      });

      // Animate card entry
      tl.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Animate shine sweeps
      sweeps.forEach((sweep, index) => {
        if (!sweep) return;
        const sweepStartTime = 0.5 + (index * 0.15);

        tl.fromTo(sweep, {
          x: "-150%",
          opacity: 0,
        }, {
          x: "150%",
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
          onStart: () => {
            gsap.to(sweep, {
              opacity: 0,
              duration: 0.4,
              delay: 0.8,
              ease: "power2.out"
            });
          }
        }, sweepStartTime);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tags = t('stack.tags', { returnObjects: true }) || [];

  return (
    <section id="tech-stack" ref={sectionRef} className="py-32 px-8 bg-surface-container-lowest">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
          <div className="max-w-4xl">
            <span className="font-label text-on-surface-variant tracking-widest uppercase text-xs mb-4 block">
              {t('stack.label')}
            </span>
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-6 text-on-surface">
              <Trans
                i18nKey="stack.title"
                components={{
                  br: <br />
                }}
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          {skillItems.map((skill, index) => (
            <div key={index} ref={el => cardsRef.current[index] = el} className="flex">
              <GlowCard
                title={t(`stack.${skill.key}.title`)}
                icon={skill.icon}
                glowColor={skill.color}
                accentColor={skill.accentColor}
                className="h-full w-full"
                description={
                  <Trans
                    i18nKey={`stack.${skill.key}.desc`}
                    components={{ b: <b /> }}
                  />
                }
              />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-4 justify-center">
          {tags.map((tag) => (
            <span key={tag} className="px-6 py-2 rounded-full border border-outline-variant/30 text-xs font-label uppercase tracking-widest bg-surface-container">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
