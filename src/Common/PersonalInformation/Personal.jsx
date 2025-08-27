import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Card, CardContent, Typography, Grid, Box, CircularProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import GroupIcon from "@mui/icons-material/Group";
import ApiConfig from "../../Auth/ApiConfig";

// API integration

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("daily");
  const token = window.localStorage.getItem("adminToken");

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${ApiConfig.dashboardList}?filter=${filter}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch stats");
        setLoading(false);
      });
  }, [filter, token]);

  // Prepare card data from API response
  const topCards = stats
    ? [
       {
          title: "Total Deposits",
          value: stats.deposit?.total ?? 0,
          gradient: "linear-gradient(135deg, #42a5f5, #478ed1)",
          icon: <AccountBalanceWalletIcon sx={{ fontSize: 50, opacity: 0.9, color: 'black' }} />,
        },
         {
          title: "Total Withdrawal",
          value: stats.withdrawal?.total ?? 0,
          gradient: "linear-gradient(135deg, #42a5f5, #478ed1)",
          icon: <AccountBalanceWalletIcon sx={{ fontSize: 50, opacity: 0.9, color: 'black' }} />,
        },
         {
          title: "Total Transfer ",
          value: stats.transfer?.total ?? 0,
          gradient: "linear-gradient(135deg, #42a5f5, #478ed1)",
          icon: <AccountBalanceWalletIcon sx={{ fontSize: 50, opacity: 0.9, color: 'black' }} />,
        },
        {
          title: "Total Overall Success",
          value: stats.overall?.success ?? 0,
          gradient: "linear-gradient(135deg, #42a5f5, #478ed1)",
          icon: <AccountBalanceWalletIcon sx={{ fontSize: 50, opacity: 0.9, color: 'black' }} />,
        },
        {
          title: "Total Overall Errors",
          value: stats.overall?.error ?? 0,
          gradient: "linear-gradient(135deg, #ef5350, #d32f2f)",
          icon: <MoneyOffIcon sx={{ fontSize: 50, opacity: 0.9, color: 'black' }} />,
        },
        {
          title: "Total Overall",
          value: stats.overall?.total ?? 0,
          gradient: "linear-gradient(135deg, #66bb6a, #388e3c)",
          icon: <GroupIcon sx={{ fontSize: 50, opacity: 0.9, color: 'black' }} />,
        },
        {
          title: "Total Whatsapp Users",
          value: stats.whatsappUsers?.total ?? 0,
          gradient: "linear-gradient(135deg, #66bb6a, #388e3c)",
          icon: <GroupIcon sx={{ fontSize: 50, opacity: 0.9, color: 'black' }} />,
        },
        {
          title: "Total Create Account",
          value: stats.create_account?.total ?? 0,
          gradient: "linear-gradient(135deg, #66bb6a, #388e3c)",
          icon: <GroupIcon sx={{ fontSize: 50, opacity: 0.9, color: 'black' }} />,
        },
       
      ]
    : [];

  // Prepare dailyData for chart (example: only one day from API, so keep dummy for now)
  const dailyData = [
    {
      name: "Today",
      users: stats?.whatsappUsers?.total ?? 0,
      deposits: stats?.typeBasedStats?.deposit?.total ?? 0,
    },
  ];

  // Prepare monthlyData for chart (not available in API, keep dummy)
  const monthlyData = dailyData;


if (loading) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)", // blur background
        backgroundColor: "rgba(255, 255, 255, 0.3)", // semi-transparent overlay
        zIndex: 9999, // make sure it's on top
        flexDirection: "column",
      }}
    >
      <CircularProgress
        size={60}
        thickness={5}
        sx={{
          color: "#1976d2",
          mb: 2,
        }}
      />
      <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold" }}>
        Loading Dashboard...
      </Typography>
    </Box>
  );
}

  if (error) {
    return <Box sx={{ p: 4, color: 'red' }}>{error}</Box>;
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 4 }, py: 2, width: "100%" }}>
      {/* Filter Dropdown */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ fontWeight: "bold",fontSize:'22px' }}>Dashboard ({filter.charAt(0).toUpperCase() + filter.slice(1)})</Typography>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="dashboard-filter-label">Filter</InputLabel>
          <Select
            labelId="dashboard-filter-label"
            id="dashboard-filter"
            value={filter}
            label="Filter"
            onChange={e => setFilter(e.target.value)}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Top Cards */}
      <Grid container spacing={3}>
        {topCards.map((card, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card
              sx={{
                background: "#fff",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 3,
                px: 3,
                py: 2,
                boxShadow: 2,
                mb: 4,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
              }}
            >
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="subtitle1" sx={{ color: '#000' }}>{card.title}</Typography>
                <Typography variant="h4" sx={{ color: '#000' }} fontWeight="bold">
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ boxShadow: 5, borderRadius: 3, height: "100%" }}>
            <CardContent sx={{ height: "100%",mr:3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Daily Report
              </Typography>
              <Box sx={{ width: "100%", height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
  <YAxis tick={{ fontSize: 10 }} />
  <Tooltip contentStyle={{ fontSize: 10 }} itemStyle={{ fontSize: 10 }} />
  <Legend wrapperStyle={{ fontSize: 10 }} />
  <Line
    type="monotone"
    dataKey="users"
    stroke="#1976d2"
    strokeWidth={2}
    dot={{ r: 4 }}
  />
  <Line
    type="monotone"
    dataKey="deposits"
    stroke="#2e7d32"
    strokeWidth={2}
    dot={{ r: 4 }}
  />
</LineChart>

                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ boxShadow: 5, borderRadius: 3, height: "100%" }}>
              <CardContent sx={{ height: "100%",mr:3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Monthly Report
              </Typography>
              <Box sx={{ width: "100%", height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{ fontSize: 10 }}
                      itemStyle={{ fontSize: 10 }}
                    />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#1976d2"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="deposits"
                      stroke="#2e7d32"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
