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

const Dashboard = () => {
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 4 }, py: 2, width: "100%" }}>
      {/* Top Cards */}
      <Grid container spacing={3}>
        {[
 {
  title: "Total Deposits",
  value: "$75,000",
  gradient: "linear-gradient(135deg,#e0e0e0,#ffffff)",
},
{
  title: "Total Withdrawals",
  value: "$50,000",
  gradient: "linear-gradient(135deg,#e0e0e0,#ffffff)",
},
{
  title: "Total Users",
  value: "1,200",
  gradient: "linear-gradient(135deg,#e0e0e0,#ffffff)",
},

        ].map((card, index) => (
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                boxShadow: 6,
                borderRadius: 3,
                minHeight: 140,
                background: card.gradient,
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mb: 4,
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  {card.title}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
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
