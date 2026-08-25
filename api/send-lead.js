const nodemailer = require('nodemailer');

const PFLICHT_ENV = ['smtp_server', 'smtp_user', 'smtp_passwort', 'smtp_empfaenger'];

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const fehlendeEnv = PFLICHT_ENV.filter((key) => !process.env[key]);
  if (fehlendeEnv.length > 0) {
    return res.status(500).json({ error: `Fehlende SMTP-Konfiguration: ${fehlendeEnv.join(', ')}` });
  }

  const { formular, ...felder } = req.body || {};

  if (Object.keys(felder).length === 0) {
    return res.status(400).json({ error: 'Keine Formulardaten uebermittelt' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.smtp_server,
    port: 465,
    secure: true,
    auth: {
      user: process.env.smtp_user,
      pass: process.env.smtp_passwort,
    },
  });

  const text = Object.entries(felder)
    .map(([feld, wert]) => `${feld}: ${wert}`)
    .join('\n');

  try {
    await transporter.sendMail({
      from: process.env.smtp_user,
      to: process.env.smtp_empfaenger,
      subject: `Neue Anfrage${formular ? ` - ${formular}` : ''}`,
      text,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'E-Mail-Versand fehlgeschlagen', details: error.message });
  }
};
