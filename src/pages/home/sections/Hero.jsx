import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import heroImage from '../../../assets/avatar.png';
import PointGrid from '../../../components/ui/PointGrid.jsx';
import { useTheme } from '../../../ThemeContext.jsx';

const Hero = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const dotColor = isDarkMode ? "rgba(93, 63, 211, 0.3)" : "rgba(93, 63, 211, 0.15)";

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden px-6 sm:px-8 pt-32 pb-20" id="about">
      {/* Animated Dot Grid Background */}
      <PointGrid dotColor={dotColor} />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full"></div>

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        <div className="md:col-span-8">
          <div className="mb-8">
            <span className="font-label text-secondary tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">
              {t('hero.role')}
            </span>
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-on-surface mb-2">
              {t('hero.greeting')} <span className="text-gradient">Yassin Kuczma</span>
            </h2>
          </div>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 max-w-4xl">
            <Trans
              i18nKey="hero.title"
              components={{
                gradient: <span className="text-gradient" />,
                br: <br />
              }}
            /><span className="cursor">_</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="mt-8 md:mt-12 flex flex-wrap gap-6 items-center">
            <a
              href="#projects"
              className="bg-primary px-8 py-4 rounded-xl font-label font-bold tracking-tight text-white hover:shadow-[0_0_30px_rgba(93,63,211,0.3)] transition-all"
            >
              {t('hero.cta_portfolio')}
            </a>
            <a href="#tech-stack" className="text-on-surface flex items-center gap-2 font-label group">
              <span>{t('hero.cta_stack')}</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-4 hidden md:block">
          <div className="hero-image-container aspect-[4/5] bg-surface-container-low rounded-2xl relative overflow-hidden group gradient-border">
            <img
              src={heroImage}
              alt="Yassin Kuczma"
              className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 ${isDarkMode ? 'opacity-60' : 'opacity-100'}`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent ${isDarkMode ? 'opacity-100' : 'opacity-30'}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
