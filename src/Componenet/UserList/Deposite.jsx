import React, { useEffect, useRef, useState } from "react";
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
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import axios from "axios";
import ApiConfig from "../../Auth/ApiConfig";
import toast from "react-hot-toast";
import moment from "moment";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const statusOptions = ["all", "pending", "success", "failed"];
const typeOptions = ["Bank Transfer", "UPI", "Wallet"];

export default function Deposite() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paginatedDeposits, setPaginatedDeposits] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const effectRan = useRef(false);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const depositListing = async () => {
    setLoading(true);
    try {
      const token = window.localStorage.getItem("adminToken");

      const response = await axios({
        method: "GET",
        url: ApiConfig?.depositList,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page: page,
          limit: limit,
          search: searchQuery,
           fromDate: fromDate,
          toDate: toDate,
        },
      });

      console.log("depositResponse", response);

      if (response?.status === 200) {
        setPaginatedDeposits(response?.data?.data?.docs);
        setTotalPages(response?.data?.data?.totalPages);
        setLoading(false);
        // toast.success(
        //   response?.data?.message || "Deposits loaded successfully ✅"
        // );
      } else {
        setPaginatedDeposits([]);
        // toast.error(response?.data?.message || "Something went wrong ❌");
      }
    } catch (error) {
      setLoading(false);
      setPaginatedDeposits([]);
      console.error("API ERROR RESPONSE:", error?.response?.data || error);
      // toast.error(
      //   error?.response?.data?.message || "Failed to fetch deposits ❌"
      // );
      return error?.response;
    }
  };
  useEffect(() => {
    depositListing();
  }, [page, limit, searchQuery, fromDate, toDate]);
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        px: 2,
        py: 0,
      }}
    >
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
          Deposit Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          {/* Search */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
             sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            marginTop: { xs: "10px", md: "0px" },
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              paddingRight: 0,
              padding: "2.5px 0px",
              borderRadius: "10px",
            },
          }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
              <DatePicker
                label="From Date"
                value={fromDate ? new Date(fromDate) : null}
                onChange={(newValue) => {
                  if (newValue) {
                    const formatted = moment(newValue).format("YYYY-MM-DD");
                    setFromDate(formatted);
                  } else {
                    setFromDate("");
                  }
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      width: 150,
                    },
                  },
                }}
              />

              <DatePicker
                label="To Date"
                value={toDate ? new Date(toDate) : null}
                onChange={(newValue) => {
                  if (newValue) {
                    const formatted = moment(newValue).format("YYYY-MM-DD");
                    setToDate(formatted);
                  } else {
                    setToDate("");
                  }
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    sx: {
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                     width: 150,
                    },
                  },
                }}
              />

              <Button
                variant="outlined"
                color="primary"
                sx={{ height: 40, minWidth: 100, textTransform: "none", borderRadius: "8px" }}
                onClick={() => {
                  setSearchQuery("");
                  setFromDate("");
                  setToDate("");
                  setPage(1);
                }}
              >
                Reset
              </Button>
            </Box>
          </LocalizationProvider>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ mt: 2, borderRadius: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Sr. No.",
                "Name",
                "Amount",
                "Date",
                "Type",
                "Status",
                "Action",
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
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.requestData?.amount}</TableCell>
                  <TableCell>
                    {" "}
                    {moment(row.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>{row.requestData?.transactionType}</TableCell>
                  <TableCell>{row.status}</TableCell>

                  <TableCell>
                    <Tooltip title="View Deposit">
                      <IconButton
                        onClick={() =>
                          navigate("/view-deposit", {
                            state: { paginatedDeposits },
                          })
                        }
                      >
                        <IoEyeSharp />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Pagination
            page={page}
            count={totalPages}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
}

