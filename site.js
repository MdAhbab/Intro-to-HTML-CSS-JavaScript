// Small, basic enhancements shared across pages
// - Auto-highlight active nav link
// - Scroll-to-top button
// - Subtle header elevation on scroll

(function(){
  function setActiveNav() {
    try {
      var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      document.querySelectorAll('nav a[href]')
        .forEach(function(a){
          var href = a.getAttribute('href') || '';
          if (href && href.toLowerCase().endsWith(path)) {
            a.classList.add('active');
          }
        });
    } catch(e) { /* no-op */ }
  }

  function addScrollToTop() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.className = 'to-top-btn';
    btn.textContent = '↑';
    document.body.appendChild(btn);

    function toggle() {
      if (window.scrollY > 300) btn.classList.add('show');
      else btn.classList.remove('show');
    }
    window.addEventListener('scroll', toggle, {passive:true});
    toggle();

    btn.addEventListener('click', function(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }

  function elevateHeaderOnScroll(){
    var header = document.querySelector('header');
    if (!header) return;
    function toggle(){
      if (window.scrollY > 10) header.classList.add('elevated');
      else header.classList.remove('elevated');
    }
    window.addEventListener('scroll', toggle, {passive:true});
    toggle();
  }

  // Simple quiz initializer: looks for .quiz forms with data-answer
  function initQuizzes(){
    document.querySelectorAll('.quiz').forEach(function(section){
      var form = section.querySelector('form');
      if (!form) return;
      var input = form.querySelector('input[type="text"], input[type="search"], input[type="number"], textarea');
      var btn = form.querySelector('button, input[type="submit"]');
      var expectedRaw = (form.getAttribute('data-answer') || '').trim().toLowerCase();
      if (!expectedRaw || !btn) return;
      // Support multiple acceptable answers separated by |
      var expected = expectedRaw.split('|').map(function(s){ return s.trim(); }).filter(Boolean);
      var feedback = section.querySelector('.feedback');
      if (!feedback) {
        feedback = document.createElement('p');
        feedback.className = 'feedback';
        section.appendChild(feedback);
      }
      function normalize(v){ return ('' + v).trim().toLowerCase(); }
      function check(ev){
        ev.preventDefault();
        var val = input ? input.value : '';
        var norm = normalize(val);
        var ok = expected.some(function(ans){ return norm === ans; });
        if (ok) {
          feedback.textContent = 'Correct!';
          feedback.classList.remove('error');
          feedback.classList.add('success');
        } else {
          feedback.textContent = 'Not quite. Try again!';
          feedback.classList.remove('success');
          feedback.classList.add('error');
        }
      }
      btn.addEventListener('click', check);
      form.addEventListener('submit', check);
    });
  }

  // On-scroll reveal animations
  function initScrollReveal(){
    // Auto-tag common elements for reveal if not explicitly set
    try {
      var headerEl = document.querySelector('header');
      if (headerEl && !headerEl.classList.contains('reveal')) {
        headerEl.classList.add('reveal');
        if (!headerEl.dataset.anim) headerEl.setAttribute('data-anim', 'down');
        headerEl.style.setProperty('--reveal-delay', '0ms');
      }

      var secs = Array.prototype.slice.call(document.querySelectorAll('main > section'));
      secs.forEach(function(el, idx){
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
        if (!el.dataset.anim) el.setAttribute('data-anim', 'up');
        if (!el.style.getPropertyValue('--reveal-delay')) el.style.setProperty('--reveal-delay', (idx * 80) + 'ms');
      });

      var cards = Array.prototype.slice.call(document.querySelectorAll('.cards-grid .card'));
      cards.forEach(function(el, idx){
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
        if (!el.dataset.anim) el.setAttribute('data-anim', 'up');
        if (!el.style.getPropertyValue('--reveal-delay')) el.style.setProperty('--reveal-delay', (idx * 60) + 'ms');
      });
    } catch (e) { /* no-op */ }

    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    // If IntersectionObserver is missing, just reveal immediately
    if (typeof IntersectionObserver === 'undefined') {
      items.forEach(function(el){ el.classList.add('is-visible'); });
      return;
    }

    var opts = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 };
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, opts);

    items.forEach(function(el){ io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){
      setActiveNav();
      addScrollToTop();
      elevateHeaderOnScroll();
      initQuizzes();
      initScrollReveal();
    });
  } else {
    setActiveNav();
    addScrollToTop();
    elevateHeaderOnScroll();
    initQuizzes();
    initScrollReveal();
  }
})();
