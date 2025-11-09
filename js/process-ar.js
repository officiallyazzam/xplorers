// Process step details
const processSteps = {
    '1': {
        title: 'الاكتشاف والاستشارة',
        description: 'نبدأ بفهم رؤيتك وأهدافك ومتطلباتك من خلال استشارة مفصلة.',
        duration: '١-٢ يوم',
        details: [
            'اجتماع أولي لمناقشة مشروعك',
            'فهم جمهورك المستهدف',
            'تحديد نطاق المشروع وأهدافه',
            'مناقشة الميزانية والجدول الزمني'
        ],
        benefits: 'تضمن هذه المرحلة فهماً واضحاً لاحتياجاتك وتمكننا من إنشاء حل مخصص يلبي أهدافك.'
    },
    '2': {
        title: 'الاستراتيجية والتخطيط',
        description: 'نطور استراتيجية شاملة مخصصة لاحتياجاتك وأهدافك المحددة.',
        duration: '٢-٣ أيام',
        details: [
            'إنشاء خطة مشروع مفصلة',
            'تطوير المفاهيم الإبداعية',
            'تقديم لوحات الأفكار والمراجع',
            'وضع الصيغة النهائية للمخرجات والمراحل الرئيسية'
        ],
        benefits: 'تضع الاستراتيجية المخطط لها جيداً الأساس لتنفيذ ناجح للمشروع وتضمن توافق جميع الأطراف المعنية.'
    },
    '3': {
        title: 'الإنتاج والإبداع',
        description: 'يقوم فريقنا بتحويل رؤيتك إلى واقع مع تنفيذ احترافي واهتمام بالتفاصيل.',
        duration: 'تختلف حسب المشروع',
        details: [
            'تنفيذ الخطة المعتمدة',
            'تحديثات منتظمة عن التقدم',
            'مراقبة الجودة في كل مرحلة',
            'دمج ملاحظات العميل'
        ],
        benefits: 'يضمن فريقنا المتمرس تنفيذاً عالي الجودة مع إبقائك على اطلاع طوال العملية.'
    },
    '4': {
        title: 'المراجعة والتحسين',
        description: 'نعمل معك لإتقان كل التفاصيل حتى تكون راضياً تماماً.',
        duration: '٢-٥ أيام',
        details: [
            'تقديم المخرجات الأولية',
            'جمع الملاحظات والاقتراحات',
            'إجراء التعديلات اللازمة',
            'ضمان الجودة النهائي'
        ],
        benefits: 'تضمن هذه العملية التكرارية أن المخرجات النهائية تلبي توقعاتك وتحافظ على معايير الجودة العالية لدينا.'
    },
    '5': {
        title: 'التسليم والدعم',
        description: 'نقدم المنتج النهائي ونوفر الدعم المستمر لضمان نجاحك.',
        duration: '١-٢ يوم',
        details: [
            'التسليم النهائي بالتنسيقات المطلوبة',
            'المساعدة في التنفيذ',
            'التدريب والتوثيق',
            'دعم ما بعد التسليم'
        ],
        benefits: 'نضمن تسليماً سلساً ونقدم الدعم الذي تحتاجه للاستفادة القصوى من مخرجاتك.'
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
        <div class="step-duration">المدة: ${step.duration}</div>
        <h3>الأنشطة الرئيسية</h3>
        <ul class="step-details visible">
            ${step.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
        <h3>المميزات</h3>
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