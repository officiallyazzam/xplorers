// Unified Booking Cart System
// Combines functionality from handpicked.js and packages.js

// Global cart data
let bookingItems = [];
let selectedServices = new Set();
let currentServiceModal = null;
let currentPackage = null;
let selectedPlatform = null;

// Service prices and options (from handpicked.js)
const serviceOptions = {
    'videography': {
        title: 'Professional Videography',
        requiresTier: true,
        hasEquipmentImages: true,
        options: [
            {
                id: 'event-videography',
                name: 'Event Videography',
                basePrice: 3500,
                description: 'Complete event coverage with multiple angles and professional equipment'
            },
            {
                id: 'realestate-videography',
                name: 'Real Estate Videography',
                basePrice: 2500,
                description: 'Property walkthroughs with aerial shots and professional editing'
            },
            {
                id: 'product-videography',
                name: 'Product Videography',
                basePrice: 2000,
                description: 'High-quality product showcase videos for marketing'
            },
            {
                id: 'cameraman-only',
                name: 'Cameraman Service Only',
                basePrice: 1500,
                description: 'Professional cameraman without editing services'
            },
            {
                id: 'commercial-videography',
                name: 'Commercial Videography',
                basePrice: 5000,
                description: 'Full commercial production with script consultation'
            }
        ],
        tiers: [
            { 
                id: 'phone', 
                name: 'Phone', 
                multiplier: 0.4, 
                description: 'Smartphone filming',
                image: 'images/equipment/iphone.png',
                deviceName: 'iPhone 13 Pro Max'
            },
            { 
                id: 'osmo', 
                name: 'Osmo Pocket', 
                multiplier: 0.6, 
                description: 'Compact professional',
                image: 'images/equipment/dji osmo pocket.png',
                deviceName: 'Osmo Pocket 3'
            },
            { 
                id: 'professional', 
                name: 'Professional Camera', 
                multiplier: 1.0, 
                description: 'Industry standard',
                image: 'images/equipment/profesional camera.png',
                deviceName: 'Canon EOS R'
            },
            { 
                id: 'cinema', 
                name: 'Cinema Camera', 
                multiplier: 1.5, 
                description: 'Hollywood quality',
                image: 'images/equipment/cinema camera.png',
                deviceName: 'Sony FX3'
            }
        ]
    },
    'photography': {
        title: 'Professional Photography',
        requiresTier: true,
        hasEquipmentImages: true,
        options: [
            {
                id: 'event-photography',
                name: 'Event Photography',
                basePrice: 2500,
                description: 'Full event coverage with edited photos delivered'
            },
            {
                id: 'product-photography',
                name: 'Product Photography',
                basePrice: 1500,
                description: 'Studio product shots with professional lighting'
            },
            {
                id: 'realestate-photography',
                name: 'Real Estate Photography',
                basePrice: 2000,
                description: 'HDR property photos with virtual staging options'
            },
            {
                id: 'portrait-photography',
                name: 'Portrait Photography',
                basePrice: 1800,
                description: 'Professional portraits and headshots'
            },
            {
                id: 'food-photography',
                name: 'Food Photography',
                basePrice: 1700,
                description: 'Appetizing food photography for menus and marketing'
            }
        ],
        tiers: [
            { 
                id: 'professional', 
                name: 'Professional Camera', 
                multiplier: 1.0, 
                description: 'High-end equipment',
                image: 'images/equipment/profesional camera.png',
                deviceName: 'Professional Camera'
            },
            { 
                id: 'medium-format', 
                name: 'Medium Format Camera', 
                multiplier: 1.5, 
                description: 'Ultimate quality',
                image: 'images/equipment/medium format camera.png',
                deviceName: 'Medium Format Camera'
            }
        ]
    },
    'video-editing': {
        title: 'Video Editing',
        hasCustomOptions: true,
        basePrice: 800,
        editOptions: {
            numberOfEdits: [1, 2, 3, 4, 5],
            platforms: [
                { id: 'youtube', name: 'YouTube', price: 0 },
                { id: 'instagram', name: 'Instagram', price: 200 },
                { id: 'tiktok', name: 'TikTok', price: 200 },
                { id: 'all', name: 'All Platforms', price: 500 }
            ]
        },
        addons: [
            { id: 'color-grading', name: 'Color Grading & Correction', price: 800 },
            { id: 'motion-graphics-light', name: 'Light Motion Graphics', price: 500 },
            { id: 'motion-graphics-full', name: 'Full Motion Graphics', price: 1500 },
            { id: 'rush-delivery', name: 'Rush Delivery', price: 1000 },
            { id: 'captions', name: 'Add Captions', price: 30 }
        ]
    },
    'motion-graphics': {
        title: 'Motion Graphics',
        options: [
            {
                id: 'light-motion',
                name: 'Light Motion Graphics',
                price: 500,
                description: 'Basic animated text and simple transitions'
            },
            {
                id: 'full-motion',
                name: 'Full Motion Graphics',
                price: 1500,
                description: 'Complex animations, 3D elements, and visual effects'
            }
        ]
    },
    'social-media': {
        title: 'Social Media Management',
        options: [
            {
                id: 'basic-social',
                name: 'Basic Package (3 platforms)',
                price: 3000,
                description: '30 posts per month across 3 platforms'
            },
            {
                id: 'premium-social',
                name: 'Premium Package (5 platforms)',
                price: 4500,
                description: '50 posts per month across 5 platforms with analytics'
            },
            {
                id: 'enterprise-social',
                name: 'Enterprise Package',
                price: 7000,
                description: 'Unlimited posts, all platforms, dedicated manager'
            }
        ]
    },
    'website-design': {
        title: 'Website Design & Development',
        options: [
            {
                id: 'basic-website',
                name: 'Basic Website (5 pages)',
                price: 8000,
                description: 'Simple 5-page website with responsive design'
            },
            {
                id: 'ecommerce-website',
                name: 'E-commerce Website',
                price: 15000,
                description: 'Full online store with payment integration'
            },
            {
                id: 'custom-website',
                name: 'Custom Web Application',
                price: 25000,
                description: 'Custom functionality and database integration'
            }
        ]
    }
};

