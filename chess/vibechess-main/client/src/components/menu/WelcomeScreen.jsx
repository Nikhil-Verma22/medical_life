import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
	Box,
	IconButton,
	InputAdornment,
	TextField,
	Typography,
	Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { CircleFlag } from "react-circle-flags";
import { generateRandomUsername } from "../../data/randomName";
import { validateUsername } from "../../utils/usernameValidation";
import VibeChessLogo from "../../icons/vibechess.svg";
import FlagSelectorModal from "../common/modal/FlagSelectorModal";
import neetBg from "../../assets/neet_bg.jpg";
import BackgroundVideo from "./BackgroundVideo";
import LandingAudio from "./LandingAudio";
import DNAHelixChess3D from "./DNAHelixChess3D";

const WelcomeScreen = ({ setUsernameCallback, setFlagCallback, onSubmit }) => {
	const [username, setUsername] = useState("");
	const [error, setError] = useState(null);
	const [selectedFlag, setSelectedFlag] = useState(() => {
		return localStorage.getItem("selectedFlag") || "ph";
	});
	const [isFlagModalOpen, setFlagModalOpen] = useState(false);

	useEffect(() => {
		setFlagCallback(selectedFlag);
	}, [selectedFlag, setFlagCallback]);

	const handleFlagSelect = (code) => {
		setSelectedFlag(code);
		setFlagModalOpen(false);
	};

	const handleSubmit = () => {
		let newUsername = username.trim() || generateRandomUsername();

		const validationError = validateUsername(newUsername);
		if (validationError) {
			setError(validationError);
			return;
		}

		setUsernameCallback(newUsername);
		setFlagCallback(selectedFlag);
		localStorage.setItem("username", newUsername);
		localStorage.setItem("selectedFlag", selectedFlag);

		toast.success(`Welcome, ${newUsername}!`, {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			theme: "colored",
			icon: "👋🏼",
			style: { background: "#f24040" },
		});
		onSubmit();
	};

	return (
		<Box
			px={2}
			display="flex"
			flexDirection="column"
			minHeight="100vh"
			alignItems="center"
			justifyContent="center"
			sx={{
				color: "white",
				position: "relative",
				zIndex: 1,
			}}
		>
			<BackgroundVideo />
			<LandingAudio />
			<DNAHelixChess3D width="260px" height="260px" />
			<Typography
				textAlign="center"
				variant="h2"
				color="inherit"
				sx={{
					fontFamily: "'Bebas Neue', cursive",
					letterSpacing: "3px",
					fontSize: { xs: "3.2rem", sm: "4.5rem" },
					marginBottom: "2px",
					textShadow: "0 0 20px rgba(0, 212, 170, 0.6), 0 0 40px rgba(0,0,0,0.9)",
					position: "relative",
					zIndex: 2,
				}}
			>
				<span style={{ color: "#00d4aa" }}>NEET</span>{" "}
				<span style={{ color: "#ffffff" }}>CHESS</span>
			</Typography>

			<Typography
				variant="subtitle1"
				sx={{
					color: "#80eec9",
					fontWeight: "bold",
					letterSpacing: "3px",
					textTransform: "uppercase",
					fontSize: "0.85rem",
					marginBottom: 3,
					backgroundColor: "rgba(0, 212, 170, 0.15)",
					backdropFilter: "blur(12px)",
					padding: "6px 20px",
					borderRadius: "30px",
					border: "1px solid rgba(0, 212, 170, 0.5)",
					boxShadow: "0 0 15px rgba(0, 212, 170, 0.2)",
					position: "relative",
					zIndex: 2,
				}}
			>
				🧬 3D GENOME MEDICAL ARENA 🩺
			</Typography>

			<Box
				display="flex"
				flexDirection="column"
				width={{ xs: "90%", sm: "400px", md: "30%", lg: "22%" }}
				alignItems="center"
				gap={2}
				sx={{
					backgroundColor: "rgba(12, 22, 28, 0.82)",
					padding: "26px",
					borderRadius: "20px",
					backdropFilter: "blur(16px)",
					border: "1px solid rgba(0, 212, 170, 0.35)",
					boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 212, 170, 0.2)",
					transition: "transform 0.3s ease, box-shadow 0.3s ease",
					position: "relative",
					zIndex: 2,
					"&:hover": {
						boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 212, 170, 0.4)",
						borderColor: "rgba(0, 212, 170, 0.6)",
					},
				}}
			>
				<TextField
					onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
					value={username}
					onChange={(e) => {
						setError(null);
						setUsername(e.target.value);
					}}
					fullWidth
					error={!!error}
					autoComplete="off"
					label={error || "Doctor / Player Name"}
					inputProps={{ maxLength: 14 }}
					variant="outlined"
					sx={{
						height: "65px",
						"& .MuiOutlinedInput-input": {
							padding: "18px 14px",
							color: "white",
						},
						"& .MuiInputLabel-root": {
							color: "rgba(255, 255, 255, 0.7)",
						},
						"& .MuiOutlinedInput-root": {
							"& fieldset": {
								borderColor: "rgba(0, 212, 170, 0.4)",
							},
							"&:hover fieldset": {
								borderColor: "#00d4aa",
							},
						},
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() => setFlagModalOpen(true)}
									sx={{
										borderRadius: "100%",
										"&:hover": {
											backgroundColor:
												"rgba(255, 255, 255, 0.1)",
										},
									}}
									edge="end"
								>
									<CircleFlag
										countryCode={selectedFlag}
										height="40"
									/>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Button
					onClick={handleSubmit}
					variant="contained"
					fullWidth
					sx={{
						background: "linear-gradient(135deg, #00d4aa 0%, #00a896 100%)",
						color: "#051614",
						fontWeight: "bold",
						py: 1.5,
						fontSize: "1.1rem",
						letterSpacing: "1px",
						borderRadius: "8px",
						"&:hover": {
							background: "linear-gradient(135deg, #00bd97 0%, #009383 100%)",
							boxShadow: "0 0 15px rgba(0, 212, 170, 0.5)",
						},
					}}
				>
					Enter Ilaaj-e-Maat
				</Button>
			</Box>
			<FlagSelectorModal
				open={isFlagModalOpen}
				onClose={() => setFlagModalOpen(false)}
				onSelect={handleFlagSelect}
			/>
		</Box>
	);
};

WelcomeScreen.propTypes = {
	setUsernameCallback: PropTypes.func.isRequired,
	setFlagCallback: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
};

export default WelcomeScreen;
