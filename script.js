// ========================================
// MOBILE NAVIGATION
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});


// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(7, 11, 20, 0.97)';
        navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.35)';
    } else {
        navbar.style.background = 'rgba(7, 11, 20, 0.92)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
    }
});


// ========================================
// ANIMATED COUNTERS
// ========================================

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


// ========================================
// MAIN INTERSECTION OBSERVER
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('animate');

            if (entry.target.classList.contains('stat-number')) {

                const target = parseInt(
                    entry.target.getAttribute('data-target')
                );

                if (!entry.target.dataset.animated) {

                    entry.target.dataset.animated = 'true';

                    animateCounter(
                        entry.target,
                        target
                    );
                }
            }
        }

    });

}, observerOptions);


// ========================================
// SKILL PROGRESS BARS
// ========================================

const skillsObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        const skillBars =
            entry.target.querySelectorAll('.skill-progress');

        if (entry.isIntersecting) {

            skillBars.forEach((bar, index) => {

                const width =
                    bar.getAttribute('data-width');

                bar.style.width = '0%';

                setTimeout(() => {

                    bar.style.width = `${width}%`;

                }, index * 100);

            });

        } else {

            skillBars.forEach(bar => {
                bar.style.width = '0%';
            });

        }

    });

}, {
    threshold: 0.15
});


// ========================================
// DOM READY
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // Stat numbers
    document
        .querySelectorAll('.stat-number')
        .forEach(el => observer.observe(el));


    // Skills section
    const skillsSection =
        document.querySelector('#skills');

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }


    // All sections
    document
        .querySelectorAll('section')
        .forEach(section => observer.observe(section));


    // Scroll animations
    addScrollAnimations();


    // Navigation animation
    const navItems =
        document.querySelectorAll('.nav-item');

    navItems.forEach((item, index) => {

        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        item.style.transition = 'all 0.5s ease';

        setTimeout(() => {

            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';

        }, index * 100 + 500);

    });


    // Scroll indicator pulse
    const scrollIndicator =
        document.querySelector('.scroll-indicator');

    if (scrollIndicator) {

        setInterval(() => {

            scrollIndicator.style.transform =
                'translateX(-50%) scale(1.1)';

            setTimeout(() => {

                scrollIndicator.style.transform =
                    'translateX(-50%) scale(1)';

            }, 200);

        }, 3000);
    }

});


// ========================================
// HERO MOUSE GLOW
// ========================================

document.addEventListener('mousemove', (e) => {

    const hero =
        document.querySelector('.hero');

    if (!hero) return;

    const rect =
        hero.getBoundingClientRect();

    const x =
        ((e.clientX - rect.left) / rect.width) * 100;

    const y =
        ((e.clientY - rect.top) / rect.height) * 100;

    hero.style.setProperty(
        '--mouse-x',
        `${x}%`
    );

    hero.style.setProperty(
        '--mouse-y',
        `${y}%`
    );

});


// ========================================
// FLOATING CARDS PARALLAX
// ========================================

window.addEventListener('scroll', () => {

    const scrolled = window.pageYOffset;

    const cards =
        document.querySelectorAll('.floating-card');

    cards.forEach((card, index) => {

        const speed =
            0.08 + (index * 0.03);

        const y =
            scrolled * speed;

        card.style.setProperty(
            '--scroll-y',
            `${y}px`
        );

    });

});


// ========================================
// TYPING EFFECT
// ========================================

function typeWriter(element, text, speed = 50) {

    const tempDiv =
        document.createElement('div');

    tempDiv.innerHTML = text;

    const plainText =
        tempDiv.textContent ||
        tempDiv.innerText ||
        '';

    let i = 0;

    element.innerHTML = '';

    function type() {

        if (i < plainText.length) {

            const currentText =
                plainText.substring(0, i + 1);

            const name =
                'Mohamed Madkour';

            const nameStart =
                currentText.indexOf(name);

            if (nameStart !== -1) {

                const beforeName =
                    currentText.substring(
                        0,
                        nameStart
                    );

                const nameTyped =
                    currentText.substring(
                        nameStart
                    );

                element.innerHTML =
                    beforeName +
                    `<span class="gradient-text">${nameTyped}</span>`;

            } else {

                element.textContent =
                    currentText;
            }

            i++;

            setTimeout(type, speed);

        } else {

            element.innerHTML =
                `Hi, I'm <span class="gradient-text">Mohamed Madkour</span>`;
        }
    }

    type();
}


window.addEventListener('load', () => {

    const heroTitle =
        document.querySelector('.hero-title');

    if (heroTitle) {

        const originalText =
            heroTitle.innerHTML;

        typeWriter(
            heroTitle,
            originalText,
            50
        );
    }

    addLoadingAnimations();

});


// ========================================
// HERO LOADING ANIMATION
// ========================================

