import { Button, Tooltip, Typography } from "@mui/material";
import startActivity from "../images/startActivity.svg";
import { useNavigate } from "react-router-dom";
import handleNextStep from "../firebase/handles/handleNextStep";
import Check from "@mui/icons-material/Check";

const StartAktivitetButton = ({ level }: { level: number }) => {
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
      {level > 0 ? (
        <Tooltip
          title={
            <Typography
              style={{
                fontSize: "16px",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Check fontSize="medium" /> Start-aktiviteten er allerede fullført
            </Typography>
          }
        >
          <Button variant="contained" onClick={handleClick}>
            START-AKTIVITET
          </Button>
        </Tooltip>
      ) : (
        <Button variant="contained" onClick={handleClick}>
          START-AKTIVITET
        </Button>
      )}
    </div>
  );
};

export default StartAktivitetButton;
