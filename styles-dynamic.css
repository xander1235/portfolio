/* styles-dynamic.css - Additional styles for dynamically generated content */

/* Projects Section */
.projects {
    padding: 5rem 0;
    background-color: var(--section-bg);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.project-card {
    background: var(--bg-color);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), #6e45e2);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.project-card:hover::before {
    transform: scaleX(1);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.project-card h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.project-card p {
    color: var(--light-text);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.project-tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.project-tech {
    background: linear-gradient(135deg, #e0f2fe, #ddd6fe);
    color: var(--primary-color);
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.85rem;
    font-weight: 500;
}

.project-links {
    display: flex;
    gap: 1rem;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: rgba(37, 99, 235, 0.1);
}

.project-link:hover {
    background: rgba(37, 99, 235, 0.2);
    transform: translateX(2px);
}

.project-link i {
    font-size: 1.1rem;
}

/* Dark mode adjustments for projects */
body.dark .project-card {
    background: var(--dark-section-bg);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

body.dark .project-tech {
    background: rgba(96, 165, 250, 0.2);
    color: #60a5fa;
}

body.dark .project-link {
    background: rgba(96, 165, 250, 0.1);
    color: #60a5fa;
}

body.dark .project-link:hover {
    background: rgba(96, 165, 250, 0.2);
}

/* Timeline content improvements */
.timeline-content h4 {
    color: var(--light-text);
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
    font-weight: 500;
}

/* About section styling */
.about-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.about-content p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--light-text);
    margin-bottom: 1.5rem;
}

.about-content p:last-child {
    margin-bottom: 0;
}

/* Dark mode adjustments for about section */
body.dark .about-content p {
    color: var(--dark-light-text);
}

/* Enhanced skill category hover */
.skill-category {
    position: relative;
    overflow: hidden;
}

.skill-category::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(110, 69, 226, 0.05), rgba(136, 211, 206, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
}

.skill-category:hover::before {
    opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .project-card {
        padding: 1.5rem;
    }
    
    .about-content p {
        font-size: 1rem;
        text-align: left;
    }
}