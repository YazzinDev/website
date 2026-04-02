import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import GlowCard from '../../components/ui/GlowCard.jsx';
import { useTheme } from '../../ThemeContext.jsx';
import { projectConfigs } from '../../data/projects.js';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

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

  const currentMetadata = projectConfigs[projectId];

  if (!currentMetadata) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-on-surface">
        <h1 className="text-4xl font-bold mb-4">{t('projects.terrafix.details.notFound')}</h1>
        <Link to="/" className="text-primary hover:underline">{t('projects.terrafix.details.backHome')}</Link>
      </div>
    );
  }

  const projectData = t(`projects.${projectId}.details`, { returnObjects: true });

  return (
    <div className="project-content">
      <main className="pt-32 pb-0">
        {/* Hero Section */}
        <section className="px-8 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px] mb-24">
          <div className="lg:col-span-7 flex flex-col items-start text-left animate-in">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">{projectData.projectLabel}</span>
              <span className="h-px w-4 bg-outline-variant/30"></span>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary">
                {t(`projects.${projectId}.badge`)}
              </span>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-8">{t(`projects.${projectId}.title`)}</h1>
            <p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed mb-8">
              {projectData.heroDescription}
            </p>
          </div>
          <div className="lg:col-span-5 relative group animate-in">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
            <div className="glow-card aspect-video bg-surface-container-low rounded-2xl relative overflow-hidden group gradient-border">
              <img
                alt={t(`projects.${projectId}.title`)}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isDarkMode ? 'opacity-80' : 'opacity-100'}`}
                src={currentMetadata.heroImage}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent ${isDarkMode ? 'opacity-100' : 'opacity-40'}`}></div>

              <div className="absolute bottom-8 left-0 right-0 flex flex-wrap justify-end gap-3 px-8">
                {Object.values(projectData.badges).map(badge => (
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
                <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-4 block">{projectData.stack.label}</span>
                <h2 className="font-headline text-5xl font-bold tracking-tight text-on-surface">{projectData.stack.title}</h2>
              </div>
              <p className="font-body text-on-surface-variant max-w-xs">{projectData.stack.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(projectData.stack.items).map(([key, tech], i) => (
                <div key={key} className="animate-in flex">
                  <GlowCard
                    title={tech.title}
                    description={<span dangerouslySetInnerHTML={{ __html: tech.desc }} />}
                    icon={currentMetadata.stack[key].icon}
                    glowColor={currentMetadata.stack[key].color}
                    accentColor={currentMetadata.stack[key].accent}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="w-full px-8 py-32 animate-in">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-4xl">
              <h2 className="font-headline text-4xl sm:text-5xl font-bold mb-12 text-on-surface">{projectData.vision.title}</h2>
              <div className="space-y-16">
                <div>
                  <h3 className="font-label text-sm uppercase tracking-widest text-secondary mb-6 flex items-center gap-4">
                    {projectData.vision.overview.title} <span className="h-px w-12 bg-secondary/30"></span>
                  </h3>
                  <div className="font-body text-lg leading-relaxed text-on-surface-variant space-y-6">
                    <p dangerouslySetInnerHTML={{ __html: projectData.vision.overview.p1 }}></p>
                    <p dangerouslySetInnerHTML={{ __html: projectData.vision.overview.p2 }}></p>
                  </div>
                </div>

                <div>
                  <h3 className="font-label text-sm uppercase tracking-widest text-secondary mb-6 flex items-center gap-4">
                    {projectData.vision.gameplay.title} <span className="h-px w-12 bg-secondary/30"></span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {Object.entries(projectData.vision.gameplay.items).map(([key, card], i) => (
                      <div key={key} className="flex">
                        <GlowCard
                          title={card.title}
                          description={card.desc}
                          icon={currentMetadata.visionIcons[key].icon}
                          glowColor={currentMetadata.visionIcons[key].color}
                          accentColor={currentMetadata.visionIcons[key].accent}
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
