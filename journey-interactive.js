// journey-interactive.js - Complete Interactive Timeline with Mobile Support

class InteractiveJourney {
    constructor() {
        this.currentIndex = 0;
        this.journeyData = [];
        this.isPlaying = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 seconds per milestone
        
        this.init();
    }

    init() {
        if (typeof portfolioData === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        this.setupElements();
        this.transformTimelineData();
        this.createTimeline();
        this.createControls();
        this.setupEventListeners();
        this.updateVisualization();
        
        // Start autoplay (only on desktop by default)
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            this.startAutoPlay();
        } else {
            // On mobile, start paused
            this.isPlaying = false;
            this.updatePlayPauseButton();
        }
        
        // Make journey visible with fade-in
        setTimeout(() => {
            this.journeyWrapper.classList.add('active');
        }, 100);
        
        // Prevent auto-scroll to journey section
        window.scrollTo(0, 0);
    }
    
    setupElements() {
        this.journeyWrapper = document.querySelector('.journey-wrapper');
        this.timelineContainer = document.querySelector('.journey-timeline-track');
        this.progressBar = document.querySelector('.journey-progress-bar');
        this.infoCard = document.querySelector('.journey-info-card');
        this.controlsContainer = document.querySelector('.journey-controls');
    }
    
    transformTimelineData() {
        const timeline = portfolioData.timeline || [];
        
        this.journeyData = timeline.map((item, index) => ({
            id: `milestone-${index}`,
            title: item.title,
            company: item.company,
            year: item.year,
            icon: ['🚀', '💼', '🏗️', '🌟'][index % 4],
            description: item.description,
            technologies: item.technologies || [],
            color: ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7'][index % 4]
        }));
    }
    
    createTimeline() {
        if (!this.timelineContainer) return;
        
        this.timelineContainer.innerHTML = '';
        
        // Create timeline nodes
        this.journeyData.forEach((data, index) => {
            const node = document.createElement('div');
            node.className = 'timeline-node';
            node.dataset.index = index;
            
            // Node content
            node.innerHTML = `
                <div class="node-connector"></div>
                <div class="node-circle" style="background: ${data.color}">
                    <span class="node-icon">${data.icon}</span>
                </div>
                <div class="node-content">
                    <h4 class="node-year">${data.year}</h4>
                    <p class="node-title">${data.title}</p>
                </div>
                <div class="node-pulse"></div>
            `;
            
            // Click handler
            node.addEventListener('click', () => {
                this.goToMilestone(index);
            });
            
            // Hover effects
            node.addEventListener('mouseenter', () => {
                if (index !== this.currentIndex) {
                    node.classList.add('hover');
                }
            });
            
            node.addEventListener('mouseleave', () => {
                node.classList.remove('hover');
            });
            
            this.timelineContainer.appendChild(node);
        });
        
        this.timelineNodes = this.timelineContainer.querySelectorAll('.timeline-node');
    }
    
