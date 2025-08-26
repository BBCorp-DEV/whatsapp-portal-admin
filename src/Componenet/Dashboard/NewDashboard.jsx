import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Dummy data for charts
const dailyData = [
  { name: "Mon", users: 40, deposits: 24 },
  { name: "Tue", users: 30, deposits: 13 },
  { name: "Wed", users: 20, deposits: 98 },
  { name: "Thu", users: 27, deposits: 39 },
  { name: "Fri", users: 18, deposits: 48 },
  { name: "Sat", users: 23, deposits: 38 },
  { name: "Sun", users: 34, deposits: 43 }
];

const monthlyData = [
  { name: "Jan", users: 400, deposits: 240 },
  { name: "Feb", users: 300, deposits: 139 },
  { name: "Mar", users: 200, deposits: 980 },
  { name: "Apr", users: 278, deposits: 390 },
  { name: "May", users: 189, deposits: 480 },
  { name: "Jun", users: 239, deposits: 380 },
  { name: "Jul", users: 349, deposits: 430 }
];

const Dashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      {/* Top cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Balance</Typography>
              <Typography variant="h4" color="primary">$50,000</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" color="secondary">1,200</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Deposits</Typography>
              <Typography variant="h4" color="success.main">$75,000</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} style={{ marginTop: 20 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Daily Report</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#1976d2" />
                  <Line type="monotone" dataKey="deposits" stroke="#2e7d32" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Report</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#d32f2f" />
                  <Line type="monotone" dataKey="deposits" stroke="#0288d1" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
