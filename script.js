// Smooth scroll للـ navbar
document.querySelectorAll('nav a').forEach(link => {
link.addEventListener('click', function(e) {
e.preventDefault();

const target = document.querySelector(this.getAttribute('href'));

target.scrollIntoView({
behavior: 'smooth'
});
});
});


// SESSION STORAGE (مرة واحدة فقط)
if (!sessionStorage.getItem("visited")) {
alert("Welcome to my Data Analyst Portfolio 🚀");

sessionStorage.setItem("visited", "true");
}
