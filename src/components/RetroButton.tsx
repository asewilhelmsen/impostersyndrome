import { Button } from "@mui/material";
import retro from "../images/retro.svg";
import { useNavigate } from "react-router-dom";
import handleNextStep from "../firebase/handles/handleNextStep";

const RetroButton = () => {
  const imageStyle = {
    width: "30%",
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/retrospektiv");
    handleNextStep("retroSteg");
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
        src={/*disabled ? retro_disabled : */ retro}
        alt="Button illustration"
        style={imageStyle}
      ></img>
      <Button variant="contained" onClick={handleClick}>
        RETROSPEKTIV
      </Button>
    </div>
  );
};

export default RetroButton;
