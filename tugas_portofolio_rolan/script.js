// ============ THEME TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
const html = document.documentElement;

// Load saved theme (safe guard)
const savedTheme = (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || 'light';
if (html) html.setAttribute('data-theme', savedTheme);
if (themeIcon) updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        try { localStorage.setItem('theme', newTheme); } catch (e) {}
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ============ MOBILE MENU ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============ TYPING EFFECT ============
const typedTextElement = document.getElementById('typedText');
if (typedTextElement) {
    const texts = ['Web Developer', 'UI/UX Designer', 'Problem Solver'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ============ STATS COUNTER ============
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    if (!statNumbers || statNumbers.length === 0) return;

    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target')) || 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + '+';
                }
            };
            updateCount();
        });
        statsAnimated = true;
    }
}

// ============ SKILLS PROGRESS BAR ============
const skillProgressBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;
    if (!skillProgressBars || skillProgressBars.length === 0) return;

    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        skillProgressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') || 0;
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 200);
        });
        skillsAnimated = true;
    }
}

// ============ PROJECT FILTERS ============
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name') ? document.getElementById('name').value : '';
        const email = document.getElementById('email') ? document.getElementById('email').value : '';
        const subject = document.getElementById('subject') ? document.getElementById('subject').value : '';
        const message = document.getElementById('message') ? document.getElementById('message').value : '';

        // Simulate form submission
        alert(`Terima kasih ${name}! Pesan Anda telah terkirim.\n\nSaya akan menghubungi Anda di ${email} secepatnya.`);
        contactForm.reset();
    });
}

// ============ BACK TO TOP ============
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    animateStats();
    animateSkills();
});

if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ SCROLL REVEAL ANIMATION ============
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

document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Initial call
animateStats();
animateSkills();

