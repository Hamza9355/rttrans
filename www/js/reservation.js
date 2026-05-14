// ==========================================
// RT TOURISTIQUE - RESERVATION PAGE SCRIPT
// ==========================================

// Initialize EmailJS
emailjs.init("service_3dqequgs");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservationForm');
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
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                serviceType: document.getElementById('serviceType').value,
                pickupDate: document.getElementById('pickupDate').value,
                pickupTime: document.getElementById('pickupTime').value,
                pickupLocation: document.getElementById('pickupLocation').value,
                dropoffLocation: document.getElementById('dropoffLocation').value,
                vehicleType: document.getElementById('vehicleType').value,
                passengers: document.getElementById('passengers').value,
                notes: document.getElementById('notes').value,
            };

            // Validate email
            if (!validateEmail(formData.email)) {
                showNotification('Veuillez entrer un email valide', 'error');
                return;
            }

            // Validate phone
            if (!validatePhone(formData.phone)) {
                showNotification('Veuillez entrer un numéro de téléphone valide', 'error');
                return;
            }

            // Validate terms
            if (!document.getElementById('terms').checked) {
                showNotification('Veuillez accepter les conditions', 'error');
                return;
            }

            // Send email with EmailJS
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Réservation en cours...';

            emailjs.send("service_rttouristique", "template_reservation", {
                from_name: formData.fullName,
                from_email: formData.email,
                phone_number: formData.phone,
                service_type: formData.serviceType,
                pickup_date: formData.pickupDate,
                pickup_time: formData.pickupTime,
                pickup_location: formData.pickupLocation,
                dropoff_location: formData.dropoffLocation,
                vehicle_type: formData.vehicleType,
                passengers: formData.passengers,
                notes: formData.notes,
                to_email: "info@rttouristique.com"
            }).then(function(response) {
                console.log('Réservation confirmée:', response.status, response.text);
                showNotification('Réservation envoyée avec succès ! Vous recevrez une confirmation par email.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }).catch(function(error) {
                console.error('Erreur lors de la réservation:', error);
                showNotification('Erreur lors de la réservation. Veuillez réessayer plus tard.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
        });
    }

    // Set minimum date to today
    const pickupDate = document.getElementById('pickupDate');
    if (pickupDate) {
        const today = new Date().toISOString().split('T')[0];
        pickupDate.setAttribute('min', today);
    }
});

// Validation functions
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(phone);
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
if (!document.querySelector('style[data-reservation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-reservation', 'true');
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
