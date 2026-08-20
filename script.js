// ===== Starfield (توليد النجوم) =====
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 130; i++) {
  const s = document.createElement('span');
  s.className = 'star';
  const size = Math.random() * 2.5 + 0.5;
  s.style.width = s.style.height = size + 'px';
  s.style.top = Math.random() * 100 + '%';
  s.style.left = Math.random() * 100 + '%';
  s.style.animationDuration = (Math.random() * 4 + 2) + 's';
  s.style.animationDelay = (Math.random() * 4) + 's';
  starsContainer.appendChild(s);
}

// ===== Typewriter (الكلام بيتكتب لوحده) =====
const typedEl = document.getElementById('typed');
const roles = [
  'Computer Engineering Student',
  'AI & IoT Enthusiast',
  'BI Developer',
  'AIOT Community Leader',
  'Software Engineer'
];
let roleIdx = 0, charIdx = 0, deleting = false;
function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}
typeLoop();

// ===== Mobile Menu =====
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ===== تنويع أنيميشن الدخول تلقائياً =====
document.querySelectorAll('.timeline .t-item').forEach((el, i) => {
  el.classList.remove('reveal');
  el.classList.add(i % 2 ? 'reveal-right' : 'reveal-left');
});
document.querySelectorAll('.gallery-item').forEach(el => {
  el.classList.remove('reveal'); el.classList.add('reveal-zoom');
});
document.querySelectorAll('.cert-card, .skill-group, .gallery-item, .contact-card').forEach((el, i) => {
  el.style.transitionDelay = (i % 5) * 0.1 + 's';
});

// ===== Reveal on Scroll =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom')
  .forEach(el => observer.observe(el));

// ===== 3D Tilt للكروت =====
document.querySelectorAll('.project-card, .cert-card, .contact-card, .skill-group').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y / r.height) - .5) * -10;
    const ry = ((x / r.width) - .5) * 10;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ===== Nebula Parallax =====
const nebulas = document.querySelectorAll('.nebula');
window.addEventListener('mousemove', e => {
  const x = (e.clientX / innerWidth - .5) * 30;
  const y = (e.clientY / innerHeight - .5) * 30;
  nebulas.forEach((n, i) => {
    n.style.transform = `translate(${x * (i + 1) * .4}px, ${y * (i + 1) * .4}px)`;
  });
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id], header[id]');
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (!link) return;
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();