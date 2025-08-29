import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Tooltip,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  Autocomplete,
  FormControl,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  DialogTitle,
  Pagination,
} from "@mui/material";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import toast from "react-hot-toast";
import ClaimCard from "../../Pages/ClaimCard";
import { AuthContext } from "../../Auth/context/Auth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import ApiConfig from "../../Auth/ApiConfig";
import DownloadIcon from "@mui/icons-material/Download";
import ApiDocModal from "../ApiDocModal";

export default function Transfer() {
  // XLSX download handler
  const downloadExcel = () => {
    if (!staticClaims || staticClaims.length === 0) {
      toast.error("No transfer data to download");
      return;
    }
    const dataToExport = staticClaims.map((row, idx) => ({
      "Sr. No.": (page - 1) * limit + idx + 1,
      Name: row.name,
      "From Account": row.responseData?.data?.from,
      "To Account": row.responseData?.data?.to,
      Amount: row.responseData?.data?.amount,
      Currency: row.responseData?.data?.currency?.name,
      Status: row.status,
      Date: moment(row.created_at).format("YYYY-MM-DD"),
    }));
    const XLSX = require("xlsx");
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transfers");
    XLSX.writeFile(workbook, "TransferList.xlsx");
    toast.success("Transfer list downloaded ✅");
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isAdminPayment = location.pathname === "/payments";
  const [claimListing, setClaimListing] = useState([]);
  const [claimNo, setClaimNo] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedClaimIds, setSelectedClaimIds] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [staticClaims, setStaticClaims] = useState([]);
  console.log("wegfrigt54y54yh", staticClaims);
  const effectRan = useRef(false);

  const auth = useContext(AuthContext);
  const userData = auth.userData;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // ---------- Handlers ----------
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChanges = (event, value) => {
    setSelectedItems(value);
    const selectedIds = value?.map((item) => String(item?.claim_number));
    setSelectedClaimIds(selectedIds);
    console.log("Selected Claim Numbers:", selectedIds);
  };

  const handleClose = () => setOpen1(false);
  const handleOpen = () => setOpen1(true);
  const handleChange = (event) => setAge(event.target.value);

  const selectData = async () => {
    // Example: update selected claim statuses (static mode now)
    console.log("Selected IDs:", selectedClaimIds, "New Status:", age);
    // toast.success("Status updated successfully (static mode)");
    setOpen1(false);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const depositListing = async () => {
    setLoading(true);
    try {
      const token = window.localStorage.getItem("adminToken");

      const response = await axios({
        method: "GET",
        url: ApiConfig?.transferList,
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
        setStaticClaims(response?.data?.data?.docs);
        setTotalPages(response?.data?.data?.totalPages);
        console.log("depositResponsedddddd", response?.data?.data?.docs);
        setLoading(false);
        // toast.success(
        //   response?.data?.message || "Transfer successfully ✅"
        // );
      } else {
        setStaticClaims([]);
        // toast.error(response?.data?.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("API ERROR RESPONSE:", error?.response?.data || error);
      setLoading(false);
      setStaticClaims([]);
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
    <>
      {["admin", "insurance"].includes(userData?.role) && <ClaimCard />}
      <Box
        sx={{
          height: "100vh",
          marginTop: { xs: "0px", md: "0px" },
          background: "#F5F5F5",
          px: 2,
          py: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            mb: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              // fontSize: "30px",
              fontWeight: "700",
              // fontFamily: "rubik",
              mb: { xs: 1, md: 0 },
            }}
          >
            Transfer List
          </Typography>

          {/* Filters */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              type="search"
              value={searchQuery}
              onChange={handleSearchQueryChange}
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
                  sx={{
                    height: 40,
                    minWidth: 100,
                    textTransform: "none",
                    borderRadius: "8px",
                  }}
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
               py: 1.25,
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
          sx={{
            height: "auto",
            background: "#fff",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr. No.",
                  "Name",
                  "From Account",
                  "To Account",
                  "Amount",
                  "Currency",
                  "Status",
                  "Date",
                  ...(userData?.role !== "hospital" ? ["Action"] : []),
                ].map((heading, i) => (
                  <TableCell
                    key={i}
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : staticClaims.length > 0 ? (
                staticClaims

                  .filter((row) => (status ? row.status === status : true))
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">
                        {row.responseData?.data?.from}
                      </TableCell>
                      <TableCell align="center">
                        {row.responseData?.data?.to}
                      </TableCell>
                      <TableCell align="center">
                        {row.responseData?.data?.amount}
                      </TableCell>
                      <TableCell align="center">
                        <TableCell align="center">
                          {row.responseData?.data?.currency?.name}
                        </TableCell>
                      </TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        {moment(row.created_at).format("YYYY-MM-DD")}
                      </TableCell>

                      <TableCell align="center">
                        <Tooltip title={"View Transfer"}>
                          <IconButton
                            // onClick={() =>
                            //   navigate("/view-transfer", {
                            //     state: { staticClaims },
                            //   })
                            // }
                            onClick={() => setOpen(row)}
                          >
                            <IoEyeSharp />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {open && <ApiDocModal open={open} onClose={() => setOpen(false)} />}
        {/* Pagination (dummy for static mode) */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={totalPages}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
