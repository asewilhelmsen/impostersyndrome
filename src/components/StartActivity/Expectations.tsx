import { Box, Typography } from "@mui/material";
import A from "../../images/A.svg";
import B from "../../images/B.svg";
import C from "../../images/C.svg";

const Expectations = () => {
  return (
    <div>
      <Typography variant="h2" sx={{ mt: 5, mb: 10 }} color="text.primary">
        Clarification of Expectations
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <img
          src={A}
          alt="Imposter syndrome illustration"
          style={{ width: "5%" }}
        ></img>
        <img
          src={B}
          alt="Imposter syndrome illustration"
          style={{ width: "5%" }}
        ></img>
        <img
          src={C}
          alt="Imposter syndrome illustration"
          style={{ width: "5%" }}
        ></img>
      </Box>
    </div>
  );
};

export default Expectations;
