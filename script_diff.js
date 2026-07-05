--- script.js (原始)


+++ script.js (修改后)
// ===== Custom Cursor =====
const cursorDot = document.getElementById('cursorDot');
const cursorCircle = document.getElementById('cursorCircle');

let mouseX = 0;
let mouseY = 0;
let circleX = 0;
let circleY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth cursor circle animation
function animateCursor() {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;

    cursorCircle.style.left = circleX + 'px';
    cursorCircle.style.top = circleY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Magnetic effect for cursor
const magneticElements = document.querySelectorAll('.magnetic-btn, .nav-link, .social-icon, .game-card, .feature-card');

magneticElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorCircle.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursorCircle.classList.remove('hover');
    });
});

// ===== Particle System =====
const particleContainer = document.getElementById('particleContainer');

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

    const colors = ['#00f5ff', '#ff00ff', '#00ff88', '#b967ff'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    particleContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Create initial particles
for (let i = 0; i < 50; i++) {
    setTimeout(createParticle, i * 200);
}

// Continuously create new particles
setInterval(createParticle, 500);

// ===== Parallax Effect for Shapes =====
const parallaxShapes = document.getElementById('parallaxShapes');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes[0].style.transform = `translateY(${scrolled * 0.2}px)`;
    shapes[1].style.transform = `translateY(${scrolled * -0.3}px)`;
    shapes[2].style.transform = `translateY(${scrolled * 0.15}px)`;
    shapes[3].style.transform = `translateY(${scrolled * -0.25}px)`;
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Glitch Effect Interval =====
const glitchTitle = document.querySelector('.glitch-title');

if (glitchTitle) {
    setInterval(() => {
        glitchTitle.style.animation = 'none';
        glitchTitle.offsetHeight; // Trigger reflow
        glitchTitle.style.animation = null;
    }, 3000);
}

// ===== Counter Animation =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ===== Intersection Observer for Fade Up Animations =====
const fadeUpElements = document.querySelectorAll('.fade-up');

const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate counters when visible
            const counter = entry.target.querySelector('.stat-number, .big-stat-number');
            if (counter) {
                animateCounter(counter);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeUpElements.forEach(el => fadeUpObserver.observe(el));

// ===== 3D Tilt Effect for Cards =====
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ===== Magnetic Button Effect =====
const magneticBtns = document.querySelectorAll('.magnetic-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Ripple Effect on Button Click =====
const rippleBtns = document.querySelectorAll('.ripple-btn');

rippleBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== Holographic Card Mouse Movement =====
const holoCard = document.querySelector('.holographic-card');

if (holoCard) {
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        const card3D = holoCard.querySelector('.card-3d');
        if (card3D) {
            card3D.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });
}

// ===== Form Input Magnetic Effect =====
const magneticInputs = document.querySelectorAll('.magnetic-input');

magneticInputs.forEach(input => {
    input.addEventListener('focus', () => {
        cursorCircle.classList.add('hover');
    });

    input.addEventListener('blur', () => {
        cursorCircle.classList.remove('hover');
    });
});

// ===== Preloader Removal =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }, 3000);
});

// ===== Smooth Scroll for Navigation Links =====
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

// ===== Social Icons Bounce Effect Enhancement =====
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        const colors = ['#00f5ff', '#ff00ff', '#00ff88', '#b967ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.borderColor = randomColor;
        this.style.boxShadow = `0 10px 20px ${randomColor}40`;
    });
});

// ===== Dynamic Grid Background Parallax =====
const gridBackground = document.getElementById('gridBackground');

window.addEventListener('scroll', () => {
    if (gridBackground) {
        gridBackground.style.backgroundPositionY = window.scrollY * 0.5 + 'px';
    }
});

console.log('NeonVerse initialized successfully! 🚀');