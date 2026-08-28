import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";

const videoPlaylist = [
	"/vibechess/videos/v1.mp4",
	"/vibechess/videos/v2.mp4",
	"/vibechess/videos/v3.mp4",
	"/vibechess/videos/v4.mp4",
	"/vibechess/videos/v5.mp4",
	"/vibechess/videos/v6.mp4",
	"/vibechess/videos/v7.mp4",
	"/vibechess/videos/v8.mp4",
	"/vibechess/videos/v9.mp4",
	"/vibechess/videos/v10.mp4",
];

const CentralVideoCard = () => {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [tilt, setTilt] = useState({ rx: 4, ry: -5 });
	const compactVideoRef = useRef(null);
	const fullscreenVideoRef = useRef(null);

	const handleVideoEnded = () => {
		setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoPlaylist.length);
	};

	useEffect(() => {
		if (compactVideoRef.current) {
			compactVideoRef.current.play().catch(() => {});
		}
	}, [currentVideoIndex]);

	useEffect(() => {
		if (isFullscreen && fullscreenVideoRef.current) {
			fullscreenVideoRef.current.currentTime = compactVideoRef.current
				? compactVideoRef.current.currentTime
				: 0;
			fullscreenVideoRef.current.play().catch(() => {});
		}
	}, [isFullscreen]);

	const handleMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		const rx = -(y / rect.height) * 12;
		const ry = (x / rect.width) * 12;
		setTilt({ rx, ry });
	};

	const handleMouseLeave = () => {
		setTilt({ rx: 4, ry: -5 });
	};

	return (
		<>
			{/* 3D Angled Compact Preview Card (Chunk 2 Refined Geometry) */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					my: { xs: 1, md: 1.5 },
					perspective: "1200px",
					position: "relative",
					zIndex: 8,
				}}
			>
				<Box
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					onClick={() => setIsFullscreen(true)}
					sx={{
						position: "relative",
						width: { xs: "90vw", sm: "450px", md: "500px" },
						height: { xs: "210px", sm: "250px", md: "280px" },
						borderRadius: "24px",
						overflow: "hidden",
						boxShadow: "0 30px 70px rgba(16, 20, 23, 0.4)",
						border: "3px solid #101417",
						transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
						transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
						backgroundColor: "#101417",
						cursor: "pointer",
						"&:hover": {
							boxShadow: "0 40px 90px rgba(54, 42, 217, 0.45)",
							borderColor: "#E2F86B",
						},
					}}
				>
					{/* Muted Silent Preview Video Stream */}
					<video
						ref={compactVideoRef}
						src={videoPlaylist[currentVideoIndex]}
						autoPlay
						muted
						loop
						playsInline
						onEnded={handleVideoEnded}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							filter: "contrast(1.1) saturate(1.15)",
						}}
					/>

					{/* Small PLAY Affordance Pill */}
					<Box
						sx={{
							position: "absolute",
							bottom: "16px",
							left: "50%",
							transform: "translateX(-50%)",
							backgroundColor: "#ffffff",
							color: "#101417",
							padding: "6px 20px",
							borderRadius: "30px",
							display: "flex",
							alignItems: "center",
							gap: "5px",
							boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
							transition: "all 0.2s ease",
							"&:hover": {
								backgroundColor: "#E2F86B",
								transform: "translateX(-50%) scale(1.08)",
							},
						}}
					>
						<PlayArrowIcon sx={{ fontSize: "1.1rem", color: "#101417" }} />
						<Typography
							sx={{
								fontFamily: "'Plus Jakarta Sans', sans-serif",
								fontWeight: 800,
								fontSize: "0.8rem",
								letterSpacing: "1px",
							}}
						>
							PLAY
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* Fullscreen Video Expansion Modal */}
			<Modal
				open={isFullscreen}
				onClose={() => setIsFullscreen(false)}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "rgba(10, 12, 14, 0.96)",
					zIndex: 99999,
				}}
			>
				<Box
					sx={{
						position: "relative",
						width: "100vw",
						height: "100vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{/* Understated Top-Right × Close Button */}
					<Box
						onClick={() => setIsFullscreen(false)}
						sx={{
							position: "absolute",
							top: "24px",
							right: "32px",
							zIndex: 10000,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "44px",
							height: "44px",
							borderRadius: "50%",
							backgroundColor: "rgba(255, 255, 255, 0.15)",
							color: "#ffffff",
							cursor: "pointer",
							backdropFilter: "blur(8px)",
							transition: "all 0.2s ease",
							"&:hover": {
								backgroundColor: "#E2F86B",
								color: "#101417",
								transform: "scale(1.1)",
							},
						}}
					>
						<CloseIcon sx={{ fontSize: "1.4rem" }} />
					</Box>

					{/* HD Fullscreen Video Stream */}
					<video
						ref={fullscreenVideoRef}
						src={videoPlaylist[currentVideoIndex]}
						autoPlay
						playsInline
						controls
						onEnded={handleVideoEnded}
						style={{
							width: "100vw",
							height: "100vh",
							objectFit: "cover",
						}}
					/>
				</Box>
			</Modal>
		</>
	);
};

export default CentralVideoCard;
