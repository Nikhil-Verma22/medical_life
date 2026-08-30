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
  chatMessage?: string;
  mentorNote?: string;
  requestedCategory?: "movie" | "song" | "book" | "game" | "all";
  movies?: (MedicalMovie & { recommendationReason?: string })[];
  songs?: (MedicalSong & { recommendationReason?: string })[];
  books?: (MedicalBook & { recommendationReason?: string })[];
  games?: (MedicalGame & { recommendationReason?: string })[];
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
 * Score and find best matching items from a list based on user query keywords
 */
function scoreAndFilterItems<T>(
  items: T[],
  query: string,
  getText: (item: T) => string,
  limit: number = 3
): T[] {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);

  const scored = items.map((item) => {
    const text = getText(item).toLowerCase();
    let score = 0;

    // Full query substring match
    if (text.includes(q)) score += 15;

    // Individual keyword match
    for (const w of words) {
      if (text.includes(w)) {
        score += 3;
      }
    }

    // Clinical keyword boosts
    const clinicalKeywords = [
      "surgery", "surgeon", "brain", "neuro", "cardio", "heart", "psychiatry",
      "mental", "stress", "viva", "exam", "pathology", "virus", "infection",
      "emergency", "casualty", "night", "duty", "anatomy", "pharmacology",
      "pediatrics", "ortho", "radiology", "forensic", "hostel", "intern"
    ];

    for (const ck of clinicalKeywords) {
      if (q.includes(ck) && text.includes(ck)) {
        score += 8;
      }
    }

    // Add small random tie-breaker so subsequent queries have fresh variety
    score += Math.random() * 0.5;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
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
          maxOutputTokens: 1200,
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
      analysis: "⚠️ Notice: Medical Scope Guardrail",
      rawText: "I am an AI Clinical Mentor dedicated ONLY to prescribing Medical Movies, MBBS Study Anthems, Clinical Books, and Surgery Games for medicos. Please share what you are studying or feeling in medical life!",
      isGuardrailWarning: true,
    };
  }

  const categoryIntent = detectCategoryIntent(userQuery);

  if (!apiKey) {
    return getLocalSmartFallback(userQuery, categoryIntent);
  }

  // Curate candidates
  const candidateMovies = scoreAndFilterItems(
    MEDICAL_MOVIES,
    userQuery,
    (m) => `${m.title} ${m.medicalTheme} ${m.synopsis} ${m.moodTag} ${m.genres.join(" ")}`,
    15
  ).map((m) => ({ id: m.id, title: m.title, theme: m.medicalTheme, mood: m.moodTag }));

  const candidateSongs = scoreAndFilterItems(
    MEDICAL_SONGS,
    userQuery,
    (s) => `${s.title} ${s.artist} ${s.medVibe} ${s.mood}`,
    15
  ).map((s) => ({ id: s.id, title: s.title, artist: s.artist, vibe: s.medVibe }));

  const candidateBooks = scoreAndFilterItems(
    MEDICAL_BOOKS,
    userQuery,
    (b) => `${b.title} ${b.author} ${b.subjectOrNotion} ${b.category} ${b.summary}`,
    15
  ).map((b) => ({ id: b.id, title: b.title, author: b.author, category: b.category }));

  const candidateGames = scoreAndFilterItems(
    MEDICAL_GAMES,
    userQuery,
    (g) => `${g.title} ${g.genre} ${g.description}`,
    12
  ).map((g) => ({ id: g.id, title: g.title, genre: g.genre }));

  const systemInstruction = `You are the "Chief AI Medical Life Mentor & Prescriptions Engine" on Medical Hub.
Your purpose is to prescribe tailored entertainment, focus music, clinical books, and surgery games to MBBS students, interns, and doctors based on their emotional and academic state.
CRITICAL INSTRUCTION:
1. Detect what the user is asking for:
   - If the user ONLY asked for movies/cinema/documentaries, return 1-3 movie recommendations in "selectedMovies", and leave "selectedSongs", "selectedBooks", "selectedGames" as EMPTY arrays. DO NOT include songs/books/games if they only asked for movies.
   - If the user ONLY asked for books/reading, return 1-3 book recommendations in "selectedBooks", and leave others EMPTY.
   - If the user ONLY asked for music/songs/qawwali, return 1-3 song recommendations in "selectedSongs", and leave others EMPTY.
   - If the user ONLY asked for games/simulators, return 1-3 game recommendations in "selectedGames", and leave others EMPTY.
   - If the user asked a general question or asked for a full prescription, return 1 movie, 1 song, 1 book, and 1 game.

2. Structure & Formatting Guidelines:
   - "analysis": Must be a SHORT, CRISP title / headline (3 to 6 words max, e.g. "Forensic Medicine Cinema Curation" or "Pharmacology Core Reading Guide"). DO NOT write long paragraphs in analysis.
   - "chatMessage": Write a beautifully structured, modern conversational response like a senior doctor/mentor.
     - Use **bolding** for important movie/book titles and clinical concepts.
     - Use *italics* for vibes or emotional context.
     - Explain why each recommended item was selected and how it supports their learning or mindset.
     - Include an honest match assessment: if the search was broad or if they might want something more specific (e.g. Hindi dubbed, flashcards, practical exam OSCEs), invite them to narrow it down!

Always return response in valid JSON matching this schema:
{
  "analysis": "Short 3-6 word headline title",
  "chatMessage": "Conversational mentor message using **bold** for key names and clear paragraphs explaining the curated choices and match context.",
  "mentorNote": "A short, motivating clinical insight or shayari for the healer",
  "requestedCategory": "movie" | "song" | "book" | "game" | "all",
  "selectedMovies": [ { "id": "movie-id", "reason": "Why this movie specifically fits their query" } ],
  "selectedSongs": [ { "id": "song-id", "reason": "Why this song fits" } ],
  "selectedBooks": [ { "id": "book-id", "reason": "Why this book fits" } ],
  "selectedGames": [ { "id": "game-id", "reason": "Why this game fits" } ]
}`;

  const prompt = `Student Request: "${userQuery}"
Detected Category Focus: ${categoryIntent}

Candidate Medical Movies from Catalogue:
${JSON.stringify(candidateMovies)}

Candidate MBBS Study Songs from Catalogue:
${JSON.stringify(candidateSongs)}

Candidate Medical Books from Catalogue:
${JSON.stringify(candidateBooks)}

Candidate Surgery/Medico Games from Catalogue:
${JSON.stringify(candidateGames)}

Provide your tailored clinical mentor prescription in JSON matching the exact category requested.`;

  try {
    const { text, model } = await callGeminiCascadeServer(prompt, systemInstruction, apiKey);
    const parsed = JSON.parse(text);

    const resultCategory = parsed.requestedCategory || categoryIntent;

    // Resolve movies
    let resolvedMovies: (MedicalMovie & { recommendationReason?: string })[] | undefined = undefined;
    if (parsed.selectedMovies && parsed.selectedMovies.length > 0) {
      resolvedMovies = parsed.selectedMovies
        .map((sm: { id: string; reason?: string }) => {
          const found = MEDICAL_MOVIES.find((m) => m.id === sm.id) || MEDICAL_MOVIES.find((m) => m.title.toLowerCase() === sm.id.toLowerCase());
          return found ? { ...found, recommendationReason: sm.reason } : null;
        })
        .filter(Boolean);
    }

    // Resolve songs
    let resolvedSongs: (MedicalSong & { recommendationReason?: string })[] | undefined = undefined;
    if (parsed.selectedSongs && parsed.selectedSongs.length > 0) {
      resolvedSongs = parsed.selectedSongs
        .map((ss: { id: string; reason?: string }) => {
          const found = MEDICAL_SONGS.find((s) => s.id === ss.id) || MEDICAL_SONGS.find((s) => s.title.toLowerCase() === ss.id.toLowerCase());
          return found ? { ...found, recommendationReason: ss.reason } : null;
        })
        .filter(Boolean);
    }

    // Resolve books
    let resolvedBooks: (MedicalBook & { recommendationReason?: string })[] | undefined = undefined;
    if (parsed.selectedBooks && parsed.selectedBooks.length > 0) {
      resolvedBooks = parsed.selectedBooks
        .map((sb: { id: string; reason?: string }) => {
          const found = MEDICAL_BOOKS.find((b) => b.id === sb.id) || MEDICAL_BOOKS.find((b) => b.title.toLowerCase() === sb.id.toLowerCase());
          return found ? { ...found, recommendationReason: sb.reason } : null;
        })
        .filter(Boolean);
    }

    // Resolve games
    let resolvedGames: (MedicalGame & { recommendationReason?: string })[] | undefined = undefined;
    if (parsed.selectedGames && parsed.selectedGames.length > 0) {
      resolvedGames = parsed.selectedGames
        .map((sg: { id: string; reason?: string }) => {
          const found = MEDICAL_GAMES.find((g) => g.id === sg.id) || MEDICAL_GAMES.find((g) => g.title.toLowerCase() === sg.id.toLowerCase());
          return found ? { ...found, recommendationReason: sg.reason } : null;
        })
        .filter(Boolean);
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
 * Client-Side Service Function: Calls the secure server API proxy
 */
export async function getAiPrescription(userQuery: string): Promise<PrescriptionResult> {
  const categoryIntent = detectCategoryIntent(userQuery);

  try {
    const res = await fetch("/api/ai-prescription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: userQuery }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && !data.error) {
        return data as PrescriptionResult;
      }
    }
  } catch (err) {
    console.warn("[getAiPrescription] Server proxy request failed, falling back to local matcher:", err);
  }

  // Local fallback if offline or server route is unavailable
  return getLocalSmartFallback(userQuery, categoryIntent);
}

/**
 * Smart Local Clinical Semantic Matcher (Zero Downtime & Accurate Category Filtering)
 */
function getLocalSmartFallback(
  userQuery: string,
  categoryIntent: "movie" | "song" | "book" | "game" | "all" = "all"
): PrescriptionResult {
  const q = userQuery.toLowerCase();

  // If user only asked for MOVIES
  if (categoryIntent === "movie") {
    const topMovies = scoreAndFilterItems(
      MEDICAL_MOVIES,
      userQuery,
      (m) => `${m.title} ${m.medicalTheme} ${m.synopsis} ${m.moodTag} ${m.genres.join(" ")}`,
      3
    );

    const titleList = topMovies.map((m) => `**"${m.title}"**`).join(", ");

    return {
      analysis: "🎬 Medical Cinema Curation",
      chatMessage: `Hello future clinician! I've curated top medical cinema selections for you: ${titleList}.\n\nThese titles specifically showcase **clinical dedication**, surgical discipline, and the human ethics of medical practice. They provide valuable contextual immersion alongside your academic coursework.\n\n*Note on Match:* If you were looking for light-hearted hospital comedy or high-yield surgical procedure documentaries instead, just let me know and I'll adjust the recommendations!`,
      mentorNote: "Immerse yourself in cinema that captures the human essence and resilience of clinical practice.",
      requestedCategory: "movie",
      movies: topMovies.map((m) => ({
        ...m,
        recommendationReason: `Focuses on ${m.medicalTheme} with profound medical takeaways for medicos.`,
      })),
      modelUsed: "Clinical Semantic Engine",
    };
  }

  // If user only asked for SONGS
  if (categoryIntent === "song") {
    const topSongs = scoreAndFilterItems(
      MEDICAL_SONGS,
      userQuery,
      (s) => `${s.title} ${s.artist} ${s.medVibe} ${s.mood} ${s.lyricsSnippet}`,
      3
    );

    const titleList = topSongs.map((s) => `**"${s.title}"**`).join(", ");

    return {
      analysis: "🎵 Study Anthems & Focus Audio",
      chatMessage: `I've queued up these deep-focus tracks for your study session: ${titleList}.\n\nThese compositions are tuned to lower sympathetic overdrive, promote steady **alpha-wave focus**, and support extended study endurance during intense preparation.\n\n*Refinement:* If you prefer ambient lofi beats or high-energy rhythmic motivation instead, feel free to ask!`,
      mentorNote: "Let the soundscapes calm your nervous system and lock in deep clinical concentration.",
      requestedCategory: "song",
      songs: topSongs.map((s) => ({
        ...s,
        recommendationReason: `Delivers a ${s.medVibe} vibe ideal for late-night study and mental endurance.`,
      })),
      modelUsed: "Clinical Semantic Engine",
    };
  }

  // If user only asked for BOOKS
  if (categoryIntent === "book") {
    const topBooks = scoreAndFilterItems(
      MEDICAL_BOOKS,
      userQuery,
      (b) => `${b.title} ${b.author} ${b.subjectOrNotion} ${b.category} ${b.summary}`,
      3
    );

    const titleList = topBooks.map((b) => `**"${b.title}"**`).join(", ");

    return {
      analysis: "📚 Clinical Books & Medical Literature",
      chatMessage: `Here are the foundational reading recommendations for your query: ${titleList}.\n\nThese selections balance **authoritative medical science** with invaluable clinical perspectives from master physicians, helping you connect textbook pathology to real patient care.\n\n*Refinement:* If you need concise exam revision tables, high-yield flashcard summaries, or clinical OSCE guides, just tell me!`,
      mentorNote: "Words from master clinicians offer clarity and wisdom when medicine feels overwhelming.",
      requestedCategory: "book",
      books: topBooks.map((b) => ({
        ...b,
        recommendationReason: `Covers ${b.subjectOrNotion} with essential insights for doctor development.`,
      })),
      modelUsed: "Clinical Semantic Engine",
    };
  }

  // If user only asked for GAMES
  if (categoryIntent === "game") {
    const topGames = scoreAndFilterItems(
      MEDICAL_GAMES,
      userQuery,
      (g) => `${g.title} ${g.genre} ${g.description}`,
      3
    );

    const titleList = topGames.map((g) => `**"${g.title}"**`).join(", ");

    return {
      analysis: "🎮 Surgery & Hospital Simulation",
      chatMessage: `Ready for a tactical clinical break? I've selected: ${titleList}.\n\nThese titles let you sharpen your **diagnostic intuition**, triage strategy, and surgical timing in an engaging, low-pressure simulation environment.\n\n*Refinement:* Looking for multiplayer friendly duels or pure turn-based medical chess instead? Let me know!`,
      mentorNote: "Unwind while training tactical decision-making and surgical precision.",
      requestedCategory: "game",
      games: topGames.map((g) => ({
        ...g,
        recommendationReason: `Engaging ${g.genre} mechanics testing clinical intuition and strategy.`,
      })),
      modelUsed: "Clinical Semantic Engine",
    };
  }

  // Default: General balanced prescription (1 Movie, 1 Song, 1 Book, 1 Game)
  const topMovie = scoreAndFilterItems(
    MEDICAL_MOVIES,
    userQuery,
    (m) => `${m.title} ${m.medicalTheme} ${m.synopsis} ${m.moodTag}`,
    1
  )[0] || MEDICAL_MOVIES[0];

  const topSong = scoreAndFilterItems(
    MEDICAL_SONGS,
    userQuery,
    (s) => `${s.title} ${s.artist} ${s.medVibe} ${s.mood}`,
    1
  )[0] || MEDICAL_SONGS[0];

  const topBook = scoreAndFilterItems(
    MEDICAL_BOOKS,
    userQuery,
    (b) => `${b.title} ${b.author} ${b.subjectOrNotion} ${b.category}`,
    1
  )[0] || MEDICAL_BOOKS[0];

  const topGame = scoreAndFilterItems(
    MEDICAL_GAMES,
    userQuery,
    (g) => `${g.title} ${g.genre} ${g.description}`,
    1
  )[0] || MEDICAL_GAMES[0];

  return {
    analysis: "🩺 Full Clinical Care Package",
    chatMessage: `I've assembled a balanced clinical care prescription for your current state:\n\n• **Movie:** **"${topMovie.title}"** — for a refreshing mental reset.\n• **Study Anthem:** **"${topSong.title}"** — to sustain deep concentration.\n• **Clinical Literature:** **"${topBook.title}"** — for physician perspective.\n• **Downtime Simulator:** **"${topGame.title}"** — to relax while testing surgical reflexes.\n\n*Refinement:* If you want more recommendations focused specifically on just one of these areas, simply ask!`,
    mentorNote: "Stay steadfast, Doctor. Every great clinician was once a tired student pushing through the night.",
    requestedCategory: "all",
    movies: [{ ...topMovie, recommendationReason: `Inspiring clinical cinema focusing on ${topMovie.medicalTheme}.` }],
    songs: [{ ...topSong, recommendationReason: `Calms sympathetic hyperactivity and sharpens deep study focus.` }],
    books: [{ ...topBook, recommendationReason: `Offers profound clinical perspective and doctor wisdom.` }],
    games: [{ ...topGame, recommendationReason: `Hands-on ${topGame.genre} for clinical reflexes & strategy.` }],
    modelUsed: "Clinical Semantic Engine",
  };
}
