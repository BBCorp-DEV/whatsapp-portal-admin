import { Box, Typography } from "@mui/material";
import React from "react";
import SliderSection from "../Common/SliderSection";

export const Customers = () => {
  return (
    <Box mt={8} sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          width: "100%",
          margin: "auto",
          maxWidth: { xs: "90%", sm: "50%" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "rubik",
            fontSize: "32px",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Customer Feedback
        </Typography>
        <Typography
          sx={{
            fontFamily: "rubik",
            fontSize: "18px",
            fontWeight: 300,
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          These are the stories of our customers who have joined us with great
          pleasure when using this crazy feature.
        </Typography>
      </Box>
      <SliderSection />
    </Box>
  );
};
