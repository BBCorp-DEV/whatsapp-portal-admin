import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import ApiConfig from "../../Auth/ApiConfig";

const PoliciesPlan = () => {
  const [countStored, setCountStored] = useState([]);
  const formattedData = [
    {
      value: countStored.payment_policy_complete ?? "0",
      description: "Payment Policy Complete",
    },
    {
      value: countStored.payment_policy_created ?? "0",
      description: "Total Policy Created",
    },
    {
      value: countStored.claims_paid ?? "0",
      description: "Total Policy Active",
    },
    {
      value: countStored.policies_cancel ?? "0",
      description: "Total Policy cancel",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const token = window?.localStorage?.getItem("adminToken");

  const countList = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.dashboardCount,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response Data:", response?.data?.data);

      if (response?.data?.success === true) {
        const rawData = response?.data?.data;
        console.log("afsdafsadfgs", rawData);
        const formattedData = [
          {
            value: rawData.payment_policy_complete,
            description: "Payment Policy Complete",
          },
          {
            value: rawData.claims_approved,
            description: "Total Policy Created",
          },
          { value: rawData.claims_paid, description: "Total Policy Active" },
          {
            value: rawData.policies_cancel,
            description: "Total Policy cancel",
          },
        ];

        setCountStored(rawData);
      }
    } catch (error) {
      console.log("Error fetching dashboard count:", error);
    }
  };

  useEffect(() => {
    countList();
  }, []);

  return (
    <Box sx={{ background: "#F5F5F5", py: 4 }}>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        maxWidth="lg"
        sx={{ margin: "0 auto" }}
      >
        {formattedData?.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card
              elevation={4}
              sx={{
                height: { xs: 140, md: 170 },
                width: { xs: 350, md: 260 },
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
                background: "#ffffff",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {card.value}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PoliciesPlan;
