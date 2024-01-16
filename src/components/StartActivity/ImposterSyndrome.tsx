import { Box, Typography } from "@mui/material";
import ImposterSyndromePicture from "../../images/Information.svg";
import PieChart from "../../images/PieChart.svg";

const Information = () => {
  return (
    <div>
      <Typography variant="h2" sx={{ mt: 5, mb: 10 }} color="text.primary">
        What is Imposter Syndrome?
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: "repeat(2, 1fr)",
          placeItems: "center",
        }}
      >
        <Typography color="text.primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Typography color="text.primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>

        <img
          src={ImposterSyndromePicture}
          alt="Imposter syndrome illustration"
          style={{ width: "50%" }}
        ></img>
        <img src={PieChart} alt="Pie chart" style={{ width: "35%" }}></img>
      </Box>
    </div>
  );
};

export default Information;
