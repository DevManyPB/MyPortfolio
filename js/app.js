document.getElementById('year').textContent = new Date().getFullYear();
window.history.scrollRestoration = 'manual';

const typeTarget = document.getElementById('typewriter');
let typeTimeout;
function startTypewriter(text) {
    clearTimeout(typeTimeout);
    typeTarget.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            typeTarget.textContent += text.charAt(i);
            i++;
            typeTimeout = setTimeout(type, Math.floor(Math.random() * 70 + 30));
        }
    }
    setTimeout(type, 800);
}
startTypewriter(translations[currentLang].typewriter);

const lenis = new Lenis({
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 0.8,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

window.addEventListener('load', () => {
    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0, 0);

    gsap.utils.toArray('.gsap-reveal').forEach(el => {
        gsap.set(el, { autoAlpha: 1, opacity: 0, y: 50 });
    });

    const tl = gsap.timeline();
    tl.fromTo(".gsap-hero",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=1"
    );

    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { x: -80, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 1.2, ease: "power4.out",
                scrollTrigger: { trigger: title, start: "top 90%", toggleActions: "play none none none" }
            });
    });

    gsap.utils.toArray('.about-text, .contact-info, .contact-form, .about-stats').forEach(elem => {
        if (!elem.classList.contains('gsap-reveal')) return;
        gsap.fromTo(elem,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: elem, start: "top 90%", toggleActions: "play none none none" }
            });
    });

    const grids = ['.ui-grid', '.projects-grid', '.videos-grid', '.awards-grid'];
    grids.forEach(gridSelector => {
        const grid = document.querySelector(gridSelector);
        if (!grid) return;

        const cards = grid.querySelectorAll('.gsap-reveal');

        if (gridSelector === '.projects-grid') {
            gsap.set(cards, { y: 100, opacity: 0, rotationX: 15, transformPerspective: 1000 });
        } else if (gridSelector === '.awards-grid') {
            gsap.set(cards, { x: -60, y: 0, opacity: 0 });
        } else {
            gsap.set(cards, { y: 60, opacity: 0, scale: 0.85 });
        }

        ScrollTrigger.create({
            trigger: grid,
            start: "top 85%",
            onEnter: () => {
                gsap.to(cards, {
                    y: 0, x: 0, opacity: 1, scale: 1, rotationX: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "back.out(1.4)",
                    overwrite: true
                });
            }
        });
    });

    gsap.utils.toArray('.title-anim').forEach(elem => {
        ScrollTrigger.create({
            trigger: elem, start: "top 85%",
            onEnter: () => elem.classList.add('animated')
        });
    });

    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    gsap.to(heroContent, {
        y: 200, opacity: 0, scale: 0.95,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "80% top", scrub: true }
    });
    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            opacity: 0, ease: "none",
            scrollTrigger: { trigger: "#hero", start: "10% top", end: "25% top", scrub: true }
        });
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroSocials = document.querySelector('.hero-socials');
    const btnPrimary = document.querySelector('.btn-primary');
    document.addEventListener('mousemove', (e) => {
        if (window.scrollY > window.innerHeight) return;
        const x = (e.clientX / window.innerWidth - 0.5);
        const y = (e.clientY / window.innerHeight - 0.5);
        if (heroSubtitle) gsap.to(heroSubtitle, { x: x * 40, y: y * 25, duration: 1, ease: "power2.out" });
        if (heroSocials) gsap.to(heroSocials, { x: x * -30, y: y * -18, duration: 1.3, ease: "power2.out" });
        if (btnPrimary) gsap.to(btnPrimary, { x: x * 20, y: y * 20, duration: 1.5, ease: "power2.out" });
    }, { passive: true });

    gsap.utils.toArray('.ui-card img, .project-img').forEach(img => {
        gsap.set(img, { scale: 1.15, transformOrigin: "center center" });
        const parent = img.closest('.ui-card, .project-card') || img.parentElement;
        gsap.fromTo(img,
            { yPercent: -8 },
            {
                yPercent: 8, ease: "none",
                scrollTrigger: { trigger: parent, start: "top bottom", end: "bottom top", scrub: true }
            }
        );
    });

    gsap.utils.toArray('.about-stats').forEach(el => {
        gsap.to(el, {
            y: -40, ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true }
        });
    });
});

const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('sticky', window.scrollY > 80);
    let current = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 250) current = s.id; });
    navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});
