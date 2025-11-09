// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeContactForm();
    initializePhoneFormatting();
});

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
    
    // Handle urgent checkbox
    const urgentCheckbox = form.querySelector('input[name="urgent"]');
    if (urgentCheckbox) {
        urgentCheckbox.addEventListener('change', (e) => {
            const label = e.target.parentElement;
            if (e.target.checked) {
                label.style.background = 'rgba(255, 255, 255, 0.2)';
                label.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            } else {
                label.style.background = 'rgba(255, 255, 255, 0.1)';
                label.style.borderColor = 'transparent';
            }
        });
    }
}

// Initialize phone formatting
function initializePhoneFormatting() {
    const phoneInput = document.querySelector('input[type="tel"]');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format for Saudi phone numbers (05X XXX XXXX)
        if (value.startsWith('0')) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 10) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            } else {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
            }
        } 
        // Format for international numbers (+966 5X XXX XXXX)
        else if (value.startsWith('966')) {
            if (value.length <= 3) {
                value = '+' + value;
            } else if (value.length <= 5) {
                value = '+' + value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 8) {
                value = '+' + value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5);
            } else {
                value = '+' + value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5, 8) + ' ' + value.slice(8, 12);
            }
        }
        
        e.target.value = value;
    });
}

// Validate field
function validateField(field) {
    const value = field.value.trim();
    
    // Check required
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Check email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Check phone
    if (field.type === 'tel' && value) {
        const phoneDigits = value.replace(/\D/g, '');
        // Check for Saudi phone format (10 digits starting with 05) or international
        if (phoneDigits.length < 10 || (phoneDigits.startsWith('0') && !phoneDigits.startsWith('05'))) {
            showError(field, 'Please enter a valid Saudi phone number');
            return false;
        }
    }
    
    // Check message minimum length
    if (field.name === 'message' && value && value.length < 10) {
        showError(field, 'Message must be at least 10 characters');
        return false;
    }
    
    clearError(field);
    return true;
}

// Show error message
function showError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
}

// Clear error message
function clearError(field) {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.form-submit');
    
    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Collect form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject') || 'General Inquiry',
        service: formData.get('service'),
        message: formData.get('message'),
        urgent: formData.get('urgent') ? true : false,
        timestamp: new Date().toISOString()
    };
    
    // Determine response time based on urgency
    if (data.urgent) {
        data.expectedResponse = '2 hours';
    } else {
        data.expectedResponse = '24 hours';
    }
    
    // Send to backend API
    try {
        const response = await fetch('https://rcqoz8avs2.execute-api.me-south-1.amazonaws.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Show success modal
            showSuccessModal(data.urgent);
            
            // Reset form
            form.reset();
            
            // Reset urgent checkbox style
            const urgentLabel = form.querySelector('.urgency-checkbox');
            if (urgentLabel) {
                urgentLabel.style.background = 'rgba(255, 255, 255, 0.1)';
                urgentLabel.style.borderColor = 'transparent';
            }
        } else {
            alert('Error: ' + result.message);
        }

        // Reset button
        submitButton.classList.remove('loading');
        submitButton.disabled = false;

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to send message. Please try again.');
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

// Show success modal
function showSuccessModal(isUrgent) {
    const modal = document.getElementById('successModal');
    const modalContent = modal.querySelector('.success-modal-content');
    
    // Update message based on urgency
    if (isUrgent) {
        modalContent.querySelector('p').textContent = 
            "Thank you for reaching out. We've marked your message as urgent and will respond within 2 hours during business hours.";
    } else {
        modalContent.querySelector('p').textContent = 
            "Thank you for reaching out. We'll get back to you within 24 hours.";
    }
    
    modal.style.display = 'flex';
    
    // Add animation
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
    }, 10);
}

// Close success modal
window.closeSuccessModal = function() {
    const modal = document.getElementById('successModal');
    const modalContent = modal.querySelector('.success-modal-content');
    
    modalContent.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
};

// Add ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('successModal');
        if (modal && modal.style.display === 'flex') {
            closeSuccessModal();
        }
    }
});

// Auto-fill service if coming from a specific service page
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    
    if (service) {
        const serviceSelect = document.querySelector('select[name="service"]');
        if (serviceSelect) {
            serviceSelect.value = service;
        }
    }
});