// Package details data (from packages.js) - STANDARDIZED to use 'name' instead of 'title'
const packageDetails = {
    'event-coverage': {
        name: 'Complete Event Coverage', // Changed from 'title' to 'name'
        titleAr: 'تغطية كاملة للفعاليات',
        features: [
            { en: 'Event Videography (Professional Camera)', ar: 'تصوير الفعاليات (كاميرا احترافية)' },
            { en: 'Event Photography (Professional Camera)', ar: 'تصوير الفعاليات (كاميرا احترافية)' },
            { en: 'Timelapse', ar: 'تايم لابس' },
            { en: 'Photo Editing', ar: 'تعديل الصور' },
            { en: 'Video Editing', ar: 'مونتاج الفيديو' },
            { en: 'Timelapse Edit', ar: 'مونتاج التايم لابس' },
            { en: 'Color Correction & Grading', ar: 'تصحيح الألوان والدرجات' }
        ],
        addons: [
            { name: 'Additional Videographer', nameAr: 'مصور فيديو إضافي', type: 'quantity', default: 2, max: 5 },
            { name: 'Additional Photographer', nameAr: 'مصور فوتوغرافي إضافي', type: 'quantity', default: 2, max: 5 },
            { name: 'Drone Coverage', nameAr: 'تصوير بالدرون', type: 'checkbox' },
            { name: 'Live Streaming Setup', nameAr: 'إعداد البث المباشر', type: 'checkbox' }
        ]
    },
    'brand-identity': {
        name: 'Brand Identity Package', // Changed from 'title' to 'name'
        titleAr: 'باقة الهوية البصرية',
        comingSoon: true,
        features: [
            { en: 'Brand Identity Design', ar: 'تصميم الهوية البصرية' },
            { en: 'Graphic Design', ar: 'التصميم الجرافيكي' },
            { en: 'UI/UX Design', ar: 'تصميم واجهة وتجربة المستخدم' },
            { en: 'Content Writing', ar: 'كتابة المحتوى' }
        ],
        addons: [
            { name: 'Website Design Mockup', nameAr: 'تصميم نموذج الموقع الإلكتروني', type: 'checkbox' },
            { name: 'Packaging Design', nameAr: 'تصميم التغليف', type: 'checkbox' },
            { name: 'Brand Video/Animation', nameAr: 'فيديو/رسوم متحركة للعلامة التجارية', type: 'checkbox' }
        ]
    },
    'social-media': {
        name: 'Social Media Management', // Changed from 'title' to 'name'
        titleAr: 'إدارة وسائل التواصل الاجتماعي',
        features: [
            { en: 'Content Planning (monthly content calendar)', ar: 'تخطيط المحتوى (جدول محتوى شهري)' },
            { en: 'Caption Writing (in brand tone and language)', ar: 'كتابة التعليقات (بنبرة ولغة العلامة التجارية)' },
            { en: 'Hashtag Strategy and Research', ar: 'استراتيجية وبحث الهاشتاغ' },
            { en: 'Scheduling and Publishing Posts', ar: 'جدولة ونشر المنشورات' },
            { en: 'Photography (product, lifestyle, behind-the-scenes)', ar: 'التصوير (المنتجات، نمط الحياة، خلف الكواليس)' },
            { en: 'Videography (reels, ads, stories, promos)', ar: 'التصوير المرئي (ريلز، إعلانات، قصص، عروض ترويجية)' },
            { en: 'Graphic Design (feed visuals, carousels, story templates)', ar: 'التصميم الجرافيكي (مرئيات الخلاصة، الكاروسيل، قوالب القصص)' },
            { en: 'Motion Graphics / Animated Posts', ar: 'الرسوم المتحركة / المنشورات المتحركة' },
            { en: 'Video Editing and Color Grading', ar: 'مونتاج الفيديو وتصحيح الألوان' }
        ],
        platforms: [
            { name: 'Instagram', nameAr: 'انستغرام' },
            { name: 'Twitter/X', nameAr: 'تويتر/إكس' },
            { name: 'LinkedIn', nameAr: 'لينكد إن' },
            { name: 'TikTok', nameAr: 'تيك توك' },
            { name: 'YouTube', nameAr: 'يوتيوب' }
        ]
    },
    'complete-marketing': {
        name: 'Complete Marketing Solution', // Changed from 'title' to 'name'
        titleAr: 'حل التسويق الشامل',
        comingSoon: true,
        features: [
            { en: 'Social Media Management (Premium Package)', ar: 'إدارة وسائل التواصل الاجتماعي (الباقة المميزة)' },
            { en: 'Brand Identity Design', ar: 'تصميم الهوية البصرية' },
            { en: 'Graphic Design', ar: 'التصميم الجرافيكي' },
            { en: 'Content Writing', ar: 'كتابة المحتوى' },
            { en: 'Photography (Product Photography)', ar: 'التصوير (تصوير المنتجات)' },
            { en: 'Videography (Professional Camera)', ar: 'التصوير المرئي (كاميرا احترافية)' },
            { en: 'Video Editing', ar: 'مونتاج الفيديو' },
            { en: 'Motion Graphics', ar: 'الرسوم المتحركة' },
            { en: 'Color Correction & Grading', ar: 'تصحيح الألوان والدرجات' },
            { en: 'Website Development', ar: 'تطوير المواقع الإلكترونية' }
        ]
    }
};

