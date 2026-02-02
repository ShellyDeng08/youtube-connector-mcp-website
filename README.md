# YouTube Connector MCP - Website

**Landing page for the [YouTube Connector MCP](https://github.com/ShellyDeng08/youtube-connector-mcp) server.**

`youtube-connector-mcp-website` showcases the MCP server for **YouTube Data API v3**, allowing AI agents like **Claude, Cursor, Cline, Windsurf, Continue.dev, Grapes AI** to interact with YouTube programmatically.

🌐 **Live Demo**: https://youtube-connector-mcp-website.vercel.app/  
📦 **Server Repo**: https://github.com/ShellyDeng08/youtube-connector-mcp

---

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

# Preview production build locally
npm run start
```

## Deployment

This site is configured for static export and deployment to [Vercel](https://vercel.com).

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (one-time setup)

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy your site**

   ```bash
   # From this directory
   vercel --prod

   # Or specify the project if needed
   vercel --prod --yes
   ```

Vercel will auto-detect Next.js and use the `vercel.json` configuration in the root directory.

### Via Vercel Dashboard

1. Push code to GitHub
2. Open [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import from GitHub: `ShellyDeng08/youtube-connector-mcp-website`
5. Vercel auto-detects Next.js and `vercel.json`
6. Click "Deploy"

### Manual Deploy

```bash
# Build the site
npm run build

# Upload the `out/` folder to any static hosting provider
```

## Demo Data Updates

The demo scenarios in `docs/terminal-demo-script.json` are populated with **real MCP tool test results**:

- **Search**: Real YouTube search results for "MCP"
- **Video Details**: Actual data from Claude Code video (`AJpK3YTTKZ4`)
- **Transcript**: Real transcript segments from Claude Code video
- **Comments**: Real comment data from Claude Code video
- **Channel**: Anthropic's real channel stats (366K subscribers, 12.7M views)
- **Playlist**: AI Fluency course playlist with actual video list

To update demo data:

1. Run the actual MCP tools to get fresh results
2. Update the `terminal-demo-script.json` file with new data
3. The demo component uses this JSON for playback

## Project Structure

```
app/                 # Next.js app directory
├── layout.tsx      # Root layout with fonts and theme
├── page.tsx         # Main landing page
└── globals.css       # Global styles

components/
├── ui/              # shadcn/ui components
├── Hero.tsx         # Hero section with gradient background
├── Demo.tsx          # Interactive terminal demo with playback controls
├── Features.tsx      # Bento grid of 6 features
├── Installation.tsx  # Multi-tab installation guide
└── Footer.tsx        # Site footer

docs/
├── plans/            # Design documents
└── terminal-demo-script.json  # Demo scenarios data

lib/
└── utils.ts          # Utility functions (cn helper)
```

## Available MCP Tools (7)

The website documents these available tools from the MCP server:

| Tool                     | Description                          | Example                                              |
| ------------------------ | ------------------------------------ | ---------------------------------------------------- |
| `youtube_search`         | Search videos, channels, playlists   | `youtube_search("query", { maxResults: 3 })`         |
| `youtube_get_video`      | Get video metadata, statistics       | `youtube_get_video("ID", ["snippet", "statistics"])` |
| `youtube_get_channel`    | Get channel information              | `youtube_get_channel(channel_id)`                    |
| `youtube_get_transcript` | Get video transcript with timestamps | `youtube_get_transcript("ID", "en")`                 |
| `youtube_get_comments`   | Fetch video comments                 | `youtube_get_comments("ID", { maxResults: 3 })`      |
| `youtube_get_playlist`   | Get playlist details and videos      | `youtube_get_playlist("ID", { maxResults: 5 })`      |
| `youtube_list_playlists` | List all playlists for a channel     | `youtube_list_playlists(channel_id)`                 |

> **Note**: Analytics API is **not available** - it requires OAuth authentication which isn't supported by the simple API key approach used by this MCP server.

## SEO Keywords

YouTube MCP Website, YouTube MCP Server, MCP Connector, Claude MCP YouTube, Cursor MCP YouTube, AI YouTube API, Model Context Protocol YouTube

## License

MIT License - See the parent project [license](https://github.com/ShellyDeng08/youtube-connector-mcp/blob/main/LICENSE).
