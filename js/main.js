// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            navLinks.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
    });
});

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[id^="contactForm"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitButton = form.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Reset form
                    form.reset();
                    
                    // Show success message
                    showFormMessage(form, 'Thank you for your message! We will get back to you soon.', 'success');
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 1500);
            }
        });
    });
});

// Form Validation Helper
function validateForm(data) {
    let isValid = true;
    let errorMessage = '';
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        isValid = false;
        errorMessage += 'Please enter a valid name.\n';
    }
    
    // Phone validation
    if (!data.phone || !isValidPhone(data.phone)) {
        isValid = false;
        errorMessage += 'Please enter a valid phone number.\n';
    }
    
    // Email validation (if present)
    if (data.email && !isValidEmail(data.email)) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.\n';
    }
    
    // Service validation
    if (!data.service) {
        isValid = false;
        errorMessage += 'Please select a service.\n';
    }
    
    // Message validation (if present)
    if (data.message && data.message.trim().length < 10) {
        isValid = false;
        errorMessage += 'Please enter a message with at least 10 characters.\n';
    }
    
    if (!isValid) {
        showFormMessage(document.getElementById('contactForm'), errorMessage, 'error');
    }
    
    return isValid;
}

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showFormMessage(form, message, type) {
    // Remove any existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert message at the top of the form
    form.insertBefore(messageElement, form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add active class to current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Add animation to service cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}); 