import { Card } from "@/components/ui/card";
import {
  Search,
  Play,
  FileText,
  MessageSquare,
  List,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Search",
    description:
      "Search videos, channels, and playlists with filters for relevance, date, view count, and rating",
    code: 'youtube_search("python tutorial", { maxResults: 3 })',
  },
  {
    icon: Play,
    title: "Video Details",
    description:
      "Get detailed video metadata, statistics, thumbnails, and content details",
    code: 'youtube_get_video("AJpK3YTTKZ4", ["snippet", "statistics"])',
  },
  {
    icon: FileText,
    title: "Transcript",
    description: "Retrieve actual video transcript text with timestamps and segments",
    code: 'youtube_get_transcript("AJpK3YTTKZ4", "en")',
  },
  {
    icon: MessageSquare,
    title: "Comments",
    description: "Fetch video comments with pagination support",
    code: 'youtube_get_comments("AJpK3YTTKZ4", { maxResults: 3 })',
  },
  {
    icon: List,
    title: "Playlists",
    description: "Get playlist details, video list, and list all playlists for a channel",
    code: 'youtube_get_playlist("PLf2m23nhTg1NjL3-jL3s0qZCYzO07ZQPv", { maxResults: 5 })',
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-3">
            Powerful Features
          </h2>
          <p className="text-slate-400">
            Everything you need to integrate YouTube data into your workflows
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="group bg-slate-900/50 border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:scale-[1.02] p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-1">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <code className="block bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-slate-400 overflow-x-auto">
                  {feature.code}
                </code>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
