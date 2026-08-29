import { useState, useEffect, useCallback, useRef } from "react";

export const useChessboardState = (gameMode, matchData) => {
	const [selectedPieceSet, setSelectedPieceSet] = useState(
		localStorage.getItem("selectedPieces") || "anarcandy",
	);
	const [selectedTheme, setSelectedTheme] = useState(
		localStorage.getItem("selectedBoard") || "medicalTeal",
	);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
	const [isSettingsHovered, setIsSettingsHovered] = useState(false);
	const [shareModalOpen, setShareModalOpen] = useState(false);
	const [boardWidth, setBoardWidth] = useState(480);

	const [gameState, setGameState] = useState({
		playerColor: null,
		opponent: null,
		roomCode: null,
	});
	const lastProcessedMatchData = useRef(null);

	const handleBoardChange = useCallback((newTheme) => {
		setSelectedTheme(newTheme);
	}, []);

	const handlePiecesChange = useCallback((newPieces) => {
		setSelectedPieceSet(newPieces);
	}, []);

	useEffect(() => {
		const handleStorageChange = (e) => {
			if (e.key === "selectedBoard") {
				setSelectedTheme(e.newValue || "medicalTeal");
			} else if (e.key === "selectedPieces") {
				setSelectedPieceSet(e.newValue || "anarcandy");
			}
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	useEffect(() => {
		if (!matchData || gameMode !== "multiplayer") return;
		if (lastProcessedMatchData.current?.roomCode === matchData.roomCode)
			return;

		lastProcessedMatchData.current = matchData;
		setGameState({
			playerColor: matchData.yourColor,
			roomCode: matchData.roomCode,
			opponent: matchData.opponent
				? {
						name: matchData.opponent.name,
						color: matchData.opponent.color,
						flag: matchData.opponent.flag?.toLowerCase(),
					}
				: null,
		});
	}, [matchData, gameMode]);

	const handleResize = useCallback(() => {
		const screenW = window.innerWidth;
		const screenH = window.innerHeight;
		// Responsive board width calculation for mobile and desktop
		const maxW = Math.min(screenW - (screenW < 600 ? 20 : 100), screenH * (screenW < 600 ? 0.52 : 0.72), 600);
		setBoardWidth(Math.max(Math.floor(maxW), 260));
	}, []);

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	return {
		selectedPieceSet,
		setSelectedPieceSet,
		selectedTheme,
		setSelectedTheme,
		isSettingsModalOpen,
		setIsSettingsModalOpen,
		isSettingsHovered,
		setIsSettingsHovered,
		shareModalOpen,
		setShareModalOpen,
		boardWidth,
		handleBoardChange,
		handlePiecesChange,
		...gameState,
	};
};