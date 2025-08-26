import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FemaleIcon from "@mui/icons-material/Female";
import FaceIcon from "@mui/icons-material/Face";

const services = [
  {
    icon: <FavoriteIcon fontSize="large" />,
    title: "Transparent",
    sub: "Clear, honest policies with no hidden fees.",
  },
  {
    icon: <PsychologyIcon fontSize="large" />,
    title: "Reliable",
    sub: "A network of trusted hospitals, clinics, and specialists.",
  },
  {
    icon: <AccessibilityNewIcon fontSize="large" />,
    title: "Inclusive",
    sub: "Coverage designed for individuals, families, and businesses.",
  },
  {
    icon: <FemaleIcon fontSize="large" />,
    title: "Customer-Focused",
    sub: "A seamless experience with digital tools, easy enrollment.",
  },
];

const Services = () => {
  const theme = useTheme();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        py: { xs: 1, md: 10 },
        overflow:"hidden"
      }}
    >
      <Container maxWidth="xxl">
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          Empowering the Future of Healthcare in Ghana
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ maxWidth: "650px", mx: "auto", mb: { xs: 4, md: 6 } }}
        >
          UhuruCare is for the people. We are committed to transforming the
          healthcare landscape by building a system that is:
        </Typography>

        <Grid container spacing={4} justifyContent={"center"}>
          {services.map((service, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              key={service.title}
              data-aos="fade-left"
              data-aos-delay={index * 1000}
              sx={{ display: "flex" }}
            >
              <Card
                elevation={1}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  maxWidth: {
                    xs: "270px",
                    sm: "220px",
                  },
                  transition: "all 0.3s",
                  minHeight: "220px",
                  color: "text.primary",
                  backgroundColor: "background.paper",
                  "&:hover": {
                    backgroundColor: "#003366",
                    color: "#fff",
                    boxShadow: theme.shadows[6],
                    transform: "translateY(-4px)",
                    "& .MuiSvgIcon-root": {
                      color: "#fff",
                    },
                    "& .MuiTypography-root": {
                      color: "#fff",
                    },
                    "& .MuiButton-root": {
                      color: "#fff",
                    },
                  },
                }}
                // sx={{
                //     flex: 1,
                //     display: 'flex',
                //     flexDirection: 'column',
                //     justifyContent: 'space-between',
                //     textAlign: 'center',
                //     p: 3,
                //     borderRadius: 3,
                //     maxWidth: {
                //         xs: '270px',  // for small screens
                //         sm: '220px',  // from sm and up
                //       },
                //     transition: 'all 0.3s',
                //     minHeight: '220px',
                //     '&:hover': {
                //         boxShadow: theme.shadows[6],
                //         transform: 'translateY(-4px)',
                //     },
                // }}
              >
                <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                  {service.icon}
                </Box>
                <Box
                  sx={{ flexGrow: 1 }}
                  data-aos="fade-up"
                  data-aos-duration="3000"
                >
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.sub}
                  </Typography>
                </Box>
                <Box data-aos="fade-down">
                  <Button
                    size="small"
                    variant="text"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Contact Us →
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={6} data-aos="fade-right" textAlign="center">
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: "650px", mx: "auto", mb: { xs: 4, md: 6 } }}
          >
            From everyday check-ups to emergency care,&nbsp;
            <Box component="span" fontWeight="bold">
              we are here to ensure that you get the healthcare you deserve—when
              you need it, where you need it.
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
