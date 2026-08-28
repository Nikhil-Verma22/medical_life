import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const FanHeroBackground = ({ children, onOpenMenu, onOpenGameIdea, isMenuOpen }) => {
	const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
	const [isOverVideo, setIsOverVideo] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e) => {
			setCursorPos({ x: e.clientX, y: e.clientY });

			const target = document.elementFromPoint(e.clientX, e.clientY);
			if (target && target.closest(".video-card-zone")) {
				setIsOverVideo(true);
			} else {
				setIsOverVideo(false);
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	// Exact 1-to-1 Polygon Fan Shape matching the screenshot reference:
	// Top apex: 52% to 65% across the top bar
	// Right boundary: slants down to 60% at bottom edge
	// Bottom boundary: spans 0% to 60% along bottom
	// Left boundary: goes up left edge to 35% height, then slants up to 52% at top
	const exactFanClipPath = "polygon(52% 0%, 65% 0%, 60% 100%, 0% 100%, 0% 35%)";

	return (
		<Box
			sx={{
				position: "relative",
				width: "100vw",
				height: "100vh",
				maxHeight: "100vh",
				backgroundColor: "#E8E2DA", // Warm Sand Canvas
				overflow: "hidden",
				color: "#101417",
				fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				cursor: "default",
			}}
		>
			{/* Custom Circular White Ring Cursor */}
			<Box
				sx={{
					position: "fixed",
					top: cursorPos.y,
					left: cursorPos.x,
					width: isOverVideo ? "70px" : "36px",
					height: isOverVideo ? "70px" : "36px",
					borderRadius: "50%",
					border: "2px solid #ffffff",
					backgroundColor: isOverVideo ? "#ffffff" : "transparent",
					color: "#101417",
					display: { xs: "none", md: "flex" },
					alignItems: "center",
					justifyContent: "center",
					fontWeight: 800,
					fontSize: "0.75rem",
					letterSpacing: "1px",
					pointerEvents: "none",
					transform: "translate(-50%, -50%)",
					transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease",
					zIndex: 9999,
					boxShadow: "0 0 15px rgba(0,0,0,0.2)",
				}}
			>
				{isOverVideo ? "PLAY" : ""}
			</Box>

			{/* LAYER 1: Base Wordmark Outside Fan (Sand Taupe #D5CDBE) */}
			<Box
				sx={{
					position: "absolute",
					bottom: "0",
					left: "0",
					width: "100vw",
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-end",
					zIndex: 1,
					pointerEvents: "none",
					userSelect: "none",
					overflow: "hidden",
				}}
			>
				<Typography
					sx={{
						fontFamily: "'Plus Jakarta Sans', sans-serif",
						fontSize: { xs: "18vw", md: "16.5vw" },
						lineHeight: 0.75,
						letterSpacing: "-0.06em",
						fontWeight: 900,
						color: "#D5CDBE", // Muted Sand Taupe for Canvas
						textTransform: "uppercase",
						width: "100%",
						textAlign: "center",
						whiteSpace: "nowrap",
					}}
				>
					NEET CHESS
				</Typography>
			</Box>

			{/* LAYER 2: Exact Purple Spotlight Fan Beam (#857BEA) */}
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					zIndex: 2,
					pointerEvents: "none",
					backgroundColor: "#857BEA", // Exact Periwinkle Purple Beam Token
					clipPath: exactFanClipPath,
				}}
			/>

			{/* LAYER 3: Masked Wordmark Inside Purple Fan (Vivid Electric Blue #362AD9) */}
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					zIndex: 3,
					pointerEvents: "none",
					clipPath: exactFanClipPath,
					overflow: "hidden",
				}}
			>
				<Box
					sx={{
						position: "absolute",
						bottom: "0",
						left: "0",
						width: "100vw",
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "flex-end",
					}}
				>
					<Typography
						sx={{
							fontFamily: "'Plus Jakarta Sans', sans-serif",
							fontSize: { xs: "18vw", md: "16.5vw" },
							lineHeight: 0.75,
							letterSpacing: "-0.06em",
							fontWeight: 900,
							color: "#362AD9", // Vivid Electric Blue inside purple fan
							textTransform: "uppercase",
							width: "100%",
							textAlign: "center",
							whiteSpace: "nowrap",
						}}
					>
						NEET CHESS
					</Typography>
				</Box>
			</Box>

			{/* Top Header Nav Bar */}
			<Box
				sx={{
					position: "relative",
					zIndex: 100,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: { xs: "16px 24px", md: "28px 56px" },
				}}
			>
				{/* Top-Left: Pill Lime MENU Button */}
				<Box
					onClick={onOpenMenu}
					sx={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
						backgroundColor: isMenuOpen ? "#ffffff" : "#E2F86B",
						color: "#101417",
						padding: "10px 24px",
						borderRadius: "30px",
						fontWeight: 800,
						fontSize: "0.85rem",
						letterSpacing: "0.05em",
						boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
						cursor: "pointer",
						transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
						"&:hover": {
							transform: "translateY(-2px)",
							boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
						},
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: "3px",
							width: "14px",
						}}
					>
						<Box sx={{ width: "100%", height: "2px", backgroundColor: "#101417" }} />
						<Box sx={{ width: "100%", height: "2px", backgroundColor: "#101417" }} />
					</Box>
					<span>{isMenuOpen ? "CLOSE" : "MENU"}</span>
				</Box>

				{/* Center: Centered Wordmark */}
				<Typography
					variant="h5"
					sx={{
						fontFamily: "'Plus Jakarta Sans', sans-serif",
						fontWeight: 900,
						fontSize: { xs: "1.4rem", md: "1.8rem" },
						letterSpacing: "-0.04em",
						color: "#101417",
						textTransform: "uppercase",
					}}
				>
					NEET CHESS
				</Typography>

				{/* Top-Right: Lime Pill CTA */}
				<Box
					onClick={onOpenGameIdea}
					sx={{
						backgroundColor: "#E2F86B",
						color: "#101417",
						padding: "10px 24px",
						borderRadius: "30px",
						fontWeight: 800,
						fontSize: "0.85rem",
						letterSpacing: "0.05em",
						boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
						cursor: "pointer",
						transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
						"&:hover": {
							transform: "translateY(-2px)",
							boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
						},
					}}
				>
					GOT A PROJECT?
				</Box>
			</Box>

			{/* Hero Content Row */}
			<Box
				sx={{
					position: "relative",
					zIndex: 10,
					display: "flex",
					flexDirection: { xs: "column", md: "row" },
					justifyContent: "space-between",
					alignItems: { xs: "center", md: "center" },
					padding: { xs: "10px 24px", md: "0 56px" },
					marginTop: { xs: "0", md: "0px" },
					gap: "24px",
				}}
			>
				{/* Left Headline */}
				<Box sx={{ maxWidth: { xs: "100%", md: "380px" } }}>
					<Typography
						variant="h1"
						sx={{
							fontFamily: "'Plus Jakarta Sans', sans-serif",
							fontWeight: 700,
							fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4.2rem" },
							lineHeight: 1.02,
							letterSpacing: "-0.04em",
							color: "#101417",
							textAlign: { xs: "center", md: "left" },
						}}
					>
						Step into the Spotlight
					</Typography>
				</Box>

				{/* Right Supporting Copy */}
				<Box sx={{ maxWidth: { xs: "100%", md: "420px" } }}>
					<Typography
						variant="h2"
						sx={{
							fontFamily: "'IBM Plex Sans', sans-serif",
							fontWeight: 400,
							fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.35rem" },
							lineHeight: 1.35,
							letterSpacing: "-0.01em",
							color: "#101417",
							textAlign: { xs: "center", md: "left" },
							opacity: 0.9,
						}}
					>
						We craft world-class spaces & events that create memories, initiate conversations and elevate ambitions.
					</Typography>
				</Box>
			</Box>

			{/* Center Children Component (Central Video Card) */}
			<Box
				className="video-card-zone"
				sx={{
					position: "relative",
					zIndex: 20,
					width: "100%",
					my: "auto",
				}}
			>
				{children}
			</Box>
		</Box>
	);
};

export default FanHeroBackground;
