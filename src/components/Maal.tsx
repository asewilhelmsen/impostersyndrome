import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Maal = ({
  onMaalSubmit,
}: {
  onMaalSubmit: (maal: { [key: string]: string }) => void;
}) => {
  const [goalCount, setGoalCount] = useState([1]);
  const [maalInput, setMaalInput] = useState<string>("");
  const [maalene, setMaalene] = useState<{ [key: string]: string }>({});
  const [showTooltip, setShowTooltip] = useState(false);

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

  const removeMaal = (goalNumber: number) => {
    setGoalCount((prevGoals) => prevGoals.filter((num) => num !== goalNumber));
    const { [`maal${goalNumber}`]: removedGoal, ...rest } = maalene;
    setMaalene(rest);
  };
  useEffect(() => {
    onMaalSubmit(maalene);
  }, [maalene, onMaalSubmit]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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
          <Typography>{`Mål ${goalNumber}: `}</Typography>
          <TextField
            id={`goal${goalNumber}`}
            variant="outlined"
            sx={{ width: "70%", backgroundColor: "white" }}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: goalCount.length > 1 && (
                <IconButton
                  sx={{
                    color: "primary.main",
                    padding: 0,
                    borderRadius: 1,
                  }}
                  onClick={() => removeMaal(goalNumber)}
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
            color="primary"
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
