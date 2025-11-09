// Process step details
const processSteps = {
    '1': {
        title: 'Discovery & Consultation',
        description: 'We start by understanding your vision, goals, and requirements through a detailed consultation.',
        duration: '1-2 days',
        details: [
            'Initial meeting to discuss your project',
            'Understanding your target audience',
            'Defining project scope and objectives',
            'Budget and timeline discussion'
        ],
        benefits: 'This phase ensures we have a clear understanding of your needs and can create a tailored solution that meets your objectives.'
    },
    '2': {
        title: 'Strategy & Planning',
        description: 'We develop a comprehensive strategy tailored to your specific needs and goals.',
        duration: '2-3 days',
        details: [
            'Create detailed project plan',
            'Develop creative concepts',
            'Present mood boards and references',
            'Finalize deliverables and milestones'
        ],
        benefits: 'A well-planned strategy sets the foundation for successful project execution and ensures all stakeholders are aligned.'
    },
    '3': {
        title: 'Production & Creation',
        description: 'Our team brings your vision to life with professional execution and attention to detail.',
        duration: 'Varies by project',
        details: [
            'Execute the approved plan',
            'Regular progress updates',
            'Quality control at each stage',
            'Client feedback integration'
        ],
        benefits: 'Our experienced team ensures high-quality execution while keeping you informed throughout the process.'
    },
    '4': {
        title: 'Review & Refinement',
        description: 'We work with you to perfect every detail until you\'re completely satisfied.',
        duration: '2-5 days',
        details: [
            'Present initial deliverables',
            'Gather feedback and suggestions',
            'Make revisions as needed',
            'Final quality assurance'
        ],
        benefits: 'This iterative process ensures the final deliverables meet your expectations and maintain our high quality standards.'
    },
    '5': {
        title: 'Delivery & Support',
        description: 'We deliver the final product and provide ongoing support to ensure your success.',
        duration: '1-2 days',
        details: [
            'Final delivery in required formats',
            'Implementation assistance',
            'Training and documentation',
            'Post-delivery support'
        ],
        benefits: 'We ensure a smooth handover and provide the support you need to make the most of your deliverables.'
    }
};

// Function to show step details in modal
function openProcessModal(stepId) {
    const step = processSteps[stepId];
    const modal = document.getElementById('processModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <h2>${step.title}</h2>
        <p>${step.description}</p>
        <div class="step-duration">Duration: ${step.duration}</div>
        <h3>Key Activities</h3>
        <ul class="step-details visible">
            ${step.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
        <h3>Benefits</h3>
        <p>${step.benefits}</p>
    `;

    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeProcessModal() {
    const modal = document.getElementById('processModal');
    modal.classList.remove('visible');
    document.body.style.overflow = '';
}

// Function to show step details inline
function showStepDetails(stepId) {
    const step = processSteps[stepId];
    openProcessModal(stepId);
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('processModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProcessModal();
        }
    });
});

// Interest filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.interest-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-filter');
            filterProcessCards(category);
        });
    });
});

// Function to filter process cards
function filterProcessCards(category) {
    const steps = document.querySelectorAll('.process-step');
    const cards = document.querySelectorAll('.service-process-card');
    
    steps.forEach(step => {
        if (category === 'all' || step.getAttribute('data-category') === category) {
            step.classList.remove('fade-out');
            step.classList.add('fade-in');
        } else {
            step.classList.remove('fade-in');
            step.classList.add('fade-out');
        }
    });
    
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
            card.classList.remove('fade-out');
            card.classList.add('fade-in');
        } else {
            card.classList.add('fade-out');
            setTimeout(() => {
                card.classList.add('hidden');
            }, 300);
        }
    });
}

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProcessModal();
    }
});
