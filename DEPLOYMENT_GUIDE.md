# Deployment Guide: MoonRage Portfolio on GitHub Pages

## 1. Prepare Your Repository
- Ensure all site files (`index.html`, `styles.css`, `main.js`, `marked.min.js`, `portfolio-content.md`, etc.) are in the root of your repository or a subfolder (e.g., `MoonRage-s-portfolio`).
- (Optional) Add a `.nojekyll` file to the root to allow files/folders starting with underscores.

## 2. Push to GitHub
- Create a new repository on GitHub (e.g., `MoonRage-s-portfolio`).
- Push your local files to the repository:
  ```sh
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/yourusername/MoonRage-s-portfolio.git
  git push -u origin main
  ```

## 3. Enable GitHub Pages
- Go to your repository on GitHub.
- Click **Settings** > **Pages**.
- Under **Source**, select the branch (`main`) and folder (`/root` or `/docs` if you use a subfolder).
- Click **Save**.
- Your site will be live at `https://yourusername.github.io/MoonRage-s-portfolio/` (or the subfolder path).

## 4. (Optional) Custom Domain
- In the same **Pages** settings, set a custom domain if desired.
- Update your DNS records as instructed by GitHub.

## 5. Updating Your Site
- Make changes locally, commit, and push to GitHub.
- GitHub Pages will automatically redeploy your site.

---

**Note:**
- GitHub Pages only serves static files. No server-side code or secrets.
- All API integrations must be client-side and public.
- For advanced features (e.g., private API keys), use a backend or serverless function.
