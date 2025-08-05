// contact-app.js - Contact Page Dynamic Content

document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    if (typeof portfolioData === 'undefined') {
        console.error('Portfolio data not found. Please ensure data.js is loaded.');
        return;
    }

    populateHeader();
    populateContactInfo();
    populateFooter();

    document.title = `Contact - ${portfolioData.personal.name}`;
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Populate Header with active Contact link
function populateHeader() {
    const brandName = document.querySelector('.brand-name');
    if (brandName) {
        brandName.textContent = portfolioData.personal.name;
    }

    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.innerHTML = ''; // Clear existing links to prevent duplication
        const contactNav = [
            { href: 'index.html#about', text: 'About' },
            { href: 'index.html#timeline', text: 'Experience' },
            { href: 'skills.html', text: 'Skills' },
            { href: 'projects.html', text: 'Projects' },
            { href: 'contact.html', text: 'Contact', active: true },
            { href: 'blogs.html', text: 'Blogs' }
        ];

        contactNav.forEach(link => {
            const navLink = document.createElement('a');
            navLink.href = link.href;
            navLink.className = link.active ? 'nav-link active' : 'nav-link';
            navLink.textContent = link.text;
            navLinks.appendChild(navLink);
        });
    }
}

// Populate Contact Information
function populateContactInfo() {
    const container = document.querySelector('.contact-content');
    if (!container) return;

    const { message, email, location } = portfolioData.contact;

    container.innerHTML = `
        <p>${message}</p>
        <ul class="contact-info">
            <li><i class="fas fa-envelope"></i> <a href="mailto:${email}">${email}</a></li>
            <li><i class="fas fa-map-marker-alt"></i> ${location}</li>
        </ul>
    `;
}

// Populate Footer
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

