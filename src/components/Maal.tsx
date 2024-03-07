import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { v4 as uuidv4 } from "uuid";
import { Maalene } from "../interfaces";
import handleAddMaal from "../firebase/handles/handleAddMaal";

const Maal = ({
  onMaalSubmit,
  aktivitet,
}: {
  onMaalSubmit: (maal: Maalene[]) => void;
  aktivitet: string;
}) => {
  const [maalene, setMaalene] = useState<Maalene[]>([
    { id: uuidv4(), tekst: "" },
  ]);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleInputChange = (id: string, value: string) => {
    setMaalene((prevMaal) =>
      prevMaal.map((maal) =>
        maal.id === id ? { ...maal, tekst: value } : maal
      )
    );
  };

  const addMaal = () => {
    const nyMaalId = uuidv4();
    setMaalene([...maalene, { id: nyMaalId, tekst: "" }]);
  };

  const removeMaal = (maalId: string) => {
    setMaalene((prevMaal) => prevMaal.filter((maal) => maal.id !== maalId));
  };

  useEffect(() => {
    onMaalSubmit(maalene);
    if (!(maalene.length === 1 && maalene[0].tekst.length < 1)) {
      handleAddMaal(maalene, aktivitet);
    }
  }, [maalene]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {maalene.map((maal, maalIndex) => (
        <Box
          key={maalIndex}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography>{`Mål ${maalIndex + 1}: `}</Typography>
          <TextField
            variant="outlined"
            sx={{ width: "70%", marginTop: "5px" }}
            value={maal.tekst}
            onChange={(e) => handleInputChange(maal.id, e.target.value)}
            InputProps={{
              endAdornment: maalene.length > 1 && (
                <IconButton
                  sx={{
                    color: "primary.main",
                    padding: 0,
                    borderRadius: 1,
                  }}
                  onClick={() => removeMaal(maal.id)}
                >
                  <DeleteOutlineIcon fontSize="medium" />
                </IconButton>
              ),
            }}
          />
        </Box>
      ))}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Tooltip title="Legg til nytt mål" open={showTooltip}>
          <IconButton
            onClick={addMaal}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Maal;
