import { Button } from "@mui/material";
import img from "../images/teambuilding.svg";
import { useNavigate } from "react-router-dom";

const TeambuildingButton = () => {
  const imageStyle = {
    width: "30%",
    marginBottom: "3%",
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/teambuilding");
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
        src={/*disabled ? img_disabled :*/ img}
        alt="Button illustration"
        style={imageStyle}
      ></img>
      <Button variant="contained" onClick={handleClick}>
        TEAMBUILDING
      </Button>
    </div>
  );
};

export default TeambuildingButton;
