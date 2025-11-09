// Form Translations and Placeholders
const formTranslations = {
    en: {
        // Form Labels
        'Name': 'Name',
        'Email': 'Email',
        'Phone': 'Phone',
        'Subject': 'Subject',
        'Message': 'Message',
        'Service Interest': 'Service Interest',
        'This is urgent (Response within 2 hours)': 'This is urgent (Response within 2 hours)',
        'Send Message': 'Send Message',
        'Let\'s Start a Conversation': 'Let\'s Start a Conversation',
        'Follow Us': 'Follow Us',
        'Fast Response Guaranteed': 'Fast Response Guaranteed',

        // Form Placeholders
        'name_placeholder': 'Enter your full name',
        'email_placeholder': 'Enter your email address',
        'phone_placeholder': 'Enter your phone number',
        'subject_placeholder': 'e.g., Project Inquiry',
        'message_placeholder': 'Tell us about your project or inquiry...',

        // Service Options
        'Select a Service': 'Select a Service',
        'Videography': 'Videography',
        'Photography': 'Photography',
        'Video Editing': 'Video Editing',
        'Motion Graphics': 'Motion Graphics',
        'Logo & Branding': 'Logo & Branding',
        'Social Media Management': 'Social Media Management',
        'Website Development': 'Website Development',
        'Service Package': 'Service Package',
        'Custom Solution': 'Custom Solution',
        'Other': 'Other',

        // Error Messages
        'This field is required': 'This field is required',
        'Please enter a valid email address': 'Please enter a valid email address',
        'Please enter a valid Saudi phone number': 'Please enter a valid Saudi phone number',
        'Message must be at least 10 characters': 'Message must be at least 10 characters',

        // Contact Info
        'Have a project in mind?': 'Have a project in mind?',
        'project_description': 'We\'re here to help you bring your vision to life. Send us a message and we\'ll get back to you as soon as possible.',
        'Email Us': 'Email Us',
        'Location': 'Location',
        'Business Hours': 'Business Hours',
        'business_hours': 'Sun - Thu: 9:00 AM - 6:00 PM',
        'closed_days': 'Fri - Sat: Closed',
        'location_text': 'Jeddah, Riyadh, Saudi Arabia',

        // Success Messages
        'Message Sent Successfully!': 'Message Sent Successfully!',
        'Thank you for reaching out': 'Thank you for reaching out. We\'ll get back to you soon.',
        'Great!': 'Great!',
        
        // Response Promise
        'response_promise': 'We respond to all inquiries within 24 hours. Urgent requests are handled within 2 hours during business hours.'
    },
    ar: {
        // Form Labels
        'Name': 'الاسم',
        'Email': 'البريد الإلكتروني',
        'Phone': 'رقم الجوال',
        'Subject': 'الموضوع',
        'Message': 'الرسالة',
        'Service Interest': 'الخدمة المطلوبة',
        'This is urgent (Response within 2 hours)': 'طلب عاجل (الرد خلال ساعتين)',
        'Send Message': 'إرسال الرسالة',
        'Let\'s Start a Conversation': 'لنبدأ محادثة',
        'Follow Us': 'تابعنا',
        'Fast Response Guaranteed': 'نضمن الرد السريع',

        // Form Placeholders
        'name_placeholder': 'أدخل اسمك الكامل',
        'email_placeholder': 'أدخل بريدك الإلكتروني',
        'phone_placeholder': 'أدخل رقم جوالك',
        'subject_placeholder': 'مثال: استفسار عن مشروع',
        'message_placeholder': 'أخبرنا عن مشروعك أو استفسارك...',

        // Service Options
        'Select a Service': 'اختر الخدمة',
        'Videography': 'التصوير الفيديو',
        'Photography': 'التصوير الفوتوغرافي',
        'Video Editing': 'مونتاج الفيديو',
        'Motion Graphics': 'الرسوم المتحركة',
        'Logo & Branding': 'تصميم الشعار والهوية',
        'Social Media Management': 'إدارة وسائل التواصل',
        'Website Development': 'تطوير المواقع',
        'Service Package': 'باقة خدمات',
        'Custom Solution': 'حل مخصص',
        'Other': 'أخرى',

        // Error Messages
        'This field is required': 'هذا الحقل مطلوب',
        'Please enter a valid email address': 'يرجى إدخال بريد إلكتروني صحيح',
        'Please enter a valid Saudi phone number': 'يرجى إدخال رقم جوال سعودي صحيح',
        'Message must be at least 10 characters': 'يجب أن تكون الرسالة ١٠ أحرف على الأقل',

        // Contact Info
        'Have a project in mind?': 'هل لديك مشروع في ذهنك؟',
        'project_description': 'نحن هنا لمساعدتك في تحقيق رؤيتك. أرسل لنا رسالة وسنعود إليك في أقرب وقت ممكن.',
        'Email Us': 'راسلنا عبر البريد',
        'Location': 'الموقع',
        'Business Hours': 'ساعات العمل',
        'business_hours': 'الأحد - الخميس: ٩:٠٠ صباحاً - ٦:٠٠ مساءً',
        'closed_days': 'الجمعة - السبت: مغلق',
        'location_text': 'جدة، الرياض، المملكة العربية السعودية',

        // Success Messages
        'Message Sent Successfully!': 'تم إرسال الرسالة بنجاح!',
        'Thank you for reaching out': 'شكراً لتواصلك معنا. سنعود إليك قريباً.',
        'Great!': 'رائع!',
        
        // Response Promise
        'response_promise': 'نرد على جميع الاستفسارات خلال ٢٤ ساعة. يتم التعامل مع الطلبات العاجلة خلال ساعتين خلال ساعات العمل.'
    }
};

