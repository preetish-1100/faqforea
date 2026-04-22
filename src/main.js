/* ═══════════════════════════════════════════════════════════
   FAQ™ 202 — FOREO Swiss · Luxury Product Page
   Three.js · GSAP · Lenis · Scroll Animations
   ═══════════════════════════════════════════════════════════ */

import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────
   0. GLOBALS
   ────────────────────────────────────── */
const W = window;
const D = document;

/* ──────────────────────────────────────
   1. CUSTOM CURSOR
   ────────────────────────────────────── */
const dot = D.getElementById('cursor-dot');
const ring = D.getElementById('cursor-ring');
let mouseX = W.innerWidth / 2;
let mouseY = W.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

W.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
D.querySelectorAll('a, button, .review-card, .cta-button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    dot.classList.add('hovering');
    ring.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    dot.classList.remove('hovering');
    ring.classList.remove('hovering');
  });
});

/* ──────────────────────────────────────
   2. LENIS SMOOTH SCROLL
   ────────────────────────────────────── */
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 2.0,
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.ticker.lagSmoothing(0);

/* ──────────────────────────────────────
   3. PROGRESS BAR
   ────────────────────────────────────── */
const progressBar = D.getElementById('progress-bar');
ScrollTrigger.create({
  trigger: '.scroll-content',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    progressBar.style.width = (self.progress * 100) + '%';
  },
});

/* ──────────────────────────────────────
   4. SECTION DOTS
   ────────────────────────────────────── */
const sectionDots = D.querySelectorAll('.section-dot');
const sections = D.querySelectorAll('section[id^="s"]');

sections.forEach((sec, i) => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => setActiveDot(i),
    onEnterBack: () => setActiveDot(i),
  });
});

function setActiveDot(index) {
  sectionDots.forEach((d) => d.classList.remove('active'));
  if (sectionDots[index]) sectionDots[index].classList.add('active');
}



/* ──────────────────────────────────────
   8. GSAP SCROLL ANIMATIONS
   ────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

// Helper: fade-up text
function fadeUpElements(els, trigger, start, end) {
  els.forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trigger,
          start: start,
          end: end,
          toggleActions: 'play none none reverse',
        },
        delay: i * 0.15,
      }
    );
  });
}

/* ── SECTION 1: HERO ── */
// Intro animation on load
const heroTL = gsap.timeline({ delay: 0.5 });
heroTL
  .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
  .to('.hero-h1', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4')
  .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
  .to('#scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.3');

// Hero model image fades as user scrolls
gsap.to('#hero-model-img', {
  opacity: 0.3,
  scrollTrigger: {
    trigger: '#s1',
    start: 'top top',
    end: '60% top',
    scrub: 1,
  },
});

// Hide scroll indicator on scroll
gsap.to('#scroll-indicator', {
  opacity: 0,
  scrollTrigger: {
    trigger: '#s1',
    start: '15% top',
    end: '30% top',
    scrub: 1,
  },
});





/* ── SECTION 3: SCIENCE / WAVELENGTHS ── */
const s3Canvas = D.getElementById('s3-canvas');
const s3Ctx = s3Canvas.getContext('2d');

const totalFrames = 192;
const frames = [];
let s3CurrentFrame = 0;
let s3RAF = null;

// ── Load all frames ──
for (let i = 1; i <= totalFrames; i++) {
  const img = new Image();
  img.src = `images/fourkindsfacemask/ezgif-frame-${i.toString().padStart(3, '0')}.webp`;
  frames.push(img);
  if (i === 1) {
    img.onload = () => drawFrame(0);
  }
}

function drawFrame(index) {
  const img = frames[index];
  if (!img || !img.complete || !img.naturalWidth) return;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const vpAspect = vw / vh;
  let w, h;
  if (vpAspect > imgAspect) {
    w = vw; h = Math.round(vw / imgAspect);
  } else {
    h = vh; w = Math.round(vh * imgAspect);
  }
  s3Canvas.width = w;
  s3Canvas.height = h;
  s3Canvas.style.width = w + 'px';
  s3Canvas.style.height = h + 'px';
  s3Ctx.clearRect(0, 0, w, h);
  s3Ctx.drawImage(img, 0, 0, w, h);
}

ScrollTrigger.create({
  trigger: '#s3',
  start: 'top top',
  end: 'bottom bottom',
  pin: '.s3-pin',
  pinSpacing: false,
  scrub: 0.5,
  onUpdate: (self) => {
    const target = Math.min(totalFrames - 1, Math.floor(self.progress * totalFrames));
    if (target !== s3CurrentFrame) {
      s3CurrentFrame = target;
      if (s3RAF) cancelAnimationFrame(s3RAF);
      s3RAF = requestAnimationFrame(() => drawFrame(s3CurrentFrame));
    }
  },
});

// Headline fades in at the start, fades out near the end of the section
gsap.fromTo('#s3-headline',
  { opacity: 0, y: 24 },
  {
    opacity: 1, y: 0,
    scrollTrigger: {
      trigger: '#s3',
      start: 'top 85%',
      end: 'top 50%',
      scrub: 1,
    },
  }
);
gsap.to('#s3-headline', {
  opacity: 0, y: -20,
  scrollTrigger: {
    trigger: '#s3',
    start: '85% top',
    end: '95% top',
    scrub: 1,
  },
});

let s3ResizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(s3ResizeTimeout);
  s3ResizeTimeout = setTimeout(() => {
    drawFrame(s3CurrentFrame);
    ScrollTrigger.refresh();
  }, 150);
});


