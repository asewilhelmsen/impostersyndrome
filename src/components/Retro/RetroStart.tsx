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
import handleBackStep from "../../firebase/handles/handleBackStep";

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
  const { retroNummer, setRetroNummer } = useTeamContext();
  const navigate = useNavigate();

  const addNyRetro = () => {
    const newString = "Retrospektiv " + (retroer.length + 1);
    setRetroer((prev) => [...prev, newString]);
  };

  const startRetro = () => {
    onRetroStart(true);
    setRetroNummer(retroer.length);
  };

  const handleBack = () => {
    handleBackStep("retroSteg");
    navigate("/");
  };

  useEffect(() => {
    const newRetroer = [];
    for (let i = 1; i <= retroNummer; i++) {
      newRetroer.push("Retrospektiv " + i);
    }
    setRetroer(newRetroer);
  }, []);

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
          <Button variant="contained" onClick={handleBack}>
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
              <Button variant="contained" key={index + 1} onClick={startRetro}>
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
