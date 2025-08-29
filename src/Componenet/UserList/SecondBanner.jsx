import React from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CountUp from "react-countup";

const SecondBanner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 6, md: 10 },
        backgroundColor: "#f5f9fc",
        backgroundImage: `linear-gradient(to right, rgba(36, 56, 170, 0.8), rgba(94, 74, 43, 0.8)), url('/Images/ddddddddd.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
        height: { xs: "auto", md: "65vh" },
        overflow:"hidden",
      }}
    >
      <Container maxWidth="xl">
        <Grid container alignItems="center">
          {/* Right Content */}
          <Grid item xs={12} md={6} sx={{ px: 2 }}>
            <Box
              mt={5}
              sx={{
                backgroundColor: "rgba(255,255,255,0.85)",
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h3" fontWeight="bold" gutterBottom sx={{fontSize:{xs:"2rem", md:"3rem"}}}>
                Empowering <br />
                <span style={{ color: "#1976d2" }}>Health Solutions</span>
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                At UhuruCare, we provide affordable, inclusive, and high-quality
                <br />
                private health insurance tailored for Ghanaians, focusing on
                community
                <br />
                well-being and individual empowerment.
              </Typography>

              {/* Counter Section */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    {/* <LocalHospitalIcon color="primary" sx={{ fontSize: 40 }} /> */}
                    <Typography variant="h4" fontWeight="bold">
                      <CountUp end={250} duration={2} />+
                    </Typography>
                    <Typography variant="body2">Doctors</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    {/* <MedicalServicesIcon color="primary" sx={{ fontSize: 40 }} /> */}
                    <Typography variant="h4" fontWeight="bold">
                      <CountUp end={180} duration={2} />+
                    </Typography>
                    <Typography variant="body2">Nurses</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="center">
                    {/* <LocationCityIcon color="primary" sx={{ fontSize: 40 }} /> */}
                    <Typography variant="h4" fontWeight="bold">
                      <CountUp end={35} duration={2} />+
                    </Typography>
                    <Typography variant="body2">Branches</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* <Button variant="contained" color="primary" size="large">
        Get Started
      </Button> */}
    </Box>
  );
};

export default SecondBanner;