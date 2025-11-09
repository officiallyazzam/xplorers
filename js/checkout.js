// Checkout Page JavaScript

let bookingItems = [];

// Load booking items on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutBooking();
    setupFormSubmission();
    updatePlaceholdersOnLanguageChange();
});

// Load booking from localStorage
function loadCheckoutBooking() {
    const savedBooking = localStorage.getItem('nmo-checkout-booking');
    
    if (!savedBooking || savedBooking === '[]') {
        // No items in booking, redirect back to handpicked page
        window.location.href = 'handpicked.html';
        return;
    }
    
    bookingItems = JSON.parse(savedBooking);
    displayOrderSummary();
}

// Display order summary
function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('orderItems');
    const orderTotalElement = document.getElementById('orderTotal');
    
    if (!orderItemsContainer) return;
    
    orderItemsContainer.innerHTML = '';
    
    bookingItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'order-item';
        itemEl.innerHTML = `
            <div class="order-item-content">
                <div class="order-item-name">${item.name}</div>
                ${item.details ? `<div class="order-item-details">${item.details}</div>` : ''}
            </div>
            <button class="remove-item-btn" onclick="removeItem(${index})" title="Remove item">
                ×
            </button>
        `;
        orderItemsContainer.appendChild(itemEl);
    });
    
    // Hide total section since no pricing
    if (orderTotalElement) {
        orderTotalElement.style.display = 'none';
    }
}

// Remove item from booking
function removeItem(index) {
    if (index >= 0 && index < bookingItems.length) {
        bookingItems.splice(index, 1);
        
        // Update localStorage
        localStorage.setItem('nmo-checkout-booking', JSON.stringify(bookingItems));
        
        // Check if no items left
        if (bookingItems.length === 0) {
            // Redirect back to handpicked page if no items
            window.location.href = 'handpicked.html';
            return;
        }
        
        // Refresh the display
        displayOrderSummary();
    }
}

// Setup form submission
function setupFormSubmission() {
    const form = document.getElementById('checkoutForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Disable submit button
        submitBtn.disabled = true;
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
submitBtn.innerHTML = currentLang === 'ar' ? '<span>جاري الإرسال...</span>' : '<span>Submitting...</span>';
        
        // Prepare form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            companyName: document.getElementById('companyName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            projectDetails: document.getElementById('projectDetails').value.trim(),
            timeline: document.getElementById('timeline').value,
            specialRequests: document.getElementById('specialRequests').value.trim(),
            services: bookingItems
        };
        
        try {
            // Send to backend
            const response = await fetch('https://rcqoz8avs2.execute-api.me-south-1.amazonaws.com/handpicked-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Clear booking
                localStorage.removeItem('nmo-checkout-booking');
                localStorage.removeItem('nmo-booking');
                
                // Show success message
                showSuccessMessage();
            } else {
                throw new Error(result.message || 'Failed to submit order');
            }
            
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to submit order. Please try again or contact us directly.');
            submitBtn.disabled = false;
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
submitBtn.innerHTML = currentLang === 'ar' ? '<span data-en="Submit Order" data-ar="إرسال الطلب">إرسال الطلب</span>' : '<span data-en="Submit Order" data-ar="إرسال الطلب">Submit Order</span>';
        }
    });
}

// Validate form
function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    // Required fields
    const requiredFields = [
        { id: 'fullName', message: 'Full name is required' },
        { id: 'email', message: 'Email is required' },
        { id: 'phone', message: 'Phone number is required' }
    ];
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        
        if (!value) {
            showError(input, field.message);
            isValid = false;
        }
    });
    
    // Email validation
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    if (emailValue && !isValidEmail(emailValue)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();
    if (phoneValue && !isValidPhone(phoneValue)) {
        showError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
    }
    
    return isValid;
}

// Show error message
function showError(input, message) {
    input.classList.add('error');
    
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    
    input.parentElement.appendChild(errorEl);
}

// Email validation
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const regex = /^[\d\s\-\+\(\)]+$/;
    return regex.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

// Show success message
function showSuccessMessage() {
    const checkoutContainer = document.getElementById('checkoutContainer');
    const successMessage = document.getElementById('successMessage');
    
    if (checkoutContainer && successMessage) {
        checkoutContainer.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Update placeholders and options based on language
function updatePlaceholdersOnLanguageChange() {
    // Listen for language changes
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateFormContent(lang);
        });
    });
    
    // Set initial language
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    updateFormContent(currentLang);
}

// Update form content based on language
function updateFormContent(lang) {
    const translations = {
        en: {
            projectDetailsPlaceholder: 'Tell us more about your project...',
            specialRequestsPlaceholder: 'Any special requirements or preferences...',
            timelineOptions: {
                default: 'Select timeline',
                urgent: 'Urgent (1-2 weeks)',
                standard: 'Standard (3-4 weeks)',
                flexible: 'Flexible (1-2 months)'
            },
            submitting: 'Submitting...',
            submitOrder: 'Submit Order'
        },
        ar: {
            projectDetailsPlaceholder: 'أخبرنا المزيد عن مشروعك...',
            specialRequestsPlaceholder: 'أي متطلبات أو تفضيلات خاصة...',
            timelineOptions: {
                default: 'اختر الإطار الزمني',
                urgent: 'عاجل (1-2 أسبوع)',
                standard: 'قياسي (3-4 أسابيع)',
                flexible: 'مرن (1-2 شهر)'
            },
            submitting: 'جاري الإرسال...',
            submitOrder: 'إرسال الطلب'
        }
    };
    
    const t = translations[lang];
    
    // Update placeholders
    const projectDetails = document.getElementById('projectDetails');
    if (projectDetails) {
        projectDetails.placeholder = t.projectDetailsPlaceholder;
    }
    
    const specialRequests = document.getElementById('specialRequests');
    if (specialRequests) {
        specialRequests.placeholder = t.specialRequestsPlaceholder;
    }
    
    // Update timeline options
    const timeline = document.getElementById('timeline');
    if (timeline) {
        timeline.options[0].textContent = t.timelineOptions.default;
        timeline.options[1].textContent = t.timelineOptions.urgent;
        timeline.options[2].textContent = t.timelineOptions.standard;
        timeline.options[3].textContent = t.timelineOptions.flexible;
    }
    
    // Store translations for later use
    window.checkoutTranslations = t;
}