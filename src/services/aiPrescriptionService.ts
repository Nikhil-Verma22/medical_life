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

export interface PrescriptionResult {
  analysis: string;
  mentorNote?: string;
  movie?: MedicalMovie & { recommendationReason?: string };
  song?: MedicalSong & { recommendationReason?: string };
  book?: MedicalBook & { recommendationReason?: string };
  game?: MedicalGame & { recommendationReason?: string };
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

const GEMINI_API_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GEMINI_API_KEY) ||
  (typeof process !== "undefined" && process.env?.GEMINI_API_KEY) ||
  "";

/**
 * Call Gemini API with automatic model cascade fallback
 */
async function callGeminiCascade(prompt: string, systemInstruction: string): Promise<{ text: string; model: string }> {
  for (const model of MODEL_CASCADE) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
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
        console.warn(`[Gemini Cascade] Model ${model} returned status ${res.status}. Trying next fallback...`);
      }
    } catch (err) {
      console.warn(`[Gemini Cascade] Error calling model ${model}:`, err);
    }
  }

  throw new Error("All Gemini cascade models failed or network unavailable.");
}

/**
 * Main Service Function: Generates AI Prescription grounded with real Content DB
 */
export async function getAiPrescription(userQuery: string): Promise<PrescriptionResult> {
  const q = userQuery.trim().toLowerCase();

  // Basic Non-Medical Topic Guardrail Check
  const isNonMedicalTopic =
    q.includes("recipe") ||
    q.includes("food recipe") ||
    q.includes("crypto") ||
    q.includes("bitcoin") ||
    q.includes("cricket score") ||
    q.includes("politic");

  if (isNonMedicalTopic) {
    return {
      analysis: "⚠️ Notice: Medical Scope Guardrail",
      rawText: "I am an AI Clinical Mentor dedicated ONLY to prescribing Medical Movies, MBBS Study Anthems, Clinical Books, and Surgery Games for medicos. Please share what you are studying or feeling in medical life!",
      isGuardrailWarning: true,
    };
  }

  // Curate a compact database index for Gemini ground-truth mapping
  const movieSample = MEDICAL_MOVIES.slice(0, 35).map((m) => ({ id: m.id, title: m.title, theme: m.medicalTheme, mood: m.moodTag }));
  const songSample = MEDICAL_SONGS.slice(0, 25).map((s) => ({ id: s.id, title: s.title, artist: s.artist, vibe: s.medVibe }));
  const bookSample = MEDICAL_BOOKS.slice(0, 25).map((b) => ({ id: b.id, title: b.title, author: b.author, category: b.category }));
  const gameSample = MEDICAL_GAMES.slice(0, 20).map((g) => ({ id: g.id, title: g.title, genre: g.genre }));

  const systemInstruction = `You are the "Chief AI Medical Life Mentor & Prescriptions Engine" on Medical Hub.
Your purpose is to prescribe tailored entertainment, focus music, clinical books, and surgery games to MBBS students, interns, and doctors based on their emotional and academic state.
Strict Safety Rule: Never prescribe real pharmaceutical drugs or diagnose illnesses. You strictly curate movies, songs, books, and games.
Always return response in valid JSON matching this schema:
{
  "analysis": "1-2 empathetic sentences addressing the student's clinical or academic state",
  "mentorNote": "A short, motivating clinical insight or shayari for the healer",
  "selectedMovieId": "ID of the best matching movie from provided catalogue",
  "movieReason": "Why this movie suits their current state",
  "selectedSongId": "ID of the best matching song from provided catalogue",
  "songReason": "Why this song suits their vibe",
  "selectedBookId": "ID of the best matching book from provided catalogue",
  "bookReason": "Why this book will help or inspire them",
  "selectedGameId": "ID of the best matching game from provided catalogue",
  "gameReason": "Why this game suits their mood"
}`;

  const prompt = `Student Query / Clinical Feeling: "${userQuery}"

Available Medical Movies Catalogue:
${JSON.stringify(movieSample)}

Available MBBS Anthems & Study Songs:
${JSON.stringify(songSample)}

Available Medical Books & Memoirs:
${JSON.stringify(bookSample)}

Available Surgery & Medico Games:
${JSON.stringify(gameSample)}

Select the most therapeutic combination and provide your clinical mentor prescription in JSON.`;

  try {
    const { text, model } = await callGeminiCascade(prompt, systemInstruction);
    const parsed = JSON.parse(text);

    // Resolve verified items from authentic database
    const movie = (MEDICAL_MOVIES.find((m) => m.id === parsed.selectedMovieId) ||
      MEDICAL_MOVIES.find((m) => m.title.toLowerCase().includes(parsed.selectedMovieTitle?.toLowerCase() || "")) ||
      MEDICAL_MOVIES[0]);

    const song = (MEDICAL_SONGS.find((s) => s.id === parsed.selectedSongId) ||
      MEDICAL_SONGS.find((s) => s.title.toLowerCase().includes(parsed.selectedSongTitle?.toLowerCase() || "")) ||
      MEDICAL_SONGS[0]);

    const book = (MEDICAL_BOOKS.find((b) => b.id === parsed.selectedBookId) ||
      MEDICAL_BOOKS.find((b) => b.title.toLowerCase().includes(parsed.selectedBookTitle?.toLowerCase() || "")) ||
      MEDICAL_BOOKS[0]);

    const game = (MEDICAL_GAMES.find((g) => g.id === parsed.selectedGameId) ||
      MEDICAL_GAMES.find((g) => g.title.toLowerCase().includes(parsed.selectedGameTitle?.toLowerCase() || "")) ||
      MEDICAL_GAMES[0]);

    return {
      analysis: parsed.analysis || `Prescription for "${userQuery}":`,
      mentorNote: parsed.mentorNote,
      movie: movie ? { ...movie, recommendationReason: parsed.movieReason } : undefined,
      song: song ? { ...song, recommendationReason: parsed.songReason } : undefined,
      book: book ? { ...book, recommendationReason: parsed.bookReason } : undefined,
      game: game ? { ...game, recommendationReason: parsed.gameReason } : undefined,
      modelUsed: model,
    };
  } catch (error) {
    console.warn("[getAiPrescription] Gemini cascade failed, activating Local Smart Fallback Engine:", error);
    return getLocalSmartFallback(userQuery);
  }
}

