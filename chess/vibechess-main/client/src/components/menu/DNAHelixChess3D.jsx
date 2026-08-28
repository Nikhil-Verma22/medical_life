import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";

const DNAHelixChess3D = ({ height = "240px", width = "240px" }) => {
	const mountRef = useRef(null);

	useEffect(() => {
		const container = mountRef.current;
		if (!container) return;

		const containerWidth = container.clientWidth || 240;
		const containerHeight = container.clientHeight || 240;

		// 1. Scene, Camera, Renderer Setup
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			45,
			containerWidth / containerHeight,
			0.1,
			1000
		);
		camera.position.z = 8;
		camera.position.y = 0;

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setSize(containerWidth, containerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		// Main 3D Container Group for smooth mouse tilt
		const mainGroup = new THREE.Group();
		scene.add(mainGroup);

		// 2. Lights Setup
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
		scene.add(ambientLight);

		const cyanLight = new THREE.PointLight(0x00d4aa, 3, 20);
		cyanLight.position.set(3, 4, 4);
		scene.add(cyanLight);

		const purpleLight = new THREE.PointLight(0x9d4edd, 2, 20);
		purpleLight.position.set(-3, -4, 2);
		scene.add(purpleLight);

		const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
		dirLight.position.set(0, 5, 5);
		scene.add(dirLight);

		// 3. DNA Helix Construction
		const dnaGroup = new THREE.Group();
		mainGroup.add(dnaGroup);

		const numNodes = 28;
		const helixRadius = 1.6;
		const helixHeight = 6.0;
		const turns = 2.2;

		const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
		const strand1Mat = new THREE.MeshStandardMaterial({
			color: 0x00d4aa,
			emissive: 0x005544,
			roughness: 0.2,
			metalness: 0.8,
		});
		const strand2Mat = new THREE.MeshStandardMaterial({
			color: 0x80eec9,
			emissive: 0x004433,
			roughness: 0.3,
			metalness: 0.6,
		});

		const rungMat = new THREE.MeshStandardMaterial({
			color: 0x00a896,
			emissive: 0x00332a,
			roughness: 0.4,
			metalness: 0.5,
			transparent: true,
			opacity: 0.8,
		});

		for (let i = 0; i < numNodes; i++) {
			const progress = i / numNodes;
			const angle = progress * Math.PI * 2 * turns;
			const y = (progress - 0.5) * helixHeight;

			// Node 1
			const x1 = Math.cos(angle) * helixRadius;
			const z1 = Math.sin(angle) * helixRadius;

			const node1 = new THREE.Mesh(sphereGeo, strand1Mat);
			node1.position.set(x1, y, z1);
			dnaGroup.add(node1);

			// Node 2 (Opposite)
			const x2 = Math.cos(angle + Math.PI) * helixRadius;
			const z2 = Math.sin(angle + Math.PI) * helixRadius;

			const node2 = new THREE.Mesh(sphereGeo, strand2Mat);
			node2.position.set(x2, y, z2);
			dnaGroup.add(node2);

			// Rung / Connecting Rod (every 2nd node for clean look)
			if (i % 2 === 0) {
				const distance = new THREE.Vector3(x1, y, z1).distanceTo(
					new THREE.Vector3(x2, y, z2)
				);
				const rungGeo = new THREE.CylinderGeometry(0.03, 0.03, distance, 8);
				const rung = new THREE.Mesh(rungGeo, rungMat);

				// Position halfway between node1 and node2
				rung.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);

				// Rotate rung to point from node1 to node2
				const direction = new THREE.Vector3(x2 - x1, 0, z2 - z1).normalize();
				const axis = new THREE.Vector3(0, 1, 0);
				rung.quaternion.setFromUnitVectors(axis, direction);

				dnaGroup.add(rung);
			}
		}

		// 4. Center 3D Stylized Medical Chess King Piece
		const kingGroup = new THREE.Group();
		mainGroup.add(kingGroup);

		const kingMat = new THREE.MeshStandardMaterial({
			color: 0x00ffd0,
			emissive: 0x004033,
			roughness: 0.15,
			metalness: 0.9,
		});

		// Base
		const baseGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.25, 24);
		const baseMesh = new THREE.Mesh(baseGeo, kingMat);
		baseMesh.position.y = -1.2;
		kingGroup.add(baseMesh);

		// Ring base
		const ringGeo = new THREE.TorusGeometry(0.55, 0.08, 16, 32);
		const ringMesh = new THREE.Mesh(ringGeo, kingMat);
		ringMesh.rotation.x = Math.PI / 2;
		ringMesh.position.y = -1.0;
		kingGroup.add(ringMesh);

		// Body Cone
		const bodyGeo = new THREE.CylinderGeometry(0.35, 0.55, 1.4, 24);
		const bodyMesh = new THREE.Mesh(bodyGeo, kingMat);
		bodyMesh.position.y = -0.2;
		kingGroup.add(bodyMesh);

		// Neck Ring
		const neckGeo = new THREE.TorusGeometry(0.42, 0.06, 16, 32);
		const neckMesh = new THREE.Mesh(neckGeo, kingMat);
		neckMesh.rotation.x = Math.PI / 2;
		neckMesh.position.y = 0.5;
		kingGroup.add(neckMesh);

		// Crown Head
		const crownHeadGeo = new THREE.CylinderGeometry(0.5, 0.35, 0.5, 24);
		const crownHeadMesh = new THREE.Mesh(crownHeadGeo, kingMat);
		crownHeadMesh.position.y = 0.8;
		kingGroup.add(crownHeadMesh);

		// Medical Cross / Stethoscope Top Symbol
		const crossVerticalGeo = new THREE.BoxGeometry(0.12, 0.45, 0.12);
		const crossHorizGeo = new THREE.BoxGeometry(0.35, 0.12, 0.12);

		const crossMat = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			emissive: 0x00d4aa,
			roughness: 0.1,
			metalness: 1.0,
		});

		const crossV = new THREE.Mesh(crossVerticalGeo, crossMat);
		crossV.position.y = 1.25;
		kingGroup.add(crossV);

		const crossH = new THREE.Mesh(crossHorizGeo, crossMat);
		crossH.position.y = 1.28;
		kingGroup.add(crossH);

		// Glow Orb in Center of Crown
		const orbGeo = new THREE.SphereGeometry(0.2, 16, 16);
		const orbMat = new THREE.MeshBasicMaterial({
			color: 0x00ffff,
		});
		const orb = new THREE.Mesh(orbGeo, orbMat);
		orb.position.y = 0.78;
		kingGroup.add(orb);

		// 5. Floating Ambient Medical Particles
		const particleCount = 80;
		const particleGeo = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);

		for (let p = 0; p < particleCount * 3; p += 3) {
			positions[p] = (Math.random() - 0.5) * 12;
			positions[p + 1] = (Math.random() - 0.5) * 12;
			positions[p + 2] = (Math.random() - 0.5) * 8;
		}

		particleGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(positions, 3)
		);

		const particleMat = new THREE.PointsMaterial({
			color: 0x00d4aa,
			size: 0.08,
			transparent: true,
			opacity: 0.6,
		});

		const particleSystem = new THREE.Points(particleGeo, particleMat);
		scene.add(particleSystem);

		// 6. Interactive Mouse Motion Tracking
		let targetRotationX = 0;
		let targetRotationY = 0;

		const handleMouseMove = (e) => {
			const windowHalfX = window.innerWidth / 2;
			const windowHalfY = window.innerHeight / 2;
			targetRotationY = ((e.clientX - windowHalfX) / windowHalfX) * 0.4;
			targetRotationX = ((e.clientY - windowHalfY) / windowHalfY) * 0.3;
		};

		window.addEventListener("mousemove", handleMouseMove);

		// 7. Animation Loop
		let animationFrameId;
		let clock = new THREE.Clock();

		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);
			const elapsedTime = clock.getElapsedTime();

			// Continuous Rotations
			dnaGroup.rotation.y = elapsedTime * 0.6;
			dnaGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;

			// Floating Bobbing effect for 3D King
			kingGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.15;
			kingGroup.rotation.y = -elapsedTime * 0.4;

			// Particles float
			particleSystem.rotation.y = elapsedTime * 0.05;

			// Smooth Mouse Lerp
			mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
			mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

			renderer.render(scene, camera);
		};

		animate();

		// Handle Window Resize
		const handleResize = () => {
			if (!container) return;
			const w = container.clientWidth || 240;
			const h = container.clientHeight || 240;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup on unmount
		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("resize", handleResize);

			if (container && renderer.domElement) {
				container.removeChild(renderer.domElement);
			}
			renderer.dispose();
		};
	}, []);

	return (
		<div
			ref={mountRef}
			style={{
				width: width,
				height: height,
				position: "relative",
				zIndex: 3,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				filter: "drop-shadow(0 0 25px rgba(0, 212, 170, 0.7))",
			}}
		/>
	);
};

DNAHelixChess3D.propTypes = {
	height: PropTypes.string,
	width: PropTypes.string,
};

export default DNAHelixChess3D;
