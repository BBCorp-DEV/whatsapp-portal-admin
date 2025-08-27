import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { Card, CardContent, Typography, Grid, Box, CircularProgress,Paper, } from "@mui/material";
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { MdModeEditOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import ApiConfig from "../../Auth/ApiConfig";
import moment from "moment";
import { TbTrash } from "react-icons/tb";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// API integration

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("daily");
  const [page,setPage] = useState(10);
  const [open2,setOpen2] = useState(false);
  const [userStoredData,setUserStoredData] = useState([]);
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
        setError("Service not Working");
        setLoading(false);
      });
  }, [filter, token]);
  const userListing = async () => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.userList,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
       setUserStoredData(response?.data?.data?.docs?.slice(0, 6));
      } else {
        setUserStoredData([]);
      }
    } catch (error) {
      console.log("error", error);
      setUserStoredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userListing();
  }, []);
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
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to userid ✅");
  };
    const OpenModal2 = (user) => {
    setOpen2(user);
  };
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
    <Box sx={{ px: { xs: 2, sm: 4, md: 2 }, py: 2, width: "100%" }}>
      {/* Filter Dropdown */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography  variant="h4" sx={{ fontWeight: "700" }}>Dashboard ({filter.charAt(0).toUpperCase() + filter.slice(1)})</Typography>
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

      {/* <Grid container spacing={2}>
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
      </Grid> */}
      <Typography variant="h4" sx={{ fontWeight: "700" }}>User Details</Typography>
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ mt: 2, borderRadius: "10px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "User Id",
                  "First Name",
                  "Last Name",
                  "Email",
                  // "Permission",
                  "Date",
                  // "Action",
                ].map((heading, i) => (
                  <TableCell key={i} sx={{ fontWeight: "bold" }}>
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Box sx={{ py: 4 }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : userStoredData.length > 0 ? (
                userStoredData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ background: index % 2 === 0 ? "#f5f5f5" : "#fff" }}
                  >
                    <TableCell>
                      {row?.id?.slice(0, 4)}...{row?.id?.slice(-4)}
                      <Tooltip title="Copy ID">
                        <IconButton
                          size="small"
                          onClick={() => handleCopy(row?.id)}
                          sx={{ ml: 1 }}
                        >
                          <ContentCopyIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{row?.firstName}</TableCell>
                    <TableCell>{row?.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    {/* <TableCell>
                      {Array.isArray(row?.role) ? (
                        <Tooltip title={row.role.join(", ")} arrow>
                          <span>
                            {row.role.join(", ").length > 18
                              ? row.role.join(", ").slice(0, 18) + "..."
                              : row.role.join(", ")}
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip title={row?.role || ""} arrow>
                          <span>
                            {row?.role?.length > 18
                              ? row.role.slice(0, 18) + "..."
                              : row.role}
                          </span>
                        </Tooltip>
                      )}
                    </TableCell> */}
                    <TableCell>
                      {moment(row.createdAt).format("DD-MMM-YYYY")}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit profile">
                        <IconButton
                          onClick={() =>
                            navigate("/edit-user", { state: { userData: row } })
                          }
                        >
                          <MdModeEditOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View User">
                        <IconButton
                          onClick={() =>
                            navigate("/view-user", { state: { userData: row } })
                          }
                        >
                          <MdOutlineRemoveRedEye />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <IconButton onClick={() => OpenModal2(row)}>
                          <TbTrash />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
  );
};

export default Dashboard;
