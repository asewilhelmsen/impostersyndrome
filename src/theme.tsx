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
      marginBottom: "2%",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          borderRadius: 6,
          textTransform: "none",
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          "& .MuiStepIcon-root": {
            color: "#E3EAFD",
          },
        },
      },
    },
  },
});

export default theme;