// Benefits content for each service (from handpicked.js)
const serviceBenefits = {
    'videography': 'Professional videography captures moments with cinematic quality, ensuring your brand or event is presented in the best possible light. High-quality equipment and expertise result in footage that engages viewers and delivers your message effectively.',
    'photography': 'Professional photography creates lasting impressions with high-resolution images that showcase your products, services, or events. Quality photos increase engagement and build trust with your audience.',
    'video-editing': 'Professional editing transforms raw footage into compelling stories. Proper pacing, transitions, and effects keep viewers engaged and deliver your message clearly.',
    'color-grading': 'Color grading sets the mood and ensures visual consistency. It can make footage look cinematic, vibrant, or match your brand colors perfectly.',
    'motion-graphics': 'Motion graphics add visual interest and help explain complex concepts. They increase viewer retention and make your content more shareable.',
    'captions': 'Captions make your content accessible to a wider audience, improve SEO, and allow viewing without sound - crucial for social media.',
    'rush-delivery': 'Rush delivery ensures you meet tight deadlines without compromising quality. Perfect for time-sensitive campaigns or last-minute needs.',
    'logo-design': 'A professional logo is the foundation of your brand identity. It creates recognition and sets you apart from competitors.',
    'brand-guidelines': 'Brand guidelines ensure consistency across all touchpoints, building trust and recognition with your audience.',
    'business-cards': 'Professional business cards make memorable first impressions and provide a tangible connection to your brand.',
    'social-media': 'Consistent social media management builds community, increases brand awareness, and drives engagement with your target audience.',
    'google-ads': 'Google Ads put your business in front of customers actively searching for your services, providing measurable ROI.',
    'website-design': 'A professional website is your 24/7 salesperson, building credibility and converting visitors into customers.',
    'seo-setup': 'SEO optimization ensures your website ranks higher in search results, bringing organic traffic and reducing marketing costs.'
};

// ===== CORE CART FUNCTIONS =====

// Universal add to cart function (replaces both addToBooking and selectPackage)
function addToCart(itemData) {
    console.log('Adding to cart:', itemData);
    
    // Ensure the item has the standardized 'name' property
    if (!itemData.name) {
        console.error('Item missing required "name" property:', itemData);
        return;
    }
    
    bookingItems.push(itemData);
    saveBookingToStorage();
    updateBookingDisplay();
    showBookingAnimation();
    
    // Show booking panel with popup animation
    const bookingPanel = document.getElementById('bookingPanel');
    bookingPanel.classList.add('open');
    bookingPanel.classList.add('popup-animation');
    
    // Remove animation class after it completes
    setTimeout(() => {
        bookingPanel.classList.remove('popup-animation');
    }, 500);
    
    console.log('Item added to cart successfully');
}

// Save cart to localStorage
function saveBookingToStorage() {
    try {
        localStorage.setItem('nmo-booking', JSON.stringify(bookingItems));
        console.log('Booking saved to storage:', bookingItems);
    } catch (e) {
        console.error('Error saving booking:', e);
    }
}

// Load cart from localStorage
function loadBookingFromStorage() {
    try {
        const saved = localStorage.getItem('nmo-booking');
        if (saved) {
            bookingItems = JSON.parse(saved);
            console.log('Booking loaded from storage:', bookingItems);
        }
    } catch (e) {
        console.error('Error loading booking:', e);
        bookingItems = [];
    }
}

// Update cart display
function updateBookingDisplay() {
    const bookingPanel = document.getElementById('bookingPanel');
    const bookingItemsContainer = document.getElementById('bookingItems');
    const bookingCount = document.getElementById('bookingCount');
    
    if (!bookingPanel || !bookingItemsContainer || !bookingCount) {
        console.log('Booking elements not found');
        return;
    }
    
    if (bookingItems.length === 0) {
        bookingPanel.style.display = 'none';
        bookingCount.textContent = '0';
        console.log('Booking is empty, hiding');
        return;
    }
    
    bookingCount.textContent = bookingItems.length.toString();
    
    bookingItemsContainer.innerHTML = '';
    
    bookingItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'booking-item';

        // Format the details into a list if there are multiple items
        const formattedDetails = item.details ? 
            item.details.split(', ').map(detail => `<li>${detail}</li>`).join('') : '';

        itemEl.innerHTML = `
            <button onclick="removeFromBooking(${index})" class="booking-item-remove" aria-label="Remove item">×</button>
            <span class="booking-item-name">${item.name}</span>
            ${formattedDetails ? `
                <ul class="booking-item-details-list">
                    ${formattedDetails}
                </ul>
            ` : ''}
        `;
        bookingItemsContainer.appendChild(itemEl);
    });
    
    bookingPanel.style.display = 'block';
    console.log('Booking display updated, showing', bookingItems.length, 'items');
}

// Remove item from cart
window.removeFromBooking = function(index) {
    bookingItems.splice(index, 1);
    saveBookingToStorage();
    updateBookingDisplay();
};

// Toggle cart panel
window.toggleBooking = function() {
    const panel = document.getElementById('bookingPanel');
    if (panel) {
        panel.classList.toggle('open');
    }
};

// Proceed to checkout
window.proceedToCheckout = function() {
    if (bookingItems.length === 0) {
        alert('Please add some services to your request first.');
        return;
    }
    
    localStorage.setItem('nmo-checkout-booking', JSON.stringify(bookingItems));
    window.location.href = 'checkout.html';
};

