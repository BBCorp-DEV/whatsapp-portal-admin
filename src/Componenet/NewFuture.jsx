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
  Collapse
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import { COLORS } from "../lib/Theme";

const features = [
  "Powerful online protection.",
  "Internet without borders.",
  "Supercharged VPN",
  "No specific time limits.",
];

const NewFuture = () => {
  const theme = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));


  const goals = [
    {
      title: "For Individuals ",
      description: "Affordable options for students, freelancers, and singles."
    },
    {
      title: "For Families ",
      description: "Coverage for dependents, maternity, and pediatric care."
    },
    {
      title: "For Employers ",
      description: "Flexible plans to protect teams and businesses."
    },
   
  ];

  return (
    <Box
      sx={{ py: 10, px: { xs: 2, md: 6 } }}
      className="main"
    >
      <Container disableGutters maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          gutterBottom
          sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }}
        >
          Championing Health Equity for All

        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ maxWidth: '650px', mx: 'auto', mb: { xs: 4, md: 6 } }}
        >
          At UhuruCare, we’re not just offering coverage—we’re creating a movement. Our mission is to make quality healthcare accessible, inclusive, and dignified for every individual.

        </Typography>
        <Grid
          container
          spacing={12}
          alignItems="center"
          // direction={isSmall ? "column-reverse" : "row"}
          justifyContent="space-between"
        >
          <Grid item size={{ xs: 12, md: 6 }}
          // sx={{ p: { xs: 2, md: 4 } }}
          >
            <Box display="flex" justifyContent="center">
              <img src="/bothIm.png" style={{ width: "100%" }} />
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

          <Grid item size={{ xs: 12, md: 6 }}
            // sx={{ p: { xs: 2, md: 4 } }}
            alignItems={"center"} justifyContent={"center"}>
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
                  width: { xs: "100%", sm: "100%", color: COLORS.PRIMARY },
                }}
              >
                Beyond Insurance: A Movement for Health Equity

              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ width: { xs: "100%", sm: "100%" }, mt: 4, textAlign: "justify" }}
              >
                UhuruCare is more than just a health insurance provider. We are a movement for health equity, committed to:

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
                    <CheckCircleIcon sx={{ color: '#66D9EF', mr: 1 }} />
                    <Typography
                      variant="h6"
                      sx={{ color: '#444', cursor: 'pointer', fontWeight: '600', fontSize: { xs: '16px', md: '18px' } }}
                    >
                      {goal.title}
                    </Typography>
                  </Box>

                  <Collapse in={hoveredIndex === index}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        mt: 1,
                        ml: 4,
                        transition: 'opacity 0.3s ease',
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

export default NewFuture;
