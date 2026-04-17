// =============================================
// NAZILLI ARSLAN HALI VE KOLTUK YIKAMA
// script.js — Tüm interaktif işlevler
// =============================================

// ---------- NAVBAR: scroll rengi ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---------- HAMBURGER MENÜ ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Menüdeki bir linke tıklayınca kapat
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ---------- HERO SLIDER ----------
const heroSlider = document.getElementById('heroSlider');

if (heroSlider) {
  const slides = Array.from(heroSlider.querySelectorAll('.hero-slide'));
  const dots = Array.from(heroSlider.querySelectorAll('.hero-slider-dot'));
  const prevBtn = heroSlider.querySelector('.hero-slider-prev');
  const nextBtn = heroSlider.querySelector('.hero-slider-next');
  let currentSlide = 0;
  let sliderTimer;

  function renderSlide(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  }

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    renderSlide(currentSlide);
  }

  function startSlider() {
    sliderTimer = window.setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4000);
  }

  function restartSlider() {
    window.clearInterval(sliderTimer);
    startSlider();
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    restartSlider();
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    restartSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      restartSlider();
    });
  });

  heroSlider.addEventListener('mouseenter', () => {
    window.clearInterval(sliderTimer);
  });

  heroSlider.addEventListener('mouseleave', () => {
    startSlider();
  });

  renderSlide(currentSlide);
  startSlider();
}

// ---------- AKTİF NAV LİNKİ ----------
const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function setActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.style.color = '';
    link.style.background = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--sky)';
      link.style.background = 'var(--light)';
    }
  });
}

window.addEventListener('scroll', setActiveNav);
setActiveNav();