// Show booking animation
function showBookingAnimation() {
    const bookingToggle = document.getElementById('bookingToggle');
    if (bookingToggle) {
        bookingToggle.classList.add('pulse');
        setTimeout(() => bookingToggle.classList.remove('pulse'), 1000);
    }
}

// ===== HANDPICKED SERVICES FUNCTIONS =====

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for booking toggle
    const bookingToggle = document.getElementById('bookingToggle');
    if (bookingToggle) {
        bookingToggle.addEventListener('click', toggleBooking);
    }
    
    // Only initialize category tabs if we're on handpicked page
    if (document.querySelector('.category-tab')) {
        initializeCategoryTabs();
    }
    
    loadBookingFromStorage();
    updateBookingDisplay();
});

// Add ESC key listener to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        // Close service modal if open
        const serviceModal = document.getElementById('serviceModal');
        if (serviceModal && serviceModal.style.display === 'flex') {
            closeServiceModal();
        }
        
        // Close info modal if open
        const infoModal = document.getElementById('serviceInfoModal');
        if (infoModal && infoModal.style.display === 'flex') {
            closeModal();
        }
        
        // Close package modal if open
        const packageModal = document.getElementById('packageModal');
        const packageModalAr = document.getElementById('packageModalAr');
        if (packageModal && packageModal.classList.contains('visible')) {
            closePackageModal();
        }
        if (packageModalAr && packageModalAr.classList.contains('visible')) {
            closePackageModal();
        }
    }
});

// Initialize category tabs
function initializeCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            filterServices(category);
        });
    });
}

