// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Admin password (injected via GitHub secrets or fallback)
const ADMIN_PASSWORD = window.PASSWORD || (typeof GITHUB_SECRET_PASSWORD !== 'undefined' ? GITHUB_SECRET_PASSWORD : 'changeme');

let isAdmin = false;
const adminBtn = document.getElementById('admin-btn');
const adminPanel = document.getElementById('admin-panel');
const adminLoginModal = document.getElementById('admin-login-modal');
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminPasswordInput = document.getElementById('admin-password-input');
const adminLoginError = document.getElementById('admin-login-error');
const closeAdminPanelBtn = document.getElementById('close-admin-panel');

function showAdminLogin() {
  adminLoginModal.classList.remove('hidden');
  adminPasswordInput.value = '';
  adminLoginError.textContent = '';
}
function hideAdminLogin() {
  adminLoginModal.classList.add('hidden');
}
function showAdminPanel() {
  adminPanel.classList.remove('hidden');
  renderAdminPanel();
}
function hideAdminPanel() {
  adminPanel.classList.add('hidden');
}

adminBtn.onclick = function() {
  if (!isAdmin) {
    showAdminLogin();
  } else {
    isAdmin = false;
    hideAdminPanel();
    alert('Admin mode disabled.');
  }
};
adminLoginBtn.onclick = function() {
  if (adminPasswordInput.value === ADMIN_PASSWORD) {
    isAdmin = true;
    hideAdminLogin();
    showAdminPanel();
    alert('Admin mode enabled!');
  } else {
    adminLoginError.textContent = 'Incorrect password.';
  }
};
adminPasswordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') adminLoginBtn.onclick();
});
closeAdminPanelBtn.onclick = hideAdminPanel;

// Admin panel logic (edit bio, stats, skills, artworks)
let adminBio = `MoonRage is a passionate digital and traditional artist. Always exploring new styles and techniques, MoonRage brings imagination to life through vibrant colors and expressive forms.`;
let adminStartYear = 2015;
let adminTotalArtworks = 12;
let adminSkills = ['Concept Art', 'Portraits', 'Digital Art', 'Traditional', 'Comics', 'Character Design'];
let adminArtworks = [
  { title: 'Dreamscape', desc: 'A surreal digital landscape.', img: 'art1.jpg', date: '2023-06-01', medium: 'Digital', tags: ['Digital Art', 'Concept'], category: 'digital' },
  { title: 'Forest Guardian', desc: 'Traditional ink and watercolor.', img: 'art2.jpg', date: '2022-11-15', medium: 'Traditional', tags: ['Traditional', 'Nature'], category: 'traditional' },
  { title: 'Self Portrait', desc: 'Expressive self-portrait.', img: 'art3.jpg', date: '2024-01-10', medium: 'Digital', tags: ['Portraits'], category: 'portraits' },
  { title: 'Sky City', desc: 'Concept art for a floating city.', img: 'art4.jpg', date: '2023-09-20', medium: 'Digital', tags: ['Concept Art'], category: 'concept' },
  { title: 'The Wanderer', desc: 'Character design.', img: 'art5.jpg', date: '2023-03-05', medium: 'Digital', tags: ['Character Design'], category: 'digital' },
  { title: 'Old Oak', desc: 'Pencil sketch of an ancient tree.', img: 'art6.jpg', date: '2021-07-18', medium: 'Traditional', tags: ['Traditional'], category: 'traditional' },
];

function renderAdminPanel() {
  document.getElementById('admin-bio').value = adminBio;
  document.getElementById('admin-start-year').value = adminStartYear;
  document.getElementById('admin-total-artworks').value = adminTotalArtworks;
  // Skills
  const skillsList = document.getElementById('admin-skills-list');
  skillsList.innerHTML = '';
  adminSkills.forEach((skill, idx) => {
    const skillEl = document.createElement('span');
    skillEl.className = 'admin-skill';
    skillEl.textContent = skill;
    const removeBtn = document.createElement('span');
    removeBtn.className = 'admin-skill-remove';
    removeBtn.textContent = '×';
    removeBtn.onclick = () => { adminSkills.splice(idx, 1); renderAdminPanel(); };
    skillEl.appendChild(removeBtn);
    skillsList.appendChild(skillEl);
  });
  // Artworks
  const artworksList = document.getElementById('admin-artworks-list');
  artworksList.innerHTML = '';
  adminArtworks.forEach((art, idx) => {
    const item = document.createElement('div');
    item.className = 'admin-artwork-item';
    item.innerHTML = `<span>${art.title}</span>`;
    const actions = document.createElement('span');
    actions.className = 'admin-artwork-actions';
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => openArtworkForm(idx);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => { adminArtworks.splice(idx, 1); renderAdminPanel(); };
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    item.appendChild(actions);
    artworksList.appendChild(item);
  });
  document.getElementById('admin-artwork-form').classList.add('hidden');
}

