document.addEventListener('DOMContentLoaded', function() {
    const orbit = document.querySelector('.tech-orbit');
    const orbiters = document.querySelectorAll('.tech-orbiter');

    if (!orbit) {
        console.error('CRITICAL: Tech orbit element (.tech-orbit) not found in the DOM. Revolving icons will not work.');
        return; 
    }

    console.log('Tech orbit element found. Initializing hover listeners.');

    function pauseOrbitAnimation() {
        orbit.classList.add('paused');
    }

    function resumeOrbitAnimation() {
        orbit.classList.remove('paused');
    }

    // Pause animation when mouse enters the main orbit container
    orbit.addEventListener('mouseenter', pauseOrbitAnimation);
    orbit.addEventListener('mouseleave', resumeOrbitAnimation);

    // Also pause animation when mouse enters an individual tech icon (orbiter)
    // and resume when it leaves that icon (unless the mouse is still over the main orbit area)
    orbiters.forEach(orbiter => {
        orbiter.addEventListener('mouseenter', pauseOrbitAnimation);
        // No need for mouseleave on orbiter to resume, as mouseleave on orbit container handles it.
        // If mouse leaves an orbiter but is still within .tech-orbit, it should remain paused.
    });

    console.log('Tech orbit hover listeners initialized.');
});
