import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import handleMaal from "../firebase/handles/handleMaal";

const Maal = ({
  onMaalSubmit,
}: {
  onMaalSubmit: (maal: { [key: string]: string }) => void;
}) => {
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

  useEffect(() => {
    onMaalSubmit(maalene);
  }, [maalene, onMaalSubmit]);

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
      <Button onClick={addMaal} variant="contained" color="primary">
        Add goal
      </Button>
    </div>
  );
};

export default Maal;
