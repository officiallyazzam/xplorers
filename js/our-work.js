// Our Work Page - Optimized for Performance
// Simplified version without heavy data dependencies

document.addEventListener('DOMContentLoaded', function() {

    // Get all project cards
    const projectCards = document.querySelectorAll('.gallery-item');

    // Setup click handlers for project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const projectId = this.getAttribute('data-project-id');
            const routes = {
                "1": 'brand-identity.html',
                "4": 'videoproduction.html', 
                "5": 'content-strategy.html',
                "7": 'social-media-campaign.html',
                "9": 'professional-photography.html',
                "all": 'all-projects.html'
            };
            
            const url = routes[projectId] || `project.html?id=${projectId}`;
            window.location.href = url;
        });
    });

    // Setup category filter functionality
    const filterButtons = document.querySelectorAll('.category-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects efficiently
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;
                
                card.style.display = shouldShow ? 'block' : 'none';
            });
        });
    });
});