// Theme toggle (persist)
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) html.setAttribute('data-theme', savedTheme);
themeToggle?.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('navList');
menuBtn?.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Filters (Photos)
const filterButtons = document.querySelectorAll('.filter-btn');
const photoCards = document.querySelectorAll('#photoGrid .card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    photoCards.forEach(card => {
      card.style.display = (f === 'all' || card.dataset.category === f) ? '' : 'none';
    });
  });
});

// Lightbox (Photos)
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbCap = document.getElementById('lightboxCaption');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('#photoGrid img').forEach(img => {
  img.addEventListener('click', () => {
    const full = img.dataset.full || img.src;
    const cap = img.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
    lbImg.src = full;
    lbImg.alt = img.alt || '';
    lbCap.textContent = cap;
    lightbox.showModal();
  });
});

closeBtn?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (e) => {
  // close if clicked outside the image
  const rect = lbImg.getBoundingClientRect();
  if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
    lightbox.close();
  }
});

// Contact form UX (client-side only)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  if (form.action.includes('formspree.io/f/your-id')) {
    e.preventDefault();
    statusEl.textContent = 'Add your Formspree endpoint to enable submissions.';
  } else {
    statusEl.textContent = 'Sending…';
  }
});
