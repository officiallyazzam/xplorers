/**
 * Social Media Campaign Page
 * Updated to use unified components and data source
 */

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('project-gallery');
    
    // Get current language
    function getCurrentLanguage() {
        return document.documentElement.getAttribute('lang') || 'en';
    }

    // Render social media campaign projects using unified components
    function renderSocialMediaProjects() {
        console.log('renderSocialMediaProjects called');
        if (!gallery) {
            console.error('Project gallery element not found');
            return;
        }

        // Get social media campaign projects from unified data source
        const socialMediaProjects = getProjectsFromUnifiedData('social media campaign');
        console.log('Social media campaign projects:', socialMediaProjects);
        
        // Render project cards using unified template
        const projectHTML = socialMediaProjects.map(createUnifiedProjectCard).join('');
        console.log('Generated HTML length:', projectHTML.length);
        gallery.innerHTML = projectHTML;

        // Setup click handlers using unified system
        setupUnifiedCardClickHandlers('#project-gallery', socialMediaProjects);
        
        // Check URL for direct modal opening
        checkURLForUnifiedModal(socialMediaProjects);
    }

    // Update gallery on language change
    function updateGalleryLanguage() {
        renderSocialMediaProjects();
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

    // Initialize the Social Media Campaign page
    function initializeSocialMediaCampaignPage() {
        // Setup unified navigation handlers
        setupUnifiedNavigationHandlers();
        
        // Initial render of social media campaign projects
        renderSocialMediaProjects();
    }

    // Wait for unified data source to be loaded, then initialize
    function waitForDataSources() {
        const checkDataSources = () => {
            // Check if unified projects data exists
            if (window.unifiedProjectsData && window.unifiedProjectsData.projects) {
                console.log('Unified data found, initializing social media campaign page...');
                initializeSocialMediaCampaignPage();
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