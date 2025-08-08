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

// Enhanced project data with categories
function getEnhancedProjects() {
    // Normalize projects: attach id, image, and ensure a type (github/company/freelance)
    const enhancedProjects = portfolioData.projects.map((project, index) => {
        const type = project.type || 'github';
        return {
            ...project,
            id: `project-${index}`,
            type,
            image: `project-${index + 1}.jpg` // Placeholder image
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
        projectItem.setAttribute('data-aos', 'fade-up');
        projectItem.setAttribute('data-aos-delay', index * 100);
        
        // Create tech tags HTML
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        // Create project links based on project type
        const overlayLinks = [];
        const isValid = (url) => !!url && url !== '#';
        if (project.type === 'github') {
            if (isValid(project.github)) {
                overlayLinks.push(`
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="overlay-link" title="View Code">
                        <i class="fab fa-github"></i>
                    </a>
                `);
            }
            if (isValid(project.demo)) {
                overlayLinks.push(`
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="overlay-link" title="Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                `);
            }
        } else if (project.type === 'company' || project.type === 'freelance') {
            if (isValid(project.reference)) {
                overlayLinks.push(`
                    <a href="${project.reference}" target="_blank" rel="noopener noreferrer" class="overlay-link" title="Reference / Case Study">
                        <i class="fas fa-link"></i>
                    </a>
                `);
            }
        }

        const overlayHTML = overlayLinks.length
            ? `<div class="project-overlay">${overlayLinks.join('')}</div>`
            : '';

        // Project type badge
        const typeLabel = project.type === 'company' ? 'Company Project'
                        : project.type === 'freelance' ? 'Freelance Project'
                        : 'GitHub Project';
        const typeClass = project.type === 'company' ? 'is-company'
                        : project.type === 'freelance' ? 'is-freelance'
                        : 'is-github';
        const typeBadge = `<span class="project-type ${typeClass}">${typeLabel}</span>`;
        
        projectItem.innerHTML = `
            <div class="project-image">
                ${overlayHTML}
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                ${typeBadge}
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
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                const type = item.getAttribute('data-type');
                
                if (filter === 'all' || type === filter) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
            
            // Re-trigger AOS animations for visible items
            setTimeout(() => {
                AOS.refresh();
            }, 300);
        });
    });
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