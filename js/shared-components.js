/**
 * Shared Components for Unified Project Cards and Modals
 * This file contains reusable functions for creating consistent project cards and modals across all service pages
 * Based on the All Projects page design and functionality
 */

// Get current language
function getCurrentLanguage() {
    return document.documentElement.getAttribute('lang') || 'en';
}

/**
 * Create unified project card HTML
 * This is the standard card template used across all pages
 * @param {Object} project - Project object from unified data
 * @returns {string} HTML string for the project card
 */
function createUnifiedProjectCard(project) {
    const currentLang = getCurrentLanguage();
    
    // Support multiple categories
    const categories = project.categories && Array.isArray(project.categories) 
        ? project.categories.join(' ') 
        : project.category;
        
    return `
        <div class="gallery-item" data-category="${categories}" data-project-id="${project.id}">
            <img src="${project.thumbnail}" alt="${project.title[currentLang]}" loading="lazy">
            <div class="video-title-overlay">
                <h3>${project.title[currentLang]}</h3>
                ${project.categoryLabel ? `<p class="category-tag">${typeof project.categoryLabel === 'object' ? project.categoryLabel[currentLang] : (currentLang === 'ar' ? project.categoryLabelAr : project.categoryLabel)}</p>` : ''}
            </div>
        </div>
    `;
}

/**
 * Get service category class for project modal styling
 * Each service has its own background color
 * @param {Object} project - Project object
 * @returns {string} CSS class name for styling
 */
function getCategoryClass(project) {
    if (project.categories && Array.isArray(project.categories)) {
        // Use the first category for styling
        return project.categories[0].toLowerCase().replace(/\s+/g, '-');
    } else if (project.category) {
        return project.category.toLowerCase().replace(/\s+/g, '-');
    }
    return '';
}

/**
 * Apply project-specific colors to modal
 * This handles the custom color schemes for specific projects
 * @param {HTMLElement} modalElement - The modal content element
 * @param {Object} project - Project object
 */
