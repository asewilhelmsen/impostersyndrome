import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7D97F4",
    },
    secondary: {
      main: "#E3EAFD",
    },
    text: {
      primary: "#0E056E",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    h2: {
      color: "#0E056E",
      marginTop: "2%",
      marginBottom: "2%",
    },
  },
});

export default theme;
