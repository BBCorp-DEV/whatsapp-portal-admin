import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../Auth/ApiConfig";
import toast from "react-hot-toast";
import { COLORS } from "../lib/Theme";
export default function PlansPricing() {
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isPolicyActive = location.pathname === "/policy";
  const isPolicyAdmin = location.pathname === "/planlist";
  const isPolicyHospital = location.pathname === "/hospitalPolicy";
  const [plans, setPlans] = useState("");
  console.log("dgsadfgafs", plans);
  useEffect(() => {
    getPlansHanlder();
  }, []);

  const getPlansHanlder = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.plans,
      });
      console.log("successsuccess", response?.data?.success);
      if (response?.data?.success === true) {
        console.log("responseresponse", response);
        setPlans(response?.data?.data);
      }
    } catch (error) {
      console.log("errorerror", error);
      return error?.response;
    }
  };
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          // py: isPolicyActive ? 0 : 4,
          // px: 2,
          textAlign: "center",
          mt: isPolicyActive ? 0 : 4,
        }}
        className="main"
      >
        {/* <Typography
          variant="h3"
          fontWeight={"bold"}
          sx={{ fontFamily: "rubik", color: COLORS.PRIMARY }}
        >
          Plans & Pricing
        </Typography>
        <Typography
          sx={{
            fontFamily: "rubik",
            fontSize: "20px",
            fontWeight: 400,
            mt: 1,
          }}
        >
          EXPLORE OUR HEALTH INSURANCE PLANS
        </Typography> */}
        <Box
          mt={3}
          sx={{
            width: "100%",
            position: "relative",
            py: { xs: 8, md: 12 },
            backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url('/Images/bbb.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box sx={{ maxWidth: "1000px", mx: "auto", px: 2 }}>
          <Typography
          variant="h3"
          fontWeight={"bold"}
          sx={{ fontFamily: "rubik", color: COLORS.PRIMARY }}
        >
          Plans & Pricing
        </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "rubik",
                fontWeight: 600,
                color: "#fff",
                textAlign: "center",
                mb: 2,
              }}
            >
              Coming Soon
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "rubik",
                fontWeight: 300,
                color: "#eee",
                textAlign: "center",
                mb: 6,
              }}
            >
              Our upcoming plans are designed to bring even more value to your
              experience. Stay tuned for the launch!
            </Typography>
          </Box>
        </Box>
        {/* <Grid container spacing={4} justifyContent="center" mt={4}>
          {Array.isArray(plans) &&
            plans?.map((plan, index) => (
              <Grid
                item
                size={{ xs: 12, sm: 6, md: 4,lg:3 }}
                key={index}
                display="flex"
                justifyContent="center"
              >
                <Box
                  sx={{
                    border: "2px solid #DDDDDD",
                    boxShadow: "none",
                    borderRadius: 4,
                    overflow: "hidden",

                    "&:hover": {
                      border: "2px solid #0077cc",
                    },
                  }}
                >
                  <Box
                    sx={{
                      background: [
                        "linear-gradient(105.39deg, #246bfd -6.33%, #0739a1 32.8%, #c90062 109.6%);",
                        "linear-gradient(105.39deg, #2a2a2a -6.33%, #434343 13.56%, #171717 54.95%, #000 109.6%)",
                        "linear-gradient(115.3deg, #ca9239 1.39%, #875f17 42.83%, #ca9239 73.03%, #875f17 108.71%, #e0b159 142.98%)",
                      ][index % 3],
                      width: "100%", // Ensures it takes the full width of its container
                      // borderRadius: "8px", // Optional: rounds corners
                      padding: "20px", // Optional: adds spacing inside
                      boxSizing: "border-box",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "left",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {plan?.plan_name}
                    </Typography>
                  </Box>

                  <CardContent sx={{ padding: "20px" }}>
                    <Box display="flex" justifyContent="center" mb={2}></Box>

                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "16px",
                        marginBottom: "15px",
                      }}
                      component="div"
                      dangerouslySetInnerHTML={{
                        __html: plan.plan_description,
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/enroll")}
                      sx={{
                        fontSize: plan.featured ? "15px" : "15px",
                        textTransform: plan.featured
                          ? "capitalize"
                          : "capitalize",
              
                        fontWeight: plan.featured ? "600" : "600",
                        width: plan.featured ? "50%" : "100%",
                        borderRadius: plan.featured ? "20px" : "20px",
                        border: plan.featured ? "1px solid #0077cc" : "",
                        color: "#0077cc",
                        "&:hover": {
                          backgroundColor: "#0077cc",
                          // boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
                          color: "#fff",
                        },
                      }}
                    >
                      {isPolicyActive ? "Enroll Now!" : "Enroll Now!"}
                    </Button>
                  </CardContent>
                </Box>
              </Grid>
            ))}
        </Grid> */}
      </Box>
    </Box>
  );
}
