import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Avatar,
  useTheme,
  useMediaQuery,
  Container,
  Stack,
  Collapse,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
// import { COLORS } from "../lib/Theme";

const features = [
  "Powerful online protection.",
  "Internet without borders.",
  "Supercharged VPN",
  "No specific time limits.",
];

const MissionTitle = () => {
  const theme = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const goals = [
    {
      title: "Freedom & Empowerment ",
      description:
        "We believe healthcare is a right, not a privilege. Our goal is to give individuals the freedom to access quality healthcare without financial barriers, empowering them to live healthier, fuller lives.",
    },
    {
      title: "Integrity & Transparency ",
      description:
        "Trust is the foundation of our relationship with our members and partners. We uphold the highest standards of integrity, ensuring clear communication, fair policies, and ethical business practices at all times.",
    },
    {
      title: " Excellence in Care ",
      description:
        "We strive for excellence by continuously improving our services, leveraging technology, and working with top-tier healthcare providers to ensure our members receive the best possible care.",
    },
    {
      title: "  Innovation & Accessibility ",
      description:
        "We embrace innovation to create seamless, affordable, and inclusive healthcare solutions. From digital health verification to telemedicine, we use technology to make healthcare more accessible for all.",
    },
    {
      title: "Community & Compassion",
      description:
        "Our commitment extends beyond insurance—we are here to build a healthier, more connected community. Through our Charitable Premium Assistance Program, we support those in need, ensuring that financial limitations do not stand in the way of care.",
    },
    {
      title: "Partnership & Collaboration",
      description:
        "We believe in the power of collaboration. By partnering with hospitals, healthcare providers, businesses, and community organizations, we create a stronger, more efficient healthcare ecosystem.",
    },
    {
      title: "Customer-Centric Approach",
      description:
        "Our members are at the heart of everything we do. We prioritize personalized service, responsive support, and an easy-to-navigate healthcare experience to ensure peace of mind.At UhuruCare, we are more than just a health insurance provider—we are a movement dedicated to freedom, well-being, and health equity. Together, we can redefine the future of healthcare in Ghana and beyond.",
    },
  ];

  return (
    <Box sx={{ py: 10, px: { xs: 2, md: 6 } }} className="main">
      <Container disableGutters maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          Our Values | UhuruCare
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ maxWidth: "650px", mx: "auto", mb: { xs: 4, md: 6 } }}
        >
          At UhuruCare, our values define who we are and guide our mission to
          provide accessible, reliable, and empowering healthcare solutions for
          individuals and families. We are committed to fostering trust,
          excellence, and inclusivity in everything we do.
        </Typography>
        <Grid
          container
          spacing={12}
          alignItems="center"
          // direction={isSmall ? "column-reverse" : "row"}
          justifyContent="space-between"
        >
          <Grid
            item
            size={{ xs: 12, md: 6 }}
            // sx={{ p: { xs: 2, md: 4 } }}
          >
            <Box display="flex" justifyContent="center">
              <img
                src="/childAf.png"
                style={{
                  width: isSmall ? "100%" : "500px",
                  height: isSmall ? "100%" : "500px",
                }}
              />
              {/* <Avatar
                sx={{
                  width: { xs: 340, sm: 400, md: 540 },
                  height: { xs: 340, sm: 400, md: 400 },
                  bgcolor: "transparent",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                }}
                variant="square"
                src="/Images/insura.jpg"
                alt="Illustration"
              /> */}
            </Box>
          </Grid>

          <Grid
            item
            size={{ xs: 12, md: 6 }}
            // sx={{ p: { xs: 2, md: 4 } }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "20px", // smaller on extra-small devices
                    sm: "25px", // default for small and up
                  },
                  width: { xs: "100%", sm: "100%" },
                }}
              >
                Beyond Values: A Movement for Health Equity
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{
                  width: { xs: "100%", sm: "100%" },
                  mt: 4,
                  textAlign: "justify",
                }}
              >
                UhuruCare is more than just a health insurance provider. We are
                a movement for health equity, committed to:
              </Typography>
            </Box>
            <Stack spacing={3}>
              {goals.map((goal, index) => (
                <Box
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Box display="flex" alignItems="center">
                    <CheckCircleIcon sx={{ color: "#66D9EF", mr: 1 }} />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#444",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: { xs: "16px", md: "18px" },
                      }}
                    >
                      {goal.title}
                    </Typography>
                  </Box>

                  <Collapse in={hoveredIndex === index}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        mt: 1,
                        ml: 4,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      {goal.description}
                    </Typography>
                  </Collapse>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionTitle;
