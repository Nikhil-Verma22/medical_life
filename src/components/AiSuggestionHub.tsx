import React, { useState } from "react";
import {
  Film,
  Music,
  BookOpen,
  Gamepad2,
  Bot,
  Search,
  ExternalLink,
  Play,
  Download,
  Star,
  Sparkles,
  Send,
  Copy,
  Check,
  X,
  Radio,
  Swords,
} from "lucide-react";
import {
  MEDICAL_MOVIES,
  MEDICAL_SONGS,
  MEDICAL_BOOKS,
  MEDICAL_GAMES,
  MedicalMovie,
  MedicalSong,
  MedicalBook,
  MedicalGame,
} from "../data/medMedia";

interface AiSuggestionHubProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayTrack?: (index: number) => void;
  onOpenChessGame?: () => void;
}

export function AiSuggestionHub({ isOpen, onClose, onPlayTrack, onOpenChessGame }: AiSuggestionHubProps) {
  const [activeTab, setActiveTab] = useState<"movies" | "songs" | "books" | "games" | "ai_ask">("movies");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // AI Chatbot State with strict guardrails
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "ai"; content: string; isGuardrailWarning?: boolean }[]
  >([
    {
      role: "ai",
      content:
        "Welcome Healer! I am your AI Medical Recommender. Ask me for recommendations on Medical Movies, MBBS Anthems, Medical Books, or Surgery Games for any mood or clinical feeling!",
    },
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  // Filter movies
  const filteredMovies = MEDICAL_MOVIES.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      (m.hindiTitle && m.hindiTitle.toLowerCase().includes(q)) ||
      m.medicalTheme.toLowerCase().includes(q) ||
      m.moodTag.toLowerCase().includes(q) ||
      m.genres.some((g) => g.toLowerCase().includes(q))
    );
  });

  // Filter songs
  const filteredSongs = MEDICAL_SONGS.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.medVibe.toLowerCase().includes(q) ||
      s.mood.toLowerCase().includes(q)
    );
  });

  // Filter books
  const filteredBooks = MEDICAL_BOOKS.filter((b) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.subjectOrNotion.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q)
    );
  });

  // Filter games
  const filteredGames = MEDICAL_GAMES.filter((g) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      g.title.toLowerCase().includes(q) ||
      g.developer.toLowerCase().includes(q) ||
      g.genre.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q)
    );
  });

  // Strict AI Recommendation Guardrail Logic
  const handleSendAiPrompt = () => {
    if (!aiPrompt.trim() || isGenerating) return;

    const userText = aiPrompt.trim();
    setChatHistory((prev) => [...prev, { role: "user", content: userText }]);
    setAiPrompt("");
    setIsGenerating(true);

    setTimeout(() => {
      const q = userText.toLowerCase();

      // Check if prompt is completely unrelated to medical recommendations
      const isRecommendationQuery =
        q.includes("movie") ||
        q.includes("song") ||
        q.includes("music") ||
        q.includes("qawwali") ||
        q.includes("book") ||
        q.includes("read") ||
        q.includes("game") ||
        q.includes("play") ||
        q.includes("chess") ||
        q.includes("recommend") ||
        q.includes("suggest") ||
        q.includes("study") ||
        q.includes("viva") ||
        q.includes("stress") ||
        q.includes("hostel") ||
        q.includes("surgery") ||
        q.includes("med") ||
        q.includes("mbbs");

      const isNonMedicalTopic =
        q.includes("recipe") ||
        q.includes("food") ||
        q.includes("crypto") ||
        q.includes("python") ||
        q.includes("javascript") ||
        q.includes("cricket") ||
        q.includes("politic");

      if (isNonMedicalTopic || !isRecommendationQuery) {
        setChatHistory((prev) => [
          ...prev,
          {
            role: "ai",
            isGuardrailWarning: true,
            content:
              "⚠️ Notice: I am an AI Recommender dedicated ONLY to recommending Medical Movies, Anthems/Songs, Medical Books, and Surgery Games for medical students and healers. Please ask me for recommendations in these 4 areas!",
          },
        ]);
      } else {
        // Generate contextual recommendation
        let matchedMovie = MEDICAL_MOVIES[0]!;
        let matchedSong = MEDICAL_SONGS[0]!;
        let matchedBook = MEDICAL_BOOKS[0]!;
        let matchedGame = MEDICAL_GAMES[0]!;

        if (q.includes("surg") || q.includes("ot") || q.includes("operation")) {
          matchedMovie = (MEDICAL_MOVIES.find((m) => m.id === "gifted-hands") ?? MEDICAL_MOVIES[4])!;
          matchedBook = (MEDICAL_BOOKS.find((b) => b.id === "complications-gawande") ?? MEDICAL_BOOKS[5])!;
          matchedGame = (MEDICAL_GAMES.find((g) => g.id === "surgeon-simulator-2013") ?? MEDICAL_GAMES[0])!;
        } else if (q.includes("stress") || q.includes("viva") || q.includes("panic")) {
          matchedMovie = (MEDICAL_MOVIES.find((m) => m.id === "munna-bhai-mbbs") ?? MEDICAL_MOVIES[0])!;
          matchedBook = (MEDICAL_BOOKS.find((b) => b.id === "the-house-of-god") ?? MEDICAL_BOOKS[4])!;
        } else if (q.includes("patho") || q.includes("disease") || q.includes("virus")) {
          matchedMovie = (MEDICAL_MOVIES.find((m) => m.id === "awakenings") ?? MEDICAL_MOVIES[3])!;
          matchedBook = (MEDICAL_BOOKS.find((b) => b.id === "robbins-pathology") ?? MEDICAL_BOOKS[1])!;
          matchedGame = (MEDICAL_GAMES.find((g) => g.id === "plague-inc") ?? MEDICAL_GAMES[2])!;
        }

        const reply = `🩺 **AI Medical Prescription for "${userText}":**\n\n🎬 **Movie Pick**: *${matchedMovie.title}* (${matchedMovie.year}) — ${matchedMovie.medicalTheme}. Watch free on ${matchedMovie.watchPlatform}.\n\n🎵 **Anthem Pick**: *${matchedSong.title}* — ${matchedSong.medVibe}\n\n📚 **Book Pick**: *${matchedBook.title}* by ${matchedBook.author} — ${matchedBook.summary}\n\n🎮 **Game Pick**: *${matchedGame.title}* (${matchedGame.genre}) — Available on ${matchedGame.platformBadge}.`;

        setChatHistory((prev) => [...prev, { role: "ai", content: reply }]);
      }
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6 animate-in fade-in duration-200">
      <div className="relative flex h-[92vh] w-full max-w-6xl flex-col rounded-3xl border border-white/20 bg-neutral-950/95 text-white shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-amber-400/50 bg-amber-400/20 text-amber-300 shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-mono text-base font-black text-amber-300 uppercase tracking-wide">
                AI PRESCRIPTIONS PORTAL
              </h2>
              <p className="text-[11px] text-white/70">
                Medical Movies • MBBS Anthems • Books • Games • AI Recommender
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Tabs (5 Sections) */}
        <div className="flex border-b border-white/10 bg-black/40 px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("movies")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "movies"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <Film className="h-3.5 w-3.5 text-rose-400" />
            <span>Medical Movies ({filteredMovies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("songs")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "songs"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <Music className="h-3.5 w-3.5 text-amber-400" />
            <span>MBBS Anthems ({filteredSongs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("books")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "books"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
            <span>Medical Books ({filteredBooks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("games")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "games"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <Gamepad2 className="h-3.5 w-3.5 text-indigo-400" />
            <span>Medical Games ({filteredGames.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("ai_ask")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === "ai_ask"
                ? "border-amber-400 text-amber-300"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            <Bot className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
            <span>Ask AI Recommender</span>
          </button>
        </div>

        {/* Global Search Bar */}
        {activeTab !== "ai_ask" && (
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
              <input
                type="text"
                placeholder={`Search ${activeTab} by title, mood (e.g. '3 AM panic', 'surgery'), or theme...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-neutral-900/90 pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-amber-400 focus:outline-none"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-amber-300 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* TAB 1: 🎬 MEDICAL MOVIES */}
        {activeTab === "movies" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMovies.map((m) => (
                <div
                  key={m.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-neutral-900/90 p-4 transition-all duration-300 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5">
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                          {m.title}
                        </h4>
                        {m.hindiTitle && (
                          <p className="font-hindi text-xs text-amber-200/80">{m.hindiTitle}</p>
                        )}
                      </div>
                      <span className="rounded-full bg-rose-500/20 border border-rose-400/40 px-2 py-0.5 font-mono text-[9px] font-bold text-rose-300 flex-none">
                        ★ {m.imdbRating}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2 text-[10px] text-white/60">
                      <span>{m.year}</span>
                      <span>•</span>
                      <span>{m.runtime}</span>
                      <span>•</span>
                      <span className="truncate text-amber-300/90 font-medium">
                        {m.genres.join(", ")}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-white/80 line-clamp-2">{m.synopsis}</p>

                    <div className="mt-3 rounded-xl bg-black/40 border border-white/10 p-2 text-[11px] text-amber-100/90">
                      <span className="font-semibold text-amber-400">Theme: </span>
                      {m.medicalTheme}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-white/50">Watch on: {m.watchPlatform}</span>
                    <a
                      href={m.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-3 py-1.5 text-xs font-bold text-neutral-950 shadow transition-all hover:bg-amber-300 hover:scale-105 active:scale-95"
                    >
                      <span>Watch Free</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 🎵 MBBS ANTHEMS */}
        {activeTab === "songs" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSongs.slice(0, 90).map((s, idx) => {
                const originalIndex = MEDICAL_SONGS.findIndex((orig) => orig.id === s.id);
                return (
                  <div
                    key={s.id}
                    className="group relative flex items-center justify-between rounded-2xl border border-white/15 bg-neutral-900/90 p-3.5 transition-all hover:border-amber-400/50 hover:bg-neutral-900 hover:-translate-y-0.5"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-400/20 border border-amber-400/40 px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-300 uppercase">
                          {s.language}
                        </span>
                        <h4 className="truncate font-bold text-xs text-white group-hover:text-amber-300">
                          {s.title}
                        </h4>
                      </div>
                      <p className="truncate text-[11px] text-white/60 mt-0.5">{s.artist}</p>
                      <p className="truncate text-[10px] text-amber-200/80 mt-1 italic">
                        "{s.medVibe}"
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onPlayTrack?.(originalIndex >= 0 ? originalIndex : 0);
                        onClose();
                      }}
                      title="Play Ad-Free Anthem"
                      className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-amber-400 text-neutral-950 shadow-md transition-all hover:scale-110 hover:bg-amber-300 active:scale-95"
                    >
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: 📚 MEDICAL BOOKS */}
        {activeTab === "books" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col justify-between rounded-2xl border border-white/15 bg-neutral-900/90 p-4 transition-all hover:border-emerald-400/50 hover:bg-neutral-900"
                >
                  <div>
                    <div className="flex items-start justify-between border-b border-white/10 pb-2">
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                        {b.category}
                      </span>
                      <span className="text-[10px] text-amber-300 font-bold">★ {b.rating}</span>
                    </div>

                    <h4 className="mt-2.5 font-bold text-sm text-white">{b.title}</h4>
                    <p className="text-xs text-white/60">By {b.author}</p>
                    <p className="mt-2 text-xs text-white/80 line-clamp-3">{b.summary}</p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-300/80">{b.subjectOrNotion}</span>
                    <a
                      href={b.readUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-bold text-neutral-950 shadow hover:bg-emerald-400 transition-all"
                    >
                      <span>Read / Library</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: 🎮 MEDICAL GAMES & SURGERY SIMULATORS */}
        {activeTab === "games" && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            {/* Featured Playable Game: ILAAJ-E-MAAT */}
            <div className="mb-5 rounded-3xl border-2 border-rose-400/60 bg-gradient-to-r from-rose-500/20 via-neutral-900 to-neutral-900 p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg">
                  <Swords className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono font-black text-base text-rose-300 uppercase tracking-wide">
                      ILAAJ-E-MAAT (Medical Lounge Chess)
                    </h3>
                    <span className="rounded bg-rose-500/30 border border-rose-400/60 px-2 py-0.5 text-[9px] font-black text-rose-200">
                      FEATURED
                    </span>
                  </div>
                  <p className="text-xs text-white/80 mt-1">
                    Play Stockfish AI, Pass & Play, and Online Challenge in dedicated standalone web sanctuary!
                  </p>
                </div>
              </div>
              <a
                href="/vibechess/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl bg-rose-500 px-5 py-2.5 text-xs font-black text-white shadow-lg hover:bg-rose-400 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
              >
                <Swords className="h-4 w-4" />
                <span>Play ILAAJ-E-MAAT</span>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGames.map((g) => (
                <div
                  key={g.id}
                  className="flex flex-col justify-between rounded-2xl border border-white/15 bg-neutral-900/90 p-4 transition-all hover:border-indigo-400/50 hover:bg-neutral-900"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="rounded-full bg-indigo-500/20 border border-indigo-400/40 px-2 py-0.5 font-mono text-[9px] font-bold text-indigo-300">
                        {g.genre}
                      </span>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] font-bold text-amber-300">
                        {g.platformBadge}
                      </span>
                    </div>

                    <h4 className="mt-2.5 font-bold text-sm text-white">{g.title}</h4>
                    <p className="text-xs text-white/60">Dev: {g.developer}</p>
                    <p className="mt-2 text-xs text-white/80 line-clamp-3">{g.description}</p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-amber-300 font-bold">★ {g.rating}</span>
                    <a
                      href={g.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-indigo-400 transition-all"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download on {g.platformBadge}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: 🤖 ASK AI RECOMMENDER */}
        {activeTab === "ai_ask" && (
          <div className="flex flex-1 flex-col overflow-hidden p-4 sm:p-6">
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 custom-scrollbar">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed shadow-lg ${
                      msg.role === "user"
                        ? "bg-amber-400 text-neutral-950 font-medium"
                        : msg.isGuardrailWarning
                        ? "bg-rose-950/80 border border-rose-500/50 text-rose-200"
                        : "bg-neutral-900 border border-white/15 text-white"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    {msg.role === "ai" && !msg.isGuardrailWarning && (
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="mt-2 flex items-center gap-1 text-[10px] text-amber-300 hover:underline"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="h-3 w-3" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy Prescription
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
              <input
                type="text"
                placeholder="Ask AI for Medical Movies, Anthems, Books, or Surgery Games..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAiPrompt()}
                className="flex-1 rounded-2xl border border-white/15 bg-neutral-900 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:border-amber-400 focus:outline-none"
              />
              <button
                onClick={handleSendAiPrompt}
                disabled={isGenerating}
                className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-400 text-neutral-950 shadow hover:bg-amber-300 disabled:opacity-50 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
