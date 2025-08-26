import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import ApiConfig from "../../Auth/ApiConfig";


const Cards = () => {
  const [countStored, setCountStored] = useState([]);
  const formattedData = [
    {
      value: countStored.active_policyholders ??  "0",
      description: "Active Policy Holder",
    },
    {
      value: countStored.claims_approved ??  "0",
      description: "Total Claims Approved",
    },
    { value: countStored.claims_paid ??  "0", 
      description: "Total Claim Paid" },
    {
      value: countStored.claims_processing ??  "0",
      description: "Total Claim Processing",
    },
    {
      value: countStored.claims_rejected ??  "0",
      description: "Total Claim Rejected",
    },
    {
      value: countStored.total_hospitals_users ??  "0",
      description: "Total Hospital Users",
    },
    {
      value: countStored.total_insurance_users ??  "0",
      description: "Total Insurance Users",
    },
    {
      value: countStored.total_policyholders_users ??  "0" ,
      description: "Total Policy Holder Users",
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
            value: rawData.active_policyholders,
            description: "Active Policy Holder",
          },
          {
            value: rawData.claims_approved,
            description: "Total Claims Approved",
          },
          { value: rawData.claims_paid, description: "Total Claim Paid" },
          {
            value: rawData.claims_processing,
            description: "Total Claim Processing",
          },
          {
            value: rawData.claims_rejected,
            description: "Total Claim Rejected",
          },
          {
            value: rawData.total_hospitals_users,
            description: "Total Hospital Users",
          },
          {
            value: rawData.total_insurance_users,
            description: "Total Insurance Users",
          },
          {
            value: rawData.total_policyholders_users,
            description: "Total Policy Holder Users",
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
    <Box sx={{ background: "#F5F5F5", py: 4,overflow:"hidden" }}>
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
                width: { xs: 330, md: 260 },
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

export default Cards;
