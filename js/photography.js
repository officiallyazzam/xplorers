/**
 * Professional Photography Page
 * Updated to use unified components and data source
 */

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('photography-gallery');
    
    // Get current language
    function getCurrentLanguage() {
        return document.documentElement.getAttribute('lang') || 'en';
    }

    // Render photography projects using unified components
    function renderPhotographyProjects() {
        console.log('renderPhotographyProjects called');
        if (!gallery) {
            console.error('Photography gallery element not found');
            return;
        }

        // Get photography projects from unified data source
        const photographyProjects = getProjectsFromUnifiedData('professional photography');
        console.log('Photography projects:', photographyProjects);
        
        // Render project cards using unified template
        const projectHTML = photographyProjects.map(createUnifiedProjectCard).join('');
        console.log('Generated HTML length:', projectHTML.length);
        gallery.innerHTML = projectHTML;

        // Setup click handlers using unified system
        setupUnifiedCardClickHandlers('#photography-gallery', photographyProjects);
        
        // Check URL for direct modal opening
        checkURLForUnifiedModal(photographyProjects);
    }

    // Update gallery on language change
    function updateGalleryLanguage() {
        renderPhotographyProjects();
    }

    // Listen for language changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'lang') {
                updateGalleryLanguage();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
    });

    // Initialize the Professional Photography page
    function initializePhotographyPage() {
        // Setup unified navigation handlers
        setupUnifiedNavigationHandlers();
        
        // Initial render of photography projects
        renderPhotographyProjects();
    }

    // Wait for unified data source to be loaded, then initialize
    function waitForDataSources() {
        const checkDataSources = () => {
            // Check if unified projects data exists
            if (window.unifiedProjectsData && window.unifiedProjectsData.projects) {
                console.log('Unified data found, initializing photography page...');
                initializePhotographyPage();
            } else {
                console.log('Waiting for unified data...');
                // Wait a bit more for unified data to load
                setTimeout(checkDataSources, 100);
            }
        };
        
        checkDataSources();
    }

    // Start the initialization process
    waitForDataSources();
});