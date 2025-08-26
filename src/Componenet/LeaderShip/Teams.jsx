import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import ApiConfig, { API_BASE_URL, IMAGEURL } from "../../Auth/ApiConfig";
import toast from "react-hot-toast";


const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  function stripHtmlTags(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  const seltedTeamhanlder = async () => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.AllContent,
        headers: {
          autorization: `Bearer ${token}`,
        },
        params: {
          type: "teams",
        },
      });
      console.log("dataatatat", response);
      if (response?.data?.success === true) {
        setLoading(false);
        setTeams(response?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error, "error");
    }
  };

  useEffect(() => {
    seltedTeamhanlder();
  }, []);

  return (
    <Box>
      <Box sx={{ backgroundColor: "#0077cc", padding: "12px 46px" }}>
        <Typography
          sx={{
            padding: "0px 24px",
            fontSize: "36px",
            fontWeight: "500",
            fontFamily: "rubik",
            color: "#fff",
          }}
        >
         Corporate Social Responsibility
        </Typography>
      </Box>

      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pb: 6,
          pt:4
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Meet the Dedicated Minds Behind Our Care
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            mb={5}
          >
            At UhuruCare, our team is the heart of everything we do. From
            skilled doctors to compassionate nurses and support staff, we are
            united by one goal — providing exceptional healthcare with empathy
            and expertise. We believe in empowering our people with the tools
            and environment they need to deliver the best care possible.
          </Typography>
          {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <CircularProgress color="primary" />
          </Box>
        ) : !teams[0]?.rows || teams[0].rows.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <Typography variant="h6" color="text.secondary">
              No data found
            </Typography>
          </Box>
        ) : (
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "flex-start", // or whatever layout you want on larger screens
              },
            }}
          >
            {teams[0]?.rows?.map((member, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "15px",
                    // borderRadius: "50%",
                    width: 280,
                    height: 350,
                    margin: "0 auto",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover img": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      member?.image_path && member.image_path.trim() !== ""
                        ? `${IMAGEURL}/${member.image_path}`
                        : "/Images/profiles2.jpg"
                    }
                    alt={member.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      // borderRadius: "50%",
                      transition: "transform 0.4s ease-in-out",
                    }}
                  />

                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      padding: 2,
                      textAlign: "center",
                      opacity: 1, // visible by default
                      transform: "translateY(0)", // no slide
                      transition: "all 0.3s ease-in-out",
                      borderRadius: "15px",
                      // borderRadius: "0 0 50% 50%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      style={{ fontSize: "22px" }}
                    >
                      {member.title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: "14px" }}>
                      ({member.field1})
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "13px", mt: 1 }}
                    >
                      {stripHtmlTags(member.description)
                        .split(". ")
                        .slice(0, 2)
                        .join(". ")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
            )}
        </Container>
      </Box>
    </Box>
  );
};

export default Teams;
