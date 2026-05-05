/* ============================================================
   F32Lab — main.js
   Active nav link + hamburger menu + language detection
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Active nav link ── */
  var filename = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === filename || href === './' + filename) a.classList.add('active');
  });

  /* ── Active language link ── */
  var lang = window.location.pathname.indexOf('/en/') !== -1 ? 'en' : 'it';
  document.querySelectorAll('.lang-switch a, .mobile-lang a').forEach(function (a) {
    if (a.dataset.lang === lang) a.classList.add('active');
  });

  /* ── Hamburger ── */
  var btn  = document.getElementById('nav-hamburger');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  function closeMenu() {
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });

});
