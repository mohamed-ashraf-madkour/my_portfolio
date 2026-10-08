document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       MOBILE NAVIGATION
    ======================================== */

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    /* ========================================
       SMOOTH SCROLL
    ======================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /* ========================================
       NAVBAR SCROLL EFFECT
    ======================================== */

    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {

            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(7, 11, 20, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
                navbar.style.boxShadow =
                    '0 10px 30px rgba(0, 0, 0, 0.25)';
            } else {
                navbar.style.background = 'rgba(7, 11, 20, 0.88)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            }

        }, { passive: true });
    }


    /* ========================================
       ACTIVE NAVIGATION LINK
    ======================================== */

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const updateActiveNav = () => {

        let currentSection = '';

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            const href = link.getAttribute('href');

            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, {
        passive: true
    });

    updateActiveNav();


    /* ========================================
       ANIMATED COUNTERS
    ======================================== */

    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {

        if (element.dataset.counted === 'true') {
            return;
        }

        element.dataset.counted = 'true';

        const target = parseInt(
            element.getAttribute('data-target') ||
            element.textContent.replace(/\D/g, ''),
            10
        );

        if (isNaN(target)) return;

        let current = 0;

        const duration = 1500;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * easeOut);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        requestAnimationFrame(updateCounter);
    };


    /* ========================================
       SKILLS PROGRESS BARS
    ======================================== */

    const skillBars = document.querySelectorAll('.skill-progress');

    const animateSkillBars = () => {

        skillBars.forEach(bar => {

            const width = bar.getAttribute('data-width');

            if (width) {
                bar.style.width = width;
            }
        });
    };


    /* ========================================
       INTERSECTION OBSERVER
    ======================================== */

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add('visible');

                if (
                    entry.target.classList.contains('skills-section') ||
                    entry.target.querySelector('.skill-progress')
                ) {
                    animateSkillBars();
                }

                const counters =
                    entry.target.querySelectorAll('.stat-number');

                counters.forEach(counter => {
                    animateCounter(counter);
                });
            });
        },
        observerOptions
    );


    document
        .querySelectorAll(
            '.section, .about-section, .skills-section, .projects-section, .contact-section'
        )
        .forEach(section => {
            observer.observe(section);
        });


    /* ========================================
       OBSERVE COUNTERS DIRECTLY
    ======================================== */

    const counterObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    statNumbers.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* ========================================
       CONTACT FORM - EMAILJS
    ======================================== */

    const contactForm = document.getElementById('contact-form');

    if (contactForm && typeof emailjs !== 'undefined') {

        emailjs.init({
            publicKey: 'YOUR_PUBLIC_KEY'
        });

        contactForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            const submitBtn =
                document.getElementById('submit-btn');

            const btnText =
                submitBtn?.querySelector('.btn-text');

            const btnLoading =
                submitBtn?.querySelector('.btn-loading');


            const name =
                contactForm.querySelector('[name="from_name"]')?.value.trim();

            const email =
                contactForm.querySelector('[name="from_email"]')?.value.trim();

            const message =
                contactForm.querySelector('[name="message"]')?.value.trim();


            /* Validation */

            if (!name || !email || !message) {

                showNotification(
                    'Please fill in all fields.',
                    'error'
                );

                return;
            }


            /* Email validation */

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {

                showNotification(
                    'Please enter a valid email address.',
                    'error'
                );

                return;
            }


            /* Loading state */

            if (submitBtn) {
                submitBtn.disabled = true;
            }

            if (btnText) {
                btnText.style.display = 'none';
            }

            if (btnLoading) {
                btnLoading.style.display = 'inline-flex';
            }


            try {

                const templateParams = {
                    from_name: name,
                    from_email: email,
                    message: message,
                    reply_to: email,
                    to_name: 'Mohamed Madkour'
                };


                await emailjs.send(
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID',
                    templateParams
                );


                showNotification(
                    'Message sent successfully! I will get back to you soon.',
                    'success'
                );


                contactForm.reset();


            } catch (error) {

                console.error(
                    'EmailJS Error:',
                    error
                );

                showNotification(
                    'Something went wrong. Please try again later.',
                    'error'
                );

            } finally {

                if (submitBtn) {
                    submitBtn.disabled = false;
                }

                if (btnText) {
                    btnText.style.display = 'inline';
                }

                if (btnLoading) {
                    btnLoading.style.display = 'none';
                }
            }
        });

    } else if (contactForm) {

        console.warn(
            'EmailJS is not loaded. Make sure EmailJS script is included before script.js.'
        );
    }


    /* ========================================
       NOTIFICATION SYSTEM
    ======================================== */

    function showNotification(message, type = 'info') {

        const existing =
            document.querySelector('.custom-notification');

        if (existing) {
            existing.remove();
        }


        const notification =
            document.createElement('div');

        notification.className =
            `custom-notification ${type}`;


        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : '⚠'}
                </span>

                <span class="notification-message">
                    ${message}
                </span>

                <button class="notification-close">
                    ×
                </button>
            </div>
        `;


        Object.assign(notification.style, {
            position: 'fixed',
            top: '25px',
            right: '25px',
            zIndex: '99999',
            maxWidth: '420px',
            padding: '16px 20px',
            borderRadius: '14px',
            background: '#0D1525',
            color: '#F1F5F9',
            border: '1px solid rgba(34, 211, 238, 0.25)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(15px)',
            transform: 'translateX(120%)',
            transition: 'all 0.4s ease'
        });


        document.body.appendChild(notification);


        requestAnimationFrame(() => {
            notification.style.transform =
                'translateX(0)';
        });


        const closeBtn =
            notification.querySelector(
                '.notification-close'
            );

        if (closeBtn) {

            closeBtn.addEventListener('click', () => {

                notification.style.transform =
                    'translateX(120%)';

                setTimeout(() => {
                    notification.remove();
                }, 400);
            });
        }


        setTimeout(() => {

            if (!notification.isConnected) return;

            notification.style.transform =
                'translateX(120%)';

            setTimeout(() => {
                notification.remove();
            }, 400);

        }, 5000);
    }


    /* ========================================
       SCROLL REVEAL ANIMATION
    ======================================== */

    const revealElements =
        document.querySelectorAll(
            '.project-card, .skill-card, .about-card, .contact-card'
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            'reveal-visible'
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(element => {

        element.classList.add(
            'reveal-element'
        );

        revealObserver.observe(element);
    });


    /* ========================================
       PROJECT CARD TILT
    ======================================== */

    const projectCards =
        document.querySelectorAll('.project-card');


    projectCards.forEach(card => {

        card.addEventListener('mousemove', (e) => {

            if (window.innerWidth < 768) return;

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
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;
        });


        card.addEventListener('mouseleave', () => {

            card.style.transform =
                '';
        });
    });


    /* ========================================
       SKILL CARD HOVER
    ======================================== */

    const skillCards =
        document.querySelectorAll('.skill-card');


    skillCards.forEach(card => {

        card.addEventListener('mouseenter', () => {

            card.style.transform =
                'translateY(-8px)';
        });


        card.addEventListener('mouseleave', () => {

            card.style.transform =
                '';
        });
    });


    /* ========================================
       HERO MOUSE GLOW
    ======================================== */

    const hero =
        document.querySelector('.hero');


    if (hero && window.innerWidth > 768) {

        hero.addEventListener('mousemove', (e) => {

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


        hero.addEventListener('mouseleave', () => {

            hero.style.setProperty(
                '--mouse-x',
                '50%'
            );

            hero.style.setProperty(
                '--mouse-y',
                '50%'
            );
        });
    }


    /* ========================================
       MAGNETIC BUTTON EFFECT
    ======================================== */

    const magneticButtons =
        document.querySelectorAll(
            '.btn-primary, .btn-secondary'
        );


    magneticButtons.forEach(button => {

        button.addEventListener('mousemove', (e) => {

            if (window.innerWidth < 768) return;

            const rect =
                button.getBoundingClientRect();


            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;


            button.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;
        });


        button.addEventListener('mouseleave', () => {

            button.style.transform = '';
        });
    });


    /* ========================================
       CREATE BACKGROUND PARTICLES
    ======================================== */

    function createParticles() {

        const heroSection =
            document.querySelector('.hero');

        if (!heroSection) return;


        const particleContainer =
            document.createElement('div');

        particleContainer.className =
            'hero-particles';


        Object.assign(particleContainer.style, {
            position: 'absolute',
            inset: '0',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: '1'
        });


        for (let i = 0; i < 25; i++) {

            const particle =
                document.createElement('span');


            const size =
                Math.random() * 3 + 1;


            const left =
                Math.random() * 100;

            const top =
                Math.random() * 100;


            const duration =
                Math.random() * 8 + 8;


            const delay =
                Math.random() * 5;


            Object.assign(particle.style, {
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
                borderRadius: '50%',
                background: 'rgba(34, 211, 238, 0.5)',
                boxShadow: '0 0 10px rgba(34, 211, 238, 0.3)',
                animation: `particleFloat ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`
            });


            particleContainer.appendChild(
                particle
            );
        }


        heroSection.prepend(
            particleContainer
        );


        if (!document.getElementById('particle-animation-style')) {

            const style =
                document.createElement('style');

            style.id =
                'particle-animation-style';


            style.textContent = `
                @keyframes particleFloat {

                    0%, 100% {
                        transform: translate3d(0, 0, 0);
                        opacity: 0.2;
                    }

                    50% {
                        transform: translate3d(
                            0,
                            -35px,
                            0
                        );
                        opacity: 0.8;
                    }
                }
            `;


            document.head.appendChild(style);
        }
    }


    createParticles();


    /* ========================================
       LAZY IMAGE LOADING
    ======================================== */

    const images =
        document.querySelectorAll('img');


    images.forEach(img => {

        if (!img.hasAttribute('loading')) {
            img.setAttribute(
                'loading',
                'lazy'
            );
        }
    });


    /* ========================================
       BACK TO TOP BUTTON
    ======================================== */

    const backToTop =
        document.querySelector('.back-to-top');


    if (backToTop) {

        window.addEventListener('scroll', () => {

            if (window.scrollY > 500) {

                backToTop.classList.add(
                    'show'
                );

            } else {

                backToTop.classList.remove(
                    'show'
                );
            }

        }, { passive: true });


        backToTop.addEventListener('click', () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ========================================
       PREVENT IMAGE DRAGGING
    ======================================== */

    document
        .querySelectorAll('img')
        .forEach(img => {

            img.addEventListener(
                'dragstart',
                e => e.preventDefault()
            );
        });


    /* ========================================
       CONSOLE MESSAGE
    ======================================== */

    console.log(
        '%c Mohamed Madkour Portfolio ',
        'background: #0D1525; color: #22D3EE; padding: 8px 12px; font-size: 14px; font-weight: bold;'
    );

    console.log(
        'Portfolio loaded successfully.'
    );

});
