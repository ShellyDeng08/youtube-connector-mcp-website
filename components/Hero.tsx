import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { StarCount } from "@/components/StarCount";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-800/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <Badge className="mb-6 bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 transition-colors">
          MCP Server for AI Coding Tools
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-50 mb-6 tracking-tight">
          Connect Your AI to
          <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
            {" "}YouTube Data API
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Search videos, get details, fetch transcripts, comments, playlists, and more —
          works with Claude, Cursor, Cline, and other MCP-compatible AI tools
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-400 text-white text-base sm:text-lg px-8 py-6 group"
            asChild
          >
            <Link href="#demo">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-50 text-base sm:text-lg px-8 py-6"
            asChild
          >
            <Link href="https://github.com/ShellyDeng08/youtube-connector-mcp" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
              <StarCount />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
