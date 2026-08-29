# Vorlage: Datenschutzerkl&auml;rung + Cookie-Banner

Wiederverwendbare Basis f&uuml;r andere Web-Projekte. Enth&auml;lt einen Baustein-Text f&uuml;r die
Datenschutzerkl&auml;rung (Platzhalter in `{{...}}`) sowie einen fertigen, framework-losen
Cookie-Banner (HTML/CSS/JS) mit den Kategorien **Notwendig / Statistik / Marketing**.

> **Kein Rechtsrat.** Das ist ein technisches Ger&uuml;st nach g&auml;ngigem DSGVO-Muster
> (Struktur wie in vielen eRecht24/anwalt.de-Generatoren). Vor dem Live-Gang pro Projekt
> pr&uuml;fen (lassen), insbesondere: welche Dienste tats&auml;chlich eingesetzt werden, ob
> AVVs mit allen Auftragsverarbeitern bestehen, und ob branchenspezifische Pflichten
> hinzukommen.

---

## 1. Verwendung

1. Alle `{{PLATZHALTER}}` durch die echten Werte des Projekts ersetzen.
2. Abschnitte, deren Dienst im Projekt **nicht** genutzt wird, komplett l&ouml;schen
   (nicht auskommentieren &ndash; ungenutzte Dienste d&uuml;rfen nicht auftauchen).
3. Fehlt ein Dienst in dieser Vorlage (z. B. Hotjar, LinkedIn Insight Tag, TikTok Pixel),
   neuen Abschnitt nach dem Muster der vorhandenen Tracking-Abschnitte erg&auml;nzen:
   Anbieter + Adresse, was verarbeitet wird, Rechtsgrundlage, Link zur
   Anbieter-Datenschutzerkl&auml;rung.
4. Cookie-Banner (Teil 3) so einbauen, dass Statistik-/Marketing-Skripte **erst nach
   Einwilligung** geladen werden (siehe `data-consent-category`-Pattern unten). Das ist der
   h&auml;ufigste Fehler: Text sagt "nur mit Einwilligung", Skript l&auml;dt aber trotzdem
   sofort.

---

## 2. Datenschutzerkl&auml;rung (Textbausteine)

