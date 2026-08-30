// 100 Curated Gen-Z, Funny & Medico Gaming Names
export const GENZ_FUNNY_NAMES = [
	"RizzBishop",
	"SigmaSurgeon",
	"DrCheckmate",
	"BroskiGambit",
	"StethoscopeNinja",
	"VibeGrandmaster",
	"NeuroNuke",
	"SkibidiKnight",
	"AdrenalineRush",
	"ScalpelSlayer",
	"CaffeineMed",
	"ProcrastiKnight",
	"AnatomyRogue",
	"DopamineDealer",
	"Tachycardia",
	"BlunderKing",
	"GigaChadDoc",
	"Orthobro",
	"BiochemBoss",
	"PawnStar",
	"SutureSensei",
	"RxGambit",
	"VascularViper",
	"SyringeSniper",
	"AuraSurgeon",
	"NoobResident",
	"VivaSurvivor",
	"NightDutyGhost",
	"MewingMaster",
	"CapBuster",
	"CookedKing",
	"BrainrotDoc",
	"Gyattmate",
	"ChadPhysician",
	"CardiacClutcher",
	"PhantomRook",
	"StatPawn",
	"PlaceboKing",
	"SynapseSnatcher",
	"MorphineMage",
	"IntubationPro",
	"DefibDemon",
	"GhostPostings",
	"RobbinsRider",
	"GrayAnatomy",
	"BoneCrusher",
	"WriggleRook",
	"PlasmaPawn",
	"AntibioticAce",
	"SepsisSlayer",
	"GlitchGambit",
	"QuantumQueen",
	"BlunderDoc",
	"VibeCheckmate",
	"ChillClinician",
	"CodeBlueBro",
	"IVDripDrip",
	"PulsePounder",
	"NeuronNinja",
	"ScalpelSamurai",
	"TriageTitan",
	"SutureKing",
	"BiopsyBeast",
	"ReflexRider",
	"StethoscopeFlex",
	"PharmPharaoh",
	"MedMemeGod",
	"AnesthesiaAce",
	"DermisDemon",
	"GastroGuru",
	"OrthoGiga",
	"PediatricPal",
	"DermaDon",
	"OpioidEagle",
	"LofiMedico",
	"NightShiftRizz",
	"HostelHustler",
	"TerraceChaiDoc",
	"CasualtyClutch",
	"ICUKnight",
	"O2Saturation",
	"EndorphinElf",
	"SerotoninSurge",
	"GlucoseGambit",
	"HemoglobinHero",
	"PlateletPrince",
	"WBCWarrior",
	"RBCRanger",
	"ImmunoImp",
	"VaccineVandal",
	"StitchMaster",
	"CauteryChamp",
	"ForcepsFiend",
	"ScrubsSwagger",
	"GownGladiator",
	"MaskedMedic",
	"BowelSound",
	"SinusRhythm",
	"ApexBeat",
	"HealerHype",
];

export const strings1 = [
	"Absurd", "Bubbly", "Cheeky", "Clever", "Cool", "Crazy", "Da", "Freakin",
	"Funky", "Giga", "Happy", "King", "Mighty", "Peculiar", "Quirky", "Salty",
	"Smart", "Sneaky", "Silly", "Spooky", "The", "Wacky", "Wimp", "Wise",
];

export const strings2 = [
	"Banana", "Bigfoot", "Blunder", "Cactus", "Cat", "Champ", "Chief", "Coder",
	"Dinosaur", "Enigma", "Gambit", "Guy", "Jellyfish", "Narwhal", "Noodle",
	"Noob", "Penguin", "Pirate", "Potato", "Savior", "Snail", "Unicorn", "Vibes", "Visionary",
];

// Pool of combined names
const validUsernames = [...GENZ_FUNNY_NAMES];
for (const s1 of strings1) {
	for (const s2 of strings2) {
		if (s1.length + s2.length <= 14 && !validUsernames.includes(s1 + s2)) {
			validUsernames.push(s1 + s2);
		}
	}
}

/**
 * Generate a unique random gamer name from 100 Gen-Z / Funny list
 * If existingNames array provided, avoids collisions.
 * If all run out, falls back to "Player" + random 4 digits (e.g. Player4821).
 */
export function generateRandomUsername(existingNames = []) {
	const available = validUsernames.filter((name) => !existingNames.includes(name));
	if (available.length > 0) {
		const chosen = available[Math.floor(Math.random() * available.length)];
		return chosen;
	}

	// Fallback to random Player + 4-digit number (e.g. Player1232)
	const randomDigits = Math.floor(1000 + Math.random() * 9000);
	return `Player${randomDigits}`;
}

/**
 * Auto-assigns a cool random name on first arrival without prompting
 */
export function getOrSetInitialUsername() {
	if (typeof window === "undefined") return "RizzBishop";
	let stored = window.localStorage.getItem("username");
	if (!stored || stored.trim() === "" || stored === "Player" || stored === "null") {
		stored = generateRandomUsername();
		window.localStorage.setItem("username", stored);
	}
	return stored;
}
