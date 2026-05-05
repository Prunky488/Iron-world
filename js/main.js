/* ============================================
   ЖЕЛЕЗНЫЙ МИР - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500);
    }

    // Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll Animations
    const scrollElements = document.querySelectorAll('.scroll-animate');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Modals
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // News buttons (for pages without data-modal)
    document.querySelectorAll('.news-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = this.closest('[data-modal]');
            if (card) {
                const modalId = card.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Form validation feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc2626';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });

        // Clear error on input
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });

    // Parallax effect for hero background (subtle)
    const heroBg = document.querySelector('.hero-bg img');
    if (heroBg && !window.matchMedia('(pointer: coarse)').matches) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroBg.style.transform = `translateY(${rate}px)`;
        });
    }

    // Button ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('🦾 Железный мир - сайт загружен!');
});
