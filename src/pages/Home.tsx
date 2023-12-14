import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import wave from "../wave.svg";
import { teamInfo } from "../constants";
import Popup from "../components/Popup";
import teamConnectors from "../images/teamConnectors.svg";
import communicationExplorers from "../images/communicationExplorers.svg";
import bondBuilders from "../images/bondBuilders.svg";
import dreamTeam from "../images/dreamTeam.svg";

const Home = () => {
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
    "@media (min-width: 600px)": {
      width: "48%", // Adjust width for small screens and up
    },
    "@media (min-width: 960px)": {
      width: "23%", // Adjust width for medium screens and up
    },
  };

  return (
    <div style={containerStyle}>
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
          justifyContent="space-evenly"
          alignItems="stretch"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={6} sx={{}}>
            <Button>Start activity</Button>
            <Button>Retrospective</Button>
            <Button>Teambuilding activity</Button>
          </Grid>
          <Grid item xs={6} sx={{}}>
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} sm={6} md={3} sx={{}}>
                <img src={teamConnectors} alt="Level 1" style={imageStyle} />
                <img
                  src={communicationExplorers}
                  alt="Level 2"
                  style={imageStyle}
                />
                <img src={bondBuilders} alt="Level 3" style={imageStyle} />
                <img src={dreamTeam} alt="Level 4" style={imageStyle} />
              </Grid>
              <Grid item xs={6} sx={{}}>
                <Popup />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
