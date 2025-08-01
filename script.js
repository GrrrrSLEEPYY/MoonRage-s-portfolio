// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // --- Like and Expand Artwork Functionality ---
    function getArtworkId(card) {
        return card.getAttribute('data-artwork-id') || card.querySelector('h3')?.textContent?.replace(/\s+/g, '-').toLowerCase();
    }

    // Like/Unlike logic with cleanup
    function updateLikeState(card) {
        const likeBtn = card.querySelector('.like-artwork');
        const likeCount = likeBtn?.querySelector('.like-count');
        const artworkId = getArtworkId(card);
        let count = parseInt(localStorage.getItem('like-count-' + artworkId)) || 0;
        let liked = localStorage.getItem('liked-' + artworkId) === 'true';
        if (likeCount) likeCount.textContent = count;
        if (likeBtn) likeBtn.classList.toggle('liked', liked);
    }

    function handleLikeClick(e, card) {
        e.preventDefault();
        const likeBtn = card.querySelector('.like-artwork');
        const likeCount = likeBtn?.querySelector('.like-count');
        const artworkId = getArtworkId(card);
        let count = parseInt(localStorage.getItem('like-count-' + artworkId)) || 0;
        let liked = localStorage.getItem('liked-' + artworkId) === 'true';
        if (!liked) {
            count++;
            localStorage.setItem('like-count-' + artworkId, count);
            localStorage.setItem('liked-' + artworkId, 'true');
        } else {
            count = Math.max(0, count - 1);
            localStorage.setItem('like-count-' + artworkId, count);
            localStorage.removeItem('liked-' + artworkId);
        }
        if (likeCount) likeCount.textContent = count;
        if (likeBtn) likeBtn.classList.toggle('liked', !liked);
    }

    // Clean up like data for deleted artworks
    function cleanupLikes() {
        const existingIds = Array.from(document.querySelectorAll('.artwork-card')).map(getArtworkId);
        for (let key in localStorage) {
            if (key.startsWith('like-count-') || key.startsWith('liked-')) {
                const id = key.replace(/^like-count-|^liked-/, '');
                if (!existingIds.includes(id)) {
                    localStorage.removeItem('like-count-' + id);
                    localStorage.removeItem('liked-' + id);
                }
            }
        }
    }

    document.querySelectorAll('.artwork-card').forEach(card => {
        const likeBtn = card.querySelector('.like-artwork');
        if (!likeBtn) return;
        updateLikeState(card);
        likeBtn.addEventListener('click', function(e) { handleLikeClick(e, card); });
    });
    cleanupLikes();

    // Expand/Overlay logic
    const modal = document.getElementById('artwork-modal');
    const modalImg = modal.querySelector('.artwork-modal-image');
    const modalTitle = modal.querySelector('.artwork-modal-title');
    const modalDesc = modal.querySelector('.artwork-modal-description');
    const modalTags = modal.querySelector('.artwork-modal-tags');
    document.querySelectorAll('.artwork-card').forEach(card => {
        const expandBtn = card.querySelector('.expand-artwork');
        expandBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Get content
            const icon = card.querySelector('.artwork-placeholder i');
            const imgClone = icon ? icon.cloneNode(true) : null;
            modalImg.innerHTML = '';
            if (imgClone) modalImg.appendChild(imgClone);
            modalTitle.textContent = card.querySelector('h3').textContent;
            modalDesc.textContent = card.querySelector('p').textContent;
            // Tags
            modalTags.innerHTML = '';
            card.querySelectorAll('.artwork-tags span').forEach(tag => {
                const tagEl = document.createElement('span');
                tagEl.textContent = tag.textContent;
                modalTags.appendChild(tagEl);
            });
            modal.classList.add('active');
        });
    });
    // Close modal
    modal.querySelector('.artwork-modal-close').addEventListener('click', function() {
        modal.classList.remove('active');
    });
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('active');
    });
    // Load portfolio data first
    loadPortfolioData();
    
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animated counter for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const current = parseInt(counter.textContent);
            const increment = target / 50;
            
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(animateCounters, 50);
            } else {
                counter.textContent = target;
            }
        });
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Trigger counter animation when stats section is visible
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.service-category, .artwork-card, .contact-item, .stats');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Gallery filtering (replacing project filtering)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const artworkCards = document.querySelectorAll('.artwork-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter artworks
            artworkCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Skills animation on scroll
    const serviceCategories = document.querySelectorAll('.service-category');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('slide-in-left');
                }, index * 200);
            }
        });
    }, observerOptions);

    serviceCategories.forEach(category => serviceObserver.observe(category));

    // Artwork cards stagger animation
    const artworkObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('slide-in-right');
                }, index * 150);
            }
        });
    }, observerOptions);

    artworkCards.forEach(card => artworkObserver.observe(card));
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid #28a745;
        }
        
        .notification-error {
            border-left: 4px solid #dc3545;
        }
        
        .notification-info {
            border-left: 4px solid #007bff;
        }
        
        .notification-content {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-message {
            color: #333;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
            margin-left: 1rem;
        }
        
        .notification-close:hover {
            color: #333;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Theme toggle functionality (optional)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: none;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .theme-toggle:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-theme {
            --bg-primary: #1a1a1a;
            --bg-secondary: #2d2d2d;
            --text-primary: #ffffff;
            --text-secondary: #cccccc;
        }
        
        body.dark-theme .navbar {
            background: rgba(26, 26, 26, 0.95);
        }
        
        body.dark-theme .nav-link {
            color: #ffffff;
        }
        
        body.dark-theme section:nth-child(even) {
            background: #2d2d2d;
        }
        
        body.dark-theme .section-title,
        body.dark-theme h3,
        body.dark-theme h4 {
            color: #ffffff;
        }
        
        body.dark-theme p,
        body.dark-theme .contact-item p {
            color: #cccccc;
        }
        
        body.dark-theme .skill-category,
        body.dark-theme .project-card,
        body.dark-theme .contact-form {
            background: #2d2d2d;
            border: 1px solid #404040;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkTheme', isDark);
    });
    
    // Load saved theme
    if (localStorage.getItem('darkTheme') === 'true') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Initialize theme toggle (uncomment to enable)
