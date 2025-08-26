import React from "react";
import { Box, Typography } from "@mui/material";
import "@fontsource/poppins"; // Elegant font
import "@fontsource/bebas-neue"; // Eye-catching font for heading

const ComingSoon = () => {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          backgroundImage:
            "url('https://img.freepik.com/free-photo/group-african-medical-students-college-standing-stairs_627829-345.jpg?t=st=1746683383~exp=1746686983~hmac=02c05d81de9faf35b7731de20945aafc9a325f761baafd519c793640f6a5d3e3&w=996')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Blur Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box sx={{ zIndex: 2, color: "#fff", maxWidth: 800 }}>
          <Box sx={{paddingBottom:"20px"}}>
            <img src="Images/navbarLog11.png" alt="logo" />
          </Box>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "80px",
              letterSpacing: "2px",
              mb: 2,
              // background: "linear-gradient(90deg, #00f, #fff)",
              // backgroundClip: "text",
              // WebkitBackgroundClip: "text",
              // color: "transparent",
              // WebkitTextFillColor: "transparent",
              textShadow: "0 0 10px rgba(0,0,0,0.3)",
              animation: "fadeInUp 1.5s ease-out",
              lineHeight: "77px",
              color: "#fff",
            }}
          >
            Coming Soon
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", md: "1.5rem" },
              animation: "fadeInUp 2s ease-out",
              animationDelay: "0.5s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            We’re working hard behind the scenes to bring you something amazing.
            Stay tuned!
          </Typography>
        </Box>
      </Box>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default ComingSoon;
