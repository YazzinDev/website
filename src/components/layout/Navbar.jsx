import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../ThemeContext.jsx';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['about', 'tech-stack', 'projects', 'tools'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const currentLang = i18n.language.split('-')[0].toUpperCase();

  const navItems = [
    { key: 'about', id: 'about', href: '/#about' },
    { key: 'stack', id: 'tech-stack', href: '/#tech-stack' },
    { key: 'work', id: 'projects', href: '/#projects' },
    { key: 'tools', id: 'tools', href: '/#tools' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex justify-between items-center px-8 py-6 max-w-[1440px] mx-auto w-full">
        <Link to="/" className="text-2xl font-black tracking-tighter text-on-surface hover:text-primary transition-colors duration-300">YAZZIN.DEV</Link>

        <div className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`font-manrope tracking-tighter font-bold uppercase text-xs transition-colors duration-300 relative ${
                activeSection === item.id 
                  ? 'text-primary' 
                  : 'text-on-surface/80 hover:text-primary'
              }`}
            >
              {t(`nav.${item.key}`)}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface/70 hover:text-primary hover:bg-surface-container transition-all duration-300 active:scale-90 cursor-pointer"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 font-label text-[11px] tracking-widest uppercase text-on-surface/70 hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              <span>{currentLang}</span>
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-24 bg-surface-container-high rounded-lg border border-outline-variant/20 transition-all duration-300 z-[60]">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`w-full px-4 py-2 text-left font-label text-[10px] tracking-widest uppercase hover:text-primary transition-colors ${currentLang === 'EN' ? 'text-primary font-bold' : 'text-on-surface/60'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('de')}
                  className={`w-full px-4 py-2 text-left font-label text-[10px] tracking-widest uppercase hover:text-primary transition-colors ${currentLang === 'DE' ? 'text-primary font-bold' : 'text-on-surface/60'}`}
                >
                  DE
                </button>
              </div>
            )}
          </div>
          <a
            href="/#contact"
            className="bg-primary text-white px-4 sm:px-6 py-2 rounded-lg font-label font-bold text-[10px] sm:text-sm tracking-widest uppercase active:scale-95 duration-200 shadow-lg shadow-primary/20"
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
