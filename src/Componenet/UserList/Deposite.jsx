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
                    <Tooltip title="Vie Deposit">
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

// import React, { useContext, useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   CircularProgress,
//   Pagination,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { MdModeEditOutline, MdBlock, MdOutlineRemoveRedEye } from "react-icons/md";
// import { TbPasswordUser } from "react-icons/tb";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../Auth/context/Auth";

// export default function UserList() {
//   const navigate = useNavigate();
//   const auth = useContext(AuthContext);
//   const userDatas = auth.userData;

//   const [searchQuery, setSearchQuery] = useState("");
//   const [userStoredData, setUserStoredData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [idd1, setidd1] = useState("");
//   const [idd2, setidd2] = useState("");
//   const [open1, setOpen1] = useState(false);
//   const [open2, setOpen2] = useState(false);
//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState(false);
//   const [hideOnScroll, setHideOnScroll] = useState(false);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleSearchQueryChange = (event) => {
//     setSearchQuery(event.target.value);
//     setPage(1); // Reset to first page on search
//   };

//   const userListing = async () => {
//     setLoading(true);
//     const staticData = [
//       { id: 1, full_name: "John Doe", emailid: "john@example.com", role: "policyholder", status: "active" },
//       { id: 2, full_name: "Jane Smith", emailid: "jane@example.com", role: "policyholder", status: "inactive" },
//       { id: 3, full_name: "Michael Johnson", emailid: "michael@example.com", role: "policyholder", status: "active" },
//       { id: 4, full_name: "Sarah Connor", emailid: "sarah@example.com", role: "policyholder", status: "active" },
//       { id: 5, full_name: "Kyle Reese", emailid: "kyle@example.com", role: "policyholder", status: "inactive" },
//       { id: 6, full_name: "T-800", emailid: "terminator@example.com", role: "policyholder", status: "active" },
//       { id: 7, full_name: "John Wick", emailid: "wick@example.com", role: "policyholder", status: "active" },
//       { id: 8, full_name: "Neo", emailid: "neo@example.com", role: "policyholder", status: "inactive" },
//       { id: 9, full_name: "Trinity", emailid: "trinity@example.com", role: "policyholder", status: "active" },
//       { id: 10, full_name: "Morpheus", emailid: "morpheus@example.com", role: "policyholder", status: "active" },
//       { id: 11, full_name: "Agent Smith", emailid: "smith@example.com", role: "policyholder", status: "inactive" },
//       { id: 12, full_name: "Ellen Ripley", emailid: "ripley@example.com", role: "policyholder", status: "active" },
//     ];

//     const filtered = staticData.filter((user) =>
//       user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const total = filtered.length;
//     const totalPagesCalc = Math.ceil(total / limit);
//     const startIndex = (page - 1) * limit;
//     const endIndex = startIndex + limit;
//     const paginatedData = filtered.slice(startIndex, endIndex);

//     setUserStoredData(paginatedData);
//     setTotalPages(totalPagesCalc);
//     setLoading(false);
//   };

//   const OpenModal1 = (user, status) => {
//     setidd1(status);
//     setOpen1(user);
//   };
//   const handleClose1 = () => setOpen1(false);

//   const OpenModal2 = (user, status) => {
//     setidd2(status);
//     setOpen2(user);
//   };
//   const handleClose2 = () => setOpen2(false);

//   const StatusActiveBlock = async (id) => {
//     setUserStoredData((prevData) =>
//       prevData.map((user) =>
//         user.id === id ? { ...user, status: idd1 } : user
//       )
//     );
//     toast.success(`User status changed to ${idd1}`);
//     setOpen1(false);
//   };

//   const PasswordUpdateHandler = async (id) => {
//     if (!password.trim()) {
//       setPasswordError(true);
//       return;
//     }
//     toast.success(`Password updated successfully for user ID ${id}`);
//     setPassword("");
//     setOpen2(false);
//   };

