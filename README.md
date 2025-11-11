# Portfolio Website

A modern, professional portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with dark mode support
- 📱 Fully mobile-responsive
- ⚡ Fast performance with static generation
- 🔍 SEO optimized with sitemap and robots.txt
- 📝 MDX support for content management
- 🎯 Clean, maintainable codebase

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── projects/          # Projects pages
│   ├── companies/         # Companies pages
│   ├── articles/          # Articles pages
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── sections/         # Page sections
├── content/              # MDX content files
│   ├── projects/         # Project markdown files
│   ├── companies/        # Company markdown files
│   └── articles/         # Article markdown files
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Adding Content

### Projects

Create a new `.mdx` file in `content/projects/` with frontmatter:

```yaml
---
title: Project Name
description: Brief description
date: 2024-01-01
tags: [React, Next.js]
featured: true
status: Live
thumbnail: /images/projects/project.jpg
liveUrl: https://example.com
githubUrl: https://github.com/username/repo
---

Your project content here...
```

### Companies

Create a new `.mdx` file in `content/companies/`:

```yaml
---
name: Company Name
tagline: One-line description
founded: 2023
status: Active
role: Founder & CEO
logo: /images/companies/logo.png
website: https://company.com
---

Company content here...
```

### Articles

Create a new `.mdx` file in `content/articles/`:

```yaml
---
title: Article Title
description: SEO description
publishedAt: 2024-01-01
tags: [Development, Tutorial]
featured: true
readingTime: 5
thumbnail: /images/articles/thumbnail.jpg
---

Article content here...
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Metadata

Update `app/layout.tsx` with your personal information:
- Name
- Email
- Social links
- Domain URL

### Footer Links

Update social links in `components/layout/Footer.tsx`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted

## Performance

- Static generation for all pages
- Image optimization with next/image
- Code splitting
- Font optimization

## License

MIT

