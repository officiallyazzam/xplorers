document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            // Save the preferred language
            localStorage.setItem('preferredLanguage', lang);

            // Get current page name
            const currentPage = window.location.pathname.split('/').pop();
            
            // Map of English to Arabic page names and vice versa
            const pageMap = {
                'custom-quote.html': 'custom-quote-ar.html',
                'custom-quote-ar.html': 'custom-quote.html',
                'process.html': 'process-ar.html',
                'process-ar.html': 'process.html',
                'our-work.html': 'our-work-ar.html',
                'our-work-ar.html': 'our-work.html',
                'handpicked.html': 'handpicked-ar.html',
                'handpicked-ar.html': 'handpicked.html'
            };

            // Get the corresponding page in the other language
            const targetPage = pageMap[currentPage] || (lang === 'ar' ? 'index-ar.html' : 'index.html');

            // Redirect to the appropriate page
            window.location.href = targetPage;
        });
    });
});