    createControls() {
        if (!this.controlsContainer) return;
        
        this.controlsContainer.innerHTML = `
            <button class="control-btn" id="prevBtn" title="Previous">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="control-btn" id="playPauseBtn" title="Play/Pause">
                <i class="fas fa-pause"></i>
            </button>
            <button class="control-btn" id="nextBtn" title="Next">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        // Progress indicators
        const indicators = document.createElement('div');
        indicators.className = 'journey-indicators';
        
        this.journeyData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            dot.addEventListener('click', () => this.goToMilestone(index));
            indicators.appendChild(dot);
        });
        
        this.controlsContainer.appendChild(indicators);
        
        this.indicators = indicators.querySelectorAll('.indicator-dot');
    }
    
    setupEventListeners() {
        // Control buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.previousMilestone();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextMilestone();
            });
        }
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.toggleAutoPlay();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isJourneyVisible()) return;
            
            // Only prevent default for specific keys when journey is in view
            switch(e.key) {
                case 'ArrowLeft':
                    if (document.activeElement === document.body) {
                        e.preventDefault();
                        this.previousMilestone();
                    }
                    break;
                case 'ArrowRight':
                    if (document.activeElement === document.body) {
                        e.preventDefault();
                        this.nextMilestone();
                    }
                    break;
                case ' ':
                    if (document.activeElement === document.body) {
                        e.preventDefault();
                        this.toggleAutoPlay();
                    }
                    break;
            }
        });
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Determine if we are in mobile view and the journey section is currently visible
                const isMobileViewport = window.innerWidth <= 1024;
                const journeyVisible = this.isJourneyVisible();

                // Only attempt to scroll the active node into view when the journey section
                // itself is visible. This avoids the page unexpectedly jumping to the journey
                // section on very small screens when the user is at a different position.
                if (isMobileViewport && journeyVisible && this.timelineNodes[this.currentIndex]) {
                    this.scrollNodeIntoView(this.timelineNodes[this.currentIndex]);
                }

                // Adjust autoplay based on screen size
                if (isMobileViewport && this.isPlaying) {
                    this.stopAutoPlay();
                }
            }, 250);
        });
        
        // Touch support with swipe gestures
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.journeyWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        this.journeyWrapper.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Determine if it's a horizontal or vertical swipe
            const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
            const minSwipeDistance = 50;
            
            if (isHorizontalSwipe && Math.abs(diffX) > minSwipeDistance && !this.isAnimating) {
                if (diffX > 0) {
                    // Swipe left - next
                    this.nextMilestone();
                } else {
                    // Swipe right - previous
                    this.previousMilestone();
                }
            }
        }, { passive: true });
        
        // Pause on hover
        this.journeyWrapper.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.pauseAutoPlay(true); // Temporary pause
            }
        });
        
        this.journeyWrapper.addEventListener('mouseleave', () => {
            if (this.isPlaying && this.autoPlayInterval === null) {
                this.startAutoPlay(); // Resume if it was playing
            }
        });
    }
    
    goToMilestone(index) {
        if (index === this.currentIndex || index < 0 || index >= this.journeyData.length) {
            return;
        }
        
        this.currentIndex = index;
        this.updateVisualization();
        
        // Reset autoplay timer if playing
        if (this.isPlaying) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }
    
    previousMilestone() {
        if (this.currentIndex > 0) {
            this.goToMilestone(this.currentIndex - 1);
        } else {
            this.goToMilestone(this.journeyData.length - 1); // Loop to end
        }
    }
    
    nextMilestone() {
        if (this.currentIndex < this.journeyData.length - 1) {
            this.goToMilestone(this.currentIndex + 1);
        } else {
            this.goToMilestone(0); // Loop to start
        }
    }
    
    updateVisualization() {
        const currentData = this.journeyData[this.currentIndex];
        
        // Update progress bar
        if (this.progressBar) {
            const progress = ((this.currentIndex + 1) / this.journeyData.length) * 100;
            this.progressBar.style.width = `${progress}%`;
            this.progressBar.style.background = currentData.color;
        }
        
        // Update timeline nodes
        this.timelineNodes.forEach((node, index) => {
            node.classList.remove('active', 'past', 'future');
            
            if (index < this.currentIndex) {
                node.classList.add('past');
            } else if (index === this.currentIndex) {
                node.classList.add('active');
                // Scroll node into view
                this.scrollNodeIntoView(node);
            } else {
                node.classList.add('future');
            }
        });
        
        // Update indicators
        this.indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
            dot.classList.toggle('past', index < this.currentIndex);
        });
        
        // Update info card with animation
        this.updateInfoCard(currentData);
        
        // Update control buttons state
        this.updateControlsState();
    }
    
    scrollNodeIntoView(node) {
        // Check if mobile view
        const isMobile = window.innerWidth <= 1024;
        
        if (isMobile) {
            // For mobile/tablet grid layout, ensure the node is visible
            const nodeRect = node.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const headerHeight = 80; // Approximate header height
            const controlsHeight = 80; // Approximate controls height
            
            // Check if node is fully visible
            const nodeTop = nodeRect.top;
            const nodeBottom = nodeRect.bottom;
            const visibleTop = headerHeight;
            const visibleBottom = windowHeight - controlsHeight;
            
            if (nodeTop < visibleTop || nodeBottom > visibleBottom) {
                // Scroll to center the node in the visible area
                const nodeCenter = nodeTop + nodeRect.height / 2;
                const visibleCenter = (visibleTop + visibleBottom) / 2;
                const scrollOffset = nodeCenter - visibleCenter;
                
                window.scrollBy({
                    top: scrollOffset,
                    behavior: 'smooth'
                });
            }
        } else {
            // For desktop, use horizontal scrolling
            const container = this.timelineContainer;
            const nodeRect = node.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            const nodeCenter = nodeRect.left + nodeRect.width / 2;
            const containerCenter = containerRect.left + containerRect.width / 2;
            const scrollOffset = nodeCenter - containerCenter;
            
            container.scrollBy({
                left: scrollOffset,
                behavior: 'smooth'
            });
        }
    }
    
    updateInfoCard(data) {
        if (!this.infoCard) return;
        
        const isMobile = window.innerWidth <= 768;
        
        // Fade out
        this.infoCard.style.opacity = '0';
        this.infoCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // On mobile, show more compact info directly in the card
            if (isMobile) {
                this.infoCard.innerHTML = `
                    <div class="info-header" style="border-color: ${data.color}">
                        <div class="info-icon" style="background: ${data.color}">${data.icon}</div>
                        <div class="info-meta">
                            <h3 class="info-title">${data.title}</h3>
                            <p class="info-company">${data.company} • ${data.year}</p>
                        </div>
                    </div>
                    <div class="info-body">
                        <p class="info-description">${data.description}</p>
                        <div class="info-technologies">
                            ${data.technologies.slice(0, 4).map(tech => 
                                `<span class="tech-chip" style="background: ${data.color}20; color: ${data.color}">${tech}</span>`
                            ).join('')}
                        </div>
                        ${data.technologies.length > 4 ? `
                            <div class="info-more-tech">+${data.technologies.length - 4} more technologies</div>
                        ` : ''}
                    </div>
                `;
            } else {
                // Desktop version with explore button
                this.infoCard.innerHTML = `
                    <div class="info-header" style="border-color: ${data.color}">
                        <div class="info-icon" style="background: ${data.color}">${data.icon}</div>
                        <div class="info-meta">
                            <h3 class="info-title">${data.title}</h3>
                            <p class="info-company">${data.company} • ${data.year}</p>
                        </div>
                    </div>
                    <div class="info-body">
                        <p class="info-description">${data.description}</p>
                        <div class="info-technologies">
                            ${data.technologies.map(tech => 
                                `<span class="tech-chip" style="background: ${data.color}20; color: ${data.color}">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="info-footer">
                        <button class="explore-btn" onclick="openJourneyModal()" style="background: ${data.color}">
                            Explore Details <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                `;
            }
            
            // Fade in
            this.infoCard.style.opacity = '1';
            this.infoCard.style.transform = 'translateY(0)';
        }, 300);
    }
    
    updateControlsState() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.disabled = false; // Always enabled with loop
        }
        
        if (nextBtn) {
            nextBtn.disabled = false; // Always enabled with loop
        }
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.isPlaying = true;
        this.updatePlayPauseButton();
        
        this.autoPlayInterval = setInterval(() => {
            this.nextMilestone();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }
    
    pauseAutoPlay(temporary = false) {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        if (!temporary) {
            this.isPlaying = false;
            this.updatePlayPauseButton();
        }
    }
    
    toggleAutoPlay() {
        if (this.isPlaying) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }
    
    updatePlayPauseButton() {
        const btn = document.getElementById('playPauseBtn');
        if (btn) {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
            }
        }
    }
    
    isJourneyVisible() {
        const rect = this.journeyWrapper.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// Modal function (reuse existing modal structure)
window.openJourneyModal = function() {
    const journey = window.interactiveJourney;
    if (!journey) return;
    
    const data = journey.journeyData[journey.currentIndex];
    const modal = document.getElementById('journeyModal');
    const modalHeader = document.getElementById('modalHeader');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !data) return;
    
    modalHeader.innerHTML = `
        <div class="modal-journey-header" style="background: linear-gradient(135deg, ${data.color}, ${data.color}dd)">
            <div class="modal-icon">${data.icon}</div>
            <div class="modal-info">
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-meta">${data.company} • ${data.year}</p>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = `
        <div class="modal-section">
            <h4>About This Role</h4>
            <p>${data.description}</p>
        </div>
        <div class="modal-section">
            <h4>Technologies & Skills</h4>
            <div class="modal-tech-grid">
                ${data.technologies.map(tech => 
                    `<div class="modal-tech-item" style="border-color: ${data.color}">
                        <i class="fas fa-check-circle" style="color: ${data.color}"></i>
                        ${tech}
                    </div>`
                ).join('')}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
};

window.closeJourneyModal = function() {
    const modal = document.getElementById('journeyModal');
    if (modal) {
        modal.classList.remove('active');
    }
};

// Initialize
window.interactiveJourney = new InteractiveJourney();