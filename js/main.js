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
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
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
}, { threshold: 0.1 });

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


/* ── 8. CURSOR GLOW EFFECT ── */

const cursorGlow = document.getElementById('cursorGlow');

if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth lerp animation
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }

  animateGlow();

  // Hide glow when cursor leaves window
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
  });
}


/* ── 9. STAGGER ANIMATION FOR CARDS ── */

function staggerCards(selector, delay = 100) {
  const cards = document.querySelectorAll(selector);
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * delay);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });
}

// Apply stagger to cards after DOM is ready
window.addEventListener('load', () => {
  staggerCards('.highlight-card', 120);
  staggerCards('.skill-card', 100);
  staggerCards('.project-card', 110);
  staggerCards('.service-card', 120);
  staggerCards('.learning-item', 90);
});

/* ── 10. DYNAMIC SPARKLE STAR GENERATOR ── */

function createSparkle(container) {
  // Don't spawn sparkles if container is hidden or offscreen
  const rect = container.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle-star';
  
  // Random position within the container
  const x = Math.random() * rect.width;
  const y = Math.random() * rect.height;
  
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  
  // Random size (8px to 18px)
  const size = 8 + Math.random() * 10;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  
  // Random colors aligned with the theme
  const colors = [
    'var(--pink-light)',
    'var(--white)',
    '#ff8bb5',
    '#ffb8d1',
    '#ffd3e2',
    '#00ffff', // Cyan spark
    '#a855f7', // Violet spark
    '#ffffff'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sparkle.style.backgroundColor = randomColor;
  
  // Apply a drop shadow filter matching the color
  const shadowColor = randomColor.startsWith('var') ? 'var(--pink)' : randomColor;
  sparkle.style.filter = `drop-shadow(0 0 ${size / 3}px ${shadowColor})`;
  
  container.appendChild(sparkle);
  
  // Remove after animation completes
  setTimeout(() => {
    sparkle.remove();
  }, 1800);
}

function startGlobalSparkling() {
  // Sparkle containers (all sections, footer, and the marquee banner)
  const containers = document.querySelectorAll('section, footer, .marquee-banner');
  
  containers.forEach(container => {
    // Ensure relative positioning for absolute child placement
    const style = window.getComputedStyle(container);
    if (style.position === 'static') {
      container.style.position = 'relative';
    }
    
    // Spawning interval (run frequently for a very active effect, e.g. every 600ms - 1500ms)
    const intervalTime = 500 + Math.random() * 800;
    
    setInterval(() => {
      if (document.hidden) return;
      
      const containerRect = container.getBoundingClientRect();
      const isInViewport = (
        containerRect.top < window.innerHeight &&
        containerRect.bottom > 0
      );
      
      if (isInViewport) {
        // High probability of spawning in viewport
        if (Math.random() < 0.85) {
          createSparkle(container);
        }
      } else {
        // Lower probability offscreen to save CPU
        if (Math.random() < 0.10) {
          createSparkle(container);
        }
      }
    }, intervalTime);
  });
}

// Add global sparkling to initialization list
window.addEventListener('load', () => {
  startGlobalSparkling();
});

