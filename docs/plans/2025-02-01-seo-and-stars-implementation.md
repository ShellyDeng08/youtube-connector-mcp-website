# SEO & GitHub Star Count Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add SEO optimization (metadata, OG tags, structured data, robots.txt, sitemap) and live GitHub star count display to the landing page.

**Architecture:** Client-side fetch for GitHub stars with cached display, enhanced metadata in Next.js layout, static SEO files, JSON-LD structured data for software schema.

**Tech Stack:** Next.js 16, React 19, GitHub REST API, TypeScript, Tailwind CSS

---

### Task 1: Create StarCount Component

**Files:**
- Create: `components/StarCount.tsx`

**Step 1: Write the component**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface GitHubRepoResponse {
  stargazers_count: number;
}

export function StarCount({ owner = "ShellyDeng08", repo = "youtube-connector-mcp" }: { owner?: string; repo?: string }) {
  const [stars, setStars] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
          next: { revalidate: 3600 }, // Cache for 1 hour
        });
        if (!response.ok) throw new Error();
        const data: GitHubRepoResponse = await response.json();
        setStars(data.stargazers_count);
      } catch {
        setError(true);
      }
    };

    fetchStars();
  }, [owner, repo]);

  if (error || stars === null) return null;

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <span className="inline-flex items-center text-sm text-slate-400 ml-2 bg-slate-800/50 px-2 py-1 rounded-md">
      <Star className="h-3.5 w-3.5 mr-1 text-yellow-500 fill-yellow-500/20" />
      {formatNumber(stars)}
    </span>
  );
}
```

**Step 2: Commit**

```bash
git add components/StarCount.tsx
git commit -m "feat: add StarCount component for GitHub stars"
```

---

### Task 2: Update Hero to Display Star Count

**Files:**
- Modify: `components/Hero.tsx:51`

**Step 1: Import and use StarCount**

```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { StarCount } from "@/components/StarCount"; // Add this import

// ... rest of component unchanged until the GitHub button

          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-50 text-base sm:text-lg px-8 py-6"
            asChild
          >
            <Link href="https://github.com/ShellyDeng08/youtube-connector-mcp" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
              <StarCount /> {/* Add StarCount here */}
            </Link>
          </Button>
```

**Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: display GitHub star count in Hero"
```

---

### Task 3: Create robots.txt

**Files:**
- Create: `public/robots.txt`

**Step 1: Write robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://youtube-connector-mcp-website.vercel.app/sitemap.xml
```

**Step 2: Commit**

```bash
git add public/robots.txt
git commit -m "seo: add robots.txt"
```

---

### Task 4: Create Dynamic Sitemap

**Files:**
- Create: `app/sitemap.ts`

**Step 1: Write sitemap generator**

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://youtube-connector-mcp-website.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

**Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "seo: add dynamic sitemap generation"
```

---

### Task 5: Enhanced Layout Metadata

**Files:**
- Modify: `app/layout.tsx:17-20`

**Step 1: Update metadata object**

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://youtube-connector-mcp-website.vercel.app"),
  title: "YouTube Connector MCP - Connect AI to YouTube Data API",
  description: "Search videos, get details, fetch transcripts, comments, playlists, and more — works with Claude, Cursor, Cline, and other MCP-compatible AI tools",
  keywords: ["MCP YouTube", "YouTube Data API MCP", "Claude YouTube", "Cursor YouTube integration", "AI YouTube tools", "MCP server"],
  authors: [{ name: "xuelian.deng" }],
  openGraph: {
    title: "YouTube Connector MCP - Connect AI to YouTube Data API",
    description: "Search videos, get details, fetch transcripts, comments, playlists, and more — works with Claude, Cursor, Cline, and other MCP-compatible AI tools",
    type: "website",
    url: "https://youtube-connector-mcp-website.vercel.app",
    siteName: "YouTube Connector MCP",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Connector MCP - Connect AI to YouTube Data API",
    description: "Search videos, get details, fetch transcripts, comments, playlists, and more — works with Claude, Cursor, Cline, and other MCP-compatible AI tools",
  },
};
```

**Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "seo: enhance metadata with OG tags and Twitter cards"
```

---

### Task 6: Add JSON-LD Structured Data

**Files:**
- Modify: `app/layout.tsx:32`

**Step 1: Add JSON-LD script before closing body tag**

```tsx
      <body
        className={`${ibmPlex.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "YouTube Connector MCP",
              description: "Connect AI tools to YouTube Data API. Search videos, get details, fetch transcripts, comments, playlists, and more.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              downloadUrl: "https://github.com/ShellyDeng08/youtube-connector-mcp",
              author: {
                "@type": "Person",
                name: "xuelian.deng",
              },
            }),
          }}
        />
      </body>
```

**Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "seo: add JSON-LD structured data for software schema"
```

---

### Task 7: Create Open Graph Image Placeholder

**Files:**
- Create: `public/og-image.png`

**Step 1: Create simple OG image**

For now, create a placeholder. The file should be 1200x630px.

Using a gradient-based approach (can be created with CSS or an online tool):

**Option A: Generate with ImageMagick (if available):**
```bash
convert -size 1200x630 gradient:darkblue-gradient:#0f172a-#dc2626 \
  -font Helvetica -pointsize 48 -fill white \
  -draw "text 60,320 'YouTube Connector MCP'" \
  -font Helvetica -pointsize 24 -fill "#94a3b8" \
  -draw "text 60,380 'Connect AI to YouTube Data API'" \
  public/og-image.png
```

**Option B: Use online generator temporarily:**
Visit https://og-image.vercel.app or similar to generate, save as `public/og-image.png`

**Step 2: Commit**

```bash
git add public/og-image.png
git commit -m "seo: add Open Graph image"
```

---

### Task 8: Verify Build and Test

**Files:**
- Test: Build verification

**Step 1: Run build in worktree**

Run: `pnpm run build`
Expected: Build succeeds with no errors

**Step 2: Test locally**

Run: `pnpm run dev`
Expected: Site loads, star count appears next to GitHub button

**Step 3: Verify SEO tags**

Open browser DevTools, check:
- Title tag includes full title
- meta description present
- Open Graph tags present
- JSON-LD script present
- robots.txt accessible at `/robots.txt`
- sitemap.xml accessible at `/sitemap.xml`

**Step 4: Commit any fixes**

If any issues found and fixed:
```bash
git add -A
git commit -m "fix: address build or SEO verification issues"
```

---

### Task 9: Push Feature Branch

**Files:**
- Git operations

**Step 1: Push to remote**

```bash
git push -u origin feature/seo-and-stars
```

**Step 2: Verify deployment**

Check Vercel dashboard or run: `vercel --prod`
Expected: Site deploys successfully with new features
