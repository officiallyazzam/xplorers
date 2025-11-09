// Our Work Page Dynamic Data
// This file defines the services displayed on the Our Work page and dynamically aggregates project counts

console.log('=== OUR WORK DATA JS LOADED ===');

window.ourWorkData = {
    // Page information
    pageInfo: {
        title: {
            en: "Our Work",
            ar: "أعمالنا"
        },
        description: {
            en: "Explore our services and the projects we've delivered",
            ar: "استكشف خدماتنا والمشاريع التي قدمناها"
        }
    },
    
    // Service definitions - these are the cards shown on Our Work page
    services: [
        {
            id: "all-projects",
            name: {
                en: "All Projects",
                ar: "جميع المشاريع"
            },
            description: {
                en: "View all our work",
                ar: "عرض جميع أعمالنا"
            },
            thumbnail: "images/thumbnails/working on new service.jpg",
            url: "all-projects.html",
            category: "all",
            isSpecial: true // This indicates it's not a regular service
        },
        {
            id: "video-production",
            name: {
                en: "Video Production",
                ar: "إنتاج الفيديو"
            },
            description: {
                en: "Professional video content",
                ar: "محتوى فيديو احترافي"
            },
            thumbnail: "images/our work page covers/studio bts.png",
            url: "videoproduction.html",
            category: "video",
            dataSource: "unifiedProjectsData" // Reference to the unified data file
        },
        {
            id: "professional-photography",
            name: {
                en: "Professional Photography",
                ar: "التصوير الاحترافي"
            },
            description: {
                en: "High-quality photography",
                ar: "تصوير عالي الجودة"
            },
            thumbnail: "images/thumbnails/photography studio.jpg",
            url: "professional-photography.html",
            category: "photography",
            dataSource: "unifiedProjectsData"
        },
        {
            id: "social-media-campaign",
            name: {
                en: "Social Media Campaign",
                ar: "حملة وسائل التواصل الاجتماعي"
            },
            description: {
                en: "Engaging social content",
                ar: "محتوى اجتماعي جذاب"
            },
            thumbnail: "images/thumbnails/social media posts on ipad.png",
            url: "social-media-campaign.html",
            category: "marketing",
            dataSource: "unifiedProjectsData"
        },
        {
            id: "content-strategy",
            name: {
                en: "Content Strategy",
                ar: "استراتيجية المحتوى"
            },
            description: {
                en: "Strategic content planning",
                ar: "تخطيط المحتوى الاستراتيجي"
            },
            thumbnail: "images/thumbnails/content strategy.jpg",
            url: "content-strategy.html",
            category: "marketing",
            dataSource: "contentStrategyData"
        },
        {
            id: "brand-identity",
            name: {
                en: "Brand Identity Design",
                ar: "تصميم الهوية البصرية"
            },
            description: {
                en: "Complete brand solutions",
                ar: "حلول العلامة التجارية الكاملة"
            },
            thumbnail: "images/thumbnails/brand identity design.jpg",
            url: "brand-identity.html",
            category: "branding",
            dataSource: "brandIdentityData"
        }
    ]
};

// Function to get project count for a specific service
window.getServiceProjectCount = function(serviceId) {
    const service = window.ourWorkData.services.find(s => s.id === serviceId);
    
    if (!service) return 0;
    
    // Special handling for "All Projects"
    if (service.isSpecial && serviceId === "all-projects") {
        return window.unifiedProjectsData && window.unifiedProjectsData.projects 
            ? window.unifiedProjectsData.projects.length 
            : 0;
    }
    
    // Get count from the service's data source
    if (service.dataSource && window[service.dataSource]) {
        const data = window[service.dataSource];
        
        // If using unified data, filter by service tags
        if (service.dataSource === "unifiedProjectsData" && data.projects) {
            // Map service IDs to their corresponding service tags
            const serviceTagMap = {
                "video-production": "video production",
                "professional-photography": "professional photography", 
                "social-media-campaign": "social media campaign"
            };
            
            const serviceTag = serviceTagMap[serviceId];
            if (serviceTag) {
                return data.projects.filter(project => 
                    project.serviceTags && project.serviceTags.includes(serviceTag)
                ).length;
            }
        }
        
        // For other data sources, return total count
        return data.projects ? data.projects.length : 0;
    }
    
    return 0;
};

// Function to get total project count across all services
window.getTotalProjectCount = function() {
    return window.unifiedProjectsData && window.unifiedProjectsData.projects 
        ? window.unifiedProjectsData.projects.length 
        : 0;
};

// Function to get service data with dynamic project counts
window.getServicesWithCounts = function() {
    return window.ourWorkData.services.map(service => {
        const projectCount = window.getServiceProjectCount(service.id);
        return {
            ...service,
            projectCount: projectCount,
            hasProjects: projectCount > 0
        };
    });
};

console.log('=== OUR WORK DATA FUNCTIONS DEFINED ===');