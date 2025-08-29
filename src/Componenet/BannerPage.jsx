import React, { useContext, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import 'aos/dist/aos.css';
import Typewriter from 'typewriter-effect';
import { AuthContext } from "../Auth/context/Auth";

const BannerPage = () => {
  const navigate = useNavigate();
  const {userLoggedIn} = useContext(AuthContext); // Assuming you provide this from context

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (userLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/health");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0077cc",
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
        py: { xs: 4, sm: 6, md: 8 },
        borderRadius: { xs: "0", md: "10px" },
      }}
    >
      <Grid
        container
        spacing={10}
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth="1200px"
      >
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Box
            textAlign={{ xs: "center", md: "left" }}
            data-aos="fade-right"
          >
            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                fontSize: { xs: "32px", sm: "40px", md: "50px", lg: "48px" },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Empowering Health <br /> Solutions
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#ffffffb8",
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                mb: 4,
              }}
            >
              Affordable, Inclusive Health Insurance&nbsp;
              <Box
                component="span"
                fontWeight="bold"
                display="inline"
                sx={{ color: "#fff" }}
              >
                <Typewriter
                  options={{
                    strings: ['for Families.', 'for Ghanaians.', 'that Cares.', 'with Purpose.'],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </Box>
            </Typography>

            <Box display="flex" justifyContent={{ xs: "center", md: "flex-start" }}>
              <Button
                variant="outlined"
                onClick={handleClick}
                sx={{
                  textTransform: "none",
                  px: 5,
                  py: 1.5,
                  borderRadius: "8px",
                  fontWeight: "bold",
                  color: "#fff",
                  borderColor: "#fff",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#005fa3",
                    borderColor: "#fff",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6} data-aos="fade-left">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="img"
              src="/Images/banner.jpg"
              alt="Health workers jumping"
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "580px" },
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BannerPage;
