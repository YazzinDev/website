document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.glow-card');
    
    if (typeof gsap !== 'undefined') {
        gsap.set("#tech-stack .glow-card", { autoAlpha: 0, y: 50, "--border-opacity": 0 });
    }

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

    let gsapInitialized = false;
    const initGSAP = () => {
        if (gsapInitialized) return;
        gsapInitialized = true;
        
        gsap.registerPlugin(ScrollTrigger);

        const stackCards = document.querySelectorAll("#tech-stack .glow-card");
        const shineSweeps = document.querySelectorAll("#tech-stack .shine-sweep");
        
        if (stackCards.length > 0) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#tech-stack",
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true
                }
            });

            tl.to(stackCards, {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "transform"
            });

            tl.to(stackCards, {
                "--border-opacity": 1,
                duration: 1.2,
                stagger: 0.1,
                ease: "power2.inOut"
            }, 0.3);

            if (shineSweeps.length > 0) {
                tl.fromTo(shineSweeps, {
                    x: "-100%",
                    opacity: 0,
                    display: "block",
                    skewX: -15
                }, {
                    x: "100%",
                    opacity: 0.8,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power2.inOut"
                }, 0.5);

                tl.set(shineSweeps, { display: "none", opacity: 0 });
            }
        }

        document.querySelectorAll('section').forEach(section => {
            const elements = section.querySelectorAll('h2:not([data-i18n="hero_greeting"]), .font-label:not(a):not(button)');
            if (elements.length > 0) {
                gsap.from(elements, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        once: true
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    clearProps: "transform,opacity"
                });
            }
        });
        
        ScrollTrigger.refresh();
    };

    const loadTranslations = async () => {
        try {
            const response = await fetch('translations.json');
            translations = await response.json();
            initLanguage();
            requestAnimationFrame(() => {
                initGSAP();
            });
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    };

    const updateUI = (lang, shouldGlitch = false) => {
        const currentLangDisplay = document.getElementById('current-lang-text');
        
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
        if (currentLangDisplay) {
            currentLangDisplay.textContent = lang.toUpperCase();
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
        
        if (langMenu) {
            langMenu.classList.add('hidden');
        }
    };

    if (langCurrent && langMenu) {
        langCurrent.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
            langMenu.classList.add('hidden');
        });
    }

    const glitchText = (element, targetHTML) => {
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        const originalHTML = element.innerHTML;
        element.innerHTML = targetHTML;
        const targetHeight = element.offsetHeight;
        element.style.minHeight = `${targetHeight}px`;
        
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
                element.style.minHeight = '';
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
