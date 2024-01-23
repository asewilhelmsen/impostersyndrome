import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
    <Box
      sx={{
        margin: "auto",
        backgroundColor: "white",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ alignSelf: "flex-end" }}>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: "15px" }}>
          Gratulerer!
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "15px" }}>
          Teamet har nådd et nytt nivå 🎉
        </Typography>
      </Box>
      <Box>
        {/* Display the image based on the level */}
        {levelImage && <img src={levelImage} alt={`Level ${level} image`} />}
      </Box>
    </Box>
  );
};

export default LevelPopUp;
