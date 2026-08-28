import React, { useState, useMemo, useContext, useCallback } from "react";
import {
	Box,
	Container,
	IconButton,
	Typography,
	TextField,
	InputAdornment,
	Slide,
	Zoom,
	Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNote";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import QuizIcon from "@mui/icons-material/Quiz";
import ArrowIcon from "@mui/icons-material/ArrowForwardIosRounded";
import MusicOffRoundedIcon from "@mui/icons-material/MusicOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import {
	PassNPlayIcon,
	MatchmakingIcon,
	PlayWithFriendIcon,
	VersusBotIcon,
	SettingsIcon,
	VibeChessLogo,
	VibeChessLogoBlack,
	styles,
	rotatingImageStyle,
	rotatingImageRotate,
} from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeContext } from "../../theme/ThemeContext";
import MenuButton from "./MenuButton";
import SettingsModal from "../common/modal/SettingsModal";
import TimeControlModal from "./TimeControlModal";
import FAQModal from "../common/modal/FAQModal";
import useSocketContext from "../../context/useSocketContext";

import { useMenuSounds } from "../../hooks/useMenuSounds";
import { useMatchmaking } from "../../hooks/useMatchmaking";
import { useRoomJoining } from "../../hooks/useRoomJoining";
import { useMenuNavigation } from "../../hooks/useMenuNavigation";
import neetBg from "../../assets/neet_bg.jpg";
import neetDice from "../../assets/neet_dice.png";
import BackgroundVideo from "./BackgroundVideo";
import LandingAudio from "./LandingAudio";
import FanHeroBackground from "./FanHeroBackground";
import CentralVideoCard from "./CentralVideoCard";
import SlidingMenuOverlay from "./SlidingMenuOverlay";
import GameIdeaModal from "./GameIdeaModal";

const useAnimatedEllipsis = (isActive) => {
	const [dotCount, setDotCount] = useState(1);

	React.useEffect(() => {
		if (!isActive) return;

		const interval = setInterval(() => {
			setDotCount((prev) => (prev % 3) + 1);
		}, 500);

		return () => clearInterval(interval);
	}, [isActive]);

	return isActive ? ".".repeat(dotCount) : "";
};

