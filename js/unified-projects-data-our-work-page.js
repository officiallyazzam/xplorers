// Unified Projects Data - Our Work Page
// This file consolidates all projects from individual service data files
// Each project includes service tags for filtering while maintaining original structure

console.log('=== UNIFIED PROJECTS DATA LOADED ===');

window.unifiedProjectsData = {
    // Page information
    pageInfo: {
        title: {
            en: "All Projects",
            ar: "جميع المشاريع"
        },
        description: {
            en: "Comprehensive portfolio of all our work across different services",
            ar: "محفظة شاملة لجميع أعمالنا عبر الخدمات المختلفة"
        }
    },
    
    // Unified projects array with service tags
    projects: [
        // VIDEO PRODUCTION PROJECTS
        {
            id: "nissan-commercial",
            thumbnail: "images/portfolio/1%20nissan%20portfolio/thumbnail.jpg",
            url: "nissan-commercial.html",
            title: {
                en: "Nissan - LAB26",
                ar: "نيسان - LAB26"
            },
            category: "commercial",
            categories: ["commercial", "documentary"],
            categoryLabel: "Commercial",
            serviceTags: ["video production"], // Service metadata
            modalContent: {
                en: `
                    <div class="portfolio-container">
                        <img src="images/portfolio/1%20nissan%20portfolio/Nissan%20Portfolio-02_blank.png" alt="Nissan Portfolio" class="full-width-image">
                        <img src="images/portfolio/1%20nissan%20portfolio/Nissan%20Portfolio-03.png" alt="Nissan Portfolio" class="full-width-image">
                        
                        <div class="video-container">
                            <iframe src="https://player.vimeo.com/video/1032771252" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        
                        <img src="images/portfolio/1%20nissan%20portfolio/Nissan%20Portfolio-05.png" alt="Nissan Portfolio" class="full-width-image">
                        <img src="images/portfolio/1%20nissan%20portfolio/employee%20walking%20down%20the%20halway.gif" alt="Nissan Portfolio" class="full-width-image">
                        <img src="images/portfolio/1%20nissan%20portfolio/employee%20working.gif" alt="Nissan Portfolio" class="full-width-image">
                        <img src="images/portfolio/1%20nissan%20portfolio/nissanlogo.gif" alt="Nissan Portfolio" class="full-width-image">
                    </div>
                `,
                ar: `
                    <div class="portfolio-container">
                        <img src="images/portfolio/1%20nissan%20portfolio/Nissan%20Portfolio-02_blank.png" alt="محفظة نيسان" class="full-width-image">
                        <img src="images/portfolio/1%20nissan%20portfolio/Nissan%20Portfolio-03.png" alt="محفظة نيسان" class="full-width-image">
                        
                        <div class="video-container">
                            <iframe src="https://player.vimeo.com/video/1032771252" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        
                        <img src="images/portfolio/1%20nissan%20portfolio/Nissan%20Portfolio-05.png" alt="محفظة نيسان" class="full-width-image">
                        <img src="images/portfolio/1%20nissan%20portfolio/employee%20walking%20down%20the%20halway.gif" alt="محفظة نيسان" class="full-width-image">
                        <img src="images/portfolio/1%20nissan%20portfolio/employee%20working.gif" alt="محفظة نيسان" class="full-width-image">
                        <img src="images/portfolio/1%20nissan%20portfolio/nissanlogo.gif" alt="محفظة نيسان" class="full-width-image">
                    </div>
                `
            },
            description: {
                en: "Professional commercial video production for Nissan LAB26",
                ar: "إنتاج فيديو تجاري احترافي لنيسان LAB26"
            }
        },
        {
            id: "blue-arch-ramadan",
            thumbnail: "images/portfolio/3%20blue%20arch%20ramadan%20campaign/blue%20arch%20project-02.png",
            url: "blue-arch.html",
            title: {
                en: "BlueArch - Ramadan Campaign",
                ar: "بلو آرك - حملة رمضان"
            },
            category: "ecommerce",
            categories: ["ecommerce", "products"],
            categoryLabel: "E-commerce",
            serviceTags: ["video production"], // Service metadata
            modalContent: {
                en: `
                    <div class="project-overview">
                        <img src="images/portfolio/3%20blue%20arch%20ramadan%20campaign/blue%20arch%20project-02.png" alt="Blue Arch Project" class="full-width-image">
                        <img src="images/portfolio/3%20blue%20arch%20ramadan%20campaign/blue%20arch%20project-03.png" alt="Blue Arch Project" class="full-width-image">
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/TWUIkjcLl5c" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/bmNhEUtkzrI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/eFp3HS4Mhqk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/nRJpDzImfK0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/JAcwCQ_u4qI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <img src="images/portfolio/3%20blue%20arch%20ramadan%20campaign/video.gif" alt="Blue Arch Video GIF" class="full-width-image">
                        <img src="images/portfolio/3%20blue%20arch%20ramadan%20campaign/blue%20arch%20project-04.png" alt="Blue Arch Project" class="full-width-image">
                    </div>
                `,
                ar: `
                    <div class="project-overview">
                        <img src="images/portfolio/3%20blue%20arch%20ramadan%20campaign/blue%20arch%20project-02.png" alt="مشروع بلو آرك" class="full-width-image">
                        <img src="images/portfolio/3%20blue%20arch%20ramadan%20campaign/blue%20arch%20project-03.png" alt="مشروع بلو آرك" class="full-width-image">
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/TWUIkjcLl5c" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/bmNhEUtkzrI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/eFp3HS4Mhqk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/nRJpDzImfK0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/JAcwCQ_u4qI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        
                        <img src="images/portfolio/3%20blue%20arch%20ramadan%20campaign/video.gif" alt="فيديو بلو آرك GIF" class="full-width-image">
                        <img src="images/portfolio/3%20blue%20arch%20ramadan%20campaign/blue%20arch%20project-04.png" alt="مشروع بلو آرك" class="full-width-image">
                    </div>
                `
            },
            description: {
                en: "E-commerce video campaign for BlueArch during Ramadan season",
                ar: "حملة فيديو للتجارة الإلكترونية لبلو آرك خلال موسم رمضان"
            }
        },
        
        // ADDITIONAL VIDEO PRODUCTION PROJECTS
        {
            id: "happy-cloud-perfume",
            thumbnail: "images/portfolio/4%20happy%20cloud%20perfume%20commercial/happy%20cloud%20commercial%20profile-04.png",
            url: "",
            title: {
                en: "Happy Cloud - Perfume Commercial",
                ar: "هابي كلاود - إعلان العطور"
            },
            category: "commercial",
            categories: ["commercial", "products"],
            categoryLabel: "Commercial",
            serviceTags: ["video production"], // Service metadata
            modalContent: {
                en: `
                    <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000; margin: 20px 0; width: 100%;">
                        <iframe src="https://player.vimeo.com/video/1031830554" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                    </div>
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/happy%20cloud%20commercial%20profile-03.png" alt="Happy Cloud Commercial Profile" style="width: 100%; display: block; margin: 20px 0;">
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/happy%20cloud%20commercial%20profile.png" alt="Happy Cloud Commercial Profile" style="width: 100%; display: block; margin: 20px 0;">
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/abdullah%20walking.gif" alt="Abdullah Walking Animation" style="width: 100%; display: block; margin: 20px 0;">
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/man%20perfume%20small.gif" alt="Man Perfume Animation" style="width: 100%; display: block; margin: 20px 0;">
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/perfume%20dolly.gif" alt="Perfume Dolly Animation" style="width: 100%; display: block; margin: 20px 0;">
                `,
                ar: `
                    <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000; margin: 20px 0; width: 100%;">
                        <iframe src="https://player.vimeo.com/video/1031830554" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
                    </div>
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/happy%20cloud%20commercial%20profile-03.png" alt="Happy Cloud Commercial Profile" style="width: 100%; display: block; margin: 20px 0;">
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/happy%20cloud%20commercial%20profile.png" alt="Happy Cloud Commercial Profile" style="width: 100%; display: block; margin: 20px 0;">
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/abdullah%20walking.gif" alt="Abdullah Walking Animation" style="width: 100%; display: block; margin: 20px 0;">
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/man%20perfume%20small.gif" alt="Man Perfume Animation" style="width: 100%; display: block; margin: 20px 0;">
                    <img src="images/portfolio/4%20happy%20cloud%20perfume%20commercial/perfume%20dolly.gif" alt="Perfume Dolly Animation" style="width: 100%; display: block; margin: 20px 0;">
                `
            },
            description: {
                en: "A cinematic perfume commercial showcasing the elegance and sophistication of Happy Cloud fragrance through professional cinematography and artistic direction.",
                ar: "إعلان تجاري سينمائي للعطور يعرض أناقة وتطور عطر هابي كلاود من خلال التصوير السينمائي المحترف والإخراج الفني."
            }
        },
        {
            id: "banafa-for-oud",
            thumbnail: "images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-02.png",
            url: "",
            title: {
                en: "Banafa for Oud",
                ar: "بنافع للعود"
            },
            category: "commercial",
            categories: ["commercial", "products"],
            categoryLabel: "Commercial",
            serviceTags: ["video production"], // Service metadata
            modalContent: {
                en: `
                    <div class="container">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-02.png" alt="Image placeholder" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-03.png" alt="Image placeholder" class="full-width-image">
                        <div class="video-container">
                            <iframe src="https://player.vimeo.com/video/1034109114" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-04.png" alt="Image placeholder" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-05.png" alt="Image placeholder" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-06.png" alt="Image placeholder" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-09.png" alt="Image placeholder" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/before%20and%20after%20color%20grade.gif" alt="GIF placeholder" class="full-width-image">
                    </div>
                `,
                ar: `
                    <div class="container">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-02.png" alt="صورة" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-03.png" alt="صورة" class="full-width-image">
                        <div class="video-container">
                            <iframe src="https://player.vimeo.com/video/1034109114" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                        </div>
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-04.png" alt="صورة" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-05.png" alt="صورة" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-06.png" alt="صورة" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/Banafa%20for%20Oud%20Profile-09.png" alt="صورة" class="full-width-image">
                        <img src="images/portfolio/5%20banafa%20for%20oud/before%20and%20after%20color%20grade.gif" alt="صورة متحركة" class="full-width-image">
                    </div>
                `
            },
            description: {
                en: "A sophisticated commercial video production for Banafa for Oud, showcasing the luxury and tradition of premium oud fragrances through cinematic storytelling and professional color grading.",
                ar: "إنتاج فيديو تجاري متطور لبنافع للعود، يعرض الفخامة والتقاليد لعطور العود الفاخرة من خلال السرد السينمائي وتدرج الألوان المحترف."
            }
        },
        {
            id: "coffee-roastery",
            thumbnail: "images/portfolio/10%20Coffee%20Roastery/Coffee%20Roastery%20Cover%20page.png",
            url: "",
            title: {
                en: "Coffee Roastery",
                ar: "محمصة القهوة"
            },
            category: "fnb",
            categories: ["fnb", "commercial"],
            categoryLabel: "Food & Beverage",
            serviceTags: ["video production"], // Service metadata
            modalContent: {
                en: `
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/eixfl_ih7wM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                    </div>
                `,
                ar: `
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/eixfl_ih7wM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>
                    </div>
                `
            },
            description: {
                en: "Professional video production for a coffee roastery, capturing the artisanal process of coffee roasting and the rich culture surrounding specialty coffee.",
                ar: "إنتاج فيديو احترافي لمحمصة قهوة، يلتقط العملية الحرفية لتحميص القهوة والثقافة الغنية المحيطة بالقهوة المتخصصة."
            }
        },
        {
            id: "ncb-event-coverage",
            thumbnail: "images/portfolio/8%20ncb%20event%20coverage/image%201.png",
            url: "",
            title: {
                en: "NCB Event Coverage",
                ar: "تغطية فعاليات البنك الأهلي"
            },
            category: "events",
            categories: ["events", "commercial"],
            categoryLabel: "Events",
            serviceTags: ["video production"], // Service metadata
            modalContent: {
                en: `
                    <div class="ncb-portfolio-container">
                        <img src="images/portfolio/8%20ncb%20event%20coverage/image%201.png" alt="NCB Event Coverage" class="ncb-image">
                        <div class="ncb-video-container">
                            <iframe src="https://www.youtube.com/embed/jzRpDJZtsWA" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <img src="images/portfolio/8%20ncb%20event%20coverage/Artboard%202.png" alt="NCB Event Coverage" class="ncb-image">
                        <img src="images/portfolio/8%20ncb%20event%20coverage/Artboard%203.png" alt="NCB Event Coverage" class="ncb-image">
                        <img src="images/portfolio/8%20ncb%20event%20coverage/Artboard%201.png" alt="NCB Event Coverage" class="ncb-image">
                    </div>
                `,
                ar: `
                    <div class="ncb-portfolio-container">
                        <img src="images/portfolio/8%20ncb%20event%20coverage/image%201.png" alt="تغطية فعاليات البنك الأهلي" class="ncb-image">
                        <div class="ncb-video-container">
                            <iframe src="https://www.youtube.com/embed/jzRpDJZtsWA" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <img src="images/portfolio/8%20ncb%20event%20coverage/Artboard%202.png" alt="تغطية فعاليات البنك الأهلي" class="ncb-image">
                        <img src="images/portfolio/8%20ncb%20event%20coverage/Artboard%203.png" alt="تغطية فعاليات البنك الأهلي" class="ncb-image">
                        <img src="images/portfolio/8%20ncb%20event%20coverage/Artboard%201.png" alt="تغطية فعاليات البنك الأهلي" class="ncb-image">
                    </div>
                `
            },
            description: {
                en: "Professional event coverage for NCB (National Commercial Bank), documenting corporate events and activities with high-quality video production.",
                ar: "تغطية احترافية للفعاليات للبنك الأهلي التجاري، توثيق الفعاليات والأنشطة المؤسسية بإنتاج فيديو عالي الجودة."
            }
        },
        {
            id: "jetour",
            thumbnail: "images/portfolio/9%20jetour/Jetour-02.png",
            url: "",
            title: {
                en: "Jetour",
                ar: "جيتور"
            },
            category: "commercial",
            categories: ["commercial", "automotive"],
            categoryLabel: "Commercial",
            serviceTags: ["video production"], // Service metadata
            modalContent: {
                en: `
                    <div class="jetour-portfolio-container">
                        <img src="images/portfolio/9%20jetour/Jetour-04.png" alt="Jetour Commercial" class="jetour-image">
                        <div class="jetour-video-container">
                            <iframe src="https://www.youtube.com/embed/qS-yGnZqSlc" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <img src="images/portfolio/9%20jetour/Jetour-06.png" alt="Jetour Commercial" class="jetour-image">
                        <img src="images/portfolio/9%20jetour/Jetour-07.png" alt="Jetour Commercial" class="jetour-image">
                        <div class="jetour-video-container">
                            <iframe src="https://www.youtube.com/embed/RSNwHmi2Lhk" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <img src="images/portfolio/9%20jetour/Jetour-08.png" alt="Jetour Commercial" class="jetour-image">
                    </div>
                `,
                ar: `
                    <div class="jetour-portfolio-container">
                        <img src="images/portfolio/9%20jetour/Jetour-04.png" alt="إعلان جيتور" class="jetour-image">
                        <div class="jetour-video-container">
                            <iframe src="https://www.youtube.com/embed/qS-yGnZqSlc" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <img src="images/portfolio/9%20jetour/Jetour-06.png" alt="إعلان جيتور" class="jetour-image">
                        <img src="images/portfolio/9%20jetour/Jetour-07.png" alt="إعلان جيتور" class="jetour-image">
                        <div class="jetour-video-container">
                            <iframe src="https://www.youtube.com/embed/RSNwHmi2Lhk" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <img src="images/portfolio/9%20jetour/Jetour-08.png" alt="إعلان جيتور" class="jetour-image">
                    </div>
                `
            },
            description: {
                en: "Professional automotive commercial video production for Jetour, showcasing desert adventures and brand performance through cinematic storytelling.",
                ar: "إنتاج فيديو إعلاني احترافي للسيارات لجيتور، يعرض مغامرات الصحراء وأداء العلامة التجارية من خلال السرد السينمائي."
            }
        },
        
        // PHOTOGRAPHY PROJECTS
        {
            id: "ac-social-media",
            thumbnail: "images/portfolio/2%20a&c%20portfolio/a&c%20thumbnail.jpg",
            url: "ac-portfolio.html",
            title: {
                en: "A&C - Social Media Campaign",
                ar: "A&C - حملة وسائل التواصل الاجتماعي"
            },
            category: "ecommerce",
            categories: ["ecommerce", "products"],
            categoryLabel: "E-commerce",
            serviceTags: ["professional photography"], // Service metadata
            modalContent: {
                en: `
                    <div class="portfolio-container">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-02.png" alt="A&C Portfolio" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-03.png" alt="A&C Portfolio" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project.png" alt="A&C Portfolio" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-05.png" alt="A&C Portfolio" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-06.png" alt="A&C Portfolio" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-07.png" alt="A&C Portfolio" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-08.png" alt="A&C Portfolio" class="full-width-image">
                        
                        <div class="video-container">
                            <iframe src="https://player.vimeo.com/video/1029104613" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                `,
                ar: `
                    <div class="portfolio-container">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-02.png" alt="محفظة A&C" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-03.png" alt="محفظة A&C" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project.png" alt="محفظة A&C" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-05.png" alt="محفظة A&C" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-06.png" alt="محفظة A&C" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-07.png" alt="محفظة A&C" class="full-width-image">
                        <img src="images/portfolio/2%20a&c%20portfolio/a&c%20project-08.png" alt="محفظة A&C" class="full-width-image">
                        
                        <div class="video-container">
                            <iframe src="https://player.vimeo.com/video/1029104613" frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                `
            },
            description: {
                en: "Professional photography and social media campaign for A&C, featuring product photography and brand content creation.",
                ar: "تصوير احترافي وحملة وسائل التواصل الاجتماعي لـ A&C، تتضمن تصوير المنتجات وإنشاء محتوى العلامة التجارية."
            }
        },
        {
            id: "pizza-menu-photography",
            thumbnail: "images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-02.png",
            url: "pizza-menu-photography.html",
            title: {
                en: "Pizza Menu Photography",
                ar: "تصوير قائمة البيتزا"
            },
            category: "fnb",
            categories: ["fnb", "products"],
            categoryLabel: "F&B",
            serviceTags: ["professional photography"], // Service metadata
            modalContent: {
                en: `
                    <div class="portfolio-container pizza-modal-container">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-02.png" alt="Pizza Menu Photography" class="full-width-image pizza-top-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-03.png" alt="Pizza Menu Photography" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-04.png" alt="Pizza Menu Photography" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-05.png" alt="Pizza Menu Photography" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-06.png" alt="Pizza Menu Photography" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-07.png" alt="Pizza Menu Photography" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-08.png" alt="Pizza Menu Photography" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-09.png" alt="Pizza Menu Photography" class="full-width-image pizza-bottom-image">
                    </div>
                `,
                ar: `
                    <div class="portfolio-container pizza-modal-container">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-02.png" alt="تصوير قائمة البيتزا" class="full-width-image pizza-top-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-03.png" alt="تصوير قائمة البيتزا" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-04.png" alt="تصوير قائمة البيتزا" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-05.png" alt="تصوير قائمة البيتزا" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-06.png" alt="تصوير قائمة البيتزا" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-07.png" alt="تصوير قائمة البيتزا" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-08.png" alt="تصوير قائمة البيتزا" class="full-width-image">
                        <img src="images/portfolio/6%20pizza%20menu%20shoot/pizza%20photography%20portfolio-09.png" alt="تصوير قائمة البيتزا" class="full-width-image pizza-bottom-image">
                    </div>
                `
            },
            description: {
                en: "Professional food photography for pizza menu, showcasing appetizing dishes with expert lighting and composition for restaurant marketing.",
                ar: "تصوير طعام احترافي لقائمة البيتزا، يعرض أطباق شهية بإضاءة وتركيب خبير لتسويق المطاعم."
            }
        },
        
        // SOCIAL MEDIA CAMPAIGN PROJECTS
        {
            id: "royal-oud-social-media-campaign",
            thumbnail: "images/portfolio/7%20royal%20oud%20products/royal%20oud-02.png",
            url: "project-modal-trigger",
            title: {
                en: "Royal Oud - Social Media Campaign",
                ar: "رويال عود - حملة وسائل التواصل الاجتماعي"
            },
            category: "social-media",
            categories: ["social-media", "luxury", "products"],
            categoryLabel: "Social Media Campaign",
            serviceTags: ["social media campaign"], // Service metadata
            modalContent: {
                en: `
                    <style>
                        * { 
                            margin: 0; 
                            padding: 0; 
                            box-sizing: border-box; 
                        } 
                        
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                            line-height: 1.6; 
                            color: #333; 
                            background: #f5f5f5; 
                        } 
                        
                        .container { 
                            max-width: 1400px; 
                            margin: 0 auto; 
                        } 
                        
                        section { 
                            padding: 60px 40px; 
                            margin: 20px 0; 
                            background: white; 
                            border-radius: 10px; 
                        } 
                        
                        .hero { 
                            background: linear-gradient(135deg, #333231 0%, #403a38 100%); 
                            color: white; 
                            text-align: center; 
                            padding: 80px 40px; 
                        } 
                        
                        .hero h1 { 
                            font-size: 48px; 
                            font-weight: bold; 
                            margin-bottom: 20px; 
                        } 
                        
                        .hero p { 
                            font-size: 20px; 
                            margin-bottom: 30px; 
                            opacity: 0.9; 
                        } 
                        
                        .button { 
                            display: inline-block; 
                            padding: 12px 30px; 
                            background: #007AFF; 
                            color: white; 
                            text-decoration: none; 
                            border-radius: 8px; 
                            font-weight: 600; 
                            transition: background 0.3s; 
                        } 
                        
                        .button:hover { 
                            background: #0051D5; 
                        } 
                        
                        .text-block h2 { 
                            font-size: 36px; 
                            margin-bottom: 20px; 
                        } 
                        
                        .text-block p { 
                            font-size: 16px; 
                            color: #666; 
                        } 
                        
                        .full-width-image { 
                            width: 100%; 
                            display: block; 
                            margin: 20px 0; 
                        } 
                        
                        .card-grid { 
                            display: grid; 
                            grid-template-columns: repeat(3, 1fr); 
                            gap: 20px; 
                        } 
                        
                        .card { 
                            padding: 30px; 
                            background: #f9f9f9; 
                            border-radius: 10px; 
                            transition: transform 0.3s; 
                        } 
                        
                        .card:hover { 
                            transform: translateY(-5px); 
                        } 
                        
                        .card h3 { 
                            font-size: 24px; 
                            margin-bottom: 15px; 
                        } 
                        
                        .card p { 
                            font-size: 14px; 
                            color: #666; 
                        } 
                        
                        .video-container { 
                            position: relative; 
                            padding-bottom: 56.25%; 
                            height: 0; 
                            overflow: hidden; 
                            background: #000; 
                            margin: 20px 0; 
                            width: 100%; 
                        } 
                        
                        .video-container iframe { 
                            position: absolute; 
                            top: 0; 
                            left: 0; 
                            width: 100%; 
                            height: 100%; 
                        } 
                        
                        @media (max-width: 768px) { 
                            .card-grid { 
                                grid-template-columns: 1fr; 
                            } 
                            
                            .hero h1 { 
                                font-size: 32px; 
                            } 
                        } 
                    </style>
                    <div class="container">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-02.png" alt="Royal Oud Product" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-03.png" alt="Royal Oud Product" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-04.png" alt="Royal Oud Product" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-05.png" alt="Royal Oud Product" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-06.png" alt="Royal Oud Product" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-07.png" alt="Royal Oud Product" class="full-width-image">
                    </div>
                `,
                ar: `
                    <style>
                        * { 
                            margin: 0; 
                            padding: 0; 
                            box-sizing: border-box; 
                        } 
                        
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                            line-height: 1.6; 
                            color: #333; 
                            background: #f5f5f5; 
                        } 
                        
                        .container { 
                            max-width: 1400px; 
                            margin: 0 auto; 
                        } 
                        
                        section { 
                            padding: 60px 40px; 
                            margin: 20px 0; 
                            background: white; 
                            border-radius: 10px; 
                        } 
                        
                        .hero { 
                            background: linear-gradient(135deg, #333231 0%, #403a38 100%); 
                            color: white; 
                            text-align: center; 
                            padding: 80px 40px; 
                        } 
                        
                        .hero h1 { 
                            font-size: 48px; 
                            font-weight: bold; 
                            margin-bottom: 20px; 
                        } 
                        
                        .hero p { 
                            font-size: 20px; 
                            margin-bottom: 30px; 
                            opacity: 0.9; 
                        } 
                        
                        .button { 
                            display: inline-block; 
                            padding: 12px 30px; 
                            background: #007AFF; 
                            color: white; 
                            text-decoration: none; 
                            border-radius: 8px; 
                            font-weight: 600; 
                            transition: background 0.3s; 
                        } 
                        
                        .button:hover { 
                            background: #0051D5; 
                        } 
                        
                        .text-block h2 { 
                            font-size: 36px; 
                            margin-bottom: 20px; 
                        } 
                        
                        .text-block p { 
                            font-size: 16px; 
                            color: #666; 
                        } 
                        
                        .full-width-image { 
                            width: 100%; 
                            display: block; 
                            margin: 20px 0; 
                        } 
                        
                        .card-grid { 
                            display: grid; 
                            grid-template-columns: repeat(3, 1fr); 
                            gap: 20px; 
                        } 
                        
                        .card { 
                            padding: 30px; 
                            background: #f9f9f9; 
                            border-radius: 10px; 
                            transition: transform 0.3s; 
                        } 
                        
                        .card:hover { 
                            transform: translateY(-5px); 
                        } 
                        
                        .card h3 { 
                            font-size: 24px; 
                            margin-bottom: 15px; 
                        } 
                        
                        .card p { 
                            font-size: 14px; 
                            color: #666; 
                        } 
                        
                        .video-container { 
                            position: relative; 
                            padding-bottom: 56.25%; 
                            height: 0; 
                            overflow: hidden; 
                            background: #000; 
                            margin: 20px 0; 
                            width: 100%; 
                        } 
                        
                        .video-container iframe { 
                            position: absolute; 
                            top: 0; 
                            left: 0; 
                            width: 100%; 
                            height: 100%; 
                        } 
                        
                        @media (max-width: 768px) { 
                            .card-grid { 
                                grid-template-columns: 1fr; 
                            } 
                            
                            .hero h1 { 
                                font-size: 32px; 
                            } 
                        } 
                    </style>
                    <div class="container">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-02.png" alt="منتج رويال عود" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-03.png" alt="منتج رويال عود" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-04.png" alt="منتج رويال عود" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-05.png" alt="منتج رويال عود" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-06.png" alt="منتج رويال عود" class="full-width-image">
                        <img src="images/portfolio/7%20royal%20oud%20products/royal%20oud-07.png" alt="منتج رويال عود" class="full-width-image">
                    </div>
                `
            },
            description: {
                en: "Comprehensive social media campaign for Royal Oud luxury fragrance brand, featuring elegant product photography and brand storytelling content.",
                ar: "حملة شاملة لوسائل التواصل الاجتماعي لعلامة رويال عود للعطور الفاخرة، تتضمن تصوير منتجات أنيق ومحتوى سرد العلامة التجارية."
            }
        }
    ]
};

// Service filtering functions
window.getProjectsByService = function(serviceName) {
    if (!window.unifiedProjectsData || !window.unifiedProjectsData.projects) {
        console.warn('Unified projects data not available');
        return [];
    }
    
    // Return all projects if serviceName is 'all' or empty
    if (!serviceName || serviceName === 'all') {
        return window.unifiedProjectsData.projects;
    }
    
    // Filter projects by service tag
    return window.unifiedProjectsData.projects.filter(project => 
        project.serviceTags && project.serviceTags.includes(serviceName)
    );
};

// Get all available service tags
window.getAvailableServiceTags = function() {
    if (!window.unifiedProjectsData || !window.unifiedProjectsData.projects) {
        return [];
    }
    
    const allTags = new Set();
    window.unifiedProjectsData.projects.forEach(project => {
        if (project.serviceTags) {
            project.serviceTags.forEach(tag => allTags.add(tag));
        }
    });
    
    return Array.from(allTags);
};

// Get project count for a specific service
window.getServiceProjectCount = function(serviceName) {
    return window.getProjectsByService(serviceName).length;
};

console.log('=== UNIFIED PROJECTS DATA FUNCTIONS DEFINED ===');