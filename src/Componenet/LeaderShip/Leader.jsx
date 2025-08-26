import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  Stack,
  Link,
  Container,
} from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import Feedback from "../Feedback";
import axios from "axios";
import ApiConfig, { API_BASE_URL, IMAGEURL } from "../../Auth/ApiConfig";

const Leader = () => {
  const [teams, setTeams] = useState([]);

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
          type: "work",
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
    AOS.init({ duration: 1000, once: true });
    fetchValues();
  }, []);

  const DescriptionWithToggle = ({ description, limit = 100 }) => {
    const [showMore, setShowMore] = useState(false);

    const handleToggle = () => {
      setShowMore((prev) => !prev);
    };

    const isLong = description?.length > limit;
    const displayedText = description;
  
    return (
      <>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {displayedText}
          {/* {isLong && !showMore && "..."} */}
        </Typography>
  
        {/* {isLong && (
          <Link
            component="button"
            variant="body2"
            onClick={handleToggle}
            sx={{ mt: 1 }}
          >
            {showMore ? "See less" : "See more"}
          </Link>
        )} */}
      </>
    );
  };

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
        Partnerships & Affiliations
        </Typography>
      </Box>
      <Container>
        <Box sx={{ flexGrow: 1, p: 4 }}>
          {teams[0]?.rows?.map((value, index) => (
            <Box mt={4} mb={8} sx={{}}>
              <Grid
                container
                spacing={6}
                display={"flex"}
                flexDirection={index % 2 == 0 ? "row" : "row-reverse"}
                alignItems="center"
                justifyContent={"center"}
              >
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    // data-aos="flip-right"
                    component="img"
                    src={`${IMAGEURL}/${value?.image_path}`}
                    alt={`Value ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      px: { xs: 0, md: 0 },
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {index + 1}. {value.title}
                    </Typography>
                    <DescriptionWithToggle
                      description={value.description}
                      limit={560}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
      <Feedback />
    </Box>
  );
};

export default Leader;
