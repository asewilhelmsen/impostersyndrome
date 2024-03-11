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
import handleAddMaal from "../firebase/handles/handleAddMaal";
import { Maalene } from "../interfaces";
import LevelPopUp from "./LevelPopUp";

const StepsRetro = ({
  nameList,
  content,
  nesteDisabled,
  oppdatertListe,
  onRetroStart,
  nyeMaal,
}: {
  nameList: string[];
  content: JSX.Element[];
  nesteDisabled: boolean;
  oppdatertListe: string[];
  onRetroStart: (started: boolean) => void;
  nyeMaal: Maalene[];
}) => {
  const [aktivtSteg, setAktivtSteg] = useState(1);
  const [nyListe, setNyListe] = useState<string[]>();
  const [showPopUpLevel2, setShowPopUpLevel2] = useState(false);
  const navigate = useNavigate();
  const { teamBruker, retroNummer } = useTeamContext();

  const handleNext = () => {
    if (aktivtSteg === 1) {
      handleAddMaal(nyeMaal, "retro", "retroMaal" + retroNummer);
      handleNextStep("retroSteg");
    } else {
      handleNextStep("retroSteg");
    }
  };

  const handleBack = () => {
    handleBackStep("retroSteg");
  };

  const handleClosePopUp = () => {
    if (retroNummer === 1) {
      handleOppdaterRetroNummer(1, "antallRetroerGjennomfort");
      handleUpdateLevel(2);
    } else if (retroNummer === 2) {
      handleOppdaterRetroNummer(2, "antallRetroerGjennomfort");
      handleUpdateLevel(3);
    }
    setShowPopUpLevel2(false);
    handleNextStep("retroSteg", -1);
  };

  useEffect(() => {
    if (teamBruker) {
      const docRef = doc(firestore, teamBruker.uid, "retroSteg");
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        setAktivtSteg(querySnapshot.data()?.steg);
        if (querySnapshot.data()?.steg === -1) {
          navigate("/");
        } else if (querySnapshot.data()?.steg === 9) {
          if (retroNummer === 1) {
            setShowPopUpLevel2(true);
          } else if (retroNummer === 2) {
            //setShowPopUpLevel3(true);
          }
        } else if (querySnapshot.data()?.steg === 0) {
          navigate("/retrospektiv");
          onRetroStart(false);
        }
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  useEffect(() => {
    setNyListe(oppdatertListe);
  }, [oppdatertListe]);

  return (
    <>
      {!showPopUpLevel2 && (
        <Box
          sx={{
            height: "100vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "secondary.main",
          }}
        >
          <Grid container sx={{ backgroundColor: "white", padding: 3 }}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <b>Steg {aktivtSteg}:</b> {nameList[aktivtSteg - 1]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stepper activeStep={aktivtSteg - 1} sx={{ width: "50%", mt: 0 }}>
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
                {aktivtSteg === nameList.length ? "Ferdig" : "Neste"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      {showPopUpLevel2 && (
        <Box
          sx={{
            height: "100vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "secondary.main",
          }}
        >
          <LevelPopUp
            onClose={handleClosePopUp}
            level={2}
            message={
              "En oppsummering av retrospektiven finner du i listen over retrospektiver!"
            }
          />
          <Typography
            fontSize={"14px"}
            color={"#708090"}
            margin={"auto"}
            marginTop={"50px"}
          >
            Klikk her for å komme til Teamet's hjemmeside
          </Typography>
        </Box>
      )}
    </>
  );
};

export default StepsRetro;
