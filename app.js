// app.js - Dynamic Content Population

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio with data
    initializePortfolio();
});

function initializePortfolio() {
    // Check if portfolioData is available
    if (typeof portfolioData === 'undefined') {
        console.error('Portfolio data not found. Please ensure data.js is loaded.');
        return;
    }

    // Populate all sections
    populateHeader();
    populateHero();
    populateAbout();
    populateTimeline();
    populateAchievements();
    populateSkills();
    populateFooter();
    
    // Update page title
    document.title = `${portfolioData.personal.name} | ${portfolioData.personal.title}`;
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Populate Header/Navigation
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
        portfolioData.navigation.forEach(link => {
            const navLink = document.createElement('a');
            navLink.href = link.href;
            navLink.className = 'nav-link';
            navLink.textContent = link.text;
            navLinks.appendChild(navLink);
        });
    }
}

// Populate Hero Section
function populateHero() {
    // Set profile image with fallback
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        if (portfolioData.personal.profileImage) {
            profileImage.src = portfolioData.personal.profileImage;
            profileImage.alt = portfolioData.personal.name;
            
            // Add error handler for missing image
            profileImage.onerror = function() {
                console.warn('Profile image not found, using fallback');
                // Use a placeholder image or initials
                this.onerror = null; // Prevent infinite loop
                this.style.display = 'none';
                
                // Create initials fallback
                const profilePic = this.parentElement;
                const initialsDiv = document.createElement('div');
                initialsDiv.className = 'profile-initials';
                initialsDiv.textContent = getInitials(portfolioData.personal.name);
                initialsDiv.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #6e45e2, #88d3ce);
                    color: white;
                    font-size: 3rem;
                    font-weight: 600;
                    border-radius: 50%;
                `;
                profilePic.appendChild(initialsDiv);
            };
        } else {
            // No image specified, use initials
            profileImage.style.display = 'none';
            const profilePic = profileImage.parentElement;
            const initialsDiv = document.createElement('div');
            initialsDiv.className = 'profile-initials';
            initialsDiv.textContent = getInitials(portfolioData.personal.name);
            initialsDiv.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #6e45e2, #88d3ce);
                color: white;
                font-size: 3rem;
                font-weight: 600;
                border-radius: 50%;
            `;
            profilePic.appendChild(initialsDiv);
        }
    }

    // Helper function to get initials
    function getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    // Populate social links in the social circle
    const socialCircle = document.querySelector('.social-circle');
    if (socialCircle) {
        portfolioData.social.forEach((social, index) => {
            const socialLink = document.createElement('a');
            socialLink.href = social.url;
            socialLink.className = 'social-icon';
            socialLink.target = '_blank';
            socialLink.rel = 'noopener noreferrer';
            socialLink.setAttribute('aria-label', social.label);
            
            const icon = document.createElement('i');
            icon.className = social.icon;
            socialLink.appendChild(icon);
            
            socialCircle.appendChild(socialLink);
        });
    }

    // Set hero text
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.textContent = portfolioData.personal.name;
    }

    const tagline = document.querySelector('.tagline');
    if (tagline) {
        tagline.textContent = portfolioData.personal.tagline;
    }

    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        heroDescription.textContent = portfolioData.personal.description;
    }

    // Populate CTA buttons
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        portfolioData.heroCTA.forEach(cta => {
            const link = document.createElement('a');
            link.href = cta.href;
            link.className = cta.class;
            link.textContent = cta.text;
            
            if (cta.download && portfolioData.personal.resume) {
                link.href = portfolioData.personal.resume;
                link.download = true;
            }
            
            heroCTA.appendChild(link);
        });
    }

    // Populate tech orbit
    populateTechOrbit();
}

