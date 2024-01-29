import { Button, Grid } from "@mui/material";
import startActivity from "../images/startActivity.svg";
import { useNavigate } from "react-router-dom";
import handleNextStep from "../firebase/handles/handleNextStep";

const StartAktivitetButton = () => {
  const imageStyle = {
    width: "30%",
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/startaktivitet");
    handleNextStep();
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
        src={startActivity}
        alt="Button illustration"
        style={imageStyle}
      ></img>
      <Button variant="contained" onClick={handleClick}>
        START-AKTIVITET
      </Button>
    </div>
  );
};

export default StartAktivitetButton;
