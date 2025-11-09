// Language switching functionality
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);
        
        // Add event listeners to language buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // Update HTML dir attribute
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
        
        // Update active button state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        
        // Update text content
        this.updateTextContent(lang);
    }

    updateTextContent(lang) {
        // Find all elements with data-en and data-ar attributes
        const elements = document.querySelectorAll('[data-en][data-ar]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }
}

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.menuToggle && this.navMenu) {
            this.menuToggle.addEventListener('click', () => this.toggle());
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.menuToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.close();
                }
            });
            
            // Close menu when clicking on a link
            const navLinks = this.navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => this.close());
            });
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.navMenu.classList.toggle('active');
        this.animateToggleButton();
    }

    close() {
        this.isOpen = false;
        this.navMenu.classList.remove('active');
        this.animateToggleButton();
    }

    animateToggleButton() {
        const spans = this.menuToggle.querySelectorAll('span');
        if (this.isOpen) {
            spans[0].style.transform = 'rotate(45deg) translateY(7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

// Smooth scroll functionality
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all links with a hash
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Form validation helper
class FormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validateForm()) {
                e.preventDefault();
            }
        });

        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Clear previous errors
        this.clearError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'This field is required');
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                this.showError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        
        // Create or update error message
        let errorElement = field.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Booking functionality (for services)
class ServiceBooking {
    constructor() {
        this.booking = JSON.parse(localStorage.getItem('serviceBooking')) || [];
        this.init();
    }

    init() {
        this.updateBookingDisplay();
    }

    addToBooking(service) {
        const existingItem = this.booking.find(item => item.id === service.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.booking.push({ ...service, quantity: 1 });
        }
        
        this.saveBooking();
        this.updateBookingDisplay();
        this.showNotification('Service added to booking');
    }

    removeFromBooking(serviceId) {
        this.booking = this.booking.filter(item => item.id !== serviceId);
        this.saveBooking();
        this.updateBookingDisplay();
    }

    updateQuantity(serviceId, quantity) {
        const item = this.booking.find(item => item.id === serviceId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveBooking();
            this.updateBookingDisplay();
        }
    }

    clearBooking() {
        this.booking = [];
        this.saveBooking();
        this.updateBookingDisplay();
    }

    saveBooking() {
        localStorage.setItem('serviceBooking', JSON.stringify(this.booking));
    }

    updateBookingDisplay() {
        const bookingCount = document.querySelector('.booking-count');
        if (bookingCount) {
            const totalItems = this.booking.reduce((sum, item) => sum + item.quantity, 0);
            bookingCount.textContent = totalItems;
            bookingCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getTotal() {
        return this.booking.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language switcher
    new LanguageSwitcher();
    
    // Initialize mobile menu
    new MobileMenu();
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Initialize service booking (skip on packages page as it has its own booking system)
    if (!window.location.pathname.includes('packages.html')) {
        window.serviceBooking = new ServiceBooking();
    }
    
    // Initialize form validators if forms exist
    if (document.querySelector('#contact-form')) {
        new FormValidator('#contact-form');
    }
    if (document.querySelector('#quote-form')) {
        new FormValidator('#quote-form');
    }
    if (document.querySelector('#checkout-form')) {
        new FormValidator('#checkout-form');
    }
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.option-card, .service-card, .package-card').forEach(el => {
        observer.observe(el);
    });
});

// Utility functions
const utils = {
    formatCurrency: (amount, currency = 'USD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Export for use in other files
window.utils = utils;