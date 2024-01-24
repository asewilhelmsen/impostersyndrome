import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
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
  maalData,
}: {
  nameList: string[];
  content: JSX.Element[];
  maalData: { [key: string]: string };
}) => {
  const [aktivtSteg, setAktivtSteg] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();
  const { teamBruker } = useTeamContext();

  const handleNext = () => {
    if (aktivtSteg === nameList.length - 1) {
      /*setShowPopUp(true);*/
      handleFinishStartAkt(maalData);
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
            <b>Steg {aktivtSteg + 1}:</b> {nameList[aktivtSteg]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={aktivtSteg} sx={{ width: "30%" }}>
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
          {!showPopUp && <Box sx={{ pb: 5 }}>{content[aktivtSteg]}</Box>}
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
          }}
        >
          <Button
            variant="contained"
            // disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Tilbake
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignSelf: "flex-end",
          }}
        >
          <Button variant="contained" onClick={handleNext}>
            {aktivtSteg === nameList.length - 1 ? "Ferdig" : "Neste"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Steps;
