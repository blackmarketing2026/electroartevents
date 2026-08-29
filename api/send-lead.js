const nodemailer = require('nodemailer');

// smtp_passwort wurde im Vercel-Projekt einmal versehentlich als "stmp_passwort"
// angelegt (vertauschte Buchstaben) - beide Schreibweisen werden akzeptiert, damit
// der Versand nicht an einem Tippfehler in der Vercel-Konfiguration scheitert.
const SMTP_ENV_ALIASES = {
  smtp_server: ['smtp_server'],
  smtp_user: ['smtp_user'],
  smtp_passwort: ['smtp_passwort', 'stmp_passwort'],
  smtp_empfaenger: ['smtp_empfaenger'],
};

function smtpEnv(name) {
  const aliases = SMTP_ENV_ALIASES[name];
  return aliases.map((alias) => process.env[alias]).find(Boolean);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const fehlendeEnv = Object.keys(SMTP_ENV_ALIASES).filter((key) => !smtpEnv(key));
  if (fehlendeEnv.length > 0) {
    return res.status(500).json({ error: `Fehlende SMTP-Konfiguration: ${fehlendeEnv.join(', ')}` });
  }

  const { formular, ...felder } = req.body || {};

  if (Object.keys(felder).length === 0) {
    return res.status(400).json({ error: 'Keine Formulardaten uebermittelt' });
  }

  const transporter = nodemailer.createTransport({
    host: smtpEnv('smtp_server'),
    port: 465,
    secure: true,
    auth: {
      user: smtpEnv('smtp_user'),
      pass: smtpEnv('smtp_passwort'),
    },
  });

  const text = Object.entries(felder)
    .map(([feld, wert]) => `${feld}: ${wert}`)
    .join('\n');

  try {
    await transporter.sendMail({
      from: smtpEnv('smtp_user'),
      to: smtpEnv('smtp_empfaenger'),
      subject: `Neue Anfrage${formular ? ` - ${formular}` : ''}`,
      text,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'E-Mail-Versand fehlgeschlagen', details: error.message });
  }
};
