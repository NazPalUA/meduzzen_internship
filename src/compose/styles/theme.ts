"use client"
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "2rem",
          maxWidth: "800px",
          margin: "2rem auto",
          boxShadow: "var(--mui-shadows-5)",
          borderRadius: "1rem",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        secondary: {
          margin: 0,
        },
      },
    },
  },
})

export default theme
