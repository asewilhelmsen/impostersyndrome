import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import LevelPopUp from "./LevelPopUp";

const Steps = ({
  nameList,
  content,
}: {
  nameList: string[];
  content: JSX.Element[];
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [showPopUp, setShowPopUp] = React.useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === nameList.length - 1) {
      /*setShowPopUp(true);*/
      navigate("/home");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
    /*navigate("/home");*/
  };

  return (
    <Box sx={{ width: "90%", height: "80%", margin: "auto" }}>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }} color="text.primary">
        Step {activeStep + 1}: {nameList[activeStep]}
      </Typography>
      <Stepper activeStep={activeStep} sx={{ width: "30%" }}>
        {nameList.map((label) => (
          <Step key={label}>
            <StepLabel>{/*{label}*/}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {!showPopUp && <Box sx={{ pb: 5 }}>{content[activeStep]}</Box>}
      </React.Fragment>
      {/*showPopUp && <LevelPopUp onClose={handleClosePopUp} />*/}
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            bottom: 0,
            justifyContent: "space-between",
            width: "inherit",
          }}
        >
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === nameList.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Steps;
