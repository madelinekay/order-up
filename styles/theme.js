import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#303D74",
      dark: "#06113F",
      light: "#FFFFFF",
    },
    secondary: {
      main: "#cc0000",
      light: "#F0F7ED",
      dark: "#314827"
    },
    ternary: {
      main: "#848BA8",
      dark: "#e0e0e0"
    }
  },
  typography: {
    h2: {
      fontWeight: "bold"
    }
  }
});


export default theme;
