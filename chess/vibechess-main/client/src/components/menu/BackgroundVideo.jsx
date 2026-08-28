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
			{/* SVG HD Sharpening Filter */}
			<svg style={{ position: "absolute", width: 0, height: 0 }}>
				<filter id="hd-sharpen">
					<feConvolveMatrix
						order="3,3"
						divisor="1"
						kernelMatrix="0 -0.5 0 -0.5 3 -0.5 0 -0.5 0"
					/>
				</filter>
			</svg>
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
