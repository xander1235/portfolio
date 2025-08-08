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
            { href: 'blogs.html', text: 'Blogs' },
            { href: 'contact.html', text: 'Contact', active: true }
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
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

    // Build contact layout: Info card only
    container.innerHTML = `
      <div class="contact-wrapper one-col">
        <section class="contact-card" data-aos="fade-up">
          <h3>Let’s build something great</h3>
          <p>${message}</p>

          <div class="availability" aria-label="Availability status">
            <span class="status-dot" aria-hidden="true"></span>
            <span>Available for new opportunities</span>
          </div>

          <ul class="contact-methods" aria-label="Contact methods">
            <li class="contact-method">
              <div class="left">
                <i class="fas fa-envelope" aria-hidden="true"></i>
                <div>
                  <div><strong>Email</strong></div>
                  <a href="mailto:${email}">${email}</a>
                </div>
              </div>
              <button class="copy-btn" data-copy="${email}" aria-label="Copy email">Copy</button>
            </li>
            
            <li class="contact-method">
              <div class="left">
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <div>
                  <div><strong>Location</strong></div>
                  <a href="${mapsUrl}" target="_blank" rel="noopener">${location}</a>
                </div>
              </div>
            </li>
          </ul>

          <div class="social-inline" aria-label="Social links">
            ${portfolioData.social.map(s => `
              <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">
                <i class="${s.icon}"></i>
              </a>
            `).join('')}
          </div>
        </section>
      </div>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>
    `;

    // Wire up interactions
    const toast = document.getElementById('toast');
    const showToast = (text) => {
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1800);
    };

    const copyToClipboard = async (text) => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        showToast('Copied to clipboard');
      } catch (e) {
        console.error('Copy failed', e);
        showToast('Unable to copy');
      }
    };

    container.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-copy');
        if (val) copyToClipboard(val);
      });
    });

    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => copyToClipboard(email));
    }

    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (document.getElementById('name') || {}).value || '';
        const fromEmail = (document.getElementById('emailInput') || {}).value || '';
        const subject = (document.getElementById('subject') || {}).value || `New message from ${name || 'your portfolio'}`;
        const bodyText = (document.getElementById('messageInput') || {}).value || '';

        if (!fromEmail || !bodyText) {
          showToast('Please fill required fields');
          return;
        }

        const body = `Name: ${name}\nEmail: ${fromEmail}\n\n${bodyText}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        // Open Gmail compose in a new tab
        window.open(gmailUrl, '_blank', 'noopener');
        showToast('Opening Gmail compose...');
      });
    }
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

    const footerName = document.getElementById('footer-name');
    if (footerName) {
        footerName.textContent = portfolioData.personal.name;
    }
}

