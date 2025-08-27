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
        params: {
          page: page,
          limit: limit, // ✅ fixed
          search: searchQuery,
        },
      });

      if (response.status === 200) {
        setUserStoredData(response?.data?.data?.docs);
        setTotalPages(response?.data?.data?.totalPages)
        // toast.success(
        //   response?.data?.message || "Users loaded successfully ✅"
        // );
      } else {
        // toast.error(response?.data?.message || "Something went wrong ❌");
        setUserStoredData([]);
      }
    } catch (error) {
      console.log("error", error);
      setUserStoredData([]);
      // toast.error(error?.response?.data?.message || "Failed to fetch users ❌");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    userListing();
  }, [page, limit, searchQuery]);

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
      <Box
        sx={{
          height: "100vh",
          marginTop: { xs: "0px", md: "0px" },
          background: "#F5F5F5",
          p: 2,
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
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      {" "}
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

        {totalPages > 1 && userStoredData.length > 0 && (
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
      borderRadius: "16px",
      boxShadow: "0px 8px 24px rgba(0,0,0,0.12)", // softer shadow
    },
  }}
>
  {/* Title */}
  <DialogTitle
    sx={{
      textAlign: "center",
      fontWeight: 600,
      fontSize: "20px",
      color: "#d32f2f",
      pb: 1,
    }}
  >
    Delete User
  </DialogTitle>

  {/* Content */}
  <DialogContent sx={{ textAlign: "center", py: 2 }}>
    <p
      style={{
        marginBottom: "10px",
        fontSize: "15px",
        color: "#555",
        lineHeight: 1.6,
      }}
    >
      Are you sure you want to delete this user? <br />
      <strong>This action cannot be undone.</strong>
    </p>
  </DialogContent>

  {/* Actions */}
  <DialogActions
    sx={{
      justifyContent: "center",
      gap: 2,
      pb: 2,
    }}
  >
    <Button
      onClick={handleClose2}
      variant="outlined"
      color="inherit"
      sx={{
        borderRadius: "8px",
        px: 3,
        textTransform: "none",
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={() => handleDeleteUser(open2?.id)}
      variant="contained"
      color="error"
      disabled={loading}
      sx={{
        borderRadius: "8px",
        px: 3,
        textTransform: "none",
        boxShadow: "0px 4px 12px rgba(211,47,47,0.3)",
        background: loading ? "#b71c1c" : "#d32f2f",
        "&:hover": {
          background: "#b71c1c",
        },
      }}
    >
      {loading ? (
        <CircularProgress size={22} sx={{ color: "white" }} />
      ) : (
        "Delete"
      )}
    </Button>
  </DialogActions>
</Dialog>

    </>
  );
}
