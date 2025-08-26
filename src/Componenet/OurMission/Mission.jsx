import React from "react";
import { Box, Card, Typography, Button, Grid, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Checklist";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Doctor from "../Doctor";
import StrategyIcon from "@mui/icons-material/SportsKabaddi"; // Closest icon for "strategy"
import { useNavigate } from "react-router-dom";
import JoinInnerOutlinedIcon from '@mui/icons-material/JoinInnerOutlined';
const Mission = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);
  return (
    <Box>
      <Box sx={{ backgroundColor: "#0077cc", padding: "12px 46px" }}>
        <Typography
          sx={{
            padding: "0px 24px",
            fontSize: "36px",
            fontWeight: "500",
            fontFamily: "rubik",
            color: "#fff",
          }}
        >
          Our Story
        </Typography>
      </Box>
      <Doctor />
      <Box
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow:"hidden",
        }}
      >
        <Grid container spacing={4}>
          {/* Left Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{ px: 8, py: 4, borderRadius: 4, boxShadow: 1 }}
              data-aos="fade-left"
              data-aos-delay={1 * 100}

            >
              <Box sx={{ mb: 2 }}>
                <CheckIcon sx={{ fontSize: 40, color: "#0077cc" }} />
              </Box>

              <Typography variant="h5" fontWeight={600} sx={{ mt: 1, mb: 2 }}>
                Mission Statement
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, width: {xs:"auto",md:"300px"}, color: "text.secondary" }}
              >
                To provide accessible, high-quality, and affordable health
                insurance solutions tailored to the needs of individuals and the
                African diaspora, promoting freedom, empowerment, and
                well-being.
              </Typography>
              {/* <Button
                variant="outlined"
                onClick={() => navigate("/signin")}
                sx={{
                  color: "#0077cc",
                  textTransform: "capitalize",
                  border: "1px solid #0077cc",
                }}
              >
                Get Started
              </Button> */}
            </Card>
          </Grid>

          {/* Right Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{ px: 8, py: 4, borderRadius: 4, boxShadow: 1 }}
              data-aos="fade-left"
              data-aos-delay={2 * 100}
            >
              <Box sx={{ mb: 2 }}>
                <StrategyIcon sx={{ fontSize: 40, color: "#0077cc" }} />
              </Box>
              <Typography variant="h5" fontWeight={600} sx={{ mt: 1, mb: 2 }}>
                Vision Statement
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, width: {xs:"auto",md:"300px"}, color: "text.secondary" }}
              >
                To become the leading health insurance provider in Africa,
                fostering a healthier and financially secure future for our
                communities through innovation, inclusivity, and
                customer-centric care.
              </Typography>
              {/* <Button
                variant="outlined"
                onClick={() => navigate("/signin")}
                sx={{
                  color: "#0077cc",
                  textTransform: "capitalize",
                  border: "1px solid #0077cc",
                }}
              >
                Get Started
              </Button> */}
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{ px: 8, py: 4, borderRadius: 4, boxShadow: 1 }}
              data-aos="fade-left"
              data-aos-delay={3 * 100}
            >
              <Box sx={{ mb: 2 }}>
                <JoinInnerOutlinedIcon sx={{ fontSize: 40, color: "#0077cc" }} />
              </Box>
              <Typography variant="h5" fontWeight={600} sx={{ mt: 1, mb: 2 }}>
                Our Values
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, width: {xs:"auto",md:"300px"}, color: "text.secondary" }}
              >
                At Uhurucare, our values define who we are and guide our mission
                to provide accessible, reliable,  and families. We are committed to
                fostering trust, excellence, and inclusivity in everything we
                do.
              </Typography>
              {/* <Button
                variant="outlined"
                onClick={() => navigate("/signin")}
                sx={{
                  color: "#0077cc",
                  textTransform: "capitalize",
                  border: "1px solid #0077cc",
                }}
              >
                Get Started
              </Button> */}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Mission;
