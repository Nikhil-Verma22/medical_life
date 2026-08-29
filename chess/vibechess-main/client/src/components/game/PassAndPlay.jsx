import React, { useState } from "react";
import Navbar from "../common/Navbar";
import { Stack } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import ChessboardComponent from "./ChessboardComponent";

const PassAndPlay = () => {
	const [gameMode] = useState("passandplay");
	return (
		<Stack
			minHeight="100dvh"
			sx={{
				zIndex: 1,
				overflowY: "auto",
				overflowX: "hidden",
				bgcolor: "background.default",
				pb: 3,
			}}
		>
			<Navbar title="ILAAJ-E-MAAT" />
			<Stack flexGrow={1} alignItems="center" justifyContent="center" sx={{ px: 1, py: { xs: 1, sm: 2 } }}>
				<ChessboardComponent
					gameMode={gameMode}
					isAnalysisMode={false}
				/>
			</Stack>
		</Stack>
	);
};

export default PassAndPlay;
