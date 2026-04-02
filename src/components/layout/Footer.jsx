import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-surface-container-lowest w-full py-20 px-8 border-t border-outline-variant/10 relative">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-surface-container-high border border-outline-variant/20 rounded-full flex items-center justify-center text-on-surface/40 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_20px_rgba(93,63,211,0.2)] transition-all duration-300 group active:scale-90"
          aria-label="Back to top"
        >
          <span className="material-symbols-outlined group-hover:-translate-y-1 transition-transform">arrow_upward</span>
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          <div className="text-xl font-black text-on-surface tracking-tighter">YAZZIN.DEV</div>
          <div className="flex gap-8">
            <a className="font-inter text-sm text-on-surface/40 hover:text-primary transition-all duration-300 hover:underline" href="https://www.linkedin.com/in/yassinkuczma/">LinkedIn</a>
            <a className="font-inter text-sm text-on-surface/40 hover:text-primary transition-all duration-300 hover:underline" href="https://github.com/YazzinDev/">GitHub</a>
          </div>
          <div className="font-inter text-sm text-on-surface/40">{t('footer.copyright', { year: currentYear })}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
