import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

export function Layout({ children }) {
  return (
    <>
      <CssBaseline />
      <Box 
        sx={{
          width: "1440px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
        {children}
      </Box>
    </>
  );
}

