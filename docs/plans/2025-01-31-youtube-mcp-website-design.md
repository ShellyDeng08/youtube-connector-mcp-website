# YouTube MCP Server Website Design

**Date:** 2025-01-31
**Project:** youtube-connector-mcp-website

---

## Overview

A dark-themed, developer-focused landing page for the YouTube Connector MCP server. The site introduces users to the MCP server that connects Claude Code to the YouTube Data API v3.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Deployment:** Vercel
- **Output:** Static export (`output: 'export'`)

---

## Visual Design System

### Color Palette (Dark Theme)

| Role | Hex | Tailwind |
|------|-----|----------|
| Background | `#0F172A` | `bg-slate-950` |
| Primary | `#1E293B` | `bg-slate-800` |
| Secondary | `#334155` | `bg-slate-700` |
| Text | `#F8FAFC` | `text-slate-50` |
| CTA | `#22C55E` | `bg-green-500` |
| Accent | `#FF0000` | `bg-red-500` |

### Typography

- **Headings:** IBM Plex Sans (300-700 weight)
- **Code/Mono:** JetBrains Mono (400-700 weight)
- **Base size:** 16px body, 32px+ for headings
- **Line height:** 1.5-1.75 for readability

### Style: Vibrant & Block-based

- Bold geometric shapes with block layout
- High color contrast for visibility
- Glass morphism cards with subtle borders
- Animated patterns and gradients in background
- Smooth hover transitions (200-300ms)

---

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Navigation (Logo + Links + GitHub button)               │
├─────────────────────────────────────────────────────────────┤
│  Hero                                                  │
│  - Headline: "Connect Claude to YouTube Data API"         │
│  - Subheadline                                          │
│  - CTAs: "Get Started" (green), "View Docs" (outline)   │
├─────────────────────────────────────────────────────────────┤
│  Interactive Demo (Terminal Demo Component)                 │
│  - Scenario selector buttons                              │
│  - Play/Pause/Reset controls                             │
│  - Terminal output area                                  │
│  - Progress bar                                         │
├─────────────────────────────────────────────────────────────┤
│  Features (Bento Grid - 3x2)                            │
│  - Search videos/channels/playlists                        │
│  - Get video details & thumbnails                         │
│  - Fetch transcripts with timestamps                       │
│  - Comments with pagination                               │
│  - Playlist management                                   │
│  - Channel analytics                                     │
├─────────────────────────────────────────────────────────────┤
│  Installation                                           │
│  - Step-by-step vertical layout                           │
│  - Copy-paste code blocks                                │
│  - Copy button on each block                             │
├─────────────────────────────────────────────────────────────┤
│  Footer                                                │
│  - GitHub link                                          │
│  - PyPI link                                           │
│  - MIT License                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

```
app/
├── layout.tsx              # Root layout with dark theme
├── page.tsx                # Main landing page
└── globals.css             # Global styles with Tailwind

components/
├── ui/                    # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── code.tsx
├── Hero.tsx               # Hero section
├── Demo.tsx               # Interactive terminal demo
├── Features.tsx            # Bento grid features
├── Installation.tsx        # Installation steps
└── Footer.tsx             # Footer
```

### Component Details

#### Hero.tsx
- Badge component (shadcn/ui)
- Heading & Subheading
- CTAs (Button components)
- Animated background patterns

#### Demo.tsx
- Scenario selector (button group)
- Play/Pause/Reset controls
- Terminal output area with auto-scroll
- Progress bar
- State: `currentScenario`, `currentStep`, `isPlaying`, `isPaused`
- Data: `terminal-demo-script.json`

#### Features.tsx
- Bento grid layout (3x2)
- FeatureCard (reusable):
  - Icon (Lucide)
  - Title & Description
  - Code snippet preview

#### Installation.tsx
- InstallationStep (reusable):
  - Step number
  - Description
  - Code block with copy button

#### Footer.tsx
- GitHub link
- PyPI link
- MIT License badge

---

## Data Flow

All content is static - no API calls, no external state management.

### Demo Data Source
`docs/terminal-demo-script.json` contains all scenarios:
- `search_demo`
- `video_details_demo`
- `transcript_demo`
- `comments_demo`
- `channel_demo`
- `playlist_demo`
- `analytics_demo`

### Feature Data (hardcoded)

```tsx
const features = [
  { icon: Search, title: "Search", desc: "Search videos, channels, playlists", code: "youtube_search(...)" },
  { icon: Play, title: "Video Details", desc: "Get video metadata, stats, thumbnails", code: "youtube_get_video(...)" },
  { icon: FileText, title: "Transcripts", desc: "Extract transcripts with timestamps", code: "youtube_get_transcript(...)" },
  { icon: MessageSquare, title: "Comments", desc: "Fetch comments with pagination", code: "youtube_get_comments(...)" },
  { icon: List, title: "Playlists", desc: "Manage playlists and videos", code: "youtube_get_playlist(...)" },
  { icon: BarChart, title: "Analytics", desc: "Get channel analytics data", code: "youtube_get_analytics(...)" },
];
```

---

## Deployment

### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "next build",
  "outputDirectory": "out",
  "framework": "nextjs"
}
```

### Next.js Config

```typescript
// next.config.ts
import type { NextConfig } from "next";

const config: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default config;
```

### Build Command
```bash
npm run build
```

### Deployment Steps

1. Create GitHub repo for website
2. Connect repo to Vercel
3. Vercel auto-detects Next.js
4. Deploy with one click

### Environment Variables
None needed - pure static site.

---

## Files to Create

```
youtube-connector-mcp-website/
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── .gitignore
├── vercel.json
├── docs/
│   └── terminal-demo-script.json  (copied from youtube-mcp-server)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/  (shadcn/ui components)
│   ├── Hero.tsx
│   ├── Demo.tsx
│   ├── Features.tsx
│   ├── Installation.tsx
│   └── Footer.tsx
└── public/  (static assets)
```

---

## Accessibility Checklist

- [ ] Color contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the only indicator
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets minimum 44x44px
- [ ] Cursor-pointer on clickable elements
- [ ] Semantic HTML elements

---

## UI/UX Guidelines (from UI/UX Pro Max)

- No emojis as icons (use SVG: Lucide)
- Hover states with smooth transitions (150-300ms)
- Light mode: text contrast 4.5:1 minimum
- Glass/transparent elements visible in light mode
- Borders visible in both modes
- Responsive at 375px, 768px, 1024px, 1440px
- No horizontal scroll on mobile
