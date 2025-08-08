// skills-app.js - Skills Page Dynamic Content

document.addEventListener('DOMContentLoaded', function() {
    initializeSkillsPage();
});

// Local state for filters/search/sort
let skillsState = {
    selectedCategory: 'all',
    search: '',
    sort: 'level' // level | az | za
};

function initializeSkillsPage() {
    if (typeof portfolioData === 'undefined') {
        console.error('Portfolio data not found. Please ensure data.js is loaded.');
        return;
    }

    populateHeader();
    // Clear grid and build controls before rendering
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) skillsGrid.innerHTML = '';
    buildSkillsControls();
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
        navLinks.innerHTML = ''; // Clear existing links to prevent duplication
        const skillsNav = [
            { href: 'index.html#about', text: 'About' },
            { href: 'index.html#timeline', text: 'Experience' },
            { href: 'skills.html', text: 'Skills', active: true },
            { href: 'projects.html', text: 'Projects' },
            { href: 'blogs.html', text: 'Blogs' },
            { href: 'contact.html', text: 'Contact' }
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

// Build controls (search, filter chips, sort)
function buildSkillsControls() {
    const grid = document.querySelector('.skills-grid');
    if (!grid) return;

    const controls = document.createElement('div');
    controls.className = 'skills-controls';
    controls.setAttribute('data-aos', 'fade-up');

    controls.innerHTML = `
        <div class="skills-search">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input type="text" id="skillsSearch" placeholder="Search skills e.g. Kafka, GoLang" aria-label="Search skills" />
        </div>
        <div class="skills-filters"></div>
        <div class="skills-sort">
            <label for="skillsSort">Sort</label>
            <select id="skillsSort" aria-label="Sort skills">
                <option value="level">Proficiency (High-Low)</option>
                <option value="az">Alphabetical (A-Z)</option>
                <option value="za">Alphabetical (Z-A)</option>
            </select>
        </div>
    `;

    // Insert controls before grid
    grid.parentNode.insertBefore(controls, grid);

    // Render filter chips
    const filtersWrap = controls.querySelector('.skills-filters');
    const categories = portfolioData.skills.map(c => c.category);

    const makeChip = (label, value, active = false) => {
        const chip = document.createElement('button');
        chip.className = `filter-chip${active ? ' active' : ''}`;
        chip.dataset.category = value;
        chip.type = 'button';
        chip.textContent = label;
        chip.addEventListener('click', () => {
            controls.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            skillsState.selectedCategory = value;
            populateSkills();
        });
        return chip;
    };

    filtersWrap.appendChild(makeChip('All', 'all', true));
    categories.forEach(cat => filtersWrap.appendChild(makeChip(cat, cat)));

    // Search
    const searchInput = controls.querySelector('#skillsSearch');
    searchInput.addEventListener('input', (e) => {
        skillsState.search = e.target.value.trim().toLowerCase();
        populateSkills();
    });

    // Sort
    const sortSelect = controls.querySelector('#skillsSort');
    sortSelect.addEventListener('change', (e) => {
        skillsState.sort = e.target.value;
        populateSkills();
    });
}

// Populate Skills Grid
function populateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    // Clear before re-render (avoid duplicates from app.js)
    skillsGrid.innerHTML = '';

    // Track total rendered skills for subtitle update
    let totalRendered = 0;

    portfolioData.skills.forEach(category => {
        // Category filter
        if (skillsState.selectedCategory !== 'all' && category.category !== skillsState.selectedCategory) {
            return;
        }

        // Filter & sort items
        let items = category.items.filter(s =>
            s.name.toLowerCase().includes(skillsState.search)
        );

        if (items.length === 0) return;

        items = items.slice();
        if (skillsState.sort === 'level') {
            items.sort((a, b) => b.level - a.level);
        } else if (skillsState.sort === 'az') {
            items.sort((a, b) => a.name.localeCompare(b.name));
        } else if (skillsState.sort === 'za') {
            items.sort((a, b) => b.name.localeCompare(a.name));
        }

        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category';
        skillCategory.setAttribute('data-aos', 'fade-up');

        const title = document.createElement('h3');
        title.textContent = category.category;
        title.title = 'Click to collapse/expand';
        title.addEventListener('click', () => {
            skillCategory.classList.toggle('collapsed');
        });
        skillCategory.appendChild(title);

        items.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = 'skill';
            skillDiv.setAttribute('data-level', skill.level);
            // Build inner structure with bar
            skillDiv.innerHTML = `
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-level" style="width: 0;"></div>
                </div>
            `;
            skillCategory.appendChild(skillDiv);
            totalRendered += 1;
        });

        skillsGrid.appendChild(skillCategory);
    });

    // Animate bars on (re)render
    animateSkillBars();

    // Update subtitle with count
    const subtitle = document.querySelector('.projects-subtitle');
    if (subtitle) {
        subtitle.textContent = `Technologies & Expertise — ${totalRendered} skill${totalRendered === 1 ? '' : 's'}`;
    }

    // Refresh AOS if available
    if (window.AOS && typeof window.AOS.refresh === 'function') {
        setTimeout(() => AOS.refresh(), 150);
    }
}

function animateSkillBars() {
    document.querySelectorAll('.skill').forEach(skill => {
        const level = skill.getAttribute('data-level');
        const bar = skill.querySelector('.skill-level');
        if (bar) {
            bar.style.width = '0';
            // Allow layout to flush before animating
            requestAnimationFrame(() => {
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, 50);
            });
        }
    });
}

// Populate Footer (same as projects page)
function populateFooter() {
    const socialLinks = document.querySelector('footer .social-links');
    if (socialLinks) {
        socialLinks.innerHTML = '';
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
