import React from "react";
import PropTypes from "prop-types";
import { Button, Box, Typography, Slide } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styles } from "../../styles/styles";

const MenuButton = React.memo(
	({
		onClick,
		icon,
		label,
		backgroundColor,
		description,
		isAnimating = false,
		extraContent,
	}) => {
		const theme = useTheme();
		const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

		// Bounce animation keyframes
		const bounceAnimation = {
			"@keyframes bounce": {
				"0%, 100%": {
					transform: "translateY(0)",
					animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
				},
				"50%": {
					transform: "translateY(-8px)",
					animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
				},
			},
		};

		return (
			<Slide direction="up" in={true} mountOnEnter unmountOnExit>
				<Button
					onClick={onClick}
					variant="contained"
					sx={{
						width: isMobile ? "min(92vw, 340px)" : "25vh",
						height: isMobile ? "auto" : "25vh",
						minHeight: isMobile ? "68px" : "210px",
						margin: isMobile ? "4px 0" : "0 6px",
						backgroundColor: "rgba(0, 0, 0, 0.4)",
						backdropFilter: "blur(12px)",
						border: "2px solid rgba(255, 255, 255, 0.2)",
						borderRadius: "18px",
						position: "relative",
						overflow: "hidden",
						boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
						transition: "all 0.3s ease",
						animation: isAnimating ? "bounce 0.812s infinite" : "none",
						...bounceAnimation,
						"&:hover": {
							transform: isMobile ? "scale(1.02)" : "translateY(-6px) scale(1.03)",
							backgroundColor: "rgba(0, 0, 0, 0.6)",
							borderColor: "#2176ff",
							boxShadow: "0 8px 30px rgba(33, 118, 255, 0.4)",
						},
						"&.MuiButton-root": {
							padding: isMobile ? "10px 16px" : "16px 12px",
						},
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							height: "100%",
						}}
					>
						<Box
							sx={{
								width: "44px",
								height: "44px",
								borderRadius: "12px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "rgba(0, 0, 0, 0.3)",
								marginBottom: "8px",
								border: "1.5px solid #000000",
							}}
						>
							<img
								src={icon}
								alt={label}
								style={{
									width: "26px",
									height: "26px",
									filter: "brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
								}}
							/>
						</Box>
						<Typography
							variant="h6"
							sx={{
								fontFamily: "'Bebas Neue', cursive",
								fontSize: "1.4rem",
								letterSpacing: "1px",
								color: "#ffffff",
								marginBottom: "4px",
								textAlign: "center",
								lineHeight: 1.1,
								textShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
							}}
						>
							{label}
						</Typography>
						<Typography
							variant="caption"
							sx={{
								color: "#ffffff",
								fontSize: "0.75rem",
								textAlign: "center",
								lineHeight: 1.25,
								fontFamily: "'IBM Plex Sans', sans-serif",
								textTransform: "none",
								textShadow: "0 1px 3px rgba(0, 0, 0, 0.9)",
								display: isMobile ? "none" : "-webkit-box",
								WebkitLineClamp: 3,
								WebkitBoxOrient: "vertical",
								overflow: "hidden",
								maxHeight: "3.8em",
							}}
						>
							{description}
						</Typography>
						{extraContent && (
							<Box sx={{ marginTop: "8px" }}>
								{extraContent}
							</Box>
						)}
					</Box>
				</Button>
			</Slide>
		);
	}
);

MenuButton.displayName = "MenuButton";

MenuButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	icon: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	isAnimating: PropTypes.bool,
	extraContent: PropTypes.node,
};

export default MenuButton;
