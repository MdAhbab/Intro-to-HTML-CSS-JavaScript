// Enhanced JavaScript for Intro to HTML/CSS repo
// - Robust active nav link highlighting
// - Scroll-to-top button with accessibility support
// - Subtle header elevation on scroll
// - Form validation for quick quizzes
// - Scroll reveal animations

(function(){
  "use strict";

  function setActiveNav() {
    try {
      var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      document.querySelectorAll('nav a[href]').forEach(function(a){
        var href = a.getAttribute('href') || '';
        // Handles both root index.html and pages/xyz.html correctly
        if (href && href.toLowerCase().endsWith(path)) {
          a.classList.add('active');
          a.setAttribute('aria-current', 'page');
        } else {
          a.classList.remove('active');
          a.removeAttribute('aria-current');
        }
      });
    } catch(e) { console.error('Error setting active nav', e); }
  }

  function addScrollToTop() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.className = 'to-top-btn';
    btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
    document.body.appendChild(btn);

    function toggle() {
      if (window.scrollY > 300) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }
    
    // Throttle scroll event slightly for performance
    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          toggle();
          ticking = false;
        });
        ticking = true;
      }
    }, {passive: true});
    toggle();

    btn.addEventListener('click', function(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  }

  function elevateHeaderOnScroll(){
    var nav = document.querySelector('nav');
    if (!nav) return;
    
    var ticking = false;
    function toggle(){
      if (window.scrollY > 10) nav.classList.add('elevated');
      else nav.classList.remove('elevated');
    }
    
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          toggle();
          ticking = false;
        });
        ticking = true;
      }
    }, {passive: true});
    toggle();
  }

  function initQuizzes(){
    document.querySelectorAll('.quiz').forEach(function(section){
      var form = section.querySelector('form');
      if (!form) return;
      var input = form.querySelector('input[type="text"], input[type="search"], input[type="number"], textarea');
      var btn = form.querySelector('button, input[type="submit"]');
      var expectedRaw = (form.getAttribute('data-answer') || '').trim().toLowerCase();
      
      if (!expectedRaw || !btn) return;
      
      var expected = expectedRaw.split('|').map(function(s){ return s.trim(); }).filter(Boolean);
      var feedback = section.querySelector('.feedback');
      
      if (!feedback) {
        feedback = document.createElement('p');
        feedback.className = 'feedback';
        feedback.setAttribute('aria-live', 'polite');
        section.appendChild(feedback);
      }
      
      function normalize(v){ return ('' + v).trim().toLowerCase(); }
      
      function check(ev){
        ev.preventDefault();
        var val = input ? input.value : '';
        var norm = normalize(val);
        var ok = expected.some(function(ans){ return norm === ans; });
        
        if (ok) {
          feedback.innerHTML = '✨ Correct! Great job.';
          feedback.classList.remove('error');
          feedback.classList.add('success');
          if (input) input.style.borderColor = '#10b981';
        } else {
          feedback.textContent = 'Not quite. Try again!';
          feedback.classList.remove('success');
          feedback.classList.add('error');
          if (input) input.style.borderColor = '#ef4444';
          
          // Add a subtle shake animation
          form.style.transform = 'translateX(5px)';
          setTimeout(function() { form.style.transform = 'translateX(-5px)'; }, 100);
          setTimeout(function() { form.style.transform = 'translateX(0)'; }, 200);
        }
      }
      
      btn.addEventListener('click', check);
      form.addEventListener('submit', check);
    });
  }

  function initScrollReveal(){
    try {
      var secs = Array.prototype.slice.call(document.querySelectorAll('main > section, .cards-grid .card'));
      secs.forEach(function(el){
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
      });
    } catch (e) { console.warn(e); }

    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    if (typeof IntersectionObserver === 'undefined') {
      items.forEach(function(el){ el.classList.add('is-visible'); });
      return;
    }

    var opts = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 };
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

  function init() {
    setActiveNav();
    addScrollToTop();
    elevateHeaderOnScroll();
    initQuizzes();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
