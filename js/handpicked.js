// Handpicked Services JavaScript

// Booking panel data
let bookingItems = [];
let selectedServices = new Set();
let currentServiceModal = null;

// Service options
const serviceOptions = {
    'videography': {
        title: 'Professional Videography',
        titleAr: 'التصوير المرئي الاحترافي',
        requiresTier: true,
        hasEquipmentImages: true,
        options: [
            {
                id: 'event-videography',
                name: 'Event Videography',
                nameAr: 'تصوير الفعاليات',
                description: 'Complete event coverage with multiple angles and professional equipment',
                descriptionAr: 'تغطية كاملة للفعاليات بزوايا متعددة ومعدات احترافية'
            },
            {
                id: 'realestate-videography',
                name: 'Real Estate Videography',
                nameAr: 'تصوير العقارات',
                description: 'Property walkthroughs with aerial shots and professional editing',
                descriptionAr: 'جولات العقارات مع التصوير الجوي والمونتاج الاحترافي'
            },
            {
                id: 'product-videography',
                name: 'Product Videography',
                nameAr: 'تصوير المنتجات',
                description: 'High-quality product showcase videos for marketing',
                descriptionAr: 'فيديوهات عرض منتجات عالية الجودة للتسويق'
            },
            {
                id: 'cameraman-only',
                name: 'Cameraman Service Only',
                nameAr: 'خدمة المصور فقط',
                description: 'Professional cameraman without editing services',
                descriptionAr: 'مصور محترف بدون خدمات المونتاج'
            },
            {
                id: 'commercial-videography',
                name: 'Commercial Videography',
                nameAr: 'تصوير إعلاني تجاري',
                description: 'Full commercial production with script consultation',
                descriptionAr: 'إنتاج إعلاني كامل مع استشارة النص'
            }
        ],
        tiers: [
            { 
                id: 'phone', 
                name: 'Phone', 
                nameAr: 'الهاتف',
                description: 'Smartphone filming',
                descriptionAr: 'تصوير بالهاتف الذكي',
                image: 'images/equipment/iphone.png',
                deviceName: 'iPhone 13 Pro Max',
                deviceNameAr: 'آيفون 13 برو ماكس'
            },
            { 
                id: 'osmo', 
                name: 'Osmo Pocket', 
                nameAr: 'أوزمو بوكيت',
                description: 'Compact professional',
                descriptionAr: 'احترافي مدمج',
                image: 'images/equipment/dji osmo pocket.png',
                deviceName: 'Osmo Pocket 3',
                deviceNameAr: 'أوزمو بوكيت 3'
            },
            { 
                id: 'professional', 
                name: 'Professional Camera', 
                nameAr: 'كاميرا احترافية',
                description: 'Industry standard',
                descriptionAr: 'المعيار الصناعي',
                image: 'images/equipment/profesional camera.png',
                deviceName: 'Canon EOS R',
                deviceNameAr: 'كانون EOS R'
            },
            { 
                id: 'cinema', 
                name: 'Cinema Camera', 
                nameAr: 'كاميرا سينمائية',
                description: 'Hollywood quality',
                descriptionAr: 'جودة هوليوود',
                image: 'images/equipment/cinema camera.png',
                deviceName: 'Sony FX3',
                deviceNameAr: 'سوني FX3'
            }
        ]
    },
    'photography': {
    title: 'Professional Photography',
    titleAr: 'التصوير الفوتوغرافي الاحترافي',
    requiresTier: true,
    hasEquipmentImages: true,
    options: [
        {
            id: 'event-photography',
            name: 'Event Photography',
            nameAr: 'تصوير الفعاليات',
            description: 'Full event coverage with edited photos delivered',
            descriptionAr: 'تغطية كاملة للفعاليات مع تسليم الصور المعدلة'
        },
        {
            id: 'product-photography',
            name: 'Product Photography',
            nameAr: 'تصوير المنتجات',
            description: 'Studio product shots with professional lighting',
            descriptionAr: 'لقطات استوديو للمنتجات مع إضاءة احترافية'
        },
        {
            id: 'realestate-photography',
            name: 'Real Estate Photography',
            nameAr: 'تصوير العقارات',
            description: 'HDR property photos with virtual staging options',
            descriptionAr: 'صور عقارات بتقنية HDR مع خيارات التجهيز الافتراضي'
        },
        {
            id: 'portrait-photography',
            name: 'Portrait Photography',
            nameAr: 'التصوير الشخصي',
            description: 'Professional portraits and headshots',
            descriptionAr: 'صور شخصية احترافية وصور للسيرة الذاتية'
        },
        {
            id: 'food-photography',
            name: 'Food Photography',
            nameAr: 'تصوير الطعام',
            description: 'Appetizing food photography for menus and marketing',
            descriptionAr: 'تصوير طعام شهي للقوائم والتسويق'
        }
    ],
    tiers: [
        { 
            id: 'professional', 
            name: 'Professional Camera', 
            nameAr: 'كاميرا احترافية',
            description: 'High-end equipment',
            descriptionAr: 'معدات عالية الجودة',
            image: 'images/equipment/profesional camera.png',
            deviceName: 'Professional Camera',
            deviceNameAr: 'كاميرا احترافية'
        },
        { 
            id: 'medium-format', 
            name: 'Medium Format Camera', 
            nameAr: 'كاميرا متوسطة التنسيق',
            description: 'Ultimate quality',
            descriptionAr: 'جودة فائقة',
            image: 'images/equipment/medium format camera.png',
            deviceName: 'Medium Format Camera',
            deviceNameAr: 'كاميرا متوسطة التنسيق'
        }
    ]
},
    'video-editing': {
        title: 'Video Editing',
        titleAr: 'مونتاج الفيديو',
        hasCustomOptions: true,
        editOptions: {
            numberOfEdits: [1, 2, 3, 4, 5],
            orientations: [
                { id: 'horizontal', name: 'Horizontal', nameAr: 'أفقي', description: 'Can be used for YouTube, Vimeo, etc.', descriptionAr: 'يمكن استخدامه لليوتيوب وفيميو وغيرها' },
                { id: 'vertical', name: 'Vertical', nameAr: 'عمودي', description: 'For Instagram, TikTok, Snapchat', descriptionAr: 'للانستغرام وتيك توك وسناب شات' },
                { id: 'both', name: 'Both', nameAr: 'كلاهما', description: 'Optimized for all platforms', descriptionAr: 'محسّن لجميع المنصات' }
            ]
        },
        addons: [
            { id: 'color-grading', name: 'Color Grading & Correction', nameAr: 'تدرج وتصحيح الألوان' },
            { id: 'motion-graphics-light', name: 'Light Motion Graphics', nameAr: 'رسوم متحركة خفيفة' },
            { id: 'motion-graphics-full', name: 'Full Motion Graphics', nameAr: 'رسوم متحركة كاملة' },
            { id: 'rush-delivery', name: 'Rush Delivery', nameAr: 'تسليم سريع' },
            { id: 'captions', name: 'Add Captions', nameAr: 'إضافة ترجمة' }
        ]
    },
    'motion-graphics': {
        title: 'Motion Graphics',
        options: [
            {
                id: 'light-motion',
                name: 'Light Motion Graphics',
                description: 'Basic animated text and simple transitions'
            },
            {
                id: 'full-motion',
                name: 'Full Motion Graphics',
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
                description: '30 posts per month across 3 platforms'
            },
            {
                id: 'premium-social',
                name: 'Premium Package (5 platforms)',
                description: '50 posts per month across 5 platforms with analytics'
            },
            {
                id: 'enterprise-social',
                name: 'Enterprise Package',
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
                description: 'Simple 5-page website with responsive design'
            },
            {
                id: 'ecommerce-website',
                name: 'E-commerce Website',
                description: 'Full online store with payment integration'
            },
            {
                id: 'custom-website',
                name: 'Custom Web Application',
                description: 'Custom functionality and database integration'
            }
        ]
    }
};

