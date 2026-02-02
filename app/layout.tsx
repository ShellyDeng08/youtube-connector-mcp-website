import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${ibmPlex.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
