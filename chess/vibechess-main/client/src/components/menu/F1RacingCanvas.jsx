import React, { useEffect, useRef } from "react";

const F1RacingCanvas = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		let animationFrameId;

		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		const handleResize = () => {
			if (!canvas) return;
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);

		// F1 Racing Car Light Streaks & Particles
		const cars = Array.from({ length: 16 }, (_, i) => ({
			x: Math.random() * width,
			y: Math.random() * height,
			speed: 7 + Math.random() * 14,
			length: 140 + Math.random() * 200,
			width: 2.5 + Math.random() * 3.5,
			color: i % 2 === 0 ? "#00d4aa" : i % 3 === 0 ? "#f24040" : "#00b4d8",
			opacity: 0.5 + Math.random() * 0.5,
		}));

		const particles = Array.from({ length: 50 }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			size: 1 + Math.random() * 3,
			speedY: (Math.random() - 0.5) * 1.5,
			speedX: -3 - Math.random() * 7,
			color: Math.random() > 0.5 ? "rgba(0, 212, 170, " : "rgba(242, 64, 64, ",
			alpha: 0.2 + Math.random() * 0.6,
		}));

		let gridOffset = 0;

		const render = () => {
			// Clear background with semi-transparent dark tint for motion blur
			ctx.fillStyle = "rgba(10, 16, 22, 0.4)";
			ctx.fillRect(0, 0, width, height);

			// Draw 3D Grid Track perspective lines
			ctx.strokeStyle = "rgba(0, 212, 170, 0.08)";
			ctx.lineWidth = 1;

			const horizonY = height * 0.35;
			gridOffset = (gridOffset + 3.5) % 40;

			// Horizontal moving track lines
			for (let y = horizonY; y < height; y += 25) {
				const lineY = y + (gridOffset % 25);
				if (lineY > height) continue;
				ctx.beginPath();
				ctx.moveTo(0, lineY);
				ctx.lineTo(width, lineY);
				ctx.stroke();
			}

			// Perspective lines fanning out
			const centerX = width / 2;
			for (let x = -width; x < width * 2; x += 120) {
				ctx.beginPath();
				ctx.moveTo(centerX + (x - centerX) * 0.1, horizonY);
				ctx.lineTo(x, height);
				ctx.stroke();
			}

			// Draw F1 Speed Trail Cars
			cars.forEach((car) => {
				car.x -= car.speed;
				if (car.x + car.length < 0) {
					car.x = width + Math.random() * 200;
					car.y = horizonY + Math.random() * (height - horizonY - 40);
					car.speed = 8 + Math.random() * 14;
				}

				// Gradient for F1 light tail
				const gradient = ctx.createLinearGradient(
					car.x,
					car.y,
					car.x + car.length,
					car.y
				);
				gradient.addColorStop(0, car.color);
				gradient.addColorStop(0.7, car.color + "88");
				gradient.addColorStop(1, "transparent");

				ctx.beginPath();
				ctx.strokeStyle = gradient;
				ctx.lineWidth = car.width;
				ctx.lineCap = "round";
				ctx.moveTo(car.x, car.y);
				ctx.lineTo(car.x + car.length, car.y);
				ctx.stroke();

				// Glowing Headlight dot (F1 car front)
				ctx.fillStyle = car.color;
				ctx.shadowBlur = 12;
				ctx.shadowColor = car.color;
				ctx.beginPath();
				ctx.arc(car.x, car.y, car.width * 1.4, 0, Math.PI * 2);
				ctx.fill();
				ctx.shadowBlur = 0;
			});

			// Draw Speed Particles
			particles.forEach((p) => {
				p.x += p.speedX;
				p.y += p.speedY;

				if (p.x < 0) {
					p.x = width + 10;
					p.y = Math.random() * height;
				}

				ctx.fillStyle = p.color + p.alpha + ")";
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fill();
			});

			animationFrameId = requestAnimationFrame(render);
		};

		render();

		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 0,
				pointerEvents: "none",
			}}
		/>
	);
};

export default F1RacingCanvas;
