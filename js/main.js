/* F32Lab v3 - main.js */
document.addEventListener('DOMContentLoaded', function () {
  var filename = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === filename) a.classList.add('active');
  });
  var lang = window.location.pathname.indexOf('/en/') !== -1 ? 'en' : 'it';
  document.querySelectorAll('.lang-switch a, .mobile-lang a').forEach(function (a) {
    if (a.dataset.lang === lang) a.classList.add('active');
  });
  var btn = document.getElementById('nav-hamburger');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  function close() {
    menu.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var o = menu.classList.toggle('open');
    btn.classList.toggle('open', o);
    btn.setAttribute('aria-expanded', String(o));
    document.body.style.overflow = o ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', close); });
  document.addEventListener('click', function(e){
    if (!btn.contains(e.target) && !menu.contains(e.target)) close();
  });
});
