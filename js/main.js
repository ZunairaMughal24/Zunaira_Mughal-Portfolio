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
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (!href.startsWith('#')) {
      link.classList.remove('active');
    }
  });

  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)');

  if ('IntersectionObserver' in window && sections.length > 0 && navAnchors.length > 0) {
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


  /* ── 8. INTERACTIVE 3D PHONE SHOWCASE & PARALLAX ── */
  const showcaseStage = document.getElementById('showcaseStage');
  const phoneChassis = document.getElementById('phoneChassis');
  const phoneGlare = document.getElementById('phoneGlare');
  const floatingBadges = document.querySelectorAll('.floating-badge');
  const phonePulseBtn = document.getElementById('phonePulseBtn');
  const appCards = document.querySelectorAll('.app-mini-card');
  const screenClock = document.getElementById('screenClock');

  // Real-time Clock on Phone
  if (screenClock) {
    const updatePhoneClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      screenClock.textContent = `${hours}:${mins}`;
    };
    updatePhoneClock();
    setInterval(updatePhoneClock, 30000);
  }

  // 3D Perspective Mouse Parallax on Stage
  if (showcaseStage && phoneChassis) {
    showcaseStage.addEventListener('mousemove', (e) => {
      const rect = showcaseStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotateX = -y * 22;
      const rotateY = x * 22;

      phoneChassis.style.animation = 'none'; // pause idle while hovering
      phoneChassis.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

      if (phoneGlare) {
        phoneGlare.style.background = `linear-gradient(${115 + x * 40}deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%, rgba(225,29,72,0.12) 65%, transparent 100%)`;
      }

      // Parallax displace floating badges
      floatingBadges.forEach(badge => {
        const speed = parseFloat(badge.getAttribute('data-speed')) || 15;
        const tx = x * speed;
        const ty = y * speed;
        badge.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    });

    showcaseStage.addEventListener('mouseleave', () => {
      phoneChassis.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
      phoneChassis.style.animation = 'phoneIdleFloat 6s ease-in-out infinite alternate';

      floatingBadges.forEach(badge => {
        badge.style.transform = '';
      });
    });
  }

  // Interactive Quick Action Cards
  if (appCards.length > 0) {
    appCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        appCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
  }

  // Interactive Pulse Button & Floating Hearts
  if (phonePulseBtn) {
    phonePulseBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      const screen = phonePulseBtn.closest('.phone-screen-content');
      if (screen) {
        const icons = ['fa-heart', 'fa-wand-magic-sparkles', 'fa-bolt', 'fa-fire'];
        const colors = ['#be123c', '#e11d48', '#38bdf8', '#fbbf24'];

        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            const heart = document.createElement('i');
            const randomIcon = icons[Math.floor(Math.random() * icons.length)];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            heart.className = `fa-solid ${randomIcon} app-floating-heart`;
            heart.style.color = randomColor;

            const hx = (Math.random() * 80 - 40) + 'px';
            const hrot = (Math.random() * 40 - 20) + 'deg';
            heart.style.setProperty('--hx', hx);
            heart.style.setProperty('--hrot', hrot);

            heart.style.left = `calc(50% + ${(Math.random() * 40 - 20)}px)`;
            heart.style.bottom = '85px';

            screen.appendChild(heart);

            setTimeout(() => heart.remove(), 1200);
          }, i * 100);
        }
      }
    });
  }

});
