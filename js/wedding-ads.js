(() => {
  const form = document.getElementById('wedding-inquiry');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const note = form.querySelector('.form-note');
  const buttonLabel = button.innerHTML;
  let sending = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    sending = true;
    button.disabled = true;
    button.textContent = 'Anfrage wird gesendet …';
    note.textContent = 'Eure Anfrage wird übermittelt. Einen Moment bitte.';
    let successful = false;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('request failed');
      const result = await response.json();
      if (result.success !== true) throw new Error('sending not confirmed');
      successful = true;
      form.reset();
      note.textContent = 'Danke für eure Anfrage! Jens meldet sich persönlich bei euch. Euer Termin ist damit noch nicht verbindlich gebucht.';
    } catch (error) {
      note.innerHTML = 'Eure Anfrage konnte gerade nicht gesendet werden. Eure Angaben bleiben im Formular. Bitte versucht es erneut oder ruft Jens unter <a href="tel:+4915158778666">0151 58778666</a> an.';
    } finally {
      sending = false;
      button.disabled = false;
      button.innerHTML = buttonLabel;
    }

    if (successful && typeof window.trackLead === 'function') {
      window.trackLead(data.formular);
    }
  });
})();
