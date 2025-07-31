# MoonRage's Art Portfolio

A beautiful, responsive portfolio website showcasing digital art and creative works.

## 🎨 Features

- **Responsive Design**: Works perfectly on all devices
- **Interactive Gallery**: Filterable art gallery with smooth animations
- **Contact Form**: Professional contact form for commissions
- **Modern UI**: Clean and modern design with smooth scrolling
- **Admin Panel**: Password-protected content management system

## 🚀 Live Demo

Visit the live portfolio at: [GitHub Pages URL]

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Modern CSS with Flexbox and Grid
- **Icons**: Font Awesome
- **Authentication**: GitHub Secrets integration
- **Hosting**: GitHub Pages

## 📁 Project Structure

```
MoonRage's portfolio/
├── index.html          # Main portfolio page
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript functionality
├── admin/              # Admin panel for content management
│   ├── index.html      # Admin login/dashboard
│   ├── admin.css       # Admin panel styles
│   └── admin.js        # Admin panel functionality
├── data/               # Content data files
│   ├── portfolio.json  # Portfolio content data
│   └── images/         # Image uploads directory
└── README.md           # This file
```

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd moonrage-portfolio
   ```

2. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Select source: Deploy from a branch
   - Choose branch: main/master
   - Save settings

3. **Set up authentication** (Optional)
   - Go to repository Settings > Secrets and variables > Actions
   - Add a new secret named `ADMIN_PASSWORD`
   - Set your desired admin password

## 🔐 Admin Panel Access

The admin panel allows authenticated users to:
- Update portfolio content
- Upload new artwork
- Modify contact information
- Edit about section

Access the admin panel at: `[your-github-pages-url]/admin/`

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

For questions or support, please contact [contact information].

---

© 2025 MoonRage. All rights reserved.

A modern, responsive art portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Gallery**: Filterable artwork showcase with category organization
- **Commission Form**: Working contact form for art commissions
- **Performance Optimized**: Fast loading and smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation support

## Sections

### Hero Section
- Eye-catching introduction with animated text
- Call-to-action buttons for viewing art and commissioning work
- Artist-focused messaging

### About Section
- Personal artist introduction
- Animated statistics counters (artworks created, years creating, collectors)
- Art specialties showcase with icons

### Gallery Section
- Filterable artwork showcase (Digital Art, Portraits, Concept Art, Fantasy)
- Hover effects and overlays for artwork interaction
- Responsive grid layout for optimal viewing
- Category-based filtering system

### Services Section
- Art commission services organized by category
- Digital art offerings and specialties
- Service tags for easy browsing

### Contact Section
- Contact information for commissioning artwork
- Working contact form with validation
- Social media links for following the artist
- Commission-focused messaging

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Modern gradients**: Beautiful color schemes

## File Structure

```
MoonRage's portfolio/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Personal Information
Update the following in `index.html`:
- Artist name and title in the hero section
- About section content with your artistic journey
- Contact information
- Social media links

### Artwork Gallery
Add your own artworks by modifying the artwork cards in `index.html`:
- Update artwork titles and descriptions
- Add real artwork images (replace placeholder divs)
- Update category tags for filtering
- Add links to high-resolution versions

### Services
Modify the services section to reflect your offerings:
- Update commission types
- Adjust pricing and service descriptions
- Modify service categories

### Styling
Customize the appearance in `styles.css`:
- Change color scheme (look for gradient definitions)
- Modify fonts and typography
- Adjust spacing and layout
- Update animations and transitions

### Functionality
Enhance or modify features in `script.js`:
- Add lightbox functionality for artwork viewing
- Implement backend integration for commission form
- Add more interactive gallery features
- Include analytics tracking

## Art Portfolio Features

### Gallery Filtering
- **All**: Shows all artworks
- **Digital Art**: Digital paintings and illustrations
- **Portraits**: Character and portrait work
- **Concept Art**: Game and film concept designs
- **Fantasy**: Fantasy and mythical artwork

### Commission Services
- **Custom Portraits**: Personal and character portraits
- **Character Design**: Original character creation
- **Concept Art**: Environmental and creature design
- **Book Covers**: Cover art for publications
- **Digital Illustrations**: Various digital art commissions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## Performance Features

- Optimized CSS with minimal repaints
- Efficient JavaScript with event delegation
- Lazy loading ready for high-resolution artwork
- Compressed assets
- Clean code structure

## Optional Features

The template includes commented code for additional features:
- Dark mode toggle
- Preloader animation
- Advanced animations
- Theme switching

To enable these features, uncomment the respective function calls in `script.js`.

## Getting Started

1. Download or clone the files
2. Open `index.html` in a web browser
3. Replace placeholder content with your artwork and information
4. Add your actual artwork images
5. Deploy to your preferred hosting service

## Adding Your Artwork

To add your own artwork:

1. **Replace placeholders**: Replace the `<div class="artwork-placeholder">` elements with `<img>` tags
2. **Add categories**: Use data-category attributes that match your filter buttons
3. **Update descriptions**: Write compelling descriptions for each piece
4. **Add tags**: Include relevant tags for each artwork

Example artwork card structure:
```html
<div class="artwork-card" data-category="digital">
    <div class="artwork-image">
        <img src="path/to/your/artwork.jpg" alt="Artwork Title">
        <div class="artwork-overlay">
            <a href="path/to/full-size.jpg" class="artwork-link"><i class="fas fa-expand"></i></a>
            <a href="#" class="artwork-link"><i class="fas fa-heart"></i></a>
        </div>
    </div>
    <div class="artwork-content">
        <h3>Your Artwork Title</h3>
        <p>Description of your artwork</p>
        <div class="artwork-tags">
            <span>Digital</span>
            <span>Fantasy</span>
            <span>Character</span>
        </div>
    </div>
</div>
```

## Deployment

This is a static website that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static hosting service

## License

This template is free to use for personal and commercial projects.

## Support

For questions or issues, please refer to the code comments or create an issue in the repository.

---

**Note**: Remember to replace placeholder content with your actual artwork and information before deploying!
