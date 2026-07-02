// =========================================================
// PTSTUDIOS — shared script
// Handles: scroll-reveal animation, mobile nav toggle, active nav link
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile menu toggle ----
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        navLinks.classList.remove('open');
        navLinks.style.display = '';
      } else {
        navLinks.classList.add('open');
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '64px';
        navLinks.style.right = '24px';
        navLinks.style.background = '#121212';
        navLinks.style.border = '1px solid #2B2620';
        navLinks.style.borderRadius = '10px';
        navLinks.style.padding = '16px 20px';
        navLinks.style.gap = '14px';
      }
    });
  }

  // ---- Highlight the current page in the nav ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll-reveal animation ----
  // Any element with [data-reveal] fades/slides in once it enters the viewport.
  // Add data-reveal-group to a container to auto-stagger its direct children.
  document.querySelectorAll('[data-reveal-group]').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      child.style.setProperty('--delay', `${i * 0.08}s`);
    });
  });

  const revealItems = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(item => observer.observe(item));
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    revealItems.forEach(item => item.classList.add('in-view'));
  }

});
