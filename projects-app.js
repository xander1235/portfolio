// projects-app.js - Projects Page Dynamic Content

document.addEventListener('DOMContentLoaded', function() {
    initializeProjectsPage();
});

function initializeProjectsPage() {
    // Check if portfolioData is available
    if (typeof portfolioData === 'undefined') {
        console.error('Portfolio data not found. Please ensure data.js is loaded.');
        return;
    }

    // Populate header and footer
    populateHeader();
    populateFooter();
    
    // Populate projects with enhanced data
    populateProjectsShowcase();
    
    // Initialize filter functionality
    initializeFilters();
    
    // Update page title
    document.title = `Projects - ${portfolioData.personal.name}`;
    
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Populate Header (similar to main page but with active state on Projects)
function populateHeader() {
    // Set brand name
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
        brandName.textContent = portfolioData.personal.name;
    }

    // Populate navigation links
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.innerHTML = ''; // Clear existing links to prevent duplication
        // Modified navigation for projects page
        const projectsNav = [
            { href: "index.html#about", text: "About" },
            { href: "index.html#timeline", text: "Experience" },
            { href: "skills.html", text: "Skills" },
            { href: "projects.html", text: "Projects", active: true },
            { href: "blogs.html", text: "Blogs" },
            { href: "contact.html", text: "Contact" }
        ];
        
        projectsNav.forEach(link => {
            const navLink = document.createElement('a');
            navLink.href = link.href;
            navLink.className = link.active ? 'nav-link active' : 'nav-link';
            navLink.textContent = link.text;
            navLinks.appendChild(navLink);
        });
    }
}

// (Removed) Company meta aggregation previously used for achievements on project cards

// Enhanced project data with categories
function getEnhancedProjects() {
    const enhancedProjects = portfolioData.projects.map((project, index) => {
        const type = project.type || 'github';
        return {
            ...project,
            id: `project-${index}`,
            type
        };
    });

    return enhancedProjects;
}

// Populate Projects Showcase
function populateProjectsShowcase() {
    const showcase = document.querySelector('.projects-showcase');
    if (!showcase) return;
    
    const enhancedProjects = getEnhancedProjects();
    
    enhancedProjects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item show';
        projectItem.setAttribute('data-type', project.type);
        projectItem.setAttribute('data-company', (project.company || '').toLowerCase());
        projectItem.setAttribute('data-aos', 'fade-up');
        projectItem.setAttribute('data-aos-delay', index * 100);
        
        // Create tech tags HTML
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        // Company badge (reuse project-type styles)
        const companyLabel = project.company || 'Company';
        const companyBadge = `<span class="project-type is-company">${companyLabel}</span>`;
        projectItem.innerHTML = `
            <div class="project-content">
                <h3>${project.title}</h3>
                ${companyBadge}
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
            </div>
        `;
        
        showcase.appendChild(projectItem);
    });
}

// Initialize Filter Functionality
function initializeFilters() {
    const filtersContainer = document.querySelector('.project-filters');
    if (!filtersContainer) return;

    // Build dynamic filters from unique companies
    const projects = getEnhancedProjects();
    const companies = Array.from(new Set(
        projects
            .map(p => (p.company || '').trim())
            .filter(Boolean)
    ));

    // Clear existing static buttons
    filtersContainer.innerHTML = '';

    // Helper to create a button
    const createBtn = (label, value, isActive = false) => {
        const btn = document.createElement('button');
        btn.className = `filter-btn${isActive ? ' active' : ''}`;
        btn.setAttribute('data-filter', value);
        btn.textContent = label;
        return btn;
    };

    // Add "All" button
    filtersContainer.appendChild(createBtn('All', 'all', true));

    // Add a button per company
    companies.forEach(company => {
        const slug = company.toLowerCase();
        filtersContainer.appendChild(createBtn(company, slug));
    });

    // Attach filtering behavior
    const attachHandlers = () => {
        const buttons = filtersContainer.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active state
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                const items = document.querySelectorAll('.project-item');

                items.forEach(item => {
                    const company = item.getAttribute('data-company');
                    if (filter === 'all' || company === filter) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                });

                setTimeout(() => {
                    if (typeof AOS !== 'undefined') AOS.refresh();
                }, 300);
            });
        });
    };

    attachHandlers();
}

// Populate Footer
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
    
    // Set footer name
    const footerName = document.getElementById('footer-name');
    if (footerName) {
        footerName.textContent = portfolioData.personal.name;
    }
}