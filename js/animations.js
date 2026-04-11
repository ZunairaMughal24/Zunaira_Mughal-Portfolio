/**
 * animations.js
 * Scroll-triggered reveal animations using IntersectionObserver
 */

(function () {
  // Generic reveal for .reveal-up elements
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-up').forEach((el) => {
    revealObserver.observe(el);
  });

  // Skill cards observer
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.skill-card, .project-card').forEach((el) => {
    cardObserver.observe(el);
  });

  // Timeline items
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, i * 150);
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.timeline-item').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(el);
  });

  // Contact section items
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.contact-item').forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            }, i * 100);
          });
          contactObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const contactLinks = document.querySelector('.contact-links');
  if (contactLinks) {
    contactLinks.querySelectorAll('.contact-item').forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-16px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    contactObserver.observe(contactLinks);
  }
})();
