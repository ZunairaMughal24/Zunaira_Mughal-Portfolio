/**
 * counter.js
 * Animated number counter for hero statistics
 */

(function () {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  let hasAnimated = false;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counters.forEach((counter) => animateCounter(counter));
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) observer.observe(statsEl);
})();
