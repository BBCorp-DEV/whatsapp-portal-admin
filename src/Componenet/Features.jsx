import React, { useEffect } from "react";
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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import { COLORS } from "../lib/Theme";
import Aos from "aos";
import Typewriter from "typewriter-effect";

const features = [
  "Powerful online protection.",
  "Internet without borders.",
  "Supercharged VPN",
  "No specific time limits.",
];

const Features = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Box
      sx={{ py: 10, px: { xs: 2, md: 6 }, background: "#FFFFFF" }}
      className="main"
    >
      <Container disableGutters maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
          sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
        >
          Overview of UhuruCare
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ maxWidth: "650px", mx: "auto", mb: { xs: 4, md: 6 } }}
        >
          Our journey began with a simple yet powerful mission: to redefine
          health insurance in Ghana by making it more inclusive, transparent,
          and accessible.
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
            <Box display="flex" justifyContent="center" data-aos="zoom-in">
              <img
                src="/africanDoc.png"
                alt=""
                style={{
                  width: "80%",
                  height: "40%",
                  marginTop: window.innerWidth <= 768 ? "0" : "-4rem",
                }}
              />
              {/* <Avatar
                sx={{
                  width: { xs: 340, sm: 400, md: 620 },
                  height: { xs: 340, sm: 400, md: 500 },
                  bgcolor: "transparent",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
                }}
                variant="square"
                src="/Images/safdfd.png"
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
              <Box
                component="span"
                fontWeight="bold"
                display="inline"
                sx={{ color: "#000", fontSize: "20px" }}
              >
                <Typewriter
                  options={{
                    strings: [
                      "✧ Led by Doctors. Built for You.",
                      "✧ Compassionate Care, Every Step of the Way.",
                      "✧ Advanced Technology. Personalized Treatment.",
                      "✧ Trusted by Families. Backed by Experts.",
                      "✧ Your Health. Our Priority.",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </Box>
              <Box
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="500"
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{
                    width: { xs: "100%", sm: "100%" },
                    mt: 2,
                    textAlign: "justify",
                  }}
                >
                  UhuruCare is Ghana’s first physician-led health insurer —
                  created by doctors who understand what truly matters in
                  healthcare. We offer affordable, reliable coverage designed
                  with real patients and families in mind. Whether you're in
                  Ghana or supporting loved ones from abroad, UhuruCare brings
                  care home.
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                component="span"
                fontWeight="bold"
                display="inline"
                sx={{ color: "#000", fontSize: "20px" }}
              >
                <Typewriter
                  options={{
                    strings: [
                      "✧ Healthcare with Freedom, Dignity, and Access for All.",
                      "✧ Empowering Every Life with Accessible Healthcare.",
                      "✧ Dignified Care. Everywhere. For Everyone.",
                      "✧ Breaking Barriers to Quality Healthcare.",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </Box>
              <Box
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="500"
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{
                    width: { xs: "100%", sm: "100%" },
                    mt: 2,
                    textAlign: "justify",
                  }}
                >
                  At UhuruCare, we believe that health is freedom—the freedom to
                  live without fear of financial burdens when seeking medical
                  care, the freedom to choose quality healthcare, and the
                  freedom to thrive.
                </Typography>
                <Typography
                  variant="body1"
                  // align="center"
                  color="text.secondary"
                  sx={{ maxWidth: "650px", mx: "auto", mb: { xs: 4, md: 6 } }}
                >
                  {/* Our journey began with a simple yet powerful mission:&nbsp; */}
                  {/* <Box component="span" fontWeight="bold">
                    to redefine health insurance in Ghana by making it more
                    inclusive, transparent, and accessible.
                  </Box> */}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                component="span"
                fontWeight="bold"
                display="inline"
                sx={{ color: "#000", fontSize: "20px" }}
              >
                <Typewriter
                  options={{
                    strings: [
                      "✧ A Vision Rooted in Change",
                      "✧ Empowering Every Life with Accessible Healthcare.",
                      "✧ Dignified Care. Everywhere. For Everyone.",
                      "✧ Breaking Barriers to Quality Healthcare.",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </Box>
              <Box
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="500"
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{
                    width: { xs: "100%", sm: "100%" },
                    mt: 2,
                    textAlign: "justify",
                  }}
                >
                  For too long, quality healthcare has been out of reach for
                  many. High costs, complex processes, and lack of trust in
                  insurance systems have left individuals and families without
                  adequate coverage. We saw the gaps, the struggles, and the
                  need for a solution that puts people first.
                </Typography>
                <Typography
                  variant="body1"
                  // align="center"
                  color="text.secondary"
                  sx={{ maxWidth: "650px", mx: "auto", mb: { xs: 4, md: 6 } }}
                >
                  UhuruCare was born out of the vision to create a health
                  insurance system that is simple, fair, and built for the
                  people it serves. &nbsp;
                  <Box component="span" fontWeight="bold">
                    With a name inspired by “Uhuru”—meaning freedom—our mission
                    is clear: to provide affordable and reliable healthcare
                    coverage while empowering individuals with control over
                    their well-being.
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
