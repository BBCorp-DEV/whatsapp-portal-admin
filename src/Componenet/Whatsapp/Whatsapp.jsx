import React, { useEffect, useState } from "react";
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
import moment from "moment";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DownloadIcon from "@mui/icons-material/Download";

const statusOptions = ["all", "pending", "success", "failed"];
const typeOptions = ["Bank Transfer", "UPI", "Wallet"];

export default function Whatsapp() {
  // XLSX download handler
  const downloadExcel = () => {
    if (!whatsData || whatsData.length === 0) {
      alert("No WhatsApp data to download");
      return;
    }
    const dataToExport = whatsData.map((row, idx) => ({
      "Sr. No.": (page - 1) * limit + idx + 1,
      Name: row.name,
      Email: row.email,
      Phone: row.whatsappPhone,
      Status: row.status,
      Date: moment(row.createdAt).format("YYYY-MM-DD"),
    }));
    const XLSX = require("xlsx");
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Whatsapp");
    XLSX.writeFile(workbook, "WhatsappList.xlsx");
    toast.success("Whatsapp list downloaded ✅");
  };
  const [deposits] = useState([
    { id: 1, username: "alice", amount: 200, type: "UPI", status: "pending" },
    {
      id: 2,
      username: "bob",
      amount: 500,
      type: "Bank Transfer",
      status: "success",
    },
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
  const [whatsData, setWhatsData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const limit = 10;
  const [loading, setLoading] = useState(false);

  const filteredDeposits = deposits.filter((d) => {
    const matchesSearch = d.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDeposits.length / limit);
  const paginatedDeposits = filteredDeposits.slice(
    (page - 1) * limit,
    page * limit
  );

  const handlePageChange = (_, value) => {
    setPage(value);
  };
  const whatisting = async () => {
    setLoading(true);

    try {
      const token = window.localStorage.getItem("adminToken");
      const response = await axios({
        method: "GET",
        url: ApiConfig?.whatsAppList,
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
        setWhatsData(response?.data?.data?.docs);
        setLoading(false);
      } else {
        setWhatsData([]);
        // toast.error(response?.data?.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("API ERROR RESPONSE:", error?.response?.data || error);
      setWhatsData([]);
      setLoading(false);

      // toast.error(
      //   error?.response?.data?.message || "Failed to fetch deposits ❌"
      // );
      return error?.response;
    }
  };
  useEffect(() => {
    whatisting();
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
          Whatsapp List
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
              backgroundColor: {
                  xs: "transparent", // 0 - 899px
                  md: "#fff", // 900px and above
                },
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
           <Button
                            variant="contained"
                            onClick={downloadExcel}
                            sx={{
                              backgroundColor: "#0077cc",
                              textTransform: "none",
                              px: 4,
                              py: 1,
                              borderRadius: "8px",
                              fontWeight: "bold",
                              color: "#fff",
                              "&:hover": { backgroundColor: "#0077cc" },
                            }}
                          >
                            <DownloadIcon />
                            &nbsp; Download Xlsx
                          </Button>
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
                "Email",
                "Phone",
                "Status",
                "Date",
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
            ) : whatsData.length > 0 ? (
              whatsData.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ background: index % 2 === 0 ? "#f5f5f5" : "#fff" }}
                >
                  <TableCell> {(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row?.whatsappPhone}</TableCell>
                  <TableCell>{row.status}</TableCell>

                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {moment(row.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View WhatsApp">
                      <IconButton
                        onClick={() =>
                          navigate("/view-whatsapp", {
                            state: { whatsData },
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
      {/* {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Pagination
            page={page}
            count={totalPages}
            onChange={handlePageChange}
          />
        </Box>
      )} */}
    </Box>
  );
}
