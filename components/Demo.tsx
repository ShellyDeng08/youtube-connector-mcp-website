"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Search, FileText, MessageSquare, List, Send, User } from "lucide-react";

interface Step {
  type: "user" | "assistant" | "tool_call" | "tool_result" | "clear";
  content?: string;
  tool?: string;
  params?: string;
  items?: Array<{ title: string; channel: string; views: string; duration?: string }>;
  single?: boolean;
  delay_ms?: number;
}

interface Scenario {
  meta: {
    title: string;
    description: string;
    duration_ms: number;
  };
  steps: Step[];
}

interface ScenarioOption {
  key: string;
  title: string;
  icon: any;
}

interface ScriptData {
  version: string;
  scenarios: Record<string, Scenario>;
}

import demoScript from "@/docs/terminal-demo-script.json";

const scenarioOptions: ScenarioOption[] = [
  { key: "search_demo", title: "Search Videos", icon: Search },
  { key: "video_details_demo", title: "Video Details", icon: Play },
  { key: "transcript_demo", title: "Get Transcript", icon: FileText },
  { key: "comments_demo", title: "Get Comments", icon: MessageSquare },
  { key: "channel_demo", title: "Channel Info", icon: List },
  { key: "playlist_demo", title: "Playlist Details", icon: Play },
  { key: "quick_search_demo", title: "Quick Search", icon: Search },
];

