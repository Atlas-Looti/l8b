# VitePress Deployment Guide

## GitHub Pages Setup

### 1. Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Build and deployment** → **Source**, select **"GitHub Actions"**

### 2. Base Path Configuration

The base path is configured in `docs/.vitepress/config.ts`:

```typescript
base: "/l8b2/", // GitHub Pages base path (repository name)
```

**Important:** If your repository name is different, update the `base` path accordingly:
- Repository name: `l8b2` → base: `/l8b2/`
- Repository name: `l8b` → base: `/l8b/`
- Custom domain → base: `/`

### 3. GitHub Actions Workflow

The deployment workflow is configured in `.github/workflows/deploy.yml`.

**What it does:**
- Triggers on push to `main` branch
- Builds VitePress site using Bun
- Deploys to GitHub Pages automatically

**Manual trigger:**
- Go to **Actions** tab
- Select "Deploy VitePress site to Pages"
- Click **"Run workflow"**

### 4. Build Locally

Test the build locally before pushing:

```bash
bun run docs:build
```

The built site will be in `docs/.vitepress/dist/`.

### 5. Preview Locally

Preview the built site:

```bash
bun run docs:preview
```

### 6. Development Server

Run the development server:

```bash
bun run docs:dev
```

## Deployment URL

After deployment, your site will be available at:

```
https://atlas-looti.github.io/l8b2/
```

## Custom Domain

To use a custom domain:

1. Add a `CNAME` file in `docs/public/` with your domain
2. Update DNS records as per GitHub Pages instructions
3. Change `base` in `docs/.vitepress/config.ts` to `/`

## Troubleshooting

### Build Fails

- Check that all dependencies are installed: `bun install`
- Verify VitePress config syntax
- Check for dead links (they're ignored but should be fixed)

### Links Not Working

- Ensure `base` path matches repository name
- All package README links are external GitHub links
- Internal links use relative paths

### Pages Not Updating

- Check GitHub Actions workflow status
- Verify Pages source is set to "GitHub Actions"
- Wait a few minutes for deployment to complete

