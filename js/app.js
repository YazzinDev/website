document.addEventListener('DOMContentLoaded', () => {
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

    let translations = {};
    const langEnBtn = document.getElementById('lang-en');
    const langDeBtn = document.getElementById('lang-de');
    const currentLangText = document.getElementById('current-lang-text');
    const langDropdown = document.getElementById('lang-dropdown');
    const langMenu = document.getElementById('lang-menu');
    const langCurrent = document.getElementById('lang-current');

    const loadTranslations = async () => {
        try {
            const response = await fetch('translations.json');
            translations = await response.json();
            initLanguage();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    };

    const updateUI = (lang, shouldGlitch = false) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (shouldGlitch && key === 'hero_title') {
                    glitchText(el, translations[lang][key]);
                } else {
                    let content = translations[lang][key];
                    if (key === 'hero_title') {
                        content += '<span class="cursor">_</span>';
                    }
                    el.innerHTML = content;
                }
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        });

        document.documentElement.lang = lang;
        if (currentLangText) {
            currentLangText.textContent = lang.toUpperCase();
        }

        if (lang === 'en') {
            langEnBtn.classList.add('text-[#c9bfff]', 'font-bold');
            langEnBtn.classList.remove('text-[#e4e1e6]/60');
            langDeBtn.classList.remove('text-[#c9bfff]', 'font-bold');
            langDeBtn.classList.add('text-[#e4e1e6]/60');
        } else {
            langDeBtn.classList.add('text-[#c9bfff]', 'font-bold');
            langDeBtn.classList.remove('text-[#e4e1e6]/60');
            langEnBtn.classList.remove('text-[#c9bfff]', 'font-bold');
            langEnBtn.classList.add('text-[#e4e1e6]/60');
        }

        localStorage.setItem('preferred-lang', lang);
        
        // Close menu after selection
        if (langMenu) {
            langMenu.classList.remove('opacity-100', 'visible');
            langMenu.classList.add('opacity-0', 'invisible');
        }
    };

    // Toggle dropdown
    if (langCurrent && langMenu) {
        langCurrent.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = langMenu.classList.contains('visible');
            if (isVisible) {
                langMenu.classList.remove('opacity-100', 'visible');
                langMenu.classList.add('opacity-0', 'invisible');
            } else {
                langMenu.classList.add('opacity-100', 'visible');
                langMenu.classList.remove('opacity-0', 'invisible');
            }
        });

        document.addEventListener('click', () => {
            langMenu.classList.remove('opacity-100', 'visible');
            langMenu.classList.add('opacity-0', 'invisible');
        });
    }

    const glitchText = (element, targetHTML) => {
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        const temp = document.createElement('div');
        temp.innerHTML = targetHTML;
        
        const getCharMap = (node, currentTags = []) => {
            let map = [];
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent;
                    for (let i = 0; i < text.length; i++) {
                        map.push({ char: text[i], tags: [...currentTags] });
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    if (child.tagName === 'BR') {
                        map.push({ char: '\n', tags: [...currentTags] });
                    } else {
                        const tagInfo = {
                            tagName: child.tagName.toLowerCase(),
                            attributes: Array.from(child.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ')
                        };
                        map = map.concat(getCharMap(child, [...currentTags, tagInfo]));
                    }
                }
            });
            return map;
        };

        const charMap = getCharMap(temp);
        let index = 0;
        const cursor = '<span class="cursor">_</span>';
        
        const render = (idx, showGlitch = false) => {
            let html = '';
            const currentMap = charMap.slice(0, idx);
            if (showGlitch && idx < charMap.length) {
                const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                currentMap.push({ char: glitchChar, tags: charMap[idx].tags });
            }

            let i = 0;
            while (i < currentMap.length) {
                const item = currentMap[i];
                let j = i + 1;
                while (j < currentMap.length && JSON.stringify(currentMap[j].tags) === JSON.stringify(item.tags)) {
                    j++;
                }

                let segmentText = currentMap.slice(i, j).map(item => item.char === '\n' ? '<br/>' : item.char).join('');
                let wrapped = segmentText;
                for (let k = item.tags.length - 1; k >= 0; k--) {
                    const tag = item.tags[k];
                    wrapped = `<${tag.tagName} ${tag.attributes}>${wrapped}</${tag.tagName}>`;
                }
                html += wrapped;
                i = j;
            }
            element.innerHTML = html + cursor;
        };

        element.innerHTML = cursor;
        
        const type = () => {
            if (index < charMap.length) {
                render(index, true);
                setTimeout(() => {
                    index++;
                    render(index, false);
                    setTimeout(type, Math.random() * 30 + 15);
                }, 25);
            } else {
                element.innerHTML = targetHTML + cursor;
            }
        };
        
        setTimeout(type, 0);
    };

    const initLanguage = () => {
        const savedLang = localStorage.getItem('preferred-lang');
        const browserLang = navigator.language.startsWith('de') ? 'de' : 'en';
        const initialLang = savedLang || browserLang;
        updateUI(initialLang, true);
    };

    langEnBtn.addEventListener('click', () => updateUI('en'));
    langDeBtn.addEventListener('click', () => updateUI('de'));

    loadTranslations();
});
