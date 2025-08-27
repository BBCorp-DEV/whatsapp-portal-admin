import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
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

// Dummy data
const dailyData = [
  { name: "Mon", users: 40, deposits: 24 },
  { name: "Tue", users: 30, deposits: 13 },
  { name: "Wed", users: 20, deposits: 98 },
  { name: "Thu", users: 27, deposits: 39 },
  { name: "Fri", users: 18, deposits: 48 },
  { name: "Sat", users: 23, deposits: 38 },
  { name: "Sun", users: 34, deposits: 43 },
];

const monthlyData = [
  { name: "Jan", users: 400, deposits: 240 },
  { name: "Feb", users: 300, deposits: 139 },
  { name: "Mar", users: 200, deposits: 980 },
  { name: "Apr", users: 278, deposits: 390 },
  { name: "May", users: 189, deposits: 480 },
  { name: "Jun", users: 239, deposits: 380 },
  { name: "Jul", users: 349, deposits: 430 },
];

const topCards = [
  {
    title: "Total Deposits",
    value: "$75,000",
    gradient: "linear-gradient(135deg, #42a5f5, #478ed1)",
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 50, opacity: 0.9,color:'black' }} />,
  },
  {
    title: "Total Withdrawals",
    value: "$50,000",
    gradient: "linear-gradient(135deg, #ef5350, #d32f2f)",
    icon: <MoneyOffIcon sx={{ fontSize: 50, opacity: 0.9,color:'black' }} />,
  },
  {
    title: "Total Users",
    value: "1,200",
    gradient: "linear-gradient(135deg, #66bb6a, #388e3c)",
    icon: <GroupIcon sx={{ fontSize: 50, opacity: 0.9,color:'black' }} />,
  },
];

const Dashboard = () => {
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 4 }, py: 2, width: "100%" }}>
      {/* Top Cards */}
      <Grid container spacing={3}>
        {topCards.map((card, i) => (
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                background:"#fff",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 3,
                px: 3,
                py: 2,
                boxShadow: 6,
                mb: 4,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 12 },
              }}
            >
              <CardContent sx={{ flex: 1, p: 0 }}>
                <Typography variant="subtitle1" sx={{color:'#000'}}>{card.title}</Typography>
                <Typography variant="h4" sx={{color:'#000'}} fontWeight="bold">
                  {card.value}
                </Typography>
              </CardContent>
              <Box>{card.icon}</Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ boxShadow: 5, borderRadius: 3, height: "100%" }}>
            <CardContent sx={{ height: "100%", mr: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Daily Report
              </Typography>
              <Box sx={{ width: "100%", height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ boxShadow: 5, borderRadius: 3, height: "100%" }}>
            <CardContent sx={{ height: "100%", mr: 3 }}>
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
