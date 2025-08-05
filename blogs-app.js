// blogs-app.js - Blogs Page Dynamic Content

document.addEventListener('DOMContentLoaded', function() {
    initializeBlogsPage();
});

function initializeBlogsPage() {
    // Check if portfolioData is available
    if (typeof portfolioData === 'undefined') {
        console.error('Portfolio data not found. Please ensure data.js is loaded.');
        return;
    }

    portfolioApp.populateHeader();
    portfolioApp.populateFooter();
    
    // Initialize blogs content (this will be handled by blogs.js)
    // We're keeping this script minimal to avoid conflicts
    
    document.title = `Blogs - ${portfolioData.personal.name}`;
    
    // Set current year in footer if element exists
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}
