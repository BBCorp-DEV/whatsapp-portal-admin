import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
const NoDataFound = ({
  message = "Oops! We couldn't find what you're looking for.",
  onRetry,
  imageSrc = "https://cdn-icons-png.flaticon.com/512/7486/7486431.png", // Default image URL if none is passed
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    px={2}
    textAlign="center"
    bgcolor={theme.palette.background.default}
  >
    <SentimentDissatisfiedIcon
      color="disabled"
      sx={{ fontSize: 80, mb: 2 }}
    />

      <Typography variant="h5" color="textSecondary" gutterBottom>
        {message}
      </Typography>

      <Typography variant="body1" color="textSecondary" mb={3}>
        Let’s try something else or go back to the homepage.
      </Typography>

      {onRetry && (
        <Button variant="contained" onClick={onRetry} sx={{ mb: 2 }}>
          Try Again
        </Button>
      )}

      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        sx={{
          fontSize: "15px",
          textTransform: "capitalize",
          fontWeight: "500",
          borderRadius: "10px",
          border: "1px solid #03A7E5",
          color: "#03A7E5",
          "&:hover": {
            backgroundColor: "#0077CC",
            boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
            color: "#fff",
          },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NoDataFound;
