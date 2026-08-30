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

export interface PrescriptionMovie {
  id?: string;
  title: string;
  year?: number;
  director?: string;
  medicalTheme: string;
  moodTag?: string;
  imdbRating?: string;
  watchPlatform: string;
  watchUrl: string;
  recommendationReason?: string;
  medicoTakeaway?: string;
}

export interface PrescriptionSong {
  id?: string;
  title: string;
  artist: string;
  medVibe: string;
  mood?: string;
  duration?: string;
  youtubeId?: string;
  recommendationReason?: string;
}

export interface PrescriptionBook {
  id?: string;
  title: string;
  author: string;
  subjectOrNotion?: string;
  category?: string;
  rating?: string;
  readUrl: string;
  summary?: string;
  recommendationReason?: string;
}

export interface PrescriptionGame {
  id?: string;
  title: string;
  genre: string;
  platformBadge: string;
  rating?: string;
  downloadUrl: string;
  description?: string;
  recommendationReason?: string;
}

export interface PrescriptionResult {
  analysis: string;
  chatMessage?: string;
  mentorNote?: string;
  requestedCategory?: "movie" | "song" | "book" | "game" | "all";
  movies?: PrescriptionMovie[];
  songs?: PrescriptionSong[];
  books?: PrescriptionBook[];
  games?: PrescriptionGame[];
  isGuardrailWarning?: boolean;
  modelUsed?: string;
  rawText?: string;
}

// Cascading Model Fallback Order
const MODEL_CASCADE = [
  "gemini-3.1-flash-lite", // Primary: Ultra-fast & efficient
  "gemini-3.5-flash",      // Fallback #1: Rich reasoning
  "gemini-3.6-flash",      // Fallback #2: Advanced flash
  "gemini-flash-latest",   // Fallback #3: Latest production flash
];

/**
 * Detect what specific category the user is asking for
 */
export function detectCategoryIntent(query: string): "movie" | "song" | "book" | "game" | "all" {
  const q = query.toLowerCase();

  const isMovie =
    q.includes("movie") ||
    q.includes("movies") ||
    q.includes("film") ||
    q.includes("films") ||
    q.includes("cinema") ||
    q.includes("docu") ||
    q.includes("watch") ||
    q.includes("series") ||
    q.includes("show");

  const isSong =
    q.includes("song") ||
    q.includes("songs") ||
    q.includes("music") ||
    q.includes("anthem") ||
    q.includes("anthems") ||
    q.includes("qawwali") ||
    q.includes("track") ||
    q.includes("tracks") ||
    q.includes("listen") ||
    q.includes("lofi") ||
    q.includes("playlist") ||
    q.includes("audio");

  const isBook =
    q.includes("book") ||
    q.includes("books") ||
    q.includes("read") ||
    q.includes("reading") ||
    q.includes("textbook") ||
    q.includes("textbooks") ||
    q.includes("novel") ||
    q.includes("novels") ||
    q.includes("memoir") ||
    q.includes("author") ||
    q.includes("literature") ||
    q.includes("robbins") ||
    q.includes("guyton") ||
    q.includes("harrison") ||
    q.includes("chaurasia");

  const isGame =
    q.includes("game") ||
    q.includes("games") ||
    q.includes("play") ||
    q.includes("gaming") ||
    q.includes("simulator") ||
    q.includes("chess") ||
    q.includes("steam");

  const count = (isMovie ? 1 : 0) + (isSong ? 1 : 0) + (isBook ? 1 : 0) + (isGame ? 1 : 0);

  if (count === 1) {
    if (isMovie) return "movie";
    if (isSong) return "song";
    if (isBook) return "book";
    if (isGame) return "game";
  }

  return "all";
}

/**
 * Server-Side Gemini API Caller
 */
async function callGeminiCascadeServer(prompt: string, systemInstruction: string, apiKey: string): Promise<{ text: string; model: string }> {
  for (const model of MODEL_CASCADE) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1500,
          responseMimeType: "application/json",
        },
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { text, model };
        }
      } else {
        console.warn(`[Gemini Cascade Server] Model ${model} returned status ${res.status}. Trying next fallback...`);
      }
    } catch (err) {
      console.warn(`[Gemini Cascade Server] Error calling model ${model}:`, err);
    }
  }

  throw new Error("All Gemini cascade models failed or network unavailable.");
}

