import { Button, Grid } from "@mui/material";
import img from "../images/teambuilding.svg";
import img_disabled from "../images/teambuilding_disabled.svg";

const TeambuildingButton = ({ disabled }: { disabled: boolean }) => {
  const imageStyle = {
    width: "75%",
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
          src={disabled ? img_disabled : img}
          alt="Button illustration"
          style={imageStyle}
        ></img>
      </Grid>
      <Grid item xs={6}>
        {disabled ? (
          <Button variant="contained" disabled>
            Teambuilding
          </Button>
        ) : (
          <Button variant="contained">Teambuilding</Button>
        )}
      </Grid>
    </Grid>
  );
};

export default TeambuildingButton;
