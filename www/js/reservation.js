// ==========================================
// RT TOURISTIQUE - RESERVATION PAGE SCRIPT
// ==========================================

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");

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

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Traitement...';

            // Simulate API call (replace with actual backend call)
            setTimeout(() => {
                // Here you would send data to your backend
                console.log('Réservation soumise:', formData);
                
                // Show success message
                showNotification('Réservation confirmée ! Un email de confirmation a été envoyé.', 'success');
                
                // Reset form
                form.reset();
                document.getElementById('estimatedDistance').textContent = '-';
                document.getElementById('estimatedPrice').textContent = '-';

                // Restore button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;

                // Optionally redirect after success
                setTimeout(() => {
                    // window.location.href = 'index.html';
                }, 2000);
            }, 1500);
        });

        // Auto-calculate estimation
        const pickupLocation = document.getElementById('pickupLocation');
        const dropoffLocation = document.getElementById('dropoffLocation');
        const vehicleType = document.getElementById('vehicleType');

        function updateEstimation() {
            if (pickupLocation.value && dropoffLocation.value) {
                // Simulate distance calculation (replace with real calculation)
                const distance = Math.floor(Math.random() * 100) + 10;
                document.getElementById('estimatedDistance').textContent = distance.toFixed(1) + ' km';

                // Calculate price based on vehicle type
                let basePricePerKm = 2;
                const vehicleMultipliers = {
                    'berline': 1.5,
                    'van': 2,
                    'minibus': 2.5,
                    'autocar': 3
                };

                const multiplier = vehicleMultipliers[vehicleType.value] || 1;
                const price = distance * basePricePerKm * multiplier;
                document.getElementById('estimatedPrice').textContent = price.toFixed(2) + ' MAD';
            }
        }

        pickupLocation.addEventListener('change', updateEstimation);
        dropoffLocation.addEventListener('change', updateEstimation);
        vehicleType.addEventListener('change', updateEstimation);
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
