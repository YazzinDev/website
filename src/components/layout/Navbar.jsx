import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const currentLang = i18n.language.split('-')[0].toUpperCase();

  const navItems = [
    { key: 'about', href: '/#about' },
    { key: 'stack', href: '/#tech-stack' },
    { key: 'work', href: '/#projects' },
    { key: 'tools', href: '/#tools' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex justify-between items-center px-8 py-6 max-w-[1440px] mx-auto w-full">
        <Link to="/" className="text-2xl font-black tracking-tighter text-on-surface hover:text-primary transition-colors duration-300">YAZZIN.DEV</Link>

        <div className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="font-manrope tracking-tighter font-bold uppercase text-xs text-on-surface/60 hover:text-primary transition-colors duration-300"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 font-label text-[10px] tracking-widest uppercase text-on-surface/40 hover:text-primary transition-colors duration-300"
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
            href="/public#contact"
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
