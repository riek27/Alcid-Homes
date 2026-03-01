// ============================================
// GLOBAL SCRIPT - INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ---------- Header scroll effect ----------
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ---------- Mobile menu toggle ----------
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // ---------- Dropdown toggle (click, no redirect) ----------
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();              // stop navigation
        const dropdown = this.closest('.dropdown');
        dropdown.classList.toggle('open');
    });
});

// Close dropdown when clicking outside (optional, improves UX)
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.open').forEach(drop => {
            drop.classList.remove('open');
        });
    }
});
    // ---------- Read more / less (blog) ----------
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.blog-card');
            const textDiv = card.querySelector('.blog-text');
            textDiv.classList.toggle('expanded');
            this.classList.toggle('active');
            this.innerHTML = textDiv.classList.contains('expanded') 
                ? 'Read Less <i class="fas fa-chevron-up"></i>' 
                : 'Read More <i class="fas fa-chevron-down"></i>';
        });
    });

    // ---------- Form submit simulation (contact) ----------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const successMsg = document.getElementById('formSuccess');
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 4000);
            contactForm.reset();
        });
    }

    // ---------- Smooth scroll for anchor links (services page) ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---------- Intersection Observer for fade-in animations ----------
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .gallery-item, .mv-card, .expert-card, .service-full-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ---------- Counter animation (if any) ----------
    const counters = document.querySelectorAll('.counter-number');
    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target') || 0;
                    let count = 0;
                    const update = () => {
                        if (count < target) {
                            count += Math.ceil(target / 80);
                            counter.innerText = count;
                            requestAnimationFrame(update);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    update();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    // ---------- Lightbox effect for gallery (simple) ----------
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.inset = '0';
            lightbox.style.background = 'rgba(0,0,0,0.9)';
            lightbox.style.zIndex = '10000';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.cursor = 'zoom-out';
            lightbox.innerHTML = `<img src="${imgSrc}" style="max-width:90%; max-height:90%; border-radius:20px;">`;
            lightbox.addEventListener('click', () => lightbox.remove());
            document.body.appendChild(lightbox);
        });
    });
});
