import React, { useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Aos from "aos";
import { useNavigate } from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';

const AppointmentBanner = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to right, rgb(36 56 170 / 80%), rgb(94 74 43 / 80%)), url("/Images/ddddddddd.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: { xs: 8, md: 12 },
        color: "white",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box data-aos="zoom-in">
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
          >
            Join the Movement
          </Typography>
        </Box>
        <Box data-aos="zoom-in">
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.9)",
              mb: 2,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            }}
          >
            UhuruCare is more than just a health plan; it’s a promise. A promise
            that healthcare should be accessible, fair, and built for you.
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            color: "rgba(255,255,255,0.95)",
            mb: 1,
            fontWeight: 500,
          }}
        >
          🚀14 Koi Street, Accra, Ghana
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: "rgba(255,255,255,0.95)",
            mb: 4,
            fontWeight: 500,
          }}
        >
          📩 Email :
          <a
            href="mailto:info@uhurucare.com"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            info@uhurucare.com
          </a>{" "}<br />

        </Typography>
        <Box sx={{ mt: -2 }}>

          <Typography variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.95)",
              fontWeight: 500,
            }}>Primary Line (International & Local Inquiries)

          </Typography>
          <Typography>+233 0596993440</Typography>
          <Typography variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.95)",
              fontWeight: 500,
            }}>


          </Typography>
          <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.95)",
              fontWeight: 500,
            }}>UhuruCare Ghana – Office Lines

          </Typography>
          <Typography>+233 0552335601</Typography>
          <Typography>+233 0549833833</Typography>
          <Typography variant="subtitle1"
            sx={{
              color: "rgba(255,255,255,0.95)",
              fontWeight: 500,
            }}>(For customer service and administrative support)


          </Typography>
          </Box>

        </Box>

        <Box data-aos="fade-up" data-aos-duration="3000">
          <Button
            variant="outlined"
            onClick={() => navigate("/contact")}
            size="large"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              marginTop:"10px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "#fff",
              },
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AppointmentBanner;
