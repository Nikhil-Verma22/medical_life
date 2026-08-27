import React from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { SCENES, Scene } from "../data/scenes";

interface SceneGalleryProps {
  isOpen: boolean;
  currentSceneIndex: number;
  onSelectScene: (index: number) => void;
  onClose: () => void;
}

export function SceneGallery({
  isOpen,
  currentSceneIndex,
  onSelectScene,
  onClose,
}: SceneGalleryProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex h-[85vh] w-full max-w-5xl flex-col rounded-3xl border border-white/20 bg-neutral-950/95 text-white shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-indigo-400" />
            <div>
              <h3 className="font-bold text-base">40 Medical Life & Love Scenes</h3>
              <p className="text-xs text-white/60">
                Click any scene to jump immediately • 8-second automatic rotation • 10-12 Shayaris per scene
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="rounded-full bg-white/5 p-2 text-white/70 hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Grid of 40 Scenes */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  onSelectScene(idx);
                  onClose();
                }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                  idx === currentSceneIndex
                    ? "border-amber-400 ring-2 ring-amber-400/50 shadow-lg scale-[1.02]"
                    : "border-white/10 hover:border-white/30 hover:scale-[1.01]"
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={scene.src}
                    alt={scene.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 bg-black/60 p-2.5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-amber-300">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-hindi text-xs text-white/80">{scene.hindiTitle}</span>
                  </div>
                  <p className="truncate text-xs font-semibold text-white mt-0.5">
                    {scene.englishTitle}
                  </p>
                  <span className="mt-1 inline-block rounded bg-rose-500/20 px-1.5 py-0.2 text-[9px] text-rose-300 font-medium">
                    {scene.mood}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