function addLoadingAnimations() {

    const elements =
        document.querySelectorAll(
            '.hero-content > *, .profile-container, .floating-card'
        );

    elements.forEach((element, index) => {

        element.style.opacity = '0';

        element.style.transform =
            'translateY(30px)';

        element.style.transition =
            'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(() => {

            element.style.opacity = '1';

            element.style.transform =
                'translateY(0)';

        }, index * 200 + 500);

    });

}


// ========================================
// EMAILJS
// ========================================

(function () {

    if (typeof emailjs !== 'undefined') {

        emailjs.init({
            publicKey: 'YOUR_PUBLIC_KEY'
        });

    }

})();


// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.querySelector('.contact-form');

if (contactForm) {

    contactForm.addEventListener(
        'submit',
        async function (e) {

            e.preventDefault();

            const submitBtn =
                document.getElementById('submit-btn');

            const btnText =
                submitBtn?.querySelector('.btn-text');

            const btnLoading =
                submitBtn?.querySelector('.btn-loading');

            const formData =
                new FormData(this);

            const name =
                formData.get('from_name');

            const email =
                formData.get('from_email');

            const message =
                formData.get('message');


            if (!name || !email || !message) {

                showNotification(
                    'Please fill in all fields',
                    'error'
                );

                return;
            }


            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {

                showNotification(
                    'Please enter a valid email address',
                    'error'
                );

                return;
            }


            submitBtn.disabled = true;

            if (btnText)
                btnText.style.display = 'none';

            if (btnLoading)
                btnLoading.style.display = 'inline-block';


            const templateParams = {

                from_name: name,
                from_email: email,
                message: message,
                to_name: 'Mohamed Madkour',
                reply_to: email

            };


            try {

                await emailjs.send(
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID',
                    templateParams
                );

                showNotification(
                    "Message sent successfully! I'll get back to you soon.",
                    'success'
                );

                contactForm.reset();

            } catch (error) {

                console.error(
                    'EmailJS Error:',
                    error
                );

                showNotification(
                    'Failed to send message. Please try again.',
                    'error'
                );

            } finally {

                submitBtn.disabled = false;

                if (btnText)
                    btnText.style.display = 'inline-block';

                if (btnLoading)
                    btnLoading.style.display = 'none';

            }

        }
    );
}


// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(
    message,
    type = 'info'
) {

    const existing =
        document.querySelector('.notification');

    if (existing) {
        existing.remove();
    }


    const notification =
        document.createElement('div');

    notification.className =
        `notification notification-${type}`;


    const background =
        type === 'success'
            ? '#22C55E'
            : type === 'error'
                ? '#EF4444'
                : '#22D3EE';


    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;


    notification.style.cssText = `

        position: fixed;
        top: 20px;
        right: 20px;

        background: ${background};

        color: #ffffff;

        padding: 1rem 1.5rem;

        border-radius: 12px;

        box-shadow:
            0 10px 30px rgba(0,0,0,0.3),
            0 0 20px rgba(34,211,238,0.15);

        z-index: 10000;

        transform: translateX(400px);

        transition:
            transform 0.3s ease;

    `;


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.style.transform =
            'translateX(0)';

    }, 100);


    const closeBtn =
        notification.querySelector(
            '.notification-close'
        );

    closeBtn.addEventListener(
        'click',
        () => {

            notification.style.transform =
                'translateX(400px)';

            setTimeout(
                () => notification.remove(),
                300
            );

        }
    );


    setTimeout(() => {

        if (notification.parentNode) {

            notification.style.transform =
                'translateX(400px)';

            setTimeout(
                () => notification.remove(),
                300
            );

        }

    }, 5000);

}


// ========================================
// SCROLL ANIMATIONS
// ========================================

function addScrollAnimations() {

    const fadeElements =
        document.querySelectorAll(
            '.project-card, .skill-category, .stat-item'
        );

    const slideLeftElements =
        document.querySelectorAll(
            '.highlight-item:nth-child(odd)'
        );

    const slideRightElements =
        document.querySelectorAll(
            '.highlight-item:nth-child(even), .contact-item'
        );

    const scaleElements =
        document.querySelectorAll(
            '.about-profile, .section-header'
        );


    const fadeObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry, index) => {

                    if (entry.isIntersecting) {

                        setTimeout(() => {

                            entry.target.classList.add(
                                'animate'
                            );

                        }, index * 150);

                    }

                });

            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );


    const slideObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry, index) => {

                    if (entry.isIntersecting) {

                        setTimeout(() => {

                            entry.target.classList.add(
                                'animate'
                            );

                        }, index * 100);

                    }

                });

            },
            {
                threshold: 0.2
            }
        );


    const scaleObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            'animate'
                        );

                    }

                });

            },
            {
                threshold: 0.3
            }
        );


    fadeElements.forEach(element => {

        element.classList.add('fade-in');

        fadeObserver.observe(element);

    });


    slideLeftElements.forEach(element => {

        element.classList.add('slide-in-left');

        slideObserver.observe(element);

    });


    slideRightElements.forEach(element => {

        element.classList.add('slide-in-right');

        slideObserver.observe(element);

    });


    scaleElements.forEach(element => {

        element.classList.add('scale-in');

        scaleObserver.observe(element);

    });

}


