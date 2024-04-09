import { Typography, Grid, Box } from "@mui/material";
import meme from "../../images/teambuildingMeme.png";

const VisBilder = () => {
  return (
    <>
      <Typography variant="h2" sx={{ marginBottom: "30px" }}>
        Oppsummer uken
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={5}>
          <Typography marginLeft={"5px"} variant="body1">
            <b>1.</b> Ta 3 minutter der all finner et bilde fra kamerarullen
            eller fra internett, feks en Meme, som oppsummerer uken som har
            vært!
          </Typography>
          <Typography marginLeft={"5px"} variant="body1">
            <b> 2. </b>Gi bildet ditt en tittel
          </Typography>
          <Typography marginLeft={"5px"} variant="body1">
            <b> 3.</b> Gå rundt bordet og presenter bildene for hverandre
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img src={meme} style={{ width: "80%" }}></img>
        </Grid>
      </Grid>
    </>
  );
};

export default VisBilder;