/* ── SECTION 4: HORIZONTAL SCROLL GALLERY ── */
const hContainer = document.querySelector('.h-container');
const panels = gsap.utils.toArray('.h-panel');

const isMobile = () => window.innerWidth < 768;
if (!isMobile()) {
  if (panels.length && hContainer) {
    gsap.to(hContainer, {
      x: () => -(hContainer.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '#s4',
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => '+=' + (hContainer.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
        pinSpacing: true,
        anticipatePin: 1,
      },
    });
  }
} else {
  // on mobile panels are vertical, no GSAP horizontal needed
}
// Stats count-up
let statsTriggered = false;
ScrollTrigger.create({
  trigger: '#s4',
  start: '25% top',
  onEnter: () => {
    if (!statsTriggered) {
      statsTriggered = true;
      animateCounter('stat-wrinkles', 0, 32, '%', 2000);
      animateCounter('stat-acne', 0, 48, '%', 2000);
    }
  },
});

function animateCounter(id, start, end, suffix, duration) {
  const el = D.getElementById(id);
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(start + (end - start) * eased);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}





/* ── SECTION 5: TRUST / DOCTOR ── */
ScrollTrigger.create({
  trigger: '#s5',
  start: 'top top',
  end: '+=150%',
  pin: '.s5-pin',
  scrub: 1.5,
  anticipatePin: 1,
  pinSpacing: true,
});

// Doctor image
gsap.fromTo('#doctor-img-wrap',
  { opacity: 0, x: -60 },
  {
    opacity: 1, x: 0,
    scrollTrigger: {
      trigger: '#s5',
      start: 'top 70%',
      end: 'top 30%',
      scrub: 1,
    },
  }
);

// Text elements
gsap.fromTo('#s5-headline',
  { opacity: 0, y: 30 },
  {
    opacity: 1, y: 0,
    scrollTrigger: {
      trigger: '#s5',
      start: 'top 60%',
      end: 'top 30%',
      scrub: 1,
    },
  }
);

gsap.fromTo('#s5-quote',
  { opacity: 0, y: 20 },
  {
    opacity: 1, y: 0,
    scrollTrigger: {
      trigger: '#s5',
      start: 'top 50%',
      end: 'top 20%',
      scrub: 1,
    },
  }
);

gsap.fromTo('#s5-attr',
  { opacity: 0 },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: '#s5',
      start: 'top 40%',
      end: 'top 15%',
      scrub: 1,
    },
  }
);


/* ── SECTION 6: REVIEWS ── */
if (!isMobile()) {
  ScrollTrigger.create({
    trigger: '#s6',
    start: 'top top',
    end: '+=100%',
    pin: '.s6-pin',
    scrub: 1.5,
    anticipatePin: 1,
    pinSpacing: true,
  });
}

// Review cards stagger
const reviewCards = gsap.utils.toArray('.review-card');
reviewCards.forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: '#s6',
        start: () => 'top ' + (80 - i * 15) + '%',
        end: () => 'top ' + (50 - i * 15) + '%',
        scrub: 1,
      },
    }
  );
});

// Video thumbs
const videoThumbs = gsap.utils.toArray('.video-thumb');
videoThumbs.forEach((thumb, i) => {
  gsap.fromTo(thumb,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: '#s6',
        start: () => 'top ' + (70 - i * 12) + '%',
        end: () => 'top ' + (45 - i * 12) + '%',
        scrub: 1,
      },
    }
  );
});



/* ── SECTION 7: CTA ── */

// CTA glow
gsap.fromTo('#cta-glow',
  { opacity: 0 },
  {
    opacity: 1,
    scrollTrigger: {
      trigger: '#s7',
      start: 'top 80%',
      end: 'top 30%',
      scrub: 1,
    },
  }
);

// CTA glow position
gsap.set('#cta-glow', { x: -300, y: 0 });

// CTA text elements — stagger in when section enters viewport
const ctaEls = D.querySelectorAll('.cta-content .fade-up');
const ctaTL = gsap.timeline({
  scrollTrigger: {
    trigger: '#s7',
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
});
ctaEls.forEach((el, i) => {
  ctaTL.fromTo(el,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
    i * 0.15
  );
});



/* ──────────────────────────────────────
   9. NAV ACTIVE STATES
   ────────────────────────────────────── */
const navLinks = D.querySelectorAll('#nav .nav-links a');
const sectionMap = {
  0: 0, // s1 -> intro
  1: 1, // s3 -> science
  2: 2, // s4 -> results
  3: 3, // s5 -> trust
  5: 4, // s7 -> shop
};

function updateNavActive(sectionIndex) {
  navLinks.forEach((l) => l.classList.remove('active'));
  const mapped = sectionMap[sectionIndex];
  if (mapped !== undefined && navLinks[mapped]) {
    navLinks[mapped].classList.add('active');
  }
}

// Hook into section changes for nav updates

sections.forEach((sec, i) => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => updateNavActive(i),
    onEnterBack: () => updateNavActive(i),
  });
});



/* ──────────────────────────────────────
   DONE — Log confirmation
   ────────────────────────────────────── */
console.log('FAQ™ 202 — All systems operational.');

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

window.addEventListener('resize', () => {
  clearTimeout(window._resizeTimer);
  window._resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
});