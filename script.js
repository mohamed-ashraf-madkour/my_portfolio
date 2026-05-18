// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => {
    n.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
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
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);

        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }

            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
    document.querySelectorAll('.skill-progress').forEach(el => observer.observe(el));
    document.querySelectorAll('section').forEach(el => observer.observe(el));
});

// Enhanced parallax effects (FIXED)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    const parallaxElements = document.querySelectorAll('.floating-card');
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = scrolled * speed;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// Mouse tracking effects (FIXED transform bug)
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    hero.style.background = `
        radial-gradient(circle at ${xPercent}% ${yPercent}%, 
            rgba(102, 126, 234, 0.2) 0%, 
            rgba(118, 75, 162, 0.1) 30%, 
            transparent 70%),
        linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)
    `;

    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        const moveX = (x - rect.width / 2) * 0.02 * (index + 1);
        const moveY = (y - rect.height / 2) * 0.02 * (index + 1);

        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Typing effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 40);
    }

    addLoadingAnimations();
});

// Loading animations
function addLoadingAnimations() {
    const elements = document.querySelectorAll('.hero-content > *, .profile-container');

    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
}

// EmailJS INIT (ضع مفتاحك هنا)
(function () {
    if (window.emailjs) {
        emailjs.init("YOUR_PUBLIC_KEY");
    }
})();

// Contact Form (FIXED + SAFE)
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoading = submitBtn?.querySelector('.btn-loading');

        const name = document.getElementById('from_name')?.value;
        const email = document.getElementById('from_email')?.value;
        const message = document.getElementById('message')?.value;

        if (!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }

        if (submitBtn) submitBtn.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline-block';

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        if (window.emailjs) {
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(() => {
                    alert('Message sent successfully!');
                    contactForm.reset();
                })
                .catch((err) => {
                    console.log(err);
                    alert('Failed to send message');
                })
                .finally(() => {
                    if (submitBtn) submitBtn.disabled = false;
                    if (btnText) btnText.style.display = 'inline-block';
                    if (btnLoading) btnLoading.style.display = 'none';
                });
        }
    });
}

// Active nav link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop;

        if (window.scrollY >= top - 200) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
