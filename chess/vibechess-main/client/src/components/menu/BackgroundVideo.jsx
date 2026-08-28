import React, { useState, useRef, useEffect } from "react";

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

const VIDEO_FILTERS = [
	"contrast(1.12) saturate(1.2) brightness(1.04)",
	"hue-rotate(180deg) saturate(1.8) contrast(1.2)",
	"sepia(0.85) contrast(1.25) saturate(1.4) brightness(0.95)",
	"hue-rotate(240deg) saturate(2.0) contrast(1.3)",
	"hue-rotate(90deg) saturate(1.6) contrast(1.1)",
	"hue-rotate(310deg) saturate(1.9) contrast(1.25)",
	"invert(0.85) hue-rotate(180deg) contrast(1.4)",
	"grayscale(1.0) contrast(1.5) brightness(1.1)",
	"hue-rotate(45deg) saturate(2.2) brightness(1.1)",
	"hue-rotate(140deg) saturate(1.7) contrast(1.3)",
];

const BackgroundVideo = () => {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const videoRef = useRef(null);

	const handleVideoEnded = () => {
		setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoPlaylist.length);
	};

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play().catch((err) => {
				console.log("Auto-play video error:", err);
			});
		}
	}, [currentVideoIndex]);

	const currentFilter = VIDEO_FILTERS[currentVideoIndex % VIDEO_FILTERS.length];

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
				playsInline
				onEnded={handleVideoEnded}
				style={{
					width: "100vw",
					height: "100vh",
					objectFit: "cover",
					filter: currentFilter,
					imageRendering: "-webkit-optimize-contrast",
					transform: "translateZ(0)",
					willChange: "transform",
					transition: "filter 0.5s ease-in-out",
				}}
			/>
		</div>
	);
};

export default BackgroundVideo;