function applyProjectColors(modalElement, project) {
    // Remove any existing color classes
    modalElement.classList.remove('nissan-colors', 'blue-arch-colors', 'ac-colors');
    
    // Apply specific colors based on project ID
    switch(project.id) {
        case 'nissan-commercial':
            // Red theme for Nissan
            modalElement.style.setProperty('background', '#c3002f', 'important');
            modalElement.style.setProperty('color', '#ffffff', 'important');
            // Add CSS class for scrollbar styling
            modalElement.closest('.video-modal').classList.add('nissan-portfolio-modal');
            break;
            
        case 'blue-arch-ramadan':
            // White theme for Blue Arch
            modalElement.style.setProperty('background', 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 'important');
            modalElement.style.setProperty('color', '#212529', 'important');
            // Add CSS class for scrollbar styling
            modalElement.closest('.video-modal').classList.add('blue-arch-portfolio-modal');
            break;
            
        case 'ac-social-media':
            // Black theme for A&C
            modalElement.style.setProperty('background', 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', 'important');
            modalElement.style.setProperty('color', '#ffffff', 'important');
            // Add CSS class for scrollbar styling
            modalElement.closest('.video-modal').classList.add('ac-portfolio-modal');
            break;
            
        case 'happy-cloud-perfume':
            // White theme for Happy Cloud
            modalElement.style.setProperty('background', 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', 'important');
            modalElement.style.setProperty('color', '#212529', 'important');
            // Add CSS class for scrollbar styling
            modalElement.closest('.video-modal').classList.add('happy-cloud-portfolio-modal');
            break;
            
        case 'banafa-for-oud':
            // Black theme for Banafa for Oud
            modalElement.style.setProperty('background', '#000000', 'important');
            modalElement.style.setProperty('color', '#ffffff', 'important');
            // Add CSS class for white scrollbar styling
            modalElement.closest('.video-modal').classList.add('banafa-portfolio-modal');
            break;
            
        case 'pizza-menu-photography':
            // Red theme for Pizza Menu Photography
            modalElement.style.setProperty('background', '#ef2d14', 'important');
            modalElement.style.setProperty('color', '#ffffff', 'important');
            // Add CSS class for white scrollbar styling
            modalElement.closest('.video-modal').classList.add('pizza-portfolio-modal');
            break;
            
        default:
            // Keep default service category colors for other projects
            break;
    }
}

/**
 * Open unified project modal
 * This is the standard modal system used across all pages
 * @param {Object} project - Project object from unified data
 * @param {boolean} updateURL - Whether to update the URL (default: true)
 */
function openUnifiedProjectModal(project, updateURL = true) {
    const currentLang = getCurrentLanguage();
    
    // Update URL if requested
    if (updateURL) {
        const newURL = new URL(window.location);
        newURL.searchParams.set('project', project.id);
        window.history.pushState({ projectId: project.id }, '', newURL);
    }
    
    // Check if project has modal content
    if (!project.modalContent || (!project.modalContent[currentLang] && !project.modalContent.images && !project.modalContent.videos)) {
        console.warn('No modal content available for project:', project.id);
        return;
    }
    
    // Get modal content
    let modalBodyContent = '';
    if (project.modalContent[currentLang]) {
        modalBodyContent = project.modalContent[currentLang];
    } else if (project.modalContent.images || project.modalContent.videos) {
        // Handle image/video format
        modalBodyContent = '<div class="portfolio-container">';
        
        // Add images
        if (project.modalContent.images && project.modalContent.images.length > 0) {
            project.modalContent.images.forEach(image => {
                modalBodyContent += `<img src="${image}" alt="${project.title[currentLang]}" class="full-width-image">`;
            });
        }
        
        // Add videos
        if (project.modalContent.videos && project.modalContent.videos.length > 0) {
            project.modalContent.videos.forEach(video => {
                modalBodyContent += `
                    <div class="video-container">
                        <iframe src="${video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                    </div>
                `;
            });
        }
        
        // Add additional images
        if (project.modalContent.additionalImages && project.modalContent.additionalImages.length > 0) {
            project.modalContent.additionalImages.forEach(image => {
                modalBodyContent += `<img src="${image}" alt="${project.title[currentLang]}" class="full-width-image">`;
            });
        }
        
        modalBodyContent += '</div>';
    } else {
        modalBodyContent = `<p>${project.description[currentLang] || 'No content available'}</p>`;
    }
    
    // Get service category class for project modal styling
    const categoryClass = getCategoryClass(project);
    
    // Special handling for Banafa for Oud to position first image at the top
    let topImageContent = '';
    let finalModalBodyContent = modalBodyContent;
    
    if (project.id === 'banafa-for-oud') {
        // Extract the first image for top positioning
        const firstImageMatch = modalBodyContent.match(/<img[^>]*src="([^"]*)"[^>]*class="full-width-image"[^>]*>/);
        const firstImageTag = firstImageMatch ? firstImageMatch[0] : '';
        
        if (firstImageTag) {
            topImageContent = `<div class="top-image-container">${firstImageTag}</div>`;
            // Remove the first image from the modal body content
            finalModalBodyContent = modalBodyContent.replace(firstImageTag, '');
        }
    }
    
    // Create project modal HTML with service-specific background color
    const modalHTML = `
        <div class="video-modal" id="project-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content ${categoryClass}">
                <button class="modal-close" onclick="closeUnifiedProjectModal()">&times;</button>
                ${topImageContent}
                <div class="modal-body">
                    ${finalModalBodyContent}
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Apply project-specific colors to the modal
    const modalContent = document.querySelector('#project-modal .modal-content');
    applyProjectColors(modalContent, project);
    
    // Add event listeners
    const modal = document.getElementById('project-modal');
    const overlay = modal.querySelector('.modal-overlay');
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeUnifiedProjectModal();
        }
    });
    
    // Close on escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeUnifiedProjectModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

/**
 * Close unified project modal and clean up URL state
 * This is the standard modal close function used across all pages
 */
function closeUnifiedProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
        
        // Remove project parameter from URL for clean sharing
        const newURL = new URL(window.location);
        newURL.searchParams.delete('project');
        window.history.pushState({}, '', newURL);
    }
}

/**
 * Setup unified project card click handlers
 * This function sets up click handlers for project cards to open modals
 * @param {string} gallerySelector - CSS selector for the gallery container
 * @param {Array} projects - Array of project objects
 */
function setupUnifiedCardClickHandlers(gallerySelector, projects) {
    document.querySelectorAll(`${gallerySelector} .gallery-item`).forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            const project = projects.find(p => p.id === projectId);
            
            if (project && project.modalContent) {
                openUnifiedProjectModal(project);
            }
        });
    });
}

/**
 * Check URL parameters for direct project modal opening from shareable links
 * @param {Array} projects - Array of project objects to search through
 */
function checkURLForUnifiedModal(projects) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    if (projectId) {
        const project = projects.find(p => p.id === projectId);
        
        if (project && project.modalContent) {
            openUnifiedProjectModal(project, false); // Don't update URL since we're opening from URL
        }
    }
}

/**
 * Setup unified browser navigation handlers
 * This handles browser back/forward buttons for modal state
 */
function setupUnifiedNavigationHandlers() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        const modal = document.getElementById('project-modal');
        if (modal) {
            closeUnifiedProjectModal();
        }
    });
}

/**
 * Get projects from unified data source
 * This is the standard way to access project data across all pages
 * @param {string|Array} filterBy - Category to filter by, or array of categories (optional)
 * @returns {Array} Array of filtered project objects
 */
function getProjectsFromUnifiedData(filterBy = null) {
    if (!window.unifiedProjectsData) {
        console.error('Unified projects data not available');
        return [];
    }

    if (!window.unifiedProjectsData.projects || !Array.isArray(window.unifiedProjectsData.projects)) {
        console.error('Projects array not found in unified data');
        return [];
    }

    let projects = window.unifiedProjectsData.projects.filter(project => {
        return project.id && project.title && project.thumbnail;
    });

    // Apply filter if specified
    if (filterBy) {
        const filters = Array.isArray(filterBy) ? filterBy : [filterBy];
        projects = projects.filter(project => {
            // First check serviceTags for service-specific filtering
            if (project.serviceTags && Array.isArray(project.serviceTags)) {
                const serviceMatch = filters.some(filter => 
                    project.serviceTags.some(serviceTag => 
                        serviceTag && serviceTag.toLowerCase().includes(filter.toLowerCase())
                    )
                );
                if (serviceMatch) return true;
            }
            
            // Fallback to categories for general filtering
            const projectCategories = project.categories && Array.isArray(project.categories) 
                ? project.categories 
                : [project.category];
            
            return filters.some(filter => 
                projectCategories.some(category => 
                    category && category.toLowerCase().includes(filter.toLowerCase())
                )
            );
        });
    }

    console.log(`Loaded ${projects.length} projects from unified data${filterBy ? ` (filtered by: ${filterBy})` : ''}`);
    return projects;
}

// Make functions globally available
window.createUnifiedProjectCard = createUnifiedProjectCard;
window.openUnifiedProjectModal = openUnifiedProjectModal;
window.closeUnifiedProjectModal = closeUnifiedProjectModal;
window.setupUnifiedCardClickHandlers = setupUnifiedCardClickHandlers;
window.checkURLForUnifiedModal = checkURLForUnifiedModal;
window.setupUnifiedNavigationHandlers = setupUnifiedNavigationHandlers;
window.getProjectsFromUnifiedData = getProjectsFromUnifiedData;