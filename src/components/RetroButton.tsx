import { Button, Grid } from "@mui/material";
import retro from "../images/retro.svg";
import retro_disabled from "../images/retro_disabled.svg";

const RetroButton = ({ disabled }: { disabled: boolean }) => {
  const imageStyle = {
    width: "25%",
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
        src={disabled ? retro_disabled : retro}
        alt="Button illustration"
        style={imageStyle}
      ></img>
      {disabled ? (
        <Button variant="contained" disabled>
          RETROSPEKTIV
        </Button>
      ) : (
        <Button variant="contained">RETROSPEKTIV</Button>
      )}
    </div>
  );
};

export default RetroButton;
