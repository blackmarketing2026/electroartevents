(function () {
  window.dataLayer = window.dataLayer || [];

  document.addEventListener(
    'click',
    function (event) {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') || '';

      if (href.startsWith('tel:')) {
        window.dataLayer.push({ event: 'anruf', anruf_nummer: href.slice(4) });
      } else if (href.startsWith('mailto:')) {
        window.dataLayer.push({ event: 'email', email_adresse: href.slice(7).split('?')[0] });
      } else if (/^https:\/\/(api\.)?wa\.me\//.test(href)) {
        window.dataLayer.push({ event: 'whatsapp' });
      }
    },
    true
  );

  window.trackLead = function (formular) {
    window.dataLayer.push({ event: 'lead', formular: formular || '' });
  };
})();
