// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.isAuthenticated = false;
        this.portfolioData = null;
        this.currentArtworkId = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthentication();
        this.loadPortfolioData();
    }

    bindEvents() {
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Save changes button
        document.getElementById('save-changes').addEventListener('click', () => {
            this.saveChanges();
        });

        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Add artwork button
        document.getElementById('add-artwork').addEventListener('click', () => {
            this.openArtworkModal();
        });

        // Artwork form
        document.getElementById('artwork-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveArtwork();
        });

        // Modal close
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeArtworkModal();
        });

        // Close modal on outside click
        document.getElementById('artwork-modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeArtworkModal();
            }
        });

        // File input handlers
        document.getElementById('profile-avatar').addEventListener('change', (e) => {
            this.handleFileUpload(e, 'avatar');
        });

        document.getElementById('artwork-image').addEventListener('change', (e) => {
            this.handleFileUpload(e, 'artwork');
        });
    }

    async handleLogin() {
        const password = document.getElementById('admin-password').value;
        
        // Try to get password from GitHub Secrets (if available)
        let adminPassword = 'admin123'; // Default fallback
        
        try {
            // Check if there's a config file from GitHub Actions
            const response = await fetch('./config.js');
            if (response.ok) {
                const configText = await response.text();
                const match = configText.match(/const ADMIN_PASSWORD = '(.+)';/);
                if (match) {
                    adminPassword = match[1];
                }
            }
        } catch (error) {
            // Use localStorage or default password
            adminPassword = localStorage.getItem('adminPassword') || 'admin123';
        }
        
        if (password === adminPassword) {
            this.isAuthenticated = true;
            localStorage.setItem('adminAuth', 'true');
            this.showDashboard();
            this.showToast('Login successful!', 'success');
        } else {
            this.showToast('Invalid password', 'error');
        }
    }

    handleLogout() {
        this.isAuthenticated = false;
        localStorage.removeItem('adminAuth');
        this.showLogin();
        this.showToast('Logged out successfully', 'success');
    }

    checkAuthentication() {
        const isAuth = localStorage.getItem('adminAuth') === 'true';
        if (isAuth) {
            this.isAuthenticated = true;
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('admin-dashboard').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'flex';
        this.loadDataIntoForms();
    }

    switchTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Load specific tab data
        if (tabName === 'gallery') {
            this.loadArtworksGrid();
        }
    }

    async loadPortfolioData() {
        try {
            // In a real implementation, this would fetch from GitHub API
            // For now, we'll load from the local JSON file
            const response = await fetch('../data/portfolio.json');
            this.portfolioData = await response.json();
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            // Use default data structure if file doesn't exist
            this.portfolioData = this.getDefaultPortfolioData();
        }
    }

    getDefaultPortfolioData() {
        return {
            profile: {
                name: "MoonRage",
                title: "Digital Artist & Visual Creator",
                description: "I bring imagination to life through digital art, illustrations, and visual storytelling.",
                avatar: "",
                email: "moonrage@example.com",
                phone: "+1 (555) 123-4567",
                location: "Your City, Country",
                socialLinks: {
                    github: "#",
                    linkedin: "#",
                    twitter: "#",
                    instagram: "#"
                }
            },
            about: {
                description: [
                    "Welcome to my artistic universe! I'm a passionate digital artist who transforms imagination into captivating visual experiences.",
                    "When I'm not painting or drawing, you can find me exploring art galleries, studying the masters, or experimenting with new digital techniques."
                ],
                stats: { artworks: 200, experience: 5, collectors: 50 },
                skills: []
            },
            artworks: [],
            services: {
                commissions: [],
                digital: [],
                specialties: []
            }
        };
    }

    loadDataIntoForms() {
        if (!this.portfolioData) return;

        // Profile data
        document.getElementById('profile-name').value = this.portfolioData.profile.name || '';
        document.getElementById('profile-title').value = this.portfolioData.profile.title || '';
        document.getElementById('profile-description').value = this.portfolioData.profile.description || '';

        // About data
        document.getElementById('about-description').value = this.portfolioData.about.description.join('\n\n') || '';
        document.getElementById('stat-artworks').value = this.portfolioData.about.stats.artworks || 0;
        document.getElementById('stat-experience').value = this.portfolioData.about.stats.experience || 0;
        document.getElementById('stat-collectors').value = this.portfolioData.about.stats.collectors || 0;

        // Services data
        document.getElementById('services-commissions').value = this.portfolioData.services.commissions.join(', ') || '';
        document.getElementById('services-digital').value = this.portfolioData.services.digital.join(', ') || '';
        document.getElementById('services-specialties').value = this.portfolioData.services.specialties.join(', ') || '';

        // Contact data
        document.getElementById('contact-email').value = this.portfolioData.profile.email || '';
        document.getElementById('contact-phone').value = this.portfolioData.profile.phone || '';
        document.getElementById('contact-location').value = this.portfolioData.profile.location || '';
        document.getElementById('social-github').value = this.portfolioData.profile.socialLinks.github || '';
        document.getElementById('social-linkedin').value = this.portfolioData.profile.socialLinks.linkedin || '';
        document.getElementById('social-twitter').value = this.portfolioData.profile.socialLinks.twitter || '';
        document.getElementById('social-instagram').value = this.portfolioData.profile.socialLinks.instagram || '';
        
        // EmailJS config fields
        document.getElementById('emailjs-userID').value = localStorage.getItem('emailjs_userID') || '';
        document.getElementById('emailjs-serviceID').value = localStorage.getItem('emailjs_serviceID') || '';
        document.getElementById('emailjs-templateID').value = localStorage.getItem('emailjs_templateID') || '';
    }

    loadArtworksGrid() {
        const container = document.getElementById('artworks-list');
        
        if (!this.portfolioData.artworks || this.portfolioData.artworks.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No artworks added yet. Click "Add Artwork" to get started!</p>';
            return;
        }

        container.innerHTML = this.portfolioData.artworks.map(artwork => `
            <div class="artwork-item">
                <div class="artwork-meta">
                    <span class="artwork-category">${artwork.category}</span>
                    ${artwork.featured ? '<span class="artwork-featured">Featured</span>' : ''}
                </div>
                <h4>${artwork.title}</h4>
                <p>${artwork.description}</p>
                <div class="artwork-actions">
                    <button class="btn btn-small btn-primary" onclick="adminPanel.editArtwork(${artwork.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-small btn-danger" onclick="adminPanel.deleteArtwork(${artwork.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    openArtworkModal(artworkId = null) {
        this.currentArtworkId = artworkId;
        const modal = document.getElementById('artwork-modal');
        const title = document.getElementById('modal-title');
        
        if (artworkId) {
            title.textContent = 'Edit Artwork';
            this.loadArtworkData(artworkId);
        } else {
            title.textContent = 'Add New Artwork';
            document.getElementById('artwork-form').reset();
            document.getElementById('artwork-id').value = '';
        }
        
        modal.classList.add('show');
    }

    closeArtworkModal() {
        document.getElementById('artwork-modal').classList.remove('show');
        this.currentArtworkId = null;
    }

    loadArtworkData(artworkId) {
        const artwork = this.portfolioData.artworks.find(art => art.id === artworkId);
        if (!artwork) return;

        document.getElementById('artwork-id').value = artwork.id;
        document.getElementById('artwork-title').value = artwork.title;
        document.getElementById('artwork-category').value = artwork.category;
        document.getElementById('artwork-description').value = artwork.description;
        document.getElementById('artwork-tags').value = artwork.tags.join(', ');
        document.getElementById('artwork-featured').checked = artwork.featured;
    }

    editArtwork(artworkId) {
        this.openArtworkModal(artworkId);
    }

    deleteArtwork(artworkId) {
        if (confirm('Are you sure you want to delete this artwork?')) {
            this.portfolioData.artworks = this.portfolioData.artworks.filter(art => art.id !== artworkId);
            this.loadArtworksGrid();
            this.showToast('Artwork deleted successfully', 'success');
        }
    }

    saveArtwork() {
        const formData = new FormData(document.getElementById('artwork-form'));
        const artworkId = document.getElementById('artwork-id').value;
        
        const artworkData = {
            id: artworkId ? parseInt(artworkId) : Date.now(),
            title: document.getElementById('artwork-title').value,
            category: document.getElementById('artwork-category').value,
            description: document.getElementById('artwork-description').value,
            tags: document.getElementById('artwork-tags').value.split(',').map(tag => tag.trim()),
            featured: document.getElementById('artwork-featured').checked,
            image: `data/images/artwork${artworkId || Date.now()}.jpg`
        };

        if (artworkId) {
            // Update existing artwork
            const index = this.portfolioData.artworks.findIndex(art => art.id === parseInt(artworkId));
            if (index !== -1) {
                this.portfolioData.artworks[index] = artworkData;
            }
        } else {
            // Add new artwork
            this.portfolioData.artworks.push(artworkData);
        }

        this.closeArtworkModal();
        this.loadArtworksGrid();
        this.showToast('Artwork saved successfully', 'success');
    }

    handleFileUpload(event, type) {
        const file = event.target.files[0];
        if (!file) return;

        // In a real implementation, you would upload to GitHub or another service
        // For now, we'll just show a success message
        this.showToast(`${type === 'avatar' ? 'Avatar' : 'Image'} will be uploaded when changes are saved`, 'success');
    }

    async saveChanges() {
        try {
            // Collect all form data
            this.collectFormData();
            
            // In a real implementation, you would save to GitHub via API
            // For now, we'll save to localStorage and show success
            localStorage.setItem('portfolioData', JSON.stringify(this.portfolioData));
            
            this.showToast('All changes saved successfully!', 'success');
            // Save EmailJS config from admin contact tab
            localStorage.setItem('emailjs_userID', document.getElementById('emailjs-userID').value.trim());
            localStorage.setItem('emailjs_serviceID', document.getElementById('emailjs-serviceID').value.trim());
            localStorage.setItem('emailjs_templateID', document.getElementById('emailjs-templateID').value.trim());
        } catch (error) {
            console.error('Error saving changes:', error);
            this.showToast('Error saving changes', 'error');
        }
    }

    collectFormData() {
        // Profile data
        this.portfolioData.profile.name = document.getElementById('profile-name').value;
        this.portfolioData.profile.title = document.getElementById('profile-title').value;
        this.portfolioData.profile.description = document.getElementById('profile-description').value;

        // About data
        this.portfolioData.about.description = document.getElementById('about-description').value.split('\n\n');
        this.portfolioData.about.stats.artworks = parseInt(document.getElementById('stat-artworks').value) || 0;
        this.portfolioData.about.stats.experience = parseInt(document.getElementById('stat-experience').value) || 0;
        this.portfolioData.about.stats.collectors = parseInt(document.getElementById('stat-collectors').value) || 0;

        // Services data
        this.portfolioData.services.commissions = document.getElementById('services-commissions').value.split(',').map(s => s.trim()).filter(s => s);
        this.portfolioData.services.digital = document.getElementById('services-digital').value.split(',').map(s => s.trim()).filter(s => s);
        this.portfolioData.services.specialties = document.getElementById('services-specialties').value.split(',').map(s => s.trim()).filter(s => s);

        // Contact data
        this.portfolioData.profile.email = document.getElementById('contact-email').value;
        this.portfolioData.profile.phone = document.getElementById('contact-phone').value;
        this.portfolioData.profile.location = document.getElementById('contact-location').value;
        this.portfolioData.profile.socialLinks.github = document.getElementById('social-github').value;
        this.portfolioData.profile.socialLinks.linkedin = document.getElementById('social-linkedin').value;
        this.portfolioData.profile.socialLinks.twitter = document.getElementById('social-twitter').value;
        this.portfolioData.profile.socialLinks.instagram = document.getElementById('social-instagram').value;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById(`${type}-message`);
        const span = toast.querySelector('span');
        span.textContent = message;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Global functions for onclick handlers
window.adminPanel = new AdminPanel();

// Global functions
window.closeArtworkModal = () => {
    adminPanel.closeArtworkModal();
};

// Handle page refresh
window.addEventListener('beforeunload', () => {
    if (adminPanel.isAuthenticated) {
        adminPanel.collectFormData();
        localStorage.setItem('portfolioData', JSON.stringify(adminPanel.portfolioData));
    }
});

// Set default admin password if not exists
if (!localStorage.getItem('adminPassword')) {
    localStorage.setItem('adminPassword', 'admin123');
    console.log('Default admin password set to: admin123');
}
