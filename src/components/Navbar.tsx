import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Stethoscope,
  Heart,
  Timer,
  LayoutGrid,
  Eye,
  EyeOff,
  Clock,
  Swords,
} from "lucide-react";
import { Scene } from "../data/scenes";

interface NavbarProps {
  currentScene: Scene;
  currentIndex: number;
  totalScenes: number;
  zenMode: boolean;
  onToggleZenMode: () => void;
  onOpenAiHub: () => void;
  onOpenPomodoro: () => void;
  onOpenGallery: () => void;
  onOpenChessGame?: () => void;
  isUnlocked?: boolean;
  onPromptUnlock?: () => void;
  onOpenVideoPlayer?: () => void;
  isVideoPlayerOpen?: boolean;
}

export function Navbar({
  currentScene,
  currentIndex,
  totalScenes,
  zenMode,
  onToggleZenMode,
  onOpenAiHub,
  onOpenPomodoro,
  onOpenGallery,
  isUnlocked = true,
  onPromptUnlock,
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

  const handleProtectedClick = (action: () => void) => {
    if (!isUnlocked) {
      if (onPromptUnlock) onPromptUnlock();
      else {
        alert("Please fill the 1-minute counseling form to unlock all website features!");
        window.open("/form-filling/index.html", "_blank");
      }
      return;
    }
    action();
  };

  return (
    <>
      {/* Floating Persistent Zen Exit Button (Always Visible in Zen Mode) */}
      {zenMode && (
        <button
          onClick={onToggleZenMode}
          title="Exit Zen Focus Mode"
          className="fixed top-3 right-3 z-50 flex items-center gap-2 rounded-full border-2 border-amber-400/80 bg-black/90 px-3.5 py-1.5 text-xs font-black text-amber-300 shadow-2xl backdrop-blur-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <EyeOff className="h-4 w-4 text-amber-400 animate-pulse" />
          <span className="font-mono tracking-wide uppercase">EXIT ZEN MODE</span>
        </button>
      )}

      <header
        className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
          zenMode ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6">
        {/* Left: Brand (Enlarged & Prominent) */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-rose-400/80 bg-white shadow-[0_0_15px_rgba(244,63,94,0.35)] backdrop-blur-xl transition-transform hover:scale-105 overflow-hidden p-0.5">
            <img src="/logo.png" alt="Medical Hub Logo" className="h-full w-full rounded-full object-cover" />
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

        {/* Center: Live Indian Standard Time (IST) - Perfectly Centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-amber-400/25 bg-black/60 px-3.5 py-1 text-xs text-white/90 backdrop-blur-xl shadow-md">
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
          {/* ILAAJ-E-MAAT (Medical Lounge Chess) */}
          <a
            href="/vibechess/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!isUnlocked) {
                e.preventDefault();
                handleProtectedClick(() => window.open("/vibechess/", "_blank"));
              }
            }}
            className="flex items-center gap-1.5 rounded-full border border-rose-400/40 bg-rose-500/20 px-3 py-1 text-[11px] font-black text-rose-200 backdrop-blur-xl transition-all hover:scale-105 hover:bg-rose-500/30 active:scale-95 shadow-md"
            title="Play ILAAJ-E-MAAT Medical Lounge Chess in New Tab"
          >
            <Swords className="h-3.5 w-3.5 text-rose-300 animate-pulse" />
            <span className="font-mono tracking-wide uppercase">ILAAJ-E-MAAT</span>
          </a>

          {/* AI Suggestions (Compact) */}
          <button
            onClick={() => handleProtectedClick(onOpenAiHub)}
            className="flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-200 backdrop-blur-xl transition-all hover:scale-105 hover:bg-amber-500/30 active:scale-95"
          >
            <Sparkles className="h-3 w-3 text-amber-300" />
            <span className="hidden sm:inline">AI Prescriptions</span>
          </button>

          {/* Pomodoro Focus */}
          <button
            onClick={() => handleProtectedClick(onOpenPomodoro)}
            title="Med-Focus Study Pomodoro"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-xl transition-all hover:scale-105 hover:bg-white/15 hover:text-white"
          >
            <Timer className="h-3.5 w-3.5 text-emerald-300" />
          </button>

          {/* 40 Scenes Gallery */}
          <button
            onClick={() => handleProtectedClick(onOpenGallery)}
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
            onClick={onToggleZenMode}
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
  </>
  );
}
