import { Typography, Grid, Button, useMediaQuery } from "@mui/material";
import meme from "../../images/teambuildingMeme.png";

const VisBilder = ({
  onLukk,
  onFullfor,
}: {
  onLukk: () => void;
  onFullfor: () => void;
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  const handleBackToHomePage = () => {
    onLukk();
  };
  return (
    <>
      <div
        style={{
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          padding: 5,
        }}
      >
        <Grid
          container
          sx={{ alignItems: "center", marginTop: "2%", marginBottom: "2%" }}
        >
          <Grid item xs={10}>
            <Typography
              variant="h2"
              style={{ marginBottom: "1%", marginLeft: "5%" }}
            >
              Finn et bilde
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
            backgroundColor: "#E3EAFD",
            display: "flex",
            flexDirection: "column",
            paddingTop: isSmallScreen ? "10%" : "6%",
            paddingLeft: "5%",
            paddingRight: "5%",

            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Typography marginLeft={"5px"} variant="body1">
                <b>1. </b>
                Finn individuelt et bilde fra kamerarullen eller internett
                (f.eks en Meme) som oppsummerer den siste uken.
              </Typography>
              <br></br>
              <Typography marginLeft={"5px"} variant="body1">
                <b> 2. </b>Gi bildet ditt en tittel.
              </Typography>
              <br></br>
              <Typography marginLeft={"5px"} variant="body1">
                <b> 3.</b> Gå rundt bordet og presenter bildene med tittel for
                hverandre.
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <img src={meme} style={{ width: "80%" }}></img>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            style={{ width: "180px", marginTop: "70px" }}
            onClick={onFullfor}
          >
            Øvelse ferdig
          </Button>
        </div>
      </div>
    </>
  );
};

export default VisBilder;