//   useEffect(() => {
//     userListing();
//   }, [page, searchQuery]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setHideOnScroll(window.scrollY > 0);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <Box sx={{ width: "100%", backgroundColor: "#F5F5F5", minHeight: "100vh", p: 2 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 2,
//             alignItems: "center",
//             mb: 2,
//             flexDirection: { xs: "column", sm: "row" },
//           }}
//         >
//           <Typography variant="h4" sx={{ fontWeight: 700 }}>
//             User List
//           </Typography>

//           <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
//             <Button
//               variant="contained"
//               onClick={() => navigate("/addUser")}
//               sx={{
//                 backgroundColor: "#0077cc",
//                 textTransform: "none",
//                 px: 4,
//                 py: 1,
//                 borderRadius: "8px",
//                 fontWeight: "bold",
//                 color: "#fff",
//                 "&:hover": {
//                   backgroundColor: "#0077cc",
//                 },
//               }}
//             >
//               Add User
//             </Button>

//             <TextField
//               variant="outlined"
//               size="small"
//               placeholder="Search..."
//               type="search"
//               value={searchQuery}
//               onChange={handleSearchQueryChange}
//               sx={{
//                 backgroundColor: "#fff",
//                 borderRadius: "8px",
//                 minWidth: { xs: "100%", sm: 200 },
//               }}
//             />
//           </Box>
//         </Box>

//         <TableContainer component={Paper} elevation={3} sx={{ mt: 2, borderRadius: "10px" }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {["Serial Number", "Full Name", "Email", "Role", "Status", "Action"].map((heading, i) => (
//                   <TableCell key={i} sx={{ fontWeight: "bold" }}>
//                     {heading}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : userStoredData.length > 0 ? (
//                 userStoredData.map((row, index) => (
//                   <TableRow key={index} sx={{ background: index % 2 === 0 ? "#f5f5f5" : "#fff" }}>
//                     <TableCell>{(page - 1) * limit + index + 1}</TableCell>
//                     <TableCell>{row.full_name}</TableCell>
//                     <TableCell>{row.emailid}</TableCell>
//                     <TableCell>{row.role}</TableCell>
//                     <TableCell>{row.status}</TableCell>
//                     <TableCell>
//                       <Tooltip title="Edit profile">
//                         <IconButton onClick={() => navigate("/editUser", { state: { userData: row } })}>
//                           <MdModeEditOutline />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title={row.status === "active" ? "Deactivate" : "Activate"}>
//                         <IconButton onClick={() => OpenModal1(row, row.status === "active" ? "inactive" : "active")}>
//                           <MdBlock style={{ color: row.status === "active" ? "red" : "green" }} />
//                         </IconButton>
//                       </Tooltip>
//                       {userDatas?.role === "admin" && (
//                         <Tooltip title="Update password">
//                           <IconButton onClick={() => OpenModal2(row, row.status)}>
//                             <TbPasswordUser />
//                           </IconButton>
//                         </Tooltip>
//                       )}
//                       <Tooltip title="View">
//                         <IconButton onClick={() => navigate("/viewUser", { state: { userData: row } })}>
//                           <MdOutlineRemoveRedEye />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No data found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {totalPages > 1 && (
//           <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
//             <Pagination page={page} count={totalPages} onChange={handlePageChange} />
//           </Box>
//         )}
//       </Box>

//       {/* Status Change Dialog */}
//       <Dialog open={open1} onClose={handleClose1} maxWidth="xs" fullWidth>
//         <DialogTitle textAlign="center">
//           {open1?.status === "active" ? "Block user" : "Activate user"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText textAlign="center">
//             Are you sure you want to {open1?.status === "active" ? "block" : "activate"} the user?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
//           <Button onClick={handleClose1}>No</Button>
//           <Button onClick={() => StatusActiveBlock(open1?.id)}>Yes</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Update Password Dialog */}
//       <Dialog open={open2} onClose={handleClose2} maxWidth="xs" fullWidth>
//         <DialogTitle textAlign="center">Update Password</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             variant="outlined"
//             size="small"
//             placeholder="Enter new password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               setPasswordError(false);
//             }}
//             error={passwordError}
//             helperText={passwordError ? "Password cannot be empty" : ""}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
//           <Button onClick={handleClose2}>Cancel</Button>
//           <Button onClick={() => PasswordUpdateHandler(open2?.id)}>Update</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }
