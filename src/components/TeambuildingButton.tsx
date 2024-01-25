import { Button, Grid } from "@mui/material";
import img from "../images/teambuilding.svg";
import img_disabled from "../images/teambuilding_disabled.svg";

const TeambuildingButton = ({ disabled }: { disabled: boolean }) => {
  const imageStyle = {
    width: "25%",
    marginBottom: "3%",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "5%",
      }}
    >
      <img
        src={disabled ? img_disabled : img}
        alt="Button illustration"
        style={imageStyle}
      ></img>
      {disabled ? (
        <Button variant="contained" disabled>
          TEAMBUILDING
        </Button>
      ) : (
        <Button variant="contained">TEAMBUILDING</Button>
      )}
    </div>
  );
};

export default TeambuildingButton;