// initThemeToggle();

// Preloader (optional)
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    preloader.className = 'preloader';
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .preloader-content {
            text-align: center;
            color: white;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 1000);
    });
}

// Portfolio Data Loading
async function loadPortfolioData() {
    try {
        // Try to load from localStorage first (admin changes)
        const localData = localStorage.getItem('portfolioData');
        let portfolioData;
        
        if (localData) {
            portfolioData = JSON.parse(localData);
        } else {
            // Load from JSON file
            const response = await fetch('data/portfolio.json');
            portfolioData = await response.json();
        }
        
        // Update the page with loaded data
        updatePortfolioContent(portfolioData);
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        // Use default content if loading fails
    }
}

function updatePortfolioContent(data) {
    // Update profile information
    updateElement('.hero-title .highlight', data.profile.name);
    updateElement('.hero-subtitle', data.profile.title);
    updateElement('.hero-description', data.profile.description);
    updateElement('.nav-logo a', data.profile.name);
    updateElement('.footer p', `© 2025 ${data.profile.name}. All rights reserved.`);
    
    // Update about section
    const aboutText = document.querySelector('.about-text');
    if (aboutText && data.about.description) {
        const paragraphs = aboutText.querySelectorAll('p');
        data.about.description.forEach((text, index) => {
            if (paragraphs[index]) {
                paragraphs[index].textContent = text;
            }
        });
    }
    
    // Update stats
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (statNumbers.length >= 3) {
        statNumbers[0].setAttribute('data-count', data.about.stats.artworks);
        statNumbers[1].setAttribute('data-count', data.about.stats.experience);
        statNumbers[2].setAttribute('data-count', data.about.stats.collectors);
    }
    
    // Update contact information
    updateElement('.contact-info .contact-item:nth-child(1) p', data.profile.email);
    updateElement('.contact-info .contact-item:nth-child(2) p', data.profile.phone);
    updateElement('.contact-info .contact-item:nth-child(3) p', data.profile.location);
    
    // Update social links
    updateSocialLinks(data.profile.socialLinks);
    
    // Update gallery if artworks exist
    if (data.artworks && data.artworks.length > 0) {
        updateGallery(data.artworks);
    }
    
    // Update services
    updateServices(data.services);
}

function updateElement(selector, content, attribute = null) {
    const element = document.querySelector(selector);
    if (element && content) {
        if (attribute) {
            element.setAttribute(attribute, content);
        } else {
            element.textContent = content;
        }
    }
}

function updateSocialLinks(socialLinks) {
    if (!socialLinks) return;
    
    const socialLinksContainer = document.querySelector('.social-links');
    if (!socialLinksContainer) return;
    
    const links = socialLinksContainer.querySelectorAll('a');
    if (links.length >= 4) {
        if (socialLinks.github && socialLinks.github !== '#') links[0].href = socialLinks.github;
        if (socialLinks.linkedin && socialLinks.linkedin !== '#') links[1].href = socialLinks.linkedin;
        if (socialLinks.twitter && socialLinks.twitter !== '#') links[2].href = socialLinks.twitter;
        if (socialLinks.instagram && socialLinks.instagram !== '#') links[3].href = socialLinks.instagram;
    }
}

function updateGallery(artworks) {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    // Clear existing artworks (keep the structure for now)
    // In a full implementation, you would replace the static content
    console.log('Gallery would be updated with:', artworks.length, 'artworks');
}

function updateServices(services) {
    if (!services) return;
    
    // Update service tags
    const serviceCategories = document.querySelectorAll('.service-category');
    
    if (serviceCategories.length >= 3) {
        updateServiceCategory(serviceCategories[0], services.commissions);
        updateServiceCategory(serviceCategories[1], services.digital);
        updateServiceCategory(serviceCategories[2], services.specialties);
    }
}

function updateServiceCategory(category, services) {
    if (!category || !services) return;
    
    const serviceItems = category.querySelector('.service-items');
    if (serviceItems && services.length > 0) {
        serviceItems.innerHTML = services.map(service => 
            `<span class="service-tag">${service}</span>`
        ).join('');
    }
}

// Initialize preloader (uncomment to enable)
// initPreloader();
