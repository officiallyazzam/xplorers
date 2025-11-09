/**
 * Content Strategy Page
 * Updated to use unified components and data source
 */

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('project-gallery');
    
    // Get current language
    function getCurrentLanguage() {
        return document.documentElement.getAttribute('lang') || 'en';
    }

    // Render content strategy projects using unified components
    function renderContentStrategyProjects() {
        console.log('renderContentStrategyProjects called');
        if (!gallery) {
            console.error('Project gallery element not found');
            return;
        }

        // Get content strategy projects from unified data source
        const contentStrategyProjects = getProjectsFromUnifiedData('content strategy');
        console.log('Content strategy projects:', contentStrategyProjects);
        
        // Render project cards using unified template
        const projectHTML = contentStrategyProjects.map(createUnifiedProjectCard).join('');
        console.log('Generated HTML length:', projectHTML.length);
        gallery.innerHTML = projectHTML;

        // Setup click handlers using unified system
        setupUnifiedCardClickHandlers('#project-gallery', contentStrategyProjects);
        
        // Check URL for direct modal opening
        checkURLForUnifiedModal(contentStrategyProjects);
    }

    // Update gallery on language change
    function updateGalleryLanguage() {
        renderContentStrategyProjects();
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

    // Initialize the Content Strategy page
    function initializeContentStrategyPage() {
        // Setup unified navigation handlers
        setupUnifiedNavigationHandlers();
        
        // Initial render of content strategy projects
        renderContentStrategyProjects();
    }

    // Wait for unified data source to be loaded, then initialize
    function waitForDataSources() {
        const checkDataSources = () => {
            // Check if unified projects data exists
            if (window.unifiedProjectsData && window.unifiedProjectsData.projects) {
                console.log('Unified data found, initializing content strategy page...');
                initializeContentStrategyPage();
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