// Filter services by category
function filterServices(category) {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Open service modal
window.openServiceModal = function(serviceId) {
    currentServiceModal = serviceId;
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('modalServiceTitle');
    const optionsContainer = document.getElementById('modalServiceOptions');
    
    const service = serviceOptions[serviceId];
    if (!service) return;
    
    title.textContent = service.title;
    
    // Handle video editing special case
    if (service.hasCustomOptions && serviceId === 'video-editing') {
        showVideoEditingOptions(optionsContainer);
    } 
    // Handle videography with equipment images
    else if (service.requiresTier && service.hasEquipmentImages) {
        showVideographyOptions(optionsContainer, service);
    }
    // Handle other services with tiers
    else if (service.requiresTier) {
        showServiceWithTiers(optionsContainer, service);
    }
    // Handle simple option selection
    else if (service.options) {
        showSimpleOptions(optionsContainer, service);
    }
    
    modal.style.display = 'flex';
};

// Show video editing options
function showVideoEditingOptions(container) {
    let html = `
        <div class="editing-options-group">
            <h4>Number of Edits:</h4>
            <select class="editing-number-select" id="editCount">
                <option value="1">1 Edit - SAR 800</option>
                <option value="2">2 Edits - SAR 1,500</option>
                <option value="3">3 Edits - SAR 2,100</option>
                <option value="4">4 Edits - SAR 2,600</option>
                <option value="5">5 Edits - SAR 3,000</option>
            </select>
        </div>
        
        <div class="editing-options-group">
            <h4>Platform to Edit For:</h4>
            <div class="platform-options">
                <div class="platform-option" data-platform="youtube" data-price="0" onclick="selectPlatform('youtube')">
                    YouTube
                </div>
                <div class="platform-option" data-platform="instagram" data-price="200" onclick="selectPlatform('instagram')">
                    Instagram (+SAR 200)
                </div>
                <div class="platform-option" data-platform="tiktok" data-price="200" onclick="selectPlatform('tiktok')">
                    TikTok (+SAR 200)
                </div>
                <div class="platform-option" data-platform="all" data-price="500" onclick="selectPlatform('all')">
                    All Platforms (+SAR 500)
                </div>
            </div>
        </div>
        
        <div class="editing-options-group">
            <h4>Recommended Add-ons:</h4>
            <div class="addon-options">
                <label class="addon-option">
                    <div class="addon-info">
                        <input type="checkbox" data-addon="color-grading" data-price="800">
                        <span>Color Grading & Correction</span>
                        <a href="#" class="addon-benefit-link" onclick="showBenefit('color-grading'); return false;">Why?</a>
                    </div>
                    <span class="addon-price-label">+SAR 800</span>
                </label>
                <label class="addon-option">
                    <div class="addon-info">
                        <input type="checkbox" data-addon="motion-graphics-light" data-price="500">
                        <span>Light Motion Graphics</span>
                        <a href="#" class="addon-benefit-link" onclick="showBenefit('motion-graphics'); return false;">Why?</a>
                    </div>
                    <span class="addon-price-label">+SAR 500</span>
                </label>
                <label class="addon-option">
                    <div class="addon-info">
                        <input type="checkbox" data-addon="motion-graphics-full" data-price="1500">
                        <span>Full Motion Graphics</span>
                        <a href="#" class="addon-benefit-link" onclick="showBenefit('motion-graphics'); return false;">Why?</a>
                    </div>
                    <span class="addon-price-label">+SAR 1,500</span>
                </label>
                <label class="addon-option">
                    <div class="addon-info">
                        <input type="checkbox" data-addon="rush-delivery" data-price="1000">
                        <span>Rush Delivery</span>
                        <a href="#" class="addon-benefit-link" onclick="showBenefit('rush-delivery'); return false;">Why?</a>
                    </div>
                    <span class="addon-price-label">+SAR 1,000</span>
                </label>
                <label class="addon-option">
                    <div class="addon-info">
                        <input type="checkbox" data-addon="captions" data-price="30">
                        <span>Add Captions</span>
                        <a href="#" class="addon-benefit-link" onclick="showBenefit('captions'); return false;">Why?</a>
                    </div>
                    <span class="addon-price-label">+SAR 30</span>
                </label>
            </div>
        </div>
        
        <button class="modal-add-btn" id="modalAddBtn" onclick="addVideoEditingToBooking()">
            Add to Booking - SAR 800
        </button>
    `;
    
    container.innerHTML = html;
    
    // Add event listeners for price calculation
    document.getElementById('editCount').addEventListener('change', calculateVideoEditingPrice);
    document.querySelectorAll('.addon-option input').forEach(input => {
        input.addEventListener('change', calculateVideoEditingPrice);
    });
}

// Show videography options
function showVideographyOptions(container, service) {
    let html = `
        <div class="service-option-group">
            <h3>Step 1: Select Your Service Type</h3>
    `;
    
    service.options.forEach(option => {
        const lowestPrice = Math.floor(option.basePrice * service.tiers[0].multiplier);
        html += `
            <div class="service-option-item" data-option-id="${option.id}" data-base-price="${option.basePrice}" onclick="selectServiceOption('${option.id}')">
                <div class="option-header">
                    <span class="option-title">${option.name}</span>
                    <span class="option-price">Starting from SAR ${lowestPrice.toLocaleString()}</span>
                </div>
                <div class="option-description">${option.description}</div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div id="tierSelection" style="display: none; margin-top: 2rem;">
            <h3>Step 2: Select Equipment Level</h3>
            <div id="tierOptions"></div>
        </div>
        <button class="modal-add-btn" id="modalAddBtn" onclick="addSelectedServiceToBooking()" disabled>
            Select an Option First
        </button>
    `;
    
    container.innerHTML = html;
    
    // Create equipment display panel if it doesn't exist
    if (!document.getElementById('equipmentDisplayPanel')) {
        const equipmentPanel = document.createElement('div');
        equipmentPanel.id = 'equipmentDisplayPanel';
        equipmentPanel.className = 'equipment-display-panel';
        equipmentPanel.innerHTML = `
            <img class="equipment-image" id="equipmentImage" src="" alt="">
        `;
        document.body.appendChild(equipmentPanel);
    }
}

window.selectServiceOption = function(optionId) {
    const service = serviceOptions[currentServiceModal];
    
    document.querySelectorAll('.service-option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedItem = document.querySelector(`[data-option-id="${optionId}"]`);
    selectedItem.classList.add('selected');
    
    window.selectedServiceOption = service.options.find(opt => opt.id === optionId);
    
    if (service.requiresTier) {
        const tierSection = document.getElementById('tierSelection');
        const tierOptions = document.getElementById('tierOptions');
        
        tierSection.style.display = 'block';
        
        // Smooth scroll to tier selection
        tierSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        let tierHtml = '';
        service.tiers.forEach(tier => {
            const price = Math.floor(window.selectedServiceOption.basePrice * tier.multiplier);
            tierHtml += `
                <div class="service-option-item" data-tier-id="${tier.id}" data-multiplier="${tier.multiplier}" onclick="selectTier('${tier.id}')">
                    <div class="tier-header">
                        <span class="tier-name">${tier.name}</span>
                        <span class="tier-price">SAR ${price.toLocaleString()}</span>
                    </div>
                    <div class="tier-description">${tier.description}</div>
                    ${service.hasEquipmentImages ? `
                        <div class="tier-equipment">
                            <img src="${tier.image}" alt="${tier.deviceName}" class="tier-equipment-image">
                            <span class="tier-device-name">${tier.deviceName}</span>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        tierOptions.innerHTML = tierHtml;
    }
    
    // Update button
    const addBtn = document.getElementById('modalAddBtn');
    if (service.requiresTier) {
        addBtn.textContent = 'Select Equipment Level First';
        addBtn.disabled = true;
    } else {
        addBtn.textContent = `Add to Booking - SAR ${window.selectedServiceOption.price.toLocaleString()}`;
        addBtn.disabled = false;
    }
};

window.selectTier = function(tierId) {
    const service = serviceOptions[currentServiceModal];
    
    document.querySelectorAll('#tierOptions .service-option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedTier = document.querySelector(`[data-tier-id="${tierId}"]`);
    selectedTier.classList.add('selected');
    
    window.selectedTier = service.tiers.find(tier => tier.id === tierId);
    
    // Handle equipment display for videography
    if (service.hasEquipmentImages && window.selectedTier.image) {
        const serviceModal = document.getElementById('serviceModal');
        const equipmentPanel = document.getElementById('equipmentDisplayPanel');
        
        if (equipmentPanel) {
            const equipmentImage = document.getElementById('equipmentImage');
            
            if (equipmentPanel.classList.contains('show')) {
                // Equipment panel is already visible, just change the image with fade effect
                equipmentImage.style.transition = 'opacity 0.3s ease';
                equipmentImage.style.opacity = '0';
                
                setTimeout(() => {
                    equipmentImage.src = window.selectedTier.image;
                    equipmentImage.style.opacity = '1';
                }, 300);
            } else {
                // First time showing - set image immediately then show panel
                equipmentImage.src = window.selectedTier.image;
                equipmentImage.style.opacity = '1';
                
                // Small delay to ensure DOM is ready, then show with slide effect
                setTimeout(() => {
                    serviceModal.classList.add('shift-left');
                    equipmentPanel.classList.add('show');
                }, 50);
            }
        }
    }
    
    // Update button
    const finalPrice = Math.floor(window.selectedServiceOption.basePrice * window.selectedTier.multiplier);
    const addBtn = document.getElementById('modalAddBtn');
    addBtn.textContent = `Add to Booking - SAR ${finalPrice.toLocaleString()}`;
    addBtn.disabled = false;
};

window.showBenefit = function(serviceId) {
    const modal = document.getElementById('serviceInfoModal');
    const title = document.getElementById('infoModalTitle');
    const content = document.getElementById('infoModalContent');
    
    const benefit = serviceBenefits[serviceId];
    if (!benefit) return;
    
    title.textContent = serviceId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    content.textContent = benefit;
    
    modal.style.display = 'flex';
};

window.closeServiceModal = function() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    
    // Hide equipment panel
    const equipmentPanel = document.getElementById('equipmentDisplayPanel');
    if (equipmentPanel) {
        equipmentPanel.style.display = 'none';
    }
    
    // Reset main modal position
    modal.style.transform = 'translateX(0)';
    
    // Reset selections
    currentServiceModal = null;
    window.selectedServiceOption = null;
    window.selectedTier = null;
    selectedPlatform = null;
    
    // Clear any selected states
    document.querySelectorAll('.service-option-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelectorAll('#tierOptions .service-option-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelectorAll('.platform-option.selected').forEach(item => {
        item.classList.remove('selected');
    });
};

window.closeModal = function() {
    const modal = document.getElementById('serviceInfoModal');
    modal.style.display = 'none';
};

window.addToBookingDirect = function(serviceId, serviceName, price) {
    const item = { name: serviceName, price: price };
    addToCart(item);
};

window.addSelectedServiceToBooking = function() {
    if (!window.selectedServiceOption) return;
    
    let finalPrice = window.selectedServiceOption.basePrice;
    let serviceName = window.selectedServiceOption.name;
    
    if (window.selectedTier) {
        finalPrice = Math.floor(finalPrice * window.selectedTier.multiplier);
        serviceName += ` - ${window.selectedTier.name}`;
    }
    
    const item = { name: serviceName, price: finalPrice };
    addToCart(item);
    closeServiceModal();
};

window.selectPlatform = function(platform) {
    document.querySelectorAll('.platform-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`[data-platform="${platform}"]`);
    selectedOption.classList.add('selected');
    selectedPlatform = platform;
    
    calculateVideoEditingPrice();
};

function calculateVideoEditingPrice() {
    const editCount = parseInt(document.getElementById('editCount').value);
    const basePrice = serviceOptions['video-editing'].basePrice;
    
    // Calculate base price based on number of edits
    const editPrices = [800, 1500, 2100, 2600, 3000];
    let totalPrice = editPrices[editCount - 1] || basePrice;
    
    // Add platform cost
    if (selectedPlatform) {
        const platformOption = document.querySelector(`[data-platform="${selectedPlatform}"]`);
        const platformPrice = parseInt(platformOption.getAttribute('data-price')) || 0;
        totalPrice += platformPrice;
    }
    
    // Add addon costs
    document.querySelectorAll('.addon-option input:checked').forEach(checkbox => {
        const addonPrice = parseInt(checkbox.getAttribute('data-price')) || 0;
        totalPrice += addonPrice;
    });
    
    // Update button
    const addBtn = document.getElementById('modalAddBtn');
    addBtn.textContent = `Add to Booking - SAR ${totalPrice.toLocaleString()}`;
}

window.addVideoEditingToBooking = function() {
    const editCount = parseInt(document.getElementById('editCount').value);
    const editPrices = [800, 1500, 2100, 2600, 3000];
    let totalPrice = editPrices[editCount - 1] || 800;
    
    let serviceName = `Video Editing (${editCount} edit${editCount > 1 ? 's' : ''})`;
    let details = [];
    
    // Add platform
    if (selectedPlatform) {
        const platformOption = document.querySelector(`[data-platform="${selectedPlatform}"]`);
        const platformPrice = parseInt(platformOption.getAttribute('data-price')) || 0;
        totalPrice += platformPrice;
        
        const platformName = platformOption.textContent.split(' (+')[0];
        details.push(`Platform: ${platformName}`);
    }
    
    // Add addons
    document.querySelectorAll('.addon-option input:checked').forEach(checkbox => {
        const addonName = checkbox.parentElement.querySelector('span').textContent;
        const addonPrice = parseInt(checkbox.getAttribute('data-price')) || 0;
        totalPrice += addonPrice;
        details.push(addonName);
    });
    
    const item = {
        name: serviceName,
        price: totalPrice,
        details: details.join(', ')
    };
    
    addToCart(item);
    closeServiceModal();
};

function showSimpleOptions(container, service) {
    let html = `<div class="simple-options-group">`;
    
    service.options.forEach(option => {
        html += `
            <div class="simple-option-item" data-option-id="${option.id}" data-price="${option.price}" onclick="selectSimpleOption('${option.id}', ${option.price})">
                <div class="option-header">
                    <span class="option-title">${option.name}</span>
                    <span class="option-price">SAR ${option.price.toLocaleString()}</span>
                </div>
                <div class="option-description">${option.description}</div>
            </div>
        `;
    });
    
    html += `</div>
        <button class="modal-add-btn" id="modalAddBtn" onclick="addSelectedServiceToBooking()" disabled>
            Select an Option First
        </button>`;
    
    container.innerHTML = html;
}

window.selectSimpleOption = function(optionId, price) {
    document.querySelectorAll('.simple-option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedItem = document.querySelector(`[data-option-id="${optionId}"]`);
    selectedItem.classList.add('selected');
    
    const service = serviceOptions[currentServiceModal];
    window.selectedServiceOption = service.options.find(opt => opt.id === optionId);
    
    const addBtn = document.getElementById('modalAddBtn');
    addBtn.textContent = `Add to Booking - SAR ${price.toLocaleString()}`;
    addBtn.disabled = false;
};

function showServiceWithTiers(container, service) {
    let html = `
        <div class="service-option-group">
            <h3>Select Your Service Type</h3>
    `;
    
    service.options.forEach(option => {
        const lowestPrice = Math.floor(option.basePrice * service.tiers[0].multiplier);
        html += `
            <div class="service-option-item" data-option-id="${option.id}" data-base-price="${option.basePrice}" onclick="selectServiceOption('${option.id}')">
                <div class="option-header">
                    <span class="option-title">${option.name}</span>
                    <span class="option-price">Starting from SAR ${lowestPrice.toLocaleString()}</span>
                </div>
                <div class="option-description">${option.description}</div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div id="tierSelection" style="display: none; margin-top: 2rem;">
            <h3>Select Equipment Level</h3>
            <div id="tierOptions"></div>
        </div>
        <button class="modal-add-btn" id="modalAddBtn" onclick="addSelectedServiceToBooking()" disabled>
            Select an Option First
        </button>
    `;
    
    container.innerHTML = html;
}

window.applyDiscount = function() {
    const discountCode = document.getElementById('discountCode').value.trim();
    const discountMessage = document.getElementById('discountMessage');
    
    if (!discountCode) {
        discountMessage.textContent = 'Please enter a discount code';
        discountMessage.style.color = '#e74c3c';
        return;
    }
    
    // Simple discount validation (you can expand this)
    const validCodes = {
        'SAVE10': 0.1,
        'WELCOME20': 0.2,
        'STUDENT15': 0.15
    };
    
    if (validCodes[discountCode.toUpperCase()]) {
        const discount = validCodes[discountCode.toUpperCase()];
        discountMessage.textContent = `Discount applied! ${(discount * 100)}% off`;
        discountMessage.style.color = '#27ae60';
        
        // Apply discount logic here
        updateBookingDisplay();
    } else {
        discountMessage.textContent = 'Invalid discount code';
        discountMessage.style.color = '#e74c3c';
    }
};

window.showServiceInfo = function(infoType) {
    const modal = document.getElementById('serviceInfoModal');
    const title = document.getElementById('infoModalTitle');
    const content = document.getElementById('infoModalContent');
    
    const infoContent = {
        'videography': 'Professional videography captures your moments with cinematic quality using industry-standard equipment and techniques.',
        'photography': 'High-quality photography services for events, products, portraits, and commercial needs.',
        'editing': 'Professional video editing with color correction, transitions, and effects to create compelling content.'
    };
    
    title.textContent = infoType.charAt(0).toUpperCase() + infoType.slice(1);
    content.textContent = infoContent[infoType] || 'Information not available.';
    
    modal.style.display = 'flex';
};

// ===== PACKAGE FUNCTIONS =====

// Open package details modal
function openPackageDetails(packageId) {
    console.log('Opening package details for:', packageId);
    
    currentPackage = packageId;
    const pkg = packageDetails[packageId];
    
    if (!pkg) {
        console.error('Package not found:', packageId);
        alert('Package details not found');
        return;
    }
    
    // Check if package is coming soon
    if (pkg.comingSoon) {
        // Show coming soon message instead of opening modal
        const isArabic = document.documentElement.getAttribute('dir') === 'rtl';
        const message = isArabic ? 
            'هذه الباقة قادمة قريباً! ترقبوا إطلاقها.' : 
            'This package is coming soon! Stay tuned for its launch.';
        alert(message);
        return;
    }
    
    const isArabic = document.documentElement.getAttribute('dir') === 'rtl';
    const modalId = isArabic ? 'packageModalAr' : 'packageModal';
    const modal = document.getElementById(modalId);
    
    if (!modal) {
        console.error('Modal not found:', modalId);
        alert('Modal not found');
        return;
    }
    
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    
    if (!modalTitle || !modalBody) {
        console.error('Modal elements not found');
        return;
    }

    // Set title
    modalTitle.textContent = isArabic ? pkg.titleAr : pkg.name; // Use 'name' instead of 'title'

    // Build modal content
    let content = `
        <div class="features-section">
            <h3>${isArabic ? 'تشمل:' : 'Includes:'}</h3>
            <ul class="package-features${isArabic ? ' rtl-list' : ''}">
                ${pkg.features.map(feature => {
                    const text = typeof feature === 'object' ? (isArabic ? feature.ar : feature.en) : feature;
                    return `<li>${text}</li>`;
                }).join('')}
            </ul>
        </div>
    `;

    // Add-ons section
    if (pkg.addons && pkg.addons.length > 0) {
        content += `
            <div class="customization-section">
                <h4>${isArabic ? 'تخصيص الباقة:' : 'Customize Your Package:'}</h4>
                ${pkg.addons.map((addon, index) => {
                    const name = isArabic ? (addon.nameAr || addon.name) : addon.name;
                    const currency = isArabic ? 'ريال' : 'SAR';
                    const addonId = `addon-${packageId}-${index}`;
                    
                    if (addon.type === 'quantity') {
                        const qtyId = `${addonId}-qty`;
                        return `
                            <div class="customize-option">
                                <label>${isArabic ? `عدد ${name}:` : `Number of ${name}s:`}</label>
                                <div class="quantity-selector">
                                    <button class="qty-btn minus" data-target="${qtyId}" type="button">-</button>
                                    <input type="number" id="${qtyId}" value="${addon.default}" min="${addon.default}" max="${addon.max}" class="qty-input" data-default="${addon.default}">
                                    <button class="qty-btn plus" data-target="${qtyId}" type="button">+</button>
                                </div>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="customize-option">
                                <label>
                                    <input type="checkbox" class="addon-checkbox" id="${addonId}" data-name="${name}">
                                    <span>${name}</span>
                                </label>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        `;
    }

    // Platform selection
    if (pkg.platforms && pkg.platforms.length > 0) {
        content += `
            <div class="customization-section">
                <h4>${isArabic ? 'تخصيص المنصات:' : 'Customize Platforms:'}</h4>
                <div class="platform-selection">
                    ${pkg.platforms.map((platform, index) => {
                        const name = isArabic ? (platform.nameAr || platform.name) : platform.name;
                        const currency = isArabic ? 'ريال' : 'SAR';
                        const platformId = `platform-${packageId}-${index}`;
                        return `
                            <label class="platform-option">
                                <input type="checkbox" id="${platformId}" 
                                    ${platform.included ? 'checked disabled' : ''} 
                                    data-name="${name}" class="platform-checkbox">
                                ${name}
                            </label>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    modalBody.innerHTML = content;
    
    // Show modal
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
    console.log('Modal displayed');
    
    // Setup event listeners
    setupModalEventListeners(modal);
    
    // IMPORTANT: Setup the "Select This Package" button click handler
    setTimeout(() => {
        const selectBtn = modal.querySelector('.select-package-btn');
        if (selectBtn) {
            console.log('Select button found, attaching click handler');
            // Remove existing onclick to avoid conflicts
            selectBtn.onclick = null;
            // Add new event listener
            selectBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Select button clicked!');
                selectPackage();
            });
        } else {
            console.error('Select button not found in modal!');
        }
    }, 100);
}

// Setup modal event listeners
function setupModalEventListeners(modal) {
    // Quantity buttons
    modal.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (!input) return;
            
            let currentValue = parseInt(input.value);
            const min = parseInt(input.getAttribute('min'));
            const max = parseInt(input.getAttribute('max'));
            
            if (this.classList.contains('minus')) {
                currentValue = Math.max(currentValue - 1, min);
            } else if (this.classList.contains('plus')) {
                currentValue = Math.min(currentValue + 1, max);
            }
            
            input.value = currentValue;
            updateModalPrice(modal);
        });
    });
    
    // Quantity inputs
    modal.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', function() {
            updateModalPrice(modal);
        });
    });
    
    // Addon checkboxes
    modal.querySelectorAll('.addon-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateModalPrice(modal);
        });
    });
    
    // Platform checkboxes
    modal.querySelectorAll('.platform-checkbox').forEach(checkbox => {
        if (!checkbox.disabled) {
            checkbox.addEventListener('change', function() {
                updateModalPrice(modal);
            });
        }
    });
    
    // Initial price update
    updateModalPrice(modal);
}

// Update modal price - removed since no pricing displayed
function updateModalPrice(modal) {
    // Function kept for compatibility but no pricing calculations needed
}

// Close package modal
function closePackageModal() {
    const modals = [document.getElementById('packageModal'), document.getElementById('packageModalAr')];
    
    modals.forEach(modal => {
        if (modal) {
            modal.classList.remove('visible');
        }
    });
    
    document.body.style.overflow = '';
    currentPackage = null;
}

// Select package function (calls addToCart internally)
function selectPackage() {
    if (!currentPackage) {
        console.error('No package selected');
        return;
    }
    
    const pkg = packageDetails[currentPackage];
    const isArabic = document.documentElement.getAttribute('dir') === 'rtl';
    const modalId = isArabic ? 'packageModalAr' : 'packageModal';
    const modal = document.getElementById(modalId);
    
    if (!modal) {
        console.error('Modal not found');
        return;
    }
    
    let details = [];
    
    // Collect quantity-based addons
    modal.querySelectorAll('.qty-input').forEach(input => {
        const defaultQty = parseInt(input.getAttribute('data-default'));
        const currentQty = parseInt(input.value);
        
        if (currentQty > defaultQty) {
            const addonName = input.closest('.customize-option').querySelector('label').textContent.split(':')[0];
            details.push(`${addonName}: ${currentQty}`);
        }
    });
    
    // Collect checkbox addons
    modal.querySelectorAll('.addon-checkbox:checked').forEach(checkbox => {
        const name = checkbox.getAttribute('data-name');
        details.push(name);
    });
    
    // Collect platform addons
    modal.querySelectorAll('.platform-checkbox:checked').forEach(checkbox => {
        if (!checkbox.disabled) {
            const name = checkbox.getAttribute('data-name');
            details.push(name);
        }
    });
    
    // Create standardized item data
    const itemData = {
        name: pkg.name, // Using standardized 'name' property
        details: details.length > 0 ? details.join(', ') : undefined
    };
    
    console.log('Adding package to cart:', itemData);
    
    // Use the unified addToCart function
    addToCart(itemData);
    
    // Close modal
    closePackageModal();
    
    console.log('Package added successfully');
}

// Global function exports for packages page
window.openPackageDetails = openPackageDetails;
window.closePackageModal = closePackageModal;
window.selectPackage = selectPackage;

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const packageModal = document.getElementById('packageModal');
    const packageModalAr = document.getElementById('packageModalAr');
    
    if (packageModal && packageModal.classList.contains('visible') && e.target === packageModal) {
        closePackageModal();
    }
    if (packageModalAr && packageModalAr.classList.contains('visible') && e.target === packageModalAr) {
        closePackageModal();
    }
});

// Initialize everything when DOM is loaded
console.log('Unified booking cart system loaded successfully');