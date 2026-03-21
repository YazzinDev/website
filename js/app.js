document.addEventListener('DOMContentLoaded', () => {
    // Glow Card Effect
    const cards = document.querySelectorAll('.glow-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Internationalization (i18n) Logic
    let translations = {};
    const langEnBtn = document.getElementById('lang-en');
    const langDeBtn = document.getElementById('lang-de');

    const loadTranslations = async () => {
        try {
            const response = await fetch('translations.json');
            translations = await response.json();
            initLanguage();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    };

    const updateUI = (lang) => {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Update elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update button styles
        if (lang === 'en') {
            langEnBtn.classList.add('text-[#c9bfff]', 'font-bold');
            langEnBtn.classList.remove('text-[#e4e1e6]/40');
            langDeBtn.classList.remove('text-[#c9bfff]', 'font-bold');
            langDeBtn.classList.add('text-[#e4e1e6]/40');
        } else {
            langDeBtn.classList.add('text-[#c9bfff]', 'font-bold');
            langDeBtn.classList.remove('text-[#e4e1e6]/40');
            langEnBtn.classList.remove('text-[#c9bfff]', 'font-bold');
            langEnBtn.classList.add('text-[#e4e1e6]/40');
        }

        // Save preference
        localStorage.setItem('preferred-lang', lang);
    };

    const initLanguage = () => {
        const savedLang = localStorage.getItem('preferred-lang');
        const browserLang = navigator.language.startsWith('de') ? 'de' : 'en';
        const initialLang = savedLang || browserLang;
        updateUI(initialLang);
    };

    langEnBtn.addEventListener('click', () => updateUI('en'));
    langDeBtn.addEventListener('click', () => updateUI('de'));

    loadTranslations();
});