// Function to update form translations and placeholders
function updateFormTranslations(lang) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);

    // Update text content for elements with data attributes
    const elements = document.querySelectorAll('[data-en], [data-ar]');
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Update form input placeholders
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        const placeholderKey = `${input.name}_placeholder`;
        if (formTranslations[lang][placeholderKey]) {
            input.placeholder = formTranslations[lang][placeholderKey];
        }
    });

    // Update option values in select elements
    const options = document.querySelectorAll('option[data-en], option[data-ar]');
    options.forEach(option => {
        const translation = option.getAttribute(`data-${lang}`);
        if (translation) {
            option.textContent = translation;
        }
    });

    // Update text alignment for inputs and textareas
    const formElements = document.querySelectorAll('.form-input, .form-textarea, .form-select, .form-label, .contact-details');
    formElements.forEach(element => {
        element.style.textAlign = lang === 'ar' ? 'right' : 'left';
    });
    
    // Update descriptions and other text content
    document.querySelector('.contact-info > p').textContent = formTranslations[lang].project_description;
    document.querySelector('.promise-content p').textContent = formTranslations[lang].response_promise;
    
    // Update business hours
    const businessHoursElements = document.querySelectorAll('.contact-method:nth-child(3) .contact-details p');
    if (businessHoursElements.length >= 2) {
        businessHoursElements[0].textContent = formTranslations[lang].business_hours;
        businessHoursElements[1].textContent = formTranslations[lang].closed_days;
    }
    
    // Update location text
    const locationElement = document.querySelector('.contact-method:nth-child(2) .contact-details p');
    if (locationElement) {
        locationElement.textContent = formTranslations[lang].location_text;
    }

    // Update error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        const key = error.textContent;
        if (formTranslations[lang][key]) {
            error.textContent = formTranslations[lang][key];
        }
    });
}

// Event listener for language change
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const lang = btn.getAttribute('data-lang');
            updateFormTranslations(lang);
        });
    });

    // Set initial language based on HTML lang attribute
    const initialLang = document.documentElement.lang || 'en';
    updateFormTranslations(initialLang);
});
