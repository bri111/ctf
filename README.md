# CTF App

A React + TypeScript web app built with Vite, deployed to GitHub Pages.

## Tech Stack

- React + TypeScript
- Vite
- Deployed via `gh-pages`

---

## Setup & Install

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# Install dependencies
npm install
npm install --save-dev gh-pages


```

---

## Running Locally

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deploying to GitHub Pages

### First-time setup

1. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. In `vite.config.ts`, add the base path:
   ```ts
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR_REPO_NAME/',
   })
   ```

3. In `package.json`, add these scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

4. In GitHub → Settings → Pages, set the branch to `gh-pages` and folder to `/ (root)`.

### Every deploy after that

```bash
npm run deploy
```

That's it — it builds and pushes to GitHub Pages automatically.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build and deploy to GitHub Pages |