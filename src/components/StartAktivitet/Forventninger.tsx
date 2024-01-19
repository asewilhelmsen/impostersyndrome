import { Box, Typography } from "@mui/material";
import A from "../../images/A.svg";
import B from "../../images/B.svg";
import C from "../../images/C.svg";
import Maal from "../Maal";
import ExpectationImg from "../../images/Expectations.svg";

const Forventninger = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 30,
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ mt: 5, mb: 10 }} color="text.primary">
          Clarification of Expectations
        </Typography>
        <img
          src={ExpectationImg}
          alt="Expectaion illustration"
          style={{ width: "10%" }}
        ></img>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <img src={A} alt="A bullet point" style={{ width: "5%" }}></img>
        <Typography>
          Take turns sharing your strengths and weaknesses in team projects.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <img src={B} alt="B bullet point" style={{ width: "5%" }}></img>
        <Typography>
          Take turns expressing your expectations of the other team members and
          the team as a whole.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <img src={C} alt="C bullet point" style={{ width: "5%" }}></img>
        <Typography>
          Define and write specific goals regarding teamwork for this sprint:
        </Typography>
      </Box>
      <Maal />
    </Box>
  );
};

export default Forventninger;
