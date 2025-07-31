# GitHub Pages Setup Guide for MoonRage Portfolio

This guide will help you deploy the MoonRage portfolio website to GitHub Pages with admin functionality.

## 🚀 Quick Setup

### 1. Create a New Repository

1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it something like `moonrage-portfolio` or `artist-portfolio`
3. Make sure it's set to **Public** (required for free GitHub Pages)
4. Initialize with a README if desired

### 2. Upload Your Files

1. Download or clone this portfolio folder
2. Upload all files to your new GitHub repository
3. Make sure the file structure looks like this:

```
your-repo/
├── index.html
├── styles.css
├── script.js
├── admin/
│   ├── index.html
│   ├── admin.css
│   └── admin.js
├── data/
│   ├── portfolio.json
│   └── images/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .nojekyll
└── README.md
```

### 3. Configure GitHub Pages

1. Go to your repository Settings
2. Scroll down to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The deployment will start automatically

### 4. Set Up Admin Password (Optional but Recommended)

1. In your repository, go to Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Name: `ADMIN_PASSWORD`
4. Value: Your desired admin password (choose something secure!)
5. Click "Add secret"

### 5. Access Your Portfolio

1. After the GitHub Action completes (usually 2-5 minutes), your site will be available at:
   `https://[your-username].github.io/[repository-name]/`

2. Access the admin panel at:
   `https://[your-username].github.io/[repository-name]/admin/`

## 🔐 Admin Panel Features

The admin panel allows you to:

- ✅ Update profile information (name, title, description)
- ✅ Modify the About section content and stats
- ✅ Add/edit/delete artwork in the gallery
- ✅ Update service offerings
- ✅ Change contact information and social media links
- ✅ Upload images (files are saved locally in browser)

### Default Login Credentials

- **Password**: `admin123` (or your custom password if set up)

**Important**: Change the default password by setting up the GitHub Secret as described above.

## 🎨 Customization Tips

### Adding Your Own Images

1. Upload your images to the `data/images/` folder
2. Use the admin panel to update artwork and profile images
3. Images will be referenced in the portfolio automatically

### Changing Colors and Styling

1. Edit the `styles.css` file to customize colors, fonts, and layout
2. The main color scheme uses CSS custom properties for easy modification

### Adding New Sections

1. Modify the `index.html` file to add new sections
2. Update the navigation in both the main site and admin panel
3. Add corresponding form fields in the admin panel if needed

## 🔧 Troubleshooting

### Site Not Loading

1. Check the Actions tab in your repository for deployment errors
2. Ensure all files are uploaded correctly
3. Make sure the repository is set to Public
4. Wait a few minutes after the first deployment

### Admin Panel Not Working

1. Check browser console for JavaScript errors
2. Ensure you're using the correct password
3. Try clearing browser cache and localStorage
4. Make sure you're accessing `/admin/` with the trailing slash

### Images Not Displaying

1. Check that image files are in the correct `data/images/` folder
2. Verify file names match what's referenced in `portfolio.json`
3. Ensure image files are not too large (recommended: under 1MB each)

## 📝 Content Management

### Updating Content

1. Use the admin panel for most content changes
2. Changes are saved locally and will persist until you save
3. For permanent changes, export your data or commit directly to the repository

### Backup Your Data

1. Regularly export your portfolio data from the admin panel
2. Keep backup copies of your `portfolio.json` file
3. Consider version control for important changes

## 🆘 Support

If you encounter issues:

1. Check the browser console for error messages
2. Review the GitHub Actions log for deployment issues
3. Ensure all file permissions are correct
4. Try accessing the site in an incognito/private browser window

## 🚀 Going Live

Once everything is set up:

1. Share your GitHub Pages URL: `https://[username].github.io/[repo-name]/`
2. Consider setting up a custom domain in repository Settings > Pages
3. Update social media links and contact information
4. Start uploading your amazing artwork!

---

**Pro Tips:**
- Use the admin panel to keep your portfolio updated regularly
- Optimize images for web to improve loading speed
- Test the site on different devices and browsers
- Keep your admin password secure and change it periodically

Good luck with your beautiful new portfolio! 🎨✨
