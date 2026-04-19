// =============================================
// みどりさくら保育園 — script.js
// =============================================

// --- Header scroll effect ---
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// --- Hamburger menu ---
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav   = document.getElementById('mobileNav');
const closeBtn    = document.getElementById('mobileNavClose');

hamburgerBtn.addEventListener('click', () => {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
});
closeBtn.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});
function closeMobileNav() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// --- Intersection Observer: fade-in on scroll ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings inside a grid
        const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
        let delay = 0;
        siblings.forEach((el, idx) => {
          if (el === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// --- AJAX Form Submission (Netlify) ---
const feedbackForm = document.getElementById('feedbackForm');
const feedbackSuccess = document.getElementById('feedbackSuccess');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(feedbackForm);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
      feedbackForm.style.display = 'none';
      feedbackSuccess.style.display = 'block';
      feedbackSuccess.classList.add('visible');
    })
    .catch((error) => {
      console.error('Form submission error:', error);
      alert('送信時にエラーが発生しました。もう一度お試しください。');
    });
  });
}

console.log('🌈 Project Loaded!');

// --- Schedule tabs ---
function switchTab(type) {
  // buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('tab-' + type).classList.add('active');
  // content
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tab-' + type + '-content').classList.add('active');
}
