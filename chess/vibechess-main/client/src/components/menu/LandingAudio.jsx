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

		const isMuted = localStorage.getItem("isMusicMuted") === "true";
		if (!isMuted) {
			audio.play().catch((err) => {
				console.log("Waiting for user gesture to start playback:", err);
			});
		}

		const unlockGesture = () => {
			const currentMuted = localStorage.getItem("isMusicMuted") === "true";
			if (!currentMuted && audio.paused) {
				audio.volume = 0.85;
				audio.play().catch(() => {});
			}
		};

		window.addEventListener("click", unlockGesture, { once: true });
		window.addEventListener("pointerdown", unlockGesture, { once: true });
		window.addEventListener("keydown", unlockGesture, { once: true });
		window.addEventListener("touchstart", unlockGesture, { once: true });

		return () => {
			window.removeEventListener("click", unlockGesture);
			window.removeEventListener("pointerdown", unlockGesture);
			window.removeEventListener("keydown", unlockGesture);
			window.removeEventListener("touchstart", unlockGesture);
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
