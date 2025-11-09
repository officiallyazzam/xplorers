/**
 * Video Production Page
 * Updated to use unified components and data source
 */

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('video-gallery');
    
    // Get current language
    function getCurrentLanguage() {
        return document.documentElement.getAttribute('lang') || 'en';
    }

    // Render video production projects using unified components
    function renderVideoProjects() {
        console.log('renderVideoProjects called');
        if (!gallery) {
            console.error('Video gallery element not found');
            return;
        }

        // Get video production projects from unified data source
        const videoProjects = getProjectsFromUnifiedData('video production');
        console.log('Video production projects:', videoProjects);
        
        // Render project cards using unified template
        const projectHTML = videoProjects.map(createUnifiedProjectCard).join('');
        console.log('Generated HTML length:', projectHTML.length);
        gallery.innerHTML = projectHTML;

        // Setup click handlers using unified system
        setupUnifiedCardClickHandlers('#video-gallery', videoProjects);
        
        // Check URL for direct modal opening
        checkURLForUnifiedModal(videoProjects);
    }

    // Update gallery on language change
    function updateGalleryLanguage() {
        renderVideoProjects();
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

    // Initialize the Video Production page
    function initializeVideoProductionPage() {
        // Setup unified navigation handlers
        setupUnifiedNavigationHandlers();
        
        // Initial render of video production projects
        renderVideoProjects();
    }

    // Wait for unified data source to be loaded, then initialize
    function waitForDataSources() {
        const checkDataSources = () => {
            // Check if unified projects data exists
            if (window.unifiedProjectsData && window.unifiedProjectsData.projects) {
                console.log('Unified data found, initializing video production page...');
                initializeVideoProductionPage();
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