// Populate Tech Orbit
function populateTechOrbit() {
    const techOrbit = document.querySelector('.tech-orbit');
    if (!techOrbit) return;

    // Add center element
    const center = document.createElement('div');
    center.className = 'tech-orbit-center';
    const centerIcon = document.createElement('i');
    centerIcon.className = 'fas fa-code';
    center.appendChild(centerIcon);
    techOrbit.appendChild(center);

    // Add tech orbiters
    portfolioData.technologies.forEach((tech, index) => {
        const orbiter = document.createElement('div');
        orbiter.className = 'tech-orbiter';
        orbiter.dataset.tech = tech.id;
        orbiter.id = `tech-${tech.id}`;

        const techIcon = document.createElement('a');
        techIcon.href = '#';
        techIcon.className = 'tech-icon';
        techIcon.onclick = (e) => e.preventDefault();

        const icon = document.createElement('i');
        icon.className = tech.icon;
        techIcon.appendChild(icon);

        const tooltip = document.createElement('div');
        tooltip.className = 'tech-tooltip';
        tooltip.innerHTML = `
            <h4>${tech.name}</h4>
            <p>${tech.description}</p>
        `;

        orbiter.appendChild(techIcon);
        orbiter.appendChild(tooltip);
        techOrbit.appendChild(orbiter);
    });
}

// Populate Footer (shared across all pages)
function populateFooter() {
    // Social icons
    const socialLinks = document.querySelector('footer .social-links');
    if (socialLinks && portfolioData && Array.isArray(portfolioData.social)) {
        socialLinks.innerHTML = '';
        portfolioData.social.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.setAttribute('aria-label', social.label || 'social link');

            const icon = document.createElement('i');
            icon.className = social.icon;
            link.appendChild(icon);

            socialLinks.appendChild(link);
        });
    }

    // Footer name
    const footerName = document.getElementById('footer-name');
    if (footerName && portfolioData && portfolioData.personal) {
        footerName.textContent = portfolioData.personal.name || '';
    }

    // Current year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Populate About Section
function populateAbout() {
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.innerHTML = portfolioData.about.content;
    }
}

// Populate Achievements Section (standalone, after My Journey)
function populateAchievements() {
    const container = document.querySelector('.achievements-content');
    if (!container) return;

    const achievements = Array.isArray(portfolioData.achievements) ? portfolioData.achievements : [];
    if (!achievements.length) {
        container.innerHTML = '<p class="no-achievements">No achievements to display yet.</p>';
        return;
    }

    const list = document.createElement('ul');
    list.className = 'achievements-list';

    achievements.forEach(item => {
        const li = document.createElement('li');
        const icon = document.createElement('i');
        icon.className = 'fas fa-trophy';
        icon.setAttribute('aria-hidden', 'true');

        const textWrap = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = item.title || '';
        textWrap.appendChild(strong);
        if (item.description) {
            const sep = document.createTextNode(' — ');
            textWrap.appendChild(sep);
            const desc = document.createElement('span');
            desc.textContent = item.description;
            textWrap.appendChild(desc);
        }

        li.appendChild(icon);
        li.appendChild(textWrap);
        list.appendChild(li);
    });

    container.innerHTML = '';
    container.appendChild(list);
}

// Populate Timeline
function populateTimeline() {
    // const timelineContainer = document.querySelector('.timeline-container');
    // if (!timelineContainer) return;

    // portfolioData.timeline.forEach((item, index) => {
    //     const timelineItem = document.createElement('div');
    //     timelineItem.className = 'timeline-item';
    //     timelineItem.setAttribute('data-year', item.year);
    //     timelineItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
    //     timelineItem.setAttribute('data-aos-delay', index * 100);

    //     const content = document.createElement('div');
    //     content.className = 'timeline-content';
        
    //     const techStack = item.technologies.map(tech => 
    //         `<span>${tech}</span>`
    //     ).join('');

    //     content.innerHTML = `
    //         <h3>${item.title}</h3>
    //         <h4>${item.company}</h4>
    //         <p>${item.description}</p>
    //         <div class="tech-stack">${techStack}</div>
    //     `;

    //     timelineItem.appendChild(content);
    //     timelineContainer.appendChild(timelineItem);
    // });
    return;
}

// Populate Skills
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
}

// Export functions for potential use in other scripts
window.portfolioApp = {
    initializePortfolio,
    populateHeader,
    populateHero,
    populateAbout,
    populateTimeline,
    populateAchievements,
    populateSkills,
    populateFooter
};