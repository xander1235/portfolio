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
                // VANISH ANIMATION WITH EXPLOSION
                // Create explosion animation styles
                const explosionStyle = document.createElement('style');
                explosionStyle.textContent = `
                    @keyframes explode {
                        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                        20% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
                        50% { transform: translate(-50%, -50%) scale(0.1); opacity: 0.6; }
                        80% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.3; }
                        100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    }
                    
                    .particle {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: rgba(110, 69, 226, 0.8);
                        box-shadow: 0 0 10px rgba(110, 69, 226, 0.8);
                    }
                    
                    @keyframes particle-animation {
                        0% { transform: translate(0, 0) scale(1); opacity: 1; }
                        100% { transform: translate(var(--x), var(--y)) scale(0); opacity: 0; }
                    }
                `;
                document.head.appendChild(explosionStyle);
                
                // Animate each orbiter to move toward center and explode
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
                        // Move to center
                        orbiter.style.left = '50%';
                        orbiter.style.top = '50%';
                        orbiter.style.transform = 'translate(-50%, -50%)';
                        
                        // After reaching center, trigger explosion
                        setTimeout(() => {
                            // Create a more dramatic explosion effect
                            // First, create a flash of light
                            const explosionFlash = document.createElement('div');
                            explosionFlash.style.position = 'absolute';
                            explosionFlash.style.left = '50%';
                            explosionFlash.style.top = '50%';
                            explosionFlash.style.width = '60px';
                            explosionFlash.style.height = '60px';
                            explosionFlash.style.borderRadius = '50%';
                            explosionFlash.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                            explosionFlash.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(110, 69, 226, 0.8)';
                            explosionFlash.style.transform = 'translate(-50%, -50%) scale(0)';
                            explosionFlash.style.zIndex = '100';
                            orbit.appendChild(explosionFlash);
                            
                            // Animate the flash
                            explosionFlash.animate([
                                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                                { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 1 },
                                { transform: 'translate(-50%, -50%) scale(0.8)', opacity: 0.8 },
                                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
                            ], {
                                duration: 600,
                                easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                            }).onfinish = () => {
                                if (explosionFlash.parentNode === orbit) {
                                    orbit.removeChild(explosionFlash);
                                }
                            };
                            
                            // Hide the original orbiter immediately
                            orbiter.style.opacity = '0';
                            
                            // Create explosion ring
                            const explosionRing = document.createElement('div');
                            explosionRing.style.position = 'absolute';
                            explosionRing.style.left = '50%';
                            explosionRing.style.top = '50%';
                            explosionRing.style.width = '10px';
                            explosionRing.style.height = '10px';
                            explosionRing.style.borderRadius = '50%';
                            explosionRing.style.border = '2px solid rgba(110, 69, 226, 0.8)';
                            explosionRing.style.transform = 'translate(-50%, -50%)';
                            explosionRing.style.zIndex = '99';
                            orbit.appendChild(explosionRing);
                            
                            // Animate the ring
                            explosionRing.animate([
                                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1, borderWidth: '3px' },
                                { transform: 'translate(-50%, -50%) scale(4)', opacity: 0, borderWidth: '1px' }
                            ], {
                                duration: 800,
                                easing: 'ease-out'
                            }).onfinish = () => {
                                if (explosionRing.parentNode === orbit) {
                                    orbit.removeChild(explosionRing);
                                }
                            };
                            
                            // Create particles for explosion - more particles and varied colors
                            const colors = ['rgba(110, 69, 226, 0.8)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 215, 0, 0.8)', 'rgba(0, 191, 255, 0.8)'];
                            
                            for (let i = 0; i < 24; i++) {
                                const particle = document.createElement('div');
                                particle.className = 'particle';
                                
                                // Random size for particles
                                const size = 4 + Math.random() * 8;
                                particle.style.width = `${size}px`;
                                particle.style.height = `${size}px`;
                                
                                // Random color from our palette
                                const colorIndex = Math.floor(Math.random() * colors.length);
                                particle.style.backgroundColor = colors[colorIndex];
                                particle.style.boxShadow = `0 0 ${size}px ${colors[colorIndex]}`;
                                
                                // Random position around the center
                                const angle = Math.random() * Math.PI * 2;
                                const distance = 40 + Math.random() * 80; // Longer distance
                                const x = Math.cos(angle) * distance;
                                const y = Math.sin(angle) * distance;
                                
                                // Set particle styles
                                particle.style.left = '50%';
                                particle.style.top = '50%';
                                particle.style.setProperty('--x', `${x}px`);
                                particle.style.setProperty('--y', `${y}px`);
                                
                                // Varied animation duration for more natural effect
                                const duration = 0.5 + Math.random() * 0.8;
                                particle.style.animation = `particle-animation ${duration}s cubic-bezier(0.1, 0.8, 0.2, 1) forwards`;
                                
                                orbit.appendChild(particle);
                                
                                // Remove particle after animation
                                setTimeout(() => {
                                    if (particle.parentNode === orbit) {
                                        orbit.removeChild(particle);
                                    }
                                }, duration * 1000 + 100);
                            }
                        }, 800);
                    }, index * 250); // Stagger the animations more for dramatic effect
                });
                
                // After all animations complete, change center icon to revive symbol
                setTimeout(() => {
                    isVanished = true;
                    isAnimating = false;
                    
                    // Change center icon to revive symbol (refresh icon)
                    const centerIcon = orbitCenter.querySelector('i');
                    if (centerIcon) {
                        centerIcon.className = 'fas fa-sync-alt';
                    }
                    
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
                }, orbiters.length * 250 + 1500); // Wait for all orbiters to finish + explosion time
                
            } else {
                // TIME TRAVEL REVIVE ANIMATION
                // Remove pulse animation
                orbitCenter.style.animation = '';
                
                // Change center icon back to code icon with spinning animation
                const centerIcon = orbitCenter.querySelector('i');
                if (centerIcon) {
                    centerIcon.className = 'fas fa-code';
                    centerIcon.style.animation = 'spin 1s linear';
                }
                
                // Create time travel effect
                const timeWarpEffect = document.createElement('div');
                timeWarpEffect.className = 'time-warp-effect';
                timeWarpEffect.style.position = 'absolute';
                timeWarpEffect.style.top = '0';
                timeWarpEffect.style.left = '0';
                timeWarpEffect.style.width = '100%';
                timeWarpEffect.style.height = '100%';
                timeWarpEffect.style.borderRadius = '50%';
                timeWarpEffect.style.background = 'radial-gradient(circle, rgba(110, 69, 226, 0) 0%, rgba(110, 69, 226, 0.3) 70%, rgba(110, 69, 226, 0.8) 100%)';
                timeWarpEffect.style.opacity = '0';
                timeWarpEffect.style.transition = 'opacity 0.5s ease';
                timeWarpEffect.style.pointerEvents = 'none';
                orbit.appendChild(timeWarpEffect);
                
                // Create time travel animation
                const timeWarpAnimation = document.createElement('style');
                timeWarpAnimation.textContent = `
                    @keyframes timeWarp {
                        0% { transform: scale(0.5) rotate(0deg); opacity: 0; }
                        50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
                        100% { transform: scale(1) rotate(360deg); opacity: 0; }
                    }
                    
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    
                    @keyframes techIconRevive {
                        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; filter: hue-rotate(180deg); }
                        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; filter: hue-rotate(90deg); }
                        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; filter: hue-rotate(0deg); }
                    }
                `;
                document.head.appendChild(timeWarpAnimation);
                
                // Animate time warp effect
                setTimeout(() => {
                    timeWarpEffect.style.opacity = '1';
                    timeWarpEffect.style.animation = 'timeWarp 2s forwards';
                    
                    // Create clock-like particles rotating around the center
                    for (let i = 0; i < 24; i++) {
                        const clockHand = document.createElement('div');
                        clockHand.style.position = 'absolute';
                        clockHand.style.top = '50%';
                        clockHand.style.left = '50%';
                        clockHand.style.width = '2px';
                        clockHand.style.height = `${Math.random() * 30 + 20}px`;
                        clockHand.style.background = 'rgba(110, 69, 226, 0.8)';
                        clockHand.style.transformOrigin = 'bottom center';
                        clockHand.style.transform = `translate(-50%, -100%) rotate(${i * 15}deg)`;
                        clockHand.style.opacity = '0.7';
                        clockHand.style.boxShadow = '0 0 5px rgba(110, 69, 226, 0.8)';
                        
                        // Animate the clock hands
                        clockHand.style.animation = `spin ${1 + Math.random()}s linear ${i * 50}ms`;
                        
                        orbit.appendChild(clockHand);
                        
                        // Remove after animation
                        setTimeout(() => {
                            orbit.removeChild(clockHand);
                        }, 2000);
                    }
                }, 300);
                
                // Calculate positions for each orbiter
                setTimeout(() => {
                    orbiters.forEach((orbiter, index) => {
                        // Reset animation and make visible again
                        orbiter.style.animation = '';
                        orbiter.style.opacity = '0';
                        
                        // Calculate angle for even distribution (in radians)
                        const angle = (index * (2 * Math.PI / totalOrbiters));
                        
                        // Calculate position on the circle
                        const x = centerX + radius * Math.sin(angle);
                        const y = centerY - radius * Math.cos(angle);
                        
                        const icon = orbiter.querySelector('.tech-icon');
                        const tooltip = orbiter.querySelector('.tech-tooltip');
                        
                        // Position at final location but invisible
                        orbiter.style.left = x + 'px';
                        orbiter.style.top = y + 'px';
                        
                        // Add delay based on position for reappearing
                        setTimeout(() => {
                            // Apply revive animation
                            orbiter.style.transition = 'none'; // Remove transition to use animation
                            orbiter.style.animation = `techIconRevive 0.8s forwards`;
                            
                            // Create energy particles around the reviving icon
                            for (let i = 0; i < 8; i++) {
                                const energyParticle = document.createElement('div');
                                energyParticle.className = 'particle';
                                energyParticle.style.background = 'rgba(255, 255, 255, 0.8)';
                                energyParticle.style.left = x + 'px';
                                energyParticle.style.top = y + 'px';
                                
                                // Random direction
                                const particleAngle = Math.random() * Math.PI * 2;
                                const distance = 20 + Math.random() * 20;
                                const particleX = Math.cos(particleAngle) * distance;
                                const particleY = Math.sin(particleAngle) * distance;
                                
                                energyParticle.style.setProperty('--x', `${particleX}px`);
                                energyParticle.style.setProperty('--y', `${particleY}px`);
                                energyParticle.style.animation = `particle-animation ${0.3 + Math.random() * 0.3}s forwards`;
                                
                                orbit.appendChild(energyParticle);
                                
                                // Remove particle after animation
                                setTimeout(() => {
                                    if (energyParticle.parentNode === orbit) {
                                        orbit.removeChild(energyParticle);
                                    }
                                }, 600);
                            }
                        }, index * 200 + 1500); // Stagger the animations after time warp effect
                    });
                }, 300);
                
                // After all animations complete, resume orbit
                setTimeout(() => {
                    // Remove time warp effect
                    if (timeWarpEffect.parentNode === orbit) {
                        orbit.removeChild(timeWarpEffect);
                    }
                    
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
                }, orbiters.length * 200 + 2500); // Wait for all orbiters to finish + time warp effect
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
