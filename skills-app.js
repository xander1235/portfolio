// skills-app.js - Skills Page Dynamic Content

document.addEventListener('DOMContentLoaded', function() {
    initializeSkillsPage();
});

function initializeSkillsPage() {
    if (typeof portfolioData === 'undefined') {
        console.error('Portfolio data not found. Please ensure data.js is loaded.');
        return;
    }

    populateHeader();
    populateSkills();
    populateFooter();

    document.title = `Skills - ${portfolioData.personal.name}`;
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Populate Header with active Skills link
function populateHeader() {
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
        brandName.textContent = portfolioData.personal.name;
    }

    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        const skillsNav = [
            { href: 'index.html', text: 'Home' },
            { href: 'index.html#about', text: 'About' },
            { href: 'index.html#timeline', text: 'Experience' },
            { href: 'skills.html', text: 'Skills', active: true },
            { href: 'projects.html', text: 'Projects' }
        ];

        skillsNav.forEach(link => {
            const navLink = document.createElement('a');
            navLink.href = link.href;
            navLink.className = link.active ? 'nav-link active' : 'nav-link';
            navLink.textContent = link.text;
            navLinks.appendChild(navLink);
        });
    }
}

// Populate Skills Grid
function populateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    portfolioData.skills.forEach(category => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';
        skillCategory.setAttribute('data-aos', 'fade-up');

        const title = document.createElement('h3');
        title.textContent = category.category;
        skillCategory.appendChild(title);

        category.items.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill';
            skillDiv.setAttribute('data-level', skill.level);
            skillDiv.textContent = skill.name;
            skillCategory.appendChild(skillDiv);
        });

        skillsGrid.appendChild(skillCategory);
    });

    // Initialize progress bars and labels similar to the main script
    document.querySelectorAll('.skill').forEach(skill => {
        const skillText = skill.textContent;
        const skillLevel = skill.getAttribute('data-level');
        skill.innerHTML = `
            <div class="skill-name">
                <span>${skillText}</span>
                <span>${skillLevel}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-level" style="width: 0;"></div>
            </div>
        `;
    });
}

// Populate Footer (same as projects page)
function populateFooter() {
    const socialLinks = document.querySelector('footer .social-links');
    if (socialLinks) {
        portfolioData.social.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', social.label);

            const icon = document.createElement('i');
            icon.className = social.icon;
            link.appendChild(icon);

            socialLinks.appendChild(link);
        });
    }

    const footerName = document.getElementById('footer-name');
    if (footerName) {
        footerName.textContent = portfolioData.personal.name;
    }
}
