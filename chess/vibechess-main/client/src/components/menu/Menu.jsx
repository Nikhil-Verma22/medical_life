import React, { useState, useEffect, useMemo, useContext, useCallback } from "react";
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
import { CircleFlag } from "react-circle-flags";
import FlagSelectorModal from "../common/modal/FlagSelectorModal";
import { generateRandomUsername } from "../../data/randomName";
import { validateUsername } from "../../utils/usernameValidation";
import { toast } from "react-toastify";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CasinoRoundedIcon from "@mui/icons-material/CasinoRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

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

	const [currentUsername, setCurrentUsername] = useState(
		() => window.localStorage.getItem("username") || "Player"
	);
	const [currentFlag, setCurrentFlag] = useState(
		() => window.localStorage.getItem("selectedFlag") || "in"
	);
	const [isEditingUsername, setIsEditingUsername] = useState(false);
	const [editUsernameVal, setEditUsernameVal] = useState(
		() => window.localStorage.getItem("username") || "Player"
	);
	const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);

	useEffect(() => {
		const handleSettingsChanged = (e) => {
			if (e.detail?.username) {
				setCurrentUsername(e.detail.username);
				setEditUsernameVal(e.detail.username);
			}
		};
		const handleStorageChange = () => {
			const u = window.localStorage.getItem("username");
			const f = window.localStorage.getItem("selectedFlag");
			if (u) {
				setCurrentUsername(u);
				setEditUsernameVal(u);
			}
			if (f) {
				setCurrentFlag(f);
			}
		};
		window.addEventListener("settingsChanged", handleSettingsChanged);
		window.addEventListener("storage", handleStorageChange);
		return () => {
			window.removeEventListener("settingsChanged", handleSettingsChanged);
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	const handleSaveQuickUsername = () => {
		let finalName = editUsernameVal.trim();
		if (!finalName) {
			finalName = generateRandomUsername();
		}
		const err = validateUsername(finalName);
		if (err) {
			toast.error(err);
			return;
		}
		setCurrentUsername(finalName);
		setEditUsernameVal(finalName);
		setIsEditingUsername(false);
		window.localStorage.setItem("username", finalName);
		window.dispatchEvent(
			new CustomEvent("settingsChanged", {
				detail: { username: finalName },
			})
		);
		toast.success(`Username set to ${finalName}!`);
	};

	const handleRandomQuickUsername = () => {
		const randName = generateRandomUsername();
		setCurrentUsername(randName);
		setEditUsernameVal(randName);
		setIsEditingUsername(false);
		window.localStorage.setItem("username", randName);
		window.dispatchEvent(
			new CustomEvent("settingsChanged", {
				detail: { username: randName },
			})
		);
		toast.info(`Random name: ${randName}`);
	};

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

			{/* Title & Quick Username Profile */}
			<Container
				sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					marginBottom: isMobile ? "10px" : "15px",
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

				{/* Quick Username & Flag Bar */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 1.2,
						mt: 1,
						px: 2.2,
						py: 0.7,
						borderRadius: "50px",
						background: "rgba(0, 0, 0, 0.55)",
						backdropFilter: "blur(14px)",
						border: "1.5px solid rgba(255, 255, 255, 0.25)",
						boxShadow: "0 8px 30px rgba(0, 0, 0, 0.45)",
						transition: "all 0.3s ease",
						"&:hover": {
							borderColor: "#2176ff",
							boxShadow: "0 8px 30px rgba(33, 118, 255, 0.35)",
						},
					}}
				>
					<Tooltip title="Change Flag">
						<IconButton
							onClick={() => setIsFlagModalOpen(true)}
							sx={{
								p: 0.2,
								transition: "transform 0.2s ease",
								"&:hover": { transform: "scale(1.15)" },
							}}
						>
							<CircleFlag countryCode={currentFlag || "in"} height="26" />
						</IconButton>
					</Tooltip>

					{isEditingUsername ? (
						<Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
							<TextField
								size="small"
								variant="standard"
								value={editUsernameVal}
								onChange={(e) => setEditUsernameVal(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleSaveQuickUsername();
									if (e.key === "Escape") setIsEditingUsername(false);
								}}
								autoFocus
								inputProps={{
									maxLength: 14,
									style: {
										color: "#ffffff",
										fontFamily: "'Bebas Neue', cursive",
										fontSize: "1.25rem",
										letterSpacing: "1px",
										textAlign: "center",
										width: "130px",
									},
								}}
								sx={{
									"& .MuiInput-underline:before": { borderBottomColor: "rgba(255,255,255,0.4)" },
									"& .MuiInput-underline:after": { borderBottomColor: "#2176ff" },
								}}
							/>
							<Tooltip title="Save Name">
								<IconButton
									size="small"
									onClick={handleSaveQuickUsername}
									sx={{
										color: "#4ade80",
										backgroundColor: "rgba(74, 222, 128, 0.18)",
										p: "4px",
										"&:hover": { backgroundColor: "rgba(74, 222, 128, 0.35)" },
									}}
								>
									<CheckRoundedIcon sx={{ fontSize: 18 }} />
								</IconButton>
							</Tooltip>
						</Box>
					) : (
						<Box
							onClick={() => setIsEditingUsername(true)}
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 0.8,
								cursor: "pointer",
								px: 1,
								py: 0.2,
								borderRadius: "6px",
								"&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
							}}
						>
							<Typography
								sx={{
									color: "#ffffff",
									fontFamily: "'Bebas Neue', cursive",
									fontSize: isMobile ? "1.15rem" : "1.35rem",
									letterSpacing: "1.5px",
									textShadow: "0 2px 6px rgba(0,0,0,0.8)",
								}}
							>
								{currentUsername}
							</Typography>
							<Tooltip title="Edit Username">
								<EditRoundedIcon
									sx={{
										color: "rgba(255, 255, 255, 0.7)",
										fontSize: 16,
										"&:hover": { color: "#ffffff" },
									}}
								/>
							</Tooltip>
						</Box>
					)}

					<Tooltip title="Generate Random Name">
						<IconButton
							size="small"
							onClick={handleRandomQuickUsername}
							sx={{
								color: "rgba(255, 255, 255, 0.8)",
								p: "4px",
								transition: "transform 0.3s ease",
								"&:hover": {
									color: "#f59e0b",
									transform: "rotate(45deg)",
								},
							}}
						>
							<CasinoRoundedIcon sx={{ fontSize: 19 }} />
						</IconButton>
					</Tooltip>

					<Tooltip title="Settings">
						<IconButton
							size="small"
							onClick={() => setIsSettingsModalOpen(true)}
							sx={{
								color: "rgba(255, 255, 255, 0.8)",
								p: "4px",
								"&:hover": {
									color: "#2176ff",
									transform: "rotate(90deg)",
								},
							}}
						>
							<SettingsRoundedIcon sx={{ fontSize: 18 }} />
						</IconButton>
					</Tooltip>
				</Box>
			</Container>

			{/* Main Menu Buttons */}
			<Box
				sx={{
					display: "flex",
					flexDirection: isMobile ? "column" : "row",
					alignItems: isMobile ? "center" : "flex-start",
					marginTop: isMobile ? "8px" : "16px",
					flexWrap: "nowrap",
					overflowX: "visible",
					overflowY: "visible",
					width: "100%",
					justifyContent: "center",
					gap: isMobile ? "8px" : "0",
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

				{/* Merged Friendly Battle Card (Play with Friend + Room Code) */}
				<Box
					sx={{
						width: isMobile ? "min(92vw, 320px)" : "25vh",
						minHeight: isMobile ? "auto" : "210px",
						margin: isMobile ? "3px 0" : "0 6px",
						backgroundColor: "rgba(0, 0, 0, 0.45)",
						backdropFilter: "blur(12px)",
						border: "2px solid rgba(33, 118, 255, 0.55)",
						borderRadius: isMobile ? "16px" : "18px",
						boxShadow: "0 4px 22px rgba(33, 118, 255, 0.3)",
						overflow: "hidden",
						display: "flex",
						flexDirection: "column",
						transition: "all 0.3s ease",
						"&:hover": {
							borderColor: "#2176ff",
							boxShadow: "0 8px 30px rgba(33, 118, 255, 0.5)",
						},
					}}
				>
					{/* Top Action: Create Friend Room */}
					<Button
						onClick={handlePlayWithFriendWrapper}
						variant="text"
						sx={{
							width: "100%",
							height: isMobile ? "46px" : "140px",
							minHeight: isMobile ? "46px" : "130px",
							padding: isMobile ? "8px 14px" : "14px 12px",
							borderRadius: 0,
							display: "flex",
							flexDirection: isMobile ? "row" : "column",
							alignItems: "center",
							justifyContent: isMobile ? "flex-start" : "center",
							gap: isMobile ? "12px" : "0",
							"&:hover": {
								backgroundColor: "rgba(33, 118, 255, 0.15)",
							},
						}}
					>
						<Box
							sx={{
								width: isMobile ? "32px" : "44px",
								height: isMobile ? "32px" : "44px",
								borderRadius: "10px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "rgba(33, 118, 255, 0.25)",
								marginBottom: isMobile ? 0 : "8px",
								border: "1.5px solid rgba(33, 118, 255, 0.4)",
								flexShrink: 0,
							}}
						>
							<img
								src={PlayWithFriendIcon}
								alt="Play with Friend"
								style={{
									width: isMobile ? "18px" : "26px",
									height: isMobile ? "18px" : "26px",
									filter: "brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
								}}
							/>
						</Box>
						<Typography
							variant="h6"
							sx={{
								fontFamily: "'Bebas Neue', cursive",
								fontSize: isMobile ? "1.15rem" : "1.35rem",
								letterSpacing: "1px",
								color: "#ffffff",
								marginBottom: isMobile ? 0 : "2px",
								textAlign: isMobile ? "left" : "center",
								lineHeight: 1.1,
								textShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
								flexGrow: isMobile ? 1 : 0,
							}}
						>
							PLAY WITH FRIEND
						</Typography>
						<Typography
							variant="caption"
							sx={{
								color: "rgba(255, 255, 255, 0.75)",
								fontSize: "0.72rem",
								textAlign: "center",
								lineHeight: 1.2,
								fontFamily: "'IBM Plex Sans', sans-serif",
								textTransform: "none",
								display: isMobile ? "none" : "-webkit-box",
								WebkitLineClamp: 2,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
							}}
						>
							Create a room and invite a friend
						</Typography>
						{isMobile && (
							<Typography
								sx={{
									fontSize: "0.7rem",
									fontWeight: 700,
									color: "#60a5fa",
									backgroundColor: "rgba(33, 118, 255, 0.2)",
									px: 1,
									py: 0.3,
									borderRadius: "6px",
									letterSpacing: "0.5px",
								}}
							>
								CREATE
							</Typography>
						)}
					</Button>

					{/* Divider: OR JOIN WITH CODE */}
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							px: 1.5,
							py: isMobile ? 0.3 : 0.5,
							borderTop: "1px dashed rgba(33, 118, 255, 0.35)",
							backgroundColor: "rgba(0, 0, 0, 0.25)",
						}}
					>
						<Typography
							sx={{
								fontFamily: "'IBM Plex Sans', sans-serif",
								fontSize: isMobile ? "0.62rem" : "0.7rem",
								fontWeight: 700,
								color: "#93c5fd",
								letterSpacing: "1px",
								textTransform: "uppercase",
							}}
						>
							— OR JOIN WITH CODE —
						</Typography>
					</Box>

					{/* Bottom Action: Join with Room Code */}
					<Box
						sx={{
							padding: isMobile ? "4px 8px 6px" : "6px 10px 10px",
							backgroundColor: "rgba(0, 0, 0, 0.2)",
						}}
					>
						<TextField
							placeholder="ENTER ROOM CODE"
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
									fontSize: isMobile ? "0.85rem" : "0.95rem",
									fontFamily: "'Bebas Neue', cursive",
									letterSpacing: "1.5px",
									backgroundColor: "rgba(0, 0, 0, 0.4)",
									borderRadius: "10px",
									border: "1px solid rgba(33, 118, 255, 0.3)",
									paddingRight: "4px",
									"& fieldset": { border: "none" },
									"&:hover": {
										borderColor: "#2176ff",
									},
								},
								"& .MuiInputBase-input": {
									padding: isMobile ? "6px 10px" : "8px 12px",
									textAlign: "center",
									"&::placeholder": {
										color: "rgba(255, 255, 255, 0.5)",
										opacity: 1,
									},
								},
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											sx={{
												color: "#ffffff",
												backgroundColor: "#2176ff",
												borderRadius: "8px",
												padding: isMobile ? "4px" : "6px",
												"&:hover": {
													backgroundColor: "#1960d2",
												},
												"&.Mui-disabled": {
													backgroundColor: "rgba(255, 255, 255, 0.1)",
													color: "rgba(255, 255, 255, 0.3)",
												},
											}}
											disabled={
												!isConnected ||
												!enteredRoomCode.trim()
											}
											onClick={handleJoinRoomWrapper}
											edge="end"
										>
											<ArrowIcon sx={{ fontSize: isMobile ? "0.85rem" : "1rem" }} />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Box>
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

			<FlagSelectorModal
				isOpen={isFlagModalOpen}
				onClose={() => setIsFlagModalOpen(false)}
				onSelectFlag={(newFlag) => {
					setCurrentFlag(newFlag);
					window.localStorage.setItem("selectedFlag", newFlag);
					setIsFlagModalOpen(false);
					toast.success("Flag updated!");
				}}
			/>
		</Box>
	);
};

export default Menu;
