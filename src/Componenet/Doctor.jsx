import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css"; // ✅ Import AOS styles
import { AuthContext } from "../Auth/context/Auth";

const Doctor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMission = location.pathname === "/mission";
  const {userLoggedIn} = useContext(AuthContext); // Assuming you provide this from context

  useEffect(() => {
    Aos.init({ duration: 1000 });
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
      className="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isMission ? "#fdfbf9" : "#fff",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Left Images */}
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              component="img"
              src="/Images/human.png"
              alt="Health workers jumping"
              data-aos="zoom-in"
              sx={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "24px",
                mb: 2,
                height: { xs: "auto", md: "300px" },
                objectFit: "cover",
              }}
            />
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
              <Box
                component="img"
                src="/Images/human2.png"
                alt="Health workers"
                data-aos="zoom-in"
                data-aos-delay="100"
                sx={{
                  width: "45%",
                  maxWidth: "220px",
                  borderRadius: "24px",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
              <Box
                component="img"
                src="/Images/human3.png"
                alt="Health workers"
                data-aos="zoom-in"
                data-aos-delay="200"
                sx={{
                  width: "45%",
                  maxWidth: "220px",
                  borderRadius: "24px",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>

          {/* Right Content */}
          <Box
            sx={{
              textAlign: {
                xs: "center",
                sm: "start",
                md: "left",
              },
              width: {
                xs: "100%",
                md: "50%",
              },
              marginTop: {
                xs: "15px",
                md: "0px",
              },
            }}
          >
            <Typography
              variant="h2"
              mb={2}
              sx={{
                color: "#0f172a",
                fontSize: { xs: "26px", sm: "48px", md: "55px" },
                fontWeight: 700,
              }}
            >
              Our Story,  Mission, Vision, Values
              {/* <br /> */}
             
            </Typography>
            <Typography
              variant="body1"
              mb={4}
              sx={{
                color: "#64748b",
                fontSize: { xs: "16px", sm: "18px" },
              }}
            >
              We are committed to transforming healthcare access and equity
              across Ghana and beyond. Our mission is to make affordable and
              inclusive healthcare available to everyone, especially underserved
              communities. We envision a future where every individual can
              receive quality care, regardless of their background or income.
              Our values—compassion, integrity, and innovation—guide every step
              we take on this journey.
            </Typography>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "flex-start", sm: "start" }}
            >
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  backgroundColor: "#0077cc",
                  textTransform: "none",
                  marginTop: "1rem",
                  px: 6,
                  py: 1.5,
                  borderRadius: "8px",
                  fontWeight: "bold",
                  color: "#fff",
                  boxShadow: "0px 20px 30px rgba(57, 119, 212, 0.4)",
                  "&:hover": {
                    backgroundColor: "#0077cc",
                    boxShadow: "0px 24px 34px rgba(57, 119, 212, 0.4)",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Doctor;
