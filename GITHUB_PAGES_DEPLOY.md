# Deploying to GitHub Pages

## Prerequisites
- A GitHub repository for this project
- GitHub Pages enabled in repository settings

## Setup Steps

### 1. Update `next.config.js` for static export

When deploying to GitHub Pages (outside of the Abacus platform), you'll need to create/update `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // If deploying to a subpath (e.g., github.com/user/repo),
  // uncomment and set your repo name:
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
};

export default nextConfig;
```

### 2. Remove `force-dynamic` from `app/layout.tsx`

For static export, remove or comment out:
```ts
// export const dynamic = 'force-dynamic'; // Remove this line
```

Also remove the `metadataBase` that uses `NEXTAUTH_URL` and replace with your GitHub Pages URL:
```ts
metadataBase: new URL('https://yourusername.github.io/your-repo-name'),
```

### 3. Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn
          cache-dependency-path: nextjs_space/yarn.lock

      - name: Install dependencies
        working-directory: nextjs_space
        run: yarn install --frozen-lockfile

      - name: Build
        working-directory: nextjs_space
        run: yarn build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: nextjs_space/out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. Enable GitHub Pages

1. Go to **Settings** → **Pages** in your GitHub repository
2. Under **Source**, select **GitHub Actions**
3. Push to `main` branch to trigger the deployment

### 5. (Optional) Custom Domain

To use a custom domain:
1. Add a `CNAME` file in `nextjs_space/public/` with your domain
2. Configure DNS records with your domain provider
3. Remove `basePath` and `assetPrefix` from `next.config.mjs`

## Project Structure

```
nextjs_space/
├── app/
│   ├── components/        # All React components
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── sticky-header.tsx
│   │   ├── footer.tsx
│   │   └── easter-egg-modal.tsx
│   ├── data/
│   │   └── portfolio-config.ts  # All portfolio content
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── images/            # Project images
│   ├── favicon.svg
│   └── og-image.png
└── tailwind.config.ts
```

## Customization

All content is centralized in `app/data/portfolio-config.ts`. Edit this single file to update:
- Hero section (name, title, subtitle, boot sequence)
- About text
- Experience entries
- Projects (title, description, tech, images)
- Skills categories
- Contact info & social links
- Easter egg content
