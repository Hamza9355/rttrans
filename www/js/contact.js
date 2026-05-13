// ==========================================
// RT TOURISTIQUE - CONTACT PAGE SCRIPT
// ==========================================

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Mobile menu toggle - Fixed hamburger
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

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Form submission with EmailJS
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value,
            };

            // Validate email
            if (!validateEmail(formData.email)) {
                showNotification('Veuillez entrer un email valide', 'error');
                return;
            }

            // Validate message
            if (formData.message.trim().length < 10) {
                showNotification('Le message doit contenir au moins 10 caractères', 'error');
                return;
            }

            // Validate terms
            if (!document.getElementById('contactTerms').checked) {
                showNotification('Veuillez accepter la politique de confidentialité', 'error');
                return;
            }

            // Send email with EmailJS
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';

            emailjs.send("service_rttouristique", "template_contact", {
                from_name: formData.name,
                from_email: formData.email,
                phone_number: formData.phone,
                subject: formData.subject,
                message: formData.message,
                to_email: "info@rttouristique.com"
            }).then(function(response) {
                console.log('Email envoyé avec succès:', response.status, response.text);
                showNotification('Message envoyé avec succès ! Nous vous répondrons sous peu.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }).catch(function(error) {
                console.error('Erreur lors de l\'envoi:', error);
                showNotification('Erreur lors de l\'envoi. Veuillez réessayer plus tard.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }

    // Add smooth scroll for social links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhance contact cards with hover effect
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Validation function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations dynamically if not present
if (!document.querySelector('style[data-contact]')) {
    const style = document.createElement('style');
    style.setAttribute('data-contact', 'true');
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
