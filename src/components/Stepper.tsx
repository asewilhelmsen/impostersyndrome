import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

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
      navigate("/hjem");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "secondary.main",
      }}
    >
      {/* Grid with the stepper header */}
      <Grid container sx={{ backgroundColor: "white", padding: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "text.primary" }}>
            <b>Step {activeStep + 1}:</b> {nameList[activeStep]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} sx={{ width: "30%" }}>
            {nameList.map((label) => (
              <Step key={label}>
                <StepLabel>{/*{label}*/}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>

      {/* Grid with the content and next/back button */}
      <Grid
        container
        sx={{
          padding: 3,
          flex: 1,
        }}
      >
        <Grid item xs={12}>
          {!showPopUp && <Box sx={{ pb: 5 }}>{content[activeStep]}</Box>}
        </Grid>

        <Grid item xs={6} textAlign={"center"} alignSelf={"end"}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6} textAlign={"center"} alignSelf={"end"}>
          <Button onClick={handleNext}>
            {activeStep === nameList.length - 1 ? "Finish" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Steps;
