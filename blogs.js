document.addEventListener('DOMContentLoaded', () => {
    const blogGrid = document.getElementById('blogGrid');
    // Select the parent container of blogGrid (inside main.blogs-page)
    const container = blogGrid ? blogGrid.parentElement : null;

    if (blogGrid && container && portfolioData.blogs) {
        // Get unique categories
        const categories = [...new Set(portfolioData.blogs.map(blog => blog.category))];

        // Create category filter buttons
        const filterContainer = document.createElement('div');
        filterContainer.className = 'blog-filters';
        filterContainer.innerHTML = '<button class="filter-btn active" data-category="all">All</button>';
        
        categories.forEach(category => {
            const filterBtn = document.createElement('button');
            filterBtn.className = 'filter-btn';
            filterBtn.textContent = category;
            filterBtn.setAttribute('data-category', category);
            filterContainer.appendChild(filterBtn);
        });

        // Insert filter container before blog grid
        container.insertBefore(filterContainer, blogGrid);

        // Function to display blogs based on category
        function displayBlogs(category) {
            blogGrid.innerHTML = '';
            
            const filteredBlogs = category === 'all' 
                ? portfolioData.blogs 
                : portfolioData.blogs.filter(blog => blog.category === category);

            filteredBlogs.forEach(blog => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card';

                blogCard.innerHTML = `
                    <div class="blog-card-content">
                        <h3 class="blog-card-title">${blog.title}</h3>
                        <p class="blog-card-description">${blog.description}</p>
                        <a href="${blog.url}" target="_blank" class="blog-card-link">Read More &rarr;</a>
                    </div>
                `;

                // Make the entire card clickable to open the URL in a new tab
                blogCard.addEventListener('click', (e) => {
                    // Don't open link if user clicked on the 'Read More' link or its children
                    if (e.target.closest('.blog-card-link')) return;
                    
                    window.open(blog.url, '_blank');
                });

                blogGrid.appendChild(blogCard);
            });
        }

        // Display all blogs initially
        displayBlogs('all');

        // Add event listeners to filter buttons
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Display blogs for the selected category
                const category = button.getAttribute('data-category');
                displayBlogs(category);
            });
        });
    }
});

// Function to fetch blog details from external URLs
async function fetchBlogDetails(url) {
    // For now, return mock data for Medium posts
    // In a real implementation, you would use a proxy or backend service to fetch and parse the URL
    if (url.includes('medium.com')) {
        return {
            title: 'Fetched from Medium',
            excerpt: 'This is a placeholder description for a blog post fetched from Medium.',
            image: 'images/medium-placeholder.jpg'
        };
    }
    
    // Return empty object for other URLs or if fetching fails
    return {};
}
