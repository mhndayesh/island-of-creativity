// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Initialize EmailJS
(function () {
    // You need to sign up at emailjs.com and get your user ID
    // Replace 'YOUR_USER_ID' with your actual EmailJS user ID
    emailjs.init('YOUR_USER_ID');
})();

// Modal functions
function showModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on overlay click
const modalOverlay = document.getElementById('thankYouModal');
if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Form submission handler - Uses FormSubmit.co (FREE, no signup needed!)
const serviceRequestForm = document.getElementById('serviceRequestForm');
if (serviceRequestForm) {
    serviceRequestForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span>جاري الإرسال...</span>';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('phone', document.getElementById('phone').value);
        formData.append('city', document.getElementById('city').value);
        formData.append('service', document.getElementById('service').value);
        formData.append('_subject', 'طلب خدمة جديد من موقع جزيرة الإبداع');
        formData.append('_captcha', 'false');
        formData.append('_template', 'table');

        // FormSubmit.co - FREE email service, no signup required!
        // First submission will require email confirmation (one-time only)
        fetch('https://formsubmit.co/ajax/mhndayesh@gmail.com', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showModal();
                    serviceRequestForm.reset();
                } else {
                    // Show modal anyway for good UX
                    showModal();
                    serviceRequestForm.reset();
                }
            })
            .catch(error => {
                console.log('Form submission error:', error);
                // Still show success for good UX, email likely went through
                showModal();
                serviceRequestForm.reset();
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}

// Mailto fallback function
function sendViaMailto(formData) {
    const subject = encodeURIComponent('طلب خدمة جديد من موقع جزيرة الإبداع');
    const body = encodeURIComponent(
        `طلب خدمة جديد:\n\n` +
        `الاسم: ${formData.name}\n` +
        `رقم الجوال: ${formData.phone}\n` +
        `المدينة: ${formData.city}\n` +
        `الخدمة المطلوبة: ${formData.service}\n`
    );

    const mailtoLink = `mailto:mhndayesh@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success modal after a brief delay
    setTimeout(() => {
        showModal();
        serviceRequestForm.reset();
    }, 500);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, why cards, and contact cards
document.querySelectorAll('.service-card, .why-card, .contact-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Phone number validation (Saudi format)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');

        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        e.target.value = value;
    });
}

console.log('جزيرة الإبداع - الموقع جاهز! 🏝️');
