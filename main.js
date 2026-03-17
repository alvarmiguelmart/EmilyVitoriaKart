/* ===========================
   EMILY VITÓRIA KART — EV33
   main.js · Animações & Interatividade
   =========================== */

// ── LOADER ──────────────────────────────────
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
    document.body.style.overflow = '';
    initAnimations();
  }, 2200);
});

// ── SPEED LINES ──────────────────────────────
function createSpeedLines(containerId, count, opacityBase) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const line = document.createElement('div');
    line.className = 'speed-line';
    const w = Math.random() * 28 + 8;
    line.style.cssText = `
      top: ${Math.random() * 100}%;
      width: ${w}%;
      left: -${w}%;
      animation-duration: ${Math.random() * 3 + 2}s;
      animation-delay: ${Math.random() * 6}s;
      opacity: ${Math.random() * opacityBase + 0.04};
    `;
    c.appendChild(line);
  }
}
createSpeedLines('speedLines', 22, 0.14);
createSpeedLines('speedLines2', 14, 0.08);

// ── NAVBAR ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 70);
}, { passive: true });

// ── HAMBURGER ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity  = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── COUNTER ANIMATION ────────────────────────
function animateCounter(el, target, duration = 1400) {
  const inc = target / (duration / 16);
  let cur = 0;
  const timer = setInterval(() => {
    cur += inc;
    if (cur >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = Math.floor(cur);
  }, 16);
}

// ── REVEAL ON SCROLL ─────────────────────────
function initAnimations() {
  // Hero counters
  let heroDone = false;
  const heroNums = document.querySelectorAll('.hstat-num[data-target]');
  function triggerHero() {
    if (heroDone) return; heroDone = true;
    heroNums.forEach((el, i) => setTimeout(() => animateCounter(el, +el.dataset.target, 1200), i * 180));
  }
  triggerHero();

  // Reveal observer
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), idx * 55);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // Number counters
  const numObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, +e.target.dataset.target, 1800);
        numObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.n-num[data-target]').forEach(el => numObs.observe(el));
}

// ── RACING LIGHTS (gallery) ──────────────────
function initRacingLights() {
  const lights = document.querySelectorAll('.rlight');
  const goLabel = document.getElementById('goLabel');
  if (!lights.length) return;

  let step = 0;
  function cycle() {
    if (step < lights.length) {
      lights[step].classList.add('on');
      step++;
      setTimeout(cycle, 700);
    } else {
      setTimeout(() => {
        lights.forEach(l => l.classList.remove('on'));
        if (goLabel) { goLabel.textContent = 'GO!'; goLabel.classList.add('show'); }
        setTimeout(() => {
          if (goLabel) goLabel.classList.remove('show');
          step = 0;
          setTimeout(cycle, 2800);
        }, 1200);
      }, 900);
    }
  }
  setTimeout(cycle, 1800);
}
initRacingLights();

// ── PARALLAX HERO NUMBER ─────────────────────
const heroNum = document.querySelector('.hero-number');
window.addEventListener('scroll', () => {
  if (heroNum) heroNum.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.28}px))`;
}, { passive: true });

// ── TIMELINE STAGGER ─────────────────────────
document.querySelectorAll('.tl-item.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
});

// ── SMOOTH SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' });
    }
  });
});

// ── FORM SUBMISSION ───────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const nome  = document.getElementById('f-nome').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const tipo  = document.getElementById('f-tipo').value;
  const msg   = document.getElementById('f-msg').value.trim();
  const btn   = document.getElementById('submitBtn');
  const txt   = document.getElementById('btnText');

  // Shake empty fields
  if (!nome || !email || !tipo || !msg) {
    ['f-nome','f-email','f-tipo','f-msg'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.style.borderColor = 'var(--pink)';
        el.style.animation = 'shake .4s ease';
        setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 500);
      }
    });
    return;
  }

  btn.disabled = true; txt.textContent = 'Enviando…'; btn.style.opacity = '.7';
  setTimeout(() => {
    btn.disabled = false; btn.style.opacity = '1';
    txt.textContent = 'Mensagem enviada! ✓';
    btn.style.background = 'linear-gradient(135deg,#0d5e0d,#1a8a1a)';
    showToast();
    setTimeout(() => {
      ['f-nome','f-email','f-msg'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('f-tipo').value = '';
      txt.textContent = 'Enviar mensagem';
      btn.style.background = '';
    }, 3200);
  }, 1500);
}

function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 5000);
}

// Shake keyframe
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0) }
    22%      { transform: translateX(-7px) }
    44%      { transform: translateX(7px) }
    66%      { transform: translateX(-4px) }
    88%      { transform: translateX(4px) }
  }
`;
document.head.appendChild(shakeStyle);

// ── CURSOR TRAIL (desktop only) ──────────────
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;pointer-events:none;z-index:9998;
      width:5px;height:5px;border-radius:50%;
      background:var(--pink);opacity:.55;
      left:${e.clientX - 2.5}px;top:${e.clientY - 2.5}px;
      transition:opacity .5s;
    `;
    document.body.appendChild(dot);
    requestAnimationFrame(() => dot.style.opacity = '0');
    setTimeout(() => dot.remove(), 520);
  });
}

// ── GALLERY CARD z-index ──────────────────────
document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.style.zIndex = '5');
  card.addEventListener('mouseleave', () => card.style.zIndex = '');
});

console.log(
  '%c🏎 EV33 EMILY VITÓRIA KART %c· Irati, Paraná · Brasil 🇧🇷\n%c"Ela tem gasolina na veia" — Cláudio Martins Pinto',
  'color:#FF3FA4;font-family:monospace;font-size:14px;font-weight:bold;',
  'color:#1B4FE4;font-family:monospace;font-size:12px;',
  'color:#aaa;font-family:monospace;font-size:11px;font-style:italic;'
);
