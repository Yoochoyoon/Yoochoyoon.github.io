// ============================================================
// MAIN APPLICATION SCRIPT
// ============================================================

// State
let portfolioData = {};

// Initialize app on DOM ready
document.addEventListener('DOMContentLoaded', async () => {
    // Load data
    await loadPortfolioData();

    // Render sections
    renderProjects();
    renderDesignPortfolios();
    renderSkills();

    // Initialize mobile menu
    initMobileMenu();

    // Animate skill bars on scroll
    observeSkillBars();

    // Smooth scroll for nav links
    initSmoothScroll();
});

// ============================================================
// DATA LOADING
// ============================================================

async function loadPortfolioData() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        portfolioData = await response.json();
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        portfolioData = { webProjects: [], designPortfolios: [], skills: {} };
    }
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================

const RIBBON_TINTS = ['sage', 'salmon', 'peach', 'lime', 'sky', 'steel', 'periwinkle', 'olive'];

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container || !portfolioData.webProjects) return;

    const projects = portfolioData.webProjects;
    const latestDate = projects.reduce((max, p) => (p.date > max ? p.date : max), projects[0]?.date || '');

    container.innerHTML = projects.map((project, index) => {
        const tint = RIBBON_TINTS[index % RIBBON_TINTS.length];
        const isNew = project.date === latestDate;
        return `
        <div class="project-card">
            <div class="ribbon-card-title">
                <span>${project.title}</span>
                ${isNew ? '<span class="new-burst-sticker">NEW!</span>' : ''}
            </div>
            <div class="ribbon-card-body tint-${tint}">
                <p class="project-date">${project.date}</p>
                <p class="project-role">${project.role}</p>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.links.github ? `<a href="${project.links.github}" target="_blank" class="project-link">GitHub</a>` : ''}
                    ${project.links.demo ? `<a href="${project.links.demo}" target="_blank" class="project-link">Demo</a>` : ''}
                </div>
            </div>
        </div>
    `;
    }).join('');
}

function renderDesignPortfolios() {
    const container = document.getElementById('design-container');
    if (!container || !portfolioData.designPortfolios) return;

    const designTints = ['periwinkle', 'sky'];

    container.innerHTML = portfolioData.designPortfolios.map((portfolio, index) => `
        <div class="design-card">
            <div class="design-card-image ${portfolio.hasImage ? '' : 'tint-' + designTints[index % designTints.length]}">
                ${portfolio.hasImage
                    ? `<img src="${portfolio.image}" alt="${portfolio.title}">`
                    : '<i class="fas fa-palette"></i>'}
            </div>
            <div class="design-card-content">
                <h3 class="design-card-title">${portfolio.title}</h3>
                <p class="design-card-desc">${portfolio.description}</p>
                <a href="${portfolio.url}" target="_blank" class="design-card-link">
                    ${portfolio.linkLabel || 'View on Behance'} &rarr;
                </a>
            </div>
        </div>
    `).join('');
}

function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container || !portfolioData.skills) return;

    const skills = portfolioData.skills;
    const categories = [
        { key: 'languages', title: 'Languages' },
        { key: 'design', title: 'Design' },
        { key: 'tools', title: 'Tools' }
    ];

    container.innerHTML = categories.map(cat => {
        const skillList = skills[cat.key] || [];
        return `
            <div class="skill-category">
                <h3 class="skill-category-title">${cat.title}</h3>
                <div class="skill-category-body">
                    ${skillList.map(skill => `
                        <div class="skill-item">
                            <div class="skill-name">
                                <span>${skill.name}</span>
                                <span class="skill-level">${skill.level}%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-fill" data-level="${skill.level}"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================
// MOBILE MENU
// ============================================================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================================
// SKILL BAR ANIMATION
// ============================================================

function observeSkillBars() {
    if (!('IntersectionObserver' in window)) {
        animateAllSkillBars();
        return;
    }

    const skillBars = document.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.width = level + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

function animateAllSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
        const level = bar.dataset.level;
        bar.style.width = level + '%';
    });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================================
// CTA BUTTONS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const viewWorkBtn = document.querySelector('.button-primary');
    const contactBtn = document.querySelector('.button-secondary');

    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', () => {
            document.getElementById('web-dev').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
