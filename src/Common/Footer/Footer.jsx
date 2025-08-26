import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#003366", py: 6, px: { xs: 2, md: 10 } }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" mb={2}>
            <Box
              component="img"
              src="Images/navbarLog11.png" // Replace with your logo path
              alt="UhuruCare Logo"
              sx={{ width: 60, height: 60, mr: 1 }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              style={{ color: "#fff" }}
            >
              UhuruCare
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={2}
            style={{ color: "#fff" }}
          >
            Join our affordable private health insurance plans designed for{" "}
            <br />
            Ghanaians. Experience freedom, empowerment, and community well-being
            today.
          </Typography>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <IconButton
              href="https://www.facebook.com/people/UhuruCare/61572669940448/?name=xhp_nt__fb__action__open_user"
              target="_blank"
              sx={{ background: "#fff", width: "40px", height: "40px" }}
            >
              <FaFacebookF style={{ color: "#03A7E5" }} />
            </IconButton>

            <IconButton
              href="https://www.instagram.com/uhurucare_?igsh=MXA1YmxneWM3b2I4"
              target="_blank"
              sx={{ background: "#fff", width: "40px", height: "40px" }}
            >
              <Instagram fontSize="small" sx={{ color: "#03A7E5" }} />
            </IconButton>
            <IconButton
              href="https://wa.me/420775151097"
              target="_blank"
              sx={{ background: "#fff", width: "40px", height: "40px" }}
            >
              <WhatsAppIcon fontSize="small" sx={{ color: "#03A7E5" }} />
            </IconButton>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            mt={2}
            display="block"
            style={{ color: "#fff" }}
          >
            ©2025 UhuruCare
          </Typography>
        </Grid>

        {/* Engage Section */}
        <Grid item xs={6} md={3}>
          {/* <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Engage
          </Typography> */}
          {[
            "Home",
            "About Us",
            // "Member Portal",
            "Plans",
            "Provider Portal",
          ]?.map((item) => (
            <MuiLink
              href="/"
              underline="none"
              display="block"
              color="#fff"
              mb={0.9}
              key={item}
            >
              {item}
            </MuiLink>
          ))}
        </Grid>

        {/* Earn Money Section */}
        <Grid item xs={6} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <Typography
              style={{ cursor: "pointer" }}
              color="#fff"
              onClick={() => navigate("/mission")}
            >
              Our Story
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              color="#fff"
              onClick={() => navigate("/values")}
            >
              Leadership
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              color="#fff"
              onClick={() => navigate("/leader")}
            >
              Partnerships & Affiliations
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              color="#fff"
              onClick={() => navigate("/teams")}
            >
              Corporate Social Responsibility
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              color="#fff"
              onClick={() => navigate("/policy")}
            >
              Privacy Policy
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              color="#fff"
              onClick={() => navigate("/terms")}
            >
              Terms and Conditions
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/faqs")}
              color="#fff"
            >
              FAQS
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <Typography
              style={{ cursor: "pointer" }}
              color="#fff"
              // onClick={() => navigate("/mission")}
            >
              Contact Us
            </Typography>
            <Typography
              // style={{ cursor: "pointer" }}
              color="#fff"
            // onClick={() => navigate("/values")}
            >
              +233 0596993440
            </Typography>

            <Typography
              // style={{ cursor: "pointer" }}
              // onClick={() => navigate("/faqs")}
              color="#fff"
            >
              +233 0552335601
            </Typography>
            <Typography
              // style={{ cursor: "pointer" }}
              // onClick={() => navigate("/faqs")}
              color="#fff"
            >
              +233 0549833833
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <Typography
              // style={{ cursor: "pointer" }}
              color="#fff"
              // onClick={() => navigate("/mission")}
            >
           Address
            </Typography>
            <Typography
              // style={{ cursor: "pointer" }}
              // onClick={() => navigate("/faqs")}
              color="#fff"
            >
          14 Koi Street, Accra, Ghana
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
