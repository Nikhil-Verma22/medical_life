import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Stethoscope,
  Heart,
  Timer,
  LayoutGrid,
  Eye,
  EyeOff,
  Video,
  Clock,
} from "lucide-react";
import { Scene } from "../data/scenes";

interface NavbarProps {
  currentScene: Scene;
  currentIndex: number;
  totalScenes: number;
  zenMode: boolean;
  onToggleZen: () => void;
  onOpenAiHub: () => void;
  onOpenPomodoro: () => void;
  onOpenGallery: () => void;
  onOpenVideoPlayer: () => void;
  isVideoPlayerOpen: boolean;
}

export function Navbar({
  currentScene,
  currentIndex,
  totalScenes,
  zenMode,
  onToggleZen,
  onOpenAiHub,
  onOpenPomodoro,
  onOpenGallery,
  onOpenVideoPlayer,
  isVideoPlayerOpen,
}: NavbarProps) {
  // Live Indian Standard Time (IST) Clock
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setIstTime(formatted);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
        zenMode
          ? "opacity-0 hover:opacity-100 pointer-events-none hover:pointer-events-auto"
          : "opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6">
        {/* Left: Brand (Enlarged & Prominent) */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/50 bg-black/70 shadow-lg backdrop-blur-xl transition-transform hover:scale-105">
            <Stethoscope className="h-5 w-5 text-amber-300" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-base sm:text-lg md:text-xl font-black tracking-wide text-amber-300 drop-shadow uppercase">
                MEDICAL HUB
              </span>
              <span className="rounded-full bg-rose-500/30 border border-rose-400/60 px-3 py-0.5 text-xs sm:text-sm font-extrabold text-rose-100 shadow-md">
                ❤️ Medical Life Love
              </span>
            </div>
            <span className="font-hindi text-xs sm:text-sm tracking-wide text-white/95 font-medium -mt-0.5">
              दवाख़ाना Lounge • Medical Sanctuary
            </span>
          </div>
        </div>

        {/* Center: Live Indian Standard Time (IST) */}
        <div className="flex items-center gap-2 rounded-full border border-amber-400/25 bg-black/60 px-3.5 py-1 text-xs text-white/90 backdrop-blur-xl shadow-md">
          <Clock className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-mono text-[10px] text-amber-200/80 font-bold uppercase">
            IST
          </span>
          <span className="font-mono text-xs tabular-nums text-white font-bold tracking-wide">
            {istTime}
          </span>
          <span className="h-3 w-px bg-white/20 hidden sm:block" />
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-rose-300 font-medium">
            <Heart className="h-2.5 w-2.5 fill-rose-400 text-rose-400" />
            Medical Life Love
          </span>
        </div>

        {/* Right: Sleek Compact Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Cinema Mini-Box (Compact) */}
          <button
            onClick={onOpenVideoPlayer}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-xl transition-all hover:scale-105 active:scale-95 ${
              isVideoPlayerOpen
                ? "border-rose-400 bg-rose-500/30 text-rose-200"
                : "border-white/15 bg-black/60 text-white/90 hover:bg-white/15 hover:text-white"
            }`}
          >
            <Video className="h-3 w-3 text-rose-400" />
            <span className="hidden sm:inline">Cinema Box</span>
          </button>

          {/* AI Suggestions (Compact) */}
          <button
            onClick={onOpenAiHub}
            className="flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-200 backdrop-blur-xl transition-all hover:scale-105 hover:bg-amber-500/30 active:scale-95"
          >
            <Sparkles className="h-3 w-3 text-amber-300" />
            <span className="hidden sm:inline">AI Prescriptions</span>
          </button>

          {/* Pomodoro Focus */}
          <button
            onClick={onOpenPomodoro}
            title="Med-Focus Study Pomodoro"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-xl transition-all hover:scale-105 hover:bg-white/15 hover:text-white"
          >
            <Timer className="h-3.5 w-3.5 text-emerald-300" />
          </button>

          {/* 40 Scenes Gallery */}
          <button
            onClick={onOpenGallery}
            title="View all 40 Medical Scenes"
            className="flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2 py-1 text-[10px] font-medium text-white/80 backdrop-blur-xl transition-all hover:scale-105 hover:bg-white/15 hover:text-white"
          >
            <LayoutGrid className="h-3 w-3 text-indigo-300" />
            <span className="font-mono text-[10px] tabular-nums font-semibold">
              {String(currentIndex + 1).padStart(2, "0")}/{totalScenes}
            </span>
          </button>

          {/* Zen View Toggle */}
          <button
            onClick={onToggleZen}
            title={zenMode ? "Exit Zen Mode" : "Zen Focus Mode (Hide UI)"}
            className={`flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-xl transition-all hover:scale-105 ${
              zenMode
                ? "border-amber-400 bg-amber-400 text-black shadow-lg"
                : "border-white/15 bg-black/60 text-white/70 hover:bg-white/15 hover:text-white"
            }`}
          >
            {zenMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
