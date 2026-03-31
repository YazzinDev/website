import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest w-full py-20 px-8 border-t border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-[1440px] mx-auto">
        <div className="text-xl font-black text-on-surface">YAZZIN.DEV</div>
        <div className="flex gap-8">
          <a className="font-inter text-sm text-on-surface/40 hover:text-primary transition-all duration-300 hover:underline" href="https://www.linkedin.com/in/yassinkuczma/">LinkedIn</a>
          <a className="font-inter text-sm text-on-surface/40 hover:text-primary transition-all duration-300 hover:underline" href="https://github.com/YazzinDev/">GitHub</a>
        </div>
        <div className="font-inter text-sm text-on-surface/40">{t('footer.copyright', { year: currentYear })}</div>
      </div>
    </footer>
  );
};

export default Footer;
