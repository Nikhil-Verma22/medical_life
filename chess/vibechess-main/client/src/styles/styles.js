import PassNPlayIcon from "../icons/passnplay.svg";
import MatchmakingIcon from "../icons/matchmake.svg";
import PlayWithFriendIcon from "../icons/friend.svg";
import VersusBotIcon from "../icons/bot.svg";
import SettingsIcon from "../icons/cog.svg";
import VibeChessLogo from "../icons/vibechess.svg";
import VibeChessLogoBlack from "../icons/vibechessblack.svg";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();

export const styles = {
	circleButtonStyle: {
		backgroundColor: "#fff",
		color: "#000",
		width: "50px",
		height: "50px",
		margin: "8px",
	},
	commonButtonStyles: {
		width: "30vh",
		height: "30vh",
		margin: "10px",
		"&:hover": { bgcolor: "white", color: "black" },
		[theme.breakpoints.down("sm")]: {
			height: "9vh",
			width: "45vh",
		},
	},
	buttonTextStyles: {
		fontSize: "1.6rem",
		marginBottom: "0px",
		textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
	},
	iconStyles: {
		width: "5.3vw",
		height: "auto",
		marginBottom: "25px",
		transition: "filter 0.3s",
		alignItems: "center",
		justifyContent: "center",
	},
	boardControlStyle: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "center",
		height: 320,
		width: 400,
		overflowY: "auto",
		overflowX: "hidden",
		justifyContent: "center",
		borderRadius: 3,
	},
	kingInCheckStyle: {
		background: "radial-gradient(red, rgba(255,0,0,.9), transparent 70%)",
		borderRadius: "30%",
	},
	captureSquareStyle: {
		background:
			"radial-gradient(circle, transparent 60%, rgba(0,0,0,.1) 1%)",
		borderRadius: "50%",
	},
	scrollbarStyles: {
		/* Firefox */
		"*": {
			scrollbarWidth: "auto",
			scrollbarColor: "#a6a6a6 #101010",
		},
		/* Chrome, Edge, and Safari */
		"*::-webkit-scrollbar": {
			width: "6px",
		},

		"*::-webkit-scrollbar-track": {
			background: "#101010",
		},

		"*::-webkit-scrollbar-thumb": {
			backgroundColor: "#a6a6a6",
			borderRadius: "10px",
		},
	},
};

export const boardThemeColors = {
	medicalTeal: {
		darkSquare: "#0b6e6e",
		lightSquare: "#f5f7fa",
	},
	classicMono: {
		darkSquare: "#4a4a4a",
		lightSquare: "#f2f2f2",
	},
	darkSlate: {
		darkSquare: "#2b2f36",
		lightSquare: "#4c525c",
	},
	emeraldScrub: {
		darkSquare: "#1f4d3d",
		lightSquare: "#e6f2ec",
	},
	royalNavy: {
		darkSquare: "#1b2a4a",
		lightSquare: "#d9c98a",
	},
	minimalMono: {
		darkSquare: "#8a8a8a",
		lightSquare: "#ececec",
	},
	sunsetCoral: {
		darkSquare: "#e08a6f",
		lightSquare: "#fff4ee",
	},
};

export const rotatingImageStyle = {
	maxWidth: "100%",
	height: "auto",
	width: "110px",
	marginBottom: "10px",
	transition: "transform 0.6s ease-in-out",
	cursor: "pointer",
};

export const rotatingImageRotate = {
	transform: "rotate(360deg)",
};

export {
	PassNPlayIcon,
	MatchmakingIcon,
	PlayWithFriendIcon,
	VersusBotIcon,
	SettingsIcon,
	VibeChessLogo,
	VibeChessLogoBlack,
};
