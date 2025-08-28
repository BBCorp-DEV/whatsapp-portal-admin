import React, { useContext, useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Pagination,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";

import {
  MdModeEditOutline,
  MdBlock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
// import axios from "axios";
// import ApiConfig, { API_BASE_URL } from "../../Auth/ApiConfig";
// import toast from "react-hot-toast";
import { AuthContext } from "../../Auth/context/Auth";
import ApiConfig from "../../Auth/ApiConfig";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { IoEyeSharp } from "react-icons/io5";

// 🔹 Static data for now (instead of API

export default function WithDraw() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const userDatas = auth.userData;

  // 🔹 Using static data

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const effectRan = useRef(false);

  // Pagination
  const handlePageChange = (event, value) => setPage(value);
  const depositListing = async () => {
    setLoading(true);
    try {
      const token = window.localStorage.getItem("adminToken");

      const response = await axios({
        method: "GET",
        url: ApiConfig?.withdrawalList,
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
        setPaginatedUsers(response?.data?.data?.docs);
        setTotalPages(response?.data?.data?.totalPages);
        setLoading(false);
        // toast.success(
        //   response?.data?.message || "Deposits loaded successfully ✅"
        // );
      } else {
        // toast.error(response?.data?.message || "Something went wrong ❌");
        setPaginatedUsers([]);
      }
    } catch (error) {
      console.error("API ERROR RESPONSE:", error?.response?.data || error);
      setLoading(false);
      setPaginatedUsers([]);
      // toast.error(
      //   error?.response?.data?.message || "Failed to fetch deposits ❌"
      // );
      return error?.response;
    }
  };
  useEffect(() => {
    depositListing();
  }, [page, limit, searchQuery, fromDate, toDate]);
  // XLSX download handler
  const downloadExcel = () => {
    if (!paginatedUsers || paginatedUsers.length === 0) {
      toast.error("No withdrawal data to download");
      return;
    }
    const dataToExport = paginatedUsers.map((row, idx) => ({
      "Sr. No.": (page - 1) * limit + idx + 1,
      Name: row.name,
      Amount: row.requestData?.amount,
      Date: moment(row.createdAt).format("YYYY-MM-DD"),
      Type: row.requestData?.transactionType,
      Status: row.status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Withdrawals");
    XLSX.writeFile(workbook, "WithdrawalList.xlsx");
    toast.success("Withdrawal list downloaded ✅");
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "700" }}>
          Withdrawal List
        </Typography>
         <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((row, index) => (
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
                    <Tooltip title="Vie Withdrawal">
                      <IconButton
                        onClick={() =>
                          navigate("/view-withdrawal", {
                            state: { paginatedUsers },
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
                  No deposits found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            page={page}
            onChange={handlePageChange}
            count={totalPages}
          />
        </Box>
      )}
    </Box>
  );
}
