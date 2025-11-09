document.addEventListener('DOMContentLoaded', function() {
    // Get all category buttons and gallery items
    const filterButtons = document.querySelectorAll('.category-btn');
    const galleryContainer = document.getElementById('all-projects-gallery');

    // Initialize category filtering
    function initializeCategoryFiltering() {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the filter value
                const filter = this.getAttribute('data-filter');

                // Remove active class from all buttons and add to clicked button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter gallery items
                filterGalleryItems(filter);
            });
        });
    }

    // Filter gallery items based on category
    function filterGalleryItems(filter) {
        const galleryItems = document.querySelectorAll('#all-projects-gallery .gallery-item');
        
        galleryItems.forEach(item => {
            const categories = item.getAttribute('data-category');
            const categoryList = categories ? categories.split(' ') : [];

            if (filter === 'all' || categoryList.includes(filter)) {
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
    }

    // Handle language switching for category buttons
    function updateCategoryButtonsLanguage() {
        const currentLang = document.documentElement.getAttribute('lang') || 'en';
        
        filterButtons.forEach(button => {
            const text = button.getAttribute(`data-${currentLang}`);
            if (text) {
                button.textContent = text;
            }
        });
    }

    // Listen for language changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'lang') {
                updateCategoryButtonsLanguage();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });

    // Initialize everything
    initializeCategoryFiltering();
    updateCategoryButtonsLanguage();
});