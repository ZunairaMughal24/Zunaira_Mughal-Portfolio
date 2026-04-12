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

// Close menu when any nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ── 2. NAVBAR BACKGROUND ON SCROLL ── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 15, 0.97)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.85)';
  }
});


/* ── 3. SCROLL REVEAL (fade-up on enter) ── */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stop observing once revealed — no need to re-trigger
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));


/* ── 4. SKILL BAR ANIMATION ── */
// Bars start at width: 0 in CSS, then animate to data-width % when visible

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


/* ── 5. CONTACT FORM ── */

const formSubmit = document.getElementById('formSubmit');

if (formSubmit) {
  formSubmit.addEventListener('click', () => {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // ─────────────────────────────────────────────────
    // TO MAKE THE FORM ACTUALLY SEND EMAILS:
    // 1. Go to https://formspree.io and create a free account
    // 2. Create a new form and get your endpoint URL
    // 3. Replace the alert below with a fetch() call:
    //
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, subject, message })
    // })
    // .then(() => alert('Message sent! I'll get back to you soon.'))
    // .catch(() => alert('Something went wrong. Please try again.'));
    // ─────────────────────────────────────────────────

    alert(`Thanks ${name}! Your message has been received. I'll get back to you soon.`);
  });
}


/* ── 6. ACTIVE NAV LINK HIGHLIGHT ── */
// Highlights the correct nav link based on scroll position

const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const activeLinkObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => activeLinkObserver.observe(section));
