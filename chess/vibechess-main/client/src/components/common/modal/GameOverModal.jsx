import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, Grid, Button, Fade } from "@mui/material";
import { CircleFlag } from "react-circle-flags";
import ReplayIcon from "@mui/icons-material/Replay";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

const GameOverModal = ({
	isOpen,
	onClose,
	onRematch,
	endReason,
	winner,
	players = [],
	playerColor,
	gameMode,
}) => {
	const navigate = useNavigate();
	const selectedFlag = window.localStorage.getItem("selectedFlag") || "in";

	const handleMenu = () => navigate("/");
	const handleRematch = () => {
		if (onRematch) onRematch();
		onClose();
	};

	const formatEndReason = (reason) => {
		if (!reason) return "";
		const lower = reason.toLowerCase();
		if (
			lower.includes("opponent disconnected") ||
			lower.includes("disconnection") ||
			lower.includes("abandonment")
		) {
			return "by Opponent Disconnection / Abandonment";
		}
		if (lower.includes("resignation") || lower.includes("resigned")) {
			return "by Resignation / Forfeit";
		}
		if (lower.includes("checkmate")) {
			return "by Checkmate";
		}
		if (lower.includes("timeout") || lower.includes("time")) {
			return "on Time (Clock Expired)";
		}
		if (lower.includes("agreement") || lower.includes("draw")) {
			return "by Draw Agreement";
		}
		if (lower.includes("stalemate")) {
			return "by Stalemate";
		}
		if (lower.includes("repetition")) {
			return "by Threefold Repetition";
		}
		if (lower.includes("insufficient")) {
			return "by Insufficient Material";
		}
		return reason;
	};

	const isUserWinner = winner && winner === playerColor;

	const getWinnerMessage = () => {
		if (!winner) return "Game Over (Draw)";

		if (gameMode === "local") {
			return `${winner.toUpperCase()} WON!`;
		}

		if (gameMode === "versus-bot") {
			if (winner === playerColor) {
				return "🏆 YOU WON!";
			} else {
				return "BOT WON!";
			}
		}

		// For multiplayer
		const winnerPlayer = players.find((p) => p.color === winner);
		const currentPlayer = players.find((p) => p.color === playerColor);

		if (winner === playerColor) {
			return `🏆 ${currentPlayer?.name || "YOU"} WON!`;
		} else {
			return `${winnerPlayer?.name || "OPPONENT"} WON!`;
		}
	};

	const getPlayerInfo = (color) => {
		if (gameMode === "local") {
			return {
				name: `${
					color.charAt(0).toUpperCase() + color.slice(1)
				} Player`,
				flag: selectedFlag,
			};
		}

		if (gameMode === "versus-bot") {
			if (color === playerColor) {
				return {
					name: "You",
					flag: selectedFlag,
				};
			} else {
				return {
					name: "Bot",
					flag: "gb",
				};
			}
		}

		// For multiplayer
		const player = players.find((p) => p.color === color);
		return {
			name:
				player?.name ||
				`${color.charAt(0).toUpperCase() + color.slice(1)} Player`,
			flag: player?.flag || selectedFlag,
		};
	};

	const shouldShowBothPlayers = () => {
		return gameMode === "multiplayer" || !winner;
	};

	const getDisplayPlayers = () => {
		const whitePlayer = getPlayerInfo("white");
		const blackPlayer = getPlayerInfo("black");

		if (shouldShowBothPlayers()) {
			return [
				{ ...whitePlayer, color: "white" },
				{ ...blackPlayer, color: "black" },
			];
		}

		if (winner === "white") {
			return [{ ...whitePlayer, color: "white" }];
		} else if (winner === "black") {
			return [{ ...blackPlayer, color: "black" }];
		}

		return [{ ...whitePlayer, color: "white" }];
	};

	const displayPlayers = getDisplayPlayers();

	return (
		<Modal open={isOpen} onClose={onClose} autoFocus={false} closeAfterTransition>
			<Fade in={isOpen}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: { xs: "90%", sm: 440 },
						bgcolor: "#1a1d20",
						border: "1.5px solid rgba(255, 255, 255, 0.15)",
						boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
						p: { xs: 3, sm: 4 },
						borderRadius: 4,
						textAlign: "center",
						outline: "none",
					}}
				>
					{/* Top Winner Box */}
					<Box mb={3}>
						<Typography
							variant="h4"
							sx={{
								fontFamily: "'Bebas Neue', cursive",
								letterSpacing: "2px",
								fontSize: { xs: "2rem", sm: "2.5rem" },
								color: isUserWinner ? "#4ade80" : "#ffffff",
								textShadow: isUserWinner
									? "0 0 20px rgba(74, 222, 128, 0.5)"
									: "0 2px 8px rgba(0,0,0,0.8)",
							}}
						>
							{getWinnerMessage()}
						</Typography>
						<Typography
							variant="subtitle1"
							sx={{
								color: "rgba(255, 255, 255, 0.75)",
								fontSize: "0.95rem",
								mt: 0.5,
							}}
						>
							{formatEndReason(endReason)}
						</Typography>
					</Box>

					{/* Middle Box - Player Info */}
					<Grid container spacing={2} justifyContent="center" mb={4}>
						{displayPlayers.map((player) => {
							const isThisWinner = winner === player.color;
							return (
								<Grid
									item
									xs={shouldShowBothPlayers() ? 6 : 12}
									key={player.color}
								>
									<Box
										sx={{
											p: 2,
											borderRadius: 3,
											bgcolor: isThisWinner
												? "rgba(74, 222, 128, 0.1)"
												: "rgba(255, 255, 255, 0.04)",
											border: isThisWinner
												? "1.5px solid #4ade80"
												: "1px solid rgba(255, 255, 255, 0.08)",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: 1,
										}}
									>
										<CircleFlag
											countryCode={player.flag}
											height="64"
										/>
										<Typography
											variant="subtitle2"
											sx={{
												fontWeight: 700,
												color: "#ffffff",
												letterSpacing: "0.5px",
											}}
										>
											{player.name}
										</Typography>
										{isThisWinner && (
											<Typography
												variant="caption"
												sx={{
													color: "#4ade80",
													fontWeight: 700,
													display: "inline-flex",
													alignItems: "center",
													gap: 0.5,
												}}
											>
												<EmojiEventsRoundedIcon sx={{ fontSize: 16 }} />
												WINNER
											</Typography>
										)}
									</Box>
								</Grid>
							);
						})}
					</Grid>

					{/* Bottom Box - Action Buttons */}
					<Grid container spacing={2} justifyContent="center">
						<Grid item xs={6}>
							<Button
								variant="outlined"
								fullWidth
								onClick={handleMenu}
								sx={{
									height: "48px",
									color: "#ffffff",
									borderColor: "rgba(255, 255, 255, 0.3)",
									borderRadius: "10px",
									fontWeight: 600,
									textTransform: "none",
									"&:hover": {
										borderColor: "#ffffff",
										bgcolor: "rgba(255, 255, 255, 0.08)",
									},
								}}
							>
								Back to Menu
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								variant="contained"
								fullWidth
								startIcon={<ReplayIcon />}
								onClick={handleRematch}
								sx={{
									height: "48px",
									bgcolor: "#2176ff",
									borderRadius: "10px",
									fontWeight: 700,
									textTransform: "none",
									"&:hover": { bgcolor: "#1a62d6" },
								}}
							>
								Rematch
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Fade>
		</Modal>
	);
};

GameOverModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onRematch: PropTypes.func,
	endReason: PropTypes.string,
	winner: PropTypes.string,
	players: PropTypes.array,
	playerColor: PropTypes.string,
	gameMode: PropTypes.string,
};

export default GameOverModal;
