(() => {
  const form = document.getElementById('wedding-inquiry');
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const note = form.querySelector('.form-note');
  const buttonLabel = button.innerHTML;
  let sending = false;
  const steps = [...form.querySelectorAll('.quiz-step')];
  const back = form.querySelector('.quiz-back');
  const next = form.querySelector('.quiz-next');
  const progress = form.querySelector('.quiz-progress');
  const counter = form.querySelector('.quiz-counter');
  const titles = ['Eure Gäste', 'Eure Location', 'Eure Musik', 'Eure Ausstattung', 'Eure Kontaktdaten'];
  let current = 0;

  function showStep(index, focus = true) {
    current = index;
    steps.forEach((step, i) => { step.hidden = i !== current; });
    back.hidden = current === 0;
    next.hidden = current === steps.length - 1;
    button.hidden = current !== steps.length - 1;
    counter.textContent = `Schritt ${current + 1} von ${steps.length} · ${titles[current]}`;
    progress.querySelector('progress').value = current + 1;
    if (focus) steps[current].querySelector('legend').focus();
  }

  function validateStep(index) {
    const invalid = [...steps[index].querySelectorAll('input, textarea')]
      .find((input) => !input.checkValidity());
    if (!invalid) return true;
    showStep(index, false);
    invalid.reportValidity();
    return false;
  }

  const dialog = document.getElementById('hochzeitsquiz');
  const close = dialog.querySelector('.quiz-close');
  const openers = document.querySelectorAll('[data-open-wedding-quiz]');
  let opener = null;

  function openQuiz(trigger) {
    if (dialog.open) return;
    opener = trigger || document.activeElement;
    dialog.showModal();
    document.body.classList.add('wedding-quiz-open');
    if (form.querySelector('.quiz-navigation').hidden) {
      note.tabIndex = -1;
      note.focus();
    } else {
      steps[current].querySelector('legend').focus();
    }
  }

  openers.forEach((trigger) => {
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', dialog.id);
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openQuiz(trigger);
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog &&
        (event.clientX < rect.left || event.clientX > rect.right ||
         event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('wedding-quiz-open');
    if (opener && opener.isConnected) opener.focus();
  });
  function openFromHash() {
    if (window.location.hash === '#hochzeitsquiz' || window.location.hash === '#anfrage') openQuiz();
  }
  window.addEventListener('hashchange', openFromHash);

  form.noValidate = true;
  progress.hidden = false;
  showStep(0, false);
  openFromHash();
  next.addEventListener('click', () => {
    if (!sending && validateStep(current)) showStep(current + 1);
  });
  back.addEventListener('click', () => {
    if (!sending) showStep(current - 1);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    if (current < steps.length - 1) {
      if (validateStep(current)) showStep(current + 1);
      return;
    }
    for (let index = 0; index < steps.length; index += 1) {
      if (!validateStep(index)) return;
    }

    const answers = new FormData(form);
    const data = Object.fromEntries(answers.entries());
    data.musikrichtungen = answers.getAll('musikrichtungen').join(', ') || 'Noch offen – bitte beraten';
    data.technik = answers.getAll('technik').join(', ') || 'Keine Auswahl – bitte abstimmen';
    sending = true;
    button.disabled = true;
    back.disabled = true;
    steps.forEach((step) => { step.disabled = true; });
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
      steps.forEach((step) => { step.hidden = true; });
      progress.hidden = true;
      form.querySelector('.quiz-navigation').hidden = true;
      note.textContent = 'Danke für eure Anfrage! Jens meldet sich persönlich bei euch. Euer Termin ist damit noch nicht verbindlich gebucht.';
    } catch (error) {
      note.innerHTML = 'Eure Anfrage konnte gerade nicht gesendet werden. Eure Antworten bleiben gespeichert. Bitte versucht es erneut oder ruft Jens unter <a href="tel:+4915158778666">0151 58778666</a> an.';
    } finally {
      sending = false;
      button.disabled = false;
      back.disabled = false;
      steps.forEach((step) => { step.disabled = false; });
      button.innerHTML = buttonLabel;
    }

    if (successful && typeof window.trackLead === 'function') {
      window.trackLead(data.formular);
    }
  });
})();
