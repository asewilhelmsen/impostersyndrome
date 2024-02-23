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
import handleLeggTilRetroSvar from "../firebase/handles/handleLeggTilRetroSvar";

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
  const [aktivtSteg, setAktivtSteg] = useState(0);
  const [filtrertListe, setFiltrertListe] = useState<string[]>();

  const navigate = useNavigate();
  const { teamBruker } = useTeamContext();

  const handleNext = () => {
    if (aktivtSteg === 3) {
      handleLeggTilRetroSvar(filtrertListe, "filtrertBedreLapper");
      handleNextStep("retroSteg");
    } else if (aktivtSteg === 8) {
      //Håndtere at retro er ferdig
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
          querySnapshot.data()?.steg === 8 ||
          querySnapshot.data()?.steg === -1
        ) {
          navigate("/");
        }
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  useEffect(() => {
    setFiltrertListe(oppdatertListe);
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
            <b>Steg {aktivtSteg + 1}:</b> {nameList[aktivtSteg]}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper activeStep={aktivtSteg} sx={{ width: "30%", mt: 0 }}>
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
          <Box sx={{ pb: 5 }}>{content[aktivtSteg]}</Box>
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
