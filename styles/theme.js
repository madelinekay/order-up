import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f5d2ff",
      dark: "#70008e",
      light: "#f9e3ff",
    },
    secondary: {
      main: "#70008e",
    },
    ternary: {
      main: "#eeffee",
      dark: "#084",
    },
  },
  typography: {
    h2: {
      fontWeight: "bold"
    }
  }
});

export default theme;
