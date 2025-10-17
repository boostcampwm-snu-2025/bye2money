import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

export function Layout({ children }) {
  return (
    <>
      <CssBaseline />
      <Box 
        sx={{
          position: "relative",
          width: "1440px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
        <Box 
          sx={{ 
              position: "relative",
              display: "flex",
              justifyContent: "center", 
              width: "1440px", 
              height: "216px", 
              backgroundColor: "#73A4D0"}}></Box>
        {children}
      </Box>
    </>
  );
}