// Benefits content for each service
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

// Arabic benefits content
const serviceBenefitsAr = {
    'videography': 'التصوير المرئي الاحترافي يلتقط اللحظات بجودة سينمائية، مما يضمن عرض علامتك التجارية أو فعاليتك بأفضل صورة ممكنة. المعدات عالية الجودة والخبرة تنتج مقاطع فيديو تشرك المشاهدين وتوصل رسالتك بفعالية.',
    'photography': 'التصوير الفوتوغرافي الاحترافي يخلق انطباعات دائمة بصور عالية الدقة تعرض منتجاتك أو خدماتك أو فعالياتك. الصور عالية الجودة تزيد التفاعل وتبني الثقة مع جمهورك.',
    'video-editing': 'المونتاج الاحترافي يحول اللقطات الخام إلى قصص مقنعة. الوتيرة المناسبة والانتقالات والمؤثرات تحافظ على انتباه المشاهدين وتوصل رسالتك بوضوح.',
    'color-grading': 'تدرج الألوان يحدد المزاج ويضمن الاتساق البصري. يمكنه جعل المقاطع تبدو سينمائية أو نابضة بالحياة أو تتماشى مع ألوان علامتك التجارية بشكل مثالي.',
    'motion-graphics': 'الرسوم المتحركة تضيف اهتماماً بصرياً وتساعد في شرح المفاهيم المعقدة. تزيد من احتفاظ المشاهدين وتجعل محتواك أكثر قابلية للمشاركة.',
    'captions': 'الترجمة تجعل محتواك متاحاً لجمهور أوسع، وتحسن تحسين محركات البحث، وتسمح بالمشاهدة بدون صوت - أمر بالغ الأهمية لوسائل التواصل الاجتماعي.',
    'rush-delivery': 'التسليم السريع يضمن الوفاء بالمواعيد النهائية الضيقة دون التضحية بالجودة. مثالي للحملات الحساسة للوقت أو الاحتياجات اللحظية.',
    'logo-design': 'الشعار الاحترافي هو أساس هوية علامتك التجارية. ينشئ التعرف عليها ويميزك عن المنافسين.',
    'brand-guidelines': 'إرشادات العلامة التجارية تضمن الاتساق عبر جميع نقاط الاتصال، وتبني الثقة والتعرف مع جمهورك.',
    'business-cards': 'بطاقات العمل الاحترافية تترك انطباعات أولى لا تُنسى وتوفر اتصالاً ملموساً بعلامتك التجارية.',
    'social-media': 'إدارة وسائل التواصل الاجتماعي المتسقة تبني المجتمع وتزيد الوعي بالعلامة التجارية وتحفز التفاعل مع جمهورك المستهدف.',
    'google-ads': 'إعلانات جوجل تضع نشاطك التجاري أمام العملاء الذين يبحثون بنشاط عن خدماتك، مما يوفر عائد استثمار قابل للقياس.',
    'website-design': 'الموقع الإلكتروني الاحترافي هو مندوب المبيعات على مدار الساعة، يبني المصداقية ويحول الزوار إلى عملاء.',
    'seo-setup': 'تحسين محركات البحث يضمن ظهور موقعك في مراتب أعلى في نتائج البحث، مما يجلب حركة مرور عضوية ويقلل تكاليف التسويق.'
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCategoryTabs();
    
    // Add event listener for booking toggle
    const bookingToggle = document.getElementById('bookingToggle');
    if (bookingToggle) {
        bookingToggle.addEventListener('click', toggleBooking);
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
    
    // Check if page is Arabic
    const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
    
    // Set title based on language
    title.textContent = isArabic && service.titleAr ? service.titleAr : service.title;
    
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
    // Check if page is Arabic
    const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
    const service = serviceOptions['video-editing'];
    
    let html = `
        <div class="editing-options-group">
            <h4>${isArabic ? 'عدد المونتاجات:' : 'Number of Edits:'}</h4>
            <select class="editing-number-select" id="editCount">
                <option value="1">${isArabic ? 'مونتاج واحد' : '1 Edit'}</option>
                <option value="2">${isArabic ? 'مونتاجان' : '2 Edits'}</option>
                <option value="3">${isArabic ? '3 مونتاجات' : '3 Edits'}</option>
                <option value="4">${isArabic ? '4 مونتاجات' : '4 Edits'}</option>
                <option value="5">${isArabic ? '5 مونتاجات' : '5 Edits'}</option>
            </select>
        </div>
        
        <div class="editing-options-group">
            <h4>${isArabic ? 'الاتجاه:' : 'Orientation:'}</h4>
            <div class="platform-options">
                ${service.editOptions.orientations.map(orientation => `
                    <div class="platform-option" data-orientation="${orientation.id}" onclick="selectOrientation('${orientation.id}')">
                        <div class="orientation-name">${isArabic && orientation.nameAr ? orientation.nameAr : orientation.name}</div>
                        <div class="orientation-description">${isArabic && orientation.descriptionAr ? orientation.descriptionAr : orientation.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="editing-options-group">
            <h4>${isArabic ? 'إضافات مُوصى بها:' : 'Recommended Add-ons:'}</h4>
            <div class="addon-options">
                ${service.addons.map(addon => `
                    <label class="addon-option">
                        <div class="addon-info">
                            <input type="checkbox" data-addon="${addon.id}">
                            <span>${isArabic && addon.nameAr ? addon.nameAr : addon.name}</span>
                            <a href="#" class="addon-benefit-link" onclick="showBenefit('${addon.id}'); return false;">${isArabic ? 'لماذا؟' : 'Why?'}</a>
                        </div>
                    </label>
                `).join('')}
            </div>
        </div>
        
        <button class="modal-add-btn" id="modalAddBtn" onclick="addVideoEditingToBooking()">
            ${isArabic ? 'إضافة إلى الحجز' : 'Add to booking'}
        </button>
    `;
    
    container.innerHTML = html;
}

// Show videography options
function showVideographyOptions(container, service) {
    // Check if page is Arabic
    const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
    
    let html = `
        <div class="service-option-group">
            <h3>${isArabic ? 'الخطوة الأولى: اختر نوع الخدمة' : 'Step 1: Select Your Service Type'}</h3>
    `;
    
    service.options.forEach(option => {
        html += `
            <div class="service-option-item" data-option-id="${option.id}" onclick="selectServiceOption('${option.id}')">
                <div class="option-header">
                    <span class="option-title">${isArabic && option.nameAr ? option.nameAr : option.name}</span>
                </div>
                <div class="option-description">${isArabic && option.descriptionAr ? option.descriptionAr : option.description}</div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div id="tierSelection" style="display: none; margin-top: 2rem;">
            <h3>${isArabic ? 'الخطوة الثانية: اختر مستوى المعدات' : 'Step 2: Select Equipment Level'}</h3>
            <div id="tierOptions"></div>
        </div>
        <button class="modal-add-btn" id="modalAddBtn" onclick="addSelectedServiceToBooking()" disabled>
            ${isArabic ? 'اختر خياراً أولاً' : 'Select an Option First'}
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
        setTimeout(() => {
            tierSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
        
        let tierHTML = '';
        service.tiers.forEach(tier => {
            const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
            const tierName = isArabic && tier.nameAr ? tier.nameAr : tier.name;
            const tierDescription = isArabic && tier.descriptionAr ? tier.descriptionAr : tier.description;
            
            tierHTML += `
                <div class="service-option-item" data-tier-id="${tier.id}" 
                     onclick="selectTier('${tier.id}')" 
                     ${tier.image ? `data-tier-image="${tier.image}" data-tier-name="${tierName}"` : ''}>
                    <div class="option-header">
                        <span class="option-title">${tierName}</span>
                    </div>
                    <div class="option-description">${tierDescription}</div>
                </div>
            `;
        });
        
        tierOptions.innerHTML = tierHTML;
        
        const addBtn = document.getElementById('modalAddBtn');
        addBtn.disabled = true;
        const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
        addBtn.textContent = isArabic ? 'اختر مستوى المعدات' : 'Select Equipment Level';
    }
};

window.selectTier = function(tierId) {
    document.querySelectorAll('#tierOptions .service-option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedTier = document.querySelector(`[data-tier-id="${tierId}"]`);
    selectedTier.classList.add('selected');
    
    const service = serviceOptions[currentServiceModal];
    window.selectedTier = service.tiers.find(t => t.id === tierId);
    
    // Handle equipment display for videography
    if (service.hasEquipmentImages && window.selectedTier.image) {
        const serviceModal = document.getElementById('serviceModal');
        const equipmentPanel = document.getElementById('equipmentDisplayPanel');
        
        if (equipmentPanel) {
            // Update image
            const equipmentImage = document.getElementById('equipmentImage');
            
            // Fade out, change, fade in
            if (equipmentPanel.classList.contains('show')) {
                equipmentImage.style.opacity = '0';
                setTimeout(() => {
                    equipmentImage.src = window.selectedTier.image;
                    equipmentImage.style.opacity = '1';
                }, 300);
            } else {
                // First time showing
                equipmentImage.src = window.selectedTier.image;
                
                // Slide main modal left and show equipment panel
                setTimeout(() => {
                    serviceModal.classList.add('shift-left');
                    equipmentPanel.classList.add('show');
                }, 10);
            }
        }
    }
    
    const addBtn = document.getElementById('modalAddBtn');
    addBtn.disabled = false;
    const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
    addBtn.textContent = isArabic ? 'إضافة إلى الحجز' : 'Add to booking';
    
    // Smooth scroll to Add to booking button with extra space
    setTimeout(() => {
        addBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
};

// Show benefit popup
window.showBenefit = function(serviceId) {
    const modal = document.getElementById('serviceInfoModal');
    const modalContent = document.getElementById('modalContent');
    
    // Check if page is Arabic
    const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
    
    const benefit = isArabic 
        ? (serviceBenefitsAr[serviceId] || 'هذه الخدمة تساعد في تحسين حضور علامتك التجارية وتفاعل العملاء.')
        : (serviceBenefits[serviceId] || 'This service helps improve your brand presence and customer engagement.');
    
    const serviceTitle = serviceId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const title = isArabic ? `لماذا ${serviceTitle}؟` : `Why ${serviceTitle}?`;
    const comingSoon = isArabic ? 'المقارنة المرئية قريباً...' : 'Visual comparison coming soon...';
    
    modalContent.innerHTML = `
        <h2>${title}</h2>
        <p>${benefit}</p>
        <p style="margin-top: 1rem; font-style: italic;">${comingSoon}</p>
    `;
    
    modal.style.display = 'flex';
};
// Show benefit popup
window.showBenefit = function(serviceId) {
    const benefit = serviceBenefits[serviceId] || 'This service helps improve your brand presence and customer engagement.';
    
    // Create benefits panel if it doesn't exist
    let benefitsPanel = document.getElementById('benefitsDisplayPanel');
    if (!benefitsPanel) {
        benefitsPanel = document.createElement('div');
        benefitsPanel.id = 'benefitsDisplayPanel';
        benefitsPanel.className = 'benefits-display-panel';
        document.body.appendChild(benefitsPanel);
    }
    
    // Update content
    benefitsPanel.innerHTML = `
        <h3>Why ${serviceId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}?</h3>
        <p>${benefit}</p>
    `;
    
    // Show the panel next to the modal
    const serviceModal = document.getElementById('serviceModal');
    if (serviceModal && serviceModal.style.display === 'flex') {
        setTimeout(() => {
            serviceModal.classList.add('shift-left');
            benefitsPanel.classList.add('show');
        }, 10);
    }
};

window.closeServiceModal = function() {
    const modal = document.getElementById('serviceModal');
    const equipmentPanel = document.getElementById('equipmentDisplayPanel');
    const benefitsPanel = document.getElementById('benefitsDisplayPanel');
    
    // Reset main modal
    modal.classList.remove('shift-left');
    modal.style.display = 'none';
    
    // Hide and reset equipment panel
    if (equipmentPanel) {
        equipmentPanel.classList.remove('show');
        // Remove the panel after animation
        setTimeout(() => {
            const equipmentImage = document.getElementById('equipmentImage');
            if (equipmentImage) {
                equipmentImage.src = '';
            }
        }, 400);
    }
    
    // Hide and reset benefits panel
    if (benefitsPanel) {
        benefitsPanel.classList.remove('show');
    }
    
    currentServiceModal = null;
    window.selectedServiceOption = null;
    window.selectedTier = null;
};

window.closeModal = function() {
    const modal = document.getElementById('serviceInfoModal');
    modal.style.display = 'none';
};

// Add remaining helper functions for booking and other functionality
window.addToBookingDirect = function(serviceId, serviceName) {
    addToBooking({
        id: serviceId,
        name: serviceName
    });
};

window.addSelectedServiceToBooking = function() {
    if (!window.selectedServiceOption || !window.selectedTier) return;
    
    const itemName = `${window.selectedServiceOption.name} (${window.selectedTier.name})`;
    
    addToBooking({
        id: `${currentServiceModal}-${window.selectedServiceOption.id}-${window.selectedTier.id}`,
        name: itemName
    });
    
    closeServiceModal();
};

function addToBooking(item) {
    bookingItems.push(item);
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
}

function saveBookingToStorage() {
    localStorage.setItem('nmo-booking', JSON.stringify(bookingItems));
}

function loadBookingFromStorage() {
    const saved = localStorage.getItem('nmo-booking');
    if (saved) {
        bookingItems = JSON.parse(saved);
    }
}

function updateBookingDisplay() {
    const bookingCount = document.getElementById('bookingCount');
    const bookingItemsContainer = document.getElementById('bookingItems');
    
    bookingCount.textContent = bookingItems.length;
    
    if (bookingItems.length === 0) {
        bookingItemsContainer.innerHTML = '<p style="text-align: center; color: var(--gray-medium);">No services selected</p>';
        return;
    }
    
    bookingItemsContainer.innerHTML = '';
    
    bookingItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'booking-item';
        
        // Add animation class to new items
        if (index === bookingItems.length - 1) {
            itemEl.classList.add('item-added');
        }
        
        itemEl.innerHTML = `
            <button class="booking-item-remove" onclick="removeFromBooking(${index})" aria-label="Remove item">×</button>
            <span class="booking-item-name">${item.name}</span>
        `;
        bookingItemsContainer.appendChild(itemEl);
    });
    
    // Show package deal section if 3+ items
    const betterPriceSection = document.getElementById('betterPriceSection');
    if (betterPriceSection) {
        betterPriceSection.style.display = bookingItems.length >= 3 ? 'block' : 'none';
    }
}

window.removeFromBooking = function(index) {
    bookingItems.splice(index, 1);
    saveBookingToStorage();
    updateBookingDisplay();
};

window.toggleBooking = function() {
    const bookingPanel = document.getElementById('bookingPanel');
    bookingPanel.classList.toggle('open');
};

window.proceedToCheckout = function() {
    if (bookingItems.length === 0) {
        alert('Please add services to your request first');
        return;
    }
    
    // Save service request and redirect to checkout
    localStorage.setItem('nmo-checkout-booking', JSON.stringify(bookingItems));
    window.location.href = 'checkout.html';
};

function showBookingAnimation() {
    const bookingToggle = document.querySelector('.booking-toggle');
    bookingToggle.style.transform = 'scale(1.2)';
    setTimeout(() => {
        bookingToggle.style.transform = 'scale(1)';
    }, 200);
}

// Orientation selection for video editing
let selectedOrientation = null;

window.selectOrientation = function(orientation) {
    selectedOrientation = orientation;
    document.querySelectorAll('.platform-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.querySelector(`[data-orientation="${orientation}"]`).classList.add('selected');
    
    const addBtn = document.getElementById('modalAddBtn');
    addBtn.disabled = !selectedOrientation;
};

window.addVideoEditingToBooking = function() {
    if (!selectedOrientation) return;
    
    const editCount = parseInt(document.getElementById('editCount').value);
    
    let itemName = `Video Editing (${editCount} edit${editCount > 1 ? 's' : ''})`;
    
    // Add orientation
    const orientationName = document.querySelector(`[data-orientation="${selectedOrientation}"] .orientation-name`).textContent.trim();
    itemName += ` - ${orientationName}`;
    
    // Add addons
    const addons = [];
    document.querySelectorAll('.addon-option input:checked').forEach(checkbox => {
        const addonName = checkbox.parentElement.querySelector('span').textContent;
        addons.push(addonName);
    });
    
    if (addons.length > 0) {
        itemName += ` + ${addons.join(', ')}`;
    }
    
    addToBooking({
        id: `video-editing-${Date.now()}`,
        name: itemName
    });
    
    closeServiceModal();
};

// Show simple options (for services without tiers)
function showSimpleOptions(container, service) {
    let html = '<div class="service-option-group">';
    
    service.options.forEach(option => {
        html += `
            <div class="service-option-item" data-option-id="${option.id}" onclick="selectSimpleOption('${option.id}')">
                <div class="option-header">
                    <span class="option-title">${option.name}</span>
                </div>
                <div class="option-description">${option.description}</div>
            </div>
        `;
    });
    
    const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
    html += `</div><button class="modal-add-btn" id="modalAddBtn" disabled>${isArabic ? 'اختر خياراً أولاً' : 'Select an Option'}</button>`;
    container.innerHTML = html;
}

window.selectSimpleOption = function(optionId) {
    document.querySelectorAll('.service-option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    const selectedItem = document.querySelector(`[data-option-id="${optionId}"]`);
    selectedItem.classList.add('selected');
    
    const service = serviceOptions[currentServiceModal];
    window.selectedSimpleOption = service.options.find(opt => opt.id === optionId);
    
    const addBtn = document.getElementById('modalAddBtn');
    addBtn.disabled = false;
    const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
    addBtn.textContent = isArabic ? 'إضافة إلى الحجز' : 'Add to booking';
    addBtn.onclick = function() {
        addToBooking({
            id: optionId,
            name: window.selectedSimpleOption.name
        });
        closeServiceModal();
    };
};

// Show services with tiers (for photography)
function showServiceWithTiers(container, service) {
    const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
    let html = `
        <div class="service-option-group">
            <h3>${isArabic ? 'الخطوة الأولى: اختر نوع الخدمة' : 'Step 1: Select Your Service Type'}</h3>
    `;
    
    service.options.forEach(option => {
        html += `
            <div class="service-option-item" data-option-id="${option.id}" onclick="selectServiceOption('${option.id}')">
                <div class="option-header">
                    <span class="option-title">${option.name}</span>
                </div>
                <div class="option-description">${option.description}</div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div id="tierSelection" style="display: none; margin-top: 2rem;">
            <h3>${isArabic ? 'الخطوة الثانية: اختر مستوى المعدات' : 'Step 2: Select Equipment Level'}</h3>
            <div id="tierOptions"></div>
        </div>
        <button class="modal-add-btn" id="modalAddBtn" onclick="addSelectedServiceToBooking()" disabled>
            ${isArabic ? 'اختر خياراً أولاً' : 'Select an Option First'}
        </button>
    `;
    
    container.innerHTML = html;
}

// Discount functionality removed since there's no pricing

// Service info modal
window.showServiceInfo = function(infoType) {
    const modal = document.getElementById('serviceInfoModal');
    const modalContent = document.getElementById('modalContent');
    
    // Placeholder for samples/portfolio
    modalContent.innerHTML = `
        <h2>Sample Work</h2>
        <p>Our portfolio showcases high-quality work across various industries.</p>
        <p style="margin-top: 1rem; font-style: italic;">Portfolio gallery coming soon...</p>
    `;
    
    modal.style.display = 'flex';
};