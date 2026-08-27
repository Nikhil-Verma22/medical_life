# Deluxe Dawakhana — MBBS Retro Radio

The uploaded archive holds the previous version of this page (the current project is an empty template), so step one is restoring that page into the project, then re-theming it fully around MBBS students.

## 1. Restore the existing page

Bring back the working homepage from the archive (route, styles, player bar, clock, online counter, scene rotation). No `.git` metadata is copied. Everything below is applied on top of it.

## 2. Text / naming corrections

- Headline: `डीलक्स सैलून` → `डीलक्स दवाखाना` — same display font, same clamp size, same bold white with drop shadow, same centred placement.
- Caption: `'90s Classics · For Medical Minds` → `'90s Classics · For Future Doctors`, same uppercase wide-tracking small style.
- Brand label: `BAARBER` → `DAWAKHANA`, same bold serif and dark maroon/brown colour.
- Player subtitle and page title/meta re-worded from "Deluxe Saloon Radio / Barber Shop Mix" to the Dawakhana / MBBS framing.
- Spotify button, live "X online" counter, clock, dots and player controls keep their exact current positions and styling.

## 3. Full MBBS scene reshoot (16 images)

All 16 backgrounds are regenerated in the same hand-painted retro-'90s Indian illustration style, warm palette, same 16:9 framing — but every scene is unmistakably MBBS. Scene set:

1. Anatomy dissection hall, cadaver tables, tall windows
2. Skeleton in the corner of a hostel room at 2 AM, desk lamp, Gray's Anatomy open
3. Medical college corridor with a stethoscope-slung group walking to class
4. Ward round — professor, trolley, students with clipboards
5. Chai stall outside the college gate, students in white coats
6. Lecture theatre in tiers, chalkboard with a brachial plexus diagram
7. Library night shift, stacked textbooks, one head down asleep
8. Hostel mess dinner, coats on chair backs
9. Microbiology / histology lab, microscopes in a row
10. Old red-brick medical college facade with string lights, banyan tree
11. Physiology practical — BP cuff, one student on the other
12. Casualty/emergency at night, ambulance headlights
13. OT gowning corner, masks and caps
14. Notes-and-flashcards study table with a coffee cup
15. Farewell/convocation evening on college steps
16. Rooftop break at dusk, city skyline, textbooks aside

Each scene keeps a soft vignette so headline text stays legible.

## 4. Per-scene MBBS lines

Alongside the fixed `डीलक्स दवाखाना` headline, a rotating one-liner tied to the current image fades in under the caption — e.g. "Second year, first cadaver", "Chai break between Physio and Biochem", "Ward rounds and hand-me-down stethoscopes", "3 AM, Gray's Anatomy, no regrets". One line per scene, all 16 written to match their image.

## 5. Cinematic scene transitions

- Rotation interval raised from 8s to 20s per image.
- Transition upgraded from a plain opacity swap to a film-like move: slow continuous Ken Burns drift/zoom on the active image plus a long cross-dissolve (about 2.5s) with a slight scale settle, so scenes glide into one another like a video rather than snapping.
- The scene-dot navigation still jumps instantly on click and stays in place.
- Motion respects `prefers-reduced-motion` (falls back to a plain fade).

## Technical notes

- Single route file `src/routes/index.tsx` plus 16 regenerated images in `src/assets/`.
- Scene data becomes an array of `{ src, line, alt }` so image, caption line and alt text stay in sync.
- Ken Burns and cross-dissolve are pure CSS transitions/keyframes; no new dependency.
- No colour, layout, spacing or component changes beyond what is listed above.
