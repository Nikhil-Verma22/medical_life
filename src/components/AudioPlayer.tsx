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
} from "lucide-react";
import { MEDICAL_SONGS, MedicalSong } from "../data/medMedia";
import { Scene } from "../data/scenes";

interface AudioPlayerProps {
  currentScene: Scene;
  zenMode: boolean;
  activeTrackIndex?: number;
  onTrackChange?: (index: number) => void;
}

export function AudioPlayer({
  currentScene,
  zenMode,
  activeTrackIndex: externalTrackIndex,
  onTrackChange,
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
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = MEDICAL_SONGS[trackIndex] ?? MEDICAL_SONGS[0];

  // Initialize or update audio when track changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = track.audioUrl;
    audioRef.current.volume = isMuted ? 0 : volume;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [trackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const handleNext = () => {
    setTrackIndex((prev) => (prev + 1) % MEDICAL_SONGS.length);
  };

  const handlePrev = () => {
    setTrackIndex((prev) => (prev - 1 + MEDICAL_SONGS.length) % MEDICAL_SONGS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (!isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val > 0) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleNext}
      />

      {/* Playlist Drawer Modal */}
      {showPlaylist && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 backdrop-blur-sm p-4 sm:items-center">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-neutral-950/95 p-4 text-white shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-amber-400" />
                <h3 className="font-semibold text-sm">Medical Hub Radio Streams</h3>
              </div>
              <button
                onClick={() => setShowPlaylist(false)}
                className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70 hover:bg-white/20 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-2.5 max-h-64 space-y-1.5 overflow-y-auto custom-scrollbar pr-1">
              {MEDICAL_SONGS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setTrackIndex(idx);
                    setIsPlaying(true);
                    setShowPlaylist(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl p-2.5 text-left transition-all ${
                    idx === trackIndex
                      ? "bg-amber-400/20 border border-amber-400/40 text-white"
                      : "hover:bg-white/10 text-white/80 border border-transparent"
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="truncate font-semibold text-xs">{s.title}</p>
                    <p className="truncate text-[10px] text-white/60">{s.mood}</p>
                  </div>
                  <span className="font-mono text-[10px] text-white/50">{s.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Player Bar (Reduced Size & Width) */}
      <div
        className={`fixed inset-x-0 bottom-3 z-30 flex justify-center px-3 transition-all duration-500 ${
          zenMode
            ? "translate-y-24 opacity-0 hover:translate-y-0 hover:opacity-100"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="flex w-full max-w-lg items-center gap-2.5 rounded-full border border-white/20 bg-black/70 px-3.5 py-2 text-white shadow-2xl backdrop-blur-2xl sm:gap-3 sm:px-4">
          {/* Rotating Album Icon */}
          <div className="relative flex-none">
            <div
              className={`h-9 w-9 rounded-full overflow-hidden border border-white/30 bg-neutral-800 shadow-md ${
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
              <p className="truncate text-xs font-bold text-white tracking-wide">
                {track.title}
              </p>
              <span className="font-mono text-[9px] tabular-nums text-white/60 flex-none">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Scrubber */}
            <div className="mt-1 flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                aria-label="Track progress"
                className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-amber-400 hover:bg-white/30"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-none items-center gap-1">
            {/* Playlist Button */}
            <button
              onClick={() => setShowPlaylist((p) => !p)}
              title="View Playlists"
              className="rounded-full p-1.5 text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            >
              <ListMusic className="h-3.5 w-3.5" />
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