/**
 * Server-Only AI Prescription Generator
 */
export async function generateServerAiPrescription(userQuery: string, apiKey: string): Promise<PrescriptionResult> {
  const q = userQuery.trim().toLowerCase();

  const isNonMedicalTopic =
    q.includes("recipe") ||
    q.includes("food recipe") ||
    q.includes("crypto") ||
    q.includes("bitcoin") ||
    q.includes("cricket score") ||
    q.includes("politic");

  if (isNonMedicalTopic) {
    return {
      analysis: "Medical Scope Guardrail",
      chatMessage: "I am an **AI Clinical Mentor** dedicated strictly to prescribing Medical Movies, MBBS Study Anthems, Clinical Books, and Surgery Games for medicos. Please share what you are studying or feeling in your medical journey!",
      isGuardrailWarning: true,
    };
  }

  const categoryIntent = detectCategoryIntent(userQuery);

  if (!apiKey) {
    return getLocalSmartFallback(userQuery, categoryIntent);
  }

  const systemInstruction = `You are the Chief AI Medical Life Mentor & Entertainment Prescriptions Engine on Medical Hub.
Your purpose is to prescribe tailored entertainment, study music, clinical textbooks/memoirs, and medical games to MBBS students, interns, and doctors.
CRITICAL INSTRUCTION:
1. Detect what the user is asking for:
   - If user asks for MOVIES: recommend 2-4 real, high-quality medical movies, series, or documentaries.
   - If user asks for BOOKS: recommend 2-4 real, authoritative clinical textbooks, revision guides, or doctor memoirs.
   - If user asks for SONGS: recommend 2-4 focus tracks, classical pieces, study anthems, or qawwalis.
   - If user asks for GAMES: recommend 2-4 surgery simulators, hospital management games, or medical chess.
   - If user asks a general mood / full prescription: recommend 1 movie, 1 song, 1 book, and 1 game.

2. Structure & Formatting:
   - "analysis": Short 3-6 word punchy headline title (e.g. "Forensic Pathological Cinema Picks" or "Pharmacology Core Reading Guide").
   - "chatMessage": Write a rich, conversational doctor-to-doctor response using markdown with **bold titles**, *italics*, and honest reflection on the match quality.
   - "movies", "songs", "books", "games": Return full detailed objects with title, year/author/artist, medicalTheme/vibe, reason, and best platform (e.g. Netflix, YouTube, OpenLibrary, Steam, Prime Video).

Always return response in valid JSON matching this schema:
{
  "analysis": "Short 3-6 word headline title",
  "chatMessage": "Conversational mentor message in markdown with **bolding** and clear paragraphs.",
  "mentorNote": "A motivating clinical insight or shayari for the healer",
  "requestedCategory": "movie" | "song" | "book" | "game" | "all",
  "movies": [
    {
      "title": "Title of Movie/Show",
      "year": 2019,
      "medicalTheme": "Key medical specialty or theme",
      "imdbRating": "7.8/10",
      "watchPlatform": "Netflix / YouTube / Prime",
      "recommendationReason": "Why this specifically fits their clinical query",
      "youtubeSearchQuery": "Official Trailer / Movie search term"
    }
  ],
  "songs": [
    {
      "title": "Song Title",
      "artist": "Artist Name",
      "medVibe": "Study Vibe / Focus style",
      "duration": "4:20",
      "recommendationReason": "Why this song suits their mood"
    }
  ],
  "books": [
    {
      "title": "Book Title",
      "author": "Author / Editor",
      "category": "Textbook / Clinical Memoir / Exam Guide",
      "rating": "4.8/5",
      "recommendationReason": "Why this book will help their medical growth"
    }
  ],
  "games": [
    {
      "title": "Game Title",
      "genre": "Surgery Simulator / Diagnostic Puzzle / Hospital Sim",
      "platformBadge": "Steam / Web / Mobile",
      "rating": "9/10",
      "recommendationReason": "Why this game suits them"
    }
  ]
}`;

  const prompt = `Student Request: "${userQuery}"
Detected Category Focus: ${categoryIntent}

Prescribe the best matching clinical entertainment and literature in JSON.`;

  try {
    const { text, model } = await callGeminiCascadeServer(prompt, systemInstruction, apiKey);
    const parsed = JSON.parse(text);

    const resultCategory = parsed.requestedCategory || categoryIntent;

    // Resolve movies dynamically with real search/watch links
    let resolvedMovies: PrescriptionMovie[] | undefined = undefined;
    if (parsed.movies && parsed.movies.length > 0) {
      resolvedMovies = parsed.movies.map((m: any) => {
        const localMatch = MEDICAL_MOVIES.find(
          (lm) => lm.title.toLowerCase() === m.title?.toLowerCase() || lm.id === m.id
        );
        const watchUrl =
          localMatch?.watchUrl ||
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            (m.title || "") + " " + (m.youtubeSearchQuery || "official trailer")
          )}`;

        return {
          id: localMatch?.id || m.title?.toLowerCase().replace(/\s+/g, "-"),
          title: m.title,
          year: m.year || localMatch?.year,
          medicalTheme: m.medicalTheme || localMatch?.medicalTheme || "Clinical Drama",
          imdbRating: m.imdbRating || localMatch?.imdbRating || "8.0/10",
          watchPlatform: m.watchPlatform || localMatch?.watchPlatform || "YouTube / Streaming",
          watchUrl,
          recommendationReason: m.recommendationReason || localMatch?.medicoTakeaway,
        };
      });
    }

    // Resolve songs dynamically
    let resolvedSongs: PrescriptionSong[] | undefined = undefined;
    if (parsed.songs && parsed.songs.length > 0) {
      resolvedSongs = parsed.songs.map((s: any) => {
        const localMatch = MEDICAL_SONGS.find(
          (ls) => ls.title.toLowerCase() === s.title?.toLowerCase() || ls.id === s.id
        );
        return {
          id: localMatch?.id || s.title?.toLowerCase().replace(/\s+/g, "-"),
          title: s.title,
          artist: s.artist || localMatch?.artist || "Medical Focus Ensemble",
          medVibe: s.medVibe || localMatch?.medVibe || "Deep Focus & Relaxation",
          duration: s.duration || localMatch?.duration || "4:00",
          youtubeId: localMatch?.youtubeId || undefined,
          recommendationReason: s.recommendationReason || localMatch?.medVibe,
        };
      });
    }

    // Resolve books dynamically with real search/read links
    let resolvedBooks: PrescriptionBook[] | undefined = undefined;
    if (parsed.books && parsed.books.length > 0) {
      resolvedBooks = parsed.books.map((b: any) => {
        const localMatch = MEDICAL_BOOKS.find(
          (lb) => lb.title.toLowerCase() === b.title?.toLowerCase() || lb.id === b.id
        );
        const readUrl =
          localMatch?.readUrl ||
          `https://openlibrary.org/search?q=${encodeURIComponent(
            (b.title || "") + " " + (b.author || "")
          )}`;

        return {
          id: localMatch?.id || b.title?.toLowerCase().replace(/\s+/g, "-"),
          title: b.title,
          author: b.author || localMatch?.author || "Clinical Physician",
          category: b.category || localMatch?.category || "Medical Literature",
          rating: b.rating || localMatch?.rating || "4.8/5",
          readUrl,
          recommendationReason: b.recommendationReason || localMatch?.summary,
        };
      });
    }

    // Resolve games dynamically
    let resolvedGames: PrescriptionGame[] | undefined = undefined;
    if (parsed.games && parsed.games.length > 0) {
      resolvedGames = parsed.games.map((g: any) => {
        const localMatch = MEDICAL_GAMES.find(
          (lg) => lg.title.toLowerCase() === g.title?.toLowerCase() || lg.id === g.id
        );
        const downloadUrl =
          localMatch?.downloadUrl ||
          `https://store.steampowered.com/search/?term=${encodeURIComponent(g.title || "")}`;

        return {
          id: localMatch?.id || g.title?.toLowerCase().replace(/\s+/g, "-"),
          title: g.title,
          genre: g.genre || localMatch?.genre || "Medical Simulation",
          platformBadge: g.platformBadge || localMatch?.platformBadge || "Steam / Web",
          rating: g.rating || localMatch?.rating || "9/10",
          downloadUrl,
          recommendationReason: g.recommendationReason || localMatch?.description,
        };
      });
    }

    return {
      chatMessage: parsed.chatMessage,
      analysis: parsed.analysis || `Prescription for "${userQuery}"`,
      mentorNote: parsed.mentorNote,
      requestedCategory: resultCategory,
      movies: resolvedMovies?.length ? resolvedMovies : undefined,
      songs: resolvedSongs?.length ? resolvedSongs : undefined,
      books: resolvedBooks?.length ? resolvedBooks : undefined,
      games: resolvedGames?.length ? resolvedGames : undefined,
      modelUsed: model,
    };
  } catch (error) {
    console.warn("[generateServerAiPrescription] Gemini cascade failed, activating Local Smart Fallback Engine:", error);
    return getLocalSmartFallback(userQuery, categoryIntent);
  }
}

