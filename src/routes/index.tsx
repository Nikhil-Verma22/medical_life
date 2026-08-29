import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Heart,
  Volume2,
  Sparkles,
} from "lucide-react";

import { SCENES, ROTATE_INTERVAL_MS } from "../data/scenes";
import { Navbar } from "../components/Navbar";
import { TopAiMoodBar } from "../components/TopAiMoodBar";
import { DynamicMasthead } from "../components/DynamicMasthead";
import { AudioPlayer } from "../components/AudioPlayer";
import { MiniVideoPlayer } from "../components/MiniVideoPlayer";
import { AiSuggestionHub } from "../components/AiSuggestionHub";
import { MedPomodoro } from "../components/MedPomodoro";
import { SceneGallery } from "../components/SceneGallery";
import { MEDICAL_SONGS } from "../data/medMedia";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Medical Hub & दवाख़ाना Lounge — 40 Medical Life Love Scenes, Study Lofi & AI Cinema",
      },
      {
        name: "description",
        content:
          "Universal sanctuary for MBBS, BDS, BSc Nursing & Medicos: 40 rotating hand-painted Indian medical scenes, 10-12 shayaris per scene, lo-fi study radio, YouTube medical cinema, and AI mood tuner.",
      },
      { property: "og:title", content: "Medical Hub & दवाख़ाना Lounge • Medical Life Love" },
      {
        property: "og:description",
        content:
          "40 rotating medical scenes, authentic Hindi shayaris, ambient study radio & AI movie suggestions for every healer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

export function playStethoscopePulse() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(65, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch {
    // AudioContext fallback
  }
}

function Index() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [rotationCount, setRotationCount] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zenMode, setZenMode] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  // Modal & Mini-Player toggles
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [isAiHubOpen, setIsAiHubOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const currentScene = (SCENES[sceneIndex] || SCENES[0])!;

  const nextScene = useCallback(() => {
    setSceneIndex((prev) => (prev + 1) % SCENES.length);
    setRotationCount((r) => r + 1);
    playStethoscopePulse();
  }, []);

  const prevScene = useCallback(() => {
    setSceneIndex((prev) => (prev - 1 + SCENES.length) % SCENES.length);
    setRotationCount((r) => r + 1);
    playStethoscopePulse();
  }, []);

  // 8-second interval auto-rotation
  useEffect(() => {
    if (!isAutoRotating) return;
    const timer = setInterval(() => {
      nextScene();
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isAutoRotating, nextScene]);

  // Dynamic AI Mood-Based Music Pipeline & Scene Re-tuning
  const handleApplyMood = (keyword: string) => {
    const kw = keyword.toLowerCase();
    playStethoscopePulse();

    if (kw.includes("love") || kw.includes("romance") || kw.includes("coat") || kw.includes("apron")) {
      setActiveTrackIndex(0); // Mujhse Mohabbat Ka Izhaar Karta
      setSceneIndex(0); // Lab coat master
    } else if (kw.includes("study") || kw.includes("neuro") || kw.includes("gray") || kw.includes("focus") || kw.includes("viva")) {
      setActiveTrackIndex(1); // Anatomy Nights Alpha Wave
      setSceneIndex(6); // Gray's 3 AM
    } else if (kw.includes("chai") || kw.includes("tapri") || kw.includes("relief") || kw.includes("samosa")) {
      setActiveTrackIndex(2); // Chai Tapri & Post-Viva Relief
      setSceneIndex(9); // GMC Tapri Chai
    } else if (kw.includes("casualty") || kw.includes("er") || kw.includes("trauma") || kw.includes("adrenalin") || kw.includes("emergency")) {
      setActiveTrackIndex(3); // Casualty 02:00 AM (Cardiac Flow)
      setSceneIndex(16); // Casualty at 02:00 AM
    } else if (kw.includes("convocation") || kw.includes("pride") || kw.includes("doctor") || kw.includes("degree")) {
      setActiveTrackIndex(4); // Five Years, One Apron
      setSceneIndex(19); // Convocation
    } else if (kw.includes("rain") || kw.includes("ghazal") || kw.includes("hostel") || kw.includes("sad")) {
      setActiveTrackIndex(5); // Dissection Hall Rain & Ambient Strings
      setSceneIndex(2); // Midnight Stardust
    } else {
      // General mood switch
      const nextIdx = Math.floor(Math.random() * SCENES.length);
      const nextTrack = Math.floor(Math.random() * MEDICAL_SONGS.length);
      setSceneIndex(nextIdx);
      setActiveTrackIndex(nextTrack);
    }
    setRotationCount((r) => r + 1);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowRight") {
        nextScene();
      } else if (e.key === "ArrowLeft") {
        prevScene();
      } else if (e.key === "z" || e.key === "Z") {
        setZenMode((z) => !z);
      } else if (e.key === "v" || e.key === "V") {
        setIsVideoPlayerOpen((v) => !v);
      } else if (e.key === "m" || e.key === "M") {
        setIsAiHubOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextScene, prevScene]);

  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkUnlockStatus = () => {
      // 1. Check URL param ?unlocked=true
      try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("unlocked") === "true") {
          localStorage.setItem("medical_hub_counseling_unlocked", "true");
          setIsUnlocked(true);
          window.history.replaceState({}, document.title, window.location.pathname);
          return;
        }
      } catch (e) {}

      if (localStorage.getItem("medical_hub_counseling_unlocked") === "true") {
        setIsUnlocked(true);
      }
    };

    checkUnlockStatus();

    // 1. Cross-window postMessage listener
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "UNLOCK_SUCCESS" || event.data === "UNLOCK_SUCCESS") {
        localStorage.setItem("medical_hub_counseling_unlocked", "true");
        setIsUnlocked(true);
      }
    };
    window.addEventListener("message", handleMessage);

    // 2. Tab focus & Storage event listeners
    window.addEventListener("focus", checkUnlockStatus);
    window.addEventListener("storage", checkUnlockStatus);

    // 3. BroadcastChannel listener fallback
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel("medical_hub_unlock_channel");
      channel.onmessage = (event) => {
        if (event.data?.type === "UNLOCK_SUCCESS") {
          localStorage.setItem("medical_hub_counseling_unlocked", "true");
          setIsUnlocked(true);
        }
      };
    } catch (e) {}

    checkUnlockStatus();

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("focus", checkUnlockStatus);
      window.removeEventListener("storage", checkUnlockStatus);
      if (channel) channel.close();
    };
  }, []);

  const handlePromptUnlock = () => {
    alert("Please fill the 1-minute counseling form to unlock all website features!");
    window.open("/form-filling/index.html", "_blank");
  };

  const handleProtectedAction = (action: () => void) => {
    if (!isUnlocked) {
      handlePromptUnlock();
      return;
    }
    action();
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-neutral-950 select-none">
      {/* 40 Rotating Background Artworks: 8s Cross-Dissolve + Subtle Cinematic Ken Burns */}
      {SCENES.map((scene, i) => (
        <div
          key={scene.id}
          className="scene-layer"
          data-active={i === sceneIndex ? "true" : "false"}
        >
          <img
            src={scene.src}
            alt={i === sceneIndex ? scene.alt : ""}
            aria-hidden={i !== sceneIndex}
            width={1920}
            height={1080}
            loading={i <= 2 ? "eager" : "lazy"}
            className="scene-image h-full w-full object-cover"
            style={{
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
          />
        </div>
      ))}

      {/* Cinematic Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/80" />

      {/* Ambient Glowing Border Outlining Effects (Replaced top moving bar) */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-colors duration-1000 border-2 sm:border-4 rounded-none shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"
        style={{
          borderColor: `${currentScene.accentHex}30`,
          boxShadow: `inset 0 0 60px ${currentScene.accentHex}20, 0 0 30px ${currentScene.accentHex}20`,
        }}
      />

      {/* Top Navbar */}
      <Navbar
        currentScene={currentScene}
        currentIndex={sceneIndex}
        totalScenes={SCENES.length}
        zenMode={zenMode}
        onToggleZenMode={() => setZenMode((z) => !z)}
        onOpenAiHub={() => handleProtectedAction(() => setIsAiHubOpen(true))}
        onOpenPomodoro={() => handleProtectedAction(() => setIsPomodoroOpen(true))}
        onOpenGallery={() => handleProtectedAction(() => setIsGalleryOpen(true))}
        onOpenVideoPlayer={() => handleProtectedAction(() => setIsVideoPlayerOpen((v) => !v))}
        isVideoPlayerOpen={isVideoPlayerOpen}
        isUnlocked={isUnlocked}
        onPromptUnlock={handlePromptUnlock}
      />

      {/* Top AI Mood Tuner Bar */}
      <TopAiMoodBar
        zenMode={zenMode}
        onApplyMood={(kw) => handleProtectedAction(() => handleApplyMood(kw))}
      />

      {/* Dynamic Masthead shifted upwards with 10-12 Rotating Shayaris */}
      <DynamicMasthead
        scene={currentScene}
        sceneIndex={sceneIndex}
        rotationCount={rotationCount}
        zenMode={zenMode}
      />

      {/* Left / Right Scene Navigators */}
      {!zenMode && (
        <>
          <button
            onClick={() => handleProtectedAction(prevScene)}
            aria-label="Previous scene"
            className="group fixed left-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-xl transition-all hover:scale-110 hover:border-amber-400 hover:bg-black/80 hover:text-white"
          >
            <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={() => handleProtectedAction(nextScene)}
            aria-label="Next scene"
            className="group fixed right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-xl transition-all hover:scale-110 hover:border-amber-400 hover:bg-black/80 hover:text-white"
          >
            <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {/* Pink "UNLOCK WEBSITE FEATURES" Button directly above Audio Player Bar */}
      {!isUnlocked && !zenMode && (
        <div className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-40 animate-bounce">
          <button
            onClick={handlePromptUnlock}
            className="flex items-center gap-1.5 sm:gap-2 rounded-full border-2 border-rose-400 bg-rose-500/95 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-black text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            title="Click to Fill 1-Minute Form & Unlock All Features"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-300 animate-spin" />
            <span className="font-mono tracking-wide uppercase">UNLOCK WEBSITE FEATURES</span>
          </button>
        </div>
      )}

      {/* Audio Player Bar */}
      <AudioPlayer
        currentScene={currentScene}
        zenMode={zenMode}
        activeTrackIndex={activeTrackIndex}
        onTrackChange={(idx) => setActiveTrackIndex(idx)}
        isUnlocked={isUnlocked}
      />

      {/* Floating Embedded YouTube Mini-Cinema Player Box */}
      <MiniVideoPlayer
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
      />

      {/* AI Suggestion Hub Modal */}
      <AiSuggestionHub
        isOpen={isAiHubOpen}
        onClose={() => setIsAiHubOpen(false)}
        onPlayTrack={(idx) => handleProtectedAction(() => setActiveTrackIndex(idx))}
      />

      {/* Med-Focus Pomodoro Modal */}
      <MedPomodoro
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
      />

      {/* 40 Scenes Gallery Modal */}
      <SceneGallery
        isOpen={isGalleryOpen}
        currentSceneIndex={sceneIndex}
        onSelectScene={(idx) => {
          setSceneIndex(idx);
          setRotationCount((r) => r + 1);
          playStethoscopePulse();
        }}
        onClose={() => setIsGalleryOpen(false)}
      />
    </main>
  );
}
