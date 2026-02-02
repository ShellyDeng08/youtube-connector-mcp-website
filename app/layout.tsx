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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
      "https://youtube-connector-mcp-website.vercel.app",
  ),
  title: "YouTube Connector MCP - Connect AI to YouTube Data API",
  description:
    "Search videos, get details, fetch transcripts, comments, playlists, and more — works with Claude, Cursor, Cline, and other MCP-compatible AI tools",
  keywords: [
    "MCP YouTube",
    "YouTube Data API MCP",
    "Claude YouTube",
    "Cursor YouTube integration",
    "AI YouTube tools",
    "MCP server",
  ],
  authors: [{ name: "xuelian.deng" }],
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "R5Gz-HUT_HyGXR8Atc7dIknWJ0LOiM9yv5pwLAuDuVg",
  },
  alternates: {
    canonical:
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://youtube-connector-mcp-website.vercel.app",
  },
  openGraph: {
    title: "YouTube Connector MCP - Connect AI to YouTube Data API",
    description:
      "Search videos, get details, fetch transcripts, comments, playlists, and more — works with Claude, Cursor, Cline, and other MCP-compatible AI tools",
    type: "website",
    url:
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://youtube-connector-mcp-website.vercel.app",
    siteName: "YouTube Connector MCP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YouTube Connector MCP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Connector MCP - Connect AI to YouTube Data API",
    description:
      "Search videos, get details, fetch transcripts, comments, playlists, and more — works with Claude, Cursor, Cline, and other MCP-compatible AI tools",
    images: ["/og-image.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "YouTube Connector MCP",
              description:
                "Connect AI tools to YouTube Data API. Search videos, get details, fetch transcripts, comments, playlists, and more.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              downloadUrl:
                process.env.NEXT_PUBLIC_REPO_URL ||
                "https://github.com/ShellyDeng08/youtube-connector-mcp",
              author: {
                "@type": "Person",
                name: process.env.NEXT_PUBLIC_AUTHOR_NAME || "xuelian.deng",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
