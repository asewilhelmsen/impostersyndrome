import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Maal = () => {
  const [goalCount, setGoalCount] = useState([1]);
  const [maalInput, setMaalInput] = useState<string>("");
  const [maalene, setMaalene] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaalInput(e.target.value);
  };

  const addMaal = () => {
    setGoalCount((prevGoals) => [...prevGoals, prevGoals.length + 1]);
    setMaalene((prevMaalene) => ({
      ...prevMaalene,
      [`maal${goalCount[goalCount.length - 1]}`]: maalInput,
    }));
  };

  return (
    <div>
      {goalCount.map((goalNumber) => (
        <Box
          key={goalNumber}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography>{`Goal ${goalNumber}: `}</Typography>
          <TextField
            id={`goal${goalNumber}`}
            variant="outlined"
            sx={{ width: "30%" }}
            onChange={handleInputChange}
          />
        </Box>
      ))}
      <IconButton onClick={addMaal} color="primary">
        <AddCircleIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Maal;
