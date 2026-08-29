import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Box,
	useMediaQuery,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useTheme } from "@mui/material/styles";
import neetDice from "../../assets/neet_dice.png";

function Navbar({ onClick, title = "ILAAJ-E-MAAT", gameMode }) {
	const navigate = useNavigate();
	const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	const theme = useTheme();

	const handleButtonClick = onClick || (() => navigate("/"));

	return (
		<AppBar
			position="static"
			sx={{
				zIndex: 10,
				background: "transparent",
				boxShadow: "none",
				pt: 1,
				px: { xs: 1, sm: 2 },
			}}
		>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					px: { xs: 1, sm: 2 },
				}}
			>
				{/* Back to Menu Button */}
				<Button
					variant="outlined"
					onClick={handleButtonClick}
					startIcon={<ArrowBackRoundedIcon />}
					sx={{
						color: "#ffffff",
						borderColor: "rgba(255, 255, 255, 0.3)",
						background: "rgba(0, 0, 0, 0.4)",
						backdropFilter: "blur(8px)",
						textTransform: "none",
						fontWeight: 600,
						fontSize: { xs: "0.8rem", sm: "0.95rem" },
						borderRadius: "20px",
						px: { xs: 1.5, sm: 2.2 },
						py: 0.6,
						"&:hover": {
							borderColor: "#2176ff",
							background: "rgba(33, 118, 255, 0.2)",
							boxShadow: "0 0 12px rgba(33, 118, 255, 0.4)",
						},
					}}
				>
					{isXs ? "Back" : "Back to Menu"}
				</Button>

				{/* Title / Branding */}
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
					<Box
						component="img"
						src={neetDice}
						alt="Ilaaj-e-Maat Logo"
						sx={{
							width: { xs: 28, sm: 36 },
							height: { xs: 28, sm: 36 },
							borderRadius: "8px",
							boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
							objectFit: "contain",
						}}
					/>
					<Typography
						variant="h5"
						sx={{
							fontFamily: "'Bebas Neue', cursive",
							letterSpacing: "2px",
							color: "#ffffff",
							fontSize: { xs: "1.3rem", sm: "1.8rem" },
							textShadow: "0 2px 8px rgba(0,0,0,0.8)",
						}}
					>
						{title}
					</Typography>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

Navbar.propTypes = {
	onClick: PropTypes.func,
	title: PropTypes.string,
	gameMode: PropTypes.string,
};

export default Navbar;
