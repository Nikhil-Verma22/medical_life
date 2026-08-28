import React, { useState, useEffect, useRef } from "react";

const trackList = [
	{ name: "Chill", file: "track1.mp3" },
	{ name: "Jackpot - Cheema Y", file: "track2.mp3" },
	{ name: "California Love", file: "track3.mp3" },
	{ name: "AZUL", file: "track4.mp3" },
	{ name: "Sirra - Guru Randhawa", file: "track5.mp3" },
	{ name: "DOPAMINE - Guru Randhawa", file: "track6.mp3" },
];

const getAudioSrc = (filename) => {
	const base = import.meta.env.BASE_URL || "/vibechess/";
	const cleanBase = base.endsWith("/") ? base : base + "/";
	return `${cleanBase}audio/${filename}`;
};

const LandingAudio = () => {
	const [trackIndex, setTrackIndex] = useState(0);
	const audioRef = useRef(null);

	const handleTrackEnded = () => {
		setTrackIndex((prev) => (prev + 1) % trackList.length);
	};

	// Force music to start UNMUTED by default on every load
	useEffect(() => {
		localStorage.setItem("isMusicMuted", "false");
	}, []);

	// Listen for changes from settings or menu sound toggle
	useEffect(() => {
		const handleStorage = () => {
			const isMuted = localStorage.getItem("isMusicMuted") === "true";
			const audio = audioRef.current;
			if (!audio) return;

			if (isMuted) {
				if (!audio.paused) {
					audio.pause();
				}
			} else {
				if (audio.paused) {
					audio.volume = 0.85;
					audio.muted = false;
					audio.play().catch(() => {});
				}
			}
		};

		window.addEventListener("storage", handleStorage);
		const interval = setInterval(handleStorage, 250);

		return () => {
			window.removeEventListener("storage", handleStorage);
			clearInterval(interval);
		};
	}, []);

	// Initialize audio playback on track switch or page load
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.volume = 0.85;
		audio.muted = false;

		const attemptPlay = () => {
			const isMuted = localStorage.getItem("isMusicMuted") === "true";
			if (!isMuted && audio && audio.paused) {
				audio.volume = 0.85;
				audio.muted = false;
				audio.play().then(() => {
					removeListeners();
				}).catch((err) => {
					console.log("Waiting for user interaction to start audio:", err);
				});
			}
		};

		const events = ["click", "pointerdown", "pointermove", "mousemove", "keydown", "touchstart", "focus"];
		
		const removeListeners = () => {
			events.forEach((evt) => window.removeEventListener(evt, attemptPlay));
		};

		// Try playing immediately
		attemptPlay();

		// Add comprehensive user interaction listeners so any mouse movement or touch starts audio seamlessly
		events.forEach((evt) => window.addEventListener(evt, attemptPlay, { passive: true }));

		return () => {
			removeListeners();
		};
	}, [trackIndex]);

	return (
		<audio
			ref={audioRef}
			src={getAudioSrc(trackList[trackIndex].file)}
			autoPlay
			onEnded={handleTrackEnded}
			style={{ display: "none" }}
		/>
	);
};

export default LandingAudio;