export function Demo() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playingRef = useRef(false);

  const scenarios = (demoScript as ScriptData).scenarios;
  const currentScenarioData = activeScenario ? scenarios[activeScenario] : null;

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      timeoutRef.current = setTimeout(resolve, ms);
    });
  }

  async function typeText(
    container: HTMLElement,
    text: string,
    speed: number = 30
  ): Promise<void> {
    container.innerHTML = "";
    const chars = text.split("");

    for (let i = 0; i < chars.length; i++) {
      if (isPaused) {
        // Wait while paused
        await sleep(50);
        continue;
      }

      const char = chars[i];
      if (char === "\n") {
        container.innerHTML += "<br>";
      } else if (char === "*" && chars[i + 1] === "*") {
        // Bold markdown
        let boldText = "";
        let j = i + 1;
        while (chars[j] === "*") {
          boldText += chars[j + 1];
          j += 2;
        }
        container.innerHTML += `<strong>${boldText}</strong>`;
        i = j - 1;
      } else if (char === "`" && chars[i + 1] === "`") {
        // Code markdown
        let codeText = "";
        let j = i + 1;
        while (chars[j] !== "`") {
          codeText += chars[j];
          j++;
        }
        container.innerHTML += `<code class="bg-slate-900/50 px-1.5 py-0.5 rounded">${codeText}</code>`;
        i = j - 1;
      } else {
        container.innerHTML += char;
      }

      if (i % 3 === 0) {
        await sleep(speed);
      }
    }

    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }

  async function executeStep(step: Step, index: number, total: number): Promise<void> {
    if (!terminalRef.current || isPaused) return;

    if (step.type === "user") {
      const msg = document.createElement("div");
      msg.className = "flex justify-end mb-6";
      msg.innerHTML = `
        <div class="flex items-end gap-3 max-w-[85%]">
          <div class="bg-slate-800 rounded-lg px-4 py-3 text-slate-100">
            <div class="flex items-center gap-2 text-slate-500 mb-1">
              <User class="w-4 h-4" />
              <span class="text-xs">typing...</span>
            </div>
            ${step.content || ""}
          </div>
        </div>
      `;
      terminalRef.current.appendChild(msg);
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;

      // Simulate "typing" before showing final message
      await sleep(800);

      const typingSpan = msg.querySelector(".text-xs") as HTMLElement;
      if (typingSpan) {
        typingSpan.parentElement?.removeChild(typingSpan);
      }

      await sleep(400);
    } else if (step.type === "assistant") {
      const msg = document.createElement("div");
      msg.className = "flex justify-start mb-6";
      msg.innerHTML = `
        <div class="flex items-center gap-2.5 max-w-[85%]">
          <div class="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            C
          </div>
          <div class="bg-slate-800 rounded-2xl rounded-tl-2xl rounded-br-lg px-4 py-3.5 text-slate-200">
            <div class="flex items-center gap-2 mb-2 h-6">
              <div class="flex gap-1">
                <span class="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse"></span>
                <span class="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse delay-100"></span>
                <span class="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse delay-200"></span>
              </div>
              <span class="text-xs text-slate-500">Claude is thinking</span>
            </div>
          </div>
        </div>
      `;
      terminalRef.current.appendChild(msg);
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;

      await sleep(600);

      // Replace typing with actual content
      const contentDiv = msg.querySelector(".text-slate-200") as HTMLElement;
      const typingContainer = contentDiv.querySelector("h-6") as HTMLElement;
      typingContainer?.remove();

      await typeText(contentDiv, step.content || "", 25);
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    } else if (step.type === "tool_call") {
      const div = document.createElement("div");
      div.className = "bg-slate-900/80 border border-slate-700/50 rounded-lg my-4 ml-auto max-w-[95%] overflow-hidden";
      div.innerHTML = `
        <div class="flex items-center gap-2 px-3 py-2.5 bg-slate-800/50 border-b border-slate-700/50">
          <div class="w-4 h-4 bg-gradient-to-br from-red-500 to-orange-400 rounded-sm"></div>
          <div class="flex items-center gap-2">
            <span class="text-slate-400 text-xs uppercase tracking-wider font-semibold">tool</span>
            <span class="text-slate-200 text-sm font-mono">${step.tool}</span>
          </div>
        </div>
        <div class="px-3 py-3 font-mono text-sm text-slate-400">
          <pre class="whitespace-pre-wrap break-words text-slate-300">${step.params || ""}</pre>
        </div>
      `;
      terminalRef.current.appendChild(div);
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    } else if (step.type === "tool_result") {
      const div = document.createElement("div");
      div.className = "bg-slate-800/30 border border-slate-700/30 rounded-lg my-4 ml-auto max-w-[95%] p-4";
      let contentHtml = '<div class="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3"><div class="w-2 h-2 bg-green-500 rounded-full"></div>Result</div><div class="text-sm text-slate-200 leading-relaxed">';

      if (step.single) {
        contentHtml += (step.content || "").replace(/\n/g, "<br>");
      } else if (step.items) {
        contentHtml += '<div class="space-y-2">';
        step.items.forEach((item, idx) => {
          contentHtml += `<div class="p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
            <div class="text-slate-100 text-sm font-medium mb-1 line-clamp-2">${item.title}</div>
            <div class="text-slate-500 text-xs flex items-center gap-2">
              <span>${item.channel}</span>
              ${item.views ? `<span>|</span><span>${item.views}</span>` : ""}
              ${item.duration ? `<span>|</span><span class="text-slate-400">${item.duration}</span>` : ""}
            </div>
          </div>`;
        });
        contentHtml += '</div>';
      }

      contentHtml += "</div>";
      div.innerHTML = contentHtml;
      terminalRef.current.appendChild(div);
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    } else if (step.type === "clear") {
      if (terminalRef.current) {
        terminalRef.current.innerHTML = "";
      }
    }

    if (step.delay_ms) {
      await sleep(step.delay_ms);
    }
  }

  async function runDemo(): Promise<void> {
    if (!currentScenarioData || playingRef.current) return;

    playingRef.current = true;

    // Clear terminal
    if (terminalRef.current) {
      terminalRef.current.innerHTML = "";
    }

    // Add a "start" indicator
    const startDiv = document.createElement("div");
    startDiv.className = "text-center py-4 text-slate-500 text-sm";
    startDiv.innerHTML = '<span class="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Starting demo...';
    terminalRef.current.appendChild(startDiv);
    await sleep(1000);
    startDiv.remove();

    for (let i = 0; i < currentScenarioData.steps.length; i++) {
      await executeStep(currentScenarioData.steps[i], i, currentScenarioData.steps.length);
    }

    playingRef.current = false;
  }

  // Reset and run when scenario changes
  useEffect(() => {
    if (activeScenario) {
      setIsPaused(false);
      runDemo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeScenario]);

  function resetDemo() {
    setActiveScenario(null);
    setIsPaused(false);
    if (terminalRef.current) {
      terminalRef.current.innerHTML = `
        <div class="text-slate-600 text-center py-10">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
              <Play class="w-6 h-6 text-slate-500" />
            </div>
          </div>
          <p class="text-lg text-slate-400">Select a scenario above to see how Claude uses YouTube MCP</p>
          <p class="text-sm text-slate-500">Click the play/pause button to control the demo</p>
        </div>
      `;
    }
  }

  return (
    <section id="demo" className="py-16 sm:py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-3">
            Interactive Demo
          </h2>
          <p className="text-slate-400">
            Watch how Claude uses YouTube MCP in a real conversation
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {scenarioOptions.map((option) => {
            const Icon = option.icon;
            const isActive = activeScenario === option.key;
            return (
              <button
                key={option.key}
                onClick={() => {
                  if (activeScenario === option.key) {
                    resetDemo();
                  } else {
                    setActiveScenario(option.key);
                  }
                }}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all
                  ${isActive
                    ? "bg-red-500 text-white border-2 border-red-500 shadow-lg shadow-red-500/25"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border-2 border-transparent hover:border-slate-600"
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? "" : "text-slate-400"}`} />
                {option.title}
              </button>
            );
          })}
        </div>

        {/* Controls */}
        {activeScenario && (
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                isPaused
                  ? "bg-amber-500 text-white hover:bg-amber-600"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  Resume
                </>
              ) : (
                <>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                    <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                  </div>
                  Pause
                </>
              )}
            </button>
            <button
              onClick={resetDemo}
              className="px-4 py-2 rounded-lg font-medium transition-all bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              Reset
            </button>
          </div>
        )}

        {/* Scenario Info */}
        {currentScenarioData && (
          <div className="text-center text-sm text-slate-500 mb-4 py-2 px-4 bg-slate-950/50 border-b border-slate-800 rounded-lg">
            {currentScenarioData.meta.description}
          </div>
        )}

        {/* Terminal / Chat */}
        <div
          ref={terminalRef}
          className="bg-slate-950 border border-slate-800 rounded-2xl p-6 h-[480px] overflow-y-auto"
        >
          <div className="text-slate-600 text-center py-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center animate-pulse">
                <Play className="w-6 h-6 text-slate-500" />
              </div>
            </div>
            <p className="text-lg text-slate-400">Select a scenario above to see how Claude uses YouTube MCP</p>
            <p className="text-sm text-slate-500">Click the play/pause button to control the demo</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
