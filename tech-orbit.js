// tech-orbit.js

(function() {
    const orbit = document.querySelector('.tech-orbit');
    if (!orbit) return;

    const orbiters = Array.from(document.querySelectorAll('.tech-orbiter'));
    const totalOrbiters = orbiters.length;
    let rotationSpeed = 0.2; // degrees per frame - reduced speed
    const initialRotationSpeed = rotationSpeed; // Store initial speed
    let rotationAngle = 0;
    let paused = false;

    // Central info container - positioned at the center of the orbit with card-like design
    const infoContainer = document.createElement('div');
    infoContainer.className = 'tech-info';
    Object.assign(infoContainer.style, {
        position: 'absolute',
        top: '50%', // Position at the center
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '10',
        display: 'none',
        pointerEvents: 'none',
        textAlign: 'center',
        width: '80%',
        maxWidth: '300px',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background for aesthetic look
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#333', // Dark text for contrast on light background
        border: '1px solid rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease'
    });
    orbit.appendChild(infoContainer);

    const centerElem = orbit.querySelector('.tech-orbit-center');
    
    // Add click event to the center element to trigger black hole animation
    if (centerElem) {
        centerElem.style.cursor = 'pointer'; // Add pointer cursor to indicate it's clickable
        centerElem.addEventListener('click', destroyRevive);
    }

    function calculateOrbitDimensions() {
        const width = orbit.clientWidth;
        const height = orbit.clientHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;
        return { centerX, centerY, radius };
    }

    function positionOrbiters() {
        const { centerX, centerY, radius } = calculateOrbitDimensions();
        orbiters.forEach((orbiter, i) => {
            const baseAngle = (i * (2 * Math.PI / totalOrbiters)) - Math.PI/2;
            orbiter.dataset.baseAngle = baseAngle;
            orbiter.dataset.radius = radius;
            orbiter.dataset.centerX = centerX;
            orbiter.dataset.centerY = centerY;

            const x = centerX + radius * Math.cos(baseAngle);
            const y = centerY + radius * Math.sin(baseAngle);
            orbiter.style.position = 'absolute';
            orbiter.style.left = `${x}px`;
            orbiter.style.top = `${y}px`;
            orbiter.style.transform = 'translate(-50%, -50%)';

            // We'll handle hover interactions globally now
            // Remove the inline event handlers to avoid conflicts
            orbiter.onmouseenter = null;
            orbiter.onmouseleave = null;

            // We no longer need this code-orbiter check since we'll use the center element
            // Keep this empty to maintain the structure
        });
    }

    // Animation state tracking
    let animationState = 'idle'; // idle, spinning, pulling, exploded
    let spinInterval = null;
    let spinSpeed = 1; // Initial spin duration in seconds
    let spinSpeedIncrement = 0.1; // How much to decrease the duration each step
    let minSpinSpeed = 0.1; // Minimum spin duration in seconds (fastest speed)
    let maxSpinDuration = 5; // How long to spin before starting to pull orbiters
    let spinDuration = 0;
    
    function destroyRevive() {
        // Only allow starting the animation if we're in idle state
        if (animationState === 'idle') {
            startSpinningAnimation();
        } else if (animationState === 'exploded') {
            // If we're already exploded, do nothing - the revive button handles this
        }
    }
    
    function startSpinningAnimation() {
        animationState = 'spinning';
        paused = true; // Pause the regular orbit animation
        const { centerX, centerY, radius } = calculateOrbitDimensions();
        
        // Make the center element pulse
        if (centerElem) {
            centerElem.style.transition = 'all 0.3s ease';
            centerElem.style.boxShadow = '0 0 15px rgba(110, 69, 226, 0.8)';
            centerElem.style.backgroundColor = '#000';
            
            // Get the code icon
            const codeIcon = centerElem.querySelector('i');
            if (codeIcon) {
                // Reset spin speed
                spinSpeed = 1;
                spinDuration = 0;
                
                // Create the spin animation with initial speed
                updateSpinAnimation(spinSpeed);
                
                // Apply the animation
                codeIcon.style.animation = 'spin-code-icon ' + spinSpeed + 's linear infinite';
                
                // Start interval to increase speed over time
                spinInterval = setInterval(() => {
                    // Increase speed by decreasing duration
                    spinSpeed = Math.max(spinSpeed - spinSpeedIncrement, minSpinSpeed);
                    spinDuration += 0.5; // 500ms interval
                    
                    // Update the animation
                    updateSpinAnimation(spinSpeed);
                    
                    // Apply the updated animation
                    codeIcon.style.animation = 'spin-code-icon ' + spinSpeed + 's linear infinite';
                    
                    // Increase glow intensity with speed
                    const glowIntensity = 0.8 + ((1 - spinSpeed) * 0.5);
                    centerElem.style.boxShadow = `0 0 15px rgba(110, 69, 226, ${glowIntensity}), 0 0 30px rgba(110, 69, 226, ${glowIntensity * 0.7})`;
                    
                    // Gradually move orbiters closer to center as speed increases
                    const progress = Math.min(1, spinDuration / maxSpinDuration);
                    moveOrbitersCloser(progress, centerX, centerY, radius);
                    
                    // If we've been spinning for the max duration, start final pull
                    if (spinDuration >= maxSpinDuration) {
                        clearInterval(spinInterval);
                        startPullingOrbiters();
                    }
                    
                    // Stop increasing if we've reached max speed
                    if (spinSpeed <= minSpinSpeed) {
                        // Keep spinning at max speed until we reach max duration
                    }
                }, 500); // Check every half second
            }
        }
        
        // Add a subtle glow to all orbiters
        orbiters.forEach(orbiter => {
            orbiter.style.transition = 'box-shadow 0.5s ease, left 1s ease, top 1s ease';
            orbiter.style.boxShadow = '0 0 10px rgba(110, 69, 226, 0.5)';
        });
    }
    
    // Function to gradually move orbiters closer to center
    function moveOrbitersCloser(progress, centerX, centerY, radius) {
        // Make the center element grow slightly as orbiters get closer
        if (centerElem && progress > 0.3) {
            const growFactor = 1 + (progress * 0.15); // Grow up to 15% larger
            centerElem.style.transform = `scale(${growFactor})`;
            
            // Increase center element glow with progress
            const centerGlow = 0.8 + (progress * 0.2);
            centerElem.style.boxShadow = `0 0 15px rgba(110, 69, 226, ${centerGlow}), 0 0 30px rgba(110, 69, 226, ${centerGlow * 0.7})`;
        }
        
        orbiters.forEach((orbiter, index) => {
            const angle = parseFloat(orbiter.dataset.baseAngle);
            
            // Calculate new position closer to center based on progress
            // Use a non-linear easing for more natural movement
            // Slow at first, then accelerate toward the center
            const easing = progress < 0.5 ? 
                2 * progress * progress : 
                1 - Math.pow(-2 * progress + 2, 2) / 2;
                
            const currentRadius = radius * (1 - easing * 0.7); // Reduce radius by up to 70%
            const newX = centerX + currentRadius * Math.cos(angle);
            const newY = centerY + currentRadius * Math.sin(angle);
            
            // Apply new position with smooth transition
            orbiter.style.transition = `left 0.5s ease, top 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease`;
            orbiter.style.left = `${newX}px`;
            orbiter.style.top = `${newY}px`;
            
            // Add rotation and slight scaling as they move closer
            const rotationDegree = easing * 180; // Rotate up to 180 degrees
            const scale = 1 - (easing * 0.3); // Shrink slightly as they approach
            orbiter.style.transform = `translate(-50%, -50%) rotate(${rotationDegree}deg) scale(${scale})`;
            
            // Increase glow as they get closer
            const glowIntensity = 0.5 + easing * 0.5;
            orbiter.style.boxShadow = `0 0 10px rgba(110, 69, 226, ${glowIntensity}), 0 0 20px rgba(110, 69, 226, ${glowIntensity * 0.5})`;
        });
    }
    
    function startPullingOrbiters() {
        animationState = 'pulling';
        const { centerX, centerY, radius } = calculateOrbitDimensions();
        
        // Create a clone of the center element that will grow to absorb orbiters
        const blackHole = document.createElement('div');
        blackHole.className = 'black-hole';
        Object.assign(blackHole.style, {
            position: 'absolute',
            left: `${centerX}px`,
            top: `${centerY}px`,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#000',
            transform: 'translate(-50%, -50%) scale(1)',
            boxShadow: '0 0 20px rgba(110, 69, 226, 0.6), 0 0 40px rgba(110, 69, 226, 0.4)',
            zIndex: '5',
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
        });
        orbit.appendChild(blackHole);
        
        // Enhance the black hole effect - grow it over time
        setTimeout(() => {
            blackHole.style.transform = 'translate(-50%, -50%) scale(2)';
            blackHole.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.9), 0 0 60px rgba(110, 69, 226, 0.6), 0 0 120px rgba(110, 69, 226, 0.4)';
        }, 500);
        
        // Hide the original center element
        if (centerElem) {
            centerElem.style.opacity = '0';
        }
        
        // Pull in orbiters one by one with delay
        let totalPullTime = 0;
        
        orbiters.forEach((orbiter, index) => {
            // Use longer staggered delays for more dramatic effect
            const delay = index * 800; 
            totalPullTime = delay + 3000; // Track the total time for the final state
            
            setTimeout(() => {
                // Create a clone of the orbiter that will move to the center
                const clone = orbiter.cloneNode(true);
                clone.id = `${orbiter.id}-clone`;
                Object.assign(clone.style, {
                    position: 'absolute',
                    left: orbiter.style.left,
                    top: orbiter.style.top,
                    transform: orbiter.style.transform,
                    zIndex: '10',
                    transition: 'all 2.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    boxShadow: '0 0 15px rgba(110, 69, 226, 0.9), 0 0 25px rgba(110, 69, 226, 0.6)'
                });
                orbit.appendChild(clone);
                
                // Mark original orbiter as absorbed and hide it
                orbiter.dataset.absorbed = 'true';
                orbiter.style.opacity = '0';
                orbiter.style.pointerEvents = 'none';
                
                // Animate the clone to move to center
                setTimeout(() => {
                    clone.style.left = `${centerX}px`;
                    clone.style.top = `${centerY}px`;
                    clone.style.transform = 'translate(-50%, -50%) scale(0.4) rotate(720deg)';
                    
                    // Pulse the black hole when orbiter reaches it
                    setTimeout(() => {
                        blackHole.style.transform = 'translate(-50%, -50%) scale(2.2)';
                        blackHole.style.boxShadow = '0 0 40px rgba(0, 0, 0, 0.9), 0 0 80px rgba(110, 69, 226, 0.7)';
                        
                        setTimeout(() => {
                            blackHole.style.transform = 'translate(-50%, -50%) scale(2)';
                            blackHole.style.boxShadow = '0 0 30px rgba(0, 0, 0, 0.9), 0 0 60px rgba(110, 69, 226, 0.6), 0 0 120px rgba(110, 69, 226, 0.4)';
                        }, 300);
                    }, 2000);
                }, 50);
            }, delay);
        });
        
        // After all orbiters are absorbed, trigger the final black hole state
        setTimeout(() => {
            finalizeBlackHole(centerX, centerY, radius);
        }, totalPullTime + 800);
    }
    
    function finalizeBlackHole(centerX, centerY, radius) {
        animationState = 'exploded';
        
        // Get the black hole element we created
        const blackHole = document.querySelector('.black-hole');
        
        if (blackHole) {
            // Final pulse of the black hole
            blackHole.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            blackHole.style.transform = 'translate(-50%, -50%) scale(2.5)';
            blackHole.style.boxShadow = '0 0 60px rgba(0, 0, 0, 0.9), 0 0 120px rgba(110, 69, 226, 0.8)';
            
            // After a delay, fade out the black hole
            setTimeout(() => {
                blackHole.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                blackHole.style.opacity = '0';
                blackHole.style.transform = 'translate(-50%, -50%) scale(1.5)';
                
                // Show the revive button
                setTimeout(() => {
                    createReviveButton(centerX, centerY, radius);
                    
                    // Clean up - remove all clones and the black hole
                    setTimeout(() => {
                        // Remove all cloned orbiters
                        const clones = document.querySelectorAll('[id$="-clone"]');
                        clones.forEach(clone => {
                            if (clone && clone.parentNode) {
                                clone.parentNode.removeChild(clone);
                            }
                        });
                        
                        // Remove the black hole
                        if (blackHole && blackHole.parentNode) {
                            blackHole.parentNode.removeChild(blackHole);
                        }
                    }, 500);
                }, 1000);
            }, 1000);
        } else {
            // Fallback in case black hole element isn't found
            createReviveButton(centerX, centerY, radius);
        }
    }
    
    // Function to create and animate the revive button
    function createReviveButton(x, y, radius) {
        // Create a dot that will transform into the revive button
        const dot = document.createElement('div');
        dot.className = 'revive-dot';
        Object.assign(dot.style, {
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%)',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: '#6e45e2',
            boxShadow: '0 0 10px rgba(110, 69, 226, 0.8)',
            opacity: '0',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
        orbit.appendChild(dot);
        
        // Animate the dot appearing
        setTimeout(() => {
            dot.style.opacity = '1';
            
            // Start revolving animation
            setTimeout(() => {
                // Create the actual revive button that will replace the dot
                const reviveBtn = document.createElement('div');
                reviveBtn.className = 'revive-button';
                Object.assign(reviveBtn.style, {
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: 'translate(-50%, -50%) scale(0)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#6e45e2',
                    boxShadow: '0 0 20px rgba(110, 69, 226, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy effect
                    opacity: '0',
                    zIndex: '100'
                });
                
                // Add refresh icon
                reviveBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
                orbit.appendChild(reviveBtn);
                
                // Remove the dot
                orbit.removeChild(dot);
                
                // Animate the button appearing with a revolving motion
                setTimeout(() => {
                    reviveBtn.style.opacity = '1';
                    reviveBtn.style.transform = 'translate(-50%, -50%) scale(1) rotate(720deg)';
                    
                    // Add click event to revive
                    reviveBtn.addEventListener('click', () => {
                        // Remove the revive button
                        orbit.removeChild(reviveBtn);
                        
                        // Reset everything
                        resetAnimation(x, y, radius);
                    });
                }, 50);
            }, 1000); // Revolve for 1 second before transforming
        }, 500);
    }
    
    function resetAnimation(centerX, centerY, radius) {
        animationState = 'idle';
        
        // Clean up any remaining clones or black hole elements
        const clones = document.querySelectorAll('[id$="-clone"]');
        clones.forEach(clone => {
            if (clone && clone.parentNode) {
                clone.parentNode.removeChild(clone);
            }
        });
        
        const blackHole = document.querySelector('.black-hole');
        if (blackHole && blackHole.parentNode) {
            blackHole.parentNode.removeChild(blackHole);
        }
        
        // Restore the center element
        if (centerElem) {
            centerElem.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            centerElem.style.opacity = '1';
            centerElem.style.transform = 'scale(1)';
            centerElem.style.backgroundColor = '';
            centerElem.style.boxShadow = '';
            centerElem.style.zIndex = ''; // Reset z-index
            
            // Restore the code icon
            const codeIcon = centerElem.querySelector('i');
            if (codeIcon) {
                codeIcon.style.animation = 'none';
                codeIcon.style.transition = 'opacity 0.5s ease';
                codeIcon.style.opacity = '1';
                codeIcon.style.transform = 'rotate(0deg)';
            }
            
            // Clear any intervals
            if (spinInterval) {
                clearInterval(spinInterval);
                spinInterval = null;
            }
        }
        
        // Restore orbiters to their original positions
        orbiters.forEach((orbiter, index) => {
            setTimeout(() => {
                // Reset absorbed state
                delete orbiter.dataset.absorbed;
                
                // Reset visual properties
                orbiter.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                orbiter.style.opacity = '1';
                orbiter.style.boxShadow = '';
                orbiter.style.backgroundColor = '';
                orbiter.style.pointerEvents = ''; // Re-enable hover events
                
                // Reset position
                const angle = parseFloat(orbiter.dataset.baseAngle);
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                
                orbiter.style.left = `${x}px`;
                orbiter.style.top = `${y}px`;
                orbiter.style.transform = 'translate(-50%, -50%)';
            }, index * 100);
        });
        
        // Resume normal orbit animation after all animations complete
        setTimeout(() => { 
            paused = false; 
        }, orbiters.length * 100 + 800);
    }
    
    // Function to update the spin animation with new duration
    function updateSpinAnimation(duration) {
        // Remove existing animation if it exists
        const existingStyle = document.getElementById('spin-animation');
        if (existingStyle) {
            document.head.removeChild(existingStyle);
        }
        
        // Create new animation with updated duration
        const style = document.createElement('style');
        style.id = 'spin-animation';
        style.textContent = `
            @keyframes spin-code-icon {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    function animate() {
        if (!paused) {
            rotationAngle = (rotationAngle + rotationSpeed) % 360;
            orbiters.forEach(o => {
                const base = parseFloat(o.dataset.baseAngle);
                const radius = parseFloat(o.dataset.radius);
                const centerX = parseFloat(o.dataset.centerX);
                const centerY = parseFloat(o.dataset.centerY);
                const angle = base + (rotationAngle * Math.PI/180);
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                o.style.left = `${x}px`;
                o.style.top = `${y}px`;
                const deg = angle * 180/Math.PI;
                o.style.transform = `translate(-50%, -50%)`;
                o.style.transition = '';
            });
        }
        requestAnimationFrame(animate);
    }

    // Use a simpler approach with a global mouse tracking state
    let isMouseInOrbit = false;
    
    // Function to check if mouse is inside the orbit circle
    function isPointInCircle(x, y, centerX, centerY, radius) {
        const dx = x - centerX;
        const dy = y - centerY;
        return dx * dx + dy * dy <= radius * radius;
    }
    
    // Add mousemove event listener to document
    document.addEventListener('mousemove', (e) => {
        const rect = orbit.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radius = Math.min(rect.width, rect.height) / 2;
        
        // Check if mouse is within the circular orbit area
        const mouseInOrbit = isPointInCircle(e.clientX, e.clientY, centerX, centerY, radius);
        
        // Always set paused based on current mouse position
        paused = mouseInOrbit;
    });
    
    // Handle mouse events on orbiters to show info and ensure orbit stays paused
    orbiters.forEach(orbiter => {
        // Hide the original tooltips that appear on the tech icons
        const originalTooltip = orbiter.querySelector('.tech-tooltip');
        if (originalTooltip) {
            originalTooltip.style.display = 'none';
        }
        
        orbiter.addEventListener('mouseenter', () => {
            // Skip if the orbiter has been absorbed
            if (orbiter.dataset.absorbed === 'true') return;
            
            // Ensure orbit stays paused when hovering over orbiters
            paused = true;
            
            // Show the tech info at the center with enhanced styling
            const tooltip = orbiter.querySelector('.tech-tooltip');
            if (tooltip) {
                // Get the content from the tooltip
                const title = tooltip.querySelector('h4') ? tooltip.querySelector('h4').innerHTML : '';
                const description = tooltip.querySelector('p') ? tooltip.querySelector('p').innerHTML : '';
                
                // Create styled content
                infoContainer.innerHTML = `
                    <h3 style="margin-top: 0; color: #6e45e2; font-size: 1.5rem; margin-bottom: 10px;">${title}</h3>
                    <p style="margin-bottom: 0; line-height: 1.5;">${description}</p>
                `;
                
                infoContainer.style.display = 'block';
                // Only hide center element if we're not in an animation
                if (animationState === 'idle') {
                    centerElem && (centerElem.style.display = 'none');
                }
            }
        });
        
        orbiter.addEventListener('mouseleave', () => {
            // Skip if the orbiter has been absorbed
            if (orbiter.dataset.absorbed === 'true') return;
            
            // Hide the tech info when mouse leaves the orbiter
            // But don't unpause - that's handled by the global mouse tracking
            infoContainer.style.display = 'none';
            
            // Only show center element if we're not in an animation
            if (animationState === 'idle') {
                centerElem && (centerElem.style.display = '');
            }
        });
    });
    
    window.addEventListener('load', () => {
        requestAnimationFrame(positionOrbiters);
        animate();
    });
    window.addEventListener('resize', positionOrbiters);
})();
