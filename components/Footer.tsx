import Link from "next/link";
import { Github, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <Link
              href="https://github.com/ShellyDeng08/youtube-connector-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>ShellyDeng08/youtube-connector-mcp</span>
            </Link>
            <Link
              href="https://pypi.org/project/youtube-connector-mcp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>youtube-connector-mcp on PyPI</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-slate-800 text-slate-500">
              MIT License
            </Badge>
            <span className="text-slate-600 text-sm">
              Built with{" "}
              <span className="text-slate-400">Next.js</span> +{" "}
              <span className="text-slate-400">shadcn/ui</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
