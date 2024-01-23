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
    h5: {
      color: "#0E056E",
      marginBottom: "2%",
    },
    h6: {
      color: "#0E056E",
      marginBottom: "1%",
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#7D97F4",
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
