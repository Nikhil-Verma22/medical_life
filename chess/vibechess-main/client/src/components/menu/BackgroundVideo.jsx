import React, { useState, useRef, useEffect } from "react";

const videoPlaylist = [
	"/vibechess/videos/v1.mp4",
];

const BackgroundVideo = () => {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const videoRef = useRef(null);

	const handleVideoEnded = () => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			videoRef.current.play().catch(() => {});
		}
	};

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play().catch((err) => {
				console.log("Auto-play video error:", err);
			});
		}
	}, [currentVideoIndex]);

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 0,
				overflow: "hidden",
				pointerEvents: "none",
			}}
		>
			<video
				ref={videoRef}
				src={videoPlaylist[currentVideoIndex]}
				autoPlay
				muted
				loop
				playsInline
				onEnded={handleVideoEnded}
				style={{
					width: "100vw",
					height: "100vh",
					objectFit: "cover",
					filter: "contrast(1.12) saturate(1.2) brightness(1.04)",
					imageRendering: "-webkit-optimize-contrast",
					transform: "translateZ(0)",
					willChange: "transform",
				}}
			/>
		</div>
	);
};

export default BackgroundVideo;
