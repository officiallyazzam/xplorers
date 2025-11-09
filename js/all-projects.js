document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('all-projects-gallery');
    const filterButtons = document.querySelectorAll('.category-btn');
    
    let currentFilter = 'all';

    // Get current language
    function getCurrentLanguage() {
        return document.documentElement.getAttribute('lang') || 'en';
    }

    // Create project card HTML for All Projects overview page
    // Note: This page aggregates projects from all service pages (Video Production, Photography, Social Media Campaign)
    function createProjectCard(project) {
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

    // Filter projects by service category (Video Production, Photography, Social Media Campaign)
    function filterProjects(category) {
        currentFilter = category;
        const projectCards = document.querySelectorAll('#all-projects-gallery .gallery-item');
        
        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category').split(' ');
            const shouldShow = category === 'all' || cardCategories.includes(category);
            
            if (shouldShow) {
                card.style.display = 'block';
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });

        // Update active filter button
        updateActiveFilterButton(category);
    }

    // Update active filter button
    function updateActiveFilterButton(activeCategory) {
        const filterButtons = document.querySelectorAll('.category-btn');
        filterButtons.forEach(btn => {
            const btnCategory = btn.getAttribute('data-filter');
            if (btnCategory === activeCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Setup category filter buttons
    function setupCategoryFilters() {
        const filterButtons = document.querySelectorAll('.category-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-filter');
                filterProjects(category);
            });
        });
    }

    // Get projects directly from unified data source
    function getProjectsFromUnifiedData() {
        if (!window.unifiedProjectsData) {
            console.error('Unified projects data not available');
            return [];
        }

        // The unified data has projects directly in the projects array
        if (!window.unifiedProjectsData.projects || !Array.isArray(window.unifiedProjectsData.projects)) {
            console.error('Projects array not found in unified data');
            return [];
        }

        // Filter and validate projects
        const validProjects = window.unifiedProjectsData.projects.filter(project => {
            return project.id && project.title && project.thumbnail;
        });

        console.log('Loaded projects from unified data:', validProjects.length);
        return validProjects;
    }

    // Render all projects from unified data source
    function renderAllProjects() {
        console.log('renderAllProjects called');
        if (!gallery) {
            console.error('Gallery element not found');
            return;
        }

        // Get projects directly from unified data source
        const aggregatedProjects = getProjectsFromUnifiedData();
        console.log('Aggregated projects:', aggregatedProjects);
        
        // Render project cards for All Projects overview page
        const projectHTML = aggregatedProjects.map(createProjectCard).join('');
        console.log('Generated HTML length:', projectHTML.length);
        gallery.innerHTML = projectHTML;

        // Setup click handlers for project cards to open project modal pop-ups
        document.querySelectorAll('#all-projects-gallery .gallery-item').forEach(card => {
            card.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project-id');
                const project = aggregatedProjects.find(p => p.id === projectId);
                
                if (project && project.modalContent) {
                    openProjectModal(project);
                }
            });
        });

        // Apply current filter
        filterProjects(currentFilter);
    }

    // Get service category class for project modal styling
    // Each service (Video Production, Photography, Social Media Campaign) has its own background color
    function getCategoryClass(project) {
        if (project.categories && Array.isArray(project.categories)) {
            // Use the first category for styling
            return project.categories[0].toLowerCase().replace(/\s+/g, '-');
        } else if (project.category) {
            return project.category.toLowerCase().replace(/\s+/g, '-');
        }
        return '';
    }



    // Open project modal pop-up with service-specific styling
    function openProjectModal(project, updateURL = true) {
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
        
        // Create project modal pop-up HTML with service-specific background color
        const modalHTML = `
            <div class="video-modal" id="project-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content ${categoryClass}">
                    <button class="modal-close" onclick="closeProjectModal()">&times;</button>
                    ${topImageContent}
                    <div class="modal-body">
                        ${finalModalBodyContent}
                    </div>
                </div>
            </div>
        `;
        
        // Apply individual hardcoded colors for specific projects
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
                closeProjectModal();
            }
        });
        
        // Close on escape key
        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                closeProjectModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Close project modal pop-up and clean up URL state
    window.closeProjectModal = function() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
            
            // Remove project parameter from URL for clean sharing
            const newURL = new URL(window.location);
            newURL.searchParams.delete('project');
            window.history.pushState({}, '', newURL);
        }
    };

    // Check URL parameters for direct project modal opening from shareable links
    function checkURLForModal() {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project');
        
        if (projectId) {
            // Wait for service page data to be loaded
            const checkAndOpenModal = () => {
                const aggregatedProjects = window.aggregateAllProjects();
                const project = aggregatedProjects.find(p => p.id === projectId);
                
                if (project && project.modalContent) {
                    openProjectModal(project, false); // Don't update URL since we're opening from URL
                } else if (aggregatedProjects.length === 0) {
                    // Service page data not loaded yet, wait a bit more
                    setTimeout(checkAndOpenModal, 100);
                }
            };
            
            checkAndOpenModal();
        }
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        const modal = document.getElementById('project-modal');
        if (modal) {
            closeProjectModal();
        }
        
        // Check if we should open a modal from the new URL
        setTimeout(checkURLForModal, 100);
    });

    // Update gallery on language change
    function updateGalleryLanguage() {
        renderAllProjects();
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

    // Initialize the All Projects overview page
    function initializeAllProjects() {
        // Setup service category filters (Video Production, Photography, Social Media Campaign)
        setupCategoryFilters();
        
        // Initial render of projects from all service pages
        renderAllProjects();
        
        // Check URL for direct project modal opening
        checkURLForModal();
    }

    // Wait for unified data source to be loaded, then initialize
    function waitForDataSources() {
        const checkDataSources = () => {
            // Check if unified projects data exists
            if (window.unifiedProjectsData && window.unifiedProjectsData.projects) {
                console.log('Unified data found, initializing...');
                initializeAllProjects();
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