document.getElementById('add-skill-btn').onclick = function() {
  const val = document.getElementById('admin-skill-input').value.trim();
  if (val) { adminSkills.push(val); document.getElementById('admin-skill-input').value = ''; renderAdminPanel(); }
};

let editingArtworkIdx = null;
function openArtworkForm(idx) {
  const form = document.getElementById('admin-artwork-form');
  form.classList.remove('hidden');
  document.getElementById('admin-artwork-form-title').textContent = idx === null ? 'Add Artwork' : 'Edit Artwork';
  if (idx !== null) {
    const art = adminArtworks[idx];
    document.getElementById('art-title').value = art.title;
    document.getElementById('art-desc').value = art.desc;
    document.getElementById('art-img').value = art.img;
    document.getElementById('art-date').value = art.date;
    document.getElementById('art-medium').value = art.medium;
    document.getElementById('art-tags').value = art.tags.join(', ');
    document.getElementById('art-category').value = art.category;
  } else {
    document.getElementById('art-title').value = '';
    document.getElementById('art-desc').value = '';
    document.getElementById('art-img').value = '';
    document.getElementById('art-date').value = '';
    document.getElementById('art-medium').value = '';
    document.getElementById('art-tags').value = '';
    document.getElementById('art-category').value = 'digital';
  }
  editingArtworkIdx = idx;
}
document.getElementById('add-artwork-btn').onclick = () => openArtworkForm(null);
document.getElementById('cancel-artwork-btn').onclick = () => document.getElementById('admin-artwork-form').classList.add('hidden');
document.getElementById('save-artwork-btn').onclick = function() {
  const art = {
    title: document.getElementById('art-title').value,
    desc: document.getElementById('art-desc').value,
    img: document.getElementById('art-img').value,
    date: document.getElementById('art-date').value,
    medium: document.getElementById('art-medium').value,
    tags: document.getElementById('art-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    category: document.getElementById('art-category').value
  };
  if (editingArtworkIdx === null) {
    adminArtworks.push(art);
  } else {
    adminArtworks[editingArtworkIdx] = art;
  }
  renderAdminPanel();
};

document.getElementById('save-admin-btn').onclick = function() {
  adminBio = document.getElementById('admin-bio').value;
  adminStartYear = parseInt(document.getElementById('admin-start-year').value, 10);
  adminTotalArtworks = parseInt(document.getElementById('admin-total-artworks').value, 10);
  // Save to localStorage or backend here if needed
  alert('Changes saved!');
  hideAdminPanel();
  renderAboutDetails();
  renderArtworks();
};

// Render About section details (bio, stats, skills)
function renderAboutDetails() {
  document.getElementById('about-bio').innerHTML = adminBio;
  document.getElementById('years-exp').textContent = `Creating art since ${adminStartYear} - ${new Date().getFullYear() - adminStartYear} years`;
  document.getElementById('total-artworks').textContent = `${adminTotalArtworks} pieces in portfolio`;
  document.getElementById('skills').innerHTML = adminSkills.map(skill => `<span class="skill-card">${skill}</span>`).join('');
}

// Portfolio data (now uses adminArtworks)
function renderArtworks(filter = 'all') {
  const grid = document.getElementById('artwork-grid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? adminArtworks : adminArtworks.filter(a => a.category === filter);
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

// ...existing code for modal controls, filter buttons, cta scroll, etc...

// Artwork modal: close on outside click or Escape
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('artwork-modal');
  modal.addEventListener('click', e => {
    if (e.target === modal) closeArtworkModal();
  });
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('hidden') && e.key === 'Escape') closeArtworkModal();
  });
});

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

// About details
document.addEventListener('DOMContentLoaded', renderAboutDetails);
// NOTE: GitHub Pages does not support server-side secrets or environment variables.
// Any GitHub integration must use public APIs only, and tokens must NOT be exposed in client-side code.
// For advanced integration, use a serverless function or backend.
