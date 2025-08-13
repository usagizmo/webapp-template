# Pages (Static Site Publishing)

Professional static site publishing tool with quality assurance features. Build high-quality static websites with URL validation, accessibility checks, and SEO optimization using [Tailwind CSS](https://tailwindcss.com/), Vanilla JS, and [markuplint](https://markuplint.dev/).

[[Demo](https://webapp-template-pages.usagizmo.com/)]

## Commands

```bash
# Development
bun dev              # Start development server (port 3000)
bun build            # Build static site with Tailwind CSS

# Quality Assurance
bun test             # Validate links, images, and accessibility
bun lint             # Run HTML validation with markuplint
bun format           # Format with Prettier

# Publishing
bun run deploy       # Deploy to server (rsync)

# Optimization Utilities
bun add-size-to-img  # Add width/height to <img> tags for better performance
bun clean-image      # Remove unused images from project
```

## Features

### Quality Assurance

- **Link Validation**: Automatically checks all internal and external links
- **Image Optimization**: Validates image paths and adds performance attributes
- **HTML Validation**: Uses markuplint for semantic HTML validation
- **Accessibility Checks**: Built-in accessibility validation
- **SEO Optimization**: Meta tags, structured data validation

### Development Experience

- **Live Reload**: Instant updates during development
- **Tailwind CSS 4**: Latest utility-first CSS framework
- **Performance Monitoring**: Automatic image size attributes
- **Clean Assets**: Remove unused images automatically

## Development Workflow

1. Start development server: `bun dev`
2. Open http://localhost:3000
3. Edit HTML files in `public/` directory
4. Run quality checks: `bun test && bun lint`
5. Deploy: `bun run deploy`

## Deployment

### Option 1: Vercel Deployment

**Configuration:**

- **Framework Preset**: Other
- **Root Directory**: `apps/pages`
- **Build Command**: Automatically configured via `vercel.json`
- **Install Command**: Automatically configured via `vercel.json`
- **Output Directory**: `public`

**Setup Instructions:**

1. Create a new Vercel project from your GitHub repository
2. Set **Root Directory** to `apps/pages`
3. The `vercel.json` configuration will handle the build process automatically

### Option 2: Server Deployment (rsync)

**Command:**

```bash
bun run deploy
```

**Setup:**

1. Configure your server details in the deployment script
2. Ensure SSH access to your target server
3. Run `bun build` before deployment
4. The deploy command will sync files to your server using rsync

## Quality Assurance Details

### Link Validation

The `tests/external-links.txt` file tracks all external URLs found in HTML files. The test runner validates both internal and external links to ensure site integrity.

**Updating External Links:**

1. When URLs in your HTML files change, delete `tests/external-links.txt`
2. Run `bun test` to regenerate the file with current URLs
3. This ensures the link validation stays up-to-date with your content

### Image Optimization

- Automatically detects `<img>` tags without width/height attributes
- Adds performance-optimizing attributes for better Core Web Vitals
- Validates all image paths and references

### HTML Standards

- markuplint configuration ensures semantic HTML
- Accessibility compliance checking
- SEO best practices validation

See the [root README](../../README.md) for complete setup instructions.
