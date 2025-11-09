/**
 * Brand Identity Page
 * Updated to use unified components and data source
 */

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('project-gallery');
    
    // Get current language
    function getCurrentLanguage() {
        return document.documentElement.getAttribute('lang') || 'en';
    }

    // Render brand identity projects using unified components
    function renderBrandIdentityProjects() {
        console.log('renderBrandIdentityProjects called');
        if (!gallery) {
            console.error('Project gallery element not found');
            return;
        }

        // Get brand identity projects from unified data source
        const brandIdentityProjects = getProjectsFromUnifiedData('brand identity');
        console.log('Brand identity projects:', brandIdentityProjects);
        
        // Render project cards using unified template
        const projectHTML = brandIdentityProjects.map(createUnifiedProjectCard).join('');
        console.log('Generated HTML length:', projectHTML.length);
        gallery.innerHTML = projectHTML;

        // Setup click handlers using unified system
        setupUnifiedCardClickHandlers('#project-gallery', brandIdentityProjects);
        
        // Check URL for direct modal opening
        checkURLForUnifiedModal(brandIdentityProjects);
    }

    // Update gallery on language change
    function updateGalleryLanguage() {
        renderBrandIdentityProjects();
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

    // Initialize the Brand Identity page
    function initializeBrandIdentityPage() {
        // Setup unified navigation handlers
        setupUnifiedNavigationHandlers();
        
        // Initial render of brand identity projects
        renderBrandIdentityProjects();
    }

    // Wait for unified data source to be loaded, then initialize
    function waitForDataSources() {
        const checkDataSources = () => {
            // Check if unified projects data exists
            if (window.unifiedProjectsData && window.unifiedProjectsData.projects) {
                console.log('Unified data found, initializing brand identity page...');
                initializeBrandIdentityPage();
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