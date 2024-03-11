import {
  Button,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import wave from "../../wave.svg";
import retro from "../../images/retro.svg";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";
import { useNavigate } from "react-router-dom";
import getTeamInfo from "../../firebase/getTeamInfo";
import handleNextStep from "../../firebase/handles/handleNextStep";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";
import handleOppdaterRetroNummer from "../../firebase/handles/handleOppdaterRetroNummer";
import RetroOppsummering from "./RetroOppsummering";

const RetroStart = ({
  onRetroStart,
}: {
  onRetroStart: (started: boolean) => void;
}) => {
  const imageStyle = {
    width: "23%",
  };

  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  const [retroer, setRetroer] = useState<string[]>(["Retrospektiv 1"]);
  const [antallRetroerGjennomfort, setAntallRetroerGjennomfort] =
    useState<number>(0);

  const [visOppsummering, setVisOppsummering] = useState<boolean>(false);

  const { teamBruker, retroNummer, setRetroNummer } = useTeamContext();
  const navigate = useNavigate();

  const startRetro = (index: number) => {
    setRetroNummer(index + 1);
    if (index + 1 > antallRetroerGjennomfort) {
      onRetroStart(true);
      //Må man gjøre det på begge her?
      handleOppdaterRetroNummer(index + 1, "retroNummer");
      handleNextStep("retroSteg");
    } else {
      setVisOppsummering(true);
    }
  };

  const handleBackToHomePage = () => {
    handleNextStep("retroSteg", -1);
    navigate("/");
  };

  const handleOppsummeringLukk = () => {
    setVisOppsummering(false);
  };
  const setAntallRetroer = async () => {
    try {
      const teamInfo = await getTeamInfo();
      if (teamInfo) {
        setAntallRetroerGjennomfort(teamInfo.antallRetroerGjennomfort);
      }
    } catch (error) {
      console.error("Kan ikke hente målene", error);
    }
  };

  useEffect(() => {
    setAntallRetroer();
  }, []);

  useEffect(() => {
    const newRetroer = [];
    for (let i = 1; i <= antallRetroerGjennomfort + 1; i++) {
      newRetroer.push("Retrospektiv " + i);
    }
    setRetroer(newRetroer);
  }, [antallRetroerGjennomfort]);

  useEffect(() => {
    if (teamBruker) {
      const stegRef = doc(firestore, teamBruker.uid, "retroSteg");
      const nummerRef = doc(firestore, teamBruker.uid, "teamInfo");

      const retroStegUnsubscribe = onSnapshot(stegRef, (querySnapshot) => {
        if (
          //Oppdater til antall steg vi får
          querySnapshot.data()?.steg === -1
        ) {
          navigate("/");
        } else if (querySnapshot.data()?.steg === 0) {
          navigate("/retrospektiv");
          onRetroStart(false);
        } else {
          onRetroStart(true);
        }
      });
      const retroNummerUnsubscribe = onSnapshot(nummerRef, (querySnapshot) => {
        if (querySnapshot) {
          setRetroNummer(querySnapshot.data()?.retroNummer);
        }
      });

      return () => {
        retroStegUnsubscribe();
        retroNummerUnsubscribe();
      };
    }
  }, [teamBruker]);

  return (
    <>
      {visOppsummering ? (
        <RetroOppsummering
          retroNummer={retroNummer}
          onOppsummeringLukk={handleOppsummeringLukk}
        />
      ) : (
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
                Retrospektiv
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
              paddingTop: isSmallScreen ? "10%" : "6%",
              paddingLeft: "5%",
              paddingRight: "5%",
            }}
          >
            <Grid
              container //container 1
              spacing={2}
              textAlign="center"
            >
              <Grid item xs={12}>
                <img
                  src={retro}
                  alt="Retro illustration"
                  style={imageStyle}
                ></img>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  paddingLeft: "20%",
                  paddingReight: "20%",
                }}
              >
                <Typography variant="body1">
                  En <b>retrospektiv</b> er et møte der man regelmessig
                  reflekterer over samarbeidet i teamet for å oppnå
                  kontinuerlige forbedringer for hver sprint. Målet er at alle
                  på teamet kan dele tanker og sine synspunkter, får innsikt i
                  hva de andre tenker og at dere utvikler målrettede tiltak for
                  fremtidig forbedring. Skap et rom for å sammenligne
                  perspektiver innad i teamet, dette kan føre til økt tillit og
                  bedre teamutvikling, som kan være avgjørende for teamets
                  langsiktige suksess.
                </Typography>

                {retroer.length > 1 && (
                  <Typography variant="body2">
                    <br></br>
                    Klikk på en tidligere retrospektiv for å se en oppsummering
                    av retroen!
                  </Typography>
                )}
              </Grid>
              {retroer.map((tekst, index) => (
                <Grid item xs={12} key={index}>
                  <Button variant="contained" onClick={() => startRetro(index)}>
                    {tekst}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};

export default RetroStart;
