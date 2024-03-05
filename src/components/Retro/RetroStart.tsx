import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import wave from "../../wave.svg";
import retro from "../../images/retro.svg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import { useTeamContext } from "../../TeamContext";
import { useNavigate } from "react-router-dom";
import getTeamInfo from "../../firebase/getTeamInfo";
import handleNextStep from "../../firebase/handles/handleNextStep";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase_setup/firebase";

const RetroStart = ({
  onRetroStart,
}: {
  onRetroStart: (stared: boolean) => void;
}) => {
  const imageStyle = {
    width: "23%",
  };

  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  const [retroer, setRetroer] = useState<string[]>(["Retrospektiv 1"]);
  const [antallRetroerGjennomfort, setAntallRetroerGjennomfort] =
    useState<number>(0);

  const { teamBruker, setRetroNummer } = useTeamContext();
  const navigate = useNavigate();

  const addNyRetro = () => {
    const newString = "Retrospektiv " + (retroer.length + 1);
    setRetroer((prev) => [...prev, newString]);
  };

  const startRetro = (index: number) => {
    onRetroStart(true);
    setRetroNummer(index + 1);
    handleNextStep("retroSteg");
  };

  const handleBackToHomePage = () => {
    handleNextStep("retroSteg", -1);
    navigate("/");
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
      const docRef = doc(firestore, teamBruker.uid, "retroSteg");
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        if (
          //Oppdater til antall steg vi får
          querySnapshot.data()?.steg === -1
        ) {
          navigate("/");
        } else if (querySnapshot.data()?.steg !== 0) {
          onRetroStart(true);
        }
      });

      return unsubscribe;
    }
  }, [teamBruker]);

  return (
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
        <Grid
          container //container 1
          spacing={2}
          textAlign="center"
        >
          <Grid item xs={12}>
            <img src={retro} alt="Retro illustration" style={imageStyle}></img>
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
              En retrospektiv er et møte der man regelmessig reflekterer over
              samarbeidet i teamet for å oppnå kontinuerlige forbedringer. Målet
              er at alle på teamet kan dele tanker og sine synspunkter, at alle
              får innsikt i hva de andre tenker og å utvikle målrettede tiltak
              for fremtidig forbedring. Vi vil at dere skaper et rom for å
              sammenligne perspektiver innad i teamet som kan føre til økt
              tillit og bedre teamutvikling. Retrospektiver bidrar også til å
              forbedre Psykologisk sikkerhet i teamnoe som beviselig er
              avgjørende for teamets langsiktige suksess.
            </Typography>
          </Grid>
          {retroer.map((tekst, index) => (
            <Grid item xs={12}>
              <Button variant="contained" onClick={() => startRetro(index)}>
                {tekst}
              </Button>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Tooltip title="Start en ny retrospektiv">
              <IconButton onClick={addNyRetro}>
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default RetroStart;
