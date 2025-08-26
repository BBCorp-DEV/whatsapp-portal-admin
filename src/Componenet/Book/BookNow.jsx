// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Container,
//   Button,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const BookNow = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box sx={{ py: 10, px: { xs: 2, md: 6 }, bgcolor: "#f9f9f9" }}>
//       <Container disableGutters maxWidth="lg">
//         <Typography
//           variant="h4"
//           align="center"
//           fontWeight={700}
//           gutterBottom
//           sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
//         >
//           Get Your Free Annual Physical From Home
//         </Typography>

//         <Typography
//           variant="body1"
//           align="center"
//           color="text.secondary"
//           sx={{ maxWidth: 650, mx: "auto", mb: { xs: 4, md: 6 } }}
//         >
//           Uhurucare Members now get one free virtual check-up each year with UhuruMed
//         </Typography>

//         <Grid container spacing={6} alignItems="center">
//           {/* Text Side */}
//           <Grid item xs={12} md={6}>
//             <Box>
//               <Typography
//                 variant="h5"
//                 fontWeight="bold"
//                 gutterBottom
//                 sx={{ fontSize: { xs: "20px", sm: "24px" } }}
//               >
//                 Virtual Annual Physical
//               </Typography>

//               <Typography
//                 variant="body1"
//                 color="text.secondary"
//                 sx={{ mt: 2, textAlign: "justify" }}
//               >
//                 Enjoy a full check-up via video with our licensed physicians - included in your plan.
//               </Typography>

//               <Box mt={4}>
//                 <Button
//                   variant="contained"
//                   onClick={() => window.open("https://uhurumed.com", "_blank")}
//                   sx={{
//                     backgroundColor: "#0077cc",
//                     textTransform: "none",
//                     px: 5,
//                     py: 1.5,
//                     borderRadius: "8px",
//                     fontWeight: "bold",
//                     color: "#fff",
//                     fontSize: "16px",
//                     boxShadow: "0px 8px 20px rgba(0, 119, 204, 0.3)",
//                     "&:hover": {
//                       backgroundColor: "#005fa3",
//                       boxShadow: "0px 12px 26px rgba(0, 119, 204, 0.4)",
//                     },
//                   }}
//                 >
//                   Book Now
//                 </Button>
//               </Box>
//             </Box>
//           </Grid>

//           {/* Image Side */}
//           <Grid item xs={12} md={6}>
//             <Box
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               sx={{
//                 width: "100%",
//                 textAlign: "center",
//               }}
//             >
//               <Box
//                 component="img"
//                 src="/Images/bookDoc.png"
//                 alt="Virtual Doctor"
//                 sx={{
//                   width: "100%",
//                   maxWidth: 420,
//                   height: "100%",
//                   maxHeight: 400,
//                   // borderRadius: "16px",
//                   // boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
//                 }}
//               />
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default BookNow;

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
  Button
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import { COLORS } from "../../lib/Theme";

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
          Get Your Free Annual Physical From Home

        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ maxWidth: '650px', mx: 'auto', mb: { xs: 4, md: 6 } }}
        >
          Uhurucare Members now get one free virtual check-up each year with UhuruMed
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
              <img src="/Images/woman.png" style={{ width: "100%",borderRadius:"25px",height:"400px",objectFit:"fill" }} />
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
                    md: "46px", // larger on medium and up
                  },
                  width: { xs: "100%", sm: "100%", color: COLORS.PRIMARY },
                }}
              >
                Virtual Annual<br/> Physical

              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ width: { xs: "100%", sm: "100%" }, mt: 1, textAlign: "justify" }}
              >
                Enjoy a full check-up via video with our licensed physicians - included in your plan.

              </Typography>


            </Box>
            <Stack spacing={3}>


              <Box mt={4}>
                <Button
                  variant="contained"
                  onClick={() => window.open("https://uhurumed.com", "_blank")}
                  sx={{
                    backgroundColor: "#0077cc",
                    textTransform: "none",
                    px: 5,
                    py: 1,
                    borderRadius: "8px",
                    fontWeight: "bold",
                    color: "#fff",
                    fontSize: "16px",
                    boxShadow: "0px 8px 20px rgba(0, 119, 204, 0.3)",
                    "&:hover": {
                      backgroundColor: "#005fa3",
                      boxShadow: "0px 12px 26px rgba(0, 119, 204, 0.4)",
                    },
                  }}
                >
                  Book Now
                </Button>
              </Box>


            </Stack>

          </Grid>
        </Grid>
      </Container>

    </Box>
  );
};

export default NewFuture;

