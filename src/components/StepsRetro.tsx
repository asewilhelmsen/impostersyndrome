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
import handleUpdateLevel from "../firebase/handles/handleUpdateLevel";
import handleOppdaterRetroNummer from "../firebase/handles/handleOppdaterRetroNummer";

const StepsRetro = ({
  nameList,
  content,
  nesteDisabled,
  oppdatertListe,
}: {
  nameList: string[];
  content: JSX.Element[];
  nesteDisabled: boolean;
  oppdatertListe: string[];
}) => {
  const [aktivtSteg, setAktivtSteg] = useState(1);
  const [nyListe, setNyListe] = useState<string[]>();

  const navigate = useNavigate();
  const { teamBruker } = useTeamContext();

  const handleNext = () => {
    if (aktivtSteg === 5) {
      //Gjøres nå i komponentet
      handleNextStep("retroSteg");
    } else if (aktivtSteg === 8) {
      //Håndtere at retro er ferdig
      handleNextStep("retroSteg", 9);
      handleUpdateLevel(2);
      //Oppdaterer til at 1 retro er gjennomført, må endres senere når man gjøre flere enn 1
      handleOppdaterRetroNummer(1);
    } else {
      handleNextStep("retroSteg");
    }
  };

  const handleBack = () => {
    handleBackStep("retroSteg");
  };

  useEffect(() => {
    if (teamBruker) {
      const docRef = doc(firestore, teamBruker.uid, "retroSteg");
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        setAktivtSteg(querySnapshot.data()?.steg);
        if (
          //Oppdater til antall steg vi får
          querySnapshot.data()?.steg === 9 ||
          querySnapshot.data()?.steg === 0
          //eller -1 her, var det før
        ) {
          navigate("/");
        } else if (querySnapshot.data()?.steg === 0) {
          navigate("/retrospektiv");
        }
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  useEffect(() => {
    setNyListe(oppdatertListe);
  }, [oppdatertListe]);

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
          <Typography variant="h6">
            <b>Steg {aktivtSteg}:</b> {nameList[aktivtSteg - 1]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={aktivtSteg - 1} sx={{ width: "40%", mt: 0 }}>
            {nameList.map((label) => (
              <Step key={label}>
                <StepLabel>{/*{label}*/}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          padding: 3,
          flex: 1,
        }}
      >
        <Grid item xs={12}>
          <Box sx={{ pb: 5 }}>{content[aktivtSteg - 1]}</Box>
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
          <Button variant="contained" onClick={handleBack} sx={{ mr: 1 }}>
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
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={nesteDisabled}
          >
            {aktivtSteg === nameList.length - 1 ? "Ferdig" : "Neste"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepsRetro;