```markdown
# Datenschutzerkl&auml;rung

## 1. Verantwortlicher

{{FIRMENNAME / NAME}}
{{STRASSE HAUSNUMMER}}
{{PLZ ORT}}
Telefon: {{TELEFON}}
E-Mail: {{EMAIL}}

## 2. Allgemeine Hinweise zur Datenverarbeitung

Wir verarbeiten personenbezogene Daten unserer Nutzer grunds&auml;tzlich nur, soweit dies zur
Bereitstellung einer funktionsf&auml;higen Website sowie unserer Inhalte und Leistungen
erforderlich ist oder eine Einwilligung der Nutzer vorliegt. Rechtsgrundlage ist jeweils
Art. 6 Abs. 1 DSGVO.

## 3. Hosting

Diese Website wird bei einem externen Dienstleister gehostet:

{{HOSTER_NAME}}
{{HOSTER_ADRESSE}}

Personenbezogene Daten, die im Rahmen der Nutzung dieser Website erfasst werden, werden auf
den Servern des Hosters gespeichert. Mit {{HOSTER_NAME}} besteht ein Vertrag zur
Auftragsverarbeitung (AVV) gem&auml;&szlig; Art. 28 DSGVO.

<!-- Optional, nur falls Code-Repo + separates Deployment-Ziel genutzt werden -->
## 4. Quellcode-Verwaltung und Bereitstellung

Der Quellcode dieser Website wird bei {{REPO_ANBIETER}} verwaltet und &uuml;ber
{{DEPLOY_ANBIETER}} bereitgestellt und ausgeliefert. Dabei k&ouml;nnen technische
Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt des Aufrufs) verarbeitet werden.

{{REPO_ANBIETER}}
{{REPO_ANBIETER_ADRESSE}}

{{DEPLOY_ANBIETER}}
{{DEPLOY_ANBIETER_ADRESSE}}

## 5. Server-Log-Dateien

Der Provider erhebt und speichert automatisch Informationen in sogenannten
Server-Log-Dateien, die Ihr Browser automatisch an uns &uuml;bermittelt: Browsertyp und
-version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners,
Uhrzeit der Serveranfrage und IP-Adresse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.

## 6. Cookies und Cookie-Banner

Diese Website verwendet Cookies. Beim ersten Besuch werden Sie &uuml;ber ein Cookie-Banner
um Ihre Einwilligung zu nicht technisch notwendigen Cookies gebeten. Wir unterscheiden
folgende Kategorien:

- **Notwendig:** f&uuml;r den Betrieb der Website zwingend erforderlich, kein
  Einwilligungserfordernis (Art. 6 Abs. 1 lit. f DSGVO).
- **Statistik:** z. B. {{STATISTIK_DIENSTE, z.B. Google Analytics, Microsoft Clarity}} &ndash;
  nur mit Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
- **Marketing:** z. B. {{MARKETING_DIENSTE, z.B. Meta-Pixel, Google Ads Remarketing}} &ndash;
  nur mit Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).

Sie k&ouml;nnen Ihre Einwilligung jederzeit &uuml;ber den Link "Cookie-Einstellungen" im
Footer anpassen oder widerrufen.

<!-- Nur falls ein Kontaktformular existiert -->
## 7. Kontaktformular

Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
Formular (u. a. {{FORMULARFELDER}}) zwecks Bearbeitung der Anfrage und f&uuml;r den Fall
von Anschlussfragen bei uns gespeichert{{ggf. per E-Mail an uns weitergeleitet}}. Diese
Daten geben wir nicht ohne Ihre Einwilligung weiter.

Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern die Anfrage
mit der Erf&uuml;llung eines Vertrags zusammenh&auml;ngt oder zur Durchf&uuml;hrung
vorvertraglicher Ma&szlig;nahmen erforderlich ist, sonst auf unserem berechtigten Interesse
an effektiver Bearbeitung (Art. 6 Abs. 1 lit. f DSGVO) oder Ihrer Einwilligung
(Art. 6 Abs. 1 lit. a DSGVO).

<!-- Je einen Block pro tats&auml;chlich genutztem Tracking-/Marketing-Dienst, sonst l&ouml;schen -->
## 8. Google Tag Manager

Wir setzen den Google Tag Manager der Google Ireland Limited, Gordon House, Barrow Street,
Dublin 4, Irland ein. Der Tag Manager selbst erstellt keine Nutzerprofile, speichert keine
Cookies und nimmt keine eigenst&auml;ndigen Analysen vor. Er l&ouml;st lediglich die
&uuml;ber ihn eingebundenen Dienste aus &ndash; diese nur, wenn Sie im Cookie-Banner der
jeweiligen Kategorie zugestimmt haben.

## 9. Google Analytics

Vorbehaltlich Ihrer Einwilligung nutzen wir Google Analytics, einen Webanalysedienst der
Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die dabei erzeugten
Informationen werden an Google-Server &uuml;bertragen und dort gespeichert, ggf.
au&szlig;erhalb der EU/des EWR. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO. Weitere Infos:
https://policies.google.com/privacy?hl=de

## 10. Google Ads Remarketing

Vorbehaltlich Ihrer Einwilligung nutzen wir die Remarketing-Funktion von Google Ads (Google
Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Der Browser speichert dazu
ein Cookie mit pseudonymer ID. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.

## 11. Microsoft Clarity

Vorbehaltlich Ihrer Einwilligung setzen wir Microsoft Clarity ein (Microsoft Ireland
Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin
18, D18 P521, Irland) zur Analyse des Nutzerverhaltens mittels Cookies. Rechtsgrundlage:
Art. 6 Abs. 1 lit. a DSGVO. Weitere Infos: https://privacy.microsoft.com/de-de/privacystatement

## 12. Meta-Ads und Meta-Pixel

Vorbehaltlich Ihrer Einwilligung binden wir Technologien der Meta Platforms Ireland
Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland (u. a. Meta-Pixel) zur
Erfolgsmessung und Steuerung von Werbeanzeigen auf Facebook/Instagram ein. Rechtsgrundlage:
Art. 6 Abs. 1 lit. a DSGVO. Weitere Infos: https://www.facebook.com/privacy/policy/

## 13. Speicherdauer (Laufzeit)

Personenbezogene Daten aus {{Formular/Anfrage}} werden gel&ouml;scht, sobald sie f&uuml;r
den Zweck ihrer Erhebung nicht mehr erforderlich sind, sp&auml;testens jedoch
{{FRIST, z.B. nach Abschluss der Gesch&auml;ftsbeziehung}}, sofern keine gesetzlichen
Aufbewahrungspflichten entgegenstehen. Statistik-/Marketing-Cookies bleiben je nach
Anbieter wenige Tage bis 24 Monate gespeichert oder bis zum Widerruf der Einwilligung;
Details stehen im Cookie-Banner. Server-Log-Dateien werden max. {{TAGE, z.B. 7}} Tage
vorgehalten.

## 14. Widerruf Ihrer Einwilligung

Sie k&ouml;nnen eine erteilte Einwilligung jederzeit mit Wirkung f&uuml;r die Zukunft
widerrufen:

- &Uuml;ber "Cookie-Einstellungen" im Footer erneut aufrufen und anpassen.
- Formlos per E-Mail an {{EMAIL}}.

Die Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten Verarbeitung bleibt
unber&uuml;hrt.

## 15. Ihre Rechte als betroffene Person

Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), L&ouml;schung (Art. 17), Einschr&auml;nkung
(Art. 18), Daten&uuml;bertragbarkeit (Art. 20), Widerspruch (Art. 21). Kontakt: siehe
Abschnitt 1.

## 16. Beschwerderecht bei der Aufsichtsbeh&ouml;rde

Beschwerderecht bei einer Aufsichtsbeh&ouml;rde, insbesondere im Mitgliedstaat des
gew&ouml;hnlichen Aufenthalts, Arbeitsplatzes oder Orts des mutma&szlig;lichen
Versto&szlig;es. Zust&auml;ndig f&uuml;r {{BUNDESLAND}}: {{ZUST&Auml;NDIGE
LANDESDATENSCHUTZBEH&Ouml;RDE}}.

## 17. SSL-/TLS-Verschl&uuml;sselung

Diese Website nutzt aus Sicherheitsgr&uuml;nden eine SSL-/TLS-Verschl&uuml;sselung f&uuml;r
die &Uuml;bertragung vertraulicher Inhalte, erkennbar an "https://" und dem Schloss-Symbol
in der Browserzeile.
```

