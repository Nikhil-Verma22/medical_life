import React, { useState } from "react";
import { Sparkles, Send, Heart, Moon, Coffee, Zap, CloudRain, Award } from "lucide-react";

interface TopAiMoodBarProps {
  zenMode: boolean;
  onApplyMood: (moodKeyword: string) => void;
}

export const MOOD_PRESETS = [
  { label: "Medical Life Love", icon: Heart, color: "text-rose-300", keyword: "love" },
  { label: "3 AM Gray's Alpha Flow", icon: Moon, color: "text-indigo-300", keyword: "study" },
  { label: "Post-Viva Chai", icon: Coffee, color: "text-amber-300", keyword: "chai" },
  { label: "Casualty 02:00 AM", icon: Zap, color: "text-red-400", keyword: "casualty" },
  { label: "Hostel Rain", icon: CloudRain, color: "text-cyan-300", keyword: "rain" },
  { label: "Convocation", icon: Award, color: "text-emerald-300", keyword: "convocation" },
];

export function TopAiMoodBar({ zenMode, onApplyMood }: TopAiMoodBarProps) {
  const [customMood, setCustomMood] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  if (zenMode) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMood.trim()) {
      onApplyMood(customMood.trim());
      setCustomMood("");
    }
  };

  return (
    <div className="fixed inset-x-0 top-11 sm:top-12 z-20 mx-auto flex max-w-xl flex-col items-center px-3 transition-all duration-300">
      <div className="flex w-full flex-col rounded-2xl border border-white/15 bg-black/65 p-1 shadow-xl backdrop-blur-xl transition-all hover:border-amber-400/40">
        {/* Main Bar: Compact Prompt Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 pl-1.5 text-amber-300">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider hidden sm:inline">
              Tune Mood:
            </span>
          </div>

          <input
            type="text"
            value={customMood}
            onChange={(e) => setCustomMood(e.target.value)}
            placeholder="Type mood (e.g. 3 AM study, post-viva chai, casualty...)"
            className="flex-1 rounded-xl bg-white/5 px-2.5 py-1 text-xs text-white placeholder:text-white/40 focus:border-amber-400 focus:bg-black/60 focus:outline-none"
          />

          <button
            type="submit"
            className="flex items-center gap-1 rounded-xl bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-neutral-950 shadow hover:bg-amber-300 active:scale-95 transition-all"
          >
            <Send className="h-2.5 w-2.5" />
            <span className="hidden sm:inline">Tune</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded((e) => !e)}
            className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-medium text-white/70 hover:bg-white/15 hover:text-white transition-colors"
          >
            {isExpanded ? "▲" : "Presets ▼"}
          </button>
        </form>

        {/* Expandable Mood Presets */}
        {isExpanded && (
          <div className="mt-1 flex flex-wrap items-center justify-center gap-1 border-t border-white/10 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
            {MOOD_PRESETS.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    onApplyMood(preset.keyword);
                    setIsExpanded(false);
                  }}
                  className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/80 transition-all hover:border-amber-400/40 hover:bg-white/15 hover:text-white active:scale-95"
                >
                  <Icon className={`h-2.5 w-2.5 ${preset.color}`} />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
