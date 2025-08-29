import React from "react";
import { Box, Typography } from "@mui/material";

const images = [
  {
    src: "/insur1.png",
    title: "Affordable, Tiered Plans",
    desc: "Ensuring that individuals, families, and businesses can access coverage that fits their needs and budget.",
  },
  {
    src: "/insur8.png",
    title: "Seamless Care at the Point of Service",
    desc: "Removing administrative burdens by allowing hospitals to handle claims directly.",
  },
  {
    src: "/insur7.png",
    title: "Technology-Driven Innovation",
    desc: "Using blockchain-based verification for security, reducing fraud, and streamlining enrollment.",
  },
  {
    src: "/insur2.png",
    title: "Expanding Access to Care",
    desc: "Partnering with healthcare providers to offer comprehensive coverage, including telemedicine and specialist consultations.",
  },
];

const BeyoundInsurance = () => {
  return (
    <Box
    gap={4}
    sx={{
      width: "90%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto",
      flexDirection: "column",
      padding: "2rem 0px",
    }}
  >
    <Box>
      <Typography
        variant="h4"
        align="center"
        fontWeight={700}
        gutterBottom
        sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
      >
        Beyond Insurance: A Movement for Health Equity
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ maxWidth: "650px", mx: "auto", mb: { xs: 4, md: 6 } }}
      >
        UhuruCare is more than just a health insurance provider. We are a
        movement for health equity, committed to:
      </Typography>
    </Box>

    {/* Cards Container */}
    <Box
      sx={{
        display: "flex",
        gap: "30px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          position="relative"
          overflow="hidden"
          sx={{
            flex: {
              xs: "1 1 45%", // 2 cards per row at xs and sm
              sm: "1 1 45%",
              md: "1 1 22%", // 4 cards per row at md and up
            },
            maxWidth: {
              xs: "45%",
              md: "22%",
            },
            borderRadius: "10px",
            "&:hover .overlay": {
              opacity: 1,
            },
          }}
        >
          <img
            src={img.src}
            alt={img.title}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              borderRadius: "10px",
            }}
          />
          <Box
            className="overlay"
            position="absolute"
            bottom={0}
            top={0}
            left={0}
            width="100%"
            height="100%"
            bgcolor="rgba(0, 0, 0, 0.6)"
            color="#fff"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            alignItems="center"
            textAlign="center"
            px={2}
            borderRadius={"10px"}
            sx={{
              opacity: 0,
              transition: "opacity 0.4s ease",
              padding: 2,
              boxSizing: "border-box",
            }}
          >
            <Box sx={{ width: "100%", pb: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={1} sx={{fontSize:{xs:"1rem"}}}>
                {img.title}
              </Typography>
              <Typography variant="body2">{img.desc}</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
  );
};

export default BeyoundInsurance;
