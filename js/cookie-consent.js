(function () {
  var STORAGE_KEY = 'cookie_consent_v1';
  var banner = document.getElementById('cookie-banner');
  var modal = document.getElementById('cookie-modal');
  var catStatistik = document.getElementById('cookie-cat-statistik');
  var catMarketing = document.getElementById('cookie-cat-marketing');

  function readConsent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function writeConsent(consent) {
    consent.timestamp = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    applyConsent(consent);
  }

  function applyConsent(consent) {
    document.querySelectorAll('script[data-consent-category]').forEach(function (placeholder) {
      var category = placeholder.getAttribute('data-consent-category');
      if (category !== 'notwendig' && !consent[category]) return;

      var script = document.createElement('script');
      Array.from(placeholder.attributes).forEach(function (attr) {
        if (attr.name === 'type' || attr.name === 'data-consent-category') return;
        if (attr.name === 'data-src') {
          script.src = attr.value;
        } else {
          script.setAttribute(attr.name, attr.value);
        }
      });
      if (placeholder.textContent.trim()) {
        script.textContent = placeholder.textContent;
      }
      placeholder.replaceWith(script);
    });

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: consent.statistik ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        ad_user_data: consent.marketing ? 'granted' : 'denied',
        ad_personalization: consent.marketing ? 'granted' : 'denied',
      });
    }
  }

  function openBanner() {
    if (banner) banner.hidden = false;
  }

  function closeBanner() {
    if (banner) banner.hidden = true;
  }

  function openSettings() {
    var current = readConsent() || {};
    if (catStatistik) catStatistik.checked = !!current.statistik;
    if (catMarketing) catMarketing.checked = !!current.marketing;
    if (modal) modal.hidden = false;
  }

  function closeSettings() {
    if (modal) modal.hidden = true;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var acceptAll = document.getElementById('cookie-accept-all');
    var rejectAll = document.getElementById('cookie-reject-all');
    var settingsOpen = document.getElementById('cookie-settings-open');
    var modalClose = document.getElementById('cookie-modal-close');
    var modalSave = document.getElementById('cookie-modal-save');

    if (acceptAll) {
      acceptAll.addEventListener('click', function () {
        writeConsent({ notwendig: true, statistik: true, marketing: true });
        closeBanner();
        closeSettings();
      });
    }

    if (rejectAll) {
      rejectAll.addEventListener('click', function () {
        writeConsent({ notwendig: true, statistik: false, marketing: false });
        closeBanner();
        closeSettings();
      });
    }

    if (settingsOpen) settingsOpen.addEventListener('click', openSettings);
    if (modalClose) modalClose.addEventListener('click', closeSettings);

    if (modalSave) {
      modalSave.addEventListener('click', function () {
        writeConsent({
          notwendig: true,
          statistik: !!(catStatistik && catStatistik.checked),
          marketing: !!(catMarketing && catMarketing.checked),
        });
        closeBanner();
        closeSettings();
      });
    }

    var existing = readConsent();
    if (existing) {
      applyConsent(existing);
    } else {
      openBanner();
    }
  });

  window.cookieConsent = { openSettings: openSettings };
})();
