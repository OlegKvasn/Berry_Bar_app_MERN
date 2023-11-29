import { createTheme, colors } from "@mui/material";

export const theme = createTheme({
  status: {
    danger: "#e53e9e",
  },
  palette: {
    primary: {
      main: "#88b06a",
    },
    secondary: {
      main: colors.orange[500],
    },
    // adding new color with palette color
    neutral: {
      main: colors.grey[500],
      darker: colors.grey[700],
    },
  },
});
