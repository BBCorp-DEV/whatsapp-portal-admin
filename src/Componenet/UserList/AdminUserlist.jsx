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
import { MdModeEditOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import toast from "react-hot-toast";
import { AuthContext } from "../../Auth/context/Auth";
import ApiConfig from "../../Auth/ApiConfig";
import axios from "axios";
import moment from "moment";

// Excel libraries
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function UserList() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const userDatas = auth.userData;

  const [searchQuery, setSearchQuery] = useState("");
  const [userStoredData, setUserStoredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [open2, setOpen2] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const effectRan = useRef(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to first page on search
  };

  const OpenModal2 = (user) => {
    setOpen2(user);
  };
  const handleClose2 = () => setOpen2(false);

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
          limit: limit,
          search: searchQuery,
        },
      });

      if (response.status === 200) {
        setUserStoredData(response?.data?.data?.docs);
        setTotalPages(response?.data?.data?.totalPages);
        // toast.success(
        //   response?.data?.message || "Users loaded successfully ✅"
        // );
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
  }, [page, limit, searchQuery]);

  const handleDeleteUser = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    setDataLoading(true);

    try {
      const response = await axios({
        method: "DELETE",
        url: ApiConfig.userDelete,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id: id },
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

  // Download Excel function
  const downloadExcel = async () => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      // Fetch all users without pagination
      const response = await axios({
        method: "GET",
        url: ApiConfig.userList,
        headers: { authorization: `Bearer ${token}` },
        params: { page: 1, limit: 10000 }, // get all users
      });

      const allUsers = response?.data?.data?.docs || [];

      if (!allUsers.length) {
        toast.error("No user data to export ❌");
        return;
      }

      const excelData = allUsers.map((user) => ({
        "User ID": user.id,
        "First Name": user.firstName,
        "Last Name": user.lastName,
        Email: user.email,
        Role: Array.isArray(user.role) ? user.role.join(", ") : user.role,
        "Created At": moment(user.createdAt).format("DD-MMM-YYYY"),
        Status: user.status,
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(data, "user-list.xlsx");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export users ❌");
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
                "&:hover": { backgroundColor: "#0077cc" },
              }}
            >
              Add User
            </Button>
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

      {/* Delete User Dialog */}
      <Dialog
        open={open2}
        onClose={handleClose2}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "20px",
            color: "#000",
            pb: 1,
          }}
        >
          Delete User
        </DialogTitle>
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
        <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
          <Button
            onClick={handleClose2}
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: "8px", px: 3, textTransform: "none" }}
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
              background: "#0077CC",
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
