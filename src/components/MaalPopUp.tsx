import React from "react";
import { Box, Typography, Modal, List, ListItem } from "@mui/material";
import { Maalene } from "../interfaces";

const MaalPopUp: React.FC<{ onClose: () => void; maalene: Maalene[] }> = ({
  onClose,
  maalene,
}) => {
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
        <Typography variant="h5" sx={{ textDecoration: "underline" }}>
          Målene deres
        </Typography>
        <List sx={{ textAlign: "center" }}>
          {maalene.map((maal, maalIndex) => (
            <ListItem key={maalIndex} sx={{ paddingLeft: "0" }}>
              <Typography>
                <span style={{ fontWeight: "bold" }}>{`Mål ${
                  maalIndex + 1
                }: `}</span>
                {maal.tekst}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default MaalPopUp;
