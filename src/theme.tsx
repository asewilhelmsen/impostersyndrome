import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E3EAFD",
    },
    secondary: {
      main: "#7D97F4",
    },
    text: {
      primary: "#0E056E",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
