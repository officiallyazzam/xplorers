document.addEventListener('DOMContentLoaded', function() {
    // Get the video categories container
    const videoCategoriesDiv = document.querySelector('.video-categories');
    
    // Only initialize if we're on a video production project page
    if (!videoCategoriesDiv) return;

    // Show video categories section if this is a video production project
    const projectContentContainer = document.querySelector('.project-content');
    if (projectContentContainer.getAttribute('data-project-type') === 'video-production') {
        videoCategoriesDiv.style.display = 'block';
    }

    // Get all category buttons and gallery items
    const filterButtons = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the filter value
            const filter = this.getAttribute('data-filter');

            // Remove active class from all buttons and add to clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter gallery items with animation
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Handle language switching
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'lang') {
                // Update button text based on language
                filterButtons.forEach(btn => {
                    const lang = document.documentElement.getAttribute('lang') || 'en';
                    const translatedText = btn.getAttribute(`data-${lang}`);
                    if (translatedText) {
                        btn.textContent = translatedText;
                    }
                });
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });

    // Initial language update
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    filterButtons.forEach(btn => {
        const translatedText = btn.getAttribute(`data-${currentLang}`);
        if (translatedText) {
            btn.textContent = translatedText;
        }
    });
});