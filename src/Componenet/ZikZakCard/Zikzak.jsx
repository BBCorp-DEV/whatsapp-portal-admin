import { Box, Typography, Avatar } from "@mui/material";
import Aos from "aos";
import { useEffect } from "react";

const steps = [
  {
    title: "Enroll Online",
    description:
      "Pick your plan,Fill out a simple form,Pay securely with Mobile Money, Card, or Bank✅ Get instant confirmation",
    image: "/africanDoc.png",
  },
  {
    title: "Receive Your Digital ID",
    description:
      "Your personalized UhuruCare ID is issued immediately Download to your phone or print it easily This is your access pass to care",
    image: "/bothIm.png",
  },
  {
    title: "Visit Our Partner Hospitals",
    description:
      "Show your ID at the hospital receptionNo upfront payments (up to your plan limits)Your eligibility is verified instantly",
    image: "/ladyAf copy.png",
  },
  {
    title: "Enjoy Healthcare with Freedom",
    description:
      "Reliable, affordable care you can trust Full transparency at every step Led by doctors, built for families like yours",
    image: "/childAf.png",
  },
];

export default function Zikzak() {

  useEffect(() => {
    Aos.init({
      duration: 1000, // Animation duration (you can tweak this)
      // once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
        py: 8,
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h4" textAlign="center" mb={6} fontWeight="bold">
        How UhuruCare Works
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          position: "relative",
          pb: 6,
          "&::before": {
            content: '""',
            position: "absolute",
            top: { xs: 0, md: "60px" },
            left: { xs: "50%", md: "5%" },
            transform: { xs: "translateX(-50%)", md: "none" },
            width: { xs: "2px", md: "90%" },
            height: { xs: "100%", md: "40px" },
            backgroundImage: {
              xs: "none", // Hide the zigzag line on small devices
              md: `url("data:image/svg+xml,%3Csvg width='100%' height='40' viewBox='0 0 100 40' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='0,40 10,0 20,40 30,0 40,40 50,0 60,40 70,0 80,40 90,0 100,40' fill='none' stroke='%230077CC' stroke-width='2' stroke-dasharray='5,5' /%3E%3C/svg%3E")`,
            },
            backgroundRepeat: "repeat-y, repeat-x",
            backgroundSize: { xs: "2px 10px", md: "auto 40px" },
            zIndex: 0,
          },
        }}
      >
        {steps.map((step, index) => (
  <Box
    key={index}
    data-aos="fade-up" // 👈 Add this line for animation
    data-aos-delay={index * 200} // 👈 Add staggered delay per step
    sx={{
      textAlign: "center",
      position: "relative",
      zIndex: 1,
      mb: { xs: 6, md: 0 },
    }}
  >
    <Avatar
      src={step.image}
      alt={step.title}
      sx={{
        width: 150,
        height: 150,
        mx: "auto",
        mb: 2,
        border: "5px solid white",
        boxShadow: 3,
        objectFit: "cover",
      }}
    />
    <Typography variant="h6" fontWeight="bold">
      {step.title}
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      mt={1}
      maxWidth="250px"
      mx="auto"
    >
      {step.description}
    </Typography>
  </Box>
))}

        {/* {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              mb: { xs: 6, md: 0 },
            }}
          >
            <Avatar
              src={step.image}
              alt={step.title}
              sx={{
                width: 150,
                height: 150,
                mx: "auto",
                mb: 2,
                border: "5px solid white",
                boxShadow: 3,
                objectFit: "cover", // Ensures image is not cropped
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              {step.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mt={1}
              maxWidth="250px"
              mx="auto"
            >
              {step.description}
            </Typography>
          </Box>
        ))} */}
      </Box>
    </Box>
  );
}
