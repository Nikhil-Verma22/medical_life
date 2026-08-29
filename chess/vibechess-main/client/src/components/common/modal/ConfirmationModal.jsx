import React from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography, Button, Fade, Stack } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const ConfirmationModal = ({
	isOpen,
	onClose,
	onConfirm,
	title = "Confirm Action",
	message = "Are you sure you want to proceed?",
	confirmText = "Confirm",
	cancelText = "Cancel",
	isDanger = false,
}) => {
	const handleConfirm = () => {
		onConfirm();
		onClose();
	};

	return (
		<Modal open={isOpen} onClose={onClose} closeAfterTransition>
			<Fade in={isOpen}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: "#1a1d20",
						border: "1px solid rgba(255, 255, 255, 0.15)",
						boxShadow: "0 16px 40px rgba(0, 0, 0, 0.8)",
						borderRadius: 3,
						p: 3.5,
						textAlign: "center",
						width: { xs: "90%", sm: "400px" },
						maxWidth: "420px",
						outline: "none",
					}}
				>
					{isDanger && (
						<Box
							sx={{
								display: "inline-flex",
								p: 1.2,
								borderRadius: "50%",
								bgcolor: "rgba(239, 68, 68, 0.15)",
								color: "#ef4444",
								mb: 2,
							}}
						>
							<WarningAmberRoundedIcon sx={{ fontSize: 36 }} />
						</Box>
					)}

					<Typography
						variant="h6"
						sx={{
							fontWeight: 700,
							color: "#ffffff",
							mb: 1.5,
							letterSpacing: "0.5px",
						}}
					>
						{title}
					</Typography>

					<Typography
						variant="body2"
						sx={{
							color: "rgba(255, 255, 255, 0.75)",
							mb: 3.5,
							lineHeight: 1.5,
						}}
					>
						{message}
					</Typography>

					<Stack direction="row" spacing={2} justifyContent="center">
						<Button
							onClick={onClose}
							variant="outlined"
							fullWidth
							sx={{
								color: "#ffffff",
								borderColor: "rgba(255, 255, 255, 0.3)",
								textTransform: "none",
								fontWeight: 600,
								borderRadius: "8px",
								py: 1,
								"&:hover": {
									borderColor: "#ffffff",
									backgroundColor: "rgba(255, 255, 255, 0.08)",
								},
							}}
						>
							{cancelText}
						</Button>

						<Button
							onClick={handleConfirm}
							variant="contained"
							fullWidth
							sx={{
								backgroundColor: isDanger ? "#ef4444" : "#2176ff",
								color: "#ffffff",
								textTransform: "none",
								fontWeight: 700,
								borderRadius: "8px",
								py: 1,
								"&:hover": {
									backgroundColor: isDanger ? "#dc2626" : "#1a62d6",
								},
							}}
						>
							{confirmText}
						</Button>
					</Stack>
				</Box>
			</Fade>
		</Modal>
	);
};

ConfirmationModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	title: PropTypes.string,
	message: PropTypes.string,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
	isDanger: PropTypes.bool,
};

export default ConfirmationModal;
