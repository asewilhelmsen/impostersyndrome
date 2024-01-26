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
import { useMediaQuery } from "@mui/material";

const Hjem = ({ handleSignOut }: { handleSignOut: () => Promise<void> }) => {
  const [teamLevel, setTeamLevel] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const { teamBruker } = useTeamContext();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery("(max-width: 800px)");

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
    width: "17%",
  };

  return (
    <div
      style={{
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button onClick={handleSignOut}>Logg ut</Button>

      <Typography variant="h2" style={{ marginBottom: 0, marginLeft: "7%" }}>
        Team: {teamInfo["123"].name}
      </Typography>

      <div
        style={{
          flex: 1,
          backgroundImage: `url(${wave})`,
          backgroundSize: "cover",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          paddingTop: "3%",
          paddingLeft: "3%",
          paddingRight: "6%",
        }}
      >
        <Grid
          container //container 1
          alignItems="center"
        >
          <Grid item xs={12}>
            <StartAktivitetButton />
          </Grid>
          <Grid item xs={12}>
            <RetroButton disabled={true} />
          </Grid>
          <Grid item xs={12}>
            <TeambuildingButton disabled={true} />
          </Grid>
        </Grid>

        <Grid
          container //container 2
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            padding: "3% 0",
          }}
        >
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <Popup />
          </Grid>
        </Grid>

        {showPopUp && (
          <LevelPopUp onClose={handleClosePopUp} level={teamLevel} />
        )}
      </div>
    </div>
  );
};

export default Hjem;
