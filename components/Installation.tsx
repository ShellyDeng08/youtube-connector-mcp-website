"use client";

import { useState } from "react";
import { Copy, Check, Terminal, Cpu, FileCode, Layout } from "lucide-react";

const tools = [
  { id: "claude", name: "Claude", icon: Cpu, color: "text-red-400" },
  { id: "cursor", name: "Cursor", icon: Layout, color: "text-blue-400" },
  { id: "cline", name: "Cline", icon: FileCode, color: "text-green-400" },
  { id: "other", name: "Other", icon: Terminal, color: "text-purple-400" },
];

const stepsByTool: Record<string, Array<{ step: number; title: string; code: string }>> = {
  claude: [
    {
      step: 1,
      title: "Install pipx (if needed)",
      code: `brew install pipx`,
    },
    {
      step: 2,
      title: "Install YouTube MCP",
      code: `pipx install youtube-connector-mcp`,
    },
    {
      step: 3,
      title: "Set API Key",
      code: `export YOUTUBE_API_KEY="your_api_key_here"`,
    },
    {
      step: 4,
      title: "Add to Claude Code",
      code: `claude mcp add youtube-connector-mcp youtube-connector-mcp \\
  -s user \\
  -e YOUTUBE_API_KEY="\${YOUTUBE_API_KEY}"`,
    },
  ],
  cursor: [
    {
      step: 1,
      title: "Install pipx (if needed)",
      code: `brew install pipx`,
    },
    {
      step: 2,
      title: "Install YouTube MCP",
      code: `pipx install youtube-connector-mcp`,
    },
    {
      step: 3,
      title: "Open Settings → MCP Servers",
      code: `# Open Cursor Settings (Cmd/Ctrl + ,)
# Navigate to "MCP Servers" section`,
    },
    {
      step: 4,
      title: "Add Server Configuration",
      code: `{
  "mcpServers": {
    "youtube-connector-mcp": {
      "command": "youtube-connector-mcp",
      "env": {
        "YOUTUBE_API_KEY": "your_api_key_here"
      }
    }
  }
}`,
    },
  ],
  cline: [
    {
      step: 1,
      title: "Install pipx (if needed)",
      code: `brew install pipx`,
    },
    {
      step: 2,
      title: "Install YouTube MCP",
      code: `pipx install youtube-connector-mcp`,
    },
    {
      step: 3,
      title: "Edit .cline/config.yaml",
      code: `# Located in your project root`,
    },
    {
      step: 4,
      title: "Add Server Configuration",
      code: `mcpServers:
  youtube-connector-mcp:
    command: youtube-connector-mcp
    env:
      YOUTUBE_API_KEY: "your_api_key_here"`,
    },
  ],
  other: [
    {
      step: 1,
      title: "Install pipx (if needed)",
      code: `brew install pipx`,
    },
    {
      step: 2,
      title: "Install YouTube MCP",
      code: `pipx install youtube-connector-mcp`,
    },
    {
      step: 3,
      title: "Get YouTube API Key",
      code: `# Visit: https://console.cloud.google.com/apis/credentials
# 1. Create or select a project
# 2. Enable YouTube Data API v3
# 3. Create credentials → API Key`,
    },
    {
      step: 4,
      title: "Add Standard JSON Config",
      code: `{
  "mcpServers": {
    "youtube-connector-mcp": {
      "command": "youtube-connector-mcp",
      "env": {
        "YOUTUBE_API_KEY": "your_api_key_here"
      }
    }
  }
}`,
    },
  ],
};

export function Installation() {
  const [activeTool, setActiveTool] = useState("claude");
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  async function copyToClipboard(code: string, id: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  const steps = stepsByTool[activeTool] || stepsByTool.claude;
  const activeToolData = tools.find((t) => t.id === activeTool);

  return (
    <section className="py-16 sm:py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-3">
            Quick Installation
          </h2>
          <p className="text-slate-400">
            Select your AI tool and follow the steps
          </p>
        </div>

        {/* Tool Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all
                  ${isActive
                    ? "bg-slate-950 text-slate-50 border border-slate-700"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-transparent"
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? tool.color : ""}`} />
                {tool.name}
              </button>
            );
          })}
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((item, idx) => {
            const codeId = `${activeTool}-${item.step}`;
            return (
              <div
                key={item.step}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden"
              >
                <div className="flex items-center gap-4 p-5 border-b border-slate-800">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-red-400 font-semibold text-sm">{item.step}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-100">
                    {item.title}
                  </h3>
                </div>

                <div className="relative">
                  <pre className="bg-slate-900 p-4 text-sm font-mono text-slate-300 overflow-x-auto">
                    {item.code}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(item.code, codeId)}
                    className="absolute top-3 right-3 p-1.5 bg-slate-800 border border-slate-700 rounded hover:bg-slate-700 transition-colors cursor-pointer"
                    aria-label="Copy to clipboard"
                  >
                    {copiedStates[codeId] ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* API Key Notice */}
        <div className="mt-8 p-4 bg-slate-950 border border-slate-800 rounded-lg">
          <p className="text-sm text-slate-400">
            <span className="text-slate-200 font-medium">Need an API Key?</span> Get it free from{" "}
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 underline"
            >
              Google Cloud Console
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