navLinks.forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksContainer.classList.remove('active');
}));

const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorCircle.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 250, fill: "forwards" });
});
document.querySelectorAll('a, button, .hover-target, input, textarea').forEach(t => {
    t.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    t.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

const counter = document.getElementById('years-counter');
let counted = false;
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            counted = true;
            let c = 0; const target = 8;
            const step = Math.floor(2000 / target);
            const timer = setInterval(() => {
                c++;
                counter.textContent = c;
                if (c === target) {
                    clearInterval(timer);
                    setTimeout(() => {
                        counter.textContent = c + '+';
                        gsap.from(counter, { scale: 1.2, duration: 0.3, ease: "back.out(1.7)" });
                    }, 200);
                }
            }, step);
        }
    });
}, { threshold: 0.5 });
obs.observe(counter);

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');
const uiImages = Array.from(document.querySelectorAll('.ui-card img'));
let currentImgIndex = 0;

document.querySelectorAll('.ui-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        currentImgIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    const src = uiImages[currentImgIndex].src;
    lightboxImg.src = src;
    lightboxImg.alt = uiImages[currentImgIndex].alt;
    lightboxCounter.textContent = `${currentImgIndex + 1} / ${uiImages.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    gsap.fromTo(lightboxImg, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" });
}

function closeLightbox() {
    gsap.to(lightboxImg, {
        scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
        onComplete: () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function nextImage() {
    currentImgIndex = (currentImgIndex + 1) % uiImages.length;
    gsap.to(lightboxImg, {
        x: -60, opacity: 0, duration: 0.2, ease: "power2.in",
        onComplete: () => {
            lightboxImg.src = uiImages[currentImgIndex].src;
            lightboxCounter.textContent = `${currentImgIndex + 1} / ${uiImages.length}`;
            gsap.fromTo(lightboxImg, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
        }
    });
}

function prevImage() {
    currentImgIndex = (currentImgIndex - 1 + uiImages.length) % uiImages.length;
    gsap.to(lightboxImg, {
        x: 60, opacity: 0, duration: 0.2, ease: "power2.in",
        onComplete: () => {
            lightboxImg.src = uiImages[currentImgIndex].src;
            lightboxCounter.textContent = `${currentImgIndex + 1} / ${uiImages.length}`;
            gsap.fromTo(lightboxImg, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
        }
    });
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-next').addEventListener('click', nextImage);
document.getElementById('lightbox-prev').addEventListener('click', prevImage);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// === VIDEO MODAL (iframe) ===
const videoModal = document.getElementById('video-modal');
const videoModalIframe = document.getElementById('video-modal-iframe');
const loader = document.getElementById('modal-loader');

document.querySelectorAll('.video-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        const videoId = wrapper.getAttribute('data-video-id');
        if (videoId) {
            const src = `https://drive.google.com/file/d/${videoId}/preview`;
            videoModalIframe.src = src;
            loader.classList.remove('hidden');
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            gsap.fromTo('.video-modal-content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" });
        }
    });
});

videoModalIframe.addEventListener('load', () => {
    loader.classList.add('hidden');
});

function closeVideoModal() {
    gsap.to('.video-modal-content', {
        scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
        onComplete: () => {
            videoModal.classList.remove('active');
            videoModalIframe.src = '';
            document.body.style.overflow = '';
        }
    });
}

document.getElementById('video-modal-close').addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeVideoModal(); });
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) closeVideoModal();
});

const projectModal = document.getElementById('project-modal');
const pmImg = document.getElementById('pm-img');
const pmTitle = document.getElementById('pm-title');
const pmDesc = document.getElementById('pm-desc');
const pmLink = document.getElementById('pm-link');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();

        const img = card.querySelector('.project-img').src;
        const title = card.querySelector('.project-title').textContent;
        const descElem = card.querySelector('.project-desc');
        const desc = descElem.textContent;
        const link = card.querySelector('.btn-small').href;

        if (descElem.hasAttribute('data-i18n')) {
            pmDesc.setAttribute('data-i18n', descElem.getAttribute('data-i18n'));
        } else {
            pmDesc.removeAttribute('data-i18n');
        }

        pmImg.src = img;
        pmTitle.textContent = title;
        pmDesc.textContent = desc;
        pmLink.href = link;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('project-modal-close').addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => { if (e.target === projectModal) closeProjectModal(); });
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) closeProjectModal();
});