/**
 * Client-Side Service Function: Calls the secure server API proxy or direct Gemini cascade
 */
export async function getAiPrescription(userQuery: string): Promise<PrescriptionResult> {
  const categoryIntent = detectCategoryIntent(userQuery);

  // 1. Try server proxy endpoint first
  try {
    const res = await fetch("/api/ai-prescription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userQuery }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && !data.error && data.chatMessage) {
        return data as PrescriptionResult;
      }
    }
  } catch (err) {
    console.warn("[getAiPrescription] Server proxy not available:", err);
  }

  // 2. Direct Gemini Multi-Model Cascade execution
  const activeKey =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_GEMINI_API_KEY) ||
    (typeof process !== "undefined" && process.env?.GEMINI_API_KEY) ||
    "";

  if (activeKey) {
    try {
      return await generateServerAiPrescription(userQuery, activeKey);
    } catch (err) {
      console.warn("[getAiPrescription] Direct Gemini cascade failed:", err);
    }
  }

  // 3. Fallback only if completely offline or without internet
  return getLocalSmartFallback(userQuery, categoryIntent);
}

/**
 * Local Semantic Fallback Engine
 */
function getLocalSmartFallback(
  userQuery: string,
  categoryIntent: "movie" | "song" | "book" | "game" | "all" = "all"
): PrescriptionResult {
  const q = userQuery.toLowerCase();

  return {
    analysis: "🩺 Clinical Care Prescription",
    chatMessage: `Here is a curated clinical selection for your query: **"${userQuery}"**. These recommendations are chosen to support your medical mindset and academic stamina.\n\n*Note on Match:* Let me know if you would like to explore specific medical specialties, procedural simulations, or revision tables!`,
    mentorNote: "Stay steadfast, Doctor. Every great clinician was once a tired student pushing through the night.",
    requestedCategory: categoryIntent,
    movies: categoryIntent === "movie" || categoryIntent === "all"
      ? [
          {
            title: "Gifted Hands: The Ben Carson Story",
            year: 2009,
            medicalTheme: "Neurosurgery & Grit",
            imdbRating: "7.8/10",
            watchPlatform: "YouTube / Prime",
            watchUrl: "https://www.youtube.com/results?search_query=Gifted+Hands+The+Ben+Carson+Story+trailer",
            recommendationReason: "Inspiring journey of neurosurgical perseverance and clinical triumph.",
          },
        ]
      : undefined,
    songs: categoryIntent === "song" || categoryIntent === "all"
      ? [
          {
            title: "Weightless",
            artist: "Marconi Union",
            medVibe: "Anxiety Reduction & Focus",
            duration: "8:00",
            youtubeId: "UfcAVejslrU",
            recommendationReason: "Calms sympathetic hyperactivity and sharpens deep study focus.",
          },
        ]
      : undefined,
    books: categoryIntent === "book" || categoryIntent === "all"
      ? [
          {
            title: "When Breath Becomes Air",
            author: "Paul Kalanithi",
            category: "Doctor Memoir",
            rating: "4.8/5",
            readUrl: "https://openlibrary.org/search?q=When+Breath+Becomes+Air",
            recommendationReason: "Profound physician perspectives on life, mortality, and clinical purpose.",
          },
        ]
      : undefined,
    games: categoryIntent === "game" || categoryIntent === "all"
      ? [
          {
            title: "Surgeon Simulator 2013",
            genre: "Surgery Simulator",
            platformBadge: "Steam",
            rating: "9/10",
            downloadUrl: "https://store.steampowered.com/app/233720/Surgeon_Simulator/",
            recommendationReason: "Engages hands-on surgical reflexes and stress relief.",
          },
        ]
      : undefined,
    modelUsed: "Clinical Engine",
  };
}
