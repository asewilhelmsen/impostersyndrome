import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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
import DilemmaImg from "../images/DilemmaImg.svg";
import VisBildeImg from "../images/VisBildeImg.svg";
import Ordspill_Img from "../images/Ordspill_Img.svg";
import Dilemma from "../components/Teambuilding/Dilemma";
import VisBilder from "../components/Teambuilding/VisBilder";
import OrdJakt from "../components/Teambuilding/OrdJakt";

const Teambuilding = () => {
  //const [tb1Done, setTb1Done] = useState<boolean>(false); Fikse denne hvis vi trenger å disable knapp etter fullført
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

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

  const handleLukkAktivitet = () => {
    setSelectedBox(null);
  };
  const handleClosePopUp = () => {
    setShowPopUpLevel3(false);
    setShowPopUpLevel4(false);
  };

  const handleClickBox = (boxNumber: number) => {
    setSelectedBox(boxNumber);
  };

  const handleTeambuildingDone = () => {
    //setTb1Done(true);
    setSelectedBox(null);
    handleUpdateAntallTeambuilding(antallTeambuildingGjennomfort + 1);
    //Hvis man har gjort 2 retroer
    if (antallRetroerGjennomfort >= 1 && antallTeambuildingGjennomfort > 1) {
      console.log("Nivå 4 er allerede nådd");
    } else if (antallRetroerGjennomfort > 1) {
      setShowPopUpLevel4(true);
      handleUpdateLevel(4);
    }
    //hvis man har gjort 1 retro men flere teambuildingsøvelser
    else if (
      antallRetroerGjennomfort === 1 &&
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

  const cardData = [
    {
      image: DilemmaImg,
      title: "Dilemmaer",
      description:
        "Bli enda bedre kjent ved å se hvilke valg dere tar i useriøse dilemmaer.",
      handleClick: () => handleClickBox(1),
    },
    {
      image: VisBildeImg,
      title: "Finn et bilde",
      description:
        "Bruk ett bilde til å beskrive noe fra den siste uken! Del med hverandre. ",
      handleClick: () => handleClickBox(2),
    },
    {
      image: Ordspill_Img,
      title: "Ord-jakten",
      description:
        "Samarbeid om å finne flest mulige ord. Hvor mange finner dere sammen?",
      handleClick: () => handleClickBox(3),
    },
  ];

  return (
    <>
      {selectedBox === null ? (
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
            <Grid
              item
              xs={2}
              style={{ textAlign: "right", paddingRight: "2%" }}
            >
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
              paddingTop: isSmallScreen ? "10%" : "8%",
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            <Grid container spacing={2} textAlign="center">
              {cardData.map((card, index) => (
                <Grid item xs={4} key={index}>
                  <Card style={{ borderRadius: 6 }}>
                    <CardMedia
                      component="img"
                      image={card.image}
                      alt={card.title}
                      style={{
                        width: "60%",
                        margin: "auto",
                        marginBottom: "10px",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h5">{card.title}</Typography>
                      <Typography variant="body2">
                        {card.description}
                      </Typography>
                      <br></br>
                      <Button variant="contained" onClick={card.handleClick}>
                        Start øvelsen
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      ) : selectedBox === 1 ? (
        <Dilemma
          onLukk={handleLukkAktivitet}
          onFullfor={handleTeambuildingDone}
        />
      ) : selectedBox === 2 ? (
        <VisBilder
          onLukk={handleLukkAktivitet}
          onFullfor={handleTeambuildingDone}
        />
      ) : (
        <OrdJakt
          onLukk={handleLukkAktivitet}
          onFullfor={handleTeambuildingDone}
        />
      )}
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
