import React, { useContext, useEffect, useState } from "react";
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
  CircularProgress,
  Pagination,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../Auth/ApiConfig";
import PlansCard from "../../Common/DashboardCards/PlansCard";
import { IoEyeSharp } from "react-icons/io5";
import { AuthContext } from "../../Auth/context/Auth";
import moment from "moment";

export default function ErrorPage() {
  const location = useLocation();
  const isAdminPayment = location.pathname === "/payments";
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // keep page starting from 1 for Pagination
  const [limit, setLimit] = useState(10);
  const [errorData, setErrorData] = useState([]);
  const auth = useContext(AuthContext);
  const userData = auth.userData;

  // 🔹 Static Data fallback

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const errortisting = async () => {
    try {
      const token = window.localStorage.getItem("adminToken");
      const response = await axios({
        method: "GET",
        url: ApiConfig?.errorList,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page: page,
          limit: limit,
        },
      });

      console.log("depositResponse", response);

      if (response?.status === 200) {
        setErrorData(response?.data?.data?.docs);
        setTotalPages(response?.data?.data?.totalPages);
      } else {
        // toast.error(response?.data?.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("API ERROR RESPONSE:", error?.response?.data || error);

      // toast.error(
      //   error?.response?.data?.message || "Failed to fetch deposits ❌"
      // );
      return error?.response;
    }
  };
  useEffect(() => {
    errortisting();
  }, [page, limit]);
  return (
    <>
      {["admin", "insurance"].includes(userData?.role) && <PlansCard />}
      <Box
        sx={{
          height: "100vh",
          background: "#F5F5F5",
          marginTop: { xs: "0px", md: "0px" },
          px: 2,
          py: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "700" }}>
            Error List
          </Typography>
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
            InputProps={{ sx: { paddingRight: "8px" } }}
          />
        </Box>
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            background: "#fff",
            borderRadius: "10px",
            marginTop: "20px",
            width: { xs: "100%", md: "100%" },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr No.",
                  "Name",
                  "URL",
                  "Method",
                  "Status Code",
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
                  <TableCell colSpan={7} align="center">
                    <Box sx={{ py: 4 }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : errorData?.length > 0 ? (
                errorData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      borderRadius: "10px",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">
                      {(page - 1) * limit + index + 1}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="left">
                      <Tooltip title={row.url} arrow>
                        <span>
                          {row.url?.length > 20
                            ? row.url.substring(0, 20) + "..."
                            : row.url}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{row.method}</TableCell>
                    <TableCell>{row.statusCode}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      {" "}
                      {moment(row.createdAt).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title={"View Claim"}>
                        <IconButton
                          onClick={() =>
                            navigate("/view-error", { state: { errorData } })
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
                  <TableCell colSpan={7} align="center">
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      sx={{ fontSize: "15px !important" }}
                    >
                      No Data Found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {totalPages > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
              "& .Mui-selected": {
                backgroundColor: "#00b2ff !important",
                color: "#fff !important",
                borderRadius: "5px",
              },
              "& .MuiPaginationItem-root": { color: "black" },
            }}
          >
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
