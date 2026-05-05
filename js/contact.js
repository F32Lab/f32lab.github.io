/* ============================================================
   F32Lab — contact.js
   Form submission handler.

   To connect to a real email service with Formspree:
   1. Sign up free at https://formspree.io
   2. Create a form and copy your endpoint ID
   3. Replace 'YOUR_FORMSPREE_ID' below with your ID
   4. Uncomment Option A and remove the Option B line
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('success-box');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* ── Option A: Formspree (recommended) ──────────────────
    fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (r) {
      if (r.ok) showSuccess();
    }).catch(function () {
      alert('Errore. Riprova o scrivici direttamente via email.');
    });
    return;
    ──────────────────────────────────────────────────────── */

    // Option B: demo (remove when Formspree is set up)
    showSuccess();
  });

  function showSuccess() {
    form.style.display = 'none';
    if (success) success.classList.add('show');
  }
});
