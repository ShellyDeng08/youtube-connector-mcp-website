# YouTube Connector MCP - Website

Landing page for the [YouTube Connector MCP](https://github.com/ShellyDeng08/youtube-connector-mcp) server.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Pre-built accessible components
- **Lucide Icons** - Beautiful icon set

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## Deployment

This site is configured for static export and deployment to [Vercel](https://vercel.com).

### Deploy to Vercel

1. Push this repository to GitHub
2. Connect the repo to Vercel
3. Vercel auto-detects Next.js and deploys

### Manual Deploy

```bash
npm run build
# Upload the `out/` folder to your hosting provider
```

## Project Structure

```
app/                 # Next.js app directory
├── layout.tsx     # Root layout with fonts and theme
├── page.tsx       # Main landing page
└── globals.css     # Global styles

components/
├── ui/            # shadcn/ui components
├── Hero.tsx        # Hero section
├── Demo.tsx         # Interactive terminal demo
├── Features.tsx     # Bento grid features
├── Installation.tsx  # Installation steps
└── Footer.tsx       # Site footer
```

## License

MIT License - See the parent project [license](https://github.com/ShellyDeng08/youtube-connector-mcp/blob/main/LICENSE).
