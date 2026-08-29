import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Loading from "../common/Loading";
import { Stack } from "@mui/material";
import ChessboardComponent from "./ChessboardComponent";
import ConfirmationModal from "../common/modal/ConfirmationModal";
import { notifySound } from "../../data/utils";
import { toast } from "react-toastify";
import useSocketContext from "../../context/useSocketContext";

const Multiplayer = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [gameMode] = useState("multiplayer");
	const [matchData, setMatchData] = useState(null);
	const [isGameReady, setIsGameReady] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);

	const gameInitialized = useRef(false);
	const hasJoinedRoom = useRef(false);
	const listenersSetup = useRef(false);
	const matchDataProcessed = useRef(false);

	const { socket, isConnected, emit, on } = useSocketContext();

	useEffect(() => {
		const data = location.state;
		if (!data) {
			toast.error("No match data found");
			navigate("/");
			return;
		}

		if (matchDataProcessed.current) return;
		matchDataProcessed.current = true;

		setMatchData(data);
		console.log("📦 Match data received:", data);
		gameInitialized.current = false;
		setIsGameReady(false);
		hasJoinedRoom.current = false;
	}, [location.state, navigate]);

	useEffect(() => {
		if (!socket || !isConnected || !matchData || listenersSetup.current)
			return;

		console.log("🔌 Setting up socket listeners...");
		listenersSetup.current = true;

		const cleanup = [];

		cleanup.push(
			on("gameInitialized", (data) => {
				if (!gameInitialized.current) {
					console.log("🎮 Game initialized:", data);
					setIsGameReady(true);
					gameInitialized.current = true;
					notifySound.play();
				}
			})
		);

		cleanup.push(
			on("initializationError", (error) => {
				console.error("❌ Game initialization failed:", error);
				toast.error(`Failed to initialize: ${error.message}`);
			})
		);

		cleanup.push(
			on("roomNotFound", () => {
				console.error("❌ Room not found");
				toast.error("Room not found");
				navigate("/");
			})
		);

		return () => {
			cleanup.forEach((fn) => fn && fn());
			listenersSetup.current = false;
		};
	}, [socket, isConnected, matchData, navigate, on]);

	useEffect(() => {
		if (!socket?.id || !isConnected || !matchData || hasJoinedRoom.current)
			return;

		const joinTimer = setTimeout(() => {
			if (hasJoinedRoom.current) return;

			const username = localStorage.getItem("username") || "Player";
			const selectedFlag = localStorage.getItem("selectedFlag");

			console.log(
				`🚪 Joining room: ${matchData.roomCode} with socket ID: ${socket.id}`
			);

			emit("joinRoom", {
				roomCode: matchData.roomCode,
				playerName: username,
				flag: selectedFlag,
			});

			hasJoinedRoom.current = true;
		}, 200);

		return () => {
			clearTimeout(joinTimer);
		};
	}, [socket?.id, isConnected, matchData, emit]);

	useEffect(() => {
		if (!isConnected && gameInitialized.current) {
			console.log("🔄 Connection lost, resetting...");
			setIsGameReady(false);
			gameInitialized.current = false;
			hasJoinedRoom.current = false;
			listenersSetup.current = false;
			matchDataProcessed.current = false;
			toast.info("Reconnecting...");
		}
	}, [isConnected]);

	const handleNavbarBackClick = () => {
		if (isGameOver || !isGameReady) {
			navigate("/");
		} else {
			setIsLeaveConfirmOpen(true);
		}
	};

	const handleConfirmLeave = () => {
		if (socket && matchData?.roomCode) {
			socket.emit("resign", { roomCode: matchData.roomCode });
		}
		navigate("/");
	};

	if (!isGameReady || !matchData) {
		return (
			<Stack sx={{ bgcolor: "background.default", minHeight: "100dvh" }}>
				<Navbar gameMode={gameMode} onClick={() => navigate("/")} />
				<Stack
					minHeight="100dvh"
					justifyContent="center"
					alignItems="center"
				>
					<Loading />
				</Stack>
			</Stack>
		);
	}

	return (
		<Stack minHeight="100dvh" sx={{ bgcolor: "background.default" }}>
			<Navbar gameMode={gameMode} onClick={handleNavbarBackClick} />
			<Stack flexGrow={1} justifyContent="center" alignItems="center">
				<ChessboardComponent
					gameMode={gameMode}
					matchData={matchData}
					socket={socket}
					isConnected={isConnected}
					onGameEnd={() => setIsGameOver(true)}
				/>
			</Stack>

			<ConfirmationModal
				isOpen={isLeaveConfirmOpen}
				onClose={() => setIsLeaveConfirmOpen(false)}
				onConfirm={handleConfirmLeave}
				title="Leave Match?"
				message="Are you sure you want to leave this game? Leaving will forfeit the match and declare your opponent the winner."
				confirmText="Leave & Forfeit"
				cancelText="Keep Playing"
				isDanger={true}
			/>
		</Stack>
	);
};

export default Multiplayer;