// ============ INTERACTIVE SNAKE CURSOR ============
(function () {
    const canvas = document.getElementById('snakeCursor');
    if (!canvas) {
        console.warn('Snake cursor: elemen canvas #snakeCursor tidak ditemukan.');
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.warn('Snake cursor: browser tidak mendukung canvas 2D context.');
        return;
    }

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';

    let width, height;
    function resize() {
        width = canvas.width = window.innerWidth || document.documentElement.clientWidth;
        height = canvas.height = window.innerHeight || document.documentElement.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Jumlah segmen badan ular (semakin banyak semakin panjang)
    const SEGMENT_COUNT = 18;
    const segments = [];

    // Posisi mouse target — mulai dari tengah layar biar ular langsung terlihat
    let mouse = { x: width / 2, y: height / 2 };
    let hasMoved = true;

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        hasMoved = true;
    });

    // Inisialisasi semua segmen di posisi tengah layar
    for (let i = 0; i < SEGMENT_COUNT; i++) {
        segments.push({ x: mouse.x, y: mouse.y });
    }


    // Gunakan palet abu-abu tetap untuk kursor ular
    function getThemeColors() {
        return {
            c1: '#9e9e9e', // abu medium
            c2: '#bdbdbd', // abu lebih terang
            c3: '#e0e0e0'  // abu sangat terang untuk glow/partikel
        };
    }

    let colors = getThemeColors();
    // Update warna tiap kali tema di-toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(() => { colors = getThemeColors(); }, 50);
        });
    }

    // Partikel sparkle yang muncul dari ekor untuk kesan elegan
    const particles = [];

    function spawnParticle() {
        const tail = segments[segments.length - 1];
        if (Math.random() < 0.55) {
            particles.push({
                x: tail.x + (Math.random() - 0.5) * 12,
                y: tail.y + (Math.random() - 0.5) * 12,
                r: Math.random() * 2 + 1,
                life: 1
            });
        }
    }

    function updateAndDrawParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.life -= 0.018;
            p.y -= 0.25;
            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = hexToRgba(colors.c3, p.life * 0.65);
            ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Aura lembut yang mengikuti kepala, sebagai latar belakang elegan
    function drawBackdrop() {
        const head = segments[0];
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 160);
        glow.addColorStop(0, hexToRgba(colors.c2, 0.14));
        glow.addColorStop(0.5, hexToRgba(colors.c1, 0.06));
        glow.addColorStop(1, hexToRgba(colors.c1, 0));
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(head.x, head.y, 160, 0, Math.PI * 2);
        ctx.fill();
    }

    let time = 0;

    function animateSnake() {
        time += 0.05;

        // Efek jejak elegan: memudar bertahap tiap frame, bukan dihapus total
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';

        // Easing: tiap segmen mengejar segmen sebelumnya dengan delay berbeda
        segments[0].x += (mouse.x - segments[0].x) * 0.22;
        segments[0].y += (mouse.y - segments[0].y) * 0.22;

        for (let i = 1; i < segments.length; i++) {
            const speed = 0.22 - (i / segments.length) * 0.08; // makin ke ekor makin lambat dikit
            segments[i].x += (segments[i - 1].x - segments[i].x) * speed;
            segments[i].y += (segments[i - 1].y - segments[i].y) * speed;
        }

        if (hasMoved) {
            drawBackdrop();
            updateAndDrawParticles();
            drawSnake();
            spawnParticle();
        }

        requestAnimationFrame(animateSnake);
    }

    function drawSnake() {
        // Gambar badan sebagai kurva halus yang mengecil ke ekor
        for (let i = segments.length - 1; i > 0; i--) {
            const seg = segments[i];
            const prevSeg = segments[i - 1];

            const t = i / segments.length; // 0 = kepala, 1 = ekor
            const radius = Math.max(2, 13 * (1 - t) + 2);

            // Sedikit gelombang di badan biar terasa "hidup"
            const wave = Math.sin(time * 3 - i * 0.5) * (1 - t) * 3;
            const angle = Math.atan2(prevSeg.y - seg.y, prevSeg.x - seg.x) + Math.PI / 2;
            const wx = Math.cos(angle) * wave;
            const wy = Math.sin(angle) * wave;

            const gradient = ctx.createRadialGradient(
                seg.x + wx, seg.y + wy, 0,
                seg.x + wx, seg.y + wy, radius * 2
            );
            gradient.addColorStop(0, hexToRgba(colors.c2, 0.9 * (1 - t) + 0.15));
            gradient.addColorStop(1, hexToRgba(colors.c1, 0));

            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(seg.x + wx, seg.y + wy, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Kepala ular
        const head = segments[0];
        const neck = segments[1] || head;
        const dirAngle = Math.atan2(head.y - neck.y, head.x - neck.x);

        // Glow di kepala
        const headGlow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 26);
        headGlow.addColorStop(0, hexToRgba(colors.c3, 0.5));
        headGlow.addColorStop(1, hexToRgba(colors.c3, 0));
        ctx.beginPath();
        ctx.fillStyle = headGlow;
        ctx.arc(head.x, head.y, 26, 0, Math.PI * 2);
        ctx.fill();

        // Bentuk kepala (oval mengikuti arah gerak)
        ctx.save();
        ctx.translate(head.x, head.y);
        ctx.rotate(dirAngle);
        const headGradient = ctx.createLinearGradient(-14, 0, 14, 0);
        headGradient.addColorStop(0, colors.c1);
        headGradient.addColorStop(1, colors.c2);
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, 15, 11, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(3, 25, 40, 0.55)';
        ctx.stroke();

        // Lidah bercabang
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(14, 0);
        ctx.lineTo(24, 0);
        ctx.moveTo(24, 0);
        ctx.lineTo(29, -4);
        ctx.moveTo(24, 0);
        ctx.lineTo(29, 4);
        ctx.stroke();

        // Mata
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(5, -5, 3, 0, Math.PI * 2);
        ctx.arc(5, 5, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#082f49';
        ctx.beginPath();
        ctx.arc(6.5, -5, 1.4, 0, Math.PI * 2);
        ctx.arc(6.5, 5, 1.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function hexToRgba(hex, alpha) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    animateSnake();
})();