---

## 3. Cookie-Banner (HTML/CSS/JS, framework-los)

Selbstst&auml;ndiger Baustein ohne Abh&auml;ngigkeiten. Skripte, die erst nach Einwilligung
laufen d&uuml;rfen, werden nicht direkt als `<script src="...">` eingebunden, sondern als
`<script type="text/plain" data-consent-category="statistik" data-src="...">` &ndash; der
Banner schaltet sie erst nach Zustimmung scharf.

### 3.1 HTML (vor `</body>` einf&uuml;gen)

```html
<div id="cookie-banner" class="cookie-banner" hidden>
  <div class="cookie-banner-inner">
    <p>
      Wir nutzen Cookies. Notwendige Cookies sind f&uuml;r den Betrieb der Seite
      erforderlich, Statistik- und Marketing-Cookies nur mit Ihrer Einwilligung.
      Mehr dazu in unserer <a href="/datenschutz.html">Datenschutzerkl&auml;rung</a>.
    </p>
    <div class="cookie-banner-actions">
      <button type="button" id="cookie-settings-open" class="cookie-btn cookie-btn-ghost">Einstellungen</button>
      <button type="button" id="cookie-reject-all" class="cookie-btn cookie-btn-ghost">Nur notwendige</button>
      <button type="button" id="cookie-accept-all" class="cookie-btn cookie-btn-primary">Alle akzeptieren</button>
    </div>
  </div>
</div>

<div id="cookie-modal" class="cookie-modal" hidden aria-modal="true" role="dialog" aria-labelledby="cookie-modal-title">
  <div class="cookie-modal-inner">
    <h2 id="cookie-modal-title">Cookie-Einstellungen</h2>

    <label class="cookie-category">
      <input type="checkbox" checked disabled>
      <span><strong>Notwendig</strong> &ndash; immer aktiv, f&uuml;r den Betrieb der Website erforderlich.</span>
    </label>

    <label class="cookie-category">
      <input type="checkbox" id="cookie-cat-statistik">
      <span><strong>Statistik</strong> &ndash; hilft uns, die Nutzung der Website zu verstehen.</span>
    </label>

    <label class="cookie-category">
      <input type="checkbox" id="cookie-cat-marketing">
      <span><strong>Marketing</strong> &ndash; f&uuml;r personalisierte Werbung und Remarketing.</span>
    </label>

    <div class="cookie-banner-actions">
      <button type="button" id="cookie-modal-save" class="cookie-btn cookie-btn-primary">Auswahl speichern</button>
      <button type="button" id="cookie-modal-close" class="cookie-btn cookie-btn-ghost">Abbrechen</button>
    </div>
  </div>
</div>
```

Footer-Link zum erneuten &Ouml;ffnen (auf jeder Seite, z. B. neben "Impressum"):

```html
<button type="button" class="cookie-footer-link" onclick="window.cookieConsent.openSettings()">Cookie-Einstellungen</button>
```

### 3.2 CSS

