import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import wave from "../wave.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTeamContext } from "../TeamContext";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../firebase/firebase_setup/firebase";
import LevelPopUp from "../components/LevelPopUp";
import handleUpdateLevel from "../firebase/handles/handleUpdateLevel";
import handleUpdateAntallTeambuilding from "../firebase/handles/handleUpdateAntallTeambuilding";

const Teambuilding = () => {
  const [tb1Done, setTb1Done] = useState<boolean>(false);

  const [showPopUpLevel3, setShowPopUpLevel3] = useState(false);
  const [showPopUpLevel4, setShowPopUpLevel4] = useState(false);

  const { teamBruker } = useTeamContext();
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");
  const navigator = useNavigate();

  const [antallRetroerGjennomfort, setAntallRetroerGjennomfort] =
    useState<number>(0);
  const [antallTeambuildingGjennomfort, setAntallTeambuildingGjennomfort] =
    useState<number>(0);

  const handleBackToHomePage = () => {
    navigator("/");
  };

  const handleClosePopUp = () => {
    setShowPopUpLevel3(false);
    setShowPopUpLevel4(false);
  };

  const handleTeambuildingDone = () => {
    setTb1Done(true);
    handleUpdateAntallTeambuilding(antallTeambuildingGjennomfort + 1);
    //Hvis man har gjort 2 retroer
    if (antallRetroerGjennomfort > 1) {
      setShowPopUpLevel4(true);
      handleUpdateLevel(4);
    }
    //hvis man har gjort 1 retro men flere teambuildingsøvelser
    else if (
      antallRetroerGjennomfort == 1 &&
      antallTeambuildingGjennomfort > 0
    ) {
      setShowPopUpLevel4(true);
      handleUpdateLevel(4);
    } else {
      setShowPopUpLevel3(true);
      handleUpdateLevel(3);
    }
  };

  useEffect(() => {
    if (teamBruker) {
      const docRef = doc(firestore, teamBruker.uid, "teamInfo");

      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        setAntallRetroerGjennomfort(
          querySnapshot.data()?.antallRetroerGjennomfort
        );
        setAntallTeambuildingGjennomfort(
          querySnapshot.data()?.antallTeambuildingGjennomfort
        );
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container alignItems="center" marginTop={"1%"}>
          <Grid item xs={10}>
            <Typography
              variant="h2"
              style={{ marginBottom: "1%", marginLeft: "5%" }}
            >
              Teambuilding
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ textAlign: "right", paddingRight: "2%" }}>
            <Button variant="contained" onClick={handleBackToHomePage}>
              Tilbake
            </Button>
          </Grid>
        </Grid>
        <div
          style={{
            flex: 1,
            backgroundImage: `url(${wave})`,
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            paddingTop: isSmallScreen ? "10%" : "6%",
            paddingLeft: "5%",
            paddingRight: "5%",
          }}
        >
          <Grid container spacing={2} textAlign="center">
            <Card>
              Teambuilding 1
              <Button
                variant="contained"
                onClick={handleTeambuildingDone}
                disabled={tb1Done}
              >
                Fullført
              </Button>
            </Card>
          </Grid>
          <Grid></Grid>
        </div>
      </div>
      {(showPopUpLevel3 || showPopUpLevel4) && (
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
            level={showPopUpLevel3 ? 3 : 4}
            message={"Bra jobba!"}
          />
          <Typography
            fontSize={"14px"}
            color={"#708090"}
            margin={"auto"}
            marginTop={"50px"}
          >
            Klikk her for å lukke
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Teambuilding;
