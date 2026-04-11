/**
 * form.js
 * Contact form submission handler with validation feedback
 */

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs  = form.querySelectorAll('input, textarea');
    let isValid   = true;

    // Basic validation
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        setInputError(input, true);
      } else {
        setInputError(input, false);
      }
    });

    if (!isValid) return;

    // Simulate loading state
    submitBtn.disabled     = true;
    submitBtn.innerHTML    = `
      <span>Sending...</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="spin-icon">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `;

    // Simulate API call (replace with your actual email service)
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // Success state
    submitBtn.innerHTML = `
      <span>Message Sent!</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    submitBtn.style.background = 'var(--success)';
    submitBtn.style.color      = 'var(--bg)';

    form.reset();

    setTimeout(() => {
      submitBtn.disabled         = false;
      submitBtn.innerHTML        = `Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      submitBtn.style.background = '';
      submitBtn.style.color      = '';
    }, 4000);
  });

  // Real-time validation clearing
  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('input', () => setInputError(input, false));
  });

  function setInputError(input, hasError) {
    input.style.borderColor = hasError
      ? 'rgba(252, 129, 129, 0.6)'
      : '';
    input.style.boxShadow = hasError
      ? '0 0 0 3px rgba(252, 129, 129, 0.1)'
      : '';
  }

  // Add spin icon CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    .spin-icon { animation: spin 0.8s linear infinite; }
  `;
  document.head.appendChild(style);
})();
