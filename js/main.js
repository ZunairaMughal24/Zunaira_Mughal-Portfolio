/* ═══════════════════════════════════════════════════════
   ZUNAIRA PORTFOLIO — MAIN JAVASCRIPT
   File: js/main.js
═══════════════════════════════════════════════════════ */


/* ── 1. MOBILE NAVIGATION ── */

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ── 2. NAVBAR BACKGROUND ON SCROLL ── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 11, 0.97)';
  } else {
    navbar.style.background = '';
  }
});


/* ── 3. SCROLL REVEAL (fade-up on enter) ── */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));


/* ── 4. SKILL BAR ANIMATION ── */

const skillBars = document.querySelectorAll('.skill-bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.getAttribute('data-width');
      entry.target.style.width = targetWidth + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));


/* ── 5. TOAST NOTIFICATION ── */

function showToast(msg, duration = 5000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}


/* ── 6. CONTACT FORM ── */

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.');
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:zunairamughal.dev@gmail.com`
      + `?subject=${encodeURIComponent(subject || 'Portfolio Contact')}`
      + `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    showToast(`Opening your email client, ${name}. Talk soon!`);
    contactForm.reset();
  });
}


/* ── 7. ACTIVE NAV LINK HIGHLIGHT ── */

const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => activeLinkObserver.observe(section));
