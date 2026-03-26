document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Canvas Animation (Simplex Noise Grid) ---
    class SimplexNoise {
        constructor() {
            this.p = new Uint8Array(256);
            this.perm = new Uint8Array(512);
            for (let i = 0; i < 256; i++) this.p[i] = i;
            for (let i = 255; i > 0; i--) {
                const r = Math.floor(Math.random() * (i + 1));
                [this.p[i], this.p[r]] = [this.p[r], this.p[i]];
            }
            for (let i = 0; i < 512; i++) this.perm[i] = this.p[i & 255];
        }

        noise2D(x, y) {
            const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
            const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
            let s = (x + y) * F2;
            let i = Math.floor(x + s), j = Math.floor(y + s);
            let t = (i + j) * G2;
            let x0 = x - (i - t), y0 = y - (j - t);
            let i1, j1;
            if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
            let x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
            let x2 = x0 - 1.0 + 2.0 * G2, y2 = y0 - 1.0 + 2.0 * G2;
            let ii = i & 255, jj = j & 255;
            let g0 = this.grad(this.perm[ii + this.perm[jj]], x0, y0);
            let g1 = this.grad(this.perm[ii + i1 + this.perm[jj + j1]], x1, y1);
            let g2 = this.grad(this.perm[ii + 1 + this.perm[jj + 1]], x2, y2);
            let n0 = Math.max(0, 0.5 - x0 * x0 - y0 * y0) ** 4 * g0;
            let n1 = Math.max(0, 0.5 - x1 * x1 - y1 * y1) ** 4 * g1;
            let n2 = Math.max(0, 0.5 - x2 * x2 - y2 * y2) ** 4 * g2;
            return 70.0 * (n0 + n1 + n2);
        }

        grad(hash, x, y) {
            const h = hash & 7;
            const u = h < 4 ? x : y;
            const v = h < 4 ? y : x;
            return ((h & 1) ? -u : u) + ((h & 2) ? -2.0 * v : 2.0 * v);
        }
    }

    const initHeroCanvas = () => {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        // --- Animation Configuration ---
        const config = {
            spacing: 32,          // Distance between dots
            dotRadius: 1,         // Size of each dot
            dotColor: '#5D3FD3',  // Color of the dots
            noiseScale: 0.05,     // Scale of noise waves (lower = larger waves)
            speed: 0.002,         // Scrolling speed
            minOpacity: 0.2,        // Minimum dot opacity
            maxOpacity: 0.8       // Maximum dot opacity
        };

        const ctx = canvas.getContext('2d');
        const noise = new SimplexNoise();
        let width, height, rows, cols;
        let time = 0;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            cols = Math.ceil(width / config.spacing) + 1;
            rows = Math.ceil(height / config.spacing) + 1;
        };

        const animate = () => {
            time += config.speed;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = config.dotColor;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    // Calculate noise for each dot (-1 to 1)
                    const n = noise.noise2D(i * config.noiseScale, (j * config.noiseScale) + time);

                    // Map noise (-1 to 1) to requested opacity range
                    const opacity = config.minOpacity + (n + 1) * 0.5 * (config.maxOpacity - config.minOpacity);

                    if (opacity > 0.01) {
                        ctx.globalAlpha = opacity;
                        ctx.beginPath();
                        ctx.arc(i * config.spacing, j * config.spacing, config.dotRadius, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();
    };

    initHeroCanvas();

    // --- Interactive Card Glow Effect ---
    const cards = document.querySelectorAll('.glow-card');

    // Initial state for GSAP-animated elements to prevent flash of unstyled content
    if (typeof gsap !== 'undefined') {
        // No initial set needed for .shine-sweep as it is display:none in CSS
    }

    // Update CSS variables on mouse move to power the radial glow effect
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Translation & Language State ---
    let translations = {};
    const langEnBtn = document.getElementById('lang-en');
    const langDeBtn = document.getElementById('lang-de');
    const currentLangText = document.getElementById('current-lang-text');
    const langDropdown = document.getElementById('lang-dropdown');
    const langMenu = document.getElementById('lang-menu');
    const langCurrent = document.getElementById('lang-current');

    // --- GSAP Scroll Animations ---
    let gsapInitialized = false;
    const initGSAP = () => {
        if (gsapInitialized) return;
        gsapInitialized = true;

        gsap.registerPlugin(ScrollTrigger);

        // Tech stack entry animation (cards sliding up and fading in)
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

            tl.from(stackCards, {
                y: 50,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "y,autoAlpha"
            });

            // One-time "shine" sweep across tech cards
            if (shineSweeps.length > 0) {
                shineSweeps.forEach((sweep, index) => {
                    const sweepStartTime = 0.5 + (index * 0.15); // Stagger start times

                    // Combine move and initial fade in a single fromTo
                    tl.fromTo(sweep, {
                        x: "-100%",
                        opacity: 0,
                        display: "block",
                        skewX: -15
                    }, {
                        x: "100%",
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.inOut",
                        // Per-target fade out via nested timeline logic for robustness
                        onStart: function() {
                            gsap.to(sweep, {
                                opacity: 0,
                                duration: 0.4,
                                delay: 0.8,
                                ease: "power2.out",
                                onComplete: () => gsap.set(sweep, { display: "none" })
                            });
                        }
                    }, sweepStartTime);
                });
            }
        }

        // Generic entrance animation for section headings and labels
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

    // --- Translation Loading ---
    const loadTranslations = async () => {
        try {
            const response = await fetch('translations.json');
            translations = await response.json();
            initLanguage();
            requestAnimationFrame(() => {
                initGSAP(); // Initialize animations after text is loaded
            });
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    };

    // Updates all DOM elements with [data-i18n] attributes
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

        // Handle placeholders for forms
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

        // Toggle active button styles
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

    // --- Language Selector Dropdown Logic ---
    if (langCurrent && langMenu) {
        langCurrent.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
            langMenu.classList.add('hidden');
        });
    }

    /**
     * Glitch Animation Effect
     * Progressively types out HTML content while injecting random glitch characters.
     * Preserves HTML structure (tags like <br/> or <span>) during the process.
     */
    const glitchText = (element, targetHTML) => {
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

        const originalHTML = element.innerHTML;
        element.innerHTML = targetHTML;
        const targetHeight = element.offsetHeight;
        element.style.minHeight = `${targetHeight}px`; // Prevent layout jump

        const temp = document.createElement('div');
        temp.innerHTML = targetHTML;

        // Maps every character to its position and associated parent HTML tags
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

        // Reconstructs the HTML up to the current index, adding glitch characters if requested
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

        // Recursive typing loop
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

    // --- Initialization ---
    const initLanguage = () => {
        const savedLang = localStorage.getItem('preferred-lang');
        const browserLang = navigator.language.startsWith('de') ? 'de' : 'en';
        const initialLang = savedLang || browserLang;
        updateUI(initialLang, true); // True triggers glitch effect on first load
    };

    langEnBtn.addEventListener('click', () => updateUI('en'));
    langDeBtn.addEventListener('click', () => updateUI('de'));

    loadTranslations();
});
