import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ApiConfig from "../../Auth/ApiConfig";
import axios from "axios";

const UhuruFAQ = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
          type: "faqs",
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
    <Container
      maxWidth="md"
      sx={{ py: 4, height: teams[0]?.rows?.length > 6 ? "auto" : "auto" }}
    >
      <Box mb={4}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          gutterBottom
          align="center"
          fontWeight={"bold"}
        >
          UhuruCare – Frequently Asked Questions (FAQs)
        </Typography>
      </Box>

      {teams[0]?.rows?.length > 0 ? (
        teams?.[0]?.rows?.map((section, idx) => (
          <div key={idx} style={{ marginBottom: "2rem" }}>
            <Accordion
              sx={{
                background:
                  "linear-gradient(to right, rgb(36 56 170 / 80%), rgb(94 74 43 / 80%))",
                color: "white", // Optional: make text readable
                borderRadius: "10px !important",
                mb: 2,
                boxShadow: 3,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: "#fff",
                  backdropFilter: "blur(2px)",
                  borderRadius: 1,
                  color: "#000", // Add color here
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: "pre-line",
                  }}
                  component="div"
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: section.description,
                    }}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))
      ) : (
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mt: 4 }}
        >
          No data found.
        </Typography>
      )}
    </Container>
  );
};

export default UhuruFAQ;
