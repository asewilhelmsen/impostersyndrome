import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Modal } from "@mui/material";
import TeamConnectors_Img from "../images/teamConnectors_done.svg"; //level 1
import CommunicationExplorers_Img from "../images/communicationExplorers_done.svg"; //level 2
import BondBuilders_Img from "../images/bondBuilders_done.svg"; //level 3
import DreamTeam_Img from "../images/dreamTeam_done.svg"; //level 4

const LevelPopUp: React.FC<{ onClose: () => void; level: number }> = ({
  onClose,
  level,
}) => {
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
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          bgcolor: "white",
          border: "1px solid #000",
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
        <Typography variant="h6">Teamet har nådd et nytt nivå 🎉</Typography>
        {levelImage && <img src={levelImage} alt={`Level ${level} image`} />}
      </Box>
    </Modal>
  );
};

export default LevelPopUp;
