import { Button, Grid } from "@mui/material";
import startActivity from "../images/startActivity.svg";
import { useNavigate } from "react-router-dom";

const StartActivityButton = () => {
  const imageStyle = {
    width: "80%",
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/start");
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
        <Button variant="contained" onClick={handleClick}>
          Start-activity
        </Button>
      </Grid>
    </Grid>
  );
};

export default StartActivityButton;
