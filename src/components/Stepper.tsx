import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Steps = ({
  nameList,
  content,
}: {
  nameList: string[];
  content: JSX.Element[];
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === nameList.length - 1) {
      navigate("/home");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "90%", margin: "auto" }}>
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
        <Box>{content[activeStep]}</Box>
      </React.Fragment>
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
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
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext}>
            {activeStep === nameList.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Steps;
