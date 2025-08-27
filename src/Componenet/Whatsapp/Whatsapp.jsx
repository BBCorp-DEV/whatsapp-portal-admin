import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
  Pagination,
  MenuItem,
} from "@mui/material";

const statusOptions = ["all", "pending", "success", "failed"];
const typeOptions = ["Bank Transfer", "UPI", "Wallet"];

export default function Whatsapp() {
  const [deposits] = useState([
    { id: 1, username: "alice", amount: 200, type: "UPI", status: "pending" },
    { id: 2, username: "bob", amount: 500, type: "Bank Transfer", status: "success" },
    { id: 3, username: "carol", amount: 300, type: "Wallet", status: "failed" },
    ...Array.from({ length: 27 }, (_, i) => ({
      id: i + 4,
      username: `user${i + 4}`,
      amount: (i + 1) * 100,
      type: typeOptions[i % 3],
      status: statusOptions[(i % 3) + 1], // skip "all"
    })),
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading] = useState(false);

  const filteredDeposits = deposits.filter((d) => {
    const matchesSearch = d.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDeposits.length / limit);
  const paginatedDeposits = filteredDeposits.slice((page - 1) * limit, page * limit);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#F5F5F5", minHeight: "100vh", p: 2 }}>
      {/* Header + Search + Filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          mb: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Whatsapp Management
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
          {/* Search */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by Username"
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              minWidth: { xs: "100%", sm: 200 },
            }}
          />

          {/* Status Filter */}
          <TextField
            select
            variant="outlined"
            size="small"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              minWidth: { xs: "100%", sm: 150 },
            }}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={3} sx={{ mt: 2, borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              {["Sr. No.", "Username", "Amount", "Date","Type", "Status"].map((heading, i) => (
                <TableCell key={i} sx={{ fontWeight: "bold" }}>
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedDeposits.length > 0 ? (
              paginatedDeposits.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ background: index % 2 === 0 ? "#f5f5f5" : "#fff" }}
                >
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>${row.amount}</TableCell>
                       <TableCell>{"25-08-2025"}</TableCell>
                  <TableCell>{row.type}</TableCell>
             
                  <TableCell sx={{ textTransform: "capitalize" }}>{row.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No deposits found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Pagination page={page} count={totalPages} onChange={handlePageChange} />
        </Box>
      )}
    </Box>
  );
}





