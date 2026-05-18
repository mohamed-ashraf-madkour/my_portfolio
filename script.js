// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

            // Animate stats when they come into view
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }

            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width + '%';
                }, 200);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));

    // Observe skill progress bars
    document.querySelectorAll('.skill-progress').forEach(el => observer.observe(el));

    // Observe sections for fade-in animations
    document.querySelectorAll('section').forEach(el => observer.observe(el));
});

// Enhanced parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax for floating cards (only if not fixed)
    const parallaxElements = document.querySelectorAll('.floating-card');
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = scrolled * speed;
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    // Parallax for section backgrounds
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const speed = 0.1 * (index + 1);

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
});

// Mouse tracking effects for hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create dynamic gradient based on mouse position
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    hero.style.background = `
        radial-gradient(circle at ${xPercent}% ${yPercent}%, 
            rgba(102, 126, 234, 0.2) 0%, 
            rgba(118, 75, 162, 0.1) 30%, 
            transparent 70%),
        linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #16213e 70%, #0f3460 100%)
    `;

    // Move floating elements based on mouse position
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        const moveX = (x - rect.width / 2) * 0.02 * (index + 1);
        const moveY = (y - rect.height / 2) * 0.02 * (index + 1);

        card.style.transform += ` translate(${moveX}px, ${moveY}px)`;
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    // Extract text content and preserve HTML structure
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < plainText.length) {
            const currentText = plainText.substring(0, i + 1);
            // Reconstruct with proper HTML structure
            if (currentText.includes('Mohamed Madkour')) {
                const parts = currentText.split('Mohamed Madkour');
                if (parts.length > 1) {
                    element.innerHTML = parts[0] + '<span class="gradient-text">Mohamed Madkour</span>' + parts[1];
                } else {
                    element.innerHTML = currentText;
                }
            } else if (currentText.length > 8) { // After "Hi, I'm "
                // Check if we're typing the name part
                const nameStart = currentText.indexOf('Mohamed');
                if (nameStart !== -1) {
                    const beforeName = currentText.substring(0, nameStart);
                    const nameTyped = currentText.substring(nameStart);
                    element.innerHTML = beforeName + '<span class="gradient-text">' + nameTyped + '</span>';
                } else {
                    element.innerHTML = currentText;
                }
            } else {
                element.innerHTML = currentText;
            }
            i++;
            setTimeout(type, speed);
        } else {
            // Ensure final HTML structure is correct
            element.innerHTML = 'Hi, I\'m <span class="gradient-text">Mohamed Madkour</span>';
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }

    // Add loading animations to elements
    addLoadingAnimations();
});

// Add loading animations
function addLoadingAnimations() {
    const elements = document.querySelectorAll('.hero-content > *, .profile-container, .floating-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
}

// EmailJS Configuration
(function () {
    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key
})();

// Contact form handling with EmailJS
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form elements
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('from_name');
        const email = formData.get('from_email');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';

        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Abdelrahman Elhabian', // Your name
            reply_to: email
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, function (error) {
                console.log('FAILED...', error);
                showNotification('Failed to send message. Please try again or contact me directly.', 'error');
            })
            .finally(function () {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
            });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Enhanced scroll-triggered animations
function addScrollAnimations() {
    const fadeElements = document.querySelectorAll('.project-card, .skill-category, .stat-item');
    const slideLeftElements = document.querySelectorAll('.highlight-item:nth-child(odd)');
    const slideRightElements = document.querySelectorAll('.highlight-item:nth-child(even), .contact-item');
    const scaleElements = document.querySelectorAll('.about-profile, .section-header');

    // Fade in animation
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Slide animations
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    // Scale animation
    const scaleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });

    // Apply animations
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        slideObserver.observe(el);
    });

    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        slideObserver.observe(el);
    });

    scaleElements.forEach(el => {
        el.classList.add('scale-in');
        scaleObserver.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();

    // Add stagger animation to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        item.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 1000);
    });

    // Add pulse animation to scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        setInterval(() => {
            scrollIndicator.style.transform = 'translateX(-50%) scale(1.1)';
            setTimeout(() => {
                scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
            }, 200);
        }, 3000);
    }
});

// Add active navigation highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Enhanced interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Add tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Add floating effect to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-10px) scale(1.02)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Enhanced particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;

    document.body.appendChild(particlesContainer);

    // Create different types of particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
        `;

        particlesContainer.appendChild(particle);
    }

    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Mouse trail effect
function createMouseTrail() {
    const trail = [];
    const trailLength = 20;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, ${1 - i / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// Initialize effects on load
window.addEventListener('load', () => {
    createParticles();
    // Uncomment the next line if you want mouse trail effect
    // createMouseTrail();
}); دا كود javascript اللي في المشروع 
