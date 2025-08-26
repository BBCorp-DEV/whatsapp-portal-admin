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
import { useNavigate } from "react-router-dom";
import {
  MdModeEditOutline,
  MdBlock,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { TbPasswordUser, TbTrash } from "react-icons/tb";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";
import { AuthContext } from "../../Auth/context/Auth";
import ApiConfig from "../../Auth/ApiConfig";
import axios from "axios";
import moment from "moment";

export default function UserList() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const userDatas = auth.userData;

  const [searchQuery, setSearchQuery] = useState("");
  const [userStoredData, setUserStoredData] = useState([]);
  console.log("resfhgvgcgData", userStoredData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [idd1, setidd1] = useState("");
  const [idd2, setidd2] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const effectRan = useRef(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page on search
  };

  const OpenModal1 = (user, status) => {
    setidd1(status);
    setOpen1(user);
  };
  const handleClose1 = () => setOpen1(false);

  const OpenModal2 = (user, status) => {
    setidd2(status);
    setOpen2(user);
  };
  const handleClose2 = () => setOpen2(false);

  const StatusActiveBlock = async (id) => {
    setUserStoredData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, status: idd1 } : user
      )
    );
    toast.success(`User status changed to ${idd1}`);
    setOpen1(false);
  };

  const PasswordUpdateHandler = async (id) => {
    if (!password.trim()) {
      setPasswordError(true);
      return;
    }
    toast.success(`Password updated successfully for user ID ${id}`);
    setPassword("");
    setOpen2(false);
  };
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to userid ✅");
  };
  useEffect(() => {
    const handleScroll = () => {
      setHideOnScroll(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        setUserStoredData(response?.data?.data?.docs);
        toast.success(
          response?.data?.message || "Users loaded successfully ✅"
        );
      } else {
        toast.error(response?.data?.message || "Something went wrong ❌");
        setUserStoredData([]);
      }
    } catch (error) {
      console.log("error", error);
      setUserStoredData([]);
      toast.error(error?.response?.data?.message || "Failed to fetch users ❌");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!effectRan.current) {
      userListing();
      effectRan.current = true;
    }
  }, []);

  const handleDeleteUser = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);

    try {
      const response = await axios({
        method: "DELETE",
        url: ApiConfig.userDelete,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      });

      if (response.status === 200) {
        toast.success(
          response?.data?.message || "User deleted successfully ✅"
        );
        handleClose2();
        userListing();
      } else {
        toast.error(response?.data?.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete user ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", backgroundColor: "#F5F5F5", p: 2 }}>
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
            User List
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/add-user")}
              sx={{
                backgroundColor: "#0077cc",
                textTransform: "none",
                px: 4,
                py: 1,
                borderRadius: "8px",
                fontWeight: "bold",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#0077cc",
                },
              }}
            >
              Add User
            </Button>

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
                minWidth: { xs: "100%", sm: 200 },
              }}
            />
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
                  "User Id",
                  "First Name",
                  "Last Name",
                  "Email",
                  "Permission",
                  "Date",
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
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      {" "}
                      {moment(row.createdAt).format("DD-MMM-YYYY")}
                    </TableCell>

                    <TableCell>{row.status}</TableCell>
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
                      {/* <Tooltip
                        title={
                          row.status === "active" ? "Deactivate" : "Activate"
                        }
                      >
                        <IconButton
                          onClick={() =>
                            OpenModal1(
                              row,
                              row.status === "active" ? "inactive" : "active"
                            )
                          }
                        >
                          <MdBlock
                            style={{
                              color: row.status === "active" ? "red" : "green",
                            }}
                          />
                        </IconButton>
                      </Tooltip> */}

                      <Tooltip title="View">
                        <IconButton
                          onClick={() =>
                            navigate("/view-user", { state: { userData: row } })
                          }
                        >
                          <MdOutlineRemoveRedEye />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <IconButton onClick={() => OpenModal2(row, row.status)}>
                          <TbTrash />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

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

      {/* Status Change Dialog */}
      <Dialog open={open1} onClose={handleClose1} maxWidth="xs" fullWidth>
        <DialogTitle textAlign="center">
          {open1?.status === "active" ? "Block user" : "Activate user"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            Are you sure you want to{" "}
            {open1?.status === "active" ? "block" : "activate"} the user?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleClose1}>No</Button>
          <Button onClick={() => StatusActiveBlock(open1?.id)}>Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Update Password Dialog */}
      <Dialog
        open={open2}
        onClose={handleClose2}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px", // ✅ round corners
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#d32f2f",
          }}
        >
          Delete User
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center", py: 2 }}>
          <p style={{ marginBottom: "10px", fontSize: "15px", color: "#444" }}>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>

          <div
            style={{
              background: "#fff5f5",
              border: "1px solid #f0caca",
              borderRadius: "8px", // ✅ round box corners
              padding: "12px",
              display: "inline-block",
              fontSize: "14px",
            }}
          >
            <strong style={{ color: "#b71c1c" }}>
              {open2?.firstName }{" "}
              {open2?.lastName}
            </strong>
          </div>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleClose2}
            variant="outlined"
            sx={{ borderRadius: "8px", px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteUser(open2?.id)}
            variant="contained"
            color="error"
            sx={{ borderRadius: "8px", px: 3 }}
          >
            {loading ? (
              <CircularProgress  size={24} sx={{ color: "white" }} />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
//   Link,
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
// import { useLocation, useNavigate } from "react-router-dom";
// import { MdModeEditOutline } from "react-icons/md";
// import { MdBlock } from "react-icons/md";
// import { TbPasswordUser } from "react-icons/tb";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import axios from "axios";
// import ApiConfig, { API_BASE_URL } from "../../Auth/ApiConfig";
// import toast from "react-hot-toast";
// import { AuthContext } from "../../Auth/context/Auth";
// export default function HospitalsUser() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [totalPages, setTotalPages] = useState("");
//   const auth = useContext(AuthContext);
//   const userDatas = auth.userData;
//   const [searchQuery, setSearchQuery] = useState("");
//   const [userStoredData, setUserStoredData] = useState([]);
//   const [hideOnScroll, setHideOnScroll] = useState(false);
//   console.log("SDgsadgasd", userStoredData);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [limit, setLimit] = useState(10);
//   const [idd1, setidd1] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [passwordError, setPasswordError] = useState(false);

//   const [idd2, setidd2] = React.useState("");
//   const [open1, setOpen1] = React.useState(false);
//   const [open2, setOpen2] = React.useState(false);
//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };
//   const isUsersPage = location.pathname === "/users";
//   const handleSearchQueryChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const userListing = async () => {
//     const token = window.localStorage.getItem("adminToken");
//     setLoading(true);
//     try {
//       const response = await axios({
//         method: "GET",
//         url: ApiConfig.users,
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//         params: {
//           page: page,
//           limit: limit,
//           q: searchQuery,
//         },
//       });
//       console.log("asfgadsgsdagfads", response);
//       if (response.data?.success === true) {
//         console.log("adsfsdafgadsf", response?.data?.data);
//         setUserStoredData(response?.data?.data[0]?.rows?.filter((item)=>item.role === "hospital"));
//         setTotalPages(response?.data?.data[0]?.count);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         setUserStoredData([]);
//       }
//     } catch (error) {
//       setLoading(false);
//       setUserStoredData([]);
//       console.log("error", error);
//     }
//   };

//   const OpenModal1 = (data, status) => {
//     setidd1(status); // Store only the company ID
//     setOpen1(data);
//   };
//   const handleClose1 = () => {
//     setOpen1(false); //closes modal
//   };

//   const OpenModal2 = (data, status) => {
//     setidd2(status); // Store only the company ID
//     setOpen2(data);
//   };
//   const handleClose2 = () => {
//     setOpen2(false); //closes modal
//   };

//   const StatusActiveBlock = async (id) => {
//     const token = window.localStorage.getItem("adminToken");
//     setLoading(true);
//     try {
//       const response = await axios({
//         method: "PUT",
//         url: `${API_BASE_URL}api/v1/users/${id}/status`,
//         // url: `http://3.144.242.180/api/v1/users/${id}/status`,

//         headers: {
//           authorization: `Bearer ${token}`,
//         },

//         data: {
//           status: idd1,
//         },
//       });
//       console.log("b565bvifbifu", response.data.error);
//       if (response.data.success === true) {
//         console.log("sdsadfsasssss", response.data);
//         userListing();
//         toast.success(response?.data?.message);
//         setOpen1(false);
//         // setClassStoredData(response?.data?.data.reverse());
//         setLoading(false);
//       } else {
//         setLoading(false);
//         toast.error(response?.data?.message ?? "Please try again");
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error(error?.response?.data?.message ?? "Please try again");
//       console.log("error", error);
//     }
//   };

//   const PasswordUpdateHandler = async (id) => {
//     const token = window.localStorage.getItem("adminToken");
//     setLoading(true);
//     try {
//       const response = await axios({
//         method: "PUT",
//         url: `${API_BASE_URL}api/v1/users/${id}/password`,
//         headers: {
//           authorization: `Bearer ${token}`,
//         },

//         data: {
//           new_password: password,
//         },
//       });
//       console.log("b565bvifbifu", response.data.error);
//       if (response.data.success === true) {
//         console.log("sdsadfsasssss", response.data);
//         setPassword("");
//         userListing();
//         toast.success(response?.data?.message);
//         setOpen2(false);
//         // setClassStoredData(response?.data?.data.reverse());
//         setLoading(false);
//       } else {
//         setLoading(false);
//         setOpen2(false);
//         toast.error(response?.data?.message ?? "Please try again");
//       }
//     } catch (error) {
//       setLoading(false);
//       setOpen2(false);
//       toast.error(error?.response?.data?.message ?? "Please try again");
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     userListing();
//   }, [page, limit, searchQuery]);
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) {
//         setHideOnScroll(true);
//       } else {
//         setHideOnScroll(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   return (
//     <>
//       <Box
//         sx={{
//           width: { xs: "100%", md: "100%" },
//           backgroundColor: "#F5F5F5",
//           // height: isUsersPage ? (hideOnScroll ? 0 : "100vh") : 0,
//           height: "100vh",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 2,
//             alignItems: "center",
//             mb: 2,
//             flexDirection: { xs: "column", sm: "row" }, // Stack on extra small screens
//           }}
//         >
//           <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontSize: { xs: "24px", sm: "30px" },
//                 fontWeight: "700",
//                 fontFamily: "rubik",
//               }}
//             >
//               Hospital List
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               gap: 2,
//               width: { xs: "100%", sm: "auto" },
//             }}
//           >
//             <Button
//               variant="contained"
//               onClick={() =>
//                 navigate("/addUser", {
//                   state: { type: "hospital", },
//                 })
//               }
//               sx={{
//                 backgroundColor: "#0077cc",
//                 textTransform: "none",
//                 px: 4,
//                 py: 1,
//                 borderRadius: "8px",
//                 fontWeight: "bold",
//                 color: "#fff",
//                 width: { xs: "100%", sm: "auto" },
//                 "&:hover": {
//                   backgroundColor: "#0077cc",
//                 },
//               }}
//             >
//               Add Hospital
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
//                 "& .MuiOutlinedInput-root": {
//                   paddingRight: 0,
//                   padding: "2.5px 0px",
//                   borderRadius: "10px",
//                 },
//               }}
//               InputProps={{
//                 sx: { paddingRight: "8px" },
//               }}
//             />
//           </Box>
//         </Box>

//         <TableContainer
//           component={Paper}
//           elevation={3}
//           sx={{
//             height: "auto",
//             background: "#fff",
//             borderRadius: "10px",
//             marginTop: "20px",
//             overflowX: { xs: "auto", md: "hidden" },
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {[
//                   "Serial Number",
//                   "Full Name",
//                   "Email",
//                   "Role",
//                   "Status",
//                   "Action",
//                 ].map((heading, i) => (
//                   <TableCell key={i} sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
//                     {heading}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={6}
//                     align="center"
//                     sx={{ borderBottom: "none" }}
//                   >
//                     <Box sx={{ py: 4 }}>
//                       <CircularProgress />
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ) : userStoredData?.length > 0 ? (
//                 userStoredData?.map((row, index) => (
//                   <TableRow
//                     key={index}
//                     sx={{
//                       background: index % 2 === 0 ? "#f5f5f5" : "#fff",
//                     }}
//                   >
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell sx={{ fontWeight: 500 }}>
//                       {row.full_name}
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 500 }}>
//                       {row.emailid}
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 500 }}>
//                       <Box sx={{}}>
//                         {row?.role.charAt(0).toUpperCase() + row?.role.slice(1)}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       {row?.status.charAt(0).toUpperCase() +
//                         row?.status.slice(1)}
//                     </TableCell>

//                     <TableCell>
//                       <Tooltip title="Edit profile">
//                         <IconButton>
//                           <MdModeEditOutline
//                             style={{ cursor: "pointer" }}
//                             onClick={() =>
//                               navigate("/editUser", {
//                                 state: { userData: row },
//                               })
//                             }
//                           />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip
//                         title={row.status === "active" ? "Deactive" : "active"}
//                       >
//                         <IconButton>
//                           <MdBlock
//                             style={{
//                               cursor: "pointer",
//                               color: row.status === "active" ? "red" : "green",
//                             }}
//                             onClick={() => {
//                               OpenModal1(
//                                 row,
//                                 row.status === "active" ? "inactive" : "active"
//                               );
//                             }}
//                           />
//                         </IconButton>
//                       </Tooltip>
//                       {userDatas?.role === "admin" && (
//                         <Tooltip title="Update password">
//                           <IconButton>
//                             <TbPasswordUser
//                               style={{ cursor: "pointer" }}
//                               onClick={() => {
//                                 OpenModal2(
//                                   row,
//                                   row.status === "active"
//                                     ? "inactive"
//                                     : "active"
//                                 );
//                               }}
//                             />
//                           </IconButton>
//                         </Tooltip>
//                       )}
//                            <IconButton>
//                             <MdOutlineRemoveRedEye
//                               style={{ cursor: "pointer" }}
//                               // onClick={() => {
//                               //   OpenModal2(
//                               //     row,
//                               //     row.status === "active"
//                               //       ? "inactive"
//                               //       : "active"
//                               //   );
//                               // }}
//                               onClick={() =>
//                                 navigate("/viewUser", {
//                                   state: { userData: row },
//                                 })
//                               }
//                             />
//                           </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={6}
//                     align="center"
//                     sx={{ borderBottom: "none" }}
//                   >
//                     <Box sx={{ py: 4 }}>No Data found</Box>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {totalPages > 1 && userStoredData?.[0]?.rows?.length > 0 && (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               textAlign: "center",
//               // marginTop: "10px",
//               padding: "20px",
//               "& .Mui-selected": {
//                 backgroundColor: "#0077cc !important",
//                 color: "#fff !important",
//                 borderRadius: "5px",
//               },
//               "& .MuiPaginationItem-root": { color: "black" },
//             }}
//           >
//             <Pagination
//               page={page}
//               onChange={handlePageChange}
//               count={totalPages}
//             />
//           </Box>
//         )}
//       </Box>
//       <Dialog
//         open={open1}
//         onClose={handleClose1}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         maxWidth="xs"
//         fullWidth
//         PaperProps={{
//           sx: {
//             padding: "1rem",
//             width: "500px",
//             maxWidth: "90%",
//             borderRadius: "12px",
//           },
//         }}
//       >
//         <DialogTitle
//           id="alert-dialog-title"
//           style={{ textAlign: "center", color: "#000" }}
//         >
//           {open1?.status === "active" ? "Block user" : "Activate user"}
//         </DialogTitle>

//         <DialogContent style={{ padding: "20px", textAlign: "center" }}>
//           <DialogContentText
//             id="alert-dialog-description"
//             style={{ fontSize: "14px", color: "#000" }}
//           >
//             Are you sure you want to{" "}
//             {open1?.status === "active"
//               ? "block the user"
//               : "activate the user"}
//             ?
//           </DialogContentText>
//         </DialogContent>

//         <DialogActions
//           style={{
//             justifyContent: "center",
//             padding: "20px",
//             display: "flex",
//             gap: "10px",
//           }}
//         >
//           <Button
//             onClick={handleClose1}
//             color="primary"
//             autoFocus
//             sx={{
//               fontSize: "15px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//               width: "30%",
//               borderRadius: "10px",
//               border: "1px solid #0077cc",
//               color: "#0077cc",
//               "&:hover": {
//                 backgroundColor: "#0077cc",
//                 boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
//                 color: "#fff",
//               },
//             }}
//           >
//             No
//           </Button>
//           <Button
//             onClick={() => {
//               StatusActiveBlock(open1?.id);
//             }}
//             color="primary"
//             sx={{
//               fontSize: "15px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//               width: "30%",
//               borderRadius: "10px",
//               border: "1px solid #0077cc",
//               color: "#0077cc",
//               "&:hover": {
//                 backgroundColor: "#0077cc",
//                 boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
//                 color: "#fff",
//               },
//             }}
//           >
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* update password */}
//       <Dialog
//         open={open2}
//         onClose={handleClose2}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         maxWidth="xs"
//         fullWidth
//         PaperProps={{
//           sx: {
//             padding: "1.5rem",
//             width: "500px",
//             maxWidth: "90%",
//             borderRadius: "12px",
//           },
//         }}
//       >
//         <DialogTitle
//           id="alert-dialog-title"
//           style={{ textAlign: "center", color: "#000", fontWeight: "600" }}
//         >
//           Update Password
//         </DialogTitle>
//         <DialogContent style={{ padding: "20px", textAlign: "center" }}>
//           <Box style={{ display: "flex", justifyContent: "center" }}>
//             <TextField
//               variant="outlined"
//               size="small"
//               placeholder="Enter new password"
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 setPasswordError(false); // clear error when typing
//               }}
//               error={passwordError}
//               helperText={passwordError ? "Please enter a password" : ""}
//               sx={{
//                 backgroundColor: "#fff",
//                 borderRadius: "8px",
//                 minWidth: 300,
//                 "& .MuiOutlinedInput-root": {
//                   paddingRight: 0,
//                   padding: "5px 0px",
//                   borderRadius: "10px",
//                 },
//               }}
//               InputProps={{
//                 sx: { paddingRight: "8px" },
//               }}
//             />
//           </Box>
//         </DialogContent>

//         <DialogActions
//           style={{ justifyContent: "center", paddingBottom: "20px" }}
//         >
//           <Button
//             onClick={handleClose2}
//             // variant="contained"
//             color="primary"
//             autoFocus
//             sx={{
//               fontSize: "15px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//               width: "30%",
//               borderRadius: "10px",
//               border: "1px solid #0077cc",
//               color: "#0077cc",
//               "&:hover": {
//                 backgroundColor: "#0077cc",
//                 boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
//                 color: "#fff",
//               },
//             }}
//           >
//             No
//           </Button>
//           <Button
//             onClick={() => {
//               if (!password.trim()) {
//                 setPasswordError(true);
//                 return;
//               }
//               PasswordUpdateHandler(open2?.id);
//             }}
//             // variant="contained"
//             color="primary"
//             sx={{
//               fontSize: "15px",
//               textTransform: "capitalize",
//               fontWeight: "500",
//               width: "30%",
//               borderRadius: "10px",
//               border: "1px solid #0077cc",
//               color: "#0077cc",
//               "&:hover": {
//                 backgroundColor: "#0077cc",
//                 boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
//                 color: "#fff",
//               },
//             }}
//           >
//             Yes {}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }
