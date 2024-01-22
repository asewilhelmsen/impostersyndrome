import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTeamContext } from "../TeamContext";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../firebase/firebase_setup/firebase";
import handleNextStep from "../firebase/handles/handleNextStep";
import handleBackStep from "../firebase/handles/handleBackStep";
import handleFinishStartAkt from "../firebase/handles/handleFinishStartAkt";

const Steps = ({
  nameList,
  content,
}: {
  nameList: string[];
  content: JSX.Element[];
}) => {
  const [aktivtSteg, setAktivtSteg] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const { teamBruker } = useTeamContext();

  const handleNext = () => {
    if (aktivtSteg === nameList.length - 1) {
      /*setShowPopUp(true);*/
      handleFinishStartAkt();
    } else {
      handleNextStep();
    }
  };

  const handleBack = () => {
    handleBackStep();
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  useEffect(() => {
    if (teamBruker) {
      const docRef = doc(firestore, teamBruker.uid, "startAktivitetSteg");

      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        console.log("querysnapshot STEG Steps ", querySnapshot.data()?.steg);
        setAktivtSteg(querySnapshot.data()?.steg);
        if (querySnapshot.data()?.steg === -1) {
          navigate("/");
        }
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  return (
    <Box sx={{ width: "90%", height: "80%", margin: "auto" }}>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }} color="text.primary">
        Step {aktivtSteg + 1}: {nameList[aktivtSteg]}
      </Typography>
      <Stepper activeStep={aktivtSteg} sx={{ width: "30%" }}>
        {nameList.map((label) => (
          <Step key={label}>
            <StepLabel>{/*{label}*/}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {!showPopUp && <Box sx={{ pb: 5 }}>{content[aktivtSteg]}</Box>}
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
            // disabled={aktivtSteg === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {aktivtSteg === nameList.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Steps;
