const LOGO_URL = 'https://www.electroartevents.de/images/logo-email.png';

const FELD_LABELS = {
  name: 'Name',
  email: 'E-Mail',
  telefon: 'Telefon',
  eventart: 'Event',
  teilnehmer: 'Teilnehmer',
  gaeste: 'Gäste',
  location: 'Location',
  adresse: 'Adresse',
  ort: 'Ort',
  datum: 'Wunschdatum',
  nachricht: 'Nachricht',
};

function escapeHtml(wert) {
  return String(wert)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function whatsappNummer(telefon) {
  if (!telefon) return '';
  let ziffern = String(telefon).replace(/\D/g, '');
  if (ziffern.startsWith('00')) ziffern = ziffern.slice(2);
  if (ziffern.startsWith('0')) ziffern = '49' + ziffern.slice(1);
  return ziffern;
}

function baueAktionsButtons(felder) {
  const telefon = felder.telefon;
  const email = felder.email;
  const buttons = [];

  if (telefon) {
    buttons.push({ label: 'Anrufen', href: `tel:${telefon.replace(/\s+/g, '')}` });
  }
  if (telefon) {
    const waNummer = whatsappNummer(telefon);
    if (waNummer) {
      buttons.push({ label: 'WhatsApp', href: `https://wa.me/${waNummer}` });
    }
  }
  if (email) {
    buttons.push({ label: 'E-Mail', href: `mailto:${email}` });
  }

  if (buttons.length === 0) return '';

  const zellen = buttons
    .map(
      (button) => `
        <td style="padding:0 6px 10px;">
          <a href="${escapeHtml(button.href)}" style="display:inline-block;min-width:120px;padding:13px 20px;border-radius:999px;background:linear-gradient(135deg,#e8c58b,#fff1bc 46%,#ff6fa7);color:#151014;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-align:center;text-decoration:none;">${escapeHtml(button.label)}</a>
        </td>`
    )
    .join('');

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px auto 4px;">
      <tr>${zellen}</tr>
    </table>`;
}

function baueFelderTabelle(felder) {
  return Object.entries(felder)
    .map(([feld, wert]) => {
      const label = FELD_LABELS[feld] || feld;
      return `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,250,244,0.12);color:#8cecff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;vertical-align:top;white-space:nowrap;padding-right:18px;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,250,244,0.12);color:#fffaf4;font-family:Arial,Helvetica,sans-serif;font-size:14px;vertical-align:top;">${escapeHtml(wert).replace(/\n/g, '<br>')}</td>
        </tr>`;
    })
    .join('');
}

function leadEmailHtml({ formular, felder }) {
  const titel = formular || 'Neue Anfrage';

  return `<!doctype html>
<html lang="de">
  <body style="margin:0;padding:0;background:#05060a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#05060a;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#11141d;border-radius:14px;overflow:hidden;border:1px solid rgba(255,250,244,0.12);">
            <tr>
              <td align="center" style="padding:28px 24px 12px;">
                <img src="${LOGO_URL}" width="120" alt="ElectroArt Logo" style="display:block;width:120px;max-width:120px;height:auto;">
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 24px 20px;">
                <p style="margin:0;color:#8cecff;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Neue Lead-Anfrage</p>
                <h1 style="margin:6px 0 0;color:#fffaf4;font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:800;">${escapeHtml(titel)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${baueFelderTabelle(felder)}
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 24px 28px;">
                ${baueAktionsButtons(felder)}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:16px 24px 24px;border-top:1px solid rgba(255,250,244,0.1);">
                <p style="margin:0;color:rgba(255,250,244,0.55);font-family:Arial,Helvetica,sans-serif;font-size:11px;">ElectroArt &ndash; DJ &amp; Event-Service &middot; automatische Lead-Benachrichtigung</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

module.exports = { leadEmailHtml };
