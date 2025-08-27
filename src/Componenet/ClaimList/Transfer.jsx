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
import axios from "axios";
import ApiConfig from "../../Auth/ApiConfig";

export default function Transfer() {
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

  const [open, setOpen] = useState(false);
  const [age, setAge] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedClaimIds, setSelectedClaimIds] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [staticClaims, setStaticClaims] = useState([]);
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

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleChange = (event) => setAge(event.target.value);

  const selectData = async () => {
    // Example: update selected claim statuses (static mode now)
    console.log("Selected IDs:", selectedClaimIds, "New Status:", age);
    // toast.success("Status updated successfully (static mode)");
    setOpen(false);
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
      });

      console.log("depositResponse", response);

      if (response?.status === 200) {
        setStaticClaims(response?.data);
        setLoading(false);
        // toast.success(
        //   response?.data?.message || "Transfer successfully ✅"
        // );
      } else {
        // toast.error(response?.data?.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("API ERROR RESPONSE:", error?.response?.data || error);
      setLoading(false);
      // toast.error(
      //   error?.response?.data?.message || "Failed to fetch deposits ❌"
      // );
      return error?.response;
    }
  };
  useEffect(() => {
    if (!effectRan.current) {
      depositListing();
      effectRan.current = true; // ✅ prevents second run
    }
  }, []);
  return (
    <>
      {["admin", "insurance"].includes(userData?.role) && <ClaimCard />}
      <Box
        sx={{
          height: "100vh",
          marginTop: { xs: "0px", md: "0px" },
          background: "#F5F5F5",
          p: 2,
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
              fontSize: "30px",
              fontWeight: "700",
              // fontFamily: "rubik",
              mb: { xs: 1, md: 0 },
            }}
          >
            Transfer Management
          </Typography>

          {/* Filters */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              width: { xs: "100%", md: "auto" },
            }}
          >
            {/* Search */}
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              type="search"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              fullWidth
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                minWidth: { sm: 200 },
              }}
            />

            {/* Status */}
            <FormControl
              size="small"
              fullWidth
              sx={{
                minWidth: { sm: 150 },
                backgroundColor: "#fff",
                borderRadius: 2,
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
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
                  "Date",
                  "Full Name",
                  "Claim Number",
                  "Claim Amount",
                  "Claim Approved Amount",
                  "Status",
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
                  .filter((row) =>
                    row.full_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .filter((row) => (status ? row.status === status : true))
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      }}
                    >
                      <TableCell align="center">
                        {moment(row.created_at).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell align="center">{row.full_name}</TableCell>
                      <TableCell align="center">{row.claim_number}</TableCell>
                      <TableCell align="center">{row.claim_amount}</TableCell>
                      <TableCell align="center">
                        {row.claim_approved_amount}
                      </TableCell>
                      <TableCell align="center">
                        {row.status.charAt(0).toUpperCase() +
                          row.status.slice(1)}
                      </TableCell>
                      {userData?.role !== "hospital" && (
                        <TableCell align="center">
                          <Tooltip title={"View Claim"}>
                            <IconButton
                              onClick={() =>
                                navigate("/viewClaim", { state: { row } })
                              }
                            >
                              <IoEyeSharp />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

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

        {/* Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: { borderRadius: "12px" } }}
        >
          <DialogTitle>
            <Typography variant="h6">Claim Select</Typography>
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={age} onChange={handleChange}>
                <MenuItem value={"approved"}>Approved</MenuItem>
                <MenuItem value={"processing"}>Processing</MenuItem>
                <MenuItem value={"paid"}>Paid</MenuItem>
                <MenuItem value={"rejected"}>Rejected</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogContent>
            <Autocomplete
              multiple
              fullWidth
              options={staticClaims}
              disableCloseOnSelect
              getOptionLabel={(option) => option.full_name}
              onChange={handleChanges}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                  />
                  {option.full_name}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Select Claims" />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={selectData}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}
