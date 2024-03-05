import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Maalene } from "../interfaces";
import handleAddMaal from "../firebase/handles/handleAddMaal";

const MaalRetro = ({
  onMaalSubmit,
  tidligereMaal,
}: {
  onMaalSubmit: (maal: Maalene[]) => void;

  tidligereMaal: Maalene[];
}) => {
  const [maalene, setMaalene] = useState<Maalene[]>(
    tidligereMaal || [{ id: uuidv4(), tekst: "" }]
  );
  const [maalInput, setMaalInput] = useState<string>("");

  const addMaal = () => {
    const nyMaalId = uuidv4();
    console.log("i addMaal", maalene);
    setMaalene([...maalene, { id: nyMaalId, tekst: maalInput }]);
    handleAddMaal(
      [...maalene, { id: nyMaalId, tekst: maalInput }],
      "retro",
      "retroMaal1"
    );
    setMaalInput("");
  };

  useEffect(() => {
    onMaalSubmit(maalene);
  }, [maalene]);

  useEffect(() => {
    setMaalene(tidligereMaal);
  }, [tidligereMaal]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        variant="outlined"
        sx={{ marginTop: "5px" }}
        value={maalInput}
        onChange={(e) => setMaalInput(e.target.value)}
      />
      <Button variant="contained" onClick={addMaal}>
        Legg til mål
      </Button>
    </Box>
  );
};

export default MaalRetro;
