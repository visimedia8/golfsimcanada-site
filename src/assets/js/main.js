/* ==========================================================================
   GolfSimCanada.site — Main JavaScript
   SSOT Reference: 13-build-flow.md §2.5 & 08-design-system.md §13
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
  initNav();
  initMobileBottomNav();
  initTOC();
  initSmoothScroll();
  initLazyImages();
});

/* --------------------------------------------------------------------------
   1. Cookie Consent Banner (PIPEDA + Law 25 Compliant)
   -------------------------------------------------------------------------- */
function initCookieConsent() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const storageKey = 'gsc_consent';
  const savedConsent = localStorage.getItem(storageKey);

  if (!savedConsent) {
    // Show banner after 500ms delay if no choice stored
    setTimeout(() => {
      banner.setAttribute('aria-hidden', 'false');
    }, 500);
  }

  const acceptBtn = document.getElementById('cookie-accept-all');
  const declineBtn = document.getElementById('cookie-decline-all');
  const saveBtn = document.getElementById('cookie-save');
  const analyticsInput = document.getElementById('consent-analytics');
  const advertisingInput = document.getElementById('consent-advertising');

  function saveConsentState(analytics, advertising) {
    const consentState = {
      essential: true,
      analytics: Boolean(analytics),
      advertising: Boolean(advertising),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify(consentState));
    banner.setAttribute('aria-hidden', 'true');
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => saveConsentState(true, true));
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => saveConsentState(false, false));
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const analytics = analyticsInput ? analyticsInput.checked : false;
      const advertising = advertisingInput ? advertisingInput.checked : false;
      saveConsentState(analytics, advertising);
    });
  }
}

/* --------------------------------------------------------------------------
   2. Desktop & Mobile Top Header Navigation
   -------------------------------------------------------------------------- */
function initNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const dropdownButtons = document.querySelectorAll('.nav__link--dropdown');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.setAttribute('aria-hidden', isExpanded);
    });
  }

  dropdownButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      
      // Close all other dropdowns
      dropdownButtons.forEach(other => {
        if (other !== btn) other.setAttribute('aria-expanded', 'false');
      });

      btn.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // Close dropdowns on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav__dropdown')) {
      dropdownButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    }
  });

  // Keyboard navigation (Escape key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      if (hamburger && mobileMenu) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    }
  });
}

/* --------------------------------------------------------------------------
   3. Mobile Sticky Bottom Nav & Sub-trays
   -------------------------------------------------------------------------- */
function initMobileBottomNav() {
  const trayButtons = document.querySelectorAll('.mbn-item[data-tray]');
  const backdrop = document.getElementById('mbn-backdrop');
  const trays = document.querySelectorAll('.mbn-tray');

  if (!trayButtons.length || !backdrop) return;

  function closeAllTrays() {
    trays.forEach(tray => tray.classList.remove('is-open'));
    backdrop.classList.remove('is-visible');
    trayButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  }

  trayButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetTrayId = 'tray-' + btn.getAttribute('data-tray');
      const targetTray = document.getElementById(targetTrayId);
      if (!targetTray) return;

      const isOpen = targetTray.classList.contains('is-open');

      closeAllTrays();

      if (!isOpen) {
        targetTray.classList.add('is-open');
        backdrop.classList.add('is-visible');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  backdrop.addEventListener('click', closeAllTrays);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllTrays();
  });
}

/* --------------------------------------------------------------------------
   4. Table of Contents (TOC) Auto-generator
   -------------------------------------------------------------------------- */
function initTOC() {
  const tocList = document.querySelector('.toc__list');
  const articleBody = document.querySelector('.blog-post__body, .prose');

  if (!tocList || !articleBody) return;

  const headings = articleBody.querySelectorAll('h2, h3');
  if (!headings.length) return;

  tocList.innerHTML = '';

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = 'heading-' + index;
    }

    const li = document.createElement('li');
    li.className = 'toc__item';
    if (heading.tagName.toLowerCase() === 'h3') {
      li.classList.add('toc__item--h3');
    }

    const link = document.createElement('a');
    link.href = '#' + heading.id;
    link.textContent = heading.textContent;

    li.appendChild(link);
    tocList.appendChild(li);
  });
}

/* --------------------------------------------------------------------------
   5. Smooth Scroll for Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Lazy Image Observer Fallback
   -------------------------------------------------------------------------- */
function initLazyImages() {
  if ('loading' in HTMLImageElement.prototype) return;

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (!lazyImages.length) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        if (image.dataset.src) {
          image.src = image.dataset.src;
        }
        observer.unobserve(image);
      }
    });
  });

  lazyImages.forEach(image => imageObserver.observe(image));
}