```css
.cookie-banner {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  padding: 16px;
  background: #101418;
  color: #f2f5f7;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.cookie-banner-inner {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
}

.cookie-banner-inner p {
  margin: 0;
  flex: 1 1 340px;
  font-size: 0.92rem;
  line-height: 1.5;
}

.cookie-banner-inner a {
  color: inherit;
  text-decoration: underline;
}

.cookie-banner-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cookie-btn {
  min-height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.cookie-btn-primary {
  background: #f2f5f7;
  color: #101418;
  border-color: transparent;
}

.cookie-modal {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(5, 8, 13, 0.72);
}

.cookie-modal-inner {
  width: min(480px, 100%);
  padding: 28px;
  border-radius: 10px;
  background: #101418;
  color: #f2f5f7;
}

.cookie-modal-inner h2 {
  margin: 0 0 18px;
  font-size: 1.3rem;
}

.cookie-category {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 14px;
  font-size: 0.92rem;
  line-height: 1.5;
}

.cookie-category input {
  margin-top: 4px;
}

.cookie-footer-link {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
}

[hidden] {
  display: none !important;
}
```

### 3.3 JavaScript

```html
<script>
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

  // Aktiviert Skripte, die als <script type="text/plain" data-consent-category="..." data-src="...">
  // eingebunden wurden, sobald die passende Kategorie erlaubt ist.
  function applyConsent(consent) {
    document
      .querySelectorAll('script[data-consent-category]')
      .forEach(function (placeholder) {
        var category = placeholder.getAttribute('data-consent-category');
        if (category === 'notwendig' || consent[category]) {
          var script = document.createElement('script');
          Array.from(placeholder.attributes).forEach(function (attr) {
            if (attr.name === 'type') return;
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
        }
      });

    // Optional: Google Consent Mode v2 nachziehen, falls gtag() vorhanden ist.
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
    banner.hidden = false;
  }

  function closeBanner() {
    banner.hidden = true;
  }

  function openSettings() {
    if (catStatistik) catStatistik.checked = !!(readConsent() || {}).statistik;
    if (catMarketing) catMarketing.checked = !!(readConsent() || {}).marketing;
    modal.hidden = false;
  }

  function closeSettings() {
    modal.hidden = true;
  }

  document.getElementById('cookie-accept-all').addEventListener('click', function () {
    writeConsent({ notwendig: true, statistik: true, marketing: true });
    closeBanner();
    closeSettings();
  });

  document.getElementById('cookie-reject-all').addEventListener('click', function () {
    writeConsent({ notwendig: true, statistik: false, marketing: false });
    closeBanner();
    closeSettings();
  });

  document.getElementById('cookie-settings-open').addEventListener('click', openSettings);
  document.getElementById('cookie-modal-close').addEventListener('click', closeSettings);

  document.getElementById('cookie-modal-save').addEventListener('click', function () {
    writeConsent({
      notwendig: true,
      statistik: !!catStatistik.checked,
      marketing: !!catMarketing.checked,
    });
    closeBanner();
    closeSettings();
  });

  var existing = readConsent();
  if (existing) {
    applyConsent(existing);
  } else {
    openBanner();
  }

  // Global verf&uuml;gbar machen, damit z. B. der Footer-Link "Cookie-Einstellungen" funktioniert.
  window.cookieConsent = { openSettings: openSettings };
})();
</script>
```

### 3.4 So werden Tracking-Skripte eingebunden

Statt normalem `<script src="...">` immer diese Form verwenden, damit nichts vor
Einwilligung l&auml;dt:

```html
<!-- L&auml;dt sofort, ohne Einwilligung -->
<script data-consent-category="notwendig" src="/js/mein-script.js"></script>

<!-- L&auml;dt erst nach Zustimmung zu "Statistik" -->
<script type="text/plain" data-consent-category="statistik" data-src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script type="text/plain" data-consent-category="statistik">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>

<!-- L&auml;dt erst nach Zustimmung zu "Marketing" -->
<script type="text/plain" data-consent-category="marketing" data-src="https://connect.facebook.net/de_DE/fbevents.js"></script>
```

---

## 4. Checkliste pro neuem Projekt

- [ ] Platzhalter in der Datenschutzerkl&auml;rung ersetzt
- [ ] Nicht genutzte Dienst-Abschnitte gel&ouml;scht
- [ ] Neue Dienste (falls vorhanden) nach gleichem Muster erg&auml;nzt
- [ ] Tats&auml;chlich eingesetzte Tracking-Skripte auf `data-consent-category` umgestellt
- [ ] Footer-Link "Cookie-Einstellungen" auf jeder Seite vorhanden
- [ ] AVV mit Hoster / Deploy-Anbieter / Tracking-Diensten geprüft bzw. abgeschlossen
- [ ] Bei Unsicherheit: von einer:m Rechtsanwalt:in oder eRecht24 gegenpr&uuml;fen lassen
