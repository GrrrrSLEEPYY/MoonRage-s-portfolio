// Portfolio Admin Panel
class PortfolioAdmin {
    constructor() {
        this.isLoggedIn = false;
        this.portfolioData = this.getDefaultData();
        this.currentEditingArtwork = null;
        
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.checkAuthenticationStatus();
        this.loadStoredData();
    }

    setupEventListeners() {
        // Authentication
        document.getElementById('auth-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAuthentication();
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.performLogout();
        });

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchSection(e.target.dataset.section);
            });
        });

        // Save functionality
        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveAllChanges();
        });

        // Artwork management
        document.getElementById('add-artwork-btn').addEventListener('click', () => {
            this.openArtworkModal();
        });

        document.getElementById('artwork-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveArtworkData();
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeArtworkModal();
        });

        document.getElementById('cancel-artwork').addEventListener('click', () => {
            this.closeArtworkModal();
        });

        // Close modal on background click
        document.getElementById('artwork-modal').addEventListener('click', (e) => {
            if (e.target.id === 'artwork-modal') {
                this.closeArtworkModal();
            }
        });
    }

    async handleAuthentication() {
        const password = document.getElementById('password-input').value;
        
        // Password validation logic
        const validPassword = await this.validatePassword(password);
        
        if (validPassword) {
            this.isLoggedIn = true;
            this.storeAuthenticationState(true);
            this.showDashboard();
            this.displayMessage('Login successful!', 'success');
        } else {
            this.displayMessage('Invalid password. Please try again.', 'error');
        }
    }

    async validatePassword(enteredPassword) {
        // Default password
        let correctPassword = 'admin123';
        
        try {
            // Try to fetch from config file first
            const configResponse = await fetch('./config.js');
            if (configResponse.ok) {
                const configContent = await configResponse.text();
                const passwordMatch = configContent.match(/const\s+ADMIN_PASSWORD\s*=\s*['"]([^'"]+)['"]/);
                if (passwordMatch) {
                    correctPassword = passwordMatch[1];
                }
            }
        } catch (error) {
            // Fall back to localStorage if available
            const storedPassword = localStorage.getItem('adminPassword');
            if (storedPassword) {
                correctPassword = storedPassword;
            }
        }
        
        return enteredPassword === correctPassword;
    }

    checkAuthenticationStatus() {
        const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
        if (isAuthenticated) {
            this.isLoggedIn = true;
            this.showDashboard();
        } else {
            this.showAuthScreen();
        }
    }

    storeAuthenticationState(isLoggedIn) {
        localStorage.setItem('adminAuth', isLoggedIn.toString());
    }

    performLogout() {
        this.isLoggedIn = false;
        this.storeAuthenticationState(false);
        this.showAuthScreen();
        this.displayMessage('Logged out successfully', 'info');
    }

    showAuthScreen() {
        document.getElementById('auth-screen').style.display = 'flex';
        document.getElementById('dashboard').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'grid';
        this.populateFormFields();
        this.renderArtworksGrid();
    }

    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}-section`).classList.add('active');
    }

    loadStoredData() {
        const savedData = localStorage.getItem('portfolioData');
        if (savedData) {
            try {
                this.portfolioData = JSON.parse(savedData);
            } catch (error) {
                console.error('Error loading saved data:', error);
                this.portfolioData = this.getDefaultData();
            }
        }
    }

    populateFormFields() {
        // Profile fields
        document.getElementById('artist-name').value = this.portfolioData.profile.name || '';
        document.getElementById('artist-title').value = this.portfolioData.profile.title || '';
        document.getElementById('artist-bio').value = this.portfolioData.profile.description || '';

        // About fields
        const aboutDescription = Array.isArray(this.portfolioData.about.description) 
            ? this.portfolioData.about.description.join('\n\n') 
            : this.portfolioData.about.description || '';
        document.getElementById('about-text').value = aboutDescription;

        // Stats
        document.getElementById('artworks-count').value = this.portfolioData.about.stats.artworks || 0;
        document.getElementById('years-experience').value = this.portfolioData.about.stats.experience || 0;
        document.getElementById('happy-clients').value = this.portfolioData.about.stats.collectors || 0;

        // Services
        document.getElementById('commission-services').value = 
            Array.isArray(this.portfolioData.services.commissions) 
                ? this.portfolioData.services.commissions.join('\n') 
                : '';
        document.getElementById('digital-services').value = 
            Array.isArray(this.portfolioData.services.digital) 
                ? this.portfolioData.services.digital.join('\n') 
                : '';
        document.getElementById('specialty-services').value = 
            Array.isArray(this.portfolioData.services.specialties) 
                ? this.portfolioData.services.specialties.join('\n') 
                : '';

        // Contact information
        document.getElementById('contact-email').value = this.portfolioData.profile.email || '';
        document.getElementById('contact-phone').value = this.portfolioData.profile.phone || '';
        document.getElementById('contact-location').value = this.portfolioData.profile.location || '';

        // EmailJS settings
        document.getElementById('emailjs-user').value = this.portfolioData.contact?.emailjsUserID || '';
        document.getElementById('emailjs-service').value = this.portfolioData.contact?.emailjsServiceID || '';
        document.getElementById('emailjs-template').value = this.portfolioData.contact?.emailjsTemplateID || '';

        // Social links
        const socialLinks = this.portfolioData.profile.socialLinks || {};
        document.getElementById('github-link').value = socialLinks.github || '';
        document.getElementById('linkedin-link').value = socialLinks.linkedin || '';
        document.getElementById('twitter-link').value = socialLinks.twitter || '';
        document.getElementById('instagram-link').value = socialLinks.instagram || '';
    }

    saveAllChanges() {
        // Gather all form data
        this.portfolioData.profile.name = document.getElementById('artist-name').value;
        this.portfolioData.profile.title = document.getElementById('artist-title').value;
        this.portfolioData.profile.description = document.getElementById('artist-bio').value;

        // About section
        const aboutText = document.getElementById('about-text').value;
        this.portfolioData.about.description = aboutText.split('\n\n').filter(p => p.trim());

        // Stats
        this.portfolioData.about.stats = {
            artworks: parseInt(document.getElementById('artworks-count').value) || 0,
            experience: parseInt(document.getElementById('years-experience').value) || 0,
            collectors: parseInt(document.getElementById('happy-clients').value) || 0
        };

        // Services
        this.portfolioData.services = {
            commissions: this.parseServiceList(document.getElementById('commission-services').value),
            digital: this.parseServiceList(document.getElementById('digital-services').value),
            specialties: this.parseServiceList(document.getElementById('specialty-services').value)
        };

        // Contact
        this.portfolioData.profile.email = document.getElementById('contact-email').value;
        this.portfolioData.profile.phone = document.getElementById('contact-phone').value;
        this.portfolioData.profile.location = document.getElementById('contact-location').value;

        // EmailJS
        if (!this.portfolioData.contact) this.portfolioData.contact = {};
        this.portfolioData.contact.emailjsUserID = document.getElementById('emailjs-user').value;
        this.portfolioData.contact.emailjsServiceID = document.getElementById('emailjs-service').value;
        this.portfolioData.contact.emailjsTemplateID = document.getElementById('emailjs-template').value;

        // Social links
        this.portfolioData.profile.socialLinks = {
            github: document.getElementById('github-link').value,
            linkedin: document.getElementById('linkedin-link').value,
            twitter: document.getElementById('twitter-link').value,
            instagram: document.getElementById('instagram-link').value
        };

        // Save to localStorage
        localStorage.setItem('portfolioData', JSON.stringify(this.portfolioData));
        this.displayMessage('All changes saved successfully!', 'success');
    }

    parseServiceList(serviceText) {
        return serviceText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
    }

    // Artwork Management
    renderArtworksGrid() {
        const container = document.getElementById('artworks-container');
        const artworks = this.portfolioData.artworks || [];

        if (artworks.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">No artworks added yet. Click "Add New Artwork" to get started.</p>';
            return;
        }

        container.innerHTML = artworks.map(artwork => `
            <div class="artwork-item" data-artwork-id="${artwork.id}">
                <div class="artwork-image">
                    ${artwork.image ? 
                        `<img src="${artwork.image}" alt="${artwork.title}" style="width: 100%; height: 100%; object-fit: cover;">` :
                        '<i class="fas fa-image"></i>'
                    }
                </div>
                <div class="artwork-content">
                    <h4>${artwork.title}</h4>
                    <p>${artwork.description}</p>
                    <div class="artwork-tags">
                        ${(artwork.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="artwork-actions">
                        <button class="btn btn-small btn-primary" onclick="admin.editArtwork(${artwork.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-small btn-danger" onclick="admin.deleteArtwork(${artwork.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    openArtworkModal(artworkId = null) {
        this.currentEditingArtwork = artworkId;
        const modal = document.getElementById('artwork-modal');
        
        if (artworkId) {
            // Edit mode
            const artwork = this.portfolioData.artworks.find(a => a.id === artworkId);
            if (artwork) {
                document.getElementById('modal-title').textContent = 'Edit Artwork';
                document.getElementById('artwork-id').value = artwork.id;
                document.getElementById('artwork-title').value = artwork.title;
                document.getElementById('artwork-category').value = artwork.category;
                document.getElementById('artwork-description').value = artwork.description;
                document.getElementById('artwork-tags').value = (artwork.tags || []).join(', ');
                document.getElementById('artwork-featured').checked = artwork.featured || false;
            }
        } else {
            // Add mode
            document.getElementById('modal-title').textContent = 'Add New Artwork';
            document.getElementById('artwork-form').reset();
            document.getElementById('artwork-id').value = '';
        }
        
        modal.classList.add('show');
    }

    closeArtworkModal() {
        document.getElementById('artwork-modal').classList.remove('show');
        this.currentEditingArtwork = null;
    }

    saveArtworkData() {
        const formData = new FormData(document.getElementById('artwork-form'));
        const artworkData = {
            title: formData.get('artwork-title') || document.getElementById('artwork-title').value,
            category: formData.get('artwork-category') || document.getElementById('artwork-category').value,
            description: formData.get('artwork-description') || document.getElementById('artwork-description').value,
            tags: (document.getElementById('artwork-tags').value || '').split(',').map(tag => tag.trim()).filter(tag => tag),
            featured: document.getElementById('artwork-featured').checked
        };

        // Handle image upload simulation
        const imageFile = document.getElementById('artwork-image').files[0];
        if (imageFile) {
            artworkData.image = `data/images/${imageFile.name}`;
        }

        if (this.currentEditingArtwork) {
            // Update existing artwork
            const index = this.portfolioData.artworks.findIndex(a => a.id === this.currentEditingArtwork);
            if (index !== -1) {
                this.portfolioData.artworks[index] = { ...this.portfolioData.artworks[index], ...artworkData };
                this.displayMessage('Artwork updated successfully!', 'success');
            }
        } else {
            // Add new artwork
            const newId = Math.max(0, ...this.portfolioData.artworks.map(a => a.id)) + 1;
            artworkData.id = newId;
            this.portfolioData.artworks.push(artworkData);
            this.displayMessage('Artwork added successfully!', 'success');
        }

        this.renderArtworksGrid();
        this.closeArtworkModal();
    }

    editArtwork(artworkId) {
        this.openArtworkModal(artworkId);
    }

    deleteArtwork(artworkId) {
        if (confirm('Are you sure you want to delete this artwork?')) {
            this.portfolioData.artworks = this.portfolioData.artworks.filter(a => a.id !== artworkId);
            this.renderArtworksGrid();
            this.displayMessage('Artwork deleted successfully!', 'info');
        }
    }

    displayMessage(text, type = 'info') {
        const container = document.getElementById('message-container');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.innerHTML = `
            <strong>${type === 'error' ? 'Error:' : type === 'success' ? 'Success:' : 'Info:'}</strong> ${text}
        `;

        container.appendChild(messageElement);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 5000);
    }

    getDefaultData() {
        return {
            profile: {
                name: "MoonRage",
                title: "Digital Artist & Visual Creator",
                description: "I bring imagination to life through digital art, illustrations, and visual storytelling. Passionate about creating captivating artwork that evokes emotion and tells unique stories.",
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
                    "Welcome to my artistic universe! I'm a passionate digital artist who transforms imagination into captivating visual experiences. With a deep love for color, composition, and storytelling, I create artwork that resonates with the soul.",
                    "When I'm not painting or drawing, you can find me exploring art galleries, studying the masters, or experimenting with new digital techniques. I believe art has the power to connect people and express what words cannot convey."
                ],
                stats: {
                    artworks: 200,
                    experience: 5,
                    collectors: 50
                }
            },
            artworks: [],
            services: {
                commissions: ["Custom Portraits", "Character Design", "Illustrations", "Concept Art", "Book Covers", "Album Art"],
                digital: ["Digital Paintings", "Photo Manipulation", "Digital Sketches", "Fan Art", "Logo Design", "Poster Design"],
                specialties: ["Fantasy Art", "Sci-Fi Concepts", "Character Sheets", "Storyboards", "Game Art", "Animation"]
            },
            contact: {
                emailjsUserID: "",
                emailjsServiceID: "",
                emailjsTemplateID: ""
            }
        };
    }
}

// Initialize admin panel
const admin = new PortfolioAdmin();
