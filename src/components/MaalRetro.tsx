import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Maalene } from "../interfaces";
import { useTeamContext } from "../TeamContext";
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
  const { retroNummer } = useTeamContext();

  const addMaal = () => {
    const nyMaalId = uuidv4();
    console.log("i addMaal", maalene);

    setMaalene([
      ...maalene,
      { id: nyMaalId, tekst: maalInput, checked: false },
    ]);

    handleAddMaal(
      [...maalene, { id: nyMaalId, tekst: maalInput }],
      "retro",
      "retroMaal" + retroNummer
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
        textAlign: "center",
      }}
    >
      <TextField
        variant="outlined"
        sx={{ marginTop: "5px", marginBottom: "10px" }}
        value={maalInput}
        label={"Skriv inn her"}
        onChange={(e) => setMaalInput(e.target.value)}
      />
      <Button variant="contained" onClick={addMaal} sx={{ width: "150px" }}>
        Legg til mål
      </Button>
    </Box>
  );
};

export default MaalRetro;
