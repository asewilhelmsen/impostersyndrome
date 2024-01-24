import { Button, Container, Grid, Typography } from "@mui/material";
import wave from "../wave.svg";
import { teamInfo } from "../constants";
import Popup from "../components/Popup";
import teamConnectors from "../images/teamConnectors.svg";
import teamConnectors_done from "../images/teamConnectors_done.svg";
import communicationExplorers from "../images/communicationExplorers.svg";
import communicationExplorers_done from "../images/communicationExplorers_done.svg";
import bondBuilders from "../images/bondBuilders.svg";
import bondBuilders_done from "../images/bondBuilders_done.svg";
import dreamTeam from "../images/dreamTeam.svg";
import dreamTeam_done from "../images/dreamTeam_done.svg";
import RetroButton from "../components/RetroButton";
import StartAktivitetButton from "../components/StartAktivitetButton";
import TeambuildingButton from "../components/TeambuildingButton";
import { useState, useEffect } from "react";
import getTeamLevel from "../firebase/getTeamLevel";
import { useTeamContext } from "../TeamContext";
import { firestore } from "../firebase/firebase_setup/firebase";
import { doc, onSnapshot } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import LevelPopUp from "../components/LevelPopUp";
import handleCloseLevelPopUp from "../firebase/handles/handleCloseLevelPopUp";

const Hjem = ({ handleSignOut }: { handleSignOut: () => Promise<void> }) => {
  const [teamLevel, setTeamLevel] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const { teamBruker } = useTeamContext();
  const navigate = useNavigate();

  const getLevel = async () => {
    try {
      const level = await getTeamLevel();
      setTeamLevel(level);
    } catch (error) {
      console.error("Kan ikke hente level", error);
    }
  };

  useEffect(() => {
    getLevel();
  }, []);

  useEffect(() => {
    if (teamBruker) {
      const docRef = doc(firestore, teamBruker.uid, "startAktivitetSteg");
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        if (querySnapshot.data()?.steg === 0) {
          navigate("/startaktivitet");
        } else if (querySnapshot.data()?.steg === 4) {
          setShowPopUp(true);
        }
      });
      return unsubscribe;
    }
  }, [teamBruker]);

  const handleClosePopUp = () => {
    setShowPopUp(false);
    handleCloseLevelPopUp();
  };

  //Foreløpig for bakgrunnen
  const waveBackgroundStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
  };

  const imageStyle = {
    width: "25%", // Initially, set the width to 100% for responsiveness
    height: "auto",
    "@media (minWidth: 600px)": {
      width: "48%", // Adjust width for small screens and up
    },
    "@media (minWidth: 960px)": {
      width: "23%", // Adjust width for medium screens and up
    },
  };

  return (
    <div style={containerStyle}>
      <Button onClick={handleSignOut}>Logg ut</Button>

      <img src={wave} alt="Wavy Background" style={waveBackgroundStyle} />

      <Container
        maxWidth="md"
        sx={{ alignItems: "center", minHeight: "700px" }}
      >
        <Typography variant="h2" sx={{ mt: 5, mb: 10 }} color="text.primary">
          Team: {teamInfo["123"].name}
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
          rowSpacing={1}
          columnSpacing={{ xs: 3, sm: 4, md: 5 }}
        >
          {/*Disse kunne sikkert vært lagd til et felles komponent men tenke de har litt ulike ting de skal uansett så husk å endre i alle om man endrer stil*/}
          <Grid item xs={12} md={6}>
            <StartAktivitetButton />
            <RetroButton disabled={true} />
            <TeambuildingButton disabled={true} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={6} md={3} sx={{}}>
                <img
                  src={teamLevel > 0 ? teamConnectors_done : teamConnectors}
                  alt="Level 1"
                  style={imageStyle}
                />
                <img
                  src={
                    teamLevel > 1
                      ? communicationExplorers_done
                      : communicationExplorers
                  }
                  alt="Level 2"
                  style={imageStyle}
                />
                <img
                  src={teamLevel > 2 ? bondBuilders_done : bondBuilders}
                  alt="Level 3"
                  style={imageStyle}
                />
                <img
                  src={teamLevel > 3 ? dreamTeam_done : dreamTeam}
                  alt="Level 4"
                  style={imageStyle}
                />
              </Grid>
              <Grid item xs={6} sx={{}}>
                <Popup />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {showPopUp && (
          <LevelPopUp onClose={handleClosePopUp} level={teamLevel} />
        )}
      </Container>
    </div>
  );
};

export default Hjem;