/**
 * Local Smart Fallback Engine (Zero Downtime Guarantee)
 */
function getLocalSmartFallback(userQuery: string): PrescriptionResult {
  const q = userQuery.toLowerCase();

  let matchedMovie = MEDICAL_MOVIES[0];
  let matchedSong = MEDICAL_SONGS[0];
  let matchedBook = MEDICAL_BOOKS[0];
  let matchedGame = MEDICAL_GAMES[0];

  if (q.includes("surg") || q.includes("ot") || q.includes("operation") || q.includes("knife")) {
    matchedMovie = MEDICAL_MOVIES.find((m) => m.id === "gifted-hands") ?? MEDICAL_MOVIES[4];
    matchedBook = MEDICAL_BOOKS.find((b) => b.id === "complications-gawande") ?? MEDICAL_BOOKS[5];
    matchedGame = MEDICAL_GAMES.find((g) => g.id === "surgeon-simulator-2013") ?? MEDICAL_GAMES[0];
  } else if (q.includes("stress") || q.includes("viva") || q.includes("panic") || q.includes("exhaust")) {
    matchedMovie = MEDICAL_MOVIES.find((m) => m.id === "munna-bhai-mbbs") ?? MEDICAL_MOVIES[0];
    matchedSong = MEDICAL_SONGS.find((s) => s.id === "med-song-1") ?? MEDICAL_SONGS[0];
    matchedBook = MEDICAL_BOOKS.find((b) => b.id === "the-house-of-god") ?? MEDICAL_BOOKS[4];
  } else if (q.includes("patho") || q.includes("virus") || q.includes("infection") || q.includes("micro")) {
    matchedMovie = MEDICAL_MOVIES.find((m) => m.id === "awakenings") ?? MEDICAL_MOVIES[3];
    matchedBook = MEDICAL_BOOKS.find((b) => b.id === "robbins-pathology") ?? MEDICAL_BOOKS[1];
    matchedGame = MEDICAL_GAMES.find((g) => g.id === "plague-inc") ?? MEDICAL_GAMES[2];
  } else if (q.includes("night") || q.includes("duty") || q.includes("casualty") || q.includes("er")) {
    matchedMovie = MEDICAL_MOVIES.find((m) => m.id === "bringing-out-the-dead") ?? MEDICAL_MOVIES[2];
    matchedSong = MEDICAL_SONGS.find((s) => s.mood === "Late Night Study") ?? MEDICAL_SONGS[1];
  }

  return {
    analysis: `Prescription for "${userQuery}" (Clinical Matcher):`,
    mentorNote: "Stay steadfast, Doctor. Every great clinician was once a tired student pushing through the night.",
    movie: { ...matchedMovie, recommendationReason: "Matches your clinical focus and provides genuine healer inspiration." },
    song: { ...matchedSong, recommendationReason: "Calms sympathetic hyperactivity and sharpens deep study focus." },
    book: { ...matchedBook, recommendationReason: "Offers profound clinical insights and perspective from veteran physicians." },
    game: { ...matchedGame, recommendationReason: "Engages hands-on surgical reflexes and strategic clinical management." },
    modelUsed: "Local Smart Heuristic Engine",
  };
}
