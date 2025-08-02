// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Password protection (client-side, expects env var injected at build/deploy)
const modal = document.getElementById('login-modal');
const loginBtn = document.getElementById('login-btn');
const passwordInput = document.getElementById('password-input');
const loginError = document.getElementById('login-error');

const PASSWORD = window.PASSWORD || 'changeme'; // Replace with env-injected secret

function showModal() {
  modal.classList.remove('hidden');
}
function hideModal() {
  modal.classList.add('hidden');
}
function checkPassword() {
  if (passwordInput.value === PASSWORD) {
    hideModal();
  } else {
    loginError.textContent = 'Incorrect password.';
  }
}
loginBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPassword();
});
window.addEventListener('DOMContentLoaded', showModal);

// Render About section details (bio, stats, skills)
function renderAboutDetails() {
  document.getElementById('about-bio').innerHTML = `MoonRage is a passionate digital and traditional artist. Always exploring new styles and techniques, MoonRage brings imagination to life through vibrant colors and expressive forms.`;
  document.getElementById('years-exp').textContent = `Creating art since 2015 - ${new Date().getFullYear() - 2015} years`;
  document.getElementById('total-artworks').textContent = `12 pieces in portfolio`;
  const skills = ['Concept Art', 'Portraits', 'Digital Art', 'Traditional', 'Comics', 'Character Design'];
  document.getElementById('skills').innerHTML = skills.map(skill => `<span class="skill-card">${skill}</span>`).join('');
}

// Portfolio data (placeholder)
const artworks = [
  { title: 'Dreamscape', desc: 'A surreal digital landscape.', img: 'art1.jpg', date: '2023-06-01', medium: 'Digital', tags: ['Digital Art', 'Concept'], category: 'digital' },
  { title: 'Forest Guardian', desc: 'Traditional ink and watercolor.', img: 'art2.jpg', date: '2022-11-15', medium: 'Traditional', tags: ['Traditional', 'Nature'], category: 'traditional' },
  { title: 'Self Portrait', desc: 'Expressive self-portrait.', img: 'art3.jpg', date: '2024-01-10', medium: 'Digital', tags: ['Portraits'], category: 'portraits' },
  { title: 'Sky City', desc: 'Concept art for a floating city.', img: 'art4.jpg', date: '2023-09-20', medium: 'Digital', tags: ['Concept Art'], category: 'concept' },
  { title: 'The Wanderer', desc: 'Character design.', img: 'art5.jpg', date: '2023-03-05', medium: 'Digital', tags: ['Character Design'], category: 'digital' },
  { title: 'Old Oak', desc: 'Pencil sketch of an ancient tree.', img: 'art6.jpg', date: '2021-07-18', medium: 'Traditional', tags: ['Traditional'], category: 'traditional' },
];

function renderArtworks(filter = 'all') {
  const grid = document.getElementById('artwork-grid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? artworks : artworks.filter(a => a.category === filter);
  filtered.forEach((art, idx) => {
    const card = document.createElement('div');
    card.className = 'artwork-card';
    card.innerHTML = `
      <img src="${art.img}" alt="${art.title}" />
      <div class="artwork-info">
        <div class="artwork-title">${art.title}</div>
        <div class="artwork-tags">${art.tags.map(t => `<span class='tag'>${t}</span>`).join('')}</div>
      </div>
    `;
    card.onclick = () => openArtworkModal(idx, filtered);
    grid.appendChild(card);
  });
}

let currentModalIdx = 0;
let currentModalList = artworks;
function openArtworkModal(idx, list) {
  currentModalIdx = idx;
  currentModalList = list;
  const art = list[idx];
  document.getElementById('modal-art-img').src = art.img;
  document.getElementById('modal-art-title').textContent = art.title;
  document.getElementById('modal-art-desc').textContent = art.desc;
  document.getElementById('modal-art-meta').textContent = `${art.medium} | ${art.date}`;
  document.getElementById('modal-art-tags').innerHTML = art.tags.map(t => `<span class='tag'>${t}</span>`).join('');
  document.getElementById('artwork-modal').classList.remove('hidden');
}
function closeArtworkModal() {
  document.getElementById('artwork-modal').classList.add('hidden');
}
function prevArtwork() {
  if (currentModalIdx > 0) openArtworkModal(currentModalIdx - 1, currentModalList);
}
function nextArtwork() {
  if (currentModalIdx < currentModalList.length - 1) openArtworkModal(currentModalIdx + 1, currentModalList);
}

// Filter buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderArtworks(this.dataset.filter);
    };
  });
  renderArtworks();
});

// Modal controls
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('close-artwork-modal').onclick = closeArtworkModal;
  document.getElementById('prev-art').onclick = prevArtwork;
  document.getElementById('next-art').onclick = nextArtwork;
});

// Call-to-action scroll
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cta-btn').onclick = () => {
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
  };
});

// Contact form
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contact-form').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('contact-success').classList.remove('hidden');
    this.reset();
  };
});

// About details
document.addEventListener('DOMContentLoaded', renderAboutDetails);
window.addEventListener('DOMContentLoaded', () => {
  showModal();
  renderMarkdownSections();
});
// NOTE: GitHub Pages does not support server-side secrets or environment variables.
// Any GitHub integration must use public APIs only, and tokens must NOT be exposed in client-side code.
// For advanced integration, use a serverless function or backend.
