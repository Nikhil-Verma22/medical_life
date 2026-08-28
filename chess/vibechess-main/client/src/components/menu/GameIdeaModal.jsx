import React, { useState } from "react";
import { Box, Typography, TextField, Button, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { toast } from "react-toastify";

const GameIdeaModal = ({ open, onClose }) => {
	const [ideaText, setIdeaText] = useState("");

	const handleSubmit = () => {
		if (!ideaText.trim()) return;
		toast.success("Thank you for your game idea suggestion! ♟️", {
			position: "top-right",
			autoClose: 3000,
			theme: "colored",
			style: { background: "#d4f268", color: "#111115", fontWeight: "bold" },
		});
		setIdeaText("");
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "rgba(17, 17, 21, 0.85)",
				backdropFilter: "blur(12px)",
				zIndex: 99999,
			}}
		>
			<Box
				sx={{
					position: "relative",
					width: { xs: "90%", sm: "500px" },
					backgroundColor: "#e8e4dc",
					color: "#111115",
					borderRadius: "24px",
					padding: { xs: "28px", sm: "40px" },
					border: "3px solid #111115",
					boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
				}}
			>
				{/* Top Close Button */}
				<Box
					onClick={onClose}
					sx={{
						position: "absolute",
						top: "20px",
						right: "20px",
						display: "flex",
						alignItems: "center",
						gap: "6px",
						backgroundColor: "#111115",
						color: "#ffffff",
						padding: "6px 14px",
						borderRadius: "20px",
						cursor: "pointer",
						fontFamily: "'Plus Jakarta Sans', sans-serif",
						fontSize: "0.85rem",
						fontWeight: "bold",
						transition: "all 0.2s ease",
						"&:hover": {
							backgroundColor: "#d4f268",
							color: "#111115",
						},
					}}
				>
					<CloseIcon sx={{ fontSize: "1rem" }} />
					<span>CLOSE</span>
				</Box>

				{/* Modal Content */}
				<Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 1 }}>
					<LightbulbIcon sx={{ color: "#7c7ce6", fontSize: "2rem" }} />
					<Typography
						variant="h5"
						sx={{
							fontFamily: "'Plus Jakarta Sans', sans-serif",
							fontWeight: 800,
							letterSpacing: "-0.5px",
							color: "#111115",
						}}
					>
						Got a Game Idea?
					</Typography>
				</Box>

				<Typography
					variant="body2"
					sx={{
						fontFamily: "'IBM Plex Sans', sans-serif",
						color: "#444449",
						marginBottom: "24px",
						lineHeight: 1.5,
					}}
				>
					Have a feature request, new chess mode, or improvement idea for Ilaaj-e-Maat? Share it with our team!
				</Typography>

				<TextField
					multiline
					rows={4}
					fullWidth
					placeholder="Describe your game idea or suggestion here..."
					value={ideaText}
					onChange={(e) => setIdeaText(e.target.value)}
					sx={{
						backgroundColor: "#ffffff",
						borderRadius: "14px",
						marginBottom: "24px",
						"& .MuiOutlinedInput-root": {
							borderRadius: "14px",
							"& fieldset": { borderColor: "#111115" },
							"&:hover fieldset": { borderColor: "#7c7ce6" },
						},
					}}
				/>

				<Button
					onClick={handleSubmit}
					fullWidth
					variant="contained"
					sx={{
						backgroundColor: "#d4f268",
						color: "#111115",
						fontWeight: 800,
						fontSize: "1rem",
						py: 1.5,
						borderRadius: "14px",
						border: "2px solid #111115",
						boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
						fontFamily: "'Plus Jakarta Sans', sans-serif",
						textTransform: "none",
						"&:hover": {
							backgroundColor: "#c2e252",
							boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
						},
					}}
				>
					Submit Suggestion 🚀
				</Button>
			</Box>
		</Modal>
	);
};

export default GameIdeaModal;
