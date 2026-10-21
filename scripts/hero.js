/**
 * NSCC SRMIST — Hero Section Controller
 * Pure Vanilla JavaScript — Zero Dependencies
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const primaryCta = document.querySelector('.nscc-btn--primary');
  const bgArt = document.querySelector('.nscc-hero-bg-art');

  /**
   * Smooth Anchor Handler for Downstream Project Section Integration
   */
  if (primaryCta) {
    primaryCta.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        } else {
          console.info(
            `[NSCC Hero] Target container "${targetId}" not detected in DOM. ` +
            `Ready for downstream integration with the Projects Section.`
          );
        }
      }
    });
  }

  /**
   * Subtle Pointer-Responsive Displacement on Background Geometry
   * - Minimal displacement (max ~6px)
   * - Strictly reactive to mousemove; zero continuous loop overhead
   * - Fully disabled when reduced motion is requested or on small screens
   */
  if (!prefersReducedMotion && bgArt && window.innerWidth > 768) {
    let ticking = false;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', function (e) {
      // Calculate normalized offset from viewport center (-0.5 to +0.5)
      const normX = (e.clientX / window.innerWidth) - 0.5;
      const normY = (e.clientY / window.innerHeight) - 0.5;

      // Restrained subtle displacement: max 8px X, 6px Y
      targetX = normX * 8;
      targetY = normY * 6;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          bgArt.style.transform = `translate3d(${targetX.toFixed(2)}px, ${targetY.toFixed(2)}px, 0)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
})();
