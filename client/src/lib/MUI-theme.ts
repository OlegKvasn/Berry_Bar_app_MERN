import { createTheme, colors } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

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
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "var(--TextField-brandBorderColor)",
          "--TextField-brandBorderColor": "#525252",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#6c8d53",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: `18px`,
    //     },
    //   },
    // },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
          borderWidth: "2px",
        },
        root: {
          //backgroundColor: "#cccccc",
          "& > fieldset > legend": {
            //fontSize: `18px`,
          },
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
            //backgroundColor: "#ebebeb",
          },
        },
      },
    },
  },
});
