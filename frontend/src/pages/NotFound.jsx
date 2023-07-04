import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" color="primary">
          OOPs! NotFound
        </Typography>
      </Box>
      <Footer />
    </>
  );
};

export default NotFound;