const Menu = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { switchColorMode } = useContext(ThemeContext);
	const { isConnected } = useSocketContext();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
	const [isTimeControlModalOpen, setIsTimeControlModalOpen] = useState(false);
	const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
	const [isRotating, setIsRotating] = useState(false);
	const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false);
	const [isGameIdeaOpen, setIsGameIdeaOpen] = useState(false);

	const {
		isMusicMuted,
		playClickSound,
		handleMusicToggle,
		startSearchSound,
		stopSearchSound,
	} = useMenuSounds();
	const { isSearching, handleMatchmakeClick } = useMatchmaking(
		startSearchSound,
		stopSearchSound
	);
	const { enteredRoomCode, setEnteredRoomCode, handleJoinRoom } =
		useRoomJoining();
	const {
		handlePassAndPlayClick,
		handlePlayWithFriendClick,
		handleVersusBotClick,
		handleSettingsClick,
	} = useMenuNavigation(playClickSound);

	const animatedEllipsis = useAnimatedEllipsis(isSearching);

	const handleImageClick = useCallback(() => {
		setIsRotating((prev) => !prev);
	}, []);

	const handleTimeControlClose = useCallback(() => {
		playClickSound();
		setIsTimeControlModalOpen(false);
	}, [playClickSound]);

	const handleCloseSettingsModal = useCallback(() => {
		playClickSound();
		setIsSettingsModalOpen(false);
	}, [playClickSound]);

	const handlePlayWithFriendWrapper = useCallback(() => {
		const shouldOpen = handlePlayWithFriendClick();
		if (shouldOpen) {
			setIsTimeControlModalOpen(true);
		}
	}, [handlePlayWithFriendClick]);

	const handleSettingsWrapper = useCallback(() => {
		const shouldOpen = handleSettingsClick();
		if (shouldOpen) {
			setIsSettingsModalOpen(true);
		}
	}, [handleSettingsClick]);

	const handleMatchmakeWrapper = useCallback(() => {
		playClickSound();
		handleMatchmakeClick();
	}, [playClickSound, handleMatchmakeClick]);

	const handleJoinRoomWrapper = useCallback(() => {
		playClickSound();
		handleJoinRoom();
	}, [playClickSound, handleJoinRoom]);

	const iconButtons = useMemo(
		() => [
			{
				icon: QuizIcon,
				title: "FAQs",
				color: "#2176ff",
				onClick: () => {
					playClickSound();
					setIsFAQModalOpen(true);
				},
			},
			{
				icon: GitHubIcon,
				title: "GitHub",
				color: "primary.main",
				onClick: () =>
					window.open(
						"https://github.com/nathanielseth/VibeChess",
						"_blank"
					),
			},
			{
				icon: FreeBreakfastIcon,
				title: "Buy Me A Coffee",
				color: "#F49F0A",
				onClick: () =>
					window.open(
						"https://www.buymeacoffee.com/nathanielseth",
						"_blank"
					),
			},
			{
				icon:
					theme.palette.mode === "dark"
						? LightModeIcon
						: DarkModeIcon,
				title: "Toggle UI Mode",
				color: "#1f2123",
				onClick: switchColorMode,
			},
			{
				icon: isMusicMuted ? MusicOffRoundedIcon : MusicNoteRoundedIcon,
				title: "Toggle Music",
				color: "#1f2123",
				onClick: handleMusicToggle,
			},
		],
		[
			theme.palette.mode,
			switchColorMode,
			isMusicMuted,
			handleMusicToggle,
			playClickSound,
		]
	);

	const rotationStyle = isRotating ? rotatingImageRotate : {};
	const iconSize = isMobile ? 24 : 26;

	const matchmakingLabel = isSearching
		? `FINDING OPPONENT${animatedEllipsis}`
		: "MATCHMAKING";

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100dvh",
				margin: 0,
				padding: isMobile ? "20px 0" : 0,
				overflowY: "auto",
				overflowX: "hidden",
				position: "relative",
				zIndex: 1,
			}}
		>
			<BackgroundVideo />

			{/* Title */}
			<Container
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					marginBottom: isMobile ? "20px" : "30px",
					marginTop: isMobile ? "0" : "0px",
					position: "relative",
					zIndex: 2,
				}}
			>
				<Zoom in={true}>
					<Typography
						variant="h2"
						color="white"
						textAlign="center"
						sx={{
							fontSize: isMobile ? "3rem" : "4.5rem",
							letterSpacing: "4px",
							fontFamily: "'Bebas Neue', cursive",
							color: "#ffffff",
							textShadow: "0 3px 10px rgba(0, 0, 0, 0.9)",
						}}
					>
						ILAAJ-E-MAAT
					</Typography>
				</Zoom>
			</Container>

			{/* Main Menu Buttons */}
			<Box
				sx={{
					display: "flex",
					flexDirection: isMobile ? "column" : "row",
					alignItems: "flex-start",
					marginTop: "5px",
					flexWrap: "nowrap",
					overflowX: "visible",
					overflowY: "visible",
					width: "100%",
					justifyContent: "center",
					gap: isMobile ? "10px" : "0",
					position: "relative",
					zIndex: 2,
				}}
			>
				<MenuButton
					onClick={handlePassAndPlayClick}
					icon={PassNPlayIcon}
					label="PASS AND PLAY"
					backgroundColor="#c490d1"
					description="Practice locally in a solo game or pass-and-play with a friend."
				/>

				<MenuButton
					onClick={handleMatchmakeWrapper}
					icon={MatchmakingIcon}
					label={matchmakingLabel}
					backgroundColor={isSearching ? "#ff6b6b" : "secondary.main"}
					description={
						isSearching
							? "Click to cancel search"
							: "Search for an opponent through random matchmaking."
					}
					isAnimating={isSearching}
				/>

				{/* Private Room */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<MenuButton
						onClick={handlePlayWithFriendWrapper}
						icon={PlayWithFriendIcon}
						label="PLAY WITH FRIEND"
						backgroundColor="primary.main"
						description="Create a room and invite your friend for a multiplayer match."
					/>

					<Slide direction="up" in={true} mountOnEnter unmountOnExit>
						<Box
							sx={{
								width: isMobile ? "300px" : "25vh",
								marginTop: isMobile ? "10px" : "4px",
								backgroundColor: "rgba(0, 0, 0, 0.25)",
								backdropFilter: "blur(8px)",
								borderRadius: "14px",
								border: "2px solid #000000",
								padding: "4px",
								boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
								transition: "all 0.3s ease",
								"&:hover": {
									borderColor: "#000000",
									backgroundColor: "rgba(0, 0, 0, 0.45)",
								},
							}}
						>
							<TextField
								label="Enter Room Code"
								variant="outlined"
								size="small"
								fullWidth
								value={enteredRoomCode}
								onChange={(e) =>
									setEnteredRoomCode(e.target.value.toUpperCase())
								}
								onKeyDown={(e) =>
									e.key === "Enter" && handleJoinRoomWrapper()
								}
								sx={{
									"& .MuiOutlinedInput-root": {
										color: "#ffffff",
										fontSize: "0.95rem",
										fontFamily: "'Bebas Neue', cursive",
										letterSpacing: "1px",
										"& fieldset": { border: "none" },
									},
									"& .MuiInputLabel-root": {
										color: "#ffffff",
										fontSize: "0.85rem",
										textShadow: "0 1px 3px rgba(0,0,0,0.8)",
									},
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												sx={{
													color: "#ffffff",
													backgroundColor: "#000000",
													borderRadius: "8px",
													padding: "6px",
													"&:hover": {
														backgroundColor: "#222222",
														color: "#ffffff",
													},
												}}
												disabled={
													!isConnected ||
													!enteredRoomCode.trim()
												}
												onClick={handleJoinRoomWrapper}
												edge="end"
											>
												<ArrowIcon sx={{ fontSize: "1rem" }} />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Box>
					</Slide>
				</Box>

				<MenuButton
					onClick={handleVersusBotClick}
					icon={VersusBotIcon}
					label="VERSUS BOT"
					backgroundColor="#F49F0A"
					description="Test your skills against an AI opponent."
				/>

				<MenuButton
					onClick={handleSettingsWrapper}
					icon={SettingsIcon}
					label="OPTIONS"
					backgroundColor="#565676"
					description="Adjust board theme, sound settings, and appearance preferences."
					extraContent={
						<Box
							onClick={(e) => {
								e.stopPropagation();
								handleMusicToggle();
							}}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "34px",
								height: "34px",
								borderRadius: "50%",
								backgroundColor: isMusicMuted ? "rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0.18)",
								border: "1.5px solid #ffffff",
								color: "#ffffff",
								cursor: "pointer",
								boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
								transition: "all 0.2s ease",
								"&:hover": {
									transform: "scale(1.12)",
									backgroundColor: isMusicMuted ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.3)",
								},
							}}
							title={isMusicMuted ? "Resume Music" : "Pause Music"}
						>
							{isMusicMuted ? (
								<VolumeOffRoundedIcon sx={{ fontSize: "1.25rem", color: "#ffffff" }} />
							) : (
								<VolumeUpRoundedIcon sx={{ fontSize: "1.25rem", color: "#ffffff" }} />
							)}
						</Box>
					}
				/>
			</Box>

			{/* Modals */}
			<TimeControlModal
				isOpen={isTimeControlModalOpen}
				onClose={handleTimeControlClose}
				onSelectTimeControl={(timeControl) => {
					handleTimeControlClose();
					navigate("/room", {
						state: { selectedTimeControl: timeControl },
					});
				}}
			/>

			<SettingsModal
				isOpen={isSettingsModalOpen}
				onClose={handleCloseSettingsModal}
			/>

			<FAQModal
				isOpen={isFAQModalOpen}
				onClose={() => {
					playClickSound();
					setIsFAQModalOpen(false);
				}}
			/>
		</Box>
	);
};

export default Menu;