// ========================================
// ACTIVE NAVIGATION
// ========================================

function updateActiveNavLink() {

    const sections =
        document.querySelectorAll(
            'section[id]'
        );

    const navLinks =
        document.querySelectorAll(
            '.nav-link'
        );


    let current = '';

    const viewportCenter =
        window.innerHeight / 2;


    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        if (
            rect.top <= viewportCenter &&
            rect.bottom >= viewportCenter
        ) {

            current =
                section.getAttribute('id');

        }

    });


    if (
        window.innerHeight +
        window.scrollY >=
        document.documentElement.scrollHeight - 60
    ) {

        current = 'contact';

    }


    if (window.scrollY < 80) {

        current = 'home';

    }


    navLinks.forEach(link => {

        link.classList.remove('active');

        if (
            link.getAttribute('href') ===
            `#${current}`
        ) {

            link.classList.add('active');

        }

    });

}


window.addEventListener(
    'scroll',
    updateActiveNavLink
);

window.addEventListener(
    'load',
    updateActiveNavLink
);


// ========================================
// PRELOADER
// ========================================

window.addEventListener('load', () => {

    const preloader =
        document.querySelector('.preloader');

    if (preloader) {

        preloader.style.opacity = '0';

        setTimeout(() => {

            preloader.style.display = 'none';

        }, 500);

    }

});


// ========================================
// PROJECT CARD TILT
// ========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const projectCards =
            document.querySelectorAll(
                '.project-card'
            );


        projectCards.forEach(card => {

            card.addEventListener(
                'mousemove',
                (e) => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        e.clientX - rect.left;

                    const y =
                        e.clientY - rect.top;


                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (y - centerY) / 15;

                    const rotateY =
                        (centerX - x) / 15;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

                }
            );


            card.addEventListener(
                'mouseleave',
                () => {

                    card.style.transform =
                        'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';

                }
            );

        });


        // ========================================
        // MAGNETIC BUTTONS
        // ========================================

        const buttons =
            document.querySelectorAll('.btn');


        buttons.forEach(btn => {

            btn.addEventListener(
                'mousemove',
                (e) => {

                    const rect =
                        btn.getBoundingClientRect();

                    const x =
                        e.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        e.clientY -
                        rect.top -
                        rect.height / 2;


                    btn.style.transform =
                        `translate(${x * 0.08}px, ${y * 0.08}px)`;

                }
            );


            btn.addEventListener(
                'mouseleave',
                () => {

                    btn.style.transform =
                        'translate(0, 0)';

                }
            );

        });


        // ========================================
        // SKILL CATEGORY HOVER
        // ========================================

        const skillCategories =
            document.querySelectorAll(
                '.skill-category'
            );


        skillCategories.forEach(category => {

            category.addEventListener(
                'mouseenter',
                () => {

                    category.style.transform =
                        'translateY(-8px) scale(1.02)';

                }
            );


            category.addEventListener(
                'mouseleave',
                () => {

                    category.style.transform =
                        'translateY(0) scale(1)';

                }
            );

        });

    }
);


// ========================================
// PARTICLE BACKGROUND
// ========================================

function createParticles() {

    const existing =
        document.querySelector('.particles');

    if (existing) {
        existing.remove();
    }


    const particlesContainer =
        document.createElement('div');

    particlesContainer.className =
        'particles';


    particlesContainer.style.cssText = `

        position: fixed;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        pointer-events: none;

        z-index: 0;

        overflow: hidden;

    `;


    document.body.appendChild(
        particlesContainer
    );


    for (let i = 0; i < 30; i++) {

        const particle =
            document.createElement('div');

        const size =
            Math.random() * 3 + 1;

        const duration =
            Math.random() * 20 + 10;

        const delay =
            Math.random() * 5;


        particle.style.cssText = `

            position: absolute;

            width: ${size}px;
            height: ${size}px;

            background:
                rgba(
                    34,
                    211,
                    238,
                    ${Math.random() * 0.4 + 0.15}
                );

            border-radius: 50%;

            left: ${Math.random() * 100}%;

            top: ${Math.random() * 100}%;

            animation:
                particleFloat
                ${duration}s
                linear
                infinite;

            animation-delay:
                ${delay}s;

        `;


        particlesContainer.appendChild(
            particle
        );

    }


    const style =
        document.createElement('style');


    style.textContent = `

        @keyframes particleFloat {

            0% {

                transform:
                    translateY(100vh)
                    rotate(0deg);

                opacity: 0;

            }

            10% {
                opacity: 1;
            }

            90% {
                opacity: 1;
            }

            100% {

                transform:
                    translateY(-100px)
                    rotate(360deg);

                opacity: 0;

            }

        }

    `;


    document.head.appendChild(style);

}


// ========================================
// INITIALIZE PARTICLES
// ========================================

window.addEventListener(
    'load',
    () => {

        createParticles();

    }
);
