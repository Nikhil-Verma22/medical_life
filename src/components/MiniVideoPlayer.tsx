import React, { useState } from "react";
import {
  Video,
  X,
  Search,
  Maximize2,
  Minimize2,
  Film,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface MiniVideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CuratedClip {
  id: string;
  title: string;
  movie: string;
  youtubeId: string;
  tag: string;
}

const CURATED_CLIPS: CuratedClip[] = [
  {
    id: "clip-1",
    title: "Jadu Ki Jhappi & Medical Ethics",
    movie: "Munna Bhai M.B.B.S.",
    youtubeId: "WvK6oI1wP-c",
    tag: "Empathy in Medicine",
  },
  {
    id: "clip-2",
    title: "Treat The Person, Not Just Disease",
    movie: "Patch Adams",
    youtubeId: "24k_p_qFk74",
    tag: "True Healer Story",
  },
  {
    id: "clip-3",
    title: "Zindagi Badi Honi Chahiye",
    movie: "Anand (1971)",
    youtubeId: "gG9j2bF1e8E",
    tag: "Classic Oncology",
  },
  {
    id: "clip-4",
    title: "Government Medical College OPD",
    movie: "Doctor G",
    youtubeId: "vA_1Wk1U5Q0",
    tag: "GMC Life & Humility",
  },
  {
    id: "clip-5",
    title: "First Open Heart Surgery Breakthrough",
    movie: "Something the Lord Made",
    youtubeId: "8gV6r2m9o0A",
    tag: "Surgical History",
  },
];

export function MiniVideoPlayer({ isOpen, onClose }: MiniVideoPlayerProps) {
  const [selectedClip, setSelectedClip] = useState<CuratedClip>(CURATED_CLIPS[0]);
  const [customSearch, setCustomSearch] = useState("");
  const [customVideoId, setCustomVideoId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearch.trim()) return;

    // Check if input is a direct YouTube URL
    const urlMatch = customSearch.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (urlMatch && urlMatch[1]) {
      setCustomVideoId(urlMatch[1]);
    } else {
      // Default to curated clip search
      const found = CURATED_CLIPS.find((c) =>
        c.title.toLowerCase().includes(customSearch.toLowerCase()) ||
        c.movie.toLowerCase().includes(customSearch.toLowerCase())
      );
      if (found) {
        setSelectedClip(found);
        setCustomVideoId(null);
      }
    }
  };

  const activeVideoId = customVideoId || selectedClip.youtubeId;

  return (
    <div className="fixed bottom-24 right-4 z-40 w-full max-w-sm sm:max-w-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col rounded-3xl border border-rose-400/30 bg-neutral-950/95 p-3.5 text-white shadow-2xl backdrop-blur-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-rose-400" />
            <span className="font-bold text-xs">Medical Cinema Mini-Box</span>
            <span className="rounded-full bg-rose-500/20 px-1.5 py-0.2 text-[9px] font-bold text-rose-300">
              YouTube Direct
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized((m) => !m)}
              className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="h-3.5 w-3.5" /> : <Minimize2 className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
              title="Close Player"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Player & Selector (Hidden if Minimized) */}
        {!isMinimized && (
          <div className="mt-2.5 space-y-2.5">
            {/* Embedded Responsive 16:9 YouTube Player */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-black shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&rel=0`}
                title="Medical Movie Scene Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>

            {/* Quick Search & Clip Selectors */}
            <form onSubmit={handleSearchSubmit} className="flex gap-1.5">
              <input
                type="text"
                value={customSearch}
                onChange={(e) => setCustomSearch(e.target.value)}
                placeholder="Search medical clip or paste YouTube URL..."
                className="flex-1 rounded-xl border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-white placeholder:text-white/40 focus:border-rose-400 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-rose-500 px-3 py-1 text-xs font-bold text-white hover:bg-rose-600 active:scale-95 transition-all"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Curated Presets Pills */}
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto custom-scrollbar pr-1">
              {CURATED_CLIPS.map((clip) => (
                <button
                  key={clip.id}
                  onClick={() => {
                    setSelectedClip(clip);
                    setCustomVideoId(null);
                  }}
                  className={`rounded-lg px-2 py-0.5 text-[10px] font-medium transition-all ${
                    selectedClip.id === clip.id && !customVideoId
                      ? "bg-rose-500 text-white font-bold"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  🎬 {clip.movie}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
