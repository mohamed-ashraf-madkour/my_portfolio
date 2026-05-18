// =======================
// MOBILE NAVIGATION
// =======================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    document.querySelectorAll("#navLinks a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });
}


// =======================
// SMOOTH SCROLL
// =======================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// =======================
// NAVBAR SCROLL EFFECT
// =======================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = "rgba(10,10,10,0.95)";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
    } else {
        navbar.style.background = "transparent";
        navbar.style.boxShadow = "none";
    }
});


// =======================
// SCROLL ANIMATION (INTERSECTION OBSERVER)
// =======================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll("section, .project-card, .skill-category, .stat-item")
    .forEach(el => observer.observe(el));


// =======================
// COUNTER ANIMATION
// =======================
function animateCounter(el, target) {
    let count = 0;
    const speed = target / 100;

    const interval = setInterval(() => {
        count += speed;

        if (count >= target) {
            el.textContent = target;
            clearInterval(interval);
        } else {
            el.textContent = Math.floor(count);
        }
    }, 20);
}

const statNumbers = document.querySelectorAll(".stat-number");

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.dataset.target;
            animateCounter(entry.target, target);
            statObserver.unobserve(entry.target);
        }
    });
});

statNumbers.forEach(num => statObserver.observe(num));


// =======================
// SKILL BARS ANIMATION
// =======================
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.dataset.width;
            entry.target.style.width = width + "%";
            skillObserver.unobserve(entry.target);
        }
    });
});

skillBars.forEach(bar => skillObserver.observe(bar));


// =======================
// SESSION STORAGE WELCOME
// =======================
window.addEventListener("load", () => {
    if (!sessionStorage.getItem("visited")) {
        sessionStorage.setItem("visited", "true");
        console.log("Welcome to Mohamed Madkour Portfolio 🚀");
    }
});


// =======================
// ACTIVE NAV LINK
// =======================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("#navLinks a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
