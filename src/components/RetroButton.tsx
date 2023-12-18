import { Button, Grid } from "@mui/material";
import retro from "../images/retro.svg";
import retro_disabled from "../images/retro_disabled.svg";

const RetroButton = ({ disabled }: { disabled: boolean }) => {
  const imageStyle = {
    width: "80%",
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      spacing={2}
    >
      <Grid item xs={6}>
        <img
          src={disabled ? retro_disabled : retro}
          alt="Button illustration"
          style={imageStyle}
        ></img>
      </Grid>
      <Grid item xs={6}>
        {disabled ? (
          <Button variant="contained" disabled>
            Retrospective
          </Button>
        ) : (
          <Button variant="contained">Retrospective</Button>
        )}
      </Grid>
    </Grid>
  );
};

export default RetroButton;
