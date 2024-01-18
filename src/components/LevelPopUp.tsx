import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LevelPopUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        margin: "auto",
        width: "300px",
        padding: "20px",
        backgroundColor: "#4CAF50", // Green color, you can customize
        color: "#fff",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          color: "#fff",
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" sx={{ marginBottom: "15px" }}>
        Congratulations!
      </Typography>
      <Typography variant="body1">The team reached a new level.</Typography>
    </Box>
  );
};

export default LevelPopUp;
