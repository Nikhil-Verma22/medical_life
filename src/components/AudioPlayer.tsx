import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ListMusic,
  Disc3,
  Radio,
  Music,
  Search,
} from "lucide-react";
import { MEDICAL_SONGS, MedicalSong } from "../data/medMedia";
import { Scene } from "../data/scenes";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

interface AudioPlayerProps {
  currentScene: Scene;
  zenMode: boolean;
  activeTrackIndex?: number;
  onTrackChange?: (index: number) => void;
  isUnlocked?: boolean;
}

export function AudioPlayer({
  currentScene,
  zenMode,
  activeTrackIndex: externalTrackIndex,
  onTrackChange,
  isUnlocked = true,
}: AudioPlayerProps) {
  const [internalTrackIndex, setInternalTrackIndex] = useState(0);
  const trackIndex = externalTrackIndex !== undefined ? externalTrackIndex : internalTrackIndex;
  const setTrackIndex = (idx: number | ((prev: number) => number)) => {
    const nextVal = typeof idx === "function" ? idx(trackIndex) : idx;
    setInternalTrackIndex(nextVal);
    onTrackChange?.(nextVal);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const ytPlayerRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const track = (MEDICAL_SONGS[trackIndex] ?? MEDICAL_SONGS[0])!;

  // Initialize YouTube Iframe API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initYTPlayer();
      };
    } else {
      initYTPlayer();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const initYTPlayer = () => {
    if (ytPlayerRef.current || !window.YT?.Player) return;

    ytPlayerRef.current = new window.YT.Player("yt-audio-engine", {
      height: "1",
      width: "1",
      videoId: track.youtubeId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        enablejsapi: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(volume * 100);
        },
        onStateChange: (event: any) => {
          // YT.PlayerState.PLAYING = 1, ENDED = 0, PAUSED = 2
          if (event.data === 1) {
            setIsPlaying(true);
            startTimer();
          } else if (event.data === 0) {
            setIsPlaying(false);
            // Smoothly auto-advance to next track when song finishes
            handleNext();
          } else if (event.data === 2) {
            setIsPlaying(false);
          }
        },
      },
    });
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
        const curr = ytPlayerRef.current.getCurrentTime() || 0;
        const dur = ytPlayerRef.current.getDuration() || 0;
        setCurrentTime(curr);
        if (dur > 0) setDuration(dur);
      }
    }, 500);
  };

  // Load new track when index changes and auto-play
  useEffect(() => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.loadVideoById === "function") {
      ytPlayerRef.current.loadVideoById(track.youtubeId);
      if (typeof ytPlayerRef.current.playVideo === "function") {
        ytPlayerRef.current.playVideo();
      }
      setIsPlaying(true);
    }
    setCurrentTime(0);
    setDuration(0);
  }, [trackIndex]);

  const togglePlay = () => {
    if (!isUnlocked) {
      alert("Please fill the 1-minute counseling form to unlock all website features!");
      window.open("/form-filling/index.html", "_blank");
      return;
    }
    if (!ytPlayerRef.current) return;
    if (isPlaying) {
      ytPlayerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      ytPlayerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    setTrackIndex((prev) => (prev + 1) % MEDICAL_SONGS.length);
  };

  const handlePrev = () => {
    setTrackIndex((prev) => (prev - 1 + MEDICAL_SONGS.length) % MEDICAL_SONGS.length);
  };

  // Seek Handler for 10%, 50%, 70%, 90%
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.seekTo === "function") {
      ytPlayerRef.current.seekTo(time, true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.setVolume === "function") {
      ytPlayerRef.current.setVolume(val * 100);
      if (val > 0) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!ytPlayerRef.current) return;
    if (isMuted) {
      ytPlayerRef.current.setVolume(volume * 100);
      setIsMuted(false);
    } else {
      ytPlayerRef.current.setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const filteredSongs = searchQuery.trim()
    ? MEDICAL_SONGS.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MEDICAL_SONGS;

  return (
    <>
      {/* Hidden YouTube Iframe Audio Engine */}
      <div className="absolute top-0 left-0 h-1 w-1 opacity-0 pointer-events-none overflow-hidden">
        <div id="yt-audio-engine" />
      </div>

      {/* Playlist Drawer Modal (Search & 400+ Tracks) */}
      {showPlaylist && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/80 backdrop-blur-md p-4 sm:items-center">
          <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-neutral-950/95 p-4 text-white shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-amber-400" />
                <h3 className="font-bold text-sm">
                  Nusrat Fateh Ali Khan Vault ({MEDICAL_SONGS.length} Qawwalis)
                </h3>
              </div>
              <button
                onClick={() => setShowPlaylist(false)}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 hover:text-white"
              >
                Close
              </button>
            </div>

            {/* Search Input */}
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/50" />
              <input
                type="text"
                placeholder="Search Qawwali title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="mt-3 max-h-80 space-y-1.5 overflow-y-auto custom-scrollbar pr-1">
              {filteredSongs.slice(0, 100).map((s) => {
                const originalIndex = MEDICAL_SONGS.findIndex((orig) => orig.id === s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setTrackIndex(originalIndex);
                      setIsPlaying(true);
                      setShowPlaylist(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl p-2.5 text-left transition-all ${
                      originalIndex === trackIndex
                        ? "bg-amber-400/25 border border-amber-400/50 text-white shadow-md"
                        : "hover:bg-white/10 text-white/80 border border-transparent"
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-400/20 border border-amber-400/40 px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-300">
                          NFAK
                        </span>
                        <p className="truncate font-semibold text-xs text-white">{s.title}</p>
                      </div>
                      <p className="truncate text-[10px] text-white/60">{s.artist}</p>
                    </div>
                    <span className="font-mono text-[10px] text-amber-200/80 font-bold">
                      {s.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Player Bar (Ad-Free YouTube Audio Engine) */}
      <div
        className={`fixed inset-x-0 bottom-3 z-30 flex justify-center px-3 transition-all duration-500 ${
          zenMode
            ? "translate-y-24 opacity-0 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="flex w-full max-w-lg items-center gap-2.5 rounded-full border border-white/20 bg-black/85 px-3.5 py-2.5 text-white shadow-2xl backdrop-blur-2xl sm:gap-3 sm:px-4">
          {/* Rotating Artwork Icon */}
          <div className="relative flex-none">
            <div
              className={`h-10 w-10 rounded-full overflow-hidden border border-white/30 bg-neutral-800 shadow-md ${
                isPlaying ? "animate-pulse" : ""
              }`}
            >
              <img
                src={currentScene.src}
                alt="Current track artwork"
                className="h-full w-full object-cover"
              />
            </div>
            {isPlaying && (
              <div className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-neutral-900 shadow">
                <Disc3 className="h-2.5 w-2.5 animate-spin" />
              </div>
            )}
          </div>

          {/* Track Info & Scrubber */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5 truncate">
                <span className="rounded bg-amber-400/20 border border-amber-400/40 px-1 py-0 font-mono text-[8px] font-bold text-amber-300 uppercase">
                  NFAK
                </span>
                <p className="truncate text-xs font-bold text-white tracking-wide">
                  {track.title}
                </p>
              </div>
              <span className="font-mono text-[10px] tabular-nums text-white/70 font-semibold flex-none">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Seek Slider (Clickable anywhere for instant seeking) */}
            <div className="mt-1 flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek audio track"
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-amber-400 hover:bg-white/40 transition-all"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-none items-center gap-1">
            {/* Playlist Button */}
            <button
              onClick={() => setShowPlaylist((p) => !p)}
              title={`View Playlist (${MEDICAL_SONGS.length} Qawwalis)`}
              className="rounded-full p-1.5 text-amber-300 hover:bg-white/15 hover:text-white transition-colors"
            >
              <ListMusic className="h-4 w-4" />
            </button>

            {/* Prev Track */}
            <button
              onClick={handlePrev}
              aria-label="Previous track"
              className="rounded-full p-1.5 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              <SkipBack className="h-3.5 w-3.5 fill-current" />
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-neutral-950 shadow-md transition-transform hover:scale-105 hover:bg-amber-300 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current" />
              ) : (
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              )}
            </button>

            {/* Next Track */}
            <button
              onClick={handleNext}
              aria-label="Next track"
              className="rounded-full p-1.5 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              <SkipForward className="h-3.5 w-3.5 fill-current" />
            </button>

            {/* Volume Control */}
            <div className="hidden items-center gap-1 pl-0.5 md:flex">
              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
                className="rounded-full p-1 text-white/70 hover:text-white"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-3.5 w-3.5 text-rose-400" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume slider"
                className="h-1 w-12 cursor-pointer appearance-none rounded-full bg-white/20 accent-amber-400"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
