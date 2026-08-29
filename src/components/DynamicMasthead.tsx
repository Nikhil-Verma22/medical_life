import React, { useState, useEffect } from "react";
import { Scene } from "../data/scenes";
import { Heart } from "lucide-react";

interface DynamicMastheadProps {
  scene: Scene;
  sceneIndex: number;
  rotationCount: number;
  zenMode: boolean;
}

export function DynamicMasthead({
  scene,
  sceneIndex,
  rotationCount,
  zenMode,
}: DynamicMastheadProps) {
  const [shayariIndex, setShayariIndex] = useState(0);

  // Automatically pick fresh shayari on each rotation/scene transition
  useEffect(() => {
    if (scene.shayaris && scene.shayaris.length > 0) {
      const idx = rotationCount % scene.shayaris.length;
      setShayariIndex(idx);
    }
  }, [scene.id, rotationCount]);

  if (zenMode) return null;

  const currentShayari =
    (scene.shayaris && scene.shayaris.length > 0
      ? scene.shayaris[shayariIndex % scene.shayaris.length]
      : null) || {
          hindi: "ये सफ़ेद कोट महज़ लिबास नहीं, ये मेरे इश्क़ और इबादत की पहचान है।",
          hinglish: "Yeh safed coat mehez libaas nahi, yeh mere ishq aur ibaadat ki pehchan hai.",
        };

  return (
    <div
      key={`masthead-${scene.id}`}
      className="pointer-events-none fixed inset-x-0 top-28 sm:top-32 md:top-36 z-10 mx-auto max-w-3xl px-3 sm:px-4 text-center transition-all duration-700"
    >
      <div className="inline-flex flex-col items-center">
        {/* Medical Life Love Beacon */}
        <div
          className="animate-in fade-in slide-in-from-top-1 duration-500 mb-1 flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold text-rose-200 backdrop-blur-md shadow-md"
          style={{ borderColor: `${scene.accentHex}40` }}
        >
          <Heart className="h-2.5 w-2.5 fill-rose-400 text-rose-400 animate-pulse" />
          <span className="tracking-wide uppercase text-white/90 font-mono text-[9px]">
            Medical Life Love
          </span>
          <span className="text-white/30">•</span>
          <span className="text-amber-200 font-medium">{scene.mood}</span>
        </div>

        {/* Dynamic Devanagari Hindi Header */}
        <h1
          className="font-hindi text-2xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] transition-all duration-700 sm:text-3xl md:text-4xl"
          style={{
            textShadow: `0 0 30px ${scene.accentHex}70, 0 3px 12px rgba(0,0,0,0.9)`,
          }}
        >
          {scene.hindiTitle}
        </h1>

        {/* Dynamic English Title */}
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-xs">
          <span className="text-amber-300 drop-shadow">{scene.englishTitle}</span>
        </div>

        {/* Pure Shayari Quote Box (Clean & Minimal: No 4/10, No Hinglish/Next/Share buttons) */}
        <div className="animate-in fade-in zoom-in-95 duration-500 mt-1.5 max-w-2xl rounded-2xl border border-white/15 bg-black/60 px-4 py-2 text-center shadow-xl backdrop-blur-xl">
          <p className="font-hindi text-sm sm:text-base md:text-lg font-medium text-amber-100/95 leading-relaxed drop-shadow">
            "{currentShayari.hindi}"
          </p>
        </div>
      </div>
    </div>
  );
}
