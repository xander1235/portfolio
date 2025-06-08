// tech-orbit.js - Updated to work with dynamically created elements

(function() {
    // Wait for the DOM and dynamic content to be ready
    function initializeTechOrbit() {
        const orbit = document.querySelector('.tech-orbit');
        if (!orbit) {
            // If orbit doesn't exist yet, wait and try again
            setTimeout(initializeTechOrbit, 100);
            return;
        }

        // Check if orbiters exist
        const orbiters = Array.from(document.querySelectorAll('.tech-orbiter'));
        if (orbiters.length === 0) {
            // If no orbiters yet, wait and try again
            setTimeout(initializeTechOrbit, 100);
            return;
        }

        // Now we have all elements, proceed with initialization
        setupTechOrbit(orbit, orbiters);
    }

    function setupTechOrbit(orbit, orbiters) {
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
                // Disable all interactions on orbiters and center element
                disableOrbitInteractions();
                startSpinningAnimation();
            } else if (animationState === 'exploded') {
                // If we're already exploded, do nothing - the revive button handles this
            }
        }
        
        // Function to disable all interactions on the orbit area
        function disableOrbitInteractions() {
            // Disable center element interactions
            if (centerElem) {
                centerElem.style.pointerEvents = 'none';
            }
            
            // Disable all orbiter interactions
            orbiters.forEach(orbiter => {
                orbiter.style.pointerEvents = 'none';
            });
            
            // Add an overlay to prevent any clicks on the orbit area
            const overlay = document.createElement('div');
            overlay.className = 'orbit-overlay';
            Object.assign(overlay.style, {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                zIndex: '5',
                cursor: 'default',
                backgroundColor: 'transparent'
            });
            orbit.appendChild(overlay);
        }
        
        // Function to re-enable all interactions on the orbit area
        function enableOrbitInteractions() {
            // Re-enable center element interactions
            if (centerElem) {
                centerElem.style.pointerEvents = 'auto';
            }
            
            // Re-enable all orbiter interactions
            orbiters.forEach(orbiter => {
                // Only re-enable if not absorbed
                if (!orbiter.dataset.absorbed) {
                    orbiter.style.pointerEvents = 'auto';
                }
            });
            
            // Remove the overlay
            const overlay = orbit.querySelector('.orbit-overlay');
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
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
            
            // Remove any existing black hole elements first
            document.querySelectorAll('.black-hole, .black-hole-clone').forEach(bh => {
                if (bh && bh.parentNode) {
                    bh.parentNode.removeChild(bh);
                }
            });
            
            // Create a clone of the center element that will grow to absorb orbiters
            const blackHole = document.createElement('div');
            blackHole.className = 'black-hole';
            blackHole.id = 'main-black-hole'; // Add an ID for easier targeting
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
            // Add a console log to debug
            console.log('Scheduling finalizeBlackHole after', totalPullTime + 800, 'ms');
            setTimeout(() => {
                console.log('Executing finalizeBlackHole');
                finalizeBlackHole(centerX, centerY, radius);
            }, totalPullTime + 800);
        }

        function finalizeBlackHole(centerX, centerY, radius) {
            animationState = 'exploded';
            
            // Hide the original center element completely
            if (centerElem) {
                centerElem.style.display = 'none'; // Use display:none instead of opacity
                centerElem.style.opacity = '0';
                centerElem.style.transform = 'translate(-50%, -50%) scale(0)';
                centerElem.style.transition = 'all 0.3s ease';
            }
            
            // Get all black hole elements
            const blackHoleClone = document.querySelector('.black-hole-clone');
            const blackHole = document.querySelector('.black-hole');
            
            if (blackHole) {
                // Final pulse of the black hole before explosion
                blackHole.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                blackHole.style.transform = 'translate(-50%, -50%) scale(2.8)';
                blackHole.style.boxShadow = '0 0 80px rgba(0, 0, 0, 0.9), 0 0 150px rgba(110, 69, 226, 0.9)';
                
                // Create explosion particles
                setTimeout(() => {
                    console.log('Creating explosion effect');
                    // Trigger explosion effect
                    createExplosion(centerX, centerY, radius);
                    
                    // Hide the black hole during explosion
                    blackHole.style.transition = 'all 0.2s ease';
                    blackHole.style.opacity = '0';
                    blackHole.style.transform = 'translate(-50%, -50%) scale(0)';

                    // Slowly disappearing the tech orbits
                    const orbiters = document.querySelectorAll('.tech-orbiter');
                    orbiters.forEach(orbiter => {
                        // console.log('Disappearing orbit', orbiter);
                        orbiter.style.transition = 'opacity 0.5s ease';
                        orbiter.style.opacity = '0';
                    });
                    
                    // After explosion completes, clean up elements
                    console.log('Scheduling cleanup');
                    setTimeout(() => {
                        console.log('Cleaning up explosion particles and black hole');
                        // Clean up explosion particles and black hole
                        const explosionParticles = document.querySelectorAll('.explosion-particle');
                        explosionParticles.forEach(particle => {
                            if (particle && particle.parentNode) {
                                particle.parentNode.removeChild(particle);
                            }
                        });
                        
                        // Remove all cloned orbiters
                        const clones = document.querySelectorAll('[id$="-clone"]');
                        clones.forEach(clone => {
                            if (clone && clone.parentNode) {
                                clone.parentNode.removeChild(clone);
                            }
                        });
                        
                        // Remove all black hole elements
                        if (blackHole && blackHole.parentNode) {
                            blackHole.parentNode.removeChild(blackHole);
                        }
                        
                        if (blackHoleClone && blackHoleClone.parentNode) {
                            blackHoleClone.parentNode.removeChild(blackHoleClone);
                        }
                        
                        // Remove any other black hole elements that might exist
                        document.querySelectorAll('.black-hole').forEach(bh => {
                            if (bh && bh.parentNode) {
                                bh.parentNode.removeChild(bh);
                            }
                        });
                    }, 2000); // Wait for explosion animation to complete
                }, 800);
            } else {
                // Fallback in case black hole element isn't found
                console.log('Black hole element not found, directly creating explosion');
                createExplosion(centerX, centerY, radius);
            }
        }


        function createExplosion(centerX, centerY, radius) {
            console.log('Inside createExplosion function');
            // Number of particles for the explosion
            const particleCount = 20;
            
            // Create explosion particles
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'explosion-particle';
                
                // Random angle for particle trajectory
                const angle = Math.random() * Math.PI * 2;
                // Random distance for particle to travel
                const distance = radius * (0.5 + Math.random() * 1.5);
                // Random size for particle
                const size = 3 + Math.random() * 8;
                // Random duration for animation
                const duration = 0.6 + Math.random() * 0.9;
                
                // Set particle styles
                Object.assign(particle.style, {
                    position: 'absolute',
                    left: `${centerX}px`,
                    top: `${centerY}px`,
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    backgroundColor: '#6e45e2',
                    boxShadow: '0 0 8px rgba(110, 69, 226, 0.8), 0 0 12px rgba(110, 69, 226, 0.6)',
                    transform: 'translate(-50%, -50%)',
                    opacity: '0.9',
                    zIndex: '100',
                    transition: `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                });
                
                // Add to DOM
                orbit.appendChild(particle);
                
                // Trigger animation after a small delay
                setTimeout(() => {
                    // Calculate end position
                    const endX = centerX + Math.cos(angle) * distance;
                    const endY = centerY + Math.sin(angle) * distance;
                    
                    // Animate particle
                    particle.style.transform = `translate(-50%, -50%) scale(${0.2 + Math.random() * 0.8})`;
                    particle.style.left = `${endX}px`;
                    particle.style.top = `${endY}px`;
                    particle.style.opacity = '0';
                }, 10);
            }
            
            // Ensure we create the revive button after the explosion animation completes
            setTimeout(() => {
                console.log('Explosion animation complete, creating revive button');
                createSpinningOrbitWithRevive(centerX, centerY, radius);
            }, 200);
        }

        // Function to create spinning orbit with revive button
        function createSpinningOrbitWithRevive(centerX, centerY, radius) {
            console.log('Creating spinning orbit with revive button');
            // Create a single revive button that spins - positioned exactly where the center element was
            const reviveBtn = document.createElement('div');
            reviveBtn.className = 'revive-button';

            // Get the exact computed dimensions of the center element
            let centerElemSize = { width: '80px', height: '80px' }; // Default fallback

            if (centerElem) {
                // Get the actual computed style of the center element for size only
                const computedStyle = window.getComputedStyle(centerElem);
                
                // Get exact size
                centerElemSize = {
                    width: computedStyle.width,
                    height: computedStyle.height
                };
            }

            // Apply the exact same styling as the center element
            // Use the passed centerX and centerY for position (these are the orbit center coordinates)
            Object.assign(reviveBtn.style, {
                position: 'absolute',
                left: `${centerX}px`,
                top: `${centerY}px`,
                transform: 'translate(-50%, -50%) scale(0)',
                width: centerElemSize.width,
                height: centerElemSize.height,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary-color), #6e45e2)',
                boxShadow: '0 0 20px rgba(110, 69, 226, 0.6), 0 0 40px rgba(110, 69, 226, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: '0',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: '20'
            });

            // Update button size on window resize to match center element
            const updateReviveButtonSize = () => {
                if (centerElem) {
                    const computedStyle = window.getComputedStyle(centerElem);
                    reviveBtn.style.width = computedStyle.width;
                    reviveBtn.style.height = computedStyle.height;
                    
                    // Recalculate center position on resize
                    const { centerX: newCenterX, centerY: newCenterY } = calculateOrbitDimensions();
                    reviveBtn.style.left = `${newCenterX}px`;
                    reviveBtn.style.top = `${newCenterY}px`;
                }
            };

            // Store the resize handler so we can remove it later
            reviveBtn._resizeHandler = updateReviveButtonSize;
            window.addEventListener('resize', updateReviveButtonSize);

            // Add sync icon using Font Awesome
            const syncIcon = document.createElement('i');
            syncIcon.className = 'fas fa-sync';

            // Get the font size from the original center icon
            let iconSize = '32px'; // Default fallback
            if (centerElem) {
                const centerIcon = centerElem.querySelector('i');
                if (centerIcon) {
                    const computedStyle = window.getComputedStyle(centerIcon);
                    iconSize = computedStyle.fontSize;
                }
            }

            // Apply the same size as the original icon
            Object.assign(syncIcon.style, {
                fontSize: iconSize,
                color: 'white',
                animation: 'rotateIcon 20s linear infinite'
            });

            // Update icon size on window resize to match center icon
            const updateIconSize = () => {
                if (centerElem) {
                    const centerIcon = centerElem.querySelector('i');
                    if (centerIcon) {
                        const computedStyle = window.getComputedStyle(centerIcon);
                        syncIcon.style.fontSize = computedStyle.fontSize;
                    }
                }
            };

            // Store the resize handler so we can remove it later
            syncIcon._resizeHandler = updateIconSize;
            window.addEventListener('resize', updateIconSize);

            reviveBtn.appendChild(syncIcon);

            orbit.appendChild(reviveBtn);

            // Create a style element for our animations if it doesn't exist
            if (!document.querySelector('#orbit-animations')) {
                const styleElement = document.createElement('style');
                styleElement.id = 'orbit-animations';
                styleElement.textContent = `
                    @keyframes fastSpin {
                        0% { transform: translate(-50%, -50%) rotate(0deg) scale(0.2); }
                        100% { transform: translate(-50%, -50%) rotate(1800deg) scale(1); }
                    }
                    @keyframes slowSpin {
                        0% { transform: translate(-50%, -50%) rotate(0deg); }
                        100% { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                    @keyframes pulseGlow {
                        0%, 100% { 
                            box-shadow: 0 0 20px rgba(110, 69, 226, 0.6),
                                        0 0 40px rgba(110, 69, 226, 0.3),
                                        inset 0 0 20px rgba(255, 255, 255, 0.1);
                            transform: translate(-50%, -50%) scale(1);
                        }
                        50% { 
                            box-shadow: 0 0 40px rgba(110, 69, 226, 0.8),
                                        0 0 60px rgba(110, 69, 226, 0.4),
                                        inset 0 0 30px rgba(255, 255, 255, 0.2);
                            transform: translate(-50%, -50%) scale(1.05);
                        }
                    }
                    @keyframes rotateIcon {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(styleElement);
            }

            // Re-enable specific interactions now that the revive element is shown
            const overlay = orbit.querySelector('.orbit-overlay');
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }

            // Initial fast spin animation that slows down
            setTimeout(() => {
                reviveBtn.style.opacity = '1';
                reviveBtn.style.animation = 'fastSpin 1.2s cubic-bezier(0.215, 0.610, 0.355, 1.000)';
                
                // After the fast spin completes, switch to slower continuous spin and pulse
                setTimeout(() => {
                    reviveBtn.style.animation = 'slowSpin 10s linear infinite, pulseGlow 3s ease-in-out infinite';
                    
                    // Add click event to revive button
                    reviveBtn.addEventListener('click', () => {
                        // Clean up resize event listeners before removing the button
                        if (reviveBtn._resizeHandler) {
                            window.removeEventListener('resize', reviveBtn._resizeHandler);
                        }
                        if (syncIcon._resizeHandler) {
                            window.removeEventListener('resize', syncIcon._resizeHandler);
                        }
                        
                        // Reset everything
                        resetAnimation(centerX, centerY, radius);
                    });
                }, 1200); // Wait for fast spin to complete
            }, 300);
        }

        
        // Helper function is no longer needed since we handle this directly in the click event
        
        function resetAnimation(centerX, centerY, radius) {
            animationState = 'idle';
            
            // Cleanup all clones, black holes, and particles
            document.querySelectorAll('.orbiter-clone, .black-hole, .black-hole-clone, .explosion-particle, .revive-button').forEach(element => {
                if (element && element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
            
            // Remove any spinning orbit elements
            document.querySelectorAll('.orbit-ring').forEach(ring => {
                if (ring && ring.parentNode) {
                    console.log('Removing orbit ring', ring);
                    ring.parentNode.removeChild(ring);
                }
            });
            
            // Restore the center element
            if (centerElem) {
                console.log('Restoring center element', centerElem);
                centerElem.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                centerElem.style.opacity = '1';
                centerElem.style.transform = 'scale(1)';
                centerElem.style.backgroundColor = '';
                centerElem.style.boxShadow = '';
                centerElem.style.zIndex = '5'; // Reset z-index
                centerElem.style.pointerEvents = 'auto'; // Re-enable click events
                centerElem.style.cursor = 'pointer'; // Restore pointer cursor
                centerElem.style.display = 'flex';
                
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
        
        // Initialize positions and start animation
        requestAnimationFrame(positionOrbiters);
        animate();
        
        // Handle window resize
        window.addEventListener('resize', positionOrbiters);
    }

    // Start initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTechOrbit);
    } else {
        // DOM is already ready
        initializeTechOrbit();
    }
})();