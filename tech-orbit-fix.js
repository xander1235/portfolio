document.addEventListener('DOMContentLoaded', function() {
    // Get the tech orbit and its dimensions
    const orbit = document.querySelector('.tech-orbit');
    if (!orbit) return;
    
    const orbitRect = orbit.getBoundingClientRect();
    const centerX = orbitRect.width / 2;
    const centerY = orbitRect.height / 2;
    const radius = Math.min(centerX, centerY) - 35; // Subtract half the icon size
    
    // Get all tech orbiters
    const orbiters = document.querySelectorAll('.tech-orbiter');
    const totalOrbiters = orbiters.length;
    
    // Position each orbiter precisely on the orbit path
    orbiters.forEach((orbiter, index) => {
        // Calculate angle for even distribution (in radians)
        const angle = (index * (2 * Math.PI / totalOrbiters));
        
        // Calculate position on the circle
        const x = centerX + radius * Math.sin(angle);
        const y = centerY - radius * Math.cos(angle);
        
        // Position the orbiter
        orbiter.style.position = 'absolute';
        orbiter.style.left = x + 'px';
        orbiter.style.top = y + 'px';
        orbiter.style.transform = 'translate(-50%, -50%)';
        
        // Add counter-rotation to keep icons upright during orbit animation
        const counterRotation = document.createElement('style');
        counterRotation.textContent = `
            @keyframes counterRotate${index} {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
            }
        `;
        document.head.appendChild(counterRotation);
        
        // Apply counter-rotation to the icon
        const icon = orbiter.querySelector('.tech-icon');
        if (icon) {
            icon.style.animation = `counterRotate${index} 30s linear infinite`;
            icon.style.display = 'flex';
            icon.style.alignItems = 'center';
            icon.style.justifyContent = 'center';
            icon.style.width = '100%';
            icon.style.height = '100%';
        }
        
        // Apply counter-rotation to tooltip as well
        const tooltip = orbiter.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.style.animation = `counterRotate${index} 30s linear infinite`;
        }
    });
    
    // Pause animation on hover
    orbit.addEventListener('mouseenter', () => {
        orbit.classList.add('paused');
        orbiters.forEach((orbiter, index) => {
            const icon = orbiter.querySelector('.tech-icon');
            const tooltip = orbiter.querySelector('.tech-tooltip');
            if (icon) icon.style.animationPlayState = 'paused';
            if (tooltip) tooltip.style.animationPlayState = 'paused';
        });
    });
    
    orbit.addEventListener('mouseleave', () => {
        orbit.classList.remove('paused');
        orbiters.forEach((orbiter, index) => {
            const icon = orbiter.querySelector('.tech-icon');
            const tooltip = orbiter.querySelector('.tech-tooltip');
            if (icon) icon.style.animationPlayState = 'running';
            if (tooltip) tooltip.style.animationPlayState = 'running';
        });
    });
});
