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
import { useLocation, useNavigate } from "react-router-dom";
import { MdModeEditOutline, MdBlock, MdOutlineRemoveRedEye } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
// import axios from "axios";
// import ApiConfig, { API_BASE_URL } from "../../Auth/ApiConfig";
// import toast from "react-hot-toast";
import { AuthContext } from "../../Auth/context/Auth";
import ApiConfig from "../../Auth/ApiConfig";
import axios from "axios";
import toast from "react-hot-toast";

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
  const [paginatedUsers,setPaginatedUsers] = useState([])
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
     const effectRan = useRef(false);

  // Pagination
  const handlePageChange = (event, value) => setPage(value);
    const depositListing = async () => {
      setLoading(true)
      try {
        const token = window.localStorage.getItem("adminToken");
  
        const response = await axios({
          method: "GET",
          url: ApiConfig?.withdrawalList,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        console.log("depositResponse", response);
  
        if (response?.status === 200) {
          setPaginatedUsers(response?.data);
           setLoading(false)
          // toast.success(
          //   response?.data?.message || "Deposits loaded successfully ✅"
          // );
        } else {
          // toast.error(response?.data?.message || "Something went wrong ❌");
        }
      } catch (error) {
        console.error("API ERROR RESPONSE:", error?.response?.data || error);
         setLoading(false)
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
    }, [])
  return (
    <Box sx={{ width: "100%", backgroundColor: "#F5F5F5", minHeight: "100vh",    px: 2,
        py:0, }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, alignItems: "center", mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "700", }}>
          Withdrawal List
        </Typography>
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
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ background: "#fff", borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              {["Sr. No.", "Username", "Amount", "Date", "Type", "Status"].map((heading, i) => (
                <TableCell key={i} sx={{ fontWeight: "bold" }}>
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((row, index) => (
                <TableRow key={row.id} sx={{ background: index % 2 === 0 ? "#f5f5f5" : "#fff" }}>
                  {/* <TableCell>{startIndex + index + 1}</TableCell> */}
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit profile">
                      <IconButton onClick={() => navigate("/editUser", { state: { userData: row } })}>
                        <MdModeEditOutline />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={row.status === "Active" ? "Block" : "Activate"}>
                      <IconButton>
                        <MdBlock style={{ color: row.status === "Active" ? "red" : "green" }} />
                      </IconButton>
                    </Tooltip>
                    {userDatas?.role === "admin" && (
                      <Tooltip title="Update password">
                        <IconButton>
                          <TbPasswordUser />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="View">
                      <IconButton onClick={() => navigate("/viewUser", { state: { userData: row } })}>
                        <MdOutlineRemoveRedEye />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination page={page} onChange={handlePageChange} count={totalPages} />
        </Box>
      )}
    </Box>
  );
}