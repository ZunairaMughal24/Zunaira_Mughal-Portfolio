/**
 * nav.js
 * Sticky nav behavior, active link highlighting, mobile menu
 */

(function () {
  const nav         = document.getElementById('nav');
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections    = document.querySelectorAll('section[id]');
  const navLinks    = document.querySelectorAll('.nav-link');

  // ── Scroll: sticky nav ────────────────────────────────
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    highlightActiveLink();
  }, { passive: true });

  // ── Active link highlighting ──────────────────────────
  function highlightActiveLink() {
    let current = '';
    sections.forEach((section) => {
      const sectionTop    = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ── Mobile menu toggle ────────────────────────────────
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // ── Active nav link style ─────────────────────────────
  const style = document.createElement('style');
  style.textContent = `.nav-link.active { color: var(--text); }
  .nav-link.active::after { width: 100%; }`;
  document.head.appendChild(style);
})();
