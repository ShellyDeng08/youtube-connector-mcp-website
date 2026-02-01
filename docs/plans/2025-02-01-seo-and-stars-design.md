# SEO & GitHub Star Count Design

Date: 2025-02-01

## GitHub Star Count Feature

### Architecture
- Create `StarCount` component to fetch star count from GitHub API
- Use public GitHub API endpoint (no auth needed)
- Cache with 1-hour TTL to avoid rate limits
- Display as badge next to GitHub button in Hero

### Implementation Details
- **Component**: `components/StarCount.tsx` - Client Component with `useEffect`
- **API Endpoint**: `https://api.github.com/repos/ShellyDeng08/youtube-connector-mcp`
- **Display**: Format numbers (e.g., "1.2k" instead of "1234")
- **Location**: Next to "View on GitHub" button in Hero section
- **Error Handling**: Hide badge on error without breaking UI

### Key Considerations
- GitHub API rate limit: 60/hour for unauthenticated requests
- Static export mitigates this (build-time fetch)
- Star count updates on rebuild/deploy

---

## SEO Optimization

### Enhanced Metadata (`app/layout.tsx`)
- Open Graph tags: `og:title`, `og:description`, `og:type`, `og:image`, `og:url`
- Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Canonical URL
- Keywords tag
- Favicon references

### Keywords
- MCP YouTube, YouTube Data API MCP, Claude YouTube, Cursor YouTube integration, AI YouTube tools, MCP server

### New Files
- `public/robots.txt` - Allow all crawlers
- `public/sitemap.ts` - Generate sitemap dynamically
- `public/og-image.png` - 1200x630px Open Graph image

### Structured Data
Add JSON-LD script in `layout.tsx` with SoftwareApplication schema:
- Name, description, application category
- Download URL (GitHub repo)
- Author info

---

## File Changes Summary
1. `app/layout.tsx` - Enhanced metadata + JSON-LD
2. `components/StarCount.tsx` - New component
3. `components/Hero.tsx` - Import and use StarCount
4. `public/robots.txt` - New file
5. `app/sitemap.ts` - New file (dynamic sitemap generation)
6. `public/og-image.png` - New file
