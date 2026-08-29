/* ═══════════════════════════════════════════════════════
   ZUNAIRA MUGHAL — PORTFOLIO JAVASCRIPT
   File: js/main.js
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. MOBILE NAVIGATION TOGGLE ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }


  /* ── 2. NAVBAR BACKGROUND ON SCROLL ── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ── 3. SCROLL REVEAL OBSERVER ── */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('visible'));
  }


  /* ── 4. ACTIVE NAV LINK HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const activeLinkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach(a => {
            const href = a.getAttribute('href');
            if (href === `#${id}`) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(section => activeLinkObserver.observe(section));
  }


  /* ── 5. TOAST NOTIFICATION ── */
  function showToast(message, duration = 4500) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }


  /* ── 6. FLOATING CANVAS INTERACTION ── */
  const contactCanvas = document.getElementById('contactFloatingCanvas');
  if (contactCanvas) {
    const pills = contactCanvas.querySelectorAll('.floating-pill-badge');
    
    contactCanvas.addEventListener('mousemove', (e) => {
      const rect = contactCanvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      pills.forEach((pill, idx) => {
        const factor = (idx + 1) * 12;
        pill.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });

    contactCanvas.addEventListener('mouseleave', () => {
      pills.forEach(pill => {
        pill.style.transform = '';
      });
    });
  }


  /* ── 7. ANIMATE SKILL BARS ON SCROLL ── */
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  if (skillSection && skillBars.length > 0) {
    if ('IntersectionObserver' in window) {
      const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            skillBars.forEach(bar => {
              const width = bar.getAttribute('data-width');
              if (width) bar.style.width = width + '%';
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      skillObserver.observe(skillSection);
    } else {
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) bar.style.width = width + '%';
      });
    }
  }

});
