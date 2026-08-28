import React from "react";
import { Box, Typography, Modal, TextField, InputAdornment, IconButton } from "@mui/material";
import ArrowIcon from "@mui/icons-material/ArrowForwardIosRounded";

const SlidingMenuOverlay = ({
	open,
	onClose,
	handlePassAndPlayClick,
	handleMatchmakeWrapper,
	matchmakingLabel,
	isSearching,
	handlePlayWithFriendWrapper,
	enteredRoomCode,
	setEnteredRoomCode,
	handleJoinRoomWrapper,
	isConnected,
	handleVersusBotClick,
	handleSettingsWrapper,
}) => {
	const menuItems = [
		{ label: "Pass and Play", onClick: handlePassAndPlayClick },
		{ label: matchmakingLabel || "Matchmaking", onClick: handleMatchmakeWrapper },
		{ label: "Play with Friend", onClick: handlePlayWithFriendWrapper },
		{ label: "Versus Bot", onClick: handleVersusBotClick },
		{ label: "Options", onClick: handleSettingsWrapper },
	];

	return (
		<Modal
			open={open}
			onClose={onClose}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 99999,
			}}
		>
			<Box
				sx={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					backgroundColor: "#E2F86B", // Exact Lime Curtain Color Token from Screenshots 1, 2 & 3
					color: "#101417",
					overflowY: "auto",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: { xs: "24px 20px", md: "36px 56px" },
					boxSizing: "border-box",
				}}
			>
				{/* Background Angled Beam Wedges for Exact Screenshot 1 & 2 Parallax Geometry */}
				<Box
					sx={{
						position: "absolute",
						top: 0,
						right: 0,
						width: "55vw",
						height: "100vh",
						backgroundColor: "#8A9470",
						clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
						opacity: 0.35,
						pointerEvents: "none",
						zIndex: 0,
					}}
				/>

				{/* Top Header Bar inside Lime Menu Curtain (Screenshots 1, 2 & 3) */}
				<Box
					sx={{
						position: "relative",
						zIndex: 10,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
						pb: 2,
					}}
				>
					{/* Top-Left: ✕ CLOSE */}
					<Box
						onClick={onClose}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "6px",
							color: "#101417",
							fontWeight: 800,
							fontSize: "0.85rem",
							letterSpacing: "0.08em",
							cursor: "pointer",
							padding: "6px 12px",
							borderRadius: "20px",
							transition: "opacity 0.2s ease",
							"&:hover": { opacity: 0.7 },
						}}
					>
						<span>✕</span>
						<span>CLOSE</span>
					</Box>

					{/* Center: Bold IVENTIONS Style Wordmark */}
					<Typography
						variant="h5"
						sx={{
							fontFamily: "'Plus Jakarta Sans', sans-serif",
							fontWeight: 900,
							fontSize: { xs: "1.5rem", md: "2rem" },
							letterSpacing: "-0.05em",
							color: "#101417",
							textTransform: "uppercase",
						}}
					>
						NEET CHESS
					</Typography>

					{/* Top-Right: CLOSE ✕ */}
					<Box
						onClick={onClose}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "6px",
							color: "#101417",
							fontWeight: 800,
							fontSize: "0.85rem",
							letterSpacing: "0.08em",
							cursor: "pointer",
							padding: "6px 12px",
							borderRadius: "20px",
							transition: "opacity 0.2s ease",
							"&:hover": { opacity: 0.7 },
						}}
					>
						<span>CLOSE</span>
						<span>✕</span>
					</Box>
				</Box>

				{/* 2-Column Content Layout (Screenshots 1, 2 & 3) */}
				<Box
					sx={{
						position: "relative",
						zIndex: 10,
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						justifyContent: "space-between",
						alignItems: { xs: "flex-start", md: "center" },
						gap: { xs: 4, md: 8 },
						my: "auto",
						width: "100%",
						maxWidth: "1400px",
						mx: "auto",
						py: 2,
					}}
				>
					{/* Left Column: Serif label + Headline + Copy + Room Code */}
					<Box sx={{ maxWidth: { xs: "100%", md: "460px" } }}>
						<Typography
							sx={{
								fontFamily: "Georgia, serif",
								fontStyle: "italic",
								fontSize: "1.3rem",
								color: "#101417",
								mb: 1,
							}}
						>
							Contact
						</Typography>

						<Typography
							variant="h2"
							sx={{
								fontFamily: "'Plus Jakarta Sans', sans-serif",
								fontWeight: 800,
								fontSize: { xs: "2.5rem", md: "3.6rem" },
								lineHeight: 1.05,
								letterSpacing: "-0.04em",
								color: "#101417",
								mb: 1.5,
							}}
						>
							Got a big vision or a big idea?
						</Typography>

						<Typography
							sx={{
								fontFamily: "'IBM Plex Sans', sans-serif",
								fontWeight: 400,
								fontSize: "1.05rem",
								lineHeight: 1.45,
								color: "#101417",
								mb: 4,
								opacity: 0.85,
							}}
						>
							We'll get you started — or help you dream bigger. Select a chess mode on the right to enter the arena.
						</Typography>

						{/* Styled Room Code Input Box */}
						<Box
							sx={{
								width: "100%",
								backgroundColor: "#101417",
								borderRadius: "16px",
								padding: "6px 14px",
								boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
							}}
						>
							<TextField
								placeholder="ENTER ROOM CODE..."
								variant="outlined"
								size="small"
								fullWidth
								value={enteredRoomCode}
								onChange={(e) => setEnteredRoomCode(e.target.value.toUpperCase())}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										onClose();
										handleJoinRoomWrapper();
									}
								}}
								sx={{
									"& .MuiOutlinedInput-root": {
										color: "#ffffff",
										fontSize: "0.95rem",
										fontFamily: "'Plus Jakarta Sans', sans-serif",
										fontWeight: 700,
										"& fieldset": { border: "none" },
									},
									"& .MuiInputBase-input::placeholder": {
										color: "rgba(255, 255, 255, 0.65)",
										opacity: 1,
									},
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												sx={{
													color: "#101417",
													backgroundColor: "#E2F86B",
													borderRadius: "8px",
													padding: "6px 14px",
													fontWeight: 800,
													fontSize: "0.8rem",
													"&:hover": {
														backgroundColor: "#ffffff",
													},
												}}
												disabled={!isConnected || !enteredRoomCode.trim()}
												onClick={() => {
													onClose();
													handleJoinRoomWrapper();
												}}
												edge="end"
											>
												JOIN <ArrowIcon sx={{ fontSize: "0.8rem", ml: 0.5 }} />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Box>
					</Box>

					{/* Right Column: Oversized stacked game modes list (Screenshots 1, 2 & 3) */}
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: { xs: "flex-start", md: "flex-end" },
							gap: { xs: 1.5, md: 2.2 },
						}}
					>
						{menuItems.map((item, index) => (
							<Typography
								key={index}
								onClick={() => {
									onClose();
									item.onClick();
								}}
								sx={{
									fontFamily: "'Plus Jakarta Sans', sans-serif",
									fontSize: { xs: "2.2rem", sm: "3.4rem", md: "4.8rem" },
									fontWeight: 800,
									lineHeight: 0.98,
									letterSpacing: "-0.045em",
									color: "#101417",
									cursor: "pointer",
									textAlign: { xs: "left", md: "right" },
									transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
									"&:hover": {
										color: "#362AD9",
										transform: "translateX(-16px)",
									},
								}}
							>
								{item.label}
							</Typography>
						))}
					</Box>
				</Box>

				{/* Bottom Footer Info */}
				<Box
					sx={{
						position: "relative",
						zIndex: 10,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						pt: 2,
						borderTop: "1px solid rgba(16, 20, 23, 0.2)",
					}}
				>
					<Typography
						variant="body2"
						sx={{
							color: "#101417",
							fontWeight: 800,
							fontSize: "0.8rem",
							letterSpacing: "1px",
							fontFamily: "'Plus Jakarta Sans', sans-serif",
							textTransform: "uppercase",
						}}
					>
						NEET CHESS • IVENTIONS ARENA EDITION
					</Typography>
				</Box>
			</Box>
		</Modal>
	);
};

export default SlidingMenuOverlay;
