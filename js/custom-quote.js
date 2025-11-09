// Custom Quote Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    initializeFileUpload();
    initializeValidation();
});

// Initialize form
function initializeForm() {
    const form = document.getElementById('customQuoteForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearError(input));
    });
    
    // Handle service checkbox changes
    const serviceCheckboxes = form.querySelectorAll('input[name="services"]');
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedServices);
    });
    
    // Handle goals checkbox changes
    const goalCheckboxes = form.querySelectorAll('input[name="goals"]');
    goalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', validateGoals);
    });
}

// Initialize file upload
function initializeFileUpload() {
    const fileInput = document.querySelector('input[type="file"]');
    if (!fileInput) return;
    
    fileInput.addEventListener('change', handleFileSelect);
}

// Handle file selection
function handleFileSelect(e) {
    const files = e.target.files;
    const fileList = document.getElementById('fileList');
    
    if (!files.length) {
        fileList.innerHTML = '';
        return;
    }
    
    fileList.innerHTML = '';
    let totalSize = 0;
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSize = file.size / 1024 / 1024; // Convert to MB
        totalSize += fileSize;
        
        // Check file size
        if (fileSize > 10) {
            showError(e.target, `File "${file.name}" exceeds 10MB limit`);
            e.target.value = '';
            fileList.innerHTML = '';
            return;
        }
        
        // Check file type
        const allowedTypes = ['application/pdf', 'application/msword', 
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'image/jpeg', 'image/png'];
        
        if (!allowedTypes.includes(file.type)) {
            showError(e.target, `File type not allowed: ${file.name}`);
            e.target.value = '';
            fileList.innerHTML = '';
            return;
        }
        
        // Add file to list
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-name">${file.name} (${fileSize.toFixed(2)} MB)</span>
            <button type="button" class="file-remove" onclick="removeFile(${i})">&times;</button>
        `;
        fileList.appendChild(fileItem);
    }
    
    // Check total size
    if (totalSize > 20) {
        showError(e.target, 'Total file size exceeds 20MB');
        e.target.value = '';
        fileList.innerHTML = '';
    }
}

// Remove file from list
window.removeFile = function(index) {
    const fileInput = document.querySelector('input[type="file"]');
    const dt = new DataTransfer();
    const files = fileInput.files;
    
    for (let i = 0; i < files.length; i++) {
        if (i !== index) {
            dt.items.add(files[i]);
        }
    }
    
    fileInput.files = dt.files;
    handleFileSelect({ target: fileInput });
};

// Update selected services display
function updateSelectedServices() {
    const checkboxes = document.querySelectorAll('input[name="services"]:checked');
    const count = checkboxes.length;
    
    // Show/hide other field if needed
    const otherCheckbox = document.querySelector('input[name="services"][value="other"]');
    if (otherCheckbox && otherCheckbox.checked) {
        // Could add an additional text field for "other" specification
    }
}

// Validate goals selection
function validateGoals() {
    const goalCheckboxes = document.querySelectorAll('input[name="goals"]:checked');
    if (goalCheckboxes.length === 0) {
        const firstCheckbox = document.querySelector('input[name="goals"]');
        showError(firstCheckbox.parentElement.parentElement, 'Please select at least one goal');
        return false;
    }
    clearError(document.querySelector('input[name="goals"]').parentElement.parentElement);
    return true;
}

// Form validation
function initializeValidation() {
    // Add custom validation messages
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('invalid', (e) => {
            e.preventDefault();
            showError(emailInput, 'Please enter a valid email address');
        });
    }
    
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            // Format phone number
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.slice(0, 3) + ' ' + value.slice(3);
                } else {
                    value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });
    }
}

// Validate individual field
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
        if (phoneDigits.length < 10) {
            showError(field, 'Please enter a valid phone number');
            return false;
        }
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
    
    // Validate at least one service selected
    const serviceCheckboxes = form.querySelectorAll('input[name="services"]:checked');
    if (serviceCheckboxes.length === 0) {
        showError(document.querySelector('input[name="services"]').parentElement.parentElement, 
                 'Please select at least one service');
        isValid = false;
    }
    
    // Validate goals
    if (!validateGoals()) {
        isValid = false;
    }
    
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
        fullName: formData.get('fullName'),
        companyName: formData.get('companyName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        services: Array.from(form.querySelectorAll('input[name="services"]:checked'))
                       .map(cb => cb.value),
        description: formData.get('description'),
        timeline: formData.get('timeline'),
        budget: formData.get('budget'),
        referral: formData.get('referral'),
        specialRequirements: formData.get('specialRequirements'),
        goals: Array.from(form.querySelectorAll('input[name="goals"]:checked'))
                    .map(cb => cb.value),
        investment: formData.get('investment'),
        timestamp: new Date().toISOString()
    };
    
// Send to backend API
    try {
        const response = await fetch('https://rcqoz8avs2.execute-api.me-south-1.amazonaws.com/custom-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Show success modal
            showSuccessModal();
            
            // Reset form
            form.reset();
            document.getElementById('fileList').innerHTML = '';
        } else {
            alert('Error: ' + result.message);
        }

        // Reset button
        submitButton.classList.remove('loading');
        submitButton.disabled = false;

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to send quote request. Please try again.');
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'flex';
    
    // Add animation
    setTimeout(() => {
        modal.querySelector('.success-modal-content').style.transform = 'scale(1)';
    }, 10);
}

// Close success modal
window.closeSuccessModal = function() {
    const modal = document.getElementById('successModal');
    modal.querySelector('.success-modal-content').style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        // Optionally redirect
        // window.location.href = 'services.html';
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