// === LUA CODE TYPEWRITER ===
const luaCodes = [
    [
        '<span class="kw">local</span> <span class="bu">Players</span> = game:<span class="fn">GetService</span>(<span class="str">"Players"</span>)',
        '<span class="kw">local</span> player = <span class="bu">Players</span>.LocalPlayer',
        '<span class="bu">print</span>(<span class="str">"Welcome, "</span> .. player.Name)'
    ],
    [
        '<span class="kw">function</span> <span class="fn">onTouched</span>(hit)',
        '    <span class="kw">local</span> humanoid = hit.Parent:<span class="fn">FindFirstChild</span>(<span class="str">"Humanoid"</span>)',
        '    <span class="kw">if</span> humanoid <span class="kw">then</span>',
        '        humanoid.Health = <span class="num">0</span>',
        '    <span class="kw">end</span>',
        '<span class="kw">end</span>',
        'script.Parent.Touched:<span class="fn">Connect</span>(onTouched)'
    ],
    [
        '<span class="kw">local</span> part = <span class="bu">Instance</span>.<span class="fn">new</span>(<span class="str">"Part"</span>)',
        'part.Size = <span class="bu">Vector3</span>.<span class="fn">new</span>(<span class="num">4</span>, <span class="num">1</span>, <span class="num">2</span>)',
        'part.BrickColor = <span class="bu">BrickColor</span>.<span class="fn">new</span>(<span class="str">"Really blue"</span>)',
        'part.Position = <span class="bu">Vector3</span>.<span class="fn">new</span>(<span class="num">0</span>, <span class="num">5</span>, <span class="num">0</span>)',
        'part.Parent = workspace'
    ],
    [
        '<span class="kw">for</span> i = <span class="num">1</span>, <span class="num">10</span> <span class="kw">do</span>',
        '    <span class="kw">local</span> clone = part:<span class="fn">Clone</span>()',
        '    clone.Position = <span class="bu">Vector3</span>.<span class="fn">new</span>(i * <span class="num">3</span>, <span class="num">5</span>, <span class="num">0</span>)',
        '    clone.Parent = workspace',
        '    <span class="bu">wait</span>(<span class="num">0.5</span>)',
        '<span class="kw">end</span>'
    ]
];

function typeCode(blockId, contentId, cursorId, lines, lineIndex, charIndex, delay) {
    const codeEl = document.getElementById(contentId);
    const cursorEl = document.getElementById(cursorId);
    if (!codeEl) return;

    if (lineIndex >= lines.length) {
        setTimeout(() => {
            codeEl.innerHTML = '';
            if (cursorEl) cursorEl.style.display = '';
            typeCode(blockId, contentId, cursorId, lines, 0, 0, delay);
        }, 3000);
        return;
    }

    const line = lines[lineIndex];
    if (charIndex === 0) {
        const prevLines = lines.slice(0, lineIndex).join('<br>');
        codeEl.innerHTML = prevLines + (prevLines ? '<br>' : '');
    }

    const prefix = lines.slice(0, lineIndex).join('<br>') + (lineIndex > 0 ? '<br>' : '');
    codeEl.innerHTML = prefix + line.substring(0, charIndex + 1);

    const nextDelay = lineIndex === 0 && charIndex === 0 ? delay * 3 : delay;

    if (charIndex + 1 < line.length) {
        setTimeout(() => typeCode(blockId, contentId, cursorId, lines, lineIndex, charIndex + 1, delay), 30 + Math.random() * 40);
    } else {
        setTimeout(() => typeCode(blockId, contentId, cursorId, lines, lineIndex + 1, 0, delay), 400);
    }
}

// Start typing each block with staggered delays
setTimeout(() => typeCode('code-block-1', 'code-content-1', 'code-cursor-1', luaCodes[0], 0, 0, 50), 1200);
setTimeout(() => typeCode('code-block-2', 'code-content-2', 'code-cursor-2', luaCodes[1], 0, 0, 45), 3000);
setTimeout(() => typeCode('code-block-3', 'code-content-3', 'code-cursor-3', luaCodes[2], 0, 0, 40), 5000);
setTimeout(() => typeCode('code-block-4', 'code-content-4', 'code-cursor-4', luaCodes[3], 0, 0, 55), 7000);

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    formStatus.className = 'form-status visible success';
    formStatus.innerHTML = translations[currentLang].form_success;
    contactForm.reset();

    setTimeout(() => {
        formStatus.classList.remove('visible');
    }, 6000);
});
