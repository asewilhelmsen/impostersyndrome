import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

const Goals = () => {
  const [goalCount, setGoalCount] = useState([1]);

  const addGoal = () => {
    setGoalCount((prevGoals) => [...prevGoals, prevGoals.length + 1]);
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
          />
        </Box>
      ))}
      <Button onClick={addGoal} variant="contained" color="primary">
        Add goal
      </Button>
      <Button variant="contained" color="primary">
        Save goals
      </Button>
    </div>
  );
};

export default Goals;
