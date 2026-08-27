import React, { useState, useEffect } from "react";
import { Timer, Play, Pause, RotateCcw, X, Coffee, Brain, Sparkles } from "lucide-react";

interface MedPomodoroProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MedPomodoro({ isOpen, onClose }: MedPomodoroProps) {
  const [mode, setMode] = useState<"study25" | "study50" | "break5">("study25");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (mode === "study25") setTimeLeft(25 * 60);
    if (mode === "study50") setTimeLeft(50 * 60);
    if (mode === "break5") setTimeLeft(5 * 60);
    setIsRunning(false);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const totalTime = mode === "study25" ? 25 * 60 : mode === "study50" ? 50 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-neutral-950/95 p-6 text-white shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-emerald-400" />
            <h3 className="font-bold text-base">Med-Focus Study Pomodoro</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full bg-white/5 p-1.5 text-white/70 hover:bg-white/15 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            onClick={() => setMode("study25")}
            className={`flex flex-col items-center gap-1 rounded-2xl p-2.5 text-xs font-semibold transition-all ${
              mode === "study25"
                ? "bg-amber-400 text-neutral-950 shadow-md font-bold"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <Brain className="h-4 w-4" />
            <span>25m Study</span>
          </button>

          <button
            onClick={() => setMode("study50")}
            className={`flex flex-col items-center gap-1 rounded-2xl p-2.5 text-xs font-semibold transition-all ${
              mode === "study50"
                ? "bg-amber-400 text-neutral-950 shadow-md font-bold"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>50m Deep OT</span>
          </button>

          <button
            onClick={() => setMode("break5")}
            className={`flex flex-col items-center gap-1 rounded-2xl p-2.5 text-xs font-semibold transition-all ${
              mode === "break5"
                ? "bg-emerald-400 text-neutral-950 shadow-md font-bold"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <Coffee className="h-4 w-4" />
            <span>5m Chai</span>
          </button>
        </div>

        {/* Timer Display */}
        <div className="my-8 flex flex-col items-center justify-center">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-4 border-white/10 shadow-inner">
            <svg className="absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="90"
                fill="none"
                stroke={mode === "break5" ? "#10b981" : "#f59e0b"}
                strokeWidth="6"
                strokeDasharray="565"
                strokeDashoffset={565 - (565 * progress) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>

            <div className="flex flex-col items-center">
              <span className="font-mono text-5xl font-bold tracking-tight text-white">
                {timeFormatted}
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest text-white/60">
                {mode === "break5" ? "Chai & Decompress" : "Gray's & Pathology Flow"}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setTimeLeft(totalTime)}
            title="Reset Timer"
            className="rounded-full border border-white/10 bg-white/5 p-3 text-white/70 hover:bg-white/15 hover:text-white transition-all"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            onClick={() => setIsRunning((r) => !r)}
            className={`flex h-14 w-14 items-center justify-center rounded-full text-neutral-950 shadow-lg transition-transform hover:scale-105 active:scale-95 ${
              mode === "break5" ? "bg-emerald-400 hover:bg-emerald-300" : "bg-amber-400 hover:bg-amber-300"
            }`}
          >
            {isRunning ? (
              <Pause className="h-6 w-6 fill-current" />
            ) : (
              <Play className="ml-1 h-6 w-6 fill-current" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
