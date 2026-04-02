import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import GlowCard from '../../components/ui/GlowCard.jsx';
import gameJamPhoto from '../../assets/gamejamwinnerphoto.jpeg';

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
        <h1 className="text-4xl font-bold mb-4">{t('projects.terrafix.details.notFound')}</h1>
        <Link to="/" className="text-primary hover:underline">{t('projects.terrafix.details.backHome')}</Link>
      </div>
    );
  }

  const stackItems = t('projects.terrafix.details.stack.items', { returnObjects: true });
  const stackMetadata = {
    unreal: { icon: 'view_in_ar', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' },
    perforce: { icon: 'groups', color: 'rgba(166, 230, 255, 0.15)', accent: 'secondary' },
    figma: { icon: 'design_services', color: 'rgba(255, 182, 139, 0.15)', accent: 'tertiary' },
    shaders: { icon: 'flare', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' }
  };

  const gameplayItems = t('projects.terrafix.details.vision.gameplay.items', { returnObjects: true });
  const gameplayMetadata = {
    growth: { icon: 'biotech', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' },
    defense: { icon: 'shield', color: 'rgba(166, 230, 255, 0.15)', accent: 'secondary' },
    visual: { icon: 'palette', color: 'rgba(255, 182, 139, 0.15)', accent: 'tertiary' },
    research: { icon: 'inventory_2', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' }
  };

  return (
    <div className="project-content">
      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px] mb-24">
          <div className="lg:col-span-7 flex flex-col items-start text-left animate-in">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">{t('projects.terrafix.details.projectLabel')}</span>
              <span className="h-px w-4 bg-outline-variant/30"></span>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary">{t('projects.terrafix.details.jamWinner')}</span>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8">{t('projects.terrafix.title')}</h1>
            <p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed mb-8">
              {t('projects.terrafix.details.heroDescription')}
            </p>
          </div>
          <div className="lg:col-span-5 relative group animate-in">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
            <div className="glow-card aspect-video bg-surface-container-low rounded-2xl relative overflow-hidden group gradient-border">
              <img
                alt={t('projects.terrafix.details.gameplayAlt')}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${isDarkMode ? 'opacity-80' : 'opacity-100'}`}
                src={gameJamPhoto}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent ${isDarkMode ? 'opacity-100' : 'opacity-40'}`}></div>

              <div className="absolute bottom-8 left-0 right-0 flex flex-wrap justify-end gap-3 px-8">
                {Object.values(t('projects.terrafix.details.badges', { returnObjects: true })).map(badge => (
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
                <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-4 block">{t('projects.terrafix.details.stack.label')}</span>
                <h2 className="font-headline text-5xl font-bold tracking-tight text-on-surface">{t('projects.terrafix.details.stack.title')}</h2>
              </div>
              <p className="font-body text-on-surface-variant max-w-xs">{t('projects.terrafix.details.stack.description')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(stackItems).map(([key, tech], i) => (
                <div key={key} className="animate-in flex">
                  <GlowCard
                    title={tech.title}
                    description={<span dangerouslySetInnerHTML={{ __html: tech.desc }} />}
                    icon={stackMetadata[key].icon}
                    glowColor={stackMetadata[key].color}
                    accentColor={stackMetadata[key].accent}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Vision */}
        <section className="w-full px-8 py-32 animate-in">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-4xl">
              <h2 className="font-headline text-4xl sm:text-5xl font-bold mb-12 text-on-surface">{t('projects.terrafix.details.vision.title')}</h2>
              <div className="space-y-16">
                <div>
                  <h3 className="font-label text-sm uppercase tracking-widest text-secondary mb-6 flex items-center gap-4">
                    {t('projects.terrafix.details.vision.overview.title')} <span className="h-px w-12 bg-secondary/30"></span>
                  </h3>
                  <div className="font-body text-lg leading-relaxed text-on-surface-variant space-y-6">
                    <p dangerouslySetInnerHTML={{ __html: t('projects.terrafix.details.vision.overview.p1') }}></p>
                    <p dangerouslySetInnerHTML={{ __html: t('projects.terrafix.details.vision.overview.p2') }}></p>
                  </div>
                </div>

                <div>
                  <h3 className="font-label text-sm uppercase tracking-widest text-secondary mb-6 flex items-center gap-4">
                    {t('projects.terrafix.details.vision.gameplay.title')} <span className="h-px w-12 bg-secondary/30"></span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {Object.entries(gameplayItems).map(([key, card], i) => (
                      <div key={key} className="flex">
                        <GlowCard
                          title={card.title}
                          description={card.desc}
                          icon={gameplayMetadata[key].icon}
                          glowColor={gameplayMetadata[key].color}
                          accentColor={gameplayMetadata[key].accent}
                          className="w-full h-full"
                        />
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
