import React, { useState } from "react";
import {
  Film,
  Music,
  Sparkles,
  Search,
  Filter,
  Star,
  Clock,
  GraduationCap,
  Heart,
  Send,
  Copy,
  Check,
  X,
  Stethoscope,
  BookOpen,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import {
  MEDICAL_MOVIES,
  MEDICAL_SONGS,
  MED_MOOD_PROMPTS,
  MedicalMovie,
  MedicalSong,
} from "../data/medMedia";

interface AiSuggestionHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiSuggestionHub({ isOpen, onClose }: AiSuggestionHubProps) {
  const [activeTab, setActiveTab] = useState<"movies" | "songs" | "ai_ask">("movies");
  const [selectedMbbsYear, setSelectedMbbsYear] = useState<string>("All");
  const [selectedMood, setSelectedMood] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // AI Ask Tab State
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [aiSelectedYear, setAiSelectedYear] = useState<string>("2nd Year (Para-Clinical)");
  const [aiSelectedMood, setAiSelectedMood] = useState<string>("Pre-Viva Stress & Need Motivation");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<{
    summary: string;
    movieRecommendations: { title: string; theme: string; reason: string; year: string }[];
    songRecommendations: { title: string; vibe: string; bestFor: string }[];
    clinicalTip: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter movies
  const filteredMovies = MEDICAL_MOVIES.filter((m) => {
    const matchesYear =
      selectedMbbsYear === "All" ||
      m.mbbsYear === "All MBBS Years" ||
      m.mbbsYear.includes(selectedMbbsYear);
    const matchesMood = selectedMood === "All" || m.moodTag === selectedMood;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.hindiTitle && m.hindiTitle.includes(searchQuery)) ||
      m.medicalTheme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesYear && matchesMood && matchesSearch;
  });

  // Filter songs
  const filteredSongs = MEDICAL_SONGS.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.medVibe.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.mood.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Generate AI Suggestions Handler
  const handleGenerateAi = () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setAiResponse(null);

    setTimeout(() => {
      // Intelligent contextual AI simulation based on query keywords
      const queryLower = aiPrompt.toLowerCase();
      let matchedMovie = MEDICAL_MOVIES[0];
      if (queryLower.includes("surg") || queryLower.includes("heart") || queryLower.includes("ot")) {
        matchedMovie = MEDICAL_MOVIES.find((m) => m.id === "something-the-lord-made") ?? MEDICAL_MOVIES[4];
      } else if (queryLower.includes("stress") || queryLower.includes("viva") || queryLower.includes("exam")) {
        matchedMovie = MEDICAL_MOVIES.find((m) => m.id === "munna-bhai-mbbs") ?? MEDICAL_MOVIES[0];
      } else if (queryLower.includes("neuro") || queryLower.includes("brain") || queryLower.includes("patho")) {
        matchedMovie = MEDICAL_MOVIES.find((m) => m.id === "awakenings") ?? MEDICAL_MOVIES[3];
      } else if (queryLower.includes("casualty") || queryLower.includes("er") || queryLower.includes("trauma")) {
        matchedMovie = MEDICAL_MOVIES.find((m) => m.id === "code-black") ?? MEDICAL_MOVIES[10];
      } else {
        matchedMovie = MEDICAL_MOVIES.find((m) => m.id === "patch-adams") ?? MEDICAL_MOVIES[1];
      }

      setAiResponse({
        summary: `Prescription for "${aiPrompt}" [${aiSelectedYear} • ${aiSelectedMood}]: Here is your tailored audio-visual dosage to reset your synapses and reignite clinical drive.`,
        movieRecommendations: [
          {
            title: matchedMovie.title,
            year: `${matchedMovie.year}`,
            theme: matchedMovie.medicalTheme,
            reason: matchedMovie.medicoTakeaway,
          },
          {
            title: "Doctor G (2022)",
            year: "2022",
            theme: "Government Medical College Residency & Humility",
            reason: "Grounding comedy reminding you that all medical specialties require letting go of preconceived egos.",
          },
        ],
        songRecommendations: [
          {
            title: "Anatomy Nights (Alpha Wave Lo-Fi)",
            vibe: "432 Hz Binaural beats layered with gentle acoustic sitar for neuro-retention.",
            bestFor: "Absorbing high-yield pharmacology tables & Gray's diagrams.",
          },
          {
            title: "Chai Tapri & Post-Viva Relief",
            vibe: "Warm hostel acoustic strums with rain petrichor background.",
            bestFor: "Decompressing after a demanding ward posting or professor grilling.",
          },
        ],
        clinicalTip:
          "Remember Sir William Osler's maxim: 'The practice of medicine is an art, not a trade; a calling in which your heart will be exercised equally with your head.' Take a 15-minute tea break, hydrate, and return to the syllabus.",
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopyAiResponse = () => {
    if (!aiResponse) return;
    const text = `MBBS AI Recommendation:\n${aiResponse.summary}\n\n🎬 Movies:\n${aiResponse.movieRecommendations.map((m) => `• ${m.title} (${m.year}) - ${m.theme}\n  Why: ${m.reason}`).join("\n")}\n\n🎵 Songs:\n${aiResponse.songRecommendations.map((s) => `• ${s.title} - ${s.vibe}`).join("\n")}\n\n💡 Clinical Tip:\n${aiResponse.clinicalTip}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 backdrop-blur-md sm:p-6 animate-in fade-in duration-200">
      <div className="relative flex h-[90vh] w-full max-w-5xl flex-col rounded-3xl border border-white/20 bg-neutral-950/95 text-white shadow-2xl backdrop-blur-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 text-neutral-950 shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                  AI Medico Cinema & Melody Lounge
                </h2>
                <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                  AI-Ready
                </span>
              </div>
              <p className="text-xs text-white/60">
                Curated medical cinema, student study anthems & intelligent recommendations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:bg-white/15 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-3 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("movies")}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "movies"
                  ? "bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Film className="h-4 w-4" />
              <span>Medical Movies ({MEDICAL_MOVIES.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("songs")}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "songs"
                  ? "bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Music className="h-4 w-4" />
              <span>MBBS Anthems ({MEDICAL_SONS_COUNT})</span>
            </button>

            <button
              onClick={() => setActiveTab("ai_ask")}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-semibold transition-all ${
                activeTab === "ai_ask"
                  ? "bg-gradient-to-r from-amber-400 via-rose-400 to-indigo-400 text-neutral-950 shadow-lg"
                  : "bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-400/30 text-amber-200 hover:bg-amber-400/20"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Ask AI Recommender</span>
            </button>
          </div>

          {activeTab !== "ai_ask" && (
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, themes, topics..."
                className="w-full rounded-xl border border-white/15 bg-black/40 pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:border-amber-400 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {/* TAB 1: MEDICAL MOVIES */}
          {activeTab === "movies" && (
            <div className="space-y-6">
              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <GraduationCap className="h-3.5 w-3.5 text-amber-300" />
                  <span>MBBS Year:</span>
                </div>
                {["All", "1st Year", "2nd Year", "Final Year", "Internship"].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedMbbsYear(yr)}
                    className={`rounded-xl px-3 py-1 text-xs font-medium transition-all ${
                      selectedMbbsYear === yr
                        ? "bg-white text-neutral-950 font-bold"
                        : "bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {yr}
                  </button>
                ))}

                <span className="h-4 w-px bg-white/20" />

                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <Heart className="h-3.5 w-3.5 text-rose-400" />
                  <span>Mood:</span>
                </div>
                {["All", "Inspirational", "Lighthearted & Comedy", "High Stakes ER / Surgery", "Mind & Psychiatry"].map(
                  (m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMood(m)}
                      className={`rounded-xl px-3 py-1 text-xs font-medium transition-all ${
                        selectedMood === m
                          ? "bg-amber-400 text-neutral-950 font-bold"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {m}
                    </button>
                  )
                )}
              </div>

              {/* Movie Cards Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:bg-white/[0.06] hover:shadow-xl group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                              {movie.title}
                            </h3>
                            {movie.hindiTitle && (
                              <span className="font-hindi text-sm text-amber-200/80">
                                ({movie.hindiTitle})
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60">
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {movie.runtime}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-amber-300 font-semibold">
                              <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                              {movie.imdbRating}
                            </span>
                          </div>
                        </div>

                        <span className="rounded-full bg-amber-400/15 border border-amber-400/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-200">
                          {movie.moodTag}
                        </span>
                      </div>

                      {/* Medical Theme */}
                      <div className="mt-3 rounded-2xl bg-white/5 p-2.5 border border-white/10">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
                          <Stethoscope className="h-3.5 w-3.5" />
                          <span>Medical Theme:</span>
                        </div>
                        <p className="mt-0.5 text-xs text-white/90 font-medium">
                          {movie.medicalTheme}
                        </p>
                      </div>

                      {/* Synopsis */}
                      <p className="mt-3 text-xs text-white/75 leading-relaxed">
                        {movie.synopsis}
                      </p>

                      {/* Medico Takeaway */}
                      <div className="mt-3 border-l-2 border-amber-400 pl-3">
                        <p className="text-[11px] font-semibold text-amber-200">
                          Why Every Med Student Should Watch:
                        </p>
                        <p className="text-xs text-white/80 italic mt-0.5">
                          "{movie.medicoTakeaway}"
                        </p>
                      </div>

                      {/* Quote */}
                      <p className="mt-3 font-hindi text-xs text-white/60 bg-black/30 rounded-xl px-3 py-1 border border-white/5">
                        "{movie.quote}"
                      </p>
                    </div>

                    {/* Tags & Year Relevance */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px]">
                      <span className="rounded-lg bg-indigo-500/20 px-2 py-0.5 text-indigo-300 font-medium">
                        🎓 {movie.mbbsYear}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {movie.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/50"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MEDICAL SONGS */}
          {activeTab === "songs" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredSongs.map((song, i) => (
                  <div
                    key={song.id}
                    className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.03] p-5 backdrop-blur-md hover:border-amber-400/40 hover:bg-white/[0.06] transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-xs font-bold text-amber-300">
                            TRACK {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-bold text-base text-white mt-0.5">{song.title}</h3>
                          <p className="text-xs text-white/60">{song.artist} • {song.album}</p>
                        </div>
                        <span className="rounded-full bg-indigo-500/20 border border-indigo-400/30 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-200">
                          {song.mood}
                        </span>
                      </div>

                      {/* Medico Vibe Description */}
                      <p className="mt-3 text-xs text-amber-100/90 bg-black/40 rounded-xl p-2.5 border border-white/5">
                        🎧 <strong>Medico Vibe:</strong> {song.medVibe}
                      </p>

                      {/* Hindi Lyrics Snippet */}
                      <p className="mt-2 font-hindi text-xs text-white/70 italic px-2">
                        "{song.lyricsSnippet}"
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/50">
                      <span>Duration: {song.duration}</span>
                      <span className="text-amber-300 font-semibold">Available in Player Bar ↓</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ASK AI RECOMMENDER */}
          {activeTab === "ai_ask" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-indigo-500/10 p-6 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-300" />
                  <h3 className="font-bold text-base text-white">
                    AI Clinical Suggestion Engine
                  </h3>
                </div>
                <p className="mt-1 text-xs text-white/70">
                  Tell the AI your current state, upcoming vivas, or hostel mood to get tailored film prescriptions and study frequencies.
                </p>

                {/* Quick Preset Chips */}
                <div className="mt-4">
                  <p className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                    Quick Clinical Prescriptions:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {MED_MOOD_PROMPTS.map((promptText, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAiPrompt(promptText)}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-left text-xs text-white/80 hover:border-amber-400/40 hover:bg-white/10 hover:text-white transition-all"
                      >
                        ⚡ {promptText}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selectors */}
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-medium text-white/70">
                      Your MBBS Year / Stage:
                    </label>
                    <select
                      value={aiSelectedYear}
                      onChange={(e) => setAiSelectedYear(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="1st Year (Pre-Clinical: Anat/Phys/Biochem)">
                        1st Year (Anatomy / Physio / Biochem)
                      </option>
                      <option value="2nd Year (Para-Clinical: Path/Pharm/Micro/Forensic)">
                        2nd Year (Pathology / Pharma / Micro)
                      </option>
                      <option value="Final Year (Clinical: Med/Surg/Obs-Gyn/Peds)">
                        Final Year (Medicine / Surgery / Peds)
                      </option>
                      <option value="Internship & Duty Shift">
                        Internship & Duty Shift
                      </option>
                      <option value="NEET-PG / USMLE Aspirant">
                        NEET-PG / USMLE Aspirant
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-white/70">
                      Emotional State / Need:
                    </label>
                    <select
                      value={aiSelectedMood}
                      onChange={(e) => setAiSelectedMood(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Pre-Viva Stress & Need Motivation">
                        Pre-Viva Stress & Need Motivation
                      </option>
                      <option value="Exhausted after 36h Ward Posting">
                        Exhausted after 36h Ward Posting
                      </option>
                      <option value="Deep 3 AM High-Yield Focus">
                        Deep 3 AM High-Yield Focus
                      </option>
                      <option value="Surviving First Surgery Postings">
                        Surviving First Surgery Postings
                      </option>
                      <option value="Nostalgic GMC Hostel Vibe">
                        Nostalgic GMC Hostel Vibe
                      </option>
                    </select>
                  </div>
                </div>

                {/* Custom Prompt Box */}
                <div className="mt-4">
                  <label className="text-[11px] font-medium text-white/70">
                    Describe your prompt or specific query:
                  </label>
                  <div className="mt-1 flex gap-2">
                    <textarea
                      rows={2}
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., Suggest a movie showing how brilliant surgeons think, and 2 lo-fi tracks to keep me awake for Harrison's..."
                      className="flex-1 rounded-2xl border border-white/15 bg-black/60 p-3 text-xs text-white placeholder:text-white/40 focus:border-amber-400 focus:outline-none custom-scrollbar"
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateAi}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 py-3 text-xs font-bold text-neutral-950 shadow-lg shadow-amber-400/20 hover:bg-amber-300 disabled:opacity-50 transition-all active:scale-[0.99]"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 animate-spin text-neutral-950" />
                      <span>Synthesizing AI Medical Prescription...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Generate AI Prescription</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Generated Result Card */}
              {aiResponse && (
                <div className="rounded-3xl border border-emerald-400/30 bg-emerald-950/20 p-6 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                      <h4 className="font-bold text-sm text-emerald-300">
                        AI Prescription Response
                      </h4>
                    </div>

                    <button
                      onClick={handleCopyAiResponse}
                      className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Dosage</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-white/90 leading-relaxed font-medium">
                    {aiResponse.summary}
                  </p>

                  {/* Recommended Movies */}
                  <div>
                    <h5 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Film className="h-3.5 w-3.5" />
                      Recommended Cinema:
                    </h5>
                    <div className="mt-2 space-y-2">
                      {aiResponse.movieRecommendations.map((m, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-white/10 bg-black/40 p-3"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-xs text-white">
                              {m.title} ({m.year})
                            </p>
                            <span className="text-[10px] text-amber-200/90 font-mono">
                              {m.theme}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-white/75 italic">"{m.reason}"</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Songs */}
                  <div>
                    <h5 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Music className="h-3.5 w-3.5" />
                      Recommended Frequencies:
                    </h5>
                    <div className="mt-2 space-y-2">
                      {aiResponse.songRecommendations.map((s, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-white/10 bg-black/40 p-3"
                        >
                          <p className="font-bold text-xs text-white">{s.title}</p>
                          <p className="text-[11px] text-white/75 mt-0.5">{s.vibe}</p>
                          <span className="inline-block mt-1 text-[10px] text-emerald-300 font-semibold">
                            🎯 Ideal For: {s.bestFor}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Tip */}
                  <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-3">
                    <p className="text-[11px] font-bold text-amber-300">💡 Daily Clinical Reminder:</p>
                    <p className="text-xs text-white/90 mt-1 italic leading-relaxed">
                      {aiResponse.clinicalTip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const MEDICAL_SONS_COUNT = MEDICAL_SONGS.length;
