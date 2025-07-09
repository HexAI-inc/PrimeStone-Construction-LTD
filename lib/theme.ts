import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#003366",
      light: "#004080",
      dark: "#002244",
    },
    secondary: {
      main: "#E85D0E",
      light: "#FF8C42",
      dark: "#D14A00",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1.1rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
          padding: "12px 24px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
  },
})

export default theme
