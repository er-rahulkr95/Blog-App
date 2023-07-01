import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Lato"
  },
  palette: {
    primary: {
      light: "#ebe4ff",
      main: "#673de6",
      dark: "#5025d1",
      contrastText: "#fff",
    },
  },
});

export default theme;
