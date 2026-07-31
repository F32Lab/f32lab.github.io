/* F32Lab v3 - contact.js
   Form submission + conditional fields. */

var F32_ENDPOINT = 'https://formspree.io/f/meenkqle';

/* Held as two halves so the literal address never appears in the source.
   Shown to people as name[at]host; the mailto: is assembled at runtime. */
var F32_MAIL_USER = 'fabio.dso.2000';
var F32_MAIL_HOST = 'gmail.com';
var F32_MAIL_TEXT = F32_MAIL_USER + '[at]' + F32_MAIL_HOST;
var F32_MAIL_ADDR = F32_MAIL_USER + String.fromCharCode(64) + F32_MAIL_HOST;

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var success   = document.getElementById('success-box');
  var errorBox  = document.getElementById('form-error');
  var submitBtn = form.querySelector('.btn-submit');
  var btnLabel  = form.querySelector('.btn-label');

  var isIt = document.documentElement.lang === 'it';
  var mail = '<a href="mailto:' + F32_MAIL_ADDR + '">' + F32_MAIL_TEXT + '</a>';

  var COPY = isIt ? {
    sending: 'invio in corso...',
    send:    'invia richiesta',
    failed:  'Non sono riuscito a inviare la richiesta. Scrivimi direttamente a ' +
             mail + ' e ti rispondo io.',
    offline: 'Sembra che tu sia offline. Controlla la connessione e riprova, ' +
             'oppure scrivimi a ' + mail + '.'
  } : {
    sending: 'sending...',
    send:    'send request',
    failed:  'The request could not be sent. Email me directly at ' + mail +
             ' and I will get back to you.',
    offline: 'You appear to be offline. Check your connection and try again, ' +
             'or email me at ' + mail + '.'
  };

  /* ── Conditional fields ──
     "Other" covers requests outside DataThread/AlertThread (PC repair,
     remote assistance, one-off jobs). A reference website and a recurring
     frequency make no sense for those, so both are removed from the form
     and cleared, and a note sets the expectation that such requests are
     evaluated case by case. */

  var service   = document.getElementById('servizio');
  var siteField = document.getElementById('field-sito');
  var freqField = document.getElementById('field-frequenza');
  var otherNote = document.getElementById('other-note');
  var message   = document.getElementById('messaggio');

  var PH_DEFAULT = message ? message.getAttribute('placeholder') : '';
  var PH_OTHER   = isIt
    ? 'Es: Devo reinstallare Windows sul portatile, oppure ho bisogno di assistenza da remoto con TeamViewer...'
    : 'E.g: I need Windows reinstalled on my laptop, or remote assistance over TeamViewer...';

  function applyServiceMode() {
    if (!service) return;
    var isOther = service.value === 'other';

    [siteField, freqField].forEach(function (field) {
      if (!field) return;
      field.classList.toggle('is-hidden', isOther);
      /* Clear on hide so a stale value never reaches the inbox */
      if (isOther) {
        field.querySelectorAll('input, select').forEach(function (el) { el.value = ''; });
      }
    });

    if (otherNote) otherNote.classList.toggle('show', isOther);
    if (message) message.setAttribute('placeholder', isOther ? PH_OTHER : PH_DEFAULT);
  }

  if (service) {
    service.addEventListener('change', applyServiceMode);
    applyServiceMode(); // a value may be restored by the browser on back-nav
  }

  /* ── Submission ── */

  var sending = false;

  function setSending(state) {
    sending = state;
    if (submitBtn) submitBtn.disabled = state;
    if (btnLabel) btnLabel.textContent = state ? COPY.sending : COPY.send;
  }

  function showError(html) {
    if (!errorBox) return;
    errorBox.innerHTML = html;
    errorBox.classList.add('show');
    errorBox.scrollIntoView({ block: 'nearest' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return; // guard against double submits

    if (errorBox) errorBox.classList.remove('show');
    setSending(true);

    fetch(F32_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (r) {
      if (r.ok) {
        form.style.display = 'none';
        if (success) {
          success.classList.add('show');
          success.scrollIntoView({ block: 'nearest' });
        }
        return;
      }
      /* Formspree answered but rejected it — monthly quota reached, spam
         filter, bad endpoint. This branch previously did nothing at all,
         so the click looked like a no-op and the lead was lost silently. */
      setSending(false);
      showError(COPY.failed);
    }).catch(function () {
      setSending(false);
      showError(navigator.onLine === false ? COPY.offline : COPY.failed);
    });
  });
});
