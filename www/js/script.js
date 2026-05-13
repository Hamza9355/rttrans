document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // ============================================
    // IMAGE CAROUSEL FUNCTIONALITY
    // ============================================
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoplayInterval;

    const showSlide = (n) => {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[n].classList.add('active');
        indicators[n].classList.add('active');
        currentSlide = n;
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    const startAutoplay = () => {
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    // Click indicators to change slides
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            startAutoplay();
        });
    });

    // Start carousel
    if (slides.length > 0) {
        showSlide(0);
        startAutoplay();

        // Pause autoplay on hover
        const heroCarousel = document.querySelector('.hero-carousel');
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', stopAutoplay);
            heroCarousel.addEventListener('mouseleave', startAutoplay);
        }
    }

    // ============================================
    // FLEET CAROUSEL FUNCTIONALITY
    // ============================================
    const fleetSlides = document.querySelectorAll('.fleet-carousel-slide');
    const fleetIndicators = document.querySelectorAll('.fleet-indicator');
    const fleetPrevBtn = document.querySelector('.fleet-nav-prev');
    const fleetNextBtn = document.querySelector('.fleet-nav-next');
    let currentFleetSlide = 0;
    let fleetAutoplayInterval;

    const showFleetSlide = (n) => {
        // Remove active class from all slides and indicators
        fleetSlides.forEach(slide => slide.classList.remove('active'));
        fleetIndicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        fleetSlides[n].classList.add('active');
        fleetIndicators[n].classList.add('active');
        currentFleetSlide = n;
    };

    const nextFleetSlide = () => {
        currentFleetSlide = (currentFleetSlide + 1) % fleetSlides.length;
        showFleetSlide(currentFleetSlide);
    };

    const prevFleetSlide = () => {
        currentFleetSlide = (currentFleetSlide - 1 + fleetSlides.length) % fleetSlides.length;
        showFleetSlide(currentFleetSlide);
    };

    const startFleetAutoplay = () => {
        fleetAutoplayInterval = setInterval(nextFleetSlide, 7000); // Change vehicle every 7 seconds
    };

    const stopFleetAutoplay = () => {
        clearInterval(fleetAutoplayInterval);
    };

    // Fleet Navigation Button Event Listeners
    if (fleetPrevBtn && fleetNextBtn) {
        fleetPrevBtn.addEventListener('click', () => {
            stopFleetAutoplay();
            prevFleetSlide();
            startFleetAutoplay();
        });

        fleetNextBtn.addEventListener('click', () => {
            stopFleetAutoplay();
            nextFleetSlide();
            startFleetAutoplay();
        });
    }

    // Click fleet indicators to change slides
    fleetIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopFleetAutoplay();
            showFleetSlide(index);
            startFleetAutoplay();
        });
    });

    // Start fleet carousel
    if (fleetSlides.length > 0) {
        showFleetSlide(0);
        startFleetAutoplay();

        // Pause autoplay on hover
        const fleetCarouselContainer = document.querySelector('.fleet-carousel-container');
        if (fleetCarouselContainer) {
            fleetCarouselContainer.addEventListener('mouseenter', stopFleetAutoplay);
            fleetCarouselContainer.addEventListener('mouseleave', startFleetAutoplay);
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Advanced Navbar with scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        const scrollProgress = (currentScroll / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Update scroll progress bar
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress + '%');
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 1)';
            navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.85)';
            navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
        }
        
        lastScrollY = currentScroll;
    });

    // Advanced Scroll Observer with reveal animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .service-card, .why-card, .fleet-card').forEach(el => {
        observer.observe(el);
    });

    // Advanced Counter Animation with easing
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    let hasAnimated = false;

    const easeOutQuad = (t) => t * (2 - t);

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const startTime = Date.now();

        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeOutQuad(progress);
            const current = Math.floor(target * easeProgress);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const animateCounters = () => {
        if (hasAnimated) return;

        statNumbers.forEach((counter, index) => {
            setTimeout(() => {
                animateCounter(counter);
            }, index * 150);
        });

        hasAnimated = true;
    };

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }

    // Form Validation
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[\d\s\-\+\(\)]{10,}$/;
        return regex.test(phone);
    };

    // Advanced Ripple Effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.width = ripple.style.height = '20px';
            ripple.style.left = (x - 10) + 'px';
            ripple.style.top = (y - 10) + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Parallax effect for hero
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        });
    }

    // Add dynamic ripple style
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes rippleAnimation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            body::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #d4af37 0%, var(--scroll-progress, 0%), #e94b3c var(--scroll-progress, 0%), transparent var(--scroll-progress, 0%));
                z-index: 9999;
            }
        `;
        document.head.appendChild(style);
    }

    // Mouse movement parallax effect
    document.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.service-card, .why-card');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        parallaxElements.forEach(el => {
            el.style.setProperty('--mouse-x', (x * 10) + 'px');
            el.style.setProperty('--mouse-y', (y * 10) + 'px');
        });
    });

    // Page load animation
    window.addEventListener('load', function() {
        document.body.style.animation = 'fadeIn 0.5s ease-in';
    });

    // Add glow effect on hover to cards
    const cards = document.querySelectorAll('.service-card, .why-card, .fleet-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
});

// Helper functions for other pages
const utils = {
    validateEmail: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    validatePhone: (phone) => {
        const regex = /^[\d\s\-\+\(\)]{10,}$/;
        return regex.test(phone);
    },

    showNotification: (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    formatDate: (date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    formatTime: (time) => {
        return time;
    }
};

// Add notification animations
if (!document.querySelector('style[data-notification]')) {
    const style = document.createElement('style');
    style.setAttribute('data-notification', 'true');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}
