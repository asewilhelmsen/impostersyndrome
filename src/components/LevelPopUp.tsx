import React, { useEffect, useState } from "react";
import { Box, Typography, Modal } from "@mui/material";
import TeamConnectors_Img from "../images/teamConnectors_done.svg"; //level 1
import CommunicationExplorers_Img from "../images/communicationExplorers_done.svg"; //level 2
import BondBuilders_Img from "../images/bondBuilders_done.svg"; //level 3
import DreamTeam_Img from "../images/dreamTeam_done.svg"; //level 4

const LevelPopUp: React.FC<{
  onClose: () => void;
  level: number;
  message: string;
}> = ({ onClose, level, message }) => {
  const [levelImage, setLevelImage] = useState<string | null>(null);

  useEffect(() => {
    // Determine which image to show based on the level number
    switch (level) {
      case 1:
        setLevelImage(TeamConnectors_Img);
        break;
      case 2:
        setLevelImage(CommunicationExplorers_Img);
        break;
      case 3:
        setLevelImage(BondBuilders_Img);
        break;
      case 4:
        setLevelImage(DreamTeam_Img);
        break;
      default:
        setLevelImage(null);
        break;
    }
  });

  return (
    <Modal
      open={true}
      onClose={onClose}
      sx={{ "& .MuiBackdrop-root": { backgroundColor: "transparent" } }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          bgcolor: "white",
          border: "2px solid #0E056E",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Gratulerer!</Typography>
        <Typography variant="h5">Teamet har nådd et nytt nivå 🎉</Typography>
        {levelImage && (
          <img width={"60%"} src={levelImage} alt={`Level ${level} image`} />
        )}
        {message && (
          <Typography textAlign={"center"} variant="body1">
            {message}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default LevelPopUp;
