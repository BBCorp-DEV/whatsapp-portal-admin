import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Rating,
  CircularProgress,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import ApiConfig, { API_BASE_URL, IMAGEURL } from "../Auth/ApiConfig";
import moment from "moment";

const testimonials = [
  {
    name: "Joshua William",
    role: "Manager",
    rating: 5,
    message:
      "I'm trying to get a hold of someone in support. I'm in a lot of trouble right now, and they are saying it has something to do with my books. Please get back to me right away.",
    avatar: "/Images/doctor1.jpg", // Update with correct path
  },
  {
    name: "Joshua William",
    role: "Manager",
    rating: 5,
    message:
      "I'm trying to get a hold of someone in support. I'm in a lot of trouble right now, and they are saying it has something to do with my books. Please get back to me right away.",
    avatar: "/Images/doctor1.jpg", // Update with correct path
  },
  {
    name: "Joshua William",
    role: "Manager",
    rating: 5,
    message:
      "I'm trying to get a hold of someone in support. I'm in a lot of trouble right now, and they are saying it has something to do with my books. Please get back to me right away.",
    avatar: "/Images/doctor1.jpg", // Update with correct path
  },
  {
    name: "Joshua William",
    role: "Manager",
    rating: 5,
    message:
      "I'm trying to get a hold of someone in support. I'm in a lot of trouble right now, and they are saying it has something to do with my books. Please get back to me right away.",
    avatar: "/Images/doctor1.jpg", // Update with correct path
  },

];

const FeedbackSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "20px",
        },
      },
    ],
  };

  const [teams, setTeams] = useState([]);
  console.log("Afasfas", teams);

  const fetchValues = async () => {
    const token = window.localStorage.getItem("adminToken");

    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.AllContent,
        headers: {
          autorization: `Bearer ${token}`,
        },
        params: {
          type: "feedback",
        },
      });

      if (response?.data?.success === true) {
        setTeams(response?.data?.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchValues();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        py: { xs: 8, md: 12 },
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url('/Images/dddddddddddd11.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box sx={{ maxWidth: "1000px", mx: "auto", px: 2 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "rubik",
            fontWeight: 600,
            color: "#fff",
            textAlign: "center",
            mb: 2,
          }}
        >
          Customer Feedback
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
          These are the stories of our customers who have joined us with great
          pleasure when using this crazy feature.
        </Typography>
        {!teams ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Slider {...settings}>
            {teams?.[0]?.rows?.map((t, i) => (
              <Box key={i} px={2}>
                <Card
                  sx={{
                    maxWidth: { xs: 200, sm: 300, md: 400 },
                    mx: "auto",
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      background: "linear-gradient(135deg, #f3f3f3 0%, #e3f2fd 100%)",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{ mt: 2, fontStyle: "italic", color: "#555" }}
                    >
                      “{t.description}”
                    </Typography>
                    <Box display="flex" alignItems="center" mt={3}>
                      <Avatar
                        sx={{ width: 50, height: 50, borderRadius: 2 }}
                        src={`${IMAGEURL}/${t?.image_path}`}
                        alt={t?.type}
                      />
                      <Box ml={2}>
                        <Typography fontWeight="bold">{t?.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {moment(t.created_at).format("ll")}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        )}

      </Box>
    </Box>
  );
};

export default FeedbackSlider;
