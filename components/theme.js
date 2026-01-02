"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
    },
    button: {
      fontFamily: '"Inter", sans-serif',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: '"Inter", sans-serif',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
        },
      },
    },
  },
});

export default theme;

