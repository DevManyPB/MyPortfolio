const translations = {
    es: {
        nav_about: "Sobre Mí", nav_ui: "UI Design", nav_projects: "Proyectos", nav_systems: "Sistemas",
        hero_btn: "Ver mi trabajo",
        about_title: "Sobre Mí",
        about_p1: "Soy un desarrollador y diseñador de interfaces especializado en el ecosistema de <strong>Roblox Studio</strong>. Mi enfoque combina la lógica robusta de sistemas complejos con estéticas visuales de alto impacto.",
        about_p2: "A lo largo de mi carrera, he creado soluciones que no solo funcionan impecablemente a nivel de rendimiento, sino que también ofrecen una experiencia de usuario inmersiva, limpia y futurista.",
        about_years: "Años de Experiencia",
        ui_title: "UI Design",
        projects_title: "Proyectos Destacados",
        btn_play: "Jugar",
        systems_title: "Sistemas Core",
        awards_title: "Logros",
        contact_title: "Contacto",
        form_btn: "Enviar Mensaje",
        typewriter: "Roblox Developer & UI Designer",
        desc_disaster: "Juego de supervivencia y desastres naturales. Enfréntate a las fuerzas de la naturaleza con sistemas avanzados y eventos dinámicos.",
        desc_detective: "Juego de misterio en un mundo digital futurista. Resuelve casos imposibles como agente de ciberseguridad atrapado en una simulación infectada por un virus.",
        desc_evolve: "Simulador de evolución: come orbes, crece, derrota jugadores y usa pociones. Sistema de progresión con guardado automático.",
        desc_blox: "Experiencia de terror inspirada en FNAF. Programación de sistemas, animatrónicos y mecánicas de supervivencia inmersivas.",
        desc_eco: "Juego de construcción en isla con recolección de recursos, sistema de progresión y desbloqueo de estructuras. Evento oficial de Roblox.",
        desc_obby: "Obby de 102 etapas con sistema de trails, rebirth y multiplicadores de monedas. Desafía tus habilidades de parkour.",
        desc_xmas: "Obby navideño con historia: un elfo ha secuestrado a Santa. Derrota al villano y restaura la Navidad en el Polo Norte.",
        sys_1: "Sistema Slide",
        sys_2: "Sistema de combate",
        sys_3: "Sistema de primera persona",
        sys_4: "Sistema de cartas",
        sys_5: "Spawm + recolección",
        sys_6: "Bola de fuego",
        awd_medal: "Medalla al logro — reconocimiento oficial por contribuciones destacadas en la plataforma Roblox.",
        awd_keychain: "Llavero del rendimiento — premio por excelencia técnica y optimización en desarrollo de experiencias.",
        awd_crown: "Corona del conocimiento — distinción por dominio técnico y expertise en el ecosistema de desarrollo Roblox.",
        awd_btn: "Ver en Roblox <i class=\"fa-solid fa-arrow-up-right-from-square\"></i>",
        form_success: "Mensaje enviado con éxito. Gracias por contactarme.",
        form_error: "Error al enviar el mensaje. Intenta de nuevo."
    },
    en: {
        nav_about: "About Me", nav_ui: "UI Design", nav_projects: "Projects", nav_systems: "Systems",
        hero_btn: "See my work",
        about_title: "About Me",
        about_p1: "I am a developer and interface designer specializing in the <strong>Roblox Studio</strong> ecosystem. My approach combines the robust logic of complex systems with high-impact visual aesthetics.",
        about_p2: "Throughout my career, I have created solutions that not only perform flawlessly but also offer an immersive, clean, and futuristic user experience.",
        about_years: "Years of Experience",
        ui_title: "UI Design",
        projects_title: "Featured Projects",
        btn_play: "Play",
        systems_title: "Core Systems",
        awards_title: "Achievements",
        contact_title: "Contact",
        form_btn: "Send Message",
        typewriter: "Roblox Developer & UI Designer",
        desc_disaster: "Natural disaster survival game. Face the forces of nature with advanced systems and dynamic events.",
        desc_detective: "Mystery game in a futuristic digital world. Solve impossible cases as a cybersecurity agent trapped in a virus-infected simulation.",
        desc_evolve: "Evolution simulator: eat orbs, grow, defeat players and use potions. Progression system with auto-save.",
        desc_blox: "Horror experience inspired by FNAF. Programming of systems, animatronics, and immersive survival mechanics.",
        desc_eco: "Island building game with resource gathering, progression system, and structure unlocking. Official Roblox event.",
        desc_obby: "102-stage obby with trails system, rebirth, and coin multipliers. Challenge your parkour skills.",
        desc_xmas: "Christmas obby with a story: an elf kidnapped Santa. Defeat the villain and restore Christmas in the North Pole.",
        sys_1: "Slide System",
        sys_2: "Combat System",
        sys_3: "First Person System",
        sys_4: "Card System",
        sys_5: "Spawning + Collection",
        sys_6: "Fireball",
        awd_medal: "Achievement Medal — official recognition for outstanding contributions on the Roblox platform.",
        awd_keychain: "Performance Keychain — award for technical excellence and optimization in experience development.",
        awd_crown: "Crown of Knowledge — distinction for technical mastery and expertise in the Roblox development ecosystem.",
        awd_btn: "View on Roblox <i class=\"fa-solid fa-arrow-up-right-from-square\"></i>",
        form_success: "Message sent successfully. Thank you for reaching out.",
        form_error: "Error sending message. Please try again."
    }
};

const placeholders = {
    es: { form_name: "Tu Nombre", form_email: "Tu Email", form_msg: "Tu Mensaje" },
    en: { form_name: "Your Name", form_email: "Your Email", form_msg: "Your Message" }
};

let currentLang = 'es';
const langBtn = document.getElementById('langToggle');

updateLanguage();

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    langBtn.textContent = currentLang === 'es' ? 'EN' : 'ES';
    updateLanguage();
});

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if(placeholders[currentLang][key]) {
            el.setAttribute('placeholder', placeholders[currentLang][key]);
        }
    });
    if (typeof startTypewriter === 'function') {
        startTypewriter(translations[currentLang].typewriter);
    }
}
