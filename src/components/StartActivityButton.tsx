import { Button, Grid } from "@mui/material";
import startActivity from "../images/startActivity.svg";

const StartActivityButton = () => {
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
          src={startActivity}
          alt="Button illustration"
          style={imageStyle}
        ></img>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained">Start-activity</Button>
      </Grid>
    </Grid>
  );
};

export default StartActivityButton;
