import { useMemo, useCallback, useState, useEffect } from "react";
import { Howl } from "howler";

export const useMenuSounds = () => {
	const [isMusicMuted, setIsMusicMuted] = useState(() => {
		localStorage.setItem("isMusicMuted", "false");
		return false;
	});
	const [isSearchSoundPlaying, setIsSearchSoundPlaying] = useState(false);

	const sounds = useMemo(
		() => ({
			music: new Howl({
				src: ["sound/music.mp3"],
				loop: true,
				volume: 0.3,
			}),
			click: new Howl({
				src: ["sound/click.mp3"],
				volume: 0.5,
			}),
			search: new Howl({
				src: ["sound/search.wav"],
				loop: true,
				volume: 0.1,
			}),
		}),
		[]
	);

	const playClickSound = useCallback(() => {
		sounds.click.play();
	}, [sounds.click]);

	const startSearchSound = useCallback(() => {
		if (!isSearchSoundPlaying) {
			setIsSearchSoundPlaying(true);
			sounds.search.play();
		}
	}, [isSearchSoundPlaying, sounds.search]);

	const stopSearchSound = useCallback(() => {
		if (isSearchSoundPlaying) {
			setIsSearchSoundPlaying(false);
			sounds.search.stop();
		}
	}, [sounds.search, isSearchSoundPlaying]);

	const handleMusicToggle = useCallback(() => {
		const newMutedState = !isMusicMuted;
		setIsMusicMuted(newMutedState);
		localStorage.setItem("isMusicMuted", String(newMutedState));
	}, [isMusicMuted]);

	useEffect(() => {
		localStorage.setItem("isMusicMuted", "false");
		setIsMusicMuted(false);

		return () => {
			sounds.music.stop();
			sounds.search.stop();
		};
	}, [sounds.music, sounds.search]);

	return {
		isMusicMuted,
		playClickSound,
		handleMusicToggle,
		startSearchSound,
		stopSearchSound,
	};
};
