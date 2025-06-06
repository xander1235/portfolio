document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const techCircle = document.querySelector('.tech-circle');
    const mainTechNode = document.getElementById('mainTechNode');
    const techItems = document.querySelectorAll('.tech-item');
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-title');
    const tagline = document.querySelector('.tagline');
    
    // State variables
    let isExpanded = false;
    let floatTime = 0;
    
    // Position tech items in a circle
    function positionTechItems() {
        const totalItems = techItems.length;
        const radius = 150; // Slightly smaller radius for better centering
        const angleStep = (2 * Math.PI) / totalItems;
        
        techItems.forEach((item, index) => {
            const angle = index * angleStep;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            // Store original transform for floating animation
            item.dataset.originalTransform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            item.style.transform = item.dataset.originalTransform;
            
            // Add hover effect
            item.addEventListener('mouseenter', () => {
                item.style.transform = `${item.dataset.originalTransform} scale(1.15)`;
                item.style.zIndex = '10';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = item.dataset.originalTransform;
                item.style.zIndex = '1';
            });
        });
    }
    
    // Initialize positions
    positionTechItems();

    // Toggle tech circle expansion with animation
    function toggleTechCircle() {
        isExpanded = !isExpanded;
        
        // Animate the expansion
        if (isExpanded) {
            techCircle.style.pointerEvents = 'auto';
            techCircle.classList.add('expanded');
            
            // Animate each tech item with a slight delay
            techItems.forEach((item, index) => {
                item.style.transition = `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s`;
                item.style.opacity = '1';
                item.style.visibility = 'visible';
            });
            
            // Rotate the main node
            mainTechNode.style.transform = 'rotate(90deg)';
            
        } else {
            // Animate the collapse
            techItems.forEach((item, index) => {
                item.style.transition = `all 0.3s ease-in ${(techItems.length - index - 1) * 0.02}s`;
                item.style.opacity = '0';
                item.style.visibility = 'hidden';
            });
            
            // Rotate the main node back
            mainTechNode.style.transform = 'rotate(0)';
            
            // Disable pointer events after animation
            setTimeout(() => {
                if (!isExpanded) {
                    techCircle.classList.remove('expanded');
                    techCircle.style.pointerEvents = 'none';
                }
            }, 300);
        }
    }

    // Add subtle parallax effect on hover
    function setupParallax() {
        techCircle.addEventListener('mousemove', (e) => {
            if (isExpanded) {
                const rect = techCircle.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                techCircle.style.transform = `translate(-50%, -50%) rotateX(${-y * 0.03}deg) rotateY(${x * 0.03}deg)`;
            }
        });
        
        techCircle.addEventListener('mouseleave', () => {
            techCircle.style.transform = 'translate(-50%, -50%)';
        });
    }
    
    // Setup parallax effect
    setupParallax();
    
    // Floating animation for tech items
    function floatItems() {
        floatTime += 0.01;
        techItems.forEach((item, index) => {
            if (isExpanded) {
                const offset = Math.sin(floatTime + index) * 5;
                item.style.transform = `${item.dataset.originalTransform} translateY(${offset}px)`;
            }
        });
        requestAnimationFrame(floatItems);
    }
    
    // Start floating animation
    floatItems();
    
    // Position name and title at the top
    if (heroTitle && tagline && heroContent) {
        // Ensure they're in the correct position in the DOM
        if (heroTitle.parentElement !== heroContent) {
            heroContent.insertBefore(tagline, heroContent.firstChild);
            heroContent.insertBefore(heroTitle, tagline);
        }
    }

    // Event Listeners for tech circle
    if (mainTechNode) {
        mainTechNode.addEventListener('click', toggleTechCircle);
    }

    // Close tech circle when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInside = techCircle && techCircle.contains(e.target);
        if (isExpanded && !isClickInside && techCircle) {
            toggleTechCircle();
        }
    });

    // Prevent event propagation when clicking on tech items
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Hide tech items initially
    if (techCircle) {
        techCircle.style.pointerEvents = 'none';
    }

    // Pause on hover
    techCircle.addEventListener('mouseenter', () => {
        techCircle.classList.add('paused');
    });

    techCircle.addEventListener('mouseleave', () => {
        techCircle.classList.remove('paused');
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate skills on scroll
    const skills = document.querySelectorAll('.skill');
    
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('visible');
                }
                
                // Animate skill bars
                if (entry.target.classList.contains('skill')) {
                    const level = entry.target.getAttribute('data-level');
                    const skillBar = entry.target.querySelector('.skill-level');
                    if (skillBar) {
                        skillBar.style.width = level + '%';
                    } else {
                        // For skills without a skill bar (like in the timeline)
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all timeline items and skills
    timelineItems.forEach(item => observer.observe(item));
    skills.forEach(skill => observer.observe(skill));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to timeline items
    document.querySelectorAll('.timeline-content').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize skill bars
    document.querySelectorAll('.skill').forEach(skill => {
        skill.innerHTML = `
            <div class="skill-name">
                <span>${skill.textContent}</span>
                <span>${skill.getAttribute('data-level')}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-level" style="width: 0;"></div>
            </div>
        `;
    });
    
        // Add animation class to hero elements
    const hero = document.querySelector('.hero');
    const heroContainer = hero ? hero.querySelector('.container') : null;
    
    if (heroContainer) {
        setTimeout(() => {
            heroContainer.style.opacity = '1';
            heroContainer.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Social icons interaction
    const socialIcons = document.querySelectorAll('.social-icon');
    const profileContainer = document.querySelector('.profile-container');
    
    // Add click handler to open social links in new tab
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const url = e.currentTarget.href;
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });
    });
    
    // Add smooth hover effect for profile container
    if (profileContainer) {
        profileContainer.addEventListener('mouseenter', () => {
            // No rotation, just show the icons
        });
        
        profileContainer.addEventListener('mouseleave', () => {
            // No rotation, just hide the icons
        });
    }
    
    // Update profile image source (replace with your actual image)
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        // Replace with your actual profile image URL
        // profileImage.src = 'path/to/your/profile.jpg';
    }
});

// Add animation on scroll for sections
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionPoint = 150;
        
        if (sectionTop < windowHeight - sectionPoint) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});
