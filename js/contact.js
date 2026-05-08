/* F32Lab v3 — contact.js */
document.addEventListener('DOMContentLoaded', function () {
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('success-box');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch('https://formspree.io/f/meenkqle', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (r) {
      if (r.ok) showSuccess();
    }).catch(function () {
      alert('Errore. Riprova o scrivici via email.');
    });
  });
  function showSuccess() {
    form.style.display = 'none';
    if (success) success.classList.add('show');
  }
});
