document.addEventListener('DOMContentLoaded', function() {
    // Get the tech orbit and its dimensions
    const orbit = document.querySelector('.tech-orbit');
    if (!orbit) return;
    
    const orbitRect = orbit.getBoundingClientRect();
    const centerX = orbitRect.width / 2;
    const centerY = orbitRect.height / 2;
    const radius = Math.min(centerX, centerY) - 35; // Subtract half the icon size
    
    // Create or get the center info display
    let centerInfo = document.querySelector('.tech-center-info');
    if (!centerInfo) {
        centerInfo = document.createElement('div');
        centerInfo.className = 'tech-center-info';
        centerInfo.style.position = 'absolute';
        centerInfo.style.top = '50%';
        centerInfo.style.left = '50%';
        centerInfo.style.transform = 'translate(-50%, -50%)';
        centerInfo.style.width = '150px';
        centerInfo.style.textAlign = 'center';
        centerInfo.style.color = 'white';
        centerInfo.style.zIndex = '5';
        centerInfo.style.opacity = '0';
        centerInfo.style.transition = 'opacity 0.3s ease';
        centerInfo.style.pointerEvents = 'none'; // Don't interfere with other interactions
        centerInfo.innerHTML = '<h4></h4><p></p>';
        
        // Create a wrapper for the center info that will counter-rotate
        const centerInfoWrapper = document.createElement('div');
        centerInfoWrapper.className = 'tech-center-info-wrapper';
        centerInfoWrapper.style.position = 'absolute';
        centerInfoWrapper.style.top = '50%';
        centerInfoWrapper.style.left = '50%';
        centerInfoWrapper.style.transform = 'translate(-50%, -50%)';
        centerInfoWrapper.style.zIndex = '5';
        
        // Add the center info to the wrapper, then add wrapper to orbit
        centerInfoWrapper.appendChild(centerInfo);
        orbit.appendChild(centerInfoWrapper);
    } else {
        // If centerInfo already exists, make sure it's in the right place
        if (!document.querySelector('.tech-center-info-wrapper')) {
            const parent = centerInfo.parentNode;
            const centerInfoWrapper = document.createElement('div');
            centerInfoWrapper.className = 'tech-center-info-wrapper';
            centerInfoWrapper.style.position = 'absolute';
            centerInfoWrapper.style.top = '50%';
            centerInfoWrapper.style.left = '50%';
            centerInfoWrapper.style.transform = 'translate(-50%, -50%)';
            centerInfoWrapper.style.zIndex = '5';
            
            parent.removeChild(centerInfo);
            centerInfoWrapper.appendChild(centerInfo);
            orbit.appendChild(centerInfoWrapper);
        }
    }
    
    // Create a counter-rotation animation for the center info wrapper
    const centerInfoCounterRotation = document.createElement('style');
    centerInfoCounterRotation.textContent = `
        @keyframes centerInfoCounterRotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
    `;
    document.head.appendChild(centerInfoCounterRotation);
    
    // Apply counter-rotation to the center info wrapper
    const centerInfoWrapper = document.querySelector('.tech-center-info-wrapper');
    if (centerInfoWrapper) {
        centerInfoWrapper.style.animation = 'centerInfoCounterRotate 30s linear infinite';
    }
    
    // Get the orbit center element
    const orbitCenter = document.querySelector('.tech-orbit-center');
    
    // Add click event to the orbit center to trigger vanish/revive animation
    if (orbitCenter) {
        orbitCenter.style.cursor = 'pointer';
        
        // Track animation state
        let isAnimating = false;
        let isVanished = false;
        
        orbitCenter.addEventListener('click', () => {
            // Prevent multiple clicks during animation
            if (isAnimating) return;
            
            isAnimating = true;
            
            // Pause the orbit animation
            orbit.classList.add('paused');
            if (centerInfoWrapper) {
                centerInfoWrapper.style.animationPlayState = 'paused';
            }
            
            // Add a pulse effect to the center
            orbitCenter.style.transition = 'all 0.5s ease';
            orbitCenter.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => {
                orbitCenter.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
            
            if (!isVanished) {
                // VANISH ANIMATION
                // Animate each orbiter to move toward center and fade out
                orbiters.forEach((orbiter, index) => {
                    const icon = orbiter.querySelector('.tech-icon');
                    const tooltip = orbiter.querySelector('.tech-tooltip');
                    
                    // Pause icon animations
                    if (icon) icon.style.animationPlayState = 'paused';
                    if (tooltip) tooltip.style.animationPlayState = 'paused';
                    
                    // Set up transition
                    orbiter.style.transition = 'all 0.8s ease';
                    
                    // Add delay based on position
                    setTimeout(() => {
                        // Move to center and fade out
                        orbiter.style.left = '50%';
                        orbiter.style.top = '50%';
                        orbiter.style.opacity = '0';
                        orbiter.style.transform = 'translate(-50%, -50%) scale(0.5)';
                    }, index * 150); // Stagger the animations
                });
                
                // After all animations complete, set state to vanished
                setTimeout(() => {
                    isVanished = true;
                    isAnimating = false;
                    
                    // Make center icon pulse to indicate it can be clicked again
                    const pulseAnimation = document.createElement('style');
                    pulseAnimation.textContent = `
                        @keyframes centerPulse {
                            0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 20px rgba(110, 69, 226, 0.6); }
                            50% { transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 30px rgba(110, 69, 226, 0.8); }
                            100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 20px rgba(110, 69, 226, 0.6); }
                        }
                    `;
                    document.head.appendChild(pulseAnimation);
                    orbitCenter.style.animation = 'centerPulse 2s infinite';
                }, orbiters.length * 150 + 800); // Wait for all orbiters to finish + transition time
                
            } else {
                // REVIVE ANIMATION
                // Remove pulse animation
                orbitCenter.style.animation = '';
                
                // Calculate positions for each orbiter
                orbiters.forEach((orbiter, index) => {
                    // Calculate angle for even distribution (in radians)
                    const angle = (index * (2 * Math.PI / totalOrbiters));
                    
                    // Calculate position on the circle
                    const x = centerX + radius * Math.sin(angle);
                    const y = centerY - radius * Math.cos(angle);
                    
                    const icon = orbiter.querySelector('.tech-icon');
                    const tooltip = orbiter.querySelector('.tech-tooltip');
                    
                    // Set up transition
                    orbiter.style.transition = 'all 0.8s ease';
                    
                    // Add delay based on position
                    setTimeout(() => {
                        // Move back to original position and fade in
                        orbiter.style.left = x + 'px';
                        orbiter.style.top = y + 'px';
                        orbiter.style.opacity = '1';
                        orbiter.style.transform = 'translate(-50%, -50%)';
                    }, index * 150); // Stagger the animations
                });
                
                // After all animations complete, resume orbit
                setTimeout(() => {
                    // Resume the orbit animation
                    orbit.classList.remove('paused');
                    if (centerInfoWrapper) {
                        centerInfoWrapper.style.animationPlayState = 'running';
                    }
                    
                    // Resume icon animations
                    orbiters.forEach((orbiter) => {
                        const icon = orbiter.querySelector('.tech-icon');
                        const tooltip = orbiter.querySelector('.tech-tooltip');
                        if (icon) icon.style.animationPlayState = 'running';
                        if (tooltip) tooltip.style.animationPlayState = 'running';
                    });
                    
                    isVanished = false;
                    isAnimating = false;
                }, orbiters.length * 150 + 800); // Wait for all orbiters to finish + transition time
            }
        });
    }
    
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
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        }
        
        // Handle hover on the entire orbiter element
        orbiter.addEventListener('mouseenter', () => {
            // Pause the orbit animation
            orbit.classList.add('paused');
            orbiters.forEach(orb => {
                const orb_icon = orb.querySelector('.tech-icon');
                const orb_tooltip = orb.querySelector('.tech-tooltip');
                if (orb_icon) orb_icon.style.animationPlayState = 'paused';
                if (orb_tooltip) orb_tooltip.style.animationPlayState = 'paused';
            });
            
            // Pause the center info wrapper animation
            if (centerInfoWrapper) {
                centerInfoWrapper.style.animationPlayState = 'paused';
            }
            
            // Show info in the center
            if (orbitCenter) {
                orbitCenter.style.opacity = '0.2'; // Dim the center icon
            }
            
            // Get tech info from the tooltip
            const tooltipTitle = orbiter.querySelector('.tech-tooltip h4')?.textContent || '';
            const tooltipText = orbiter.querySelector('.tech-tooltip p')?.textContent || '';
            
            // Display in center info
            centerInfo.querySelector('h4').textContent = tooltipTitle;
            centerInfo.querySelector('p').textContent = tooltipText;
            centerInfo.style.opacity = '1';
            
            // Highlight the current orbiter
            orbiter.style.zIndex = '10';
            orbiter.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });
        
        orbiter.addEventListener('mouseleave', () => {
            // Resume the orbit animation only if not hovering on any other orbiter
            if (!orbit.matches(':hover')) {
                orbit.classList.remove('paused');
                orbiters.forEach(orb => {
                    const orb_icon = orb.querySelector('.tech-icon');
                    const orb_tooltip = orb.querySelector('.tech-tooltip');
                    if (orb_icon) orb_icon.style.animationPlayState = 'running';
                    if (orb_tooltip) orb_tooltip.style.animationPlayState = 'running';
                });
                
                // Resume the center info wrapper animation
                if (centerInfoWrapper) {
                    centerInfoWrapper.style.animationPlayState = 'running';
                }
            }
            
            // Hide center info
            if (orbitCenter) {
                orbitCenter.style.opacity = '1'; // Restore center icon
            }
            centerInfo.style.opacity = '0';
            
            // Reset the current orbiter
            orbiter.style.zIndex = '1';
            orbiter.style.transform = 'translate(-50%, -50%)';
        });
    });
    
    // Pause animation on hover over the entire orbit
    orbit.addEventListener('mouseenter', () => {
        orbit.classList.add('paused');
        orbiters.forEach((orbiter) => {
            const icon = orbiter.querySelector('.tech-icon');
            const tooltip = orbiter.querySelector('.tech-tooltip');
            if (icon) icon.style.animationPlayState = 'paused';
            if (tooltip) tooltip.style.animationPlayState = 'paused';
        });
        
        // Pause the center info wrapper animation
        if (centerInfoWrapper) {
            centerInfoWrapper.style.animationPlayState = 'paused';
        }
    });
    
    orbit.addEventListener('mouseleave', () => {
        orbit.classList.remove('paused');
        orbiters.forEach((orbiter) => {
            const icon = orbiter.querySelector('.tech-icon');
            const tooltip = orbiter.querySelector('.tech-tooltip');
            if (icon) icon.style.animationPlayState = 'running';
            if (tooltip) tooltip.style.animationPlayState = 'running';
        });
        
        // Resume the center info wrapper animation
        if (centerInfoWrapper) {
            centerInfoWrapper.style.animationPlayState = 'running';
        }
        
        // Hide center info when leaving the orbit
        if (orbitCenter) {
            orbitCenter.style.opacity = '1';
        }
        centerInfo.style.opacity = '0';
    });
});
